// Items starting with "!" are essentials.
const SECTIONS = [
  { id: "movein", name: "Move-In Day Kit", blurb: "Keep these within reach for the first 24 hours, before anything else is unpacked.", groups: [
    { name: "", items: ["!Box cutter or scissors", "!Toilet paper", "!Paper towels", "!Hand soap", "!Dish soap", "!Trash bags", "!Phone chargers", "!Bottled water & snacks", "!Paper plates, cups & utensils", "!Pain relievers & basic meds", "Air mattress or sleeping bag", "Hand truck or dolly", "Moving blankets", "Packing tape", "Permanent markers"] }
  ]},
  { id: "kitchen", name: "Kitchen", blurb: "Cookware, tools, and supplies to actually cook and eat at home.", groups: [
    { name: "Cookware & bakeware", items: ["!Nonstick frying pan", "Cast iron skillet", "!Small saucepan", "!Large saucepan", "!Stockpot", "Dutch oven", "!Sheet pans", "Baking dish (9x13)", "Loaf pan", "Muffin tin", "Cake pans", "Pie dish", "!Mixing bowls", "Cooling rack", "Roasting pan"] },
    { name: "Knives & prep", items: ["!Chef's knife", "!Paring knife", "Serrated bread knife", "Knife block or magnetic strip", "Knife sharpener", "!Cutting boards", "!Measuring cups", "!Measuring spoons", "!Vegetable peeler", "!Can opener", "Box grater", "!Colander", "Fine-mesh strainer", "Kitchen shears", "Garlic press", "Salad spinner", "Rolling pin", "Kitchen scale"] },
    { name: "Utensils", items: ["!Spatula / turner", "Silicone spatula", "!Wooden spoons", "!Tongs", "!Ladle", "!Whisk", "Slotted spoon", "Potato masher", "Meat thermometer", "Bottle opener & corkscrew", "Pizza cutter", "Ice cream scoop", "Utensil crock"] },
    { name: "Small appliances", items: ["!Coffee maker", "Electric kettle", "!Toaster or toaster oven", "Microwave", "Blender", "Air fryer", "Slow cooker or Instant Pot", "Stand or hand mixer", "Food processor", "Rice cooker", "Water filter pitcher"] },
    { name: "Big appliances (if not included)", items: ["Refrigerator", "Range / oven", "Dishwasher", "Chest freezer"] },
    { name: "Dishes & drinkware", items: ["!Dinner plates", "Salad plates", "!Bowls", "!Mugs", "!Drinking glasses", "Wine glasses", "!Flatware set", "Serving bowls", "Serving platter", "Serving utensils", "Water bottles & travel mugs"] },
    { name: "Storage & supplies", items: ["!Food storage containers", "Zip-top bags", "!Aluminum foil", "Plastic wrap", "Parchment paper", "!Kitchen trash can", "Recycling bin", "!Dish rack or drying mat", "!Sponges & dish brush", "!Dish towels", "!Oven mitts & pot holders", "Trivets", "Paper towel holder", "Drawer organizers", "Spice rack", "Pantry bins & jars", "Under-sink organizer", "!Dishwasher detergent"] },
    { name: "Pantry starters", items: ["!Salt & pepper", "!Cooking oil", "Olive oil", "Flour", "Sugar", "Basic spices", "Rice & pasta", "Condiments", "Coffee / tea", "Baking soda", "Vinegar"] }
  ]},
  { id: "dining", name: "Dining", blurb: "A place to sit down and eat, plus a few things for hosting.", groups: [
    { name: "", items: ["Dining table", "!Dining chairs", "Bar stools", "Placemats or tablecloth", "Cloth napkins", "Table runner or centerpiece", "Sideboard or buffet", "Pendant light or chandelier"] }
  ]},
  { id: "living", name: "Living Room", blurb: "Seating, lighting, and the things that make it feel lived in.", groups: [
    { name: "Furniture", items: ["!Sofa", "Accent chair", "Coffee table", "Side tables", "TV stand / media console", "Bookshelf", "Ottoman"] },
    { name: "Lighting & windows", items: ["Floor lamp", "Table lamps", "!Curtains or blinds", "Curtain rods"] },
    { name: "Entertainment", items: ["TV", "TV wall mount", "Streaming device", "Soundbar or speakers"] },
    { name: "Decor & comfort", items: ["Area rug", "Rug pad", "Throw pillows", "Throw blankets", "Wall art", "Mirror", "Plants & planters", "Coasters", "Decorative baskets"] }
  ]},
  { id: "bedroom", name: "Bedroom", blurb: "Bedding, storage, and the basics for a good night's sleep.", groups: [
    { name: "Bed", items: ["!Bed frame", "!Mattress", "!Mattress protector", "Mattress topper", "Box spring / foundation", "!Sheet sets (2)", "!Pillows", "Pillow protectors", "!Comforter or duvet", "Duvet cover"] },
    { name: "Furniture", items: ["Nightstands", "Dresser", "Full-length mirror", "Bench or chair"] },
    { name: "Closet & storage", items: ["!Hangers", "Closet organizers", "Under-bed storage", "!Laundry hamper", "Shoe organizer"] },
    { name: "Comfort", items: ["Bedside lamps", "Blackout curtains", "Alarm clock", "Fan or white noise machine"] },
    { name: "Guest room", items: ["Guest bed or air mattress", "Extra sheet set", "Extra pillows & blanket"] }
  ]},
  { id: "bathroom", name: "Bathroom", blurb: "Linens, shower gear, and a few things you'll really miss if you don't have them.", groups: [
    { name: "Linens", items: ["!Bath towels", "!Hand towels", "Washcloths", "!Bath mat", "Guest towels"] },
    { name: "Shower & tub", items: ["!Shower curtain & liner", "!Shower curtain rings", "Shower caddy", "Squeegee", "Shower head upgrade", "Drain hair catcher"] },
    { name: "Toilet", items: ["!Plunger", "!Toilet brush", "Toilet paper holder or storage", "Over-toilet shelf"] },
    { name: "Counter & storage", items: ["!Small trash can", "Soap dispenser", "Toothbrush holder", "Drawer organizers", "Towel & robe hooks", "Medicine cabinet organizers"] },
    { name: "Extras", items: ["Hair dryer", "Bathroom scale", "Nightlight"] }
  ]},
  { id: "laundry", name: "Laundry", blurb: "Washing, drying, and keeping clothes in shape.", groups: [
    { name: "", items: ["!Washer (if not included)", "!Dryer (if not included)", "!Laundry detergent", "Dryer sheets or wool balls", "Stain remover", "Bleach", "!Laundry baskets", "Drying rack", "Iron", "Ironing board", "Clothes steamer", "Lint roller", "Sewing kit", "Laundry room shelves", "Mesh delicates bags"] }
  ]},
  { id: "cleaning", name: "Cleaning", blurb: "Tools and supplies for keeping the whole house clean.", groups: [
    { name: "Tools", items: ["!Vacuum", "!Broom & dustpan", "!Mop & bucket", "Spray mop / Swiffer", "Handheld vacuum", "Robot vacuum", "!Microfiber cloths", "Scrub brushes", "!Rubber gloves", "Duster", "Cleaning caddy", "!Step stool"] },
    { name: "Supplies", items: ["!All-purpose cleaner", "Glass cleaner", "!Bathroom cleaner", "!Toilet bowl cleaner", "Disinfecting wipes", "Floor cleaner", "Magic erasers", "Furniture polish", "Carpet stain remover", "Oven cleaner", "Stainless steel cleaner"] }
  ]},
  { id: "entry", name: "Entryway & Storage", blurb: "Where keys, shoes, and mail end up, plus general storage.", groups: [
    { name: "", items: ["!Indoor doormat", "Shoe rack", "Coat rack or wall hooks", "Key hooks or catch-all tray", "Mail organizer", "Entry bench", "Umbrella stand", "Storage bins with lids", "Vacuum storage bags", "Labels"] }
  ]},
  { id: "office", name: "Home Office", blurb: "A workspace and the paperwork basics.", groups: [
    { name: "", items: ["Desk", "!Desk chair", "Monitor", "Keyboard & mouse", "Desk lamp", "Laptop stand", "Webcam", "Printer", "Printer paper", "Filing box or cabinet", "Shredder", "Basic supplies (pens, stapler, tape, scissors)", "Envelopes & stamps", "Cable management"] }
  ]},
  { id: "tech", name: "Tech & Utilities", blurb: "Internet, power, and optional smart-home upgrades.", groups: [
    { name: "Internet", items: ["!Modem", "!Wi-Fi router or mesh system", "Ethernet cables"] },
    { name: "Power", items: ["!Surge protectors", "Power strips", "Indoor extension cords"] },
    { name: "Batteries & bulbs", items: ["!Batteries (AA / AAA)", "9V batteries (for smoke alarms)", "!Light bulbs"] },
    { name: "Smart home", items: ["Smart thermostat", "Video doorbell", "Security cameras", "Smart plugs", "Smart lock", "Smart speaker", "Smart lights"] },
    { name: "Handy extras", items: ["HDMI cables", "Label maker"] }
  ]},
  { id: "safety", name: "Safety & Emergency", blurb: "Detectors, fire safety, and supplies for when things go wrong.", groups: [
    { name: "Alarms & detectors", items: ["!Smoke detectors", "!Carbon monoxide detectors", "Water leak sensors", "Radon test kit"] },
    { name: "Fire", items: ["!Fire extinguisher (kitchen)", "Fire extinguisher (garage)", "Fire extinguisher (each floor)", "Fire escape ladder", "Fire blanket"] },
    { name: "Emergency supplies", items: ["!First aid kit", "!Flashlights", "Emergency radio", "Emergency water supply", "Non-perishable food", "Candles & lighter", "Portable power bank", "Generator"] },
    { name: "Security", items: ["!Rekey or change the locks", "Spare keys", "Fireproof safe for documents", "Door security bar / window locks", "Light timers"] },
    { name: "Kids & pets (if needed)", items: ["Outlet covers", "Cabinet locks", "Baby or pet gates", "Furniture anchors"] }
  ]},
  { id: "garage", name: "Garage & Tools", blurb: "A starter toolkit for hanging, fixing, and building things, plus garage organization.", groups: [
    { name: "Hand tools", items: ["!Hammer", "!Screwdriver set", "!Tape measure", "!Level", "!Utility knife", "!Pliers set", "Adjustable wrench", "Allen / hex keys", "Socket set", "Pry bar", "Handsaw", "Putty knife", "Toolbox"] },
    { name: "Power tools", items: ["!Cordless drill & bit set", "Impact driver", "Circular saw", "Jigsaw", "Oscillating multi-tool", "Orbital sander", "Shop vac"] },
    { name: "Hardware & adhesives", items: ["!Wall anchors & screw assortment", "!Picture-hanging kit", "Stud finder", "Nails assortment", "Duct tape", "Painter's tape", "Electrical tape", "WD-40", "Wood glue", "Super glue", "Caulk & caulk gun", "Zip ties", "Sandpaper"] },
    { name: "Electrical & plumbing", items: ["Voltage tester", "Heavy-duty extension cord", "Plumber's tape", "Pipe wrench", "Drain snake / toilet auger"] },
    { name: "Paint & patch", items: ["Spackle", "Paint rollers & trays", "Paintbrushes", "Drop cloths", "Touch-up paint"] },
    { name: "Safety gear", items: ["Work gloves", "Safety glasses", "Ear protection", "Dust masks", "Headlamp"] },
    { name: "Ladders", items: ["!Step ladder", "Extension ladder"] },
    { name: "Garage organization", items: ["Garage shelving", "Pegboard & hooks", "Workbench", "Wall hooks for bikes & tools", "Storage totes"] },
    { name: "Car care", items: ["Jumper cables or jump starter", "Tire inflator", "Tire pressure gauge", "Car wash supplies", "Oil drip mat"] }
  ]},
  { id: "outdoor", name: "Yard & Outdoor", blurb: "Lawn care, garden tools, and the outside of the house.", groups: [
    { name: "Lawn", items: ["Lawn mower", "String trimmer", "Leaf blower", "!Rake", "Lawn spreader", "Grass seed & fertilizer"] },
    { name: "Garden", items: ["!Garden hose", "Hose nozzle", "Hose reel", "Sprinkler", "Watering can", "Pruning shears", "Hedge trimmer", "Gardening gloves", "Hand trowel", "Wheelbarrow", "!Shovel"] },
    { name: "Seasonal", items: ["Snow shovel", "Ice melt", "Gutter scoop"] },
    { name: "Patio & curb", items: ["!Outdoor trash & recycling bins", "!Welcome mat", "House numbers", "Mailbox", "Outdoor lighting", "Patio furniture", "Grill", "Grill tools & cover", "Propane tank", "Outdoor extension cord", "Planters", "Outdoor rug"] }
  ]}
];

