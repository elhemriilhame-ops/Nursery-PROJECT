export const FLOWERS = [
  {
    id: 'f1',
    name: 'Eternal Blanc Bouquet',
    price: 85,
    image: '/flower-1.png',
    category: 'Bouquets',
    description: 'A delicate arrangement of premium white roses, ranunculus, and eucalyptus. Perfect for weddings or elegant home decor.',
    featured: true
  },
  {
    id: 'f2',
    name: 'Provence Lavender Bundle',
    price: 45,
    image: '/flower-1.png', // reusing for now
    category: 'Dried Flowers',
    description: 'Fragrant dried lavender from the heart of Provence, tied with a silk ribbon.'
  },
  {
    id: 'f3',
    name: 'Midnight Blush',
    price: 95,
    image: '/flower-1.png',
    category: 'Bouquets',
    description: 'Deep red roses mixed with soft pink peonies for a romantic, high-contrast look.'
  }
];

export const PLANTS = [
  {
    id: 'p1',
    name: 'Signature Monstera Deliciosa',
    price: 120,
    image: '/plant-1.png',
    category: 'Indoor Plants',
    description: 'A healthy, mature Monstera in a signature clay pot. Statement piece for any modern living room.',
    featured: true
  },
  {
    id: 'p2',
    name: 'Olive Tree (Petite)',
    price: 65,
    image: '/plant-1.png',
    category: 'Trees',
    description: 'A symbol of peace, our petite olive trees are perfect for sunny corners.'
  }
];

export const OILS = [
  {
    id: 'o1',
    name: 'Pure Lavender Essential Oil',
    price: 28,
    image: '/oil-1.png',
    category: 'Relaxation',
    description: '100% pure steam-distilled French lavender. Calming and restorative.',
    featured: true
  },
  {
    id: 'o2',
    name: 'Eucalyptus & Mint Elixir',
    price: 32,
    image: '/oil-1.png',
    category: 'Focus',
    description: 'Refreshing blend to clear the mind and boost productivity.'
  }
];

export const CATEGORIES = [
  { name: 'Flowers', slug: 'flowers', image: '/flower-1.png' },
  { name: 'Plants', slug: 'plants', image: '/plant-1.png' },
  { name: 'Essential Oils', slug: 'oils', image: '/oil-1.png' }
];

export const GUIDES = [
  {
    id: 'g1',
    title: 'Caring for your Monstera',
    description: 'A complete guide to keeping your Swiss Cheese Plant thriving and green.',
    image: '/plant-1.png',
    author: 'Elena Rossi',
    date: 'March 15, 2026'
  },
  {
    id: 'g2',
    title: 'The Art of Floral Arrangement',
    description: 'Learn the secrets of luxury florists: balance, color, and texture.',
    image: '/flower-1.png',
    author: 'Julian Thorne',
    date: 'March 10, 2026'
  }
];
