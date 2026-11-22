import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Patrulha Pet — protótipo v0.1
// Estado do jogo em objetos simples; meshes são só a "vista" (copiadas por frame).
// ---------------------------------------------------------------------------

const MAP = [
  '###################',
  '#o.......#.......o#',
  '#.##.###.#.###.##.#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.#.......#.####',
  '####.#.##.##.#.####',
  '#....#.#GGG#.#....#',
  '#.##.#.#####.#.##.#',
  '#........P........#',
  '#.##.###.#.###.##.#',
  '#o..#.........#..o#',
  '#..#..#.....#..#..#',
  '#.................#',
  '###################',
];
const H = MAP.length, W = MAP[0].length;
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const DIR_LIST = Object.values(DIRS);

const TIPS = {
  pulga: '<b>Pulgas:</b> trate o pet E o ambiente — caminha, sofá e tapetes.',
  carrapato: '<b>Carrapato:</b> confira o pelo depois de passeios em mato ou grama alta.',
  verme: '<b>Vermes:</b> vermífugo periódico, conforme orientação do veterinário.',
  chocolate: '<b>Chocolate</b> é tóxico para cães e gatos. Uva e cebola também!',
  vacina: '<b>Vacinas em dia</b> protegem contra doenças graves, como raiva e cinomose.',
  spray: '<b>Antiparasitário</b> regular é a melhor defesa contra pulgas e carrapatos.',
  agua: '<b>Água fresca</b> sempre disponível e sombra nos dias quentes.',
  brinquedo: '<b>Brincar todo dia</b> reduz estresse e ansiedade do pet.',
  hit: 'Ops! Na vida real, sinais estranhos no pet = <b>procure o veterinário</b>.',
};

const POWERS = {
  vacina:    { icon: '💉', name: 'Escudo Vacina', color: 0x4fc3ff, dur: 8 },
  spray:     { icon: '🧴', name: 'Spray Antipulgas', color: 0x9b6bff, dur: 5 },
  agua:      { icon: '💧', name: 'Tigela Refrescante', color: 0x34e1d6, dur: 7 },
  brinquedo: { icon: '🎾', name: 'Zoomies!', color: 0xb6f23a, dur: 5 },
};

// ---------------------------------------------------------------- persistence
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem storage */ } },
};

// ---------------------------------------------------------------- renderer
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87c8ff);
scene.fog = new THREE.Fog(0x87c8ff, 22, 45);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
scene.add(new THREE.HemisphereLight(0xffffff, 0x6a8f4a, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(-8, 16, 6);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14 });
scene.add(sun);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const wx = (x) => x - (W - 1) / 2;
const wz = (y) => y - (H - 1) / 2;
const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, ...extra });

// ---------------------------------------------------------------- world
const ground = new THREE.Mesh(new THREE.PlaneGeometry(W + 6, H + 6), mat(0x7ccf5a));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const walls = [];
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (MAP[y][x] === '#') walls.push([x, y]);
const hedge = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.7, 1), mat(0x2f8f4e), walls.length);
hedge.castShadow = hedge.receiveShadow = true;
const m4 = new THREE.Matrix4();
walls.forEach(([x, y], i) => { m4.makeTranslation(wx(x), 0.35, wz(y)); hedge.setMatrixAt(i, m4); });
scene.add(hedge);
// "flores" no topo das sebes para dar cor
const flowers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.12, 6, 4), mat(0xff8fc8), walls.length);
walls.forEach(([x, y], i) => {
  m4.makeTranslation(wx(x) + ((x * 7 + y * 3) % 5 - 2) * 0.12, 0.72, wz(y) + ((x * 3 + y * 5) % 5 - 2) * 0.12);
  flowers.setMatrixAt(i, m4);
});
scene.add(flowers);

const isWall = (x, y) => x < 0 || y < 0 || x >= W || y >= H || MAP[y][x] === '#';

// alcance a partir do jogador: remove petiscos inalcançáveis (proteção contra mapa impossível)
function reachableFrom(sx, sy) {
  const seen = new Set([sx + ',' + sy]); const q = [[sx, sy]];
  while (q.length) {
    const [x, y] = q.shift();
    for (const [dx, dy] of DIR_LIST) {
      const k = (x + dx) + ',' + (y + dy);
      if (!isWall(x + dx, y + dy) && !seen.has(k)) { seen.add(k); q.push([x + dx, y + dy]); }
    }
  }
  return seen;
}

