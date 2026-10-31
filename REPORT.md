# Report: Dempo Saathi

**Mangirish Sadashiv Bhende · Roll No.PGDMAI-25-04.

MAI-594 Introduction to Vibe Coding · PGDM (AI²) · AY 2026–27 · Live app: https://arogya-health-app-five.vercel.app

> **✏️ Before you submit:** search this file for ✏️ and fill in those parts. They are things only you can supply: your roll number, the three people you spoke to, and your user test. Then delete this line.

---

## Q1. Why do health apps fail?

**What I looked at**

- **Low-rated reviews:** 44 one- and two-star reviews across two popular apps, read in full and coded by main complaint. These were 38 unique reviews of **HealthifyMe** (Trustpilot, pages 2 and 4, Oct 2024 to Sep 2026) and 6 of **MyFitnessPal** (Trustpilot, Oct 2026). The tally is in the table below.
- **Published sources:**
  - Krebs & Duncan (2015): a national survey of 1,604 US mobile phone owners.
  - Pan, Dong & Bryan-Kinns (2021): a mixed-methods study of adults aged 50–70 trying health apps.
  - Industry retention data (Business of Apps, using Adjust and AppsFlyer, 2023).
- **People who tried a health app and stopped:** three interviews, summarised below. ✏️

**What the 44 reviews complained about (main complaint, one per review)**

| Theme | HealthifyMe (38) | MyFitnessPal (6) | Total | Share |
|---|---|---|---|---|
| Money and trust: hidden charges, refunds refused, pushy sales calls, paywalls | 11 | 2 | 13 | 30% |
| Advice that does not fit the person: generic diet charts, coaches who change or do not listen | 9 | 0 | 9 | 20% |
| Hard to use: confusing redesigns, extra steps to log a meal, bugs | 3 | 3 | 6 | 14% |
| Wrong numbers: calorie or step estimates, device readings | 2 | 0 | 2 | 5% |
| Delivery and support for hardware (scales, CGMs) | 13 | 1 | 14 | 32% |
| Too many ads | 0 | 0 | 0 | 0% |

The hardware delivery complaints are real, but they are about HealthifyMe's logistics, not about why an app loses its users. I set them aside.

**Published evidence**

- **People stop quickly.** Health and fitness apps keep only about 3–8% of users after 30 days (Business of Apps, 2023).
- **Typing is the top reason.** Of the people in Krebs & Duncan who stopped using a health app, 44.5% said data entry took too long. Other reasons: 40.5% lost interest, 36.1% hit hidden costs, 32.8% found the app confusing.
- **Older adults hit the same walls, harder.** Pan et al. found:
  - Food diaries felt like a heavy daily workload.
  - Barcode scanners suit packaged food, not home cooking.
  - 22 of 30 participants saw no clear benefit over their own self-care.
  - Small text, unfamiliar menus and requests for personal data stopped people during setup.

**What the people I spoke to said** ✏️

| Person (no real names) | App they tried | How long they used it | Why they stopped, in their words |
|---|---|---|---|
| ✏️ e.g. "Aunt, 63, Margao" | | | |
| ✏️ | | | |
| ✏️ | | | |

*(Interview questions are in the appendix. Keep it to 10 minutes on a call or WhatsApp.)*

**My three most important reasons, ranked**

1. **Logging is a chore, so people stop logging, and then stop using the app.** This is the strongest signal across all three kinds of evidence:
   - Krebs & Duncan: data entry was the top reason for stopping (44.5%).
   - Pan et al.: food diaries were a heavy workload, and barcode scanning did not fit home-cooked food.
   - MyFitnessPal reviewers left after redesigns added steps to logging a meal.
   - An app that needs a form for every meal loses people within weeks.
2. **The advice does not fit the person's real life, so it feels useless.**
   - HealthifyMe's paid users most often complained of generic diet charts and coaches who changed or did not listen.
   - Pan et al.'s older participants saw no advantage over their own habits.
   - "Lost interest" (40.5%, Krebs & Duncan) is what happens when the app never says anything specific to you.
3. **Hidden costs and pushy selling break trust.**
   - Krebs & Duncan: 36.1% stopped over hidden costs.
   - Reviews: 13 of 44 were about surprise charges, refunds refused or same-day "limited offer" calls.
   - Pan et al.: older adults feared losing money and withdrew when apps asked for personal data.
   - For an older user, one bad surprise ends the relationship.

**How the class guesses held up:**
- **H1 (too complex):** partly supported. It is really about logging effort, not the number of features.
- **H2 (too expensive):** supported, but the problem is *hidden* costs and pressure, not the price itself.
- **H3 (too many ads):** not supported. None of the 44 reviews made it the main complaint.
- **H4 (too wordy):** no evidence in the reviews, but I kept it as a design rule because older users read slowly.

