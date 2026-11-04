/* Nexeros pitch: the research and plan pages. The market, deep read, visibility, search, channels,
   marketing (with the ad optimizer), sales (find, enrich, queue) and the NexEros Hub. Facts come from
   content.js (window.C); the store map loads img/stores.json and img/us-states.json. */
(function () {
  const APP = window.APP, NX = window.NX, C = window.C, esc = APP.esc;
  const store = { get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const fmt = n => Number(n).toLocaleString("en-US");
  const hero = (k, h, p) => `<header class="pg-hero rise"><span class="eyebrow">${k}</span><h1>${h}</h1>${p ? `<p class="lede">${p}</p>` : ""}</header>`;
  const sec = (h, body, p, cls) => `<section class="pg-sec rise ${cls || ""}">${h ? `<h2>${h}</h2>` : ""}${p ? `<p>${p}</p>` : ""}${body}</section>`;
  const next = (href, t) => `<a class="nx-next rise" href="#${href}"><span>Next</span><b>${t}</b><i aria-hidden="true">→</i></a>`;
  const bars = (rows, opt) => { const o = opt || {}, max = Math.max(...rows.map(r => r[1])); return `<div class="hb">${rows.map(r => `<div class="hb-r"><span>${esc(r[0])}</span><i><em style="width:${(r[1] / max * 100).toFixed(1)}%;${r[3] ? `background:${r[3]}` : ""}"></em></i><b>${o.fmt ? o.fmt(r[1]) : fmt(r[1])}</b>${r[2] ? `<small>${esc(r[2])}</small>` : ""}</div>`).join("")}</div>`; };
  const pending = what => `<div class="card pend"><b>${what} is still coming in.</b><p class="note">The research is running. This section fills in on the next publish.</p></div>`;

  /* ---------- the market ---------- */
  APP.views.market = () => {
    const M = C.market;
    if (!M) return `<div class="pg">${hero("The market", "A big, growing category with a trust problem.", "How big it is, who's winning, what's missing, and the brands that rebuilt their look and grew.")}${pending("The market research")}</div>`;
    return `<div class="pg">${hero("The market", M.h, M.p)}
      <section class="pg-sec rise"><div class="stat-grid">${M.stats.map(([b, l, s]) => `<div class="stat"><b>${b}</b><span>${l}</span><small>${esc(s)}</small></div>`).join("")}</div></section>
      ${sec("How big, and how fast", `<div class="mk-size">${M.size.map(r => `<div class="mk-sz"><span>${esc(r[0])}</span><b>${esc(r[1])}</b><em>${esc(r[2])}</em><small>${esc(r[3])}</small></div>`).join("")}</div>${M.sizeNote ? `<p class="note">${M.sizeNote}</p>` : ""}`)}
      ${M.split ? sec("Where it's sold", `<div class="g2"><div class="card"><h3 class="c-h">Store doors that carry the category</h3>${bars(M.split.doors.map(d => [d[0], d[1], d[2], d[3] ? "var(--clay)" : "var(--sage)"]))}<p class="note"><i class="dot" style="background:var(--clay)"></i> independent, mom and pop · <i class="dot" style="background:var(--sage)"></i> chains and big box</p></div><div class="card"><h3 class="c-h">Share of category sales</h3>${donut(M.split.sales)}<p class="note">${esc(M.split.note || "")}</p></div></div>`, M.split.p) : ""}
      ${sec("Who's winning", `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Brand</th><th>Revenue</th><th>Look</th><th>Sells through</th><th>Why it matters</th></tr></thead><tbody>${M.comps.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td><span class="tag ${r[2] === "modern" ? "good" : r[2] === "rx" ? "" : "bad"}">${r[2] === "modern" ? "Modern, trusted" : r[2] === "rx" ? "Prescription" : "Gas station"}</span></td><td>${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`).join("")}</tbody></table></div><p class="note">${M.compNote || "Revenue is reported where a company publishes it, otherwise a third-party estimate. Sources in the research file."}</p>`)}
      ${sec("Where NexEros fits", posMap(M.map), M.mapP)}
      ${sec("What's missing in the industry", `<div class="gap-list">${M.gaps.map(([t, w, h], i) => `<div class="gap"><span class="gap-n">0${i + 1}</span><div><b>${esc(t)}</b><p>${esc(w)}</p><p class="gap-how"><em>How NexEros owns it:</em> ${esc(h)}</p></div></div>`).join("")}</div>`)}
      ${sec("Brands that rebuilt their look, and what happened", `<div class="rb-grid">${M.rebrands.map(r => `<article class="rb"><b>${esc(r[0])}</b><div class="rb-ba"><span><small>Before</small>${esc(r[1])}</span><span><small>The move</small>${esc(r[2])}</span><span class="rb-after"><small>After</small>${esc(r[3])}</span></div>${r[4] ? `<small class="src">${esc(r[4])}</small>` : ""}</article>`).join("")}</div>`)}
      ${next("brand", "Four quick ideas for the look")}</div>`;
  };
  function donut(rows) {
    let a = 0; const cols = ["var(--green)", "var(--clay)", "var(--honey)", "var(--sage)", "#8a7a6a", "#c9b79c", "#5b6b60"];
    const segs = rows.map((r, i) => { const s = a; a += r[1]; return `${cols[i % cols.length]} ${s}% ${a}%`; }).join(",");
    return `<div class="dn"><div class="dn-pie" style="background:conic-gradient(${segs})"><span></span></div><ul>${rows.map((r, i) => `<li><i style="background:${cols[i % cols.length]}"></i>${esc(r[0])}<b>${r[1]}%</b></li>`).join("")}</ul></div>`;
  }
  function posMap(pts) {
    return `<div class="pm"><div class="pm-box">${pts.map(([n, x, y, me]) => `<span class="pm-pt ${me ? "me" : ""} ${x > .8 ? "lft" : ""}" style="left:${x * 100}%;top:${(1 - y) * 100}%"><i></i>${esc(n)}</span>`).join("")}<em class="pm-ax pm-l">Clinical</em><em class="pm-ax pm-r">Natural</em><em class="pm-ax pm-t">Trusted</em><em class="pm-ax pm-b">Gas station</em></div></div>`;
  }
  function scenario(S) {
    return `<div class="g3">${S.rows.map(r => `<div class="card sc"><span class="eyebrow">${esc(r[0])}</span><b class="sc-b">${esc(r[1])}</b><p>${esc(r[2])}</p></div>`).join("")}</div><div class="card sc-as"><b>Assumptions</b><ul>${S.assume.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>`;
  }

  /* ---------- deep read ---------- */
  APP.views.read = () => `<div class="pg">${hero("Deep read", "What sets NexEros apart is inside the capsule.", "Seven plants with centuries of use. Today your brand hides them behind the same look as the pills by the register. Here's who buys, how you reach them now, and how to tell the plant story so it sells and holds up.")}
    ${sec("The gas station, or the garden", `<div class="gg"><div class="gg-h"><span>Looks like the gas station</span><span>Looks like the garden</span></div>${C.thesis.map(([a, b]) => `<div class="gg-r"><s>${esc(a)}</s><b>${esc(b)}</b></div>`).join("")}</div>`)}
    ${sec("Who buys", `<div class="g3">${C.personas.map(p => `<article class="card per"><span class="eyebrow">${esc(p.who)}</span><h3>${esc(p.name)}</h3><div class="per-st"><b>${p.stat[0]}</b><span>${esc(p.stat[1])}</span><small>${esc(p.stat[2])}</small></div><dl><dt>Wants</dt><dd>${esc(p.want)}</dd><dt>Worries</dt><dd>${esc(p.fear)}</dd><dt>Where they are</dt><dd>${esc(p.where)}</dd><dt>What wins them</dt><dd>${esc(p.wins)}</dd></dl></article>`).join("")}</div><p class="note">The buyer is usually a partnered adult, 38 to 62, who already takes supplements. In couples, she often buys for both.</p>`)}
    ${sec("How NexEros advertises today", `<div class="g2">${C.adsToday.map(([a, b]) => `<div class="card"><b class="c-h">${esc(a)}</b><p>${esc(b)}</p></div>`).join("")}</div>`)}
    ${sec("Tell the plant story so it can be proven", `<div class="g3">${C.pillars.map(p => `<div class="card pil"><span class="pil-k">${p.k}</span><b>${p.proof}</b><p>${p.p}</p></div>`).join("")}</div><p class="org-note">${esc(C.organic)}</p>`)}
    ${sec("Fix these before spending a dollar on ads", `<div class="tbl-wrap"><table class="tbl fx"><thead><tr><th>On the site today</th><th>Why it's a problem</th><th>Say this instead</th></tr></thead><tbody>${C.fixes.map(r => `<tr><td><s>${esc(r[0])}</s></td><td>${esc(r[1])}</td><td><b>${esc(r[2])}</b></td></tr>`).join("")}</tbody></table></div><p class="note">* With the FDA line underneath. One more step that changes everything: an outside lab test of the current batches that screens for hidden drugs. If it comes back clean, it becomes the best marketing NexEros has.</p>`, "These stop ads, Amazon and wholesale buyers. All of them are a day's work.")}
    ${sec("Ten things to say", `<div class="ang">${C.angles.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`, "None promises a duration, compares to a prescription or says organic. Every one passes Meta's rules for health ads.")}
    ${next("seen", "Visibility")}</div>`;

  /* ---------- visibility ---------- */
  APP.views.seen = () => `<div class="pg">${hero("Visibility", "Right now, hardly anyone can find NexEros.", `A check of search, social, marketplaces, reviews, email and content on ${C.checked}. No one person can keep all of this up by hand. That's what the Hub is for.`)}
    <section class="pg-sec rise"><div class="vs-score">${C.score.map(([a, b]) => `<div class="vs-s"><span>${a}</span><b>${b}<small>/10</small></b><i><em style="width:${b * 10}%"></em></i></div>`).join("")}</div></section>
    ${sec("What we found", `<div class="g2">${C.seen.map(s => `<div class="card vs-c"><div class="vs-h"><b>${esc(s.k)}</b><span class="tag ${s.s >= 5 ? "warn" : "bad"}">${s.s}/10</span></div><ul>${s.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>`).join("")}</div>`)}
    ${sec("What's under the hood", `<div class="stk">${C.stack.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`, "You already have the tools. They just aren't connected to anything.")}
    ${sec("The five biggest gaps", `<ol class="big-ol">${C.gaps.map(g => `<li>${esc(g)}</li>`).join("")}</ol>`)}
    ${next("seo", "Search")}</div>`;

  /* ---------- search ---------- */
  APP.views.seo = () => {
    const S = C.seo;
    if (!S) return `<div class="pg">${hero("Search (SEO)", "Search for NexEros and you won't find it.", "Where it ranks today, what's broken, and the fix list.")}${pending("The search audit")}</div>`;
    return `<div class="pg">${hero("Search (SEO)", S.h, S.p)}
      <section class="pg-sec rise"><div class="vs-score">${S.score.map(([a, b]) => `<div class="vs-s"><span>${a}</span><b>${b}<small>/10</small></b><i><em style="width:${b * 10}%"></em></i></div>`).join("")}</div></section>
      ${sec("Where it ranks", `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Search</th><th>NexEros</th><th>Who's on top</th></tr></thead><tbody>${S.ranks.map(r => `<tr><td>${esc(r[0])}</td><td><span class="tag ${r[1] === "not found" ? "bad" : "warn"}">${esc(r[1])}</span></td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div><p class="note">${esc(S.rankNote)}</p>`)}
      ${sec("What's broken", `<div class="g2">${S.broken.map(([a, b]) => `<div class="card"><b class="c-h">${esc(a)}</b><p>${esc(b)}</p></div>`).join("")}</div>`)}
      ${sec("New titles for the main pages", `<div class="serp-list">${S.titles.map(([u, t, d]) => `<div class="serp"><small>nexeros.com${esc(u)}</small><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join("")}</div>`, "What each page would look like in Google.")}
      ${sec("The plan", `<div class="g3">${S.plan.map(([k, items]) => `<div class="card"><span class="eyebrow">${esc(k)}</span><ul class="tick">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>`)}
      ${sec("Twelve articles that can rank", `<div class="ang">${S.articles.map(([a, b]) => `<div><b>${esc(a)}</b><span>Target search: ${esc(b)}</span></div>`).join("")}</div>`, "Written by the Hub, checked against the claims rules, approved by you in one tap.")}
      ${next("channels", "Channels")}</div>`;
  };

  /* ---------- channels ---------- */
  const ST = { open: ["good", "Open"], gated: ["warn", "Needs approval"], closed: ["bad", "Closed"] };
  APP.views.channels = () => `<div class="pg">${hero("Channels", "Sell everywhere. Run it all from one place.", "Today you sell in one place: your own website. Here's every place you could sell, what each one takes, and the order to open them. One product catalog and one inventory in the Hub feeds all of them.")}
    ${sec("", hubFlow())}
    ${C.channels.map(g => sec(g.g, `<div class="ch-list">${g.rows.map(([n, s, f, p]) => `<div class="ch"><div class="ch-n"><b>${esc(n)}</b><span class="tag ${ST[s][0]}">${ST[s][1]}</span></div><p>${esc(p)}</p><span class="fit" title="Fit ${f} of 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= f ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>`)).join("")}
    ${sec("Open them in this order", `<ol class="big-ol two">${C.first10.map(x => `<li>${esc(x)}</li>`).join("")}</ol>`)}
    ${sec("What a 5-pack earns where", `<div class="g4">${C.whole.map(([a, b]) => `<div class="card mini"><span>${esc(a)}</span><b>${b}</b></div>`).join("")}</div><p class="note">Distributors work only if the product costs about $4 to $5 a 5-pack or less. That's the first number we'd want from you.</p>`)}
    ${next("marketing", "Marketing")}</div>`;
  function hubFlow() {
    const L = ["nexeros.com", "Amazon", "Walmart", "iHerb", "Google Shopping"], R = ["Distributors", "Wholesale portal", "Boutiques", "Pharmacies", "Affiliates"];
    return `<div class="hf"><div class="hf-col">${L.map(x => `<span>${x}</span>`).join("")}</div><div class="hf-mid">${NX.mark("rooted", 42)}<b>NexEros Hub</b><small>One catalog · one inventory · every order</small></div><div class="hf-col">${R.map(x => `<span>${x}</span>`).join("")}</div></div>`;
  }

  /* ---------- marketing, with the ad optimizer ---------- */
  const AD = [
    { ch: "Amazon Sponsored Products", spend: 1800, sales: 7400, tgt: 3.5, note: "Exact-match winners get +20%" },
    { ch: "Google Search", spend: 1200, sales: 3900, tgt: 3, note: "Plant and brand terms only" },
    { ch: "Meta (health, 18+)", spend: 900, sales: 2100, tgt: 2.5, note: "Below target: swap in the \"Know the plant\" ads" },
    { ch: "Walmart Connect", spend: 400, sales: 900, tgt: 2.5, note: "New, still learning: hold for 2 weeks" },
    { ch: "Amazon Sponsored Brands", spend: 500, sales: 950, tgt: 2.5, note: "Below target, cut 30%" },
  ];
  APP.views.marketing = () => {
    const tot = AD.reduce((a, r) => a + r.spend, 0), sal = AD.reduce((a, r) => a + r.sales, 0);
    return `<div class="pg">${hero("Marketing", "Connect what's there. Build what's missing. Let it run.", "You can't write emails, post, run ads on four platforms and answer reviews by yourself. The Hub does the work and brings you the decisions.")}
    ${sec("What you have today, and where it goes", `<div class="stk">${[["Shopify", "Orders, customers, subscriptions", "rebuilt or moved to Woo"], ["Klaviyo", "Email lists and reviews", "moves into the Hub"], ["Meta pixel", "Who visits, who buys", "connect"], ["Google Analytics", "Where traffic comes from", "connect"], ["Merchant Center", "The product feed for Google", "connect"]].map(([a, b, t]) => `<div><b>${a}</b><span>${b}</span><em class="tag ${t === "connect" ? "good" : "warn"}">${t}</em></div>`).join("")}</div>`, "Your store gets rebuilt on Shopify or moved to WooCommerce, with cards through PaymentCloud, and your list and reviews move into the Hub. The tracking you already have stays and gets connected.")}
    ${sec("What we build", `<div class="g3">${[["Emails that send themselves", "Welcome, the day-25 reorder nudge, win-back, the anniversary gift. Written once, in the new voice, then running."], ["A review engine", "Asks at the right day, posts answers, and shows the real number everywhere. Feeds Amazon and Google too."], ["One plant a week", "An ingredient guide built to rank, drafted by AI, checked against the claims rules, approved in a tap."], ["Creators and practitioners", "Affiliate links for menopause creators, couples therapists and naturopaths. Payouts tracked in the Hub."], ["A creative studio", "New ads in the brand's look, each checked against Meta's and Google's rules before it ships."], ["The ad optimizer", "Every platform's spend and sales in one place, rebalanced every morning. Below."]].map(([a, b]) => `<div class="card"><b class="c-h">${a}</b><p>${b}</p></div>`).join("")}</div>`)}
    <section class="pg-sec rise"><h2>The ad optimizer</h2><p>Every morning the Hub pulls spend and sales from Amazon, Google, Meta and Walmart through their own connections, works out what each dollar is earning, and drafts the moves. You approve them from your phone.</p>
      <div class="ao"><div class="ao-top"><div><span>Spend this week</span><b>$${fmt(tot)}</b></div><div><span>Ad sales</span><b>$${fmt(sal)}</b></div><div><span>Return on spend</span><b>${(sal / tot).toFixed(1)}x</b></div><div><span>Ad cost of sales, all channels</span><b>${(tot / sal * 100).toFixed(0)}%</b></div></div>
        <div class="tbl-wrap"><table class="tbl ao-t"><thead><tr><th>Channel</th><th>Spend</th><th>Sales</th><th>Return</th><th>Target</th><th>The Hub suggests</th></tr></thead><tbody>${AD.map(r => { const ro = r.sales / r.spend, up = ro >= r.tgt; return `<tr><td><b>${r.ch}</b></td><td>$${fmt(r.spend)}</td><td>$${fmt(r.sales)}</td><td><span class="tag ${up ? "good" : "bad"}">${ro.toFixed(1)}x</span></td><td>${r.tgt}x</td><td>${r.note}</td></tr>`; }).join("")}</tbody></table></div>
        <div class="ao-q"><b>Waiting for you · 4 moves</b>${[["Move $150 from Sponsored Brands to Sponsored Products", "Products return 4.1x, Brands 1.9x"], ["Add 6 search terms as exact match", "\"tongkat ali for men\", \"libido supplement for women\" and 4 more, each with 3+ sales"], ["Pause 11 keywords", "Spent $212 this month, no sales"], ["Raise Google bids on plant terms 10%", "Lost 38% of searches to budget"]].map(([a, b], i) => `<label class="ao-i"><input type="checkbox" ${i < 3 ? "checked" : ""}><span><b>${a}</b><small>${b}</small></span></label>`).join("")}<button class="cta-sm">Approve 3 moves</button></div>
        <p class="note">Sample numbers. The rules: keep each channel at its target return, move budget to whatever earns the most on the next dollar, turn proven search terms into exact matches, cut what doesn't sell, and never spend on TikTok or Pinterest (they don't allow this category).</p></div></section>
    ${C.market && C.market.ads ? sec("What the tools cost today", `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Tool</th><th>What it does</th><th>Price</th></tr></thead><tbody>${C.market.ads.tools.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div><p class="note">${esc(C.market.ads.note || "")}</p>`, "The Hub does the same job for one brand, wired into the rest of the business.") : ""}
    ${next("sales", "Sales")}</div>`;
  };

  /* ---------- sales: find, enrich, queue ---------- */
  const LAYERS = [["erotic", "Adult boutiques", "#b8613f"], ["tobacco", "Smoke and vape shops", "#7a5c99"], ["supplements", "Vitamin and natural shops", "#3f7a52"], ["pharmacy", "Independent pharmacies", "#2f6f9a"], ["spa", "Spas", "#c4862a"]];
  let STORES = null, PER = {}, US = null, layerOn = store.get("nx-layers") || { erotic: true, tobacco: true, supplements: true, pharmacy: false, spa: false }, overlay = store.get("nx-overlay") || "none";
  APP.views.sales = () => `<div class="pg">${hero("Sales", "Find every shop that already sells this. Then call and email them, in order.", "Thousands of mom and pop shops sell libido supplements. The Hub finds them from free public data, fills in what's missing for pennies, scores them, and lines them up in an email queue and a call queue. You just work the list.")}
    <section class="pg-sec rise"><div class="sl-map card"><div class="sl-head"><div><b>Stores on the map</b><span id="sl-count">Loading the stores…</span></div><div class="sl-ov"><span>Overlay</span>${[["none", "Stores"], ["density", "Stores per state"], ["indep", "Independent share"]].map(([k, t]) => `<button data-ov="${k}" class="${overlay === k ? "on" : ""}">${t}</button>`).join("")}</div></div>
      <div class="sl-layers">${LAYERS.map(([k, t, c]) => `<label><input type="checkbox" data-layer="${k}" ${layerOn[k] ? "checked" : ""}><i style="background:${c}"></i>${t}<em data-lc="${k}"></em></label>`).join("")}</div>
      <div id="sl-svg" class="sl-svg"></div><p class="note" id="sl-note">Every dot is a real store from OpenStreetMap, which is free. OpenStreetMap only knows some of them; the paid steps below fill in the rest.</p></div></section>
    ${sec("How the list gets built", `<div class="fun">${[["Find", "OpenStreetMap, the federal pharmacy registry (NPI) and competitors' store locators", "Free"], ["Fill in", "DataForSEO searches Google Maps town by town for phone, website, hours and rating; Google Places fills the gaps", "Pennies per 1,000 searches"], ["Find the owner", "Apollo for bigger shops and chains, Hunter for the rest, from each shop's website", "About $77 and $64 a month, only while running"], ["Score", "AI reads each store's site and reviews: do they sell supplements? Couples-friendly? Independent?", "Under $1 per 1,000 stores"], ["Queue", "The best ones go to email or to the call list, with the note already written", "In the Hub"]].map(([a, b, c], i) => `<div class="fun-s"><span>${i + 1}</span><b>${a}</b><p>${b}</p><em>${c}</em></div>`).join("")}</div>`)}
    ${sec("100 stores a day: does it pay?", APP.roiBox(), "One store saying yes pays for weeks of outreach. Move the sliders.")}
    ${sec("What a day looks like, once it's set up", APP.roiSection())}
    ${sec("What a run costs", APP.calc(5000), "Slide it. You see the price before anything runs, and you only pay when you run it.")}
    ${sec("How many shops there are", bars(C.universe.map(r => [r[0], r[1], r[2]])) , "Independent stores in the US that could carry your products.")}
    ${sec("Your lists", `<div class="q-tabs"><button data-q="leads" class="on">New leads <em id="qn-leads"></em></button><button data-q="email">Email queue <em id="qn-email"></em></button><button data-q="call">Call queue <em id="qn-call"></em></button></div><div id="q-body" class="q-body"></div><p class="note">Real store names and public phone numbers from OpenStreetMap. The scores, the owner names and the emails are samples until the paid steps run. Nothing sends from this page.</p>`)}
    ${sec("The wholesale portal", portal(), "Where stores order once they say yes. Their own login, their price, the lab report, reorder in two taps.")}
    ${next("hq", "The NexEros Hub")}</div>`;
  function portal() {
    return `<div class="wp"><div class="wp-bar"><b>NexEros Wholesale</b><span>Root &amp; Remedy · Asheville, NC · sample</span></div><div class="wp-grid"><div class="wp-cat">${[["Stamina, 5-pack", "$24.98", "MSRP $49.95"], ["Femina, 5-pack", "$24.98", "MSRP $49.95"], ["Counter display, 24 singles", "$198.00", "MSRP $406.80"], ["Velvet Fire, 4 oz", "$24.98", "MSRP $49.95"]].map(([a, b, c]) => `<div class="wp-p"><span>${a}</span><small>${c}</small><b>${b}</b><span class="wp-qty">− 6 +</span></div>`).join("")}</div><div class="wp-side"><div><span>Your terms</span><b>Net 30</b></div><div><span>Last order</span><b>Oct 14 · 36 units</b></div><div><span>Lab report</span><b><a href="#site-ingredients">Batch NX-2611</a></b></div><button class="cta-sm">Reorder last order</button></div></div><p class="note">Sample terms and store.</p></div>`;
  }
  const SAMPLE_FIRST = ["Dana", "Marcus", "Priya", "Tom", "Alicia", "Ray", "Jen", "Omar", "Beth", "Luis", "Kara", "Sam"];
  function leadsFrom(list) {
    // the scored list: independent stores with a phone or a website first; score is a sample until the AI step runs
    const off = /leather|gear|fetish|video|theat|arcade|cinema|peep|bdsm|leash/i, h = t => [...t].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7);
    return list.filter(s => !s.chain).map(s => ({ ...s, score: Math.max(18, Math.min(96, 34 + (s.phone ? 16 : 0) + (s.web ? 12 : 0) + (s.c ? 4 : 0) + ({ erotic: 12, supplements: 14, pharmacy: 10, tobacco: 3, spa: 4 }[s.l] || 0) + h(s.n) % 19 - (off.test(s.n) ? 40 : 0))) })).sort((a, b) => b.score - a.score);
  }
  function queues() {
    const q = store.get("nx-q") || { email: [], call: [], done: {} };
    return q;
  }
  function renderQ(tab) {
    const box = APP.$("#q-body"); if (!box || !STORES) return;
    const q = queues(), all = leadsFrom(STORES.filter(s => layerOn[s.l])), byId = Object.fromEntries(STORES.map(s => [s.id, s]));
    const inQ = new Set([...q.email, ...q.call]);
    APP.$("#qn-leads").textContent = fmt(all.filter(s => !inQ.has(s.id)).length); APP.$("#qn-email").textContent = q.email.length; APP.$("#qn-call").textContent = q.call.length;
    const lt = l => (LAYERS.find(x => x[0] === l) || [, l])[1];
    if (tab === "leads") {
      const rows = all.filter(s => !inQ.has(s.id)).slice(0, 40);
      box.innerHTML = `<div class="q-act"><span>Top 40 of ${fmt(all.length)} independent stores</span><button data-bulk="email">Top 10 with a website → email queue</button><button data-bulk="call">Top 10 with a phone → call queue</button></div><div class="tbl-wrap"><table class="tbl q-t"><thead><tr><th>Store</th><th>Kind</th><th>Where</th><th>Phone</th><th>Website</th><th>Score</th><th></th></tr></thead><tbody>${rows.map(s => `<tr><td><b>${esc(s.n)}</b></td><td>${esc(lt(s.l))}</td><td>${esc([s.c, s.st].filter(Boolean).join(", ") || "US")}</td><td>${s.phone ? `<span class="tag good">yes</span>` : `<span class="tag">find</span>`}</td><td>${s.web ? `<span class="tag good">yes</span>` : `<span class="tag">find</span>`}</td><td><span class="sc-pill" style="--w:${s.score}%">${s.score}</span></td><td class="q-btns"><button data-add="email" data-id="${s.id}">Email</button><button data-add="call" data-id="${s.id}">Call</button></td></tr>`).join("")}</tbody></table></div>`;
    } else if (tab === "email") {
      const rows = q.email.map(id => byId[id]).filter(Boolean);
      box.innerHTML = rows.length ? `<div class="em-list">${rows.map((s, i) => `<article class="em"><div class="em-h"><b>To: ${SAMPLE_FIRST[i % 12]} at ${esc(s.n)}</b><span class="tag ${q.done[s.id] ? "good" : "warn"}">${q.done[s.id] ? "Approved" : "Draft"}</span></div><div class="em-s">Subject: A plant-based line your ${s.l === "erotic" ? "couples" : s.l === "pharmacy" ? "front-counter" : "wellness"} shoppers will ask about</div><p>Hi ${SAMPLE_FIRST[i % 12]}, I'm Oliver, the founder of NexEros. We make plant-based formulas for couples: seven botanicals, every dose on the label, and every batch tested by an outside lab for hidden drugs (the report's on the box). ${s.l === "erotic" ? "Boutiques like yours tell us customers want something they can trust." : s.l === "pharmacy" ? "It's a clean option to point to when people ask what's safe." : "It sits right next to the rest of the supplement shelf."} Keystone margin, 12-unit minimum, and a counter display. Can I send you samples?</p><div class="em-f">${q.done[s.id] ? `<span>Sends from your own email after you approve. Nothing sends from this page.</span>` : `<button data-ok="${s.id}">Approve</button><button data-rm="email" data-id="${s.id}">Remove</button>`}</div></article>`).join("")}</div>` : `<div class="q-empty">The email queue is empty. Add stores from New leads.</div>`;
    } else {
      const rows = q.call.map(id => byId[id]).filter(Boolean);
      box.innerHTML = rows.length ? `<div class="call-list">${rows.map((s, i) => `<article class="cl"><div class="cl-n"><span class="cl-i">${i + 1}</span><div><b>${esc(s.n)}</b><small>${esc(lt(s.l))} · ${esc([s.c, s.st].filter(Boolean).join(", "))}</small></div><a class="cl-ph" href="${s.phone ? "tel:" + esc(s.phone) : "#sales"}">${esc(s.phone || "find number")}</a></div><div class="cl-b"><div><span>Best time</span><b>${["Tue to Thu, 10 to 11 am", "Weekdays after 2 pm", "Mon or Fri morning"][i % 3]}</b></div><div><span>Open with</span><b>${s.l === "erotic" ? "\"Do your couples ask for anything for her?\"" : s.l === "pharmacy" ? "\"What do you tell people who ask about natural libido products?\"" : "\"Is the supplement shelf yours to stock?\""}</b></div><div><span>Then</span><b>The lab report, keystone margin, free samples</b></div></div><div class="cl-o">${["Interested", "Call back", "Not now"].map(o => `<button data-out="${o}" data-id="${s.id}" class="${(q.done[s.id] || "") === o ? "on" : ""}">${o}</button>`).join("")}</div></article>`).join("")}</div>` : `<div class="q-empty">The call queue is empty. Add stores from New leads.</div>`;
    }
    box.dataset.tab = tab;
  }
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-q],[data-add],[data-bulk],[data-ok],[data-rm],[data-out],[data-ov]"); if (!t || !APP.$("#q-body") && !t.dataset.ov) return;
    const q = queues(), cur = (APP.$("#q-body") || {}).dataset ? APP.$("#q-body").dataset.tab || "leads" : "leads";
    if (t.dataset.ov) { overlay = t.dataset.ov; store.set("nx-overlay", overlay); document.querySelectorAll("[data-ov]").forEach(b => b.classList.toggle("on", b.dataset.ov === overlay)); drawMap(); return; }
    if (t.dataset.q) { document.querySelectorAll("[data-q]").forEach(b => b.classList.toggle("on", b === t)); return renderQ(t.dataset.q); }
    if (t.dataset.add) { const k = t.dataset.add; if (!q[k].includes(+t.dataset.id)) q[k].push(+t.dataset.id); }
    if (t.dataset.bulk) { const k = t.dataset.bulk, inQ = new Set([...q.email, ...q.call]); leadsFrom(STORES.filter(s => layerOn[s.l])).filter(s => !inQ.has(s.id) && (k === "email" ? s.web : s.phone)).slice(0, 10).forEach(s => q[k].push(s.id)); }
    if (t.dataset.ok) q.done[t.dataset.ok] = "ok";
    if (t.dataset.rm) q[t.dataset.rm] = q[t.dataset.rm].filter(x => x !== +t.dataset.id);
    if (t.dataset.out) q.done[t.dataset.id] = t.dataset.out;
    store.set("nx-q", q); renderQ(cur);
  });
  document.addEventListener("change", e => { const l = e.target.closest("[data-layer]"); if (!l) return; layerOn[l.dataset.layer] = l.checked; store.set("nx-layers", layerOn); drawMap(); renderQ((APP.$("#q-body") || {}).dataset.tab || "leads"); });

  // the map: the states drawn from us-atlas (already projected), stores placed with the same Albers USA projection
  function albers(lon, lat) {
    // d3.geoAlbersUsa().scale(1300).translate([487.5, 305]) for the lower 48; Alaska and Hawaii are left off
    if (lat < 24 || lat > 50 || lon < -125 || lon > -66) return null;
    const r = Math.PI / 180, p0 = 29.5 * r, p1 = 45.5 * r, n = (Math.sin(p0) + Math.sin(p1)) / 2, c = Math.cos(p0) ** 2 + 2 * n * Math.sin(p0), lam0 = -96 * r, phi0 = 38.7 * r;
    const rho = p => Math.sqrt(c - 2 * n * Math.sin(p)) / n, th = n * (lon * r - lam0);
    const x = rho(lat * r) * Math.sin(th), y = rho(phi0) - rho(lat * r) * Math.cos(th);
    return [487.5 + 1300 * x, 305 - 1300 * y + 0];
  }
  function topoPaths(topo) {
    // decode the topojson arcs (quantized, delta-encoded) into SVG paths, one per state
    const tf = topo.transform, arcs = topo.arcs.map(a => { let x = 0, y = 0; return a.map(([dx, dy]) => { x += dx; y += dy; return tf ? [x * tf.scale[0] + tf.translate[0], y * tf.scale[1] + tf.translate[1]] : [x, y]; }); });
    const ring = idx => idx.flatMap((i, k) => { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; return k ? a.slice(1) : a; });
    const geo = topo.objects.states.geometries;
    return geo.map(g => { const polys = g.type === "Polygon" ? [g.arcs] : g.arcs; return { id: g.id, name: g.properties.name, d: polys.map(p => p.map(r => "M" + ring(r).map(pt => pt[0].toFixed(1) + "," + pt[1].toFixed(1)).join("L") + "Z").join("")).join("") }; });
  }
  let PATHS = null;
  async function loadMap() {
    try {
      if (!PATHS) { US = US || await fetch("img/us-states.json?v=1793754982").then(r => r.json()); PATHS = topoPaths(US); }
      if (!STORES) { const d = await fetch("img/stores.json?v=1793754982").then(r => r.json()); STORES = d.stores; PER = d.per; }
    } catch (e) { const c = APP.$("#sl-count"); if (c) c.textContent = "The store list didn't load."; return; }
    drawMap(); renderQ("leads");
  }
  function drawMap() {
    const box = APP.$("#sl-svg"); if (!box || !PATHS || !STORES) return;
    const on = STORES.filter(s => layerOn[s.l]), per = {}, ind = {};
    Object.entries(PER).forEach(([st, ls]) => Object.entries(ls).forEach(([l, [i, c]]) => { if (!layerOn[l]) return; per[st] = (per[st] || 0) + i + c; ind[st] = (ind[st] || 0) + i; }));
    const chains = Object.values(PER).reduce((a, ls) => a + Object.entries(ls).reduce((b, [l, v]) => b + (layerOn[l] ? v[1] : 0), 0), 0);
    const max = Math.max(1, ...Object.values(per));
    const fill = p => { if (overlay === "density") { const v = per[p.name] || 0; return `rgba(184,97,63,${(0.06 + 0.8 * Math.sqrt(v / max)).toFixed(2)})`; } if (overlay === "indep") { const v = per[p.name] ? ind[p.name] / per[p.name] : 0; return `rgba(63,122,82,${(0.08 + 0.75 * v).toFixed(2)})`; } return "#ebe4d6"; };
    const LC = Object.fromEntries(LAYERS.map(l => [l[0], l[2]]));
    const dots = overlay === "none" ? on.map(s => { const p = albers(s.lo, s.la); return p ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${s.chain ? 1.3 : 1.9}" fill="${LC[s.l]}" fill-opacity="${s.chain ? .35 : .8}"><title>${esc(s.n)}</title></circle>` : ""; }).join("") : "";
    box.innerHTML = `<svg viewBox="0 0 975 610" role="img" aria-label="Map of US stores">${PATHS.map(p => `<path d="${p.d}" fill="${fill(p)}" stroke="#fff" stroke-width=".8"><title>${esc(p.name)}: ${fmt(per[p.name] || 0)} stores${per[p.name] ? `, ${Math.round(ind[p.name] / per[p.name] * 100)}% independent` : ""}</title></path>`).join("")}${dots}</svg>`;
    APP.$("#sl-count").textContent = `${fmt(on.length)} independent stores on the map · ${fmt(chains)} chain stores counted, not shown`;
    LAYERS.forEach(([k]) => { const el = document.querySelector(`[data-lc="${k}"]`); if (el) el.textContent = fmt(STORES.filter(s => s.l === k).length); });
  }
  document.addEventListener("nx-render", e => { if (e.detail.v === "sales") loadMap(); });

  /* ---------- what the AI costs to run: running costs only, never the build ---------- */
  // all-in rates as of Nov 3, 2026: dollars per million tokens in / out, per search, per store, per month
  const tok = (inM, outM, m) => m === "s" ? inM * 2.6 + outM * 13 : inM * 0.13 + outM * 0.65;
  // the AI plan: every job switches on or off and starts at a sensible amount; cost is per unit, all-in
  const JOBS = [
    { k: "stores", name: "Find and email new stores", what: "The leads Trae works: found, filled in, scored, and a first email written to each", unit: "stores a day", qty: 100, min: 25, max: 300, step: 25, cost: q => roiNums(Object.assign({}, ROI0, { perDay: q })).monthly },
    { k: "brief", name: "Morning briefs", what: "Reads yesterday across every channel and writes each of the four of you six lines", unit: "every day, four people", qty: 120, fixed: true, cost: q => q * 0.052 },
    { k: "ask", name: "Ask the Hub anything", what: "\"Which stores haven't reordered?\" Answered from your own data, for all four people", unit: "questions a month", qty: 500, min: 100, max: 2500, step: 100, cost: q => q * 0.0655 },
    { k: "calls", name: "Call notes", what: "Every store call summarized, with the next step, straight into the store's record", unit: "calls a month", qty: 660, min: 0, max: 2000, step: 60, cost: q => q * 0.0234 },
    { k: "ads", name: "The ad optimizer", what: "Reads Amazon, Google, Meta and Walmart spend each morning and drafts the moves", unit: "every day", qty: 30, fixed: true, cost: q => q * tok(0.03, 0.002, "s") },
    { k: "articles", name: "Cited plant articles", what: "Drafted, sourced and checked against the claims rules", unit: "articles a month", qty: 4, min: 1, max: 12, step: 1, cost: q => q * tok(0.02, 0.006, "s") },
    { k: "reviews", name: "Review replies", what: "A thoughtful reply to every review, for you to approve", unit: "reviews a month", qty: 100, min: 25, max: 1000, step: 25, cost: q => q * tok(0.002, 0.0002, "h") },
    { k: "claims", name: "The claims checker", what: "Every page, ad and email scanned for risky lines before it goes out", unit: "pieces a month", qty: 60, min: 20, max: 400, step: 20, cost: q => q * tok(0.004, 0.0003, "h") },
    { k: "chat", name: "Website chat", what: "Answers label and shipping questions; sends anything medical to a doctor", unit: "chats a month", qty: 500, min: 100, max: 5000, step: 100, cost: q => q * tok(0.008, 0.0005, "h") },
    { k: "stock", name: "Stock and reorder forecast", what: "Watches every channel's sales and warns before Amazon runs dry", unit: "every night", qty: 30, fixed: true, cost: q => q * tok(0.01, 0.0005, "h") },
    { k: "books", name: "Bookkeeping match", what: "Every payout and fee sorted into QuickBooks", unit: "every night", qty: 30, fixed: true, cost: q => q * tok(0.005, 0.0005, "h") },
    { k: "host", name: "Hosting the Hub", what: "The Hub app, the master database and logins, text alerts", unit: "every month", qty: 1, fixed: true, cost: q => q * 65 },
    { k: "woo", name: "Your store on WooCommerce", what: "Store and subscriptions on WooCommerce, cards through PaymentCloud. Switch off to keep Shopify, rebuilt in the new look, and pay Shopify directly", unit: "every month", qty: 1, fixed: true, cost: q => q * 64 },
  ];
  const planState = () => { const saved = store.get("nx-plan") || {}; return JOBS.map(j => Object.assign({ on: true, qty: j.qty }, saved[j.k] || {})); };
  const planTotal = st => JOBS.reduce((a, j, i) => a + (st[i].on ? j.cost(st[i].qty) : 0), 0);
  const fmtMo = v => v < 0.995 ? "under $1" : "$" + (v < 10 ? v.toFixed(2) : Math.round(v).toLocaleString("en-US"));
  function planBox() {
    const st = planState();
    return `<div class="plan card" id="plan">${JOBS.map((j, i) => `<div class="pl-r ${st[i].on ? "" : "off"}" data-pr="${i}"><label class="pl-on"><input type="checkbox" data-pon="${i}" ${st[i].on ? "checked" : ""} aria-label="Include ${j.name}"><span></span></label>
      <div class="pl-what"><b>${j.name}</b><small>${j.what}</small></div>
      <div class="pl-amt">${j.fixed ? `<span class="pl-fixed">${j.unit}</span>` : `<input type="range" data-pq="${i}" min="${j.min}" max="${j.max}" step="${j.step}" value="${st[i].qty}" aria-label="${j.name}: ${j.unit}"><span class="pl-q"><b data-pqv="${i}">${st[i].qty.toLocaleString("en-US")}</b> ${j.unit}</span>`}</div>
      <em class="pl-c" data-pc="${i}">${st[i].on ? fmtMo(j.cost(st[i].qty)) : "off"}</em></div>`).join("")}
      <div class="pl-sum"><span><b>Your plan</b><small>Sized for four people, starting at 100 new stores a day with everything on. Switch off what you don't need, slide what you want more of.</small></span><em id="pl-total">about $${Math.ceil(planTotal(st)).toLocaleString("en-US")} a month</em></div></div>`;
  }
  function planUpdate(st) {
    store.set("nx-plan", Object.fromEntries(JOBS.map((j, i) => [j.k, st[i]])));
    JOBS.forEach((j, i) => { const c = document.querySelector(`[data-pc="${i}"]`), r = document.querySelector(`[data-pr="${i}"]`), v = document.querySelector(`[data-pqv="${i}"]`); if (c) c.textContent = st[i].on ? fmtMo(j.cost(st[i].qty)) : "off"; if (r) r.classList.toggle("off", !st[i].on); if (v) v.textContent = st[i].qty.toLocaleString("en-US"); });
    const t = "about $" + Math.ceil(planTotal(st)).toLocaleString("en-US");
    const el = APP.$("#pl-total"); if (el) el.textContent = t + " a month";
    const top = APP.$("#rc-plan"); if (top) top.textContent = t;
  }
  document.addEventListener("input", e => { const i = e.target.dataset && e.target.dataset.pq; if (i == null) return; const st = planState(); st[+i].qty = +e.target.value; planUpdate(st); });
  document.addEventListener("change", e => { const i = e.target.dataset && e.target.dataset.pon; if (i == null) return; const st = planState(); st[+i].on = e.target.checked; planUpdate(st); });
  const PER_STORE = { places: 0.026, email: 63.7 / 2000, score: tok(0.005, 0.0003, "h") / 2, draft: tok(0.003, 0.0004, "s"), follow: 2 * tok(0.002, 0.00025, "s") + 0.03 * tok(0.006, 0.0005, "s") };
  const money2 = n => n < 0.995 ? "under $1" : "$" + (n < 10 ? n.toFixed(2) : Math.round(n).toLocaleString("en-US"));
  APP.views.costs = () => {
    const mo = planTotal(planState());
    return `<div class="pg">${hero("What the AI costs to run", "A team's worth of work, for a few dollars a month.", "There's no build fee. This is what the AI and data tools cost to run once the Hub is in place, task by task, at today's prices. All-in: nothing else gets added.")}
    <section class="pg-sec rise"><div class="rc-top"><div><span>Your plan, a month</span><b id="rc-plan">about $${Math.ceil(mo).toLocaleString("en-US")}</b><small>Four people, 100 new stores a day and every job below, hosting included. Change it underneath.</small></div><div><span>Find and enrich 500 stores</span><b>about $${Math.round(runCost(500))}</b><small>About ${Math.round(runCost(500) / 5)} cents a store, only when you run it</small></div></div></section>
    ${sec("Build your plan", planBox() + `<p class="note">Estimates from typical sizes for each job. Simple jobs run on Claude Haiku, writing and judgment on Claude Sonnet. The Hub shows the real figure every month, job by job, and you can change the plan anytime.</p>`, "Every job the AI can take off your plate. Check what you want, set how much, and see the month.")}
    ${sec("What you can stop paying for", APP.savings(), "Your store runs on Shopify plus a handful of add-ons. The Hub takes over the add-ons, your store gets rebuilt on Shopify or moved to WooCommerce (your call), and the expensive tools brands buy as they grow never show up.")}
    ${sec("100 new stores a day: does it pay?", APP.roiBox(), "The biggest line in the plan, and the one that pays for the rest. One store saying yes covers weeks of outreach.")}
    ${sec("What a day looks like, once it's set up", APP.roiSection())}
    ${sec("Find and enrich stores: priced per run", calc(5000), "Run it for one state or the whole country. You see the price before it runs.")}
    ${sec("More you could do for pennies", `<div class="ang">${[["Amazon pages that write themselves", "Titles, bullets and A+ content from your label, kept in step with your site. About $1.30 for the whole catalog."], ["Know what customers say", "Every review read each week: what they love, what they'd change. About a dollar a week."], ["Watch the competition", "Weekly check of rival prices and claims on Amazon and their sites. A few dollars a month."], ["Podcast and creator pitches", "Finds relationship and menopause shows, drafts a pitch for each. A cent or two apiece."], ["Follow up on samples", "Every store that got samples gets a note on day 7 and day 14, in your voice, for you to approve."], ["Trade show prep", "Who's exhibiting and buying at a show, with a meeting request drafted for each."], ["Price floor watch", "Flags any seller under your price on any marketplace, before it spreads."], ["Your calls, summarized", "Record a store call (with their OK), get the notes and next step in the Hub. A few cents a call."], ["Anniversary reminders", "Customers who opt in get a nudge before the date they gave you. The gift that sells itself."], ["Spanish, when you're ready", "Listings and emails for Spanish-speaking shoppers. About $1.30 for the catalog."]].map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join("")}</div>`)}
    <p class="note rise">All-in prices as of ${C.checked}, built from each provider's published rates: Claude (Anthropic), DataForSEO, Google Places, Apollo, Hunter and ElevenLabs. Providers change their prices; the Hub shows the real figure every month and before every run.</p>
    ${next("questions", "Your turn")}</div>`;
  };
  function calc(n) {
    return `<div class="rcalc card" data-calc><div class="rcalc-h"><label for="rc-n">Stores to find and enrich</label><b id="rc-nv">${n.toLocaleString("en-US")}</b></div><input id="rc-n" type="range" min="250" max="20000" step="250" value="${n}" aria-label="Stores to find and enrich"><div class="rcalc-rows" id="rc-rows">${calcRows(n)}</div></div>`;
  }
  function calcRows(n) {
    // assumptions: a Google Maps search turns up about 5 new shops; DataForSEO covers ~80% of the details and Google
    // Places fills the rest; ~60% of shops have a website for Hunter; Apollo knows ~1 in 5 small shops (1 credit an email)
    const apolloCredits = Math.round(n * 0.2), rows = [
      ["Find them", "OpenStreetMap, the federal pharmacy registry and competitors' store lists", 0],
      ["Search Google Maps, town by town", "DataForSEO: phone, website, rating and hours come back with each search", n / 5 * 0.00078],
      ["Fill the gaps", "Google Places for the ~20% DataForSEO misses, first 1,000 free each month", Math.max(0, n * 0.2 - 1000) * PER_STORE.places],
      ["Owner's name and email: Apollo", "Best for chains, distributors and bigger shops. Monthly, only while running", 76.7 + Math.max(0, apolloCredits - 1000) * 0.26],
      ["Owner's name and email: Hunter", "Finds the email from each shop's website, 2,000 a month; pause between runs", Math.ceil(n * 0.6 / 2000) * 63.7],
      ["Score every store", "Claude Haiku reads each store's site and reviews, in a batch", n * PER_STORE.score],
      ["Write the first email", "Claude Sonnet, one note per store, for you to approve", n * PER_STORE.draft]];
    const tot = rows.reduce((a, r) => a + r[2], 0);
    return rows.map(r => `<div class="rcr"><span><b>${r[0]}</b><small>${r[1]}</small></span><em>${r[2] === 0 ? "free" : money2(r[2])}</em></div>`).join("") + `<div class="rcr tot"><span><b>Total</b><small>about ${Math.max(1, Math.round(tot / n * 100))} cents a store. Prices change; the Hub checks them before each run.</small></span><em>$${Math.round(tot).toLocaleString("en-US")}</em></div>`;
  }
  document.addEventListener("input", e => { if (e.target.id !== "rc-n") return; const n = +e.target.value; APP.$("#rc-nv").textContent = n.toLocaleString("en-US"); APP.$("#rc-rows").innerHTML = calcRows(n); });
  APP.calc = calc;
  function runCost(n) { const t = document.createElement("div"); t.innerHTML = calcRows(n); return +t.querySelector(".tot em").textContent.replace(/[$,]/g, ""); }

  /* ---------- what you can stop paying for: his stack today, what the Hub replaces, what he never needs ---------- */
  // tools from research/tech-and-visibility.md; prices from public pricing pages and recent summaries, Nov 2026 (estimates)
  const TODAY = [
    ["Klaviyo email", "The Insider list, popups and flows", "$30 to $70", "Grows with your list: about $150 at 10,000 people", "Replaced", "Emails send from the Hub: about $1 per 10,000"],
    ["Klaviyo Reviews", "Product reviews and stars", "$0 to $50", "A separate add-on to the email plan", "Replaced", "Reviews collected, shown on the site and sent to Google by the Hub"],
    ["All-in-One Discount (Cirkle)", "Bundles and member pricing", "$10 to $20", "Estimate", "Replaced", "WooCommerce's built-in coupons and pricing, set from the Hub"],
    ["Hoppy Trust Badges", "Badges under the buy button", "$0 to $10", "Estimate", "Replaced", "Built into the new site"],
    ["idealdata.io", "Forms and tracking", "$0 to $20", "Estimate", "Replaced", "The Hub's own forms and tracking"],
    ["Shopify", "The store and the checkout", "$29 to $105", "Plus 2% of every order if Shopify Payments ever drops you, which happens often in this category", "Your choice", "Move to WooCommerce: about $65 a month in your plan, cards through PaymentCloud, no platform fee. Or keep Shopify, rebuilt in the new look. Either way the Hub runs on top"],
    ["Google Workspace", "Your email", "$8 to $17", "One or two people", "Keep", "Stays as it is"],
  ];
  const NEVER = [
    ["A wholesale platform", "Up to $2,300 a month (Shopify Plus B2B)", "The wholesale portal: store logins, their prices, reorders, net terms"],
    ["Ad automation and attribution", "$300 to $1,100 a month", "The ad optimizer, across Amazon, Google, Meta and Walmart"],
    ["Multichannel inventory", "From $349 a month", "One catalog and one stock count in the Hub, feeding every channel"],
    ["A sales CRM", "$20 to $100 per person a month", "The store engine, the email queue and the call queue"],
    ["Helpdesk, loyalty, referral and affiliate apps", "$20 to $300 a month, together", "The Hub's inbox, the membership, referrals and creator links"],
  ];
  const OTHER = [
    ["Card processing", "Cards run through PaymentCloud, our merchant processing partner, which already works with supplement and male-enhancement brands and plugs into WooCommerce or Shopify. On WooCommerce there's no platform fee on top; on Shopify, any processor other than Shopify Payments adds Shopify's 2%. If PayPal is on, steer people to cards; PayPal costs more per order."],
    ["Shipping", "A capsule pack weighs next to nothing. Discounted USPS Ground Advantage labels through WooCommerce Shipping run well under the $8.95 you charge, and Amazon's blank-box fulfillment ships discreetly for every channel."],
    ["Ad money", "Move the adult-network budget to search, email and creators, where the ad optimizer can measure every dollar."],
    ["The free-capsule offer", "\"Just pay shipping\" can buy customers cheaply or lose money. The Hub tracks whether those buyers ever come back, so you'll know."],
    ["Membership", "Fold the $24.99 club into the subscription, and the discount app it leans on goes away."],
  ];
  APP.savings = () => `<div class="tbl-wrap"><table class="tbl sv-t"><thead><tr><th>Tool</th><th>What it does</th><th>Today, a month</th><th>With the Hub</th></tr></thead><tbody>${TODAY.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td><b>${r[2]}</b><small>${r[3]}</small></td><td><span class="tag ${r[4] === "Keep" ? "" : r[4] === "Your choice" ? "warn" : "good"}">${r[4]}</span><small>${r[5]}</small></td></tr>`).join("")}<tr class="rc-sum"><td colspan="2"><b>Today, all of it</b></td><td><b>about $80 to $290</b></td><td><b>About $40 to $170 of the add-ons go away</b> either way. Moving to WooCommerce also drops the Shopify plan and its 2% fee risk, for about $65</td></tr></tbody></table></div><p class="note">Estimates from what runs on nexeros.com and each tool's public pricing. Your real bills turn these into exact numbers; the Sage interview asks.</p>
    <h3 class="sv-h">What you'll never need to buy</h3><div class="sv-never">${NEVER.map(([a, b, c]) => `<div><b>${a}</b><em>${b}</em><span>Instead: ${c}</span></div>`).join("")}</div>
    <h3 class="sv-h">Other ways to keep more of each order</h3><div class="ang">${OTHER.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join("")}</div>`;

  /* ---------- 100 stores a day: what it costs, what it takes, what breaks even ---------- */
  // all-in monthly: Apollo, Hunter (2,000 lookups), a second sending inbox and domain; per store: a DataForSEO
  // search, Google Places gaps (free under 1,000 a month), a Haiku score and a Sonnet email.
  const DAYS = 22;   // business days a month
  function roiNums(o) {
    const leads = o.perDay * DAYS, hunter = Math.ceil(leads * 0.6 / 2000) * 63.7, places = Math.max(0, leads * 0.2 - 1000) * PER_STORE.places;
    const variable = leads * (0.000156 + PER_STORE.score + PER_STORE.draft + PER_STORE.follow) + places + Math.max(0, leads * 0.2 - 1000) * 0.26;
    const monthly = 76.7 + hunter + 13 + variable;
    const gpUnit = 24.98 - o.cogs, gpAcct = gpUnit * o.units, accounts = leads * o.rate / 100;
    return { leads, monthly, perLead: monthly / leads, perDay: monthly / DAYS, gpUnit, gpAcct, beAccts: monthly / gpAcct, beUnits: monthly / gpUnit, accounts, gp: accounts * gpAcct, roi: accounts * gpAcct / monthly };
  }
  const ROI0 = { perDay: 100, cogs: 5, units: 12, rate: 0.5 };
  function roiBox() {
    const o = Object.assign({}, ROI0, store.get("nx-roi") || {});
    return `<div class="roi card" id="roi"><div class="roi-in">${[["perDay", "New stores a day", 25, 300, 25, v => v], ["rate", "Stores that open an account", 0.1, 3, 0.1, v => v.toFixed(1) + "%"], ["units", "5-packs in an opening order", 6, 48, 6, v => v], ["cogs", "What a 5-pack costs you to make", 2, 15, 0.5, v => "$" + v.toFixed(2)]].map(([k, t, mn, mx, st, f]) => `<label><span>${t}</span><b data-rv="${k}">${f(o[k])}</b><input type="range" data-roi="${k}" min="${mn}" max="${mx}" step="${st}" value="${o[k]}"></label>`).join("")}<p class="note">Sample inputs. The cost to make a 5-pack is a guess until you tell us; the opening order is the 12-unit minimum at $24.98 wholesale.</p></div><div class="roi-out" id="roi-out">${roiOut(o)}</div></div>`;
  }
  function roiOut(o) {
    const n = roiNums(o), f0 = v => "$" + Math.round(v).toLocaleString("en-US"), f2 = v => "$" + v.toFixed(2);
    return `<div class="roi-tiles"><div><span>AI and tools, a month</span><b>${f0(n.monthly)}</b><small>${f2(n.perDay)} a day · ${Math.round(n.perLead * 100 * 10) / 10}¢ a store · ${n.leads.toLocaleString("en-US")} stores a month</small></div><div><span>To break even</span><b>${n.beAccts < 1 ? "1 account" : Math.ceil(n.beAccts) + " accounts"}</b><small>a month covers it. Or ${Math.ceil(n.beUnits)} five-packs. One opening order earns ${f0(n.gpAcct)}</small></div><div class="hi"><span>At ${o.rate.toFixed(1)}% opening</span><b>${n.accounts < 10 ? n.accounts.toFixed(1) : Math.round(n.accounts)} new stores</b><small>a month, about ${f0(n.gp)} gross profit on the first orders alone: ${n.roi >= 10 ? Math.round(n.roi) : n.roi.toFixed(1)}x what the AI costs</small></div></div>
      <div class="roi-per"><b>Per day of ${o.perDay} emails:</b> it costs ${f2(n.perDay)}. One 5-pack sold to one of those ${o.perDay} stores earns ${f2(n.gpUnit)} and pays for ${n.gpUnit / n.perDay >= 2 ? Math.floor(n.gpUnit / n.perDay) + " days" : "the day"} of outreach. One opening order pays for about ${Math.floor(n.gpAcct / n.perDay)} days.</div>`;
  }
  document.addEventListener("input", e => {
    const k = e.target.dataset && e.target.dataset.roi; if (!k) return;
    const o = Object.assign({}, ROI0, store.get("nx-roi") || {}); o[k] = +e.target.value; store.set("nx-roi", o);
    const fmt1 = { perDay: v => v, rate: v => v.toFixed(1) + "%", units: v => v, cogs: v => "$" + v.toFixed(2) }[k];
    document.querySelector(`[data-rv="${k}"]`).textContent = fmt1(o[k]); APP.$("#roi-out").innerHTML = roiOut(o);
  });
  const FLOW = [
    ["6:00 am", "Pick the next 100", "From the map: the region and store types you chose. Already-contacted stores are skipped.", "auto"],
    ["6:05", "Fill them in", "DataForSEO and Google Places add phone, website, hours and rating; Apollo and Hunter find the buyer and check the email will deliver.", "auto"],
    ["6:20", "Score and sort", "Claude Haiku reads each store's site and reviews. Poor fits drop out; the best go first.", "auto"],
    ["6:30", "Write 100 first emails", "Claude Sonnet writes each one to that store: what they carry, why NexEros fits, the lab report, samples offered.", "auto"],
    ["8:00", "You approve", "Skim the queue on your phone. Approve all, or fix a few. About 15 minutes.", "you"],
    ["All day", "They go out, spaced", "Sent from a second inbox on its own domain, a few an hour, so your main email stays clean. Every email has your address and a one-click opt-out.", "auto"],
    ["As they come", "Replies, sorted", "Interested, not now, questions: each with a reply drafted. You answer in about 10 minutes.", "you"],
    ["Day 4 and day 9", "Follow-ups and calls", "No reply gets a short follow-up. The ten best no-replies land in your call queue with the phone number and an opener.", "auto"],
  ];
  APP.roiSection = () => `<div class="flow">${FLOW.map(([t, h, p, w]) => `<div class="fl ${w}"><span class="fl-t">${t}</span><div><b>${h}</b><p>${p}</p></div><em class="tag ${w === "you" ? "warn" : "good"}">${w === "you" ? "you" : "automatic"}</em></div>`).join("")}<div class="fl-sum"><b>Your time: about 25 minutes a day</b><span>plus whatever calls you choose to make. Everything else runs on its own once it's set up.</span></div></div>`;
  APP.roiBox = roiBox;

  /* ---------- your turn: the AI interview (recommended) or the written questions ---------- */
  const QS = [
    ["Your business", [["team", "Is NexEros just you today, or does anyone help? Packing, a manufacturer contact, a contractor, a partner."], ["orders", "Which products sell best, and about how many orders a month?"], ["aov", "What does an average order look like, and how many customers come back?"]]],
    ["Making it", [["maker", "Who makes the capsules? Do you have the full label with each botanical's amount? Are STAMINA and FEMINA the same formula?"], ["lab", "Do you get lab reports for each batch? Would you be open to an outside test that also screens for hidden drugs?"]]],
    ["Where you are today", [["revenue", "About what does NexEros bring in a month right now, and how has that moved over the last six months?"], ["cogs", "What does it cost you to make one capsule and one 5-pack, packaging included? And what does it cost to ship an order? (It decides which store and distributor deals can work.)"], ["stock", "How much inventory are you holding: how many units, about what it cost you, and how much of it is in the current packaging?"], ["reorder", "What's your manufacturer's minimum order and lead time, and when would you need to reorder at today's pace?"], ["costs", "Beyond product, what are your biggest monthly costs right now: ads, software, shipping supplies, anything else?"], ["base", "About how many customers have you had, and how many are on auto-ship or in the membership?"], ["margin", "After product, shipping and ads, roughly what do you keep on a typical order?"], ["money", "Is anyone else invested or owed money, and is there budget set aside for this next stage?"]]],
    ["Where you sell", [["stores", "Are you in any stores today? How many, what kind, and how did they find you?"], ["dist", "Any distributors or wholesale accounts? Have you tried Amazon or another marketplace?"], ["events", "How did the event booths go? Worth doing again?"]]],
    ["Marketing", [["spend", "About how much do you spend on marketing a month, and where does it go? (Ad networks, Meta, Google, creators, events.)"], ["works", "What has brought in the most customers so far, and what hasn't worked?"], ["content", "Who writes your emails, posts and product pages today, and how often do they go out?"]]],
    ["Your tools and your week", [["tools", "Which tools do you log into every week? Where do you track stock?"], ["week", "What eats most of your week, and what would you hand off first?"]]],
    ["The brand and your goals", [["look", "Of the four quick ideas for the look, which is closest to NexEros, and what would you change?"], ["goal", "Where do you want NexEros in 12 months: sales, stores, channels?"], ["budget", "What could you put toward running costs and ads each month? A range is fine."], ["who", "Anyone else involved in decisions that Jordan should talk to?"]]],
  ];
  APP.views.questions = () => {
    const saved = store.get("nx-answers") || {};
    return `<div class="pg">${hero("Your turn", "Tell us how NexEros really runs.", "The plan on these pages is built from what's public. Your real numbers make it yours: how many stores you're in, what you spend on marketing, what a 5-pack costs you to make. Two ways to share them.")}
    <section class="pg-sec rise"><div class="yt"><a class="yt-c rec" href="interview.html"><span class="tag good">Recommended · 15 minutes</span><b>Talk it through with Sage</b><p>An AI interviewer asks one question at a time, out loud, and follows up where it matters. Skip anything. You get a short summary at the end, and only Jordan reads the rest.</p><em>Start the interview →</em></a>
      <a class="yt-c" href="#questions" data-jump="qf"><span class="tag">About 10 minutes</span><b>Answer in writing</b><p>The same questions, below. Answer what you like; blanks are fine. It opens your email with the answers written, and you press send.</p><em>Go to the questions ↓</em></a></div></section>
    <form class="qf rise" id="qf" onsubmit="return false">${QS.map(([t, qs]) => `<fieldset><legend>${t}</legend>${qs.map(([k, q]) => `<label><span>${esc(q)}</span><textarea name="${k}" rows="2">${esc(saved[k] || "")}</textarea></label>`).join("")}</fieldset>`).join("")}
      <div class="qf-f"><div class="qf-b"><button type="button" class="cta-big" data-send>Send to Jordan <span aria-hidden="true">→</span></button><button type="button" class="cta-ghost2" data-copy>Copy my answers</button></div><small>Send opens your own email app with your answers written in; nothing sends until you press send. Or copy them and email <b>jordan@jgoco.me</b>. Your answers stay on this device while you type.</small><span class="qf-ok" id="qf-ok" hidden>Copied. Paste them into an email to jordan@jgoco.me.</span></div></form>
  </div>`;
  };
  document.addEventListener("input", e => { const f = e.target.closest("#qf"); if (!f) return; const a = store.get("nx-answers") || {}; a[e.target.name] = e.target.value; store.set("nx-answers", a); });
  document.addEventListener("click", e => {
    if (e.target.closest("[data-jump]")) { e.preventDefault(); const f = APP.$("#qf"); f && f.scrollIntoView({ behavior: "smooth" }); return; }
    const send = e.target.closest("[data-send]"), copy = e.target.closest("[data-copy]");
    if (!send && !copy) return;
    const a = store.get("nx-answers") || {};
    const body = "Hi Jordan,\n\nMy answers for the NexEros Hub plan:\n\n" + QS.map(([t, qs]) => t.toUpperCase() + "\n" + qs.map(([k, q]) => q + "\n" + ((a[k] || "").trim() || "(skipped)")).join("\n\n")).join("\n\n") + "\n\n- Oliver";
    if (copy) { navigator.clipboard && navigator.clipboard.writeText(body).then(() => { APP.$("#qf-ok").hidden = false; }).catch(() => {}); return; }
    location.href = "mailto:jordan@jgoco.me?subject=" + encodeURIComponent("NexEros: my answers") + "&body=" + encodeURIComponent(body);
  });

  /* ---------- the NexEros Hub ---------- */
  APP.views.hq = () => `<div class="pg">${hero("NexEros Hub", "One founder. One portal. Every channel.", "Today NexEros is you, doing every job by hand. The Hub gives you a team's worth of tools: one master database for products, stock, orders, customers and stores, wired into every sales channel, every ad platform and the AI that does the busywork. You make the calls; the Hub does the rest.")}
    <section class="pg-sec rise"><div class="hq-dia">${hqDiagram()}</div></section>
    ${sec("A morning with the Hub", `<div class="hq-day"><div class="phone"><div class="ph-top">9:41</div><div class="ph-in"><b class="ph-h">Good morning, Oliver</b><div class="ph-card"><span>Yesterday</span><b>$1,284 · 31 orders</b><small>Site 14 · Amazon 11 · Walmart 4 · Wholesale 2 · sample</small></div><div class="ph-card warn"><span>Needs you · 4</span><b>Approve 3 ad moves</b><small>Approve 6 store emails · 1 refund · Femina low on Amazon</small></div><div class="ph-card"><span>Calls today</span><b>8 stores, best first</b><small>Script and lab report attached</small></div><div class="ph-chat"><span class="me">How did the Couples Ritual do this month?</span><span>412 sold, up 22%. Most came from the anniversary email and Google. Want me to raise the Google budget for Valentine's?</span></div></div></div>
      <div class="hq-ai">${[["Ask it anything", "\"Which stores haven't reordered in 60 days?\" It answers from the master database, not a guess."], ["Lists everywhere at once", "Change a price or a photo once. Your store, Amazon, Walmart, iHerb and the wholesale portal update."], ["Stock that never runs out", "Sees sales on every channel, warns before Amazon runs dry, drafts the purchase order."], ["Writes in the brand voice", "Product pages, emails, replies to reviews, all checked against the claims rules first."], ["Finds and works the stores", "The find-and-enrich engine on the Sales page, feeding your email and call queues."], ["Moves the ad money", "The optimizer on the Marketing page, approved with a tap."], ["Keeps the books straight", "Every channel's payouts and fees into QuickBooks, matched every night."], ["Keeps the proof", "Lab reports by batch, ready for Amazon, buyers and the batch lookup."]].map(([a, b]) => `<div><b>${a}</b><p>${b}</p></div>`).join("")}</div></div>`)}
    ${sec("A week, before and after", `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Job</th><th>By hand</th><th>With the Hub</th></tr></thead><tbody>${[["Updating listings and stock across channels", "6 hrs", "15 min"], ["Emails, reviews and customer questions", "8 hrs", "1 hr"], ["Ads on four platforms", "5 hrs", "20 min"], ["Finding and pitching stores", "10 hrs", "3 hrs of calls"], ["Books, payouts and reports", "4 hrs", "10 min"]].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td></tr>`).join("")}</tbody></table></div><p class="note">Sample hours, to show the shape. A short call turns these into your real numbers.</p>`)}
    ${sec("How it comes together", `<div class="tl">${[["Weeks 1 to 2", "Fix the claims. Lab test. Settle the look.", "Pick an idea and tweak it together, plus the claims cleanup, the lab report, the real formula and doses."], ["Weeks 3 to 6", "The new site and the Hub", "nexeros.com rebuilt in the new look, on Shopify or WooCommerce, your customers, list and reviews moved over, the master database and the books wired in."], ["Weeks 7 to 10", "Channels and the store engine", "Amazon, Walmart, iHerb and the wholesale portal. The first store list found, enriched and queued."], ["Week 11 on", "Run it, and grow it", "The ad optimizer, the content engine, new channels as each one is ready. New builds as you need them, part of the partnership."]].map(([a, b, c]) => `<div class="tl-s"><span>${a}</span><b>${b}</b><p>${c}</p></div>`).join("")}</div>`)}
    ${sec("Who comes with it", `<div class="team">${[["Ryan", "Development and strategy", "Builds the Hub and keeps it running. Plans what to build next with you."], ["Jordan", "Brand, marketing, strategy and development", "Runs the brand and the marketing engine, sets the plan with you, and builds alongside Ryan."], ["Trae", "Sales", "Works the store lists and the call queue, and opens the wholesale accounts."]].map(([n, r, p]) => `<div class="tm"><span class="tm-i">${n[0]}</span><b>${n}</b><em>${r}</em><p>${p}</p></div>`).join("")}</div><div class="tm-deal">${[["Trae", "Commission only", "Paid on the sales he brings in. Nothing if he doesn't sell."], ["Ryan and Jordan", "Equity, plus commission on sales", "Owners alongside you, paid when NexEros grows."], ["You", "The running costs", "Hosting, the AI and the lead lists Trae works, at the prices in the plan."]].map(([a, b, c]) => `<div><span>${a}</span><b>${b}</b><small>${c}</small></div>`).join("")}</div>`, "The Hub doesn't come alone. Three people build it, run it with you and sell with you, and they're paid when you win. With you, that's the four people the plan is sized for.")}
    <section class="pg-sec rise hq-cta"><span class="eyebrow">Next step</span><h2>Tell us how NexEros runs.</h2><p>A 15-minute talk with Sage, our AI interviewer, about your stores, your marketing spend, what a 5-pack costs you and where you want to be in a year. Then a 30-minute call on which piece to build first. There's no build fee: Ryan and Jordan build it for equity and a commission on sales, and you cover the running costs in your plan.</p><div class="hq-two"><a class="cta-big" href="interview.html">Talk with Sage <span aria-hidden="true">→</span></a><a class="cta-ghost" href="#questions">Rather type? Answer in writing</a></div><p class="hq-or">Or skip ahead:</p><a class="cta-big" href="mailto:jordan@jgoco.me?subject=${encodeURIComponent("NexEros: let's talk")}&body=${encodeURIComponent("Hi Jordan,\n\nI looked through the NexEros pitch. A few times that work for a call:\n\n\n- Oliver")}">Schedule a call <span aria-hidden="true">→</span></a><small>Opens your email with the note written. You press send. Or write to jordan@jgoco.me.</small></section>
  </div>`;
  function hqDiagram() {
    const L = [["Your store", "WooCommerce or Shopify"], ["Amazon", "orders, ads"], ["Walmart", "orders, ads"], ["Email", "your list, flows, reviews"], ["Google", "search, shopping, ads"], ["Meta", "ads, pixel"]];
    const R = [["PaymentCloud", "card payments"], ["Wholesale portal", "store orders"], ["Store engine", "leads, email, calls"], ["QuickBooks", "books, payouts"], ["Shipping", "3PL and labels"], ["Lab reports", "by batch"], ["AI", "writes, answers, checks"]];
    const col = (a, side) => `<div class="hd-col ${side}">${a.map(([t, s]) => `<div class="hd-n"><b>${t}</b><span>${s}</span></div>`).join("")}</div>`;
    return `${col(L, "l")}<div class="hd-core"><div class="hd-ring">${NX.mark("rooted", 50)}<b>NexEros Hub</b><span>One master database</span><ul><li>Products and doses</li><li>Stock by channel</li><li>Every order</li><li>Every customer</li><li>Every store</li></ul></div></div>${col(R, "r")}`;
  }
})();
