/* =====================================================================
   Flotsam & Barnacle Cream Co. — site pixel art
   ---------------------------------------------------------------------
   Hero-scale versions of the game's sprites, drawn with the same palette
   and the same chunky-rectangle technique used in game.html. Everything
   is code, so the site ships with zero image assets.
   ===================================================================== */
(function () {
'use strict';

const PAL = {
  cream:    '#ff6b9d', creamLt: '#ff8fb8', creamDk: '#c25a84', gloss: '#ffd6ec',
  cone:     '#d8a05e', coneDk: '#c2854a', coneLn: '#a86c38',
  sand:     '#e8d29a', sandDk: '#c9ad72', sandLt: '#efe0ac',
  sea:      '#2b7ea8', seaLt: '#7dc4dd', foam: '#eef7fa',
  weed:     '#4fbf74', weedLt: '#6ed491',
  shrimp:   '#ff9a6b', shrimpLt: '#ffb08c', shrimpDk: '#ff7a4a',
  shell:    '#e8dcc0', shellLt: '#f5f0dc', shellDk: '#b8a888',
  ink:      '#141a2e', slate: '#2c3e50', steel: '#8fa8b5',
  gold:     '#ffe14a', goldLt: '#fff8b8',
  cyan:     '#3fb8d4', cyanDk: '#2a8aa2', cyanNt: '#8fe8ff',
  crab:     '#e85d3a', crabDk: '#b8432a',
  kraken:   '#a55a80', krakenDk: '#8e4a6e',
  dragon:   '#35937f', dragonDk: '#2a7a6a', dragonMouth: '#0e3a30',
  surf:     '#7ec850', surfLt: '#8ed860',
  brick:    '#c0392b', white: '#ffffff', bone: '#f0e6d2',
};

/* Mount a pixel canvas into `el` and run `draw(P, t)` where P plots in
   sprite-space units. `anim` re-renders each frame. */
function pixelCanvas(el, w, h, scale, draw, anim) {
  const c = document.createElement('canvas');
  c.width = w * scale;
  c.height = h * scale;
  c.style.width = '100%';
  c.style.maxWidth = (w * scale) + 'px';
  c.style.height = 'auto';
  c.style.imageRendering = 'pixelated';
  el.appendChild(c);
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const P = (x, y, ww, hh, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x * scale), Math.round(y * scale),
                 Math.max(1, Math.round(ww * scale)), Math.max(1, Math.round(hh * scale)));
  };

  // Always paint one frame up front, so the art is present even if animation
  // never runs — hidden tab, reduced-motion, or no IntersectionObserver.
  draw(P, 0);
  if (!anim) return c;

  const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || typeof IntersectionObserver !== 'function') return c;

  let raf = null;
  const loop = (ms) => { ctx.clearRect(0, 0, c.width, c.height); draw(P, ms / 1000); raf = requestAnimationFrame(loop); };
  const io = new IntersectionObserver(([e]) => {          // only animate while on screen
    if (e.isIntersecting && raf === null) raf = requestAnimationFrame(loop);
    else if (!e.isIntersecting && raf !== null) { cancelAnimationFrame(raf); raf = null; }
  }, { rootMargin: '80px' });
  io.observe(c);
  return c;
}

/* ---------------------------------------------------------------- logo */
/* The house cone: waffle base, pink scoop, curled shrimp tail,
   seaweed frond and a barnacle cluster. Centered on (0,0)-ish at 24x40. */
