/* ============================================
   MONE - Product Database
   ============================================ */

const PRODUCTS = [
  // WHISKY
  {
    id: 'whisky-001',
    name: 'Jack Daniels Old No.7',
    category: 'whisky',
    brand: 'Jack Daniels',
    description: 'Whisky Tennessee 1L',
    volume: '1L',
    price: 149.90,
    available: true,
    tags: ['jack', 'jack daniels', 'tennessee'],
    inChat: true
  },
  {
    id: 'whisky-002',
    name: 'Jack Daniels Honey',
    category: 'whisky',
    brand: 'Jack Daniels',
    description: 'Whisky Tennessee Mel 1L',
    volume: '1L',
    price: 139.90,
    available: true,
    tags: ['jack', 'honey', 'jack honey'],
    inChat: true
  },
  {
    id: 'whisky-003',
    name: 'Red Label',
    category: 'whisky',
    brand: 'Johnnie Walker',
    description: 'Whisky Escoces 1L',
    volume: '1L',
    price: 119.90,
    available: true,
    tags: ['red', 'red label', 'johnnie'],
    inChat: true
  },
  {
    id: 'whisky-004',
    name: 'Black Label',
    category: 'whisky',
    brand: 'Johnnie Walker',
    description: 'Whisky Escoces 12 anos 1L',
    volume: '1L',
    price: 189.90,
    available: true,
    tags: ['black', 'black label', 'johnnie'],
    inChat: true
  },
  {
    id: 'whisky-005',
    name: 'Chivas Regal 12',
    category: 'whisky',
    brand: 'Chivas',
    description: 'Whisky Escoces 12 anos 1L',
    volume: '1L',
    price: 179.90,
    available: true,
    tags: ['chivas', 'chivas 12'],
    inChat: true
  },
  {
    id: 'whisky-006',
    name: 'Ballantines',
    category: 'whisky',
    brand: 'Ballantines',
    description: 'Whisky Escoces 1L',
    volume: '1L',
    price: 89.90,
    available: true,
    tags: ['ballantines'],
    inChat: true
  },
  {
    id: 'whisky-007',
    name: 'Jameson',
    category: 'whisky',
    brand: 'Jameson',
    description: 'Whisky Irlandes 1L',
    volume: '1L',
    price: 129.90,
    available: true,
    tags: ['jameson', 'irlandes'],
    inChat: true
  },
  {
    id: 'whisky-008',
    name: 'Wild Turkey 101',
    category: 'whisky',
    brand: 'Wild Turkey',
    description: 'Whisky Bourbon 1L',
    volume: '1L',
    price: 159.90,
    available: true,
    tags: ['wild turkey', 'turkey', 'bourbon'],
    inChat: true
  },

  // VODKA
  {
    id: 'vodka-001',
    name: 'Absolut',
    category: 'vodka',
    brand: 'Absolut',
    description: 'Vodka Sueca 1L',
    volume: '1L',
    price: 89.90,
    available: true,
    tags: ['absolut'],
    inChat: true
  },
  {
    id: 'vodka-002',
    name: 'Smirnoff',
    category: 'vodka',
    brand: 'Smirnoff',
    description: 'Vodka 1L',
    volume: '1L',
    price: 59.90,
    available: true,
    tags: ['smirnoff'],
    inChat: true
  },
  {
    id: 'vodka-003',
    name: 'Grey Goose',
    category: 'vodka',
    brand: 'Grey Goose',
    description: 'Vodka Premium 1L',
    volume: '1L',
    price: 199.90,
    available: true,
    tags: ['grey goose', 'gray goose'],
    inChat: true
  },
  {
    id: 'vodka-004',
    name: 'Ciroc',
    category: 'vodka',
    brand: 'Ciroc',
    description: 'Vodca Uva 1L',
    volume: '1L',
    price: 159.90,
    available: true,
    tags: ['ciroc'],
    inChat: true
  },

  // GIN
  {
    id: 'gin-001',
    name: 'Gordon\'s',
    category: 'gin',
    brand: 'Gordon\'s',
    description: 'Gin London Dry 1L',
    volume: '1L',
    price: 49.90,
    available: true,
    tags: ['gordons', 'gordon'],
    inChat: true
  },
  {
    id: 'gin-002',
    name: 'Tanqueray',
    category: 'gin',
    brand: 'Tanqueray',
    description: 'Gin London Dry 1L',
    volume: '1L',
    price: 99.90,
    available: true,
    tags: ['tanqueray'],
    inChat: true
  },
  {
    id: 'gin-003',
    name: 'Bombay Sapphire',
    category: 'gin',
    brand: 'Bombay',
    description: 'Gin Premium 1L',
    volume: '1L',
    price: 129.90,
    available: true,
    tags: ['bombay', 'sapphire'],
    inChat: true
  },
  {
    id: 'gin-004',
    name: 'Beefeater',
    category: 'gin',
    brand: 'Beefeater',
    description: 'Gin London Dry 1L',
    volume: '1L',
    price: 69.90,
    available: true,
    tags: ['beefeater'],
    inChat: true
  },

  // CERVEJA
  {
    id: 'cerveja-001',
    name: 'Heineken',
    category: 'cerveja',
    brand: 'Heineken',
    description: 'Cerveja Puro Malte Lata 350ml',
    volume: '350ml',
    price: 6.90,
    available: true,
    tags: ['heineken', 'hineken'],
    inChat: true
  },
  {
    id: 'cerveja-002',
    name: 'Heineken Long Neck',
    category: 'cerveja',
    brand: 'Heineken',
    description: 'Cerveja Puro Malte 600ml',
    volume: '600ml',
    price: 9.90,
    available: true,
    tags: ['heineken', 'long neck'],
    inChat: true
  },
  {
    id: 'cerveja-003',
    name: 'Skol Lata',
    category: 'cerveja',
    brand: 'Skol',
    description: 'Cerveja Lata 350ml',
    volume: '350ml',
    price: 4.50,
    available: true,
    tags: ['skol'],
    inChat: true
  },
  {
    id: 'cerveja-004',
    name: 'Brahma Lata',
    category: 'cerveja',
    brand: 'Brahma',
    description: 'Cerveja Lata 350ml',
    volume: '350ml',
    price: 4.50,
    available: true,
    tags: ['brahma'],
    inChat: true
  },
  {
    id: 'cerveja-005',
    name: 'Amstel Lata',
    category: 'cerveja',
    brand: 'Amstel',
    description: 'Cerveja Lata 350ml',
    volume: '350ml',
    price: 5.50,
    available: true,
    tags: ['amstel'],
    inChat: true
  },
  {
    id: 'cerveja-006',
    name: 'Corona',
    category: 'cerveja',
    brand: 'Corona',
    description: 'Cerveja Importada 355ml',
    volume: '355ml',
    price: 12.90,
    available: true,
    tags: ['corona'],
    inChat: true
  },
  {
    id: 'cerveja-007',
    name: 'Stella Artois',
    category: 'cerveja',
    brand: 'Stella Artois',
    description: 'Cerveja Puro Malte Long Neck 600ml',
    volume: '600ml',
    price: 10.90,
    available: true,
    tags: ['stella', 'artois'],
    inChat: true
  },
  {
    id: 'cerveja-008',
    name: 'Budweiser',
    category: 'cerveja',
    brand: 'Budweiser',
    description: 'Cerveja Lata 350ml',
    volume: '350ml',
    price: 5.90,
    available: true,
    tags: ['bud', 'budweiser'],
    inChat: true
  },

  // VINHO
  {
    id: 'vinho-001',
    name: 'Casillero del Diablo Cabernet',
    category: 'vinho',
    brand: 'Casillero del Diablo',
    description: 'Vinho Tinto Cabernet Sauvignon 750ml',
    volume: '750ml',
    price: 59.90,
    available: true,
    tags: ['casillero', 'del diablo', 'cabernet'],
    inChat: true
  },
  {
    id: 'vinho-002',
    name: 'Casillero del Diablo Malbec',
    category: 'vinho',
    brand: 'Casillero del Diablo',
    description: 'Vinho Tinto Malbec 750ml',
    volume: '750ml',
    price: 59.90,
    available: true,
    tags: ['casillero', 'del diablo', 'malbec'],
    inChat: true
  },
  {
    id: 'vinho-003',
    name: 'Santa Helena Reserva',
    category: 'vinho',
    brand: 'Santa Helena',
    description: 'Vinho Tinto Merlot 750ml',
    volume: '750ml',
    price: 39.90,
    available: true,
    tags: ['santa helena'],
    inChat: true
  },
  {
    id: 'vinho-004',
    name: 'Gato Negro',
    category: 'vinho',
    brand: 'Gato Negro',
    description: 'Vinho Tinto 750ml',
    volume: '750ml',
    price: 34.90,
    available: true,
    tags: ['gato negro'],
    inChat: true
  },

  // ESPUMANTE
  {
    id: 'espumante-001',
    name: 'Chandon Brut',
    category: 'espumante',
    brand: 'Chandon',
    description: 'Espumante Brut 750ml',
    volume: '750ml',
    price: 79.90,
    available: true,
    tags: ['chandon', 'brut'],
    inChat: true
  },
  {
    id: 'espumante-002',
    name: 'Casa Perini Moscatel',
    category: 'espumante',
    brand: 'Casa Perini',
    description: 'Espumante Moscatel 750ml',
    volume: '750ml',
    price: 49.90,
    available: true,
    tags: ['perini', 'moscatel'],
    inChat: true
  },

  // ENERGETICO
  {
    id: 'energetico-001',
    name: 'Red Bull',
    category: 'energetico',
    brand: 'Red Bull',
    description: 'Energetico Lata 250ml',
    volume: '250ml',
    price: 12.90,
    available: true,
    tags: ['red bull', 'energetico'],
    inChat: true
  },
  {
    id: 'energetico-002',
    name: 'Monster Energy',
    category: 'energetico',
    brand: 'Monster',
    description: 'Energetico Lata 473ml',
    volume: '473ml',
    price: 14.90,
    available: true,
    tags: ['monster'],
    inChat: true
  },
  {
    id: 'energetico-003',
    name: 'Red Bull Sugar Free',
    category: 'energetico',
    brand: 'Red Bull',
    description: 'Energetico Zero Acucar 250ml',
    volume: '250ml',
    price: 12.90,
    available: true,
    tags: ['red bull', 'sugar free', 'zero'],
    inChat: true
  },

  // PODS / VAPES
  {
    id: 'pod-001',
    name: 'Ignite V80',
    category: 'pods',
    brand: 'Ignite',
    description: 'Pod Descartavel 800 puffs',
    volume: '800 puffs',
    price: 39.90,
    available: true,
    tags: ['ignite', 'v80', 'pod', 'descartavel'],
    inChat: true
  },
  {
    id: 'pod-002',
    name: 'Elf Bar BC5000',
    category: 'pods',
    brand: 'Elf Bar',
    description: 'Pod Descartavel 5000 puffs',
    volume: '5000 puffs',
    price: 89.90,
    available: true,
    tags: ['elf', 'elf bar', 'bc5000', 'pod'],
    inChat: true
  },
  {
    id: 'pod-003',
    name: 'Vape Pen 22',
    category: 'pods',
    brand: 'Smok',
    description: 'Kit Vape Pen 22 1100mAh',
    volume: '1100mAh',
    price: 129.90,
    available: true,
    tags: ['smok', 'vape pen', 'kit vape'],
    inChat: true
  },
  {
    id: 'pod-004',
    name: 'Essencia Red Fruit',
    category: 'pods',
    brand: 'Generic',
    description: 'Essencia para Pod 30ml',
    volume: '30ml',
    price: 34.90,
    available: true,
    tags: ['essencia', 'red fruit', 'juice'],
    inChat: true
  },
  {
    id: 'pod-005',
    name: 'Essencia Mint',
    category: 'pods',
    brand: 'Generic',
    description: 'Essencia de Mentol 30ml',
    volume: '30ml',
    price: 34.90,
    available: true,
    tags: ['essencia', 'mint', 'menta', 'mentol'],
    inChat: true
  },
  {
    id: 'pod-006',
    name: 'Pod Ignite Ice 6000',
    category: 'pods',
    brand: 'Ignite',
    description: 'Pod Descartavel 6000 puffs',
    volume: '6000 puffs',
    price: 69.90,
    available: true,
    tags: ['ignite', 'ice', '6000', 'pod'],
    inChat: true
  },
  {
    id: 'pod-007',
    name: 'Elf Bar 600',
    category: 'pods',
    brand: 'Elf Bar',
    description: 'Pod Descartavel 600 puffs',
    volume: '600 puffs',
    price: 29.90,
    available: true,
    tags: ['elf', 'elf bar', '600', 'pod'],
    inChat: true
  },

  // TABACARIA
  {
    id: 'tabaco-001',
    name: 'Seda OCB Slim',
    category: 'tabacaria',
    brand: 'OCB',
    description: 'Seda Slim 32 folhas',
    volume: '32 folhas',
    price: 5.90,
    available: true,
    tags: ['seda', 'ocb', 'slim'],
    inChat: true
  },
  {
    id: 'tabaco-002',
    name: 'Seda Elements King Size',
    category: 'tabacaria',
    brand: 'Elements',
    description: 'Seda King Size 50 folhas',
    volume: '50 folhas',
    price: 8.90,
    available: true,
    tags: ['seda', 'elements', 'king size'],
    inChat: true
  },
  {
    id: 'tabaco-003',
    name: 'Piteira Glass',
    category: 'tabacaria',
    brand: 'Generic',
    description: 'Piteira de Vidro',
    volume: 'unidade',
    price: 12.90,
    available: true,
    tags: ['piteira', 'vidro', 'glass'],
    inChat: true
  },
  {
    id: 'tabaco-004',
    name: 'Piteira Slim 8mm',
    category: 'tabacaria',
    brand: 'Generic',
    description: 'Piteira Slim 100 unidades',
    volume: '100 un',
    price: 3.90,
    available: true,
    tags: ['piteira', 'slim', '8mm'],
    inChat: true
  },
  {
    id: 'tabaco-005',
    name: 'Isqueiro BIC',
    category: 'tabacaria',
    brand: 'BIC',
    description: 'Isqueiro Classico',
    volume: 'unidade',
    price: 3.50,
    available: true,
    tags: ['isqueiro', 'bic', 'fogo'],
    inChat: true
  },
  {
    id: 'tabaco-006',
    name: 'Isqueiro Maçarico',
    category: 'tabacaria',
    brand: 'Generic',
    description: 'Isqueiro Macarico Tuneira',
    volume: 'unidade',
    price: 19.90,
    available: true,
    tags: ['isqueiro', 'macarico', 'tuneira'],
    inChat: true
  },
  {
    id: 'tabaco-007',
    name: 'Palha 10 unidades',
    category: 'tabacaria',
    brand: 'Generic',
    description: 'Palha para fumo 10 unidades',
    volume: '10 un',
    price: 2.50,
    available: true,
    tags: ['palha', 'fumo'],
    inChat: true
  },
  {
    id: 'tabaco-008',
    name: 'Narguile Completo',
    category: 'tabacaria',
    brand: 'Generic',
    description: 'Narguile Completo 50cm',
    volume: '50cm',
    price: 149.90,
    available: true,
    tags: ['narguile', 'narg', 'hookah'],
    inChat: true
  },
  {
    id: 'tabaco-009',
    name: 'Carvao Narguile 1kg',
    category: 'tabacaria',
    brand: 'Generic',
    description: 'Carvao para Narguile 1kg',
    volume: '1kg',
    price: 19.90,
    available: true,
    tags: ['carvao', 'narguile', 'carvao narguile'],
    inChat: true
  },

  // ACESSORIOS
  {
    id: 'acessorios-001',
    name: 'Gelo 2kg',
    category: 'acessorios',
    brand: 'Generic',
    description: 'Saco de Gelo 2kg',
    volume: '2kg',
    price: 8.90,
    available: true,
    tags: ['gelo'],
    inChat: true
  },
  {
    id: 'acessorios-002',
    name: 'Copo Caipirinha 300ml',
    category: 'acessorios',
    brand: 'Generic',
    description: 'Copo para whisky 300ml',
    volume: '300ml',
    price: 5.90,
    available: true,
    tags: ['copo', 'caipirinha', 'whisky'],
    inChat: true
  },
  {
    id: 'acessorios-003',
    name: 'Copo Long Drink',
    category: 'acessorios',
    brand: 'Generic',
    description: 'Copo Long Drink 400ml',
    volume: '400ml',
    price: 6.90,
    available: true,
    tags: ['copo', 'long drink'],
    inChat: true
  },
  {
    id: 'acessorios-004',
    name: 'Agua Mineral 500ml',
    category: 'acessorios',
    brand: 'Generic',
    description: 'Agua Mineral 500ml',
    volume: '500ml',
    price: 3.00,
    available: true,
    tags: ['agua', 'agua mineral'],
    inChat: true
  },
  {
    id: 'acessorios-005',
    name: 'Refrigerante Coca-Cola 2L',
    category: 'acessorios',
    brand: 'Coca-Cola',
    description: 'Refrigerante Coca-Cola 2L',
    volume: '2L',
    price: 10.90,
    available: true,
    tags: ['coca', 'coca-cola', 'refrigerante'],
    inChat: true
  },
  {
    id: 'acessorios-006',
    name: 'Carvao Churrasco 2kg',
    category: 'acessorios',
    brand: 'Generic',
    description: 'Carvao para Churrasco 2kg',
    volume: '2kg',
    price: 14.90,
    available: true,
    tags: ['carvao', 'churrasco', 'carvao churrasco'],
    inChat: true
  }
];

