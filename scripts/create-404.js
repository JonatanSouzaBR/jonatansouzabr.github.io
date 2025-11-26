const fs = require('fs');
const path = require('path');

// Aceita um caminho como argumento ou usa o padrão
const targetPath = process.argv[2] || path.join(__dirname, '..', 'dist', 'mentormatch');
const indexPath = path.join(targetPath, 'index.html');
const error404Path = path.join(targetPath, '404.html');

// Verificar se o index.html existe
if (!fs.existsSync(indexPath)) {
  console.error('❌ Erro: index.html não encontrado em:', indexPath);
  console.error('   Execute o build primeiro: npm run build:prod');
  process.exit(1);
}

// Ler o conteúdo do index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Criar o 404.html com o mesmo conteúdo do index.html
// Isso faz com que o GitHub Pages redirecione todas as rotas para o index.html
fs.writeFileSync(error404Path, indexContent, 'utf8');
console.log('✓ Arquivo 404.html criado em:', error404Path);
console.log('  (Necessário para SPAs Angular no GitHub Pages)');

