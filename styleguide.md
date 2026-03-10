# Entalhe com Faca — Style Guide para o Cursor AI

> Cole este arquivo na raiz do projeto como `styleguide.md`.
> O Cursor vai usá-lo como contexto ao gerar componentes e estilos.

---

## Projeto

**Nome:** Entalhe com Faca  
**Tipo:** Landing page de venda — curso online de entalhe em madeira  
**Público:** Mulheres iniciantes, sem experiência, buscando hobby criativo  
**Tom:** Acolhedor, artesanal, descontraído e próximo  
**Referência visual:** barnthespoon.com — espaço generoso, fotografia artesanal, tipografia expressiva

---

## Stack

- React + Tailwind CSS
- Fontes: `Montserrat` (títulos/botões) e `Inter` (corpo) via Google Fonts

Adicione no `index.html` ou no `layout.tsx`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```

---

## Cores (tokens Tailwind)

| Token                  | Hex       | Uso principal                          |
|------------------------|-----------|----------------------------------------|
| `verde-musgo`          | #5C946D   | Botão primário, ícones, destaques      |
| `verde-folha`          | #9EB04C   | Botão secundário, badges, links ativos |
| `terracota`            | #C65B2C   | Títulos, destaques, divisória          |
| `cinza`                | #595959   | Texto corrido, subtítulos              |
| `fundo`                | #FCFCFC   | Fundo principal da página              |
| `fundo-off`            | #F4F0EB   | Seções alternadas, cards               |

---

## Tipografia

### Regras gerais
- **Títulos e botões** → sempre `font-titulo` (Montserrat)
- **Texto corrido e captions** → sempre `font-corpo` (Inter)
- Títulos principais → `uppercase`, `tracking-tight` ou `tracking-tighter`
- Labels/eyebrows → `uppercase`, `tracking-widest`, `text-verde-musgo`

### Escala

```jsx
// Display / Hero
<h1 className="font-titulo font-black text-display uppercase tracking-tighter text-terracota">
  Entalhe com Faca
</h1>

// H1 — Título principal de seção
<h1 className="font-titulo font-extrabold text-h1 tracking-tight text-terracota">
  Aprenda a entalhar com suas próprias mãos
</h1>

// H2 — Subtítulo de seção
<h2 className="font-titulo font-bold text-h2 text-cinza">
  O que você vai aprender no curso
</h2>

// H3 — Título de card
<h3 className="font-titulo font-semibold text-h3 text-cinza">
  Módulo 1 — Ferramentas e segurança
</h3>

// Body — Texto corrido
<p className="font-corpo font-light text-body text-cinza">
  Do primeiro corte à peça finalizada...
</p>

// Caption / Small
<p className="font-corpo text-sm-body text-gray-400">
  *Acesso vitalício após a compra.
</p>

// Label / Eyebrow
<span className="font-titulo font-bold text-label uppercase tracking-widest text-verde-musgo">
  Curso Online · Para Iniciantes
