# Hasnain Pirzada · Portfolio

Personal site of **Muhammad Hasnain Pirzada, Full Stack AI Engineer**, in the Midnight Glow brand.

- **frontend/**: Next.js 16 (App Router) + TypeScript, Tailwind CSS v4, Framer Motion, MDX content. Every page is static, so it is fast and easy for Google to index.
- **backend/**: FastAPI. Handles the contact form (validation, spam honeypot, rate limit) and sends the message to your inbox with [Resend](https://resend.com).

The site calls the backend at `/api/*`, which Next.js proxies to FastAPI. The browser never talks to the backend directly, so no CORS setup is needed.

```
hasnain-portfolio/
├─ frontend/
│  ├─ content/projects/*.mdx   ← one file per project (add a file = add a project page)
│  ├─ content/blog/*.mdx       ← one file per blog post
│  ├─ public/images/hasnain.jpg← your photo
│  ├─ public/cv/               ← put your CV PDF here
│  └─ src/
│     ├─ lib/site.ts           ← name, links, email, proof numbers, stack (edit first)
│     ├─ lib/services.ts       ← the 6 services, what's included, Fiverr gig links
│     ├─ app/                  ← pages, sitemap.ts, robots.ts, Open Graph images
│     └─ components/
└─ backend/
   ├─ app/main.py              ← /api/health and /api/contact
   ├─ index.py                 ← Vercel entry point
   └─ tests/
```

## Run it locally

You need Node 20+ and Python 3.11+.

**Backend** (terminal 1):

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env        # optional locally: without Resend keys, messages are printed in this terminal
uvicorn app.main:app --reload --port 8000
pytest                      # 6 tests
```

**Frontend** (terminal 2):

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                 # http://localhost:3000
```

Before you deploy, run `npm run build`. It must finish with no errors or warnings.

## Before you go live: fill in your details

Your email, phone/WhatsApp, LinkedIn, GitHub, Instagram and Fiverr links are already set in `frontend/src/lib/site.ts`. What's left:

1. **Fiverr gig links (optional)**: every Fiverr button uses your Fiverr profile link. To point a service or project at its own gig, set `fiverr:` in `frontend/src/lib/services.ts` or in the project's `.mdx` file.
2. **Prices**: none are shown on the site. Clients get a quote through the contact form, WhatsApp or Fiverr.
3. **`frontend/content/projects/*.mdx`**: check the stack, results and wording of each project. Add `video:` (a YouTube link or `/videos/file.mp4`), `cover:` (a 1600×900 image in `public/images/projects/`), and `github:` or `demo:` if they're public. Never name a client.
4. **`frontend/content/blog/*.mdx`**: two starter posts. Rewrite them in your own voice or replace them.
5. **CV**: save it as `frontend/public/cv/Muhammad-Hasnain-Pirzada-CV.pdf`. Until that file exists, the About page shows "Request my CV" instead of a download.
6. **Photo**: `frontend/public/images/hasnain.jpg` is used for the hero, the logo, the browser-tab icon and the share images. To change it, replace that file with any square JPG.

### Add a project

Copy any file in `content/projects/`, rename it, and edit the frontmatter. `type` takes one or more of `Chatbots, MCP, Agents, Voice, WhatsApp, Models`. Set `featured: true` to show it on the home page (the top 3 by `order` are shown). Inside the body you can use:

```mdx
<Flow steps={["Chat UI", { label: "FastAPI", note: "auth" }, "Claude"]} caption="How it fits together" />
<Video src="https://youtu.be/VIDEO_ID" title="Demo" />
<Callout>Anything worth highlighting.</Callout>
```

When a playbook project (AskStore, Wasla and the rest) ships, give it its own MDX file and remove it from the `lab` list in `site.ts`.

## Deploy to Vercel (free)

The repo deploys as **two Vercel projects**: one for the site and one for the API.

1. Push this folder to GitHub as a public repo named `hasnain-portfolio`.
2. **API**: on vercel.com, go to **Add New → Project**, import the repo, and set **Root Directory = `backend`**. Vercel detects FastAPI from `index.py`. Add these environment variables:
   - `ENVIRONMENT=production`
   - `ALLOWED_ORIGINS=https://hasnainpirzada.vercel.app`
   - `RESEND_API_KEY=...` (resend.com → API Keys)
   - `CONTACT_TO_EMAIL=you@gmail.com` (where messages arrive). Until you verify your own domain in Resend, it only delivers to the email you signed up with, so use that same address.
   - `CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>` (switch to your own domain once it's verified in Resend)

   Deploy, then open `https://<api-project>.vercel.app/api/health`. It should return `{"status":"ok"}`.
3. **Site**: go to **Add New → Project** again, import the same repo, and set **Root Directory = `frontend`**. Name the project `hasnainpirzada` so the URL is `hasnainpirzada.vercel.app`. Add:
   - `NEXT_PUBLIC_SITE_URL=https://hasnainpirzada.vercel.app`
   - `API_URL=https://<api-project>.vercel.app`
   - `GOOGLE_SITE_VERIFICATION=` (fill in during the Search Console step below, then redeploy)
   - `NEXT_PUBLIC_UMAMI_WEBSITE_ID=` (optional, from cloud.umami.is, to count clicks on your contact buttons)
4. Turn on **Analytics** in the site project's Vercel dashboard for page views (the code is already installed). Vercel's free plan doesn't record button clicks, which is why click tracking uses Umami.
5. From now on, every push to `main` redeploys, and every branch gets its own preview link.

To host the API somewhere else (Render, Railway, Fly.io), use `backend/Dockerfile` and point `API_URL` at it.

## Free services this site uses

Everything runs on free plans. The only optional cost is a custom domain later (about $10–15 a year).

| Job | Service | Free plan |
| --- | --- | --- |
| Hosting (site and API) | Vercel Hobby | Free |
| Contact form email | Resend | 3,000 emails a month, 100 a day |
| Page views | Vercel Web Analytics | 50,000 events a month |
| Button-click tracking | Umami Cloud | 100,000 events a month |
| Booking calls | Cal.com | Free for individuals |
| Demo videos | YouTube (unlisted is fine) | Free |
| Google and Bing | Search Console, Bing Webmaster Tools | Free |
| Speed and SEO check | PageSpeed Insights (pagespeed.web.dev) | Free, runs in the browser |

## SEO: what's built in, and what to do on launch day

Built in: per-page titles and meta descriptions (150–160 characters), canonical URLs, a 1200×630 Open Graph image for every page (generated in Midnight Glow; the home and About images include your photo), Person + WebSite JSON-LD on the home page, ProfilePage on About, BlogPosting, CreativeWork, Service and Breadcrumb schemas, `sitemap.xml`, `robots.txt`, a web manifest, `next/image` with AVIF/WebP, and Vercel Analytics.

On launch day:

- [ ] **Google Search Console**: add the property → choose the **HTML tag** method → copy the code into `GOOGLE_SITE_VERIFICATION` → redeploy → verify. Then submit `sitemap.xml` and use **URL Inspection → Request indexing** for the home page and each project.
- [ ] **Bing Webmaster Tools**: import from Search Console (this also feeds ChatGPT search).
- [ ] Add the site link to LinkedIn (Contact info + Featured), your GitHub profile README and bio, your Fiverr description and your Medium bio.
- [ ] For each LinkedIn post, publish the long version here first, then share the link.
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) on the live URL.

## Later: custom domain

1. Buy `hasnainpirzada.com` (Cloudflare Registrar, Namecheap or Porkbun).
2. In Vercel → site project → **Settings → Domains**, add it and create the DNS records Vercel shows you.
3. Change `NEXT_PUBLIC_SITE_URL` to the new domain, add it to the API's `ALLOWED_ORIGINS`, and redeploy both projects.
4. Add the new domain in Search Console and use **Change of Address**.
5. Update the link on LinkedIn, GitHub, Fiverr and Medium.