const API = "/new-home/api";
const POLL_MS = 4000;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const secById = Object.fromEntries(SECTIONS.map(s => [s.id, s]));

let state = { status: {}, custom: {}, bought: {} };
const ui = { view: "list", filter: "all", essentials: false, search: "", quizScope: "all", quizHistory: [], quizForce: null, includeOpen: false };

let ITEMS = [];
let byId = {};
function buildItems() {
  ITEMS = [];
  SECTIONS.forEach(sec => {
    sec.groups.forEach(g => g.items.forEach(raw => {
      const essential = raw.startsWith("!");
      const name = essential ? raw.slice(1) : raw;
      ITEMS.push({ id: `${sec.id}::${slug(name)}`, name, essential, section: sec.id, group: g.name });
    }));
    (state.custom[sec.id] || []).forEach(name => {
      ITEMS.push({ id: `${sec.id}::custom-${encodeURIComponent(name.toLowerCase())}`, name, essential: false, section: sec.id, group: "Your additions", custom: true });
    });
  });
  byId = Object.fromEntries(ITEMS.map(i => [i.id, i]));
}

/* ---------- Sync ---------- */
let pending = 0;
let writeSeq = 0;
let writeFailed = false;
let writeChain = Promise.resolve();

function setSync(label, kind) {
  const el = $("#syncStatus");
  el.textContent = label;
  el.dataset.kind = kind;
}

