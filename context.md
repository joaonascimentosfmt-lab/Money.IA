# Contexto e Arquitetura - MONE

## Visao Geral

MONE e um assistente virtual inteligente para WhatsApp e Web, desenvolvido para a **Money Adega & Tabacaria**. O sistema tem como objetivo automatizar o atendimento ao cliente, oferecendo informacoes sobre produtos, recomendacoes, montagem de pedidos e encaminhamento para atendimento humano quando necessario.

## Conceito

MONE nao e um ERP nem realiza gestao empresarial. Seu unico proposito e atender clientes de forma natural e eficiente, convertendo visitantes em compradores.

- **Nome:** Money
- **Empresa:** Money Adega & Tabacaria
- **Slogan:** Seu role comeca aqui.
- **Personalidade:** Simpatica, descontraida, educada, objetiva, inteligente, bem-humorada, especialista em bebidas e tabacaria.

## Arquitetura do MVP (Monolito Web)

### Estrutura de Diretorios

```
mvp/
  index.html        - Entrada principal do PWA
  css/
    style.css       - Estilos premium (preto, dourado, verde escuro, branco)
  js/
    app.js          - Logica do chat, carrinho, navegacao e integracoes
    products.js     - Base de dados de produtos e informacoes da loja
  manifest.json     - Configuracao PWA
  sw.js             - Service Worker para cache offline
  admin/
    (futuro)        - Painel administrativo para gestao de produtos
  assets/
    icons/          - Icones do PWA
```

### Stack Tecnologica

| Componente | Tecnologia |
|------------|-----------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| PWA | Manifest JSON, Service Worker |
| Estilos | CSS puro com variaveis e design system |
| Icones | SVG inline (sem dependencias externas) |
| Fontes | Inter (sans-serif), Playfair Display (serif) - Google Fonts |
| Offline | Cache-first via Service Worker |
| Pedidos | Integracao com WhatsApp via link `wa.me` |

### Design System

- **Paleta de Cores:**
  - Preto: `#0a0a0a`, `#111111`, `#1a1a1a`, `#222222`
  - Dourado: `#d4af37`, `#e8c84a` (light), `#b8962e` (dark)
  - Branco: `#f5f5f5`, `#e0e0e0`
  - Verde Escuro: `#1a4731`, `#2d6b4a`
  - Cinza: `#888888`, `#555555`, `#2a2a2a`

- **Tipografia:**
  - Titulos e nome da marca: Playfair Display (serif)
  - Corpo e interface: Inter (sans-serif)

- **Componentes:**
  - Tela de splash com animacao
  - Header com avatar e status online
  - Sidebar de navegacao
  - Balao de chat com avatar da Money
  - Grade de produtos com categorias
  - Carrinho lateral (drawer)
  - Modal de checkout
  - Indicador de digitacao
  - Toast notifications

### Funcionalidades do MVP

1. **Chat Inteligente:** Interface de conversa com respostas pre-programadas baseadas em palavras-chave
2. **Catalogo de Produtos:** 50+ produtos em 11 categorias (whisky, vodka, gin, cerveja, vinho, espumante, energetico, pods, tabacaria, acessorios)
3. **Busca de Produtos:** Busca por nome, marca, descricao ou tags
4. **Carrinho de Compras:** Adicao, remocao e ajuste de quantidades
5. **Checkout:** Formulario com nome, telefone, endereco, pagamento e observacoes
6. **Envio via WhatsApp:** Pedido formatado e enviado diretamente para o WhatsApp da loja
7. **PWA:** Instalavel, responsivo, com suporte offline basico
8. **Navegacao:** Entre chat, produtos, pedidos e informacoes da loja
9. **Informacoes da Loja:** Horario, endereco, telefone, Instagram, formas de pagamento, delivery

### Fluxo do Usuario

