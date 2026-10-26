# `src/` Audit — Critical Issues (Ranked)

Scope: files under `src/` on branch `develop` as of 2026-10-26. Ranked from **most** to **least** critical. Each item includes location, impact, and the recommended fix.

---

## P0 — Must fix (security / data integrity)

### 1. `dangerouslyAllowInsecureHttpRequests: true` in both auth configs
**Where:** `src/config/auth-config.ts:34`, `src/config/auth-config.ts:60`
**Impact:** Disables HTTPS validation for the OAuth / B2C token endpoints. A network-level attacker can MITM the sign-in flow, intercept authorization codes and refresh tokens, and impersonate users. This is production auth against Azure AD B2C — HTTPS must be enforced.
**Fix:** Remove the flag (or gate it to `__DEV__` only against a local proxy). All B2C endpoints are `https://` already, so there is no reason this needs to be true in a shipped build.

### 2. Access / refresh tokens stored in `AsyncStorage` (plaintext)
**Where:** `src/config/api/services/http-service.ts:9,28`; `src/modules/auth/login/useLogin.ts:108`; `src/store/store.ts` (redux-persist uses AsyncStorage as the backing store, which includes `auth.token`).
**Impact:** On iOS, AsyncStorage is unencrypted JSON in the app sandbox. On rooted/jailbroken devices or via iTunes backups, tokens are trivially extractable. This is also what the generated Apple privacy manifest warning was about.
**Fix:** Store tokens in `react-native-keychain` (iOS Keychain / Android Keystore). Add a redux-persist transform that strips `token` and `refreshToken` from the persisted auth slice, and hydrate them from Keychain on launch instead.

### 3. Real-looking credentials hardcoded as form defaults
**Where:**
- `src/modules/auth/login/useLogin.ts:30-32` — `email: 'email@email.com'`, `password: 'Matrix123'`
- `src/modules/auth/sign-up/useSignUp.ts:18-22` — `email: 'juansebastianp21@gmail.com'`, `password: 'Matrix-123'`
- `src/modules/auth/forgot-password/new-password/useNewPassword.ts:19-20` — same password
**Impact:** Ships to production builds. Leaks a real-looking contributor email, and users will see pre-filled credentials. If any of these were ever valid against the real B2C tenant, that's a credential disclosure.
**Fix:** Remove all `defaultValues` for email/password/confirm, or gate them behind `if (__DEV__)`.

### 4. ID token payload trusted without signature verification
**Where:** `src/modules/auth/login/useLogin.ts:96-108`; `src/modules/auth/simple-login/useSimpleLogin.ts:23-45`; the `handleDirectSignUp` block in `useLogin.ts:148-188`.
**Impact:** `Buffer.from(base64Url, 'base64').toString('utf8')` → `JSON.parse` extracts `sub`, `emails[0]`, etc., with no signature check. Any attacker who can inject a crafted token (e.g., via a malicious deep link if the redirect URI is ever opened by a hostile app, or an intermediary that returns a tampered response) can set arbitrary user identity in Redux. `react-native-app-auth` validates the issuer handshake, but the ID token itself should be verified before trusting claims.
**Fix:** Verify the ID token's JWS against the B2C JWKS (or at minimum verify `iss`, `aud`, `exp`, `nonce`) before dispatching `setUserData`. Also fix the unsafe `userInfo.emails[0]` access (crashes if `emails` is undefined) — `simple-login` already has `userInfo.emails?.[0]`, mirror that in `login`.

### 5. 48 `console.log` / `console.error` calls shipped in production
**Where:** Across `src/` (grep `console\.` — 48 hits). Several print auth state, e.g. `useLogin.ts:126` `console.log("Auth config", authConfig)` logs the full OAuth config at every sign-in.
**Impact:** `console.log` is preserved in release RN bundles unless stripped by a Babel plugin, which this repo does not have. Logged auth payloads land in `os_log` on iOS and can be read by any attached debugger or crash log collector.
**Fix:** Add `babel-plugin-transform-remove-console` with `exclude: ['error', 'warn']` in `babel.config.js` production env, and audit the remaining `console.error`s to strip tokens.

---

## P1 — High (correctness bugs waiting to happen)

### 6. `authSlice` has no logout, no `sessionExpired`/`accountState` reducers
**Where:** `src/store/slices/auth/authSlice.ts`
**Impact:** `AuthState` declares `sessionExpired`, `accountState`, `error`, `tokenStartDate`, `user.gender`, `user.birthday`, but there's no reducer to update any of them, and no `logout` action. The app can set a user in but cannot clear one — a signed-out user still has `token`/`user` in persisted Redux until the app is reinstalled.
**Fix:** Add `logout` (resets to `initialState` and clears AsyncStorage `token`), `setSessionExpired`, `setAccountState`, and `setProfile`. Call `logout` from a 401 interceptor in `http-service`.

