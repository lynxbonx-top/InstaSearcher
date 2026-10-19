# FFL Broker Finder MVP

A Netlify-hosted public-profile discovery dashboard. Uses Brave Search API (bring your own key, pricing/quota depend on plan). It does not scrape Instagram directly.

## Deploy
1. Create a Brave Search API key at https://api.search.brave.com/ (check current pricing).
2. Push this folder to a GitHub repository.
3. In Netlify, import that repository. Build command: leave empty; publish directory: `.`.
4. In Netlify Site configuration > Environment variables add `BRAVE_SEARCH_API_KEY` with your key. Redeploy.
5. Open your Netlify URL, enter search terms and click Search.

## Notes
- Results are search-indexed public Instagram URLs; affiliation is NOT verified automatically.
- You can manually enter public business contact details and mark verification status.
- CSV export is local; lead data is stored only in this browser's localStorage (not synced between devices).
- API key stays server-side in the Netlify Function.
- Free Netlify hosting may be sufficient for personal low-volume use, but Brave API may cost money.
- Respect site terms, privacy rules, opt-outs, and outreach regulations.
