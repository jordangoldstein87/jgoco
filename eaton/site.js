/* eatonbotanicals.com, in its own look, moved off HubSpot and wired to The Farm. Shown inside a browser window on "Your site".
   Its forms don't send anything: they show the card The Farm would create. Product names, doses and taglines are Eaton's own. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI } = APP;
  const C = AX.co;
  const P = k => AX.products.find(p => p.k === k) || {};
  const ns = { k: "all", q: "", gate: !document.documentElement.classList.contains("cap") };
  const near = () => AX.accounts.filter(a => (ns.k === "all" || a.sku.includes(ns.k)) && (!ns.q || (a.city + " " + a.n).toLowerCase().includes(ns.q.toLowerCase())));

  function finder() {
    const list = near();
    return `<div class="ns-find"><div class="ns-find-l">
        <div class="ns-find-q"><input id="ns-q" placeholder="City, address or zip" value="${esc(ns.q)}" aria-label="Search for a store"><button class="ns-btn" data-nsq>Find</button></div>
        <select id="ns-k" aria-label="Pick a product"><option value="all">Any Eaton product</option>${AX.products.map(p => `<option value="${p.k}"${ns.k === p.k ? " selected" : ""}>${esc(p.n)}</option>`).join("")}</select>
        <div class="ns-find-list">${list.length ? list.map(a => `<div class="ns-store"><b>${esc(a.n)}</b><small>${esc(a.city)}, NY</small><div>${a.sku.map(k => `<i style="background:${P(k).c}" title="${esc(P(k).n)}"></i>`).join("")}</div>${AX.promos.find(p => p.store === a.n && p.st === "Confirmed") ? `<span class="ns-ev">Pop-up ${esc(AX.promos.find(p => p.store === a.n && p.st === "Confirmed").day)}</span>` : ""}</div>`).join("") : `<p style="color:#4b5a51">No match nearby yet. Ask your dispensary for Eaton, or tell us which store to call.</p>`}</div></div>
      <div class="ns-find-map"><svg viewBox="0 0 100 92" role="img" aria-label="Map of stores"><path d="M2,40 L9,31 L20,26 L35,24 L50,19 L58,10 L64,3 L80,1 L83,30 L85,62 L84,74 L82,77 L99,77 L100,81 L85,86 L79,89 L76,87 L74,80 L70,73 L66,66 L2,63 Z" fill="#eef2ea" stroke="#c5d1c8" stroke-width=".5"/>${list.map(a => `<circle cx="${a.x}" cy="${a.y}" r="2.2" fill="${a.sku.includes("gt") && (ns.k === "all" || ns.k === "gt") ? "#af9335" : "#154734"}" stroke="#fff" stroke-width=".7"/>`).join("")}</svg>
        <small>Updated from today's deliveries · gold pins have Golden Ticket</small></div></div>`;
  }

  function page() {
    const gummies = AX.products.filter(p => !/pre-rolls/i.test(p.tag));
    return `<div class="ns ns-eb">
      ${ns.gate ? `<div class="ns-gate"><div><img src="img/logo-color.png?v=1794188427" alt="Eaton Botanicals"><b>You must be 21 or older to enter this site.</b><p>Are you over 21?</p><div style="display:flex;gap:10px;justify-content:center"><button class="ns-btn" data-gate>Yes, I'm 21+</button><button class="ns-btn w" data-gate>No</button></div></div></div>` : ""}
      <div class="ns-top"><img src="img/logo-color.png?v=1794188427" alt="Eaton Botanicals"><nav><a href="#site" data-ns="prod">Edibles</a><a href="#site" data-ns="prod">Pre-rolls</a><a href="#site" data-ns="find">Where to buy</a><a href="#site" data-ns="ev">Events</a><a href="#site" data-ns="ws">Wholesale</a></nav><a class="ns-call" href="#site" data-ns="find">Find a store</a></div>
      <div class="ns-hero" style="background-image:url(img/photos/farm-field.jpg?v=1794188427)"><div>
        <div style="font-weight:800;letter-spacing:.2em;font-size:13px;color:#d9bf6a;margin-bottom:12px">SUNGROWN IN EATON, NEW YORK</div>
        <h1 class="disp" style="text-transform:uppercase">Wellness you can feel</h1>
        <p>The one with the mushrooms. Low-dose gummies and mullein mini pre-rolls from a historic New York farm.</p>
        <div class="ns-ctas"><a class="ns-btn" href="#site" data-ns="find">Find Eaton near you</a><a class="ns-btn w" href="#site" data-ns="prod">The lineup</a></div>
      </div></div>
      <div class="stripe" style="height:8px"></div>

      <div class="ns-sec" id="ns-prod"><div class="ns-k">The lineup</div><h2>Eight gummies. Twenty in every tin.</h2>
        <div class="ns-tins">${gummies.map(p => `<div class="ns-tin" style="--c:${p.c}"><div class="lid"><span>EATON</span><small>BOTANICALS</small><em>${esc(p.n)}</em></div><b>${esc(p.n)}</b><small>${esc(p.f)} · ${esc(p.d)}</small><small>with ${esc(p.m)}</small><span class="tg">${esc(p.tag)}</span><a href="#site" data-ns="find" data-pk="${p.k}">Where to buy →</a></div>`).join("")}</div>
        <div class="ns-pr">${AX.products.filter(p => /pre-rolls/i.test(p.tag)).map(p => `<div><img src="${p.img}" alt="${esc(p.n)}" loading="lazy"><div><b>${esc(p.n)}</b><small>${esc(p.f)} · ${esc(p.d)}</small><a href="#site" data-ns="find" data-pk="${p.k}">Where to buy →</a></div></div>`).join("")}</div></div>

      <div class="ns-sec" id="ns-find" style="background:#f1f4ee"><div class="ns-k">Where to buy</div><h2>On the shelf near you. Today.</h2>
        <p style="color:#4b5a51;font-size:17px;max-width:720px">The map reads from The Farm, so a store shows the tins it actually got, and drops a tin it hasn't restocked in 90 days. No more uploads.</p>
        <div id="ns-finder">${finder()}</div></div>

      <div class="ns-sec" id="ns-ev"><div class="ns-k">Events</div><h2>Meet us at a pop-up.</h2>
        <div class="ns-evs">${AX.promos.filter(p => p.st === "Confirmed").map(p => `<div><b>${esc(p.day)}</b><span>${esc(p.time)}</span><strong>${esc(p.store)}</strong><small>${esc(p.city)} · ${esc(p.what)}</small></div>`).join("")}</div>
        <p style="color:#6f7d74;font-size:14px;margin-top:12px">Confirmed promo days appear here by themselves, the minute the store says yes.</p></div>

      <div class="ns-sec" id="ns-ws" style="background:#154734;color:#eef2ea">
        <div class="ns-form"><div><div class="ns-k" style="color:#d9bf6a">For dispensaries</div><h2 style="color:#fff">Carry Eaton.</h2>
          <p style="font-size:17px;opacity:.85">Tell us about your store. Your rep for your area gets it right away and sends today's menu, with what's in stock.</p>
          <div style="margin-top:20px;font-size:15px;line-height:1.8">Order direct from Eaton Distribution, or on the Nabis marketplace.<br>Budtender trainings and pop-ups on request.</div></div>
          <form id="ns-form" onsubmit="return false">
            <div class="row2"><label>Store name<input name="store" value="Blue Heron Cannabis"></label><label>City<input name="city" value="Syracuse"></label></div>
            <div class="row2"><label>Your name<input name="person" value="Avery Cole"></label><label>OCM license number<input name="lic" value="OCM-AUCP-25-000412"></label></div>
            <label>Email<input name="mail" type="email" value="buying@example.com"></label>
            <label>Interested in<span class="chips">${["Gummies", "Pre-rolls", "Golden Ticket", "Budtender training", "A pop-up"].map((c, i) => `<label><input type="checkbox" name="kind" value="${c}"${i === 0 || i === 3 ? " checked" : ""}>${c}</label>`).join("")}</span></label>
            <label>Anything else<textarea name="note" rows="2">Opening December 1.</textarea></label>
            <button class="ns-btn" type="submit" style="justify-self:start">Send to Eaton</button>
          </form></div>
        <div id="ns-landed"></div>
      </div>

      <div class="ns-foot"><div><img src="img/logo-white.png?v=1794188427" alt="" style="height:70px;margin-bottom:12px"><div>Eaton Botanicals · Eaton, New York<br>License ${esc(C.lic)}</div></div>
        <div><b>Shop</b><a>Edibles</a><a>Pre-rolls</a><a>Where to buy</a></div>
        <div><b>Stay updated</b><a>Newsletter, 21+</a><a>Instagram</a><a>Events</a></div>
        <div><b>For 21+ only</b>Keep out of reach of children. NYS HOPEline: call 1-877-8-HOPENY or text HOPENY (467369).</div></div>
    </div>`;
  }

  function landed(f) {
    const v = n => esc((f.elements[n] && f.elements[n].value) || "");
    const kinds = [...f.querySelectorAll("[name=kind]:checked")].map(x => x.value).join(", ") || "Not picked";
    return `<div class="hb" style="display:block;margin-top:24px;min-height:0;padding:22px 26px;border-radius:18px">
      <div class="hb-h"><span class="tag race">What just landed in The Farm</span><h3 style="margin-left:4px">New store · ${v("store")}</h3><span class="sp"><span class="tag ok">Kendra told in Slack</span></span></div>
      <table class="hb-t"><tr><th>Store</th><td>${v("store")} · ${v("city")} · ${v("person")}</td></tr>
      <tr><th>License</th><td>${v("lic")} · checked against OCM's public list: <b>active, not open yet</b></td></tr>
      <tr><th>Wants</th><td>${esc(kinds)}</td></tr><tr><th>Note</th><td>${v("note")}</td></tr>
      <tr><th>The Farm did</th><td>Made a lead, graded "hot" · routed to Kendra, who covers Syracuse · attached today's menu with live stock for her to send · offered her open afternoons for a training · added a store-opening reminder for Dec 1</td></tr></table>
      <p style="font-size:13px;color:#5f6e65;margin:12px 0 0">A preview. Nothing is emailed to the store until Kendra presses send.</p></div>`;
  }

  APP.views.site = () => `
    <section class="sec hero-in" style="padding-bottom:30px"><div class="wrap">
      <div class="kick">The front door</div>
      <h1 class="h1">Your site, your look.<br>Off HubSpot.</h1>
      <p class="lede">Today eatonbotanicals.com, its forms, its newsletter and its cookie banner all run on HubSpot, and the store map is a separate Mapbox upload. Leaving HubSpot means moving the site too, so we keep everything you built: the green and gold, the tins, the copy, the age gate. What changes is underneath. Every page reads from The Farm.</p>
      <div class="pill-row"><span class="y">Same look, same copy</span><span class="y">Built-in store locator</span><span class="y">Pop-ups from the promo calendar</span><span class="y">Wholesale form that routes to a rep</span><span class="y">21+ newsletter, rule-checked</span></div>
    </div></section>
    <section style="padding:0 0 60px"><div class="wrap"><div class="ns-frame rise" id="ns-frame"><div class="ns-chrome"><i></i><i></i><i></i><span>eatonbotanicals.com</span></div>${page()}</div>
      <p class="src">Logo, product names, doses, taglines and photos are Eaton's own, from the current site. Stores and pop-ups are samples. Try the store finder: pick a tin or type a city. The wholesale form is a working demo.</p></div></section>
    <section class="sec" style="padding-top:20px"><div class="wrap">
      <div class="kick">What moves off HubSpot</div><h2 class="h2">Everything the site does today. Wired in.</h2>
      <div class="grid g3 rise" style="margin-top:30px">
        <div class="card"><b style="font-size:20px">Today, on HubSpot</b><ul class="lst"><li>Pages on HubSpot's CMS, in a theme</li><li>Newsletter and contact forms into HubSpot</li><li>Wholesale requests answered by hand</li><li>A Mapbox map re-uploaded when stores change</li></ul></div>
        <div class="card"><b style="font-size:20px">With The Farm</b><ul class="lst"><li>The same pages, hosted with The Farm</li><li>Every form lands on a store or a contact, with its rep</li><li>The menu goes back with live stock</li><li>The map draws itself from deliveries</li></ul></div>
        <div class="card"><b style="font-size:20px">And you still edit it</b><ul class="lst"><li>Jes changes copy and photos herself</li><li>Or asks Bud: "add the holiday gift guide banner"</li><li>Every change waits for an OK</li></ul></div>
      </div>
    </div></section>
    ${APP.next("read", "The deep read")}`;

  const redraw = () => { const el = document.getElementById("ns-finder"); if (el) el.innerHTML = finder(); };
  document.addEventListener("click", e => {
    if (e.target.closest("[data-gate]")) { ns.gate = false; const g = document.querySelector(".ns-gate"); g && g.remove(); return; }
    if (e.target.closest("[data-nsq]")) { const q = document.getElementById("ns-q"); ns.q = q ? q.value.trim() : ""; redraw(); return; }
    const a = e.target.closest("[data-ns]");
    if (a) { e.preventDefault(); if (a.dataset.pk) { ns.k = a.dataset.pk; ns.q = ""; redraw(); } const el = document.getElementById("ns-" + a.dataset.ns); el && el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  });
  document.addEventListener("change", e => { if (e.target.id === "ns-k") { ns.k = e.target.value; redraw(); } });
  document.addEventListener("keydown", e => { if (e.target.id === "ns-q" && e.key === "Enter") { e.preventDefault(); ns.q = e.target.value.trim(); redraw(); } });
  document.addEventListener("submit", e => {
    if (e.target.id !== "ns-form") return;
    e.preventDefault();
    const out = document.getElementById("ns-landed"); out.innerHTML = landed(e.target); out.scrollIntoView({ behavior: "smooth", block: "center" });
  }, true);
})();
