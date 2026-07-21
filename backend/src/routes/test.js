const express = require('express');
const router = express.Router();
const { handleIncomingMessage } = require('../messages');

let messageLog = [];
let lastResponses = [];

router.post('/message', async (req, res) => {
  try {
    const { text, sender } = req.body;
    const to = sender || '5511999999999_simulado';

    const simulatedMessage = {
      from: to,
      id: `sim_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000),
      type: 'text',
      text: { body: text || '' }
    };

    lastResponses = [];

    await handleIncomingMessage(to, simulatedMessage);

    messageLog.push({
      timestamp: new Date().toISOString(),
      from: to,
      text: text
    });

    res.json({
      success: true,
      simulated: true,
      from: to,
      text: text,
      log: messageLog.slice(-5)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/messages', (req, res) => {
  res.json({ messages: messageLog.slice(-50) });
});

module.exports = router;
