/* The Bloomfield brand deck: six logo directions, palettes, and names for the portal.
   Each logo is drawn as inline SVG so it scales from a favicon to a banner. */
(function () {
  const APP = window.APP, esc = APP.esc;

  // the town's silhouette: storefront cornices, the Revival Hall spire, the Baptist belfry
  const SKY = "M0 60 V40 h14 v-6 h18 v6 h6 V30 h22 v10 h4 V36 h16 v-4 h12 v28 M92 60 V34 l6 -4 V18 l4 -14 4 14 v12 l6 4 v26 M116 60 V38 h20 v-6 h4 v-6 a4 4 0 0 1 8 0 v6 h4 v6 h16 v22 M168 60 V42 h18 v-4 h14 v22";

  const LOGOS = {
    simple: (c, k) => `<svg viewBox="0 0 360 132" role="img" aria-label="Bloomfield, Kentucky"><text x="180" y="70" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="74" fill="${c}">Bloomfield</text>
      <line x1="92" y1="117" x2="138" y2="117" stroke="${k || c}" stroke-width="1"/><line x1="222" y1="117" x2="268" y2="117" stroke="${k || c}" stroke-width="1"/>
      <text x="180" y="121.5" text-anchor="middle" font-family="Cormorant SC, Georgia, serif" font-size="14" letter-spacing="5" fill="${k || c}">KENTUCKY</text></svg>`,
    site: (c, k) => `<svg viewBox="0 0 360 160" role="img" aria-label="Stay in Bloomfield, Kentucky"><text x="180" y="26" text-anchor="middle" font-family="Cormorant SC, Georgia, serif" font-weight="600" font-size="15" letter-spacing="7" fill="${k || c}">STAY IN</text>
      <text x="180" y="94" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="500" font-size="74" fill="${c}">Bloomfield</text>
      <line x1="92" y1="145" x2="138" y2="145" stroke="${k || c}" stroke-width="1"/><line x1="222" y1="145" x2="268" y2="145" stroke="${k || c}" stroke-width="1"/>
      <text x="180" y="149.5" text-anchor="middle" font-family="Cormorant SC, Georgia, serif" font-size="14" letter-spacing="5" fill="${k || c}">KENTUCKY</text></svg>`,
    skyline: (c, k) => `<svg viewBox="0 0 360 170" role="img" aria-label="Bloomfield, Kentucky, with the Taylorsville Road skyline"><g transform="translate(80 8) scale(1)"><path d="${SKY}" fill="none" stroke="${c}" stroke-width="2.2" stroke-linejoin="round"/><line x1="-30" y1="60" x2="230" y2="60" stroke="${c}" stroke-width="2.2"/></g>
      <text x="180" y="122" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="500" font-size="54" fill="${c}">Bloomfield</text>
      <text x="180" y="150" text-anchor="middle" font-family="Cormorant SC, Georgia, serif" font-size="13" letter-spacing="6" fill="${k || c}">KENTUCKY</text></svg>`,
    seal: (c, k) => { const id = "s" + Math.random().toString(36).slice(2, 7); return `<svg viewBox="0 0 200 200" role="img" aria-label="Bloomfield, Kentucky, established 1817"><defs><path id="${id}t" d="M 34 100 A 66 66 0 0 1 166 100"/><path id="${id}b" d="M 22 100 A 78 78 0 0 0 178 100"/></defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="${c}" stroke-width="2.2"/><circle cx="100" cy="100" r="88" fill="none" stroke="${c}" stroke-width=".8"/>
      <text font-family="Cormorant SC, Georgia, serif" font-weight="600" font-size="19" letter-spacing="2.5" fill="${c}"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">BLOOMFIELD</textPath></text>
      <text font-family="Cormorant SC, Georgia, serif" font-weight="600" font-size="13" letter-spacing="4" fill="${k || c}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">KENTUCKY</textPath></text>
      <g fill="${k || c}"><path d="M 26 104 l 2.2 -4.4 l 2.2 4.4 l -4.4 -2.8 h 4.4 z"/><path d="M 169.6 104 l 2.2 -4.4 l 2.2 4.4 l -4.4 -2.8 h 4.4 z"/></g>
      <g fill="${c}"><rect x="93" y="98" width="14" height="30"/><path d="M 91 98 L 100 62 L 109 98 Z"/><rect x="99.3" y="52" width="1.4" height="11"/><rect x="96.5" y="55" width="7" height="1.4"/></g>
      <path d="M 97.5 116 a 2.5 2.5 0 0 1 5 0 v 6 h -5 z" fill="${k || c}"/>
      <rect x="84" y="127" width="32" height="1.6" fill="${c}"/>
      <path d="M 70 136 c 10 -5 20 5 30 0 s 20 -5 30 0" fill="none" stroke="${k || c}" stroke-width="1.6"/>
      <text x="100" y="152" text-anchor="middle" font-family="Cormorant SC, Georgia, serif" font-weight="600" font-size="10" letter-spacing="3" fill="${c}">EST. 1817</text></svg>`; },
    bloom: (c, k) => `<svg viewBox="0 0 360 120" role="img" aria-label="Bloomfield, Kentucky, with a bloom mark"><g transform="translate(40 18)">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="34" cy="20" rx="9" ry="19" fill="none" stroke="${c}" stroke-width="2" transform="rotate(${a} 34 40)"/>`).join("")}<circle cx="34" cy="40" r="5" fill="${k || c}"/></g>
      <text x="124" y="70" font-family="Cormorant Garamond, Georgia, serif" font-weight="500" font-size="54" fill="${c}">Bloomfield</text>
      <text x="126" y="96" font-family="Cormorant SC, Georgia, serif" font-size="13" letter-spacing="6" fill="${k || c}">KENTUCKY</text></svg>`,
    creek: (c, k) => `<svg viewBox="0 0 360 140" role="img" aria-label="Bloomfield, Kentucky, with spire and creek"><path d="M180 6 l8 24 v26 h-16 v-26 z" fill="${c}"/><path d="M120 66 c20 -8 40 8 60 0 s40 -8 60 0" stroke="${k || c}" stroke-width="2" fill="none"/>
      <text x="180" y="112" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="600" font-size="46" letter-spacing="2" fill="${c}">BLOOMFIELD</text>
      <text x="180" y="132" text-anchor="middle" font-family="Cormorant SC, Georgia, serif" font-size="12" letter-spacing="7" fill="${k || c}">KENTUCKY</text></svg>`,
    script: (c, k) => `<svg viewBox="0 0 360 150" role="img" aria-label="Bloomfield, Kentucky, in script"><text x="180" y="76" text-anchor="middle" font-family="Pinyon Script, cursive" font-size="78" fill="${c}">Bloomfield</text>
      <text x="180" y="138" text-anchor="middle" font-family="Libre Franklin, sans-serif" font-weight="600" font-size="10.5" letter-spacing="7" fill="${k || c}">KENTUCKY</text></svg>`,
  };
  APP.logo = (k, c, k2) => (LOGOS[k] || LOGOS.simple)(c, k2);

  const CONCEPTS = [
    ["simple", "The Signature", "An italic wordmark and small caps. Easiest to use everywhere. On the site now."],
    ["skyline", "Taylorsville Road", "The real roofline: storefront cornices, the Revival Hall spire, the belfry."],
    ["seal", "The Town Seal", "Est. 1817 around the spire and the creek. For signs, stamps and merchandise."],
    ["bloom", "The Bloom", "A five-petal mark from the name itself. Works alone as an icon."],
    ["creek", "Spire & Creek", "The two things everyone remembers, in two strokes."],
    ["script", "The Postcard", "Script for the welcome-to-town feel. Best on photos."],
  ];
  const PALETTES = [
    ["Bourbon & Brick", ["#5c2b1f", "#c48a3e", "#1d1a17", "#f3ead9", "#8a5a2b"]],
    ["Fall on Taylorsville Road", ["#7b3b2c", "#b08a3e", "#2f3b31", "#efece5", "#50697a"]],
    ["Creek & Limestone", ["#3d5560", "#9fb3b8", "#2a2a26", "#ecebe5", "#a2442c"]],
  ];
  const NAMES = [["Town Center", "Plain and clear. What it is."], ["The Depot", "Named for the old depot, now City Hall. Where everything comes and goes."], ["The Taylorsville Office", "The back office for every shop on the road."], ["The Ledger", "An old-town name for the place that keeps it all."]];

  // each concept on the palette's paper, then reversed onto its brick, deep tone and accent
  function logoCards(pi) {
    const [name, c] = PALETTES[pi]; // c: [main, accent, deep, paper, second]
    return CONCEPTS.map(k => `<figure class="lg" data-note-target="Logo: ${esc(k[1])} in ${esc(name)}">
      <div class="lg-art" style="background:${c[3]}">${APP.logo(k[0], c[0], c[1])}</div>
      <div class="lg-trio">
        <div style="background:${c[0]}">${APP.logo(k[0], c[3], c[1])}</div>
        <div style="background:${c[2]}">${APP.logo(k[0], c[3], c[1])}</div>
        <div style="background:${c[4]}">${APP.logo(k[0], c[3], c[3])}</div>
      </div>
      <figcaption><div><b>${esc(k[1])}</b><span>${esc(k[2])}</span></div><div class="vote"><button data-vote="love" data-what="Logo: ${esc(k[1])} in ${esc(name)}" aria-label="Love this">♥</button><button data-vote="hate" data-what="Logo: ${esc(k[1])} in ${esc(name)}" aria-label="Not this one">✕</button></div></figcaption></figure>`).join("");
  }
  function render(v) {
    document.getElementById("addr").innerHTML = "";
    v.innerHTML = `<div class="deck">
      <section class="slide s-title"><div class="wrap">${APP.logo("simple", "#f4efe6", "#d2ae63")}<p>Brand directions for the town</p></div></section>
      <section class="slide"><div class="wrap"><div class="sect-head"><span class="eyebrow">Six directions</span><h2>Bloomfield, big. Kentucky, small.</h2><p class="big-p">Tap a heart on the ones you like. Notes go straight to us.</p></div>
        <div class="palpick" id="palpick">${PALETTES.map((p, i) => `<button type="button" data-pal="${i}" class="${i ? "" : "on"}"><span class="sw">${p[1].map(c => `<i style="background:${c}"></i>`).join("")}</span>${esc(p[0])}</button>`).join("")}</div>
        <div class="logos" id="logos">${logoCards(0)}</div></div></section>
      <section class="slide" hidden><div class="wrap"><div class="logos">${CONCEPTS.map(c => `<figure class="lg"><div class="lg-art"></div><div class="lg-dark"></div>
          <figcaption><div><b>${esc(c[1])}</b><span>${esc(c[2])}</span></div><div class="vote"><button data-vote="love" data-what="Logo: ${esc(c[1])}" aria-label="Love this">♥</button><button data-vote="hate" data-what="Logo: ${esc(c[1])}" aria-label="Not this one">✕</button></div></figcaption></figure>`).join("")}</div></div></section>
      <section class="slide"><div class="wrap"><div class="sect-head"><span class="eyebrow">In the wild</span><h2>How it lives.</h2></div>
        <div class="mock3">
          <div class="mk-sign">${APP.logo("seal", "#efe3c4", "#efe3c4")}<span>Welcome sign on KY 55</span></div>
          <div class="mk-tote">${APP.logo("skyline", "#2a1d18", "#7b3b2c")}<span>Tote bag</span></div>
          <div class="mk-ig"><img src="img/town/town-2.jpg?v=1793944505" alt=""><div class="mk-ov">${APP.logo("script", "#fff", "#fff")}</div><span>Instagram post</span></div>
        </div></div></section>
      <section class="slide"><div class="wrap"><div class="sect-head"><span class="eyebrow">Color</span><h2>Three palettes from the town itself.</h2></div>
        <div class="pals">${PALETTES.map(p => `<div class="pal" data-note-target="Palette: ${esc(p[0])}"><div class="sw">${p[1].map(c => `<span style="background:${c}" title="${c}"></span>`).join("")}</div><div class="pal-f"><b>${esc(p[0])}</b><div class="vote"><button data-vote="love" data-what="Palette: ${esc(p[0])}" aria-label="Love this">♥</button><button data-vote="hate" data-what="Palette: ${esc(p[0])}" aria-label="Not this one">✕</button></div></div></div>`).join("")}</div></div></section>
      <section class="slide"><div class="wrap"><div class="sect-head"><span class="eyebrow">The family</span><h2>Every business keeps its own look. Three ways to show it.</h2></div>
        <div class="marks"><div class="mk-h"><span></span><span>Logo</span><span>Color and name</span><span>Icon</span></div>${["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival", "stays", "town"].map(k => `<div class="mk-r"><b>${esc(APP.D.brands[k].name)}</b><span>${APP.markLogo(k, 26)}</span><span class="mk-dot">${APP.bubble(k, 14)}${esc(APP.D.brands[k].name)}</span><span>${APP.markIcon(k, 56)}</span></div>`).join("")}</div>
        <p class="big-p" style="margin-top:22px">The logo where there's room, a color and name where it's small, and a simple icon wherever it stands on its own.</p></div></section>
      <section class="slide"><div class="wrap"><div class="sect-head"><span class="eyebrow">Polish, not a makeover</span><h2>What we tidied on each site.</h2></div>
        <div class="tidy">${[["nettie", "A real online store, hours on the page, the bourbon menu in print."], ["ernies", "The menu as text instead of photos, one set of prices, a live band calendar."], ["doubledip", "Its own page with one address, flavors of the day, party booking."], ["merrifield", "One phone number, a real tea menu, online reservations."], ["pinkhouse", "Its own page with capacity, pricing and dates."], ["velvet", "Template pages gone, an inquiry form, the real address."], ["rowdys", "Real copy, the right ZIP code, events and tickets."], ["revival", "A brand new site, ready to take holds before it opens."]].map(r => `<div>${APP.bubble(r[0], 40)}<span><b>${esc(APP.D.brands[r[0]].name)}</b>${esc(r[1])}</span></div>`).join("")}</div></div></section>
      <section class="slide"><div class="wrap"><div class="sect-head"><span class="eyebrow">Naming the portal</span><h2>What should the back office be called?</h2></div>
        <div class="names">${NAMES.map(n => `<div class="nm-card" data-note-target="Portal name: ${esc(n[0])}"><b>${esc(n[0])}</b><span>${esc(n[1])}</span><div class="vote"><button data-vote="love" data-what="Portal name: ${esc(n[0])}" aria-label="Love this">♥</button><button data-vote="hate" data-what="Portal name: ${esc(n[0])}" aria-label="Not this one">✕</button></div></div>`).join("")}</div></div></section>
    </div>`;
  }
  APP.views.brand = { render: v => { render(v); v.querySelectorAll("[data-pal]").forEach(b => b.onclick = () => { v.querySelectorAll("[data-pal]").forEach(x => x.classList.toggle("on", x === b)); v.querySelector("#logos").innerHTML = logoCards(Number(b.dataset.pal)); }); } };
})();
