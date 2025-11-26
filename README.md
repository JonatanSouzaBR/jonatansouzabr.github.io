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

**IMPORTANTE:** Escolha uma das duas opções abaixo:

#### Opção 1: Usar Branch `gh-pages` (Recomendado)

1. **Configure o GitHub Pages:**
   - Vá em Settings → Pages no seu repositório
   - Em "Source", selecione:
     - **Branch**: `gh-pages`
     - **Folder**: `/ (root)`
   - Se a branch `gh-pages` não existir, ela será criada automaticamente no próximo passo

#### Opção 2: Usar Pasta `docs` na Branch Principal

Se você preferir usar a pasta `docs` na sua branch principal (main/master):

1. **Configure o GitHub Pages:**
   - Vá em Settings → Pages no seu repositório
   - Em "Source", selecione:
     - **Branch**: `main` (ou `master`)
     - **Folder**: `/docs`
   
2. **Use o script de deploy para pasta docs:**
   ```bash
   npm run deploy:docs
   git add docs
   git commit -m "Deploy para GitHub Pages"
   git push
   ```

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

### Solução de Problemas

#### Erro do Jekyll

Se você receber erros relacionados ao Jekyll (como "Jekyll::Converters::Scss encountered an error"), isso significa que o GitHub Pages está tentando processar seus arquivos com Jekyll. A solução é garantir que o arquivo `.nojekyll` esteja presente:

1. **Se estiver usando a branch `gh-pages`:**
   - O arquivo `.nojekyll` é criado automaticamente pelo script `deploy`
   - Verifique se o script está sendo executado corretamente

2. **Se estiver usando a pasta `docs`:**
   - Use o script `deploy:docs` que cria o arquivo automaticamente
   - Ou crie manualmente: `touch docs/.nojekyll` e faça commit

3. **Verificar se o arquivo existe:**
   ```bash
   # Para branch gh-pages
   ls -la dist/mentormatch/.nojekyll
   
   # Para pasta docs
   ls -la docs/.nojekyll
   ```

### Notas Importantes

- O `baseHref` está configurado como `/` para repositórios `username.github.io`
- Se o repositório tiver um nome diferente (não for `username.github.io`), ajuste o `baseHref` no comando:
  ```bash
  ng build --configuration production --base-href "/nome-do-repositorio/"
  ```
- O `angular-cli-ghpages` cria automaticamente a branch `gh-pages` se ela não existir
- O arquivo `.nojekyll` é criado automaticamente após cada build para desabilitar o processamento do Jekyll no GitHub Pages (evita erros com arquivos que começam com `_`)
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

