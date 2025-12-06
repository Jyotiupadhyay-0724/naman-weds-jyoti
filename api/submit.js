// api/submit.js
// Vercel serverless proxy: forwards POST to Google Apps Script and exposes
// helpful debug info (logs, remote status + body). Replace endpoint as needed.

const DEFAULT_GOOGLE_SCRIPT_ENDPOINT =  'https://script.google.com/macros/s/AKfycbyJtiv8nxS8IwqkZaRCDAtTuYhVGD0YGlT53IieHU7UZH7EFyGldhqvj9GIgP_QHNZi/exec';

const TIMEOUT_MS = 20000;

// simple fetch with abort/timeout
async function fetchWithTimeout(url, opts = {}, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

module.exports = async (req, res) => {
  // very permissive CORS for debugging — restrict to your domain in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read body — Vercel should parse JSON into req.body; fallback to raw
    const body = (req.body && Object.keys(req.body).length) ? req.body : await getRawBody(req);

    // Log short preview for debugging (Vercel will show this in function logs)
    try {
      console.log('Proxy received body (preview):', JSON.stringify(body).slice(0, 2000));
    } catch (e) {
      console.log('Proxy received body (unserializable)', body);
    }

    const endpoint = DEFAULT_GOOGLE_SCRIPT_ENDPOINT;
    console.log('Forwarding to Apps Script endpoint:', endpoint);

    const resp = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(body),
    });

    // Always read response text (Apps Script often returns text even for errors)
    const rawText = await resp.text().catch((e) => {
      console.warn('Failed to read resp.text():', e && e.message ? e.message : e);
      return '';
    });

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      parsed = rawText;
    }

    console.log('Apps Script returned status:', resp.status);
    // Avoid logging very large bodies — show preview
    console.log('Apps Script response preview:', (typeof parsed === 'string' ? parsed : JSON.stringify(parsed)).slice(0, 2000));

    const forward = {
      remoteStatus: resp.status,
      ok: resp.ok,
      result: parsed,
      raw: rawText,
    };

    // If Apps Script returns non-2xx, forward 502 to front-end so it sees remote failure
    return res.status(resp.ok ? 200 : 502).json(forward);
  } catch (err) {
    console.error('Proxy error:', err && err.stack ? err.stack : err);
    return res.status(500).json({ error: 'Proxy failed', details: (err && err.message) || String(err) });
  }
};

// fallback parser for raw body
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        resolve(data); // return raw string if not JSON
      }
    });
    req.on('error', reject);
  });
}
