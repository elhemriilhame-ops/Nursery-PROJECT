export const FLOWERS = [
  {
    id: 'f1',
    name: 'Eternal Blanc Bouquet',
    price: 450,
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
    price: 180,
    image: 'https://omghitched.com/wp-content/uploads/2024/11/image-16.jpeg', 
    category: 'Dried Flowers',
    description: 'Fragrant dried lavender from the heart of Provence, tied with a silk ribbon.',
    occasion: 'Thank You',
    color: 'Lavender'
  },
  {
    id: 'f3',
    name: 'Midnight Blush',
    price: 550,
    image: '/flower-midnight-blush.png',
    category: 'Bouquets',
    description: 'Deep red roses mixed with soft pink peonies for a romantic, high-contrast look.',
    occasion: 'Birthday',
    color: 'Red'
  },
  {
    id: 'f4',
    name: 'Rose Petal Tulip Bouquet',
    price: 380,
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
    price: 650,
    image: '/flower-lily.jpg',
    category: 'Bouquets',
    description: 'A captivating mix of ivory and blush Oriental lilies paired with delicate miniature roses. Arranged in a decorative glass vase for a refined, long-lasting display.',
    occasion: 'Get Well',
    color: 'White'
  },
  {
    id: 'f6',
    name: 'Soleil Bouquet',
    price: 480,
    image: '/flower-sunrose.jpg',
    category: 'Bouquets',
    description: "Bold sunflowers and passionate red roses intertwined with baby's breath and lush greenery, presented in a luxe black-and-gold wrap. A statement of warmth and elegance.",
    occasion: 'Cheer Up',
    color: 'Yellow'
  },
  {
    id: 'f7',
    name: 'Crystal Bell Blossoms',
    price: 420,
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
    price: 220,
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
    price: 450,
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
    price: 280,
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
    price: 150,
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
    price: 320,
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
    price: 850,
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
    price: 120,
    image: '/oil-1.png',
    category: 'Relaxation',
    description: '100% pure steam-distilled French lavender. Calming and restorative.',
    featured: true
  },
  {
    id: 'o2',
    name: 'Eucalyptus & Mint Elixir',
    price: 145,
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
    total: '1350 DH'
  },
  {
    id: 'DEL-1025',
    customer: 'Yassir B. El Fassi',
    address: '45 Lotissement Al Manar, Rabat',
    date: 'March 29, 2026',
    time: '10:00 - 11:30',
    status: 'Scheduled',
    items: 'Midnight Blush × 1, Olive Tree × 2',
    total: '1110 DH'
  },
  {
    id: 'DEL-1026',
    customer: 'Sophia Lorenze',
    address: '78 Rue Tarik Bnou Ziyad, Marrakech',
    date: 'March 29, 2026',
    time: '09:00 - 10:30',
    status: 'Delivered',
    items: 'Lavender Field × 3, Jade Plant × 1',
    total: '810 DH'
  },
  {
    id: 'DEL-1027',
    customer: 'Amine R. Zaimi',
    address: 'Villa 12, Anfa Superior, Casablanca',
    date: 'March 30, 2026',
    time: '16:30 - 18:00',
    status: 'Processing',
    items: 'Soleil Bouquet × 1, Monstera × 2',
    total: '1380 DH'
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

export const SELLER_ORDERS = [
  {
    id: 'ORD-9901',
    customer: 'Lina Benani',
    product: 'Signature Monstera',
    quantity: 1,
    status: 'Pending',
    date: 'Apr 08, 2026',
    total: '450 DH',
    location: 'Marrakech'
  },
  {
    id: 'ORD-9902',
    customer: 'Karim Tazi',
    product: 'Pure Lavender Oil',
    quantity: 3,
    status: 'Shipped',
    date: 'Apr 07, 2026',
    total: '360 DH',
    location: 'Casablanca'
  },
  {
    id: 'ORD-9903',
    customer: 'Driss Alaoui',
    product: 'Eternal Blanc',
    quantity: 2,
    status: 'Processing',
    date: 'Apr 08, 2026',
    total: '900 DH',
    location: 'Rabat'
  },
  {
    id: 'ORD-9904',
    customer: 'Salma El Fassi',
    product: 'Olive Tree',
    quantity: 1,
    status: 'Delivered',
    date: 'Apr 05, 2026',
    total: '280 DH',
    location: 'Agadir'
  },
  {
    id: 'ORD-9905',
    customer: 'Youssef Mansouri',
    product: 'Desert Bloom Cactus',
    quantity: 1,
    status: 'Shipped',
    date: 'Apr 09, 2026',
    total: '320 DH',
    location: 'Tangier'
  },
  {
    id: 'ORD-9906',
    customer: 'Meriem Rahmouni',
    product: 'Provence Lavender Bundle',
    quantity: 5,
    status: 'Processing',
    date: 'Apr 09, 2026',
    total: '900 DH',
    location: 'Fes'
  }
];

export const SELLER_PRODUCTS_DEMO = [
  { _id: 'dm1', name: 'Atlas Cedar Tree', price: 1200, category: 'Trees', type: 'Plants', stock: 12, image: '/plant-1.png', featured: true, description: 'A majestic conifer native to the Atlas Mountains. Highly resilient and statuesque.' },
  { _id: 'dm2', name: 'White Serenity Lily', price: 350, category: 'Bouquets', type: 'Flowers', stock: 45, image: '/flower-white-roses.png', featured: false, description: 'Elegant white lilies paired with seasonal greenery for a peaceful atmosphere.' },
  { _id: 'dm3', name: 'Desert Rose', price: 180, category: 'Succulents', type: 'Plants', stock: 8, image: '/plant-jade.jpg', featured: true, description: 'Stunning succulent that blooms with vibrant pink flowers even in dry conditions.' },
  { _id: 'dm4', name: 'Moroccan Mint Pot', price: 80, category: 'Indoor Plants', type: 'Plants', stock: 100, image: '/plant-1.png', featured: false, description: 'Fresh, aromatic mint ready for tea or culinary use. Easy to grow indoors.' },
  { _id: 'dm5', name: 'Argan Leaf Extract Oil', price: 250, category: 'Aromatherapy', type: 'Oils', stock: 15, image: '/oil-1.png', featured: true, description: 'Rare extract from Argan leaves, known for its soothing and antioxidant properties.' },
];
