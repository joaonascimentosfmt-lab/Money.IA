const whatsapp = require('./whatsapp');
const { getProductById, searchProducts, getProductsByCategory } = require('./products-data');
const { getStoreInfo } = require('./store-info');

function normalizeText(text) {
  return text.toLowerCase().trim()
    .replace(/[áàâãä]/g, 'a').replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i').replace(/[óòôõö]/g, 'o')
    .replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s]/g, '');
}

async function handleIncomingMessage(sender, message) {
  const msgType = message.type;
  let text = '';

  if (msgType === 'text') {
    text = message.text.body;
  } else if (msgType === 'interactive') {
    const interactive = message.interactive;
    if (interactive.type === 'button_reply') {
      text = interactive.button_reply.id;
    } else if (interactive.type === 'list_reply') {
      text = interactive.list_reply.id;
    }
  }

  const response = await buildResponse(sender, text);
  return response;
}

async function buildResponse(sender, input) {
  const q = normalizeText(input);

  if (!q) {
    return sendWelcomeMessage(sender);
  }

  if (q === 'menu' || q === 'inicio' || q === 'comecar') {
    return sendWelcomeMessage(sender);
  }

  if (q === 'ver_cardapio' || q === 'produtos' || q === 'catalogo') {
    return sendCategoryList(sender);
  }

  if (q.startsWith('cat_')) {
    const category = q.replace('cat_', '');
    return sendProductsByCategory(sender, category);
  }

  if (q.startsWith('prod_')) {
    const productId = q.replace('prod_', '');
    return sendProductDetail(sender, productId);
  }

  if (q === 'add_carrinho' || q === 'comprar') {
    return sendCartPrompt(sender);
  }

  if (q === 'falar_atendente' || q === 'humano' || q === 'atendente') {
    return transferToHuman(sender);
  }

  if (q === 'promocoes' || q === 'promocao' || q === 'ofertas') {
    return sendPromotions(sender);
  }

  if (q === 'horario' || q === 'endereco' || q === 'localizacao' || q === 'info') {
    return sendStoreInfo(sender);
  }

  if (q === 'pagamento' || q === 'formas_pagamento') {
    return sendPaymentInfo(sender);
  }

  if (q === 'delivery' || q === 'entrega' || q === 'taxa') {
    return sendDeliveryInfo(sender);
  }

  if (q === 'instagram' || q === 'rede_social') {
    return sendSocialInfo(sender);
  }

  const searchResults = searchProducts(q);
  if (searchResults.length > 0) {
    return sendProductSearchResults(sender, searchResults, q);
  }

  return sendDefaultResponse(sender);
}

async function sendWelcomeMessage(to) {
  await whatsapp.sendInteractiveButtons(
    to,
    'MONE - Money Adega & Tabacaria',
    'Ola! Eu sou a Mone, sua assistente virtual.\n\nComo posso ajudar hoje?',
    'Seu role comeca aqui.',
    [
      { id: 'ver_cardapio', title: 'Ver cardapio' },
      { id: 'promocoes', title: 'Promocoes' },
      { id: 'falare_atendente', title: 'Falar com atendente' }
    ]
  );
}

async function sendCategoryList(to) {
  const categories = [
    { id: 'cat_whisky', title: 'Whiskies' },
    { id: 'cat_vodka', title: 'Vodkas' },
    { id: 'cat_gin', title: 'Gins' },
    { id: 'cat_cerveja', title: 'Cervejas' },
    { id: 'cat_vinho', title: 'Vinhos' },
    { id: 'cat_espumante', title: 'Espumantes' },
    { id: 'cat_pods', title: 'Pods e Vapes' },
    { id: 'cat_energetico', title: 'Energeticos' },
    { id: 'cat_tabacaria', title: 'Tabacaria' },
    { id: 'cat_acessorios', title: 'Acessorios' }
  ];

  await whatsapp.sendListMessage(
    to,
    'Nosso Cardapio',
    'Escolha uma categoria para ver nossos produtos:',
    'Temos o que voce precisa!',
    'Ver categorias',
    [{
      title: 'Categorias',
      rows: categories.map(c => ({
        id: c.id,
        title: c.title
      }))
    }]
  );
}

async function sendProductsByCategory(to, category) {
  const products = getProductsByCategory(category);
  if (!products.length) {
    await whatsapp.sendText(to, 'Nao encontrei produtos nessa categoria.');
    return sendCategoryList(to);
  }

  const maxPerMessage = 9;
  const chunks = [];
  for (let i = 0; i < products.length; i += maxPerMessage) {
    chunks.push(products.slice(i, i + maxPerMessage));
  }

  for (const chunk of chunks) {
    const rows = chunk.map(p => ({
      id: `prod_${p.id}`,
      title: `${p.name}`,
      description: `R$ ${p.price.toFixed(2)}`
    }));

    if (chunk === chunks[0]) {
      await whatsapp.sendListMessage(
        to,
        null,
        `Encontrei ${products.length} produtos em ${getCategoryLabel(category)}:`,
        'Clique para ver detalhes',
        'Ver produtos',
        [{ title: getCategoryLabel(category), rows }]
      );
    } else {
      await whatsapp.sendListMessage(
        to,
        null,
        'Mais opcoes:',
        null,
        'Ver mais',
        [{ title: getCategoryLabel(category), rows }]
      );
    }
  }

  await whatsapp.sendInteractiveButtons(
    to,
    null,
    'Quer voltar ao menu ou falar com um atendente?',
    null,
    [
      { id: 'menu', title: 'Voltar ao menu' },
      { id: 'comprar', title: 'Meu carrinho' },
      { id: 'falare_atendente', title: 'Falar com atendente' }
    ]
  );
}

