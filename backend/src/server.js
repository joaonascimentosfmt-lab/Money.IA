const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const webhookRouter = require('./webhook');
const messagesRouter = require('./routes/messages');
const catalogRouter = require('./routes/catalog');
const testRouter = require('./routes/test');

const app = express();
const PORT = process.env.PORT || 3000;

const IS_MOCK = !process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'MONE - WhatsApp Business Platform',
    version: '1.0.0',
    status: 'running',
    mode: IS_MOCK ? 'simulacao' : 'producao'
  });
});

app.use('/webhook', webhookRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/catalog', catalogRouter);
if (IS_MOCK) {
  app.use('/api/test', testRouter);
  console.log('Modo simulacao ativado. Endpoints de teste disponiveis em /api/test');
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`MONE backend rodando na porta ${PORT}`);
});