async function request(path, body) {
  const opts = body === undefined
    ? { cache: "no-store", headers: { Accept: "application/json" } }
    : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
  const res = await fetch(API + path, opts);
  if (res.status === 401) {
    location.reload();
    throw new Error("Signed out");
  }
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
}

// Writes run one at a time so the server sees them in the order they were made.
function push(path, body) {
  pending++;
  writeSeq++;
  setSync("Saving", "busy");
  writeChain = writeChain
    .then(() => request(path, body))
    .catch(() => {
      writeFailed = true;
      toast("Couldn't save that change. Check your connection.");
    })
    .finally(() => {
      pending--;
      if (pending > 0) return;
      if (writeFailed) {
        writeFailed = false;
        pull(true);
      } else {
        setSync("Saved", "ok");
      }
    });
}

function canon(s) {
  return JSON.stringify([
    Object.entries(s.status).sort(),
    Object.keys(s.bought).filter(k => s.bought[k]).sort(),
    Object.entries(s.custom).filter(([, v]) => v.length).map(([k, v]) => [k, [...v].sort()]).sort(),
  ]);
}

function typingInAddForm() {
  const el = document.activeElement;
  return el && el.closest && el.closest("form[data-add]") && el.value;
}

async function pull(force = false) {
  if (pending) return;
  if (!force && typingInAddForm()) return;
  const seq = writeSeq;
  try {
    const data = await request("/state");
    if (pending || seq !== writeSeq) return;
    const next = { status: data.status || {}, bought: data.bought || {}, custom: data.custom || {} };
    const changed = canon(next) !== canon(state);
    state = next;
    if (changed || force) {
      buildItems();
      renderCurrent();
    }
    setSync("Synced", "ok");
  } catch {
    setSync("Offline", "err");
  }
}

