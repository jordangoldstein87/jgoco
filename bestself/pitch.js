/* The pitch page. Every word and number comes from data.js; the knowledge base from kb.js.
   Sample figures are labeled on the page. */
(function () {
  const C = BS.co, $ = (id) => document.getElementById(id);
  const q = new URLSearchParams(location.search);
  const CAP = q.has("cap");
  if (CAP) document.documentElement.classList.add("cap");
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const L = BS_LOGOS.bsma, col = L.colors;
  const white = { ...col, ink: "#ffffff" };

  /* ---------- brand and hero ---------- */
  $("heroBg").innerHTML = BS.work.slice(0, 4).map(([f]) => `<img src="img/work/${f}" alt="">`).join("");
  $("heroLogo").innerHTML = L.lockup(white, "hero");
  $("topLogo").innerHTML = L.lockup(col, "top");
  $("heroH").innerHTML = BS.hero.h;
  $("heroP").textContent = BS.hero.p;
  $("heroFor").textContent = "Prepared for " + C.docShort;
  $("lgNew").innerHTML = L.lockup(col, "lgnew");
  $("lgWhy").textContent = L.why;
  $("lgSizes").innerHTML = [112, 64, 40, 24].map((n) =>
    `<div><div class="pin" style="width:${n}px;height:${n}px">${L.mark(col, "sz" + n)}</div><span>${n}px</span></div>`).join("");
  $("liLogo").innerHTML = L.lockup(col, "li");
  $("auAv").innerHTML = L.mark(col, "auav");
  $("aiAv").innerHTML = L.mark(col, "aiav");
  $("aiMk").innerHTML = L.mark(col, "aimk");

  /* ---------- today ---------- */
  $("todayH").textContent = BS.today.h;
  $("todayP").textContent = BS.today.p;
  $("todayStats").innerHTML = BS.today.stats.map(([n, t, s]) =>
    `<div class="t-c rise"><b>${esc(n)}</b><strong>${esc(t)}</strong><span>${esc(s)}</span></div>`).join("");

  /* ---------- booking from every platform ---------- */
  const CH = BS.channels;
  $("chH").textContent = CH.h;
  $("chP").textContent = CH.p;
  $("chGrid").innerHTML = CH.rows.map(([n, dsc, k]) =>
    `<div class="ch-c rise"><span class="ch-p ${k}">${k === "live" ? "Live times" : "Book button"}</span><b>${esc(n)}</b><span>${esc(dsc)}</span></div>`).join("");
  $("chHonest").textContent = CH.honest;

  /* ---------- who this is for ---------- */
  const TM = BS.team;
  $("tmH").textContent = TM.h;
  $("tmP").textContent = TM.p;
  $("tmNow").innerHTML = TM.now.map((s) => `<li><i>·</i>${esc(s)}</li>`).join("");
  $("tmThen").innerHTML = TM.then.map((s) => `<li><i>✓</i>${esc(s)}</li>`).join("");
  $("tmMt").textContent = TM.morning.t;
  $("tmM").innerHTML = TM.morning.rows.map(([a, b]) => `<div class="mr"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("");
  $("tmN").textContent = TM.note;

  /* ---------- the website, in frames ---------- */
  $("sUrl").textContent = C.domain;
  const src = "website.html";
  $("sOpen").href = src;
  for (const id of ["fLap", "fPh"]) $(id).src = src;
  /* the booking panel, previewed in place */
  $("bkUrl").textContent = C.domain + "/book";
  $("fBk").src = "website.html?to=book#book";
  function fit() {
    const lap = $("sLap"), ph = $("sPh"), bk = $("bkLap");
    if (lap.offsetWidth) $("fLap").style.transform = `scale(${lap.offsetWidth / 1440})`;
    if (ph.offsetWidth) $("fPh").style.transform = `scale(${ph.offsetWidth / 390})`;
    if (bk && bk.offsetWidth) $("fBk").style.transform = `scale(${bk.offsetWidth / 1440})`;
  }
  addEventListener("resize", fit);

  /* ---------- listings ---------- */
  $("liName").textContent = C.name;
  $("liPhone").textContent = C.phone;
  $("liPhone2").textContent = C.sister.phone;
  $("liHours").textContent = C.hours;
  const pillTxt = { live: "Live", assist: "One tap", sync: "In step" };
  $("liTiles").innerHTML = BS.listings.map(([n, s, m, p], i) =>
    `<div class="li-i rise" id="li${i}"><header><b>${esc(n)}</b><small>${esc(s)}</small><i class="pill ${m}">${pillTxt[m]}</i></header><p>${esc(p)}</p></div>`).join("");
  let liDone = false;
  $("liGo").onclick = () => {
    if (liDone) return; liDone = true;
    $("liHours").innerHTML = "Mon to Fri 9:00 to 5:30<br>Closed weekends";
    $("liGo").textContent = "Corrected everywhere";
    BS.listings.forEach(([n, s, m], i) => setTimeout(() => {
      const t = $("li" + i); if (!t) return;
      t.classList.add("flash");
      t.querySelector("p").textContent = m === "assist" ? `Correct hours ready. One tap to confirm on ${n}.` : `Hours corrected on ${n}.`;
      t.querySelector(".pill").textContent = m === "assist" ? "Tap to confirm" : "Updated";
      setTimeout(() => t.classList.remove("flash"), 500);
    }, 150 * i));
  };

  /* ---------- review inbox ---------- */
  const done = new Set(); let cur = 0;
  function rvList() {
    $("rvCount").textContent = (BS.reviews.length - done.size) + " to answer";
    $("rvList").innerHTML = BS.reviews.map((v, i) =>
      `<button class="rv-i ${i === cur ? "on" : ""}" data-i="${i}"><b>${esc(v.who.replace("Sample · ", ""))}</b><small>${v.src} · ${v.when}</small>
      <div><span class="st">${"★".repeat(v.stars)}</span> ${done.has(i) ? '<span class="done">Answered</span>' : ""}</div><p>${esc(v.text)}</p></button>`).join("");
  }
  function rvShow(i) {
    cur = i; const v = BS.reviews[i], live = v.src === "Google";
    $("rvD").innerHTML = `<div class="rv-src">${v.src} · <span class="st">${"★".repeat(v.stars)}</span> <span class="smp">Sample</span></div>
      <blockquote>“${esc(v.text)}”</blockquote>
      <label>Her reply</label><textarea id="rvT">${esc(v.draft)}</textarea>
      <div class="rv-b"><button class="btn sm" id="rvP">${live ? "Post reply to " + v.src : "Copy and open " + v.src}</button><button class="btn sm o" id="rvR">Rewrite</button></div>
      <div class="rv-n" id="rvN">${done.has(i) ? "Posted." : ""}</div>
      <div class="rv-hip"><b>Why these replies are careful.</b> Two enforcement actions, for $23,000 and $30,000, were over information revealed in review responses. Simply confirming that someone was a patient counts as a disclosure. Every draft thanks the person without confirming care, and nothing posts without her pressing the button.</div>`;
    $("rvP").onclick = () => {
      done.add(i); $("rvN").textContent = live ? "Posted to " + v.src + "." : "Copied. " + v.src + " opened to paste it.";
      rvList(); const n = BS.reviews.findIndex((x, j) => !done.has(j));
      if (n >= 0) setTimeout(() => rvShow(n), 900);
    };
    $("rvR").onclick = () => { const t = $("rvT"); t.value = t.value.startsWith("Thank") ? t.value.replace(/^Thank you|^Thanks/, "We really appreciate it") : "Thank you. " + t.value; };
    rvList();
  }
  $("rvList").onclick = (e) => { const b = e.target.closest(".rv-i"); if (b) rvShow(+b.dataset.i); };
  rvShow(0);

  /* ---------- social ---------- */
  $("socNote").textContent = "Checked live on 19 November 2026. These are her real accounts and her real numbers.";
  $("socTable").innerHTML = BS.social.rows.map((r) =>
    `<div class="so-r rise"><b>${esc(r.n)}</b><span class="h">${esc(r.h)}</span>
      <span class="s ${r.k}">${esc(r.stat || "—")}${r.when ? `<br><span style="font-size:13px;color:var(--mut);font-weight:300">${esc(r.when)}</span>` : ""}</span>
      <span class="y">${esc(r.why)}</span></div>`).join("");

  /* ---------- marketing automations ---------- */
  const ownerMsgs = {
    reply: [["them", "New 5-star Google review about HALO and sun damage. Draft reply ready, and it does not confirm she was a patient."], ["them", "Reply YES to post it, or send your own words."], ["me", "YES"], ["them", "Posted."]],
    post: [["them", "New result photo from Tuesday, with publishing consent already on file."], ["them", "Caption written. Post to Google, Instagram and Facebook? Reply YES."], ["me", "YES"], ["them", "Posted to all three."]],
  };
  const st = BS.autos.map((a) => a.on); let sel = 0;
  function auRender() {
    $("auList").innerHTML = BS.autos.map((a, i) =>
      `<button class="au-c ${i === sel ? "sel" : ""}" data-i="${i}"><span class="au-n">${i + 1}</span>
      <span><b>${esc(a.t)}</b><span class="au-w">When: ${esc(a.when)}</span><span class="au-x">${esc(a.what)}</span>${a.fact ? `<span class="au-f">${esc(a.fact)}${a.src ? " · " + esc(a.src) : ""}</span>` : ""}</span>
      <span class="tg ${st[i] ? "on" : ""}" data-t="${i}" role="switch" aria-checked="${st[i]}"></span></button>`).join("");
  }
  function auPhone() {
    const a = BS.autos[sel]; let h = "";
    if (a.sms) {
      const time = { review: "Wed 9:00 AM", missed: "Wed 11:42 AM", lead: "Wed 2:15 PM", noshow: "Tue 6:30 PM", recall: "Mon 10:00 AM", winback: "Thu 9:30 AM" }[a.k] || "Today";
      h = `<div class="au-t">${time}</div>` + (a.k === "missed" ? `<div class="au-t">Missed call</div>` : "") +
        a.sms.map((m, i) => `<div class="bub me ${i && /\.com|g\.page/.test(m) ? "lnk" : ""}" style="animation-delay:${i * 0.35}s">${esc(m)}</div>`).join("");
    } else if (ownerMsgs[a.k]) {
      h = `<div class="au-t">To her</div>` + ownerMsgs[a.k].map(([w, m], i) => `<div class="bub ${w}" style="animation-delay:${i * 0.35}s">${esc(m)}</div>`).join("");
    } else {
      h = `<div class="au-e">${esc(a.what)}</div>`;
    }
    $("auMsgs").innerHTML = st[sel] ? h : `<div class="au-e">Off. Flip the switch to turn it on.</div>`;
  }
  $("auList").onclick = (e) => {
    const t = e.target.closest("[data-t]"), b = e.target.closest(".au-c"); if (!b) return;
    const i = +b.dataset.i; if (t) st[i] = !st[i];
    sel = i; auRender(); auPhone();
  };
  auRender(); auPhone();

  /* ---------- paid search ---------- */
  const A = BS.ads;
  $("adsLive").textContent = A.live;
  $("adsNote").textContent = A.note;
  $("adsTable").innerHTML = `<div class="ad-r h"><span>Keyword</span><span>Cost per click</span><span>Monthly searches</span><span>Note</span></div>` +
    A.kw.map(([k, c, v, n]) => `<div class="ad-r"><b>${esc(k)}</b><em>${esc(c)}</em><span>${esc(v)}</span><span>${esc(n)}</span></div>`).join("");
  /* Budget tiers are deliberately not rendered. The data stays in data.js (BS.ads.tiers)
     so it can be switched back on the moment Jordan wants pricing in the deck. */

  /* ---------- one assistant ---------- */
  const AI = BS.ai; let aiSel = 0, aiT = [];
  $("aiNum").textContent = AI.number;
  $("aiCrew").innerHTML = AI.crew.map(([n, r, ph]) =>
    `<div class="ai-cr"><i>${esc(n[0])}</i><div><b>${esc(n)}</b><small>${esc(r)}</small></div><span>${esc(ph)}</span></div>`).join("");
  const S = AI.sheet;
  $("aiDay").textContent = S.day;
  $("aiSheetTop").innerHTML = `<b>${esc(S.job)} · ${esc(S.call)}</b><br>${esc(S.where)}<br>${esc(S.notes)}`;
  function sheet(live) {
    $("aiSheet").innerHTML = S.rows.map(([n, task], i) =>
      `<div class="ai-sr"><b>${esc(n)}</b><span><small>${esc(task)}</small></span><span class="ai-st" id="aiSt${i}">${live ? "Texted" : "Not sent"}</span></div>`).join("");
    if (live) S.rows.forEach(([n, task, stt, t, k], i) =>
      aiT.push(setTimeout(() => { const e = $("aiSt" + i); if (e) { e.className = "ai-st " + k; e.textContent = stt + " · " + t; } }, CAP ? 0 : 1300 + i * 650)));
  }
  const RC = '<span class="ai-rc"><b>SCITON INC</b>HALO TIPS ×2<br>BBL HERO GEL ×6<br><b>TOTAL $2,418.40</b></span>';
  function aiPlay(i) {
    aiT.forEach(clearTimeout); aiT = []; aiSel = i;
    const a = AI.asks[i];
    $("aiChips").innerHTML = AI.asks.map((x, j) => `<button class="ai-chip ${j === i ? "on" : ""}" data-i="${j}">${esc(x.q)}</button>`).join("");
    $("aiSms").innerHTML = `<div class="ai-b me">${a.img ? RC : ""}${esc(a.q)}</div>`;
    $("aiGpt").innerHTML = `<div class="ai-gq">${a.img ? RC : ""}${esc(a.q)}</div>`;
    aiT.push(setTimeout(() => {
      $("aiSms").insertAdjacentHTML("beforeend", `<div class="ai-b them">${esc(a.a)}</div>`);
      $("aiGpt").insertAdjacentHTML("beforeend", `<div class="ai-ga">${esc(a.a)}<small>Answered by Best Self Medical Arts · Sample</small></div>`);
    }, CAP ? 0 : 620));
    sheet(!!a.sheet);
  }
  $("aiChips").onclick = (e) => { const b = e.target.closest(".ai-chip"); if (b) aiPlay(+b.dataset.i); };
  aiPlay(0);

  /* ---------- back office tools ---------- */
  const T = BS.tools;
  $("toolsNote").textContent = T.simpleNote;
  $("toolsSimple").innerHTML = T.simple.map(([t, p]) =>
    `<div class="rise"><b>${esc(t)}</b><span>${esc(p)}</span></div>`).join("");

  /* ---------- practice health, by company ---------- */
  const H = BS.health, mc = (m) => (m >= 50 ? "var(--ok)" : m >= 38 ? "var(--warn)" : "#d64545");
  let ent = "both", hlView = "job";
  $("hlQb").textContent = H.qb;
  $("hlTabs").innerHTML = H.ents.map(([k, n]) => `<button class="${k === ent ? "on" : ""}" data-k="${k}">${esc(n)}</button>`).join("");
  function hlRender() {
    $("hlTabs").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.k === ent));
    $("hlBooks").innerHTML = `Reading from <b>${esc(H.books[ent])}</b> <span class="smp">Sample</span>`;
    $("hlK").innerHTML = H.kpis[ent].map(([t, v, n, k]) =>
      `<div class="hl-kp"><span>${esc(t)}</span><b>${esc(v)}</b><small class="${k}">${esc(n)}</small></div>`).join("");
    $("hlJobs").innerHTML = hlView === "kind"
      ? H.kinds[ent].map(([k, m, sh]) => `<div class="hl-r"><span><b>${esc(k)}</b><small>${sh}% of the work</small></span><div class="hl-bar"><i style="width:${m}%;background:${mc(m)}"></i></div><em style="color:${mc(m)}">${m}%</em></div>`).join("")
      : H.jobs[ent].map(([n, k, c, cost]) => { const m = Math.round((1 - cost / c) * 100);
          return `<div class="hl-r"><span><b>${esc(n)}</b><small>${esc(k)} · ${money(c)} · ${money(c - cost)} profit</small></span><div class="hl-bar"><i style="width:${m}%;background:${mc(m)}"></i></div><em style="color:${mc(m)}">${m}%</em></div>`; }).join("");
    $("hlIns").innerHTML = H.insights[ent].map(([t, p]) => `<div class="hl-i"><b>${esc(t)}</b><span>${esc(p)}</span></div>`).join("");
  }
  $("hlTabs").onclick = (e) => { const b = e.target.closest("button"); if (b) { ent = b.dataset.k; hlRender(); } };
  document.querySelector(".hl-tg").onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll(".hl-tg button").forEach((x) => x.classList.toggle("on", x === b));
    hlView = b.dataset.v; hlRender();
  };
  hlRender();

  /* ---------- set up a call ---------- */
  $("nForm").onsubmit = (e) => {
    e.preventDefault();
    const em = $("nEmail").value.trim(), msg = $("nMsg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { msg.className = "n-msg err"; msg.textContent = "Add your email so Jordan can reach you."; $("nEmail").focus(); return; }
    $("nBtn").disabled = true; $("nBtn").textContent = "Sending...";
    bsSend({ form: "Best Self Medical Arts: set up a call", name: $("nName").value, email: em, phone: $("nPhone").value, website: $("nHp").value,
      answers: `Good times: ${$("nWhen").value || "(not given)"}` }).then((r) => {
      $("nBtn").disabled = false; $("nBtn").textContent = "Set up a call";
      if (r.ok) { $("nForm").reset(); msg.className = "n-msg ok"; msg.textContent = "Sent. Jordan will reach out to set a time."; }
      else { msg.className = "n-msg err"; msg.textContent = "That did not go through. Try again in a minute."; }
    });
  };

  /* ---------- chrome ---------- */
  fit(); setTimeout(fit, 400);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".rise").forEach((el) => io.observe(el));
  addEventListener("scroll", () => $("top").classList.toggle("on", scrollY > innerHeight * 0.75), { passive: true });
  if (q.has("to")) setTimeout(() => { const t = document.getElementById(q.get("to")); if (t) scrollTo(0, t.offsetTop); }, 60);
})();