### 7. Dual state stores — `AppContext` duplicates Redux
**Where:** `src/config/api/context/app-context.tsx` defines `User`, `Task`, actions `SET_USER`/`ADD_TASK`/etc.; Redux already owns `auth.user` and the todo module keeps its own task state.
**Impact:** Two sources of truth for the same data. Any screen reading from AppContext will go stale as soon as Redux updates (and vice versa). Future refactors will stomp on each other.
**Fix:** Pick one. Given redux-persist is already wired up, delete `AppContext` and move anything it owned into slices.

### 8. `useFetch`/`usePost` have unstable closures + wrong effect deps
**Where:** `src/config/api/hooks/useFetch.ts:31-35`
**Impact:** `useEffect(() => { if (autoFetch) fetchData(); }, [])` captures `fetchFunction` at mount only. If a caller passes `() => compassService.getUserCompass(fromDate)` where `fromDate` is a prop/state, changes won't re-trigger the fetch. Combined with the ESLint `react-hooks/exhaustive-deps` rule being effectively off (no error in the repo), this will produce subtle "the list isn't refreshing" bugs across every screen using these hooks.
**Fix:** Either (a) accept a dependency array and refetch on change, or (b) replace this with `@tanstack/react-query`, which solves caching, refetch, error state, and abort out of the box.

### 9. `http-service` crashes when the server returns a non-JSON error body
**Where:** `src/config/api/services/http-service.ts:18-21, 39-42`
**Impact:** On a 500 that returns HTML or empty body, `response.json()` throws, and the original HTTP status is lost. The user sees a cryptic parse error instead of a meaningful message.
**Fix:** `const text = await response.text(); let parsed; try { parsed = JSON.parse(text); } catch {} throw new Error(parsed?.message || text || \`HTTP ${response.status}\`);` — and include the status code in the thrown error so callers can branch on 401 vs 500.

### 10. No 401 handling, no timeout, no abort
**Where:** `src/config/api/services/http-service.ts`
**Impact:** Expired tokens produce 401 → generic error toast → user is stuck signed in but every request fails. There's also no `AbortController` passed to `fetch`, so a slow request hangs forever and leaks on unmount.
**Fix:** Centralize fetch in a single helper that (a) retries once after a refresh-token call on 401, then dispatches `logout` if refresh fails, (b) accepts an `AbortSignal`, (c) applies a default timeout (e.g. 15s via `AbortController`).

### 11. Compass data lives only in AsyncStorage, not synced with backend
**Where:** `src/modules/compass/home/useCompass.ts:35-57, 68-97, 100-126`
**Impact:** `compassService.getUserCompass` / `postCompass` exist in `src/config/api/services/compass-service.ts` but the hook ignores them and writes to AsyncStorage directly. Users lose data on reinstall, and multi-device users see divergent state. Recent commit history (`cdae7d2 refactor fetching and posting compass`, `4d997a7 add notes to compass`) suggests this is mid-migration.
**Fix:** Replace the AsyncStorage read/write in `updateVirtue` and `updateVirtueNotes` with `compassService.postCompass`, and use `useFetch(() => compassService.getUserCompass(fromDate), true)` for the initial load.

### 12. Splash screen double-dismiss race
**Where:** `src/App.tsx:14-23`
**Impact:** `showSplash` is set to false by both a 2-second `setTimeout` and the splash's `onAnimationFinished` callback. If animation finishes first, the timer still fires later into a now-unmounted tree → React warning. If timer fires first, `onAnimationFinished` fires into a no-op setter. The timer is also never cleared on unmount.
**Fix:** Pick one trigger. Keep `onAnimationFinished` and delete the `setTimeout` — or keep the timer and clear it in the effect cleanup.

### 13. Redux store has `serializableCheck: false` AND persists `Date` in state
**Where:** `src/store/store.ts:19-21`; `src/utils/types.ts:33` (`creationDate: Date | number`), `src/utils/types.ts:57-62` (`birthday: Date | null`, `tokenStartDate: Date | undefined`).
**Impact:** Disabling the serializable check silences a real bug: `Date` instances don't survive redux-persist's JSON round-trip and come back as strings, so any code calling `.getTime()` on `birthday` after a reload crashes.
**Fix:** Store dates as ISO strings (`string`) in Redux, convert at the UI edge. Re-enable `serializableCheck`.

---

## P2 — Medium (quality & maintainability)

### 14. Weak input validation regexes
**Where:** `src/modules/auth/login/useLogin.ts:35-36`, `src/modules/auth/sign-up/useSignUp.ts:25-26`
- Email regex caps TLD at 4 chars → rejects `.museum`, `.travel`, `.photography`, etc.
- Password regex requires upper + lower + digit but caps length at 32 → prevents passphrases, and no symbol requirement.
**Fix:** Use a well-known email regex or just `/.+@.+\..+/` + server-side validation. Drop the 32-char ceiling (B2C allows up to 64/256).

