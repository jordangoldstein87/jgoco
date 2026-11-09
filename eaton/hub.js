/* The Farm: a clickable mock of Eaton Botanicals' sales and marketing hub. Every module reads the sample data in data.js.
   APP.hub(mod) draws the whole portal opened on one module; clicks in its side menu switch modules in place. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI, money } = APP;
  const P = k => AX.products.find(p => p.k === k) || {};
  const tag = (t, c) => `<span class="tag ${c || ""}">${esc(t)}</span>`;
  const rep = f => AX.reps.find(r => r.f === f) || {};
  const pill = f => { const r = rep(f); return `<span class="fm-pill" style="--c:${r.c || "#154734"}">${esc(f)}</span>`; };
  const due = a => a.last / a.gap; // 1 = right on their usual rhythm
  const DUE = () => AX.accounts.filter(a => due(a) >= .85).sort((a, b) => due(b) - due(a));
  const H = (title, sub, btns) => `<div class="hb-h"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ""}</div><span class="sp">${btns || ""}<span class="sample">Sample</span></span></div>`;
  const dots = list => `<span class="fm-dots">${list.map(k => `<i style="background:${P(k).c}" title="${esc(P(k).n)}"></i>`).join("")}</span>`;

  const MODS = [
    ["today", "Today", "bolt"], ["accounts", "Dispensaries", "users"], ["leads", "New stores", "flag", AX.leads.length], ["orders", "New order", "cart"], ["reorders", "Reorders due", "repeat", DUE().length],
    ["locator", "Store locator", "pin"], ["promos", "Promo days", "cal", 1], ["inbox", "Inbox", "mail", AX.inbox.length], ["campaigns", "Campaigns", "megaphone", 1], ["sell", "Sell-through", "chart"], ["team", "Team", "route"], ["bud", "Ask Bud", "chat"],
  ];

  /* ---------- modules ---------- */
  const M = {};
  M.today = () => {
    const d = DUE(), next = AX.promos.filter(p => p.st !== "Done");
    return H("Good morning, Marni", `${AX.today} · 6 reps out · ${d.length} stores due to reorder · ${next.length} promo days coming up`)
      + `<div class="hb-kpis"><div class="hb-kpi"><small>Orders this month</small><b>${money(148420)}</b><span>↑ 11% on October, same day</span></div><div class="hb-kpi"><small>Reorders due</small><b>${d.length}</b><span class="dn">${money(d.reduce((s, a) => s + a.avg, 0))} of usual orders</span></div><div class="hb-kpi"><small>New stores</small><b>${AX.leads.length}</b><span>1 from the site, 1 from OCM's list</span></div><div class="hb-kpi"><small>Promo days</small><b>${next.length}</b><span>next: Sat Nov 14, Brooklyn</span></div></div>
      <div class="hb-2"><div class="hb-card"><h4>${svgI("bolt", 18)} Needs the team today ${tag("Bud's picks", "ok")}</h4>${[
        ["r", "Lantern House is 5 days past its usual reorder", "Rosa emailed at 8:14 asking for Nightcap by Friday. Bud drafted the order and Dana's reply.", "inbox"],
        ["y", "Golden Ticket: 8 cases left in Batch GT-0007", "61 stores carried it in the last 90 days. The buyer email is drafted for Thursday.", "campaigns"],
        ["b", "Blue Heron Cannabis wants a menu", "Opening Dec 1 in Syracuse. Routed to Kendra with the menu attached.", "leads"],
        ["y", "Promo day at High Meadow not confirmed", "Fri Nov 20. The store hasn't clicked the link. Bud can nudge Jon.", "promos"],
        ["g", "Copperleaf's Nightcap pop-up: units nearly doubled", "41 to 78 in the two weeks after. Worth booking again for December.", "promos"],
      ].map(a => `<div class="hb-alert" data-go="${a[3]}" style="cursor:pointer"><span class="dot ${a[0] === "b" ? "" : a[0]}"></span><div><b>${esc(a[1])}</b><small>${esc(a[2])}</small></div></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("route", 18)} The team today</h4>${AX.reps.map(r => `<div class="hb-alert"><span class="dot" style="background:${r.c}"></span><div><b>${esc(r.n)}</b><small>${esc(r.t)} · ${{ Marni: "Copperleaf and Bridgeview, then the buyer lunch", Dana: "4 visits in Williamsburg and Bushwick", Luis: "Huntington and Port Jefferson", Priya: "Kingston, then a training at Sunny Day", Tom: "Saratoga and Glens Falls", Kendra: "Rochester, then Syracuse for Blue Heron" }[r.f]}</small></div></div>`).join("")}</div></div>`;
  };

  M.accounts = () => H("Dispensaries", `${AX.co.stores} stores carry Eaton · sorted by who needs a call`, `<button class="hb-b g">Map view</button><button class="hb-b">Add a store</button>`)
    + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Store</th><th>Rep</th><th>Channel</th><th>Carries</th><th class="r">Usual order</th><th>Rhythm</th><th></th></tr>${AX.accounts.slice().sort((a, b) => due(b) - due(a)).map(a => { const r = due(a); return `<tr><td><b>${esc(a.n)}</b><br><small style="color:#6f7d74">${esc(a.city)} · buyer ${esc(a.buyer)}</small></td><td>${pill(a.rep)}</td><td>${tag(a.ch, a.ch === "Nabis" ? "bl" : "")}</td><td>${dots(a.sku)}<br><small style="color:#6f7d74">${a.sku.length} of 10</small></td><td class="r num">${money(a.avg)}</td><td style="width:150px"><div class="pbar"><i class="${r >= 1 ? "over" : ""}" style="width:${Math.min(100, r * 100)}%"></i></div><small>${a.last} days · orders every ${a.gap}</small></td><td>${r >= 1 ? tag("Overdue", "bad") : r >= .85 ? tag("Due soon", "warn") : tag("Stocked", "ok")}</td></tr>`; }).join("")}</table></div></div>
    <div class="hb-3"><div class="hb-card"><h4>Grades, 1 to 6</h4><p style="margin:0;font-size:14px">New lead, hot lead, talking, account, big account, chain. Every store has one, so a rep's week starts with the right doors.</p></div><div class="hb-card"><h4>Direct and Nabis, one book</h4><p style="margin:0;font-size:14px">Orders from your own distribution and from the Nabis marketplace land on the same store record, so nobody asks "did they order through Nabis?"</p></div><div class="hb-card"><h4>What's on their shelf</h4><p style="margin:0;font-size:14px">The colored dots are the tins they carry, from their invoices. The gaps are the next pitch.</p></div></div>`;

  M.leads = () => H("New stores", "Every new dispensary, from every door, routed to the rep who covers it", `<button class="hb-b g">Scan a business card</button>`)
    + `<div class="hb-card">${AX.leads.map(l => `<div class="hb-rc" style="grid-template-columns:1fr auto"><div><b>${esc(l.n)} · ${esc(l.city)}</b><small>${esc(l.src)} · ${esc(l.when)}</small><div class="why">${esc(l.note)}</div></div><div style="text-align:right">${pill(l.rep)}<br><button class="hb-b" style="margin-top:8px">Send the menu</button></div></div>`).join("")}</div>
    <div class="hb-card"><h4>Where new stores come from</h4><div class="hb-flow"><span>Wholesale form on your site</span><i>+</i><span>New licenses on OCM's list</span><i>+</i><span>Business cards and badges</span><i>+</i><span>Nabis first orders</span><i>→</i><span style="background:#e9e2c6;color:#154734">A lead, with its rep, its license checked, and the menu ready</span></div>
    <p style="font-size:13px;color:#5f6e65;margin:12px 0 0">327 licensed New York dispensaries hadn't opened as of October 1. The Farm watches the state's list and puts each one in front of its rep before opening day.</p></div>`;

  /* the order screen: live stock by batch, writes to Distru only on confirm */
  const ord = { sent: false };
  const ordTotal = () => AX.orders.lines.reduce((s, l) => s + l[1] * l[2], 0);
  M.orders = () => {
    const O = AX.orders, a = AX.accounts.find(x => x.n === O.store);
    return H(`New order · ${esc(O.store)}`, `${esc(a.city)} · Direct · started from their usual, with live stock from Distru`, `<button class="hb-b g">Their last 5 orders</button>`)
      + `<div class="hb-card hb-est"><div class="tblwrap"><table class="hb-t"><tr><th>Product</th><th>Batch and stock</th><th class="r">Tins</th><th class="r">Price</th><th class="r">Total</th></tr>${O.lines.map((l, i) => { const p = P(l[0]), s = O.stock[l[0]]; return `<tr><td><b style="display:flex;align-items:center;gap:8px"><i style="width:12px;height:12px;border-radius:4px;background:${p.c};display:inline-block"></i>${esc(p.n)}</b><small style="color:#6f7d74">${esc(p.d)}</small></td><td><small>${esc(s[1])}</small><br>${s[0] < 200 ? tag(s[0] + " tins left", "warn") : tag(s[0].toLocaleString() + " in stock", "ok")}</td><td class="r"><input data-oq="${i}" value="${l[1]}" inputmode="numeric" aria-label="${esc(p.n)} tins"></td><td class="r num">${money(l[2], 2)}</td><td class="r num" data-ol="${i}">${money(l[1] * l[2], 2)}</td></tr>`; }).join("")}</table></div>
      <div style="max-width:380px;margin-left:auto;margin-top:12px"><div class="hb-total"><span>Terms</span><b>Net 30</b></div><div class="hb-total big"><span>Order total</span><span class="num" id="ord-tot">${money(ordTotal(), 2)}</span></div>
      <button class="hb-b r" data-act="ord" style="width:100%;margin-top:10px;padding:12px">${ord.sent ? "✓ Sent to Distru as SO-20418" : "Confirm and send to Distru"}</button></div></div>
      <div class="hb-3"><div class="hb-card"><h4>${svgI("check", 18)} Nothing writes without a press</h4><p style="margin:0;font-size:14px">The rep builds it, checks it and confirms. Only then does it become a sales order in Distru, with the batches picked.</p></div><div class="hb-card"><h4>${svgI("shield", 18)} Credit, checked</h4><p style="margin:0;font-size:14px">Lantern House pays in 19 days on average and isn't on OCM's C.O.D. list. A store that is gets flagged before the rep offers terms.</p></div><div class="hb-card"><h4>${svgI("pin", 18)} Then it moves the pins</h4><p style="margin:0;font-size:14px">When Distru invoices it, the store locator shows all ${O.lines.length} products at Lantern House, and their reorder clock restarts.</p></div></div>`;
  };

  M.reorders = () => H("Reorders due", "Each store's rhythm, learned from its invoices. Due means 85% of their usual gap", `<button class="hb-b">Draft all ${DUE().length}</button>`)
    + `<div class="hb-card">${DUE().map(a => `<div class="hb-rc" style="grid-template-columns:auto 1fr auto"><div class="fm-gauge" style="--p:${Math.min(100, due(a) * 100)}"><b>${a.last}</b><small>days</small></div><div><b>${esc(a.n)} · ${esc(a.city)}</b><small>Orders every ${a.gap} days, usually ${money(a.avg)} · ${a.ch} · ${esc(rep(a.rep).n)}</small><div class="why">Bud drafted the usual order and a two-line note to ${esc(a.buyer)}</div></div><div style="text-align:right">${due(a) >= 1 ? tag(Math.round(a.last - a.gap) + " days late", "bad") : tag("Due this week", "warn")}<br><button class="hb-b" style="margin-top:8px">Open draft</button></div></div>`).join("")}</div>
    <p style="font-size:13px;color:#5f6e65;margin:0">A store that's late on Nabis and early on direct is still one store. The rhythm counts both.</p>`;

  /* ---------- the store locator: pins come from invoices ---------- */
  const NY = "M2,40 L9,31 L20,26 L35,24 L50,19 L58,10 L64,3 L80,1 L83,30 L85,62 L84,74 L82,77 L99,77 L100,81 L85,86 L79,89 L76,87 L74,80 L70,73 L66,66 L2,63 Z";
  const extra = (() => { // the other stores, placed around the real population centers (deterministic)
    let s = 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const C = [[77, 83, 72, 3.5], [88, 82, 20, 6], [73, 64, 22, 5], [70, 30, 18, 6], [22, 31, 14, 5], [10, 40, 14, 4], [46, 34, 12, 5], [52, 54, 8, 6], [40, 44, 8, 5], [72, 8, 6, 5]];
    const out = []; C.forEach(([x, y, n, r]) => { for (let i = 0; i < n; i++) out.push([x + (rnd() - .5) * r * 2, y + (rnd() - .5) * r * 1.4, rnd()]); });
    return out;
  })();
  const loc = { k: "all", sel: "Lantern House" };
  M.locator = () => {
    const has = a => loc.k === "all" || a.sku.includes(loc.k), gold = loc.k === "gt";
    const shown = AX.accounts.filter(has), sel = AX.accounts.find(a => a.n === loc.sel) || shown[0];
    let exShown = extra.filter(e => loc.k === "all" ? true : e[2] < (gold ? .3 : .6));
    if (gold) exShown = exShown.slice(0, 61 - shown.length); // 61 stores carried Golden Ticket in the last 90 days, the same figure Bud and the campaign use
    return H("Store locator", "Built into the site and The Farm. Every invoice moves a pin. Nobody uploads anything", `<button class="hb-b g">Embed code</button>`)
      + `<div class="hb-tabs">${[["all", "All Eaton"], ...AX.products.map(p => [p.k, p.n])].map(t => `<button data-loc="${t[0]}" class="${loc.k === t[0] ? "on" : ""}"${t[0] !== "all" ? ` style="--c:${P(t[0]).c}"` : ""}>${t[0] !== "all" ? `<i class="fm-sw" style="background:${P(t[0]).c}"></i>` : ""}${esc(t[1])}</button>`).join("")}</div>
      <div class="hb-2" style="grid-template-columns:1.5fr 1fr"><div class="hb-card" style="padding:10px"><svg viewBox="0 0 100 92" class="fm-map" role="img" aria-label="Map of New York stores carrying ${loc.k === "all" ? "Eaton" : esc(P(loc.k).n)}">
        <path d="${NY}" fill="#eaf0e7" stroke="#b9c8bd" stroke-width=".5"/>
        ${exShown.map(e => `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r=".9" fill="${gold ? "#af9335" : "#154734"}" opacity=".45"/>`).join("")}
        ${shown.map(a => `<g data-pin="${esc(a.n)}" style="cursor:pointer"><circle cx="${a.x}" cy="${a.y}" r="${a.n === sel?.n ? 3 : 2.1}" fill="${gold || (loc.k === "all" && a.sku.includes("gt")) ? "#af9335" : loc.k === "all" ? "#154734" : P(loc.k).c}" stroke="#fff" stroke-width=".7"/></g>`).join("")}

      </svg><p style="font-size:13px;color:#5f6e65;margin:6px 6px 2px">${shown.length + exShown.length} stores ${loc.k === "all" ? "carry Eaton · gold pins carried Golden Ticket in the last 90 days" : "have " + esc(P(loc.k).n) + " on the shelf"} · sample pins</p></div>
      <div>${sel ? `<div class="hb-card"><small style="color:#6f7d74;font-weight:800;letter-spacing:.06em">WHAT A SHOPPER SEES</small><b style="display:block;font-size:19px;color:#12291f;margin-top:4px">${esc(sel.n)}</b><small style="color:#5f6e65">${esc(sel.city)}, NY · 0.8 mi · open until 10 p.m.</small><div style="margin:10px 0 6px">${sel.sku.map(k => `<span class="fm-chip" style="--c:${P(k).c}">${esc(P(k).n)}</span>`).join("")}</div><small style="color:#1d8a57;font-weight:700">Restocked ${sel.last} days ago, from the last invoice</small>${AX.promos.find(p => p.store === sel.n && p.st !== "Done") ? `<div class="fm-promo">${svgI("cal", 15)} Promo day ${esc(AX.promos.find(p => p.store === sel.n && p.st !== "Done").day)}</div>` : ""}</div>` : ""}
      <div class="hb-card"><h4>How a pin moves</h4><div class="hb-flow" style="flex-direction:column;align-items:stretch"><span>Distru invoices an order, or Nabis reports one</span><span>The store gains those products</span><span>No reorder in 90 days? The product drops off</span><span style="background:#e9e2c6;color:#154734">The site's map, the reps' map and Bud all agree</span></div></div></div></div>`;
  };

  /* ---------- promo days ---------- */
  const pr = { booked: false };
  M.promos = () => H("Promo days", "Pop-ups and education days in stores, booked, confirmed and measured", `<button class="hb-b g">Ambassador calendar</button>`)
    + `<div class="hb-2"><div class="hb-card"><h4>${svgI("cal", 18)} Coming up and done</h4><table class="hb-t">${AX.promos.map(p => `<tr><td><b>${esc(p.store)}</b><br><small style="color:#6f7d74">${esc(p.city)} · ${esc(p.what)}</small></td><td style="white-space:nowrap">${esc(p.day)}<br><small style="color:#6f7d74">${esc(p.time)} · ${esc(p.who)}</small></td><td>${p.lift ? `<b style="color:#1d8a57">+${Math.round((p.lift[1] / p.lift[0] - 1) * 100)}%</b><br><small style="color:#6f7d74">${p.lift[0]} → ${p.lift[1]}</small>` : tag(p.st, p.st === "Confirmed" ? "ok" : "warn")}</td></tr>`).join("")}${pr.booked ? `<tr><td><b>Riverbend Cannabis Co.</b><br><small style="color:#6f7d74">Kingston · Fixer Upper and Apple-A-Day education table</small></td><td>Sat Dec 5<br><small style="color:#6f7d74">1 to 5 p.m. · Priya</small></td><td>${tag("Link sent to Ana", "warn")}</td></tr>` : ""}</table>
      <p style="font-size:13px;color:#5f6e65;margin:10px 0 0">Lift is units the store sold in the two weeks after vs. the two weeks before, from reorders and sell-through.</p></div>
      <div class="hb-card"><h4>${svgI("plus", 18)} Book one</h4><div class="fm-form"><label>Store<select><option>Riverbend Cannabis Co. · Kingston</option></select></label><label>Day<select><option>Sat Dec 5 · 1 to 5 p.m.</option></select></label><label>Who<select><option>Priya (rep) · free that day</option></select></label><label>Focus<select><option>Fixer Upper and Apple-A-Day</option></select></label></div>
      <button class="hb-b r" data-act="promo" style="width:100%;padding:11px;margin-top:6px">${pr.booked ? "✓ Booked. Ana gets a confirm link" : "Book it and send the store a confirm link"}</button>
      <div style="margin-top:12px">${[["Education only, unpaid", "No pay or perks for the store or budtenders (OCM rule)"], ["Non-infused samples", "Packed from the sampling kit, logged out and back"], ["Display budget tracked", "Under $200 a year per store, counted for you"]].map(c => `<div class="hb-alert"><span class="dot g"></span><div><b>${c[0]}</b><small>${c[1]}</small></div></div>`).join("")}</div></div></div>
      <div class="hb-3"><div class="hb-card"><h4>The store says yes in one click</h4><p style="margin:0;font-size:14px">The buyer gets a link with the day, the time and who's coming. Yes puts it on both calendars. No offers the next open day.</p></div><div class="hb-card"><h4>Shoppers can find it</h4><p style="margin:0;font-size:14px">Confirmed days show on your site's events page and on that store's pin in the locator, and go out in the 21+ newsletter for that area.</p></div><div class="hb-card"><h4>Then it gets measured</h4><p style="margin:0;font-size:14px">Two weeks later, The Farm shows the lift by product, so you know which stores and which tins are worth the Saturday.</p></div></div>`;

  /* ---------- inbox: email from stores files itself and gets a first move ---------- */
  let mailSel = 0;
  M.inbox = () => {
    const m = AX.inbox[mailSel];
    return H("Inbox", "Your Gmail, inside The Farm. Every email lands on its store with the first move done", `<button class="hb-b g">Rules</button>`)
      + `<div class="hb-2" style="grid-template-columns:1fr 1.25fr"><div class="hb-card" style="padding:8px">${AX.inbox.map((x, i) => `<div class="hb-mail" data-mail="${i}" style="cursor:pointer;border-radius:10px;padding:10px;${i === mailSel ? "background:#eaf0e7" : ""}"><span class="av">${x.av}</span><div><b>${esc(x.from)}</b> · ${esc(x.subj)}<small>${esc(x.who)} · ${x.did.length} things done</small></div><small>${esc(x.time)}</small></div>`).join("")}</div>
      <div class="hb-card"><h4>${svgI("mail", 18)} ${esc(m.subj)}</h4><p style="font-size:13px;color:#5f6e65;margin:-4px 0 8px">${esc(m.who)} · ${esc(m.time)}</p>
        <p style="font-size:14px;background:#f4f6f1;border-radius:10px;padding:10px 12px;margin:0 0 12px;color:#24332b">${esc(m.body)}</p>
        <h4 style="margin-top:4px">What Bud did ${tag("waiting for your OK", "ok")}</h4>
        ${m.did.map(d => `<div class="hb-alert"><span class="dot g"></span><div style="flex:1"><b>${svgI(d[0], 15)} ${esc(d[1])}</b><small>${esc(d[2])}</small></div></div>`).join("")}
        <div style="display:flex;gap:8px;margin-top:10px"><button class="hb-b">Approve all</button><button class="hb-b g">Edit first</button></div>
      </div></div>`;
  };

  M.campaigns = () => H("Campaigns", "Buyer, budtender and 21+ shopper email and SMS, checked against New York's rules before anything sends", `<button class="hb-b">New campaign</button>`)
    + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Campaign</th><th>To</th><th>Channel</th><th>Status</th><th>Rule check</th></tr>${AX.campaigns.map(c => `<tr><td><b>${esc(c.n)}</b>${c.why ? `<br><small style="color:#c53030">${esc(c.why)}</small>` : ""}</td><td>${esc(c.to)}</td><td>${esc(c.ch)}</td><td>${esc(c.st)}${c.open ? `<br><small style="color:#1d8a57;font-weight:700">${c.open}% opened</small>` : ""}</td><td>${c.ok ? tag("Passes", "ok") : tag("Fix 1 line", "bad")}</td></tr>`).join("")}</table></div></div>
    <div class="hb-2"><div class="hb-card"><h4>${svgI("shield", 18)} What every send is checked for</h4>${[["21+ audience", "Lists built from age-confirmed sign-ups, so 75.9% or more is 21+ (Part 129)"], ["No health claims", "\"Helps you sleep\" flagged. \"For a good night\" passes"], ["License number in the footer", "Added to every email and SMS"], ["No free or giveaway offers", "BOGO and contests blocked before they're written"], ["Promo pricing only where allowed", "Email, SMS, mailers and your own site"]].map(c => `<div class="hb-alert"><span class="dot g"></span><div><b>${c[0]}</b><small>${c[1]}</small></div></div>`).join("")}</div>
    <div class="hb-card"><h4>${svgI("megaphone", 18)} The launch calendar</h4>${[["Nov 12", "November buyer newsletter", "#154734"], ["Nov 18", "Golden Ticket order cutoff for buyers", "#af9335"], ["Nov 20", "Golden Ticket drop night, High Meadow", "#af9335"], ["Dec 1", "Holiday gift guide, 21+ list", "#e0566b"], ["Dec 3", "Budtender corner: the sleep shelf", "#8e2235"]].map(c => `<div class="hb-alert"><span class="dot" style="background:${c[2]}"></span><div><b>${c[0]} · ${c[1]}</b></div></div>`).join("")}<p style="font-size:13px;color:#5f6e65;margin:8px 0 0">Social posts sit on the same calendar, drafted by Bud for Jes to approve.</p></div></div>`;

  M.sell = () => H("Sell-through", "What moves, where, and which stores are about to run out", `<button class="hb-b g">Export</button>`)
    + `<div class="hb-2"><div class="hb-card"><h4>${svgI("chart", 18)} Share of Eaton's sales, October ${tag("Headset, public", "")}</h4>${AX.sell.map(s => { const p = AX.products.find(x => x.n === s[0]); return `<div style="display:grid;grid-template-columns:140px 1fr 48px;gap:10px;align-items:center;font-size:14px;margin:7px 0"><span>${esc(s[0])}</span><div class="pbar" style="height:12px"><i style="width:${s[1] * 4}%;background:${p.c}"></i></div><b class="num" style="text-align:right">${s[1]}%</b></div>`; }).join("")}<p style="font-size:13px;color:#5f6e65;margin:10px 0 0">Real figures from Headset's public brand page. In The Farm, this reads from your own invoices and, if you add it, Headset or Hoodie.</p></div>
    <div class="hb-card"><h4>${svgI("bolt", 18)} Gaps worth a call</h4>${[["Saltbox Dispensary", "Sells Serenity Now fast, doesn't carry Gal Pal. Stores like it sell both."], ["Orchard & Oak", "Two products, 51 days since the last order. Worth a visit, not an email."], ["The Green Pier", "No Golden Ticket yet. Huntington stores that carry it reorder 20% sooner."]].map(c => `<div class="hb-alert"><span class="dot y"></span><div><b>${c[0]}</b><small>${c[1]}</small></div></div>`).join("")}</div></div>`;

  M.team = () => H("Team", "Every rep's week, for Marni. Every rep sees their own", `<button class="hb-b g">Slack and Teams</button>`)
    + `<div class="hb-card"><div class="tblwrap"><table class="hb-t"><tr><th>Rep</th><th>Territory</th><th class="r">Stores</th><th class="r">Visits this week</th><th class="r">Orders, Nov</th><th class="r">Reorders due</th></tr>${AX.reps.map((r, i) => `<tr><td>${pill(r.f)}${r.real ? "" : ` <small style="color:#8e9a92">sample name</small>`}</td><td>${esc(r.t)}</td><td class="r">${[22, 41, 33, 36, 29, 43][i]}</td><td class="r">${[6, 11, 9, 8, 7, 10][i]}</td><td class="r num">${money([31840, 29120, 21460, 24300, 18900, 22800][i])}</td><td class="r">${AX.accounts.filter(a => a.rep === r.f && due(a) >= .85).length}</td></tr>`).join("")}</table></div><p style="font-size:13px;color:#5f6e65;margin:10px 0 0">Orders this month add up to ${money(148420)}, the same figure on Today. Store counts add to 204.</p></div>
    <div class="hb-3"><div class="hb-card"><h4>${svgI("chat", 18)} Slack or Teams</h4><p style="margin:0;font-size:14px">#sales gets new orders, new stores and promo-day confirmations. Each rep gets their own morning brief as a DM.</p></div><div class="hb-card"><h4>${svgI("route", 18)} Routes</h4><p style="margin:0;font-size:14px">A rep's day is planned by who's due, who's close, and who has a promo day coming, then opened in Google Maps.</p></div><div class="hb-card"><h4>${svgI("phone", 18)} Visit notes by voice</h4><p style="margin:0;font-size:14px">Thirty seconds in the car after a visit becomes the store's note, the follow-up task and the next reorder date.</p></div></div>`;

  M.bud = () => H("Ask Bud", "The team's assistant. Same Bud in The Farm, Slack and Teams")
    + `<div class="hb-card"><div class="hb-chat"><div class="m u">Which stores near Kingston carry Golden Ticket, and who's out of it?</div><div class="m a">Two stores in that part of the state carried it in the last 90 days. Sunny Day in White Plains reordered it 8 days ago. High Meadow in Saratoga is out, and its Golden Ticket night on Nov 20 isn't confirmed yet. Riverbend in Kingston has never carried it.</div><div class="m u">Nudge Jon at High Meadow and add 12 Golden Ticket to their next order.</div><div class="m a">Drafted both for Tom, since High Meadow is his store:<br>1. An email to Jon: "Hi Jon, we're set for Golden Ticket night on the 20th, 4 to 7. One click confirms it: [link]"<br>2. 12 Golden Ticket added to High Meadow's draft order, from Batch GT-0007.<br>Want me to send Tom a Slack message so he can approve them?</div><div class="m u">Yes</div><div class="m a">Sent to Tom in Slack. I'll tell you when he approves.</div></div><div class="hb-in"><input placeholder="Ask about any store, order, product or promo day" aria-label="Ask Bud"><button class="hb-b">Ask</button></div></div>`;

  /* ---------- the portal ---------- */
  APP.hubMods = MODS;
  APP.hubMini = k => `<div class="hb-main" style="padding:18px;max-height:none;grid-column:1/-1">${M[k] ? M[k]() : ""}</div>`;
  APP.hub = (mod, opts) => {
    mod = M[mod] ? mod : "today";
    return `<div class="hb" data-hub>${opts && opts.noside ? "" : `<div class="hb-side"><div class="hb-me"><img src="img/mark-gold.png?v=1794188895" alt=""><div><b>The Farm</b><small>Eaton Botanicals</small></div></div>${MODS.map(m => `<button data-mod="${m[0]}" class="${m[0] === mod ? "on" : ""}">${svgI(m[2], 17)}<span>${m[1]}</span>${m[3] ? `<em>${m[3]}</em>` : ""}</button>`).join("")}</div>`}<div class="hb-main">${M[mod]()}</div></div>`;
  };
  function swap(hb, mod) {
    hb.querySelector(".hb-main").innerHTML = M[mod]();
    hb.querySelectorAll(".hb-side button").forEach(b => b.classList.toggle("on", b.dataset.mod === mod));
    hb.dataset.cur = mod;
  }
  const cur = hb => hb.dataset.cur || (hb.querySelector(".hb-side button.on") || {}).dataset?.mod || "today";
  document.addEventListener("click", e => {
    const hb = e.target.closest("[data-hub]"); if (!hb) return;
    const b = e.target.closest("button[data-mod]"); if (b) { swap(hb, b.dataset.mod); return; }
    const g = e.target.closest("[data-go]"); if (g && M[g.dataset.go]) { swap(hb, g.dataset.go); return; }
    const ml = e.target.closest("[data-mail]"); if (ml) { mailSel = +ml.dataset.mail; swap(hb, "inbox"); return; }
    const lc = e.target.closest("[data-loc]"); if (lc) { loc.k = lc.dataset.loc; const f = AX.accounts.find(a => loc.k === "all" || a.sku.includes(loc.k)); if (f && !(AX.accounts.find(a => a.n === loc.sel) || {}).sku?.includes(loc.k)) loc.sel = f.n; swap(hb, "locator"); return; }
    const pn = e.target.closest("[data-pin]"); if (pn) { loc.sel = pn.dataset.pin; swap(hb, "locator"); return; }
    const ac = e.target.closest("[data-act]"); if (ac) { if (ac.dataset.act === "ord") ord.sent = true; if (ac.dataset.act === "promo") pr.booked = true; swap(hb, cur(hb)); return; }
  });
  document.addEventListener("input", e => {
    const i = e.target; if (!i.closest("[data-hub]") || i.dataset.oq == null) return;
    const k = +i.dataset.oq; AX.orders.lines[k][1] = Math.max(0, parseInt(i.value, 10) || 0); ord.sent = false;
    const ln = document.querySelector(`[data-ol="${k}"]`); if (ln) ln.textContent = money(AX.orders.lines[k][1] * AX.orders.lines[k][2], 2);
    const t = document.getElementById("ord-tot"); if (t) t.textContent = money(ordTotal(), 2);
  });
})();
