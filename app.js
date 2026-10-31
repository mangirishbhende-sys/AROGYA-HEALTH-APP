/* =========================================================
   Dempo Saathi v5 — AI health companion for adults over 60
   Static web app. Data stays on the device (localStorage) and,
   if the person signs in, in Supabase (protected by Clerk).
   AI: Google Gemini, through /api/ai (key kept in Vercel settings)
   or a personal key entered in Settings.
   ========================================================= */
'use strict';

// ---------- icons ----------
const P = {
  logo:'<path d="M12 20s-7-4.4-9-9a4.6 4.6 0 0 1 9-3 4.6 4.6 0 0 1 9 3c-.4 1-1 2-1.7 3"/><path d="M14 13h2l1.5-2.5L19.5 16l1.5-3h2"/>',
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  coach:'<path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3 21l1.4-5.4A8.5 8.5 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  chart:'<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="6" width="3" height="12" rx="1"/><rect x="16" y="13" width="3" height="5" rx="1"/>',
  heart:'<path d="M12 20s-7-4.4-9-9a4.6 4.6 0 0 1 9-3 4.6 4.6 0 0 1 9 3c-2 4.6-9 9-9 9z"/><path d="M7 12h2.5l1.5-3 2 6 1.5-3H17"/>',
  family:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2A6.5 6.5 0 0 1 21.5 20"/>',
  mic:'<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5"/>',
  camera:'<path d="M4 7.5h3l2-3h6l2 3h3a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
  water:'<path d="M12 2.8s6.5 6.9 6.5 11.7a6.5 6.5 0 0 1-13 0C5.5 9.7 12 2.8 12 2.8z"/>',
  activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  meal:'<path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M18 3c-2.2 1-3.5 4-3.5 7.5H18V21"/>',
  sleep:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  medicine:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
  mood:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  symptom:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>',
  vital:'<path d="M4 12h3l2-5 3 10 2-5h6"/><circle cx="12" cy="12" r="10"/>',
  bp:'<path d="M12 21a7 7 0 0 0 7-7c0-4-7-11-7-11S5 10 5 14a7 7 0 0 0 7 7z"/><path d="M9 14h2l1-2 1.5 4 1-2H16"/>',
  sugar:'<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M12 12v9M12 12 4 7.5M12 12l8-4.5"/>',
  weight:'<rect x="3" y="4" width="18" height="16" rx="4"/><path d="M8.5 10a5 5 0 0 1 7 0M12 10l1.5-2"/>',
  note:'<path d="M6 3h9l4 4v14H6z"/><path d="M14.5 3v4.5H19M9 12.5h7M9 16.5h5"/>',
  alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  phone:'<path d="M5 3h3.5l2 5-2.5 1.5a11 11 0 0 0 6.5 6.5L16 13.5l5 2V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  speaker:'<path d="M4 9.5v5h4l5 4v-13l-5 4z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>', plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
  send:'<path d="M4 12 20 4l-5.5 16-3-6.5z"/><path d="M11.5 13.5 20 4"/>',
  spark:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  share:'<path d="M12 3v12M7.5 7.5 12 3l4.5 4.5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14.5 8.5l2 2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  ambulance:'<path d="M3 17V7a1 1 0 0 1 1-1h10v11M14 10h4l3 3.5V17h-2"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/><path d="M9 17h6M8.5 8.5v4M6.5 10.5h4"/>',
  doctor:'<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  chev:'<path d="m9 6 6 6-6 6"/>', back:'<path d="m15 6-6 6 6 6"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  download:'<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
  upload:'<path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  report:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 17v-3M12 17v-6M15 17v-4"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  logout:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"/>',
  face5:'<circle cx="12" cy="12" r="9"/><path d="M8 13.5a4.5 4.5 0 0 0 8 0M9 9.5h.01M15 9.5h.01"/>',
  face4:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  face3:'<circle cx="12" cy="12" r="9"/><path d="M8.5 15h7M9 9.5h.01M15 9.5h.01"/>',
  face2:'<circle cx="12" cy="12" r="9"/><path d="M8.5 16a4 4 0 0 1 7 0M9 9.5h.01M15 9.5h.01"/>',
  face1:'<circle cx="12" cy="12" r="9"/><path d="M8.5 16.5a4 4 0 0 1 7 0M8 9l2 1M16 9l-2 1"/>'
};
const ic = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || P.note}</svg>`;

// ---------- storage ----------
const KEY = 'arogya_saathi_v1'; // storage key kept from earlier versions so existing data carries over
let memoryFallback = null;
function load(){ try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch(e){} return memoryFallback; }
function persist(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){ memoryFallback = S; } }
function save(){ persist(); cloudSoon(); }
const DEFAULT = {
  profile:{ name:'', age:'', sex:'', height:'', weight:'', diet:'veg', conditions:'', goal:'Stay active and eat well',
            waterTarget:8, walkTarget:30, calTarget:'', caretakerName:'', caretakerPhone:'', doctorPhone:'', meds:[] },
  settings:{ lang:'en', big:false, speak:false, apiKey:'', model:'' },
  days:{}, checkin:null, chat:[], lastReply:null, guest:false
};
let S = hydrate(load());
function hydrate(d){
  const s = Object.assign({}, JSON.parse(JSON.stringify(DEFAULT)), d || {});
  s.profile = Object.assign({}, DEFAULT.profile, s.profile || {});
  s.settings = Object.assign({}, DEFAULT.settings, s.settings || {});
  if (typeof s.profile.meds === 'string'){ // migrate v3/v4 text list
    s.profile.meds = s.profile.meds.split(/[,\n]/).map(x => x.trim()).filter(Boolean).map(line => {
      const m = line.match(/^(.*?)\s*[–-]\s*(morning|afternoon|evening|night|after lunch|after dinner|before bed)$/i);
      const t = m ? m[2].toLowerCase() : 'morning';
      return { id: uid(), name: m ? m[1] : line, time: /after lunch|afternoon/.test(t) ? 'Afternoon' : /dinner|evening/.test(t) ? 'Evening' : /night|bed/.test(t) ? 'Night' : 'Morning' };
    });
  }
  return s;
}

// ---------- helpers ----------
const $ = q => document.querySelector(q);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function dkey(d = new Date()){ const z = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`; }
function daysAgo(n){ const d = new Date(); d.setDate(d.getDate() - n); return d; }
function day(k = dkey()){ return S.days[k] || (S.days[k] = { entries:[], meds:{} }); }
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function toast(msg, ms = 3000){ const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), ms); }
const fmtDate = (k, o = { weekday:'long', day:'numeric', month:'long' }) => new Date(k + 'T12:00').toLocaleDateString('en-IN', o);
const fmtTime = t => new Date(t).toLocaleTimeString('en-IN',{ hour:'numeric', minute:'2-digit' });
const LANGS = { en:{name:'English', voice:'en-IN'}, hi:{name:'हिंदी (Hindi)', voice:'hi-IN'}, mr:{name:'मराठी (Marathi)', voice:'mr-IN'}, kok:{name:'कोंकणी (Konkani)', voice:'mr-IN'} };
const langName = () => LANGS[S.settings.lang]?.name || 'English';
const TYPE = {
  meal:{ icon:'meal', c:'var(--food)', bg:'var(--food-soft)' }, water:{ icon:'water', c:'var(--water)', bg:'var(--water-soft)' },
  activity:{ icon:'activity', c:'var(--act)', bg:'var(--act-soft)' }, sleep:{ icon:'sleep', c:'var(--sleep)', bg:'var(--sleep-soft)' },
  medicine:{ icon:'medicine', c:'var(--med)', bg:'var(--med-soft)' }, mood:{ icon:'mood', c:'var(--brand)', bg:'var(--brand-soft)' },
  symptom:{ icon:'symptom', c:'var(--danger)', bg:'var(--danger-soft)' }, vital:{ icon:'vital', c:'var(--med)', bg:'var(--med-soft)' },
  note:{ icon:'note', c:'var(--muted)', bg:'var(--surface-2)' }
};
const chipT = (type, cls = '') => { const t = TYPE[type] || TYPE.note; return `<span class="chip ${cls}" style="background:${t.bg};color:${t.c}">${ic(t.icon)}</span>`; };
const chipC = (icon, bg, c, cls = '') => `<span class="chip ${cls}" style="background:${bg};color:${c}">${ic(icon)}</span>`;
const SLOTS = ['Breakfast','Lunch','Snacks','Dinner'];
const mealSlot = t => { const h = new Date(t).getHours(); return h < 11 ? 'Breakfast' : h < 16 ? 'Lunch' : h < 19 ? 'Snacks' : 'Dinner'; };
const MED_TIMES = ['Morning','Afternoon','Evening','Night'];
const MEAL_TARGET = 3;
function medList(){ return (S.profile.meds || []).map(m => m.name); }
function calTarget(){
  const p = S.profile; if (Number(p.calTarget)) return Number(p.calTarget);
  const w = Number(p.weight), h = Number(p.height), a = Number(p.age);
  if (w && h && a){ const bmr = 10*w + 6.25*h - 5*a + (p.sex === 'male' ? 5 : -161); return Math.round(bmr * 1.3 / 50) * 50; }
  return 1600;
}
function totals(k = dkey()){
  const d = day(k); const t = { water:0, walk:0, cal:0, meals:0, sleep:0, symptoms:[], slots:{} };
  for (const e of d.entries){
    if (e.type === 'water') t.water += Number(e.glasses) || 1;
    if (e.type === 'activity') t.walk += Number(e.minutes) || 0;
    if (e.type === 'meal'){ t.meals++; t.cal += Number(e.calories) || 0; const sl = mealSlot(e.t); t.slots[sl] = (t.slots[sl] || 0) + (Number(e.calories) || 0); }
    if (e.type === 'sleep') t.sleep = Math.max(t.sleep, Number(e.hours) || 0);
    if (e.type === 'symptom') t.symptoms.push(e.text);
  }
  const meds = S.profile.meds || [];
  t.medsTotal = meds.length; t.medsTaken = meds.filter(m => d.meds?.[m.id]).length;
  return t;
}
function dayPct(t, p = S.profile){
  const f = [t.water / (p.waterTarget || 1), t.walk / (p.walkTarget || 1), t.meals / MEAL_TARGET];
  if (t.medsTotal) f.push(t.medsTaken / t.medsTotal);
  return Math.round(f.map(v => Math.min(1, v)).reduce((a,b) => a + b, 0) / f.length * 100);
}
function streak(){ let n = 0; const d = new Date(); if (!(S.days[dkey(d)]?.entries.length)) d.setDate(d.getDate() - 1);
  while ((S.days[dkey(d)]?.entries || []).length){ n++; d.setDate(d.getDate() - 1); } return n; }
function greeting(){ const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
function initials(){ const n = (S.profile.name || cloud.user?.fullName || '').trim(); return n ? n.split(/\s+/).slice(0,2).map(w => w[0]).join('').toUpperCase() : ''; }
function speak(text){
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = LANGS[S.settings.lang]?.voice || 'en-IN'; u.rate = 0.92; speechSynthesis.speak(u);
}
function allVitals(kind){
  const out = [];
  for (const [k, d] of Object.entries(S.days)) for (const e of d.entries) if (e.type === 'vital' && e.extra?.kind === kind) out.push({ ...e, day:k });
  return out.sort((a,b) => a.t - b.t);
}

// ---------- vitals: general reference ranges (not a diagnosis) ----------
function bpStatus(sys, dia){
  if (sys >= 180 || dia >= 120) return { label:'Very high', cls:'bad', urgent:true };
  if (sys >= 140 || dia >= 90) return { label:'High', cls:'bad' };
  if (sys >= 130 || dia >= 80) return { label:'Raised', cls:'warn' };
  if (sys < 90 || dia < 60) return { label:'Low', cls:'warn' };
  if (sys >= 120) return { label:'Slightly raised', cls:'warn' };
  return { label:'In range', cls:'ok' };
}
function sugarStatus(v, ctx){
  if (v < 70) return { label:'Low', cls:'bad', urgent: v < 54 };
  if (ctx === 'fasting') return v < 100 ? { label:'In range', cls:'ok' } : v < 126 ? { label:'Raised', cls:'warn' } : { label:'High', cls:'bad', urgent: v >= 300 };
  return v < 140 ? { label:'In range', cls:'ok' } : v < 200 ? { label:'Raised', cls:'warn' } : { label:'High', cls:'bad', urgent: v >= 300 };
}
function vitalText(e){
  const x = e.extra || {};
  if (x.kind === 'bp') return `Blood pressure ${x.sys}/${x.dia}`;
  if (x.kind === 'sugar') return `Blood sugar ${x.value} mg/dL${x.ctx ? ' (' + x.ctx + ')' : ''}`;
  if (x.kind === 'weight') return `Weight ${x.value} kg`;
  return e.text;
}
function vitalAlert(x){
  if (x.kind === 'bp'){ const s = bpStatus(x.sys, x.dia); if (s.urgent) return 'This blood pressure reading is very high. Sit and rest, measure again in 5 minutes, and call your doctor. If you have chest pain, breathlessness, weakness or trouble speaking, call 112 now.'; }
  if (x.kind === 'sugar'){ const s = sugarStatus(x.value, x.ctx);
    if (x.value < 70) return 'Your sugar is low. Take something sweet now, like glucose, juice or sugar in water, and tell your caretaker. If you feel confused or faint, call 112.';
    if (s.urgent) return 'This sugar reading is very high. Drink water and call your doctor today. If you feel very unwell, confused or drowsy, call 112.'; }
  return null;
}

// ---------- dialogs & sheets ----------
function openSheet(html, onBind){
  $('#layer').innerHTML = `<div class="scrim" id="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div></div>`;
  $('#scrim').onclick = e => { if (e.target.id === 'scrim') closeSheet(); };
  document.querySelectorAll('#layer [data-close]').forEach(b => b.onclick = closeSheet);
  onBind && onBind();
  const f = document.querySelector('#layer input, #layer textarea, #layer button.primary'); f && f.focus();
}
function closeSheet(){ $('#layer').innerHTML = ''; }
function confirmSheet(title, msg, ok = 'Confirm', danger = false){
  return new Promise(res => {
    openSheet(`<h2>${esc(title)}</h2><p class="muted" style="margin-top:8px">${esc(msg)}</p>
      <div class="row end"><button id="shNo">Cancel</button><button id="shOk" class="${danger ? 'danger' : 'primary'}">${esc(ok)}</button></div>`, () => {
        $('#shNo').onclick = () => { closeSheet(); res(false); }; $('#shOk').onclick = () => { closeSheet(); res(true); };
      });
  });
}
function textSheet(title, sub, ph, onSave){
  openSheet(`<h2>${title}</h2><p class="muted small" style="margin-top:6px">${sub}</p>
    <textarea id="sheetText" placeholder="${ph}" rows="3" style="margin-top:14px"></textarea>
    <div class="row end"><button data-close>Cancel</button><button class="primary" id="sheetSave">Save</button></div>`, () => {
      $('#sheetSave').onclick = () => { const v = $('#sheetText').value.trim(); if (!v){ $('#sheetText').focus(); return; } closeSheet(); onSave(v); };
    });
}

// ---------- context the AI sees ----------
function profileText(){
  const p = S.profile;
  return `Name: ${p.name || 'unknown'}; age: ${p.age || 'unknown'}; sex: ${p.sex || 'unknown'}; height cm: ${p.height || '?'}; weight kg: ${p.weight || '?'}; diet: ${p.diet}; health conditions (as told by user): ${p.conditions || 'none given'}; medicines: ${(p.meds || []).map(m => m.name + ' (' + m.time + ')').join(', ') || 'none given'}; goal: ${p.goal}; daily targets: ${p.waterTarget} glasses water, ${p.walkTarget} min gentle activity, about ${calTarget()} kcal.`;
}
function weekText(){
  const lines = [];
  for (let i = 6; i >= 0; i--){
    const k = dkey(daysAgo(i)); const t = totals(k);
    const items = (S.days[k]?.entries || []).map(e => `${e.type}: ${e.type === 'vital' ? vitalText(e) : e.text}`).slice(-14).join(' | ');
    lines.push(`${k}: water ${t.water} glasses, activity ${t.walk} min, meals ${t.meals} (~${t.cal} kcal), sleep ${t.sleep || '?'} h, medicines ticked ${t.medsTaken}/${t.medsTotal}. ${items}`);
  }
  return lines.join('\n');
}
const SAFETY = `You are Dempo Saathi (Saathi for short), a gentle health companion for an older adult (60+) living in Goa, India. You are not a doctor. Never diagnose, never name a disease the person has not told you about, and never start, stop or change any medicine or dose; for medicine questions say to ask their doctor. Keep advice safe for older adults (gentle walking, yoga, water, balanced Indian home food). Address the person only by the first name in their profile, or not at all; never invent a name. Never promise to remind, call or message anyone: you cannot. Use plain, warm, respectful words. Be brief: older users prefer short answers. If the user mentions chest pain, breathlessness, fainting, sudden weakness or numbness on one side, slurred speech, a fall with injury, very high or very low sugar, or confusion, tell them clearly to call their caretaker or 112 immediately.`;

// ---------- Gemini (via /api/ai, or a personal key) ----------
const MODELS = ['gemini-flash-latest','gemini-2.5-flash','gemini-2.5-flash-lite','gemini-flash-lite-latest'];
const ai = { proxy:null }; // null = unknown, true/false after check
async function checkProxy(){
  if (!location.protocol.startsWith('http')){ ai.proxy = false; return; }
  try { const r = await fetch('/api/ai', { method:'GET' }); const j = await r.json(); ai.proxy = !!j.configured; } catch(e){ ai.proxy = false; }
  render();
}
const aiReady = () => !!S.settings.apiKey.trim() || ai.proxy === true;
async function gemini(parts, { system = SAFETY, json = false, temperature = 0.4 } = {}){
  if (!navigator.onLine) throw new Error('OFFLINE');
  const body = { systemInstruction:{ parts:[{ text: system }] }, contents:[{ role:'user', parts }], generationConfig:{ temperature, ...(json ? { responseMimeType:'application/json' } : {}) } };
  const key = S.settings.apiKey.trim();
  let text;
  if (!key){
    if (ai.proxy !== true) throw new Error('NO_KEY');
    const res = await fetch('/api/ai', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || ('HTTP ' + res.status));
    text = data.text || '';
  } else {
    const list = S.settings.model ? [S.settings.model, ...MODELS.filter(m => m !== S.settings.model)] : MODELS;
    let lastErr;
    for (const model of list){
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, { method:'POST', headers:{ 'Content-Type':'application/json', 'x-goog-api-key': key }, body: JSON.stringify(body) });
        if (res.status === 404){ lastErr = new Error('Model not found: ' + model); continue; }
        const data = await res.json();
        if ([429, 500, 503].includes(res.status)){ lastErr = new Error(data?.error?.message || 'busy'); continue; }
        if (!res.ok) throw new Error(data?.error?.message || ('HTTP ' + res.status));
        text = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
        if (!S.settings.model){ S.settings.model = model; persist(); }
        lastErr = null; break;
      } catch(e){ lastErr = e; if (!/not found|busy|demand|overloaded|quota/i.test(e.message)) break; }
    }
    if (lastErr) throw lastErr;
  }
  if (!json) return text;
  return JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, ''));
}
function aiErrorText(e){
  if (e.message === 'NO_KEY') return 'Saved. Saathi AI is not connected yet, so I saved it simply.';
  if (e.message === 'OFFLINE') return 'Saved offline. I will help more when you are back online.';
  if (/quota|exhaust|429/i.test(e.message)) return 'Saved. The free AI limit is used up for now — try again later.';
  return 'Saved. AI could not answer just now.';
}