// Categories for filtering
const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'whisky', label: 'Whiskies' },
  { id: 'vodka', label: 'Vodkas' },
  { id: 'gin', label: 'Gins' },
  { id: 'cerveja', label: 'Cervejas' },
  { id: 'vinho', label: 'Vinhos' },
  { id: 'espumante', label: 'Espumantes' },
  { id: 'pods', label: 'Pods & Vapes' },
  { id: 'energetico', label: 'Energeticos' },
  { id: 'tabacaria', label: 'Tabacaria' },
  { id: 'acessorios', label: 'Acessorios' }
];

// Store info
const STORE_INFO = {
  name: 'Money Adega & Tabacaria',
  slogan: 'Seu role comeca aqui.',
  hours: 'Seg a Sab: 09h as 23h | Dom: 10h as 22h',
  address: 'Rua Exemplo, 123 - Centro, Cuiaba - MT',
  phone: '(65) 99999-8888',
  whatsapp: '5565999998888',
  instagram: '@moneyadega',
  paymentMethods: 'PIX, Dinheiro, Cartao de Debito e Credito',
  deliveryFee: 5.00,
  minOrder: 30.00,
  avgTime: '45 min',
  neighborhoods: ['Centro', 'CPA', 'Alicerce', 'Alvorada', 'Morada do Ouro', 'Quilombo', 'Santa Rosa']
};

// Product helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  );
}

function getProductIcon(category) {
  const icons = {
    whisky: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3"/><path d="M10 1v3"/><path d="M14 1v3"/></svg>`,
    vodka: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M12 1v3"/></svg>`,
    gin: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>`,
    cerveja: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M5 7v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V7"/><path d="M5 7h10"/></svg>`,
    vinho: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M12 22V10"/><path d="M12 10c-2 0-4-1.5-4-4V3h8v3c0 2.5-2 4-4 4z"/><path d="M8 3h8"/></svg>`,
    espumante: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M8 21h8"/><path d="M12 21v-6"/><path d="M12 15c-2.5 0-5-2-5-5V3h10v7c0 3-2.5 5-5 5z"/><path d="M7 3h10"/></svg>`,
    pods: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>`,
    energetico: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    tabacaria: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M3 12h18"/><path d="M6 12V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6"/><rect x="2" y="15" width="20" height="6" rx="1"/></svg>`,
    acessorios: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/></svg>`
  };
  return icons[category] || icons.acessorios;
}
