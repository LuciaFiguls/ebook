exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { type, data } = body;

  if (type !== 'payment' || !data?.id) {
    return { statusCode: 200, body: 'OK' };
  }

  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

  const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
    headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
  });

  const payment = await mpResponse.json();

  if (payment.status !== 'approved') {
    return { statusCode: 200, body: 'Payment not approved, skipping' };
  }

  await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payment.payer.email,
      name: payment.payer.first_name || '',
      last_name: payment.payer.last_name || '',
      payment_id: payment.id,
      amount: payment.transaction_amount,
      product: 'De Invisible a Irresistible - Ebook',
    }),
  });

  return { statusCode: 200, body: 'OK' };
};
