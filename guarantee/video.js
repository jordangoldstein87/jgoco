/* The opening video: a full-screen, narrated walk through the pitch, played on the page (no mp4).
   Scenes and lengths come from GD.video; each scene waits for its voice clip (img/vo/<scene>.mp3, lengths in vo.json).
   Music is live Web Audio from music.js, for the pitch only. */
(function () {
  const $ = (id) => document.getElementById(id), V = GD.video, C = GD.co;
  const q = new URLSearchParams(location.search);
  let VO = {}, voEl = null, timer = null, idx = -1, muted = false, paused = false, t0 = 0, left = 0, cur = 0;
  fetch("img/vo/vo.json").then((r) => (r.ok ? r.json() : {})).then((j) => (VO = j || {})).catch(() => {});
  const logo = () => { let k = "stack"; try { k = localStorage.getItem("gd-logo") || "stack"; } catch (e) {} return GD_LOGOS[k] || GD_LOGOS.stack; };
  const white = (L) => ({ ...L.colors, ink: "#ffffff", core: L.colors.ink });

  const SC = {
    open: () => `<div class="v-bg v-push">${GD.work.slice(0, 4).map(([f]) => `<img src="img/work/${f}" alt="">`).join("")}</div>
      <div class="v-c"><div class="v-big v-in">Thirty years<br>of flat walls.</div><div class="v-row v-in d2"><span><b>297</b>units, North Hollywood</span><span><b>20</b>floors on 7th Street</span></div></div>`,
    today: () => `<div class="v-c"><div class="v-k v-in">Online, today</div><div class="v-stats">
      <div class="v-in d1"><b>Error</b>guarantee-drywall.com</div><div class="v-in d2"><b>4</b>different phone numbers</div><div class="v-in d3"><b>0</b>reviews off Google</div></div></div>`,
    logo: () => `<div class="v-c"><div class="v-k v-in">1 · A new logo</div><div class="v-logos">${Object.entries(GD_LOGOS).map(([k, L], i) => `<div class="v-in d${i + 1}">${L.mark(L.colors, "v" + k)}<span>${L.name}</span></div>`).join("")}</div></div>`,
    site: () => `<div class="v-c"><div class="v-k v-in">2 · The website</div><div class="v-dev v-in d1"><div class="v-lap"><img src="img/shots/guarantee-site-d.jpg?v=1795026681" alt=""></div><div class="v-phn"><img src="img/shots/guarantee-site-m.jpg?v=1795026681" alt=""></div></div></div>`,
    listings: () => `<div class="v-c"><div class="v-k v-in">3 · Every page, one place</div><div class="v-tiles">${GD.listings.map(([n], i) => `<span class="v-pop" style="animation-delay:${0.25 + i * 0.22}s">${n}<i>✓</i></span>`).join("")}</div>
      <div class="v-rev v-in d4"><span>★★★★★</span> New Google review. Reply drafted.</div></div>`,
    crew: () => { const S = GD.ai.sheet; return `<div class="v-c v-split"><div class="v-sms v-in"><div class="v-me">Call time 6:30 tomorrow at Lankershim. Let the whole crew know.</div><div class="v-them v-pop" style="animation-delay:1.2s">Done. Texted all 5. Filling the call sheet as they answer.</div></div>
      <div class="v-sheet v-in d1"><b>Call sheet · ${S.day} · ${S.call}</b>${S.rows.map(([n, t, st, tm, k], i) => `<div><span>${n}</span><em class="v-st ${k}" style="animation-delay:${2.2 + i * 0.8}s">${st}</em></div>`).join("")}</div></div>`; },
    receipt: () => `<div class="v-c v-split"><div class="v-rc v-in"><b>HOME DEPOT #6631</b>5/8 TYPE X 4x12 ×40<br>ALL PURPOSE MUD ×6<br><b>TOTAL $1,284.60</b></div>
      <div class="v-arrow v-in d2">→</div><div class="v-qb v-in d3"><b>Lankershim apartments</b><span>Materials · $1,284.60</span><em>Synced to QuickBooks ✓</em></div></div>`,
    units: () => { const US = GD.pm.unitStages; return `<div class="v-c"><div class="v-k v-in">Unit by unit</div><div class="v-units">${GD.pm.floors.map(([fl, v]) => `<div><b>Floor ${fl}</b><p>${Array.from({ length: 28 }, (_, u) => { const s = Math.max(0, Math.min(5, Math.floor(v - ((u * 7) % 13) / 13 * 1.2 + 0.4))); return `<i class="v-pop" style="background:${US[s][1]};animation-delay:${0.2 + u * 0.03 + (4 - fl) * 0.25}s"></i>`; }).join("")}</p></div>`).reverse().join("")}</div></div>`; },
    health: () => `<div class="v-c"><div class="v-k v-in">Profit on every job</div><div class="v-bars">${GD.health.jobs.slice(0, 5).map(([n, k, c, cost], i) => { const m = Math.round((1 - cost / c) * 100); return `<div class="v-in d${i + 1}"><span>${n}</span><p><i style="width:${m * 2}%;background:${m >= 28 ? "#2fbf71" : m >= 20 ? "#f2b230" : "#e05252"}"></i></p><b>${m}%</b></div>`; }).join("")}</div></div>`,
    end: () => { const L = logo(); return `<div class="v-c"><div class="v-endlg v-in">${L.lockup(white(L), "vend")}</div><div class="v-big v-in d2">Less office.<br>More walls.</div><div class="v-k v-in d3" style="margin-top:22px">Scroll down</div></div>`; },
  };

  function voice(k) {
    stopVoice();
    if (muted || q.has("cap")) return;
    voEl = new Audio(`img/vo/${k}.mp3`);
    voEl.play().then(() => APP.music && APP.music.duck(true)).catch(() => {});
    voEl.onended = () => APP.music && APP.music.duck(false);
  }
  function stopVoice() { if (voEl) { voEl.pause(); voEl.onended = null; } voEl = null; APP.music && APP.music.duck && APP.music.duck(false); }

  function show(i) {
    clearTimeout(timer);
    if (i >= V.scenes.length) return close();
    idx = i; const [k, secs] = V.scenes[i];
    $("vStage").innerHTML = `<div class="v-sc">${SC[k]()}</div>`;
    $("vCap").textContent = (GD.video.narr[k] || "");
    cur = Math.max(secs, (VO[k] || 0) + 0.9); left = cur; t0 = performance.now();
    $("vBar").style.width = (i / V.scenes.length) * 100 + "%";
    voice(k);
    timer = setTimeout(() => show(i + 1), cur * 1000);
  }
  function open() {
    $("vid").hidden = false; document.body.style.overflow = "hidden"; paused = false; $("vPause").textContent = "Pause";
    if (!q.has("cap")) APP.music && APP.music.start();
    show(0);
  }
  function close() {
    clearTimeout(timer); stopVoice(); APP.music && APP.music.fade && APP.music.fade(1.2);
    $("vid").hidden = true; document.body.style.overflow = ""; idx = -1;
  }
  $("vPlay").onclick = open;
  $("vClose").onclick = close;
  $("vMute").onclick = () => { muted = !muted; APP.music && APP.music.mute(); if (voEl) voEl.muted = muted; $("vMute").textContent = muted ? "Sound on" : "Mute"; };
  $("vPause").onclick = () => {
    paused = !paused; $("vPause").textContent = paused ? "Play" : "Pause"; $("vid").classList.toggle("paused", paused);
    if (paused) { clearTimeout(timer); left -= (performance.now() - t0) / 1000; voEl && voEl.pause(); APP.music && APP.music.pause(true); }
    else { t0 = performance.now(); timer = setTimeout(() => show(idx + 1), Math.max(0, left) * 1000); voEl && !voEl.ended && voEl.play().catch(() => {}); APP.music && APP.music.pause(false); }
  };
  addEventListener("keydown", (e) => { if (!$("vid").hidden && e.key === "Escape") close(); });
  /* ?cap&scene=crew shows one scene for screenshots */
  if (q.has("scene")) { $("vid").hidden = false; show(Math.max(0, V.scenes.findIndex(([k]) => k === q.get("scene")))); clearTimeout(timer); }
})();
