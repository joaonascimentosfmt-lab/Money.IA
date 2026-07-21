function getStoreInfo() {
  return {
    name: 'Money Adega & Tabacaria',
    slogan: 'Seu role comeca aqui.',
    hours: 'Seg a Sab: 09h as 23h | Dom: 10h as 22h',
    address: 'Rua Exemplo, 123 - Centro, Cuiaba - MT',
    phone: '(65) 99999-8888',
    whatsapp: '5565999998888',
    instagram: '@moneyadega',
    paymentMethods: 'PIX, Dinheiro, Cartao de Debito e Credito',
    deliveryFee: 5.00,
    minOrder: 30.00,
    avgTime: '45 min',
    neighborhoods: ['Centro', 'CPA', 'Alicerce', 'Alvorada', 'Morada do Ouro', 'Quilombo', 'Santa Rosa']
  };
}

module.exports = { getStoreInfo };
