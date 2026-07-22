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
  chatHistory: [],
  apiUrl: localStorage.getItem('mone_api_url') || '',
  whatsappNumber: localStorage.getItem('mone_whatsapp') || ''
};

const CONFIG = {
  apiUrl: state.apiUrl,
  whatsappNumber: state.whatsappNumber
};

const ICONS = {
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><path d="M5 17h4M5 12h14M5 7h10"/><path d="M17 18l2-2 2 2"/><path d="M19 16v4"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M12 22V12"/><path d="M3.3 7L12 12l8.7-5"/></svg>',
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><path d="M12 22c4 0 7-3 7-7 0-4-3-9-7-11-4 2-7 7-7 11 0 4 3 7 7 7z"/><path d="M12 17c1.5 0 3-1.5 3-3 0-2-1.5-4-3-5-1.5 1-3 3-3 5 0 1.5 1.5 3 3 3z"/></svg>',
  beer: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M5 7v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V7"/><path d="M5 7h10"/></svg>'
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
  orderNotes: $('orderNotes'),
  configApiUrl: $('configApiUrl'),
  configWhatsApp: $('configWhatsApp'),
  saveConfigApi: $('saveConfigApi'),
  saveConfigWhatsApp: $('saveConfigWhatsApp'),
  testBackendBtn: $('testBackendBtn'),
  backendStatus: $('backendStatus'),
  simInput: $('simInput'),
  simSendBtn: $('simSendBtn'),
  simResult: $('simResult')
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
        <img src="assets/icons/logo.jpeg" alt="M" />
      </div>
      <div class="message-content">${text}</div>`;
  } else {
    div.innerHTML = `<div class="message-content">${text}</div>`;
  }
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

function addMessageWithButtons(text, buttons, headerText, footerText) {
  const div = document.createElement('div');
  div.className = 'message mone';
  let html = `
    <div class="message-avatar">
      <img src="assets/icons/logo.jpeg" alt="M" />
    </div>
    <div class="message-content">
      ${headerText ? `<strong>${headerText}</strong><br>` : ''}
      <p>${text}</p>
      ${footerText ? `<small style="color:var(--gray);font-size:11px;">${footerText}</small>` : ''}
      <div class="reply-buttons">`;
  buttons.forEach(btn => {
    html += `<button class="reply-btn" data-action="${btn.id}">${btn.title}</button>`;
  });
  html += `</div></div>`;
  div.innerHTML = html;
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;

  div.querySelectorAll('.reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleUserMessage(btn.dataset.action);
    });
  });
  return div;
}

function addMessageWithList(text, listTitle, buttonLabel, rows) {
  const div = document.createElement('div');
  div.className = 'message mone';
  let html = `
    <div class="message-avatar">
      <img src="assets/icons/logo.jpeg" alt="M" />
    </div>
    <div class="message-content">
      ${listTitle ? `<strong>${listTitle}</strong><br>` : ''}
      <p>${text}</p>
      <div class="list-message">
        <button class="list-toggle-btn">${buttonLabel || 'Ver opcoes'}</button>
        <div class="list-options hidden">
          <div class="list-options-header">${listTitle || 'Opcoes'}</div>`;
  rows.forEach(row => {
    html += `<button class="list-option" data-action="${row.id}">
      <span class="list-option-title">${row.title}</span>
      ${row.description ? `<span class="list-option-desc">${row.description}</span>` : ''}
    </button>`;
  });
  html += `</div></div></div>`;
  div.innerHTML = html;
  dom.chatMessages.appendChild(div);
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;

  const toggleBtn = div.querySelector('.list-toggle-btn');
  const options = div.querySelector('.list-options');
  toggleBtn.addEventListener('click', () => {
    options.classList.toggle('hidden');
  });

  div.querySelectorAll('.list-option').forEach(btn => {
    btn.addEventListener('click', () => {
      options.classList.add('hidden');
      handleUserMessage(btn.dataset.action);
    });
  });
  return div;
}

function addProductMessage(product) {
  const div = document.createElement('div');
  div.className = 'message mone';
  div.innerHTML = `
    <div class="message-avatar">
      <img src="assets/icons/logo.jpeg" alt="M" />
    </div>
    <div class="message-content">
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-img">${getProductIcon(product.category)}</div>
        <div class="product-card-info">
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-desc">${product.description}</div>
          <div class="product-card-price">R$ ${product.price.toFixed(2)}</div>
          <button class="product-card-btn add-to-cart" data-id="${product.id}">Adicionar</button>
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
      <img src="assets/icons/logo.jpeg" alt="M" />
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
      <img src="assets/icons/logo.jpeg" alt="M" />
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
  'obrigado': 'Por nada! Se precisar de mais algo, e so chamar.',
  'obrigada': 'Por nada! Se precisar de mais algo, e so chamar.',
  'quero falar com alguem': 'Vou transferir para um atendente. Um momento, por favor.',
  'atendente': 'Vou transferir para um atendente. Um momento, por favor.',
  'humano': 'Vou transferir para um atendente. Um momento, por favor.',
  'reclamacao': 'Vou encaminhar sua reclamacao para nossa equipe. Pedimos desculpas pelo inconveniente.',
  'cancelar': 'Vou te transferir para um atendente para tratar sobre o cancelamento.',
  'problema': 'Vou encaminhar para nossa equipe de suporte. Eles vao te ajudar rapidamente.'
};

