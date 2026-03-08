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

  if (!N8N_TRACKING_URL) {
    return { statusCode: 200, body: 'Tracking not configured' };
  }

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch {}

  const payload = {
    event: body.event || 'unknown',
    url: body.url || '',
    referrer: body.referrer || '',
    timestamp: new Date().toISOString(),
    ...body,
  };

  try {
    await fetch(N8N_TRACKING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Tracking error:', err);
  }

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: 'OK',
  };
};
