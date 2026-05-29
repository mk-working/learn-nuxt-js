interface ProductRating {
  count: number;
  rate: number;
}

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: ProductRating;
  title: string;
}

const FAKE_STORE_PRODUCTS_URL = 'https://fakestoreapi.com/products';

const placeholderImage = (label: string, background: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <rect width="640" height="480" rx="32" fill="${background}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff">
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const fallbackProducts: Product[] = [
  {
    id: 1,
    title: 'Nuxt Starter Hoodie',
    price: 49.95,
    description:
      'A soft hoodie for learning sessions, late-night debugging, and calm shipping days.',
    category: 'apparel',
    image: placeholderImage('Nuxt Hoodie', '#0f766e'),
    rating: {
      rate: 4.8,
      count: 128
    }
  },
  {
    id: 2,
    title: 'Composable Notebook',
    price: 12.5,
    description: 'A compact notebook for mapping components, composables, routes, and API ideas.',
    category: 'stationery',
    image: placeholderImage('Notebook', '#2563eb'),
    rating: {
      rate: 4.6,
      count: 83
    }
  },
  {
    id: 3,
    title: 'Server Route Mug',
    price: 18,
    description:
      'A ceramic mug for remembering that server routes belong in the root server directory.',
    category: 'kitchen',
    image: placeholderImage('API Mug', '#7c3aed'),
    rating: {
      rate: 4.9,
      count: 214
    }
  },
  {
    id: 4,
    title: 'Typecheck Desk Mat',
    price: 34,
    description:
      'A desk mat with enough room for your keyboard, notes, and one very satisfying green check.',
    category: 'workspace',
    image: placeholderImage('Typecheck', '#dc2626'),
    rating: {
      rate: 4.7,
      count: 97
    }
  }
];

let productCache: Product[] | undefined;

export const getProducts = async () => {
  if (productCache) {
    return productCache;
  }

  try {
    const products = await $fetch<Product[]>(FAKE_STORE_PRODUCTS_URL, {
      timeout: 5000
    });

    if (Array.isArray(products) && products.length > 0) {
      productCache = products;
      return products;
    }
  } catch {
    productCache = fallbackProducts;
    return fallbackProducts;
  }

  productCache = fallbackProducts;
  return fallbackProducts;
};

export const getProductById = async (id: number) => {
  const products = await getProducts();

  return products.find((product) => product.id === id) ?? null;
};
