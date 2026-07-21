/* ============================================
   MONE - Application Logic
   Chatbot IA para Money Adega & Tabacaria
   ============================================ */

// ============================================
// STATE
// ============================================
const state = {
  currentView: 'chat',
  cart: [],
  order: null,
  selectedCategory: 'all',
  isTyping: false,
  chatHistory: []
};

// ============================================
// DOM REFS
// ============================================
const $ = (id) => document.getElementById(id);
const dom = {
  splash: $('splash'),
  app: $('app'),
  chatMessages: $('chatMessages'),
  chatInput: $('chatInput'),
  sendBtn: $('sendBtn'),
  quickActions: $('quickActions'),
  quickBtns: () => document.querySelectorAll('.quick-btn'),
  sidebar: $('sidebar'),
  menuBtn: $('menuBtn'),
  closeMenuBtn: $('closeMenuBtn'),
  sidebarOverlay: $('sidebarOverlay'),
  sidebarItems: () => document.querySelectorAll('.sidebar-item'),
  views: () => document.querySelectorAll('.view'),
  cartBtn: $('cartBtn'),
  cartBadge: $('cartBadge'),
  cartDrawer: $('cartDrawer'),
  closeCartBtn: $('closeCartBtn'),
  cartOverlay: $('cartOverlay'),
  cartItems: $('cartItems'),
  cartFooter: $('cartFooter'),
  cartTotal: $('cartTotal'),
  checkoutBtn: $('checkoutBtn'),
  checkoutModal: $('checkoutModal'),
  closeModalBtn: $('closeModalBtn'),
  modalOverlay: $('modalOverlay'),
  checkoutForm: $('checkoutForm'),
  orderSummary: $('orderSummary'),
  productsGrid: $('productsGrid'),
  categoryTabs: $('categoryTabs'),
  productSearch: $('productSearch'),
  orderContent: $('orderContent'),
  toast: $('toast'),
  clientName: $('clientName'),
  clientPhone: $('clientPhone'),
  clientAddress: $('clientAddress'),
  paymentMethod: $('paymentMethod'),
  orderNotes: $('orderNotes')
};

// ============================================
// SPLASH
// ============================================
setTimeout(() => {
  dom.splash.classList.add('hidden');
  dom.app.classList.remove('hidden');
}, 2200);

// ============================================
// NAVIGATION
// ============================================
function switchView(viewId) {
  dom.views().forEach(v => v.classList.remove('active'));
  const view = document.getElementById(`view-${viewId}`);
  if (view) view.classList.add('active');
  state.currentView = viewId;
  dom.sidebarItems().forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewId);
  });
  closeSidebar();
  if (viewId === 'products') renderProducts();
  if (viewId === 'orders') renderOrder();
}

dom.sidebarItems().forEach(item => {
  item.addEventListener('click', () => switchView(item.dataset.view));
});

dom.menuBtn.addEventListener('click', () => {
  dom.sidebar.classList.remove('hidden');
  dom.sidebarOverlay.classList.remove('hidden');
});
dom.closeMenuBtn.addEventListener('click', closeSidebar);
dom.sidebarOverlay.addEventListener('click', closeSidebar);
function closeSidebar() {
  dom.sidebar.classList.add('hidden');
  dom.sidebarOverlay.classList.add('hidden');
}

// ============================================
// CART DRAWER
// ============================================
dom.cartBtn.addEventListener('click', () => {
  dom.cartDrawer.classList.remove('hidden');
  dom.cartOverlay.classList.remove('hidden');
  renderCartDrawer();
});
dom.closeCartBtn.addEventListener('click', closeCart);
dom.cartOverlay.addEventListener('click', closeCart);
function closeCart() {
  dom.cartDrawer.classList.add('hidden');
  dom.cartOverlay.classList.add('hidden');
}

function updateCartBadge() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  dom.cartBadge.textContent = count;
  dom.cartBadge.classList.toggle('hidden', count === 0);
}

// ============================================
// CHAT SYSTEM
// ============================================

