import { getToken } from './auth';

const API_BASE = import.meta.env.PUBLIC_API_BASE || 'http://localhost:8080';

export async function createCheckoutSession(priceId: string) {
  const token = await getToken();

  const response = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      priceId,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    })
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error('Failed to create checkout session');
  }
}