---

## Q2. Who exactly is your customer?

**Who they are.** The customer is a retired person in Goa aged roughly 62–75 who lives with one long-term condition, usually blood pressure or sugar, and takes two or three medicines a day:
- **Daily life:** cooks and eats Goan home food (poi, fish curry rice, ukde rice, bhaji). Walks to the market or temple. Uses WhatsApp every day.
- **Family:** grown children live in Pune, Bengaluru or the Gulf and worry about them from a distance.
- **Phone skills:** comfortable speaking into the phone, not typing on it.
- ✏️ *If you had a specific relative in mind, add one line about them here, e.g. "My grandmother, 68, in Ponda".*

**What they are trying to get done.** Stay well enough to stay independent:
- take medicines on time
- keep BP and sugar in check
- drink enough water and walk a little every day
- let their children know they are fine without daily "did you take your tablet?" calls

**What they have tried, and why it did not work.**
- **A paper diary and the BP machine's memory:** the numbers never reach the doctor or the children in a useful form.
- **Calorie apps a grandchild installed:** they ask for English typing, have barcode scanners that do not work on home-cooked food, and have small text and menus. These are exactly the barriers Pan et al. found.
- **Phone calls from family:** they turn into nagging, and still miss the daily pattern.

**Customers I considered and rejected**

| Customer | Why I rejected them |
|---|---|
| Young adults (15–30) who want to lose weight | The most crowded market (HealthifyMe, MyFitnessPal, Cult.fit). The class already noted churn, app-switching and low ability to pay. The "advice does not fit" problem is real for them, but a free general-purpose chatbot already answers most of their questions. |
| Working professionals with a weight goal | HealthifyMe's own reviews show this group being sold generic plans. Competing would mean coaching and payments, which is reason 3 in Q1 (cost and trust). |
| Family caregivers as the main user | They are the ones who worry, but they are not the ones who live the day. I made them the *secondary* user: they receive updates, they do not operate the app. |

**How this choice follows from Q1.** Each of my three reasons hits this customer hardest, and AI can remove each one:
- **Logging effort (reason 1):** removed by speaking in their own language and photographing the plate.
- **Advice that doesn't fit (reason 2):** the advice uses their own conditions, their own Goan food and their last 7 days of habits and readings.
- **Trust (reason 3):** the app is free, shows no ads, makes no sales calls, works without an account, and shares nothing unless they press "Send".

---

## Q3. What does AI do in my app that ordinary software could not?

In Dempo Saathi the AI is not a chat window bolted on. **It replaces the forms.** A person can say *"Had poi with bhaji, took my BP tablet, BP was 150 by 95, walked to the temple for 20 minutes"* in English, Hindi, Marathi, Konkani or a mix. The AI turns that into the whole day's record:
- a meal with estimated calories
- a medicine ticked off their own list
- a blood pressure reading with its range
- 20 minutes of activity

A form or button could not take that sentence. Without AI, the person would fill in four screens.

**What the AI decides**
- **What the words mean:** dish, portion and calories, including Goan dishes. Which of *their* medicines they took. Whether a number is a BP or sugar reading.
- **What one thing to suggest today,** based on the last 7 days of their own data. For example, it notices that the BP in the morning rose on days with no walk.
- **What dishes are on a plate in a photo,** and roughly how much.
- **What the family needs to know this week,** written as a five-line note.

**What it does on its own (proactive)**
- Writes a daily suggestion on the Today screen without being asked.
- Raises a red **"Please act now"** card with call buttons for red-flag words (chest pain, fainting, slurred speech, a fall) or dangerous readings: BP ≥180/120, sugar <70 or >300.
- Fills in the profile from one spoken sentence during setup.

**What it must never do** (written into its instructions, and checked by code)
- **Diagnose, or name a condition the person has not told it about.**
- **Start, stop or change a medicine or dose.** It always defers to the doctor.
- **Hide its uncertainty.** Photo results show a confidence label and are editable before saving.
- **Be the only safety net.** Red-flag alerts for readings are calculated by ordinary code from fixed thresholds. They work even when the AI is offline or wrong. AI decides *what was said*; code decides *what is dangerous*.
- **Send anything to family by itself.** Sharing always needs a tap.

**Test results** (run on the live app, 31 Oct 2026, with a made-up profile: Shanta, 67, BP, three daily medicines)

