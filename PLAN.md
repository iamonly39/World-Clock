# Auth0 Integration Plan — World Clock

## Current State

- Vanilla HTML/CSS/JS app (no framework, no build tool, no backend)
- User preferences (selected cities, theme) stored in `localStorage`
- Served as static files (GitHub Pages)

## Goal

Add Auth0 authentication so users can optionally log in and have their clock
preferences synced across devices/browsers.

---

## Auth0 — Pros and Cons

### Pros

| Benefit | Detail |
|---------|--------|
| **No password management** | Auth0 handles hashing, storage, reset flows, brute-force protection |
| **Social login** | Google, GitHub, Apple sign-in with a toggle — no extra code |
| **MFA** | Enable multi-factor auth from the dashboard, zero code changes |
| **Standards-based** | Uses OAuth 2.0 / OIDC — portable knowledge, easy to swap later |
| **Free tier** | 7,500 MAU — more than enough for a personal/demo app |
| **SPA SDK** | `@auth0/auth0-spa-js` works with vanilla JS — no React/Vue required |
| **Security** | Token rotation, PKCE flow, XSS-safe token storage handled for you |

### Cons

| Drawback | Detail |
|----------|--------|
| **External dependency** | App login breaks if Auth0 is down |
| **Adds complexity** | Need an Auth0 tenant, callback URLs, env config for a previously zero-config app |
| **Requires a backend** | To persist per-user preferences across devices, we need a small API + database — the app currently has neither |
| **Redirect-based UX** | Login redirects to Auth0's Universal Login page and back; feels heavier than an inline form for a simple app |
| **Cost at scale** | Free for 7,500 MAU; paid plans start ~$35/mo beyond that |
| **Less control** | Customizing login UI, email templates, or token claims requires Auth0 dashboard/Actions |
| **Latency** | Auth requests round-trip to Auth0's servers |

---

## Implementation Plan

### Phase 1 — Auth0 SPA Setup (client-only)

1. **Create Auth0 tenant & SPA application**
   - Register `http://localhost` and GitHub Pages URL as allowed callback/logout URLs
   - Note down Domain, Client ID, Audience

2. **Add Auth0 SPA SDK**
   - Load `@auth0/auth0-spa-js` via CDN (`<script>` tag) — no build step needed
   - Create `auth.js` module:
     - `initAuth0()` — initialize the Auth0 client with domain/clientId/audience
     - `login()` — call `auth0Client.loginWithRedirect()`
     - `logout()` — call `auth0Client.logout()`
     - `handleRedirectCallback()` — process the callback on page load
     - `getUser()` — return the logged-in user profile
     - `isAuthenticated()` — return auth state
     - `getToken()` — get access token for API calls

3. **Update `index.html`**
   - Add Login / Logout button to header (next to theme toggle)
   - Add `<script src="auth.js">` before `app.js`

4. **Update `app.js`**
   - On init: check `isAuthenticated()`; if logged in, show user name/avatar in header
   - Clock functionality remains unchanged and works without login (guest mode)

### Phase 2 — Backend API for Preference Sync

5. **Create lightweight backend** (`server/`)
   - `server/index.js` — Express server
   - `server/middleware/auth.js` — validate Auth0 JWT using `express-oauth2-jwt-bearer`
   - `server/routes/preferences.js`:
     - `GET /api/preferences` — return saved cities for authenticated user
     - `PUT /api/preferences` — save cities for authenticated user
   - Storage: SQLite via `better-sqlite3` (zero-config, single file, no DB server)

6. **Wire client to backend**
   - When logged in: load preferences from API instead of `localStorage`
   - On add/remove clock: save to API (with `localStorage` as fallback)
   - When logged out: continue using `localStorage` only (guest mode)

### Phase 3 — Polish

7. **Sync indicator** — show a small cloud icon when preferences are synced
8. **Merge conflict handling** — if local and remote preferences differ on first login, prompt user to pick which set to keep
9. **Update README** with auth setup instructions and new env vars

---

## New Files

```
auth.js                     # Auth0 SPA client wrapper
server/
  package.json              # Express + express-oauth2-jwt-bearer + better-sqlite3
  index.js                  # Express server entry point
  middleware/auth.js         # JWT validation middleware
  routes/preferences.js     # GET/PUT /api/preferences
  data/                     # SQLite database file (gitignored)
```

## Modified Files

```
index.html                  # Add Auth0 SDK script, login/logout button
app.js                      # Check auth state on init, sync preferences when logged in
style.css                   # Login button styles, sync indicator
steampunk.css               # Login button steampunk variant
README.md                   # Auth setup docs
```

## Environment / Config

```
# Used by auth.js (client-side, hardcoded or injected at deploy time)
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_AUDIENCE=https://world-clock-api

# Used by server
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://world-clock-api
PORT=3001
```

## Dependencies

| Package | Purpose | Where |
|---------|---------|-------|
| `@auth0/auth0-spa-js` | SPA auth SDK | Client (CDN) |
| `express` | HTTP server | Server |
| `express-oauth2-jwt-bearer` | JWT validation | Server |
| `better-sqlite3` | Preference storage | Server |
| `cors` | Allow cross-origin from frontend | Server |

---

## Key Decisions

- **Guest mode preserved** — the app works without login, just like today
- **No build tooling** — Auth0 SDK loaded via CDN to keep the zero-build-step simplicity
- **SQLite over MongoDB/Postgres** — single-file DB, no external service, perfect for this scale
- **Preferences only** — Auth0 gates preference sync, not clock viewing (no paywall)