// ---------------------------------------------------------------- meshes
function makeDog() {
  const g = new THREE.Group();
  const fur = mat(0xd9913a), dark = mat(0x8a5420), white = mat(0xfff3df), black = mat(0x111111);
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.7), fur); body.position.y = 0.38; g.add(body);
  const belly = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.55), white); belly.position.y = 0.2; g.add(belly);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.38, 0.38), fur); head.position.set(0, 0.62, 0.42); g.add(head);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.18), white); snout.position.set(0, 0.55, 0.66); g.add(snout);
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.05), black); nose.position.set(0, 0.6, 0.76); g.add(nose);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.16), dark); ear.position.set(0.22 * s, 0.68, 0.38); ear.rotation.z = 0.35 * s; g.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), black); eye.position.set(0.1 * s, 0.7, 0.61); g.add(eye);
    for (const f of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.12), fur); leg.position.set(0.16 * s, 0.11, 0.22 * f); g.add(leg);
      leg.userData.leg = { s, f };
    }
  }
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.32), fur); tail.position.set(0, 0.52, -0.45); tail.rotation.x = -0.7; g.add(tail);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 6, 16), mat(0xff3b6b)); collar.position.set(0, 0.5, 0.33); g.add(collar);
  g.userData.tail = tail;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

function makeThreat(kind) {
  const g = new THREE.Group();
  const colors = { pulga: 0xc0392b, carrapato: 0x5b3a1a, verme: 0xff7aa8, chocolate: 0x6b3b1f };
  const m = mat(colors[kind]);
  let core;
  if (kind === 'verme') {
    for (let i = 0; i < 4; i++) {
      const seg = new THREE.Mesh(new THREE.SphereGeometry(0.22 - i * 0.03, 12, 8), m);
      seg.position.set(0, 0.25, -i * 0.22); g.add(seg); if (!i) core = seg;
    }
  } else if (kind === 'chocolate') {
    core = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.22, 0.42), m); core.position.y = 0.3; g.add(core);
    for (let i = -1; i <= 1; i++) for (let j = 0; j < 2; j++) {
      const sq = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.05, 0.17), mat(0x8a5130));
      sq.position.set(i * 0.2, 0.43, (j - 0.5) * 0.2); g.add(sq);
    }
  } else {
    core = new THREE.Mesh(new THREE.SphereGeometry(kind === 'pulga' ? 0.3 : 0.36, 14, 10), m);
    core.position.y = 0.35; core.scale.set(1, 0.85, 1.15); g.add(core);
    const legM = mat(0x222222);
    for (let i = 0; i < 6; i++) {
      const s = i < 3 ? -1 : 1, k = (i % 3) - 1;
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.05, 0.05), legM);
      leg.position.set(0.3 * s, 0.22, k * 0.17); leg.rotation.z = -0.5 * s; g.add(leg);
    }
  }
  // olhos bravos
  const eyeW = mat(0xffffff), eyeB = mat(0x000000);
  for (const s of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), eyeW);
    e.position.set(0.11 * s, kind === 'chocolate' ? 0.48 : 0.47, kind === 'verme' ? 0.18 : 0.26); g.add(e);
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), eyeB);
    p.position.copy(e.position).add(new THREE.Vector3(0, 0, 0.06)); g.add(p);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.userData.baseMat = o.material; } });
  g.userData.core = core;
  return g;
}

const scaredMat = mat(0x3d6bff, { emissive: 0x1030a0 });
const scaredFlash = mat(0xffffff, { emissive: 0x777777 });
const ghostMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });

const boneGeo = new THREE.CapsuleGeometry(0.06, 0.18, 2, 6);
const boneMat = mat(0xfff1c4, { emissive: 0x332200 });
function makeBone() {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(boneGeo, boneMat); shaft.rotation.z = Math.PI / 2; g.add(shaft);
  for (const s of [-1, 1]) for (const t of [-1, 1]) {
    const k = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), boneMat); k.position.set(0.15 * s, 0, 0.05 * t); g.add(k);
  }
  g.position.y = 0.3;
  return g;
}

