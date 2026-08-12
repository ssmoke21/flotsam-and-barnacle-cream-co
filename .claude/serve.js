// Tiny zero-dependency static server so the game runs as a real interactive page
// (file:// previews render as static snapshots). Started via .claude/launch.json.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8123;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

// Dev convenience: the page can POST a canvas dataURL here and it lands in
// .claude/shots/<name>.png, so a frame can be inspected without the browser
// pane being on screen.
function saveShot(req, res) {
  let body = '';
  req.on('data', c => { body += c; if (body.length > 8e6) req.destroy(); });
  req.on('end', () => {
    try {
      const { name, data } = JSON.parse(body);
      const safe = String(name || 'shot').replace(/[^a-z0-9_-]/gi, '');
      const dir = path.join(__dirname, 'shots');
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, safe + '.png'),
                       Buffer.from(String(data).split(',').pop(), 'base64'));
      res.writeHead(200); res.end('saved ' + safe + '.png');
    } catch (e) { res.writeHead(400); res.end('bad shot: ' + e.message); }
  });
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.split('?')[0] === '/__shot') return saveShot(req, res);
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  const file = path.resolve(ROOT, '.' + rel);
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found: ' + rel); return; }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',   // always serve the latest edit
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Flotsam & Barnacle Cream Co. serving ' + ROOT);
  console.log('http://localhost:' + PORT);
});