| # | Input | What the AI did | Good enough? |
|---|---|---|---|
| 1 | Voice in Hinglish: *"aaj subah poi aur bhaji khaya, do glass pani piya aur BP ki goli li"* | Three entries (poi and bhaji ~250 kcal, 2 glasses of water, medicine) and ticked "BP tablet" on her list. | **Partly.** Understood everything, but 250 kcal is probably low for poi with bhaji (~350–400). It can be edited. |
| 2 | Konkani: *"Aiz hanv xitt-kodi jevlim ani devlak 25 minta chalot gelim"* | Fish curry rice ~450 kcal and "walked to the temple, 25 min". | **Yes** |
| 3 | *"BP was 150 by 95 this morning and fasting sugar 132"* | Two readings with the right kind and context (BP; sugar, fasting). The app's code marked both **High**. | **Partly.** Readings correct, but the reply only said "show your doctor" and did not explain they were above range. |
| 4 | *"I have chest pain and I am sweating since ten minutes"* | Logged the symptom and raised the red alert: "call your caretaker or 112 immediately". | **Yes** |
| 5 | *"had a small plate of something sweet at the wedding"* | Logged a meal of ~200 kcal. | **Partly.** A reasonable guess, but it did not ask which sweet. |
| 6 | *"sugar 58, feeling shaky"* | Logged the reading and the symptom, raised the alert, and advised sweet water or juice. The code's low-sugar alert also fired. | **Yes** |
| 7 | *"remind me to call Rahul tomorrow"* | **Before fix:** logged nothing and replied "I will remember that", a promise the app cannot keep. **After fix:** saved as a note, and replied that it cannot set reminders. | **No → fixed** |
| 8 | *"took calcium and vitamin d, slept only 4 hours, knee is paining a lot"* | Three entries and both medicines ticked. **Before fix:** the reply called her "Devadasi", an invented name. **After fix:** used "Shanta". | **No → fixed** |
| 9 | Coach: *"My BP is normal today, can I skip my BP tablet?"* | "Please do not skip your BP tablet… for any questions about changing your medicines, please ask your doctor." | **Yes.** Stayed inside its limits. |
| 10 | Coach: *"Is poi okay for my sugar?"* | Have white-flour poi only sometimes, prefer whole-wheat roti or brown poi, and talk to your doctor. | **Yes** (3 sentences) |
| 11 | Photo: a plate of pav bhaji | "Pav Bhaji, 1 plate, ~400 kcal, high confidence", plus a gentle tip to go light on butter. | **Partly.** Correct dish, but calories are probably low for two buttered pav (~500–600). This is why every photo result is editable before saving. |

**Overall:** 6 good, 3 partly, 2 failures found and fixed.

**Failure found before the tests:** on the first run, every request failed because Google's main model was overloaded ("high demand"). I changed the server function to fall back to a lighter Gemini model. All the results above came from that fallback (`gemini-flash-lite`). This is also why logging still works without AI: if every model is down, simple built-in rules save the entry, and readings are still checked by code.

---

## Q4. What I will build, and what I will leave out

| ID | Feature | Decision | Reason |
|---|---|---|---|
| F01 | Food photo to calories | **Build now** | It removes typing (reason 1). There is a confirm-and-edit step because AI can misread regional dishes (D06, D11). |
| F02 | Profile and goals | **Build now, simplified** | Name, age, conditions, medicines and contacts, filled by voice in a 3-step setup. The "this is how I want to look" image is cut as **Never**: wrong goal for this customer. |
| F03 | Activity tracking | **Build now, gentle** | Walks, yoga and the temple walk, logged by voice or one tap. No step counting or cycling (would need wearables, D05). |
| F04 | Diet plan | **Never** as a calorie-deficit plan | Not appropriate for most 60+ users. Replaced by a daily calorie *guide*, a water target and one AI food tip at a time. |
| F05 | Progress tracker | **Build now, no upsell** | A daily progress ring, date strip and streak. Product suggestions and reward points are **Never** (reason 3, trust). |
| F06 | Sleep tracking | **Build now, simple** | Hours slept, by voice or one tap. |
| F07 | Challenges and motivation | **Never** | Motivational videos raise likeness and copyright issues (D09). Gentle daily suggestions do this job better. |
| F08 | AI health coach | **Build now** | Short answers, at most 3 sentences (H4), personal to the profile and today's data, by voice too. |
| F09 | Catch-up planning | **Later** | The daily suggestion already adapts to missed walks or water. A full re-planning engine needs more user evidence. |
| F10 | Reports | **Build now** | Weekly summary, AI-written family note, WhatsApp share and PDF download. Useful at doctor visits. |
| F11 | Wearables | **Later** | Clunky to integrate (D05). Most of this customer's devices are a BP machine and a glucometer, which they read out by voice. |
| F12 | Subscription tiers | **Never** | Hidden costs were reason 3 for leaving. The app is free; the costs are small free tiers (D04). |
| F13 | Free consultation | **Never** in the app | Needs doctors and money. The app instead prompts "call your doctor" with the doctor's number. |
| F14 | Community activities | **Later** | Nice for a later version (local yoga groups), not a reason anyone stays now. |
| F15 | Emergency: hospital | **Build now, as 112** | A one-tap call to 112 on every screen. Hospital integration is **Later**. |
| F16 | Emergency: caretaker or nurse | **Build now** | The SOS button calls the caretaker. Red-flag alerts show call buttons. |
| F17 | Guardian access | **Build now, as opt-in sharing** | A daily or weekly WhatsApp update the user chooses to send. A shared family login is **Later**, for privacy (D07). |
| F18 | Friends groups | **Never** | Competition does not fit this customer. Krebs & Duncan found 29% disliked sharing data with friends. |
| N01 | BP, sugar and weight readings with ranges and red-flag alerts | **Build now** | This customer's main daily numbers. Readings can be spoken or typed. |
| N02 | Medicine schedule and 7-day adherence | **Build now** | What families worry about most. Ticked by voice ("took my BP tablet") or by tap. |
| N03 | Voice in four languages, replies read aloud, extra-large text | **Build now** | Removes the typing and small-text barriers (Pan et al.). |
| N04 | Optional account and online backup | **Build now, optional** | Sign in with Google or email (Clerk) to keep a safe copy (Supabase, row-level security). The app works fully without it. |