function drawLogo(P, t) {
  const bob = Math.sin(t * 2) * 0.8;
  const cx = 22, cy = 20 + bob;

  for (let r = 0; r < 13; r++) {                      // waffle cone
    const half = 11 - r * 0.82;
    P(cx - half, cy + 11 + r, half * 2, 1, r % 2 ? PAL.coneDk : PAL.cone);
  }
  for (let i = -8; i <= 8; i += 4) P(cx + i, cy + 12, 1, 9, PAL.coneLn);

  P(cx - 13, cy + 1, 26, 10, PAL.cream);              // scoop
  P(cx - 11, cy - 3, 22, 5, PAL.cream);
  P(cx - 8, cy - 6, 16, 4, PAL.creamLt);
  P(cx - 5, cy - 8, 10, 3, PAL.creamLt);
  P(cx - 10, cy + 1, 7, 3, PAL.gloss);                // gloss
  P(cx - 8, cy + 5, 4, 2, PAL.gloss);
  P(cx + 8, cy + 4, 3, 3, PAL.creamDk);
  P(cx - 13, cy + 10, 3, 5, PAL.creamLt);             // drips
  P(cx + 10, cy + 10, 3, 6, PAL.creamLt);
  P(cx + 10, cy + 16, 3, 2, PAL.gloss);

  const sy = cy - 13 + Math.sin(t * 2.6) * 0.6;       // curled shrimp tail
  P(cx - 5, sy + 1, 4, 4, PAL.shrimp);
  P(cx - 1, sy - 1, 4, 4, PAL.shrimpLt);
  P(cx + 3, sy + 1, 4, 4, PAL.shrimp);
  P(cx + 6, sy + 4, 4, 4, PAL.shrimpDk);
  P(cx + 9, sy + 2, 3, 3, PAL.shrimpDk);              // fantail
  P(cx + 11, sy + 6, 3, 3, PAL.shrimpDk);
  P(cx - 7, sy + 4, 3, 3, PAL.shrimpLt);
  P(cx - 8, sy + 7, 2, 2, PAL.shrimpLt);
  P(cx, sy, 1, 1, '#5a2a1a');                         // eye

  P(cx - 12, cy - 9, 2, 7, PAL.weed);                 // seaweed frond
  P(cx - 15, cy - 6, 3, 2, PAL.weedLt);
  P(cx - 9, cy - 11, 3, 2, PAL.weedLt);
  P(cx - 14, cy - 13, 2, 5, PAL.weed);
  P(cx - 17, cy - 11, 3, 2, PAL.weedLt);
  P(cx - 12, cy - 16, 3, 2, PAL.weedLt);

  P(cx - 10, cy + 15, 6, 4, PAL.shell);               // barnacles on the cone
  P(cx - 8, cy + 14, 3, 1, PAL.shellLt);
  P(cx - 9, cy + 18, 4, 1, PAL.shellDk);
  P(cx + 4, cy + 19, 5, 4, PAL.shell);
  P(cx + 6, cy + 18, 2, 1, PAL.shellLt);
}

