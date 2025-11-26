# MentorMatch

Uma plataforma premium que conecta mentores e mentorados através de masterclasses exclusivas e mentoria personalizada.

## 🚀 Tecnologias

- **Angular 18** - Framework frontend moderno
- **Tailwind CSS** - Framework CSS utilitário para design premium
- **TypeScript** - Tipagem estática
- **Cormorant Garamond** - Fonte serif premium (estilo jornal)

## 🎨 Design

O site foi desenvolvido com um design premium inspirado no MasterClass:
- Fundo preto (#000000)
- Texto branco (#FFFFFF)
- Fonte serif elegante (Cormorant Garamond)
- Interface limpa e moderna
- Totalmente responsivo

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build

# Build para GitHub Pages
npm run build:github
```

## 🚀 Deploy no GitHub Pages

### Configuração no GitHub

1. **Configure o GitHub Pages:**
   - Vá em Settings → Pages no seu repositório
   - Em "Source", selecione:
     - **Branch**: `gh-pages`
     - **Folder**: `/ (root)`
   - Se a branch `gh-pages` não existir, ela será criada automaticamente no próximo passo

### Deploy Automatizado (Recomendado)

O projeto inclui um script que faz tudo automaticamente:

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Fazer build e deploy em um único comando
npm run deploy
```

Este comando irá:
1. Gerar o build de produção com o `base-href` correto (`/`)
2. Publicar automaticamente na branch `gh-pages`

### Deploy Manual (Passo a Passo)

Se preferir fazer manualmente:

```bash
# 1. Gerar o build Angular com o base-href correto
npm run build:prod
# ou
ng build --configuration production --base-href "/"

# 2. Publicar o build na branch gh-pages (com suporte para desabilitar Jekyll)
npx angular-cli-ghpages --dir=dist/mentormatch --nojekyll
```

### Notas Importantes

- O `baseHref` está configurado como `/` para repositórios `username.github.io`
- Se o repositório tiver um nome diferente (não for `username.github.io`), ajuste o `baseHref` no comando:
  ```bash
  ng build --configuration production --base-href "/nome-do-repositorio/"
  ```
- O `angular-cli-ghpages` cria automaticamente a branch `gh-pages` se ela não existir
- O arquivo `.nojekyll` é criado automaticamente para desabilitar o processamento do Jekyll no GitHub Pages (evita erros com arquivos que começam com `_`)
- Após o deploy, aguarde alguns minutos para o GitHub Pages atualizar o site

## 🎯 Funcionalidades

### Para Usuários
- Navegação por masterclasses disponíveis
- Visualização detalhada de cada masterclass
- Sistema de categorias e filtros
- Design premium e intuitivo

### Para Mentores
- Dashboard completo para gerenciamento
- Upload de vídeos de masterclass
- Estatísticas de visualizações e receita
- Gerenciamento de conteúdo publicado

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   └── footer/
│   ├── pages/
│   │   ├── home/
│   │   ├── masterclasses/
│   │   ├── masterclass-detail/
│   │   └── mentor-dashboard/
│   ├── app.component.ts
│   └── app.routes.ts
├── styles.scss
└── main.ts
```

## 🎨 Paleta de Cores

- **Premium Black**: #000000
- **Premium White**: #FFFFFF
- **Premium Gray**: #1a1a1a

## 📝 Próximos Passos

- [ ] Integração com backend
- [ ] Sistema de autenticação
- [ ] Player de vídeo integrado
- [ ] Sistema de pagamento
- [ ] Área de mentorados
- [ ] Sistema de avaliações

## 👨‍💻 Desenvolvido com

Angular 18 + Tailwind CSS + TypeScript

