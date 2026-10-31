# Dempo Saathi

**Mangirish Sadashiv Bhende** · Roll No. **✏️[roll number]** · MAI-594 Introduction to Vibe Coding · AY 2026–27

> **A voice-first AI health companion for adults over 60 in Goa. They tell it about their day in their own language, and it keeps track of meals, water, walks, medicines and BP or sugar readings, warns them when something needs a doctor, and keeps their family in the loop.**

- **Live app:** https://arogya-health-app-five.vercel.app (opens with no sign-up: choose **Try it without an account**)
- **Report:** [REPORT.md](REPORT.md)

Tip for a quick look: after setup, open **Settings → Load a sample week** to fill every screen with made-up data.

*Not medical advice. Dempo Saathi does not diagnose or prescribe, and tells the user to contact a doctor or call 112 for red-flag symptoms. This is a student project at Srinivassa Sinai Dempo College, not an official college service.*

## How it is built

- Plain HTML, CSS and JavaScript (`index.html`, `app.css`, `app.js`), hosted on **Vercel**, installable as a phone app (`manifest.webmanifest`, `sw.js`).
- **AI:** Google Gemini, called through a Vercel serverless function (`api/ai.js`). The key is stored only in Vercel's environment variables.
- **Optional sign-in:** Clerk. **Optional cloud storage:** Supabase (Postgres with row-level security; each user can read only their own rows). `config.js` holds publishable keys only.
- **Data:** stays on the device (browser storage) unless the user signs in.

## Credits

- **Google Gemini API** (AI), **Clerk** (sign-in), **Supabase** and `@supabase/supabase-js` (storage), **Vercel** (hosting).
- Fonts: **Manrope** and **Atkinson Hyperlegible** (Braille Institute) via Google Fonts, under the SIL Open Font License.
- Icons: drawn for this project as inline SVG, in the style of Lucide (ISC licence).
- Logo: Srinivassa Sinai Dempo College emblem © Dempo Charities Trust, used for this college project only.
- Health ranges: 2017 ACC/AHA blood pressure guideline; American Diabetes Association Standards of Care.
- Code written with the help of Claude (Anthropic). See the AI-use disclosure in the report.
- All health data in the app and screenshots is made up.