/* --------------------------------------------------------------- scoop */
/* A single scoop in a cone, tinted per flavor, with an optional garnish. */
function scoopSprite(color, dark, garnish) {
  return (P, t) => {
    const bob = Math.sin(t * 2.2) * 0.5;
    const cx = 14, cy = 14 + bob;
    for (let r = 0; r < 9; r++) {
      const half = 7 - r * 0.72;
      P(cx - half, cy + 7 + r, half * 2, 1, r % 2 ? PAL.coneDk : PAL.cone);
    }
    for (let i = -5; i <= 5; i += 3) P(cx + i, cy + 8, 1, 6, PAL.coneLn);
    P(cx - 9, cy - 1, 18, 8, color);
    P(cx - 7, cy - 4, 14, 4, color);
    P(cx - 4, cy - 6, 8, 3, color);
    P(cx - 7, cy - 1, 5, 2, 'rgba(255,255,255,0.55)');
    P(cx + 5, cy + 2, 3, 3, dark);
    P(cx - 9, cy + 6, 2, 4, color);
    P(cx + 7, cy + 6, 2, 5, color);

    if (garnish === 'shrimp') {
      P(cx - 3, cy - 10, 3, 3, PAL.shrimp); P(cx, cy - 11, 3, 3, PAL.shrimpLt);
      P(cx + 3, cy - 10, 3, 3, PAL.shrimp); P(cx + 5, cy - 8, 3, 3, PAL.shrimpDk);
    } else if (garnish === 'weed') {
      P(cx - 1, cy - 11, 2, 5, PAL.weed);
      P(cx - 4, cy - 9, 3, 2, PAL.weedLt); P(cx + 1, cy - 12, 3, 2, PAL.weedLt);
    } else if (garnish === 'crab') {
      P(cx - 4, cy - 10, 8, 4, PAL.crab);
      P(cx - 6, cy - 11, 3, 3, PAL.crab); P(cx + 3, cy - 11, 3, 3, PAL.crab);
      P(cx - 2, cy - 9, 1, 1, PAL.white); P(cx + 1, cy - 9, 1, 1, PAL.white);
    } else if (garnish === 'clam') {
      P(cx - 4, cy - 10, 8, 4, PAL.shell); P(cx - 3, cy - 12, 6, 2, PAL.shell);
      P(cx - 1, cy - 9, 2, 2, PAL.shellLt);
    } else if (garnish === 'barnacle') {
      P(cx - 5, cy - 9, 5, 3, PAL.shell); P(cx - 4, cy - 10, 3, 1, PAL.shellLt);
      P(cx + 1, cy - 10, 4, 4, PAL.shell); P(cx + 2, cy - 11, 2, 1, PAL.shellLt);
    } else if (garnish === 'light') {
      P(cx - 2, cy - 12, 4, 6, PAL.brick); P(cx - 3, cy - 13, 6, 2, PAL.slate);
      P(cx - 1, cy - 11, 2, 2, PAL.goldLt);
    }
  };
}

/* -------------------------------------------------------------- runner */
function drawRunner(P, t) {
  const run = Math.floor(t * 8) % 2;
  const x = 16, y = 16;
  P(x - 12, y + 26, 24, 4, 'rgba(58,47,29,0.25)');
  if (run) { P(x - 8, y + 14, 6, 12, '#3d5a80'); P(x + 2, y + 18, 6, 8, '#3d5a80'); }
  else     { P(x - 8, y + 18, 6, 8, '#3d5a80'); P(x + 2, y + 14, 6, 12, '#3d5a80'); }
  P(x - 10, y - 4, 20, 20, '#f8f4ec');                 // shirt
  P(x - 10, y - 4, 20, 4, '#e05b7f');
  P(x - 8, y + 6, 16, 14, '#cdd5dd');                  // cooler
  P(x - 8, y + 6, 16, 4, PAL.cream);
  P(x - 4, y + 12, 8, 2, '#8a97a5');
  P(x - 6, y - 16, 12, 12, '#e8b48c');                 // head
  P(x - 8, y - 20, 16, 5, '#d13b5a');                  // cap
  P(x - 8, y - 15, 16, 2, '#a82843');
  P(x - 3, y - 12, 2, 2, PAL.ink); P(x + 2, y - 12, 2, 2, PAL.ink);
  const s = Math.sin(t * 3) * 2;
  P(x + 12, y - 8 + s, 6, 6, PAL.cream);               // tossed scoop
  P(x + 13, y - 7 + s, 2, 2, PAL.white);
}

/* --------------------------------------------------------------- bosses */
function drawSeagullKing(P, t) {
  const x = 32, y = 26, flap = Math.floor(t * 5) % 2;
  P(x - 30, y - 4 + (flap ? 5 : -3), 14, 7, '#dfe6ea');
  P(x + 16, y - 4 + (flap ? 5 : -3), 14, 7, '#dfe6ea');
  P(x - 16, y - 8, 32, 22, '#f4f7f9');
  P(x - 12, y - 18, 24, 12, '#f4f7f9');
  P(x - 5, y - 26, 10, 8, PAL.gold);                    // crown
  P(x - 8, y - 23, 16, 3, PAL.gold);
  P(x - 8, y - 15, 4, 4, PAL.ink); P(x + 4, y - 15, 4, 4, PAL.ink);
  P(x - 4, y + 10, 8, 6, '#ff9a3c');                    // beak
  P(x - 6, y + 14, 12, 4, '#e8802a');
}

