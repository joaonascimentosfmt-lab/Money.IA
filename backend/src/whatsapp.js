const axios = require('axios');

const API_VERSION = 'v22.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json'
  };
}

function getPhoneNumberId() {
  return process.env.WHATSAPP_PHONE_NUMBER_ID;
}

async function sendMessage(to, payload) {
  const url = `${BASE_URL}/${getPhoneNumberId()}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    ...payload
  };
  const { data } = await axios.post(url, body, { headers: getHeaders() });
  return data;
}

async function sendText(to, text) {
  return sendMessage(to, {
    type: 'text',
    text: { body: text }
  });
}

async function sendImage(to, imageUrl, caption) {
  return sendMessage(to, {
    type: 'image',
    image: {
      link: imageUrl,
      caption: caption || ''
    }
  });
}

async function sendInteractiveButtons(to, headerText, bodyText, footerText, buttons) {
  return sendMessage(to, {
    type: 'interactive',
    interactive: {
      type: 'button',
      header: headerText ? { type: 'text', text: headerText } : undefined,
      body: { text: bodyText },
      footer: footerText ? { text: footerText } : undefined,
      action: {
        buttons: buttons.map((btn, i) => ({
          type: 'reply',
          reply: { id: btn.id || `btn_${i}`, title: btn.title }
        }))
      }
    }
  });
}

async function sendImageHeaderButtons(to, imageUrl, bodyText, footerText, buttons) {
  return sendMessage(to, {
    type: 'interactive',
    interactive: {
      type: 'button',
      header: { type: 'image', image: { link: imageUrl } },
      body: { text: bodyText },
      footer: footerText ? { text: footerText } : undefined,
      action: {
        buttons: buttons.map((btn, i) => ({
          type: 'reply',
          reply: { id: btn.id || `btn_${i}`, title: btn.title }
        }))
      }
    }
  });
}

async function sendListMessage(to, headerText, bodyText, footerText, buttonText, sections) {
  return sendMessage(to, {
    type: 'interactive',
    interactive: {
      type: 'list',
      header: headerText ? { type: 'text', text: headerText } : undefined,
      body: { text: bodyText },
      footer: footerText ? { text: footerText } : undefined,
      action: {
        button: buttonText || 'Ver opcoes',
        sections
      }
    }
  });
}

async function sendCatalogMessage(to, bodyText, footerText, catalogProducts) {
  return sendMessage(to, {
    type: 'interactive',
    interactive: {
      type: 'catalog_message',
      body: { text: bodyText },
      footer: footerText ? { text: footerText } : undefined,
      action: {
        name: 'catalog_message',
        parameters: {
          thumbnail_product_retailer_id: catalogProducts[0]?.id || ''
        }
      }
    }
  });
}

async function markAsRead(messageId) {
  const url = `${BASE_URL}/${getPhoneNumberId()}/messages`;
  await axios.post(url, {
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId
  }, { headers: getHeaders() });
}

async function uploadMedia(fileUrl, mimeType) {
  const url = `${BASE_URL}/${getPhoneNumberId()}/media`;
  const form = new FormData();
  form.append('file', fileUrl);
  form.append('type', mimeType);
  form.append('messaging_product', 'whatsapp');
  const { data } = await axios.post(url, form, { headers: getHeaders() });
  return data;
}

async function sendTemplate(to, templateName, language, components) {
  return sendMessage(to, {
    type: 'template',
    template: {
      name: templateName,
      language: { code: language || 'pt_BR' },
      components: components || []
    }
  });
}

async function sendProductCatalog(to, catalogId, bodyText, footerText) {
  return sendMessage(to, {
    type: 'interactive',
    interactive: {
      type: 'catalog_message',
      body: { text: bodyText },
      footer: footerText ? { text: footerText } : undefined,
      action: {
        name: 'catalog_message',
        parameters: {
          thumbnail_product_retailer_id: catalogId
        }
      }
    }
  });
}

module.exports = {
  sendText,
  sendImage,
  sendInteractiveButtons,
  sendImageHeaderButtons,
  sendListMessage,
  sendCatalogMessage,
  sendTemplate,
  sendProductCatalog,
  markAsRead,
  uploadMedia
};
