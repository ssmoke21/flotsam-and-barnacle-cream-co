/* Balance harness for shop.html — an autoplayer that runs whole seasons headlessly
   so the economy can be tuned without playing 15 shifts by hand. Dev-only; the
   game never loads this. Inject with:
     var s=document.createElement('script'); s.src='/.claude/simbot.js'; document.head.appendChild(s);
   then call __sim(days, cushion). */
(function () {
'use strict';

function mkbot() {
  function walkTo(x, y, dt) {
    const dx = x - G.px, dy = y - G.py, d = Math.hypot(dx, dy);
    if (d < 3) return true;
    const s = CONFIG.PLAYER_SPEED * dt;
    G.px += dx / d * Math.min(s, d); G.py += dy / d * Math.min(s, d);
    return false;
  }
  let job = null, stuck = 0;
  const demand = () => {
    const d = {};
    for (const c of G.customers) {
      if (c.leaving || c.merch) continue;
      for (let i = c.filled; i < c.order.length; i++) d[c.order[i]] = (d[c.order[i]] || 0) + 1;
    }
    return d;
  };
  function pick() {
    const sv = G.customers.filter(c => !c.leaving && !c.merch && stockOf(c.order[c.filled]) > 0)
                          .sort((a, b) => a.patience - b.patience)[0];
    if (sv) return { k: 'serve', c: sv };
    const mc = G.owned.has('merch') ? G.customers.find(c => c.merch && !c.leaving) : null;
    if (mc) return { k: 'merch', c: mc };
    const ch = G.machines.find(m => m.charges > 0 && m.jam <= 0 && m.swap <= 0 && m.scoops < CONFIG.TUB_CAP);
    if (ch) return { k: 'churn', i: G.machines.indexOf(ch) };
    const ld = G.machines.find(m => m.charges < CONFIG.FISH_CHARGES && m.jam <= 0 && m.swap <= 0 &&
      (G.basket.includes(m.flavor) || ((!m.flavor || m.scoops === 0) && G.basket.length)));
    if (ld) return { k: 'load', i: G.machines.indexOf(ld) };
    // Only clear a tub when we're actually holding the fish for a flavor someone
    // wants and every machine is committed to something nobody is asking for.
    const d = demand();
    const wantInHand = G.basket.filter(f => d[f] && !G.machines.some(m => m.flavor === f));
    if (wantInHand.length) {
      const victim = G.machines.filter(m => m.flavor && !d[m.flavor])
                               .sort((a, b) => a.scoops - b.scoops)[0];
      if (victim) return { k: 'dump', i: G.machines.indexOf(victim) };
    }
    if (!dockClosed() && G.basket.length < basketCap()) return { k: 'fish' };
    if (G.basket.length && Object.keys(d).length && !G.basket.some(f => d[f])) return { k: 'toss' };
    return { k: 'idle' };
  }
  function dead(j) {
    if (!j) return true;
    if (j.k === 'serve') return j.c.leaving || stockOf(j.c.order[j.c.filled]) <= 0;
    if (j.k === 'merch') return j.c.leaving;
    if (j.k === 'churn') { const m = G.machines[j.i]; return !(m.charges > 0 || m.churning) || m.jam > 0; }
    if (j.k === 'load') { const m = G.machines[j.i]; return m.charges >= CONFIG.FISH_CHARGES || !G.basket.length || stuck > 30; }
    if (j.k === 'fish') return dockClosed() || G.basket.length >= basketCap();
    return true;
  }
  const bot = function (dt) {
    if (dead(job)) { job = pick(); stuck = 0; }
    const j = job;
    bot.job = j.k;
    if (j.k === 'serve') { if (walkTo(SLOT_X[j.c.slot], SLOT_Y, dt)) scoopFor(j.c); }
    else if (j.k === 'merch') { if (walkTo(RACK.x - 24, RACK.y + 8, dt)) sellMerch(j.c); }
    else if (j.k === 'churn') {
      const m = G.machines[j.i];
      if (walkTo(MACHINE_X[j.i], MACHINE_Y + 22, dt)) {
        if (!m.churning) m.churning = true;
        else if (m.fill >= zoneLo() + 0.08) releaseChurn(m, j.i);
      }
    }
    else if (j.k === 'load') {
      const before = G.basket.length;
      if (walkTo(MACHINE_X[j.i], MACHINE_Y + 22, dt)) { loadMachine(G.machines[j.i], j.i); if (G.basket.length === before) stuck += 5; }
    }
    else if (j.k === 'dump') {
      const m = G.machines[j.i];
      if (walkTo(MACHINE_X[j.i], MACHINE_Y + 22, dt)) { m.scoops = 0; m.charges = 0; m.flavor = null; job = null; }
    }
    else if (j.k === 'toss') { G.basket.shift(); job = null; }
    else if (j.k === 'fish') {
      if (walkTo(DOCK.x, CONFIG.PLAYER_MIN_Y + 4, dt)) { if (!G.cast) dockAction(); else if (G.cast.hooked) dockAction(); }
    }
    else walkTo(240, 170, dt);
    stuck++;
  };
  return bot;
}
window.__mkbot = mkbot;

// One day, logged every second: what the bot is doing and what the shop looks like.
window.__trace = function () {
  const bot = mkbot();
  reset(); state = 'DAY';
  const out = []; let acc = 0;
  while (state === 'DAY' && G.clock > 0) {
    bot(1 / 60); update(1 / 60);
    acc += 1 / 60;
    if (acc >= 5) {
      acc = 0;
      out.push(`t${Math.round(CONFIG.DAY_SECONDS - G.clock)} ${bot.job} basket[${G.basket.join(',')}] ` +
        `tubs[${G.machines.map(m => (m.flavor || '-') + ':' + m.scoops + '/c' + m.charges).join(' ')}] ` +
        `q[${G.customers.filter(c => !c.leaving).map(c => c.order.map(o => o.slice(0, 3)).join('') + '@' + Math.round(c.patience)).join(' ')}] ` +
        `srv${G.dayServed} walk${G.dayWalkouts}`);
    }
  }
  return out.join('\n');
};

window.__sim = function (days, cushion) {
  const bot = mkbot();
  reset(); state = 'DAY';
  const rows = [];
  for (let d = 0; d < (days || 18) && state !== 'GAMEOVER' && state !== 'WIN'; d++) {
    while (state === 'DAY' && G.clock > 0) { bot(1 / 60); update(1 / 60); }
    const r = Object.assign({}, G.lastDay, { till: G.money });
    if (state === 'DAYEND') { actions.push('Space'); screenInput(); }
    if (state === 'SHOP') {
      const b = [];
      for (let k = 0; k < 3; k++) {
        const list = shopList().slice().sort((a, b) => a.cost - b.cost);
        const u = list.find(u => G.money - u.cost > season().rent + wages() + (cushion == null ? 40 : cushion));
        if (!u) break;
        G.shopSel = shopList().indexOf(u);
        actions.push('Enter'); screenInput();
        if (state === 'NAME') { typedText = ''; actions.push('confirm'); screenInput(); }
        b.push(u.name);
      }
      r.bought = b.join(' + ') || '-';
      actions.push('Space'); screenInput();
    }
    rows.push(r);
  }
  return rows.map(r => `d${String(r.day).padStart(2)} ${r.season.slice(0, 6).padEnd(6)} srv${String(r.served).padStart(2)} walk${String(r.walkouts).padStart(2)} $${String(r.earned).padStart(3)} net${(r.net >= 0 ? '+' : '') + r.net} till$${r.till} [${r.bought || ''}]`).join('\n')
    + '\nEND ' + state + ' total$' + G.totalEarned;
};

window.__simN = function (n, days, cushion) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = __sim(days, cushion);
    const last = r.trim().split('\n').pop();
    out.push('run' + (i + 1) + ': ' + last + '  | days=' + G.day);
  }
  return out.join('\n');
};
// Marginal value of each purchase: same season, same bot, one loadout at a time.
window.__bench = function (seasonIdx, runs) {
  runs = runs || 4;
  const kits = [
    ['base', []],
    ['+basket', ['basket']],
    ['+machine3', ['machine3']],
    ['+bait', ['bait']],
    ['+churnkit', ['churnkit']],
    ['+bell', ['bell']],
    ['+dockhand', ['hire_dock']],
    ['+runner', ['hire_load']],
    ['+churner', ['hire_churn']],
    ['+server', ['hire_serve']],
    ['all equip', ['basket', 'machine3', 'bait', 'churnkit', 'bell', 'machine4']],
    ['full crew', ['basket', 'machine3', 'bait', 'churnkit', 'bell', 'machine4', 'merch',
                   'hire_dock', 'hire_load', 'hire_churn', 'hire_serve']],
  ];
  const out = [];
  for (const [label, ids] of kits) {
    let srv = 0, earn = 0, walk = 0;
    for (let r = 0; r < runs; r++) {
      const bot = mkbot();
      reset();
      G.seasonIdx = seasonIdx || 0;
      for (const id of ids) {
        G.owned.add(id);
        const u = UPGRADES.find(u => u.id === id);
        if (u && u.kind === 'staff') G.staff.push({ role: u.role, name: u.name, wage: u.wage, speed: u.speed, t: u.speed });
      }
      startDay(true); state = 'DAY';
      while (state === 'DAY' && G.clock > 0) { bot(1 / 60); update(1 / 60); }
      srv += G.lastDay.served; earn += G.lastDay.earned; walk += G.lastDay.walkouts;
    }
    out.push(label.padEnd(11) + ' srv ' + (srv / runs).toFixed(1).padStart(5) +
             '  $' + (earn / runs).toFixed(0).padStart(4) + '  walk ' + (walk / runs).toFixed(1));
  }
  return SEASONS[seasonIdx || 0].name + ' (rent $' + SEASONS[seasonIdx || 0].rent + ')\n' + out.join('\n');
};
console.log('simbot ready: __sim(days, cushion), __simN(runs, days, cushion)');
})();
