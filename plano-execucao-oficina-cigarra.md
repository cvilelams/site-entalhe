# Plano de Execucao - Oficina Cigarra

## 1) Objetivo
Estruturar e executar a entrega do site da Oficina Cigarra com foco em:
- performance e confiabilidade;
- fluxo de conteudo simples para operacao;
- publicacao segura com Supabase;
- base pronta para evolucao continua.

## 2) Escopo
### Inclui
- Pagina inicial com proposta de valor, servicos e contato.
- API para conteudo e visibilidade.
- Upload de arquivos/imagens.
- Configuracao de layout global e componentes base.
- Integracao com Supabase.

### Nao inclui (nesta fase)
- Painel administrativo completo.
- Multi-idioma.
- Automacoes de marketing.

## 3) Entregaveis
- Frontend funcional em Next.js (App Router).
- Endpoints:
  - `app/api/content/route.ts`
  - `app/api/upload/route.ts`
  - `app/api/visibility/route.ts`
- Estrutura de apresentacao:
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
  - `components/Footer.tsx`
- Camada de dados/config:
  - `lib/supabase.ts`
  - `lib/constants.ts`
  - `lib/landing-data.ts`

## 4) Fases de Execucao
## Fase 0 - Alinhamento (Dia 1)
- Definir mensagem central da marca.
- Confirmar secoes da landing page.
- Validar paleta, tipografia e tom visual.
- Aprovar checklist de conteudo minimo.

## Fase 1 - Estrutura base (Dias 1-2)
- Finalizar `layout` e pagina principal.
- Consolidar estilos globais e tokens basicos.
- Criar componentes compartilhados iniciais (rodape e blocos comuns).
- Garantir responsividade base (mobile-first).

## Fase 2 - Dados e integracao (Dias 2-4)
- Configurar cliente Supabase e variaveis de ambiente.
- Definir formato de dados em `landing-data`.
- Implementar leitura/escrita via endpoint de conteudo.
- Implementar endpoint de visibilidade (controle de publicacao).

## Fase 3 - Upload e midia (Dias 4-5)
- Implementar endpoint de upload.
- Padronizar validacao de tipo/tamanho de arquivo.
- Definir convencao de nomes e organizacao de assets.
- Tratar erros com mensagens claras.

## Fase 4 - Qualidade e seguranca (Dias 5-6)
- Validar autenticacao/autorizacao dos endpoints sensiveis.
- Revisar exposicao de secrets e variaveis publicas.
- Testar fluxo completo: editar conteudo -> publicar -> visualizar.
- Rodar lints e ajustes de padrao de codigo.

## Fase 5 - Publicacao (Dia 7)
- Revisao final com checklist de aceite.
- Deploy em ambiente alvo.
- Smoke test pos-deploy.
- Congelamento de escopo da versao 1.

## 5) Checklist de Implementacao
- [ ] Estrutura de layout concluida e consistente.
- [ ] Pagina inicial com secoes e CTA principal.
- [ ] Endpoints de conteudo/visibilidade/upload funcionais.
- [ ] Integracao Supabase validada com dados reais.
- [ ] Tratamento de erros e estados de carregamento.
- [ ] Responsividade validada em mobile, tablet e desktop.
- [ ] Metadados basicos (title/description) definidos.
- [ ] Deploy final com smoke test aprovado.

## 6) Criterios de Aceite
- Conteudo pode ser atualizado sem alterar codigo da UI principal.
- Upload nao aceita arquivos fora das regras definidas.
- Estado de visibilidade controla exibicao publica de secoes/conteudo.
- Pagina inicial carrega sem erros de console no fluxo normal.
- Layout permanece legivel e navegavel em telas pequenas.

## 7) Riscos e Mitigacoes
- **Risco:** atraso por indefinicao de conteudo final.  
  **Mitigacao:** travar conteudo minimo viavel no Dia 1.
- **Risco:** falhas de permissao no storage/database.  
  **Mitigacao:** validar politicas e fluxo de auth antes do deploy.