// ---------- offline understanding (works without AI) ----------
const WORDNUM = { a:1, an:1, one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10, half:0.5 };
const numw = w => w == null ? null : (isNaN(w) ? WORDNUM[w] ?? null : Number(w));
function localParse(text){
  const s = text.toLowerCase(); const entries = [];
  let m = s.match(/(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten)\s*(glass|glasses|cup|cups|bottle|bottles)\s*(of\s*)?(water|pani)/);
  if (m) entries.push({ type:'water', text:`${m[1]} ${m[2]} of water`, glasses: (numw(m[1]) || 1) * (/bottle/.test(m[2]) ? 4 : 1) });
  else if (/\b(water|pani)\b/.test(s) && /\b(drank|drink|had|pilo|piya)\b/.test(s)) entries.push({ type:'water', text:'Water', glasses:1 });
  m = s.match(/(walk|walked|walking|yoga|exercise|cycling|cycled|garden)[^\d]{0,20}(\d+)\s*(min|minute|minutes|hour|hours|hr)/);
  if (m) entries.push({ type:'activity', text: m[1][0].toUpperCase() + m[1].slice(1), minutes: /^h/.test(m[3]) ? Number(m[2]) * 60 : Number(m[2]) });
  m = s.match(/(slept|sleep)[^\d]{0,15}(\d+(\.\d+)?)\s*(hour|hours|hr|hrs)/);
  if (m) entries.push({ type:'sleep', text:`Slept ${m[2]} hours`, hours: Number(m[2]) });
  m = s.match(/\b(bp|blood pressure|pressure)\D{0,12}(\d{2,3})\s*\/\s*(\d{2,3})/) || s.match(/\b(\d{2,3})\s*\/\s*(\d{2,3})\b/);
  if (m){ const sys = Number(m[m.length-2]), dia = Number(m[m.length-1]); if (sys > 60 && sys < 260 && dia > 30 && dia < 160) entries.push({ type:'vital', extra:{ kind:'bp', sys, dia } }); }
  m = s.match(/\b(sugar|glucose)\D{0,15}(\d{2,3})/);
  if (m) entries.push({ type:'vital', extra:{ kind:'sugar', value:Number(m[2]), ctx: /fasting|empty stomach|morning/.test(s) ? 'fasting' : /after|post/.test(s) ? 'after meal' : 'random' } });
  m = s.match(/\b(weight|weigh|weighed)\D{0,10}(\d{2,3}(\.\d)?)\s*(kg|kilo)/);
  if (m) entries.push({ type:'vital', extra:{ kind:'weight', value:Number(m[2]) } });
  const food = s.match(/\b(?:had|ate|eaten|khaya|breakfast|lunch|dinner)\b[^.]*?\b(poi|pav|bhaji|rice|chapati|roti|bhakri|dal|curry|fish|idli|dosa|upma|poha|sannas|tea|chai|coffee|biscuit|fruit|banana|egg|sabzi|usal)\b[^,.]*/);
  if (food){ const t = food[0].replace(/^(had|ate|eaten|khaya)\s+/, ''); entries.push({ type:'meal', text: t, calories:null }); }
  const red = /(chest pain|can'?t breathe|breathless|faint|fainted|fell down|i fell|slurred|numb|one side)/.test(s);
  if (red || /\b(pain|ache|dizzy|tired|fever|cough|swelling)\b/.test(s)) entries.push({ type:'symptom', text });
  if (!entries.length) entries.push({ type:'note', text });
  return { entries, reply: null, alert: red ? 'This may be serious. Please call your caretaker or 112 now.' : null };
}

// ---------- core action: tell Saathi anything ----------
async function tellSaathi(text){
  text = text.trim(); if (!text) return;
  busy = true; render();
  let result, fallbackMsg = null;
  try {
    const prompt = `Today is ${new Date().toDateString()}, time ${new Date().toTimeString().slice(0,5)}.
User profile: ${profileText()}
Today so far: ${JSON.stringify(totals())}

The user said (any language, may mix Hindi, Marathi, Konkani and English): """${text}"""

Turn this into health log entries. Return ONLY JSON:
{"entries":[{"type":"meal|water|activity|sleep|medicine|mood|symptom|vital|note","text":"short English description, sentence case","calories":number or null,"glasses":number or null,"minutes":number or null,"hours":number or null,"vital":null or {"kind":"bp|sugar|weight","sys":number,"dia":number,"value":number,"ctx":"fasting|after meal|random"}}],
 "medicinesTaken":["exact medicine names from the profile list that the user says they took"],
 "reply":"at most 2 short sentences in ${langName()}, warm and specific, one small helpful tip if useful",
 "alert":null or "one short sentence in ${langName()} telling them to call their caretaker or 112 now"}
Rules: You know Indian and Goan home food well (poi, pav, bhaji, xitt-kodi fish curry rice, ukde rice, sannas, sol kadhi, bhakri, chapati, dal, usal, idli, upma, chai). Estimate calories for a typical home portion; split separate dishes into separate meal entries only if eaten at different times, otherwise one entry. Water, coconut water, buttermilk and nimbu pani count as glasses (1 glass = 250 ml); tea and coffee are meals with calories. Activity includes walking, yoga, gardening, stairs, going to the market or temple on foot, in minutes. Blood pressure like "BP 140/90" or "pressure 130 by 85" is a vital of kind bp. Sugar readings are vitals of kind sugar in mg/dL. Weight is a vital of kind weight in kg. Medicine = a medicine they took (no dose advice). Symptom = any body complaint. Set alert ONLY for the warning signs in your instructions, or BP of 180/120 or above, or sugar below 70 or above 300. If what they said is not about their health (for example a reminder or a question), log it as a note and say plainly that you cannot set reminders or take actions outside this app. Address the person only by the first name in their profile, or not at all; never invent a name.`;
    result = await gemini([{ text: prompt }], { json:true });
    if (!Array.isArray(result.entries)) throw new Error('Bad AI format');
    if (!result.entries.length) result.entries = [{ type:'note', text }];
  } catch(e){ result = localParse(text); fallbackMsg = aiErrorText(e); }
  let alert = result.alert || null;
  for (const e of result.entries){
    const type = TYPE[e.type] ? e.type : 'note';
    const extra = e.vital || e.extra || null;
    if (type === 'vital' && extra){ const a = vitalAlert(extra); if (a && !alert) alert = a; }
    addEntry({ type, text: type === 'vital' && extra ? vitalText({ extra }) : (e.text || text), calories: e.calories ?? null, glasses: e.glasses ?? null, minutes: e.minutes ?? null, hours: e.hours ?? null, extra, said: text });
  }
  for (const name of result.medicinesTaken || []){
    const m = (S.profile.meds || []).find(x => x.name.toLowerCase() === String(name).toLowerCase());
    if (m){ day().meds[m.id] = true; }
  }
  S.lastReply = { text: result.reply || fallbackMsg || 'Saved.', alert, at: Date.now() };
  save(); busy = false; render();
  if (S.settings.speak) speak((alert ? alert + ' ' : '') + S.lastReply.text);
}
function addEntry(e){ selDay = dkey(); if (e.text) e.text = e.text[0].toUpperCase() + e.text.slice(1); day().entries.push({ id: uid(), t: Date.now(), ...e }); save(); }
function removeEntry(id){ cloud.deleted.add(id); const d = day(selDay); d.entries = d.entries.filter(e => e.id !== id); save(); render(); }

// ---------- food photo ----------
let pendingPhoto = null;
function fileToJpeg(file, max = 800){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { const sc = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(img.src); resolve(c.toDataURL('image/jpeg', 0.8)); };
    img.onerror = reject; img.src = URL.createObjectURL(file);
  });
}
async function handlePhoto(file){
  if (!file) return;
  const dataUrl = await fileToJpeg(file);
  pendingPhoto = { dataUrl, items:null, loading:true, error:null };
  go('food');
  try {
    const out = await gemini([
      { text: `Look at this plate of food. Identify each dish (think of Indian and Goan home food first, e.g. fish curry rice, poi, sannas, bhaji, pav bhaji, dal, sabzi, chapati, bhakri) and estimate the portion and calories. Return ONLY JSON: {"items":[{"name":"dish","portion":"e.g. 1 bowl","calories":number}],"confidence":"high|medium|low","note":"one short sentence in ${langName()} with a gentle tip for an older adult${S.profile.conditions ? ' who has ' + S.profile.conditions : ''}"}. If it is not food, return {"items":[],"confidence":"low","note":"I could not see food in this photo."}` },
      { inline_data: { mime_type:'image/jpeg', data: dataUrl.split(',')[1] } }
    ], { json:true });
    pendingPhoto.items = (out.items || []).map(i => ({ name: i.name, portion: i.portion || '', calories: Math.round(Number(i.calories) || 0) }));
    if (!pendingPhoto.items.length) pendingPhoto.items = [{ name:'', portion:'', calories:0 }];
    pendingPhoto.confidence = out.confidence; pendingPhoto.note = out.note;
  } catch(e){
    pendingPhoto.error = e.message === 'NO_KEY' ? 'Saathi AI is not connected yet. Type the dishes below.' : 'AI could not read the photo just now. Type the dishes below.';
    pendingPhoto.items = [{ name:'', portion:'', calories:0 }];
  }
  pendingPhoto.loading = false; render();
}
function savePhotoMeal(){
  const rows = [...document.querySelectorAll('#foodRows .fooditem')].map(r => ({ name: r.querySelector('.fn').value.trim(), portion: r.querySelector('.fp').value.trim(), calories: Number(r.querySelector('.fc').value) || 0 })).filter(r => r.name);
  if (!rows.length){ toast('Please add at least one dish'); return; }
  addEntry({ type:'meal', text: rows.map(r => r.portion ? `${r.name} (${r.portion})` : r.name).join(', '), calories: rows.reduce((a,r) => a + r.calories, 0), fromPhoto:true });
  S.lastReply = { text: pendingPhoto.note || 'Meal saved.', alert:null, at:Date.now() };
  pendingPhoto = null; save(); render(); toast('Meal saved');
}

