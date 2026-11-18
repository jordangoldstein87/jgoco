/* The pitch page: logo picker that re-themes everything, the site in frames, listings, review inbox,
   automations with a phone, and the project management mock. Words and numbers come from data.js. */
(function () {
  const C = GD.co, $ = (id) => document.getElementById(id);
  const q = new URLSearchParams(location.search);
  if (q.has("cap")) document.documentElement.classList.add("cap");
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  let LK = "stack";
  try { LK = q.get("logo") || localStorage.getItem("gd-logo") || "stack"; } catch (e) {}
  if (!GD_LOGOS[LK]) LK = "stack";

  /* ---------- hero + today ---------- */
  $("heroBg").innerHTML = GD.work.slice(0, 8).map(([f]) => `<img src="img/work/${f}" alt="">`).join("");
  $("heroH").innerHTML = GD.hero.h;
  $("heroP").textContent = GD.hero.p;
  $("heroFor").textContent = C.owner ? "Prepared for " + C.owner : "Prepared for Guarantee Drywall";
  $("todayH").textContent = GD.today.h;
  $("todayP").textContent = GD.today.p;
  $("todayStats").innerHTML = GD.today.stats.map(([b, s]) => `<div class="t-card rise"><b>${b}</b><span>${s}</span></div>`).join("");
  $("liPhone").textContent = C.phone || "Your number";

  /* ---------- theme ---------- */
  function theme(k) {
    LK = k; try { localStorage.setItem("gd-logo", k); } catch (e) {}
    const L = GD_LOGOS[k], c = L.colors, r = document.documentElement.style;
    r.setProperty("--ink", c.ink); r.setProperty("--acc", c.accent); r.setProperty("--core", c.core);
    const white = { ...c, ink: "#ffffff", core: c.ink };
    $("heroLogo").innerHTML = L.lockup(white, "hero");
    $("topLogo").innerHTML = L.lockup(c, "top");
    $("lLock").innerHTML = L.lockup(c, "main");
    $("lWhy").textContent = L.why;
    $("uSign").innerHTML = L.lockup(c, "sign"); $("uSignP").textContent = C.phone || C.domain;
    $("uCard").innerHTML = L.lockup(c, "card");
    $("uCardP").innerHTML = (C.owner ? esc(C.owner) + "<br>" : "") + (C.phone ? C.phone + " · " : "") + C.email + "<br>" + C.domain;
    $("uPin").innerHTML = L.mark(c, "pin");
    $("uTruck").innerHTML = L.lockup(c, "truck"); $("uTruckP").textContent = C.phone || C.domain;
    $("liLogo").innerHTML = L.lockup(c, "li");
    $("pmLogo").innerHTML = L.lockup(c, "pm");
    $("auAv").innerHTML = L.mark(c, "av");
    document.querySelectorAll(".l-opt").forEach((b) => b.classList.toggle("on", b.dataset.k === k));
    const src = "website.html?logo=" + k;
    $("sOpen").href = src;
    for (const id of ["fLap", "fPh"]) { const f = $(id); if (f.dataset.src !== src) { f.dataset.src = src; f.src = src; } }
    $("nBtn").href = "mailto:" + GD.jordan.email + "?subject=" + encodeURIComponent("Guarantee Drywall: let's talk") +
      "&body=" + encodeURIComponent("Hi Jordan,\n\nI looked through the pitch. A good time to talk is:\n\nThe logo I like best: " + L.name + "\n\n");
  }
  $("lPick").innerHTML = Object.entries(GD_LOGOS).map(([k, L], i) =>
    `<button class="l-opt" data-k="${k}"><div class="l-m">${L.mark(L.colors, "o" + k)}</div><small>Option ${"ABCD"[i]}</small><b>${L.name}</b></button>`).join("");
  $("lPick").onclick = (e) => { const b = e.target.closest(".l-opt"); if (b) theme(b.dataset.k); };

  /* ---------- site frames, scaled ---------- */
  function fit() {
    const lap = $("sLap"), ph = $("sPh");
    if (lap.offsetWidth) $("fLap").style.transform = `scale(${lap.offsetWidth / 1440})`;
    if (ph.offsetWidth) $("fPh").style.transform = `scale(${ph.offsetWidth / 390})`;
  }
  addEventListener("resize", fit);

  /* ---------- listings ---------- */
  const pillTxt = { live: "Live", assist: "One tap", sync: "In step" };
  $("liTiles").innerHTML = GD.listings.map(([n, s, m, p], i) =>
    `<div class="li-t rise" id="li${i}"><header><b>${n}</b><small>${s}</small><i class="li-pill ${m}">${pillTxt[m]}</i></header><p>${p}</p></div>`).join("");
  let liDone = false;
  $("liGo").onclick = () => {
    if (liDone) return; liDone = true;
    $("liHours").innerHTML = "Closed Thu Nov 26<br>Mon to Fri 9 to 5";
    $("liGo").textContent = "Updated everywhere";
    GD.listings.forEach(([n, s, m], i) => setTimeout(() => {
      const t = $("li" + i); t.classList.add("flash");
      t.querySelector("p").textContent = m === "assist" ? `Holiday hours ready. Tap to confirm in ${n}.` : `Holiday hours updated on ${n}.`;
      t.querySelector(".li-pill").textContent = m === "assist" ? "Tap to confirm" : "Updated";
      setTimeout(() => t.classList.remove("flash"), 500);
    }, 160 * i));
  };

  /* ---------- reviews ---------- */
  const done = new Set(); let cur = 0;
  function rvList() {
    $("rvCount").textContent = (GD.reviews.length - done.size) + " to answer";
    $("rvList").innerHTML = GD.reviews.map((v, i) =>
      `<button class="rv-i ${i === cur ? "on" : ""}" data-i="${i}"><b>${esc(v.who.replace("Sample · ", ""))}</b><small>${v.src} · ${v.when}</small>
      <div><span class="rv-st">${"★".repeat(v.stars)}</span> ${done.has(i) ? '<span class="rv-done">Answered</span>' : ""}</div><p>${esc(v.text)}</p></button>`).join("");
  }
  function rvShow(i) {
    cur = i; const v = GD.reviews[i], live = v.src !== "Yelp";
    $("rvD").innerHTML = `<div class="rv-src">${v.src} · <span class="rv-st">${"★".repeat(v.stars)}</span> <span class="smp">Sample</span></div>
      <blockquote>“${esc(v.text)}”</blockquote>
      <label>Your reply</label><textarea id="rvT">${esc(v.draft)}</textarea>
      <div class="rv-btns">${live ? `<button class="btn" id="rvP">Post reply to ${v.src}</button>` : `<button class="btn" id="rvP">Copy and open Yelp</button>`}<button class="btn ghost" id="rvR">Rewrite</button></div>
      <div class="rv-note" id="rvN">${done.has(i) ? (live ? "Posted to " + v.src + "." : "Copied. Yelp opened to paste it.") : ""}</div>`;
    $("rvP").onclick = () => { done.add(i); $("rvN").textContent = live ? "Posted to " + v.src + "." : "Copied. Yelp opened to paste it."; rvList(); const n = GD.reviews.findIndex((x, j) => !done.has(j)); if (n >= 0) setTimeout(() => rvShow(n), 900); };
    $("rvR").onclick = () => { const t = $("rvT"); t.value = t.value.startsWith("Thank") ? t.value.replace(/^Thank you|^Thanks/, "Really appreciate it") : "Thank you! " + t.value; };
    rvList();
  }
  $("rvList").onclick = (e) => { const b = e.target.closest(".rv-i"); if (b) rvShow(+b.dataset.i); };
  rvShow(0);

  /* ---------- automations ---------- */
  const ownerMsgs = {
    post: [["them", "New photo from GD-241, Lankershim apartments. Caption: “Floor 3 taped and ready for texture. 112 units in North Hollywood.”"], ["them", "Post to Google, Facebook and Instagram? Reply YES."], ["me", "YES"], ["them", "Posted to all three."]],
    reply: [["them", "New 5-star Google review from Maria T. Draft reply: “Thank you, Maria. Matching an old ceiling so the patch disappears is the part we're proudest of.”"], ["them", "Reply YES to post, or send your own words."], ["me", "YES"], ["them", "Posted."]],
    partners: [["them", "New referral from Westside Painting: a Mar Vista living room ceiling, water damage. Photos attached."], ["them", "We sent Westside a thank-you. That's 4 referrals from them this year."]],
    towns: [["them", "Your Sherman Oaks page now shows 6 real jobs and 3 reviews from there."], ["them", "Want one for Studio City next? You've done 4 jobs there. Reply YES."], ["me", "YES"]],
  };
  const st = GD.autos.map((a) => a.on); let sel = 0;
  function auRender() {
    $("auList").innerHTML = GD.autos.map((a, i) =>
      `<button class="au-c ${i === sel ? "sel" : ""}" data-i="${i}"><span class="au-n">${i + 1}</span>
      <span><b>${a.t}</b><span class="au-w">When: ${a.when}</span><span class="au-x">${a.what}</span>${a.fact ? `<span class="au-f">${a.fact}</span>` : ""}</span>
      <span class="tg ${st[i] ? "on" : ""}" data-t="${i}" role="switch" aria-checked="${st[i]}"></span></button>`).join("");
  }
  function auPhone() {
    const a = GD.autos[sel]; let h = "";
    if (a.sms) {
      const time = { review: "Tue 9:00 AM", missed: "Tue 11:42 AM", lead: "Tue 2:15 PM", estimate: "Thu 10:00 AM" }[a.k] || "Today";
      h = `<div class="au-time">${time}</div>` + (a.k === "missed" ? `<div class="au-time">Missed call</div>` : "") +
        a.sms.map((m, i) => `<div class="au-b me ${i && /\.page|\//.test(m) ? "lnk" : ""}" style="animation-delay:${i * 0.35}s">${esc(m)}</div>`).join("");
    } else {
      h = `<div class="au-time">To you</div>` + ownerMsgs[a.k].map(([w, m], i) => `<div class="au-b ${w}" style="animation-delay:${i * 0.35}s">${esc(m)}</div>`).join("");
    }
    $("auMsgs").innerHTML = st[sel] ? h : `<div class="au-empty">Off. Flip the switch to turn it on.</div>`;
  }
  $("auList").onclick = (e) => {
    const t = e.target.closest("[data-t]"); const b = e.target.closest(".au-c"); if (!b) return;
    const i = +b.dataset.i;
    if (t) st[i] = !st[i];
    sel = i; auRender(); auPhone();
  };
  auRender(); auPhone();

  /* ---------- project management ---------- */
  const P = GD.pm, J = P.jobs;
  const mats = (sf) => {
    const sheets = Math.ceil((sf * 1.1) / 48);
    return [["Sheets, 4×12", sheets], ["Mud, 4.5 gal boxes", Math.max(1, Math.ceil((sf * 0.14) / 62))], ["Tape, 500 ft rolls", Math.max(1, Math.ceil((sf * 0.37) / 500))], ["Screws, lbs", Math.max(1, Math.ceil((sf / 1000) * 4.5))], ["Corner bead, 8 ft", Math.ceil(sf / 160)]];
  };
  function board() {
    const open = J.filter((j) => j.stage < 6);
    $("pmSum").innerHTML = `<b>${open.length}</b> open jobs · <b>${money(open.reduce((s, j) => s + j.value, 0))}</b> on the board <span class="smp">Sample</span>`;
    $("pmView").innerHTML = `<div class="pm-board">${P.stages.map((s, si) => {
      const js = J.filter((j) => j.stage === si);
      return `<div class="pm-col"><h4><span>${s}</span><span>${js.length}</span></h4>${js.map((j) =>
        `<button class="pm-card" data-id="${j.id}"><b>${esc(j.name)}</b><small>${esc(j.who.replace("Sample · ", ""))}</small>
        <div class="pm-m"><span>${money(j.value)}</span><span>${j.sqft.toLocaleString()} sf</span></div>
        ${j.crew.length ? `<div class="pm-crew">${j.crew.map((c) => `<i title="${c}">${c[0]}</i>`).join("")}</div>` : `<small>${j.due}</small>`}</button>`).join("")}</div>`;
    }).join("")}</div>`;
  }
  function week() {
    const days = ["Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27"];
    const crew = ["Luis", "Marco", "Dani", "Pablo"];
    const plan = {
      Luis: ["GD-241", "GD-241", "GD-243", null, "GD-244"],
      Marco: ["GD-241", "GD-243", "GD-243", null, "GD-244"],
      Dani: ["GD-241", "GD-241", "GD-241", null, "GD-244"],
      Pablo: ["GD-245", "GD-245", "GD-244", null, "GD-244"],
    };
    const jb = (id) => J.find((j) => j.id === id);
    $("pmSum").innerHTML = `Week of Nov 23 · Thanksgiving off <span class="smp">Sample</span>`;
    $("pmView").innerHTML = `<div class="pm-cal"><table><tr><th></th>${days.map((d) => `<th>${d}</th>`).join("")}</tr>${crew.map((c) =>
      `<tr><td class="pm-who">${c}</td>${plan[c].map((id, i) => id ? `<td><span>${esc(jb(id).name)}</span><small>${P.stages[jb(id).stage]}</small></td>` : `<td class="off">${i === 3 ? "Thanksgiving" : "Open"}</td>`).join("")}</tr>`).join("")}</table></div>`;
  }
  document.querySelector(".pm-tabs").onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll(".pm-tabs button").forEach((x) => x.classList.toggle("on", x === b));
    b.dataset.v === "week" ? week() : board();
  };
  $("pmView").onclick = (e) => { const c = e.target.closest(".pm-card"); if (c) openJob(c.dataset.id); };

  let jt = "over";
  function openJob(id, tab) {
    const j = J.find((x) => x.id === id); jt = tab || jt;
    const nxt = j.stage < 6 ? P.stages[j.stage + 1] : null;
    const paid = j.stage >= 6 ? j.value : j.stage >= 3 ? j.value * 0.7 : j.stage >= 1 ? j.value * 0.3 : 0;
    const tabs = [["over", "Overview"], ["sched", "Schedule"], ["mat", "Materials"], ["photo", "Photos"], ["co", "Change orders"], ["punch", "Punch list"], ["bill", "Billing"]];
    const sched = [["Bid walk and measure", "Nov 9"], ["Board delivered", "Nov 12"], ["Hang", "Nov 13 to 17"], ["Tape and bed, 3 coats", "Nov 18 to 20"], ["Texture or Level 5 skim", "Nov 23"], ["Sand and punch", "Nov 24"], ["Walkthrough and sign-off", "Nov 25"]];
    let body = "";
    if (jt === "over") body = `<div class="pm-kv"><div><span>Contract</span><b>${money(j.value)}</b></div><div><span>Area</span><b>${j.sqft.toLocaleString()} sf</b></div>
      <div><span>Board</span><b style="font-size:18px">${esc(j.board)}</b></div><div><span>Next date</span><b style="font-size:18px">${esc(j.due)}</b></div></div>
      <ul class="pm-li" style="margin-top:14px"><li><i>👷</i>${j.crew.length ? j.crew.join(", ") : "No crew yet"}<small>Crew</small></li><li><i>✉</i>Texts the customer at every stage<small>Automatic</small></li></ul>`;
    if (jt === "sched") body = `<ul class="pm-li">${sched.map(([t, d], i) => { const ok = i < [0, 2, 3, 4, 5, 6, 7][j.stage]; return `<li class="${ok ? "ok" : ""}"><i>${ok ? "✓" : ""}</i>${t}<small>${d}</small></li>`; }).join("")}</ul>`;
    if (jt === "mat") body = `<p style="margin:0 0 10px;color:var(--mut);font-size:15px">${j.sqft.toLocaleString()} sf of ${esc(j.board)}, 10% waste. Estimated.</p><ul class="pm-li">${mats(j.sqft).map(([t, n]) => `<li><i>▢</i>${t}<small style="font:800 18px Archivo;color:var(--ink)">${n.toLocaleString()}</small></li>`).join("")}</ul><button class="btn pm-adv" onclick="this.textContent='Order sent to your supplier'">Send order to supplier</button>`;
    if (jt === "photo") body = `<div class="pm-ph">${GD.work.slice(2, 8).map(([f]) => `<img src="img/work/${f}" alt="">`).join("")}</div><p style="font-size:15px;color:var(--mut)">Crew photos file themselves here. Star one to post it.</p>`;
    if (jt === "co") body = `<ul class="pm-li"><li class="ok"><i>✓</i>Add soffit over reception, 42 lf<small>+${money(1260)} · signed Nov 14</small></li><li><i></i>Upgrade lobby to Level 5<small>+${money(2400)} · sent, waiting</small></li></ul><button class="btn pm-adv" onclick="this.textContent='Texted for signature'">New change order</button>`;
    if (jt === "punch") body = `<ul class="pm-li"><li class="ok"><i>✓</i>Screw pop, office 4 north wall<small>Dani</small></li><li><i></i>Sand ridge at corridor bead<small>Marco</small></li><li><i></i>Touch up around 3 outlet boxes<small>Luis</small></li></ul>`;
    if (jt === "bill") body = `<ul class="pm-li"><li class="${j.stage >= 1 ? "ok" : ""}"><i>${j.stage >= 1 ? "✓" : ""}</i>Deposit, 30%<small>${money(j.value * 0.3)}</small></li><li class="${j.stage >= 3 ? "ok" : ""}"><i>${j.stage >= 3 ? "✓" : ""}</i>Board hung, 40%<small>${money(j.value * 0.4)}</small></li><li class="${j.stage >= 6 ? "ok" : ""}"><i>${j.stage >= 6 ? "✓" : ""}</i>Final, 30%<small>${money(j.value * 0.3)}</small></li></ul>
      <div class="pm-kv" style="margin-top:14px"><div><span>Collected</span><b>${money(paid)}</b></div><div><span>Still owed</span><b>${money(j.value - paid)}</b></div></div>`;
    $("pmPan").innerHTML = `<header><div><div class="rv-src">${j.id} · ${esc(j.who)}</div><h3>${esc(j.name)}</h3></div><button class="pm-x" aria-label="Close">×</button></header>
      <div class="pm-sub">${P.stages[j.stage]}${nxt ? " · next: " + nxt : ""}</div>
      <div class="pm-steps">${P.stages.map((s, i) => `<div class="${i < j.stage ? "d" : i === j.stage ? "c" : ""}" title="${s}"></div>`).join("")}</div>
      <div class="pm-dt">${tabs.map(([k, t]) => `<button class="${k === jt ? "on" : ""}" data-k="${k}">${t}</button>`).join("")}</div>
      ${body}
      ${nxt ? `<button class="btn pm-adv" id="pmNext">Move to ${nxt}</button>` : ""}`;
    $("pmPan").querySelector(".pm-x").onclick = closeJob;
    $("pmPan").querySelector(".pm-dt").onclick = (e) => { const b = e.target.closest("button"); if (b) openJob(id, b.dataset.k); };
    if (nxt) $("pmNext").onclick = () => { j.stage++; board(); document.querySelectorAll(".pm-tabs button").forEach((x, i) => x.classList.toggle("on", i === 0)); openJob(id); };
    $("pmDet").classList.add("on");
  }
  function closeJob() { $("pmDet").classList.remove("on"); }
  $("pmDet").onclick = (e) => { if (e.target.id === "pmDet") closeJob(); };
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeJob(); });
  board();

  /* ---------- chrome ---------- */
  theme(LK); fit(); setTimeout(fit, 300);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll(".rise").forEach((el) => io.observe(el));
  addEventListener("scroll", () => $("pTop").classList.toggle("on", scrollY > innerHeight * 0.7), { passive: true });
  if (q.has("to")) setTimeout(() => { const t = document.getElementById(q.get("to")); if (t) scrollTo(0, t.offsetTop); }, 50);
})();