function makePower(type) {
  const g = new THREE.Group();
  const c = POWERS[type].color;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.06, 8, 24), mat(c, { emissive: c, emissiveIntensity: 0.6 }));
  ring.rotation.x = Math.PI / 2; g.add(ring);
  let item;
  if (type === 'vacina') {
    item = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.36, 10), mat(0xeaf6ff));
    const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.18, 6), mat(0xaaaaaa)); needle.position.y = -0.26;
    const plunger = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.2), mat(c)); plunger.position.y = 0.2;
    item.add(tube, needle, plunger); item.rotation.z = 0.6;
  } else if (type === 'spray') {
    item = new THREE.Group();
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.34, 12), mat(c));
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.14), mat(0xffffff)); cap.position.y = 0.21;
    item.add(can, cap);
  } else if (type === 'agua') {
    item = new THREE.Group();
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.18, 0.14, 16), mat(0xff6b3d));
    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.02, 16), mat(c, { emissive: c, emissiveIntensity: 0.4 })); water.position.y = 0.07;
    item.add(bowl, water);
  } else {
    item = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), mat(c));
  }
  item.position.y = 0.45; g.add(item);
  g.userData.item = item;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------------------------------------------------------------- particles
const partGeo = new THREE.BoxGeometry(0.09, 0.09, 0.09);
const particles = [];
function burst(x, y, color, n = 8, speed = 3) {
  const m = new THREE.MeshBasicMaterial({ color });
  for (let i = 0; i < n; i++) {
    const p = new THREE.Mesh(partGeo, m);
    p.position.set(wx(x), 0.4, wz(y));
    const a = Math.random() * Math.PI * 2, s = speed * (0.5 + Math.random());
    p.userData = { vx: Math.cos(a) * s, vy: 2 + Math.random() * 3, vz: Math.sin(a) * s, life: 0.6 + Math.random() * 0.3 };
    scene.add(p); particles.push(p);
  }
}
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i], u = p.userData;
    u.life -= dt; u.vy -= 12 * dt;
    p.position.x += u.vx * dt; p.position.y = Math.max(0.05, p.position.y + u.vy * dt); p.position.z += u.vz * dt;
    p.rotation.x += dt * 8; p.scale.setScalar(Math.max(0.01, u.life * 1.5));
    if (u.life <= 0) { scene.remove(p); particles.splice(i, 1); }
  }
}

// ---------------------------------------------------------------- audio (WebAudio sintetizado)
let actx = null;
function beep(freq, dur = 0.08, type = 'square', vol = 0.06, slide = 0) {
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur);
  } catch { /* sem áudio */ }
}

// ---------------------------------------------------------------- HUD
const $ = (id) => document.getElementById(id);
let tipTimer = 0;
function showTip(html, secs = 3.2) { $('tip').innerHTML = html; $('tip').classList.add('show'); tipTimer = secs; }
const seenTips = new Set();
function tipOnce(key) { if (!seenTips.has(key)) { seenTips.add(key); showTip(TIPS[key]); } else if (Math.random() < 0.35) showTip(TIPS[key], 2.4); }

const projV = new THREE.Vector3();
function pop(x, y, text, color = '#fff') {
  projV.set(wx(x), 0.9, wz(y)).project(camera);
  const el = document.createElement('div');
  el.className = 'pop'; el.textContent = text; el.style.color = color;
  el.style.left = ((projV.x + 1) / 2 * innerWidth) + 'px';
  el.style.top = ((1 - projV.y) / 2 * innerHeight) + 'px';
  $('hud').appendChild(el);
  setTimeout(() => el.remove(), 800);
}
function flash() { $('flash').style.opacity = 0.5; setTimeout(() => ($('flash').style.opacity = 0), 80); }

// ---------------------------------------------------------------- game state
let G = null;
let best = store.get('patrulhapet.best', 0);
let trauma = 0, hitStop = 0, running = false;
const camPos = new THREE.Vector3(0, 14, 10);

function newGame() {
  if (G) teardown();
  G = { score: 0, lives: 3, level: 1, combo: 1, comboTimer: 0, power: null, powerT: 0, shield: false,
        modeT: 0, mode: 'scatter', powerSpawnT: 18, ghostsEaten: 0, dying: 0 };
  buildLevel();
  running = true;
}

