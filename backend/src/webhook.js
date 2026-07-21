const express = require('express');
const router = express.Router();
const { handleIncomingMessage } = require('./messages');

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('Webhook verificado com sucesso');
    return res.status(200).send(challenge);
  }

  console.warn('Falha na verificacao do webhook');
  return res.sendStatus(403);
});

router.post('/', async (req, res) => {
  try {
    const entry = req.body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (!value) {
      return res.sendStatus(200);
    }

    const messages = value.messages;
    const metadata = value.metadata;

    if (!messages || !metadata) {
      if (value.statuses) {
        console.log('Status update:', value.statuses[0]?.status);
      }
      return res.sendStatus(200);
    }

    for (const message of messages) {
      const sender = message.from;
      const waId = metadata.display_phone_number;

      console.log(`Mensagem recebida de ${sender}: ${JSON.stringify(message)}`);

      try {
        await handleIncomingMessage(sender, message);
      } catch (err) {
        console.error('Erro ao processar mensagem:', err.message);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.sendStatus(200);
  }
});

module.exports = router;
