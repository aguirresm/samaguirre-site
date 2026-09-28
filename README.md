# samaguirre.com

Personal site for Aguirre Technologies. Static HTML and CSS. No build step. No Vercel.

Live (GitHub Pages): https://aguirresm.github.io/samaguirre-site/

Production domain: https://www.samaguirre.com/ (Cloudflare Pages + Cloudflare DNS)

LinkedIn: https://www.linkedin.com/in/samuelmaguirre

GymSaver: https://gymsaver.app

## Deploy

GitHub Pages publishes `main` automatically.

Cloudflare Pages: set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` on this repo (same values as gymsaver), then push to `main`, or:

```bash
npx wrangler pages deploy . --project-name=samaguirre --branch=main
```

Then in Cloudflare: Workers & Pages → samaguirre → Custom domains → `samaguirre.com` and `www.samaguirre.com`. Point the DNS records at Pages, not Vercel.

## Private new-home checklist

`/new-home/` is unlisted and passcode-gated by `functions/_middleware.js`, which only runs on that path (see `_routes.json`). Answers are shared through the `samaguirre-new-home` D1 database. The gate only exists on Cloudflare; the GitHub Pages mirror serves the blank template with no data.

```bash
npx wrangler d1 migrations apply samaguirre-new-home --remote
npx wrangler pages secret put CHECKLIST_PASSCODE --project-name samaguirre   # changing it signs everyone out
npx wrangler pages secret put SESSION_SECRET --project-name samaguirre
```
