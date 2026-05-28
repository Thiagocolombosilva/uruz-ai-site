# DEVELOPMENT.md — Uruz AI Site

> Este arquivo é o contexto completo para qualquer IA ou desenvolvedor continuar o projeto sem briefing adicional.

---

## O que é este projeto

Site institucional single-page da **Uruz AI Consultoria Estratégica** — empresa de consultoria em IA para médias e grandes empresas (rede: Itaú, COMNEcT, Citel).

## Stack

| Tecnologia | Versão / Detalhe |
|---|---|
| HTML | HTML5 semântico |
| CSS | CSS3 com custom properties, mobile-first |
| JavaScript | Vanilla ES6+, strict mode, sem dependências |
| Formulário | Web3Forms (API pública, gratuita) |
| Fontes | Google Fonts: Cinzel + Inter |
| Hospedagem | GitHub Pages (branch main, raiz) |
| Domínio | `uruzai.com.br` (CNAME configurado) |

## Identidade Visual

Ver `BRAND.md` para referência completa. Resumo:

```css
--fundo:      #0D1A13;  /* Carvão Nórdico */
--verde:      #1A4A32;  /* Verde Floresta */
--azul:       #1B3A5C;  /* Azul Ártico */
--teal:       #2DA587;  /* Teal Druídico — acento principal */
--pedra:      #E8E2D9;  /* Texto sobre fundo escuro */
```

Fontes: **Cinzel** (headlines, rústico/ancestral) + **Inter** (corpo, moderno)

Símbolo principal: **ᚢ** (runa Uruz, Unicode: U+16C2)

## Seções do Site

| Seção | ID | Conteúdo |
|---|---|---|
| Navegação | `nav.nav` | Logo + links + CTA "Vamos Conversar" |
| Hero | `#home` | Badge, headline "Do Caos à Forma.", 2 CTAs |
| Clientes | `.clientes` | 3 nomes: Itaú, COMNEcT, Citel |
| Sobre | `#sobre` | Runa, origem Elder Futhark, 4 atributos |
| Serviços | `#servicos` | 3 cards: Estratégia, Implementação, Mentoria |
| Metodologia | `#metodologia` | 4 steps: Diagnóstico → Estratégia → Implementação → Produção |
| Contato | `#contato` | Info + formulário (Web3Forms) |
| Footer | `footer.footer` | Logo, nav, contato, copyright dinâmico |

## Formulário de Contato

**Provider:** Web3Forms (https://web3forms.com)

**Onde configurar:**
- Arquivo: `index.html`
- Linha: `<input type="hidden" name="access_key" value="SEU_ACCESS_KEY_WEB3FORMS_AQUI">`
- Ação: criar conta em web3forms.com → adicionar e-mail → copiar access key

**E-mail que recebe:** `contato@uruzai.com.br` (configurado no Web3Forms dashboard)

**Campos do formulário:**
- `name` (required) — texto, max 100 chars
- `company` — texto, max 100 chars
- `email` (required) — validação por regex no JS
- `phone` — validação de telefone BR no JS
- `service` — select de serviços
- `message` (required) — textarea, max 2000 chars
- `botcheck` — honeypot anti-spam (oculto)

**Segurança:**
- Honeypot: `input[name="botcheck"]` — se checked, envia é ignorado no JS
- Validação client-side antes do fetch
- `maxlength` em todos os inputs
- `novalidate` no form — validação feita pelo JS customizado

## JavaScript — Módulos em main.js

| Função | Descrição |
|---|---|
| `initNav()` | Scroll class, hambúrguer mobile, fechar ao clicar fora |
| `initScrollAnimations()` | IntersectionObserver para `.fade-in` → `.visible` |
| `initSmoothScroll()` | Scroll suave com offset da nav fixa |
| `initContactForm()` | Validação, honeypot, fetch Web3Forms, feedback |
| `setYear()` | Ano dinâmico no `#footer-year` |

## Acessibilidade

- HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- `aria-label` em nav, form, footer
- `aria-expanded` no botão hambúrguer
- `role="alert"` + `aria-live="polite"` no status do formulário
- `aria-hidden="true"` em elementos decorativos (runa de fundo, ícones)
- `prefers-reduced-motion` desativa animações quando preferido
- Contraste WCAG AA validado em todos os pares de texto/fundo

## Performance

- Google Fonts com `display=swap`
- JS com `defer`
- Sem frameworks ou bibliotecas externas
- CSS sem dependências de build
- Animações com CSS transitions (GPU-accelerated)

## Segurança

- Content Security Policy via meta tag
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restringindo câmera, microfone, geolocalização
- `sanitize()` no JS (escapa HTML de dados de usuário)
- Honeypot no formulário
- `rel="noopener noreferrer"` em links externos

## Deploy

- Branch: `main`
- Folder: `/ (root)`
- CNAME: `uruzai.com.br`
- HTTPS: Enforce HTTPS ✅

## Pendências / Próximos Passos

- [ ] **OBRIGATÓRIO:** Substituir `SEU_ACCESS_KEY_WEB3FORMS_AQUI` em `index.html` pela access key real
- [ ] Criar e adicionar `assets/img/favicon-32.png` (32×32px)
- [ ] Criar e adicionar `assets/img/apple-touch-icon.png` (180×180px)
- [ ] Criar e adicionar `assets/img/og-image.jpg` (1200×630px)
- [ ] Atualizar e-mail de contato em `index.html` quando definido
- [ ] Atualizar URL do LinkedIn em `index.html` quando criado
- [ ] Confirmar domínio `uruzai.com.br` e configurar DNS
- [ ] Testar formulário com access key real em staging antes do go-live
- [ ] Logo vetorial da marca (quando criado) — substituir o ᚢ textual por SVG
- [ ] Adicionar Google Analytics ou Plausible quando definido

## Histórico de Mudanças

| Data | O que foi feito | Por quê |
|---|---|---|
| 2026-05-28 | Criação do site v1.0 | Site institucional inicial da Uruz AI |
| 2026-05-28 | Agente de desenvolvimento criado | Documentar padrões para continuidade por IA |