</span>
```

---

## Botões

```jsx
// Primário — ação principal da página
<button className="font-titulo font-bold text-label uppercase tracking-wider
  bg-verde-musgo text-white px-8 py-4 rounded-sm
  transition-all duration-200
  hover:-translate-y-px hover:shadow-btn hover:bg-[#4e8160]">
  Quero começar agora
</button>

// Secundário
<button className="font-titulo font-bold text-label uppercase tracking-wider
  bg-verde-folha text-white px-8 py-4 rounded-sm
  transition-all duration-200
  hover:-translate-y-px hover:shadow-btn-2 hover:bg-[#8da040]">
  Ver conteúdo do curso
</button>

// Outline
<button className="font-titulo font-bold text-label uppercase tracking-wider
  border-2 border-terracota text-terracota px-8 py-4 rounded-sm
  transition-all duration-200
  hover:bg-terracota hover:text-white">
  Saiba mais
</button>

// Ghost
<button className="font-titulo font-bold text-label uppercase tracking-wider
  border border-gray-300 text-cinza px-8 py-4 rounded-sm
  transition-all duration-200
  hover:border-cinza">
  Voltar
</button>
```

---

## Componentes

### Card de Módulo
```jsx
<div className="bg-white border border-[#ede8e1] rounded-md shadow-card overflow-hidden">
  <div className="h-32 bg-fundo-off bg-hatch-verde flex items-center justify-center">
    {/* imagem ou ícone */}
  </div>
  <div className="p-5">
    <span className="font-titulo font-bold text-label uppercase tracking-wider
      text-verde-musgo bg-[#e8f2ec] px-3 py-1 rounded-sm mb-3 inline-block">
      Módulo 1
    </span>
    <h3 className="font-titulo font-bold text-h3 text-cinza mb-2">
      Escolhendo a madeira certa
    </h3>
    <p className="font-corpo font-light text-sm-body text-gray-400 leading-relaxed">
      Aprenda a identificar as melhores madeiras para iniciantes.
    </p>
  </div>
</div>
```

### Depoimento
```jsx
<blockquote className="bg-fundo-off border-l-4 border-terracota pl-5 py-5 pr-5 rounded-r-md">
  <p className="font-corpo font-light italic text-body text-cinza mb-3">
    "Nunca imaginei que conseguiria fazer uma colher tão bonita logo na primeira semana!"
  </p>
  <cite className="font-titulo font-bold text-label uppercase tracking-wider text-verde-musgo not-italic">
    — Mariana S., aluna
  </cite>
</blockquote>
```

### Badge
```jsx
// Verde
<span className="font-titulo font-bold text-label uppercase tracking-wider
  text-verde-musgo bg-[#e8f2ec] px-3 py-1 rounded-sm">
  Para iniciantes
</span>

// Terracota
<span className="font-titulo font-bold text-label uppercase tracking-wider
  text-terracota bg-[#faeae3] px-3 py-1 rounded-sm">
  Online
</span>
```

### Input de formulário
```jsx
<div>
  <label className="font-titulo font-bold text-label uppercase tracking-wider text-cinza block mb-2">
    Seu melhor e-mail
  </label>
  <input
    type="email"
    placeholder="voce@email.com"
    className="font-corpo font-light text-body text-cinza
      border border-[#d5cec6] rounded-sm px-4 py-3 w-full bg-white
      outline-none transition-colors duration-200
      focus:border-verde-musgo"
  />
</div>
```

### Divisor decorativo (hachura de madeira)
```jsx
<div className="w-full h-px"
  style={{
    background: "repeating-linear-gradient(90deg, #c65b2c 0px, #c65b2c 24px, transparent 24px, transparent 30px)",
    opacity: 0.4
  }}
/>
```

---

## Texturas de fundo (use como className ou style)

```jsx
// Hachura suave verde — fundo de seções e cards
className="bg-fundo-off bg-hatch-verde"

// Gradiente cedro-rosa — hero ou seções de destaque
className="bg-cedro-gradient"
```

---

## Espaçamento de seções

- Padding vertical de seção: `py-20` (80px) no mínimo
- Entre título e conteúdo: `mb-8` ou `mb-12`
- Entre cards em grid: `gap-6`
- Container máximo: `max-w-5xl mx-auto px-8`

---

## Tom de Voz (para textos e copy)

✅ **Use:**
- Linguagem próxima e calorosa — como uma amiga que convida
- "Você vai aprender", "é mais fácil do que parece"
- Palavras do artesanato: faca, madeira, veio, entalhar, afiar
- Referências ao cotidiano: fim de semana, sua casa, seu ritmo

❌ **Evite:**
- Jargão técnico sem explicação
- Tom corporativo: "adquira", "contrate", "solução"
- Urgência agressiva: "últimas vagas!!!", "oferta expira em 1h"
- Linguagem masculinizada

---

## Checklist antes de criar um componente novo

- [ ] Usei `font-titulo` em títulos e botões?
- [ ] Usei `font-corpo font-light` no texto corrido?
- [ ] As cores seguem os tokens (`text-terracota`, `bg-verde-musgo`, etc.)?
- [ ] Botões têm `uppercase tracking-wider` e `rounded-sm`?
- [ ] A seção tem pelo menos `py-20`?
- [ ] O container usa `max-w-5xl mx-auto px-8`?
