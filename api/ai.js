// Vercel serverless function: forwards Dempo Saathi's AI requests to Google Gemini.
// The Gemini key lives only in Vercel → Project → Settings → Environment Variables (GEMINI_API_KEY),
// never in this repository.
const MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-flash-lite-latest'];

module.exports = async (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  if (req.method === 'GET') return res.status(200).json({ ok: true, configured: !!key });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!key) return res.status(503).json({ error: 'AI is not configured on the server' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const size = JSON.stringify(body).length;
  if (!Array.isArray(body.contents) || size > 3_000_000) return res.status(400).json({ error: 'Bad request' });

  // Only pass through the fields the app uses.
  const payload = { contents: body.contents, systemInstruction: body.systemInstruction, generationConfig: body.generationConfig };
  let last = 'AI failed';
  for (const model of MODELS) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(payload)
      });
      if (r.status === 404) { last = 'Model not found: ' + model; continue; }
      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'AI error' });
      const text = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
      return res.status(200).json({ text, model });
    } catch (e) { last = e.message; }
  }
  return res.status(502).json({ error: last });
};