// ---------- proactive daily check-in ----------
function ruleCheckin(){
  const t = totals(); const p = S.profile; const h = new Date().getHours(); const tips = [];
  const ty = totals(dkey(daysAgo(1)));
  if (ty.walk >= p.walkTarget) tips.push(`Well done on your ${ty.walk} minutes of activity yesterday.`);
  if (t.water < Math.round(p.waterTarget * Math.min(1, Math.max(0, h - 7) / 13))) tips.push(`Have a glass of water now — you are at ${t.water} of ${p.waterTarget} today.`);
  if (t.walk < p.walkTarget && h >= 16 && h <= 19) tips.push('An easy evening walk of 10–15 minutes would be good.');
  if (h < 11 && !t.sleep) tips.push('Tell me how you slept last night.');
  if (t.medsTotal && t.medsTaken < t.medsTotal) tips.push('Remember to tick your medicines once you take them.');
  if (!tips.length) tips.push('You are doing well today. Keep it gentle and steady.');
  return tips.slice(0,2).join(' ');
}
async function runCheckin(force = false){
  const today = dkey();
  if (!force && S.checkin?.date === today && (S.checkin.ai || !aiReady())) return;
  S.checkin = { date: today, text: ruleCheckin(), ai:false, loading: aiReady() };
  render();
  if (!aiReady()) return;
  try {
    const bp = allVitals('bp').slice(-5).map(v => `${v.day}: ${v.extra.sys}/${v.extra.dia}`).join(', ');
    const sg = allVitals('sugar').slice(-5).map(v => `${v.day}: ${v.extra.value} (${v.extra.ctx || 'random'})`).join(', ');
    const txt = await gemini([{ text: `Now: ${new Date().toString().slice(0,21)}.
Profile: ${profileText()}
Last 7 days:
${weekText()}
Recent blood pressure: ${bp || 'none'}. Recent sugar: ${sg || 'none'}.

Write today's check-in message for this person in ${langName()}. At most 3 short sentences: notice one real pattern from the last days (good or needs care), then suggest ONE small, specific, doable action for today that fits an older adult and their conditions. No lists, no greeting line, no emojis.` }], { temperature:0.6 });
    S.checkin = { date: today, text: txt, ai:true, loading:false };
  } catch(e){ S.checkin.loading = false; }
  persist(); render();
}

// ---------- coach chat ----------
let coachTyping = false;
async function askCoach(q){
  q = q.trim(); if (!q) return;
  S.chat.push({ me:true, text:q }); S.chat = S.chat.slice(-30); save();
  coachTyping = true; busy = true; go('coach'); scrollChat();
  let a;
  try {
    const history = S.chat.slice(-8, -1).map(m => (m.me ? 'User: ' : 'Saathi: ') + m.text).join('\n');
    a = await gemini([{ text: `Profile: ${profileText()}
Today: ${JSON.stringify(totals())}
Recent chat:
${history}

User asks: """${q}"""

Answer in ${langName()} in at most 3 short sentences. Be practical and specific to this person and to Indian/Goan food and routines. Plain text only.` }], { temperature:0.5 });
  } catch(e){ a = e.message === 'NO_KEY' ? 'Saathi AI is not connected yet. Ask your family to connect it in Settings → AI.' : aiErrorText(e).replace(/^Saved\.\s*/, ''); }
  S.chat.push({ me:false, text:a }); save(); coachTyping = false; busy = false; render(); scrollChat();
  if (S.settings.speak) speak(a);
}
function scrollChat(){ const c = $('#chatEnd'); if (c) c.scrollIntoView({ behavior:'smooth', block:'end' }); }

// ---------- reports ----------
function weekStats(offset = 0){
  const rows = []; for (let i = 6 + offset; i >= offset; i--) rows.push(totals(dkey(daysAgo(i))));
  const avg = f => { const v = rows.map(r => r[f]).filter(x => x > 0); return v.length ? Math.round(v.reduce((a,b) => a + b, 0) / v.length * 10) / 10 : 0; };
  const medDays = rows.filter(r => r.medsTotal);
  return { rows, water: avg('water'), walk: avg('walk'), sleep: avg('sleep'), cal: Math.round(avg('cal')),
    activeDays: rows.filter(r => r.walk >= S.profile.walkTarget).length, meals: rows.reduce((a,r) => a + r.meals, 0),
    adherence: medDays.length ? Math.round(medDays.reduce((a,r) => a + r.medsTaken / r.medsTotal, 0) / medDays.length * 100) : null,
    symptoms: rows.flatMap(r => r.symptoms) };
}
function plainSummary(k = dkey()){
  const t = totals(k); const p = S.profile;
  let s = `Dempo Saathi update${p.name ? ' for ' + p.name : ''}, ${fmtDate(k, { weekday:'short', day:'numeric', month:'short' })}\n💧 Water: ${t.water}/${p.waterTarget} glasses\n🚶 Activity: ${t.walk}/${p.walkTarget} min\n🍽️ Meals: ${t.meals}${t.cal ? ` (~${t.cal} kcal)` : ''}\n😴 Sleep: ${t.sleep ? t.sleep + ' h' : 'not logged'}`;
  if (t.medsTotal) s += `\n💊 Medicines: ${t.medsTaken}/${t.medsTotal} taken`;
  const v = day(k).entries.filter(e => e.type === 'vital'); if (v.length) s += `\n🩺 ${v.map(vitalText).join('; ')}`;
  if (t.symptoms.length) s += `\n⚠️ Mentioned: ${t.symptoms.join('; ')}`;
  return s;
}
let weekReport = null;
async function makeWeekReport(){
  weekReport = { loading:true, text:'' }; render();
  try {
    weekReport.text = await gemini([{ text: `Profile: ${profileText()}
Last 7 days:
${weekText()}

Write a short weekly health note for this person's family in English (5 short lines max): what went well, what needs attention (including any symptoms and readings outside the usual range), and one suggestion for the family. Plain text, no markdown.` }]);
  } catch(e){
    const w = weekStats();
    weekReport.text = `Weekly note for ${S.profile.name || 'Saathi user'}:\nAverage water ${w.water} glasses a day, activity ${w.walk} min a day.\nActivity goal met on ${w.activeDays} of 7 days.${w.adherence != null ? `\nMedicines taken ${w.adherence}% of the time.` : ''}${w.symptoms.length ? `\nMentioned: ${w.symptoms.join('; ')}.` : ''}`;
  }
  weekReport.loading = false; render();
}
function waLink(text, phone){ const num = (phone || '').replace(/\D/g, ''); const full = num.length === 10 ? '91' + num : num; return `https://wa.me/${full}?text=${encodeURIComponent(text)}`; }

// ---------- voice input ----------
let rec = null, busy = false;
function listen(onText, prompt = 'Tell me what you ate, drank or did'){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR){ toast('Voice needs Google Chrome. You can type instead.'); return; }
  rec = new SR(); rec.lang = LANGS[S.settings.lang]?.voice || 'en-IN'; rec.interimResults = true; rec.maxAlternatives = 1;
  let finalText = '';
  $('#layer').innerHTML = `<div class="listen" role="dialog" aria-modal="true" aria-label="Listening">
    <div class="orb"><div class="core">${ic('mic')}</div></div><h2>Listening…</h2><p id="heard">${esc(prompt)}</p>
    <button id="stopListen">${ic('x')} Cancel</button></div>`;
  $('#stopListen').onclick = () => { finalText = ''; try { rec.abort(); } catch(e){} };
  rec.onresult = e => { let t = ''; for (const r of e.results) t += r[0].transcript; finalText = t; const h = $('#heard'); if (h) h.textContent = '“' + t + '”'; };
  rec.onerror = e => { if (e.error !== 'aborted') toast(e.error === 'not-allowed' ? 'Please allow the microphone' : 'I could not hear that. Please try again.'); };
  rec.onend = () => { $('#layer').innerHTML = ''; rec = null; if (finalText.trim()) onText(finalText.trim()); };
  try { rec.start(); } catch(e){ $('#layer').innerHTML = ''; }
}

// ---------- charts ----------
function barChart(vals, labels, goal, color, unit = ''){
  const max = Math.max(goal ? goal * 1.25 : 0, ...vals, 1);
  const W = 340, H = 190, top = 22, bot = 28, n = vals.length, bw = Math.min(30, (W - 20) / n * .55), gap = (W - n * bw) / (n + 1);
  const y = v => top + (H - top - bot) * (1 - v / max);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart">
    ${goal ? `<line x1="0" x2="${W}" y1="${y(goal)}" y2="${y(goal)}" stroke="var(--muted)" stroke-dasharray="4 5" opacity=".5"/><text x="${W - 2}" y="${y(goal) - 6}" text-anchor="end">Goal ${goal}${unit}</text>` : ''}
    ${vals.map((v, i) => { const x = gap + i * (bw + gap), h = v ? Math.max(6, H - bot - y(v)) : 3, last = i === n - 1;
      return `<rect x="${x}" y="${H - bot - h}" width="${bw}" height="${h}" rx="7" fill="${color}" opacity="${last ? 1 : .5}"/>
        ${v ? `<text class="v" x="${x + bw/2}" y="${H - bot - h - 6}" text-anchor="middle">${v}</text>` : ''}
        <text x="${x + bw/2}" y="${H - 8}" text-anchor="middle" ${last ? 'style="fill:var(--ink)"' : ''}>${labels[i]}</text>`; }).join('')}
  </svg>`;
}
function lineChart(series, labels, band){
  const all = series.flatMap(s => s.vals).filter(v => v != null);
  if (!all.length) return '<p class="muted small" style="margin-top:12px">No readings yet. Add your first reading to see the trend.</p>';
  let lo = Math.min(...all, band ? band[0] : Infinity), hi = Math.max(...all, band ? band[1] : -Infinity); const pad = (hi - lo) * .15 || 5; lo -= pad; hi += pad;
  const W = 340, H = 190, L = 34, R = 10, T = 14, B = 26, n = labels.length;
  const x = i => n === 1 ? (L + W - R) / 2 : L + i * (W - L - R) / (n - 1), y = v => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
  const ticks = [lo + pad, (lo + hi) / 2, hi - pad].map(v => Math.round(v));
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart of readings">
    ${band ? `<rect x="${L}" y="${y(band[1])}" width="${W - L - R}" height="${Math.max(0, y(band[0]) - y(band[1]))}" fill="var(--ok)" opacity=".08"/><text x="${W - R}" y="${y(band[1]) - 4}" text-anchor="end">usual range</text>` : ''}
    ${ticks.map(t => `<text x="${L - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text><line x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)"/>`).join('')}
    ${series.map(s => { const pts = s.vals.map((v, i) => v == null ? null : [x(i), y(v)]).filter(Boolean);
      return `<polyline fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="${pts.map(p => p.join(',')).join(' ')}"/>
        ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === pts.length - 1 ? 5 : 3.5}" fill="${s.color}" stroke="var(--surface)" stroke-width="2"/>`).join('')}`; }).join('')}
    ${labels.map((l, i) => (n <= 7 || i % Math.ceil(n / 7) === 0 || i === n - 1) ? `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${l}</text>` : '').join('')}
  </svg>`;
}
function ring(pct, color, track, size = 132, stroke = 12){
  const r = (size - stroke) / 2, C = 2 * Math.PI * r, v = Math.max(0, Math.min(1, pct / 100));
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/>
    ${v > 0 ? `<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${(C * v).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${size/2} ${size/2})" style="transition:stroke-dasharray .6s"/>` : ''}</svg>`;
}

// ---------- routing ----------
const wide = () => window.matchMedia('(min-width: 960px)').matches;
let view = 'today', selDay = dkey(), sSection = null, metric = 'water', vitalTab = 'bp', setupStep = 1, lastKey = '', foodTip = null;
let setupActive = false;
function mode(){
  if (S.guest || cloud.user || !cloud.enabled){ if (!S.profile.name) setupActive = true; return setupActive ? 'setup' : 'app'; }
  return 'login';
}
function go(v){ view = v; sSection = null; if (v === 'today') selDay = dkey(); render(); window.scrollTo(0,0); if (v === 'today') runCheckin(); }

const NAV = [ ['today','home','Today'], ['food','meal','Food'], ['health','heart','Health'], ['meds','medicine','Medicines','side'], ['coach','coach','Coach','side'],
  ['reports','report','Reports','side'], ['family','family','Family','side'], ['settings','settings','Settings','side'], ['more','grid','More','mob'] ];

function render(){
  document.documentElement.classList.toggle('big', !!S.settings.big);
  const md = mode();
  const root = $('#root');
  if (md === 'login'){ root.innerHTML = vLogin(); bind(); mountClerk(); return; }
  if (md === 'setup'){ root.innerHTML = vSetup(); bind(); return; }
  const p = S.profile; const sos = p.caretakerPhone ? `tel:${esc(p.caretakerPhone)}` : 'tel:112';
  const av = cloud.user?.imageUrl;
  if (!$('#app')){
    root.innerHTML = `<div class="shell"><header class="topbar" id="topbar"></header><main id="app"></main></div><nav class="tabs" aria-label="Main"><div class="in" id="tabs"></div></nav>`;
  }
  $('#topbar').innerHTML = `<img class="logoimg" src="icons/dempo-logo-160.png" alt=""><div class="bn grow">Dempo Saathi</div>
    <a class="sos" href="${sos}" aria-label="Emergency: call ${esc(p.caretakerName || '112')}">${ic('phone')} SOS</a>
    <button class="avatar" data-go="settings" aria-label="Settings" ${av ? `style="background-image:url('${esc(av)}')"` : ''}>${av ? '' : (initials() || ic('user'))}</button>`;
  const cur = ['meds','coach','reports','family','settings'].includes(view) && !wide() ? 'more' : view;
  const navBtn = ([id, icon, label, only]) => `<button class="t ${only === 'side' ? 'side-only' : only === 'mob' ? 'mob-only' : ''}" data-go="${id}" ${cur === id ? 'aria-current="page"' : ''}>${ic(icon)}${label}</button>`;
  $('#tabs').innerHTML = `<div class="sidebrand"><img class="logoimg" src="icons/dempo-logo-160.png" alt="">Dempo Saathi</div>
    <button class="fab" data-act="fab" aria-label="Log something">${ic('plus')}<span class="lbl">Log something</span></button>
    ${navBtn(NAV[0])}${navBtn(NAV[1])}${wide() ? '' : '<span style="width:72px;flex:none"></span>'}${navBtn(NAV[2])}${navBtn(NAV[3])}${navBtn(NAV[4])}
    <span class="navlabel">More</span>${navBtn(NAV[5])}${navBtn(NAV[6])}${navBtn(NAV[7])}${navBtn(NAV[8])}
    <div class="sidefoot">Saathi is a health companion, not a doctor. Not medical advice. In an emergency call 112.</div>`;
  if (!wide()){ // place the FAB in the middle on phones
    const tabs = $('#tabs'); const fab = tabs.querySelector('.fab'); const spacer = tabs.querySelector('span[style]'); spacer.replaceWith(fab);
  }
  const m = $('#app');
  m.innerHTML = ({ today: vToday, food: vFood, health: vHealth, meds: vMeds, coach: vCoach, reports: vReports, family: vFamily, settings: vSettings, more: vMore })[view]();
  const k = view + (sSection || ''); if (k !== lastKey){ m.classList.remove('enter'); void m.offsetWidth; m.classList.add('enter'); lastKey = k; }
  bind();
}
function pageHead(title, sub, extra = ''){ return `<div class="phead"><div class="grow"><h1>${title}</h1>${sub ? `<p class="muted small">${sub}</p>` : ''}</div>${extra}</div>`; }