function teardown() {
  for (const b of G.bones.values()) scene.remove(b);
  for (const p of G.powers) scene.remove(p.mesh);
  for (const t of G.threats) scene.remove(t.mesh);
  scene.remove(G.player.mesh);
}

function buildLevel() {
  if (G.bones) teardown();
  let start = [9, 10]; const house = [];
  G.bones = new Map(); G.powers = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = MAP[y][x];
    if (c === 'P') start = [x, y];
    if (c === 'G') house.push([x, y]);
  }
  const reach = reachableFrom(start[0], start[1]);
  const types = Object.keys(POWERS).sort(() => Math.random() - 0.5);
  let pi = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!reach.has(x + ',' + y)) continue;
    const c = MAP[y][x];
    if (c === '.') { const b = makeBone(); b.position.x = wx(x); b.position.z = wz(y); b.rotation.y = (x + y) * 0.7; scene.add(b); G.bones.set(x + ',' + y, b); }
    if (c === 'o') spawnPower(x, y, types[pi++ % types.length]);
  }
  G.house = house;
  G.houseDoor = [9, 7];
  G.startTile = start;
  G.player = { x: start[0], y: start[1], tx: start[0], ty: start[1], dir: [0, 0], want: [0, 0], wantT: 0, mesh: makeDog(), squash: 0, face: 0 };
  scene.add(G.player.mesh);
  const kinds = ['pulga', 'carrapato', 'verme', 'chocolate'];
  const corners = [[W - 2, 1], [1, 1], [1, H - 2], [W - 2, H - 2]];
  G.threats = kinds.map((kind, i) => {
    const [hx, hy] = house[i % house.length];
    const t = { kind, x: hx, y: hy, tx: hx, ty: hy, dir: [0, -1], mesh: makeThreat(kind), state: 'house',
                releaseT: 1 + i * 3, corner: corners[i], disguised: kind === 'chocolate', bob: Math.random() * 6 };
    scene.add(t.mesh);
    return t;
  });
  G.mode = 'scatter'; G.modeT = 0;
}

function spawnPower(x, y, type) {
  const mesh = makePower(type);
  mesh.position.set(wx(x), 0, wz(y));
  scene.add(mesh);
  G.powers.push({ x, y, type, mesh });
}

// ---------------------------------------------------------------- input (com buffer)
function want(d) { if (!G) return; G.player.want = d; G.player.wantT = 0.35; }
addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  const map = { arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down', arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right' };
  if (map[k]) { want(DIRS[map[k]]); e.preventDefault(); }
});
let touch0 = null;
addEventListener('touchstart', (e) => { const t = e.touches[0]; touch0 = [t.clientX, t.clientY]; }, { passive: true });
addEventListener('touchmove', (e) => {
  if (!touch0) return;
  const t = e.touches[0], dx = t.clientX - touch0[0], dy = t.clientY - touch0[1];
  if (Math.hypot(dx, dy) < 24) return;
  want(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? DIRS.right : DIRS.left) : (dy > 0 ? DIRS.down : DIRS.up));
  touch0 = [t.clientX, t.clientY];
}, { passive: true });

// ---------------------------------------------------------------- movement (grade + interpolação)
const sameDir = (a, b) => a[0] === b[0] && a[1] === b[1];
const isRev = (a, b) => a[0] === -b[0] && a[1] === -b[1] && (a[0] || a[1]);

function step(e, speed, dt, choose, canPass = (x, y) => !isWall(x, y)) {
  let rem = speed * dt, guard = 0;
  while (rem > 1e-6 && guard++ < 4) {
    const dx = e.tx - e.x, dy = e.ty - e.y, dist = Math.abs(dx) + Math.abs(dy);
    if (dist < 1e-6) {
      e.x = e.tx; e.y = e.ty;
      const nd = choose(e);
      if (!nd || !canPass(e.x + nd[0], e.y + nd[1])) break;
      e.dir = nd; e.tx = e.x + nd[0]; e.ty = e.y + nd[1];
      continue;
    }
    const mv = Math.min(rem, dist);
    e.x += Math.sign(dx) * mv; e.y += Math.sign(dy) * mv; rem -= mv;
  }
}

function playerChoose(p) {
  if (p.wantT > 0 && !isWall(p.x + p.want[0], p.y + p.want[1])) return p.want;
  if (!isWall(p.x + p.dir[0], p.y + p.dir[1])) return p.dir;
  return null;
}