function addMessage(text, type = 'mone') {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  if (type === 'mone') {
    div.innerHTML = `
      <div class="message-avatar">
        <svg viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="#d4af37" stroke-width="1" fill="#1a1a1a"/>
          <text x="14" y="19" text-anchor="middle" fill="#d4af37" font-size="13" font-family="Georgia, serif" font-weight="bold">$</text>
        </svg>
      </div>
      <div class="message-content">${text}</div>`;
  } else {
    div.innerHTML = `<div class="message-content">${text}</div>`;
  }
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

function addProductMessage(product) {
  const div = document.createElement('div');
  div.className = 'message mone';
  div.innerHTML = `
    <div class="message-avatar">
      <svg viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#d4af37" stroke-width="1" fill="#1a1a1a"/>
        <text x="14" y="19" text-anchor="middle" fill="#d4af37" font-size="13" font-family="Georgia, serif" font-weight="bold">$</text>
      </svg>
    </div>
    <div class="message-content">
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-img">${getProductIcon(product.category)}</div>
        <div class="product-card-info">
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-desc">${product.description}</div>
          <div class="product-card-price">R$ ${product.price.toFixed(2)}</div>
          <button class="product-card-btn add-to-cart" data-id="${product.id}">Adicionar ao pedido</button>
        </div>
      </div>
    </div>`;
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;

  div.querySelector('.add-to-cart').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });
}

function addProductsCarousel(products, title) {
  const div = document.createElement('div');
  div.className = 'message mone';
  let html = `
    <div class="message-avatar">
      <svg viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#d4af37" stroke-width="1" fill="#1a1a1a"/>
        <text x="14" y="19" text-anchor="middle" fill="#d4af37" font-size="13" font-family="Georgia, serif" font-weight="bold">$</text>
      </svg>
    </div>
    <div class="message-content">
      <p>${title}</p>
      <div class="products-carousel">`;
  products.forEach(p => {
    html += `
      <div class="product-card" data-id="${p.id}">
        <div class="product-card-img">${getProductIcon(p.category)}</div>
        <div class="product-card-info">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-desc">${p.description}</div>
          <div class="product-card-price">R$ ${p.price.toFixed(2)}</div>
          <button class="product-card-btn add-to-cart" data-id="${p.id}">Adicionar</button>
        </div>
      </div>`;
  });
  html += `</div></div>`;
  div.innerHTML = html;
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;

  div.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
    });
  });
}

