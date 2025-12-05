// api/submit.js
// Simple Vercel serverless proxy that forwards POST to your Google Apps Script
// and adds CORS headers so browser won't block the request.

const GOOGLE_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx2fGHQY8r4agQVxpHB7iQaC9HcFWJcMEdZmEWFRDOleHwR252cR6LEv0MZzxk1sP-D/exec';

module.exports = async (req, res) => {
  // Allow CORS for your site (or use '*' if you want)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Forward body as JSON to Google Apps Script
    const body = req.body && Object.keys(req.body).length ? req.body : await getRawBody(req);

    const resp = await fetch(GOOGLE_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await resp.text();
    // If script returns JSON, try to parse it
    let parsed;
    try { parsed = JSON.parse(text); } catch (_) { parsed = text; }

    // Forward status and body
    res.status(resp.status >= 200 && resp.status < 400 ? 200 : 502).json({ ok: true, result: parsed });
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy failed', details: err.message || String(err) });
  }
};

// helper: get raw body if Vercel/node didn't parse it
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        const parsed = data ? JSON.parse(data) : {};
        resolve(parsed);
      } catch (e) {
        // Not JSON - return raw string
        resolve(data);
      }
    });
    req.on('error', reject);
  });
}
