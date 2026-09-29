// Passcode gate and shared-state API for /new-home/.
// Secrets (set with `wrangler pages secret put`): CHECKLIST_PASSCODE, SESSION_SECRET.

const BASE = "/new-home";
const API = `${BASE}/api/`;
const COOKIE = "nh_session";
const SESSION_TTL_S = 60 * 60 * 24 * 30;
const MAX_FAILS = 8;
// The passcode is only 4 digits, so wrong guesses are also capped across all IPs.
const GLOBAL_MAX_FAILS = 20;
const FAIL_WINDOW_MS = 15 * 60 * 1000;
const MAX_BODY = 64 * 1024;
const STATUSES = new Set(["have", "need", "skip"]);
const ID_RE = /^[a-z]{1,30}::[A-Za-z0-9%._~!*'()-]{1,160}$/;
const SECTION_RE = /^[a-z]{1,30}$/;
const enc = new TextEncoder();

export async function onRequest({ request, env, next }) {
  const { pathname } = new URL(request.url);
  if (pathname !== BASE && !pathname.startsWith(`${BASE}/`)) return next();
  if (pathname === BASE) return redirect(`${BASE}/`);

  if (!env.DB || !env.CHECKLIST_PASSCODE || !env.SESSION_SECRET) {
    return text("This page isn't configured yet.", 503);
  }

  if (pathname === `${BASE}/login`) {
    return request.method === "POST" ? handleLogin(request, env) : redirect(`${BASE}/`);
  }

  const authed = await hasSession(request, env);

  if (pathname.startsWith(API)) {
    if (!authed) return json({ error: "unauthorized" }, 401);
    return handleApi(request, env, pathname.slice(API.length));
  }

  if (!authed) {
    if (pathname === `${BASE}/` || pathname === `${BASE}/index.html`) return loginPage();
    return redirect(`${BASE}/`);
  }

  const res = await next();
  const out = new Response(res.body, res);
  out.headers.set("Cache-Control", "private, no-store");
  out.headers.set("X-Robots-Tag", "noindex, nofollow");
  return out;
}

/* ---------- Auth ---------- */

async function handleLogin(request, env) {
  if (!sameOrigin(request)) return text("Forbidden", 403);
  if (Number(request.headers.get("Content-Length") || 0) > 4096) return text("Bad request", 400);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  const [ipResult, globalResult] = await env.DB.batch([
    env.DB.prepare("SELECT fails, window_start FROM login_attempts WHERE ip = ?1").bind(ip),
    env.DB.prepare("SELECT COALESCE(SUM(fails), 0) AS total FROM login_attempts WHERE window_start > ?1").bind(now - FAIL_WINDOW_MS),
  ]);
  const row = ipResult.results[0];
  const inWindow = row && now - row.window_start < FAIL_WINDOW_MS;
  if ((inWindow && row.fails >= MAX_FAILS) || globalResult.results[0].total >= GLOBAL_MAX_FAILS) {
    return loginPage("Too many attempts. Try again in 15 minutes.", 429);
  }

  let passcode = "";
  try {
    const form = await request.formData();
    passcode = String(form.get("passcode") || "");
  } catch {
    passcode = "";
  }

  if (!(await safeEqual(normalize(passcode), normalize(env.CHECKLIST_PASSCODE)))) {
    const fails = inWindow ? row.fails + 1 : 1;
    const start = inWindow ? row.window_start : now;
    await env.DB.prepare(
      "INSERT INTO login_attempts (ip, fails, window_start) VALUES (?1, ?2, ?3) " +
      "ON CONFLICT(ip) DO UPDATE SET fails = ?2, window_start = ?3"
    ).bind(ip, fails, start).run();
    return loginPage("That passcode didn't work.", 401);
  }

  if (row) await env.DB.prepare("DELETE FROM login_attempts WHERE ip = ?1").bind(ip).run();
  const exp = Math.floor(now / 1000) + SESSION_TTL_S;
  return new Response(null, {
    status: 303,
    headers: {
      Location: `${BASE}/`,
      "Set-Cookie": cookie(`${exp}.${await sign(env, exp)}`, SESSION_TTL_S),
      "Cache-Control": "no-store",
    },
  });
}

async function hasSession(request, env) {
  const token = readCookie(request, COOKIE);
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!sig || !Number.isInteger(exp) || exp < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(env, exp));
}

// Signing over the passcode hash means changing the passcode signs everyone out.
async function sign(env, exp) {
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const passHash = b64url(await sha256(normalize(env.CHECKLIST_PASSCODE)));
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(`${exp}.${passHash}`)));
}

function normalize(code) {
  return String(code).toUpperCase().replace(/[\s-]/g, "");
}

async function safeEqual(a, b) {
  const [ha, hb] = await Promise.all([sha256(a), sha256(b)]);
  return crypto.subtle.timingSafeEqual(ha, hb);
}

function sha256(s) {
  return crypto.subtle.digest("SHA-256", enc.encode(s));
}