function drawGolem(P, t) {
  const x = 32, open = Math.floor(t * 0.9) % 2;
  P(x - 24, 12, 48, 40, PAL.sandDk);
  P(x - 22, 14, 44, 36, PAL.sand);
  for (let i = -24; i < 24; i += 8) P(x + i, 6, 6, 7, PAL.sand);
  P(x - 30, 22, 8, 22, PAL.sand); P(x + 22, 22, 8, 22, PAL.sand);
  P(x - 14, 22, 8, 8, PAL.slate); P(x + 6, 22, 8, 8, PAL.slate);
  if (open) { P(x - 8, 36, 16, 12, '#1a1206'); P(x - 6, 36, 12, 3, '#3a2f1d'); }
  else P(x - 8, 36, 16, 12, PAL.sandDk);
  P(x - 26, 50, 52, 6, PAL.sandDk);
}

function drawKraken(P, t) {
  P(4, 6, 56, 18, PAL.krakenDk);
  P(10, 2, 44, 8, PAL.krakenDk);
  P(16, 10, 8, 8, PAL.gold); P(40, 10, 8, 8, PAL.gold);
  P(18, 12, 4, 4, PAL.ink); P(42, 12, 4, 4, PAL.ink);
  for (let i = 0; i < 3; i++) {
    const bx = 12 + i * 20;
    for (let y = 24; y < 52; y += 5)
      P(bx + Math.sin(y * 0.2 + t * 2 + i * 2) * 4, y, 7, 5, PAL.kraken);
    P(bx - 2, 52, 10, 8, PAL.kraken);
    P(bx + 1, 55, 5, 4, '#5e2a44');
  }
}

function drawSurfer(P, t) {
  const x = 32 + Math.sin(t * 1.6) * 8, y = 26;
  P(2, y + 24, 60, 6, PAL.seaLt);
  P(2, y + 21, 60, 4, PAL.foam);
  P(x - 18, y + 14, 36, 6, PAL.gold);                   // board
  P(x - 6, y - 10, 13, 24, PAL.surf);
  P(x - 5, y - 20, 11, 11, PAL.surfLt);
  P(x - 16, y - 2, 10, 5, PAL.surf); P(x + 6, y - 8, 10, 5, PAL.surf);
  P(x - 3, y - 17, 2, 2, PAL.ink); P(x + 2, y - 17, 2, 2, PAL.ink);
  P(x - 4, y - 12, 9, 5, '#1a1206');
}

function drawDragon(P, t) {
  const lunge = (Math.sin(t * 1.2) + 1) / 2;
  const hx = 44 - lunge * 18;
  for (let x = hx + 20; x < 68; x += 10)
    P(x, 24 + Math.sin(x * 0.18 + t * 3) * 5, 11, 12, PAL.dragonDk);
  P(hx - 16, 18, 34, 22, PAL.dragon);
  P(hx - 24, 26, 10, 10, PAL.dragon);
  P(hx - 2, 12, 6, 8, PAL.gold);
  P(hx, 14, 3, 4, PAL.ink);
  P(hx - 22, 34, 18, 7, PAL.dragonMouth);
  for (let i = 0; i < 4; i++) P(hx - 21 + i * 5, 34, 2, 3, PAL.white);
  P(hx - 10, 8, 5, 9, PAL.dragonDk); P(hx + 2, 4, 5, 12, PAL.dragonDk);
}

