# Phase 4 test checklist: app connected to the API

Tick each box as you go. If something doesn't match **Expected**, note the
test number, the device (iOS / Android), and what you saw instead.

Login is currently a **test login** (no Azure). Everyone who logs in is the
same test user, so run these tests one person at a time.

---

## 0. Setup (once per session)

- [ ] **Port 3000 is free.** Stop any other dev server using it (e.g. the
      `puphomweb` Nuxt server). Check with `lsof -iTCP:3000 -sTCP:LISTEN`; it
      should list nothing.
- [ ] **API running.** In `sculpted-api`: `npm run dev`. Opening
      http://localhost:3000/api/health in a browser shows `{"status":"ok"}`.
      Keep this terminal visible: every request the app makes appears there.
- [ ] **`DEV_AUTH_BYPASS=true`** is in `sculpted-api/.env.local`.
- [ ] **App `.env`** has the right `BACKEND_BASE_URL`:
  - iOS simulator: `http://localhost:3000/api`
  - Android emulator: `http://10.0.2.2:3000/api`
- [ ] **App running.** In `sculpted-app`: `yarn start --reset-cache`, then
      `yarn ios` or `yarn android` in a second terminal.

**Seeing the database directly** (optional, for checks marked 🗄️): Neon
console → project *Sculpted App* → branch **dev-schema** → SQL Editor:

```sql
select u.id, c.entry_date, c.virtue1, c.virtue1_score, c.overall_score
from users u left join compass_entries c on c.user_id = u.id
where u.b2c_sub = 'dev-user'
order by c.entry_date;
```

---

## 1. Log in

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 1.1 | Tap **Log in** | Goes straight to the dashboard, no Azure page | [ ] | [ ] |
| 1.2 | Watch the API terminal | `GET /api/compass ... 200` appears (not 401) | [ ] | [ ] |
| 1.3 | Close the app fully and reopen | Still logged in | [ ] | [ ] |

## 2. Sign up and onboarding (choosing 3 virtues)

Start from a fresh account: if today already has an entry, do **6.1 Delete
account** first.

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 2.1 | Tap **Sign up** | Onboarding: pick your virtues | [ ] | [ ] |
| 2.2 | Pick only 2 virtues, tap continue | Message asks for exactly 3; stays on screen | [ ] | [ ] |
| 2.3 | Pick 3, tap continue | Goes to the reminder step. API terminal: `POST /api/compass 200` | [ ] | [ ] |
| 2.4 | Tap continue **twice quickly** in 2.3 (retest on a fresh account) | Only **one** `POST /api/compass` | [ ] | [ ] |
| 2.5 | Finish onboarding | Dashboard shows the 3 virtues you picked, scores 0 | [ ] | [ ] |
| 2.6 | Go through onboarding again the same day | "You have already selected 3 virtues for today." Scores are **not** reset | [ ] | [ ] |
| 2.7 | 🗄️ Run the SQL above | One row for today with your 3 virtues | [ ] | [ ] |

## 3. Compass scoring

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 3.1 | Open **Compass**, tap **+** on a virtue | Number goes up instantly | [ ] | [ ] |
| 3.2 | Tap **+** 5 times quickly, then wait | About 1 second after the last tap, **one** `POST /api/compass` in the API terminal (not 5) | [ ] | [ ] |
| 3.3 | Tap **+** past 10 | Stops at 10 | [ ] | [ ] |
| 3.4 | Tap **−** past 0 | Stops at 0 | [ ] | [ ] |
| 3.5 | Change a score, then **immediately** go back | `POST /api/compass` still appears (saved on leaving) | [ ] | [ ] |
| 3.6 | Return to the dashboard | Shows the new scores | [ ] | [ ] |
| 3.7 | Add a note to a virtue, leave, reopen Compass | Note is still there | [ ] | [ ] |
| 3.8 | Close the app fully, reopen, open Compass | Scores and notes are still there (they came from the server) | [ ] | [ ] |
| 3.9 | Tap a **past day** in the day picker | That day's entry shows (or nothing if none); +/− are disabled | [ ] | [ ] |
| 3.10 | 🗄️ Run the SQL | `overall_score` = (sum of 3 scores ÷ 30 × 100), rounded down. E.g. 8+7+9 → 80 | [ ] | [ ] |

## 4. No connection and server problems

