const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const out = path.join(root, 'dist');
const requiredFiles = ['index.html', 'style.css', 'app.js', 'robots.txt'];
if (path.basename(out) !== 'dist' || path.dirname(path.resolve(out)) !== path.resolve(root)) {
  throw new Error('Diretório de build inesperado; interrompendo para proteger outros arquivos.');
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Arquivo necessário ausente: ${file}`);
  }
}

const source = requiredFiles.map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const assetReferences = [...source.matchAll(/assets\/([\w.-]+)/g)].map(match => match[1]);
for (const asset of new Set(assetReferences)) {
  if (!fs.existsSync(path.join(root, 'assets', asset))) {
    throw new Error(`Asset referenciado e ausente: assets/${asset}`);
  }
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const file of requiredFiles) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}
for (const asset of new Set(assetReferences)) {
  const target = path.join(out, 'assets', asset);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, 'assets', asset), target);
}

if (process.env.SITE_URL) {
  const configuredUrl = new URL(process.env.SITE_URL);
  if (!['http:', 'https:'].includes(configuredUrl.protocol)) {
    throw new Error('SITE_URL deve começar com http:// ou https://');
  }
  configuredUrl.hash = '';
  configuredUrl.search = '';
  const siteUrl = configuredUrl.href.endsWith('/') ? configuredUrl.href : `${configuredUrl.href}/`;
  const builtIndex = path.join(out, 'index.html');
  let html = fs.readFileSync(builtIndex, 'utf8');
  html = html.replace('content="assets/matozus-logo-transparent.png"', `content="${new URL('assets/matozus-logo-transparent.png', siteUrl).href}"`);
  html = html.replace('</head>', `<link rel="canonical" href="${siteUrl}"><meta property="og:url" content="${siteUrl}"></head>`);
  fs.writeFileSync(builtIndex, html);
  fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url></urlset>\n`);
  const robotsPath = path.join(out, 'robots.txt');
  fs.appendFileSync(robotsPath, `Sitemap: ${new URL('sitemap.xml', siteUrl).href}\n`);
} else {
  fs.rmSync(path.join(out, 'sitemap.xml'), { force: true });
}
console.log(`Build estático criado em ${out}`);