function drawTwins(P, t) {
  const cols = [[PAL.cyan, PAL.cyanDk, '#0e4a5a'], [PAL.cream, PAL.creamDk, '#5a0e2a']];
  [16, 48].forEach((bx, i) => {
    const C = cols[i], x = bx + Math.sin(t * 1.4 + i * 2.4) * 4, y = 22 + (i ? -2 : 2);
    for (let yy = y + 20; yy < 60; yy += 8)
      P(x - 7 + Math.sin(yy * 0.16 + t * 2 + i * 3) * 4, yy, 14, 8, C[1]);
    P(x - 13, y - 8, 26, 24, C[0]);
    P(x - 16, y + 2, 7, 10, C[0]);
    P(x - 5 + (i ? 5 : 0), y - 3, 5, 7, PAL.gold);
    P(x - 4 + (i ? 5 : 0), y - 1, 3, 4, PAL.ink);
    P(x - 10, y + 10, 18, 7, C[2]);
    for (let k = 0; k < 3; k++) P(x - 9 + k * 6, y + 10, 2, 3, PAL.white);
    for (let k = 0; k < 3; k++) P(x - 11 + k * 8, y - 11, 3, 5, C[1]);
  });
}

function drawLighthouse(P, t) {
  const x = 24, beam = Math.floor(t * 1.6) % 2;
  P(x - 12, 56, 24, 8, PAL.sandDk);
  P(x - 9, 30, 18, 28, PAL.bone);
  P(x - 8, 12, 16, 18, PAL.brick);
  P(x - 11, 8, 22, 5, PAL.slate);
  P(x - 5, 0, 10, 9, PAL.slate);
  P(x - 3, 2, 6, 6, beam ? PAL.goldLt : PAL.gold);
  if (beam) {
    P(x - 30, 2, 26, 5, 'rgba(255,248,184,0.28)');
    P(x + 5, 2, 26, 5, 'rgba(255,248,184,0.28)');
  }
  P(x - 9, 40, 18, 3, PAL.brick);
}

/* ---------------------------------------------------------------- merch */
function teeSprite(bodyCol, artFn) {
  return (P, t) => {
    P(10, 8, 44, 10, bodyCol);                       // shoulders
    P(2, 10, 12, 16, bodyCol); P(50, 10, 12, 16, bodyCol);   // sleeves
    P(12, 8, 40, 48, bodyCol);                       // body
    P(24, 6, 16, 5, 'rgba(0,0,0,0.22)');             // collar
    P(12, 54, 40, 3, 'rgba(0,0,0,0.18)');            // hem
    if (artFn) artFn(P, t);
  };
}

function drawTeeClassic(P, t) {
  const s = Math.sin(t * 2) * 0.5;
  const cx = 32, cy = 28 + s;
  for (let r = 0; r < 7; r++) { const h = 6 - r * 0.75; P(cx - h, cy + 5 + r, h * 2, 1, r % 2 ? PAL.coneDk : PAL.cone); }
  P(cx - 8, cy - 2, 16, 7, PAL.cream);
  P(cx - 6, cy - 5, 12, 3, PAL.creamLt);
  P(cx - 6, cy - 2, 4, 2, PAL.gloss);
  P(cx - 3, cy - 8, 3, 3, PAL.shrimp); P(cx, cy - 9, 3, 3, PAL.shrimpLt); P(cx + 3, cy - 8, 3, 3, PAL.shrimpDk);
  P(cx - 14, cy + 14, 28, 2, PAL.cyanNt);
}

function drawCap(P, t) {
  P(8, 22, 48, 18, PAL.ink);                          // crown
  P(8, 18, 48, 8, PAL.ink);
  P(12, 14, 40, 8, PAL.ink);
  P(4, 38, 56, 7, PAL.cream);                         // brim
  P(4, 43, 56, 3, PAL.creamDk);
  const cx = 32, cy = 26;                             // embroidered cone
  for (let r = 0; r < 4; r++) { const h = 3.4 - r * 0.7; P(cx - h, cy + 3 + r, h * 2, 1, PAL.cone); }
  P(cx - 5, cy - 1, 10, 5, PAL.cream);
  P(cx - 3, cy - 3, 6, 2, PAL.creamLt);
  P(cx - 2, cy - 5, 2, 2, PAL.shrimp);
}