// ---------- views: login ----------
function vLogin(){
  return `<div class="login">
    <section class="brandpane">
      <svg class="art" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke-width="10" stroke-linecap="round">
        <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,.06)"/><circle cx="100" cy="100" r="90" stroke="#f0a032" stroke-dasharray="400 566" transform="rotate(-90 100 100)"/>
        <circle cx="100" cy="100" r="68" stroke="rgba(255,255,255,.06)"/><circle cx="100" cy="100" r="68" stroke="#2a7de1" stroke-dasharray="300 428" transform="rotate(-90 100 100)"/>
        <circle cx="100" cy="100" r="46" stroke="rgba(255,255,255,.06)"/><circle cx="100" cy="100" r="46" stroke="#0d8f7e" stroke-dasharray="160 289" transform="rotate(-90 100 100)"/></g></svg>
      <div class="mark"><img class="logoimg" src="icons/dempo-logo-160.png" alt="">Dempo Saathi</div>
      <h1>Your health, in your own words.</h1>
      <p class="lede">Tell Saathi about your day by voice. It keeps track of food, water, walks, medicines and readings, and keeps your family in the loop.</p>
      <div class="feats">
        <div class="feat"><span class="chip">${ic('mic')}</span><span><b>Speak, don't type</b>English, Hindi, Marathi or Konkani.</span></div>
        <div class="feat"><span class="chip">${ic('camera')}</span><span><b>Photograph your plate</b>Calories for Goan and Indian home food.</span></div>
        <div class="feat"><span class="chip">${ic('shield')}</span><span><b>Safe and private</b>Only you can see your health log.</span></div>
      </div>
      <p class="foot">Made for adults over 60 and their families in Goa. A student project at Srinivassa Sinai Dempo College, not an official college service.</p>
    </section>
    <section class="authpane"><div class="authbox">
      <h2>Welcome</h2>
      <p class="muted" style="margin-top:6px">Sign in to keep your health log safe and use it on any phone.</p>
      <div id="clerk-signin">${cloud.failed ? `<p class="muted small" style="margin-top:20px">Sign-in is unavailable right now. You can still use the app without an account.</p>` : '<div class="spin" aria-label="Loading sign-in"></div>'}</div>
      <div class="or">or</div>
      <button class="full" data-act="guest">Try it without an account</button>
      <p class="fine">Without an account, everything stays only on this phone.<br>Saathi is a health companion, not a doctor. Not medical advice.</p>
    </div></section>
  </div>`;
}
let clerkMounted = null;
function mountClerk(){
  const el = $('#clerk-signin'); if (!el || !cloud.ready || !window.Clerk) return;
  if (clerkMounted === el) return;
  el.innerHTML = '';
  try { window.Clerk.mountSignIn(el, { appearance: CLERK_LOOK }); clerkMounted = el; } catch(e){ el.innerHTML = `<button class="primary full" data-act="cloudIn" style="margin-top:16px">Sign in or create an account</button>`; bind(); }
}
const CLERK_LOOK = { variables:{ colorPrimary:'#143d73', colorText:'#0f1d33', fontSize:'16px', borderRadius:'12px', fontFamily:'Atkinson Hyperlegible, Segoe UI, sans-serif' }, elements:{ card:{ boxShadow:'none', border:'1px solid #e2e7ef' } } };

