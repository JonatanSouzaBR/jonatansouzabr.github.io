#!/bin/bash

# Script para deploy manual no GitHub Pages via branch gh-pages

set -e

echo "🚀 Iniciando deploy manual para GitHub Pages..."

# Fazer build
echo "📦 Fazendo build de produção..."
npm run build:prod

# Verificar se o build foi criado
if [ ! -d "dist/mentormatch" ]; then
  echo "❌ Erro: Pasta dist/mentormatch não encontrada!"
  exit 1
fi

# Salvar a branch atual
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branch atual: $CURRENT_BRANCH"

# Criar ou fazer checkout da branch gh-pages
echo "🌿 Preparando branch gh-pages..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
  git pull origin gh-pages 2>/dev/null || true
else
  git checkout --orphan gh-pages
  git rm -rf . 2>/dev/null || true
fi

# Limpar a branch (exceto .git)
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'dist' -exec rm -rf {} + 2>/dev/null || true

# Copiar arquivos do build
echo "📋 Copiando arquivos do build..."
cp -r dist/mentormatch/* .
cp dist/mentormatch/.nojekyll . 2>/dev/null || touch .nojekyll
cp dist/mentormatch/404.html . 2>/dev/null || cp index.html 404.html

# Adicionar arquivos
git add -A

# Commit
if git diff --staged --quiet; then
  echo "ℹ️  Nenhuma mudança para commitar."
else
  echo "💾 Fazendo commit..."
  git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️  Nenhuma mudança para commitar"
fi

# Push para origin
echo "🚀 Fazendo push para origin/gh-pages..."
git push origin gh-pages --force

# Voltar para a branch original
git checkout $CURRENT_BRANCH

echo "✅ Deploy concluído com sucesso!"
echo "🌐 Seu site estará disponível em: https://jonatansouzabr.github.io/mentormatch.github.io/"
echo "⏳ Aguarde alguns minutos para o GitHub Pages atualizar."