function sendItems(ids) {
  push("/items", { changes: ids.map(id => ({ id, status: state.status[id] || null, bought: !!state.bought[id] })) });
}

function setStatus(id, st) {
  if (st) state.status[id] = st; else delete state.status[id];
  if (st && st !== "need") delete state.bought[id];
  sendItems([id]);
}

function pool() { return ui.essentials ? ITEMS.filter(i => i.essential) : ITEMS; }
function counts(items) {
  const c = { have: 0, need: 0, skip: 0, open: 0, total: items.length };
  items.forEach(i => { c[state.status[i.id] || "open"]++; });
  return c;
}
function pctOf(c) { return c.total ? Math.round((c.total - c.open) / c.total * 100) : 0; }

function updateCounts() {
  const items = pool();
  const c = counts(items);
  $("#statHave").textContent = c.have;
  $("#statNeed").textContent = c.need;
  $("#statSkip").textContent = c.skip;
  $("#statOpen").textContent = c.open;
  $("#pct").textContent = pctOf(c) + "%";
  $("#pctBar").style.width = pctOf(c) + "%";
  const badge = $("#shopBadge");
  badge.textContent = c.need;
  badge.classList.toggle("zero", c.need === 0);

  SECTIONS.forEach(sec => {
    const sc = counts(items.filter(i => i.section === sec.id));
    const link = $(`[data-nav="${sec.id}"]`);
    if (link) {
      link.querySelector(".nav-count").textContent = `${sc.total - sc.open}/${sc.total}`;
      link.querySelector(".nav-bar i").style.width = pctOf(sc) + "%";
      link.classList.toggle("done", sc.total > 0 && sc.open === 0);
    }
    const pills = $(`[data-sec-stats="${sec.id}"]`);
    if (pills) {
      pills.innerHTML =
        `<span class="pill have">${sc.have} have</span>` +
        `<span class="pill need">${sc.need} need</span>` +
        `<span class="pill">${sc.open} left</span>`;
    }
  });
}

