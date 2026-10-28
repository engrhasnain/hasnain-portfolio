// Tell Bing (and the other IndexNow search engines) that pages changed, so they recrawl them within hours.
// Run after a deploy:   node scripts/indexnow.mjs            (every URL in the live sitemap)
//                       node scripts/indexnow.mjs /blog/x    (only these paths)
// The key is public by design: search engines check it at https://<site>/<key>.txt (frontend/public).
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://hasnainpirzada.vercel.app").replace(/\/+$/, "");
const KEY = "876b992a76dffdd44fecf3e040d45e43";

const paths = process.argv.slice(2);
let urls = paths.map((p) => `${SITE}${p.startsWith("/") ? p : `/${p}`}`);
if (urls.length === 0) {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (!res.ok) console.log(await res.text());
