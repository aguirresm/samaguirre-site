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