/* ---------- Checklist ---------- */
function renderNav() {
  $("#sideNav").innerHTML = SECTIONS.map((sec, i) => `
    <a class="nav-link" href="#sec-${sec.id}" data-nav="${sec.id}">
      <div class="nav-row"><span><span class="nav-num">${String(i + 1).padStart(2, "0")}</span>${esc(sec.name)}</span><span class="nav-count"></span></div>
      <div class="nav-bar"><i></i></div>
    </a>`).join("");
}

function rowHTML(item) {
  const st = state.status[item.id] || "";
  const btn = (key, label) => `<button type="button" data-set="${key}" aria-pressed="${st === key}">${label}</button>`;
  return `<li class="row" data-id="${esc(item.id)}" data-status="${st}">
    <span class="mark" aria-hidden="true"></span>
    <span class="name">${esc(item.name)}${item.essential ? '<span class="tag">Essential</span>' : ""}</span>
    <div class="seg" role="group" aria-label="${esc(item.name)}">${btn("have", "Have")}${btn("need", "Need")}${btn("skip", "Skip")}</div>
    ${item.custom ? `<button type="button" class="del" data-del title="Remove item" aria-label="Remove ${esc(item.name)}">&times;</button>` : ""}
  </li>`;
}

function renderList() {
  $("#sections").innerHTML = SECTIONS.map((sec, i) => {
    const secItems = ITEMS.filter(it => it.section === sec.id);
    const groups = [];
    secItems.forEach(it => {
      let g = groups.find(x => x.name === it.group);
      if (!g) groups.push(g = { name: it.group, items: [] });
      g.items.push(it);
    });
    return `<section class="sec" id="sec-${sec.id}">
      <div class="sec-head">
        <div>
          <p class="eyebrow">${String(i + 1).padStart(2, "0")}</p>
          <h2>${esc(sec.name)}</h2>
          <p class="blurb">${esc(sec.blurb)}</p>
        </div>
        <div class="pills" data-sec-stats="${sec.id}"></div>
      </div>
      ${groups.map(g => `<div class="group">${g.name ? `<h3>${esc(g.name)}</h3>` : ""}<ul>${g.items.map(rowHTML).join("")}</ul></div>`).join("")}
      <form class="add" data-add="${sec.id}">
        <input type="text" placeholder="Add something else to ${esc(sec.name)}" aria-label="Add item to ${esc(sec.name)}" maxlength="80">
        <button class="btn" type="submit">Add</button>
      </form>
    </section>`;
  }).join("");
  applyFilters();
  updateCounts();
}

