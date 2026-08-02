/* Servidor estático mínimo para ver o site no computador, sem instalar nada.
   Uso:  node servidor-local.mjs      →  http://localhost:4321
   Este ficheiro NÃO faz parte do site publicado. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const RAIZ = import.meta.dirname;
const PORTA = Number(process.env.PORT) || 4321;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (caminho.endsWith('/')) caminho += 'index.html';

    const alvo = join(RAIZ, normalize(caminho).replace(/^(\.\.[/\\])+/, ''));
    if (!alvo.startsWith(RAIZ)) {
      res.writeHead(403).end('Proibido');
      return;
    }

    const info = await stat(alvo).catch(() => null);
    if (!info || info.isDirectory()) {
      const erro = await readFile(join(RAIZ, '404.html')).catch(() => Buffer.from('404'));
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end(erro);
      return;
    }

    const corpo = await readFile(alvo);
    res.writeHead(200, {
      'content-type': TIPOS[extname(alvo).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-store',
    }).end(corpo);
  } catch (e) {
    res.writeHead(500).end(String(e));
  }
}).listen(PORTA, () => {
  console.log(`AJT Seguros a correr em http://localhost:${PORTA}`);
});