// ---------- views: setup wizard ----------
function vSetup(){
  const p = S.profile; const st = setupStep;
  const f = (id, label, val, type = 'text', extra = '') => `<label class="f" for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(val)}" ${extra}>`;
  const meds = (p.meds && p.meds.length) ? p.meds : [{ id: uid(), name:'', time:'Morning' }];
  const steps = {
    1: `<h1>About you</h1><p class="muted" style="margin-top:6px">This helps Saathi give advice that fits you. A family member can help.</p>
      <button style="margin-top:16px" class="full" data-act="micProfile">${ic('mic')} Fill this in by speaking</button>
      ${f('pName','Full name', p.name || cloud.user?.fullName || '', 'text', 'autocomplete="name"')}
      <div class="two"><div>${f('pAge','Age',p.age,'number','inputmode="numeric"')}</div><div><label class="f" for="pSex">Sex</label><select id="pSex"><option value="">Select</option>${['female','male','other'].map(o => `<option value="${o}" ${p.sex===o?'selected':''}>${o[0].toUpperCase()+o.slice(1)}</option>`).join('')}</select></div></div>
      <div class="two"><div>${f('pHeight','Height (cm)',p.height,'number','inputmode="numeric"')}</div><div>${f('pWeight','Weight (kg)',p.weight,'number','inputmode="decimal"')}</div></div>
      <label class="f" for="pDiet">Food preference</label><select id="pDiet">${[['veg','Vegetarian'],['nonveg','Non-vegetarian'],['egg','Eggetarian'],['jain','Jain']].map(([v,l]) => `<option value="${v}" ${p.diet===v?'selected':''}>${l}</option>`).join('')}</select>
      <button class="link" style="margin-top:16px" data-act="demo">Just looking? Load a sample person instead</button>`,
    2: `<h1>Your health</h1><p class="muted" style="margin-top:6px">Only what you are happy to share. Saathi never changes your medicines.</p>
      ${f('pCond','Health conditions (optional)',p.conditions,'text','placeholder="e.g. diabetes, BP, knee pain"')}
      <label class="f">Daily medicines</label>
      <div id="medRows">${meds.map(medRow).join('')}</div>
      <button class="link" data-act="addMedRow">${ic('plus')} Add another medicine</button>`,
    3: `<h1>Family and safety</h1><p class="muted" style="margin-top:6px">The SOS button calls your caretaker. Without a number it calls 112.</p>
      ${f('pCName','Caretaker name',p.caretakerName,'text','placeholder="e.g. Rahul (son)"')}
      ${f('pCPhone','Caretaker mobile',p.caretakerPhone,'tel','placeholder="10-digit number" inputmode="tel"')}
      ${f('pDPhone','Doctor (optional)',p.doctorPhone,'tel','inputmode="tel"')}
      <label class="f" for="sLang">Saathi speaks in</label><select id="sLang">${Object.entries(LANGS).map(([k,v]) => `<option value="${k}" ${S.settings.lang===k?'selected':''}>${v.name}</option>`).join('')}</select>`
  };
  return `<div class="setup">
    <div class="row"><img class="logoimg" src="icons/dempo-logo-160.png" alt=""><b style="font-family:var(--display)">Dempo Saathi</b><span class="grow"></span><span class="muted small">Step ${st} of 3</span></div>
    <div class="steps">${[1,2,3].map(i => `<i class="${i <= st ? 'on' : ''}"></i>`).join('')}</div>
    <div class="card">${steps[st]}</div>
  </div>
  <div class="setupbar"><div class="in">
    ${st > 1 ? '<button data-act="setupBack">Back</button>' : (cloud.user ? '' : '<button data-act="toLogin">Back</button>')}
    <button class="primary" data-act="setupNext">${st < 3 ? 'Continue' : 'Finish'}</button>
  </div></div>`;
}
const medRow = m => `<div class="medrow" data-mid="${m.id}"><input class="mn" value="${esc(m.name)}" placeholder="e.g. BP tablet" aria-label="Medicine name">
  <select class="mt" aria-label="When">${MED_TIMES.map(t => `<option ${m.time === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
  <button class="iconbtn ghost" data-act="delMedRow" aria-label="Remove">${ic('x')}</button></div>`;
function readSetup(){
  const p = S.profile; const v = (id, cur) => $('#' + id) ? $('#' + id).value.trim() : cur;
  Object.assign(p, { name:v('pName', p.name), age:v('pAge', p.age), sex:v('pSex', p.sex), height:v('pHeight', p.height), weight:v('pWeight', p.weight), diet:v('pDiet', p.diet), conditions:v('pCond', p.conditions),
    caretakerName:v('pCName', p.caretakerName), caretakerPhone:v('pCPhone', p.caretakerPhone), doctorPhone:v('pDPhone', p.doctorPhone) });
  if ($('#medRows')) p.meds = [...document.querySelectorAll('#medRows .medrow')].map(r => ({ id: r.dataset.mid, name: r.querySelector('.mn').value.trim(), time: r.querySelector('.mt').value })).filter(m => m.name);
  if ($('#sLang')) S.settings.lang = $('#sLang').value;
}

// ---------- views: today ----------
function dateStrip(){
  const out = [];
  for (let i = 6; i >= 0; i--){ const d = daysAgo(i); const k = dkey(d);
    out.push(`<button class="dpill ${k === selDay ? 'on' : ''}" data-day="${k}" aria-label="${fmtDate(k)}"><span>${i ? d.toLocaleDateString('en-IN',{weekday:'short'}) : 'Today'}</span><b>${d.getDate()}</b><i style="--p:${dayPct(totals(k))}%"></i></button>`); }
  return `<div class="dstrip" role="group" aria-label="Choose a day">${out.join('')}</div>`;
}
function vToday(){
  const isToday = selDay === dkey();
  const p = S.profile, t = totals(selDay), d = day(selDay), pct = dayPct(t);
  const r = isToday && S.lastReply && Date.now() - S.lastReply.at < 6 * 3600e3 ? S.lastReply : null;
  if (S.checkin && !S.checkin.ai && !S.checkin.loading) S.checkin.text = ruleCheckin();
  const first = p.name ? esc(p.name.split(' ')[0]) : '';
  const heroMsg = pct >= 100 ? 'Every goal done. Wonderful.' : pct >= 60 ? 'Good progress. Keep going gently.' : pct > 0 ? 'A good start. A little more water and a short walk will help.' : (isToday ? 'Tell Saathi about your morning to get started.' : 'Nothing was logged on this day.');
  const B = {};
  B.greet = `<div class="greet"><p class="date">${fmtDate(dkey())}</p><h1>${greeting()}${first ? ', ' + first : ''}</h1></div>${dateStrip()}`;
  B.hero = `<section class="hero" aria-label="Progress">
    <div class="scoreRing">${ring(pct, 'var(--mango)', 'rgba(255,255,255,.1)')}<div class="c"><b>${pct}%</b><span>of goals</span></div></div>
    <div class="grow"><h2>${isToday ? "Today's progress" : fmtDate(selDay, { weekday:'long', day:'numeric', month:'short' })}</h2><p class="msg">${heroMsg}</p>
      <div class="mini"><div><b>${t.water}/${p.waterTarget}</b>glasses</div><div><b>${t.walk}/${p.walkTarget}</b>min active</div><div><b>${t.medsTotal ? t.medsTaken + '/' + t.medsTotal : t.meals + '/' + MEAL_TARGET}</b>${t.medsTotal ? 'meds' : 'meals'}</div></div></div>
  </section>${isToday ? '' : `<button class="link" style="margin-top:8px" data-day="${dkey()}">${ic('back')} Back to today</button>`}`;
  B.alert = r?.alert ? `<section class="card alert" role="alert"><div class="card-h"><span class="chip">${ic('alert')}</span><h2 class="grow">Please act now</h2></div><p>${esc(r.alert)}</p>
     <div class="row wrap" style="margin-top:14px">${p.caretakerPhone ? `<a class="btn danger grow" href="tel:${esc(p.caretakerPhone)}">${ic('phone')} Call ${esc(p.caretakerName || 'caretaker')}</a>` : ''}<a class="btn danger grow" href="tel:112">${ic('ambulance')} Call 112</a></div></section>` : '';
  B.suggest = S.checkin ? `<section class="card suggest" aria-label="Saathi's suggestion">
     <div class="card-h" style="margin-bottom:10px"><div class="grow"><h2>Saathi's suggestion</h2><p class="xs muted">${S.checkin.ai ? 'Based on your last 7 days' : 'For today'}</p></div>${S.checkin.ai ? '<span class="badge brand">AI</span>' : ''}
       <button class="iconbtn ghost" data-act="speakCheckin" aria-label="Read aloud">${ic('speaker')}</button></div>
     ${S.checkin.loading ? '<p class="txt muted">Looking at your week…</p><div class="shimmer"></div><div class="shimmer" style="width:70%"></div>' : `<p class="txt">${esc(S.checkin.text)}</p>`}</section>` : '';
  B.composer = `<section class="card" aria-label="Tell Saathi">
    <div class="composer"><button class="mic" data-act="mic" ${busy ? 'disabled' : ''} aria-label="Speak">${ic('mic')}</button>
      <div class="grow"><h2>How is your day going?</h2><p class="small muted" style="margin-top:4px">Tap and speak. Food, water, walks, medicines, BP or sugar readings, or how you feel.</p></div></div>
    <div class="inputwrap"><textarea id="tellText" placeholder="For example: had poi with bhaji, took my BP tablet, BP was 138 by 86" aria-label="Type what you did"></textarea>
      <button class="send primary" data-act="tell" ${busy ? 'disabled' : ''} aria-label="Save">${ic('send')}</button></div>
    ${busy && !coachTyping ? `<div class="reply"><span class="av">${ic('spark')}</span><div class="typing" style="padding:8px 0"><i></i><i></i><i></i></div></div>` : ''}
    ${r && !busy ? `<div class="reply"><span class="av">${ic('spark')}</span><p class="grow">${esc(r.text)}</p><button class="iconbtn ghost" data-act="speakReply" aria-label="Read aloud" style="width:36px;min-height:36px">${ic('speaker')}</button></div>` : ''}
  </section>`;
  B.quick = `<div class="sec"><h2>Quick add</h2></div><div class="qadd">
    <button class="qbtn" data-act="waterPlus">${chipT('water')}Glass of water</button>
    <button class="qbtn" data-act="walk10">${chipT('activity')}10 min walk</button>
    <button class="qbtn" data-act="qMeal">${chipT('meal')}Meal</button>
    <button class="qbtn" data-act="qVital">${chipT('vital')}BP or sugar</button>
    <button class="qbtn" data-act="qSleep">${chipT('sleep')}Sleep</button>
    <button class="qbtn" data-act="qFeel">${chipT('mood')}How I feel</button></div>`;
  B.meds = t.medsTotal ? `<section class="card"><div class="card-h">${chipT('medicine')}<div class="grow"><h2>Medicines</h2><p class="xs muted">${t.medsTaken} of ${t.medsTotal} taken today</p></div><button class="link" data-go="meds">Manage</button></div>${medChecklist(dkey())}</section>` : '';
  const detail = e => [e.calories ? `about ${e.calories} kcal` : '', e.glasses ? `${e.glasses} glass${e.glasses > 1 ? 'es' : ''}` : '', e.minutes ? `${e.minutes} min` : '', e.hours ? `${e.hours} hours` : '', e.extra?.kind === 'bp' ? bpStatus(e.extra.sys, e.extra.dia).label : '', e.extra?.kind === 'sugar' ? sugarStatus(e.extra.value, e.extra.ctx).label : '', e.fromPhoto ? 'from photo' : ''].filter(Boolean).join(', ');
  B.log = `<div class="sec"><h2>${isToday ? "Today's log" : 'Log'}</h2><span class="small muted">${d.entries.length} ${d.entries.length === 1 ? 'entry' : 'entries'}</span></div>
  <section class="card" style="margin-top:12px">${d.entries.length ? `<ul class="tl">${[...d.entries].reverse().map(e => `<li><span class="time">${fmtTime(e.t)}</span>${chipT(e.type)}
      <div class="grow"><div class="t">${esc(e.type === 'vital' ? vitalText(e) : e.text)}</div>${detail(e) ? `<div class="xs muted" style="margin-top:2px">${esc(detail(e))}</div>` : ''}</div>
      <button class="x" data-del="${e.id}" aria-label="Delete entry">${ic('x')}</button></li>`).join('')}</ul>`
    : `<div class="empty"><div class="chip">${ic('mic')}</div><p><b>Nothing logged ${isToday ? 'yet' : 'on this day'}</b></p><p class="small">${isToday ? 'Tap the microphone and tell me about your morning.' : 'Days you log will show up here.'}</p></div>`}</section>`;
  if (!isToday){ B.alert = B.suggest = B.composer = B.quick = B.meds = ''; }
  if (wide()) return `${B.greet}<div class="grid2"><div>${B.hero}${B.composer}${B.quick}${B.log}</div><aside>${B.alert}${B.suggest}${B.meds}</aside></div>`;
  return B.greet + B.hero + B.alert + B.suggest + B.composer + B.quick + B.meds + B.log;
}
function medChecklist(k){
  const d = day(k); const meds = S.profile.meds || [];
  return MED_TIMES.map(tm => { const list = meds.filter(m => m.time === tm); if (!list.length) return '';
    return `<div class="slot"><h3>${tm}</h3>${list.map(m => `<label class="med"><input type="checkbox" data-med="${m.id}" ${d.meds?.[m.id] ? 'checked' : ''}><span class="check">${ic('check')}</span><span class="mname grow">${esc(m.name)}</span></label>`).join('')}</div>`; }).join('');
}

// ---------- views: food ----------
function vFood(){
  const k = dkey(), t = totals(k), target = calTarget(), d = day(k);
  const pct = Math.round(t.cal / target * 100);
  const meals = d.entries.filter(e => e.type === 'meal');
  const labels = [], vals = [];
  for (let i = 6; i >= 0; i--){ const dd = daysAgo(i); labels.push(i ? dd.toLocaleDateString('en-IN',{weekday:'short'}) : 'Today'); vals.push(totals(dkey(dd)).cal); }
  return `${pageHead('Food', 'What you ate today, and how it adds up.', `<div class="row noprint"><button data-act="photo">${ic('camera')} Scan my plate</button><button class="primary" data-act="qMeal">${ic('plus')} Add a meal</button></div>`)}
  <div class="grid2"><div>
  <section class="card"><div class="calbox">
    <div class="calring">${ring(pct, pct > 115 ? 'var(--warn)' : 'var(--food)', 'var(--surface-2)', 140, 12)}<div class="c"><b>${t.cal}</b><span>of ${target} kcal</span></div></div>
    <div class="grow kv">${SLOTS.map(sl => `<span>${sl}</span><b>${t.slots[sl] || 0}</b>`).join('')}</div>
  </div>
  <p class="xs muted" style="margin-top:12px">Calories are estimates. Your daily target is ${Number(S.profile.calTarget) ? 'set by you' : 'worked out from your age, height and weight'} and is a guide, not a rule.</p></section>
  ${pendingPhoto ? vPhoto() : ''}
  <section class="card"><div class="card-h">${chipT('meal')}<h2 class="grow">Today's meals</h2></div>
    ${meals.length ? SLOTS.map(sl => { const list = meals.filter(e => mealSlot(e.t) === sl); if (!list.length) return '';
      return `<div class="mealgroup"><div class="mh"><h3>${sl}</h3><span class="small muted">${list.reduce((a,e) => a + (Number(e.calories) || 0), 0)} kcal</span></div>
        ${list.map(e => `<div class="mitem"><span class="grow">${esc(e.text)}<span class="xs muted" style="display:block">${fmtTime(e.t)}${e.fromPhoto ? ', from photo' : ''}</span></span><b class="num">${e.calories || '–'}</b><button class="x iconbtn ghost" data-del="${e.id}" aria-label="Delete">${ic('x')}</button></div>`).join('')}</div>`; }).join('')
      : `<div class="empty"><div class="chip">${ic('camera')}</div><p><b>No meals yet today</b></p><p class="small">Scan your plate or say what you ate.</p></div>`}
  </section></div><aside>
  <section class="card"><div class="card-h"><span class="chip" style="background:var(--mango-soft);color:var(--warn)">${ic('spark')}</span><div class="grow"><h2>Food tip for today</h2><p class="xs muted">From Saathi, based on what you ate</p></div></div>
    ${foodTip?.loading ? '<div class="shimmer"></div><div class="shimmer" style="width:60%"></div>' : foodTip?.text ? `<p>${esc(foodTip.text)}</p>` : '<p class="small muted">Get one simple suggestion for your next meal.</p>'}
    <button class="full" style="margin-top:12px" data-act="foodTip">${ic('spark')} ${foodTip?.text ? 'Another tip' : 'Get a tip'}</button></section>
  <section class="card"><div class="card-h">${chipT('meal')}<div class="grow"><h2>Last 7 days</h2><p class="xs muted">Calories per day</p></div></div>${barChart(vals, labels, target, 'var(--food)')}</section>
  </aside></div>`;
}
function vPhoto(){
  const ph = pendingPhoto;
  return `<section class="card" aria-label="Meal photo"><div class="card-h">${chipT('meal')}<div class="grow"><h2>Your plate</h2><p class="xs muted">${ph.loading ? 'Saathi is looking…' : 'Check and confirm'}</p></div>${ph.confidence ? `<span class="badge ${ph.confidence === 'high' ? 'ok' : 'warn'}">${esc(ph.confidence[0].toUpperCase() + ph.confidence.slice(1))} confidence</span>` : ''}</div>
    <img class="photo-prev" src="${ph.dataUrl}" alt="Photo of the meal">
    ${ph.loading ? '<div class="shimmer" style="margin-top:14px"></div><div class="shimmer" style="width:60%"></div>' : `
      <p class="small muted" style="margin-top:12px">${esc(ph.error || 'I can be wrong about dishes and portions — change anything that is not right.')}</p>
      <div class="fooditem xs muted" style="margin-top:12px;font-weight:700"><span>Dish</span><span>Portion</span><span>kcal</span></div>
      <div id="foodRows">${ph.items.map(foodRow).join('')}</div>
      <div class="row" style="margin-top:12px"><button data-act="addFoodRow">${ic('plus')} Dish</button><button class="primary grow" data-act="savePhoto">${ic('check')} Save meal</button></div>
      <button class="ghost full" style="margin-top:8px" data-act="cancelPhoto">Discard</button>`}</section>`;
}
const foodRow = (i = {}) => `<div class="fooditem"><input class="fn" value="${esc(i.name || '')}" placeholder="e.g. Fish curry" aria-label="Dish"><input class="fp" value="${esc(i.portion || '')}" placeholder="1 bowl" aria-label="Portion"><input class="fc" type="number" inputmode="numeric" value="${i.calories || ''}" placeholder="0" aria-label="Calories"></div>`;

// ---------- views: health ----------
function vHealth(){
  const bp = allVitals('bp'), sg = allVitals('sugar'), wt = allVitals('weight');
  const lb = bp.at(-1), ls = sg.at(-1), lw = wt.at(-1);
  const when = v => v ? fmtDate(v.day, { day:'numeric', month:'short' }) + ', ' + fmtTime(v.t) : '';
  const card = (icon, title, value, unit, status, sub, kind) => `<div class="vcard"><div class="row">${chipC(icon, 'var(--med-soft)', 'var(--med)', 'sm')}<h3 class="grow">${title}</h3>${status ? `<span class="badge ${status.cls}"><i class="d"></i>${status.label}</span>` : ''}</div>
    <div class="vv">${value ?? '–'} <small>${value != null ? unit : 'No readings yet'}</small></div><p class="xs muted" style="margin-top:4px">${sub}</p>
    <button class="full" style="margin-top:12px;min-height:44px" data-act="qVital" data-kind="${kind}">${ic('plus')} Add reading</button></div>`;
  const wChange = wt.length > 1 ? Math.round((lw.extra.value - wt[0].extra.value) * 10) / 10 : null;
  const VT = { bp:{ list:bp, label:'Blood pressure' }, sugar:{ list:sg, label:'Blood sugar' }, weight:{ list:wt, label:'Weight' } }[vitalTab];
  const L = VT.list.slice(-14), labels = L.map(v => fmtDate(v.day, { day:'numeric', month:'short' }));
  const chart = vitalTab === 'bp' ? lineChart([{ vals:L.map(v => v.extra.sys), color:'var(--food)' }, { vals:L.map(v => v.extra.dia), color:'var(--water)' }], labels, [60, 130])
    : vitalTab === 'sugar' ? lineChart([{ vals:L.map(v => v.extra.value), color:'var(--act)' }], labels, [70, 140]) : lineChart([{ vals:L.map(v => v.extra.value), color:'var(--sleep)' }], labels, null);
  // activity trends
  const M = { water:{ f:'water', goal:S.profile.waterTarget, unit:' glasses', c:'var(--water)', label:'Water' }, activity:{ f:'walk', goal:S.profile.walkTarget, unit:' min', c:'var(--act)', label:'Activity' }, sleep:{ f:'sleep', goal:7, unit:' h', c:'var(--sleep)', label:'Sleep' } }[metric];
  const cur = weekStats(0), prev = weekStats(7); const key = { water:'water', activity:'walk', sleep:'sleep' }[metric];
  const vals = cur.rows.map(r => r[M.f]); const labs = []; for (let i = 6; i >= 0; i--) labs.push(i ? daysAgo(i).toLocaleDateString('en-IN',{weekday:'short'}) : 'Today');
  const dlt = prev[key] ? Math.round((cur[key] - prev[key]) * 10) / 10 : null;
  return `${pageHead('Health', 'Your readings and how your weeks are going.')}
  <div class="vgrid">
    ${card('bp', 'Blood pressure', lb ? `${lb.extra.sys}/${lb.extra.dia}` : null, 'mmHg', lb ? bpStatus(lb.extra.sys, lb.extra.dia) : null, lb ? 'Last reading ' + when(lb) : 'Add a reading from your BP machine', 'bp')}
    ${card('sugar', 'Blood sugar', ls ? ls.extra.value : null, `mg/dL${ls?.extra.ctx ? ', ' + ls.extra.ctx : ''}`, ls ? sugarStatus(ls.extra.value, ls.extra.ctx) : null, ls ? 'Last reading ' + when(ls) : 'Fasting or after a meal', 'sugar')}
    ${card('weight', 'Weight', lw ? lw.extra.value : null, 'kg', null, lw ? (wChange != null ? `${wChange > 0 ? '+' : ''}${wChange} kg since ${fmtDate(wt[0].day, { day:'numeric', month:'short' })}` : 'Last reading ' + when(lw)) : 'Weigh once a week, same time of day', 'weight')}
  </div>
  <div class="grid2 even">
  <section class="card"><div class="card-h"><div class="grow"><h2>Readings over time</h2><p class="xs muted">${VT.label}${vitalTab === 'bp' ? ': top number in red, bottom in blue' : ''}</p></div></div>
    <div class="seg" role="group" aria-label="Choose reading">${[['bp','BP'],['sugar','Sugar'],['weight','Weight']].map(([k2,l]) => `<button data-vt="${k2}" aria-pressed="${vitalTab === k2}">${l}</button>`).join('')}</div>
    ${chart}
    <div class="note">${ic('shield')}<span>The shaded "usual range" is a general guide for adults, not a diagnosis. Your doctor may set different targets for you.</span></div></section>
  <section class="card"><div class="card-h"><div class="grow"><h2>Daily habits</h2><p class="xs muted">Last 7 days</p></div></div>
    <div class="seg" role="group" aria-label="Choose habit">${[['water','Water'],['activity','Activity'],['sleep','Sleep']].map(([k2,l]) => `<button data-metric="${k2}" aria-pressed="${metric === k2}">${l}</button>`).join('')}</div>
    ${barChart(vals, labs, M.goal, M.c)}
    <div class="stats"><div class="stat"><span class="xs muted">Average</span><b>${cur[key]}</b>${dlt != null && cur[key] ? `<span class="trend ${dlt > 0 ? 'up' : dlt < 0 ? 'down' : 'flat'}">${dlt > 0 ? '▲ ' + dlt : dlt < 0 ? '▼ ' + Math.abs(dlt) : 'Same'} vs last week</span>` : '<span class="trend flat">This week</span>'}</div>
      <div class="stat"><span class="xs muted">Best day</span><b>${Math.max(...vals)}</b></div><div class="stat"><span class="xs muted">Goal met</span><b>${vals.filter(v => v >= M.goal).length}/7</b></div></div></section>
  </div>`;
}

// ---------- views: medicines ----------
function vMeds(){
  const meds = S.profile.meds || []; const t = totals(dkey());
  const labels = [], vals = [];
  for (let i = 6; i >= 0; i--){ const tt = totals(dkey(daysAgo(i))); labels.push(i ? daysAgo(i).toLocaleDateString('en-IN',{weekday:'short'}) : 'Today'); vals.push(tt.medsTotal ? Math.round(tt.medsTaken / tt.medsTotal * 100) : 0); }
  const w = weekStats();
  return `${pageHead('Medicines', 'Your daily schedule. Saathi reminds you but never changes your medicines.', `<button class="primary noprint" data-act="addMed">${ic('plus')} Add medicine</button>`)}
  <div class="grid2"><div>
  <section class="card"><div class="card-h">${chipT('medicine')}<div class="grow"><h2>Today</h2><p class="xs muted">${meds.length ? `${t.medsTaken} of ${t.medsTotal} taken` : 'No medicines added'}</p></div>${meds.length && t.medsTaken === t.medsTotal ? '<span class="badge ok"><i class="d"></i>All done</span>' : ''}</div>
    ${meds.length ? medChecklist(dkey()) : `<div class="empty"><div class="chip">${ic('medicine')}</div><p><b>No medicines yet</b></p><p class="small">Add the medicines you take every day to get a simple checklist.</p></div>`}</section>
  <section class="card"><div class="card-h"><h2 class="grow">Your medicines</h2></div>
    ${meds.length ? meds.map(m => `<div class="mitem"><span class="grow"><b>${esc(m.name)}</b><span class="xs muted" style="display:block">${m.time}</span></span><button class="iconbtn ghost" data-act="editMed" data-id="${m.id}" aria-label="Edit ${esc(m.name)}">${ic('edit')}</button><button class="iconbtn ghost" data-act="delMed" data-id="${m.id}" aria-label="Remove ${esc(m.name)}">${ic('trash')}</button></div>`).join('') : '<p class="small muted">Nothing added yet.</p>'}
  </section></div><aside>
  <section class="card"><div class="card-h"><div class="grow"><h2>Last 7 days</h2><p class="xs muted">Share of medicines ticked each day</p></div>${w.adherence != null ? `<span class="badge ${w.adherence >= 80 ? 'ok' : 'warn'}">${w.adherence}%</span>` : ''}</div>${barChart(vals, labels, 100, 'var(--med)', '%')}</section>
  <section class="card"><div class="note" style="margin-top:0">${ic('shield')}<span>Never stop or change a medicine without talking to your doctor. If you miss a dose, ask your doctor or pharmacist what to do.</span></div></section>
  </aside></div>`;
}
function medSheet(m){
  const isNew = !m; m = m || { id: uid(), name:'', time:'Morning' };
  openSheet(`<h2>${isNew ? 'Add a medicine' : 'Edit medicine'}</h2>
    <label class="f" for="mName">Name</label><input id="mName" value="${esc(m.name)}" placeholder="e.g. BP tablet">
    <label class="f">When do you take it?</label><div class="choice" id="mTimes">${MED_TIMES.map(t => `<button data-t="${t}" aria-pressed="${m.time === t}">${t}</button>`).join('')}</div>
    <div class="row end"><button data-close>Cancel</button><button class="primary" id="mSave">Save</button></div>`, () => {
      let time = m.time;
      document.querySelectorAll('#mTimes button').forEach(b => b.onclick = () => { time = b.dataset.t; document.querySelectorAll('#mTimes button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
      $('#mSave').onclick = () => { const name = $('#mName').value.trim(); if (!name){ $('#mName').focus(); return; }
        const list = S.profile.meds || (S.profile.meds = []); const ex = list.find(x => x.id === m.id);
        if (ex) Object.assign(ex, { name, time }); else list.push({ id: m.id, name, time });
        closeSheet(); save(); render(); toast(isNew ? 'Medicine added' : 'Medicine updated'); };
    });
}

// ---------- views: coach ----------
function vCoach(){
  const sugg = ['Is poi okay for my sugar?', 'Light dinner ideas', 'Easy exercises for knee pain', 'Why is my BP high in the morning?'];
  return `${pageHead('Coach', 'Short, simple answers about food, water, walking, sleep and your readings. Not medical advice.')}
  ${S.chat.length ? '' : `<section class="card" style="text-align:center"><div class="empty" style="padding:6px"><div class="chip">${ic('spark')}</div><p><b>Ask me anything</b></p><p class="small">I know your profile and today's numbers. I am not a doctor.</p></div></section>`}
  <div class="chips" style="margin-top:14px">${sugg.map(s => `<button class="qchip" data-q="${esc(s)}" ${busy ? 'disabled' : ''}>${esc(s)}</button>`).join('')}</div>
  <section class="chat" aria-live="polite">${S.chat.map(m => `<div class="bubble ${m.me ? 'me' : 'ai'}">${esc(m.text)}</div>`).join('')}${coachTyping ? '<div class="bubble ai typing"><i></i><i></i><i></i></div>' : ''}<div id="chatEnd"></div></section>
  ${S.chat.length ? '<button class="link" style="margin-top:10px" data-act="clearChat">Clear conversation</button>' : ''}
  <div class="dock"><div class="card"><textarea id="askText" placeholder="Type your question…" aria-label="Your question"></textarea>
    <button class="iconbtn primary" style="width:52px;min-height:52px;border-radius:16px" data-act="ask" ${busy ? 'disabled' : ''} aria-label="Send">${ic('send')}</button>
    <button class="mic" data-act="micAsk" ${busy ? 'disabled' : ''} aria-label="Speak your question">${ic('mic')}</button></div></div>`;
}

// ---------- views: reports ----------
function vReports(){
  const w = weekStats(), p = S.profile;
  const bp = allVitals('bp').filter(v => v.t > daysAgo(7).getTime()), sg = allVitals('sugar').filter(v => v.t > daysAgo(7).getTime());
  const avgBP = bp.length ? `${Math.round(bp.reduce((a,v) => a + v.extra.sys, 0) / bp.length)}/${Math.round(bp.reduce((a,v) => a + v.extra.dia, 0) / bp.length)}` : '–';
  const range = `${fmtDate(dkey(daysAgo(6)), { day:'numeric', month:'short' })} to ${fmtDate(dkey(), { day:'numeric', month:'short' })}`;
  return `${pageHead('Reports', `Weekly summary, ${range}.`, `<button class="noprint" data-act="print">${ic('download')} Download PDF</button>`)}
  <div class="grid2 even"><div>
  <section class="card"><div class="card-h">${chipC('report','var(--brand-soft)','var(--brand)')}<div class="grow"><h2>${esc(p.name || 'Your')} week at a glance</h2><p class="xs muted">${range}</p></div></div>
    <div class="kv">
      <span>Average water</span><b>${w.water} glasses</b>
      <span>Average activity</span><b>${w.walk} min</b>
      <span>Days activity goal met</span><b>${w.activeDays} of 7</b>
      <span>Average sleep</span><b>${w.sleep || '–'} h</b>
      <span>Meals logged</span><b>${w.meals}</b>
      <span>Average calories</span><b>${w.cal || '–'} kcal</b>
      <span>Medicines taken</span><b>${w.adherence != null ? w.adherence + '%' : '–'}</b>
      <span>Average BP</span><b>${avgBP}${bp.length ? ` (${bp.length})` : ''}</b>
      <span>Sugar readings</span><b>${sg.length ? sg.map(v => v.extra.value).join(', ') : '–'}</b>
    </div>
    ${w.symptoms.length ? `<p class="small" style="margin-top:14px"><b>Mentioned this week:</b> ${esc(w.symptoms.join('; '))}</p>` : ''}
  </section></div><div>
  <section class="card"><div class="card-h"><span class="chip" style="background:var(--mango-soft);color:var(--warn)">${ic('spark')}</span><div class="grow"><h2>Note for family</h2><p class="xs muted">Written by Saathi from the week</p></div></div>
    ${weekReport ? (weekReport.loading ? '<div class="shimmer"></div><div class="shimmer"></div><div class="shimmer" style="width:55%"></div>'
      : `<div class="summary">${esc(weekReport.text)}</div><div class="row noprint" style="margin-top:12px"><a class="btn primary grow" target="_blank" rel="noopener" href="${waLink(weekReport.text, p.caretakerPhone)}">${ic('share')} Send on WhatsApp</a><button class="iconbtn" style="width:52px;min-height:52px" data-act="copyReport" aria-label="Copy">${ic('copy')}</button></div>`)
      : '<p class="small muted">A short, friendly summary of the week to send to your family in one tap.</p>'}
    <button class="full noprint" style="margin-top:12px" data-act="weekReport">${ic('spark')} ${weekReport ? 'Write it again' : 'Write the weekly note'}</button></section>
  <p class="xs muted" style="margin-top:14px">Generated by Dempo Saathi on ${fmtDate(dkey())}. Not medical advice. Share with your doctor if useful.</p>
  </div></div>`;
}

// ---------- views: family ----------
function vFamily(){
  const p = S.profile;
  return `${pageHead('Family and safety', 'Help is one tap away.')}
  <div class="grid2 even"><section class="card"><div class="card-h"><span class="chip" style="background:var(--danger-soft);color:var(--danger)">${ic('alert')}</span><div class="grow"><h2>Emergency</h2><p class="xs muted">Calls start straight away</p></div></div>
    <div class="sosgrid">
      ${p.caretakerPhone ? `<a class="btn danger" href="tel:${esc(p.caretakerPhone)}"><span class="chip">${ic('phone')}</span><span class="grow">Call ${esc(p.caretakerName || 'caretaker')}<span class="sub">${esc(p.caretakerPhone)}</span></span></a>` : ''}
      <a class="btn danger" href="tel:112"><span class="chip">${ic('ambulance')}</span><span class="grow">Call 112<span class="sub">National emergency number</span></span></a>
      ${p.doctorPhone ? `<a class="btn plain" href="tel:${esc(p.doctorPhone)}"><span class="chip">${ic('doctor')}</span><span class="grow">Call doctor<span class="sub">${esc(p.doctorPhone)}</span></span></a>` : ''}
    </div>
    ${!p.caretakerPhone ? `<button class="ghost full" style="margin-top:10px" data-act="openSec" data-sec="family">${ic('plus')} Add a caretaker number</button>` : ''}</section>
  <section class="card"><div class="card-h">${chipT('mood')}<div class="grow"><h2>Share today</h2><p class="xs muted">Send a quick update to ${esc(p.caretakerName || 'your family')}</p></div></div>
    <div class="summary">${esc(plainSummary())}</div>
    <a class="btn primary full" style="margin-top:12px" target="_blank" rel="noopener" href="${waLink(plainSummary(), p.caretakerPhone)}">${ic('share')} Send on WhatsApp</a>
    <div class="note">${ic('shield')}<span>Your family sees only what you choose to send. Nothing is shared automatically.</span></div></section></div>`;
}

// ---------- views: more (phone) ----------
function vMore(){
  const row = (go, icon, bg, c, title, sub) => `<button class="lrow" data-go="${go}">${chipC(icon, bg, c)}<span class="grow"><b>${title}</b><small>${sub}</small></span>${ic('chev','i chev')}</button>`;
  return `${pageHead('More')}
  <div class="group" style="margin-top:16px">
    ${row('meds','medicine','var(--med-soft)','var(--med)','Medicines','Schedule and checklist')}
    ${row('coach','coach','var(--brand-soft)','var(--brand)','Coach','Ask Saathi a question')}
    ${row('reports','report','var(--mango-soft)','var(--warn)','Reports','Weekly summary and PDF')}
    ${row('family','family','var(--food-soft)','var(--food)','Family and safety','SOS and share with family')}
    ${row('settings','settings','var(--surface-2)','var(--ink-2)','Settings','Profile, AI and your data')}
  </div>
  ${cloud.user ? `<div class="group" style="margin-top:16px"><button class="lrow red" data-act="cloudOut">${chipC('logout','var(--danger-soft)','var(--danger)')}<span class="grow"><b>Sign out</b></span></button></div>` : ''}
  <p class="xs muted" style="text-align:center;margin-top:22px">Dempo Saathi 5.0. A health companion, not a doctor. Not medical advice.</p>`;
}

// ---------- views: settings ----------
function vSettings(){
  const p = S.profile, st = S.settings;
  const f = (id, label, val, type = 'text', extra = '') => `<label class="f" for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(val)}" ${extra}>`;
  const tog = (id, label, on) => `<label class="toggle"><span>${label}</span><input type="checkbox" id="${id}" ${on ? 'checked' : ''}><span class="sw"></span></label>`;
  const SEC = {
    about: ['Personal details', () => `<section class="card"><div class="card-h"><h2 class="grow">About you</h2><button class="iconbtn primary" data-act="micProfile" aria-label="Fill by speaking" style="border-radius:50%">${ic('mic')}</button></div>
      ${f('pName','Full name',p.name)}
      <div class="two"><div>${f('pAge','Age',p.age,'number','inputmode="numeric"')}</div><div><label class="f" for="pSex">Sex</label><select id="pSex"><option value="">Select</option>${['female','male','other'].map(o => `<option value="${o}" ${p.sex===o?'selected':''}>${o[0].toUpperCase()+o.slice(1)}</option>`).join('')}</select></div></div>
      <div class="two"><div>${f('pHeight','Height (cm)',p.height,'number','inputmode="numeric"')}</div><div>${f('pWeight','Weight (kg)',p.weight,'number','inputmode="decimal"')}</div></div>
      <label class="f" for="pDiet">Food preference</label><select id="pDiet">${[['veg','Vegetarian'],['nonveg','Non-vegetarian'],['egg','Eggetarian'],['jain','Jain']].map(([v,l]) => `<option value="${v}" ${p.diet===v?'selected':''}>${l}</option>`).join('')}</select>
      ${f('pCond','Health conditions (optional)',p.conditions,'text','placeholder="e.g. diabetes, BP, knee pain"')}</section>`],
    goals: ['Daily goals', () => `<section class="card">${f('pGoal','Your goal',p.goal)}
      <div class="three"><div>${f('pWater','Water (glasses)',p.waterTarget,'number','inputmode="numeric"')}</div><div>${f('pWalk','Activity (min)',p.walkTarget,'number','inputmode="numeric"')}</div><div>${f('pCal','Calories (kcal)',p.calTarget,'number',`inputmode="numeric" placeholder="${calTarget()}"`)}</div></div>
      <p class="xs muted" style="margin-top:10px">Leave calories empty to use an estimate from your age, height and weight.</p></section>`],
    family: ['Family contacts', () => `<section class="card"><p class="small muted">The SOS button calls your caretaker. If no number is saved, it calls 112.</p>
      ${f('pCName','Caretaker name',p.caretakerName,'text','placeholder="e.g. Rahul (son)"')}${f('pCPhone','Caretaker mobile',p.caretakerPhone,'tel','placeholder="10-digit number" inputmode="tel"')}${f('pDPhone','Doctor (optional)',p.doctorPhone,'tel','inputmode="tel"')}</section>`],
    display: ['Language and display', () => `<section class="card"><label class="f" for="sLang" style="margin-top:0">Saathi speaks in</label><select id="sLang">${Object.entries(LANGS).map(([k,v]) => `<option value="${k}" ${st.lang===k?'selected':''}>${v.name}</option>`).join('')}</select>
      <div style="margin-top:10px">${tog('sBig','Extra large text',st.big)}${tog('sSpeak','Read replies aloud',st.speak)}</div></section>`],
    ai: ['Saathi AI', () => `<section class="card"><div class="card-h">${chipC('spark','var(--sleep-soft)','var(--sleep)')}<div class="grow"><h2>Status</h2><p class="xs muted">${ai.proxy ? 'Connected through this website' : st.apiKey ? 'Using your own key' : 'Not connected'}</p></div>${aiReady() ? '<span class="badge ok"><i class="d"></i>Ready</span>' : '<span class="badge warn"><i class="d"></i>Off</span>'}</div>
      <p class="small muted">${ai.proxy ? 'Saathi AI works on this website with no setup. You can optionally use your own Google Gemini key instead.' : 'To switch Saathi AI on, paste a free Google Gemini API key from aistudio.google.com. Without it, Saathi still logs water, walks, meals and readings.'}</p>
      ${f('sKey','Personal Gemini API key (optional)',st.apiKey,'password','autocomplete="off" placeholder="AIza…"')}
      <button class="full" style="margin-top:12px" data-act="testAI">${ic('spark')} Test Saathi AI</button>
      <div class="note">${ic('shield')}<span>A personal key stays on this device and is never saved online. Only what you send to Saathi goes to Google Gemini. On the free tier Google may use it to improve its models, so avoid very personal details like Aadhaar numbers.</span></div></section>`],
    cloud: ['Account', () => vCloudCard()]
  };
  if (sSection){
    const [title, fn] = SEC[sSection];
    return `<button class="backbtn" data-act="sBack">${ic('back')} Settings</button>${pageHead(title)}<div style="max-width:720px">${fn()}
      ${sSection !== 'cloud' ? '<div class="savebar"><button class="primary" data-act="saveSettings">Save changes</button></div>' : ''}</div>`;
  }
  const entries = Object.values(S.days).reduce((a, d) => a + d.entries.length, 0);
  const daysLogged = Object.values(S.days).filter(d => d.entries.length).length;
  const sub = [p.age ? p.age + ' years' : '', p.sex ? p.sex[0].toUpperCase() + p.sex.slice(1) : '', ({veg:'Vegetarian',nonveg:'Non-vegetarian',egg:'Eggetarian',jain:'Jain'})[p.diet]].filter(Boolean).join(', ');
  const row = (sec, icon, title, small, cls = '') => `<button class="lrow ${cls}" data-act="openSec" data-sec="${sec}">${icon}<span class="grow"><b>${title}</b>${small ? `<small>${esc(small)}</small>` : ''}</span>${ic('chev','i chev')}</button>`;
  const av = cloud.user?.imageUrl;
  return `${pageHead('Settings')}
  <section class="card"><div class="phero"><div class="bigav" ${av ? `style="background-image:url('${esc(av)}')"` : ''}>${av ? '' : (initials() || ic('user'))}</div>
      <div class="grow"><h2 style="font-size:1.35rem">${esc(p.name)}</h2><p class="small muted">${esc(sub)}</p>
        <span class="badge ${cloud.user ? 'ok' : ''}" style="margin-top:6px"><i class="d"></i>${cloud.user ? 'Saved online' : 'Only on this phone'}</span></div>
      <button class="iconbtn ghost" data-act="openSec" data-sec="about" aria-label="Edit personal details">${ic('edit')}</button></div>
    <div class="pstats"><div><b>${streak()}</b><span>day streak</span></div><div><b>${daysLogged}</b><span>days logged</span></div><div><b>${entries}</b><span>entries</span></div></div></section>
  <div class="grid2 even"><div>
  <p class="ghead">Health</p><div class="group">
    ${row('about', chipC('user','var(--brand-soft)','var(--brand)'), 'Personal details', [sub, p.conditions].filter(Boolean).join(', '))}
    <button class="lrow" data-go="meds">${chipT('medicine')}<span class="grow"><b>Medicines</b><small>${(p.meds || []).length ? (p.meds || []).map(m => m.name).join(', ') : 'None added'}</small></span>${ic('chev','i chev')}</button>
    ${row('goals', chipT('activity'), 'Daily goals', `${p.waterTarget} glasses, ${p.walkTarget} min, ${calTarget()} kcal`)}
  </div>
  <p class="ghead">Safety</p><div class="group">${row('family', chipC('family','var(--food-soft)','var(--food)'), 'Family contacts', p.caretakerName ? p.caretakerName + (p.caretakerPhone ? ', ' + p.caretakerPhone : '') : 'Add a caretaker for SOS')}</div>
  </div><div>
  <p class="ghead">App</p><div class="group">
    ${cloud.enabled ? row('cloud', chipC('shield','var(--water-soft)','var(--water)'), 'Account', cloud.user ? 'Signed in as ' + (cloud.user.primaryEmailAddress?.emailAddress || 'you') : 'Sign in to keep a safe copy online') : ''}
    ${row('ai', chipC('spark','var(--sleep-soft)','var(--sleep)'), 'Saathi AI', aiReady() ? 'Ready' : 'Not connected')}
    ${row('display', chipC('globe','var(--water-soft)','var(--water)'), 'Language and display', (LANGS[st.lang]?.name || 'English') + (st.big ? ', large text' : ''))}
  </div>
  <p class="ghead">Data</p><div class="group">
    <button class="lrow" data-act="export">${chipC('download','var(--surface-2)','var(--ink-2)')}<span class="grow"><b>Back up to a file</b></span>${ic('chev','i chev')}</button>
    <button class="lrow" data-act="import">${chipC('upload','var(--surface-2)','var(--ink-2)')}<span class="grow"><b>Restore from a file</b></span>${ic('chev','i chev')}</button>
    <button class="lrow" data-act="demo">${chipC('chart','var(--surface-2)','var(--ink-2)')}<span class="grow"><b>Load a sample week</b><small>For demos. Adds made-up data.</small></span>${ic('chev','i chev')}</button>
    <button class="lrow red" data-act="reset">${chipC('trash','var(--danger-soft)','var(--danger)')}<span class="grow"><b>Delete all data on this phone</b></span>${ic('chev','i chev')}</button>
    ${cloud.user ? `<button class="lrow red" data-act="cloudOut">${chipC('logout','var(--danger-soft)','var(--danger)')}<span class="grow"><b>Sign out</b></span></button>` : ''}
  </div></div></div>
  <input type="file" id="importFile" accept="application/json" class="hidden">
  <p class="xs muted" style="text-align:center;margin-top:22px">Dempo Saathi 5.0. A health companion, not a doctor. Not medical advice.</p>`;
}

