const express = require('express');
const router = express.Router();
const whatsapp = require('../whatsapp');
const { getProductById, searchProducts } = require('../products-data');
const { getStoreInfo } = require('../store-info');

router.post('/send-text', async (req, res) => {
  try {
    const { to, text } = req.body;
    const result = await whatsapp.sendText(to, text);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-product', async (req, res) => {
  try {
    const { to, productId } = req.body;
    const product = getProductById(productId);
    if (!product) return res.status(404).json({ error: 'Produto nao encontrado' });

    const message = `*${product.name}*\n\n${product.description}\n💰 Preco: R$ ${product.price.toFixed(2)}\n📦 Volume: ${product.volume}\n🏷️ Marca: ${product.brand}`;
    const result = await whatsapp.sendText(to, message);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-buttons', async (req, res) => {
  try {
    const { to, header, body, footer, buttons } = req.body;
    const result = await whatsapp.sendInteractiveButtons(to, header, body, footer, buttons);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-list', async (req, res) => {
  try {
    const { to, header, body, footer, buttonText, sections } = req.body;
    const result = await whatsapp.sendListMessage(to, header, body, footer, buttonText, sections);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-image', async (req, res) => {
  try {
    const { to, imageUrl, caption } = req.body;
    const result = await whatsapp.sendImage(to, imageUrl, caption);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-template', async (req, res) => {
  try {
    const { to, templateName, language, components } = req.body;
    const result = await whatsapp.sendTemplate(to, templateName, language, components);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-catalog', async (req, res) => {
  try {
    const { to, catalogId, body, footer } = req.body;
    const result = await whatsapp.sendProductCatalog(to, catalogId, body, footer);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/store-info', (req, res) => {
  res.json(getStoreInfo());
});

router.get('/products', (req, res) => {
  const { query } = req.query;
  if (query) return res.json(searchProducts(query));
  const { getProductsByCategory } = require('../products-data');
  res.json({ products: require('../products-data').PRODUCTS });
});

module.exports = router;