function drawSticker(P, t) {
  P(4, 4, 56, 56, PAL.shellLt);                       // die-cut backing
  P(7, 7, 50, 50, PAL.ink);
  const cx = 32, cy = 30 + Math.sin(t * 2) * 1;
  for (let r = 0; r < 8; r++) { const h = 7 - r * 0.8; P(cx - h, cy + 4 + r, h * 2, 1, r % 2 ? PAL.coneDk : PAL.cone); }
  P(cx - 9, cy - 3, 18, 8, PAL.cream);
  P(cx - 7, cy - 6, 14, 3, PAL.creamLt);
  P(cx - 7, cy - 3, 5, 2, PAL.gloss);
  P(cx - 4, cy - 10, 4, 3, PAL.shrimp); P(cx, cy - 11, 4, 3, PAL.shrimpLt); P(cx + 4, cy - 10, 3, 3, PAL.shrimpDk);
  P(cx - 12, cy - 8, 2, 5, PAL.weed); P(cx - 15, cy - 6, 3, 2, PAL.weedLt);
}

function drawTote(P, t) {
  P(14, 20, 36, 40, '#e8e0cc');                       // bag
  P(14, 20, 36, 4, '#d4ccb4');
  P(18, 6, 4, 16, '#d4ccb4'); P(42, 6, 4, 16, '#d4ccb4');   // handles
  P(18, 4, 28, 4, '#d4ccb4');
  P(20, 30, 24, 3, PAL.creamDk);
  const cx = 32, cy = 42;
  for (let r = 0; r < 5; r++) { const h = 4 - r * 0.7; P(cx - h, cy + 3 + r, h * 2, 1, PAL.cone); }
  P(cx - 6, cy - 1, 12, 5, PAL.cream);
  P(cx - 4, cy - 3, 8, 2, PAL.creamLt);
  P(cx - 2, cy - 6, 3, 3, PAL.shrimp);
  P(20, 52, 24, 2, PAL.cyanNt);
}

function drawPin(P, t) {
  const glint = Math.floor(t * 2) % 2;
  P(10, 10, 44, 44, PAL.gold);                        // enamel body
  P(13, 13, 38, 38, PAL.ink);
  const cx = 32, cy = 32;
  for (let r = 0; r < 6; r++) { const h = 5 - r * 0.75; P(cx - h, cy + 4 + r, h * 2, 1, PAL.cone); }
  P(cx - 7, cy - 2, 14, 6, PAL.cream);
  P(cx - 5, cy - 5, 10, 3, PAL.creamLt);
  P(cx - 5, cy - 2, 4, 2, PAL.gloss);
  P(cx - 3, cy - 8, 3, 3, PAL.shrimp); P(cx + 1, cy - 9, 3, 3, PAL.shrimpLt);
  if (glint) { P(16, 16, 4, 4, PAL.goldLt); P(20, 16, 3, 2, PAL.goldLt); }
}

/* --------------------------------------------------------------- scenery */
/* A slice of the beach, matching the game's lanes. Used as a section band. */
function drawBeachStrip(P, t) {
  const H = 40;
  P(0, 0, 8, H, PAL.sandLt);                          // dunes
  P(8, 0, 30, H, PAL.sand);                           // dry
  P(38, 0, 12, H, PAL.sandDk);                        // damp
  for (let y = 0; y < H; y += 2) {
    const sx = 54 + Math.sin(y * 0.3 + t * 2) * 1.5;
    P(50, y, sx - 50, 2, '#c2a368');                  // wet
    P(sx, y, 2, 2, PAL.foam);
    P(sx + 2, y, 100, 2, PAL.sea);
  }
  for (let i = 0; i < 6; i++) {                       // dune grass
    const gx = 1 + (i * 7) % 7, gy = (i * 11) % H;
    P(gx, gy, 1, 4, '#5d7f38');
  }
}

window.FBSprites = {
  PAL, pixelCanvas,
  drawLogo, scoopSprite, drawRunner,
  drawSeagullKing, drawGolem, drawKraken, drawSurfer, drawDragon, drawTwins, drawLighthouse,
  teeSprite, drawTeeClassic, drawCap, drawSticker, drawTote, drawPin, drawBeachStrip,
};
})();