// ---------- events ----------
function bind(){
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  document.querySelectorAll('[data-day]').forEach(b => b.onclick = () => { selDay = b.dataset.day; render(); });
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => removeEntry(b.dataset.del));
  document.querySelectorAll('[data-med]').forEach(c => c.onchange = () => { const d = day(dkey()); d.meds[c.dataset.med] = c.checked; save(); if (c.checked) toast('Marked as taken'); render(); });
  document.querySelectorAll('[data-q]').forEach(b => b.onclick = () => askCoach(b.dataset.q));
  document.querySelectorAll('[data-metric]').forEach(b => b.onclick = () => { metric = b.dataset.metric; render(); });
  document.querySelectorAll('[data-vt]').forEach(b => b.onclick = () => { vitalTab = b.dataset.vt; render(); });
  document.querySelectorAll('[data-act]').forEach(b => b.onclick = () => ACT[b.dataset.act]?.(b));
  const tt = $('#tellText'); if (tt) tt.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); ACT.tell(); } };
  const at = $('#askText'); if (at) at.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); ACT.ask(); } };
}
function vitalSheet(kind = 'bp'){
  const body = k => k === 'bp' ? `<div class="two"><div><label class="f" for="vSys">Top number</label><input id="vSys" type="number" inputmode="numeric" placeholder="e.g. 130"></div><div><label class="f" for="vDia">Bottom number</label><input id="vDia" type="number" inputmode="numeric" placeholder="e.g. 85"></div></div>`
    : k === 'sugar' ? `<label class="f" for="vVal">Sugar (mg/dL)</label><input id="vVal" type="number" inputmode="numeric" placeholder="e.g. 110"><label class="f">When?</label><div class="choice" id="vCtx">${['fasting','after meal','random'].map((c, i) => `<button data-c="${c}" aria-pressed="${i === 0}">${c[0].toUpperCase() + c.slice(1)}</button>`).join('')}</div>`
    : `<label class="f" for="vVal">Weight (kg)</label><input id="vVal" type="number" inputmode="decimal" placeholder="e.g. 62.5">`;
  openSheet(`<h2>Add a reading</h2>
    <div class="seg" id="vTabs">${[['bp','Blood pressure'],['sugar','Sugar'],['weight','Weight']].map(([k,l]) => `<button data-k="${k}" aria-pressed="${kind === k}">${l}</button>`).join('')}</div>
    <div id="vBody">${body(kind)}</div>
    <div class="row end"><button data-close>Cancel</button><button class="primary" id="vSave">Save</button></div>`, () => {
      let k = kind, ctx = 'fasting';
      const wire = () => { document.querySelectorAll('#vCtx button').forEach(b => b.onclick = () => { ctx = b.dataset.c; document.querySelectorAll('#vCtx button').forEach(x => x.setAttribute('aria-pressed', x === b)); }); };
      wire();
      document.querySelectorAll('#vTabs button').forEach(b => b.onclick = () => { k = b.dataset.k; ctx = 'fasting'; document.querySelectorAll('#vTabs button').forEach(x => x.setAttribute('aria-pressed', x === b)); $('#vBody').innerHTML = body(k); wire(); });
      $('#vSave').onclick = () => {
        let extra;
        if (k === 'bp'){ const sys = Number($('#vSys').value), dia = Number($('#vDia').value); if (!(sys > 60 && sys < 260 && dia > 30 && dia < 160)){ toast('Please check both numbers'); return; } extra = { kind:'bp', sys, dia }; }
        else { const v = Number($('#vVal').value); if (!(v > 0)){ toast('Please enter a number'); return; } if (k === 'sugar' && (v < 20 || v > 600)){ toast('Please check the number'); return; } extra = { kind:k, value:v, ...(k === 'sugar' ? { ctx } : {}) }; }
        closeSheet(); addEntry({ type:'vital', text: vitalText({ extra }), extra });
        const a = vitalAlert(extra); if (a){ S.lastReply = { text:'Reading saved.', alert:a, at:Date.now() }; persist(); go('today'); } else { render(); toast('Reading saved'); }
      };
    });
}
const ACT = {
  guest: () => { S.guest = true; persist(); render(); },
  toLogin: () => { S.guest = false; persist(); render(); },
  cloudIn: () => cloudSignIn(),
  cloudOut: () => cloudSignOut(),
  cloudSync: () => cloudPush().then(() => toast(cloud.status || 'Saved online')),
  setupNext: () => { readSetup();
    if (setupStep === 1 && !S.profile.name){ toast('Please enter your name'); $('#pName')?.focus(); return; }
    if (setupStep < 3){ setupStep++; persist(); render(); window.scrollTo(0,0); return; }
    S.onboarded = true; setupActive = false; save(); setupStep = 1; view = 'today'; render(); runCheckin(); toast('Welcome to Dempo Saathi'); },
  setupBack: () => { readSetup(); setupStep = Math.max(1, setupStep - 1); render(); },
  addMedRow: () => $('#medRows').insertAdjacentHTML('beforeend', medRow({ id: uid(), name:'', time:'Morning' })) || bind(),
  delMedRow: b => { b.closest('.medrow').remove(); },
  fab: () => {
    if (view === 'coach') return ACT.micAsk();
    const o = (act, icon, t, sub) => `<button class="opt" data-o="${act}">${icon}<span class="grow"><b>${t}</b><small>${sub}</small></span></button>`;
    openSheet(`<h2>Log something</h2><div class="opts">
        ${o('speak', chipC('mic','var(--brand)','#fff'), 'Speak to Saathi', 'Say anything: food, water, medicines, readings')}
        ${o('photo', chipT('meal'), 'Scan my plate', 'Calories from a photo')}
        ${o('vital', chipT('vital'), 'Add BP, sugar or weight', 'From your machine at home')}
        ${o('water', chipT('water'), 'Add a glass of water', 'One tap')}
        ${o('walk', chipT('activity'), 'Add a 10 minute walk', 'One tap')}</div>
      <div class="row end"><button data-close>Close</button></div>`, () => {
        document.querySelectorAll('[data-o]').forEach(b => b.onclick = () => { const a = b.dataset.o; closeSheet();
          ({ speak: () => { go('today'); listen(t => tellSaathi(t)); }, photo: ACT.photo, vital: () => vitalSheet('bp'), water: ACT.waterPlus, walk: ACT.walk10 })[a](); });
      });
  },
  mic: () => listen(t => tellSaathi(t)),
  tell: () => tellSaathi($('#tellText').value),
  photo: () => $('#photoInput').click(),
  waterPlus: () => { addEntry({ type:'water', text:'Glass of water', glasses:1 }); render(); toast('Water added'); },
  walk10: () => { addEntry({ type:'activity', text:'Walk', minutes:10 }); render(); toast('Lovely! 10 minutes added'); },
  qMeal: () => textSheet('What did you eat?', 'Saathi will estimate the calories.', 'e.g. 2 chapati with dal and bhendi', v => tellSaathi('I ate ' + v)),
  qVital: b => vitalSheet(b?.dataset?.kind || 'bp'),
  qSleep: () => openSheet(`<h2>How long did you sleep?</h2><p class="muted small" style="margin-top:6px">Last night, in hours.</p>
      <div class="choice">${[4,5,6,6.5,7,7.5,8,9].map(h => `<button data-h="${h}">${h}</button>`).join('')}</div><div class="row end"><button data-close>Cancel</button></div>`, () => {
      document.querySelectorAll('[data-h]').forEach(b => b.onclick = () => { const h = Number(b.dataset.h); closeSheet(); addEntry({ type:'sleep', text:`Slept ${h} hours`, hours:h }); render(); toast('Sleep saved'); }); }),
  qFeel: () => openSheet(`<h2>How do you feel today?</h2>
      <div class="moods">${[['face5','Great'],['face4','Good'],['face3','Okay'],['face2','Low'],['face1','Unwell']].map(([f,l]) => `<button data-m="${l}">${ic(f)}${l}</button>`).join('')}</div>
      <label class="f" for="feelText">Anything bothering you? (optional)</label><textarea id="feelText" rows="2" placeholder="e.g. knee pain since morning"></textarea>
      <div class="row end"><button data-close>Cancel</button></div>`, () => {
      document.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const extraTxt = $('#feelText').value.trim(); closeSheet();
        addEntry({ type:'mood', text:'Feeling ' + b.dataset.m.toLowerCase() }); render();
        if (extraTxt) tellSaathi('Symptom: ' + extraTxt); else toast('Saved'); }); }),
  speakCheckin: () => speak(S.checkin?.text),
  speakReply: () => speak(S.lastReply?.text),
  addFoodRow: () => $('#foodRows').insertAdjacentHTML('beforeend', foodRow()),
  savePhoto: savePhotoMeal,
  cancelPhoto: () => { pendingPhoto = null; render(); },
  foodTip: async () => { foodTip = { loading:true }; render();
    try { const meals = day().entries.filter(e => e.type === 'meal').map(e => `${fmtTime(e.t)} ${e.text} (${e.calories || '?'} kcal)`).join('; ');
      foodTip.text = await gemini([{ text: `Profile: ${profileText()}\nMeals today: ${meals || 'none yet'}. Calorie target ${calTarget()}.\nGive ONE short, practical suggestion (max 2 sentences) for this person's next meal today, using Goan/Indian home food they would actually eat. In ${langName()}.` }], { temperature:0.6 });
    } catch(e){ foodTip.text = e.message === 'NO_KEY' ? 'Saathi AI is not connected yet. A simple rule: half the plate vegetables, a quarter dal or fish, a quarter rice or chapati.' : 'Could not get a tip right now. Try again in a moment.'; }
    foodTip.loading = false; render(); },
  addMed: () => medSheet(),
  editMed: b => medSheet((S.profile.meds || []).find(m => m.id === b.dataset.id)),
  delMed: async b => { const m = (S.profile.meds || []).find(x => x.id === b.dataset.id); if (!m) return;
    if (await confirmSheet('Remove ' + m.name + '?', 'It will no longer appear in your daily checklist.', 'Remove', true)){ S.profile.meds = S.profile.meds.filter(x => x.id !== m.id); save(); render(); } },
  micAsk: () => listen(t => askCoach(t), 'Ask your question'),
  ask: () => askCoach($('#askText').value),
  clearChat: async () => { if (await confirmSheet('Clear conversation?', 'Your chat with the coach will be removed.', 'Clear')){ S.chat = []; save(); render(); } },
  weekReport: makeWeekReport,
  copyReport: () => { navigator.clipboard?.writeText(weekReport?.text || '').then(() => toast('Copied')); },
  print: () => window.print(),
  openSec: b => { view = 'settings'; sSection = b.dataset.sec; render(); window.scrollTo(0,0); },
  sBack: () => { sSection = null; render(); window.scrollTo(0,0); },
  micProfile: () => listen(fillProfileFromSpeech, 'Tell me your name, age, food habits, health conditions and medicines'),
  testAI: async () => { ACT.saveSettings(true);
    try { await gemini([{ text:'Reply with exactly: ready' }]); toast('Saathi AI is working', 4000); }
    catch(e){ toast('Not working: ' + (e.message === 'NO_KEY' ? 'not connected yet' : e.message.slice(0,90)), 6000); }
    render(); },
  saveSettings: (quiet) => {
    const p = S.profile, st = S.settings;
    const v = (id, cur) => $('#' + id) ? $('#' + id).value.trim() : cur, c = (id, cur) => $('#' + id) ? $('#' + id).checked : cur;
    if (quiet !== true && $('#pName') && !v('pName')){ toast('Please enter your name'); $('#pName').focus(); return; }
    Object.assign(p, { name:v('pName', p.name), age:v('pAge', p.age), sex:v('pSex', p.sex), height:v('pHeight', p.height), weight:v('pWeight', p.weight), diet:v('pDiet', p.diet), conditions:v('pCond', p.conditions), goal:v('pGoal', p.goal) || DEFAULT.profile.goal,
      waterTarget: Number(v('pWater', p.waterTarget)) || 8, walkTarget: Number(v('pWalk', p.walkTarget)) || 30, calTarget: v('pCal', p.calTarget), caretakerName:v('pCName', p.caretakerName), caretakerPhone:v('pCPhone', p.caretakerPhone), doctorPhone:v('pDPhone', p.doctorPhone) });
    const newKey = v('sKey', st.apiKey); const keyChanged = st.apiKey !== newKey;
    Object.assign(st, { lang:v('sLang', st.lang), big:c('sBig', st.big), speak:c('sSpeak', st.speak), apiKey:newKey, model: keyChanged ? '' : st.model });
    if (keyChanged) S.checkin = null;
    save();
    if (quiet !== true){ toast('Saved'); sSection = null; render(); window.scrollTo(0,0); }
  },
  export: () => { const a = document.createElement('a'); const data = { ...S, settings:{ ...S.settings, apiKey:'' } }; a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type:'application/json' })); a.download = `dempo-saathi-backup-${dkey()}.json`; a.click(); toast('Backup downloaded'); },
  import: () => { const inp = $('#importFile'); inp.onchange = async () => { try { const d = JSON.parse(await inp.files[0].text()); const key = S.settings.apiKey; S = hydrate(d); S.settings.apiKey = key; save(); toast('Backup restored'); render(); } catch(e){ toast('That file could not be read'); } }; inp.click(); },
  demo: async () => { if (!await confirmSheet('Load a sample week?', 'Adds 6 days of made-up example data (meals, water, walks, medicines, BP and sugar) so you can see every screen. Good for a demo.', 'Load sample')) return;
    loadDemo(); S.guest = S.guest || !cloud.user; setupActive = false; setupStep = 1; save(); toast('Sample week added'); view = 'today'; render(); window.scrollTo(0,0); runCheckin(true); },
  reset: async () => { if (!await confirmSheet('Delete all data on this phone?', 'Everything Saathi has saved on this phone will be removed. Data saved online stays in your account.', 'Delete', true)) return;
    const key = S.settings.apiKey, guest = S.guest; S = hydrate(null); S.settings.apiKey = key; S.guest = guest; persist(); pendingPhoto = null; weekReport = null; foodTip = null; view = 'today'; render(); }
};
$('#photoInput').onchange = e => { const f = e.target.files[0]; e.target.value = ''; handlePhoto(f); };