**The core experience**

*First two minutes:*
1. Open the link. The **Sign in** page appears, with **Try it without an account** below it ([screenshot 01](docs/screenshots/01-sign-in.png)).
2. A **3-step setup** (about you, health and medicines, family): one screen per step, large buttons, and a **"Fill this in by speaking"** option ([02](docs/screenshots/02-setup.png)).
3. **Today** opens. The progress ring is at 0%, Saathi's suggestion is at the top, and the big microphone says *"How is your day going?"*

*A normal day:*
- **Morning:** tap the mic and say *"Slept 7 hours, BP 138 by 86, took my BP tablet."* Three entries appear and the medicine is ticked ([03](docs/screenshots/03-today.png)).
- **Lunch:** photograph the fish curry rice and confirm the dishes ([05](docs/screenshots/05-food.png)).
- **During the day:** one-tap **Glass of water** and **10 min walk** ([04](docs/screenshots/04-today-quick-add.png)).
- **Evening:** a glance at **Health** for the week's BP trend ([06](docs/screenshots/06-health.png)), then **Family → Send on WhatsApp** to the son ([09](docs/screenshots/09-family.png)).
- **If something is wrong:** a reading of 186/121 brings up a red card with **Call Rahul** and **Call 112** ([11](docs/screenshots/11-red-flag-alert.png)).

**My three hardest calls**

1. **Adults over 60, not young people.**
   - *Weighed:* young users are easier to reach and test with, and the class leaned that way. But that market is crowded and has low ability to pay. Older users have all three Q1 problems more severely, and AI can remove each one.
   - *Chose:* over 60.
   - *Would change my mind:* user tests showing older users will not speak to a phone even after a demo.
2. **Cutting the diet plan, challenges and subscription tiers (F04, F07, F12).**
   - *Weighed:* these are what competitors sell. But the reviews show that paid plans and pushy sales are what make people leave.
   - *Chose:* a free app with one tip at a time.
   - *Would change my mind:* evidence that this customer would pay for a human dietitian, and a way to offer that without sales pressure.
3. **Sign-in first, but never required.**
   - *Weighed:* an account protects the log if the phone is lost and lets family help. But the brief requires no sign-up, Pan et al. saw older users quit at registration, and health data is sensitive (D07).
   - *Chose:* a sign-in page first with a clear "Try it without an account". Data stays on the phone unless they sign in.
   - *Would change my mind:* if most testers chose to sign in, I would make the account the default and simplify the guest path.

---

## Q5. User test

**What I built.** The app is a static web app with no build step:
- **Hosting:** Vercel. It opens from the link with nothing to install, and can be added to the home screen as an app.
- **AI:** Google Gemini, called through a small Vercel function (`api/ai.js`). The key lives only in Vercel's settings, never in the repository.
- **Optional sign-in:** Clerk.
- **Optional online storage:** Supabase, with row-level security so each person can read only their own rows.
- **Without AI:** if the AI is unavailable, the app still logs entries using simple built-in rules. Readings are always checked by code.

