/* The Farm pitch for Eaton Botanicals: the router, the side nav, the welcome page and its opening video.
   The new website mock is site.js; the portal mock is hub.js; the plan pages are views.js; all words and numbers are data.js. */
(function () {
  const AX = window.AX;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n, d) => (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
  const APP = window.APP = { views: {}, esc, $, money };
  const Q = new URLSearchParams(location.search);
  if (Q.has("cap")) document.documentElement.classList.add("cap");
  if (Q.has("rail")) document.documentElement.classList.add("rail");

  /* ---------- icons ---------- */
  const IC = APP.IC = {
    play: "M8 5v14l11-7z", site: "M3 5h18v14H3zM3 9h18M7 7h.01",
    read: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
    hub: "M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7",
    bid: "M4 4h16v4H4zM4 12h10M4 16h7M17 13l2 2 4-4",
    est: "M4 3h16v18H4zM8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 19h0",
    folder: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    cal: "M4 5h16v16H4zM4 9h16M8 3v4M16 3v4M8 13h3M8 17h6",
    money: "M3 6h18v12H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 9v.01M18 15v.01",
    field: "M2 20h20M5 20V9l7-5 7 5v11M9 20v-6h6v6",
    star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z",
    coin: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v12",
    mic: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
    mail: "M3 5h18v14H3zM3 6l9 7 9-7", receipt: "M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4",
    users: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM22 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
    shield: "M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z", file: "M6 2h9l5 5v15H6zM14 2v6h6",
    chat: "M21 12a8 8 0 0 1-12 7l-6 2 2-5.5A8 8 0 1 1 21 12z", camera: "M3 7h4l2-3h6l2 3h4v13H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    pin: "M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", flag: "M5 21V4M5 4h11l-2 4 2 4H5",
    phone: "M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z", check: "M4 12l5 5L20 6",
    bolt: "M13 2L4 14h7l-1 8 9-12h-7z", repeat: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
    search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
    bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
    book: "M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4zM4 16a4 4 0 0 1 4-4h12",
    cart: "M3 4h2l2.4 11h11l2-8H6.2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    megaphone: "M3 10v4h3l7 4V6L6 10zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12",
    chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 15V9a4 4 0 0 1 4-4h2M18 9v6a4 4 0 0 1-4 4h-2",
    plus: "M12 5v14M5 12h14", leaf: "M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7",
    slack: "M9 3a2 2 0 0 0 0 4h2V5a2 2 0 0 0-2-2zM3 9a2 2 0 0 0 2 2h4V9a2 2 0 0 0-4 0M15 21a2 2 0 0 0 0-4h-2v2a2 2 0 0 0 2 2zM21 15a2 2 0 0 0-2-2h-4v2a2 2 0 0 0 4 0M13 3v6h2a2 2 0 0 0 0-4 2 2 0 0 0-2-2M11 21v-6H9a2 2 0 0 0 0 4 2 2 0 0 0 2 2",
  };
  const svgI = APP.svgI = (k, s) => `<svg class="ic" viewBox="0 0 24 24" width="${s || 20}" height="${s || 20}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[k] || k}"/></svg>`;

  /* ---------- the nav ---------- */
  const NAV = [
    ["welcome", "The video", "play"], ["site", "Your site", "site"],
    ["head", "Where you stand"], ["read", "The deep read", "read"], ["sale", "How a sale happens", "route"], ["stuck", "Where it gets stuck", "flag"],
    ["head", "The Farm"], ["hub", "The portal", "hub"], ["locator", "Store locator", "pin"], ["promo", "Promo days", "cal"], ["orders", "Orders and Distru", "cart"], ["reorders", "Reorders", "repeat"], ["inbox", "Inbox and outreach", "mail"], ["marketing", "Marketing", "megaphone"], ["bud", "Bud, your assistant", "chat"], ["phone", "From your phone", "phone"],
    ["head", "Next"], ["build", "Anything you want built", "bolt"], ["costs", "What it replaces", "coin"], ["questions", "Your turn", "mic"],
  ];
  const navHtml = cur => NAV.map(([k, t, ic]) => k === "head" ? `<span class="nv-head">${t}</span>` : `<a href="#${k}" class="${cur === k ? "on" : ""}">${svgI(IC[ic], 18)}<span>${t}</span></a>`).join("");
  function shell(cur) { $("#lnav-links").innerHTML = navHtml(cur); $("#mnav").innerHTML = navHtml(cur); document.body.dataset.view = cur; }

  /* ---------- router ---------- */
  function route() {
    const h = (location.hash || "").slice(1) || "welcome";
    const [v, sub] = h.split("/");
    return { v: v === "welcome" || APP.views[v] ? v : "welcome", sub };
  }
  function render() {
    const r = route();
    stopVideo();
    shell(r.v);
    $("#mnav").hidden = true;
    const view = $("#view");
    view.innerHTML = r.v === "welcome" ? welcome() : APP.views[r.v](r.sub);
    view.dataset.v = r.v;
    if (!Q.has("to")) window.scrollTo(0, 0);
    if (r.v === "welcome") mountWelcome();
    rise();
    document.dispatchEvent(new CustomEvent("ax-render", { detail: r }));
    const to = Q.get("to"); if (to) setTimeout(() => { const el = document.getElementById(to); el && el.scrollIntoView(); }, 50);
  }
  APP.render = render;
  window.addEventListener("hashchange", render);
  document.addEventListener("click", e => { if (e.target.closest("#menu-btn")) { const m = $("#mnav"); m.hidden = !m.hidden; } });
  function rise() {
    const els = document.querySelectorAll(".rise:not(.in)");
    if (!("IntersectionObserver" in window) || document.documentElement.classList.contains("cap")) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }
  APP.rise = rise;

  /* ---------- the page footer every view ends with ---------- */
  APP.next = (href, label) => `<section class="sec"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:30px"><span class="mute">Prepared for Eaton Botanicals</span><a class="btn" href="#${href}">Next: ${label} →</a></div></section>`;

  /* ---------- the opening video ---------- */
  const V = AX.video;
  const chip = (ic, t) => `<div>${svgI(ic)}<span>${esc(t)}</span></div>`;
  const P = k => AX.products.find(p => p.k === k) || {};
  const NYP = "M2,40 L9,31 L20,26 L35,24 L50,19 L58,10 L64,3 L80,1 L83,30 L85,62 L84,74 L82,77 L99,77 L100,81 L85,86 L79,89 L76,87 L74,80 L70,73 L66,66 L2,63 Z";
  const vmap = () => { let sd = 11; const r = () => (sd = (sd * 9301 + 49297) % 233280) / 233280; const C = [[77, 83, 60, 4], [88, 82, 18, 6], [73, 64, 20, 5], [70, 30, 16, 6], [22, 31, 14, 5], [10, 40, 12, 4], [46, 34, 12, 5], [52, 54, 8, 6], [40, 44, 8, 5], [72, 8, 6, 5]]; const pts = []; C.forEach(([x, y, n, s]) => { for (let i = 0; i < n; i++) pts.push([x + (r() - .5) * s * 2, y + (r() - .5) * s * 1.4, r()]); });
    return `<svg viewBox="0 0 100 92" class="v-map"><path d="${NYP}" fill="rgba(255,255,255,.06)" stroke="rgba(197,180,226,.5)" stroke-width=".4"/>${pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${p[2] < .3 ? 1.3 : .9}" fill="${p[2] < .3 ? "#d9bf6a" : "#7fc4a0"}" style="animation-delay:${(i * .022).toFixed(2)}s"/>`).join("")}</svg>`; };
  const SCENES = {
    lines: () => `<div class="v-line" id="v-lines"></div>`,
    headline: () => `<div class="v-line">${V.headline}<small>${esc(V.headSub)}</small></div>`,
    site: () => `<div class="v-stack"><div class="v-title">${esc(V.site.h)}<small>${esc(V.site.p)}</small></div><div class="v-win"><div class="bar"><i></i><i></i><i></i><span>eatonbotanicals.com</span></div><img src="img/shots/site.jpg?v=1794189253" alt=""></div></div>`,
    locator: () => `<div class="v-stack"><div class="v-title">${esc(V.locator.h)}<small>${esc(V.locator.p)}</small></div><div class="v-mapwrap">${vmap()}<div class="v-legend"><span><i style="background:#7fc4a0"></i>Carries Eaton</span><span><i style="background:#d9bf6a"></i>Golden Ticket, last 90 days</span></div></div></div>`,
    orders: () => `<div class="v-stack"><div class="v-title">${esc(V.orders.h)}<small>${esc(V.orders.p)}</small></div><div class="v-feed">${AX.orders.lines.slice(0, 5).map((l, i) => `<div class="row" style="animation-delay:${.3 * i}s"><i class="v-tin" style="background:${P(l[0]).c}"></i><span><b>${esc(P(l[0]).n)}</b><small>${esc(AX.orders.stock[l[0]][1])}</small></span><span class="tag">${l[1]} tins</span><span class="score" style="color:#fff">${money(l[1] * l[2])}</span></div>`).join("")}<div class="row" style="animation-delay:1.7s;grid-template-columns:1fr auto;background:rgba(175,147,53,.18);border-color:rgba(175,147,53,.5)"><span><b>Confirmed. Sales order SO-20418 is in Distru.</b><small>Lantern House · Brooklyn · Net 30</small></span><span class="score" style="color:#d9bf6a">${money(AX.orders.lines.reduce((s, l) => s + l[1] * l[2], 0))}</span></div></div></div>`,
    reorder: () => `<div class="v-stack"><div class="v-title">${esc(V.reorder.h)}<small>${esc(V.reorder.p)}</small></div><div class="v-feed">${AX.accounts.filter(a => a.last / a.gap >= .85).sort((a, b) => b.last / b.gap - a.last / a.gap).slice(0, 4).map((a, i) => `<div class="row" style="animation-delay:${.35 * i}s">${svgI("repeat", 26)}<span><b>${esc(a.n)}</b><small>${esc(a.city)} · orders every ${a.gap} days · usually ${money(a.avg)}</small></span><span class="tag">${a.last} days</span><span class="score">${a.last > a.gap ? "Late" : "Due"}</span></div>`).join("")}</div></div>`,
    promo: () => `<div class="v-stack"><div class="v-title">${esc(V.promo.h)}<small>${esc(V.promo.p)}</small></div><div class="v-feed">${AX.promos.map((p, i) => `<div class="row" style="animation-delay:${.3 * i}s">${svgI("cal", 26)}<span><b>${esc(p.store)} · ${esc(p.day)}</b><small>${esc(p.what)} · ${esc(p.who)}</small></span><span class="tag">${esc(p.st)}</span><span class="score">${p.lift ? "+" + Math.round((p.lift[1] / p.lift[0] - 1) * 100) + "%" : ""}</span></div>`).join("")}</div></div>`,
    marketing: () => `<div class="v-stack"><div class="v-title">${esc(V.marketing.h)}<small>${esc(V.marketing.p)}</small></div><div class="v-feed">${AX.campaigns.map((c, i) => `<div class="row" style="animation-delay:${.35 * i}s">${svgI("megaphone", 26)}<span><b>${esc(c.n)}</b><small>${esc(c.to)} · ${esc(c.ch)}</small></span><span class="tag">${esc(c.st)}</span><span class="score" style="color:${c.ok ? "#7fe0b0" : "#ff8a8a"}">${c.ok ? "✓" : "Fix"}</span></div>`).join("")}</div></div>`,
    bud: () => `<div class="v-stack"><div class="v-title">${esc(V.bud.h)}<small>${esc(V.bud.p)}</small></div><div class="v-slack"><div class="v-slack-top">${svgI("slack", 18)}<b># sales</b><span>Slack · Teams works the same</span></div>
      <div class="v-msg" style="animation-delay:.2s"><span class="av" style="background:#e8a33a">T</span><div><b>Tom</b><p>@Bud who's out of Golden Ticket up north?</p></div></div>
      <div class="v-msg" style="animation-delay:1.4s"><span class="av bud"><img src="img/mark-gold.png?v=1794189253" alt=""></span><div><b>Bud <em>APP</em></b><p>High Meadow in Saratoga is out, and their Golden Ticket night on Nov 20 isn't confirmed. I drafted a nudge to Jon and added 12 tins to their next order. Approve?</p><div class="v-acts"><span>Approve both</span><span>Edit</span></div></div></div>
      <div class="v-msg" style="animation-delay:3.2s"><span class="av" style="background:#e8a33a">T</span><div><b>Tom</b><p>Approve both 👍</p></div></div></div></div>`,
    ring: () => `<div class="v-stack"><div class="v-title">${esc(V.ring.h)}<small>${esc(V.ring.p)}</small></div><div class="v-flow"><div class="v-list">${V.ring.l.map((t, i) => `<div style="animation-delay:${.12 * i}s">${svgI(t[0])}${esc(t[1])}</div>`).join("")}</div><div class="v-core"><img src="img/mark-gold.png?v=1794189253" alt=""></div><div class="v-list">${V.ring.r.map((t, i) => `<div style="animation-delay:${.5 + .12 * i}s">${svgI(t[0])}${esc(t[1])}</div>`).join("")}</div></div></div>`,
    build: () => `<div class="v-stack"><div class="v-title">${esc(V.build.h)}<small>${esc(V.build.p)}</small></div><div class="v-builds">${V.build.l.map((t, i) => `<div style="animation-delay:${.25 * i}s">${svgI(["users", "leaf", "cal", "flag", "chart", "bolt"][i], 24)}<span>${esc(t)}</span></div>`).join("")}</div></div>`,
    farm: () => `<div class="v-stack"><div class="v-win" style="width:min(820px,90vw);background:#000"><img src="img/photos/lineup-group.jpg?v=1794189253" alt="The Eaton Botanicals gummy tins with the mushrooms in each one" style="aspect-ratio:3/2;object-position:center"></div><div class="v-line" style="font-size:clamp(34px,4.6vw,66px)">${V.farm}</div></div>`,
    end: () => `<div class="v-stack v-end"><img src="img/logo-white.png?v=1794189253" alt="Eaton Botanicals"><div class="v-line" style="font-size:clamp(30px,3.6vw,50px)">${V.end}<small>Scroll down for more</small></div></div>`,
  };
  const CH = V.scenes; // [key, seconds, caption]
  let VO = {}, voEl = null, voMuted = false, curDur = 0, showTok = 0, timer = null, idx = 0, t0 = 0, paused = false, elapsed = 0;
  function stopVideo() { clearTimeout(timer); timer = null; cancelAnimationFrame(raf); APP.music && APP.music.stop(); stopVoice(); }
  /* the voiceover: one clip per scene (img/vo/<scene>.mp3), lengths in img/vo/vo.json; the music dips under it */
  const VO_ON = !Q.has("cap") && !Q.has("novo");
  fetch("img/vo/vo.json?v=1794189253").then(r => r.ok ? r.json() : {}).then(j => { VO = j || {}; }).catch(() => {});
  const voClips = {};
  function preloadVoice() { if (!VO_ON) return; Object.keys(VO).forEach(k => { if (!voClips[k]) { const a = new Audio(`img/vo/${k}.mp3`); a.preload = "auto"; voClips[k] = a; } }); }
  APP.voice = () => voEl; // for checks: the clip playing now
  function stopVoice() { if (voEl) { voEl.pause(); voEl.onended = null; } voEl = null; APP.music && APP.music.duck && APP.music.duck(false); }
  function playVoice(k) {
    stopVoice(); if (!VO_ON || !VO[k]) return;
    voEl = voClips[k] || new Audio(`img/vo/${k}.mp3`); voEl.currentTime = 0; voEl.muted = voMuted;
    APP.music && APP.music.duck && APP.music.duck(true);
    voEl.onended = () => { APP.music && APP.music.duck && APP.music.duck(false); };
    voEl.play().catch(() => {});
  }
  let raf = 0;
  function tick() {
    const segs = document.querySelectorAll(".wh-bar .seg i"); if (!segs.length) return;
    const now = paused ? elapsed : elapsed + (performance.now() - t0) / 1000;
    segs.forEach((s, i) => s.style.width = i < idx ? "100%" : i > idx ? "0" : Math.min(100, now / (curDur || CH[idx][1]) * 100) + "%");
    raf = requestAnimationFrame(tick);
  }
  function show(i) {
    const st = $(".wh-stage"); if (!st) return;
    clearTimeout(timer); const tok = ++showTok;
    idx = i; elapsed = 0; t0 = performance.now();
    if (i >= CH.length) { stopVoice(); finish(); return; }
    const [k, secs, cap] = CH[i];
    const old = st.querySelector(".wh-scene");
    const go = () => {
      if (tok !== showTok || !st.isConnected) return;
      st.innerHTML = `<div class="wh-scene at-${k}">${SCENES[k]()}</div>`;
      $(".wh-cap").textContent = cap || "";
      $(".wh").dataset.scene = k;
      if (k === "lines") typeLines();
      // a scene lasts as long as its picture needs, or its voice line plus a beat, whichever is longer
      curDur = VO_ON && VO[k] ? Math.max(secs, VO[k] + 0.9) : secs; t0 = performance.now();
      playVoice(k);
      clearTimeout(timer); if (!paused) timer = setTimeout(() => show(i + 1), curDur * 1000);
    };
    if (old) { old.classList.add("out"); setTimeout(go, 420); } else go();
  }
  function typeLines() {
    const el = $("#v-lines"); if (!el) return;
    // with the voice on, the four lines keep pace with it; without it, one every 3.6 seconds
    const step = (VO_ON && VO.lines ? Math.max(2.2, (VO.lines + 0.4) / V.lines.length) : 3.6) * 1000;
    V.lines.forEach((l, i) => setTimeout(() => { if (el.isConnected) { el.innerHTML = `<span style="display:block;animation:sIn .9s both">${l}</span>`; } }, i * step));
  }
  function finish() {
    APP.music && APP.music.fade(3);
    const wh = $(".wh"); wh.classList.remove("on"); wh.classList.add("done");
    $(".wh-front").innerHTML = `<img src="img/logo-white.png?v=1794189253" alt="Eaton Botanicals"><h1>${V.headline}</h1><p>${esc(V.headSub)}</p><button class="play" id="replay"><i><svg viewBox="0 0 24 24" width="22" height="22"><path d="${IC.play}"/></svg></i>Watch again</button>`;
  }
  function playVideo(from) {
    const wh = $(".wh"); if (!wh) return;
    wh.classList.add("on");
    wh.querySelector(".wh-bar").innerHTML = CH.map((c, i) => `<span class="seg" data-i="${i}"><i></i></span>`).join("") + `<button id="v-pause" aria-label="Pause">❚❚</button><button id="v-mute" aria-label="Mute">♪</button>`;
    paused = false; cancelAnimationFrame(raf); tick();
    if (!Q.has("cap")) APP.music && APP.music.start();
    preloadVoice();
    show(from || 0);
  }
  APP.playVideo = playVideo;
  function mountWelcome() {
    const wh = $(".wh");
    wh.addEventListener("click", e => {
      if (e.target.closest(".play")) { playVideo(0); return; }
      const sg = e.target.closest(".seg"); if (sg) { show(+sg.dataset.i); return; }
      if (e.target.closest("#v-pause")) {
        paused = !paused; e.target.textContent = paused ? "▶" : "❚❚";
        if (paused) { elapsed += (performance.now() - t0) / 1000; clearTimeout(timer); APP.music && APP.music.pause(true); voEl && voEl.pause(); }
        else { t0 = performance.now(); timer = setTimeout(() => show(idx + 1), Math.max(0, (curDur || CH[idx][1]) - elapsed) * 1000); APP.music && APP.music.pause(false); voEl && !voEl.ended && voEl.play().catch(() => {}); }
        return;
      }
      if (e.target.closest("#v-mute")) { APP.music && APP.music.mute(); voMuted = !voMuted; if (voEl) voEl.muted = voMuted; e.target.style.opacity = e.target.style.opacity === ".4" ? "1" : ".4"; }
    });
    const sn = Q.get("scene"); if (sn != null) { paused = false; playVideo(+sn); if (Q.has("cap")) { clearTimeout(timer); paused = true; } }
  }

  /* ---------- welcome ---------- */
  function welcome() {
    const W = AX.welcome;
    return `
    <section class="wh"><div class="wh-bg" style="background-image:url(img/photos/farm-field.jpg?v=1794189253)"></div><div class="wh-shade"></div>
      <div class="wh-front"><img src="img/logo-white.png?v=1794189253" alt="Eaton Botanicals"><div class="wh-farm">The Farm</div><h1>${V.headline}</h1><p>${esc(V.headSub)}</p><button class="play"><i><svg viewBox="0 0 24 24" width="22" height="22"><path d="${IC.play}"/></svg></i>Play the video</button></div>
      <div class="wh-stage"></div><div class="wh-cap"></div><div class="wh-bar"></div>
    </section>
    <div class="stripe"></div>
    <section class="sec"><div class="wrap">
      <div class="kick">${esc(W.kick)}</div>
      <h2 class="h2 rise">${W.h}</h2>
      <p class="lede rise">${esc(W.p)}</p>
      <div class="grid g4 keep2 rise" style="margin-top:36px">${W.stats.map(s => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div>
      <p class="src">Store count and rank: Headset's public brand page, Nov 3 2026. Open dispensaries: New York OCM, Oct 2026. Sources in the deep read.</p>
    </div></section>
    <section class="sec" style="background:linear-gradient(180deg,transparent,rgba(42,107,79,.14))"><div class="wrap">
      <div class="kick">What's inside</div>
      <h2 class="h2 rise">One farm. Every store.</h2>
      <p class="lede rise">Your own site in front, and behind it one place where every dispensary, buyer, order, reorder, pop-up, campaign and store pin lives, wired into Distru and Nabis. Everything is linked, so nothing gets typed twice. And Bud, your team's own assistant, works in all of it.</p>
      <div class="mods rise" style="margin-top:34px">${W.mods.map(m => `<a class="mod" href="#${m[0]}"><span class="mi">${svgI(m[1], 22)}</span><b>${esc(m[2])}</b><p>${esc(m[3])}</p></a>`).join("")}</div>
    </div></section>
    <section class="sec"><div class="wrap split">
      <div class="rise"><div class="kick">The idea</div><p class="quote">${W.quote}</p><p class="lede">${esc(W.quoteP)}</p></div>
      <div class="rise" style="border-radius:20px;overflow:hidden;border:1px solid var(--line)"><img src="img/photos/lineup-family-tree.jpg?v=1794189253" alt="The Eaton Botanicals lineup of gummies and mullein pre-rolls" style="aspect-ratio:4/3;object-fit:cover;width:100%"></div>
    </div></section>
    ${APP.next("site", "Your site")}`;
  }
})();