async function sendProductDetail(to, productId) {
  const product = getProductById(productId);
  if (!product) {
    return whatsapp.sendText(to, 'Produto nao encontrado.');
  }

  const message = `${product.name}\n\n${product.description}\n\n💰 Preco: R$ ${product.price.toFixed(2)}\n📦 Volume: ${product.volume}\n🏷️ Marca: ${product.brand}`;

  await whatsapp.sendInteractiveButtons(
    to,
    product.name,
    message,
    'Posso ajudar com mais alguma coisa?',
    [
      { id: `add_${product.id}`, title: 'Adicionar ao pedido' },
      { id: `cat_${product.category}`, title: 'Ver mais da categoria' },
      { id: 'menu', title: 'Voltar ao menu' }
    ]
  );
}

async function sendProductSearchResults(to, products, query) {
  const rows = products.slice(0, 9).map(p => ({
    id: `prod_${p.id}`,
    title: p.name,
    description: `R$ ${p.price.toFixed(2)}`
  }));

  await whatsapp.sendListMessage(
    to,
    'Resultados da busca',
    `Encontrei ${products.length} produto(s) para "${query}":`,
    null,
    'Ver resultados',
    [{ title: 'Produtos encontrados', rows }]
  );
}

async function sendPromotions(to) {
  await whatsapp.sendImageHeaderButtons(
    to,
    'https://via.placeholder.com/600x300/d4af37/0a0a0a?text=Promocoes',
    'Confira nossas promocoes especiais!\n\n🔥 Whisky acima de R$ 150: leve gelo com desconto\n🍺 Heineken: leve 6 e pague 5\n💨 Pods Ignite com 10% off',
    'Promocoes validas enquanto durarem os estoques.',
    [
      { id: 'ver_cardapio', title: 'Ver cardapio' },
      { id: 'menu', title: 'Voltar ao menu' }
    ]
  );
}

async function sendStoreInfo(to) {
  const info = getStoreInfo();
  await whatsapp.sendText(to,
    `📍 ${info.address}\n\n🕐 ${info.hours}\n\n📞 ${info.phone}\n\n📷 ${info.instagram}\n\n💳 Aceitamos: ${info.paymentMethods}`
  );
}

async function sendPaymentInfo(to) {
  await whatsapp.sendInteractiveButtons(
    to,
    'Formas de Pagamento',
    'Aceitamos:\n\n💳 Cartao de Credito\n💳 Cartao de Debito\n📱 PIX\n💰 Dinheiro',
    'Pagamento na entrega ou antecipado via PIX.',
    [
      { id: 'delivery', title: 'Saber sobre delivery' },
      { id: 'menu', title: 'Voltar ao menu' }
    ]
  );
}

async function sendDeliveryInfo(to) {
  const info = getStoreInfo();
  await whatsapp.sendInteractiveButtons(
    to,
    'Delivery',
    `🚚 Taxa de entrega: R$ ${info.deliveryFee.toFixed(2)}\n📦 Pedido minimo: R$ ${info.minOrder.toFixed(2)}\n⏱️ Tempo medio: ${info.avgTime}\n📍 Bairros atendidos: ${info.neighborhoods.join(', ')}`,
    null,
    [
      { id: 'menu', title: 'Voltar ao menu' },
      { id: 'comprar', title: 'Fazer pedido' }
    ]
  );
}

async function sendSocialInfo(to) {
  await whatsapp.sendInteractiveButtons(
    to,
    'Redes Sociais',
    `Nos siga no Instagram!\n\n📷 ${getStoreInfo().instagram}\n\nLá postamos novidades, promocoes e muito mais.`,
    null,
    [{ id: 'menu', title: 'Voltar ao menu' }]
  );
}

async function sendCartPrompt(to) {
  await whatsapp.sendInteractiveButtons(
    to,
    'Carrinho de Compras',
    'Para montar seu pedido, escolha os produtos no cardapio e os adicionaremos ao carrinho.\n\nNo final, enviamos tudo para seu WhatsApp de confirmacao.',
    null,
    [
      { id: 'ver_cardapio', title: 'Ver cardapio' },
      { id: 'menu', title: 'Voltar ao menu' },
      { id: 'falare_atendente', title: 'Falar com atendente' }
    ]
  );
}

async function transferToHuman(to) {
  await whatsapp.sendText(to,
    'Vou transferir para um atendente humano.\n\nAguarde um momento que alguem da nossa equipe vai te atender.'
  );
}

async function sendDefaultResponse(to) {
  await whatsapp.sendInteractiveButtons(
    to,
    'Nao entendi',
    'Desculpe, nao entendi. Como posso ajudar?',
    null,
    [
      { id: 'ver_cardapio', title: 'Ver cardapio' },
      { id: 'menu', title: 'Menu inicial' },
      { id: 'falare_atendente', title: 'Falar com atendente' }
    ]
  );
}

function getCategoryLabel(category) {
  const labels = {
    whisky: 'Whiskies', vodka: 'Vodkas', gin: 'Gins',
    cerveja: 'Cervejas', vinho: 'Vinhos', espumante: 'Espumantes',
    pods: 'Pods e Vapes', energetico: 'Energeticos',
    tabacaria: 'Tabacaria', acessorios: 'Acessorios'
  };
  return labels[category] || category;
}

module.exports = { handleIncomingMessage };
