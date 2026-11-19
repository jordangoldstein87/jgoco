/* The opening video: a narrated walk through the pitch, played on the page rather than as an mp4.
   Scenes and lengths come from BS.video. If voice clips exist at img/vo/<scene>.mp3 they are used
   and the scene waits for them; if not, the scene lengths in data.js are used instead.
   Music is live Web Audio from music.js, and is for the pitch only. */
(function () {
  const $ = (id) => document.getElementById(id), V = BS.video, C = BS.co;
  const q = new URLSearchParams(location.search);
  const L = BS_LOGOS.bsma, col = L.colors, white = { ...col, ink: "#ffffff" };
  let VO = {}, voEl = null, timer = null, idx = -1, muted = false, paused = false, t0 = 0, left = 0, cur = 0;
  fetch("img/vo/vo.json").then((r) => (r.ok ? r.json() : {})).then((j) => (VO = j || {})).catch(() => {});

  const SC = {
    open: () => `<div class="v-bg v-push">${BS.work.slice(0, 4).map(([f]) => `<img src="img/work/${f}" alt="">`).join("")}</div>
      <div class="v-c"><div class="v-k v-in">Best Self Medical Arts</div><div class="v-big v-in">Twenty-five years.<br><em>Two practices.</em></div>
      <div class="v-row v-in d2">
        <span><b>D.O.</b>Board-certified OB-GYN</span>
        <span><b>Sciton</b>Luminary, she trains physicians</span>
        <span><b>2</b>Westlake Village and Camarillo</span></div></div>`,

    today: () => `<div class="v-c"><div class="v-k v-in">1 &middot; The problem</div><div class="v-stats">
      <div class="v-in d1"><b>0 of 10</b>searches found her website</div>
      <div class="v-in d2"><b>130 vs 12</b>reviews on the wrong brand</div>
      <div class="v-in d3"><b>0</b>ways to book an appointment</div></div></div>`,

    logo: () => `<div class="v-c"><div class="v-k v-in">3 · Your logo</div>
      <div class="v-lg v-in d1">${L.lockup(white, "vlogo")}</div>
      <div class="v-sub v-in d3">Your own logo, drawn properly</div></div>`,

    site: () => `<div class="v-c"><div class="v-k v-in">4 &middot; Your website</div>
      <div class="v-dev v-in d1">
        <div class="v-lap"><iframe class="v-fr" src="website.html#top" title="The new website" scrolling="no"></iframe></div>
        <div class="v-phn"><iframe class="v-frp" src="website.html#top" title="The new website on a phone" scrolling="no"></iframe></div>
      </div></div>`,

    chat: () => `<div class="v-c"><div class="v-k v-in">5 &middot; Answers</div><div class="v-split">
        <div class="v-me">How long will I be red after HALO?</div>
        <div class="v-them v-pop" style="animation-delay:1.1s">Most people are red for about two days, then bronzed and flaking for a few more. Many wear makeup by day three or four.</div>
      </div>
      <div class="v-sheet v-in d1"><b>Answers · 52 of them</b>
        ${["Laser and light", "Hormones and women's health", "Intimate health", "Men's health", "Skin and facials", "Visiting and payment"].map((t, i) =>
          `<div><span>${t}</span><em class="v-st ok" style="animation-delay:${1.4 + i * 0.3}s">Written</em></div>`).join("")}
      </div></div></div>`,

    book: () => { const slots = ["9:00", "9:40", "10:20", "11:00", "11:40", "1:20", "2:00", "2:40"];
      return `<div class="v-c"><div class="v-k v-in">5 · Booking</div>
      <div class="v-cal">${slots.map((s, i) => `<span class="v-pop ${i === 5 ? "on" : ""}" style="animation-delay:${0.3 + i * 0.16}s">${s}</span>`).join("")}</div>
      <div class="v-sub v-in d5">Picked and booked, at eleven at night</div></div>`; },

    channels: () => `<div class="v-c"><div class="v-k v-in">5 &middot; Book from anywhere</div>
      <div class="v-tiles">${BS.channels.rows.map(([n, , k], i) =>
        `<span class="v-pop" style="animation-delay:${0.25 + i * 0.22}s">${n}<i>${k === "live" ? "\u25cf" : "\u2192"}</i></span>`).join("")}</div>
      <div class="v-sub v-in d5">One calendar behind all of it</div></div>`,

    connect: () => `<div class="v-c"><div class="v-k v-in">6 &middot; What it connects to</div>
      <div class="v-tiles v-dis">${BS.connect.have.map(([n], i) =>
        `<span class="v-pop" style="animation-delay:${0.15 + i * 0.13}s">${n}</span>`).join("")}</div>
      <div class="v-join v-pop" style="animation-delay:2.2s"><i></i><em>One place</em></div>
      <div class="v-sub v-in d5">Nothing thrown out. Nothing retyped.</div></div>`,

    listings: () => `<div class="v-c"><div class="v-k v-in">7 &middot; Getting found</div>
      <div class="v-tiles">${BS.listings.map(([n], i) => `<span class="v-pop" style="animation-delay:${0.25 + i * 0.2}s">${n}<i>✓</i></span>`).join("")}</div></div>`,

    ads: () => `<div class="v-c"><div class="v-k v-in">10 &middot; What the clicks cost</div>
      <div class="v-bars">${BS.ads.kw.slice(0, 5).map(([k, c], i) => {
        const w = [88, 62, 44, 36, 70][i];
        return `<div class="v-in d${i + 1}"><span>${k}</span><p><i style="width:${w}%;background:${["#21AE92", "#4795C1", "#6FBBDA", "#9B7CC8", "#C86FB4"][i]}"></i></p><b>${c.split(" ")[0]}</b></div>`;
      }).join("")}</div></div>`,

    assistant: () => { const S = BS.ai.sheet; return `<div class="v-c"><div class="v-k v-in">11 &middot; Your assistant</div><div class="v-split">
      <div class="v-sms v-in"><div class="v-me">Run tomorrow. Confirm everyone and tell me the gaps.</div>
      <div class="v-them v-pop" style="animation-delay:1.2s">Texted all five. Confirmed 11 of 13. Two gaps left, 1:20 and 4:00.</div></div>
      <div class="v-sheet v-in d1"><b>Day sheet · ${S.day} · ${S.call}</b>
      ${S.rows.map(([n, t, stt, tm, k], i) => `<div><span>${n}</span><em class="v-st ${k}" style="animation-delay:${2.1 + i * 0.7}s">${stt}</em></div>`).join("")}</div></div></div>`; },

    health: () => `<div class="v-c"><div class="v-k v-in">13 &middot; Your numbers</div>
      <div class="v-bars">${BS.health.jobs.both.slice(0, 5).map(([n, k, c, cost], i) => {
        const m = Math.round((1 - cost / c) * 100);
        return `<div class="v-in d${i + 1}"><span>${n}</span><p><i style="width:${m * 1.6}%;background:${m >= 50 ? "#2fbf71" : m >= 38 ? "#f2b230" : "#e05252"}"></i></p><b>${m}%</b></div>`;
      }).join("")}</div></div>`,

    end: () => `<div class="v-c"><div class="v-lg v-in">${L.lockup(white, "vend")}</div>
      <div class="v-big v-in d2" style="margin-top:30px">Less front desk.<br><em>More of her best work.</em></div>
      <div class="v-sub v-in d3">Scroll down</div></div>`,
  };

  function voice(k) {
    stopVoice();
    if (muted || q.has("cap")) return;
    voEl = new Audio(`img/vo/${k}.mp3`);
    voEl.play().then(() => window.APP && APP.music && APP.music.duck(true)).catch(() => {});
    voEl.onended = () => window.APP && APP.music && APP.music.duck(false);
  }
  function stopVoice() {
    if (voEl) { voEl.pause(); voEl.onended = null; }
    voEl = null;
    if (window.APP && APP.music && APP.music.duck) APP.music.duck(false);
  }
  /* the website frames are real pages, so they have to be scaled to their shell */
  function fitFrames() {
    const lap = document.querySelector(".v-lap"), ph = document.querySelector(".v-phn");
    if (lap) { const f = lap.querySelector("iframe"); if (f) f.style.transform = `scale(${lap.clientWidth / 1440})`; }
    if (ph) { const f = ph.querySelector("iframe"); if (f) f.style.transform = `scale(${ph.clientWidth / 390})`; }
  }
  addEventListener("resize", fitFrames);

  function show(i) {
    clearTimeout(timer);
    if (i >= V.scenes.length) return close();
    idx = i; const [k, secs] = V.scenes[i];
    $("vStage").innerHTML = `<div class="v-sc">${SC[k] ? SC[k]() : ""}</div>`;
    $("vCap").textContent = V.narr[k] || "";
    fitFrames();
    cur = Math.max(secs, (VO[k] || 0) + 0.9); left = cur; t0 = performance.now();
    $("vBar").style.width = (i / V.scenes.length) * 100 + "%";
    voice(k);
    timer = setTimeout(() => show(i + 1), cur * 1000);
  }
  function open() {
    $("vid").hidden = false; document.body.style.overflow = "hidden";
    paused = false; $("vPause").textContent = "Pause";
    if (!q.has("cap") && window.APP && APP.music) APP.music.start();
    show(0);
  }
  function close() {
    clearTimeout(timer); stopVoice();
    if (window.APP && APP.music && APP.music.fade) APP.music.fade(1.2);
    $("vid").hidden = true; document.body.style.overflow = ""; idx = -1;
  }
  $("vPlay").onclick = open;
  $("vClose").onclick = close;
  $("vMute").onclick = () => {
    muted = !muted;
    if (window.APP && APP.music) APP.music.mute();
    if (voEl) voEl.muted = muted;
    $("vMute").textContent = muted ? "Sound on" : "Mute";
  };
  $("vPause").onclick = () => {
    paused = !paused; $("vPause").textContent = paused ? "Play" : "Pause";
    $("vid").classList.toggle("paused", paused);
    if (paused) { clearTimeout(timer); left -= (performance.now() - t0) / 1000; if (voEl) voEl.pause(); if (window.APP && APP.music) APP.music.pause(true); }
    else { t0 = performance.now(); timer = setTimeout(() => show(idx + 1), Math.max(0, left) * 1000); if (voEl && !voEl.ended) voEl.play().catch(() => {}); if (window.APP && APP.music) APP.music.pause(false); }
  };
  addEventListener("keydown", (e) => { if (!$("vid").hidden && e.key === "Escape") close(); });
  /* ?cap&scene=chat shows a single scene, for screenshots */
  if (q.has("scene")) { $("vid").hidden = false; show(Math.max(0, V.scenes.findIndex(([k]) => k === q.get("scene")))); clearTimeout(timer); }
})();