function showTyping() {
  if (state.isTyping) return;
  state.isTyping = true;
  const div = document.createElement('div');
  div.className = 'message mone';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="message-avatar">
      <svg viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#d4af37" stroke-width="1" fill="#1a1a1a"/>
        <text x="14" y="19" text-anchor="middle" fill="#d4af37" font-size="13" font-family="Georgia, serif" font-weight="bold">$</text>
      </svg>
    </div>
    <div class="message-content">
      <div class="typing"><span></span><span></span><span></span></div>
    </div>`;
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

function hideTyping() {
  state.isTyping = false;
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function showToast(msg) {
  dom.toast.textContent = msg;
  dom.toast.classList.remove('hidden');
  setTimeout(() => dom.toast.classList.add('hidden'), 2500);
}

// ============================================
// CHAT RESPONSES
// ============================================

const RESPONSES = {
  'ola': 'Ola! Como vai? Em que posso ajudar hoje?',
  'bom dia': 'Bom dia! Como posso te ajudar hoje?',
  'boa tarde': 'Boa tarde! Esta procurando algo especial hoje?',
  'boa noite': 'Boa noite! Vamos encontrar o que voce precisa?',
  'obrigado': 'Por nada! Se precisar de mais algo, e so chamar.',
  'obrigada': 'Por nada! Se precisar de mais algo, e so chamar.',
  'quero falar com alguem': 'Vou transferir para um atendente. Um momento, por favor.',
  'atendente': 'Vou transferir para um atendente. Um momento, por favor.',
  'humano': 'Vou transferir para um atendente. Um momento, por favor.',
  'reclamacao': 'Vou encaminhar sua reclamacao para nossa equipe. Pedimos desculpas pelo inconveniente.',
  'cancelar': 'Vou te transferir para um atendente para tratar sobre o cancelamento.',
  'problema': 'Vou encaminhar para nossa equipe de suporte. Eles vao te ajudar rapidamente.'
};

function getMoneResponse(input) {
  const q = input.toLowerCase().trim();

  // Check static responses first
  for (const [key, response] of Object.entries(RESPONSES)) {
    if (q.includes(key) || q === key) {
      return response;
    }
  }

  // Greetings
  if (/^(oi|oie|oii|hey|hey|e aí|eai|falou|fala)/.test(q)) {
    return 'Ola! Tudo bem? Como posso ajudar?';
  }

  // Horario
  if (/horario|funcionamento|abre|aberto|abrir|fecha|fechado/.test(q)) {
    return `Nosso horario de funcionamento:\n\n${STORE_INFO.hours}\n\nEsta aberto agora!`;
  }

  // Localizacao / endereco
  if (/localizacao|endereco|onde fica|fica|mapa|rua|bairro/.test(q)) {
    return `Estamos localizados na:\n\n${STORE_INFO.address}\n\nTe esperamos!`;
  }

  // WhatsApp / telefone
  if (/whatsapp|whats|telefone|celular|contato|ligar|falar/.test(q)) {
    return `Nosso WhatsApp:\n\n${STORE_INFO.phone}\n\nClique para falar conosco!`;
  }

  // Instagram
  if (/instagram|insta|rede social/.test(q)) {
    return `Nos siga no Instagram:\n\n${STORE_INFO.instagram}\n\nLá postamos novidades e promocoes!`;
  }

  // Pagamento
  if (/pagamento|pagar|pix|dinheiro|credito|debito|cartao|forma de pagamento/.test(q)) {
    return `Aceitamos:\n\n${STORE_INFO.paymentMethods}\n\nQual e a melhor para voce?`;
  }

  // Delivery / entrega
  if (/delivery|entrega|taxa|frete|bairro|entreg|receber/.test(q)) {
    return `Entregamos na regiao de Cuiaba.\n\nTaxa de entrega: R$ ${STORE_INFO.deliveryFee.toFixed(2)}\nPedido minimo: R$ ${STORE_INFO.minOrder.toFixed(2)}\nTempo medio: ${STORE_INFO.avgTime}\n\nBairros atendidos: ${STORE_INFO.neighborhoods.join(', ')}`;
  }

  // Promocoes
  if (/promocao|promo|oferta|desconto|barato|queima/.test(q)) {
    return `Temos promocoes especiais!\n\nNa compra de um whisky acima de R$ 150, leve gelo com desconto!\n\nFique de olho nas novidades do Instagram ${STORE_INFO.instagram}`;
  }

  // Whisky - specific brands
  if (/jack|jack daniel/i.test(q) && !q.includes('preco') && !q.includes('quanto')) {
    const products = searchProducts('jack daniels');
    if (products.length) {
      addProductsCarousel(products, 'Temos essas opcoes da Jack Daniels:');
      return null;
    }
  }

  if (/red label|red/i.test(q) && /label|whisky|wisky|uísque/.test(q) || q === 'red' || q === 'tem red') {
    addProductMessage(getProductById('whisky-003'));
    return 'Esse e o nosso Red Label. Excelente whisky para o dia a dia!';
  }

  if (/black label|black/i.test(q) && /label|whisky|wisky/.test(q) || q === 'black' || q === 'tem black') {
    addProductMessage(getProductById('whisky-004'));
    return 'Black Label 12 anos. Um classico indispensavel!';
  }

  // Product search by category
  if (/cerveja|beer|heineken|skol|brahma|amstel|corona|stella|budweiser|puro malte/.test(q)) {
    const products = getProductsByCategory('cerveja');
    addProductsCarousel(products, 'Aqui estao nossas cervejas:');
    return 'Todas geladinhas, esperando por voce!';
  }

  if (/whisky|wisky|whiskey|uísque|escoces|bourbon/.test(q)) {
    const products = getProductsByCategory('whisky');
    addProductsCarousel(products, 'Nossos whiskies disponiveis:');
    return 'Tem para todos os gostos e precos!';
  }

  if (/vodka|absolut|smirnoff|grey|ciroc/.test(q)) {
    const products = getProductsByCategory('vodka');
    addProductsCarousel(products, 'Essas sao nossas vodkas:');
    return 'Qual vai ser a escolhida?';
  }

  if (/gin|gordon|tanqueray|bombay|beefeater/.test(q)) {
    const products = getProductsByCategory('gin');
    addProductsCarousel(products, 'Nossos gins disponiveis:');
    return 'Otimos para um drink refrescante!';
  }

  if (/vinho|tinto|branco|cabernet|malbec|merlot|suave|seco/.test(q)) {
    const products = getProductsByCategory('vinho');
    addProductsCarousel(products, 'Selecao de vinhos:');
    return 'Tem vinho para cada ocasiao!';
  }

  if (/espumante|chandon|perini|brut|moscatel|champagne/.test(q)) {
    const products = getProductsByCategory('espumante');
    addProductsCarousel(products, 'Nossos espumantes:');
    return 'Para brindar os melhores momentos!';
  }

  if (/energetico|red bull|monster|energético/.test(q)) {
    const products = getProductsByCategory('energetico');
    addProductsCarousel(products, 'Energeticos disponiveis:');
    return 'Para acompanhar seu drink ou dar aquela energia!';
  }

  if (/pod|vape|essencia|ignite|elf|descartavel|vapor/.test(q)) {
    const products = getProductsByCategory('pods');
    addProductsCarousel(products, 'Pods e Vapes disponiveis:');
    return 'Tem opcoes para todos os gostos!';
  }

  if (/seda|piteira|isqueiro|narguile|fumo|palha|carvao|tabaco|tabacaria|bic|maçarico|macarico/.test(q)) {
    const products = getProductsByCategory('tabacaria');
    addProductsCarousel(products, 'Produtos de tabacaria:');
    return 'Completando seu momento!';
  }

  if (/gelo|copo|agua|refrigerante|coca|acessorio/.test(q)) {
    const products = getProductsByCategory('acessorios');
    addProductsCarousel(products, 'Acessorios disponiveis:');
    return 'Para deixar sua experiencia completa!';
  }

  // Product recommendations and comparisons
  if (/qual whisky (e|é) melhor|melhor whisky|whisky bom/.test(q)) {
    return 'Depende do seu gosto! Para quem esta comecando, recomendo o Red Label. Para algo mais refinado, o Black Label e Chivas sao excelentes. O Jack Daniels e classico para quem aprecia um Tennessee.';
  }

  if (/qual (whisky|wisky) (e|é) mais suave/.test(q)) {
    return 'O Jameson e um whisky irlandes bem suave, excelente para quem nao gosta de um sabor muito forte. O Chivas 12 tambem e bem equilibrado.';
  }

  if (/qual gin (e|é) melhor|melhor gin/.test(q)) {
    return 'O Tanqueray e o Bombay Sapphire sao os mais premium. O Gordon\'s e otimo para o custo-beneficio. Tudo depende do drink que voce vai fazer!';
  }

  if (/qual vodka (e|é) melhor|melhor vodka/.test(q)) {
    return 'A Grey Goose e a Ciroc sao vodkas premium, mas a Absolut e a Smirnoff tem um excelente custo-beneficio.';
  }

  if (/qual cerveja (e|é) puro malte|puro malte/.test(q)) {
    return 'Heineken e Stella Artois sao puro malte e tem aquele sabor diferenciado. A Heineken e a nossa mais vendida!';
  }

  if (/qual vinho combina com churrasco/.test(q)) {
    return 'Para churrasco, recomendo um Malbec como o Casillero del Diablo ou um Cabernet Sauvignon. Eles harmonizam muito bem com carne vermelha!';
  }

  if (/qual (pod|vape) dura mais/.test(q)) {
    return 'O Elf Bar BC5000 dura ate 5000 puffs e o Ignite Ice 6000 ate 6000 puffs. Sao os mais duradouros que temos!';
  }

  // Price queries
  if (/quanto custa|preco|valor|qual (o|e) preco|qual valor|quanto (e|é)/.test(q)) {
    const search = q.replace(/quanto custa|preco|valor|qual (o|e) preco|qual valor|quanto (e|é)/gi, '').trim();
    if (search) {
      const results = searchProducts(search);
      if (results.length === 1) {
        addProductMessage(results[0]);
        return `Esse e o preco do ${results[0].name}.`;
      } else if (results.length > 1) {
        addProductsCarousel(results, 'Encontrei esses produtos:');
        return null;
      }
    }
    return 'Pode me dizer qual produto voce quer saber o preco?';
  }

  // Generic product search
  const searchResults = searchProducts(q);
  if (searchResults.length === 1) {
    addProductMessage(searchResults[0]);
    return `Encontrei! Esse e o ${searchResults[0].name}.`;
  } else if (searchResults.length > 1) {
    addProductsCarousel(searchResults, 'Encontrei esses produtos para voce:');
    return null;
  }

  // Order related
  if (/pedido|comprar|quero comprar|quero fazer pedido/.test(q)) {
    if (state.cart.length === 0) {
      return 'Voce ainda nao tem itens no carrinho. De uma olhada no nosso catalogo e escolha seus produtos!';
    }
    return 'Voce ja tem itens no carrinho! Quer finalizar o pedido?';
  }

  if (/carrinho|meu pedido/.test(q)) {
    if (state.cart.length === 0) {
      return 'Seu carrinho esta vazio. Vamos escolher algo?';
    }
    renderCartDrawer();
    dom.cartDrawer.classList.remove('hidden');
    dom.cartOverlay.classList.remove('hidden');
    return null;
  }

  if (/menu|cardapio|catalogo|produtos|mostrar|ver/.test(q)) {
    switchView('products');
    return null;
  }

  if (/combo|kit|pack/.test(q)) {
    const products = [...getProductsByCategory('cerveja'), ...getProductsByCategory('whisky'), ...getProductsByCategory('energetico')].slice(0, 4);
    addProductsCarousel(products, 'Monte seu combo com esses produtos:');
    return 'Escolha os itens e monte seu combo personalizado!';
  }

  // Transfer to human
  if (/transferir|atendente|humano|falar com alguem/.test(q)) {
    return `Vou transferir para um atendente. Enquanto isso, voce pode falar conosco pelo WhatsApp: ${STORE_INFO.phone}`;
  }

  // Default fallback
  return 'Obrigado pela mensagem! Se tiver duvidas sobre produtos, precos, ou quiser fazer um pedido, e so me falar. Posso te ajudar com whisky, cerveja, vodkas, pods e muito mais!';
}

// ============================================
// CHAT HANDLER
// ============================================

function handleUserMessage(input) {
  const text = input.trim();
  if (!text) return;

  addMessage(escapeHtml(text), 'user');
  dom.chatInput.value = '';
  dom.chatInput.style.height = 'auto';

  showTyping();

  setTimeout(() => {
    hideTyping();
    const response = getMoneResponse(text);
    if (response) {
      addMessage(response, 'mone');
    }
  }, 800 + Math.random() * 700);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

dom.sendBtn.addEventListener('click', () => handleUserMessage(dom.chatInput.value));
dom.chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleUserMessage(dom.chatInput.value);
  }
});

// Quick action buttons
dom.quickBtns().forEach(btn => {
  btn.addEventListener('click', () => {
    handleUserMessage(btn.dataset.query);
  });
});

// ============================================
// CART FUNCTIONS
// ============================================

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  updateCartBadge();
  showToast(`${product.name} adicionado ao pedido!`);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  updateCartBadge();
  renderCartDrawer();
  renderOrder();
}

function updateQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartBadge();
  renderCartDrawer();
  renderOrder();
}

function getCartTotal() {
  return state.cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCartDrawer() {
  const items = dom.cartItems;
  items.innerHTML = '';

  if (state.cart.length === 0) {
    items.innerHTML = `<div class="order-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <p>Seu carrinho esta vazio</p>
    </div>`;
    dom.cartFooter.classList.add('hidden');
    return;
  }

  dom.cartFooter.classList.remove('hidden');

  state.cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button data-id="${item.id}" data-delta="-1">-</button>
          <span>${item.qty}</span>
          <button data-id="${item.id}" data-delta="1">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>`;
    items.appendChild(div);
  });

  items.querySelectorAll('.cart-item-qty button').forEach(btn => {
    btn.addEventListener('click', () => updateQty(btn.dataset.id, parseInt(btn.dataset.delta)));
  });
  items.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });

  dom.cartTotal.textContent = `R$ ${getCartTotal().toFixed(2)}`;
}

