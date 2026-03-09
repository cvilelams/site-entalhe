# Oficina Cigarra - Site Entalhe

Landing page institucional da Oficina Cigarra com area administrativa simples para editar conteudo e controlar visibilidade de secoes.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Supabase (pronto para integracao)

## Estrutura principal

```text
app/
  admin/
    page.tsx                 # login admin
    dashboard/page.tsx       # painel de conteudo
  api/
    content/route.ts         # GET/PUT conteudo
    visibility/route.ts      # GET/PUT visibilidade
    upload/route.ts          # POST upload (validacao de tipo/tamanho)
  globals.css
  layout.tsx
  page.tsx                   # landing principal
components/
  Footer.tsx
lib/
  api/guards.ts
  content/schema.ts
  content/store.ts           # fallback local em memoria
  constants.ts
  landing-data.ts            # dados iniciais
  supabase.ts
```

## Requisitos

- Node.js 18+ (recomendado LTS)
- npm

## Como rodar localmente

1. Instale dependencias:

```bash
npm install
```

2. Crie o arquivo `.env.local` (base no `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=troque-esta-senha
```

3. Inicie o servidor:

```bash
npm run dev
```

4. Acesse:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Scripts

- `npm run dev` - ambiente de desenvolvimento
- `npm run build` - build de producao
- `npm run start` - sobe app buildada
- `npm run lint` - lint do projeto

## Fluxo de conteudo

- O frontend usa fallback local via `lib/content/store.ts`.
- As rotas `PUT` exigem header `x-admin-password`.
- Enquanto Supabase nao estiver configurado, o projeto continua funcional para validacao local.

## Endpoints

### `GET /api/content`
Retorna conteudo atual das secoes e colecoes.

### `PUT /api/content`
Atualiza campo de uma secao.

Payload:

```json
{
  "section": "hero",
  "key": "title",
  "value": "Novo titulo"
}
```

### `GET /api/visibility`
Retorna lista de secoes com `is_visible`.

### `PUT /api/visibility`
Atualiza visibilidade de uma secao.

Payload:

```json
{
  "section": "faq",
  "is_visible": false
}
```

### `POST /api/upload`
Recebe `FormData` com `file` e valida:
- tipos permitidos (imagem/video configurados em `lib/constants.ts`)
- tamanho maximo (`MAX_UPLOAD_MB`)

## Publicacao

Fluxo recomendado:

1. `npm run build`
2. Commit/push para GitHub
3. Deploy na Vercel com as mesmas variaveis de ambiente do `.env.local`

## Status atual

- Landing completa
- Admin basico funcional
- APIs de conteudo, visibilidade e upload implementadas
- Projeto pronto para evoluir com persistencia real no Supabase
