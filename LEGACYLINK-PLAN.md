# Auth0 Integration Plan — LegacyLink

## Current State

- **Server:** Express + MongoDB + Mongoose, with manual JWT auth (bcryptjs + jsonwebtoken)
- **Client:** Not yet scaffolded (React + Vite planned per README)
- **Auth flow:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **User model:** name, email, password (bcrypt-hashed), headline, industry

---

## Auth0 — Pros and Cons

### Pros

| Benefit | Detail |
|---------|--------|
| **No password management** | Eliminates bcrypt hashing, password reset flows, brute-force protection — Auth0 handles all of it |
| **Social login** | Google, GitHub, Apple sign-in with a dashboard toggle — no extra code |
| **MFA** | Enable multi-factor auth from the Auth0 dashboard, zero code changes |
| **Standards-based** | OAuth 2.0 / OIDC — portable knowledge, easy to swap providers later |
| **Free tier** | 7,500 MAU — plenty for a family app |
| **Security** | PKCE flow, token rotation, XSS-safe token storage, rate limiting — all handled |
| **Email verification** | Built-in email verification and password reset without writing SMTP logic |
| **Compliance** | SOC2, GDPR-ready — important if the app grows beyond one family |

### Cons

| Drawback | Detail |
|----------|--------|
| **External dependency** | Login breaks if Auth0's service is down |
| **Redirect-based UX** | Universal Login redirects away from the app; feels heavier than an inline form |
| **Less control** | Customizing login UI, email templates, or token claims requires Auth0 dashboard / Actions |
| **Cost at scale** | Free for 7,500 MAU; paid plans start ~$35/mo |
| **Setup overhead** | Need Auth0 tenant, callback URLs, API audience config — more moving parts than the current bcrypt+JWT approach |
| **Latency** | Auth requests round-trip to Auth0's servers rather than staying local |
| **Vendor lock-in** | User identities live in Auth0; migrating away requires exporting users or re-registering them |

---

## Implementation Plan

### Phase 1 — Server: Replace JWT auth with Auth0 token validation

#### Step 1: Update dependencies

- **Remove:** `bcryptjs`, `jsonwebtoken`
- **Add:** `express-oauth2-jwt-bearer`

#### Step 2: Update User model (`server/src/models/User.js`)

- Remove `password` field (no longer stored)
- Remove `required: true` from password
- Add `auth0Id` field (String, unique, required) — links Auth0 identity to local user
- Remove `pre('save')` bcrypt hook
- Remove `comparePassword` method

New schema:
```js
{
  auth0Id:  { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  headline: { type: String, default: '' },
  industry: { type: String, default: '' },
}
```

#### Step 3: Replace auth middleware (`server/src/middleware/auth.js`)

- Replace manual `jwt.verify()` with `auth()` from `express-oauth2-jwt-bearer`
- After token validation, look up User by `auth0Id` (from `req.auth.sub`) and attach to `req.user`
- If no User exists yet, return 401 (user must call setup-profile first)

#### Step 4: Rewrite auth routes (`server/src/routes/auth.js`)

- **Remove:** `POST /register`, `POST /login` (Auth0 handles these)
- **Add:** `POST /api/auth/setup-profile` (protected)
  - Called after first Auth0 login
  - Receives `{ name, headline, industry }` in body
  - Creates User with `auth0Id` from `req.auth.sub` and `email` from `req.auth` claims
  - Returns user object
- **Keep:** `GET /api/auth/me` (protected) — returns current user profile

#### Step 5: Update `.env.example`

```
MONGODB_URI=mongodb://localhost:27017/legacylink
PORT=5000
AUTH0_AUDIENCE=https://legacylink-api
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
```

Remove `JWT_SECRET`.

### Phase 2 — Client: Scaffold React app with Auth0

#### Step 6: Scaffold Vite + React app (`client/`)

```
client/
  src/
    main.jsx                 # Auth0Provider wraps App
    App.jsx                  # Router, layout
    api/axios.js             # Axios instance with Auth0 token interceptor
    components/
      Navbar.jsx             # Login/Logout button via useAuth0()
      PrivateRoute.jsx       # Redirects to login if !isAuthenticated
    pages/
      ProfileSetupPage.jsx   # First-login: set name, headline, industry
      FeedPage.jsx           # Social feed (posts + comments)
      WikiListPage.jsx       # Wiki page list
      WikiViewPage.jsx       # View single wiki page
      WikiEditorPage.jsx     # Edit wiki page
    context/
      UserContext.jsx         # Stores local user profile (from GET /api/auth/me)
```

#### Step 7: Auth0 integration in client

- Install `@auth0/auth0-react`
- Wrap `<App />` in `<Auth0Provider>` with domain, clientId, audience, redirectUri
- `axios.js` interceptor: call `getAccessTokenSilently()` and attach as `Authorization: Bearer <token>`
- `PrivateRoute`: check `isAuthenticated` from `useAuth0()`; redirect to Auth0 login if not
- `Navbar`: show Login/Logout button based on auth state; show user name/avatar when logged in

#### Step 8: Profile setup flow

- After Auth0 redirect callback, check if user exists via `GET /api/auth/me`
- If 401 (no profile yet), redirect to `ProfileSetupPage`
- `ProfileSetupPage` calls `POST /api/auth/setup-profile` with name/headline/industry
- After setup, redirect to FeedPage

### Phase 3 — Cleanup and docs

#### Step 9: Update README.md

- Document Auth0 tenant setup instructions
- Update "Getting Started" with new env vars
- Remove references to manual JWT auth

#### Step 10: Update `.gitignore`

- Ensure `.env` is ignored (already is)
- Add `client/node_modules/`, `client/dist/`

---

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `server/package.json` | Modify | Remove bcryptjs/jsonwebtoken, add express-oauth2-jwt-bearer |
| `server/src/models/User.js` | Modify | Remove password field/hooks, add auth0Id |
| `server/src/middleware/auth.js` | Rewrite | Auth0 JWT validation via express-oauth2-jwt-bearer |
| `server/src/routes/auth.js` | Rewrite | Remove register/login, add setup-profile |
| `server/.env.example` | Modify | Replace JWT_SECRET with Auth0 vars |
| `server/src/index.js` | Minor | No changes needed (routes stay at same paths) |
| `client/` | New | Entire React + Vite app with Auth0 |
| `README.md` | Modify | Auth0 setup instructions |
| `.gitignore` | Modify | Add client build artifacts |

## New Dependencies

| Package | Where | Purpose |
|---------|-------|---------|
| `express-oauth2-jwt-bearer` | Server | Validate Auth0 JWTs |
| `react` | Client | UI framework |
| `react-dom` | Client | React DOM rendering |
| `react-router-dom` | Client | Client-side routing |
| `@auth0/auth0-react` | Client | Auth0 React SDK |
| `axios` | Client | HTTP client |
| `vite` | Client | Build tool |
| `@vitejs/plugin-react` | Client | Vite React plugin |

## Environment Variables

```env
# Server (.env)
MONGODB_URI=mongodb://localhost:27017/legacylink
PORT=5000
AUTH0_AUDIENCE=https://legacylink-api
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com

# Client (.env)
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://legacylink-api
VITE_API_URL=http://localhost:5000
```
