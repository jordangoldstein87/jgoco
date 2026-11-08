/* The Mechanical Room: a clickable mock of Original Mechanical's back office portal. Every module reads the sample data in data.js.
   APP.hub(mod) draws the whole portal opened on one module; clicks in its side menu switch modules in place. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI, money } = APP;
  const J = id => AX.jobs.find(j => j.id === id) || {};
  const jobByName = n => AX.jobs.find(j => j.name === n) || {};
  const tag = (t, c) => `<span class="tag ${c || ""}">${esc(t)}</span>`;
  const cls = { ok: "ok", warn: "warn", bad: "bad", b: "bl" };
  const bar = (p, over) => `<div class="pbar"><i class="${over ? "over" : ""}" style="width:${Math.min(100, p)}%"></i></div>`;

  const MODS = [
    ["today", "Today", "bolt", 5], ["schedule", "Calendar", "cal"], ["crew", "Crew and texts", "chat"], ["projects", "Jobs", "folder"], ["inbox", "Auto-filed", "mail", 4], ["estimate", "Load calcs and bids", "est"], ["bids", "Builder radar", "bid", 4],
    ["receipts", "Receipts", "receipt", 1], ["billing", "Draws", "money"], ["books", "Books and payroll", "book"], ["subs", "Builders", "users", 2],
    ["paperwork", "Notices and permits", "shield", 1], ["field", "Field", "camera"], ["reinspect", "Installed base", "repeat"], ["listings", "Listings", "star"], ["ask", "Ask Original", "chat"],
  ];

  const H = (title, sub, btns) => `<div class="hb-h"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ""}</div><span class="sp">${btns || ""}<span class="sample">Sample</span></span></div>`;

  /* ---------- modules ---------- */
  const M = {};
  M.today = () => {
    const contract = AX.jobs.reduce((a, j) => a + j.contract + j.co, 0), billed = AX.jobs.reduce((a, j) => a + j.billed, 0), spent = AX.jobs.reduce((a, j) => a + j.spent, 0);
    return H("Good morning, Skylar", "Thursday, November 12 · 6 jobs running · 5 on installs, 1 on service")
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Under contract</small><b>${money(contract)}</b><span>6 active jobs</span></div><div class="hb-kpi"><small>Billed to date</small><b>${money(billed)}</b><span>${Math.round(billed / contract * 100)}% of contract</span></div><div class="hb-kpi"><small>Spent to date</small><b>${money(spent)}</b><span class="dn">1 job over pace</span></div><div class="hb-kpi"><small>Owed to you</small><b>${money(86400)}</b><span>2 draws out, 2 retentions</span></div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("cal", 18)} Today ${tag("Calendar")}</h4>${AX.today.map(t => `<div class="hb-alert"><span class="dot ${t[3] === "r" ? "r" : t[3] === "y" ? "y" : ""}"></span><div><b>${esc(t[0])} · ${esc(t[1])}</b><small>${esc(t[2])}</small></div></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("bolt", 18)} Needs you ${tag("5", "race")}</h4>${AX.alerts.map(a => `<div class="hb-alert" data-go="${a[3]}" style="cursor:pointer"><span class="dot ${a[0] === "b" ? "" : a[0]}"></span><div><b>${esc(a[1])}</b><small>${esc(a[2])}</small></div></div>`).join("")}</div></div>
      <div class="hb-card"><h4>${svgI("folder", 18)} Jobs at a glance</h4>${jobsTable()}</div>`;
  };
  function jobsTable() {
    return `<div class="tblwrap"><table class="hb-t"><tr><th>Job</th><th>Builder and stage</th><th class="r">Contract</th><th>Done</th><th>Spent of budget</th><th></th></tr>${AX.jobs.map(j => { const budget = (j.contract + j.co) * 0.78, sp = j.spent / budget * 100; return `<tr data-go="projects" style="cursor:pointer"><td><b>${esc(j.name)}</b><br><small style="color:#8a7b6d">${j.id} · ${esc(j.city)}</small></td><td>${esc(j.builder)}<br><small style="color:#8a7b6d">${esc(j.stage)}</small></td><td class="r num">${money(j.contract + j.co)}</td><td style="width:120px">${bar(j.pct)}<small>${j.pct}%</small></td><td style="width:140px">${bar(sp, sp > j.pct + 8)}<small>${Math.round(sp)}%</small></td><td>${tag(j.status === "ok" ? "On track" : j.status === "warn" ? "Watch" : "Over", cls[j.status])}</td></tr>`; }).join("")}</table></div>`;
  }

  M.schedule = (tab) => {
    tab = tab || "day";
    const tabs = `<div class="hb-tabs">${[["day", "Today"], ["week", "Crew week"], ["timeline", "Timelines and budgets"]].map(t => `<button data-tab="${t[0]}" class="${tab === t[0] ? "on" : ""}">${t[1]}</button>`).join("")}</div>`;
    let body = "";
    if (tab === "day") body = `<div class="hb-2"><div class="hb-card"><h4>Thursday, Nov 12</h4>${AX.today.map(t => `<div class="hb-alert"><span class="dot ${t[3] === "r" ? "r" : t[3] === "y" ? "y" : ""}"></span><div><b>${esc(t[0])} · ${esc(t[1])}</b><small>${esc(t[2])}</small></div></div>`).join("")}</div>
      <div><div class="hb-card"><h4>What has to happen today, by job</h4>${[["Pinnacle Peak", "Rough inspection at 7:30, then line sets for systems 3 and 4", "Marcus, Jake"], ["Silverleaf", "Take the equipment delivery, seal 2 boots for reinspection", "Diego"], ["Mummy Mountain", "Linear slot trim, family room waits on the change order", "Ramon"], ["Service", "4 calls, 2 tune-ups, 1 warranty visit at Las Sendas", "Tyler"]].map(r => `<div class="hb-alert"><span class="dot"></span><div><b>${r[0]}</b><small>${r[1]} · ${r[2]}</small></div></div>`).join("")}</div>
      <div class="hb-card"><h4>The crew's phones got</h4><p style="font-size:14px;margin:0;color:#4a3a2d">Each person's day at 5:30 a.m.: the address, the gate code, the mechanical sheet they need, and which super to call. Changes go out as a text.</p></div></div></div>`;
    if (tab === "week") body = weekBoard();
    if (tab === "timeline") body = timeline();
    return H("Calendar", "Installs, service calls, inspections, deliveries and builder deadlines on one calendar", `<button class="hb-b g">Sync to Google Calendar</button>`) + tabs + body;
  };
  function weekBoard() {
    const W = AX.week;
    return `<div class="hb-cal"><div class="hd"></div>${W.days.map(d => `<div class="hd">${d}</div>`).join("")}${AX.crew.map(p => `<div class="nm">${p}</div>${W.rows[p].map(c => { const j = J(c); return j.id ? `<div class="j" style="background:${j.color}">${esc(j.name)}</div>` : `<div style="color:#8a7b6d">${esc(c)}</div>`; }).join("")}`).join("")}</div>
      <p style="font-size:13px;color:#7a6b5d;margin:10px 0 0">Drag a name to move someone. Service days and install days share one board, so a July call never quietly steals a rough-in.</p>`;
  }
  APP.hubMini = k => `<div class="hb-main" style="padding:18px;max-height:none;grid-column:1/-1">${k === "week" ? weekBoard() : ""}</div>`;
  function timeline() {
    const weeks = 20;
    return `<div class="hb-card"><h4>Next 20 weeks</h4><div style="display:grid;grid-template-columns:170px 1fr;gap:6px 12px;align-items:center;font-size:13px">
      <div></div><div style="display:grid;grid-template-columns:repeat(${weeks},1fr);font-size:10px;color:#a8998a">${Array.from({ length: weeks }, (_, i) => `<span>${i % 4 === 0 ? ["Nov", "Dec", "Jan", "Feb", "Mar"][i / 4] : ""}</span>`).join("")}</div>
      ${AX.jobs.map(j => { const b = (j.contract + j.co) * 0.78, sp = Math.round(j.spent / b * 100); return `<div><b style="color:#2b1d13">${esc(j.name)}</b><br><small style="color:#8a7b6d">${sp}% of budget spent · ${j.pct}% done</small></div><div style="position:relative;height:26px;background:repeating-linear-gradient(90deg,#f7f2ec 0 calc(100%/${weeks} - 1px),#efe6db 0 calc(100%/${weeks}))"><span style="position:absolute;left:${j.start / weeks * 100}%;width:${j.len / weeks * 100}%;top:3px;bottom:3px;border-radius:7px;background:${j.color}33;border:1px solid ${j.color}"><i style="display:block;height:100%;width:${j.pct}%;background:${j.color};border-radius:6px"></i></span></div>`; }).join("")}</div>
      <p style="font-size:13px;color:#7a6b5d;margin:12px 0 0">Each bar is the house's mechanical schedule, filled by how much is done. When the builder slips drywall, every crew day, delivery and inspection after it moves too.</p></div>`;
  }

  M.projects = () => {
    const j = AX.jobs[0];
    const files = [["plan", "M-101 Mechanical plan, rev 4", "Engineer · PDF · today"], ["plan", "A-301 Reflected ceiling plan", "Architect · PDF"], ["img/work/IMG_5169.jpg?v=1794181557", "Underground runs before the slab", "Diego · photo · Sep"], ["img/work/IMG_5188.jpg?v=1794181557", "Slot plenums, great room", "Marcus · photo · 7:42 a.m."], ["doc", "Manual J/S/D report", "Load calc · PDF"], ["doc", "Contract and scope, signed", "PDF"], ["doc", "Change order #1, signed", "$6,200"], ["img/work/IMG_5187.jpg?v=1794181557", "Great room, ready for rough", "Skylar · photo"]];
    const mail = [["KC", "Kessler Custom Homes", "Pinnacle Peak, drywall moved up", "Filed here because Kessler is the builder and the email says Pinnacle Peak", "6:52"], ["JS", "Johnstone Supply", "Order 118-07 confirmed", "Delivery Thursday added to the calendar", "Tue"], ["AR", "Architect, Lumen Studio", "RCP rev 3 attached", "A-301 rev 3 replaced rev 2. Slot locations highlighted", "Mon"], ["SC", "City of Scottsdale", "Rough inspection scheduled", "Thursday 7:30 a.m. on the calendar", "Mon"]];
    return H(`${esc(j.name)} <span style="font-weight:600;color:#8a7b6d;font-size:16px">${j.id}</span>`, `${esc(j.kind)} · ${esc(j.city)} · ${money(j.contract + j.co)} with changes · ${j.pct}% done`, `<button class="hb-b g">All projects</button><button class="hb-b">Add files</button>`)
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Contract + changes</small><b>${money(j.contract + j.co)}</b><span>1 change order</span></div><div class="hb-kpi"><small>Spent</small><b>${money(j.spent)}</b><span>${Math.round(j.spent / ((j.contract + j.co) * .78) * 100)}% of budget</span></div><div class="hb-kpi"><small>Billed</small><b>${money(j.billed)}</b><span>Rough-in draw due today</span></div><div class="hb-kpi"><small>Retention held</small><b>${money(j.billed * j.ret / 100)}</b><span>${j.ret}%</span></div></div>
      <div class="hb-card"><h4>${svgI("file", 18)} Plans, photos and documents ${tag("41 files")}</h4><div class="hb-files">${files.map(f => `<div class="hb-file"><div class="pv ${f[0] === "plan" ? "plan" : ""}" ${f[0].startsWith("img") ? `style="background-image:url(${f[0]})"` : ""}>${f[0] === "plan" ? "PLAN SHEET" : f[0] === "doc" ? "PDF" : ""}</div><div><b>${esc(f[1])}</b><small>${esc(f[2])}</small></div></div>`).join("")}</div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("mail", 18)} Emails, filed automatically ${tag("from 4 people on this house", "ok")}</h4>${mail.map(m => `<div class="hb-mail"><span class="av">${m[0]}</span><div><b>${esc(m[1])}</b> · ${esc(m[2])}<small>${esc(m[3])}</small></div><small>${m[4]}</small></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("users", 18)} Who's on this job</h4><table class="hb-t">${[["Kessler Custom Homes", "Builder", "Client"], ["Dan Kessler", "Superintendent", "Builder"], ["Lumen Studio", "Architect", "Design"], ["Johnstone Supply", "Equipment and duct", "Vendor"], ["Sun Valley Insulation", "Insulation, goes after rough", "Trade"], ["City of Scottsdale", "Inspections", "City"]].map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${tag(r[2])}</td></tr>`).join("")}</table></div></div>`;
  };

  M.estimate = () => {
    const E = AX.est;
    const rows = E.lines.map((l, i) => `<tr><td><b>${esc(l[0])}</b></td><td class="r"><input data-q="${i}" value="${l[1]}" inputmode="decimal"></td><td>${esc(l[2])}</td><td class="r"><input data-p="${i}" value="${l[3]}" inputmode="decimal"></td><td class="r num" data-ln="${i}">${money(l[1] * l[3])}</td><td>${tag(l[4], l[4].includes("price book") || l[4].includes("Last") ? "bl" : "")}</td></tr>`).join("");
    return H("Estimator", esc(E.job) + " · from the architect's plans and the reflected ceiling plan", `<button class="hb-b g">Upload plans</button><button class="hb-b r">Make the proposal</button>`)
      + `<div class="hb-3" style="margin-bottom:14px">${[["file", "Read A-101 to A-301", "31 rooms, window areas, ceiling heights and orientation, taken from the plan sheets"], ["est", "Ran Manual J, S and D", "26.4 tons of cooling across 6 zones, so 6 systems, ducts sized room by room"], ["book", "Priced from your book", "Your real cost on the last 3 custom homes, plus today's supply house prices"]].map(c => `<div class="hb-card" style="margin:0"><h4>${svgI(c[0], 18)} ${c[1]}</h4><p style="margin:0;font-size:13.5px;color:#5c4b3d">${c[2]}</p></div>`).join("")}</div>
      <div class="hb-card hb-est"><div class="tblwrap"><table class="hb-t"><tr><th>Line</th><th class="r">Qty</th><th></th><th class="r">Unit cost</th><th class="r">Total</th><th>Where the number came from</th></tr>${rows}</table></div>
      <div style="max-width:380px;margin-left:auto;margin-top:12px" id="est-tot"></div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("repeat", 18)} How close were we last time?</h4><table class="hb-t"><tr><th>Past custom home</th><th class="r">Estimate</th><th class="r">Actual</th><th class="r">Off by</th></tr>${[["Desert Mountain residence", 118400, 121900], ["Red Mountain remodel", 41200, 39800], ["Las Sendas residence", 96800, 104100]].map(r => `<tr><td>${r[0]}</td><td class="r num">${money(r[1])}</td><td class="r num">${money(r[2])}</td><td class="r num" style="color:${r[2] > r[1] ? "#c53030" : "#1d8a57"}">${r[2] > r[1] ? "+" : ""}${((r[2] / r[1] - 1) * 100).toFixed(1)}%</td></tr>`).join("")}</table><p style="font-size:13px;color:#7a6b5d;margin:10px 0 0">Every closed job feeds its real costs back into your price book, so the next bid starts closer.</p></div>
      <div class="hb-card"><h4>${svgI("check", 18)} Nothing goes out without you</h4><p style="font-size:14px;margin:0 0 8px;color:#4a3a2d">It does the room-by-room loads, the counting and the pricing. Skylar checks the numbers, changes anything, and approves. Then it makes the proposal in Original Mechanical's format, with the scope, exclusions, an expiration date and an equipment price clause.</p>${tag("Your assemblies", "bl")} ${tag("Your markups", "bl")} ${tag("Price clause", "bl")}</div></div>`;
  };
  function estTotals() {
    const E = AX.est, sub = E.lines.reduce((a, l) => a + l[1] * l[3], 0), cont = sub * E.contingency, mk = (sub + cont) * E.markup;
    const el = document.getElementById("est-tot"); if (!el) return;
    el.innerHTML = `<div class="hb-total"><span>Direct cost</span><b class="num">${money(sub)}</b></div><div class="hb-total"><span>Contingency ${Math.round(E.contingency * 100)}%</span><b class="num">${money(cont)}</b></div><div class="hb-total"><span>Overhead and profit ${Math.round(E.markup * 100)}%</span><b class="num">${money(mk)}</b></div><div class="hb-total big"><span>Bid price</span><span class="num">${money(sub + cont + mk)}</span></div>`;
  }
  APP.estTotal = () => { const E = AX.est, sub = E.lines.reduce((a, l) => a + l[1] * l[3], 0); return Math.round(sub * (1 + E.contingency) * (1 + E.markup)); };

  M.bids = () => H("Builder radar", "Watching permits in 5 cities and your bid invites · 52 new this week · 5 fit you", `<button class="hb-b g">Sources</button>`)
    + `<div class="hb-card"><h4>${svgI("bid", 18)} New permits and invites, best first</h4><div class="tblwrap"><table class="hb-t"><tr><th>Fit</th><th>House or job</th><th>Source</th><th>Value</th><th>When</th><th>Why</th><th></th></tr>${AX.bids.feed.map(b => `<tr><td><b style="font-size:20px;color:${b.fit > 80 ? "#1d8a57" : b.fit > 60 ? "#a96a00" : "#c53030"}">${b.fit}</b></td><td><b>${esc(b.t)}</b><br><small style="color:#8a7b6d">${esc(b.city)} · ${esc(b.kind)}</small></td><td>${esc(b.src)}</td><td class="num">${esc(b.val)}</td><td>${esc(b.due)}</td><td style="max-width:240px;font-size:13px">${esc(b.why)}</td><td>${b.fit > 60 ? `<button class="hb-b" style="white-space:nowrap">${b.kind === "Commercial" ? "Draft bid" : "Intro to builder"}</button>` : tag("Skipped")}</td></tr>`).join("")}</table></div></div>
    <div class="hb-pipe">${[["Spotted", 5, [["Kessler, 9,420 sq ft", "Intro sent to the super"], ["Arcadia guest house", "Architect is Lumen"]]], ["Plans in", 3, [["DC Ranch residence", "Load calc at 80%"], ["Tempe office suite", "Due Nov 20"]]], ["Bid out", 4, [["Desert Highlands", "$164,300 · follow-up day 7"], ["Fountain Hills remodel", "$58,900 · Oct 28"]]], ["Won", 3, [["Silverleaf estate", "$212,000"], ["Arcadia casita", "$18,400"]]]].map(c => `<div class="col"><h5><span>${c[0]}</span><span>${c[1]}</span></h5>${c[2].map(i => `<div class="it"><b>${i[0]}</b><small>${i[1]}</small></div>`).join("")}</div>`).join("")}</div>
    <p style="font-size:13px;color:#7a6b5d;margin:12px 0 0">Win rate this year: 3 of 10 sent. Every bid gets a follow-up at 3, 7 and 14 days, and every loss records why, so you learn which builders are worth the hours.</p>`;

  M.receipts = () => H("Receipts", "Snapped, forwarded or swiped. Every one lands on a job", `<button class="hb-b g">Forward address</button>`)
    + `<div class="hb-kpis"><div class="hb-kpi"><small>This week</small><b>41</b><span>receipts in</span></div><div class="hb-kpi"><small>Matched by itself</small><b>40</b><span>98%</span></div><div class="hb-kpi"><small>Needs a tap</small><b>1</b><span class="dn">Crane, RTU set</span></div><div class="hb-kpi"><small>Typed by anyone</small><b>0</b><span>nothing retyped</span></div></div>
    <div class="hb-card"><h4>${svgI("receipt", 18)} Latest</h4>${AX.receipts.map(r => `<div class="hb-rc"><div class="thumb">${esc(r.vendor.toUpperCase())}<br>${esc(r.items.split("\n")[0])}<br>${money(r.amt, 2)}</div><div><b>${esc(r.vendor)} · ${money(r.amt, 2)}</b><small>${esc(r.where)} · ${esc(r.date)}</small><div class="why" style="${r.conf ? "" : "color:#c53030"}">${esc(r.how)}</div></div><div style="text-align:right">${r.conf ? tag(r.job, "bl") + `<br><small style="color:#8a7b6d">${r.conf}% sure</small>` : `<button class="hb-b r">Pick a job</button>`}</div></div>`).join("")}</div>
    <div class="hb-card"><h4>How it decides</h4><div class="hb-flow"><span>Whose card</span><i>+</i><span>Which house they were at</span><i>+</i><span>PO or job number on the slip</span><i>+</i><span>What was bought</span><i>→</i><span style="background:#f3e3cf;color:#7a4724">The job and cost code</span></div></div>`;

  M.billing = () => {
    const j = AX.jobs[0], tot = j.contract + j.co;
    const lines = [["Design, load calcs, submittals", 7400, 100], ["Underground duct", 9800, 100], ["Rough-in, duct and line sets", 52600, 85], ["Equipment, 4 systems", 47400, 40], ["Trim, grilles and linear slots", 18200, 0], ["Start-up, balancing, commissioning", 13200, 0], ["Change order #1", 6200, 100]];
    const prevB = 64000, done = lines.reduce((a, l) => a + l[1] * l[2] / 100, 0), ret = done * j.ret / 100, prev = prevB - prevB * j.ret / 100;
    return H("Draws", `Rough-in draw · ${esc(j.name)} · in the format Kessler's office pays from`, `<button class="hb-b g">Preview PDF</button><button class="hb-b r">Send with lien waiver</button>`)
      + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Line</th><th class="r">Scheduled value</th><th class="r">Done</th><th class="r">Earned</th></tr>${lines.map(l => `<tr><td>${l[0]}</td><td class="r num">${money(l[1])}</td><td class="r">${l[2]}%</td><td class="r num">${money(l[1] * l[2] / 100)}</td></tr>`).join("")}</table></div>
      <div style="max-width:380px;margin-left:auto;margin-top:10px"><div class="hb-total"><span>Earned to date</span><b class="num">${money(done)}</b></div><div class="hb-total"><span>Retention ${j.ret}%</span><b class="num">-${money(ret)}</b></div><div class="hb-total"><span>Paid on earlier draws</span><b class="num">-${money(prev)}</b></div><div class="hb-total big"><span>This draw</span><span class="num">${money(done - ret - prev)}</span></div></div></div>
      <div class="hb-3"><div class="hb-card"><h4>Attached by itself</h4><p style="margin:0;font-size:14px">Conditional waiver on progress payment, Arizona's statutory form · 8 rough-in photos · the passed rough inspection · signed change order #1</p></div><div class="hb-card"><h4>Then</h4><p style="margin:0;font-size:14px">Arizona's prompt-pay law gives the builder 7 days after they're paid. If it's late, day 8 starts interest at 1.5% a month, and the reminder writes itself.</p></div><div class="hb-card"><h4>Retention</h4><p style="margin:0;font-size:14px">${money(ret + prevB * j.ret / 100)} held so far. Its release date goes on the calendar the day start-up and the final pass.</p></div></div>`;
  };

  M.books = () => H("Books and payroll", "Every dollar by job, without QuickBooks if you'd rather not keep it", `<button class="hb-b g">Send to the CPA</button>`)
    + `<div class="hb-kpis"><div class="hb-kpi"><small>Revenue, Oct</small><b>${money(214600)}</b><span>↑ 9% on Sep</span></div><div class="hb-kpi"><small>Job costs</small><b>${money(158300)}</b><span>74%</span></div><div class="hb-kpi"><small>Overhead</small><b>${money(28900)}</b><span>trucks, tools, insurance</span></div><div class="hb-kpi"><small>Profit</small><b>${money(27400)}</b><span>12.8%</span></div></div>
    <div class="hb-2"><div class="hb-card"><h4>Profit by job, closed this year</h4>${[["Desert Mountain residence", 24.6], ["Camelback casita", 21.2], ["Red Mountain remodel", 16.4], ["Chandler office suite", 9.8], ["Las Sendas residence", -2.1]].map(r => `<div style="display:grid;grid-template-columns:170px 1fr 56px;gap:10px;align-items:center;font-size:14px;margin:7px 0"><span>${r[0]}</span><div class="pbar" style="height:10px"><i class="${r[1] < 0 ? "over" : ""}" style="width:${Math.abs(r[1]) * 4}%"></i></div><b class="num" style="text-align:right;color:${r[1] < 0 ? "#c53030" : "#2b1d13"}">${r[1]}%</b></div>`).join("")}</div>
    <div class="hb-card"><h4>${svgI("users", 18)} Payroll</h4><table class="hb-t"><tr><th>Week of Nov 2</th><th class="r">Hours</th><th>Went to</th></tr>${[["Marcus", 44, "Pinnacle Peak 44"], ["Diego", 40, "Silverleaf 24 · Arcadia 16"], ["Ramon", 42, "Mummy Mtn 30 · Las Sendas 12"], ["Tyler", 46, "Service 46 · 11 calls"], ["Jake", 40, "Pinnacle 16 · Silverleaf 24"]].map(r => `<tr><td>${r[0]}</td><td class="r">${r[1]}</td><td style="font-size:13px">${r[2]}</td></tr>`).join("")}</table><p style="font-size:13px;color:#7a6b5d;margin:10px 0 0">Hours come from the crew's phones, split by job and by install or service, and go to your payroll company (or run here).</p></div></div>
    <div class="hb-card"><h4>Keep QuickBooks, or don't</h4><p style="margin:0;font-size:14px;color:#4a3a2d">Option one: the Mechanical Room sends every receipt, invoice and payment to QuickBooks, already coded by job. Option two: the Mechanical Room keeps the books itself (chart of accounts, bank feeds, job costing, 1099s) and your CPA gets a clean export each month and at tax time.</p></div>`;

  M.subs = () => H("Builders", "Who sends you work, how fast they pay, and what they're building next", `<button class="hb-b g">Add a builder</button>`)
    + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Company</th><th>Type</th><th>On jobs</th><th>Pays</th><th>Notes</th><th></th></tr>${AX.subs.map(s => `<tr><td><b>${esc(s[0])}</b></td><td>${esc(s[1])}</td><td>${esc(s[2])}</td><td>${esc(s[3])}</td><td>${esc(s[4])}</td><td>${tag(s[5] === "ok" ? "Good" : s[5] === "warn" ? "Watch" : "Hold", cls[s[5]])}</td></tr>`).join("")}</table></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Their next houses</h4><p style="margin:0;font-size:14px">Each builder's new permits show up on their record from the Builder radar, so you call about the next house before it's bid.</p></div><div class="hb-card"><h4>Who's worth it</h4><p style="margin:0;font-size:14px">Bids sent, won, margin on each house, change orders paid, and days to pay. The builders worth your hours rise to the top.</p></div><div class="hb-card"><h4>Paperwork they want</h4><p style="margin:0;font-size:14px">Your W-9, insurance certificate and license go out when a builder asks, and renew before they expire.</p></div></div>`;

  M.paperwork = () => H("Notices and permits", "Arizona's deadlines, tracked so nobody has to remember them")
    + `<div class="hb-2"><div class="hb-card"><h4>${svgI("shield", 18)} Notices and waivers</h4><table class="hb-t">${AX.liens.map(l => `<tr><td><b>${esc(l[0])}</b><br><small style="color:#8a7b6d">${esc(l[1])} · ${esc(l[2])}</small></td><td>${tag(l[3], cls[l[4]])}</td></tr>`).join("")}</table></div>
    <div class="hb-card"><h4>${svgI("file", 18)} Permits and inspections</h4><table class="hb-t">${AX.permits.map(p => `<tr><td><b>${esc(p[0])}</b><br><small style="color:#8a7b6d">${esc(p[1])} · ${esc(p[2])}</small></td><td>${tag(p[3], cls[p[4]])}</td></tr>`).join("")}</table></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Homeowner jobs</h4><p style="margin:0;font-size:14px">When you contract a homeowner directly, the prompt-pay notice Arizona requires is printed on the front of every estimate and invoice.</p></div><div class="hb-card"><h4>Owner-occupied homes</h4><p style="margin:0;font-size:14px">On an owner-occupant's house, a sub hired by the builder may have no lien right. Those jobs get flagged, so pay days are watched closer.</p></div><div class="hb-card"><h4>Refrigerant and A2L</h4><p style="margin:0;font-size:14px">EPA certifications, A2L training and refrigerant logs by system, kept with each tech's record.</p></div></div>`;

  M.field = () => H("Field", "What the crew sends from their phones, filed to the job")
    + `<div class="hb-2"><div class="hb-card"><h4>${svgI("camera", 18)} Daily log · Pinnacle Peak · Wed Nov 11</h4><div class="hb-files" style="grid-template-columns:repeat(3,1fr);margin-bottom:10px">${["IMG_5188", "IMG_5187", "IMG_5174"].map(p => `<div class="hb-file"><div class="pv" style="background-image:url(img/work/${p}.jpg)"></div></div>`).join("")}</div>
      <p style="font-size:14px;margin:0;color:#4a3a2d"><b>Marcus (voice note, written out):</b> Systems 1 and 2 roughed in, ready for tomorrow's inspection. Plumber's vent is in our chase at the primary closet, needs a 6-inch offset. 2 on site, 10 hours each.</p>
      <p style="font-size:13px;color:#1d8a57;font-weight:700;margin:10px 0 0">The Mechanical Room texted the builder's super a photo of the vent conflict and drafted a change order for the offset.</p></div>
    <div class="hb-card"><h4>${svgI("check", 18)} Start-up checklist · Las Sendas</h4><table class="hb-t">${[["Static pressure, all 3 systems", "Ramon", "ok"], ["Airflow balance, room by room", "Ramon", "ok"], ["Charge check, R-454B", "Ramon", "warn"], ["Thermostats and zoning set up", "Ramon", "warn"], ["Owner walk-through and warranty papers", "Skylar", "b"]].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${tag(r[2] === "ok" ? "Done" : r[2] === "warn" ? "Open" : "Fri", cls[r[2]])}</td></tr>`).join("")}</table>
    <p style="font-size:13px;color:#7a6b5d;margin:10px 0 0">When the last item closes, the equipment and serials go to the installed base, the warranty is registered, and the owner gets a review request.</p></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Trucks and tools</h4><p style="margin:0;font-size:14px">Registration, oil changes, gauges and recovery machines, with calibration dates.</p></div><div class="hb-card"><h4>Warranty callbacks</h4><p style="margin:0;font-size:14px">An owner's call becomes a ticket on the original house, with its equipment, serials, photos and who set it.</p></div><div class="hb-card"><h4>Equipment prices</h4><p style="margin:0;font-size:14px">Supply house prices from your receipts over time, so you see an increase before you bid, not after you sign.</p></div></div>`;

  M.reinspect = () => H("Installed base", "Every system you've set is a service customer. The Mechanical Room remembers")
    + `<div class="hb-card"><h4>${svgI("repeat", 18)} Houses, equipment and what's next</h4><table class="hb-t"><tr><th>House</th><th>Equipment</th><th>City</th><th>Installed</th><th>Next</th></tr>${AX.reinspect.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${tag(r[1], "bl")}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`).join("")}</table></div>
    <div class="hb-3"><div class="hb-card"><h4>Spring tune-ups</h4><p style="margin:0;font-size:14px">Every February, each house on a plan gets a booking text before the heat. The schedule fills before the phones ring.</p></div><div class="hb-card"><h4>Warranty, registered</h4><p style="margin:0;font-size:14px">Model and serial from the start-up photos. Registration done the week of install, so the longer warranty is never lost.</p></div><div class="hb-card"><h4>Replacement, on time</h4><p style="margin:0;font-size:14px">Systems at year 10 or later get flagged in the fall, with the SRP rebate filled in, before they fail in July.</p></div></div>`;

  M.listings = () => H("Listings and reviews", "One profile. Every place Original Mechanical is found")
    + `<div class="hb-card"><table class="hb-t"><tr><th>Where</th><th>Name and phone</th><th>Hours</th><th>Website</th><th>Reviews</th></tr>${[["Google Business Profile", "New", "New", "Added", "0 → asking 12 past owners"], ["SRP contractor list", "New", "New", "Added", "rebate leads"], ["Houzz", "New", "New", "Added", "project photos"], ["HBACA directory", "New", "New", "Added", "builders find you"], ["Instagram", "Fixed", "Fixed", "Added", "0 posts → finished houses"], ["BuildZoom", "Claimed", "Fixed", "Added", "license shown"], ["Yelp and Nextdoor", "New", "New", "Added", "service reviews"]].map(r => `<tr><td><b>${r[0]}</b></td>${r.slice(1, 4).map(c => `<td>${tag(c, /Fixed|Added|New/.test(c) ? "ok" : "")}</td>`).join("")}<td>${esc(r[4])}</td></tr>`).join("")}</table></div>
    <div class="hb-2"><div class="hb-card"><h4>${svgI("star", 18)} Review requests</h4><p style="margin:0;font-size:14px;color:#4a3a2d">When a house's start-up closes, the owner and the builder each get a short text from Skylar with a link to Google. Happy clients post. Unhappy ones reach Skylar first.</p></div><div class="hb-card"><h4>${svgI("mail", 18)} Every lead in one inbox</h4><p style="margin:0;font-size:14px;color:#4a3a2d">Website, Google, SRP, Houzz, phone calls, permits and bid invites, each with where it came from, so you know which door earns its keep.</p></div></div>`;

  M.ask = () => H("Ask Original", "Ask the business anything, by typing or from your phone")
    + `<div class="hb-card"><div class="hb-chat"><div class="m u">What have we spent at Johnstone on Pinnacle Peak?</div><div class="m a">${money(18412.36)} across 19 receipts since Aug 30. The biggest was ${money(1186.42)} on Nov 4 (flex duct and mastic). That's 41% of Pinnacle Peak's duct and material budget.</div><div class="m u">Kessler moved drywall up. Who can help Marcus Thursday and Friday?</div><div class="m a">Jake is free both days, and Ramon finishes Mummy Mountain trim Wednesday. Want me to put Jake on Pinnacle Peak and tell Dan the chases close Friday?</div><div class="m u">Yes, Jake. Tell Dan.</div><div class="m a">Done. Jake is on Pinnacle Peak Thursday and Friday at 6:30. I drafted a text to Dan for you to send: "Hi Dan, Skylar at Original Mechanical. Rough is ready for inspection, chases close Friday."</div></div><div class="hb-in"><input placeholder="Ask about any house, receipt, builder or bid"><button class="hb-b">Ask</button></div></div>`;

  /* ---------- Auto-filed: emails from people on a job file themselves ---------- */
  let mailSel = 0;
  M.inbox = () => {
    const m = AX.inbox[mailSel], j = J(m.job);
    const step = (ic, h, body, tg) => `<div class="hb-alert"><span class="dot" style="background:${tg || "#7a4724"}"></span><div style="flex:1"><b>${svgI(ic, 15)} ${h}</b><small>${body}</small></div></div>`;
    return H("Auto-filed", "Email from anyone already on a job is read, filed and acted on. Nothing to drag, nothing to retype", `<button class="hb-b g">Rules</button>`)
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Emails this week</small><b>63</b><span>from 19 people on jobs</span></div><div class="hb-kpi"><small>Filed by itself</small><b>61</b><span>97%</span></div><div class="hb-kpi"><small>Deadlines found</small><b>9</b><span>all on the calendar</span></div><div class="hb-kpi"><small>Attachments saved</small><b>34</b><span>plans, quotes, photos</span></div></div>
      <div class="hb-2" style="grid-template-columns:1fr 1.25fr"><div class="hb-card" style="padding:8px">${AX.inbox.map((x, i) => `<div class="hb-mail" data-mail="${i}" style="cursor:pointer;border-radius:10px;padding:10px;${i === mailSel ? "background:#f4ebe0" : ""}"><span class="av">${x.av}</span><div><b>${esc(x.from)}</b> · ${esc(x.subj)}<small>Filed to ${esc(J(x.job).name)} · ${x.att.length} attachment${x.att.length > 1 ? "s" : ""}${x.due ? " · deadline found" : ""}</small></div><small>${esc(x.time)}</small></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("mail", 18)} ${esc(m.subj)}</h4><p style="font-size:13px;color:#7a6b5d;margin:-4px 0 8px">${esc(m.who)} · ${esc(m.from)} · ${esc(m.time)}</p>
        <p style="font-size:14px;background:#faf6f1;border-radius:10px;padding:10px 12px;margin:0 0 12px;color:#3a2b1f">${esc(m.body)}</p>
        <h4 style="margin-top:4px">What the Mechanical Room did ${tag("automatic", "ok")}</h4>
        ${step("folder", `Filed to ${esc(j.name)}`, esc(m.why), j.color)}
        ${step("file", `Saved ${m.att.length} attachment${m.att.length > 1 ? "s" : ""} to the job file`, m.att.map(a => `${esc(a[0])} (${esc(a[1])})`).join(" · "))}
        ${step("book", "Added a note to the job log", esc(m.note))}
        ${m.due ? step("cal", `Put the deadline on the calendar: ${esc(m.due[1])}`, `${esc(m.due[0])} · ${esc(m.due[2])}`, "#e07a2e") : ""}
        ${m.task ? step("users", `Made a task for ${esc(m.task[1])}, and texted them`, esc(m.task[0]), "#f5a623") : ""}
        ${m.money ? step("money", `${esc(m.money[0])}: ${esc(m.money[1])}`, esc(m.money[2]), "#2fd389") : ""}
      </div></div>`;
  };

  /* ---------- Crew and texts: the roster, who's free, texting, everyone's week ---------- */
  const NEXT = { job: "Silverleaf estate, equipment set", when: "Mon Nov 16, 6:30 a.m.", where: "Scottsdale", need: "2 installers and the apprentice to set 3 air handlers" };
  const crew = { pick: new Set(["Diego Morales", "Ramon Ortiz", "Tyler Brooks"]), asked: false, sent: false, tab: "roster" };
  const REPLY = { "Diego Morales": ["YES", "Yes, I'm in. Gate code?"], "Ramon Ortiz": ["YES", "Yes, Mummy Mtn wraps Wed."], "Jake Lindqvist": ["YES", "Yes"], "Tyler Brooks": ["NO", "Booked on service all Monday."], "Marcus Reyes": ["NO", "Pinnacle Peak, drywall Monday."], "Skylar Nichols": ["YES", "👍"] };
  const first = n => n.split(" ")[0];
  const stTag = p => p.st === "free" ? tag(p.free || "Free", "ok") : p.st === "soon" ? tag(p.free, "warn") : tag("On " + p.on, "bl");
  M.crew = () => {
    const tabs = `<div class="hb-tabs">${[["roster", "Roster and next job"], ["texts", "Texts"], ["week", "Everyone's week"]].map(t => `<button data-ctab="${t[0]}" class="${crew.tab === t[0] ? "on" : ""}">${t[1]}</button>`).join("")}</div>`;
    let body = "";
    if (crew.tab === "roster") body = `<div class="hb-card" style="background:#2b1d13;color:#fff;border:0"><div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><small style="color:#e6c7a0;font-weight:800;letter-spacing:.08em">NEXT JOB TO STAFF</small><b style="display:block;font-size:20px">${NEXT.job}</b><span style="font-size:14px;opacity:.85">${NEXT.when} · ${NEXT.where} · needs ${NEXT.need}</span></div><button class="hb-b r" data-act="ask">${crew.asked ? "Asked ✓" : `Ask the ${crew.pick.size} picked if they're free`}</button></div></div>
      <div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th></th><th>Name</th><th>Role and skills</th><th>Phone</th><th>Right now</th>${crew.asked ? "<th>Reply</th>" : ""}</tr>${AX.team.map(p => { const r = REPLY[p.n]; return `<tr><td><input type="checkbox" data-pick="${esc(p.n)}"${crew.pick.has(p.n) ? " checked" : ""} aria-label="Pick ${esc(p.n)}"></td><td><b>${esc(p.n)}</b></td><td>${esc(p.r)}<br><small style="color:#8a7b6d">${p.sk.map(esc).join(" · ")}</small></td><td class="num" style="white-space:nowrap">${esc(p.ph)}</td><td>${stTag(p)}</td>${crew.asked ? `<td>${crew.pick.has(p.n) ? (r[0] === "YES" ? tag("Yes", "ok") : tag("No", "bad")) + `<br><small style="color:#8a7b6d">"${esc(r[1])}"</small>` : ""}</td>` : ""}</tr>`; }).join("")}</table></div>
      <p style="font-size:13px;color:#7a6b5d;margin:10px 0 0">${crew.asked ? `Everyone who said yes is on the calendar for ${NEXT.job}, and the job's crew list is set. ${[...crew.pick].filter(n => REPLY[n][0] === "NO").map(first).join(" and ") || "Nobody"} said no, so the Mechanical Room suggests ${AX.team.find(p => p.st === "free" && !crew.pick.has(p.n)) ? first(AX.team.find(p => p.st === "free" && !crew.pick.has(p.n)).n) : "the next free person"}.` : "Tick who you want, then ask. Each person gets a text and answers YES or NO. Their answers fill in the calendar."}</p></div>`;
    if (crew.tab === "texts") {
      const asked = [...crew.pick];
      body = `<div class="hb-2"><div class="hb-card"><h4>${svgI("chat", 18)} ${crew.asked ? "Who's free Monday?" : "Crew texts"}</h4><div class="hb-chat">
        ${crew.asked ? `<div class="m u">Original: Can you work ${NEXT.job}, ${NEXT.when}, ${NEXT.where}? Reply YES or NO.</div><small style="align-self:flex-end;color:#8a7b6d;font-size:12px">To ${asked.map(first).join(", ")}</small>${asked.map(n => `<div class="m a"><b>${esc(first(n))}:</b> ${esc(REPLY[n][1])}</div>`).join("")}` : `<div class="m a" style="color:#7a6b5d">No texts yet today. Pick people on the roster and ask who's free, or write to anyone below.</div>`}
        ${crew.sent ? `<div class="m u">Original: Your week is in your email and texted below. Reply with any questions.</div><small style="align-self:flex-end;color:#8a7b6d;font-size:12px">To all 6</small>` : ""}
      </div><div class="hb-in"><input placeholder="Text Marcus, the Pinnacle Peak crew, or everyone" aria-label="Text message"><button class="hb-b">Send</button></div></div>
      <div class="hb-card"><h4>${svgI("phone", 18)} Texts go out from the shop's number</h4><p style="font-size:14px;color:#4a3a2d;margin:0 0 8px">Every text comes from one Original Mechanical number, so personal phones stay personal. Replies land here and on Skylar's phone, filed to the job they're about.</p>${["Text one person, a job's crew, or everyone", "YES and NO replies update the calendar", "Delivery, inspection and service reminders go out by themselves", "Every number stored once, kept current"].map(t => `<div class="hb-alert"><span class="dot g"></span><div>${t}</div></div>`).join("")}</div></div>`;
    }
    if (crew.tab === "week") body = `<div class="hb-card" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><b style="color:#2b1d13">Sunday at 6 p.m., everyone gets their week</b><br><small style="color:#7a6b5d">An email with each day's house, address, task, mechanical sheet and which super to call, plus a text each morning. Changes go out the minute they happen.</small></div><button class="hb-b r" data-act="send">${crew.sent ? "Sent to all 6 ✓" : "Send everyone's week now"}</button></div>${APP.staffEmail("Marcus Reyes")}`;
    return H("Crew and texts", "Everyone's number, who's free, who's where, and texts from the app") + tabs + body;
  };
  const JOB_ADDR = { "OM-118": "Pinnacle Peak Rd lot, Scottsdale (sample)", "OM-121": "Mummy Mountain Rd, Paradise Valley (sample)", "OM-124": "Silverleaf, Scottsdale (sample)", "OM-115": "Las Sendas, Mesa (sample)", "OM-126": "Gilbert (sample)", "OM-127": "Arcadia, Phoenix (sample)" };
  const JOB_DO = { "OM-118": ["Trunk lines, system 3", "Line sets, systems 3 and 4", "Inspection prep, seal and label", "Rough inspection 7:30, then chases", "Close chases before drywall"], "OM-124": ["Seal 2 boots", "Reinspection", "Take equipment delivery", "Stands for air handlers", "Set 3 air handlers"] };
  APP.staffEmail = name => {
    const short = first(name), row = AX.week.rows[short] || [];
    return `<div class="hb-card" style="max-width:640px;color:#22180f;background:#fff"><div style="font-size:13px;color:#7a6b5d;border-bottom:1px solid #f1e9df;padding-bottom:8px;margin-bottom:10px">From <b>The Mechanical Room</b> · To ${esc(name)} · Subject: <b style="color:#2b1d13">Your week, Nov 9 to 13</b></div>
      <p style="margin:0 0 10px;font-size:15px">Hi ${esc(short)}, here's where you're working this week.</p>
      <table class="hb-t"><tr><th>Day</th><th>Job and address</th><th>What to do</th></tr>${row.map((c, i) => { const j = J(c); return `<tr><td style="white-space:nowrap"><b>${AX.week.days[i]}</b></td><td>${j.id ? `<b style="color:${j.color}">${esc(j.name)}</b><br><small style="color:#8a7b6d">${esc(JOB_ADDR[j.id] || j.city)}</small>` : esc(c)}</td><td style="font-size:13.5px">${j.id ? esc((JOB_DO[j.id] || [])[i] || "See the daily plan") : ""}</td></tr>`; }).join("")}</table>
      <p style="font-size:13.5px;color:#4a3a2d;margin:12px 0 0">6:30 a.m. start every day. Mechanical sheets and gate codes are in the app. Questions: Skylar, (480) 555-0128.</p></div>`;
  };

  /* ---------- the portal ---------- */
  APP.hubMods = MODS;
  APP.hub = (mod, opts) => {
    mod = M[mod] ? mod : "today";
    return `<div class="hb" data-hub>${opts && opts.noside ? "" : `<div class="hb-side"><div class="hb-me"><img src="img/mark-white.png?v=1794181557" alt=""><div><b>Mechanical Room</b><small>Original Mechanical</small></div></div>${MODS.map(m => `<button data-mod="${m[0]}" class="${m[0] === mod ? "on" : ""}">${svgI(m[2], 17)}<span>${m[1]}</span>${m[3] ? `<em>${m[3]}</em>` : ""}</button>`).join("")}</div>`}<div class="hb-main">${M[mod]()}</div></div>`;
  };
  function swap(hb, mod, tab) {
    hb.querySelector(".hb-main").innerHTML = M[mod](tab);
    hb.querySelectorAll(".hb-side button").forEach(b => b.classList.toggle("on", b.dataset.mod === mod));
    hb.dataset.cur = mod;
    if (mod === "estimate") estTotals();
  }
  document.addEventListener("click", e => {
    const hb = e.target.closest("[data-hub]"); if (!hb) return;
    const b = e.target.closest("button[data-mod]"); if (b) { swap(hb, b.dataset.mod); return; }
    const g = e.target.closest("[data-go]"); if (g && M[g.dataset.go]) { swap(hb, g.dataset.go); return; }
    const t = e.target.closest("[data-tab]"); if (t) { swap(hb, "schedule", t.dataset.tab); return; }
    const ml = e.target.closest("[data-mail]"); if (ml) { mailSel = +ml.dataset.mail; swap(hb, "inbox"); return; }
    const ct = e.target.closest("[data-ctab]"); if (ct) { crew.tab = ct.dataset.ctab; swap(hb, "crew"); return; }
    const pk = e.target.closest("[data-pick]"); if (pk) { pk.checked ? crew.pick.add(pk.dataset.pick) : crew.pick.delete(pk.dataset.pick); crew.asked = false; swap(hb, "crew"); return; }
    const ac = e.target.closest("[data-act]"); if (ac) { if (ac.dataset.act === "ask" && crew.pick.size) crew.asked = true; if (ac.dataset.act === "send") crew.sent = true; swap(hb, "crew"); return; }
  });
  document.addEventListener("input", e => {
    const i = e.target; if (!i.closest("[data-hub]") || !(i.dataset.q || i.dataset.p)) return;
    const k = +(i.dataset.q || i.dataset.p), v = parseFloat(i.value) || 0;
    AX.est.lines[k][i.dataset.q ? 1 : 3] = v;
    const ln = document.querySelector(`[data-ln="${k}"]`); if (ln) ln.textContent = money(AX.est.lines[k][1] * AX.est.lines[k][3]);
    estTotals();
  });
  document.addEventListener("ax-render", () => { if (document.getElementById("est-tot")) estTotals(); });
})();