```
Entrada (Splash)
  -> Tela de Chat
    -> Mensagem de boas-vindas da Money
      -> Interacao natural
        -> Pesquisa de produtos
        -> Recomendacoes
        -> Adicao ao carrinho
          -> Finalizacao do pedido
            -> Envio via WhatsApp para a loja
```

## Arquitetura do Produto Final

### Visao Geral do Sistema

```
[Cliente WhatsApp]  [Cliente Web/PWA]
        |                   |
   [Twilio / WWebJS]  [PWA Frontend]
        |                   |
   [Orquestrador de Mensagens]
        |
   [API Gateway]
        |
   [Servicos Modulares]
        |
   [OpenAI GPT]  [Base de Conhecimento]
        |
   [Banco de Dados - PostgreSQL / Supabase]
        |
   [Painel Admin]
```

### Componentes do Produto Final

#### 1. Frontend Web (PWA)
- **Framework:** React + Next.js ou Vue 3 + Nuxt
- **PWA:** Workbox + Manifest
- **Estilos:** TailwindCSS + Design System customizado
- **Estado:** Zustand ou Pinia
- **SSR:** Next.js (SEO para produtos)

#### 2. API Backend
- **Runtime:** Node.js (NestJS) ou Python (FastAPI)
- **Autenticacao:** JWT + refresh tokens
- **WebSocket:** Socket.io para chat em tempo real
- **Cache:** Redis para contexto de conversa

#### 3. Integracao WhatsApp
- **Driver:** whatsapp-web.js (Baileys) ou Twilio API
- **Middleware:** Parse de mensagens e sessoes
- **Fallback:** Envio manual via link wa.me

#### 4. Inteligencia Artificial
- **LLM:** OpenAI GPT-4 / GPT-4o-mini
- **Prompt Engineering:** System Prompt com personalidade, regras e base de conhecimento
- **Contexto:** Histórico de conversa por sessao (Redis, 50 mensagens)
- **Embeddings:** Para busca semantica de produtos (opcional)

#### 5. Banco de Dados
- **Relacional:** PostgreSQL (ou Supabase)
  - Tabelas: produtos, categorias, pedidos, clientes, sessoes, promocoes
- **Cache:** Redis para sessoes ativas

#### 6. Painel Administrativo
- **Framework:** React com shadcn/ui ou similar
- **Funcionalidades:**
  - CRUD de produtos
  - Gerenciamento de pedidos
  - Visualizacao de metricas
  - Configuracao de prompt
  - Gerenciamento de promocoes

#### 7. Base de Conhecimento
- **Estrutura:**
  - Produtos (nome, marca, categoria, descricao, volume, preco, imagem, disponibilidade)
  - Promocoes (titulo, descricao, regras, vigencia)
  - Informacoes da loja (horario, endereco, contato, formas de pagamento, delivery)
  - FAQ (perguntas frequentes e respostas)

### Fluxo de Mensagens (Produto Final)

```
Usuario envia mensagem
  -> Identificacao do canal (WhatsApp / Web)
    -> Normalizacao da mensagem
      -> Classificador de intencao (saudacao, produto, preco, pedido, suporte)
        -> Se produto: busca semantica na base
        -> Se duvida: consulta FAQ / GPT
        -> Se pedido: montagem e confirmacao
        -> Se suporte humano: transferencia
      -> Geracao de resposta (GPT + contexto + base)
    -> Formatacao para o canal
  -> Envio da resposta
```

### Seguranca e Regras

- Nunca inventar precos ou promocoes
- Informar apenas dados cadastrados na base
- Transferir para humano quando nao souber responder
- Nunca discutir com o cliente
- Sempre oferecer produtos complementares sem ser insistente
- Objetivo final: conversao de vendas

### Metricas de Sucesso

- Taxa de atendimento automatizado (target: >80%)
- Taxa de conversao (target: >15%)
- Tempo medio de atendimento (target: <2min)
- Satisfacao do cliente (target: >4.5/5)
- Reducao de chamados humanos (target: >50%)