function renderOrder() {
  if (state.cart.length === 0) {
    dom.orderContent.innerHTML = `<div class="order-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <p>Seu carrinho esta vazio</p>
      <p class="sub">Navegue pelos produtos e adicione itens ao seu pedido.</p>
    </div>`;
    return;
  }
  renderCartDrawer();
}

// ============================================
// CHECKOUT
// ============================================

dom.cartBtn.addEventListener('click', () => {
  renderCartDrawer();
  dom.cartDrawer.classList.remove('hidden');
  dom.cartOverlay.classList.remove('hidden');
});

dom.checkoutBtn.addEventListener('click', () => {
  if (state.cart.length === 0) {
    showToast('Carrinho vazio! Adicione itens antes de finalizar.');
    return;
  }
  renderCheckoutSummary();
  dom.checkoutModal.classList.remove('hidden');
  dom.modalOverlay.classList.remove('hidden');
  closeCart();
});

dom.closeModalBtn.addEventListener('click', closeModal);
dom.modalOverlay.addEventListener('click', closeModal);
function closeModal() {
  dom.checkoutModal.classList.add('hidden');
  dom.modalOverlay.classList.add('hidden');
}

function renderCheckoutSummary() {
  let html = '<h4>Resumo do Pedido</h4>';
  state.cart.forEach(item => {
    html += `<div class="order-summary-item">
      <span>${item.name} x${item.qty}</span>
      <span>R$ ${(item.price * item.qty).toFixed(2)}</span>
    </div>`;
  });
  html += `<div class="order-summary-total">
    <span>Total</span>
    <span>R$ ${getCartTotal().toFixed(2)}</span>
  </div>`;
  dom.orderSummary.innerHTML = html;
}

