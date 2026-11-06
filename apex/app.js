/* Apex pitch: the router, the side nav, the welcome page and its opening video.
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
    book: "M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4zM4 16a4 4 0 0 1 4-4h12",
  };
  const svgI = APP.svgI = (k, s) => `<svg class="ic" viewBox="0 0 24 24" width="${s || 20}" height="${s || 20}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[k] || k}"/></svg>`;

  /* ---------- the nav ---------- */
  const NAV = [
    ["welcome", "The video", "play"], ["site", "The new site", "site"],
    ["head", "Where you stand"], ["read", "The deep read", "read"],
    ["head", "Apex Field Office"], ["hub", "The portal", "hub"], ["schedule", "Daily calendar", "cal"], ["projects", "Project files", "folder"], ["estimate", "Estimator", "est"], ["bids", "Bid engine", "bid"], ["money", "Receipts, books, payroll", "money"], ["field", "Field and paperwork", "field"], ["marketing", "Listings and reviews", "star"],
    ["head", "Next"], ["costs", "Running costs", "coin"], ["questions", "Your turn", "mic"],
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
  APP.next = (href, label) => `<section class="sec"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:30px"><span class="mute">Prepared for William and Kameron Suoja · Apex Construction General Contractors Inc.</span><a class="btn" href="#${href}">Next: ${label} →</a></div></section>`;

  /* ---------- the opening video ---------- */
  const V = AX.video;
  const chip = (ic, t) => `<div>${svgI(ic)}<span>${esc(t)}</span></div>`;
  const SCENES = {
    lines: () => `<div class="v-line" id="v-lines"></div>`,
    logo: () => `<div class="v-stack v-end"><img src="img/logo-white.png?v=1793925715" alt="Apex Construction General Contractors Inc."><div class="v-title"><small>${esc(V.since)}</small></div></div>`,
    headline: () => `<div class="v-line">${V.headline}<small>${esc(V.headSub)}</small></div>`,
    site: () => `<div class="v-stack"><div class="v-title">${esc(V.site.h)}<small>${esc(V.site.p)}</small></div><div class="v-win"><div class="bar"><i></i><i></i><i></i><span>apexconstgc.com</span></div><img src="img/shots/site.jpg?v=1793925715" alt=""></div></div>`,
    listings: () => `<div class="v-stack"><div class="v-title">${esc(V.listings.h)}<small>${esc(V.listings.p)}</small></div><div class="v-flow"><div class="v-list">${V.listings.in.map((t, i) => `<div style="animation-delay:${.15 * i}s">${svgI("star")}${esc(t)}</div>`).join("")}</div><div class="v-core"><img src="img/mark-white.png?v=1793925715" alt=""></div><div class="v-list">${V.listings.out.map((t, i) => `<div style="animation-delay:${.6 + .15 * i}s">${svgI("check")}${esc(t)}</div>`).join("")}</div></div></div>`,
    bids: () => `<div class="v-stack"><div class="v-title">${esc(V.bids.h)}<small>${esc(V.bids.p)}</small></div><div class="v-feed">${AX.bids.feed.slice(0, 4).map((b, i) => `<div class="row" style="animation-delay:${.35 * i}s">${svgI("bid", 26)}<span><b>${esc(b.t)}</b><small>${esc(b.src)} · due ${esc(b.due)}</small></span><span class="tag">${esc(b.kind)}</span><span class="score">${b.fit}</span></div>`).join("")}</div></div>`,
    estimate: () => `<div class="v-stack"><div class="v-title">${esc(V.estimate.h)}<small>${esc(V.estimate.p)}</small></div><div class="v-feed">${AX.est.lines.slice(0, 5).map((l, i) => `<div class="row" style="animation-delay:${.3 * i}s">${svgI("est", 24)}<span><b>${esc(l[0])}</b><small>${l[1]} ${esc(l[2])} × ${money(l[3])}</small></span><span class="tag">${esc(l[4])}</span><span class="score" style="color:#fff">${money(l[1] * l[3])}</span></div>`).join("")}</div></div>`,
    receipts: () => `<div class="v-stack"><div class="v-title">${esc(V.receipts.h)}<small>${esc(V.receipts.p)}</small></div><div class="v-rcpt">${AX.receipts.slice(0, 3).map((r, i) => `<div class="r" style="--r:${[-3, 2, -1][i]}deg;animation-delay:${.5 * i}s" data-job="${esc(r.job)}"><b>${esc(r.vendor.toUpperCase())}</b><br>${esc(r.where)}<br>${esc(r.date)}<br>-----------------<br>${esc(r.items)}<br>-----------------<br>TOTAL ${money(r.amt, 2)}</div>`).join("")}</div></div>`,
    project: () => `<div class="v-stack"><div class="v-title">${esc(V.project.h)}<small>${esc(V.project.p)}</small></div><div class="v-flow"><div class="v-list">${V.project.in.map((t, i) => `<div style="animation-delay:${.15 * i}s">${svgI(t[0])}${esc(t[1])}</div>`).join("")}</div><div class="v-core"><img src="img/mark-white.png?v=1793925715" alt=""></div><div class="v-list">${V.project.out.map((t, i) => `<div style="animation-delay:${.6 + .15 * i}s">${svgI(t[0])}${esc(t[1])}</div>`).join("")}</div></div></div>`,
    calendar: () => `<div class="v-stack"><div class="v-title">${esc(V.calendar.h)}<small>${esc(V.calendar.p)}</small></div><div style="width:min(1000px,92vw)" class="hb" style="min-height:0;display:block">${APP.hubMini ? APP.hubMini("week") : ""}</div></div>`,
    ring: () => `<div class="v-stack"><div class="v-title">${esc(V.ring.h)}<small>${esc(V.ring.p)}</small></div><div class="v-flow"><div class="v-list">${V.ring.l.map((t, i) => `<div style="animation-delay:${.12 * i}s">${svgI(t[0])}${esc(t[1])}</div>`).join("")}</div><div class="v-core"><img src="img/mark-white.png?v=1793925715" alt=""></div><div class="v-list">${V.ring.r.map((t, i) => `<div style="animation-delay:${.5 + .12 * i}s">${svgI(t[0])}${esc(t[1])}</div>`).join("")}</div></div></div>`,
    race: () => `<div class="v-stack"><div class="v-win" style="width:min(820px,90vw);background:#000"><img src="img/work/img2160.jpg?v=1793925715" alt="The #28 Apex sprint car, feature winner at Ocean Speedway" style="aspect-ratio:3/2;object-position:center"></div><div class="v-line" style="font-size:clamp(34px,4.6vw,66px)">${V.race}</div></div>`,
    end: () => `<div class="v-stack v-end"><img src="img/logo-white.png?v=1793925715" alt="Apex Construction"><div class="v-line" style="font-size:clamp(30px,3.6vw,50px)">${V.end}<small>Scroll down for more</small></div></div>`,
  };
  const CH = V.scenes; // [key, seconds, caption]
  let showTok = 0, timer = null, idx = 0, t0 = 0, paused = false, elapsed = 0;
  function stopVideo() { clearTimeout(timer); timer = null; cancelAnimationFrame(raf); APP.music && APP.music.stop(); }
  let raf = 0;
  function tick() {
    const segs = document.querySelectorAll(".wh-bar .seg i"); if (!segs.length) return;
    const now = paused ? elapsed : elapsed + (performance.now() - t0) / 1000;
    segs.forEach((s, i) => s.style.width = i < idx ? "100%" : i > idx ? "0" : Math.min(100, now / CH[idx][1] * 100) + "%");
    raf = requestAnimationFrame(tick);
  }
  function show(i) {
    const st = $(".wh-stage"); if (!st) return;
    clearTimeout(timer); const tok = ++showTok;
    idx = i; elapsed = 0; t0 = performance.now();
    if (i >= CH.length) { finish(); return; }
    const [k, secs, cap] = CH[i];
    const old = st.querySelector(".wh-scene");
    const go = () => {
      if (tok !== showTok || !st.isConnected) return;
      st.innerHTML = `<div class="wh-scene at-${k}">${SCENES[k]()}</div>`;
      $(".wh-cap").textContent = cap || "";
      $(".wh").dataset.scene = k;
      if (k === "lines") typeLines();
      clearTimeout(timer); if (!paused) timer = setTimeout(() => show(i + 1), secs * 1000);
    };
    if (old) { old.classList.add("out"); setTimeout(go, 420); } else go();
  }
  function typeLines() {
    const el = $("#v-lines"); if (!el) return;
    V.lines.forEach((l, i) => setTimeout(() => { if (el.isConnected) { el.innerHTML = `<span style="display:block;animation:sIn .9s both">${l}</span>`; } }, i * 3600));
  }
  function finish() {
    APP.music && APP.music.fade(3);
    const wh = $(".wh"); wh.classList.remove("on"); wh.classList.add("done");
    $(".wh-front").innerHTML = `<img src="img/logo-white.png?v=1793925715" alt="Apex Construction"><h1>${V.headline}</h1><p>${esc(V.headSub)}</p><button class="play" id="replay"><i><svg viewBox="0 0 24 24" width="22" height="22"><path d="${IC.play}"/></svg></i>Watch again</button>`;
  }
  function playVideo(from) {
    const wh = $(".wh"); if (!wh) return;
    wh.classList.add("on");
    wh.querySelector(".wh-bar").innerHTML = CH.map((c, i) => `<span class="seg" data-i="${i}"><i></i></span>`).join("") + `<button id="v-pause" aria-label="Pause">❚❚</button><button id="v-mute" aria-label="Mute">♪</button>`;
    paused = false; cancelAnimationFrame(raf); tick();
    if (!Q.has("cap")) APP.music && APP.music.start();
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
        if (paused) { elapsed += (performance.now() - t0) / 1000; clearTimeout(timer); APP.music && APP.music.pause(true); }
        else { t0 = performance.now(); timer = setTimeout(() => show(idx + 1), Math.max(0, CH[idx][1] - elapsed) * 1000); APP.music && APP.music.pause(false); }
        return;
      }
      if (e.target.closest("#v-mute")) { APP.music && APP.music.mute(); e.target.style.opacity = e.target.style.opacity === ".4" ? "1" : ".4"; }
    });
    const sn = Q.get("scene"); if (sn != null) { paused = false; playVideo(+sn); if (Q.has("cap")) { clearTimeout(timer); paused = true; } }
  }

  /* ---------- welcome ---------- */
  function welcome() {
    const W = AX.welcome;
    return `
    <section class="wh"><div class="wh-bg" style="background-image:url(img/work/hero.jpg?v=1793925715)"></div><div class="wh-shade"></div>
      <div class="wh-front"><img src="img/logo-white.png?v=1793925715" alt="Apex Construction General Contractors Inc."><h1>${V.headline}</h1><p>${esc(V.headSub)}</p><button class="play"><i><svg viewBox="0 0 24 24" width="22" height="22"><path d="${IC.play}"/></svg></i>Play the two-minute video</button></div>
      <div class="wh-stage"></div><div class="wh-cap"></div><div class="wh-bar"></div>
    </section>
    <div class="stripe"></div>
    <section class="sec"><div class="wrap">
      <div class="kick">${esc(W.kick)}</div>
      <h2 class="h2 rise">${W.h}</h2>
      <p class="lede rise">${esc(W.p)}</p>
      <div class="grid g4 keep2 rise" style="margin-top:36px">${W.stats.map(s => `<div class="stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("")}</div>
    </div></section>
    <section class="sec" style="background:linear-gradient(180deg,transparent,rgba(42,75,255,.08))"><div class="wrap">
      <div class="kick">What's inside</div>
      <h2 class="h2 rise">One portal. Every part of the business.</h2>
      <p class="lede rise">A new website in front, and behind it one place where every job, plan, photo, sub, receipt, bid, invoice and crew day lives. Everything is linked, so nothing gets typed twice.</p>
      <div class="mods rise" style="margin-top:34px">${W.mods.map(m => `<a class="mod" href="#${m[0]}"><span class="mi">${svgI(m[1], 22)}</span><b>${esc(m[2])}</b><p>${esc(m[3])}</p></a>`).join("")}</div>
    </div></section>
    <section class="sec"><div class="wrap split">
      <div class="rise"><div class="kick">The idea</div><p class="quote">${W.quote}</p><p class="lede">${esc(W.quoteP)}</p></div>
      <div class="rise" style="border-radius:20px;overflow:hidden;border:1px solid var(--line)"><img src="img/work/img0745.jpg?v=1793925715" alt="Apex tenant improvement: new mezzanine office and stair in a warehouse" style="aspect-ratio:4/3;object-fit:cover;width:100%"></div>
    </div></section>
    ${APP.next("site", "The new site")}`;
  }
})();