function threatTarget(t) {
  const p = G.player, pt = [Math.round(p.x), Math.round(p.y)];
  if (t.state === 'eaten') return G.houseDoor;
  if (G.mode === 'scatter' && !t.disguised) return t.corner;
  switch (t.kind) {
    case 'pulga': return pt;                                                         // persegue direto
    case 'carrapato': return [pt[0] + p.dir[0] * 4, pt[1] + p.dir[1] * 4];          // emboscada à frente
    case 'verme': return Math.hypot(pt[0] - t.x, pt[1] - t.y) > 6 ? pt : t.corner;  // tímido de perto
    case 'chocolate': return t.disguised ? t.corner : pt;
  }
  return pt;
}

function threatChoose(t) {
  if (t.state === 'eaten' && Math.round(t.x) === G.houseDoor[0] && Math.round(t.y) === G.houseDoor[1]) {
    t.state = 'chase'; t.mesh.visible = true; restoreMats(t);
  }
  const opts = DIR_LIST.filter((d) => !isWall(t.x + d[0], t.y + d[1]) && !isRev(d, t.dir));
  const list = opts.length ? opts : DIR_LIST.filter((d) => !isWall(t.x + d[0], t.y + d[1]));
  if (!list.length) return null;
  if (t.state === 'scared') return list[Math.floor(Math.random() * list.length)];
  const [gx, gy] = threatTarget(t);
  let bestD = null, bestS = Infinity;
  for (const d of list) {
    const s = (t.x + d[0] - gx) ** 2 + (t.y + d[1] - gy) ** 2;
    if (s < bestS) { bestS = s; bestD = d; }
  }
  return bestD;
}

function restoreMats(t) { t.mesh.traverse((o) => { if (o.isMesh) o.material = o.userData.baseMat; }); }
function setMats(t, m) { t.mesh.traverse((o) => { if (o.isMesh) o.material = m; }); }

// ---------------------------------------------------------------- gameplay
function addScore(n, x, y, color) {
  const v = n * G.combo;
  G.score += v;
  if (x != null) pop(x, y, '+' + v, color);
}

function bumpCombo() {
  G.comboTimer = 1.4;
  G.comboCount = (G.comboCount || 0) + 1;
  if (G.comboCount % 10 === 0 && G.combo < 8) {
    G.combo++;
    beep(600 + G.combo * 80, 0.15, 'triangle', 0.07, 400);
    trauma = Math.min(1, trauma + 0.15);
  }
}

function eatBones() {
  const p = G.player;
  const radius = G.power === 'brinquedo' ? 2.2 : 0.5;
  for (const [k, b] of G.bones) {
    const [bx, by] = k.split(',').map(Number);
    if (Math.abs(bx - p.x) + Math.abs(by - p.y) <= radius) {
      scene.remove(b); G.bones.delete(k);
      addScore(10);
      bumpCombo();
      p.squash = 0.12;
      burst(bx, by, 0xfff1c4, 3, 1.5);
      beep(420 + (G.comboCount % 8) * 40, 0.05, 'square', 0.035);
    }
  }
  if (G.bones.size === 0) levelUp();
}

function activatePower(pw) {
  const def = POWERS[pw.type];
  scene.remove(pw.mesh);
  G.powers.splice(G.powers.indexOf(pw), 1);
  G.power = pw.type; G.powerT = def.dur;
  G.ghostsEaten = 0;
  trauma = Math.min(1, trauma + 0.35); flash();
  burst(pw.x, pw.y, def.color, 16, 4);
  beep(300, 0.3, 'sawtooth', 0.06, 700);
  addScore(50, pw.x, pw.y, '#7ff');
  tipOnce(pw.type);
  if (pw.type === 'vacina') scareAll();
  if (pw.type === 'spray') {
    // neutraliza a ameaça mais próxima na hora + deixa as outras vulneráveis
    const alive = G.threats.filter((t) => t.state !== 'eaten' && t.state !== 'house');
    alive.sort((a, b) => Math.hypot(a.x - G.player.x, a.y - G.player.y) - Math.hypot(b.x - G.player.x, b.y - G.player.y));
    if (alive[0]) eatThreat(alive[0]);
    scareAll();
  }
  if (pw.type === 'agua') G.shield = true;
}

