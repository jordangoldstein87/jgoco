/* Bloomfield in fall: a matte architect's model of the real town, built in three.js.
   Meters from the crossroads of Taylorsville, Bardstown, Lawrenceburg and Springfield
   roads (37.91196, -85.31782); +x is east, +z is south. Streets and the East Fork of
   Simpson Creek follow the satellite view. Past ~160 m everything is pulled in so the
   four stays and the Deere John tractors fit on the same table. */
(function () {
  const T = window.THREE;
  if (T.ColorManagement) T.ColorManagement.legacyMode = false;
  const PPM = 30;

  const C = {
    road: "#4b4845", walk: "#b3a993", gold: "#c9a24a", water: "#4f6670", bank: "#5f5a3a",
    trunk: "#5a4636", sycamore: "#d9d2c2",
    // fall in Nelson County: maples, oaks, sycamores, hickories and the last green
    maple: ["#a63a1f", "#b8501e", "#8c2a1d", "#c0662a"],
    oak: ["#7d4a24", "#8a5a2b", "#6e3b22", "#94612f"],
    gold: ["#c9952c", "#d4ad45", "#b88326", "#dcbc5a"],
    green: ["#5d6b31", "#6f7a3a", "#4f5c2e"],
    cedar: ["#2f3d2a", "#38482f", "#2a3626"],
  };

  /* ---------- the town plan, traced from satellite ---------- */
  const E = Math.PI / 2, W = -Math.PI / 2;
  const ROADS = {
    taylorsville: [[0, 0], [1, -60], [3, -140], [5, -220], [7, -300], [9, -380], [11, -470]],
    springfield: [[0, 0], [9, 52], [30, 110], [56, 165], [78, 230], [94, 296], [108, 380], [118, 465], [120, 520]],
    lawrenceburg: [[0, 0], [60, 2], [122, 5], [220, 18], [320, 32], [480, 52]],
    bardstown: [[0, 0], [-30, 18], [-66, 42], [-100, 72], [-132, 108], [-170, 165], [-207, 230], [-250, 320], [-290, 470]],
    fairfield: [[-132, 108], [-200, 124], [-254, 132], [-348, 132], [-480, 138]],
    depot: [[-80, 54], [-120, 0], [-160, -78], [-207, -155], [-250, -260], [-280, -360]],
    riverside: [[-30, 20], [-24, 42], [-19, 117], [10, 210], [38, 296], [56, 409], [66, 500]],
    perry: [[-150, -172], [-60, -170], [5, -168], [80, -166], [150, -170]],
    goodloe: [[-190, -248], [-90, -244], [6, -240]],
    mckay: [[136, 5], [138, -80], [142, -170], [146, -240]],
    eagle: [[60, 150], [120, 128], [190, 96], [270, 84]],
    boone: [[6, -248], [-40, -252], [-90, -262], [-118, -268]],
    allie: [[10, -420], [70, -428], [130, -446], [160, -458]],
  };
  const MAIN = ["taylorsville", "springfield", "lawrenceburg", "bardstown"];
  const CREEK = [[-360, -420], [-330, -330], [-280, -220], [-232, -120], [-182, -36], [-128, 18], [-74, 58], [-24, 104], [8, 170], [26, 230], [45, 290], [62, 380], [78, 470], [92, 600]];

  // Taylorsville Rd storefronts, north of the crossroads. West side faces east, east side faces west.
  const ROW = [
    { id: "nest", x: -14, z: -16, w: 9, d: 14, h: 7.6, rot: E, brick: "#8a4a36", trim: "#e9e1cf", sign: "The Nest", awning: "#5b6b4f", arched: false },
    { id: "row-a", x: -14, z: -25.5, w: 10, d: 15, h: 8.6, rot: E, brick: "#7d3f2f", trim: "#d9cfb6", cornice: "DAVIS", arched: true },
    { id: "row-b", x: -14, z: -35, w: 9, d: 15, h: 8.2, rot: E, brick: "#844634", trim: "#d9cfb6", cornice: "MUIR", arched: true },
    { id: "pizza", x: -14, z: -44, w: 9, d: 15, h: 8.4, rot: E, brick: "#93533b", trim: "#2f4a3a", sign: "Hometown Pizza", awning: "#7a2b23", arched: true },
    { id: "nettie", x: -14.5, z: -57, w: 15, d: 17, h: 8.8, rot: E, brick: "#7b3b2c", trim: "#e6dcc5", sign: "Nettie Jarvis Antiques", awning: "#1f3a2b", arched: true },
    { id: "row-c", x: -14, z: -69.5, w: 9, d: 14, h: 7.4, rot: E, brick: "#9a5a40", trim: "#3b3b36", arched: false },
    { id: "merrifield", x: -13.5, z: -79, w: 9, d: 13, h: 6.8, rot: E, brick: "#e7d9c9", trim: "#823f49", sign: "Miss Merrifield's", awning: "#c98d97", arched: false, paint: true },
    { id: "ernies", x: 14, z: -18, w: 14, d: 16, h: 8.8, rot: W, brick: "#7a3a2b", trim: "#e2d6bd", sign: "Ernie's Tavern", awning: "#103a26", arched: true, corner: true },
    { id: "doubledip", x: 14, z: -31, w: 9, d: 15, h: 8.2, rot: W, brick: "#8d4c37", trim: "#f6efe0", sign: "The Double Dip", awning: "#b3121d", arched: true, neon: true },
    { id: "row-d", x: 14, z: -42, w: 10, d: 15, h: 8.4, rot: W, brick: "#6e3529", trim: "#d4c5a3", arched: true },
    { id: "row-e", x: 14, z: -53, w: 9, d: 14, h: 7.2, rot: W, brick: "#94573f", trim: "#2f4a3a", arched: false },
    { id: "row-f", x: 14, z: -64, w: 10, d: 14, h: 6.6, rot: W, brick: "#a06a4c", trim: "#e9e1cf", arched: false },
    // the Bardstown Rd fork
    { id: "velvet", x: -34, z: -4, w: 11, d: 14, h: 8.0, rot: 2.1, brick: "#5c2b27", trim: "#d4c5a3", sign: "The Velvet Room", awning: "#4a1620", arched: true },
    { id: "rowdys", x: -52, z: 14, w: 16, d: 18, h: 8.6, rot: 2.1, brick: "#6b5644", trim: "#d9c48a", sign: "Rowdy's Dance Hall", awning: "#6e2a20", arched: false, wood: true, porch: true },
    { id: "shortcrust", x: -96, z: 52, w: 9, d: 12, h: 6.2, rot: 2.3, brick: "#d6ccb6", trim: "#4b5a4a", sign: "Shortcrust", awning: "#4b5a4a", arched: false, paint: true },
    { id: "cosmopolitan", x: -116, z: 74, w: 10, d: 12, h: 7.4, rot: 2.3, brick: "#86503b", trim: "#e9e1cf", sign: "", arched: false },
  ];

  const SPECIAL = {
    church: { x: 30, z: -112, rot: W },          // 126 Taylorsville Rd, the old Methodist church
    baptist: { x: 44, z: 68, rot: -1.95 },        // Bloomfield Baptist, Springfield Rd
    pinkhouse: { x: -36, z: -82, rot: E },        // across the courtyard behind the tea parlor
    depot: { x: -118, z: -40, rot: 0.55 },        // now City Hall
    warehouse: { x: -196, z: -86, rot: 0.42 },    // the long white tobacco warehouse on Depot St
    cemetery: { x: 82, z: -232 },
    clayborn: { x: 26, z: -268, rot: W },
    boones: { x: -128, z: -282, rot: 0.3 },
    allies: { x: 176, z: -470, rot: -0.2 },
    tractor: { x: -22, z: -455 },
    creek: { x: 24, z: 228 },
  };

  function compressNote(id) { return { clayborn: "1 mi north", boones: "1.2 mi north", allies: "2.5 mi north", tractor: "1.5 mi north" }[id]; }
  /* ---------- helpers ---------- */
  const mats = new Map();
  function matte(color, extra) {
    const key = color + JSON.stringify(extra || {});
    if (!mats.has(key)) mats.set(key, new T.MeshStandardMaterial(Object.assign({ color, roughness: 0.92, metalness: 0 }, extra)));
    return mats.get(key);
  }
  function rnd(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function shade(hex, f) {
    const c = new T.Color(hex); const hsl = {}; c.getHSL(hsl);
    c.setHSL(hsl.h, hsl.s, Math.max(0, Math.min(1, hsl.l * f))); return "#" + c.getHexString();
  }
  function canvas(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function tex(c) { const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 8; return t; }

  function brickFill(g, w, h, base, wood, r) {
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    if (wood) {
      for (let y = 0; y < h; y += 7) { g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(0, y, w, 1); }
      return;
    }
    const bh = 5, bw = 13;
    for (let y = 0, row = 0; y < h; y += bh, row++) {
      for (let x = (row % 2) * -6; x < w; x += bw) {
        const v = r() * 0.14 - 0.07;
        g.fillStyle = v > 0 ? `rgba(255,240,220,${v})` : `rgba(30,10,0,${-v})`;
        g.fillRect(x, y, bw - 1, bh - 1);
      }
      g.fillStyle = "rgba(230,215,195,0.10)"; g.fillRect(0, y + bh - 1, w, 1);
    }
  }

  function windowShape(g, x, y, ww, wh, arched, trim, glass) {
    g.fillStyle = trim;
    g.beginPath();
    if (arched) { g.moveTo(x - 3, y + wh + 3); g.lineTo(x - 3, y + ww / 2); g.arc(x + ww / 2, y + ww / 2, ww / 2 + 3, Math.PI, 0); g.lineTo(x + ww + 3, y + wh + 3); }
    else g.rect(x - 3, y - 3, ww + 6, wh + 6);
    g.fill();
    g.fillStyle = glass;
    g.beginPath();
    if (arched) { g.moveTo(x, y + wh); g.lineTo(x, y + ww / 2); g.arc(x + ww / 2, y + ww / 2, ww / 2, Math.PI, 0); g.lineTo(x + ww, y + wh); }
    else g.rect(x, y, ww, wh);
    g.fill();
    g.fillStyle = trim; g.fillRect(x + ww / 2 - 1, y + (arched ? ww / 2 : 0), 2, wh - (arched ? ww / 2 : 0)); g.fillRect(x, y + wh * 0.55, ww, 2);
    g.fillRect(x - 5, y + wh + 2, ww + 10, 5); // sill
  }

  function facade(spec, seed) {
    const w = Math.round(spec.w * PPM), h = Math.round(spec.h * PPM);
    const map = canvas(w, h), glow = canvas(w, h);
    const g = map.getContext("2d"), e = glow.getContext("2d");
    const r = rnd(seed);
    e.fillStyle = "#000"; e.fillRect(0, 0, w, h);
    brickFill(g, w, h, spec.brick, spec.wood || spec.paint, r);
    // cornice
    const cor = Math.round(0.8 * PPM);
    g.fillStyle = spec.trim; g.fillRect(0, 0, w, cor);
    g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, cor - 4, w, 4);
    for (let x = 4; x < w; x += 10) { g.fillStyle = "rgba(0,0,0,0.16)"; g.fillRect(x, cor - 12, 5, 6); }
    if (spec.cornice) {
      g.fillStyle = shade(spec.trim, 0.55); g.font = `600 ${Math.round(cor * 0.48)}px "Cormorant SC", Georgia, serif`;
      g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(spec.cornice, w / 2, cor * 0.45);
    }
    // ground floor storefront
    const gf = Math.round(3.6 * PPM), gy = h - gf;
    const pil = Math.round(0.45 * PPM);
    g.fillStyle = shade(spec.trim, 0.9); g.fillRect(0, gy - 10, w, 10); // belt course
    g.fillStyle = shade(spec.brick, 0.8); g.fillRect(0, gy, pil, gf); g.fillRect(w - pil, gy, pil, gf);
    const sx = pil + 6, sw = w - 2 * pil - 12, sy = gy + Math.round(0.9 * PPM), sh = gf - Math.round(1.3 * PPM);
    // sign board
    g.fillStyle = spec.trim; g.fillRect(pil, gy, w - 2 * pil, Math.round(0.75 * PPM));
    if (spec.sign) {
      g.fillStyle = shade(spec.trim, 0.32);
      if (shade(spec.trim, 1) < "#888888") g.fillStyle = "#efe6d2";
      let fs = Math.round(0.42 * PPM); g.font = `italic 500 ${fs}px "Cormorant Garamond", Georgia, serif`;
      while (g.measureText(spec.sign).width > w - 2 * pil - 16 && fs > 8) { fs--; g.font = `italic 500 ${fs}px "Cormorant Garamond", Georgia, serif`; }
      g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(spec.sign, w / 2, gy + Math.round(0.4 * PPM));
    }
    const ig = g.createLinearGradient(0, sy, 0, sy + sh);
    ig.addColorStop(0, "#2c2a26"); ig.addColorStop(1, "#4a3d2e");
    g.fillStyle = ig; g.fillRect(sx, sy, sw, sh);
    e.fillStyle = "#ffcf8a"; e.fillRect(sx, sy, sw, sh);
    g.fillStyle = "rgba(255,255,255,0.07)";
    g.beginPath(); g.moveTo(sx, sy + sh); g.lineTo(sx + sw * 0.35, sy); g.lineTo(sx + sw * 0.5, sy); g.lineTo(sx + sw * 0.15, sy + sh); g.fill();
    const door = Math.round(1.1 * PPM);
    g.fillStyle = shade(spec.trim, spec.trim < "#888888" ? 1.2 : 0.4); g.fillRect(w / 2 - door / 2 - 3, sy - 3, door + 6, sh + 3);
    g.fillStyle = "#3a2e24"; g.fillRect(w / 2 - door / 2, sy, door, sh);
    e.fillStyle = "#000"; e.fillRect(w / 2 - door / 2 - 3, sy - 3, door + 6, sh + 3);
    g.fillStyle = spec.trim;
    for (let x = sx; x < sx + sw; x += Math.max(26, sw / 6)) g.fillRect(x, sy, 3, sh);
    g.fillRect(sx, sy + Math.round(0.45 * PPM), sw, 3);
    g.fillStyle = shade(spec.brick, 0.65); g.fillRect(sx, sy + sh, sw, h - sy - sh); // bulkhead
    // upper floors
    const upper = gy - cor - 14, stories = spec.h > 7.8 ? 2 : 1;
    const per = upper / stories;
    const n = Math.max(2, Math.floor(spec.w / 2.4));
    const ww = Math.round(0.82 * PPM), wh = Math.min(per - 26, Math.round(1.9 * PPM));
    for (let s = 0; s < stories; s++) {
      const y = cor + 10 + s * per + (per - wh) / 2;
      for (let i = 0; i < n; i++) {
        const x = Math.round((w / n) * (i + 0.5) - ww / 2);
        windowShape(g, x, y, ww, wh, spec.arched, spec.trim, "#2d3236");
        if (r() > 0.45) { e.fillStyle = "#e9b96e"; e.fillRect(x + 2, y + ww / 2, ww - 4, wh - ww / 2 - 2); }
        g.fillStyle = "rgba(220,230,235,0.10)"; g.fillRect(x + 2, y + ww / 2, ww / 2 - 3, wh * 0.4);
      }
    }
    return { map: tex(map), glow: tex(glow) };
  }

  function sideTex(color, wood, seed) {
    const c = canvas(256, 256), g = c.getContext("2d");
    brickFill(g, 256, 256, shade(color, 0.92), wood, rnd(seed));
    return tex(c);
  }

  function gable(w, d, rise, color, overhang) {
    const o = overhang || 0.4;
    const s = new T.Shape();
    s.moveTo(-w / 2 - o, 0); s.lineTo(0, rise); s.lineTo(w / 2 + o, 0); s.lineTo(-w / 2 - o, 0);
    const g = new T.ExtrudeGeometry(s, { depth: d + o * 2, bevelEnabled: false });
    g.translate(0, 0, -d / 2 - o);
    const m = new T.Mesh(g, matte(color)); m.castShadow = true; m.receiveShadow = true; return m;
  }
  function box(w, h, d, mat) { const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat); m.castShadow = true; m.receiveShadow = true; return m; }

  function ribbon(pts, width, y, mat, closedEnds) {
    // smooth the polyline with a Catmull-Rom curve, then lay a flat strip along it
    const curve = new T.CatmullRomCurve3(pts.map(p => new T.Vector3(p[0], 0, p[1])), false, "centripetal");
    const n = Math.max(8, Math.round(curve.getLength() / 2));
    const P = curve.getSpacedPoints(n);
    const pos = [], idx = [], uv = [];
    let run = 0;
    for (let i = 0; i <= n; i++) {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(n, i + 1)];
      const dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1;
      const nx = -dz / l * width / 2, nz = dx / l * width / 2;
      if (i) run += P[i].distanceTo(P[i - 1]);
      pos.push(P[i].x + nx, y, P[i].z + nz, P[i].x - nx, y, P[i].z - nz);
      uv.push(0, run / width, 1, run / width);
      if (i < n) { const k = i * 2; idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3); }
    }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    const m = new T.Mesh(g, mat); m.receiveShadow = true;
    m.userData.points = P;
    return m;
  }

  function distToPolyline(x, z, P) {
    let best = Infinity;
    for (let i = 1; i < P.length; i++) {
      const ax = P[i - 1].x, az = P[i - 1].z, bx = P[i].x, bz = P[i].z;
      const dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz || 1;
      let t = ((x - ax) * dx + (z - az) * dz) / l2; t = Math.max(0, Math.min(1, t));
      best = Math.min(best, Math.hypot(x - ax - t * dx, z - az - t * dz));
    }
    return best;
  }


  function house(opts, r) {
    // a few real Bloomfield types: clapboard I-house, shotgun cottage, brick foursquare, Victorian front gable
    const gr = new T.Group();
    const style = opts.style;
    const wall = matte(opts.color), roofC = opts.roof, trim = matte("#efe9dc");
    const w = opts.w, d = opts.d, h = opts.h;
    const body = box(w, h, d, wall); body.position.y = h / 2 + 0.5; gr.add(body);
    const found = box(w + 0.2, 0.5, d + 0.2, matte("#8f877a")); found.position.y = 0.25; gr.add(found);
    if (style === "foursquare") {
      const roof = new T.Mesh(new T.ConeGeometry(1, 1, 4), matte(roofC)); roof.rotation.y = Math.PI / 4; roof.scale.set(w * 0.78, 3.2, d * 0.78); roof.position.y = h + 0.5 + 1.6; roof.castShadow = true; gr.add(roof);
      const dorm = box(2.2, 1.6, 1.6, wall); dorm.position.set(0, h + 1.6, d / 2 - 1.4); gr.add(dorm);
    } else if (style === "victorian") {
      const roof = gable(d, w, w * 0.55, roofC, 0.5); roof.rotation.y = Math.PI / 2; roof.position.y = h + 0.5; gr.add(roof);
      const bay = box(2.6, h * 0.8, 1.2, wall); bay.position.set(-w * 0.22, h * 0.4 + 0.5, d / 2 + 0.6); gr.add(bay);
    } else {
      const roof = gable(w, d, (style === "shotgun" ? 0.7 : 0.42) * Math.min(w, d), roofC, 0.5);
      if (style === "shotgun") roof.rotation.y = Math.PI / 2;
      roof.position.y = h + 0.5; gr.add(roof);
    }
    if (opts.porch) {
      const p = box(w * 0.92, 0.2, 2.4, matte("#a59c8c")); p.position.set(0, 0.6, d / 2 + 1.2); gr.add(p);
      const pr = box(w * 0.96, 0.14, 2.7, matte(roofC)); pr.position.set(0, h * 0.62 + 0.5, d / 2 + 1.25); pr.rotation.x = 0.12; gr.add(pr);
      const n = Math.max(3, Math.round(w / 2.6));
      for (let i = 0; i < n; i++) { const c = box(0.16, h * 0.62 - 0.1, 0.16, trim); c.position.set(-w * 0.44 + i * (w * 0.88) / (n - 1), 0.6 + (h * 0.62 - 0.1) / 2, d / 2 + 2.35); gr.add(c); }
    }
    const pane = matte("#2c3236");
    const nw = Math.max(2, Math.floor(w / 2.8));
    for (let f = 0; f < (h > 5 ? 2 : 1); f++) for (let i = 0; i < nw; i++) {
      const x = -w / 2 + (w / nw) * (i + 0.5);
      const fr = box(1.0, 1.55, 0.06, trim); fr.position.set(x, 1.9 + f * 2.9, d / 2 + 0.03); fr.castShadow = false; gr.add(fr);
      const p = box(0.78, 1.3, 0.07, pane); p.position.set(x, 1.9 + f * 2.9, d / 2 + 0.04); p.castShadow = false; gr.add(p);
      if (opts.shutters) for (const s of [-1, 1]) { const sh = box(0.32, 1.5, 0.05, matte(opts.shutters)); sh.position.set(x + s * 0.68, 1.9 + f * 2.9, d / 2 + 0.04); sh.castShadow = false; gr.add(sh); }
    }
    const door = box(1, 2.1, 0.08, matte(opts.door || "#3d2b22")); door.position.set(w * 0.18, 1.55, d / 2 + 0.04); gr.add(door);
    if (opts.chimney) { const ch = box(0.8, 2.6, 0.8, matte("#7b3b2c")); ch.position.set(w * 0.3, h + 1.6, -d * 0.15); gr.add(ch); }
    return gr;
  }

  function groundTexture() {
    const S = 2048, c = canvas(S, S), g = c.getContext("2d"), r = rnd(7);
    const scale = S / 1000;
    const P = (x, z) => [(x + 500) * scale, (z + 500) * scale];
    g.fillStyle = "#77744a"; g.fillRect(0, 0, S, S);
    // big soft patches of pasture, mown lawn and tobacco ground
    for (let i = 0; i < 260; i++) {
      const [x, y] = [r() * S, r() * S], rr = 20 + r() * 120;
      const gr = g.createRadialGradient(x, y, 0, x, y, rr);
      const col = ["rgba(120,118,64,", "rgba(150,132,78,", "rgba(98,104,54,", "rgba(160,120,70,"][(r() * 4) | 0];
      gr.addColorStop(0, col + "0.55)"); gr.addColorStop(1, col + "0)");
      g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    }
    // farm fields outside town
    const fields = [[-490, -490, 250, 210, "#b49a5a"], [200, -300, 260, 180, "#9a8a4c"], [230, 100, 250, 240, "#a77c45"], [-490, 220, 230, 250, "#a3874d"],
      [150, -490, 300, 120, "#8d8248"], [-490, -250, 160, 170, "#97864c"], [-120, 330, 190, 160, "#b19459"], [300, -120, 190, 180, "#a1773f"]];
    for (const [x, z, w, d, col] of fields) {
      const [px, py] = P(x, z);
      g.save(); g.globalAlpha = 0.9; g.fillStyle = col; g.fillRect(px, py, w * scale, d * scale);
      g.globalAlpha = 0.14; g.fillStyle = "#2a2310";
      for (let i = 0; i < w * scale; i += 5) g.fillRect(px + i, py, 1.5, d * scale);
      g.restore();
    }
    // Maple Grove Cemetery lawn
    { const [px, py] = P(40, -275); g.fillStyle = "#6c7340"; g.fillRect(px, py, 85 * scale, 85 * scale); }
    // Memorial Park ballfield and pond
    { const [px, py] = P(-470, -110); g.fillStyle = "#6f7a3c"; g.beginPath(); g.arc(px, py, 50, 0, 7); g.fill(); g.fillStyle = "#a3845a"; g.beginPath(); g.moveTo(px, py + 22); g.arc(px, py + 22, 26, -2.4, -0.75); g.fill(); }
    // grain, then fallen leaves thick under the creek trees
    for (let i = 0; i < 120000; i++) {
      const x = r() * S, y = r() * S, v = r();
      if (v < 0.86) { g.fillStyle = v < 0.45 ? "rgba(50,45,20,0.10)" : "rgba(210,190,130,0.08)"; g.fillRect(x, y, 2, 2); }
      else { g.globalAlpha = 0.45; g.fillStyle = [...C.maple, ...C.gold, ...C.oak][(r() * 12) | 0]; g.fillRect(x, y, 3, 2); g.globalAlpha = 1; }
    }
    return tex(c);
  }

  function skyTexture(top, bottom) {
    const c = canvas(4, 256), g = c.getContext("2d");
    const gr = g.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, top); gr.addColorStop(1, bottom);
    g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
    return tex(c);
  }


  // a sheet of painted leaves: light-gray so each tree's instance color tints it
  function leafAtlas() {
    const S = 256, c = canvas(S, S), g = c.getContext("2d"), r = rnd(55);
    g.clearRect(0, 0, S, S);
    for (let i = 0; i < 520; i++) {
      // denser in the middle, thinning to a ragged edge
      const a = r() * 6.283, d = Math.pow(r(), 0.65) * S * 0.46;
      const x = S / 2 + Math.cos(a) * d, y = S / 2 + Math.sin(a) * d;
      const L = 9 + r() * 12, w = L * (0.45 + r() * 0.3);
      const shade = 190 + r() * 65 - d * 0.15;
      g.save(); g.translate(x, y); g.rotate(r() * 6.283);
      g.fillStyle = `rgb(${shade | 0},${shade | 0},${shade | 0})`;
      g.beginPath();
      if (r() < 0.5) { g.ellipse(0, 0, w, L, 0, 0, 7); }
      else { for (let k = 0; k < 5; k++) { const aa = k * 1.2566 - 1.57, rr = k % 2 ? L * 0.6 : L; g.lineTo(Math.cos(aa) * rr * 0.8, Math.sin(aa) * rr); g.lineTo(Math.cos(aa + 0.63) * L * 0.35, Math.sin(aa + 0.63) * L * 0.35); } }
      g.fill();
      g.strokeStyle = `rgba(0,0,0,${0.12 + r() * 0.1})`; g.lineWidth = 0.8; g.stroke();
      g.restore();
    }
    const t = new T.CanvasTexture(c); t.anisotropy = 4; return t;
  }

  // one lumpy leaf-clump, reused by every tree
  function clumpGeometry() {
    const g = new T.SphereGeometry(1, 16, 12);
    const p = g.attributes.position, v = new T.Vector3(), r = rnd(99);
    const seen = new Map();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const k = v.x.toFixed(3) + v.y.toFixed(3) + v.z.toFixed(3);
      if (!seen.has(k)) seen.set(k, 0.86 + r() * 0.22 + 0.06 * Math.sin(v.x * 5) * Math.cos(v.z * 4));
      v.multiplyScalar(seen.get(k)); p.setXYZ(i, v.x, v.y * 0.86, v.z);
    }
    g.computeVertexNormals();
    return g;
  }

  function compress(x, z) {
    const r = Math.hypot(x, z); if (r < 160) return [x, z];
    const k = (160 + (r - 160) * 0.14) / r; return [x * k, z * k];
  }

  /* ---------- scene ---------- */
  function mount(el, opts) {
    opts = opts || {};
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = Math.min(innerWidth, innerHeight) < 600;
    const renderer = new T.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(small ? 1.5 : 2, window.devicePixelRatio || 1));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);


    // oil-paint pass: render the scene off-screen, then a Kuwahara filter turns detail into
    // brush-like patches; a canvas weave and a warm varnish finish it like a painted map
    const paint = { on: true };
    const rt = new T.WebGLRenderTarget(4, 4, { type: T.HalfFloatType });
    rt.depthTexture = new T.DepthTexture(4, 4, T.UnsignedIntType);
    const postScene = new T.Scene(), postCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMat = new T.ShaderMaterial({
      uniforms: { tScene: { value: rt.texture }, res: { value: new T.Vector2(4, 4) }, radius: { value: 2 }, exposure: { value: 0.95 }, illus: { value: 0 } },
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader: `
        uniform sampler2D tScene; uniform vec2 res; uniform int radius; uniform float exposure; uniform float illus; varying vec2 vUv;
        float lum(vec2 uv){ vec3 c = texture2D(tScene, uv).rgb; return dot(c, vec3(.299,.587,.114)); }
        vec3 aces(vec3 x){ x *= exposure * 0.6; return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main(){
          vec2 px = 1.0 / res;
          vec3 m[4]; vec3 s[4];
          for (int k = 0; k < 4; k++) { m[k] = vec3(0.0); s[k] = vec3(0.0); }
          float n = 0.0;
          for (int j = -7; j <= 0; j++) for (int i = -7; i <= 0; i++) {
            if (-i > radius || -j > radius) continue;
            n += 1.0;
            vec3 c0 = texture2D(tScene, vUv + vec2(float(i), float(j)) * px).rgb;
            vec3 c1 = texture2D(tScene, vUv + vec2(float(-i), float(j)) * px).rgb;
            vec3 c2 = texture2D(tScene, vUv + vec2(float(i), float(-j)) * px).rgb;
            vec3 c3 = texture2D(tScene, vUv + vec2(float(-i), float(-j)) * px).rgb;
            m[0] += c0; s[0] += c0 * c0; m[1] += c1; s[1] += c1 * c1;
            m[2] += c2; s[2] += c2 * c2; m[3] += c3; s[3] += c3 * c3;
          }
          float best = 1e9; vec3 col = vec3(0.0);
          for (int k = 0; k < 4; k++) {
            vec3 mu = m[k] / n; vec3 v = abs(s[k] / n - mu * mu);
            float sig = v.r + v.g + v.b;
            if (sig < best) { best = sig; col = mu; }
          }
          // crisp it back up: push the painted color away from the local average so edges and curves stay sharp
          vec3 avg = (m[0] + m[1] + m[2] + m[3]) / (4.0 * n);
          col += (col - avg) * 0.35;
          col = aces(col);
          col = pow(col, vec3(1.0 / 2.2));
          // varnish: a touch warmer and softer in the shadows, slightly richer in the mids
          col = mix(col, col * vec3(1.04, 0.99, 0.9), 0.6);
          float l = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(l), col, 1.18);
          // canvas weave and a little brush grain
          vec2 fc = gl_FragCoord.xy;
          float weave = (sin(fc.x * 1.9) * sin(fc.y * 1.9)) * 0.006 + (hash(floor(fc / 2.0)) - 0.5) * 0.014;
          col += weave;
          if (illus > 1.5) {
            // painted evening: crisp edges, rich color, a fine dark outline for definition
            float gx = lum(vUv + vec2(px.x, 0.)) - lum(vUv - vec2(px.x, 0.));
            float gy = lum(vUv + vec2(0., px.y)) - lum(vUv - vec2(0., px.y));
            float ink = smoothstep(0.03, 0.12, length(vec2(gx, gy)));
            float l2 = dot(col, vec3(0.299, 0.587, 0.114));
            col = mix(vec3(l2), col, 1.25);
            col = mix(col, vec3(0.06, 0.06, 0.1), ink * 0.45);
            vec2 q = vUv - 0.5; col *= 1.0 - dot(q, q) * 0.35;
          } else if (illus > 0.5) {
            // illustrated map: ink outlines from the scene's edges, watercolor wash on warm paper
            float gx = lum(vUv + vec2(px.x, 0.)) - lum(vUv - vec2(px.x, 0.));
            float gy = lum(vUv + vec2(0., px.y)) - lum(vUv - vec2(0., px.y));
            float ink = smoothstep(0.035, 0.13, length(vec2(gx, gy)));
            vec3 paper = vec3(0.96, 0.92, 0.84);
            col = mix(col, paper, 0.22);
            col = mix(col, col * vec3(1.05, 1.0, 0.92), 0.5);
            float bleed = (hash(floor(gl_FragCoord.xy / 3.0)) - 0.5) * 0.05;
            col += bleed;
            col = mix(col, vec3(0.22, 0.15, 0.1), ink * 0.75);
            vec2 q = vUv - 0.5; col = mix(col, paper * 0.9, smoothstep(0.32, 0.7, length(q * vec2(1.0, 1.2))) * 0.6);
          } else {
            // soft vignette like an old varnished canvas
            vec2 q = vUv - 0.5; col *= 1.0 - dot(q, q) * 0.55;
          }
          gl_FragColor = vec4(col, 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    postScene.add(new T.Mesh(new T.PlaneGeometry(2, 2), postMat));

    const scene = new T.Scene();
    const daySky = skyTexture("#c9d2d3", "#e6d9bd"), duskSky = skyTexture("#18213d", "#3d4f7e");
    scene.background = daySky;
    scene.fog = new T.Fog("#e2d6bb", 360, 980);

    const camera = new T.PerspectiveCamera(32, 1, 4, 2400);
    const HOME = { c: new T.Vector3(150, 105, 70), t: new T.Vector3(-8, 0, -42) };
    camera.position.copy(HOME.c);
    const controls = new T.OrbitControls(camera, renderer.domElement);
    controls.target.copy(HOME.t);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 10; controls.maxDistance = 760;
    controls.maxPolarAngle = Math.PI * 0.44; controls.minPolarAngle = Math.PI * 0.1;
    controls.screenSpacePanning = false;
    controls.autoRotate = !reduce; controls.autoRotateSpeed = 0.22;
    renderer.domElement.addEventListener("pointerdown", () => { controls.autoRotate = false; }, { once: true });

    const hemi = new T.HemisphereLight("#f1e5cc", "#5b4a2c", 0.62); scene.add(hemi);
    const sun = new T.DirectionalLight("#ffd29a", 2.1);
    sun.position.set(-170, 105, 120); sun.castShadow = true;
    sun.shadow.mapSize.set(small ? 2048 : 4096, small ? 2048 : 4096);
    Object.assign(sun.shadow.camera, { left: -230, right: 230, top: 230, bottom: -230, near: 10, far: 700 });
    sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.5; sun.shadow.radius = 3;
    scene.add(sun); sun.target.position.set(0, 0, -40); scene.add(sun.target);

    // the table
    const ground = new T.Mesh(new T.PlaneGeometry(1000, 1000), new T.MeshStandardMaterial({ map: groundTexture(), roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    const plinth = box(1006, 16, 1006, matte("#33291f")); plinth.position.y = -8.6; plinth.castShadow = false; scene.add(plinth);

    const roadMat = matte(C.road, { roughness: 0.82 });
    const roadMeshes = {};
    for (const [k, pts] of Object.entries(ROADS)) {
      const wide = MAIN.includes(k) ? 9 : k === "boone" || k === "allie" ? 4.5 : 6.5;
      const m = ribbon(pts, wide, 0.12, roadMat); scene.add(m); roadMeshes[k] = m;
      if (MAIN.includes(k)) { const curb = ribbon(pts, wide + 1.2, 0.08, matte("#8c8578")); scene.add(curb); }
    }
    // brick sidewalks downtown
    const walk = matte(C.walk);
    scene.add(ribbon([[0, -6], [1, -60], [2, -96]], 15.5, 0.1, walk));
    scene.add(ribbon([[-6, 3], [-30, 18], [-66, 42], [-100, 72]], 14, 0.1, walk));
    // Taylorsville Rd: a fine gold line down the middle and gold edges, nothing louder
    const goldMat = new T.MeshStandardMaterial({ color: C.gold, roughness: 0.45, metalness: 0.4, emissive: "#3a2a08", emissiveIntensity: 0.5 });
    const ky = ROADS.taylorsville;
    scene.add(ribbon(ky, 0.42, 0.17, goldMat));
    scene.add(ribbon(ky.map(p => [p[0] - 4.85, p[1]]), 0.16, 0.17, goldMat));
    scene.add(ribbon(ky.map(p => [p[0] + 4.85, p[1]]), 0.16, 0.17, goldMat));
    for (const z of [-150, -330]) {
      const c = canvas(1024, 96), g = c.getContext("2d");
      g.fillStyle = "#e8d6a6"; g.font = `500 62px "Cormorant SC", Georgia, serif`; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText("TAYLORSVILLE  ROAD", 512, 50);
      const m = new T.Mesh(new T.PlaneGeometry(36, 3.4), new T.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false }));
      m.rotation.x = -Math.PI / 2; m.rotation.z = Math.PI / 2; m.position.set(-2.3, 0.18, z); scene.add(m);
    }

    // the creek: muddy banks, slow green-brown water, limestone ledges
    const bank = ribbon(CREEK, 20, 0.04, matte(C.bank)); scene.add(bank);
    const waterMat = new T.MeshStandardMaterial({ color: C.water, roughness: 0.18, metalness: 0.15 });
    const water = ribbon(CREEK, 8, 0.1, waterMat); scene.add(water);
    const creekPts = water.userData.points;
    const stones = new T.InstancedMesh(new T.DodecahedronGeometry(1, 0), matte("#a59d8c"), 160);
    const dummy = new T.Object3D(), sr = rnd(31);
    for (let i = 0; i < 160; i++) {
      const p = creekPts[(sr() * creekPts.length) | 0], s = sr() > 0.5 ? 1 : -1;
      dummy.position.set(p.x + s * (3.6 + sr() * 2.5), 0.12, p.z + (sr() - 0.5) * 3);
      dummy.scale.set(0.5 + sr() * 1.2, 0.25 + sr() * 0.3, 0.5 + sr() * 1);
      dummy.rotation.set(0, sr() * 3, 0); dummy.updateMatrix(); stones.setMatrixAt(i, dummy.matrix);
    }
    stones.receiveShadow = true; scene.add(stones);
    // stone bridges wherever a road crosses the creek
    for (const [k, m] of Object.entries(roadMeshes)) {
      const P = m.userData.points;
      for (let i = 0; i < P.length; i += 2) {
        if (distToPolyline(P[i].x, P[i].z, creekPts) < 3) {
          const a = P[Math.max(0, i - 2)], b = P[Math.min(P.length - 1, i + 2)];
          const br = new T.Group();
          const deck = box(MAIN.includes(k) ? 11 : 8, 0.7, 13, matte("#9a917f")); deck.position.y = 0.45; br.add(deck);
          for (const s of [-1, 1]) { const rail = box(0.5, 0.9, 13, matte("#8a8170")); rail.position.set(s * (MAIN.includes(k) ? 5.5 : 4), 1.1, 0); br.add(rail); }
          br.position.set(P[i].x, 0, P[i].z); br.rotation.y = Math.atan2(b.x - a.x, b.z - a.z); scene.add(br);
          i += 20;
        }
      }
    }

    const pickables = [], anchors = {};
    function register(id, obj, top) {
      obj.traverse(o => { if (o.isMesh) o.userData.pick = id; });
      obj.userData.id = id; pickables.push(obj);
      const p = new T.Vector3(); obj.getWorldPosition(p); p.y = top; anchors[id] = p;
      p.userData = { n: [Math.sin(obj.rotation.y || 0), Math.cos(obj.rotation.y || 0)] };
    }

    // Main Street
    const rowR = rnd(11), glowMats = [];
    ROW.forEach((s, i) => {
      const gr = new T.Group();
      const f = facade(s, 100 + i);
      const front = new T.MeshStandardMaterial({ map: f.map, emissiveMap: f.glow, emissive: "#ffa64d", emissiveIntensity: 0, roughness: 0.9 });
      glowMats.push(front);
      const side = new T.MeshStandardMaterial({ map: sideTex(s.brick, s.wood || s.paint, 200 + i), roughness: 0.95 });
      side.map.wrapS = side.map.wrapT = T.RepeatWrapping; side.map.repeat.set(s.d / 8, s.h / 8);
      const roof = matte("#8b8279");
      const body = box(s.w, s.h, s.d, [side, side, roof, roof, front, side]);
      body.position.y = s.h / 2; gr.add(body);
      // stepped rear addition, cornice, parapet and a chimney stack give each building its silhouette
      const rear = box(s.w * 0.8, s.h * 0.55, s.d * 0.5, side); rear.position.set(0, s.h * 0.275, -s.d / 2 - s.d * 0.25); gr.add(rear);
      const cor = box(s.w + 0.4, 0.5, 0.7, matte(s.trim)); cor.position.set(0, s.h - 0.15, s.d / 2 + 0.25); gr.add(cor);
      for (let k = 0; k < Math.floor(s.w / 1.2); k++) { const br = box(0.18, 0.5, 0.45, matte(s.trim)); br.position.set(-s.w / 2 + 0.6 + k * 1.2, s.h - 0.6, s.d / 2 + 0.2); br.castShadow = false; gr.add(br); }
      const par = box(s.w, 0.7 + rowR() * 0.6, 0.3, matte(shade(s.brick, 0.9))); par.position.set(0, s.h + 0.35, s.d / 2 - 0.15); gr.add(par);
      const stack = box(0.9, 1.8, 0.9, matte(shade(s.brick, 0.85))); stack.position.set((rowR() - 0.5) * (s.w - 2), s.h + 0.9, -s.d / 2 + 1.2); gr.add(stack);
      if (s.awning) {
        const ac = canvas(64, 32), ag = ac.getContext("2d");
        for (let k = 0; k < 8; k++) { ag.fillStyle = k % 2 ? s.awning : shade(s.awning, 1.45); ag.fillRect(k * 8, 0, 8, 32); }
        const aw = box(s.w - 1.4, 0.08, 1.9, new T.MeshStandardMaterial({ map: tex(ac), roughness: 0.95 }));
        aw.position.set(0, 2.62, s.d / 2 + 0.9); aw.rotation.x = 0.38; gr.add(aw);
      }
      if (s.corner) { const bay = new T.Mesh(new T.CylinderGeometry(1.7, 1.7, s.h, 24, 1, false, 0, Math.PI), side); bay.position.set(s.w / 2 - 0.5, s.h / 2, s.d / 2 - 0.5); bay.rotation.y = Math.PI / 2; bay.castShadow = true; gr.add(bay); }
      if (s.neon) {
        // the big neon cone on Taylorsville Rd
        const cone = new T.Mesh(new T.ConeGeometry(0.55, 1.6, 12), new T.MeshStandardMaterial({ color: "#e7c48a", emissive: "#ffb347", emissiveIntensity: 0.3 }));
        cone.rotation.x = Math.PI; cone.position.set(s.w / 2 - 1, 5.2, s.d / 2 + 1.1); gr.add(cone);
        const scoop = new T.Mesh(new T.SphereGeometry(0.6, 14, 10), new T.MeshStandardMaterial({ color: "#f0a6b8", emissive: "#ff6f9a", emissiveIntensity: 0.3 }));
        scoop.position.set(s.w / 2 - 1, 6.2, s.d / 2 + 1.1); gr.add(scoop); glowMats.push(cone.material, scoop.material);
      }
      if (s.porch) {
        const p = box(s.w, 0.3, 3, matte("#6b5644")); p.position.set(0, 0.6, s.d / 2 + 1.5); gr.add(p);
        const pr = box(s.w + 0.4, 0.16, 3.2, matte("#4a3f36")); pr.position.set(0, 3.6, s.d / 2 + 1.6); gr.add(pr);
        for (let k = 0; k < 6; k++) { const c = box(0.2, 3, 0.2, matte("#5a4636")); c.position.set(-s.w / 2 + 0.5 + k * (s.w - 1) / 5, 2.1, s.d / 2 + 2.9); gr.add(c); }
      }
      gr.position.set(s.x, 0, s.z); gr.rotation.y = s.rot; scene.add(gr); s._g = gr;
      if (!s.id.startsWith("row-")) register(s.id, gr, s.h + 3);
    });


    // each business's own logo, painted on a sign board above its awning
    const signMats = [];
    const logoOf = {}; (opts.places || []).forEach(p => { if (p.logo) logoOf[p.id] = p; });
    ROW.forEach(s => {
      const L = logoOf[s.id]; if (!L || !s._g) return;
      const W = Math.min(s.w - 1.2, 9), H = 1.3;
      const c = canvas(1024, Math.round(1024 * H / W)), g = c.getContext("2d");
      const paint = img => {
        g.fillStyle = L.head; g.fillRect(0, 0, c.width, c.height);
        g.strokeStyle = "rgba(233,214,166,.65)"; g.lineWidth = 6; g.strokeRect(10, 10, c.width - 20, c.height - 20);
        if (img) { const k = Math.min((c.width - 60) / img.width, (c.height - 30) / img.height); const w = img.width * k, h = img.height * k; g.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h); }
        t.needsUpdate = true;
      };
      const t = tex(c); paint(null);
      const im = new Image(); im.onload = () => paint(im); im.src = L.logo;
      const m = new T.MeshStandardMaterial({ map: t, roughness: 0.6, emissive: "#ffffff", emissiveMap: t, emissiveIntensity: 0 });
      signMats.push(m);
      const board = new T.Mesh(new T.BoxGeometry(W, H, 0.12), [matte(L.head), matte(L.head), matte(L.head), matte(L.head), m, matte(L.head)]);
      board.position.set(0, 3.42, s.d / 2 + 0.08); board.castShadow = true;
      s._g.add(board);
      board.traverse(o => { o.userData.pick = s.id; });
    });

    // parked cars along Main Street
    const carCols = ["#7a2b23", "#2f3b31", "#cfc8b8", "#1f2a33", "#8a8a86", "#3f4a5c", "#6b5a3e", "#9c9a94"];
    const cr2 = rnd(303);
    for (let z = -86; z < -8; z += 6.2) for (const side of [-1, 1]) {
      if (cr2() < 0.38) continue;
      const car = new T.Group(), c = carCols[(cr2() * carCols.length) | 0];
      const body = box(1.8, 0.72, 4.3, new T.MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0.05 })); body.position.y = 0.62; car.add(body);
      const cab = box(1.5, 0.52, 2.0, new T.MeshStandardMaterial({ color: "#7f8c94", roughness: 0.2, metalness: 0 })); cab.position.set(0, 1.22, -0.25);
      const roofc = box(1.52, 0.06, 1.7, new T.MeshStandardMaterial({ color: c, roughness: 0.45 })); roofc.position.set(0, 1.5, -0.25); car.add(roofc); car.add(cab);
      for (const wx of [-0.86, 0.86]) for (const wz of [-1.35, 1.35]) { const w = new T.Mesh(new T.CylinderGeometry(0.34, 0.34, 0.24, 12), matte("#1a1a1a")); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.34, wz); car.add(w); }
      car.position.set(side * 3.3, 0.12, z + (cr2() - 0.5)); car.rotation.y = side > 0 ? Math.PI : 0;
      scene.add(car);
    }
    // benches, planters and flags on the lamp posts
    for (const [x, z] of [[-7.6, -30], [7.6, -48], [-7.6, -66], [7.6, -14]]) {
      const b = box(0.6, 0.45, 2, matte("#3a2d22")); b.position.set(x, 0.5, z); scene.add(b);
      const pl = box(0.9, 0.6, 0.9, matte("#6c6153")); pl.position.set(x, 0.42, z + 2.4); scene.add(pl);
      const fl = new T.Mesh(new T.SphereGeometry(0.55, 10, 8), matte("#b5452a")); fl.scale.y = 0.6; fl.position.set(x, 0.9, z + 2.4); scene.add(fl);
    }
    {
      const fc = canvas(96, 50), fg = fc.getContext("2d");
      for (let i = 0; i < 7; i++) { fg.fillStyle = i % 2 ? "#f2eee6" : "#9c2a24"; fg.fillRect(0, i * 50 / 7, 96, 50 / 7 + 1); }
      fg.fillStyle = "#22305a"; fg.fillRect(0, 0, 40, 27);
      const fm = new T.MeshStandardMaterial({ map: tex(fc), side: T.DoubleSide, roughness: 0.9 });
      for (let z = -88; z <= -8; z += 26) for (const x of [-7.2, 7.2]) {
        const f = new T.Mesh(new T.PlaneGeometry(1.1, 0.6), fm); f.position.set(x + (x < 0 ? 0.6 : -0.6), 3.7, z); f.rotation.y = Math.PI / 2 + (x < 0 ? 0.25 : -0.25); scene.add(f);
      }
    }
    // utility poles and wires down the country roads
    {
      const wireMat = new T.LineBasicMaterial({ color: "#2a2622", transparent: true, opacity: 0.7 });
      for (const k of ["lawrenceburg", "springfield", "taylorsville", "bardstown"]) {
        const P = roadMeshes[k].userData.points; let prev = null;
        for (let i = 0; i < P.length; i += 18) {
          const r = Math.hypot(P[i].x, P[i].z); if (r < 110) { prev = null; continue; }
          const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1;
          const x = P[i].x + (-dz / l) * 7.5, z = P[i].z + (dx / l) * 7.5;
          const pole = new T.Mesh(new T.CylinderGeometry(0.13, 0.17, 9, 6), matte("#4a3b2c")); pole.position.set(x, 4.5, z); pole.castShadow = true; scene.add(pole);
          const arm = box(2.2, 0.12, 0.12, matte("#4a3b2c")); arm.position.set(x, 8.4, z); arm.rotation.y = Math.atan2(dx, dz) + Math.PI / 2; scene.add(arm);
          if (prev) { const g = new T.BufferGeometry().setFromPoints([new T.Vector3(prev[0], 8.4, prev[1]), new T.Vector3((x + prev[0]) / 2, 7.6, (z + prev[1]) / 2), new T.Vector3(x, 8.4, z)]); scene.add(new T.Line(g, wireMat)); }
          prev = [x, z];
        }
      }
    }

    // Revival Hall: the 1880s church at 126 Taylorsville Rd
    {
      const p = SPECIAL.church, gr = new T.Group();
      const brick = new T.MeshStandardMaterial({ map: sideTex("#a2442c", false, 19), roughness: 0.95 });
      brick.map.wrapS = brick.map.wrapT = T.RepeatWrapping; brick.map.repeat.set(3, 1.4);
      const roofM = matte("#8f2e24", { roughness: 0.6, metalness: 0.2 });
      const body = box(15, 8.5, 26, brick); body.position.y = 4.25; gr.add(body);
      const roof = gable(15, 26, 8, "#8f2e24", 0.4); roof.material = roofM; roof.position.y = 8.5; gr.add(roof);
      const wing = box(10, 5, 12, brick); wing.position.set(-9, 2.5, -4); gr.add(wing);
      const wr = gable(10, 12, 3, "#8f2e24", 0.3); wr.position.set(-9, 5, -4); gr.add(wr);
      const tower = box(4.6, 15, 4.6, brick); tower.position.set(-5.4, 7.5, 12); gr.add(tower);
      const band = box(4.9, 0.5, 4.9, matte("#e9e1cf")); band.position.set(-5.4, 15.1, 12); gr.add(band);
      const spire = new T.Mesh(new T.ConeGeometry(3.4, 12, 4), roofM); spire.rotation.y = Math.PI / 4; spire.position.set(-5.4, 21.4, 12); spire.castShadow = true; gr.add(spire);
      for (const x of [-6.6, -4.2]) { const dr = box(1.1, 2.6, 0.12, matte("#b4242a")); dr.position.set(x, 1.4, 14.33); gr.add(dr); }
      const lancet = box(3, 6, 0.1, matte("#3a3f45")); lancet.position.set(2.4, 5, 13.03); gr.add(lancet);
      const lt = box(3.4, 6.4, 0.06, matte("#e9e1cf")); lt.position.set(2.4, 5, 13.0); gr.add(lt);
      const vent = box(1.4, 1.4, 0.1, matte("#e9e1cf")); vent.rotation.z = Math.PI / 4; vent.position.set(-5.4, 11, 14.35); gr.add(vent);
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("revival", gr, 30);
    }
    // Bloomfield Baptist on Springfield Rd: red metal roof, white belfry
    {
      const p = SPECIAL.baptist, gr = new T.Group();
      const brick = new T.MeshStandardMaterial({ map: sideTex("#6e2f26", false, 9), roughness: 0.95 });
      brick.map.wrapS = brick.map.wrapT = T.RepeatWrapping; brick.map.repeat.set(3, 1);
      const body = box(13, 7.5, 24, brick); body.position.y = 3.75; gr.add(body);
      const roof = gable(13, 24, 5.2, "#b5332a", 0.5); roof.position.y = 7.5; gr.add(roof);
      const white = matte("#f1ece2");
      const pedi = gable(7, 3, 2.2, "#b5332a", 0.2); pedi.position.set(3, 4.6, 13.5); gr.add(pedi);
      for (const x of [0.6, 5.4]) { const c = new T.Mesh(new T.CylinderGeometry(0.3, 0.34, 4.4, 14), white); c.position.set(x, 2.4, 14.6); c.castShadow = true; gr.add(c); }
      const bel = box(3.2, 3.6, 3.2, white); bel.position.set(0, 12.6, 9.5); gr.add(bel);
      const dome = new T.Mesh(new T.SphereGeometry(1.4, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshStandardMaterial({ color: "#b98f35", roughness: 0.35, metalness: 0.6 }));
      dome.position.set(0, 14.4, 9.5); dome.castShadow = true; gr.add(dome);
      const cross = box(0.14, 1.6, 0.14, matte("#b98f35")); cross.position.set(0, 16.4, 9.5); gr.add(cross);
      const arm = box(0.8, 0.14, 0.14, matte("#b98f35")); arm.position.set(0, 16.7, 9.5); gr.add(arm);
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("baptist", gr, 19);
    }
    // The Old Pink House, across the courtyard behind the tea parlor
    {
      const p = SPECIAL.pinkhouse;
      const gr = house({ style: "cottage", w: 7, h: 3.6, d: 8, color: "#e4a9b0", roof: "#6d6260", porch: true, door: "#f1ece2" });
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("pinkhouse", gr, 8);
      const court = box(13, 0.08, 11, matte("#bdb3a1")); court.position.set(-28, 0.06, -80); court.receiveShadow = true; scene.add(court);
    }
    // the depot, now City Hall
    {
      const p = SPECIAL.depot, gr = new T.Group();
      const body = box(8, 4.2, 22, matte("#a7bcc6")); body.position.y = 2.1; gr.add(body);
      const roof = new T.Mesh(new T.ConeGeometry(1, 1, 4), matte("#6b6e70")); roof.scale.set(9.5, 3, 18.5); roof.rotation.y = Math.PI / 4; roof.position.y = 5.7; roof.castShadow = true; gr.add(roof);
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("depot", gr, 10);
    }
    // the long white tobacco warehouse on Depot St
    {
      const p = SPECIAL.warehouse, gr = new T.Group();
      const body = box(38, 6, 110, matte("#c9c3b6")); body.position.y = 3; gr.add(body);
      const roof = gable(38, 110, 5, "#e3ded3", 0.6); roof.position.y = 6; gr.add(roof);
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr);
    }
    // Maple Grove Cemetery: rows of small stones under old trees
    {
      const p = SPECIAL.cemetery;
      const st = new T.InstancedMesh(new T.BoxGeometry(0.7, 1, 0.22), matte("#c8c2b5"), 140);
      const cr = rnd(8);
      for (let i = 0; i < 140; i++) { dummy.position.set(p.x - 34 + (i % 14) * 5 + cr(), 0.45, p.z - 34 + Math.floor(i / 14) * 7 + cr()); dummy.scale.set(1, 0.7 + cr() * 0.6, 1); dummy.rotation.set(0, (cr() - 0.5) * 0.2, 0); dummy.updateMatrix(); st.setMatrixAt(i, dummy.matrix); }
      st.castShadow = true; scene.add(st);
    }

    // the four stays
    {
      const p = SPECIAL.clayborn;
      const gr = house({ style: "ihouse", w: 12, h: 6, d: 8, color: "#efe7d6", roof: "#41474b", porch: true, chimney: true, shutters: "#2e3b33" });
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("clayborn", gr, 13);
    }
    {
      const p = SPECIAL.boones, gr = new T.Group();
      const logs = canvas(256, 256), g = logs.getContext("2d");
      for (let y = 0; y < 256; y += 16) { g.fillStyle = y % 32 ? "#7a5233" : "#6b462b"; g.fillRect(0, y, 256, 16); g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(0, y + 14, 256, 2); }
      const lm = new T.MeshStandardMaterial({ map: tex(logs), roughness: 1 });
      const body = box(12, 4.6, 9, lm); body.position.y = 2.3; gr.add(body);
      const roof = gable(12, 9, 4.2, "#3e4a3f", 0.8); roof.position.y = 4.6; gr.add(roof);
      const pr = box(12, 0.2, 3, matte("#6b462b")); pr.position.set(0, 0.4, 6); gr.add(pr);
      const ch = box(1.3, 3.6, 1.3, matte("#8f877a")); ch.position.set(-6, 5.6, 0); gr.add(ch);
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("boones", gr, 12);
      const pond = new T.Mesh(new T.CircleGeometry(14, 48), waterMat);
      pond.rotation.x = -Math.PI / 2; pond.scale.set(1.5, 1, 1); pond.position.set(p.x + 8, 0.12, p.z + 30); pond.receiveShadow = true; scene.add(pond);
      const dock = box(2, 0.3, 8, matte("#7a5233")); dock.position.set(p.x + 2, 0.3, p.z + 19); scene.add(dock);
    }
    {
      const p = SPECIAL.allies;
      const gr = house({ style: "ihouse", w: 15, h: 6.6, d: 9, color: "#f3efe6", roof: "#3a3d40", porch: true, chimney: true, shutters: "#1f2a24" });
      gr.position.set(p.x, 0, p.z); gr.rotation.y = p.rot; scene.add(gr); register("allies", gr, 14);
    }
    register("cosmopolitan", pickables.find(o => o.userData.id === "cosmopolitan") || new T.Group(), 11);

    // black tobacco barns, fences and hay rolls on the farms
    const barns = [[-300, -330, 0.2], [230, -330, -0.4], [330, -420, 0.1], [-380, 250, 0.5], [300, 210, -0.2], [-200, -440, 0.9], [360, -60, 0.3], [-420, -60, -0.2]];
    for (const [x, z, r] of barns) {
      const gr = new T.Group();
      const bt = canvas(128, 128), bg = bt.getContext("2d"); bg.fillStyle = "#1f1c1a"; bg.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 128; i += 6) { bg.fillStyle = i % 12 ? "#262220" : "#1a1716"; bg.fillRect(i, 0, 3, 128); }
      const bm = new T.MeshStandardMaterial({ map: tex(bt), roughness: 1 });
      const b = box(13, 7.5, 28, bm); b.position.y = 3.75; gr.add(b);
      const rf = gable(13, 28, 5, "#5d5650", 0.5); rf.position.y = 7.5; gr.add(rf);
      gr.position.set(x, 0, z); gr.rotation.y = r; scene.add(gr);
    }
    const hay = new T.InstancedMesh(new T.CylinderGeometry(1.1, 1.1, 1.5, 18), matte("#c7a764"), 70); hay.castShadow = true;
    const hr = rnd(41);
    for (let i = 0; i < 70; i++) {
      const f = [[-460, -470], [220, -280], [-470, 240], [250, 130], [170, -480]][i % 5];
      dummy.position.set(f[0] + hr() * 150, 1.1, f[1] + hr() * 120);
      dummy.rotation.set(0, hr() * 3, Math.PI / 2); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); hay.setMatrixAt(i, dummy.matrix);
    }
    scene.add(hay);
    // board fences along the farm roads
    const post = new T.InstancedMesh(new T.BoxGeometry(0.2, 1.4, 0.2), matte("#3a332c"), 400); let pi = 0;
    for (const k of ["boone", "allie", "lawrenceburg", "fairfield"]) {
      const P = roadMeshes[k].userData.points;
      for (let i = 0; i < P.length && pi < 400; i += 2) {
        if (Math.hypot(P[i].x, P[i].z) < 140) continue;
        dummy.position.set(P[i].x + 7, 0.7, P[i].z + 7); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); post.setMatrixAt(pi++, dummy.matrix);
      }
    }
    post.count = pi; scene.add(post);

    // the Deere John Project: ten tractors upended in a row, oldest to youngest
    {
      const p = SPECIAL.tractor, gr = new T.Group();
      for (let i = 0; i < 10; i++) {
        const t = new T.Group();
        const green = matte(["#355e33", "#3e6b3a", "#2f5a30"][i % 3]);
        const body = box(1.4, 3.4, 1.2, green); body.position.y = 2.4; t.add(body);
        const hood = box(1, 1.4, 1, green); hood.position.y = 0.6; t.add(hood);
        for (const sx of [-1, 1]) { const w = new T.Mesh(new T.CylinderGeometry(1.1, 1.1, 0.5, 18), matte("#d8b23a")); w.rotation.z = Math.PI / 2; w.position.set(sx * 0.95, 4.1, 0); w.castShadow = true; t.add(w); }
        t.rotation.x = -0.32; t.position.set(-i * 4.6, 0, 0); gr.add(t);
      }
      gr.position.set(p.x, 0, p.z); gr.rotation.y = 0.1; scene.add(gr); register("tractor", gr, 9);
    }

    // street lamps along Taylorsville Rd downtown
    const lampMat = new T.MeshStandardMaterial({ color: "#f6e1b0", emissive: "#ffcf80", emissiveIntensity: 0.15 });
    for (let z = -88; z <= -8; z += 13) for (const x of [-7.2, 7.2]) {
      const pole = box(0.16, 4.2, 0.16, matte("#1f2422")); pole.position.set(x, 2.1, z); scene.add(pole);
      const globe = new T.Mesh(new T.SphereGeometry(0.34, 12, 8), lampMat); globe.position.set(x, 4.4, z); scene.add(globe);
    }
    // pumpkins and mums on the storefront steps
    const pumpkin = new T.InstancedMesh(new T.SphereGeometry(0.34, 10, 8), matte("#c4672a"), 60);
    const mum = new T.InstancedMesh(new T.SphereGeometry(0.42, 10, 8), matte("#9c3a3a"), 40);
    const pr = rnd(77); let pk = 0, mk = 0;
    for (const s of ROW) {
      if (!s.awning || Math.abs(s.x) > 20) continue;
      const fx = s.x + (s.rot === E ? s.d / 2 + 0.9 : -(s.d / 2 + 0.9));
      for (let k = 0; k < 4 && pk < 60; k++) { dummy.position.set(fx + (pr() - 0.5) * 0.6, 0.3, s.z + (pr() - 0.5) * (s.w - 3)); dummy.scale.set(1, 0.75, 1); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); pumpkin.setMatrixAt(pk++, dummy.matrix); }
      for (let k = 0; k < 2 && mk < 40; k++) { dummy.position.set(fx, 0.38, s.z + (k ? 1 : -1) * (s.w / 2 - 1.2)); dummy.scale.set(1, 0.8, 1); dummy.updateMatrix(); mum.setMatrixAt(mk++, dummy.matrix); }
    }
    pumpkin.count = pk; mum.count = mk; pumpkin.castShadow = mum.castShadow = true;
    scene.add(pumpkin, mum);

    // homes lining the real side streets, set back on their lots and facing the road
    const blockers = [...ROW.map(s => [s.x, s.z, 13]), ...Object.values(SPECIAL).map(p => [p.x, p.z, p === SPECIAL.warehouse ? 70 : p === SPECIAL.cemetery ? 55 : 22]), ...barns.map(b => [b[0], b[1], 24])];
    const allRoadPts = Object.values(roadMeshes).map(m => m.userData.points);
    const homeSpots = [];
    const hues = ["#efe7d6", "#dfe2dc", "#e9dfc9", "#cfd3cb", "#e7d5c4", "#f3efe6", "#c3ccd0", "#9c4a36", "#a35a40"];
    const hr2 = rnd(5);
    const streetHomes = { perry: 26, goodloe: 26, mckay: 24, eagle: 26, riverside: 24, springfield: 30, lawrenceburg: 32, taylorsville: 30, fairfield: 34, bardstown: 34 };
    for (const [k, gap] of Object.entries(streetHomes)) {
      const P = roadMeshes[k].userData.points;
      for (let i = 2; i < P.length - 2; i += Math.round(gap / 2)) {
        const a = P[i - 1], b = P[i + 1], dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1;
        for (const side of [-1, 1]) {
          const off = 15 + hr2() * 4;
          const x = P[i].x - (dz / l) * off * side, z = P[i].z + (dx / l) * off * side;
          const r = Math.hypot(x, z);
          if (r < 30 || r > 300) continue;
          if (blockers.some(([bx, bz, rr]) => Math.hypot(x - bx, z - bz) < rr)) continue;
          if (allRoadPts.some(Q => distToPolyline(x, z, Q) < 9)) continue;
          if (distToPolyline(x, z, creekPts) < 14) continue;
          if (homeSpots.some(([hx, hz]) => Math.hypot(x - hx, z - hz) < 15)) continue;
          if (hr2() < 0.18) continue;
          homeSpots.push([x, z]);
          const style = ["ihouse", "shotgun", "foursquare", "victorian", "cottage"][(hr2() * 5) | 0];
          const color = hues[(hr2() * hues.length) | 0];
          const gr = house({ style, w: style === "shotgun" ? 6 : 8 + hr2() * 4, h: style === "foursquare" || style === "victorian" ? 6 : 3.6 + hr2() * 1.2, d: style === "shotgun" ? 13 : 8 + hr2() * 3,
            color, roof: ["#4b4a47", "#5b3f36", "#3f4a4f", "#55524d"][(hr2() * 4) | 0], porch: hr2() > 0.3, chimney: hr2() > 0.45, shutters: hr2() > 0.5 ? ["#2e3b33", "#3d2b22", "#1f2a33"][(hr2() * 3) | 0] : null }, hr2);
          gr.position.set(x, 0, z); gr.rotation.y = Math.atan2(-(x - P[i].x), -(z - P[i].z)) ; gr.rotation.y = Math.atan2(P[i].x - x, P[i].z - z);
          scene.add(gr);
          blockers.push([x, z, 9]);
        }
      }
    }

    // trees: sycamores along the creek, maples and oaks through town, hickories in the fencerows, a few cedars
    const tr = rnd(2024), spots = [];
    function ok(x, z, near) {
      if (Math.abs(x) > 494 || Math.abs(z) > 494) return false;
      for (const P of allRoadPts) if (distToPolyline(x, z, P) < (near || 8)) return false;
      if (distToPolyline(x, z, creekPts) < 5.5) return false;
      for (const [bx, bz, rr] of blockers) if (Math.hypot(x - bx, z - bz) < rr * 0.75) return false;
      if (Math.abs(x) < 24 && z > -96 && z < 4) return false;
      return true;
    }
    const pick = a => a[(tr() * a.length) | 0];
    for (let i = 0; i < 3000 && spots.length < 260; i++) {
      const cp = creekPts[(tr() * creekPts.length) | 0];
      const x = cp.x + (tr() - 0.5) * 30, z = cp.z + (tr() - 0.5) * 30;
      if (ok(x, z)) spots.push({ x, z, kind: tr() < 0.55 ? "sycamore" : tr() < 0.5 ? "maple" : "oak", s: 1 + tr() * 0.5 });
    }
    for (const [hx, hz] of homeSpots) for (let k = 0; k < 2; k++) {
      const a = tr() * 6.28, d = 9 + tr() * 8, x = hx + Math.cos(a) * d, z = hz + Math.sin(a) * d;
      if (ok(x, z, 6)) spots.push({ x, z, kind: tr() < 0.6 ? "maple" : tr() < 0.6 ? "oak" : "gold", s: 0.95 + tr() * 0.4 });
    }
    for (let i = 0; i < 9000 && spots.length < (small ? 900 : 1300); i++) {
      const rr = Math.pow(tr(), 0.75) * 490, a = tr() * Math.PI * 2;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      if (tr() < (rr < 200 ? 0.45 : 0.7) && ok(x, z)) spots.push({ x, z, kind: tr() < 0.1 ? "cedar" : pick(["maple", "oak", "gold", "oak", "green"]), s: 0.85 + tr() * 0.45 });
    }
    for (const [x0, z0, x1, z1] of [[-490, -225, -170, -225], [130, -300, 480, -300], [-490, 205, -150, 205], [140, 220, 480, 220], [-300, -490, -300, -240], [300, 60, 300, 210]]) {
      for (let t = 0; t <= 1; t += 0.028) { const x = x0 + (x1 - x0) * t + (tr() - 0.5) * 5, z = z0 + (z1 - z0) * t + (tr() - 0.5) * 5; if (ok(x, z)) spots.push({ x, z, kind: tr() < 0.25 ? "cedar" : pick(["gold", "oak", "maple"]), s: 0.8 + tr() * 0.35 }); }
    }
    // street maples flanking Taylorsville Rd north of the shops
    for (let z = -300; z < -130; z += 15) for (const x of [-10, 12]) if (ok(x, z, 4)) spots.push({ x, z, kind: "maple", s: 1.05 });

    // Trees: a dark inner crown for density, then many leaf cards (alpha-cut clusters of
    // painted leaves) around it, so each tree reads as foliage with a ragged silhouette.
    const leafTex = leafAtlas();
    const decid = spots.filter(s => s.kind !== "cedar"), cedars = spots.filter(s => s.kind === "cedar");
    const CARDS = small ? 18 : 30, CORES = 3;
    const cardGeo = new T.PlaneGeometry(1, 1);
    const cardMat = new T.MeshStandardMaterial({ map: leafTex, alphaTest: 0.42, side: T.DoubleSide, roughness: 0.9 });
    const cards = new T.InstancedMesh(cardGeo, cardMat, decid.length * CARDS);
    const coreMat = new T.MeshStandardMaterial({ roughness: 1 });
    const cores = new T.InstancedMesh(clumpGeometry(), coreMat, decid.length * CORES);
    const trunks = new T.InstancedMesh(new T.CylinderGeometry(0.22, 0.42, 1, 7), matte("#ffffff"), decid.length * 5);
    cards.castShadow = true; cores.castShadow = true; trunks.castShadow = true;
    const col = new T.Color(), bark = new T.Color(), q = new T.Quaternion(), up = new T.Vector3(0, 1, 0), tmp = new T.Vector3();
    let ci = 0, ki = 0, ti = 0;
    for (const t of decid) {
      const H = (t.kind === "sycamore" ? 18 : t.kind === "oak" ? 15 : 13.5) * t.s * (0.85 + tr() * 0.3);
      const crownR = H * (t.kind === "oak" ? 0.36 : t.kind === "sycamore" ? 0.3 : 0.31), crownY = H * 0.6;
      const lean = (tr() - 0.5) * 0.08;
      // trunk and limbs
      dummy.position.set(t.x, crownY * 0.48, t.z); dummy.rotation.set(lean, 0, lean); dummy.scale.set(t.s * 1.05, crownY * 0.96, t.s * 1.05); dummy.updateMatrix(); trunks.setMatrixAt(ti, dummy.matrix);
      trunks.setColorAt(ti++, bark.set(t.kind === "sycamore" ? C.sycamore : C.trunk));
      for (let k = 0; k < 4; k++) {
        const a = k * 1.57 + tr() * 0.8, len = crownR * (0.7 + tr() * 0.3);
        dummy.position.set(t.x + Math.cos(a) * len * 0.35, crownY * (0.82 + k * 0.05), t.z + Math.sin(a) * len * 0.35);
        dummy.rotation.set(Math.sin(a) * 0.85, 0, -Math.cos(a) * 0.85); dummy.scale.set(t.s * 0.42, len, t.s * 0.42); dummy.updateMatrix(); trunks.setMatrixAt(ti, dummy.matrix);
        trunks.setColorAt(ti++, bark.set(t.kind === "sycamore" ? C.sycamore : C.trunk));
      }
      const pal = t.kind === "sycamore" ? [...C.gold, ...C.oak.slice(0, 1)] : C[t.kind] || C.maple;
      const base = pick(pal);
      // inner crown, darker, so you never see through the tree
      for (let k = 0; k < CORES; k++) {
        const a = tr() * 6.28, rr = crownR * 0.25 * tr();
        dummy.position.set(t.x + Math.cos(a) * rr, crownY + (k - 1) * crownR * 0.25, t.z + Math.sin(a) * rr);
        const sc = crownR * (0.55 + tr() * 0.12);
        dummy.scale.set(sc, sc * 0.82, sc); dummy.rotation.set(tr() * 3, tr() * 3, tr() * 3); dummy.updateMatrix();
        cores.setMatrixAt(ki, dummy.matrix);
        cores.setColorAt(ki++, col.set(base).offsetHSL(0, -0.03, -0.05));
      }
      // leaf cards on the outside of the crown, facing outward with a little random tilt
      for (let k = 0; k < CARDS; k++) {
        const u = tr(), v = tr();
        const th = u * 6.283, ph = Math.acos(2 * v - 1) * 0.85;
        const nx = Math.sin(ph) * Math.cos(th), ny = Math.cos(ph), nz = Math.sin(ph) * Math.sin(th);
        const r = crownR * (0.72 + tr() * 0.32);
        dummy.position.set(t.x + nx * r, crownY + ny * r * 0.78 - crownR * 0.05, t.z + nz * r);
        tmp.set(nx + (tr() - 0.5) * 0.9, ny * 0.6 + (tr() - 0.5) * 0.9, nz + (tr() - 0.5) * 0.9).normalize();
        q.setFromUnitVectors(new T.Vector3(0, 0, 1), tmp);
        dummy.quaternion.copy(q); dummy.rotateZ(tr() * 6.28);
        const sz = crownR * (0.95 + tr() * 0.5);
        dummy.scale.set(sz, sz, sz); dummy.updateMatrix();
        cards.setMatrixAt(ci, dummy.matrix);
        // sunlit tops are a touch lighter, undersides deeper
        col.set(tr() < 0.2 ? pick(pal) : base).offsetHSL((tr() - 0.5) * 0.02, (tr() - 0.5) * 0.06, ny * 0.1 + (tr() - 0.5) * 0.09);
        cards.setColorAt(ci++, col);
        dummy.quaternion.identity();
      }
    }
    cards.count = ci; cores.count = ki; trunks.count = ti;
    cards.instanceColor.needsUpdate = true; cores.instanceColor.needsUpdate = true; trunks.instanceColor.needsUpdate = true;
    scene.add(cards, cores, trunks);
    // eastern red cedars: dark, narrow, in the fencerows
    const cedarGeo = new T.ConeGeometry(1, 1, 8, 1);
    const cedar = new T.InstancedMesh(cedarGeo, new T.MeshStandardMaterial({ roughness: 1, flatShading: true }), cedars.length * 2);
    let cj = 0;
    for (const t of cedars) {
      const H = 9 * t.s * (0.8 + tr() * 0.4);
      for (let k = 0; k < 2; k++) {
        dummy.position.set(t.x, H * (0.45 + k * 0.25), t.z); dummy.rotation.set(0, tr() * 3, 0);
        dummy.scale.set(H * (0.22 - k * 0.06), H * (0.8 - k * 0.3), H * (0.22 - k * 0.06)); dummy.updateMatrix();
        cedar.setMatrixAt(cj, dummy.matrix); cedar.setColorAt(cj++, col.set(pick(C.cedar)));
      }
    }
    cedar.count = cj; cedar.castShadow = true; if (cj) cedar.instanceColor.needsUpdate = true; scene.add(cedar);

    // a few leaves in the air near wherever you are looking
    const NL = reduce ? 0 : 140;
    const leaves = new T.InstancedMesh(new T.PlaneGeometry(0.5, 0.36), new T.MeshStandardMaterial({ side: T.DoubleSide, roughness: 1 }), Math.max(1, NL));
    const lstate = [];
    for (let i = 0; i < NL; i++) {
      lstate.push({ x: (tr() - 0.5) * 140, y: tr() * 24, z: -40 + (tr() - 0.5) * 140, s: 0.6 + tr() * 0.8, p: tr() * 6, v: 0.6 + tr() * 0.6 });
      leaves.setColorAt(i, col.set(pick([...C.maple, ...C.gold])));
    }
    if (NL) { leaves.instanceColor.needsUpdate = true; scene.add(leaves); }

    /* ---------- labels, picking, motion ---------- */
    const layer = document.createElement("div");
    layer.className = "bm-labels"; el.appendChild(layer);
    const labels = {};
    for (const p of opts.places || []) {
      if (!anchors[p.id]) continue;
      const d = document.createElement("button");
      d.type = "button"; d.className = "bm-pin bm-" + (p.kind || "place");
      d.innerHTML = (p.bubble || `<span class="bm-dot"></span>`) + (p.logo ? `<span class="bm-logo" style="background:${p.head}"><img src="${p.logo}" alt=""></span>` : "");
      const nm = document.createElement("span"); nm.className = "bm-name"; nm.textContent = p.short || p.name;
      const far = compressNote(p.id); if (far) { const f = document.createElement("small"); f.textContent = far; nm.appendChild(f); }
      d.appendChild(nm);
      d.addEventListener("click", ev => { ev.stopPropagation(); select(p.id); });
      layer.appendChild(d); labels[p.id] = { el: d, place: p };
    }

    const ray = new T.Raycaster(), mouse = new T.Vector2();
    let hover = null, chosen = null;
    function pickAt(ev) {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mouse, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      return hit ? hit.object.userData.pick : null;
    }
    function setTint(id, on) {
      const g = pickables.find(o => o.userData.id === id); if (!g) return;
      g.traverse(o => {
        if (!o.isMesh) return;
        if (!o.userData.ownMat) { o.material = Array.isArray(o.material) ? o.material.map(m => m.clone()) : o.material.clone(); o.userData.ownMat = true; }
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if (!m.emissiveMap && m.emissive) m.emissive.set(on ? "#2e2008" : "#000000"); });
      });
    }
    let downAt = null;
    renderer.domElement.addEventListener("pointerdown", ev => { downAt = [ev.clientX, ev.clientY]; });
    renderer.domElement.addEventListener("pointerup", ev => {
      if (!downAt || Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) > 6) return;
      const id = pickAt(ev); if (id && labels[id]) select(id);
    });
    let lastMove = 0;
    renderer.domElement.addEventListener("pointermove", ev => {
      const now = performance.now(); if (now - lastMove < 60) return; lastMove = now;
      const id = pickAt(ev), real = id && labels[id] ? id : null;
      if (real !== hover) { if (hover && hover !== chosen) setTint(hover, false); hover = real; if (hover) setTint(hover, true); }
      renderer.domElement.style.cursor = hover ? "pointer" : "grab";
      for (const k in labels) labels[k].el.classList.toggle("is-hover", k === hover);
    });

    let fly = null;
    function flyTo(t, c) { fly = { t: 0, fromT: controls.target.clone(), toT: t, fromC: camera.position.clone(), toC: c }; controls.autoRotate = false; }
    function focus(id) {
      // come in across the street, square to the building's front, at about lamp-post height
      const a = anchors[id]; if (!a) return;
      const n = a.userData ? a.userData.n : [1, 0], far = Math.hypot(a.x, a.z) > 150;
      const row = ROW.find(s => s.id === id && Math.abs(s.x) < 60), street = !!row;
      const fx = a.x + (row ? n[0] * row.d / 2 : 0), fz = a.z + (row ? n[1] * row.d / 2 : 0);
      const to = new T.Vector3(fx, far ? 2 : street ? 3.6 : 4.5, fz);
      const D = far ? 70 : street ? 26 : 38, side = street ? 0.45 : 0.35;
      if (street) {
        // stand in the middle of the road a few doors down and look back along the storefronts
        const out = Math.abs(row.x) < 20 ? 7 : 12, along = 24;
        flyTo(to, new T.Vector3(fx + n[0] * out + n[1] * along, 6.5, fz + n[1] * out - n[0] * along));
      } else flyTo(to, new T.Vector3(fx + n[0] * D + n[1] * D * side, far ? 34 : 15, fz + n[1] * D - n[0] * D * side));
    }
    function select(id) {
      if (chosen && chosen !== id) setTint(chosen, false);
      chosen = id; if (id) setTint(id, true);
      for (const k in labels) labels[k].el.classList.toggle("is-on", k === id);
      if (id) focus(id);
      if (opts.onSelect) opts.onSelect(id);
    }

    function resize() {
      const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      const pr = renderer.getPixelRatio(); rt.setSize(Math.round(w * pr), Math.round(h * pr)); rt.depthTexture.image.width = Math.round(w * pr); rt.depthTexture.image.height = Math.round(h * pr); postMat.uniforms.res.value.set(Math.round(w * pr), Math.round(h * pr));
      renderer.domElement.style.width = w + "px"; renderer.domElement.style.height = h + "px";
    }
    new ResizeObserver(resize).observe(el); resize();

    function setMode(m) {
      // evening: moonlit blue sky, cool light on the roofs, every storefront and lamp glowing warm
      const dusk = m === "dusk";
      sun.intensity = dusk ? 0.4 : 2.1; sun.color.set(dusk ? "#9fb4e0" : "#ffd29a");
      sun.position.set(dusk ? 120 : -170, dusk ? 140 : 105, dusk ? -80 : 120);
      hemi.intensity = dusk ? 0.5 : 0.62; hemi.color.set(dusk ? "#5d72a8" : "#f1e5cc"); hemi.groundColor.set(dusk ? "#2a2533" : "#5b4a2c");
      scene.background = dusk ? duskSky : daySky; scene.fog.color.set(dusk ? "#26314f" : "#e2d6bb");
      glowMats.forEach(m => { m.emissiveIntensity = dusk ? 2.2 : (m.emissiveMap ? 0 : 0.3); });
      lampMat.emissiveIntensity = dusk ? 4 : 0.15; signMats.forEach(m => { m.emissiveIntensity = dusk ? 0.45 : 0; });
      renderer.toneMappingExposure = dusk ? 1.2 : 0.95; postMat.uniforms.exposure.value = dusk ? 1.25 : 0.95;
    }

    const v = new T.Vector3(), clock = new T.Clock();
    let visible = true;
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(el);
    function tick() {
      requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.05, clock.getDelta());
      if (fly) {
        fly.t = Math.min(1, fly.t + dt / 1.4);
        const e = fly.t < 0.5 ? 4 * fly.t ** 3 : 1 - (-2 * fly.t + 2) ** 3 / 2;
        controls.target.lerpVectors(fly.fromT, fly.toT, e); camera.position.lerpVectors(fly.fromC, fly.toC, e);
        if (fly.t === 1) fly = null;
      }
      controls.update();
      for (let i = 0; i < NL; i++) {
        const L = lstate[i];
        L.y -= dt * L.v; L.p += dt * 1.6;
        if (L.y < 0.2) { L.y = 18 + tr() * 8; L.x = controls.target.x + (tr() - 0.5) * 140; L.z = controls.target.z + (tr() - 0.5) * 140; }
        dummy.position.set(L.x + Math.sin(L.p) * 1.2, L.y, L.z + Math.cos(L.p * 0.7) * 0.8);
        dummy.rotation.set(L.p, L.p * 0.6, Math.sin(L.p) * 0.8); dummy.scale.setScalar(L.s); dummy.updateMatrix();
        leaves.setMatrixAt(i, dummy.matrix);
      }
      if (NL) leaves.instanceMatrix.needsUpdate = true;
      if (paint.on) { renderer.setRenderTarget(rt); renderer.render(scene, camera); renderer.setRenderTarget(null); renderer.render(postScene, postCam); }
      else renderer.render(scene, camera);
      const w = el.clientWidth, h = el.clientHeight, dist = camera.position.distanceTo(controls.target);
      for (const k in labels) {
        const L = labels[k];
        v.copy(anchors[k]).project(camera);
        const far = camera.position.distanceTo(anchors[k]);
        const show = v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05 && (L.place.always || far < Math.max(260, dist * 1.6));
        L.el.style.display = show ? "" : "none";
        if (show) L.el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px)`;
      }
    }
    tick();

    // a still, painted frame of the current view, plus where each pin lands on it (as percents)
    function capture(W, H, radius, illus) {
      const oldR = postMat.uniforms.radius.value, oldPR = renderer.getPixelRatio();
      renderer.setPixelRatio(1); renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
      rt.setSize(W, H); rt.depthTexture.image.width = W; rt.depthTexture.image.height = H; postMat.uniforms.res.value.set(W, H);
      postMat.uniforms.radius.value = radius; postMat.uniforms.illus.value = illus === true ? 1 : (illus || 0); NLsave = leaves.visible; leaves.visible = false;
      renderer.setRenderTarget(rt); renderer.render(scene, camera); renderer.setRenderTarget(null); renderer.render(postScene, postCam);
      const url = renderer.domElement.toDataURL("image/jpeg", 0.86);
      const pins = {}; for (const k in anchors) { v.copy(anchors[k]).project(camera); if (v.z < 1 && Math.abs(v.x) < 1 && Math.abs(v.y) < 1) pins[k] = [+(((v.x + 1) / 2) * 100).toFixed(2), +(((1 - v.y) / 2) * 100).toFixed(2)]; }
      postMat.uniforms.radius.value = oldR; postMat.uniforms.illus.value = 0; leaves.visible = NLsave; renderer.setPixelRatio(oldPR); resize();
      return { url, pins };
    }
    let NLsave = true;
    return {
      focus, select, setMode, capture,
      view(c, t) { camera.position.set(c[0], c[1], c[2]); controls.target.set(t[0], t[1], t[2]); controls.autoRotate = false; fly = null; controls.update(); },
      setPaint(on) { paint.on = on; },
      home() { flyTo(HOME.t.clone(), HOME.c.clone()); },
      wide() { flyTo(new T.Vector3(0, 0, -150), new T.Vector3(430, 480, 330)); },
    };
  }

  window.BloomMap = { mount };
})();