function handleInteractiveAction(action) {
  const q = action.toLowerCase().trim();

  if (q === 'menu' || q === 'inicio' || q === 'comecar') {
    sendWelcomeInteractive();
    return true;
  }
  if (q === 'cardapio' || q === 'produtos' || q === 'catalogo') {
    sendCategoryListInteractive();
    return true;
  }
  if (q === 'promocoes' || q === 'promocao' || q === 'ofertas') {
    sendPromotionsInteractive();
    return true;
  }
  if (q === 'horario' || q === 'endereco' || q === 'info') {
    addMessage(ICONS.map + STORE_INFO.address + '\n\n' + ICONS.clock + STORE_INFO.hours + '\n\n' + ICONS.phone + STORE_INFO.phone + '\n\n' + ICONS.card + ' Aceitamos: ' + STORE_INFO.paymentMethods);
    return true;
  }
  if (q === 'delivery' || q === 'entrega' || q === 'taxa') {
    addMessage(ICONS.truck + ' Taxa de entrega: R$ ' + STORE_INFO.deliveryFee.toFixed(2) + '\n' + ICONS.box + ' Pedido minimo: R$ ' + STORE_INFO.minOrder.toFixed(2) + '\n' + ICONS.timer + ' Tempo medio: ' + STORE_INFO.avgTime + '\n' + ICONS.map + ' Bairros: ' + STORE_INFO.neighborhoods.join(', '));
    addMessageWithButtons('Quer voltar ao menu?', [
      { id: 'menu', title: 'Voltar ao menu' },
      { id: 'comprar', title: 'Fazer pedido' }
    ]);
    return true;
  }
  if (q === 'comprar' || q === 'add_carrinho') {
    if (state.cart.length === 0) {
      addMessage('Seu carrinho esta vazio. Navegue pelos produtos e adicione itens!');
      sendCategoryListInteractive();
    } else {
      switchView('order');
      renderOrder();
    }
    return true;
  }
  if (q === 'falar_atendente' || q === 'falare_atendente' || q === 'humano' || q === 'atendente') {
    addMessage('Vou transferir para um atendente humano. Um momento, por favor.');
    return true;
  }
  if (q.startsWith('cat_')) {
    const category = q.replace('cat_', '');
    const products = getProductsByCategory(category);
    if (products.length) {
      addMessage('Categoria: ' + getCategoryLabel(category));
      sendProductsListInteractive(products);
    }
    return true;
  }
  if (q.startsWith('prod_')) {
    const id = q.replace('prod_', '');
    const product = getProductById(id);
    if (product) {
      addProductMessage(product);
      addMessageWithButtons('Quer adicionar ao carrinho?', [
        { id: 'add_' + id, title: 'Adicionar' },
        { id: 'cat_' + product.category, title: 'Ver mais' },
        { id: 'menu', title: 'Menu' }
      ]);
    }
    return true;
  }
  if (q.startsWith('add_')) {
    const id = q.replace('add_', '');
    const product = getProductById(id);
    if (product) {
      addToCart(id);
      addMessage(product.name + ' adicionado ao carrinho!');
    }
    return true;
  }
  return false;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function sendWelcomeInteractive() {
  addMessageWithButtons(
    getGreeting() + '! Seja muito bem-vindo a Money Adega & Tabacaria.\n\nComo posso ajudar hoje?',
    [
      { id: 'cardapio', title: 'Cardapio' },
      { id: 'promocoes', title: 'Promocoes' },
      { id: 'falar_atendente', title: 'Falar com atendente' }
    ],
    'MONEY - Money Adega & Tabacaria',
    'Seu role comeca aqui.'
  );
}

function sendCategoryListInteractive() {
  const rowActions = [
    { id: 'cat_whisky', title: 'Whisky' },
    { id: 'cat_vodka', title: 'Vodka' },
    { id: 'cat_gin', title: 'Gin' },
    { id: 'cat_cerveja', title: 'Cervejas' },
    { id: 'cat_energetico', title: 'Energeticos' },
    { id: 'cat_vinho', title: 'Vinhos' },
    { id: 'cat_espumante', title: 'Espumantes' },
    { id: 'cat_narguile', title: 'Narguile' },
    { id: 'cat_ervas', title: 'Ervas' },
    { id: 'cat_terere', title: 'Kits Terere' },
    { id: 'cat_copos', title: 'Copos Termicos' },
    { id: 'cat_garrafas', title: 'Garrafas Termicas' },
    { id: 'cat_gelo', title: 'Gelo Saborizado' },
    { id: 'cat_maromba', title: 'Mansao Maromba' },
    { id: 'cat_pods', title: 'Pods' },
    { id: 'cat_tabacaria', title: 'Tabacaria' },
    { id: 'cat_acessorios', title: 'Acessorios' }
  ];
  addMessageWithList(
    'Escolha uma categoria para ver nossos produtos:',
    'Nosso Cardapio',
    'Ver cardapio',
    rowActions
  );
}

function sendProductsListInteractive(products) {
  const rows = products.map(p => ({
    id: 'prod_' + p.id,
    title: p.name,
    description: 'R$ ' + p.price.toFixed(2)
  }));
  addMessageWithList(
    'Produtos disponiveis:',
    null,
    'Ver produtos',
    rows
  );
}

function sendPromotionsInteractive() {
  addMessage('Confira nossas promocoes especiais!\n\n' + ICONS.fire + ' Whisky acima de R$ 150: leve gelo com desconto\n' + ICONS.beer + ' Heineken: leve 6 e pague 5');
  addMessageWithButtons(
    'Quer ver o cardapio completo?',
    [
      { id: 'cardapio', title: 'Cardapio' },
      { id: 'menu', title: 'Voltar ao menu' }
    ]
  );
}

function getCategoryLabel(category) {
  const labels = {
    whisky: 'Whisky', vodka: 'Vodka', gin: 'Gin',
    cerveja: 'Cervejas', energetico: 'Energeticos',
    vinho: 'Vinhos', espumante: 'Espumantes',
    narguile: 'Narguile', ervas: 'Ervas de Tereré',
    terere: 'Kits Tereré', copos: 'Copos Termicos',
    garrafas: 'Garrafas Termicas', gelo: 'Gelo Saborizado',
    maromba: 'Mansao Maromba', pods: 'Pods Descartaveis',
    tabacaria: 'Tabacaria', acessorios: 'Acessorios'
  };
  return labels[category] || category;
}

function normalize(text) {
  return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getMoneyResponse(input) {
  const q = normalize(input);

  if (handleInteractiveAction(q)) return null;

  for (const [key, response] of Object.entries(RESPONSES)) {
    if (q.includes(key) || q === key) {
      return response;
    }
  }

  if (/^(oi|oie|oii|hey|e a[íi]|falou|fala|ola|bom dia|boa tarde|boa noite)/.test(q)) {
    sendWelcomeInteractive();
    return null;
  }

  if (/horario|funcionamento|abre|aberto|abrir|fecha|fechado/.test(q)) {
    return 'Nosso horario:\n\n' + STORE_INFO.hours + '\n\nEsta aberto agora!';
  }

  if (/localizacao|endereco|onde fica|fica|mapa|rua|bairro/.test(q)) {
    return 'Estamos na:\n\n' + STORE_INFO.address + '\n\nTe esperamos!';
  }

  if (/whatsapp|whats|telefone|celular|contato|ligar|falar/.test(q)) {
    return 'Nosso WhatsApp:\n\n' + STORE_INFO.phone;
  }

  if (/instagram|insta|rede social/.test(q)) {
    return 'Nos siga: ' + STORE_INFO.instagram;
  }

  if (/pagamento|pagar|pix|dinheiro|credito|debito|cartao|forma de pagamento/.test(q)) {
    return 'Aceitamos:\n\n' + STORE_INFO.paymentMethods;
  }

  if (/delivery|entrega|taxa|frete|bairro|entreg|receber/.test(q)) {
    return ICONS.truck + ' Taxa: R$ ' + STORE_INFO.deliveryFee.toFixed(2) + '\n' + ICONS.box + ' Minimo: R$ ' + STORE_INFO.minOrder.toFixed(2) + '\n' + ICONS.timer + ' Tempo: ' + STORE_INFO.avgTime + '\n' + ICONS.map + ' Bairros: ' + STORE_INFO.neighborhoods.join(', ');
  }

  if (/promocao|promo|oferta|desconto|barato|queima/.test(q)) {
    sendPromotionsInteractive();
    return null;
  }

  const searchResults = searchProducts(q);
  if (searchResults.length === 1) {
    addProductMessage(searchResults[0]);
    return null;
  } else if (searchResults.length > 1) {
    sendProductsListInteractive(searchResults);
    return null;
  }

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

  if (/maromba|drink/.test(q)) {
    const products = getProductsByCategory('maromba');
    if (products.length) {
      sendProductsListInteractive(products);
    }
    return null;
  }

  if (/combo|kit|pack/.test(q)) {
    const products = [...getProductsByCategory('cerveja'), ...getProductsByCategory('whisky'), ...getProductsByCategory('energetico')].slice(0, 4);
    addProductsCarousel(products, 'Monte seu combo com esses produtos:');
    return 'Escolha os itens e monte seu combo personalizado!';
  }

  if (/transferir|atendente|humano|falar com alguem/.test(q)) {
    return 'Vou transferir para um atendente. Enquanto isso, voce pode falar conosco pelo WhatsApp: ' + STORE_INFO.phone;
  }

  return 'Obrigado pela mensagem! Se tiver duvidas sobre produtos, precos, ou quiser fazer um pedido, e so me falar. Posso te ajudar com whisky, vodka, gin, energéticos e muito mais!';
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
    const response = getMoneyResponse(text);
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
      <div class="product-item-info">
        <div class="product-item-name">${p.name}</div>
        <div class="product-item-desc">${p.description}</div>
        <div class="product-item-price">R$ ${p.price.toFixed(2)}</div>
      </div>
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
// CONFIG
// ============================================

dom.configApiUrl.value = localStorage.getItem('mone_api_url') || '';
dom.configWhatsApp.value = localStorage.getItem('mone_whatsapp') || '';

dom.saveConfigApi.addEventListener('click', () => {
  const url = dom.configApiUrl.value.trim();
  localStorage.setItem('mone_api_url', url);
  state.apiUrl = url;
  CONFIG.apiUrl = url;
  showToast('URL da API salva!');
});

dom.saveConfigWhatsApp.addEventListener('click', () => {
  const num = dom.configWhatsApp.value.trim();
  localStorage.setItem('mone_whatsapp', num);
  state.whatsappNumber = num;
  CONFIG.whatsappNumber = num;
  showToast('Numero salvo!');
});

dom.testBackendBtn.addEventListener('click', async () => {
  const url = dom.configApiUrl.value.trim();
  if (!url) {
    dom.backendStatus.textContent = 'Configure a URL primeiro';
    dom.backendStatus.style.color = 'var(--danger)';
    return;
  }
  dom.backendStatus.textContent = 'Testando...';
  dom.backendStatus.style.color = 'var(--gray)';
  try {
    const res = await fetch(url + '/');
    const data = await res.json();
    if (data.status === 'running') {
      const mode = data.mode ? ` (${data.mode})` : '';
      dom.backendStatus.textContent = 'Backend online!' + mode;
      dom.backendStatus.style.color = 'var(--success)';
    } else {
      dom.backendStatus.textContent = 'Backend respondeu, mas status inesperado';
      dom.backendStatus.style.color = 'var(--gold)';
    }
  } catch (err) {
    dom.backendStatus.textContent = 'Erro de conexao: ' + err.message;
    dom.backendStatus.style.color = 'var(--danger)';
  }
});

dom.simInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') dom.simSendBtn.click(); });

dom.simSendBtn.addEventListener('click', async () => {
  const url = dom.configApiUrl.value.trim();
  const text = dom.simInput.value.trim();
  if (!url) {
    dom.simResult.textContent = 'Configure a URL do backend primeiro';
    return;
  }
  if (!text) {
    dom.simResult.textContent = 'Digite uma mensagem (ex: ola, cardapio, whisky)';
    return;
  }
  dom.simResult.textContent = 'Enviando...';
  dom.simResult.style.color = 'var(--gray)';
  try {
    const res = await fetch(url + '/api/test/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    if (data.success) {
      dom.simResult.textContent = 'Mensagem processada pelo backend. Verifique o console do servidor para ver as respostas mockadas.';
      dom.simResult.style.color = 'var(--success)';
    } else {
      dom.simResult.textContent = 'Erro: ' + (data.error || 'resposta inesperada');
      dom.simResult.style.color = 'var(--danger)';
    }
  } catch (err) {
    dom.simResult.textContent = 'Erro de conexao: ' + err.message;
    dom.simResult.style.color = 'var(--danger)';
  }
});

// ============================================
// INIT
// ============================================

function init() {
  renderCategories();
  renderProducts();
  renderOrder();
  updateCartBadge();
  if (state.apiUrl) {
    dom.backendStatus.textContent = 'Configurado';
    dom.backendStatus.style.color = 'var(--success)';
  }
}

init();