async function fillProfileFromSpeech(text){
  toast('Filling in your details…');
  try {
    const out = await gemini([{ text: `From what this older person said, fill their profile. Said: """${text}"""
Return ONLY JSON with any of these keys you can fill (omit unknown): {"name":"","age":number,"sex":"female|male|other","height":number,"weight":number,"diet":"veg|nonveg|egg|jain","conditions":"comma list","meds":[{"name":"","time":"Morning|Afternoon|Evening|Night"}],"caretakerName":"","caretakerPhone":""}` }], { json:true });
    const map = { name:'pName', age:'pAge', sex:'pSex', height:'pHeight', weight:'pWeight', diet:'pDiet', conditions:'pCond', caretakerName:'pCName', caretakerPhone:'pCPhone' };
    let filled = 0;
    for (const [k, id] of Object.entries(map)) if (out[k] != null && out[k] !== ''){ if ($('#' + id)) $('#' + id).value = out[k]; else S.profile[k] = String(out[k]); filled++; }
    if (Array.isArray(out.meds) && out.meds.length){ S.profile.meds = out.meds.filter(m => m.name).map(m => ({ id: uid(), name: m.name, time: MED_TIMES.includes(m.time) ? m.time : 'Morning' })); filled++; persist(); }
    toast(filled ? `Filled ${filled} details — please check them` : 'I could not pick out details. Please type them.', 4500);
  } catch(e){ toast(e.message === 'NO_KEY' ? 'Saathi AI is not connected yet. Please type instead.' : 'Could not fill automatically. Please type.', 4500); }
}

