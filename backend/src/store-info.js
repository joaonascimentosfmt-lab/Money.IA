function getStoreInfo() {
  return {
    name: 'Money Adega & Tabacaria',
    slogan: 'Seu role comeca aqui.',
    hours: 'Seg a Sab: 11h as 22h | Dom: 10h as 22h',
    address: 'Av. Senador Filinto Muller - Marajoara, Varzea Grande - MT, CEP 78138-000',
    phone: '(65) 99247-5643',
    whatsapp: '5565992475643',
    instagram: '@moneyadega',
    paymentMethods: 'PIX, Dinheiro, Cartao de Debito e Credito',
    deliveryFee: 5.00,
    minOrder: 30.00,
    avgTime: '45 min',
    neighborhoods: ['Centro', 'CPA', 'Alicerce', 'Alvorada', 'Morada do Ouro', 'Quilombo', 'Santa Rosa']
  };
}

module.exports = { getStoreInfo };
