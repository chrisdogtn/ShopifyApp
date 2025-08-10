const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2023-10';
const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE;
const ADMIN_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;

async function shopifyFetch(path) {
  if (!STORE_DOMAIN || !ADMIN_TOKEN) {
    throw new Error('Missing Shopify store credentials');
  }
  const res = await fetch(`https://${STORE_DOMAIN}/admin/api/${API_VERSION}/${path}`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchProducts() {
  const data = await shopifyFetch('products.json');
  return data.products || [];
}

export async function fetchCollections() {
  const data = await shopifyFetch('collections.json');
  return data.collections || [];
}

export async function fetchShopInfo() {
  const data = await shopifyFetch('shop.json');
  return data.shop || {};
}
