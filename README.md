# Uruz AI — Site Institucional

Site institucional da **Uruz AI Consultoria Estratégica**.

## Stack

- HTML5 semântico
- CSS3 com custom properties (sem framework)
- JavaScript vanilla (sem dependências)
- Formulário via [Web3Forms](https://web3forms.com) (gratuito, sem backend)
- Hospedagem: GitHub Pages
- Domínio: `uruzconsultoria.com.br`

## Setup — Passo a passo

### 1. Configurar o formulário de contato

1. Acesse [web3forms.com](https://web3forms.com)
2. Clique em **"Get your Access Key"**
3. Informe o e-mail que vai receber os contatos
4. Copie o `access_key` gerado
5. Abra `index.html` e localize:
   ```html
   <input type="hidden" name="access_key" value="SEU_ACCESS_KEY_WEB3FORMS_AQUI">
   ```
6. Substitua `SEU_ACCESS_KEY_WEB3FORMS_AQUI` pelo valor copiado

### 2. Atualizar informações de contato

Em `index.html`, atualize:
- E-mail: `contato@uruzconsultoria.com.br` (buscar por `mailto:`)
- LinkedIn: `https://linkedin.com/company/uruzai` (buscar por `linkedin.com`)

### 3. Deploy no GitHub Pages

1. Criar repositório no GitHub (pode ser privado com GitHub Pro)
2. Subir os arquivos desta pasta na branch `main`
3. Settings → Pages → Source: Deploy from branch `main` / `/ (root)`
4. Aguardar ~1-2 minutos para o site ir ao ar em `https://thiagocolombosilva.github.io/<repo>/`

### 4. Configurar domínio customizado

1. O arquivo `CNAME` já contém `uruzconsultoria.com.br` — não alterar
2. No painel DNS do seu registrador (Registro.br / Cloudflare):

**Registros A (aponta `@` para GitHub Pages):**
```
A  @  185.199.108.153
A  @  185.199.109.153
A  @  185.199.110.153
A  @  185.199.111.153
```

**Registro CNAME (aponta `www` para GitHub Pages):**
```
CNAME  www  thiagocolombosilva.github.io
```

3. Settings → Pages → Custom domain → digitar `uruzconsultoria.com.br` → Save
4. Marcar **Enforce HTTPS** ✅

DNS pode levar até 24h para propagar.

### 5. Favicons e Open Graph

Adicionar em `assets/img/`:
- `favicon-32.png` (32×32px) — ícone ᚢ em teal sobre fundo escuro
- `apple-touch-icon.png` (180×180px) — mesmo conceito sem transparência
- `og-image.jpg` (1200×630px) — imagem de preview para compartilhamento

Use o prompt do BRAND.md ou contrate designer para criar esses assets.

## Estrutura de Arquivos

```
site/
  index.html              ← página principal (single-page)
  CNAME                   ← domínio customizado
  .gitignore
  README.md               ← este arquivo
  DEVELOPMENT.md          ← contexto completo para IA continuar o projeto
  BRAND.md                ← identidade visual de referência
  assets/
    css/
      style.css           ← todos os estilos, custom properties no :root
    js/
      main.js             ← nav, scroll animations, formulário
    img/                  ← favicons, og-image (adicionar manualmente)
```

## Desenvolvimento Local

Não precisa de servidor. Abra `index.html` diretamente no browser.

Para testar o formulário localmente: a chamada vai para a API do Web3Forms, precisa de internet e de uma access key configurada.
