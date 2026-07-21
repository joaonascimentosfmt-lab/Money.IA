const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const webhookRouter = require('./webhook');
const messagesRouter = require('./routes/messages');
const catalogRouter = require('./routes/catalog');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'MONE - WhatsApp Business Platform',
    version: '1.0.0',
    status: 'running'
  });
});

app.use('/webhook', webhookRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/catalog', catalogRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`MONE backend rodando na porta ${PORT}`);
});
