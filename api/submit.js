// api/submit.js - simplified, robust proxy for Vercel
// Note: set GOOGLE_SCRIPT_ENDPOINT env var in Vercel, or it falls back to DEFAULT.

const DEFAULT_GOOGLE_SCRIPT_ENDPOINT =
  process.env.GOOGLE_SCRIPT_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbyJtiv8nxS8IwqkZaRCDAtTuYhVGD0YGlT53IieHU7UZH7EFyGldhqvj9GIgP_QHNZi/exec';

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
        // return raw string if not JSON
        resolve(data);
      }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  // CORS for debugging; tighten in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Read body (Vercel may already parse JSON into req.body)
    const body = (req.body && Object.keys(req.body).length) ? req.body : await getRawBody(req);

    // VERY VERBOSE LOGGING (check Vercel function logs)
    try { console.log('[proxy] received body (preview):', JSON.stringify(body).slice(0,2000)); } catch(e) { console.log('[proxy] received body (unserializable)'); }

    const endpoint = process.env.GOOGLE_SCRIPT_ENDPOINT || DEFAULT_GOOGLE_SCRIPT_ENDPOINT;
    console.log('[proxy] forwarding to endpoint:', endpoint);

    let resp;
    try {
      resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        // ensure string body
        body: typeof body === 'string' ? body : JSON.stringify(body),
        // explicitly follow redirects
        redirect: 'follow',
      });
    } catch (fetchErr) {
      // network/fetch error (DNS, TLS, runtime fetch not available, etc)
      console.error('[proxy] fetch failed:', fetchErr && fetchErr.stack ? fetchErr.stack : String(fetchErr));
      return res.status(500).json({ error: 'Proxy fetch failed', details: String(fetchErr) });
    }

    // read text
    let rawText = '';
    try {
      rawText = await resp.text();
    } catch (e) {
      console.warn('[proxy] failed to read resp.text():', e && e.message ? e.message : e);
    }

    let parsed;
    try { parsed = JSON.parse(rawText); } catch (e) { parsed = rawText; }

    console.log('[proxy] remote status:', resp.status);
    console.log('[proxy] remote preview:', (typeof parsed === 'string' ? parsed : JSON.stringify(parsed)).slice(0,2000));

    const forward = {
      remoteStatus: resp.status,
      ok: resp.ok,
      result: parsed,
      raw: rawText,
    };

    return res.status(resp.ok ? 200 : 502).json(forward);

  } catch (err) {
    console.error('[proxy] unexpected error:', err && err.stack ? err.stack : String(err));
    return res.status(500).json({ error: 'Proxy unexpected error', details: (err && err.message) || String(err) });
  }
};