dom.checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: dom.clientName.value,
    phone: dom.clientPhone.value,
    address: dom.clientAddress.value,
    payment: dom.paymentMethod.value,
    notes: dom.orderNotes.value,
    items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    total: getCartTotal()
  };

  sendOrderToWhatsApp(data);
  closeModal();
  state.cart = [];
  updateCartBadge();
  renderOrder();
  renderCartDrawer();

  addMessage('Pedido enviado com sucesso! Em breve nossa equipe entrara em contato para confirmar.', 'mone');
  showToast('Pedido enviado!');
});

function sendOrderToWhatsApp(data) {
  const items = data.items.map(i => `${i.name} x${i.qty} - R$ ${(i.price * i.qty).toFixed(2)}`).join('\n');
  const message = `NOVO PEDIDO\n\nCliente:\n${data.name}\nTelefone:\n${data.phone}\n\nItens:\n${items}\n\nPagamento:\n${data.payment}\nEndereco:\n${data.address}\nObservacoes:\n${data.notes || '-'}\n\nTotal: R$ ${data.total.toFixed(2)}`;
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encoded}`, '_blank');
}

// ============================================
// PRODUCTS VIEW
// ============================================

function renderCategories() {
  dom.categoryTabs.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `category-tab${cat.id === state.selectedCategory ? ' active' : ''}`;
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => {
      state.selectedCategory = cat.id;
      renderCategories();
      renderProducts();
    });
    dom.categoryTabs.appendChild(btn);
  });
}

function renderProducts() {
  const grid = dom.productsGrid;
  grid.innerHTML = '';
  const query = dom.productSearch.value.trim().toLowerCase();
  let products = state.selectedCategory === 'all'
    ? PRODUCTS
    : getProductsByCategory(state.selectedCategory);

  if (query) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.includes(query))
    );
  }

  if (products.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gray);">Nenhum produto encontrado.</div>`;
    return;
  }

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
      <div class="product-item-img">${getProductIcon(p.category)}</div>
      <div class="product-item-name">${p.name}</div>
      <div class="product-item-desc">${p.description}</div>
      <div class="product-item-price">R$ ${p.price.toFixed(2)}</div>
      <button class="product-item-add" data-id="${p.id}">Adicionar</button>`;
    div.querySelector('.product-item-add').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(p.id);
    });
    div.addEventListener('click', () => {
      addMessage(`Quero saber sobre ${p.name}`, 'user');
      addProductMessage(p);
      switchView('chat');
    });
    grid.appendChild(div);
  });
}

dom.productSearch.addEventListener('input', renderProducts);

// ============================================
// INIT
// ============================================

function init() {
  renderCategories();
  renderProducts();
  renderOrder();
  updateCartBadge();
}

init();