function visible(item) {
  const st = state.status[item.id] || "";
  if (ui.essentials && !item.essential) return false;
  if (ui.search && !item.name.toLowerCase().includes(ui.search)) return false;
  if (ui.filter === "all") return true;
  if (ui.filter === "open") return !st;
  return st === ui.filter;
}

function applyFilters() {
  let any = false;
  $$("#sections .sec").forEach(sec => {
    let secAny = false;
    $$(".group", sec).forEach(g => {
      let gAny = false;
      $$(".row", g).forEach(r => {
        const v = visible(byId[r.dataset.id]);
        r.hidden = !v;
        r.classList.remove("leaving");
        if (v) gAny = true;
      });
      g.hidden = !gAny;
      if (gAny) secAny = true;
    });
    sec.hidden = !secAny;
    if (secAny) any = true;
  });
  $("#emptyList").hidden = any;
}

let filterTimer;
function onRowSet(btn) {
  const row = btn.closest(".row");
  const id = row.dataset.id;
  const cur = state.status[id] || "";
  const next = cur === btn.dataset.set ? "" : btn.dataset.set;
  setStatus(id, next);
  row.dataset.status = next;
  $$(".seg button", row).forEach(b => b.setAttribute("aria-pressed", b.dataset.set === next));
  updateCounts();
  if (!visible(byId[id])) {
    row.classList.add("leaving");
    clearTimeout(filterTimer);
    filterTimer = setTimeout(applyFilters, 380);
  }
}

function addCustom(form) {
  const secId = form.dataset.add;
  const input = form.querySelector("input");
  const name = input.value.trim();
  if (!name) return;
  const exists = ITEMS.some(i => i.section === secId && i.name.toLowerCase() === name.toLowerCase());
  if (exists) { toast("That's already on the list"); return; }
  (state.custom[secId] = state.custom[secId] || []).push(name);
  push("/custom", { action: "add", section: secId, name });
  buildItems();
  renderList();
  $(`form[data-add="${secId}"] input`).focus();
  toast(`Added "${name}"`);
}

function removeCustom(id) {
  const item = byId[id];
  if (!item || !item.custom) return;
  state.custom[item.section] = (state.custom[item.section] || []).filter(n => n !== item.name);
  delete state.status[id];
  delete state.bought[id];
  push("/custom", { action: "remove", section: item.section, name: item.name });
  buildItems();
  renderList();
}

/* ---------- Quiz ---------- */
function quizPool() {
  return pool().filter(i => ui.quizScope === "all" || i.section === ui.quizScope);
}

function renderQuizScope() {
  const sel = $("#quizScope");
  const items = pool();
  const openAll = counts(items).open;
  sel.innerHTML = `<option value="all">All areas (${openAll} left)</option>` +
    SECTIONS.map(sec => {
      const c = counts(items.filter(i => i.section === sec.id));
      return `<option value="${sec.id}">${esc(sec.name)} (${c.open} left)</option>`;
    }).join("");
  sel.value = ui.quizScope;
}