function scareAll() {
  for (const t of G.threats) if (t.state === 'chase' || t.state === 'scatter') {
    t.state = 'scared'; t.disguised = false; setMats(t, scaredMat);
    t.dir = [-t.dir[0], -t.dir[1]];
  }
}

function eatThreat(t) {
  G.ghostsEaten++;
  const pts = 200 * 2 ** Math.min(G.ghostsEaten - 1, 3);
  addScore(pts, t.x, t.y, '#ffcf3f');
  t.state = 'eaten'; setMats(t, ghostMat);
  hitStop = 0.08; trauma = Math.min(1, trauma + 0.5);
  burst(t.x, t.y, 0xffffff, 14, 5);
  beep(880, 0.2, 'triangle', 0.08, -500);
  tipOnce(t.kind);
}

function hurt(t) {
  if (G.shield) {
    G.shield = false; burst(G.player.x, G.player.y, 0x34e1d6, 18, 5); trauma = 0.5;
    beep(200, 0.2, 'triangle', 0.08, 300); pop(G.player.x, G.player.y, 'ESCUDO!', '#34e1d6');
    t.state = 'eaten'; setMats(t, ghostMat);
    return;
  }
  G.lives--; G.combo = 1; G.comboCount = 0;
  trauma = 1; hitStop = 0.25; flash();
  burst(G.player.x, G.player.y, 0xff5a6e, 24, 6);
  beep(160, 0.5, 'sawtooth', 0.09, -120);
  showTip(t.kind === 'chocolate' ? TIPS.chocolate : TIPS.hit);
  if (G.lives <= 0) { gameOver(); return; }
  G.dying = 1.0;
}

function resetPositions() {
  const p = G.player;
  Object.assign(p, { x: G.startTile[0], y: G.startTile[1], tx: G.startTile[0], ty: G.startTile[1], dir: [0, 0], want: [0, 0] });
  G.threats.forEach((t, i) => {
    const [hx, hy] = G.house[i % G.house.length];
    Object.assign(t, { x: hx, y: hy, tx: hx, ty: hy, dir: [0, -1], state: 'house', releaseT: 1 + i * 2.5, disguised: t.kind === 'chocolate' });
    restoreMats(t);
  });
  G.power = null; G.powerT = 0;
}

function levelUp() {
  G.level++;
  addScore(500);
  showTip(`<b>Fase ${G.level}!</b> As ameaças ficaram mais rápidas. Prevenção é rotina 🐾`);
  beep(523, 0.15, 'triangle', 0.08); setTimeout(() => beep(659, 0.15, 'triangle', 0.08), 150); setTimeout(() => beep(784, 0.3, 'triangle', 0.08), 300);
  const lives = G.lives, score = G.score, level = G.level;
  buildLevel();
  Object.assign(G, { lives, score, level });
}

function gameOver() {
  running = false;
  if (G.score > best) { best = G.score; store.set('patrulhapet.best', best); }
  $('overTitle').textContent = G.score >= best && G.score > 0 ? '🏆 Novo recorde!' : 'Fim de jogo';
  $('overText').innerHTML = `Pontos: <b>${G.score}</b> · Fase ${G.level}<br>Recorde: ${best}<br><br>` +
    'Lembre: vacinas, vermífugo e antiparasitário em dia, água fresca e brincadeira todo dia. Na dúvida, procure o veterinário!';
  setTimeout(() => $('over').classList.remove('hidden'), 700);
}

