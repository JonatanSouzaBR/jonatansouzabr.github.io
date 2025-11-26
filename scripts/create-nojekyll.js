const fs = require('fs');
const path = require('path');

// Aceita um caminho como argumento ou usa o padrão
const targetPath = process.argv[2] || path.join(__dirname, '..', 'dist', 'mentormatch');
const nojekyllPath = path.join(targetPath, '.nojekyll');

// Criar o diretório se não existir
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true });
}

// Criar o arquivo .nojekyll
fs.writeFileSync(nojekyllPath, '', 'utf8');
console.log('✓ Arquivo .nojekyll criado em:', nojekyllPath);

// Também criar o 404.html se o index.html existir
const indexPath = path.join(targetPath, 'index.html');
const error404Path = path.join(targetPath, '404.html');

if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  fs.writeFileSync(error404Path, indexContent, 'utf8');
  console.log('✓ Arquivo 404.html criado em:', error404Path);
}

