/* The Field Office: a clickable mock of Apex's back office portal. Every module reads the sample data in data.js.
   APP.hub(mod) draws the whole portal opened on one module; clicks in its side menu switch modules in place. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI, money } = APP;
  const J = id => AX.jobs.find(j => j.id === id) || {};
  const jobByName = n => AX.jobs.find(j => j.name === n) || {};
  const tag = (t, c) => `<span class="tag ${c || ""}">${esc(t)}</span>`;
  const cls = { ok: "ok", warn: "warn", bad: "bad", b: "bl" };
  const bar = (p, over) => `<div class="pbar"><i class="${over ? "over" : ""}" style="width:${Math.min(100, p)}%"></i></div>`;

  const MODS = [
    ["today", "Today", "bolt", 5], ["schedule", "Calendar", "cal"], ["crew", "Crew and texts", "chat"], ["projects", "Projects", "folder"], ["inbox", "Auto-filed", "mail", 4], ["estimate", "Estimator", "est"], ["bids", "Bid engine", "bid", 3],
    ["receipts", "Receipts", "receipt", 1], ["billing", "Billing", "money"], ["books", "Books and payroll", "book"], ["subs", "Subs and vendors", "users", 2],
    ["paperwork", "Liens and permits", "shield", 1], ["field", "Field", "camera"], ["reinspect", "Repeat work", "repeat"], ["listings", "Listings", "star"], ["ask", "Ask Apex", "chat"],
  ];

  const H = (title, sub, btns) => `<div class="hb-h"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ""}</div><span class="sp">${btns || ""}<span class="sample">Sample</span></span></div>`;

  /* ---------- modules ---------- */
  const M = {};
  M.today = () => {
    const contract = AX.jobs.reduce((a, j) => a + j.contract + j.co, 0), billed = AX.jobs.reduce((a, j) => a + j.billed, 0), spent = AX.jobs.reduce((a, j) => a + j.spent, 0);
    return H("Good morning, Kameron", "Thursday, November 12 · 6 jobs running · 6 people on site")
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Under contract</small><b>${money(contract)}</b><span>6 active jobs</span></div><div class="hb-kpi"><small>Billed to date</small><b>${money(billed)}</b><span>${Math.round(billed / contract * 100)}% of contract</span></div><div class="hb-kpi"><small>Spent to date</small><b>${money(spent)}</b><span class="dn">1 job over pace</span></div><div class="hb-kpi"><small>Owed to you</small><b>${money(86400)}</b><span>2 draws out, 1 retention</span></div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("cal", 18)} Today ${tag("Calendar")}</h4>${AX.today.map(t => `<div class="hb-alert"><span class="dot ${t[3] === "r" ? "r" : t[3] === "y" ? "y" : ""}"></span><div><b>${esc(t[0])} · ${esc(t[1])}</b><small>${esc(t[2])}</small></div></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("bolt", 18)} Needs you ${tag("5", "race")}</h4>${AX.alerts.map(a => `<div class="hb-alert" data-go="${a[3]}" style="cursor:pointer"><span class="dot ${a[0] === "b" ? "" : a[0]}"></span><div><b>${esc(a[1])}</b><small>${esc(a[2])}</small></div></div>`).join("")}</div></div>
      <div class="hb-card"><h4>${svgI("folder", 18)} Jobs at a glance</h4>${jobsTable()}</div>`;
  };
  function jobsTable() {
    return `<div class="tblwrap"><table class="hb-t"><tr><th>Job</th><th>Work</th><th class="r">Contract</th><th>Done</th><th>Spent of budget</th><th></th></tr>${AX.jobs.map(j => { const budget = (j.contract + j.co) * 0.78, sp = j.spent / budget * 100; return `<tr data-go="projects" style="cursor:pointer"><td><b>${esc(j.name)}</b><br><small style="color:#7a829c">${j.id} · ${esc(j.city)}</small></td><td>${esc(j.kind)}</td><td class="r num">${money(j.contract + j.co)}</td><td style="width:120px">${bar(j.pct)}<small>${j.pct}%</small></td><td style="width:140px">${bar(sp, sp > j.pct + 8)}<small>${Math.round(sp)}%</small></td><td>${tag(j.status === "ok" ? "On track" : j.status === "warn" ? "Watch" : "Over", cls[j.status])}</td></tr>`; }).join("")}</table></div>`;
  }

  M.schedule = (tab) => {
    tab = tab || "day";
    const tabs = `<div class="hb-tabs">${[["day", "Today"], ["week", "Crew week"], ["timeline", "Timelines and budgets"]].map(t => `<button data-tab="${t[0]}" class="${tab === t[0] ? "on" : ""}">${t[1]}</button>`).join("")}</div>`;
    let body = "";
    if (tab === "day") body = `<div class="hb-2"><div class="hb-card"><h4>Thursday, Nov 12</h4>${AX.today.map(t => `<div class="hb-alert"><span class="dot ${t[3] === "r" ? "r" : t[3] === "y" ? "y" : ""}"></span><div><b>${esc(t[0])} · ${esc(t[1])}</b><small>${esc(t[2])}</small></div></div>`).join("")}</div>
      <div><div class="hb-card"><h4>What has to happen today, by job</h4>${[["Bayview Terrace", "Set 14 joists, Building C, units 3 to 6", "Luis, Eli"], ["Estudillo Ave", "Inspection at 10, then hold-downs line 4", "Marco"], ["Marina Blvd", "Close up the west wall, siding starts Monday", "Dave"], ["Davis St", "Restroom framing if the change order is signed", "Tony"]].map(r => `<div class="hb-alert"><span class="dot"></span><div><b>${r[0]}</b><small>${r[1]} · ${r[2]}</small></div></div>`).join("")}</div>
      <div class="hb-card"><h4>The crew's phones got</h4><p style="font-size:14px;margin:0;color:#3a4366">Each person's day at 6 a.m.: the address, the gate code, the plan sheet they need, and who to call. Changes go out as a text.</p></div></div></div>`;
    if (tab === "week") body = weekBoard();
    if (tab === "timeline") body = timeline();
    return H("Calendar", "Crew, inspections, deliveries, deadlines and budgets on one calendar", `<button class="hb-b g">Sync to Google Calendar</button>`) + tabs + body;
  };
  function weekBoard() {
    const W = AX.week;
    return `<div class="hb-cal"><div class="hd"></div>${W.days.map(d => `<div class="hd">${d}</div>`).join("")}${AX.crew.map(p => `<div class="nm">${p}</div>${W.rows[p].map(c => { const j = J(c); return j.id ? `<div class="j" style="background:${j.color}">${esc(j.name)}</div>` : `<div style="color:#7a829c">${esc(c)}</div>`; }).join("")}`).join("")}</div>
      <p style="font-size:13px;color:#6b7390;margin:10px 0 0">Drag a name to move someone. Hours they clock in on site add up per job, so labor cost is never a guess.</p>`;
  }
  APP.hubMini = k => `<div class="hb-main" style="padding:18px;max-height:none;grid-column:1/-1">${k === "week" ? weekBoard() : ""}</div>`;
  function timeline() {
    const weeks = 20;
    return `<div class="hb-card"><h4>Next 20 weeks</h4><div style="display:grid;grid-template-columns:170px 1fr;gap:6px 12px;align-items:center;font-size:13px">
      <div></div><div style="display:grid;grid-template-columns:repeat(${weeks},1fr);font-size:10px;color:#9aa3bd">${Array.from({ length: weeks }, (_, i) => `<span>${i % 4 === 0 ? ["Nov", "Dec", "Jan", "Feb", "Mar"][i / 4] : ""}</span>`).join("")}</div>
      ${AX.jobs.map(j => { const b = (j.contract + j.co) * 0.78, sp = Math.round(j.spent / b * 100); return `<div><b style="color:#0b1240">${esc(j.name)}</b><br><small style="color:#7a829c">${sp}% of budget spent · ${j.pct}% done</small></div><div style="position:relative;height:26px;background:repeating-linear-gradient(90deg,#f4f6fb 0 calc(100%/${weeks} - 1px),#e9ecf4 0 calc(100%/${weeks}))"><span style="position:absolute;left:${j.start / weeks * 100}%;width:${j.len / weeks * 100}%;top:3px;bottom:3px;border-radius:7px;background:${j.color}33;border:1px solid ${j.color}"><i style="display:block;height:100%;width:${j.pct}%;background:${j.color};border-radius:6px"></i></span></div>`; }).join("")}</div>
      <p style="font-size:13px;color:#6b7390;margin:12px 0 0">Each bar is the job's schedule, filled by how much is done. Slip a date and every crew day, delivery and inspection after it moves too.</p></div>`;
  }

  M.projects = () => {
    const j = AX.jobs[0];
    const files = [["plan", "A-201 Balcony framing plan, rev 3", "Architect · PDF · today"], ["plan", "S-1 Structural details", "Engineer · PDF"], ["img/work/balcony-reframe-lift.jpg?v=1793932919", "Bldg C, unit 4 opened up", "Luis · photo · 7:42 a.m."], ["img/work/beam-walkway.jpg?v=1793932919", "Ledger rot at unit 6", "Luis · photo"], ["doc", "SB-326 inspection report", "Inspector · PDF"], ["doc", "Contract and scope, signed", "PDF"], ["doc", "Change order #2, signed", "$14,200"], ["img/work/balcony-reframe.jpg?v=1793932919", "Bldg A finished", "Kameron · photo"]];
    const mail = [["DF", "Diaz Framing", "RE: Bayview Bldg C, joist count", "Filed here because Diaz is on this job and the email says Bayview", "8:02"], ["PC", "Pacific Coatings", "Quote: walkable membrane, 540 SF", "Quote pulled out: $9,045. Added to the estimate", "Tue"], ["AR", "Architect, Rivera Studio", "Rev 3 drawings attached", "A-201 rev 3 replaced rev 2. Changes highlighted", "Mon"], ["HM", "HOA manager", "Board approved change order #2", "Change order marked approved", "Mon"]];
    return H(`${esc(j.name)} <span style="font-weight:600;color:#7a829c;font-size:16px">${j.id}</span>`, `${esc(j.kind)} · ${esc(j.city)} · ${money(j.contract + j.co)} with changes · ${j.pct}% done`, `<button class="hb-b g">All projects</button><button class="hb-b">Add files</button>`)
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Contract + changes</small><b>${money(j.contract + j.co)}</b><span>2 change orders</span></div><div class="hb-kpi"><small>Spent</small><b>${money(j.spent)}</b><span>${Math.round(j.spent / ((j.contract + j.co) * .78) * 100)}% of budget</span></div><div class="hb-kpi"><small>Billed</small><b>${money(j.billed)}</b><span>Draw #4 due today</span></div><div class="hb-kpi"><small>Retention held</small><b>${money(j.billed * j.ret / 100)}</b><span>${j.ret}%</span></div></div>
      <div class="hb-card"><h4>${svgI("file", 18)} Plans, photos and documents ${tag("38 files")}</h4><div class="hb-files">${files.map(f => `<div class="hb-file"><div class="pv ${f[0] === "plan" ? "plan" : ""}" ${f[0].startsWith("img") ? `style="background-image:url(${f[0]})"` : ""}>${f[0] === "plan" ? "PLAN SHEET" : f[0] === "doc" ? "PDF" : ""}</div><div><b>${esc(f[1])}</b><small>${esc(f[2])}</small></div></div>`).join("")}</div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("mail", 18)} Emails, filed automatically ${tag("from 4 people on this job", "ok")}</h4>${mail.map(m => `<div class="hb-mail"><span class="av">${m[0]}</span><div><b>${esc(m[1])}</b> · ${esc(m[2])}<small>${esc(m[3])}</small></div><small>${m[4]}</small></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("users", 18)} Who's on this job</h4><table class="hb-t">${[["Diaz Framing", "Framing", "Sub"], ["Pacific Coatings", "Waterproofing", "Sub"], ["Bay Rail", "Guardrails", "Sub"], ["Home Depot Pro", "Lumber and hardware", "Vendor"], ["Rivera Studio", "Architect", "Design"], ["HOA manager", "Owner's rep", "Client"]].map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${tag(r[2])}</td></tr>`).join("")}</table></div></div>`;
  };

  M.estimate = () => {
    const E = AX.est;
    const rows = E.lines.map((l, i) => `<tr><td><b>${esc(l[0])}</b></td><td class="r"><input data-q="${i}" value="${l[1]}" inputmode="decimal"></td><td>${esc(l[2])}</td><td class="r"><input data-p="${i}" value="${l[3]}" inputmode="decimal"></td><td class="r num" data-ln="${i}">${money(l[1] * l[3])}</td><td>${tag(l[4], l[4].includes("cost book") || l[4].includes("Last") ? "bl" : "")}</td></tr>`).join("");
    return H("Estimator", esc(E.job) + " · from the architect's PDF, the inspection report and 41 site photos", `<button class="hb-b g">Upload plans</button><button class="hb-b r">Make the proposal</button>`)
      + `<div class="hb-3" style="margin-bottom:14px">${[["file", "Read A-201 and S-1", "84 LF of joists, 6 balconies, 132 LF of rail counted from the plan sheets"], ["camera", "Read 41 site photos", "Rot at 2 ledgers the plans don't show. Added a line for it"], ["book", "Priced from your cost book", "Your real cost on the last 3 balcony jobs, plus today's supplier prices"]].map(c => `<div class="hb-card" style="margin:0"><h4>${svgI(c[0], 18)} ${c[1]}</h4><p style="margin:0;font-size:13.5px;color:#4b5470">${c[2]}</p></div>`).join("")}</div>
      <div class="hb-card hb-est"><div class="tblwrap"><table class="hb-t"><tr><th>Line</th><th class="r">Qty</th><th></th><th class="r">Unit cost</th><th class="r">Total</th><th>Where the number came from</th></tr>${rows}</table></div>
      <div style="max-width:380px;margin-left:auto;margin-top:12px" id="est-tot"></div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("repeat", 18)} How close were we last time?</h4><table class="hb-t"><tr><th>Past balcony job</th><th class="r">Estimate</th><th class="r">Actual</th><th class="r">Off by</th></tr>${[["Palma Ct, 8 balconies", 96400, 101900], ["Elm St, 4 balconies", 41200, 39800], ["Marina Blvd, phase 1", 58800, 63100]].map(r => `<tr><td>${r[0]}</td><td class="r num">${money(r[1])}</td><td class="r num">${money(r[2])}</td><td class="r num" style="color:${r[2] > r[1] ? "#c53030" : "#1d8a57"}">${r[2] > r[1] ? "+" : ""}${((r[2] / r[1] - 1) * 100).toFixed(1)}%</td></tr>`).join("")}</table><p style="font-size:13px;color:#6b7390;margin:10px 0 0">Every closed job feeds its real costs back into your cost book, so the next estimate starts closer.</p></div>
      <div class="hb-card"><h4>${svgI("check", 18)} Nothing goes out without you</h4><p style="font-size:14px;margin:0 0 8px;color:#3a4366">The Estimator does the counting and the pricing. Kameron checks the numbers, changes what he wants, and approves. Then it makes the proposal in Apex's format, with the scope, exclusions and schedule.</p>${tag("Your assemblies", "bl")} ${tag("Your markups", "bl")} ${tag("Your exclusions", "bl")}</div></div>`;
  };
  function estTotals() {
    const E = AX.est, sub = E.lines.reduce((a, l) => a + l[1] * l[3], 0), cont = sub * E.contingency, mk = (sub + cont) * E.markup;
    const el = document.getElementById("est-tot"); if (!el) return;
    el.innerHTML = `<div class="hb-total"><span>Direct cost</span><b class="num">${money(sub)}</b></div><div class="hb-total"><span>Contingency ${Math.round(E.contingency * 100)}%</span><b class="num">${money(cont)}</b></div><div class="hb-total"><span>Overhead and profit ${Math.round(E.markup * 100)}%</span><b class="num">${money(mk)}</b></div><div class="hb-total big"><span>Bid price</span><span class="num">${money(sub + cont + mk)}</span></div>`;
  }
  APP.estTotal = () => { const E = AX.est, sub = E.lines.reduce((a, l) => a + l[1] * l[3], 0); return Math.round(sub * (1 + E.contingency) * (1 + E.markup)); };

  M.bids = () => H("Bid engine", "Watching 11 sources · 46 new bids this week · 6 fit you", `<button class="hb-b g">Sources</button>`)
    + `<div class="hb-card"><h4>${svgI("bid", 18)} Today's matches, best first</h4><div class="tblwrap"><table class="hb-t"><tr><th>Fit</th><th>Bid</th><th>Source</th><th>Value</th><th>Due</th><th>Why</th><th></th></tr>${AX.bids.feed.map(b => `<tr><td><b style="font-size:20px;color:${b.fit > 80 ? "#1d8a57" : b.fit > 60 ? "#a96a00" : "#c53030"}">${b.fit}</b></td><td><b>${esc(b.t)}</b><br><small style="color:#7a829c">${esc(b.city)} · ${esc(b.kind)}</small></td><td>${esc(b.src)}</td><td class="num">${esc(b.val)}</td><td>${esc(b.due)}</td><td style="max-width:240px;font-size:13px">${esc(b.why)}</td><td>${b.fit > 60 ? `<button class="hb-b" style="white-space:nowrap">Draft bid</button>` : tag("Skipped")}</td></tr>`).join("")}</table></div></div>
    <div class="hb-pipe">${[["Found", 6, [["Hayward HOA balconies", "Fit 94"], ["OHA on-call GC", "Fit 88"]]], ["Drafting", 2, [["Berkeley soft story", "Estimator at 80%"], ["San Leandro library", "Needs a site walk"]]], ["Sent", 4, [["Fremont SB-721", "$58,400 · Nov 2"], ["Alameda condo deck", "$36,900 · Oct 28"]]], ["Won", 3, [["Bayview Terrace", "$186,400"], ["Lakeshore deck", "$48,200"]]]].map(c => `<div class="col"><h5><span>${c[0]}</span><span>${c[1]}</span></h5>${c[2].map(i => `<div class="it"><b>${i[0]}</b><small>${i[1]}</small></div>`).join("")}</div>`).join("")}</div>
    <p style="font-size:13px;color:#6b7390;margin:12px 0 0">Win rate this year: 3 of 9 sent. Each lost bid records who won and at what price, when the agency publishes it.</p>`;

  M.receipts = () => H("Receipts", "Snapped, forwarded or swiped. Every one lands on a job", `<button class="hb-b g">Forward address</button>`)
    + `<div class="hb-kpis"><div class="hb-kpi"><small>This week</small><b>41</b><span>receipts in</span></div><div class="hb-kpi"><small>Matched by itself</small><b>40</b><span>98%</span></div><div class="hb-kpi"><small>Needs a tap</small><b>1</b><span class="dn">Sunbelt lift</span></div><div class="hb-kpi"><small>Typed by anyone</small><b>0</b><span>nothing retyped</span></div></div>
    <div class="hb-card"><h4>${svgI("receipt", 18)} Latest</h4>${AX.receipts.map(r => `<div class="hb-rc"><div class="thumb">${esc(r.vendor.toUpperCase())}<br>${esc(r.items.split("\n")[0])}<br>${money(r.amt, 2)}</div><div><b>${esc(r.vendor)} · ${money(r.amt, 2)}</b><small>${esc(r.where)} · ${esc(r.date)}</small><div class="why" style="${r.conf ? "" : "color:#c53030"}">${esc(r.how)}</div></div><div style="text-align:right">${r.conf ? tag(r.job, "bl") + `<br><small style="color:#7a829c">${r.conf}% sure</small>` : `<button class="hb-b r">Pick a job</button>`}</div></div>`).join("")}</div>
    <div class="hb-card"><h4>How it decides</h4><div class="hb-flow"><span>Whose card</span><i>+</i><span>Where they were working</span><i>+</i><span>PO or job number on the slip</span><i>+</i><span>What was bought</span><i>→</i><span style="background:#e6ebff;color:#0018b2">The job and cost code</span></div></div>`;

  M.billing = () => {
    const j = AX.jobs[0], tot = j.contract + j.co;
    const lines = [["Demo and shoring", 22800, 100], ["Framing and hardware", 48600, 70], ["Waterproofing", 30200, 40], ["Guardrails", 34400, 20], ["Stucco and paint", 18200, 10], ["Change orders 1 and 2", 14200, 100], ["General conditions", 46400, 62]];
    const done = lines.reduce((a, l) => a + l[1] * l[2] / 100, 0), ret = done * j.ret / 100, prev = 112000 - 112000 * j.ret / 100;
    return H("Billing", `Progress billing #4 · ${esc(j.name)} · in the AIA format your HOA managers expect`, `<button class="hb-b g">Preview PDF</button><button class="hb-b r">Send with lien waiver</button>`)
      + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Line</th><th class="r">Scheduled value</th><th class="r">Done</th><th class="r">Earned</th></tr>${lines.map(l => `<tr><td>${l[0]}</td><td class="r num">${money(l[1])}</td><td class="r">${l[2]}%</td><td class="r num">${money(l[1] * l[2] / 100)}</td></tr>`).join("")}</table></div>
      <div style="max-width:380px;margin-left:auto;margin-top:10px"><div class="hb-total"><span>Earned to date</span><b class="num">${money(done)}</b></div><div class="hb-total"><span>Retention ${j.ret}%</span><b class="num">-${money(ret)}</b></div><div class="hb-total"><span>Paid on draws 1 to 3</span><b class="num">-${money(prev)}</b></div><div class="hb-total big"><span>This draw</span><span class="num">${money(done - ret - prev)}</span></div></div></div>
      <div class="hb-3"><div class="hb-card"><h4>Attached by itself</h4><p style="margin:0;font-size:14px">Conditional lien waiver, progress, in the state's exact form · 6 site photos · signed change order #2</p></div><div class="hb-card"><h4>Then</h4><p style="margin:0;font-size:14px">The manager pays by card or bank link. When it clears, the unconditional waiver goes out and the books update.</p></div><div class="hb-card"><h4>Retention</h4><p style="margin:0;font-size:14px">${money(ret + 112000 * j.ret / 100)} held so far. Its release date is on the calendar the day the job is done.</p></div></div>`;
  };

  M.books = () => H("Books and payroll", "Every dollar by job, without QuickBooks if you'd rather not keep it", `<button class="hb-b g">Send to the CPA</button>`)
    + `<div class="hb-kpis"><div class="hb-kpi"><small>Revenue, Oct</small><b>${money(214600)}</b><span>↑ 9% on Sep</span></div><div class="hb-kpi"><small>Job costs</small><b>${money(158300)}</b><span>74%</span></div><div class="hb-kpi"><small>Overhead</small><b>${money(28900)}</b><span>trucks, office, insurance</span></div><div class="hb-kpi"><small>Profit</small><b>${money(27400)}</b><span>12.8%</span></div></div>
    <div class="hb-2"><div class="hb-card"><h4>Profit by job, closed this year</h4>${[["Palma Ct apartments", 21.4], ["Elm St 8-unit", 18.2], ["Grand Ave TI", 14.9], ["Marina Blvd, phase 1", 6.1], ["Hillside deck", -3.4]].map(r => `<div style="display:grid;grid-template-columns:170px 1fr 56px;gap:10px;align-items:center;font-size:14px;margin:7px 0"><span>${r[0]}</span><div class="pbar" style="height:10px"><i class="${r[1] < 0 ? "over" : ""}" style="width:${Math.abs(r[1]) * 4}%"></i></div><b class="num" style="text-align:right;color:${r[1] < 0 ? "#c53030" : "#0b1240"}">${r[1]}%</b></div>`).join("")}</div>
    <div class="hb-card"><h4>${svgI("users", 18)} Payroll</h4><table class="hb-t"><tr><th>Week of Nov 2</th><th class="r">Hours</th><th>Went to</th></tr>${[["Luis", 42, "Bayview 42"], ["Marco", 40, "Estudillo 40"], ["Dave", 44, "Marina 30 · Lakeshore 14"], ["Tony", 40, "Davis St 40"], ["Eli", 41, "Lakeshore 16 · Estudillo 25"]].map(r => `<tr><td>${r[0]}</td><td class="r">${r[1]}</td><td style="font-size:13px">${r[2]}</td></tr>`).join("")}</table><p style="font-size:13px;color:#6b7390;margin:10px 0 0">Hours come from the crew's phones, split by job, and go to your payroll company (or run here). Certified payroll for public jobs is built from the same hours.</p></div></div>
    <div class="hb-card"><h4>Keep QuickBooks, or don't</h4><p style="margin:0;font-size:14px;color:#3a4366">Option one: the Field Office sends every receipt, invoice and payment to QuickBooks, already coded by job. Option two: the Field Office keeps the books itself (chart of accounts, bank feeds, job costing, 1099s for subs) and your CPA gets a clean export each month and at tax time.</p></div>`;

  M.subs = () => H("Subs and vendors", "Licenses checked with the state every week. Insurance tracked to the day", `<button class="hb-b g">Invite a sub</button>`)
    + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Company</th><th>Trade</th><th>On jobs</th><th>License</th><th>Insurance and paperwork</th><th></th></tr>${AX.subs.map(s => `<tr><td><b>${esc(s[0])}</b></td><td>${esc(s[1])}</td><td>${esc(s[2])}</td><td>${esc(s[3])}</td><td>${esc(s[4])}</td><td>${tag(s[5] === "ok" ? "Good" : s[5] === "warn" ? "Chasing" : "Hold pay", cls[s[5]])}</td></tr>`).join("")}</table></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Asked for automatically</h4><p style="margin:0;font-size:14px">New insurance certificates 30 days before they expire, W-9s, and lien waivers before each payment.</p></div><div class="hb-card"><h4>Quotes in one place</h4><p style="margin:0;font-size:14px">A sub's emailed quote is read, filed to the job and dropped into the estimate.</p></div><div class="hb-card"><h4>Who's good</h4><p style="margin:0;font-size:14px">On time, on budget, callbacks. Every sub's record across every job you've used them on.</p></div></div>`;

  M.paperwork = () => H("Liens, permits and safety", "California's deadlines, tracked so nobody has to remember them")
    + `<div class="hb-2"><div class="hb-card"><h4>${svgI("shield", 18)} Notices and waivers</h4><table class="hb-t">${AX.liens.map(l => `<tr><td><b>${esc(l[0])}</b><br><small style="color:#7a829c">${esc(l[1])} · ${esc(l[2])}</small></td><td>${tag(l[3], cls[l[4]])}</td></tr>`).join("")}</table></div>
    <div class="hb-card"><h4>${svgI("file", 18)} Permits and inspections</h4><table class="hb-t">${AX.permits.map(p => `<tr><td><b>${esc(p[0])}</b><br><small style="color:#7a829c">${esc(p[1])} · ${esc(p[2])}</small></td><td>${tag(p[3], cls[p[4]])}</td></tr>`).join("")}</table></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Home improvement contracts</h4><p style="margin:0;font-size:14px">Homeowner contracts come out with the state's required wording, the deposit cap and the right-to-cancel notice already in.</p></div><div class="hb-card"><h4>Safety</h4><p style="margin:0;font-size:14px">Toolbox talks every 10 working days, signed on the crew's phones. Injury log and your written safety program kept current.</p></div><div class="hb-card"><h4>Public jobs</h4><p style="margin:0;font-size:14px">State contractor registration renewal, prevailing wage rates on each bid, and certified payroll from the crew's hours.</p></div></div>`;

  M.field = () => H("Field", "What the crew sends from their phones, filed to the job")
    + `<div class="hb-2"><div class="hb-card"><h4>${svgI("camera", 18)} Daily log · Bayview Terrace · Wed Nov 11</h4><div class="hb-files" style="grid-template-columns:repeat(3,1fr);margin-bottom:10px">${["balcony-reframe-lift", "beam-walkway", "balcony-reframe"].map(p => `<div class="hb-file"><div class="pv" style="background-image:url(img/work/${p}.jpg)"></div></div>`).join("")}</div>
      <p style="font-size:14px;margin:0;color:#3a4366"><b>Luis (voice note, written out):</b> Units 3 and 4 framed, hangers in. Found rot at the unit 6 ledger, about 8 feet. Need the engineer to look before we close it. Weather clear. 2 on site, 9 hours each.</p>
      <p style="font-size:13px;color:#1d8a57;font-weight:700;margin:10px 0 0">The Field Office made a change order draft for the ledger and asked the engineer for a visit.</p></div>
    <div class="hb-card"><h4>${svgI("check", 18)} Punch list · Marina Blvd</h4><table class="hb-t">${[["Caulk window trim, unit 2", "Dave", "ok"], ["Touch-up paint at downspout", "Dave", "ok"], ["Replace cracked Hardie board, NW corner", "Eli", "warn"], ["Final clean, haul-off", "Dave", "warn"], ["Owner walk-through", "Kameron", "b"]].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${tag(r[2] === "ok" ? "Done" : r[2] === "warn" ? "Open" : "Fri", cls[r[2]])}</td></tr>`).join("")}</table>
    <p style="font-size:13px;color:#6b7390;margin:10px 0 0">When the last item closes, the Field Office asks the client for a review and moves the job to warranty.</p></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Trucks and tools</h4><p style="margin:0;font-size:14px">Registration, smog, oil changes and rentals with return dates. The Sunbelt lift is due back Monday.</p></div><div class="hb-card"><h4>Warranty callbacks</h4><p style="margin:0;font-size:14px">A client's call becomes a ticket on the original job, with its photos and who did the work.</p></div><div class="hb-card"><h4>Materials</h4><p style="margin:0;font-size:14px">Lumber and hardware prices from your receipts over time, so you see a price jump before you bid.</p></div></div>`;

  M.reinspect = () => H("Repeat work", "Every building you've repaired comes due again. The Field Office remembers")
    + `<div class="hb-card"><h4>${svgI("repeat", 18)} Balcony buildings and their next inspection</h4><table class="hb-t"><tr><th>Building</th><th>Law</th><th>City</th><th>Last</th><th>Next due</th></tr>${AX.reinspect.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${tag(r[1], "bl")}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`).join("")}</table></div>
    <div class="hb-3"><div class="hb-card"><h4>The cycles</h4><p style="margin:0;font-size:14px">Apartments every 6 years under SB-721. Condos and HOAs every 9 under SB-326. Every repair you finish starts a clock.</p></div><div class="hb-card"><h4>The inspectors</h4><p style="margin:0;font-size:14px">Under SB-721 the inspector can't do the repairs. The Field Office keeps a list of inspection firms that send you work, and thanks them when they do.</p></div><div class="hb-card"><h4>Soft story lists</h4><p style="margin:0;font-size:14px">Oakland and Berkeley publish their soft story building lists. The ones still not done near you become a mailing list.</p></div></div>`;

  M.listings = () => H("Listings and reviews", "One profile. Every place Apex is found")
    + `<div class="hb-card"><table class="hb-t"><tr><th>Where</th><th>Name and phone</th><th>Hours</th><th>Website</th><th>Reviews</th></tr>${[["Google", "Fixed", "Fixed", "Added", "1 → asking 4 clients"], ["Yelp", "Matches", "Fixed", "Matches", "4.0 · 4"], ["Nextdoor", "Matches", "Fixed", "Fixed (was a roofer's site)", "2 recommendations"], ["Facebook", "Fixed", "Fixed", "Matches", "posts from finished jobs"], ["The Blue Book", "Matches", "Fixed", "Added", "n/a"], ["BuildZoom", "Fixed (wrong address)", "Fixed", "Added", "n/a"], ["BuildingConnected", "New", "New", "New", "bid invites on"]].map(r => `<tr><td><b>${r[0]}</b></td>${r.slice(1, 4).map(c => `<td>${tag(c, /Fixed|Added|New/.test(c) ? "ok" : "")}</td>`).join("")}<td>${esc(r[4])}</td></tr>`).join("")}</table></div>
    <div class="hb-2"><div class="hb-card"><h4>${svgI("star", 18)} Review requests</h4><p style="margin:0;font-size:14px;color:#3a4366">When a job's punch list closes, the client gets a short text from Kameron with a link to Google. Happy clients post. Unhappy ones reach Kameron first.</p></div><div class="hb-card"><h4>${svgI("mail", 18)} Every lead in one inbox</h4><p style="margin:0;font-size:14px;color:#3a4366">Website, Google, Yelp, Nextdoor, phone calls and bid invites, each with where it came from, so you know which listing earns its keep.</p></div></div>`;

  M.ask = () => H("Ask Apex", "Ask the business anything, by typing or from your phone")
    + `<div class="hb-card"><div class="hb-chat"><div class="m u">What did we spend at Home Depot on Bayview?</div><div class="m a">${money(14862.31)} across 23 receipts since Sept 8. The biggest was ${money(1284.66)} on Nov 4 (joists and hangers). That's 12% of Bayview's material budget.</div><div class="m u">Who's free Monday?</div><div class="m a">Marco is off Friday and open Monday, and Eli finishes at Lakeshore Thursday. Want me to put either of them on the Davis St restroom?</div><div class="m u">Yes, Eli. And tell the tenant.</div><div class="m a">Done. Eli is on Davis St Monday at 7. I drafted a text to the tenant for you to send: "Hi, this is Kameron at Apex. Eli starts your restroom Monday at 7 a.m."</div></div><div class="hb-in"><input placeholder="Ask about any job, receipt, sub or bid"><button class="hb-b">Ask</button></div></div>`;

  /* ---------- Auto-filed: emails from people on a job file themselves ---------- */
  let mailSel = 0;
  M.inbox = () => {
    const m = AX.inbox[mailSel], j = J(m.job);
    const step = (ic, h, body, tg) => `<div class="hb-alert"><span class="dot" style="background:${tg || "#0018b2"}"></span><div style="flex:1"><b>${svgI(ic, 15)} ${h}</b><small>${body}</small></div></div>`;
    return H("Auto-filed", "Email from anyone already on a job is read, filed and acted on. Nothing to drag, nothing to retype", `<button class="hb-b g">Rules</button>`)
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Emails this week</small><b>63</b><span>from 19 people on jobs</span></div><div class="hb-kpi"><small>Filed by itself</small><b>61</b><span>97%</span></div><div class="hb-kpi"><small>Deadlines found</small><b>9</b><span>all on the calendar</span></div><div class="hb-kpi"><small>Attachments saved</small><b>34</b><span>plans, quotes, photos</span></div></div>
      <div class="hb-2" style="grid-template-columns:1fr 1.25fr"><div class="hb-card" style="padding:8px">${AX.inbox.map((x, i) => `<div class="hb-mail" data-mail="${i}" style="cursor:pointer;border-radius:10px;padding:10px;${i === mailSel ? "background:#eef1fa" : ""}"><span class="av">${x.av}</span><div><b>${esc(x.from)}</b> · ${esc(x.subj)}<small>Filed to ${esc(J(x.job).name)} · ${x.att.length} attachment${x.att.length > 1 ? "s" : ""}${x.due ? " · deadline found" : ""}</small></div><small>${esc(x.time)}</small></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("mail", 18)} ${esc(m.subj)}</h4><p style="font-size:13px;color:#6b7390;margin:-4px 0 8px">${esc(m.who)} · ${esc(m.from)} · ${esc(m.time)}</p>
        <p style="font-size:14px;background:#f7f8fc;border-radius:10px;padding:10px 12px;margin:0 0 12px;color:#2a3150">${esc(m.body)}</p>
        <h4 style="margin-top:4px">What the Field Office did ${tag("automatic", "ok")}</h4>
        ${step("folder", `Filed to ${esc(j.name)}`, esc(m.why), j.color)}
        ${step("file", `Saved ${m.att.length} attachment${m.att.length > 1 ? "s" : ""} to the job file`, m.att.map(a => `${esc(a[0])} (${esc(a[1])})`).join(" · "))}
        ${step("book", "Added a note to the job log", esc(m.note))}
        ${m.due ? step("cal", `Put the deadline on the calendar: ${esc(m.due[1])}`, `${esc(m.due[0])} · ${esc(m.due[2])}`, "#ff4a1c") : ""}
        ${m.task ? step("users", `Made a task for ${esc(m.task[1])}, and texted them`, esc(m.task[0]), "#f5a623") : ""}
        ${m.money ? step("money", `${esc(m.money[0])}: ${esc(m.money[1])}`, esc(m.money[2]), "#2fd389") : ""}
      </div></div>`;
  };

  /* ---------- Crew and texts: the roster, who's free, texting, everyone's week ---------- */
  const NEXT = { job: "Seven Hills Rd ADU", when: "Mon Nov 16, 7 a.m.", where: "Castro Valley", need: "2 carpenters and a laborer for foundation forms" };
  const crew = { pick: new Set(["Marco Diaz", "Dave Kim", "Sam Patel"]), asked: false, sent: false, tab: "roster" };
  const REPLY = { "Marco Diaz": ["YES", "Yes, I'm in. Need the address."], "Dave Kim": ["YES", "Yes after Marina wraps Friday."], "Sam Patel": ["YES", "Yes"], "Eli Brooks": ["NO", "Can't Monday, doctor. Tuesday works."], "Tony Ruiz": ["NO", "Still on Davis St."], "Luis Ortega": ["NO", "On Bayview all week."], "Kameron Suoja": ["YES", "👍"] };
  const first = n => n.split(" ")[0];
  const stTag = p => p.st === "free" ? tag(p.free || "Free", "ok") : p.st === "soon" ? tag(p.free, "warn") : tag("On " + p.on, "bl");
  M.crew = () => {
    const tabs = `<div class="hb-tabs">${[["roster", "Roster and next job"], ["texts", "Texts"], ["week", "Everyone's week"]].map(t => `<button data-ctab="${t[0]}" class="${crew.tab === t[0] ? "on" : ""}">${t[1]}</button>`).join("")}</div>`;
    let body = "";
    if (crew.tab === "roster") body = `<div class="hb-card" style="background:#0b1240;color:#fff;border:0"><div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><small style="color:#9db4ff;font-weight:800;letter-spacing:.08em">NEXT JOB TO STAFF</small><b style="display:block;font-size:20px">${NEXT.job}</b><span style="font-size:14px;opacity:.85">${NEXT.when} · ${NEXT.where} · needs ${NEXT.need}</span></div><button class="hb-b r" data-act="ask">${crew.asked ? "Asked ✓" : `Ask the ${crew.pick.size} picked if they're free`}</button></div></div>
      <div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th></th><th>Name</th><th>Role and skills</th><th>Phone</th><th>Right now</th>${crew.asked ? "<th>Reply</th>" : ""}</tr>${AX.team.map(p => { const r = REPLY[p.n]; return `<tr><td><input type="checkbox" data-pick="${esc(p.n)}"${crew.pick.has(p.n) ? " checked" : ""} aria-label="Pick ${esc(p.n)}"></td><td><b>${esc(p.n)}</b></td><td>${esc(p.r)}<br><small style="color:#7a829c">${p.sk.map(esc).join(" · ")}</small></td><td class="num" style="white-space:nowrap">${esc(p.ph)}</td><td>${stTag(p)}</td>${crew.asked ? `<td>${crew.pick.has(p.n) ? (r[0] === "YES" ? tag("Yes", "ok") : tag("No", "bad")) + `<br><small style="color:#7a829c">"${esc(r[1])}"</small>` : ""}</td>` : ""}</tr>`; }).join("")}</table></div>
      <p style="font-size:13px;color:#6b7390;margin:10px 0 0">${crew.asked ? `Everyone who said yes is on the calendar for ${NEXT.job}, and the job's crew list is set. ${[...crew.pick].filter(n => REPLY[n][0] === "NO").map(first).join(" and ") || "Nobody"} said no, so the Field Office suggests ${AX.team.find(p => p.st === "free" && !crew.pick.has(p.n)) ? first(AX.team.find(p => p.st === "free" && !crew.pick.has(p.n)).n) : "the next free person"}.` : "Tick who you want, then ask. Each person gets a text and answers YES or NO. Their answers fill in the calendar."}</p></div>`;
    if (crew.tab === "texts") {
      const asked = [...crew.pick];
      body = `<div class="hb-2"><div class="hb-card"><h4>${svgI("chat", 18)} ${crew.asked ? "Who's free Monday?" : "Crew texts"}</h4><div class="hb-chat">
        ${crew.asked ? `<div class="m u">Apex: Can you work ${NEXT.job}, ${NEXT.when}, ${NEXT.where}? Reply YES or NO.</div><small style="align-self:flex-end;color:#7a829c;font-size:12px">To ${asked.map(first).join(", ")}</small>${asked.map(n => `<div class="m a"><b>${esc(first(n))}:</b> ${esc(REPLY[n][1])}</div>`).join("")}` : `<div class="m a" style="color:#6b7390">No texts yet today. Pick people on the roster and ask who's free, or write to anyone below.</div>`}
        ${crew.sent ? `<div class="m u">Apex: Your week is in your email and texted below. Reply with any questions.</div><small style="align-self:flex-end;color:#7a829c;font-size:12px">To all 7</small>` : ""}
      </div><div class="hb-in"><input placeholder="Text Luis, the Bayview crew, or everyone" aria-label="Text message"><button class="hb-b">Send</button></div></div>
      <div class="hb-card"><h4>${svgI("phone", 18)} Texts go out from Apex's number</h4><p style="font-size:14px;color:#3a4366;margin:0 0 8px">Every text comes from one Apex business number, so personal phones stay personal. Replies land here and on Kameron's phone, filed to the job they're about.</p>${["Text one person, a job's crew, or everyone", "YES and NO replies update the calendar", "Delivery and inspection reminders go out by themselves", "Every number stored once, kept current"].map(t => `<div class="hb-alert"><span class="dot g"></span><div>${t}</div></div>`).join("")}</div></div>`;
    }
    if (crew.tab === "week") body = `<div class="hb-card" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><b style="color:#0b1240">Sunday at 6 p.m., everyone gets their week</b><br><small style="color:#6b7390">An email with each day's job, address, task, plan sheet and who to call, plus a text each morning. Changes go out the minute they happen.</small></div><button class="hb-b r" data-act="send">${crew.sent ? "Sent to all 7 ✓" : "Send everyone's week now"}</button></div>${APP.staffEmail("Luis Ortega")}`;
    return H("Crew and texts", "Everyone's number, who's free, who's where, and texts from the app") + tabs + body;
  };
  const JOB_ADDR = { "J-2611": "1450 Bayview Ave, Alameda", "J-2604": "1188 Estudillo Ave, San Leandro", "J-2615": "2240 Davis St, San Leandro", "J-2598": "860 Marina Blvd, San Leandro", "J-2619": "19720 Seven Hills Rd, Castro Valley", "J-2620": "3315 Lakeshore Ave, Oakland" };
  const JOB_DO = { "J-2611": ["Set joists, Bldg C units 3 and 4", "Units 5 and 6, hangers", "Engineer at unit 6 ledger, 9 a.m.", "Sheathing, Bldg C", "Membrane prep with Pacific Coatings"], "J-2604": ["Hold-downs, line 4", "Hold-downs, line 5", "Shear wall nailing", "Inspection prep", "Off"] };
  APP.staffEmail = name => {
    const short = first(name), row = AX.week.rows[short] || [];
    return `<div class="hb-card" style="max-width:640px;color:#151b36;background:#fff"><div style="font-size:13px;color:#6b7390;border-bottom:1px solid #edf0f7;padding-bottom:8px;margin-bottom:10px">From <b>Apex Field Office</b> · To ${esc(name)} · Subject: <b style="color:#0b1240">Your week, Nov 9 to 13</b></div>
      <p style="margin:0 0 10px;font-size:15px">Hi ${esc(short)}, here's where you're working this week.</p>
      <table class="hb-t"><tr><th>Day</th><th>Job and address</th><th>What to do</th></tr>${row.map((c, i) => { const j = J(c); return `<tr><td style="white-space:nowrap"><b>${AX.week.days[i]}</b></td><td>${j.id ? `<b style="color:${j.color}">${esc(j.name)}</b><br><small style="color:#7a829c">${esc(JOB_ADDR[j.id] || j.city)}</small>` : esc(c)}</td><td style="font-size:13.5px">${j.id ? esc((JOB_DO[j.id] || [])[i] || "See the daily plan") : ""}</td></tr>`; }).join("")}</table>
      <p style="font-size:13.5px;color:#3a4366;margin:12px 0 0">7 a.m. start every day. Plan sheets and gate codes are in the app. Questions: Kameron, (510) 555-0128.</p></div>`;
  };

  /* ---------- the portal ---------- */
  APP.hubMods = MODS;
  APP.hub = (mod, opts) => {
    mod = M[mod] ? mod : "today";
    return `<div class="hb" data-hub>${opts && opts.noside ? "" : `<div class="hb-side"><div class="hb-me"><img src="img/mark-white.png?v=1793932919" alt=""><div><b>Field Office</b><small>Apex Construction</small></div></div>${MODS.map(m => `<button data-mod="${m[0]}" class="${m[0] === mod ? "on" : ""}">${svgI(m[2], 17)}<span>${m[1]}</span>${m[3] ? `<em>${m[3]}</em>` : ""}</button>`).join("")}</div>`}<div class="hb-main">${M[mod]()}</div></div>`;
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
