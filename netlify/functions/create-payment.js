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

    let body;
    try {
        body = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, body: 'Invalid JSON' };
    }

    const { token, payment_method_id, installments, issuer_id, payerEmail, payerName, payerDni } = body;

    if (!token || !payerEmail) {
        return {
            statusCode: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Faltan datos requeridos' }),
        };
    }

    const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

    const payment = {
        transaction_amount: 18000,
        token,
        payment_method_id,
        installments: Number(installments) || 1,
        issuer_id,
        payer: {
            email: payerEmail,
            first_name: payerName,
            identification: {
                type: 'DNI',
                number: payerDni || '',
            },
        },
        description: 'De Invisible a Irresistible - Ebook',
        statement_descriptor: 'LUCIA FIGULS EBOOK',
    };

    const mpResponse = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Idempotency-Key': `${payerEmail}-${Date.now()}`,
        },
        body: JSON.stringify(payment),
    });

    const result = await mpResponse.json();

    if (result.status === 'approved' || result.status === 'in_process') {
        if (N8N_WEBHOOK_URL) {
            await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: payerEmail,
                    name: payerName,
                    payment_id: result.id,
                    amount: result.transaction_amount,
                    product: 'De Invisible a Irresistible - Ebook',
                }),
            });
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            status: result.status,
            id: result.id,
            message: result.status_detail,
        }),
    };
};
