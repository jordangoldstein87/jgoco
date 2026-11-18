/* The pitch page: logo picker that re-themes everything, the site in frames, listings, review inbox,
   automations with a phone, and the project management mock. Words and numbers come from data.js. */
(function () {
  const C = GD.co, $ = (id) => document.getElementById(id);
  const q = new URLSearchParams(location.search);
  const CAP = q.has("cap");
  if (CAP) document.documentElement.classList.add("cap");
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
    $("aiAv").innerHTML = L.mark(c, "aiav"); $("aiMk").innerHTML = L.mark(c, "aimk");
    document.querySelectorAll(".l-opt").forEach((b) => b.classList.toggle("on", b.dataset.k === k));
    const src = "website.html?logo=" + k;
    $("sOpen").href = src;
    for (const id of ["fLap", "fPh"]) { const f = $(id); if (f.dataset.src !== src) { f.dataset.src = src; f.src = src; } }

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

  /* ---------- one assistant: text number and ChatGPT ---------- */
  const AI = GD.ai; let aiSel = 0, aiT = [];
  $("aiNum").textContent = AI.number;
  $("aiCrew").innerHTML = AI.crew.map(([n, r, ph]) => `<div class="ai-cr"><i>${n[0]}</i><div><b>${n}</b><small>${r}</small></div><span>${ph}</span></div>`).join("");
  const S = AI.sheet;
  $("aiDay").textContent = S.day;
  $("aiSheetTop").innerHTML = `<b>${S.job} · call ${S.call}</b><br>${S.where}<br>${S.notes}`;
  function sheet(live) {
    $("aiSheet").innerHTML = S.rows.map(([n, task, st, t, k], i) => `<div class="ai-sr"><b>${n}</b><span><small>${task}</small></span><span class="ai-st" id="aiSt${i}">${live ? "Texted" : "Not sent"}</span></div>`).join("");
    if (live) S.rows.forEach(([n, task, st, t, k], i) => aiT.push(setTimeout(() => { const e = $("aiSt" + i); if (e) { e.className = "ai-st " + k; e.textContent = st + " · " + t; } }, CAP ? 0 : 1400 + i * 700)));
  }
  function aiPlay(i) {
    aiT.forEach(clearTimeout); aiT = []; aiSel = i;
    const a = AI.asks[i];
    $("aiChips").innerHTML = AI.asks.map((x, j) => `<button class="ai-chip ${j === i ? "on" : ""}" data-i="${j}">${esc(x.q)}</button>`).join("");
    $("aiSms").innerHTML = `<div class="ai-b me">${a.img ? '<span class="ai-rc"><b>HOME DEPOT #6631</b>5/8 TYPE X 4x12 ×40<br>ALL PURPOSE MUD ×6<br><b>TOTAL $1,284.60</b></span>' : ""}${esc(a.q)}</div>`;
    $("aiGpt").innerHTML = `<div class="ai-gq">${a.img ? '<span class="ai-rc"><b>HOME DEPOT #6631</b>5/8 TYPE X 4x12 ×40<br>ALL PURPOSE MUD ×6<br><b>TOTAL $1,284.60</b></span>' : ""}${esc(a.q)}</div>`;
    aiT.push(setTimeout(() => {
      $("aiSms").insertAdjacentHTML("beforeend", `<div class="ai-b them">${esc(a.a)}</div>`);
      $("aiGpt").insertAdjacentHTML("beforeend", `<div class="ai-ga">${esc(a.a)}<small>Answered by Guarantee Drywall · Sample</small></div>`);
    }, CAP ? 0 : 650));
    sheet(!!a.sheet);
  }
  $("aiChips").onclick = (e) => { const b = e.target.closest(".ai-chip"); if (b) aiPlay(+b.dataset.i); };
  aiPlay(0);

  /* ---------- company health ---------- */
  const H = GD.health, mc = (m) => (m >= 28 ? "var(--ok)" : m >= 20 ? "var(--warn)" : "#d64545");
  $("hlK").innerHTML = H.kpis.map(([t, v, n, k]) => `<div class="hl-kp rise"><span>${t}</span><b>${v}</b><small class="${k}">${n}</small></div>`).join("");
  function hlRows(v) {
    $("hlJobs").innerHTML = v === "kind"
      ? H.kinds.map(([k, m, sh]) => `<div class="hl-r"><span><b>${k}</b><small>${sh}% of your work</small></span><div class="hl-bar"><i style="width:${m * 2}%;background:${mc(m)}"></i></div><em style="color:${mc(m)}">${m}%</em></div>`).join("")
      : H.jobs.map(([n, k, c, cost]) => { const m = Math.round((1 - cost / c) * 100); return `<div class="hl-r"><span><b>${esc(n)}</b><small>${k} · ${money(c)} contract · ${money(c - cost)} profit</small></span><div class="hl-bar"><i style="width:${m * 2}%;background:${mc(m)}"></i></div><em style="color:${mc(m)}">${m}%</em></div>`; }).join("");
  }
  document.querySelector(".hl-tg").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; document.querySelectorAll(".hl-tg button").forEach((x) => x.classList.toggle("on", x === b)); hlRows(b.dataset.v); };
  hlRows("job");
  $("hlIns").innerHTML = H.insights.map(([t, p]) => `<div class="hl-i"><b>${t}</b><span>${p}</span></div>`).join("");

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
    const crew = ["Luis", "Marco", "Dani", "Pablo", "Jorge"];
    const plan = {
      Luis: ["GD-241", "GD-241", "GD-243", null, "GD-244"],
      Marco: ["GD-241", "GD-243", "GD-243", null, "GD-244"],
      Dani: ["GD-241", "GD-241", "GD-241", null, "GD-244"],
      Pablo: ["GD-245", "GD-245", "GD-244", null, "GD-244"],
      Jorge: ["GD-241", "GD-241", "GD-241", null, null],
    };
    const jb = (id) => J.find((j) => j.id === id);
    $("pmSum").innerHTML = `Week of Nov 23 · Thanksgiving off <span class="smp">Sample</span>`;
    $("pmView").innerHTML = `<div class="pm-cal"><table><tr><th></th>${days.map((d) => `<th>${d}</th>`).join("")}</tr>${crew.map((c) =>
      `<tr><td class="pm-who">${c}</td>${plan[c].map((id, i) => id ? `<td><span>${esc(jb(id).name)}</span><small>${P.stages[jb(id).stage]}</small></td>` : `<td class="off">${i === 3 ? "Thanksgiving" : "Open"}</td>`).join("")}</tr>`).join("")}</table></div>`;
  }
  /* multifamily: every unit's stage, floor by floor (SAMPLE) */
  const US = P.unitStages, unitAt = (f, u) => { const v = P.floors[f][1] - ((u * 7) % 13) / 13 * 1.2 + 0.4; return Math.max(0, Math.min(5, Math.floor(v))); };
  const uState = P.floors.map((fl, f) => Array.from({ length: 28 }, (_, u) => unitAt(f, u)));
  function units() {
    const all = uState.flat(), n = all.length, cnt = US.map((_, i) => all.filter((x) => x === i).length);
    $("pmSum").innerHTML = `<b>Lankershim apartments</b> · 112 units <span class="smp">Sample</span>`;
    $("pmView").innerHTML = `<div class="pm-units"><div class="pm-uh"><b>${cnt[5]} of ${n} units done</b>${US.map(([t, c], i) => `<span><i style="background:${c}"></i>${t} ${cnt[i]}</span>`).join("")}</div>
      ${uState.map((row, f) => `<div class="pm-fl"><b>Floor ${P.floors[f][0]}</b><div class="pm-ug">${row.map((s, u) => `<button class="pm-u" data-f="${f}" data-u="${u}" style="background:${US[s][1]}" title="Unit ${P.floors[f][0]}${String(u + 1).padStart(2, "0")}: ${US[s][0]}">${P.floors[f][0]}${String(u + 1).padStart(2, "0")}</button>`).join("")}</div></div>`).reverse().join("")}
      <div class="pm-ubar">${US.map(([t, c], i) => `<div style="background:${c};flex:${cnt[i]}"></div>`).join("")}</div>
      <div class="pm-utip" id="pmTip">Tap a unit to move it to the next stage.</div></div>`;
  }
  $("pmView").addEventListener("click", (e) => {
    const b = e.target.closest(".pm-u"); if (!b) return;
    const f = +b.dataset.f, u = +b.dataset.u, s = uState[f][u];
    if (s < 5) uState[f][u] = s + 1;
    const id = P.floors[f][0] + String(u + 1).padStart(2, "0");
    units();
    $("pmTip").textContent = s < 5 ? `Unit ${id} moved to ${US[s + 1][0]}. The GC's portal and tonight's log update too.` : `Unit ${id} is done.`;
  });
  document.querySelector(".pm-tabs").onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll(".pm-tabs button").forEach((x) => x.classList.toggle("on", x === b));
    b.dataset.v === "week" ? week() : b.dataset.v === "units" ? units() : board();
  };
  const ICON = {
    Rcpt: '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    QB: '<circle cx="12" cy="12" r="9"/><path d="M9 8v8M15 8v8M9 8h1.5a2.5 2.5 0 0 1 0 5H9M15 16h-1.5a2.5 2.5 0 0 1 0-5H15"/>',
    Cost: '<path d="M3 20h18M6 16v-5M11 16V8M16 16v-3M20 16V5"/>',
    Bid: '<path d="M3 17 17 3l4 4L7 21H3z"/><path d="M13 7l4 4M9 11l2 2M6 14l2 2"/>',
    Job: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="13" rx="1"/>',
    Unit: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    Crew: '<path d="M4 5h16v11H9l-5 4z"/>',
    Mat: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M2 14l10 5 10-5"/>',
    Log: '<path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
    CO: '<path d="M14 3l7 7-11 11H3v-7z"/>',
    Pay: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    Doc: '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  };
  $("pmFeat").innerHTML = P.feats.map(([k, t, p]) => `<div class="pm-f rise"><i><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${ICON[k]}</svg></i><b>${t}</b><span>${p}</span></div>`).join("");
  $("pmView").onclick = (e) => { const c = e.target.closest(".pm-card"); if (c) openJob(c.dataset.id); };

  let jt = "over";
  function openJob(id, tab) {
    const j = J.find((x) => x.id === id); jt = tab || jt;
    const nxt = j.stage < 6 ? P.stages[j.stage + 1] : null;
    const paid = j.stage >= 6 ? j.value : j.stage >= 3 ? j.value * 0.7 : j.stage >= 1 ? j.value * 0.3 : 0;
    const tabs = [["over", "Overview"], ["sched", "Schedule"], ["mat", "Materials"], ["photo", "Photos"], ["log", "Daily log"], ["cost", "Costs"], ["co", "Change orders"], ["punch", "Punch list"], ["bill", "Billing"]];
    const sched = [["Bid walk and measure", "Nov 9"], ["Board delivered", "Nov 12"], ["Hang", "Nov 13 to 17"], ["Tape and bed, 3 coats", "Nov 18 to 20"], ["Texture or Level 5 skim", "Nov 23"], ["Sand and punch", "Nov 24"], ["Walkthrough and sign-off", "Nov 25"]];
    let body = "";
    if (jt === "over") body = `<div class="pm-kv"><div><span>Contract</span><b>${money(j.value)}</b></div><div><span>Area</span><b>${j.sqft.toLocaleString()} sf</b></div>
      <div><span>Board</span><b style="font-size:18px">${esc(j.board)}</b></div><div><span>Next date</span><b style="font-size:18px">${esc(j.due)}</b></div></div>
      <ul class="pm-li" style="margin-top:14px"><li><i>👷</i>${j.crew.length ? j.crew.join(", ") : "No crew yet"}<small>Crew</small></li><li><i>✉</i>Texts the customer at every stage<small>Automatic</small></li></ul>`;
    if (jt === "sched") body = `<ul class="pm-li">${sched.map(([t, d], i) => { const ok = i < [0, 2, 3, 4, 5, 6, 7][j.stage]; return `<li class="${ok ? "ok" : ""}"><i>${ok ? "✓" : ""}</i>${t}<small>${d}</small></li>`; }).join("")}</ul>`;
    if (jt === "mat") body = `<p style="margin:0 0 10px;color:var(--mut);font-size:15px">${j.sqft.toLocaleString()} sf of ${esc(j.board)}, 10% waste. Estimated.</p><ul class="pm-li">${mats(j.sqft).map(([t, n]) => `<li><i>▢</i>${t}<small style="font:800 18px Archivo;color:var(--ink)">${n.toLocaleString()}</small></li>`).join("")}</ul><button class="btn pm-adv" onclick="this.textContent='Order sent to your supplier'">Send order to supplier</button>`;
    if (jt === "photo") body = `<div class="pm-ph">${GD.work.slice(2, 8).map(([f]) => `<img src="img/work/${f}" alt="">`).join("")}</div><p style="font-size:15px;color:var(--mut)">Crew photos file themselves here. Star one to post it.</p>`;
    if (jt === "log") body = `<ul class="pm-li"><li class="ok"><i>✓</i><span><b>Mon</b> · 4 on site, 7:00 to 3:30. ${j.sqft > 20000 ? "Floor 3 hang finished, units 301 to 314." : "Board hung, ceilings first."}</span><small>3 photos</small></li>
      <li class="ok"><i>✓</i><span><b>Tue</b> · 4 on site. ${j.sqft > 20000 ? "Tape first coat, 301 to 308. Electrician late on 310." : "Taped and bedded, first coat."}</span><small>5 photos</small></li>
      <li><i></i><span><b>Wed</b> · Inspection 9 AM. Log goes to ${esc(j.who.replace("Sample · ", ""))} at 5 PM.</span><small>Today</small></li></ul>`;
    if (jt === "cost") { const lab = j.value * 0.235, mat = j.value * 0.133 * Math.max(0.2, j.stage / 6), spent = (lab * Math.max(0.2, j.stage / 6)) + mat;
      body = `<div class="pm-kv"><div><span>Contract</span><b>${money(j.value)}</b></div><div><span>Spent so far</span><b>${money(spent)}</b></div></div>
      <p style="margin:16px 0 6px;font:800 12px Archivo;letter-spacing:.1em;text-transform:uppercase;color:var(--mut)">Receipts · synced to QuickBooks</p>
      <ul class="pm-li"><li class="ok"><i>✓</i>Home Depot, Van Nuys · board and mud<small>${money(1284.6)} · texted Tue</small></li><li class="ok"><i>✓</i>L&W Supply · delivery to the site<small>${money(8940)} · emailed</small></li><li class="ok"><i>✓</i>Shell · fuel<small>${money(86.2)} · card</small></li></ul>
      <button class="btn pm-adv" onclick="this.textContent='Opened in QuickBooks'">Open job in QuickBooks</button>`; }
    if (jt === "co") body = `<ul class="pm-li"><li class="ok"><i>✓</i>Add soffit over reception, 42 lf<small>+${money(1260)} · signed Nov 14</small></li><li><i></i>Upgrade lobby to Level 5<small>+${money(2400)} · sent, waiting</small></li></ul><button class="btn pm-adv" onclick="this.textContent='Texted for signature'">New change order</button>`;
    if (jt === "punch") body = `<ul class="pm-li"><li class="ok"><i>✓</i>Screw pop, office 4 north wall<small>Dani</small></li><li><i></i>Sand ridge at corridor bead<small>Marco</small></li><li><i></i>Touch up around 3 outlet boxes<small>Luis</small></li></ul>`;
    if (jt === "bill") body = j.value > 100000 ? (() => {
      const pct = [0, 0.05, 0.25, 0.48, 0.66, 0.9, 1][j.stage], done = j.value * pct, ret = done * 0.1;
      return `<p style="margin:0 0 10px;color:var(--mut);font-size:15px">Monthly pay app by floor, 10% retention held.</p>
      <ul class="pm-li"><li class="ok"><i>✓</i>Pay app 1 · Floors 1 and 2 framing<small>${money(j.value * 0.22)}</small></li><li class="ok"><i>✓</i>Pay app 2 · Floors 1 to 3 hang<small>${money(j.value * 0.26)}</small></li><li><i></i>Pay app 3 · due the 25th, ready to send<small>${money(j.value * 0.18)}</small></li></ul>
      <div class="pm-kv" style="margin-top:14px"><div><span>Billed to date</span><b>${money(done)}</b></div><div><span>Retention held</span><b>${money(ret)}</b></div></div>
      <button class="btn pm-adv" onclick="this.textContent='Pay app and lien waiver sent'">Send pay app 3 with waiver</button>`; })() : `<ul class="pm-li"><li class="${j.stage >= 1 ? "ok" : ""}"><i>${j.stage >= 1 ? "✓" : ""}</i>Deposit, 30%<small>${money(j.value * 0.3)}</small></li><li class="${j.stage >= 3 ? "ok" : ""}"><i>${j.stage >= 3 ? "✓" : ""}</i>Board hung, 40%<small>${money(j.value * 0.4)}</small></li><li class="${j.stage >= 6 ? "ok" : ""}"><i>${j.stage >= 6 ? "✓" : ""}</i>Final, 30%<small>${money(j.value * 0.3)}</small></li></ul>
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

  /* ---------- set up a call: sent straight to Jordan ---------- */
  $("nForm").onsubmit = (e) => {
    e.preventDefault();
    const em = $("nEmail").value.trim(), msg = $("nMsg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { msg.className = "n-msg err"; msg.textContent = "Add your email so Jordan can reach you."; $("nEmail").focus(); return; }
    $("nBtn").disabled = true; $("nBtn").textContent = "Sending...";
    gdSend({ form: "Guarantee Drywall: set up a call", name: $("nName").value, email: em, phone: $("nPhone").value, website: $("nHp").value,
      answers: `Good times: ${$("nWhen").value || "(not given)"}\nLogo they had picked: ${GD_LOGOS[LK].name}` }).then((r) => {
      $("nBtn").disabled = false; $("nBtn").textContent = "Set up a call";
      if (r.ok) { $("nForm").reset(); msg.className = "n-msg ok"; msg.textContent = "Sent. Jordan will reach out to set a time."; }
      else { msg.className = "n-msg err"; msg.textContent = "That didn't go through. Try again in a minute."; }
    });
  };

  /* ---------- chrome ---------- */
  theme(LK); fit(); setTimeout(fit, 300);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll(".rise").forEach((el) => io.observe(el));
  addEventListener("scroll", () => $("pTop").classList.toggle("on", scrollY > innerHeight * 0.7), { passive: true });
  if (q.has("to")) setTimeout(() => { const t = document.getElementById(q.get("to")); if (t) scrollTo(0, t.offsetTop); }, 50);
})();