function loadDemo(){
  const meals = [['Tea with 2 Marie biscuits',120,8],['Poi with potato bhaji',380,9],['Fish curry rice with sol kadhi',520,13],['Chapati, dal and bhendi sabzi',430,13],['Upma',250,8],['Ukde rice with dal and vegetables',480,20],['Banana',100,17]];
  if (!S.profile.name) Object.assign(S.profile, { name:'Shanta Naik', age:'67', sex:'female', height:'155', weight:'64', diet:'nonveg', conditions:'BP, mild knee pain', caretakerName:'Rahul (son)',
    meds:[{ id:'m1', name:'BP tablet', time:'Morning' }, { id:'m2', name:'Calcium', time:'Afternoon' }, { id:'m3', name:'Vitamin D', time:'Night' }] });
  const meds = S.profile.meds;
  for (let i = 6; i >= 1; i--){
    const d = daysAgo(i); d.setHours(8,0,0,0); const k = dkey(d);
    const at = (h, m) => { const x = new Date(d); x.setHours(h, m ?? Math.floor(Math.random()*50)); return x.getTime(); };
    const e = []; const sl = [6,7,5.5,7,6.5,8][i-1];
    e.push({ id:uid(), t:at(7), type:'sleep', text:`Slept ${sl} hours`, hours:sl });
    const bp = [[142,88],[136,86],[148,92],[132,84],[138,85],[130,82]][i-1];
    e.push({ id:uid(), t:at(7,30), type:'vital', text:`Blood pressure ${bp[0]}/${bp[1]}`, extra:{ kind:'bp', sys:bp[0], dia:bp[1] } });
    if (i % 2 === 0) e.push({ id:uid(), t:at(7,40), type:'vital', text:'', extra:{ kind:'sugar', value:[104,96,118][i/2-1], ctx:'fasting' } });
    if (i === 6 || i === 1) e.push({ id:uid(), t:at(7,45), type:'vital', text:'', extra:{ kind:'weight', value: i === 6 ? 64.6 : 64.1 } });
    for (const j of [i % 7, (i+2) % 7, (i+4) % 7]){ const [n,c,h] = meals[j]; e.push({ id:uid(), t:at(h + (j % 2), 10), type:'meal', text:n, calories:c }); }
    const g = [5,7,4,8,6,3][i-1]; for (let x = 0; x < g; x++) e.push({ id:uid(), t:at(9 + x), type:'water', text:'Glass of water', glasses:1 });
    const w = [20,35,0,30,15,40][i-1]; if (w) e.push({ id:uid(), t:at(18), type:'activity', text:'Evening walk', minutes:w });
    if (i === 3) e.push({ id:uid(), t:at(16), type:'symptom', text:'Mild knee pain after climbing stairs' });
    e.forEach(x => { if (x.type === 'vital') x.text = vitalText(x); });
    const taken = {}; meds.forEach((m, mi) => { if (!(i === 3 && mi === 1) && !(i === 5 && mi === 2)) taken[m.id] = true; });
    S.days[k] = { entries: e.sort((a,b) => a.t - b.t), meds: taken };
  }
  S.checkin = null;
}

// ---------- cloud: Clerk sign-in + Supabase storage ----------
const CFG = window.SAATHI_CONFIG || {};
const cloud = { pulled:false, ready:false, failed:false, enabled: !!(CFG.clerkPublishableKey && CFG.supabaseUrl && CFG.supabaseKey), user:null, db:null, status:'', lastSync:null, deleted:new Set(), timer:null };
function loadScript(src, attrs = {}){
  return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.async = true; s.crossOrigin = 'anonymous';
    Object.entries(attrs).forEach(([k,v]) => s.setAttribute(k, v)); s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s); });
}
async function cloudInit(){
  if (!cloud.enabled) return;
  try {
    const pk = CFG.clerkPublishableKey.trim();
    const fapi = atob(pk.split('_')[2]).replace(/\$$/, '');
    await loadScript(`https://${fapi}/npm/@clerk/clerk-js@5/dist/clerk.browser.js`, { 'data-clerk-publishable-key': pk });
    await window.Clerk.load({ appearance: CLERK_LOOK });
    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.4/dist/umd/supabase.min.js');
    cloud.db = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { accessToken: async () => (await window.Clerk.session?.getToken()) ?? null });
    cloud.ready = true;
    const onUser = (user) => {
      const was = cloud.user?.id; cloud.user = user || null;
      if (cloud.user && cloud.user.id !== was){ cloud.pulled = false; clerkMounted = null; cloudPull(); }
      if (!cloud.user){ cloud.status = ''; cloud.pulled = false; }
      render();
    };
    onUser(window.Clerk.user);
    window.Clerk.addListener(({ user }) => { if ((user?.id || null) !== (cloud.user?.id || null)) onUser(user); });
  } catch(e){ cloud.failed = true; cloud.status = 'Sign-in is unavailable right now'; render(); }
}
function cloudSignIn(){ if (!cloud.ready){ toast(cloud.enabled ? 'Sign-in is still loading. Try again in a moment.' : 'Sign-in is not set up.'); return; } window.Clerk.openSignIn({ appearance: CLERK_LOOK }); }
async function cloudSignOut(){ if (!await confirmSheet('Sign out?', 'Your data stays saved in your account. This phone will go back to the sign-in screen.', 'Sign out')) return;
  await window.Clerk.signOut(); S = hydrate(null); persist(); view = 'today'; render(); toast('Signed out'); }
const entryRow = (e, dayKey) => ({ id: e.id, user_id: cloud.user.id, day: dayKey, logged_at: new Date(e.t).toISOString(), type: e.type, description: e.type === 'vital' ? vitalText(e) : e.text,
  calories: e.calories != null ? Math.round(e.calories) : null, glasses: e.glasses ?? null, minutes: e.minutes != null ? Math.round(e.minutes) : null, hours: e.hours ?? null, extra: e.extra || null });
function appState(){ return { days: S.days, chat: S.chat, settings: { ...S.settings, apiKey:'' } }; }
async function cloudPush(){
  if (!cloud.ready || !cloud.user || !cloud.pulled) return;
  cloud.status = 'Saving…'; refreshCloudLine();
  try {
    const { error: e1 } = await cloud.db.from('health_profiles').upsert({ user_id: cloud.user.id, name: S.profile.name || null, profile: S.profile, app_state: appState(), updated_at: new Date().toISOString() });
    if (e1) throw e1;
    const rows = []; const since = daysAgo(30);
    for (const [k, d] of Object.entries(S.days)) if (new Date(k) >= since) for (const e of d.entries) rows.push(entryRow(e, k));
    if (rows.length){ let { error: e2 } = await cloud.db.from('health_entries').upsert(rows);
      if (e2 && /extra/.test(e2.message || '')){ ({ error: e2 } = await cloud.db.from('health_entries').upsert(rows.map(({ extra, ...r }) => r))); }
      if (e2) throw e2; }
    if (cloud.deleted.size){ const ids = [...cloud.deleted]; const { error: e3 } = await cloud.db.from('health_entries').delete().in('id', ids); if (!e3) ids.forEach(i => cloud.deleted.delete(i)); }
    cloud.lastSync = new Date(); cloud.status = '';
  } catch(e){ cloud.status = 'Not saved online: ' + (e.message || e).toString().slice(0,80); }
  refreshCloudLine();
}
async function cloudPull(){
  cloud.status = 'Loading your saved data…';
  try {
    const { data, error } = await cloud.db.from('health_profiles').select('*').maybeSingle();
    if (error) throw error;
    if (data){
      const remote = data.app_state || {};
      for (const [k, d] of Object.entries(remote.days || {})){
        const local = day(k); const ids = new Set(local.entries.map(e => e.id));
        for (const e of d.entries || []) if (!ids.has(e.id)) local.entries.push(e);
        local.entries.sort((a,b) => a.t - b.t); local.meds = { ...(d.meds || {}), ...(local.meds || {}) };
      }
      if (!S.profile.name && data.profile && data.profile.name) S.profile = hydrate({ profile: data.profile }).profile;
      if (!S.chat.length && remote.chat) S.chat = remote.chat;
      if (remote.settings){ const key = S.settings.apiKey; S.settings = Object.assign({}, S.settings, remote.settings, { apiKey: key }); }
    }
    const { data: rows, error: e2 } = await cloud.db.from('health_entries').select('*').order('logged_at');
    if (e2) throw e2;
    for (const r of rows || []){
      const d = day(r.day); if (d.entries.some(e => e.id === r.id)) continue;
      d.entries.push({ id: r.id, t: new Date(r.logged_at).getTime(), type: r.type, text: r.description || '', calories: r.calories, glasses: r.glasses != null ? Number(r.glasses) : null, minutes: r.minutes, hours: r.hours != null ? Number(r.hours) : null, extra: r.extra || null });
      d.entries.sort((a,b) => a.t - b.t);
    }
    persist(); cloud.pulled = true; cloud.status = ''; await cloudPush();
  } catch(e){ cloud.status = 'Could not load saved data: ' + (e.message || e).toString().slice(0,80); cloud.pulled = true; }
  render(); runCheckin();
}
function cloudSoon(){ if (!cloud.user) return; clearTimeout(cloud.timer); cloud.timer = setTimeout(cloudPush, 1500); }
function cloudLine(){
  if (!cloud.enabled) return 'Not set up';
  if (!cloud.ready) return cloud.status || 'Connecting…';
  if (!cloud.user) return 'Not signed in. Your data is only on this phone.';
  if (cloud.status) return cloud.status;
  return cloud.lastSync ? 'Saved online at ' + fmtTime(cloud.lastSync) : 'Signed in';
}
function refreshCloudLine(){ const el = $('#cloudLine'); if (el) el.textContent = cloudLine(); }
function vCloudCard(){
  const u = cloud.user; const email = u?.primaryEmailAddress?.emailAddress || '';
  return `<section class="card"><div class="card-h">${chipC('shield','var(--water-soft)','var(--water)')}<div class="grow"><h2>Save online</h2><p class="xs muted" id="cloudLine">${esc(cloudLine())}</p></div>${u ? '<span class="badge ok"><i class="d"></i>On</span>' : ''}</div>
    ${u ? `<p class="small">Signed in as <b>${esc(email || u.fullName || 'you')}</b>. Everything you log is saved securely, so it is safe if this phone is lost and you can sign in on another phone.</p>
        <div class="two" style="margin-top:12px"><button data-act="cloudSync">Save now</button><button data-act="cloudOut">Sign out</button></div>`
      : `<p class="small muted">Sign in with your email or Google account to keep a safe online copy of your health log.</p>
        <button class="primary full" style="margin-top:12px" data-act="cloudIn">Sign in or create an account</button>`}</section>`;
}

// ---------- start ----------
render();
if (mode() === 'app') runCheckin();
cloudInit();
checkProxy();
window.addEventListener('online', () => toast('Back online'));
window.matchMedia('(min-width: 960px)').addEventListener('change', () => { lastKey = ''; render(); });
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