function b64url(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function cookie(value, maxAge) {
  return `${COOKIE}=${value}; Path=${BASE}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const hit = header.split(/;\s*/).find(c => c.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : "";
}

function sameOrigin(request) {
  const site = request.headers.get("Sec-Fetch-Site");
  if (site) return site === "same-origin";
  return request.headers.get("Origin") === new URL(request.url).origin;
}

/* ---------- API ---------- */

async function handleApi(request, env, route) {
  if (request.method === "GET" && route === "state") return getState(env);
  if (request.method !== "POST") return json({ error: "not found" }, 404);
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);

  if (route === "logout") {
    return new Response(null, { status: 204, headers: { "Set-Cookie": cookie("", 0), "Cache-Control": "no-store" } });
  }

  const body = await readJson(request);
  if (!body) return json({ error: "bad request" }, 400);

  if (route === "items") return saveItems(env, body);
  if (route === "custom") return saveCustom(env, body);
  if (route === "reset") {
    await env.DB.batch([env.DB.prepare("DELETE FROM answers"), env.DB.prepare("DELETE FROM custom_items")]);
    return json({ ok: true });
  }
  return json({ error: "not found" }, 404);
}

async function readJson(request) {
  if (!(request.headers.get("Content-Type") || "").includes("application/json")) return null;
  const raw = await request.text();
  if (raw.length > MAX_BODY) return null;
  try {
    const value = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

async function getState(env) {
  const [answers, custom] = await env.DB.batch([
    env.DB.prepare("SELECT id, status, bought FROM answers"),
    env.DB.prepare("SELECT section, name FROM custom_items ORDER BY created_at, name"),
  ]);
  const status = {};
  const bought = {};
  const customMap = {};
  for (const r of answers.results) {
    if (r.status) status[r.id] = r.status;
    if (r.bought) bought[r.id] = true;
  }
  for (const r of custom.results) (customMap[r.section] ||= []).push(r.name);
  return json({ status, bought, custom: customMap });
}

async function saveItems(env, body) {
  const changes = body.changes;
  if (!Array.isArray(changes) || changes.length === 0 || changes.length > 500) return json({ error: "bad request" }, 400);

  const now = Date.now();
  const stmts = [];
  for (const c of changes) {
    if (!c || typeof c.id !== "string" || !ID_RE.test(c.id)) return json({ error: "bad item id" }, 400);
    const status = c.status == null || c.status === "" ? null : c.status;
    if (status !== null && !STATUSES.has(status)) return json({ error: "bad status" }, 400);
    const bought = c.bought === true ? 1 : 0;
    stmts.push(status === null && !bought
      ? env.DB.prepare("DELETE FROM answers WHERE id = ?1").bind(c.id)
      : env.DB.prepare(
          "INSERT INTO answers (id, status, bought, updated_at) VALUES (?1, ?2, ?3, ?4) " +
          "ON CONFLICT(id) DO UPDATE SET status = ?2, bought = ?3, updated_at = ?4"
        ).bind(c.id, status, bought, now));
  }
  await env.DB.batch(stmts);
  return json({ ok: true });
}

async function saveCustom(env, body) {
  const section = body.section;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (typeof section !== "string" || !SECTION_RE.test(section) || !name || name.length > 80) {
    return json({ error: "bad request" }, 400);
  }

  if (body.action === "add") {
    await env.DB.prepare(
      "INSERT INTO custom_items (section, name, created_at) VALUES (?1, ?2, ?3) ON CONFLICT DO NOTHING"
    ).bind(section, name, Date.now()).run();
    return json({ ok: true });
  }
  if (body.action === "remove") {
    const id = `${section}::custom-${encodeURIComponent(name.toLowerCase())}`;
    await env.DB.batch([
      env.DB.prepare("DELETE FROM custom_items WHERE section = ?1 AND name = ?2").bind(section, name),
      env.DB.prepare("DELETE FROM answers WHERE id = ?1").bind(id),
    ]);
    return json({ ok: true });
  }
  return json({ error: "bad request" }, 400);
}

/* ---------- Responses ---------- */

const BASE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...BASE_HEADERS, "Content-Type": "application/json; charset=utf-8" },
  });
}

function text(body, status) {
  return new Response(body, { status, headers: { ...BASE_HEADERS, "Content-Type": "text/plain; charset=utf-8" } });
}

function redirect(location) {
  return new Response(null, { status: 302, headers: { ...BASE_HEADERS, Location: location } });
}

function loginPage(error = "", status = 200) {
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(16)));
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Private checklist</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style nonce="${nonce}">
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;
    background: #f6f3ee; color: #1f1d1a;
    font: 15px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { width: 100%; max-width: 400px; background: #fffdf9; border: 1px solid #e6e0d6; border-radius: 22px; padding: 36px 32px 30px; box-shadow: 0 24px 60px -36px rgba(40, 30, 10, .4); }
  .eyebrow { margin: 0; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #6f6a62; }
  h1 { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-weight: 500; font-size: 32px; line-height: 1.1; letter-spacing: -.015em; margin: 8px 0 8px; }
  p.lede { margin: 0 0 24px; color: #6f6a62; }
  label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
  input {
    width: 100%; font: inherit; font-size: 22px; letter-spacing: .4em; text-align: center;
    padding: 11px 14px; border: 1px solid #e6e0d6; border-radius: 12px; background: #fff; outline: none;
  }
  input:focus { border-color: #2f5d50; box-shadow: 0 0 0 3px #e3ece8; }
  button {
    width: 100%; margin-top: 14px; padding: 12px; border: 0; border-radius: 12px;
    background: #1f1d1a; color: #fff; font: inherit; font-weight: 600; cursor: pointer;
  }
  button:hover { background: #3a3631; }
  .error { margin: 12px 0 0; color: #b5542f; font-size: 14px; font-weight: 500; }
</style>
</head>
<body>
<main>
  <p class="eyebrow">Private</p>
  <h1>New home checklist</h1>
  <p class="lede">Enter the 4-digit code Sam shared with you.</p>
  <form method="post" action="${BASE}/login">
    <label for="passcode">Code</label>
    <input id="passcode" name="passcode" type="text" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="off" required autofocus>
    <button type="submit">Open checklist</button>
    ${error ? `<p class="error" role="alert">${error}</p>` : ""}
  </form>
</main>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: {
      ...BASE_HEADERS,
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": `default-src 'none'; style-src 'nonce-${nonce}'; img-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`,
      "X-Frame-Options": "DENY",
    },
  });
}
