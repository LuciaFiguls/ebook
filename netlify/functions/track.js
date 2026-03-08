exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const N8N_TRACKING_URL = process.env.N8N_TRACKING_URL;
  const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch {}

  const payload = {
    event: body.event || 'unknown',
    url: body.url || '',
    referrer: body.referrer || '',
    timestamp: new Date().toISOString(),
    ...body,
  };

  const sends = [];

  if (N8N_TRACKING_URL) {
    sends.push(
      fetch(N8N_TRACKING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(err => console.error('n8n error:', err))
    );
  }

  if (GOOGLE_SHEETS_WEBHOOK_URL) {
    const sheetsPayload = {
      events: [{ ...payload }],
      session_info: {
        user_agent: event.headers['user-agent'] || '',
        total_events: 1,
        source: 'checkout',
      },
    };
    sends.push(
      fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(sheetsPayload),
      }).catch(err => console.error('Google Sheets error:', err))
    );
  }

  await Promise.all(sends);

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: 'OK',
  };
};
