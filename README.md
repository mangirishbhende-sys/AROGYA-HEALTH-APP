# Arogya Saathi

An AI health companion for adults over 60. Instead of filling in forms, the person speaks or types what they did ("had poi with bhaji, two glasses of water, walked to the temple for 20 minutes"). Google Gemini turns that into a health log and gives short, safe tips.

## Features
- **Voice and text logging** in English, Hindi, Marathi and Konkani
- **Scan my plate**: photo-based calorie estimates for Goan and Indian home food, with an edit-and-confirm step
- **Saathi's suggestion**: a daily check-in based on the last 7 days
- **Coach**: short answers personalised to the person's profile and today's numbers
- **Insights**: 7-day charts for water, activity and sleep, plus a weekly note for family
- **Family and safety**: one-tap SOS to the caretaker or 112, and a WhatsApp daily update
- **Medicine checklist**, large-text mode, light and dark themes
- Installs on a phone like an app and works offline for basic logging
- **Save online**: sign in with **Clerk** (email or Google) and the health log is stored in **Supabase**, protected so each person can only see their own data

## Tech
Static web app (HTML/CSS/JS, no build step) hosted on **Vercel** · **Google Gemini** for AI · **Clerk** for sign-in · **Supabase** (Postgres with row-level security) for storage. Cloud keys live in `config.js` (publishable keys only).

## Run it
Open the GitHub Pages link in Chrome, then go to **Profile → AI connection** and paste a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey). To install it, use Chrome's menu → **Install app**.

Data stays on the device (browser storage). Only what the person sends to Saathi goes to Gemini.

See [SETUP-GUIDE.md](SETUP-GUIDE.md) for step-by-step setup and how the app maps to the class brief.

*Arogya Saathi is a health companion, not a medical device.*
