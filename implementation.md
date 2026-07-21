# Plano de Implementacao - MONE

## MVP (Minimo Produto Viavel)

**Duracao estimada:** 2-3 semanas  
**Stack:** HTML, CSS, JavaScript (Vanilla) + PWA

### Sprint 1: Estrutura Base e Design System (Dias 1-3)

**Objetivo:** Criar a base do PWA com identidade visual premium

- [x] Criar estrutura de diretorios do projeto
- [x] Configurar manifest.json para PWA
- [x] Implementar service worker com cache offline
- [x] Criar tela de splash animada
- [x] Desenvolver design system (cores, tipografia, spacing)
- [x] Implementar header com avatar e status online
- [x] Criar sidebar de navegacao responsiva
- [x] Implementar navegacao entre views (chat, produtos, pedidos, info)

### Sprint 2: Base de Conhecimento e Catalogo (Dias 4-6)

**Objetivo:** Popular banco de dados de produtos e criar interface de catalogo

- [x] Estruturar dados de 50+ produtos em 11 categorias
- [x] Criar funcoes de busca e filtro por categoria
- [x] Implementar grid de produtos com busca textual
- [x] Implementar abas de categoria com scroll horizontal
- [x] Criar icones SVG para cada categoria
- [x] Adicionar informacoes da loja (horario, endereco, contato, pagamento, delivery)
- [x] Criar view de informacoes com cards estilizados

### Sprint 3: Chat e Interacao (Dias 7-10)

**Objetivo:** Implementar interface de chat com respostas inteligentes

- [x] Criar container de mensagens com scroll automatico
- [x] Implementar baloes de conversa (Mone x Usuario)
- [x] Adicionar input com suporte a Enter
- [x] Implementar botoes de acao rapida
- [x] Criar indicador de digitacao (typing indicator)
- [x] Desenvolver sistema de respostas baseado em palavras-chave
- [x] Implementar cards de produtos dentro do chat
- [x] Implementar carrossel de produtos nas respostas
- [x] Adicionar suporte a saudacoes, horario, endereco, contato

### Sprint 4: Carrinho e Pedidos (Dias 11-13)

**Objetivo:** Sistema de carrinho e envio de pedidos via WhatsApp

- [x] Implementar carrinho de compras (adicionar, remover, ajustar qtd)
- [x] Criar badge de notificacao no cabecalho
- [x] Implementar drawer lateral do carrinho
- [x] Desenvolver modal de checkout com formulario
- [x] Criar resumo do pedido no checkout
- [x] Implementar validacao de campos obrigatorios
- [x] Integrar envio do pedido via link wa.me
- [x] Criar view de pedidos com estado do carrinho

### Sprint 5: Integracao e Refinamento (Dias 14-17)

**Objetivo:** Ajustes finais e preparacao para deploy

- [x] Animações de transicao e micro-interacoes
- [x] Scroll suave e auto-scroll no chat
- [x] Feedback visual (toast notifications)
- [x] Responsividade para mobile
- [x] Testes de fluxo completo (chat -> carrinho -> checkout -> whatsapp)
- [x] Ajustes de performance e acessibilidade
- [x] Criar documentacao (context.md e implementation.md)

## Produto Final

**Duracao estimada:** 8-12 semanas  
**Stack:** Framework moderno + API + IA

### Sprint 6: Migracao para Framework (Semanas 1-2)

**Objetivo:** Migrar MVP para framework moderno (Next.js / Nuxt)

- [ ] Configurar projeto Next.js + TypeScript
- [ ] Migrar design system para TailwindCSS + variaveis CSS
- [ ] Componentizar toda a interface (Header, Chat, ProductCard, Cart, etc.)
- [ ] Implementar roteamento com pages router
- [ ] Adicionar PWA com Workbox
- [ ] Configurar SSR para paginas de produtos

### Sprint 7: API Backend (Semanas 3-4)

**Objetivo:** Criar API RESTful com banco de dados

