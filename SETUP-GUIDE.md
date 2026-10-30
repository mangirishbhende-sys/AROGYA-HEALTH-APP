# Arogya Saathi — Setup Guide (no coding needed)

Arogya Saathi is a simple AI health companion for **adults over 60**. Instead of filling forms, the person just **speaks or types what they did** ("had poi with bhaji, two glasses of water, walked to the temple for 20 minutes") and the AI turns it into a health log, gives a short tip, and writes a daily check-in on its own.

**Files in the app folder:** `index.html` (the app), `manifest.webmanifest` + `sw.js` (these let it install on a phone with its own icon and work offline), and the `icons` folder. Upload **all of them** together.

---

## Step 1 — Get a free Gemini API key (5 min)

1. Open **https://aistudio.google.com** and sign in with your Google account.
2. Click **Get API key** → **Create API key**.
3. Copy the key (it starts with `AIza…`). Keep it private — don't put it in your report or on GitHub.

## Step 2 — Put the app online with GitHub Pages (10 min)

1. Sign in at **https://github.com**.
2. Click **+** (top right) → **New repository**. Name it `arogya-saathi`, choose **Public**, tick **Add a README**, click **Create repository**.
3. In the repository click **Add file → Upload files**. Open your `Arogya-Saathi` folder, select **everything inside it** (`index.html`, `manifest.webmanifest`, `sw.js` and the `icons` folder) and drag it all in. Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, click **Save**.
5. Wait 1–2 minutes and refresh. Your link appears at the top:
   `https://<your-github-username>.github.io/arogya-saathi/`

## Step 3 — Install it on a phone like a real app

1. Open the link in **Chrome** on an Android phone (voice input works best in Chrome).
2. Chrome menu (⋮) → **Install app** (or **Add to Home screen**). The **Saathi** icon appears on the home screen and the app opens full screen with no browser bar, like any Play Store app. On a laptop, Chrome shows an install icon in the address bar.
3. Fill in the profile (or tap the 🎤 and say it), paste the Gemini key under **AI connection**, tap **Test connection**, then **Get started**.

**For your demo:** on the welcome screen tap **Just exploring? Load a sample week** (or Profile → **Load a sample week**). It adds 6 days of realistic data so the Insights charts, weekly family note and AI suggestion have something to show.

**Want a real .apk file too?** Go to **https://www.pwabuilder.com**, paste your GitHub Pages link, click **Package for stores → Android**, and download. It turns this same app into an installable Android APK.

> Tip: you can also double-click `index.html` on your laptop to preview it, but the install and offline features only work from the online link.

---

## What the app does

| Screen | What it does | Where AI does the work |
|---|---|---|
| **Home** | Progress rings, voice/text "How is your day going?" box, scan-my-plate, metric tiles, medicine checklist, today's log | AI turns free speech (any of English/Hindi/Marathi/Konkani) into meals, water, activity, sleep, symptoms; estimates calories for Goan/Indian food; flags danger signs |
| **Saathi's suggestion** | Proactive daily check-in at the top of Home | AI reads the last 7 days and suggests **one** small action — the app acts first, without being asked |
| **Centre mic button** | One tap from any screen to speak to Saathi | Same voice understanding as above |
| **Coach** | Short-answer chat (max 3 sentences) | Answers are personal to profile, conditions and today's numbers |
| **Insights** | 7-day charts for water / activity / sleep with average, best day, goal met + weekly family note | AI writes the family note; WhatsApp share |
| **Family** | Call caretaker / 112 / doctor, send today's summary on WhatsApp | — |
| **SOS** | Top of every screen: calls caretaker (or 112) | — |
| **Profile** | Details, goals, contacts, language, large text, AI key, backup | AI fills the profile from one spoken sentence |

Works **without internet or AI** too: water/walk buttons, medicine ticks and simple sentence understanding still work; AI features return when online.

---

## Mapping to the class notes (for your report)

**Customer chosen:** an older parent, 60+ (Session 2, group 2).

**Features kept (things this customer would miss):**
- F02 Profile & goals — filled by **voice** (AI extracts the fields)
- F01 Food photo → calories — with an **editable confirm step** (fixes D06/D11)
- F03 Activity — gentle activity only (walks, yoga, temple, market)
- F04 Water target (calorie-deficit diet dropped — not right for most 60+ users)
- F08 AI coach — short answers, voice in & read-aloud out
- F10 Reports — weekly family note
- F15/F16 Emergency — one-tap caretaker / 112, plus AI danger-sign alert
- F17 Guardian access — done as **WhatsApp sharing the user controls**, not a login

**Features dropped:** F05 product upsells, F07 challenge videos, F09 catch-up planning, F11 wearables, F12 tiers, F13 consultations, F14 community, F18 friend competitions — they add complexity (H1) and cost (D04) and a 60+ user wouldn't miss them.

**Added (not in the list):** daily **medicine checklist** — a real need for this age group.

**Concerns answered:**
- D01/D02 — 5 screens, one main action (the mic), large text option, light and dark mode
- D03 — solved by picking 60+
- D04 — free Gemini tier + free GitHub Pages hosting = ₹0
- D05 — no wearables
- D06/D11 — user confirms/edits photo results; prompts are tuned for Goan dishes
- D07 — data stays on the phone (localStorage); only the message is sent to Gemini; backup excludes the API key. Note: Google's free tier may use inputs to improve models — stated in the app
- D08 — installs on the phone and works offline for basic logging
- D09 — no avatars of real people
- D10 — no server, so each phone runs its own copy
- H4 (too wordy) — every AI prompt caps replies at 2–3 short sentences

**Faculty critique answered:** AI is the core — it takes unstructured voice input and *does the work* (logging, calorie estimates, check-ins, family reports), and the app is **proactive** (Health Agent), not just a chatbot.

---

## Known limits (be honest about these in your report)
- Calorie estimates from photos are approximate.
- Voice for Konkani uses the Marathi recogniser.
- Data lives on one phone; clearing browser data deletes it (use **Download backup**).
- Not a medical device; it never gives diagnoses or medicine doses.
