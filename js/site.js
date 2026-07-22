(function() {

  var ICONS = {
    map: '<svg class="msg-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg class="msg-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    phone: '<svg class="msg-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    card: '<svg class="msg-icon" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>',
    truck: '<svg class="msg-icon" viewBox="0 0 24 24"><path d="M5 17h4M5 12h14M5 7h10"/><path d="M17 18l2-2 2 2"/><path d="M19 16v4"/></svg>',
    box: '<svg class="msg-icon" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M12 22V12"/><path d="M3.3 7L12 12l8.7-5"/></svg>',
    timer: '<svg class="msg-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    fire: '<svg class="msg-icon" viewBox="0 0 24 24"><path d="M12 22c4 0 7-3 7-7 0-4-3-9-7-11-4 2-7 7-7 11 0 4 3 7 7 7z"/><path d="M12 17c1.5 0 3-1.5 3-3 0-2-1.5-4-3-5-1.5 1-3 3-3 5 0 1.5 1.5 3 3 3z"/></svg>',
    beer: '<svg class="msg-icon" viewBox="0 0 24 24"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M5 7v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V7"/><path d="M5 7h10"/></svg>'
  };

  // ============ CART STATE ============
  var cart = [];

  function getCartTotal() {
    return cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  }

  function getCartCount() {
    return cart.reduce(function(s, i) { return s + i.qty; }, 0);
  }

  function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    var count = getCartCount();
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }

  function addToCart(productId) {
    var product = getProductById(productId);
    if (!product) return;
    var existing = cart.find(function(i) { return i.id === productId; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, category: product.category });
    }
    updateCartBadge();
    renderCartDrawer();
    showToast(product.name + ' adicionado ao carrinho!');
  }

  function removeFromCart(productId) {
    cart = cart.filter(function(i) { return i.id !== productId; });
    updateCartBadge();
    renderCartDrawer();
  }

  function updateQty(productId, delta) {
    var item = cart.find(function(i) { return i.id === productId; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
      return;
    }
    updateCartBadge();
    renderCartDrawer();
  }

  function renderCartDrawer() {
    var itemsEl = document.getElementById('cartItems');
    var footerEl = document.getElementById('cartFooter');
    var totalEl = document.getElementById('cartTotal');

    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
        '<p>Seu carrinho esta vazio</p><p class="sub">Navegue pelos produtos e adicione itens.</p></div>';
      footerEl.classList.add('hidden');
      return;
    }

    footerEl.classList.remove('hidden');
    var html = '';
    cart.forEach(function(item) {
      var prod = getProductById(item.id);
      var img = prod ? getProductDisplay(prod) : '';
      html += '<div class="cart-item">' +
        '<div class="cart-item-image">' + img + '</div>' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + item.name + '</div>' +
          '<div class="cart-item-price">R$ ' + item.price.toFixed(2) + '</div>' +
          '<div class="cart-item-qty">' +
            '<button class="cart-qty-btn" data-id="' + item.id + '" data-delta="-1">-</button>' +
            '<span>' + item.qty + '</span>' +
            '<button class="cart-qty-btn" data-id="' + item.id + '" data-delta="1">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="cart-item-remove" data-id="' + item.id + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
        '</button></div>';
    });
    itemsEl.innerHTML = html;
    totalEl.textContent = 'R$ ' + getCartTotal().toFixed(2);

    itemsEl.querySelectorAll('.cart-qty-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        updateQty(btn.dataset.id, parseInt(btn.dataset.delta));
      });
    });
    itemsEl.querySelectorAll('.cart-item-remove').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeFromCart(btn.dataset.id);
      });
    });
  }

  function sendOrderToWhatsApp() {
    if (cart.length === 0) return;
    var items = cart.map(function(i) {
      return i.name + ' x' + i.qty + ' - R$ ' + (i.price * i.qty).toFixed(2);
    }).join('\n');
    var total = getCartTotal().toFixed(2);
    var msg = 'NOVO PEDIDO\n\nItens:\n' + items + '\n\nTotal: R$ ' + total;
    var encoded = encodeURIComponent(msg);
    window.open('https://wa.me/5565992475643?text=' + encoded, '_blank');
    cart = [];
    updateCartBadge();
    renderCartDrawer();
    closeCartDrawer();
    showToast('Pedido enviado com sucesso!');
  }

  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'toast-msg';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 2200);
  }

  // ============ DOM REFS ============
  var $ = function(id) { return document.getElementById(id); };
  var chatToggle = $('chatToggle');
  var chatWidget = $('chatWidget');
  var chatClose = $('chatClose');
  var chatMessages = $('chatMessages');
  var chatInput = $('chatInput');
  var chatSendBtn = $('chatSendBtn');
  var menuToggle = $('menuToggle');
  var navMenu = $('navMenu');
  var cartToggle = $('cartToggle');
  var cartDrawer = $('cartDrawer');
  var cartOverlay = $('cartOverlay');
  var cartClose = $('cartClose');
  var cartCheckoutBtn = $('cartCheckoutBtn');
  var ageModal = $('ageModal');
  var ageYes = $('ageYes');
  var ageNo = $('ageNo');
  var searchToggle = $('searchToggle');
  var searchInput = $('searchInput');
  var headerSearch = $('headerSearch');
  var searchResults = $('searchResults');

  // ============ AGE VERIFICATION ============
  (function() {
    if (localStorage.getItem('mone_age_verified') === 'true') {
      ageModal.classList.add('hidden');
      return;
    }
    ageYes.addEventListener('click', function() {
      localStorage.setItem('mone_age_verified', 'true');
      ageModal.classList.add('hidden');
    });
    ageNo.addEventListener('click', function() {
      window.location.href = 'https://google.com';
    });
  })();

  // ============ ANNOUNCEMENT BAR ROTATION ============
  (function() {
    var slides = document.querySelectorAll('.announcement-slide');
    if (slides.length < 2) return;
    var current = 0;
    setInterval(function() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4000);
  })();

  // ============ CART EVENTS ============
  function openCartDrawer() {
    cartDrawer.classList.remove('hidden');
    cartOverlay.classList.remove('hidden');
    renderCartDrawer();
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer.classList.add('hidden');
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  cartToggle.addEventListener('click', openCartDrawer);
  cartClose.addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', closeCartDrawer);
  cartCheckoutBtn.addEventListener('click', sendOrderToWhatsApp);

  // ============ MENU ============
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('open');
    });
  });

  // ============ CHAT TOGGLE ============
  function openChat() {
    chatWidget.classList.add('open');
    chatToggle.classList.add('open');
    if (chatMessages.children.length === 0) {
      sendWelcome();
    }
  }

  function closeChat() {
    chatWidget.classList.remove('open');
    chatToggle.classList.remove('open');
  }

  chatToggle.addEventListener('click', openChat);
  chatClose.addEventListener('click', closeChat);

  $('heroChatBtn').addEventListener('click', function() {
    closeChat();
    setTimeout(openChat, 50);
  });

  // ============ CHAT RESPONSES ============
  var STORE = {
    address: 'Av. Senador Filinto Muller - Marajoara, Varzea Grande - MT, CEP 78138-000',
    hours: 'Seg a Sab: 11h as 22h | Dom: 10h as 22h',
    phone: '(65) 99247-5643',
    payment: 'PIX, Dinheiro, Cartao de Debito e Credito',
    delivery: 'Taxa: R$5,00 | Minimo: R$30,00 | Tempo: 45min',
    neighborhoods: ['Centro', 'CPA', 'Alicerce', 'Alvorada', 'Morada do Ouro', 'Quilombo', 'Santa Rosa']
  };

  function getGreeting() {
    var h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  function addChatMsg(text, type) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.innerHTML = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    if (document.getElementById('chatTyping')) return;
    var div = document.createElement('div');
    div.className = 'chat-msg money';
    div.id = 'chatTyping';
    div.innerHTML = '<span style="display:inline-flex;gap:4px;padding:4px 0"><span style="width:6px;height:6px;background:var(--gray);border-radius:50%;animation:blink 1.4s infinite"></span><span style="width:6px;height:6px;background:var(--gray);border-radius:50%;animation:blink 1.4s infinite;animation-delay:0.2s"></span><span style="width:6px;height:6px;background:var(--gray);border-radius:50%;animation:blink 1.4s infinite;animation-delay:0.4s"></span></span>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('chatTyping');
    if (el) el.remove();
  }

  function sendWelcome() {
    var msg = getGreeting() + '! Seja bem-vindo a <strong>Money Adega & Tabacaria</strong>.<br><br>Como posso ajudar? Pergunte sobre nossos produtos, precos, horarios ou delivery!';
    addChatMsg(msg, 'money');
  }

  function normalize(text) {
    return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function getMoneyResponse(input) {
    var q = normalize(input);

    if (/^(oi|oie|ola|hey|bom dia|boa tarde|boa noite|fala)/.test(q)) {
      sendWelcome();
      return null;
    }

    if (/carrinho|pedido|meu pedido/.test(q)) {
      if (cart.length === 0) {
        return 'Seu carrinho esta vazio. Navegue pelos produtos e adicione itens!';
      }
      openCartDrawer();
      return null;
    }

    if (/comprar|finalizar|checkout/.test(q)) {
      if (cart.length === 0) {
        return 'Seu carrinho esta vazio. Adicione produtos primeiro!';
      }
      sendOrderToWhatsApp();
      return null;
    }

    if (/horario|funcionamento|abre|aberto/.test(q)) {
      return ICONS.clock + ' <strong>Horario:</strong><br>' + STORE.hours;
    }

    if (/endereco|localizacao|onde fica|rua|bairro|mapa/.test(q)) {
      return ICONS.map + ' <strong>Endereco:</strong><br>' + STORE.address;
    }

    if (/whatsapp|telefone|contato|celular/.test(q)) {
      return ICONS.phone + ' <strong>WhatsApp:</strong><br>' + STORE.phone;
    }

    if (/pagamento|pix|dinheiro|credito|debito|cartao/.test(q)) {
      return ICONS.card + ' <strong>Formas de Pagamento:</strong><br>' + STORE.payment;
    }

    if (/delivery|entrega|taxa|frete|bairro/.test(q)) {
      return ICONS.truck + ' <strong>Delivery:</strong><br>' + STORE.delivery + '<br>' + ICONS.map + ' Bairros: ' + STORE.neighborhoods.join(', ');
    }

    if (/promocao|promo|oferta|desconto/.test(q)) {
      return ICONS.fire + ' Promocoes especiais!<br><br>' + ICONS.fire + ' Whisky acima de R$150: leve gelo com desconto<br>' + ICONS.beer + ' Heineken: leve 6 e pague 5';
    }

    if (/narguile|narg|essencia|carvao/.test(q)) {
      return getCategoryResponse('narguile');
    }

    if (/whisky|whiskey|jack|label|chivas|jameson|ballantines/.test(q)) {
      return getCategoryResponse('whisky');
    }

    if (/vodka|absolut|smirnoff|grey goose|ciroc/.test(q)) {
      return getCategoryResponse('vodka');
    }

    if (/gin|gordon|tanqueray|bombay|beefeater/.test(q)) {
      return getCategoryResponse('gin');
    }

    if (/terere|erva|mate/.test(q)) {
      return getCategoryResponse('ervas');
    }

    if (/bomba/.test(q)) {
      return getCategoryResponse('terere');
    }

    if (/garrafa|termica/.test(q)) {
      return getCategoryResponse('garrafas');
    }

    if (/copo/.test(q)) {
      return getCategoryResponse('copos');
    }

    if (/maromba|drink/.test(q)) {
      return getCategoryResponse('maromba');
    }

    if (/energetico|red bull|monster/.test(q)) {
      return getCategoryResponse('energetico');
    }

    if (/cerveja|balde|heineken|skol|brahma|amstel|corona/.test(q)) {
      return getCategoryResponse('cerveja');
    }

    if (/gelo/.test(q)) {
      return getCategoryResponse('gelo');
    }

    if (/catalogo|cardapio|produtos|mostrar|categoria/.test(q)) {
      var cats = CATEGORIES.filter(function(c) { return c.id !== 'all'; });
      var html = '<strong>Nosso Catalogo:</strong><br><br>';
      cats.forEach(function(c) {
        var count = getProductsByCategory(c.id).length;
        html += getProductIcon(c.id) + ' ' + c.label + ' (' + count + ')<br>';
      });
      html += '<br><small>Pergunte sobre uma categoria para ver os produtos!</small>';
      return html;
    }

    return 'Obrigado pela mensagem!<br><br>Posso te ajudar com:<br>' + ICONS.map + ' Endereco e horarios<br>' + ICONS.card + ' Formas de pagamento<br>' + ICONS.truck + ' Delivery<br>' + ICONS.fire + ' Promocoes<br><br>Ou pergunte sobre um produto especifico!';
  }

  function getCategoryResponse(category) {
    var products = getProductsByCategory(category);
    var label = getCategoryLabel(category);
    if (products.length === 0) return 'Desculpe, nao encontrei produtos nessa categoria.';
    var html = '<strong>' + label + ' disponiveis:</strong><br><br>';
    products.forEach(function(p) {
      html += getProductIcon(p.category) + ' <strong>' + p.name + '</strong> - R$ ' + p.price.toFixed(2) + '<br>';
    });
    return html;
  }

  function getCategoryLabel(category) {
    var found = CATEGORIES.find(function(c) { return c.id === category; });
    return found ? found.label : category;
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    addChatMsg(escapeHtml(text), 'user');
    chatInput.value = '';

    showTyping();
    setTimeout(function() {
      hideTyping();
      var response = getMoneyResponse(text);
      if (response) {
        addChatMsg(response, 'money');
      }
    }, 600 + Math.random() * 600);
  }

  function escapeHtml(text) {
    var d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  chatSendBtn.addEventListener('click', function() {
    handleUserMessage(chatInput.value);
  });

  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage(chatInput.value);
    }
  });

  // ============ SEARCH ============
  searchToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    headerSearch.classList.toggle('open');
    if (headerSearch.classList.contains('open')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      searchResults.classList.add('hidden');
    }
  });

  searchInput.addEventListener('input', function() {
    var q = searchInput.value.trim();
    if (q.length < 2) {
      searchResults.classList.add('hidden');
      return;
    }
    var results = searchProducts(q);
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">Nenhum produto encontrado</div>';
      searchResults.classList.remove('hidden');
      return;
    }
    var html = '';
    results.slice(0, 6).forEach(function(p) {
      html += '<div class="search-result-item" data-id="' + p.id + '">' +
        '<div class="search-result-image">' + getProductDisplay(p) + '</div>' +
        '<div class="search-result-info">' +
          '<div class="search-result-name">' + p.name + '</div>' +
          '<div class="search-result-category">' + getCategoryLabel(p.category) + '</div>' +
        '</div>' +
        '<div class="search-result-price">R$ ' + p.price.toFixed(2) + '</div>' +
      '</div>';
    });
    searchResults.innerHTML = html;
    searchResults.classList.remove('hidden');

    searchResults.querySelectorAll('.search-result-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var id = item.dataset.id;
        var prod = getProductById(id);
        if (prod) {
          closeChat();
          scrollToProducts(prod.category);
          searchInput.value = '';
          searchResults.classList.add('hidden');
          headerSearch.classList.remove('open');
        }
      });
    });
  });

  document.addEventListener('click', function(e) {
    if (!headerSearch.contains(e.target)) {
      headerSearch.classList.remove('open');
      searchResults.classList.add('hidden');
    }
  });

  // ============ RENDER CATEGORIES ============
  function renderCategories() {
    var grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';

    CATEGORIES.forEach(function(cat) {
      if (cat.id === 'all') return;
      var count = getProductsByCategory(cat.id).length;
      var div = document.createElement('div');
      div.className = 'category-card';
      div.innerHTML =
        '<div class="category-card-icon">' + getProductIcon(cat.id) + '</div>' +
        '<div class="category-card-name">' + cat.label + '</div>' +
        '<div class="category-card-count">' + count + ' produtos</div>';
      div.addEventListener('click', function() {
        scrollToProducts(cat.id);
      });
      grid.appendChild(div);
    });
  }

  // ============ RENDER FEATURED PRODUCTS ============
  function renderFeaturedProducts() {
    var grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    var featured = getAllProducts().slice(0, 12);

    featured.forEach(function(p) {
      grid.appendChild(createProductCard(p));
    });
  }

  function createProductCard(p) {
    var div = document.createElement('div');
    div.className = 'product-card';

    var badgeHtml = '';
    if (p.badge) {
      if (p.badge.type === 'off') {
        badgeHtml = '<div class="product-card-badge off">-' + p.badge.value + '%</div>';
      } else if (p.badge.type === 'top') {
        badgeHtml = '<div class="product-card-badge top">Mais Vendido</div>';
      }
    }

    var oldPriceHtml = '';
    if (p.oldPrice) {
      oldPriceHtml = '<div class="product-card-old-price">R$ ' + p.oldPrice.toFixed(2) + '</div>';
    }

    var pixPrice = (p.price * 0.95).toFixed(2);
    var installment = (p.price / 3).toFixed(2);

    div.innerHTML =
      '<div class="product-card-image-wrap">' +
        '<div class="product-card-image">' + getProductDisplay(p) + '</div>' +
        badgeHtml +
      '</div>' +
      '<div class="product-card-body">' +
        '<div class="product-card-name">' + p.name + '</div>' +
        '<div class="product-card-desc">' + p.description + '</div>' +
        oldPriceHtml +
        '<div class="product-card-price">R$ ' + p.price.toFixed(2) + '</div>' +
        '<div class="product-card-pix">R$ ' + pixPrice + ' no PIX</div>' +
        '<div class="product-card-install">3x de R$ ' + installment + ' sem juros</div>' +
        '<button class="product-card-add" data-id="' + p.id + '">Adicionar</button>' +
      '</div>';

    div.querySelector('.product-card-add').addEventListener('click', function(e) {
      e.stopPropagation();
      addToCart(p.id);
    });

    return div;
  }

  // ============ RENDER BRANDS ============
  function renderBrands() {
    var grid = document.getElementById('brandsGrid');
    if (!grid) return;
    var brands = [
      { name: 'Jack Daniels', icon: 'whisky' },
      { name: 'Johnnie Walker', icon: 'whisky' },
      { name: 'Heineken', icon: 'cerveja' },
      { name: 'Absolut', icon: 'vodka' },
      { name: 'Red Bull', icon: 'energetico' },
      { name: 'Tanqueray', icon: 'gin' },
      { name: 'Corona', icon: 'cerveja' },
      { name: 'Mansao Maromba', icon: 'maromba' }
    ];
    grid.innerHTML = '';
    brands.forEach(function(b) {
      var div = document.createElement('div');
      div.className = 'brand-item';
      div.innerHTML = getProductIcon(b.icon) + '<span class="brand-item-name">' + b.name + '</span>';
      grid.appendChild(div);
    });
  }

  function scrollToProducts(categoryId) {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    if (categoryId) {
      var products = getProductsByCategory(categoryId);
      var grid = document.getElementById('productsGrid');
      var title = document.querySelector('#produtos .section-title');
      if (products.length > 0) {
        grid.innerHTML = '';
        products.forEach(function(p) {
          grid.appendChild(createProductCard(p));
        });
        if (title) title.textContent = getCategoryLabel(categoryId);
      }
    }
  }

  // ============ INIT ============
  renderCategories();
  renderFeaturedProducts();
  renderBrands();
  updateCartBadge();

})();