### 15. 21 `: any` annotations erode the type system
**Where:** grep `: any` across `src/`. Hotspots: `useCompass.ts:60,73,131`, `authSlice.ts` (actions untyped), various `error: any` catches.
**Fix:** For catches, use `error: unknown` + `instanceof Error` narrow. For reducers, use `PayloadAction<T>` from Redux Toolkit. For compass items, introduce a `CompassEntry` type (there's already `src/models/compass/compass.ts`).

### 16. `useEffect` with empty deps across 71 call sites, many likely stale
**Where:** repo-wide. Example: `useCompass.ts:168-173` runs `handledateFilter` once at mount with no cleanup; `useCompass.ts:22-32` keyboard listener is fine but typical pattern elsewhere isn't.
**Fix:** Enable `react-hooks/exhaustive-deps` as an error (not warn) in ESLint and fix the ~20 real violations.

### 17. 71 `useEffect`s but zero test coverage of hooks
**Where:** Only `authSlice.test.ts` exists in the whole repo (`find src -name "*.test.*"`).
**Impact:** All the business logic in `useCompass`, `useLogin`, `useDashboard`, `useTodoHome`, etc. has no safety net. The auth / navigation flow is where regressions hurt most.
**Fix:** Add integration tests for `useLogin.onSubmit` (mock `authorize`) and for `compassService` with MSW.

### 18. `redux-persist` persists everything in `root` with no whitelist/blacklist
**Where:** `src/store/store.ts:6-9`
**Impact:** Future slices get auto-persisted whether they should be or not. Transient UI state ends up on disk.
**Fix:** Add `whitelist: ['auth']` to `persistConfig`.

### 19. Mock API still wired in parallel with real auth
**Where:** `src/utils/api/mock-api-call.ts` (unused but imported in `useLogin.ts:7`), `src/consts/mock-data.ts` referenced by it.
**Impact:** Dead code and a `jwtMockData` constant that could be revived by mistake. The commented-out mock login block in `useLogin.ts:66-85` adds confusion.
**Fix:** Delete the mock import, delete the commented code, delete `mock-api-call.ts` if nothing uses it.

### 20. Navigation screen keyed by `Date.now()`
**Where:** `src/modules/auth/login/useLogin.ts:62`, `useSignUp.ts:51,59` — `key: \`auth-${Date.now()}\``
**Impact:** Forces a fresh navigator entry per click; back-stack grows, memory leaks, and gestures (swipe-back) don't work as expected.
**Fix:** Remove the `key` and use `navigation.replace` or `reset` where you need to drop the back stack.

### 21. `useExpoModules`/`post_install` warning: hermes added a script phase
**Where:** iOS Pods warning (not strictly `src/`, but relevant to the stack).
**Fix:** Review `hermes-engine` script phase in Xcode and leave it as-is if it just copies dSYMs; worth a glance during next pod install.

---

## P3 — Low (hygiene & nits)

### 22. Typos in directory / file names
- `src/modules/auth/onboarbing/` → should be `onboarding/`
- `src/modules/todo/incomplete/useTodoIcomplete.ts` → `useTodoIncomplete.ts`
- `src/modules/profile/profile-edit/style.ts` next to `styles.ts` (two files in the same folder, inconsistent plural)
- `Scultpted` (project / workspace name) → `Sculpted` — too late to rename cheaply, flagged for awareness.

### 23. Dead / commented-out code
- `useLogin.ts:66-85` — stale mock login block
- `useSimpleLogin.ts:104, 123` — commented `Linking.openURL` calls
- `useFetch.ts:5` — comment-doc describing a param that's inline anyway
**Fix:** Delete.

### 24. `response_mode: 'query'` on OAuth config
**Where:** `src/config/auth-config.ts:29, 55`
**Impact:** `query` leaks the auth code into deep-link URLs that may be logged by the OS. B2C with PKCE should prefer `fragment` or `form_post`.
**Fix:** Switch to `fragment` (or drop the field — library default is fine).

### 25. `MainWrapper` + wrapper styles duplicated per screen
**Where:** every module has its own `index.styles.ts` with near-identical padding/background values.
**Fix:** Hoist shared spacing tokens into `@theme` and reuse.

### 26. `App.tsx` ordering — `AppProvider` wraps `ReduxProvider`
**Where:** `src/App.tsx:27-37`
**Impact:** Minor — AppProvider doesn't depend on Redux so it's fine, but once removed (see P1 #7) this cleans up.

---

## Suggested fix order

1. P0 #1 (flip `dangerouslyAllowInsecureHttpRequests`) and #3 (strip default creds) — single-line changes, highest return.
2. P0 #5 (strip console logs) via Babel plugin — ten-minute change, protects every subsequent commit.
3. P0 #2 (Keychain migration) — a day's work; blocks any App Store release that handles PHI/health data.
4. P1 #6 + #10 (logout + 401 handler) — enables real session management, required before #11.
5. P1 #11 (wire compass to backend) — unblocks multi-device.
6. P1 #8/#13 (hook deps + Date-in-Redux) — fixes a class of bugs across the app.
7. P2 everything.
8. P3 cleanup.