// ---------------------------------------------------------------- update
function update(dt) {
  const p = G.player;
  if (G.dying > 0) {
    G.dying -= dt;
    p.mesh.rotation.z += dt * 12;
    if (G.dying <= 0) { p.mesh.rotation.z = 0; resetPositions(); }
    return;
  }

  const lvlBoost = 1 + (G.level - 1) * 0.08;
  const pSpeed = 4.6 * (G.power === 'agua' ? 1.35 : G.power === 'brinquedo' ? 1.7 : 1);
  p.wantT -= dt;
  // inversão imediata no meio do caminho
  if (p.wantT > 0 && isRev(p.want, p.dir)) {
    const ox = p.tx - p.dir[0], oy = p.ty - p.dir[1];
    p.dir = p.want; p.tx = ox; p.ty = oy;
  }
  step(p, pSpeed, dt, playerChoose);
  eatBones();

  for (const pw of [...G.powers]) if (Math.abs(pw.x - p.x) + Math.abs(pw.y - p.y) < 0.6) activatePower(pw);

  if (G.power) {
    G.powerT -= dt;
    if (G.powerT <= 0) {
      G.power = null;
      for (const t of G.threats) if (t.state === 'scared') { t.state = 'chase'; restoreMats(t); }
    }
  }

  // ciclo scatter/chase
  G.modeT += dt;
  const cycle = G.modeT % 26;
  G.mode = cycle < 6 ? 'scatter' : 'chase';

  G.powerSpawnT -= dt;
  if (G.powerSpawnT <= 0) {
    G.powerSpawnT = 20;
    const spots = [[1, 1], [17, 1], [1, 12], [17, 12]].filter(([x, y]) => !G.powers.some((q) => q.x === x && q.y === y));
    if (spots.length && G.powers.length < 2) {
      const [x, y] = spots[Math.floor(Math.random() * spots.length)];
      const types = Object.keys(POWERS);
      spawnPower(x, y, types[Math.floor(Math.random() * types.length)]);
      showTip('✨ Um novo <b>poder de prevenção</b> apareceu num canto do mapa!', 2.2);
    }
  }

  for (const t of G.threats) {
    if (t.state === 'house') {
      t.releaseT -= dt;
      t.bob += dt * 6;
      if (t.releaseT <= 0) { t.x = t.tx = G.houseDoor[0]; t.y = t.ty = G.houseDoor[1]; t.state = 'chase'; }
      continue;
    }
    if (t.disguised && Math.hypot(t.x - p.x, t.y - p.y) < 4) {
      t.disguised = false; pop(t.x, t.y, 'É CHOCOLATE!', '#ff9a5a'); beep(220, 0.25, 'sawtooth', 0.06, 200);
    }
    let sp = 3.9 * lvlBoost;
    if (t.kind === 'verme') sp *= 0.85;
    if (t.kind === 'chocolate') sp *= t.disguised ? 0.6 : 1.12;
    if (t.state === 'scared') sp = 2.3;
    if (t.state === 'eaten') sp = 9;
    step(t, sp, dt, threatChoose);
    if (t.state === 'eaten' && Math.round(t.x) === G.houseDoor[0] && Math.round(t.y) === G.houseDoor[1] && Math.abs(t.x - t.tx) + Math.abs(t.y - t.ty) < 0.05) {
      t.state = 'chase'; restoreMats(t);
    }
    // escudo do spray: pulgas/carrapatos não tocam quem tem spray ativo
    const d = Math.hypot(t.x - p.x, t.y - p.y);
    if (d < 0.65) {
      if (t.state === 'scared') eatThreat(t);
      else if (t.state === 'chase') { hurt(t); if (G.dying > 0 || !running) return; }
    }
    // piscar no fim do poder
    if (t.state === 'scared') setMats(t, G.powerT < 2 && Math.floor(G.powerT * 6) % 2 ? scaredFlash : scaredMat);
  }

  G.comboTimer -= dt;
  if (G.comboTimer <= 0 && G.combo > 1) { G.combo = 1; G.comboCount = 0; }
}

