# Oficina Cigarra - Site Entalhe

Landing page institucional da Oficina Cigarra com area administrativa simples para editar conteudo e controlar visibilidade de secoes.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI (primitivos do shadcn)
- Montserrat + Inter (tipografia)
- Supabase (pronto para integracao)

## Design System (Style Guide)

O projeto segue o guia definido em `styleguide.md` e tokens em `tailwind.config.ts`.

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
ADMIN_PASSWORD=
```

3. Inicie o servidor:

```bash
npm run dev
```

4. Acesse:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