Simulate the server being down by stopping the API (Ctrl+C in its terminal).
Restart it with `npm run dev` after each test.

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 4.1 | API stopped → change a compass score, wait 2 s | Red message *"Couldn't save your changes."* App doesn't crash or freeze | [ ] | [ ] |
| 4.2 | Restart API, reopen Compass | Shows what the **server** has (the failed change is gone, which is expected) | [ ] | [ ] |
| 4.3 | API stopped → open the dashboard | Keeps showing the last loaded data; no crash | [ ] | [ ] |
| 4.4 | API stopped → onboarding, pick 3, continue | Red error message; stays on the screen | [ ] | [ ] |
| 4.5 | API stopped → Profile → Delete account → confirm | *"Couldn't delete your account. Nothing was deleted."* You stay logged in | [ ] | [ ] |

## 5. Upgrading from the old app (moving phone data to the server)

Only possible if you have an **older build** that saved the compass on the
phone (before this change). Install the old build, score a few days, then
install the new build **over it**. Don't uninstall, which would wipe the old data.

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 5.1 | Open the new build and log in | Dashboard shows the old entries. API terminal: one `GET` then one `POST /api/compass` per old day | [ ] | [ ] |
| 5.2 | Close and reopen the app | **No** more uploads (already moved) | [ ] | [ ] |
| 5.3 | Repeat 5.1 with the API stopped, then restart it and reopen the app | First attempt silently fails; second attempt uploads everything | [ ] | [ ] |

## 6. Sign out and delete account

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 6.1 | Profile → **Sign out** → Cancel | Nothing happens; still logged in | [ ] | [ ] |
| 6.2 | Profile → **Sign out** → Sign out | Login screen | [ ] | [ ] |
| 6.3 | After 6.2, swipe back / press Android back | Does **not** return into the app | [ ] | [ ] |
| 6.4 | Log in again | Today's compass is still there (sign-out keeps server data) | [ ] | [ ] |
| 6.5 | Profile → **Delete account** → Cancel | Nothing happens | [ ] | [ ] |
| 6.6 | Profile → **Delete account** → Delete Account | Login screen. API terminal: `DELETE /api/me 204` | [ ] | [ ] |
| 6.7 | Log in again | Empty dashboard (a brand-new account) | [ ] | [ ] |
| 6.8 | 🗄️ Run the SQL | Only the new account, with no old entries | [ ] | [ ] |

## 7. To-do list

| # | Do this | Expected | iOS | Android |
|---|---|---|---|---|
| 7.1 | Open **To-do** on a new account | Empty lists, counts 0, progress 0% (not "NaN") | [ ] | [ ] |
| 7.2 | **Task list** → add a task with title and description → save | Appears in the list. API terminal: `POST /api/tasks 201` | [ ] | [ ] |
| 7.3 | Try saving with an empty title or description | "Title and description can't be empty"; nothing sent | [ ] | [ ] |
| 7.4 | Tick the task done | Ticks instantly. `PATCH /api/tasks/… 200` | [ ] | [ ] |
| 7.5 | Go back to **To-do home** and the **dashboard** | Counts and today's progress reflect the tick (all screens agree) | [ ] | [ ] |
| 7.6 | API stopped → tick a task | Ticks, then un-ticks with *"Couldn't save your changes."* | [ ] | [ ] |
| 7.7 | API stopped → add a task → save | Error message; what you typed is kept so you can retry | [ ] | [ ] |
| 7.8 | Swipe a task to delete it | Disappears. `DELETE /api/tasks/… 204` | [ ] | [ ] |
| 7.9 | Select several tasks → delete → confirm | All selected tasks on that day disappear | [ ] | [ ] |
| 7.10 | **Scheduled** → pick a future day → add a task | Shows under that day, and in the **Journal**'s tomorrow list if it's tomorrow | [ ] | [ ] |
| 7.11 | Leave a task unticked → open **Incomplete** | It's listed; tick it there and it disappears from Incomplete | [ ] | [ ] |
| 7.12 | Close the app fully and reopen | All tasks are still there (they came from the server) | [ ] | [ ] |
| 7.13 | Sign out, log in again | Same tasks come back | [ ] | [ ] |

---

## Known issues (don't report these)

- **Login is fake.** Real Azure sign-in, sign-up, password reset and token
  refresh can't be tested until Azure is set up.
- **"Deactivate Account" does nothing.** Waiting on a product decision.
- **Session expiry stays on the current screen.** If the server rejects the
  login, data is cleared but the app doesn't jump to the login screen.
- **Tasks can't be edited after saving.** Only add, tick, and delete exist in
  the app today.
- **Profile shows fixed values** ("Male", "15/09/2004", "@Username") and the
  journal reminder is stored only on the phone.