- **Risco:** regressao visual em ajustes finais.  
  **Mitigacao:** checklist visual por breakpoint antes da publicacao.
- **Risco:** escopo crescer durante execucao.  
  **Mitigacao:** registrar extras como backlog para versao 1.1.

## 8) Cronograma Sugerido (7 dias uteis)
- Dia 1: alinhamento + base visual.
- Dia 2: estrutura da homepage + componentes.
- Dia 3: integracao de conteudo.
- Dia 4: visibilidade + refinamentos de dados.
- Dia 5: upload + validacoes.
- Dia 6: QA tecnico e visual.
- Dia 7: deploy, smoke test e fechamento.

## 9) Definicao de Pronto (DoD)
Considerar finalizado quando:
- funcionalidades previstas no escopo estiverem entregues;
- criterios de aceite estiverem atendidos;
- ambiente de producao estiver estavel;
- backlog da proxima iteracao estiver documentado.

## 10) Proximos Passos (apos versao 1)
- Criar painel administrativo simples para edicao assistida.
- Adicionar monitoramento de erros e eventos.
- Evoluir SEO tecnico (schema, OG, performance fina).
- Planejar versao 1.1 com base no uso real.
# 🪵 Plano de Execução — Landing Page Oficina Cigarra
> Stack: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui + Supabase  
> Estilo: Minimalismo japonês — wabi-sabi, espaço vazio como elemento visual  
> Repositório: [github.com/cvilelams/site-entalhe](https://github.com/cvilelams/site-entalhe)

---

## Visão Geral da Arquitetura

```
site-entalhe/               ← repositório existente
├── app/
│   ├── page.tsx                  # Landing page principal
│   ├── admin/
│   │   ├── page.tsx              # Login simples por senha
│   │   └── dashboard/
│   │       └── page.tsx          # Painel de edição de conteúdo
│   └── api/
│       ├── content/route.ts      # GET/PUT conteúdo do Supabase
│       └── upload/route.ts       # Upload de imagens para Storage
├── components/
│   ├── sections/                 # Seções da landing page
│   └── admin/                    # Componentes do painel admin
├── lib/
│   ├── supabase.ts               # Client do Supabase
│   └── constants.ts              # Cores, fontes, tokens de design
└── public/
```

---

## Etapa 0 — Setup do Projeto

**Objetivo:** Ambiente configurado, dependências instaladas, Supabase conectado.

### Tarefas

#### 0.1 Clonar o repositório e inicializar o projeto Next.js
O repositório `site-entalhe` existe no GitHub mas está vazio (apenas README). Clonar e inicializar o Next.js diretamente na pasta:
```bash
git clone https://github.com/cvilelams/site-entalhe.git
cd site-entalhe

# Inicializar Next.js na raiz do repo (o ponto "." evita criar subpasta)
npx create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir=false

# Commitar a estrutura inicial
git add . && git commit -m "feat: initialize Next.js project"
git push origin main
```

#### 0.2 Instalar e configurar shadcn/ui
```bash
npx shadcn@latest init
# Escolher: Style → Default | Base color → Stone | CSS variables → Yes
```

Instalar componentes que serão usados:
```bash
npx shadcn@latest add button card accordion dialog input textarea label badge separator
```

#### 0.3 Instalar dependências adicionais
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install framer-motion           # animações de fade suaves
npm install next-cloudinary         # ou usar Supabase Storage diretamente
npm install react-hook-form zod     # formulários do admin
npm install @tailwindcss/typography # prose para textos longos
```

#### 0.4 Configurar variáveis de ambiente
Criar `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ADMIN_PASSWORD=senha_escolhida_pela_instrutora
```

#### 0.5 Configurar Tailwind com tokens de design japonês
Em `tailwind.config.ts`, adicionar paleta e fontes customizadas:
```ts
// Cores
washi:   '#F5F0E8'   // fundo principal
sumi:    '#1C1917'   // preto tinta
urushi:  '#6B4E2A'   // marrom madeira (destaque)
kinari:  '#A89070'   // bege quente
shiro:   '#E8E0D0'   // branco sujo (cards)

// Fontes
sans: ['Inter', 'sans-serif']
serif: ['Cormorant Garamond', 'serif']
jp: ['Noto Serif JP', 'serif']
```

#### 0.6 Importar fontes no layout raiz
Em `app/layout.tsx`, importar do Google Fonts:
- `Cormorant_Garamond` (weights: 300, 400, 500)
- `Inter` (weights: 300, 400, 500)
- `Noto_Serif_JP` (weights: 300, 400)

---

## Etapa 1 — Banco de Dados e Storage no Supabase

**Objetivo:** Estrutura de dados criada, Storage configurado, RLS definido.

### 1.1 Criar tabelas no Supabase Studio

#### Tabela `site_content`
Armazena todos os textos editáveis da landing page como pares chave-valor.
```sql
CREATE TABLE site_content (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section     text NOT NULL,       -- ex: 'hero', 'course_overview', 'faq'
  key         text NOT NULL,       -- ex: 'title', 'subtitle', 'description'
  value       text,                -- texto editável
  updated_at  timestamptz DEFAULT now(),
  UNIQUE(section, key)
);
```

#### Tabela `instructors`
```sql
CREATE TABLE instructors (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  bio         text,
  photo_url   text,
  order_index int DEFAULT 0,
  updated_at  timestamptz DEFAULT now()
);
```

#### Tabela `course_modules`
```sql
CREATE TABLE course_modules (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  description text,
  icon        text,               -- nome do ícone ou emoji
  order_index int DEFAULT 0,
  updated_at  timestamptz DEFAULT now()
);
```

#### Tabela `testimonials`
```sql
CREATE TABLE testimonials (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  role        text,               -- ex: "Aluna da turma 2024"
  text        text NOT NULL,
  photo_url   text,
  featured    boolean DEFAULT false,
  order_index int DEFAULT 0,
  updated_at  timestamptz DEFAULT now()
);
```

#### Tabela `faq_items`
```sql
CREATE TABLE faq_items (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question    text NOT NULL,
  answer      text NOT NULL,
  order_index int DEFAULT 0,
  updated_at  timestamptz DEFAULT now()
);
```

#### Tabela `section_visibility`
Controla quais seções estão visíveis na landing page.
```sql
CREATE TABLE section_visibility (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section     text NOT NULL UNIQUE,  -- chave da seção, ex: 'testimonials'
  label       text NOT NULL,         -- nome legível exibido no admin
  is_visible  boolean DEFAULT true,
  order_index int DEFAULT 0,
  updated_at  timestamptz DEFAULT now()
);

-- Seed: todas as seções ativas por padrão
INSERT INTO section_visibility (section, label, order_index) VALUES
  ('hero',            'Hero (Topo)',           1),
  ('social_proof',    'Barra de Impacto',      2),
  ('course_overview', 'Visão Geral do Curso',  3),
  ('modules',         'Módulos do Curso',      4),
  ('instructors',     'Instrutoras',           5),
  ('testimonials',    'Depoimentos',           6),
  ('guarantee',       'Garantia',              7),
  ('faq',             'FAQ',                   8),
  ('final_cta',       'CTA Final',             9);
```

### 1.2 Configurar Supabase Storage
- Criar bucket chamado `site-images`
- Tornar o bucket **público** (leitura pública)
- Configurar política de upload apenas autenticada (ou por service key nas API routes)

### 1.3 Popular dados iniciais (seed)
Inserir conteúdo placeholder em todas as tabelas para que a landing já carregue com estrutura.

Registros obrigatórios na tabela `site_content` para o Hero:
```sql
INSERT INTO site_content (section, key, value) VALUES
  ('hero', 'title', 'Aprenda a entalhar madeira com faca'),
  ('hero', 'subtitle', 'Um curso artesanal para quem quer criar com as próprias mãos'),
  ('hero', 'cta_text', 'Quero fazer o curso'),
  ('hero', 'cta_url', 'https://...'),
  ('hero', 'media_type', 'image'),   -- 'image' ou 'video'
  ('hero', 'media_url', '');         -- URL do Supabase Storage
```

### 1.4 Configurar RLS (Row Level Security)
```sql
-- Leitura pública para todos
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON site_content FOR SELECT USING (true);

-- Repetir para instructors, course_modules, testimonials, faq_items, section_visibility
```
> Escrita será feita via **service role key** nas API Routes do Next.js (nunca exposta no client).

---

## Etapa 2 — API Routes (Backend Simples)

**Objetivo:** Endpoints para ler e escrever dados, com proteção por senha no admin.

### 2.1 `app/api/content/route.ts`
- `GET`: Busca todos os dados de uma seção específica do Supabase
- `PUT`: Atualiza um campo — verifica header `x-admin-password` antes de escrever

### 2.2 `app/api/visibility/route.ts`
- `GET`: Retorna todas as seções com `is_visible` e `order_index`
- `PUT`: Recebe `{ section, is_visible }` e atualiza — verifica header `x-admin-password`

### 2.3 `app/api/upload/route.ts`
- `POST`: Recebe um arquivo via `FormData`, faz upload para o bucket `site-images` no Supabase Storage usando a **service role key**, retorna a URL pública

### 2.3 `lib/supabase.ts`
Criar dois clients:
- **Client público** (`createBrowserClient`) — para leitura no frontend
- **Client admin** (`createClient` com service key) — apenas nas API Routes server-side

---

## Etapa 3 — Landing Page (Componentes de Seção)

**Objetivo:** Montar todas as seções da landing com dados vindos do Supabase.

> Cada seção recebe os dados via `fetch` server-side no `page.tsx` principal (SSR).  
> Animações de entrada com `framer-motion` (fade + slide suave, sem exageros).  
> O `page.tsx` busca a tabela `section_visibility` e **só renderiza** as seções com `is_visible = true`, na `order_index` definida.

### Estrutura de seções em ordem de funil:

#### 3.1 `components/sections/HeroSection.tsx`
- Suporte a **dois modos de fundo**, controlado pelo admin:
  - **Modo vídeo:** `<video>` em loop, muted, autoplay, com overlay escuro sutil. Formatos aceitos: `.webm` + `.mp4` (fallback)
  - **Modo imagem:** `<Image>` Next.js com `priority` e `object-fit: cover`
- Lógica de renderização: se `hero_media_type === 'video'` → renderiza `<video>`, caso contrário renderiza `<Image>`
- Título principal em `Cormorant Garamond` (grande, leve, peso 300)
- Subtítulo em Inter
- CTA primário: botão "Quero fazer o curso" → redireciona para URL externa
- Campos editáveis no admin: título, subtítulo, URL do CTA, tipo de mídia (toggle Video/Foto), upload do arquivo de mídia

#### 3.2 `components/sections/SocialProofBar.tsx`
- Barra discreta com 3 números de impacto (ex: "320 alunas", "4 turmas", "98% satisfação")
- Separada por linhas finas verticais
- Campos editáveis: 3 pares de número + descrição

#### 3.3 `components/sections/CourseOverviewSection.tsx`
- Título da seção + parágrafo introdutório
- Grid de módulos do curso (cards minimalistas, linha inferior como divisor)
- Cada card: ícone/número + título + descrição curta
- Campos editáveis: título da seção, texto, todos os módulos

#### 3.4 `components/sections/InstructorsSection.tsx`
- Foto circular com tratamento warm/dessaturado via CSS filter
- Nome em serif, bio em Inter light
- Layout side-by-side no desktop, empilhado no mobile
- Campos editáveis: nome, bio, foto (upload)

#### 3.5 `components/sections/TestimonialsSection.tsx`
- Cards com aspas estilizadas
- Nome + papel da aluna
- Foto pequena opcional
- Carrossel simples no mobile, grid 3 colunas no desktop
- Campos editáveis: todos os depoimentos

#### 3.6 `components/sections/GuaranteeSection.tsx`
- Ícone minimalista (traço único) + título + texto da garantia
- Fundo levemente diferente (`shiro`) para destacar sem peso visual
- Campos editáveis: título e texto da garantia

#### 3.7 `components/sections/FAQSection.tsx`
- Accordion shadcn/ui com animação suave
- Linha divisória fina entre perguntas
- Campos editáveis: todas as perguntas e respostas

#### 3.8 `components/sections/FinalCTASection.tsx`
- Seção de fechamento com fundo `urushi` (marrom madeira)
- Headline forte, frase de apoio, botão branco
- Campo editável: headline, frase de apoio, URL do botão

#### 3.9 `components/Footer.tsx`
- Logo + links mínimos + copyright
- Campo editável: texto do copyright, links

---

## Etapa 4 — Painel Admin (`/admin`)

**Objetivo:** Interface simples e intuitiva para a instrutora editar todo o conteúdo sem tocar em código.

### 4.1 `app/admin/page.tsx` — Tela de Login
- Input de senha + botão entrar
- Salva token de sessão no `sessionStorage`
- Redireciona para `/admin/dashboard` se correta
- Design limpo, sem exagero — mesmo estilo da landing

### 4.2 `app/admin/dashboard/page.tsx` — Painel Principal
Layout com sidebar de navegação por seção e área de edição à direita.

**Sidebar com seções:**
- 🔲 Visibilidade das Seções ← **item fixo no topo da sidebar**
- Hero
- Barra de impacto
- Visão geral do curso
- Módulos
- Instrutoras
- Depoimentos
- Garantia
- FAQ
- CTA Final

### 4.3 Componentes do Admin

#### `components/admin/SectionTogglePanel.tsx`
Painel de controle centralizado de visibilidade — **primeiro item acessível no admin**.
- Lista todas as seções em ordem
- Cada linha: nome da seção + `Switch` shadcn/ui (ligado/desligado)
- Ao alternar: chama `PUT /api/visibility` imediatamente, feedback "Salvo ✓" inline
- Seções desativadas ficam com texto acinzentado na lista
- Aviso visual se a seção `hero` ou `final_cta` for desativada: *"Atenção: esta é uma seção essencial do funil"*
- Visual de prévia: pequeno ícone de olho 👁 mostra/oculta ao lado de cada toggle

#### `components/admin/TextEditor.tsx`
- Label + Textarea com auto-save ao perder foco
- Feedback visual de "Salvo ✓" após PUT na API

#### `components/admin/HeroMediaEditor.tsx`
- **Toggle** entre "Foto" e "Vídeo" (shadcn `Tabs` ou `Switch`)
- Ao selecionar **Foto**: exibe `ImageUploader` — aceita `.jpg`, `.png`, `.webp`
- Ao selecionar **Vídeo**: exibe uploader de vídeo — aceita `.mp4`, `.webm`; exibe aviso de tamanho recomendado (< 15MB)
- Preview imediato após upload em ambos os casos
- Salva `media_type` e `media_url` na tabela `site_content`

#### `components/admin/ImageUploader.tsx`
- Área de drag-and-drop para upload de imagem
- Preview imediato após upload
- Mostra URL pública gerada pelo Supabase Storage
- Indicador de loading durante upload

#### `components/admin/ModuleEditor.tsx`
- Lista de módulos com botões de reordenar (↑↓), editar e deletar
- Botão "Adicionar módulo" abre dialog shadcn/ui com formulário

#### `components/admin/TestimonialEditor.tsx`
- Mesma lógica do ModuleEditor
- Campo extra para upload de foto

#### `components/admin/FAQEditor.tsx`
- Mesma lógica, com campos pergunta + resposta

---

## Etapa 5 — Responsividade e Refinamento Visual

**Objetivo:** Garantir experiência perfeita em mobile, tablet e desktop.

### 5.1 Breakpoints principais
- Mobile: `< 640px` — layout single column, vídeo hero com altura reduzida
- Tablet: `640px–1024px` — ajustes de grid e tipografia
- Desktop: `> 1024px` — layout completo

### 5.2 Checklist de refinamento
- [ ] Testar todos os textos com tamanhos reais (não lorem ipsum)
- [ ] Verificar contraste de cores em todos os fundos
- [ ] Adicionar `loading="lazy"` em todas as imagens
- [ ] Otimizar vídeo hero (formato `.webm` + fallback `.mp4`)
- [ ] Testar animações com `prefers-reduced-motion`
- [ ] Adicionar `meta` tags de SEO no `layout.tsx`
- [ ] Favicon e `og:image`

---

## Etapa 6 — Deploy na Vercel

**Objetivo:** Site no ar vinculado ao domínio `oficinacigarra`.

### 6.1 Repositório já existente
O repositório `site-entalhe` já está no GitHub em [github.com/cvilelams/site-entalhe](https://github.com/cvilelams/site-entalhe).

Garantir que o branch principal está atualizado antes do deploy:
```bash
git add . && git commit -m "feat: landing page completa"
git push origin main
```

### 6.2 Configurar na Vercel
1. Acessar [vercel.com](https://vercel.com) → **Add New Project**
2. Selecionar o repositório `cvilelams/site-entalhe` da sua conta GitHub
3. Adicionar variáveis de ambiente (as mesmas do `.env.local`)
4. Deploy automático — a cada `git push` na branch `main` o site atualiza sozinho

### 6.3 Configurar domínio customizado
1. No painel da Vercel → Settings → Domains
2. Adicionar o domínio `entalhecomfaca.oficinacigarra.com.br`
3. Configurar DNS: criar registro **CNAME** apontando `entalhecomfaca` → `cname.vercel-dns.com` no painel do seu provedor de domínio (Registro.br, Cloudflare, GoDaddy etc.)

---

## Ordem Recomendada de Execução no Cursor

```
Etapa 0 → Etapa 1 → Etapa 2 → Etapa 3 (seções uma a uma) → Etapa 4 → Etapa 5 → Etapa 6
```

Sugestão de prompts para o Cursor Agent em cada etapa:

- **Etapa 0:** *"Clone o repositório https://github.com/cvilelams/site-entalhe e configure Tailwind e shadcn/ui seguindo este plano, incluindo os tokens de design japonês no tailwind.config.ts"*
- **Etapa 1:** *"Crie as tabelas no Supabase conforme o schema do plano e configure o cliente Supabase no projeto"*
- **Etapa 2:** *"Crie as API Routes de content e upload com proteção por senha via header"*
- **Etapa 3:** *"Crie a seção Hero com vídeo de fundo, buscando dados do Supabase server-side"* (repetir por seção)
- **Etapa 4:** *"Crie o painel admin em /admin com login por senha e editor para a seção X"*

---

## Resumo Técnico

| Item | Decisão |
|------|---------|
| Repositório | [github.com/cvilelams/site-entalhe](https://github.com/cvilelams/site-entalhe) |
| Framework | Next.js 14 — App Router |
| Estilo | Tailwind CSS + shadcn/ui |
| Banco | Supabase (PostgreSQL) |
| Storage | Supabase Storage (bucket público) |
| Auth Admin | Senha simples via env var + sessionStorage |
| Animações | Framer Motion (fade suave) |
| Fontes | Cormorant Garamond + Inter + Noto Serif JP |
| Deploy | Vercel |
| CTA | Botão externo (URL configurável no admin) |
| Instrutoras | 2 perfis editáveis |
| Visibilidade de seções | Toggle individual por seção via painel admin |
| Manutenção | Interface visual, sem código |
