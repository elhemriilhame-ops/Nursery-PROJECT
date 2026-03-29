export const FLOWERS = [
  {
    id: 'f1',
    name: 'Eternal Blanc Bouquet',
    price: 85,
    image: '/flower-white-roses.png',
    category: 'Bouquets',
    description: 'A delicate arrangement of premium white roses, ranunculus, and eucalyptus. Perfect for weddings or elegant home decor.',
    featured: true,
    occasion: 'Weddings',
    color: 'White'
  },
  {
    id: 'f2',
    name: 'Provence Lavender Bundle',
    price: 45,
    image: 'https://omghitched.com/wp-content/uploads/2024/11/image-16.jpeg', 
    category: 'Dried Flowers',
    description: 'Fragrant dried lavender from the heart of Provence, tied with a silk ribbon.',
    occasion: 'Thank You',
    color: 'Lavender'
  },
  {
    id: 'f3',
    name: 'Midnight Blush',
    price: 95,
    image: '/flower-midnight-blush.png',
    category: 'Bouquets',
    description: 'Deep red roses mixed with soft pink peonies for a romantic, high-contrast look.',
    occasion: 'Birthday',
    color: 'Red'
  },
  {
    id: 'f4',
    name: 'Rose Petal Tulip Bouquet',
    price: 75,
    image: '/flower-tulip.jpg',
    category: 'Bouquets',
    description: 'A dreamy arrangement of fresh pink tulips, elegantly wrapped in blush tissue and tied with a silk satin ribbon. A tender gesture for any occasion.',
    featured: true,
    occasion: 'New Baby',
    color: 'Pink'
  },
  {
    id: 'f5',
    name: 'Lily & Rose Harmony',
    price: 110,
    image: '/flower-lily.jpg',
    category: 'Bouquets',
    description: 'A captivating mix of ivory and blush Oriental lilies paired with delicate miniature roses. Arranged in a decorative glass vase for a refined, long-lasting display.',
    occasion: 'Get Well',
    color: 'White'
  },
  {
    id: 'f6',
    name: 'Soleil Bouquet',
    price: 90,
    image: '/flower-sunrose.jpg',
    category: 'Bouquets',
    description: "Bold sunflowers and passionate red roses intertwined with baby's breath and lush greenery, presented in a luxe black-and-gold wrap. A statement of warmth and elegance.",
    occasion: 'Cheer Up',
    color: 'Yellow'
  },
  {
    id: 'f7',
    name: 'Crystal Bell Blossoms',
    price: 80,
    image: '/flower-bellpink.jpg',
    category: 'Rare Blooms',
    description: 'Ethereal pink bell-shaped flowers adorned with morning dew droplets, cascading like nature\'s own chandelier. A truly otherworldly and poetic arrangement.',
    featured: true,
    occasion: 'Weddings',
    color: 'Pink'
  },
  {
    id: 'f8',
    name: 'Lavender & Daisy Field Bouquet',
    price: 55,
    image: '/flower-lavender-daisy.jpg',
    category: 'Dried Flowers',
    description: 'A rustic-chic bundle of fragrant purple lavender and wild white daisies, hand-tied with a delicate lace ribbon. Countryside elegance at its finest.',
    occasion: 'Birthday',
    color: 'Lavender'
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
    featured: true,
    care: {
        light: 'Bright indirect light',
        temperature: '18°C - 24°C',
        humidity: 'High (60%+)',
        watering: 'Once every 10 days',
        soil: 'Peat-based potting mix',
        sensitivity: 'Toxic to pets'
    }
  },
  {
    id: 'p2',
    name: 'Olive Tree (Petite)',
    price: 65,
    image: '/plant-1.png',
    category: 'Trees',
    description: 'A symbol of peace, our petite olive trees are perfect for sunny corners.',
    care: {
        light: 'Full direct sunlight',
        temperature: '15°C - 30°C',
        humidity: 'Low to Moderate',
        watering: 'Once a week',
        soil: 'Sandy, well-draining soil',
        sensitivity: 'Compatible with herbs'
    }
  },
  {
    id: 'p3',
    name: 'Jade Plant (Crassula)',
    price: 48,
    image: '/plant-jade.jpg',
    category: 'Indoor Plants',
    description: 'A compact and resilient jade plant in a matte blush ceramic pot. Known as a symbol of good fortune, it thrives in bright indirect light with minimal care.',
    featured: true,
    care: {
        light: 'Direct or bright indirect',
        temperature: '18°C - 24°C',
        humidity: 'Low humidity',
        watering: 'Once every 2-3 weeks',
        soil: 'Cactus & succulent mix',
        sensitivity: 'Safe for most environments'
    }
  },
  {
    id: 'p4',
    name: 'Desert Bloom Cactus Garden',
    price: 72,
    image: '/plant-cactus.jpg',
    category: 'Succulents',
    description: 'A curated mix of sculptural cacti with delicate white blooms, planted in a handcrafted concrete vessel. Effortlessly low-maintenance and architecturally bold.',
    care: {
        light: 'Intense direct light',
        temperature: '20°C - 35°C',
        humidity: 'Very dry air',
        watering: 'Monthly (Spring/Summer)',
        soil: 'Porous grit and sand',
        sensitivity: 'Sharp spines; child-safe'
    }
  },
  {
    id: 'p5',
    name: 'Bird of Paradise (Grande)',
    price: 195,
    image: '/plant-bird-of-paradise.jpg',
    category: 'Indoor Plants',
    description: 'A majestic floor-standing Bird of Paradise with broad, glossy tropical leaves. A dramatic statement piece for any high-ceilinged or sun-drenched living space.',
    featured: true,
    care: {
        light: 'Bright direct light',
        temperature: '20°C - 28°C',
        humidity: 'Extra high humidity',
        watering: 'Keep soil moist',
        soil: 'Rich loamy soil',
        sensitivity: 'Broad leaves attract dust'
    }
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
  { name: 'Flowers', slug: 'flowers', image: '/flower-white-roses.png' },
  { name: 'Plants', slug: 'plants', image: '/plant-bird-of-paradise.jpg' },
  { name: 'Essential Oils', slug: 'oils', image: '/oil-1.png' }
];

export const DELIVERIES = [
  {
    id: 'DEL-1024',
    customer: 'Sarah J. Parker',
    address: '12-A Blvd de la Corniche, Casablanca',
    date: 'March 30, 2026',
    time: '14:30 - 16:00',
    status: 'In Transit',
    items: 'Eternal Blanc × 2, Monstera × 1',
    total: '290 DH'
  },
  {
    id: 'DEL-1025',
    customer: 'Yassir B. El Fassi',
    address: '45 Lotissement Al Manar, Rabat',
    date: 'March 29, 2026',
    time: '10:00 - 11:30',
    status: 'Scheduled',
    items: 'Midnight Blush × 1, Olive Tree × 2',
    total: '225 DH'
  },
  {
    id: 'DEL-1026',
    customer: 'Sophia Lorenze',
    address: '78 Rue Tarik Bnou Ziyad, Marrakech',
    date: 'March 29, 2026',
    time: '09:00 - 10:30',
    status: 'Delivered',
    items: 'Lavender Field × 3, Jade Plant × 1',
    total: '213 DH'
  },
  {
    id: 'DEL-1027',
    customer: 'Amine R. Zaimi',
    address: 'Villa 12, Anfa Superior, Casablanca',
    date: 'March 30, 2026',
    time: '16:30 - 18:00',
    status: 'Processing',
    items: 'Soleil Bouquet × 1, Monstera × 2',
    total: '330 DH'
  }
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
