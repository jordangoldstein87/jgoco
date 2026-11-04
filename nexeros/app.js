/* Nexeros pitch: the router, the side nav, the welcome page with the opening video, and the brand
   deck. The storefront mock is store.js; the research pages are views.js; the drawings are art.js. */
(function () {
  const NX = window.NX;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
  let DIR = store.get("nx-dir") || "rooted";
  const APP = window.APP = { views: {}, esc, $, dir: () => DIR, setDir: k => { DIR = k; store.set("nx-dir", k); } };
  if (/[?&]cap\b/.test(location.search)) document.documentElement.classList.add("cap");

  /* ---------- the nav ---------- */
  const IC = {
    play: "M8 5v14l11-7z", site: "M3 5h18v14H3zM3 9h18", brand: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.6 1.5-1.4 0-1.2-1-1.6-1-2.6 0-.9.7-1.5 1.6-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5zM7.5 11.5h.01M10 7.5h.01M15 7.5h.01",
    read: "M4 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4zM20 5h-6M20 5v13h-6", seen: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    market: "M3 3v18h18M7 15l4-4 3 3 6-7", seo: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5", channels: "M4 7h16M4 12h16M4 17h16M8 4v16", mkt: "M3 11l15-6v14L3 13zM7 12v6",
    sales: "M3 20h18M6 16V9M11 16V5M16 16v-4M21 16V8", hq: "M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7", coin: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v12", mic: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
  };
  const NAV = [
    ["welcome", "The video", "play"], ["site", "The new site", "site"],
    ["head", "The plan"],
    ["market", "The market", "market"], ["brand", "Brand", "brand"], ["read", "Deep read", "read"], ["seen", "Visibility", "seen"], ["seo", "Search (SEO)", "seo"],
    ["channels", "Channels", "channels"], ["marketing", "Marketing", "mkt"], ["sales", "Sales", "sales"], ["hq", "NexEros Hub", "hq"], ["costs", "AI running costs", "coin"], ["questions", "Your turn", "mic"],
  ];
  const svgI = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  function navHtml(cur) {
    return NAV.map(([k, t, ic]) => k === "head" ? `<span class="nv-head">${t}</span>` : `<a href="#${k}" class="${cur === k ? "on" : ""}">${svgI(IC[ic])}<span>${t}</span></a>`).join("");
  }
  function shell(cur) {
    $("#lnav-links").innerHTML = navHtml(cur);
    $("#mnav").innerHTML = navHtml(cur);
    document.body.dataset.view = cur;
  }

  /* ---------- router ---------- */
  function route() {
    const h = (location.hash || "").slice(1) || "welcome";
    const m = h.match(/^site-(.+)$/), v = m ? "site" : h, sub = m ? m[1] : undefined;
    return { v: APP.views[v] || v === "welcome" ? v : "welcome", sub };
  }
  function render() {
    const r = route();
    stopHero();
    shell(r.v);
    $("#mnav").hidden = true;
    const view = $("#view");
    view.innerHTML = r.v === "welcome" ? welcome() : APP.views[r.v](r.sub);
    view.dataset.v = r.v;
    window.scrollTo(0, 0);
    if (r.v === "welcome") mountWelcome();
    rise();
    document.dispatchEvent(new CustomEvent("nx-render", { detail: r }));
  }
  APP.render = render;
  window.addEventListener("hashchange", render);
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-dir]");
    if (b) { APP.setDir(b.dataset.dir); render(); return; }
    if (e.target.closest("#menu-btn")) { const m = $("#mnav"); m.hidden = !m.hidden; }
  });
  // sections fade up as they scroll in
  function rise() {
    const els = document.querySelectorAll(".rise:not(.in)");
    if (!("IntersectionObserver" in window) || document.documentElement.classList.contains("cap")) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }
  APP.rise = rise;

  /* ---------- welcome: the opening video, then the way in ---------- */
  function bgPlants() {
    // the backdrop for the opening: the seven botanicals, large and dim, drifting
    return `<div class="wh-plants" aria-hidden="true">${NX.plants.map((p, i) => `<span style="--i:${i}">${NX.plant(p, 220)}</span>`).join("")}</div>`;
  }
  function welcome() {
    const S = window.C || {};
    return `<section class="wh" id="wh" style="${NX.vars("rooted")}">
        ${bgPlants()}
        <div class="wh-veil"></div>
        <div class="wh-lines">${HERO_LINES.map(([, t]) => `<p>${t}</p>`).join("")}</div>
        <div class="wh-stage"></div>
        <div class="wh-open">${NX.lockup()}
          <button class="wh-play" aria-label="Play the video"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></button><small>press play · sound on</small></div>
        <div class="wh-ctl"><button data-hb aria-label="Back">${svgI("M11 19l-7-7 7-7M19 19l-7-7 7-7")}</button><button data-pp aria-label="Pause">${svgI("M8 5v14M16 5v14")}</button><button data-hn aria-label="Next">${svgI("M13 5l7 7-7 7M5 5l7 7-7 7")}</button><div class="wh-bar"><i></i></div><span class="wh-time">0:00</span><button data-mute aria-label="Mute">${svgI("M11 5L6 9H2v6h4l5 4zM19 9a5 5 0 0 1 0 6")}</button></div>
        <button class="wh-skip" data-skip>Skip</button>
        <div class="wh-endcue"><span>Scroll down for more</span>${svgI("M6 9l6 6 6-6")}</div>
      </section>
      <section class="wel-sect"><div class="wrap"><span class="eyebrow">Your turn</span><h2>Now see it for yourself.</h2><p class="wel-p">Everything in the video is on this page. Start with the new website, then the menu has a page for each part of the plan.</p>
        <a class="cta-big" href="#site">Take a look around <span aria-hidden="true">→</span></a></div></section>
      <section class="wel-sect alt"><div class="wrap"><span class="eyebrow">What's inside</span><h2>You, plus a whole team's worth of tools.</h2>
        <div class="wel-grid">${[["site", "The new site", "nexeros.com rebuilt, shown in four quick ideas for the look. Click between them."], ["market", "The market", "How big it is, who wins, what's missing, and brands that rebuilt their look."], ["brand", "Brand", "Four quick ideas for a direction, each with a logo, colors, type, packaging and a sample ad. Starting points to tweak."], ["read", "Deep read", "Who buys, how NexEros advertises today, and how to tell the all-natural story."], ["seen", "Visibility", "Where NexEros shows up online today, scored."], ["seo", "Search", "Where it ranks, what's broken, and the fix list."], ["channels", "Channels", "Every place it could sell, run from one back office."], ["marketing", "Marketing", "Wire up what's there, add what's missing, let it run."], ["sales", "Sales", "Store leads found and enriched, and a wholesale portal."], ["hq", "NexEros Hub", "One portal, one master database, every channel and AI tool wired in."], ["costs", "AI running costs", "What every AI job costs to run, task by task. Most of it is pennies."], ["questions", "Your turn", "A 15-minute AI interview about your stores, spend and goals, or the same questions in writing."]].map(([k, t, p]) => `<a class="wel-card" href="#${k}">${svgI(IC[{ site: "site", market: "market", brand: "brand", read: "read", seen: "seen", seo: "seo", channels: "channels", marketing: "mkt", sales: "sales", hq: "hq", costs: "coin", questions: "mic" }[k]])}<b>${t}</b><span>${p}</span></a>`).join("")}</div></div></section>
      <section class="wel-cta"><div class="wrap"><span class="eyebrow">Ready?</span><h2>Start with the new website.</h2><p>Use the switch at the top to see it in each of the four ideas.</p><a class="cta-big" href="#site">Take a look around <span aria-hidden="true">→</span></a></div></section>`;
  }

  // the opening lines over the botanicals
  const HERO_LINES = [[0.8, "You're one founder"], [4.4, "doing the work of a whole team."], [8, "Here's how we give you one."]];
  // a picture of a page inside a browser window, drawn live and scaled down to fit
  const win = (url, html, cls) => `<div class="wh-win ${cls || ""}"><div class="ww-bar"><i></i><i></i><i></i><span>${esc(url)}</span></div><div class="ww-pg"><div class="ww-in">${html}</div></div></div>`;
  function siteIn(k, sub) { const was = DIR; DIR = k; const h = APP.views.site(sub); DIR = was; return h; }
  function heroScenes() {
    const S = window.C || {};
    const tool = S.hqRing || ["Your store", "PaymentCloud", "Amazon", "Walmart", "iHerb", "Email", "Meta ads", "Google", "QuickBooks", "Shipping", "Store finder", "Lab reports", "AI"];
    return [
      { k: "Where you are today", h: "Great plants inside. The outside doesn't show it yet.", html: `<div class="wh-today"><img src="img/today/home.jpg?v=1793754982" alt="nexeros.com today"></div>`, t: 6 },
      { k: "The market", h: "A $4 billion category nobody trusts, and no brand owns.", html: `<div class="wh-mk3">${[["441", "products on the FDA's hidden-drug list since 2012"], ["11.6%", "a year: how fast sexual health supplements are growing"], ["4%", "the most any one brand holds on Amazon"]].map(([a, b], i) => `<div style="--i:${i}"><b>${a}</b><span>${b}</span></div>`).join("")}</div>`, t: 6.5 },
      { title: "Four quick ideas for the look.", logos: NX.order, t: 4.6 },
      ...NX.order.map(k => ({ dir: k, t: 3.4 })),
      { k: "What's inside", h: "The plants are what set it apart. Put them up front.", html: `<div class="wh-ring7">${NX.plants.map((p, i) => `<span style="--i:${i};left:${(50 + 40 * Math.sin(i * 2 * Math.PI / 7)).toFixed(1)}%;top:${(50 - 40 * Math.cos(i * 2 * Math.PI / 7)).toFixed(1)}%">${NX.plant(p, 96)}<b>${esc(p.name)}</b></span>`).join("")}<div class="wh-jar">${NX.jar("rooted", "him", 120)}</div></div>`, t: 6 },
      { k: "Visibility", h: S.seenLine || "Where NexEros shows up online, scored.", html: `<div class="wh-score">${(S.score || [["Search", 2], ["Social", 3], ["Marketplaces", 1], ["Reviews", 2], ["Email", 4], ["Content", 2]]).map(([a, b], i) => `<div style="--i:${i}"><span>${esc(a)}</span><i style="--w:${b * 10}%"></i><b>${b}/10</b></div>`).join("")}</div>`, t: 6 },
      { k: "Channels", h: "Sell everywhere. Run it from one place.", html: `<div class="wh-flow">${(S.flowChips || ["Amazon", "Walmart", "iHerb", "Google Shopping", "Distributors", "Pharmacies", "Boutiques", "Wholesale portal"]).map((c, i) => `<span style="--i:${i};left:${i % 2 ? 78 : 4}%;top:${8 + Math.floor(i / 2) * 22}%">${esc(c)}</span>`).join("")}<div class="wh-hub">${NX.mark("rooted", 54)}<b>One catalog<br>One inventory</b></div></div>`, t: 6.5 },
      { k: "Marketing", h: "Marketing that keeps running when you're busy.", html: `<div class="wh-mkt">${[["Email", "Welcome, reorder and win-back, written once"], ["Search", "An ingredient guide a week, built to rank"], ["Ads", "New creative, checked against the ad rules"], ["Reviews", "Asked for at the right day, shown everywhere"]].map(([a, b], i) => `<div style="--i:${i}"><b>${a}</b><span>${b}</span></div>`).join("")}</div>`, t: 6 },
      { k: "Sales", h: "Your sales team, in a portal.", html: win("nexeros.com/wholesale", `<div class="wh-leads"><div class="wl-h"><b>Store leads · sample</b><span>Found, checked and ready to call</span></div>${(S.leadsMini || [["Green Leaf Pharmacy", "Independent pharmacy", "Austin, TX", 92], ["Root & Remedy", "Natural foods", "Asheville, NC", 88], ["The Wellness Loft", "Day spa", "Scottsdale, AZ", 81], ["Hearth Apothecary", "Herbal shop", "Portland, OR", 79], ["Main St. Vitamins", "Vitamin store", "Boise, ID", 74]]).map(r => `<div class="wl-r"><b>${esc(r[0])}</b><span>${esc(r[1])}</span><span>${esc(r[2])}</span><i style="--w:${r[3]}%"></i><em>${r[3]}</em></div>`).join("")}</div>`, "short"), t: 6 },
      { center: true, ring: tool, t: 7.5 },
    ];
  }
  function heroChapters() { return [{ open: "lines", t: 11.5 }, { open: "logo", t: 3.2 }, ...heroScenes()]; }
  let hero = null;
  function stopHero() { if (hero) { hero.dead = true; hero = null; } APP.music && APP.music.stop(); }
  function mountWelcome() {
    const wh = $("#wh");
    wh.querySelector(".wh-play").onclick = () => { APP.music && APP.music.start(); playHero(0); };
    wh.querySelector("[data-skip]").onclick = () => endHero(true);
    wh.querySelector("[data-pp]").onclick = () => { if (!hero) return; hero.paused = !hero.paused; wh.toggleAttribute("data-paused", hero.paused); APP.music && APP.music.pause(hero.paused); };
    wh.querySelector("[data-hb]").onclick = () => hero && jump(Math.max(0, hero.at - (hero.t - hero.starts[hero.at] > 1.5 ? 0 : 1)));
    wh.querySelector("[data-hn]").onclick = () => hero && (hero.at + 1 >= hero.ch.length ? endHero(true) : jump(hero.at + 1));
    wh.querySelector("[data-mute]").onclick = e => { APP.music && APP.music.mute(); e.currentTarget.classList.toggle("off"); };
    wh.querySelector(".wh-bar").onclick = e => { if (!hero) return; const r = e.currentTarget.getBoundingClientRect(), t = (e.clientX - r.left) / r.width * hero.total; let i = 0; hero.starts.forEach((s, j) => { if (t >= s) i = j; }); jump(i); };
    if (/[?&]autoplay\b/.test(location.search)) playHero(0);
    const sn = new URLSearchParams(location.search).get("scene"); if (sn) playHero(+sn);
  }
  function jump(i) { const keepPaused = hero && hero.paused; playHero(i); if (keepPaused) { hero.paused = true; $("#wh").toggleAttribute("data-paused", true); } }
  const clock = t => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
  function playHero(from) {
    if (hero) hero.dead = true;
    const wh = $("#wh"); if (!wh) return;
    const ch = heroChapters(), starts = []; let total = 0; ch.forEach(c => { starts.push(total); total += c.t; });
    const H = hero = { ch, starts, total, at: from, t: starts[from], paused: false, dead: false };
    // fetch and decode every picture the video uses now, so none of them pops in mid-scene
    ch.forEach(c => (c.html || "").replace(/src="([^"]+)"/g, (m, u) => { const im = new Image(); im.src = u; im.decode && im.decode().catch(() => {}); }));
    wh.classList.add("on"); wh.classList.remove("at-end");
    const stage = $(".wh-stage", wh), lines = [...wh.querySelectorAll(".wh-lines p")], bar = $(".wh-bar i", wh), time = $(".wh-time", wh);
    let last = performance.now(), shown = -1;
    const tick = now => {
      if (H.dead) return;
      if (!H.paused) H.t = Math.min(total, H.t + (now - last) / 1000);
      last = now;
      let i = 0; starts.forEach((s, j) => { if (H.t >= s) i = j; });
      if (H.t >= total) return endHero(false);
      if (i !== shown) { shown = i; H.at = i; show(ch[i], stage, wh); }
      if (ch[i].open === "lines") { let n = -1; HERO_LINES.forEach(([t], j) => { if (H.t >= t) n = j; }); lines.forEach((l, j) => l.classList.toggle("on", j === n)); }
      bar.style.width = (H.t / total * 100).toFixed(2) + "%";
      time.textContent = clock(H.t) + " / " + clock(total);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function show(sc, stage, wh) {
    wh.className = "wh on at-" + (sc.open || "scenes");
    if (sc.open) { stage.innerHTML = ""; return; }
    const el = document.createElement("div");
    el.className = "wh-scene";
    if (sc.title) el.innerHTML = `<h2 class="wh-t">${esc(sc.title)}</h2><div class="wh-logos">${sc.logos.map((k, i) => `<span style="--i:${i};${NX.vars(k)}">${NX.logo(k, 34)}<small>${esc(NX.dirs[k].name)}</small></span>`).join("")}</div>`;
    else if (sc.dir) el.innerHTML = `<div class="wh-dirhead" style="${NX.vars(sc.dir)}">${NX.logo(sc.dir, 30)}<span>${esc(NX.dirs[sc.dir].name)} · “${esc(NX.dirs[sc.dir].tag)}”</span></div>${win("nexeros.com", siteIn(sc.dir), "site")}`;
    else if (sc.center) {
      // every system on an ellipse, wired to the Hub in the middle; positions in % of the box, lines in a 100x100 viewBox
      const n = sc.ring.length, pt = i => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [50 + 43 * Math.cos(a), 50 + 40 * Math.sin(a)]; };
      el.innerHTML = `<div class="wh-hq"><svg class="wh-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${sc.ring.map((t, i) => { const [x, y] = pt(i); return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" style="--i:${i}"/>`; }).join("")}</svg>${sc.ring.map((t, i) => { const [x, y] = pt(i); return `<span style="--i:${i};left:${x.toFixed(1)}%;top:${y.toFixed(1)}%">${esc(t)}</span>`; }).join("")}<div class="wh-core">${NX.mark("rooted", 46)}<b>NexEros Hub</b><small>one portal<br>one database</small></div></div><div class="wh-cap2"><span class="eyebrow">Behind it all</span><h2>One portal. One database. Every channel.</h2></div>`;
    }
    else el.innerHTML = `<div class="wh-cap"><span class="eyebrow">${esc(sc.k)}</span><h2>${esc(sc.h)}</h2></div><div class="wh-body">${sc.html}</div>`;
    stage.appendChild(el);
    // a page inside a window: laid out at desktop or phone width, then scaled to fit the window
    el.querySelectorAll(".ww-in").forEach(x => { const w = x.parentElement.clientWidth, base = w < 600 ? 420 : 1280; x.style.width = base + "px"; x.style.transform = `scale(${w / base})`; });
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("on")));
    const old = [...stage.children].slice(0, -1); old.forEach(o => o.classList.remove("on")); setTimeout(() => old.forEach(o => o.remove()), 800);
  }
  function endHero(skip) {
    const wh = $("#wh"); if (!wh) return;
    if (hero) hero.dead = true; hero = null;
    $(".wh-stage", wh).innerHTML = "";
    wh.className = "wh on at-end";
    $(".wh-bar i", wh).style.width = "100%";
    APP.music && APP.music.fade(skip ? 1 : 4);
  }

  /* ---------- the brand deck ---------- */
  APP.views.brand = () => {
    const pick = store.get("nx-pick");
    const C = window.C || {};
    return `<div class="pg">
      <header class="pg-hero rise"><span class="eyebrow">Brand</span><h1>Stop looking like the gas station. Look like the garden.</h1><p class="lede">What sets NexEros apart is inside the capsule: seven plants with centuries of use. Today the look hides that behind dark gold and shirtless couples, the same look as the pills by the register. Here are four quick ideas for a new direction. They're starting points, not finished brands: each one is a different way to look at the same plant story. Any of them can be tweaked, mixed with another, and taken all the way.</p></header>
      <section class="pg-sec rise"><div class="b-today"><div class="b-shot"><img src="img/today/home.jpg?v=1793754982" alt="nexeros.com today"><span>nexeros.com today</span></div>
        <div><h2>What the look says today</h2><ul class="b-list">${(C.todaySays || [["Dark and gold", "Reads like the gas station shelf your own founder's note says you set out to beat."], ["Shirtless couples, mid-embrace", "Feels like a stock-photo ad. It also gets ads rejected: Meta and Google limit sexual imagery for this category."], ["STAMINA and FEMINA in caps", "Sound like energy shots. Nothing says plant, couple or care."], ["The good stuff is buried", "Seven botanicals and your warm founder's note sit halfway down the page, under the stock photos."]]).map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join("")}</ul></div></div></section>
      ${NX.order.map((k, i) => dirCard(k, i, pick)).join("")}
      <section class="pg-sec rise"><h2>Pictures: less of this, more of this</h2><div class="b-dd"><div class="b-dont"><b>Less of this</b><ul>${["Bare chests and lingerie", "Mid-kiss, eyes closed, dark backdrop", "Gold on black, glowing type", "Stock models in their twenties", "Anything that would need a blur on Instagram"].map(x => `<li>${x}</li>`).join("")}</ul></div><div class="b-do"><b>More of this</b><ul>${["Real couples 35 to 65, dressed, laughing", "Hands: coffee, a car door, a dog leash", "The plants themselves, shot like specimens", "Morning light, linen, a kitchen, a porch", "The lab report, printed and real"].map(x => `<li>${x}</li>`).join("")}</ul></div></div>
        <div class="b-vign" style="${NX.vars(DIR)}">${["mugs", "brushes", "weekend", "porch"].map(s => `<div>${NX.scene[s]}</div>`).join("")}</div><p class="b-note">Drawn placeholders. A one-day shoot with two or three real couples replaces them.</p></section>
      <section class="pg-sec rise"><h2>The words, before and after</h2><div class="b-ba">${(C.rewrites || [["Enjoy Pleasure … Naturally", "Plant-made. For the two of you."], ["One capsule, 3+ days of confidence.", "A simple ritual for the two of you, built on seven traditional botanicals.*"], ["100% organic, plant-based botanicals.", "Seven plants, every dose on the label, every batch lab tested. (\"Organic\" comes back once it's certified.)"], ["4.9/5 from thousands of orders", "4.8 from 746 verified reviews (the real number, linked)"]]).map(([a, b]) => `<div class="b-row"><s>${esc(a)}</s><span>→</span><b>${esc(b)}</b></div>`).join("")}</div></section>
      <section class="pg-sec rise b-pickbox"><h2>Which idea should we take further?</h2><p>Pick the closest one, even if it's only half right. We'll tweak the colors, the type, the names or the voice, or mix pieces from two, before anything runs. Tapping one opens your email with a note to Jordan; you press send.</p><div class="b-picks">${NX.order.map(k => `<a class="b-pick ${pick === k ? "on" : ""}" style="${NX.vars(k)}" data-pick="${k}" href="mailto:jordan@jgoco.me?subject=${encodeURIComponent("Nexeros brand: " + NX.dirs[k].name)}&body=${encodeURIComponent("Hi Jordan,\n\nThe idea closest to NexEros is " + NX.dirs[k].name + " (\"" + NX.dirs[k].tag + "\").\n\nWhat I'd change:\n\n- Oliver")}">${NX.logo(k, 24)}<span>${esc(NX.dirs[k].name)}</span></a>`).join("")}</div></section>
    </div>`;
  };
  function dirCard(k, i, pick) {
    const d = NX.dirs[k];
    return `<section class="b-dir rise" style="${NX.vars(k)}" id="dir-${k}"><div class="b-dhead"><span class="b-num">Idea 0${i + 1}</span><div>${NX.logo(k, 54)}</div><p class="b-tag">“${esc(d.tag)}”</p></div>
      <div class="b-dgrid"><div class="b-idea"><h3>${esc(d.name)}</h3><p>${esc(d.idea)}</p><div class="b-feel">${d.feel.map(f => `<span>${f}</span>`).join("")}</div>
          <div class="b-sw">${[["Paper", d.paper], ["Ink", d.ink], ["Primary", d.b1], ["Accent", d.b2], ["Warm", d.b3], ["Soft", d.b4]].map(([n, c]) => `<div><i style="background:${c}"></i><b>${n}</b><small>${c}</small></div>`).join("")}</div>
          <div class="b-type"><span class="b-aa">Aa</span><div><b>${esc(d.fonts)}</b><p>Seven plants, every one on the label. Made for the two of you.</p></div></div>
          <div class="b-names"><b>Product names</b><span>${d.names.map(esc).join(" · ")}</span></div>
          <div class="b-photo"><b>Photos</b><span>${esc(d.photo)}</span></div></div>
        <div class="b-pack"><div class="b-jars">${NX.jar(k, "him", 150)}${NX.jar(k, "her", 150)}${NX.jar(k, "oil", 120)}</div>
          <div class="b-ad"><div class="b-adin"><span class="b-adk">Sponsored · nexeros</span><div class="b-adart">${NX.scene[["mugs", "porch", "brushes", "weekend"][i]]}</div><b>${esc(d.tag)}</b><span class="b-adcta">Shop now</span></div><small>A sample ad, within Meta's rules for this category</small></div></div></div>
      <div class="b-dfoot"><a class="b-btn" href="#site" data-dir="${k}">See the site in ${esc(d.name)} →</a></div></section>`;
  }
  document.addEventListener("click", e => { const p = e.target.closest("[data-pick]"); if (p) store.set("nx-pick", p.dataset.pick); });

  document.addEventListener("DOMContentLoaded", render);
  if (document.readyState !== "loading") setTimeout(render);
})();
