/* Nexeros pitch: every drawing on the page. The four brand directions, their marks, the seven
   botanicals, the packaging and the everyday pictures. Colors come from CSS variables (--b1 to --b4,
   --ink, --paper), so one drawing re-skins to whichever direction is showing. */
(function () {
  const NX = window.NX = window.NX || {};

  // the four directions: palette, type and voice
  NX.dirs = {
    rooted: {
      name: "Rooted", tag: "Plant-made. For the two of you.",
      idea: "An apothecary garden. Warm paper, moss and clay, and a ginkgo leaf for a mark: one leaf, two halves.",
      paper: "#f3ede2", ink: "#1f2a22", b1: "#2f4a3a", b2: "#b8613f", b3: "#d9a44e", b4: "#dfe5d5",
      fd: "'Fraunces', Georgia, serif", fb: "'Inter', system-ui, sans-serif", fdw: 400, fds: "normal", track: "-.01em",
      him: "For Him", her: "For Her", names: ["Stamina, No. 01", "Femina, No. 02", "Velvet Fire, No. 03"],
      feel: ["Botanical", "Warm", "Trusted"], fonts: "Fraunces and Inter",
      photo: "Morning light, linen, hands, the plants themselves. People in clothes, at home, mid-laugh.",
    },
    golden: {
      name: "Golden Hour", tag: "Tonight, tomorrow, the weekend.",
      idea: "The warmest hour of the day. Apricot and coral over plum, a sun on the horizon, and a lighter voice.",
      paper: "#fff4ea", ink: "#3a1d2e", b1: "#5b2a44", b2: "#e9775f", b3: "#f7b267", b4: "#fbe0d0",
      fd: "'Instrument Serif', Georgia, serif", fb: "'DM Sans', system-ui, sans-serif", fdw: 400, fds: "italic", track: "0",
      him: "Spark", her: "Glow", names: ["Spark, for him", "Glow, for her", "Slow Burn oil"],
      feel: ["Playful", "Grown-up", "Sunny"], fonts: "Instrument Serif and DM Sans",
      photo: "Road trips, porches, sunsets, couples in their 40s and 50s actually having fun. Warm grade, film grain.",
    },
    still: {
      name: "Still Us", tag: "For the couple you still are.",
      idea: "Editorial and quiet. Ink on paper, one brick red, and an ampersand for a mark, because it's always two of you.",
      paper: "#f7f4ef", ink: "#151515", b1: "#151515", b2: "#a23b2a", b3: "#c9b79c", b4: "#ece6dc",
      fd: "'Cormorant Garamond', Georgia, serif", fb: "'Inter Tight', 'Inter', system-ui, sans-serif", fdw: 500, fds: "italic", track: "-.01em",
      him: "His", her: "Hers", names: ["His, daily vitality", "Hers, daily vitality", "Ours, warming oil"],
      feel: ["Editorial", "Honest", "Grown"], fonts: "Cormorant Garamond and Inter Tight",
      photo: "Black and white documentary portraits of real couples, 35 to 65. Kitchens, dog walks, a slow dance in socks.",
    },
    label: {
      name: "The Label", tag: "Seven plants. Every dose shown. Every batch tested.",
      idea: "Clean and open, like a lab notebook. Bone and graphite with one signal orange. The label is the brand.",
      paper: "#f2f1ec", ink: "#222724", b1: "#222724", b2: "#e2552d", b3: "#9db09a", b4: "#e1e6de",
      fd: "'Space Grotesk', system-ui, sans-serif", fb: "'Space Grotesk', system-ui, sans-serif", fdw: 500, fds: "normal", track: "-.03em",
      him: "M/01", her: "F/02", names: ["M/01 Stamina", "F/02 Femina", "C/03 Velvet Fire"],
      feel: ["Transparent", "Modern", "Proof"], fonts: "Space Grotesk and IBM Plex Mono",
      photo: "Each plant shot like a specimen on white. Capsules on stone. The lab report, printed and real.",
    },
  };
  NX.order = ["rooted", "golden", "still", "label"];
  NX.vars = k => { const d = NX.dirs[k]; return `--paper:${d.paper};--ink:${d.ink};--b1:${d.b1};--b2:${d.b2};--b3:${d.b3};--b4:${d.b4};--fd:${d.fd};--fb:${d.fb};--fdw:${d.fdw};--fds:${d.fds};--trk:${d.track}`; };

  /* ---------- the marks ---------- */
  // the ginkgo: one leaf, two lobes ("biloba"), the notch between them
  const GINKGO = `<path d="M50 64C38 57 13 45 8 31 17 15 36 8 46.5 10L50 31l3.5-21C64 8 83 15 92 31 87 45 62 57 50 64Z" fill="var(--mk, var(--b1))"/>
    <g stroke="var(--paper)" stroke-width="1.3" stroke-linecap="round" opacity=".55">${[-58, -44, -31, -18, 18, 31, 44, 58].map(a => { const r = a * Math.PI / 180, l = 40; return `<path d="M50 62L${(50 + Math.sin(r) * l).toFixed(1)} ${(62 - Math.cos(r) * l * .92).toFixed(1)}"/>`; }).join("")}</g>
    <path d="M50 63c-.6 9 .8 18 4 27" stroke="var(--mk, var(--b1))" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  const SUN = `<defs><clipPath id="sunclip"><rect x="0" y="0" width="100" height="60"/></clipPath></defs>
    <circle cx="50" cy="60" r="27" fill="var(--b2)" clip-path="url(#sunclip)"/>
    <g stroke="var(--b1)" stroke-width="4.5" stroke-linecap="round"><path d="M12 66h76"/><path d="M24 77h52"/><path d="M37 88h26"/></g>`;
  const AMP = `<text x="50" y="80" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="104" fill="var(--b2)">&amp;</text>`;
  const LAB = `<rect x="8" y="8" width="84" height="84" rx="10" fill="none" stroke="var(--b1)" stroke-width="5"/>
    <text x="50" y="47" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="28" fill="var(--b1)" letter-spacing="-1">N/07</text>
    <g fill="var(--b2)">${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${17 + i * 9.6}" y="${70 - [14, 9, 18, 11, 7, 15, 10][i]}" width="5.4" height="${[14, 9, 18, 11, 7, 15, 10][i]}" rx="1.5"/>`).join("")}</g>
    <path d="M17 74h66" stroke="var(--b1)" stroke-width="2.5"/>`;
  NX.mark = (k, sz) => `<svg class="nx-mark" viewBox="0 0 100 100" width="${sz || 48}" height="${sz || 48}" aria-hidden="true" style="${NX.vars(k)}">${{ rooted: GINKGO, golden: SUN, still: AMP, label: LAB }[k]}</svg>`;

  // the wordmark for each direction, as HTML so it uses the page's own fonts
  NX.logo = (k, size) => {
    const s = size || 30;
    if (k === "rooted") return `<span class="nx-logo lg-rooted" style="${NX.vars(k)};--s:${s}px">${NX.mark(k, s * 1.25)}<b>nexeros</b></span>`;
    if (k === "golden") return `<span class="nx-logo lg-golden" style="${NX.vars(k)};--s:${s}px">${NX.mark(k, s * 1.2)}<b>Nexeros</b></span>`;
    if (k === "still") return `<span class="nx-logo lg-still" style="${NX.vars(k)};--s:${s}px"><b>nexeros</b><i>&amp;</i></span>`;
    return `<span class="nx-logo lg-label" style="${NX.vars(k)};--s:${s}px"><b>NEXEROS</b><small>N/07</small></span>`;
  };
  // the detailed ginkgo for the title: a fan leaf with its two-lobed notch and wavy edge, fine forked veins,
  // sage at the base warming to honey at the edge, and a gold stem. Built from angles so it stays symmetrical.
  NX.ginkgoArt = (sz, id) => {
    const cx = 60, cy = 98, rad = Math.PI / 180, uid = id || "gk";
    const r = a => { let v = 64 + 1.5 * Math.cos(a * 0.5) - Math.abs(a) * 0.06; const n = Math.abs(a); if (n < 6) v -= (6 - n) / 6 * 17; return v; };
    const pt = (a, rr) => [cx + rr * Math.sin(a * rad), cy - rr * Math.cos(a * rad)];
    const f = p => p[0].toFixed(1) + " " + p[1].toFixed(1);
    let edge = ""; for (let a = -60; a <= 60; a += 1.5) edge += " L" + f(pt(a, r(a)));
    const leaf = "M" + f([cx - 1.6, cy]) + " Q" + f(pt(-46, 26)) + " " + f(pt(-60, r(-60))) + edge.slice(edge.indexOf("L", 2)) + " Q" + f(pt(46, 26)) + " " + f([cx + 1.6, cy]) + "Z";
    let veins = ""; for (let a = -56; a <= 56; a += 4.6) { const m = pt(a, r(a) * 0.48); veins += `M${f([cx, cy - 3])} L${f(m)} M${f(m)} L${f(pt(a - 1.6, r(a) - 1))} M${f(m)} L${f(pt(a + 1.6, r(a) - 1))} `; }
    return `<svg class="gk-art" viewBox="0 0 120 124" width="${sz}" height="${Math.round(sz * 124 / 120)}" aria-hidden="true"><defs>
      <radialGradient id="${uid}-g" cx="60" cy="98" r="70" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3f6a4c"/><stop offset=".45" stop-color="#7f9a5c"/><stop offset=".8" stop-color="#cfa24c"/><stop offset="1" stop-color="#e6b862"/></radialGradient>
      <clipPath id="${uid}-c"><path d="${leaf}"/></clipPath></defs>
      <path d="${leaf}" fill="url(#${uid}-g)"/>
      <path d="${veins}" clip-path="url(#${uid}-c)" stroke="#f6eedc" stroke-opacity=".42" stroke-width=".55" fill="none" stroke-linecap="round"/>
      <path d="${leaf}" fill="none" stroke="#f3e2b8" stroke-opacity=".55" stroke-width=".7"/>
      <path d="M60 96 C60.5 106 62 114 66 123" stroke="#d9a44e" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
  };
  // the title lockup for the video and the link card: neutral, not tied to any of the four brand ideas
  NX.lockup = id => '<div class="nx-lock"><div class="lk-logo">' + NX.ginkgoArt(130, id) + '<b>nexeros</b></div><span class="lk-bot"><i></i>For the two of you<i></i></span></div>';
  NX.ginkgo = (sz, color) => `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}" aria-hidden="true" style="--mk:${color || "currentColor"}">${GINKGO}</svg>`;

  /* ---------- the seven botanicals, as line drawings ---------- */
  const L = 'fill="none" stroke="var(--ln, var(--b1))" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const F = 'fill="var(--fl, var(--b4))"';
  const leaf = (x, y, len, ang, w) => { const r = ang * Math.PI / 180, ex = x + Math.sin(r) * len, ey = y - Math.cos(r) * len, px = Math.cos(r) * (w || len * .32), py = Math.sin(r) * (w || len * .32), mx = (x + ex) / 2, my = (y + ey) / 2; return `<path d="M${x} ${y}Q${(mx + px).toFixed(1)} ${(my + py).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${(mx - px).toFixed(1)} ${(my - py).toFixed(1)} ${x} ${y}Z" ${F}/><path d="M${x} ${y}L${((x + ex * 2) / 3).toFixed(1)} ${((y + ey * 2) / 3).toFixed(1)}"/>`; };
  NX.plants = [
    { k: "epimedium", tag: "Vitality and desire", use: "A centuries-old tonic in Chinese herbal practice, taken for vitality and desire.", study: "Lab research on its key compound, icariin, is promising. Well-run human trials are still to come.", src: "UTEP Herbal Safety review", name: "Barrenwort", latin: "Epimedium", from: "China and Korea", note: "Heart-shaped leaves, gathered in the hills of China and Korea.",
      svg: `<g ${L}><path d="M60 112C58 90 54 70 46 52"/><path d="M55 80C66 70 76 64 88 60"/>${[[46, 52, -18], [88, 60, 40], [56, 30, 8]].map(([x, y, a]) => `<path d="M${x} ${y}c-14-6-20-22-8-30 6-4 10 0 10 4 0-4 6-8 12-2 8 10-2 24-14 28z" ${F} transform="rotate(${a} ${x} ${y})"/>`).join("")}<path d="M46 52C50 42 54 36 56 30"/>${[[30, 92], [38, 100], [24, 100]].map(([x, y]) => `<path d="M${x} ${y}l4-6 4 6-4 3z" fill="var(--b3)"/>`).join("")}<path d="M57 92C48 92 40 94 34 92"/></g>` },
    { k: "muira", tag: "Energy and desire", use: "A Brazilian folk tonic, long taken for energy and desire.", study: "Early studies are encouraging. In a placebo-controlled trial in women it was part of a blend, so its own share isn't yet known.", src: "Waynberg 2000; Natural Products review", name: "Muira Puama", latin: "Ptychopetalum", from: "The Amazon", note: "A small Amazon tree. The bark and roots are what's used.",
      svg: `<g ${L}><path d="M18 108C40 90 62 62 100 22" stroke-width="3"/>${[[34, 95, -30], [46, 84, 40], [58, 70, -20], [66, 58, 55], [78, 46, -5], [88, 34, 60]].map(([x, y, a]) => leaf(x, y, 30, a, 8)).join("")}<path d="M26 102l-6 3M40 88l-4 6" stroke-width="2"/></g>` },
    { k: "ginseng", tag: "Energy and stamina", use: "The classic root of East Asian tradition, taken for energy, stamina and steadiness under stress.", study: "The most studied plant in the formula. A Cochrane review of 9 trials in men found a small benefit to sexual function; a trial in menopausal women saw improved arousal.", src: "Cochrane 2021; Oh 2010", name: "Korean Ginseng", latin: "Panax ginseng", from: "Korea", note: "The famous root. Grown for years before it's ready.",
      svg: `<g ${L}><path d="M60 74c-8 6-10 16-8 24-4 6-10 12-12 18M60 74c8 6 8 16 6 26 4 4 8 10 8 14M56 98c-6 2-10 0-14-2M66 100c4 2 8 2 12 0" ${F}/><path d="M60 74V44"/><circle cx="60" cy="40" r="4" fill="var(--b2)" stroke="none"/><circle cx="55" cy="36" r="3" fill="var(--b2)" stroke="none"/><circle cx="65" cy="36" r="3" fill="var(--b2)" stroke="none"/>${[-70, -35, 0, 35, 70].map(a => leaf(60, 50, 26, a, 7)).join("")}</g>` },
    { k: "tongkat", tag: "Male vitality", use: "A Southeast Asian root, traditionally taken for male vitality and energy.", study: "Reviews of randomized trials suggest it supports healthy testosterone, mostly in men who start low, with daily use over several weeks.", src: "Leisegang 2022; Kotirum 2015", name: "Tongkat Ali", latin: "Eurycoma longifolia", from: "Southeast Asia", note: "A slender rainforest shrub. The root is what's used.",
      svg: `<g ${L}><path d="M60 112V18"/>${[30, 44, 58, 72, 86].map((y, i) => leaf(60, y, 24 - i, -62, 6) + leaf(60, y, 24 - i, 62, 6)).join("")}${leaf(60, 18, 18, 0, 6)}</g>` },
    { k: "tribulus", tag: "Vitality and desire", use: "A staple of Ayurveda, taken for vitality and well-being.", study: "Results are mixed but positive: benefits to sexual function in 3 of 5 recent studies in men, and improved desire in a trial in women.", src: "Systematic review 2025; Akhtari 2014", name: "Tribulus", latin: "Tribulus terrestris", from: "India and the Mediterranean", note: "A low, spreading plant with small yellow flowers.",
      svg: `<g ${L}><path d="M14 92C40 84 70 82 106 70"/>${[24, 38, 52, 66, 80, 94].map((x, i) => { const y = 92 - (x - 14) * .2; return `<circle cx="${x}" cy="${y - 7}" r="3.6" ${F}/><circle cx="${x}" cy="${y + 7}" r="3.6" ${F}/>`; }).join("")}<g transform="translate(60 44)">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-10" rx="6" ry="10" transform="rotate(${a})" fill="var(--b3)"/>`).join("")}<circle r="4" fill="var(--b2)" stroke="none"/></g><path d="M60 56v24"/></g>` },
    { k: "rehmannia", tag: "Restoration", use: "A classical Chinese herb, used to nourish and restore.", study: "Valued for its long traditional role. It hasn't yet been studied for intimacy.", src: "Traditional use", name: "Rehmannia", latin: "Rehmannia glutinosa", from: "China", note: "Trumpet-shaped flowers over a dark, prized root.",
      svg: `<g ${L}><path d="M60 112V48"/>${[[60, 48, -30], [60, 62, 34], [60, 34, 4]].map(([x, y, a]) => `<path d="M${x} ${y}l-6-20c4-6 8-6 12 0z" transform="rotate(${a} ${x} ${y})" fill="var(--b2)" fill-opacity=".85"/>`).join("")}${leaf(60, 98, 30, -70, 11)}${leaf(60, 98, 30, 70, 11)}${leaf(60, 84, 22, -55, 8)}${leaf(60, 84, 22, 55, 8)}</g>` },
    { k: "ginkgo", tag: "Circulation and focus", use: "Taken for circulation and mental clarity for centuries.", study: "Studied widely for memory and circulation; trials on intimacy haven't shown a clear effect. Check with your doctor if you take blood thinners.", src: "Kang 2002; Meston 2008", name: "Ginkgo", latin: "Ginkgo biloba", from: "China", note: "One of the oldest living tree species on Earth. Biloba means two lobes.",
      svg: `<g ${L}><path d="M30 110C46 90 60 70 70 44"/></g><g transform="translate(46 8) scale(.62)" style="--mk:var(--fl, var(--b4))"><g stroke="var(--ln, var(--b1))" stroke-width="2.4">${GINKGO}</g></g><g transform="translate(10 52) scale(.42) rotate(-28 50 50)" style="--mk:var(--b3)">${GINKGO}</g>` },
  ];
  NX.plant = (p, sz) => `<svg class="plant" viewBox="0 0 120 120" width="${sz || 120}" height="${sz || 120}" aria-hidden="true">${p.svg}</svg>`;

  /* ---------- the packaging ---------- */
  // a capsule jar with the direction's label; who: "him", "her" or "oil"
  NX.jar = (k, who, w) => {
    const d = NX.dirs[k], i = { him: 0, her: 1, oil: 2 }[who], nm = d.names[i].split(/,\s*/);
    const body = { rooted: ["#2f4a3a", "#b8613f", "#7a3d2a"], golden: ["#5b2a44", "#e9775f", "#f7b267"], still: ["#151515", "#e4dccd", "#a23b2a"], label: ["#f2f1ec", "#f2f1ec", "#222724"] }[k][i];
    const dark = !["#e4dccd", "#f2f1ec", "#f7b267"].includes(body), lab = k === "label";
    const ink = dark ? "#f6f1e7" : d.ink, cap = k === "golden" ? d.b3 : k === "label" ? d.b2 : k === "still" ? (i === 1 ? d.ink : d.b3) : "#e9dfcc";
    const oil = who === "oil";
    const shape = oil
      ? `<path d="M78 16h44v26c0 4 2 6 6 9 14 9 22 22 22 40v124a16 16 0 0 1-16 16H66a16 16 0 0 1-16-16V91c0-18 8-31 22-40 4-3 6-5 6-9z" fill="${body}"/><rect x="74" y="0" width="52" height="22" rx="5" fill="${cap}"/>`
      : `<rect x="46" y="34" width="108" height="200" rx="22" fill="${body}"/><rect x="40" y="6" width="120" height="38" rx="9" fill="${cap}"/><rect x="40" y="38" width="120" height="6" fill="#000" opacity=".12"/>`;
    const mk = k === "rooted" ? `<g transform="translate(84 ${oil ? 98 : 74}) scale(.32)" style="--mk:${ink};--paper:${body}">${GINKGO}</g>` : k === "golden" ? `<g transform="translate(84 ${oil ? 96 : 72}) scale(.32)" style="--b2:${d.b3};--b1:${ink}">${SUN.replace('id="sunclip"', `id="sc${who}"`).replace("url(#sunclip)", `url(#sc${who})`)}</g>` : k === "still" ? `<text x="100" y="${oil ? 128 : 104}" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-size="44" fill="${i === 1 ? d.b2 : d.b2}">&amp;</text>` : "";
    const y0 = oil ? 150 : 132;
    const word = k === "label"
      ? `<text x="62" y="78" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="13" fill="${d.ink}" letter-spacing="1">NEXEROS</text><path d="M62 86h76" stroke="${d.ink}" stroke-width="1.5"/><text x="62" y="128" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="34" fill="${d.ink}" letter-spacing="-1.5">${["M/01", "F/02", "C/03"][i]}</text><text x="62" y="146" font-family="Space Grotesk, sans-serif" font-weight="500" font-size="11" fill="${d.ink}">${esc(nm[0].replace(/^\w\/\d+ /, ""))}</text>${(oil ? ["Warming massage oil", "4 fl oz / 120 ml", "Batch tested"] : ["Barrenwort    __ mg", "Muira Puama   __ mg", "Ginseng       __ mg", "Tongkat Ali   __ mg", "+3 more, all dosed"]).map((t, j) => `<text x="62" y="${166 + j * 10.5}" font-family="IBM Plex Mono, monospace" font-size="7" fill="${d.ink}" xml:space="preserve">${t}</text>`).join("")}<rect x="62" y="${oil ? 206 : 222}" width="18" height="4" rx="2" fill="${d.b2}"/>`
      : `<text x="100" y="${y0}" text-anchor="middle" font-family="${d.fd.replace(/'/g, "")}" font-style="${d.fds}" font-weight="${d.fdw}" font-size="${k === "golden" ? 30 : 24}" fill="${ink}">${k === "golden" ? esc(nm[0]) : "nexeros"}</text><text x="100" y="${y0 + 24}" text-anchor="middle" font-family="${d.fb.replace(/'/g, "")}" font-size="10.5" letter-spacing="2.4" fill="${ink}" opacity=".85">${esc((k === "golden" ? nm[1] || "warming oil" : nm[0]).toUpperCase())}</text>${k !== "golden" && nm[1] ? `<text x="100" y="${y0 + 40}" text-anchor="middle" font-family="${d.fb.replace(/'/g, "")}" font-size="9" letter-spacing="1.6" fill="${ink}" opacity=".7">${esc(nm[1].toUpperCase())}</text>` : ""}<text x="100" y="${oil ? 214 : 214}" text-anchor="middle" font-family="${d.fb.replace(/'/g, "")}" font-size="7" letter-spacing=".8" fill="${ink}" opacity=".7">${oil ? "4 FL OZ" : "7 BOTANICALS · 10 CT"}</text>`;
    return `<svg class="jar" viewBox="0 0 200 250" width="${w || 160}" aria-hidden="true"><ellipse cx="100" cy="242" rx="70" ry="6" fill="#000" opacity=".12"/>${shape}${lab ? `<rect x="54" y="${oil ? 62 : 56}" width="92" height="${oil ? 168 : 170}" rx="6" fill="#fff" opacity=".7"/>` : ""}${mk}${word}</svg>`;
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- the everyday pictures: relatable, not racy ---------- */
  NX.scene = {
    mugs: `<svg viewBox="0 0 240 160" aria-hidden="true"><rect width="240" height="160" fill="var(--b4)"/><rect y="112" width="240" height="48" fill="var(--b3)" opacity=".35"/><g><path d="M64 70h48v40a14 14 0 0 1-14 14H78a14 14 0 0 1-14-14z" fill="var(--b1)"/><path d="M112 82c12 0 12 22 0 22" fill="none" stroke="var(--b1)" stroke-width="5"/></g><g><path d="M134 76h44v34a14 14 0 0 1-14 14h-16a14 14 0 0 1-14-14z" fill="var(--b2)"/><path d="M178 86c11 0 11 20 0 20" fill="none" stroke="var(--b2)" stroke-width="5"/></g><g fill="none" stroke="var(--paper)" stroke-width="3" stroke-linecap="round" opacity=".9"><path d="M82 60c-6-8 6-12 0-22M96 60c-6-8 6-12 0-22"/><path d="M150 66c-6-8 6-12 0-22M164 66c-6-8 6-12 0-22"/></g><circle cx="200" cy="34" r="14" fill="var(--b3)"/></svg>`,
    brushes: `<svg viewBox="0 0 240 160" aria-hidden="true"><rect width="240" height="160" fill="var(--b4)"/><rect x="0" y="122" width="240" height="38" fill="var(--paper)"/><path d="M96 74h48l-6 50h-36z" fill="var(--b1)"/><g stroke-linecap="round"><path d="M110 76 98 22" stroke="var(--b2)" stroke-width="7"/><path d="M130 76l12-56" stroke="var(--b3)" stroke-width="7"/></g><rect x="92" y="14" width="10" height="16" rx="3" fill="var(--paper)" transform="rotate(-12 97 22)"/><rect x="138" y="12" width="10" height="16" rx="3" fill="var(--paper)" transform="rotate(12 143 20)"/><circle cx="196" cy="56" r="18" fill="none" stroke="var(--b1)" stroke-width="3" opacity=".4"/></svg>`,
    weekend: `<svg viewBox="0 0 240 160" aria-hidden="true"><rect width="240" height="160" fill="var(--b4)"/><rect x="38" y="22" width="164" height="118" rx="10" fill="var(--paper)"/><rect x="38" y="22" width="164" height="26" rx="10" fill="var(--b1)"/><rect x="38" y="38" width="164" height="10" fill="var(--b1)"/>${["M", "T", "W", "T", "F", "S", "S"].map((d, i) => `<text x="${52 + i * 22.6}" y="70" text-anchor="middle" font-size="11" font-family="Inter, sans-serif" fill="var(--ink)" opacity=".6">${d}</text>`).join("")}${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${52 + i * 22.6}" cy="94" r="8" fill="${i === 5 ? "var(--b2)" : "var(--b4)"}"/>`).join("")}<path d="M150 116c6 4 24 4 30 0" fill="none" stroke="var(--b2)" stroke-width="3" stroke-linecap="round"/><text x="165" y="134" text-anchor="middle" font-size="10" font-family="Inter, sans-serif" fill="var(--b2)" font-weight="600">date night</text></svg>`,
    porch: `<svg viewBox="0 0 240 160" aria-hidden="true"><rect width="240" height="160" fill="var(--b3)"/><circle cx="170" cy="96" r="38" fill="var(--b2)" opacity=".85"/><rect y="104" width="240" height="56" fill="var(--b1)"/><g fill="var(--paper)"><rect x="60" y="74" width="30" height="34" rx="4"/><rect x="100" y="74" width="30" height="34" rx="4"/></g><g stroke="var(--paper)" stroke-width="3"><path d="M64 108v14M86 108v14M104 108v14M126 108v14"/></g><path d="M20 104h200" stroke="var(--paper)" stroke-width="2" opacity=".5"/></svg>`,
  };
})();