function renderQuiz() {
  renderQuizScope();
  const items = quizPool();
  const c = counts(items);
  $("#quizProgress").textContent = `${c.total - c.open} of ${c.total} answered`;
  $("#quizBar").style.width = pctOf(c) + "%";
  $("#quizBack").disabled = ui.quizHistory.length === 0;

  const forced = ui.quizForce && byId[ui.quizForce] && !state.status[ui.quizForce] ? byId[ui.quizForce] : null;
  const next = forced || items.find(i => !state.status[i.id]);
  const card = $("#quizCard");
  const prevId = card.dataset.id;

  if (!next) {
    card.dataset.id = "";
    const scopeName = ui.quizScope === "all" ? "every area" : secById[ui.quizScope].name;
    const moreElsewhere = ui.quizScope !== "all" && counts(pool()).open > 0;
    card.innerHTML = `
      <p class="eyebrow">All done</p>
      <h2 class="q-item q-done-title">You've answered everything in ${esc(scopeName)}.</h2>
      <p class="q-lead q-done-sub">${c.have} have, ${c.need} need, ${c.skip} skipped.</p>
      <div class="done-actions">
        ${moreElsewhere ? '<button class="btn" data-quiz-all>Continue with all areas</button>' : ""}
        <button class="btn primary" data-view="shop">See shopping list</button>
      </div>`;
  } else {
    card.dataset.id = next.id;
    const sec = secById[next.section];
    card.innerHTML = `
      <p class="eyebrow">${esc(sec.name)}${next.group ? " &middot; " + esc(next.group) : ""}</p>
      <p class="q-lead">Do you already have</p>
      <h2 class="q-item">${esc(next.name)}</h2>
      ${next.essential ? '<span class="tag tag-solo">Essential</span>' : ""}
      <div class="q-actions">
        <button class="q-btn have" data-answer="have">I have it <kbd>1</kbd></button>
        <button class="q-btn need" data-answer="need">I need it <kbd>2</kbd></button>
        <button class="q-btn skip" data-answer="skip">Skip / not for me <kbd>3</kbd></button>
      </div>`;
  }
  if (card.dataset.id !== prevId) {
    card.classList.remove("pop");
    void card.offsetWidth;
    card.classList.add("pop");
  }
}

function answerQuiz(st) {
  const id = $("#quizCard").dataset.id;
  if (!id) return;
  setStatus(id, st);
  ui.quizHistory.push(id);
  ui.quizForce = null;
  updateCounts();
  renderQuiz();
}

function quizBack() {
  const id = ui.quizHistory.pop();
  if (!id) return;
  setStatus(id, "");
  ui.quizForce = id;
  updateCounts();
  renderQuiz();
}

/* ---------- Shopping list ---------- */
function shopItems() {
  return pool().filter(i => {
    const st = state.status[i.id];
    return st === "need" || (ui.includeOpen && !st);
  });
}

function renderShop() {
  const items = shopItems();
  const essentials = items.filter(i => i.essential).length;
  const bought = items.filter(i => state.bought[i.id]).length;
  $("#shopTitle").textContent = items.length ? `${items.length} thing${items.length === 1 ? "" : "s"} to get` : "Nothing to buy yet";
  $("#shopSub").textContent = items.length
    ? `${essentials} essential${essentials === 1 ? "" : "s"}${bought ? ` · ${bought} checked off` : ""}`
    : "Mark items as Need in the checklist or quiz and they'll show up here.";
  $("#moveBought").hidden = bought === 0;
  $("#copyList").disabled = items.length === 0;
  $("#printList").disabled = items.length === 0;

  $("#shopList").innerHTML = SECTIONS.map(sec => {
    const list = items.filter(i => i.section === sec.id).sort((a, b) => b.essential - a.essential);
    if (!list.length) return "";
    return `<section class="shop-sec">
      <h3>${esc(sec.name)} <span>${list.length}</span></h3>
      <ul>${list.map(i => `
        <li class="shop-item ${state.bought[i.id] ? "bought" : ""}">
          <label>
            <input type="checkbox" data-buy="${esc(i.id)}" ${state.bought[i.id] ? "checked" : ""}>
            <span class="n">${esc(i.name)}</span>
            ${i.essential ? '<span class="tag">Essential</span>' : ""}
            ${!state.status[i.id] ? '<span class="tag soft">Unanswered</span>' : ""}
          </label>
        </li>`).join("")}</ul>
    </section>`;
  }).join("");
}

function shopText() {
  const items = shopItems();
  const lines = ["New home shopping list", ""];
  SECTIONS.forEach(sec => {
    const list = items.filter(i => i.section === sec.id).sort((a, b) => b.essential - a.essential);
    if (!list.length) return;
    lines.push(sec.name.toUpperCase());
    list.forEach(i => lines.push(`${state.bought[i.id] ? "[x]" : "[ ]"} ${i.name}${i.essential ? " (essential)" : ""}`));
    lines.push("");
  });
  return lines.join("\n").trim();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast("Shopping list copied");
}

