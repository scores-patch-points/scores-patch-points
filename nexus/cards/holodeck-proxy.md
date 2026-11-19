### holodeck-proxy — no-record web gateway
*pkg `holodeck-proxy` · `scores-patch-points/holodeck-proxy`*

- **Does:** a Cloudflare Worker giving static pages the three things a browser
  cannot do alone — `GET /raw?url=` (fetch + CORS), `GET /search?scope=web|news|
  youtube&q=` (JSON results), `GET /yt?v=` (title, description, caption
  transcript).
- **Doesn't include:** any storage or logs (it stores nothing, writes none); a
  search index of its own (it reads DuckDuckGo/Brave).
- **Finds at:** `README.md`; `src/`; `wrangler.toml`.