- [ ] Configurar Node.js + NestJS ou Python + FastAPI
- [ ] Configurar PostgreSQL (ou Supabase)
- [ ] Criar modelos: Produto, Categoria, Pedido, Cliente, Promocao
- [ ] Implementar CRUD de produtos
- [ ] Implementar autenticacao JWT
- [ ] Criar endpoints para busca e filtro de produtos
- [ ] Implementar WebSocket para chat em tempo real

### Sprint 8: Integracao WhatsApp (Semanas 5-6)

**Objetivo:** Conectar chatbot ao WhatsApp real

- [ ] Configurar whatsapp-web.js (Baileys) ou Twilio WhatsApp API
- [ ] Implementar gerenciamento de sessoes
- [ ] Criar middleware de parse de mensagens
- [ ] Implementar fila de mensagens (Bull/RabbitMQ)
- [ ] Sincronizar estado do chat entre WhatsApp e Web
- [ ] Adicionar fallback para envio manual
- [ ] Testar com numero real da loja

### Sprint 9: Inteligencia Artificial (Semanas 7-8)

**Objetivo:** Integrar GPT-4 para conversas naturais

- [ ] Configurar integracao com OpenAI API
- [ ] Desenvolver system prompt com personalidade e regras da Mone
- [ ] Implementar gerenciamento de contexto por sessao (Redis)
- [ ] Criar classificador de intencao (saudacao, produto, preco, pedido, suporte)
- [ ] Implementar busca semantica de produtos (embeddings + pgvector)
- [ ] Adicionar fallback para quando GPT nao souber responder
- [ ] Implementar sistema de recomendacao inteligente

### Sprint 10: Painel Administrativo (Semanas 9-10)

**Objetivo:** Criar painel para gestao do sistema

- [ ] Configurar React + shadcn/ui ou similar
- [ ] Implementar autenticacao admin
- [ ] CRUD de produtos com upload de imagens
- [ ] Gerenciamento de pedidos (visualizar, confirmar, cancelar)
- [ ] Dashboard com metricas (conversao, atendimentos, vendas)
- [ ] Configuracao de prompt e regras da IA
- [ ] Gerenciamento de promocoes
- [ ] Visualizacao de logs de conversa

### Sprint 11: Promocoes e Regras Avancadas (Semanas 10-11)

**Objetivo:** Implementar sistema de promocoes logicas

- [ ] Criar engine de regras para promocoes
- [ ] Implementar promocoes por: valor minimo, combinacao de produtos, data/horario
- [ ] Notificacao automatica de promocoes no chat
- [ ] Sugestao inteligente de produtos complementares
- [ ] Implementar logica de "compre junto" e combos
- [ ] Testes A/B de recomendacoes

### Sprint 12: Producao e Otimizacao (Semanas 11-12)

**Objetivo:** Preparar para producao e escalar

- [ ] Deploy em producao (Vercel + Render ou AWS)
- [ ] Configurar dominio SSL
- [ ] Implementar monitoring e logging (Sentry, DataDog)
- [ ] Otimizar performance (Lighthouse >90)
- [ ] Testes de carga no WhatsApp
- [ ] Implementar analytics de uso
- [ ] Documentacao tecnica completa
- [ ] Treinamento da equipe da loja

## Roadmap Visual

```
Sprint 1-5: MVP (2-3 semanas)
  MVP Completo: Chat + Catalogo + Carrinho + WhatsApp

Sprint 6-7: Arquitetura Moderna (3-4 semanas)
  Framework + API + Banco de Dados

Sprint 8-9: Canais + IA (3-4 semanas)
  WhatsApp Nativo + OpenAI GPT

Sprint 10-11: Gestao (2-3 semanas)
  Painel Admin + Promocoes

Sprint 12: Producao (1-2 semanas)
  Deploy + Otimizacao + Documentacao
```

## Definicao de Pronto (Definition of Done)

- Funcionalidade implementada e testada
- Codigo revisado e sem erros no console
- Responsivo em mobile e desktop
- Funciona offline (quando aplicavel)
- Documentacao atualizada
- Deploy realizado em ambiente de staging
- Aprovacao do stakeholder
