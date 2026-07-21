const PRODUCTS = [
  { id: 'whisky-001', name: 'Jack Daniels Old No.7', category: 'whisky', brand: 'Jack Daniels', description: 'Whisky Tennessee 1L', volume: '1L', price: 149.90, available: true, tags: ['jack', 'jack daniels', 'tennessee'] },
  { id: 'whisky-002', name: 'Jack Daniels Honey', category: 'whisky', brand: 'Jack Daniels', description: 'Whisky Tennessee Mel 1L', volume: '1L', price: 139.90, available: true, tags: ['jack', 'honey'] },
  { id: 'whisky-003', name: 'Red Label', category: 'whisky', brand: 'Johnnie Walker', description: 'Whisky Escoces 1L', volume: '1L', price: 119.90, available: true, tags: ['red', 'red label'] },
  { id: 'whisky-004', name: 'Black Label', category: 'whisky', brand: 'Johnnie Walker', description: 'Whisky Escoces 12 anos 1L', volume: '1L', price: 189.90, available: true, tags: ['black', 'black label'] },
  { id: 'whisky-005', name: 'Chivas Regal 12', category: 'whisky', brand: 'Chivas', description: 'Whisky Escoces 12 anos 1L', volume: '1L', price: 179.90, available: true, tags: ['chivas'] },
  { id: 'whisky-006', name: 'Ballantines', category: 'whisky', brand: 'Ballantines', description: 'Whisky Escoces 1L', volume: '1L', price: 89.90, available: true, tags: ['ballantines'] },
  { id: 'whisky-007', name: 'Jameson', category: 'whisky', brand: 'Jameson', description: 'Whisky Irlandes 1L', volume: '1L', price: 129.90, available: true, tags: ['jameson'] },
  { id: 'vodka-001', name: 'Absolut', category: 'vodka', brand: 'Absolut', description: 'Vodka Sueca 1L', volume: '1L', price: 89.90, available: true, tags: ['absolut'] },
  { id: 'vodka-002', name: 'Smirnoff', category: 'vodka', brand: 'Smirnoff', description: 'Vodka 1L', volume: '1L', price: 59.90, available: true, tags: ['smirnoff'] },
  { id: 'vodka-003', name: 'Grey Goose', category: 'vodka', brand: 'Grey Goose', description: 'Vodka Premium 1L', volume: '1L', price: 199.90, available: true, tags: ['grey goose'] },
  { id: 'gin-001', name: 'Gordons', category: 'gin', brand: 'Gordons', description: 'Gin London Dry 1L', volume: '1L', price: 49.90, available: true, tags: ['gordons'] },
  { id: 'gin-002', name: 'Tanqueray', category: 'gin', brand: 'Tanqueray', description: 'Gin London Dry 1L', volume: '1L', price: 99.90, available: true, tags: ['tanqueray'] },
  { id: 'gin-003', name: 'Bombay Sapphire', category: 'gin', brand: 'Bombay', description: 'Gin Premium 1L', volume: '1L', price: 129.90, available: true, tags: ['bombay'] },
  { id: 'cerveja-001', name: 'Heineken Lata', category: 'cerveja', brand: 'Heineken', description: 'Cerveja Puro Malte 350ml', volume: '350ml', price: 6.90, available: true, tags: ['heineken'] },
  { id: 'cerveja-002', name: 'Heineken Long Neck', category: 'cerveja', brand: 'Heineken', description: 'Cerveja Puro Malte 600ml', volume: '600ml', price: 9.90, available: true, tags: ['heineken', 'long neck'] },
  { id: 'cerveja-003', name: 'Skol Lata', category: 'cerveja', brand: 'Skol', description: 'Cerveja Lata 350ml', volume: '350ml', price: 4.50, available: true, tags: ['skol'] },
  { id: 'cerveja-004', name: 'Stella Artois', category: 'cerveja', brand: 'Stella Artois', description: 'Cerveja Puro Malte 600ml', volume: '600ml', price: 10.90, available: true, tags: ['stella'] },
  { id: 'cerveja-005', name: 'Corona', category: 'cerveja', brand: 'Corona', description: 'Cerveja Importada 355ml', volume: '355ml', price: 12.90, available: true, tags: ['corona'] },
  { id: 'cerveja-006', name: 'Amstel Lata', category: 'cerveja', brand: 'Amstel', description: 'Cerveja Lata 350ml', volume: '350ml', price: 5.50, available: true, tags: ['amstel'] },
  { id: 'vinho-001', name: 'Casillero del Diablo Cabernet', category: 'vinho', brand: 'Casillero del Diablo', description: 'Vinho Tinto Cabernet Sauvignon 750ml', volume: '750ml', price: 59.90, available: true, tags: ['casillero', 'cabernet'] },
  { id: 'vinho-002', name: 'Casillero del Diablo Malbec', category: 'vinho', brand: 'Casillero del Diablo', description: 'Vinho Tinto Malbec 750ml', volume: '750ml', price: 59.90, available: true, tags: ['casillero', 'malbec'] },
  { id: 'espumante-001', name: 'Chandon Brut', category: 'espumante', brand: 'Chandon', description: 'Espumante Brut 750ml', volume: '750ml', price: 79.90, available: true, tags: ['chandon'] },
  { id: 'energetico-001', name: 'Red Bull', category: 'energetico', brand: 'Red Bull', description: 'Energetico Lata 250ml', volume: '250ml', price: 12.90, available: true, tags: ['red bull'] },
  { id: 'energetico-002', name: 'Monster Energy', category: 'energetico', brand: 'Monster', description: 'Energetico Lata 473ml', volume: '473ml', price: 14.90, available: true, tags: ['monster'] },
  { id: 'pod-001', name: 'Ignite V80', category: 'pods', brand: 'Ignite', description: 'Pod Descartavel 800 puffs', volume: '800 puffs', price: 39.90, available: true, tags: ['ignite'] },
  { id: 'pod-002', name: 'Elf Bar BC5000', category: 'pods', brand: 'Elf Bar', description: 'Pod Descartavel 5000 puffs', volume: '5000 puffs', price: 89.90, available: true, tags: ['elf'] },
  { id: 'pod-003', name: 'Pod Ignite Ice 6000', category: 'pods', brand: 'Ignite', description: 'Pod Descartavel 6000 puffs', volume: '6000 puffs', price: 69.90, available: true, tags: ['ignite', 'ice'] },
  { id: 'tabaco-001', name: 'Seda OCB Slim', category: 'tabacaria', brand: 'OCB', description: 'Seda Slim 32 folhas', volume: '32 folhas', price: 5.90, available: true, tags: ['seda'] },
  { id: 'tabaco-002', name: 'Isqueiro BIC', category: 'tabacaria', brand: 'BIC', description: 'Isqueiro Classico', volume: 'unidade', price: 3.50, available: true, tags: ['isqueiro'] },
  { id: 'tabaco-003', name: 'Narguile Completo', category: 'tabacaria', brand: 'Generic', description: 'Narguile Completo 50cm', volume: '50cm', price: 149.90, available: true, tags: ['narguile'] },
  { id: 'acessorios-001', name: 'Gelo 2kg', category: 'acessorios', brand: 'Generic', description: 'Saco de Gelo 2kg', volume: '2kg', price: 8.90, available: true, tags: ['gelo'] },
  { id: 'acessorios-002', name: 'Carvao Churrasco 2kg', category: 'acessorios', brand: 'Generic', description: 'Carvao para Churrasco 2kg', volume: '2kg', price: 14.90, available: true, tags: ['carvao'] }
];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}

module.exports = { getProductById, getProductsByCategory, searchProducts, PRODUCTS };
