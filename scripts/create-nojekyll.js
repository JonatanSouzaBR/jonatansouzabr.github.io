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

