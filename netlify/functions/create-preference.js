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

  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  const SITE_URL = process.env.URL || 'https://tu-sitio.netlify.app';

  const preference = {
    items: [
      {
        title: 'De Invisible a Irresistible - Ebook',
        description: 'Identidad visual para mujeres que emprenden',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 18000,
      },
    ],
    back_urls: {
      success: `${SITE_URL}/success.html`,
      failure: `${SITE_URL}/#final-cta`,
      pending: `${SITE_URL}/success.html`,
    },
    auto_return: 'approved',
    notification_url: `${SITE_URL}/.netlify/functions/webhook`,
    payment_methods: {
      installments: 1,
    },
    statement_descriptor: 'LUCIA FIGULS EBOOK',
  };

  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preference),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('MP error:', data);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Error al crear la preferencia de pago' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ init_point: data.init_point }),
  };
};