/* ---------- Shared ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

function renderCurrent() {
  if (ui.view === "list") renderList();
  if (ui.view === "quiz") renderQuiz();
  if (ui.view === "shop") renderShop();
  updateCounts();
}

function setView(v) {
  ui.view = v;
  $$(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.view === v));
  $("#listView").hidden = v !== "list";
  $("#quizView").hidden = v !== "quiz";
  $("#shopView").hidden = v !== "shop";
  if (v === "quiz") { ui.quizHistory = []; ui.quizForce = null; }
  renderCurrent();
  const barTop = $(".toolbar").offsetTop;
  if (window.scrollY > barTop) window.scrollTo({ top: barTop, behavior: "instant" });
}

document.addEventListener("click", e => {
  const t = e.target;
  const setBtn = t.closest(".row [data-set]");
  if (setBtn) return onRowSet(setBtn);
  const del = t.closest("[data-del]");
  if (del) return removeCustom(del.closest(".row").dataset.id);
  const view = t.closest("[data-view]");
  if (view) return setView(view.dataset.view);
  const chip = t.closest("[data-filter]");
  if (chip) {
    ui.filter = chip.dataset.filter;
    $$("#filterChips .chip").forEach(c => c.setAttribute("aria-pressed", c === chip));
    return applyFilters();
  }
  const ans = t.closest("[data-answer]");
  if (ans) return answerQuiz(ans.dataset.answer);
  if (t.closest("[data-quiz-all]")) {
    ui.quizScope = "all";
    ui.quizHistory = [];
    return renderQuiz();
  }
});

document.addEventListener("submit", e => {
  const form = e.target.closest("form[data-add]");
  if (!form) return;
  e.preventDefault();
  addCustom(form);
});

document.addEventListener("change", e => {
  const buy = e.target.closest("[data-buy]");
  if (!buy) return;
  if (buy.checked) state.bought[buy.dataset.buy] = true; else delete state.bought[buy.dataset.buy];
  sendItems([buy.dataset.buy]);
  renderShop();
});

$("#search").addEventListener("input", e => {
  ui.search = e.target.value.trim().toLowerCase();
  applyFilters();
});

$("#essentialsToggle").addEventListener("change", e => {
  ui.essentials = e.target.checked;
  renderCurrent();
});

$("#quizScope").addEventListener("change", e => {
  ui.quizScope = e.target.value;
  ui.quizHistory = [];
  ui.quizForce = null;
  e.target.blur();
  renderQuiz();
});

$("#quizBack").addEventListener("click", quizBack);

$("#includeOpen").addEventListener("change", e => {
  ui.includeOpen = e.target.checked;
  renderShop();
});

$("#moveBought").addEventListener("click", () => {
  const ids = Object.keys(state.bought);
  ids.forEach(id => { state.status[id] = "have"; });
  state.bought = {};
  sendItems(ids);
  renderShop();
  updateCounts();
  toast(`Moved ${ids.length} item${ids.length === 1 ? "" : "s"} to Have`);
});

$("#copyList").addEventListener("click", () => copyText(shopText()));
$("#printList").addEventListener("click", () => window.print());

$("#resetBtn").addEventListener("click", () => {
  if (!confirm("Clear every answer and added item? This resets the list for everyone who uses it.")) return;
  state = { status: {}, custom: {}, bought: {} };
  push("/reset", {});
  ui.quizHistory = [];
  ui.quizForce = null;
  buildItems();
  renderCurrent();
  toast("Checklist reset");
});

document.addEventListener("keydown", e => {
  if (ui.view !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
  if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === "1" || k === "h") answerQuiz("have");
  else if (k === "2" || k === "n") answerQuiz("need");
  else if (k === "3" || k === "s") answerQuiz("skip");
  else if (k === "backspace" || k === "arrowleft") { e.preventDefault(); quizBack(); }
});

$("#signOutBtn").addEventListener("click", async () => {
  await writeChain;
  try { await request("/logout", {}); } catch { /* reload shows the passcode screen either way */ }
  location.reload();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") pull();
});
setInterval(() => {
  if (document.visibilityState === "visible") pull();
}, POLL_MS);

buildItems();
renderNav();
renderList();
pull(true);
