const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_VERSION = 'v22.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json'
  };
}

function getBusinessAccountId() {
  return process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
}

router.get('/products', async (req, res) => {
  try {
    const url = `${BASE_URL}/${getBusinessAccountId()}/products`;
    const { data } = await axios.get(url, { headers: getHeaders() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const url = `${BASE_URL}/${getBusinessAccountId()}/products`;
    const { data } = await axios.post(url, req.body, { headers: getHeaders() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/collections', async (req, res) => {
  try {
    const url = `${BASE_URL}/${getBusinessAccountId()}/collections`;
    const { data } = await axios.get(url, { headers: getHeaders() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/collections', async (req, res) => {
  try {
    const url = `${BASE_URL}/${getBusinessAccountId()}/collections`;
    const { data } = await axios.post(url, req.body, { headers: getHeaders() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/message-templates', async (req, res) => {
  try {
    const url = `${BASE_URL}/${getBusinessAccountId()}/message_templates`;
    const { data } = await axios.get(url, { headers: getHeaders() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/message-templates', async (req, res) => {
  try {
    const url = `${BASE_URL}/${getBusinessAccountId()}/message_templates`;
    const { data } = await axios.post(url, req.body, { headers: getHeaders() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