// ---------------------------------------------------------------- view sync
const tmpLook = new THREE.Vector3();
function syncView(dt, realDt, time) {
  const p = G.player;
  p.mesh.position.set(wx(p.x), 0, wz(p.y));
  if (p.dir[0] || p.dir[1]) {
    const target = Math.atan2(p.dir[0], p.dir[1]);
    let diff = target - p.face; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    p.face += diff * Math.min(1, dt * 18);
  }
  p.mesh.rotation.y = p.face;
  p.squash = Math.max(0, p.squash - dt);
  const sq = 1 + p.squash * 2.5;
  p.mesh.scale.set(sq, 1 / sq, sq);
  const moving = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.01;
  p.mesh.children.forEach((c) => { if (c.userData.leg) c.rotation.x = moving ? Math.sin(time * 18 + c.userData.leg.s * c.userData.leg.f) * 0.6 : 0; });
  p.mesh.userData.tail.rotation.y = Math.sin(time * 20) * 0.6;
  p.mesh.position.y = moving ? Math.abs(Math.sin(time * 18)) * 0.06 : 0;

  for (const t of G.threats) {
    t.bob += dt * 5;
    const yb = t.state === 'house' ? Math.abs(Math.sin(t.bob)) * 0.25 : Math.abs(Math.sin(t.bob)) * 0.08;
    t.mesh.position.set(wx(t.x), yb, wz(t.y));
    if (t.dir[0] || t.dir[1]) t.mesh.rotation.y = Math.atan2(t.dir[0], t.dir[1]);
    t.mesh.scale.setScalar(t.disguised ? 0.75 : 1);
  }
  for (const b of G.bones.values()) b.rotation.y += dt * 1.5;
  for (const pw of G.powers) {
    pw.mesh.userData.item.rotation.y += dt * 3;
    pw.mesh.userData.item.position.y = 0.45 + Math.sin(time * 4) * 0.08;
    pw.mesh.scale.setScalar(1 + Math.sin(time * 6) * 0.06);
  }

  // câmera com follow suave + shake (tempo real, decai mesmo durante hit-stop)
  trauma = Math.max(0, trauma - realDt * 1.6);
  const shake = trauma * trauma;
  const portrait = innerHeight > innerWidth;
  const height = portrait ? 13 : 10.5, back = portrait ? 4.5 : 4.2;
  const fx = wx(p.x) * 0.8, fz = wz(p.y) * 0.8;
  const want = new THREE.Vector3(fx, height, fz + back);
  camPos.lerp(want, 1 - Math.exp(-realDt * 4));
  camera.position.copy(camPos).add(new THREE.Vector3((Math.random() - 0.5) * shake * 0.8, (Math.random() - 0.5) * shake * 0.5, 0));
  tmpLook.set(fx, 0, fz + 0.3);
  camera.lookAt(tmpLook);
  camera.rotation.z += (Math.random() - 0.5) * shake * 0.05;
}

function renderHUD(realDt) {
  $('score').textContent = '🦴 ' + G.score;
  $('lives').textContent = '❤'.repeat(Math.max(0, G.lives)) + (G.shield ? ' 💧' : '');
  $('best').textContent = '🏆 ' + Math.max(best, G.score);
  const cb = $('combo');
  cb.style.opacity = G.combo > 1 ? 1 : 0;
  cb.textContent = 'COMBO x' + G.combo;
  cb.style.transform = `translateX(-50%) scale(${1 + Math.max(0, G.comboTimer - 1) * 0.6})`;
  const pw = $('power');
  if (G.power) {
    const d = POWERS[G.power];
    pw.style.display = '';
    $('powerLbl').textContent = d.icon + ' ' + d.name;
    $('powerFill').style.width = (100 * G.powerT / d.dur) + '%';
    $('powerFill').style.background = '#' + d.color.toString(16).padStart(6, '0');
  } else pw.style.display = 'none';
  if (tipTimer > 0) { tipTimer -= realDt; if (tipTimer <= 0) $('tip').classList.remove('show'); }
}

// ---------------------------------------------------------------- loop
let last = performance.now(), time = 0;
renderer.setAnimationLoop(() => {
  const now = performance.now();
  const realDt = Math.min(Math.max((now - last) / 1000, 0), 0.1);
  last = now;
  let dt = realDt;
  if (hitStop > 0) { hitStop -= realDt; dt = 0; }
  time += dt;
  if (G) {
    if (running) update(dt);
    syncView(dt, realDt, time);
    renderHUD(realDt);
  } else {
    camera.position.set(0, 16, 11); camera.lookAt(0, 0, 0.5);
  }
  updateParticles(dt || realDt * 0.2);
  renderer.render(scene, camera);
});

// ---------------------------------------------------------------- telas
$('play').onclick = () => { $('start').classList.add('hidden'); newGame(); showTip('Coma os <b>petiscos</b> 🦴 e fuja das ameaças! Pegue os <b>poderes</b> nos cantos.'); beep(523, 0.1, 'triangle', 0.06); };
$('again').onclick = () => { $('over').classList.add('hidden'); newGame(); };
$('best').textContent = '🏆 ' + best;

// debug / smoke test
Object.assign(window, { renderer, scene, getGame: () => G, want, DIRS });