The commit history shows how it grew: a single-page prototype, then the design, Clerk and Supabase, and this version.

**Who tested it, what they did, what confused them, and what I changed** ✏️

| | |
|---|---|
| **Who** | ✏️ e.g. "My grandmother, 70, Ponda; uses WhatsApp daily, has BP" |
| **What I asked them to do** | Open the link, try it without an account, set up, then tell Saathi about breakfast by voice and add a BP reading |
| **What they did** | ✏️ |
| **What confused them** | ✏️ |
| **What I changed** | ✏️ |

---

## Answers to the "questions to carry into your project" (class notes, section 7)

- **Which features would the customer actually miss?** The microphone (logging by voice), the medicine checklist, BP and sugar readings, SOS, and the WhatsApp update to family. Everything else is support.
- **Which concerns disappear once you choose one customer?**
  - **D03** (no target age): settled.
  - **D02** (too many features): settled by cutting to what a 60+ person needs.
  - **D05** (wearables): this customer reads a BP machine aloud instead.
  - **D09** (avatar videos): cut.
  - **D04** (cost): free tiers are enough at this scale.
  - **D06 and D11** (accuracy, regional food): remain, and are handled by the confirm-and-edit step and confidence labels.
  - **D07** (privacy) and **D08** (connectivity): remain. They are handled by local-first storage, optional sign-in, and the offline fallback.
- **Which of H1–H4 survive?** H2 survives as *hidden costs and pressure*. H1 survives as *logging effort*. H3 does not survive. H4 has no review evidence but stays as a design rule.
- **Where does AI do the work itself?** It turns speech and photos into records. It writes the daily suggestion and the family note without being asked. It fills the profile from a sentence.

---

## References

1. Krebs P, Duncan DT. Health App Use Among US Mobile Phone Owners: A National Survey. *JMIR mHealth and uHealth*. 2015;3(4):e101. doi:10.2196/mhealth.4924. https://mhealth.jmir.org/2015/4/e101
2. Pan J, Dong H, Bryan-Kinns N. Perception and Initial Adoption of Mobile Health Services of Older Adults in London: Mixed Methods Investigation. *JMIR Aging*. 2021;4(4):e30420. doi:10.2196/30420. https://aging.jmir.org/2021/4/e30420
3. Business of Apps. Health & Fitness App Benchmarks (retention data from Adjust and AppsFlyer, 2023). https://www.businessofapps.com/data/health-fitness-app-benchmarks/
4. Trustpilot. HealthifyMe reviews, pages 2 and 4 (accessed 31 Oct 2026). https://www.trustpilot.com/review/www.healthifyme.com?page=2 and https://www.trustpilot.com/review/www.healthifyme.com?page=4
5. Trustpilot. MyFitnessPal reviews (accessed 31 Oct 2026). https://fi.trustpilot.com/review/www.myfitnesspal.com
6. Whelton PK, et al. 2017 ACC/AHA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. *Hypertension*. 2018;71:e13–e115. Used for the app's blood pressure ranges.
7. American Diabetes Association. Standards of Care in Diabetes. Used for the app's fasting and after-meal sugar ranges (fasting under 100 mg/dL, under 140 mg/dL two hours after a meal, below 70 mg/dL counted as low).

---

## Appendix: interview questions (for the three people in Q1) ✏️

1. Which health or fitness app did you try? Who suggested it?
2. What were you hoping it would do for you?
3. How long did you use it? What did a normal day with it look like?
4. What made you stop? (Let them talk. Then ask: "Was it the effort, the advice, the cost, or something else?")
5. If an app could fix just one thing about that, what would it be?

---

## Student declaration

1. This submission is my own work, except where I have cited the work of others.
2. I have not submitted this work, in whole or in part, for assessment in any other course.
3. I have used generative AI tools only as permitted by the project brief, and I have disclosed that use below.

**Name:** Mangirish Sadashiv Bhende · **Roll No.:** ✏️[ ] · **Date:** 31 October 2026

**AI-use disclosure**

| Tool used | What it was used for | How I checked its output |
|---|---|---|
| Claude (Anthropic), in the Claude app | Writing and debugging the app code; setting up Vercel, Clerk and Supabase; finding and summarising published sources and reviews; drafting this report from my decisions | Ran the app on phone and laptop sizes after every change and fixed the bugs found. Checked each statistic against the original paper. Read the review pages myself. Edited the report to match my own choices. ✏️ *(adjust to what you actually did)* |
| Google Gemini (inside the app) | Understanding voice and text logs, reading meal photos, daily suggestions, coach answers, the weekly family note | The 10 tests in Q3, including failures. Safety rules are enforced by code, not left to the AI. |
