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

O projeto está configurado para deploy automático no GitHub Pages através do GitHub Actions.

### Configuração Automática (Recomendado)

1. **Habilite o GitHub Pages no repositório:**
   - Vá em Settings → Pages
   - Em "Source", selecione "GitHub Actions"

2. **Faça push para a branch `main` ou `master`:**
   - O workflow será executado automaticamente
   - O site estará disponível em `https://jonatansouzabr.github.io`

### Deploy Manual

Se preferir fazer deploy manual:

```bash
# 1. Fazer build para GitHub Pages
npm run build:github

# 2. Copiar conteúdo de dist/mentormatch para a branch gh-pages
# (ou usar a interface do GitHub para fazer upload)
```

### Notas Importantes

- O `baseHref` está configurado como `/` para repositórios `username.github.io`
- Se o repositório tiver um nome diferente, ajuste o `baseHref` no `angular.json`
- O arquivo `.nojekyll` garante que o GitHub Pages não processe os arquivos com Jekyll

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

