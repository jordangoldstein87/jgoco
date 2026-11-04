/* The new nexeros.com, mocked up. One storefront that re-skins to any of the four brand directions:
   home, a product page, the ingredients page, find us and wholesale. Registers views on window.APP. */
(function () {
  const APP = window.APP, NX = window.NX, esc = APP.esc;
  const dir = () => NX.dirs[APP.dir()];
  const HERO = { rooted: "Plant-made.<br>For the two of you.", golden: "Tonight, tomorrow,<br><em>the weekend.</em>", still: "For the couple<br><em>you still are.</em>", label: "Seven plants.<br>Every dose shown." };
  const SUB = {
    rooted: "Daily botanical formulas for him and for her, built on seven plants with centuries of use. Nothing hidden, every batch tested.",
    golden: "Plant-based formulas for him and for her, made for the nights you don't plan. Seven botanicals, nothing hidden.",
    still: "Twenty years in, you still pick each other. Plant-based formulas for him and for her, made for the long run.",
    label: "Plant-based formulas for him and for her. Every ingredient and every dose printed on the front, every batch lab tested.",
  };
  const PRODUCTS = [
    { id: "stamina", who: "him", price: "$16.95", pack: "$49.95", line: "Vitality and stamina support for him.*", rev: 412 },
    { id: "femina", who: "her", price: "$16.95", pack: "$49.95", line: "Desire and balance support for her.*", rev: 236 },
    { id: "oil", who: "oil", price: "$49.95", pack: "", line: "A warming massage oil for the slow start.", rev: 98 },
  ];
  const pname = (p, d) => d.names[{ him: 0, her: 1, oil: 2 }[p.who]].split(/,\s*/);
  const stars = n => `<span class="st-stars" aria-label="${n} stars">${"★★★★★".slice(0, 5)}</span>`;

  function header(d, k) {
    return `<div class="st-bar">Free discreet shipping on two or more · Plain box, plain bank statement</div>
      <header class="st-head"><a href="#site" class="st-logo">${NX.logo(k, 26)}</a>
        <nav class="st-nav"><a href="#site-stamina">${esc(d.him)}</a><a href="#site-femina">${esc(d.her)}</a><a href="#site-ingredients">What's inside</a><a href="#site-find">Find us</a><a href="#site-wholesale">Wholesale</a></nav>
        <div class="st-icons"><span aria-hidden="true">⌕</span><span class="st-cart">Bag · 0</span></div></header>`;
  }
  function footer(d, k) {
    return `<section class="st-news"><div><h3>The Insider</h3><p>One letter a month on sleep, movement, food and staying close. Discreet sender name, one-click unsubscribe.</p></div><form class="st-sub" onsubmit="return false"><input placeholder="Your email" aria-label="Your email"><button>Join</button></form></section>
      <footer class="st-foot"><div>${NX.logo(k, 22)}<p>Plant-based vitality for couples. Made in the USA from globally sourced botanicals.</p></div>
        <div><b>Shop</b><a href="#site-stamina">${esc(d.him)}</a><a href="#site-femina">${esc(d.her)}</a><a href="#site-oil">Massage oil</a><a href="#site-find">Find us</a></div>
        <div><b>Learn</b><a href="#site-ingredients">What's inside</a><a href="#site-ingredients">Lab results</a><a href="#site">Journal</a><a href="#site">FAQ</a></div>
        <div><b>Company</b><a href="#site-wholesale">Wholesale</a><a href="#site">Affiliates</a><a href="#site">Contact</a></div>
        <p class="st-fda">*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Talk with your doctor before use if you take medication, especially for blood pressure or blood thinning, or have a heart condition. 18+.</p></footer>`;
  }
  function tile(p, d, k) {
    const n = pname(p, d);
    return `<a class="st-card" href="#site-${p.id}"><div class="st-cimg">${NX.jar(k, p.who, 150)}</div><div class="st-cbody"><b>${esc(n[0])}</b><span>${esc(n[1] || (p.who === "oil" ? "Warming oil" : ""))}</span><p>${esc(p.line)}</p><div class="st-cfoot">${stars()}<small>${p.rev} reviews</small><em>${p.price}</em></div></div></a>`;
  }

  // the seven plants with their names: first thing under the headline on every look, and under each product's name
  function plantStrip(small) {
    return `<div class="st-hplants${small ? " sm" : ""}"><div class="st-hpk"><span>Inside every capsule</span><a href="#site-ingredients">Every dose →</a></div><div class="st-hpg">${NX.plants.map(p => `<a href="#site-ingredients" class="st-hp" title="${esc(p.latin)}: ${esc(p.tag.toLowerCase())}">${NX.plant(p, small ? 40 : 52)}<b>${esc(p.name)}</b></a>`).join("")}</div></div>`;
  }
  function home(d, k) {
    return `${header(d, k)}
      <section class="st-hero"><div class="st-htxt"><span class="st-eye">For him · For her · For both of you</span><h1>${HERO[k]}</h1><p>${SUB[k]}</p>
        ${plantStrip()}
        <div class="st-btns"><a class="st-btn" href="#site-stamina">Shop ${esc(d.him)}</a><a class="st-btn ghost" href="#site-femina">Shop ${esc(d.her)}</a></div>
        <ul class="st-trust"><li>Every dose on the label</li><li>Third-party tested</li><li>No prescription</li><li>Discreet shipping</li></ul></div>
        <div class="st-hart"><div class="st-hjars">${NX.jar(k, "him", 190)}${NX.jar(k, "her", 190)}</div>${k === "rooted" ? `<span class="st-hleaf">${NX.ginkgo(130, "var(--b3)")}</span>` : ""}</div></section>
      <section class="st-sec"><div class="st-shead"><span class="st-eye">The ritual</span><h2>Three ways to make a night of it.</h2></div><div class="st-grid3">${PRODUCTS.map(p => tile(p, d, k)).join("")}</div>
        <a class="st-bundle" href="#site-stamina"><b>The Couples Ritual</b><span>${esc(d.him)} and ${esc(d.her)} together, one plain box. Five of each, or subscribe and save.</span><em>$84.95 →</em></a></section>
      <section class="st-sec st-life"><div class="st-shead"><span class="st-eye">Made for real life</span><h2>Not a big night. Your normal week, a little closer.</h2></div>
        <div class="st-grid3 st-vign">${[["mugs", "Slow mornings", "Coffee for two, and nowhere to be."], ["weekend", "Make room for each other", "Circle a night. Phones down, the oil warm, no clock."], ["porch", "For the long run", "Still choosing each other, twenty years in."]].map(([s, h, t]) => `<figure>${NX.scene[s]}<figcaption><b>${h}</b>${t}</figcaption></figure>`).join("")}</div></section>
      <section class="st-sec st-inside"><div class="st-shead"><span class="st-eye">What's inside</span><h2>Seven plants. Nothing else to explain.</h2><p>Every ingredient named on the front of the bottle, with what it's traditionally used for and what studies show. <a href="#site-ingredients">Read the research →</a></p></div>
        <div class="st-plants">${NX.plants.map(p => `<a href="#site-ingredients" class="st-plant">${NX.plant(p, 92)}<b>${esc(p.name)}</b><small>${esc(p.tag)}</small></a>`).join("")}</div></section>
      <section class="st-sec st-proof"><div><span class="st-eye">Proof, not promises</span><h2>Every batch tested by an outside lab. Read the report.</h2><p>Each bottle has a batch number. Type it in and see the full lab report: what's in it, what isn't, and who tested it. Including a screen for the hidden drugs this category is known for.</p><a class="st-btn" href="#site-ingredients">Look up a batch</a></div>
        <div class="st-coa"><div class="coa-h"><b>Certificate of analysis</b><span>Batch NX-2611 · sample</span></div>${[["Identity, all 7 botanicals", "Pass"], ["Heavy metals (lead, arsenic, cadmium, mercury)", "Pass"], ["Microbial", "Pass"], ["Sildenafil, tadalafil and 80+ analogues", "None detected"], ["Pesticides", "Pass"]].map(([a, b]) => `<div class="coa-r"><span>${a}</span><b>${b}</b></div>`).join("")}<small>Sample layout. Real results come from the lab Nexeros picks.</small></div></section>
      <section class="st-sec st-revs"><div class="st-shead"><span class="st-eye">From couples like yours</span><h2>4.8 out of 5, from 746 verified reviews.</h2><p class="st-note">Sample number. The real count comes straight from the reviews app, never rounded up.</p></div>
        <div class="st-grid3">${[["We stopped planning around anything. Weekends feel like they did fifteen years ago.", "Married 22 years"], ["I ordered for both of us. It came in a plain box. Exactly how it should be.", "Ordered the Couples Ritual"], ["Natural, simple, and I can read every ingredient. That's rare in this aisle.", "Repeat customer"]].map(([q, w]) => `<blockquote>${stars()}<p>"${q}"</p><cite>Verified buyer · ${w}</cite></blockquote>`).join("")}</div></section>
      <section class="st-sec st-where"><div class="st-shead"><span class="st-eye">Find us</span><h2>Here, and wherever you already shop.</h2></div><div class="st-chips">${["Amazon", "Walmart", "iHerb", "Google Shopping", "Wellness boutiques", "Your local pharmacy"].map(c => `<a href="#site-find">${c}</a>`).join("")}</div></section>
      ${footer(d, k)}`;
  }

  function product(id, d, k) {
    const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0], n = pname(p, d), oil = p.who === "oil";
    return `${header(d, k)}
      <section class="st-pdp"><div class="st-gal"><div class="st-gmain">${NX.jar(k, p.who, 260)}</div><div class="st-thumbs"><span>${NX.jar(k, p.who, 60)}</span><span>${NX.scene.weekend}</span><span>${NX.plant(NX.plants[0], 60)}</span></div></div>
        <div class="st-buy"><span class="st-eye">${oil ? "For both of you" : p.who === "him" ? "For him" : "For her"}</span><h1>${esc(n[0])}</h1><p class="st-pl">${esc(p.line)}</p><div class="st-rv">${stars()} <a href="#site-${p.id}">${p.rev} reviews</a></div>
          ${oil ? "" : plantStrip(true)}
          <div class="st-opts">${oil ? `<label class="on"><input type="radio" checked name="o"><b>One bottle</b><span>4 fl oz</span><em>${p.price}</em></label>` : `<label><input type="radio" name="o"><b>Try one</b><span>1 capsule</span><em>${p.price}</em></label><label class="on"><input type="radio" name="o" checked><b>Five pack</b><span>Best value, $9.99 each</span><em>${p.pack}</em></label><label><input type="radio" name="o"><b>Subscribe</b><span>Five pack every month, 15% off, skip anytime</span><em>$42.46</em></label>`}</div>
          <button class="st-btn wide">Add to bag</button><div class="st-alt"><span>Also on</span><a href="#site-find">Amazon</a><a href="#site-find">Walmart</a><a href="#site-find">iHerb</a></div>
          <ul class="st-ticks"><li>Plain box, plain bank statement</li><li>Free shipping on two or more</li><li>30-day money-back promise</li></ul>
          ${oil ? "" : `<details><summary>Every dose</summary><div class="st-ing">${NX.plants.map(x => `<span>${esc(x.name)}<i>__ mg</i></span>`).join("")}</div><small>Doses shown here once Nexeros shares the formula. Showing them is the point.</small></details>`}
          <details><summary>How to take it</summary><p>One capsule with a glass of water. Read the full label first, and talk with your doctor before use if you take any medication or have a heart condition.</p></details>
          <details><summary>Lab report</summary><p>Batch NX-2611, tested by an outside lab for identity, purity and hidden drugs. <a href="#site-ingredients">Read it</a>.</p></details></div></section>
      <section class="st-sec st-pair"><h2>Better together.</h2><div class="st-grid3">${PRODUCTS.filter(x => x.id !== p.id).map(x => tile(x, d, k)).join("")}<a class="st-card st-ritual" href="#site-stamina"><div class="st-cbody"><b>The Couples Ritual</b><p>${esc(d.him)} and ${esc(d.her)} in one plain box. Five of each, one box.</p><em>$84.95</em></div></a></div></section>
      ${footer(d, k)}`;
  }

  function ingredients(d, k) {
    return `${header(d, k)}
      <section class="st-sec st-ihero"><span class="st-eye">What's inside</span><h1>Seven plants, and what each one is for.</h1><p>Every ingredient, the amount, the part of the plant and where it's grown. What tradition has used it for, and what research has found so far, including where the research is still young. Then an outside lab checks every batch.</p>
        <form class="st-batch" onsubmit="this.querySelector('output').hidden=false;return false"><input value="NX-2611" aria-label="Batch number"><button class="st-btn">Look up batch</button><output hidden>Batch NX-2611 · all tests passed · no sildenafil, tadalafil or analogues detected (sample)</output></form></section>
      <section class="st-sec"><div class="st-ilist">${NX.plants.map((p, i) => `<article class="st-ing-card"><div class="st-iart">${NX.plant(p, 140)}</div><div><span class="st-eye">${String(i + 1).padStart(2, "0")} · ${esc(p.from)}</span><h3>${esc(p.name)} <i>${esc(p.latin)}</i></h3><p>${esc(p.note)}</p><dl class="st-ius"><div><dt>Traditionally used for</dt><dd>${esc(p.use)}</dd></div><div><dt>What studies show</dt><dd>${esc(p.study)}<cite>${esc(p.src)}</cite></dd></div></dl><div class="st-imeta"><span>Amount <b>__ mg</b></span><span>Part <b>${["leaf", "bark and root", "root", "root", "fruit", "root", "leaf"][i]}</b></span><span>Tested <b>identity, purity</b></span></div></div></article>`).join("")}</div></section>
      <p class="st-sci">Research summaries are for education, not medical advice. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p>${footer(d, k)}`;
  }

  function find(d, k) {
    const where = [["Amazon", "Ships Prime, Subscribe and Save"], ["Walmart", "Online, two-day shipping"], ["Google Shopping", "Compare and buy"], ["iHerb", "Ships to 180 countries"], ["Thrive Market", "Members save 25%"], ["Local pharmacies", "Ask at the counter"], ["Natural food stores", "Vitamin aisle"], ["Wellness boutiques", "See the map"]];
    return `${header(d, k)}<section class="st-sec st-ihero"><span class="st-eye">Find us</span><h1>Buy it here, or wherever you already shop.</h1><p>Same formula, same lab-tested batches, same price everywhere. Stores are added as they start carrying us.</p></section>
      <section class="st-sec"><div class="st-wgrid">${where.map(([a, b]) => `<div class="st-w"><b>${a}</b><span>${b}</span></div>`).join("")}</div>
      <div class="st-map"><div class="st-mapbox">${[[22, 40], [30, 62], [44, 38], [52, 55], [61, 46], [70, 33], [78, 58], [40, 70], [84, 44], [16, 52]].map(([x, y]) => `<i style="left:${x}%;top:${y}%"></i>`).join("")}<span>Store locator · sample pins</span></div></div></section>${footer(d, k)}`;
  }

  function wholesale(d, k) {
    return `${header(d, k)}<section class="st-sec st-ihero"><span class="st-eye">Wholesale</span><h1>Carry Nexeros in your store.</h1><p>For pharmacies, natural food stores, wellness boutiques and spas. Open an account in five minutes, order anytime, reorder in two taps.</p>
      <div class="st-btns"><a class="st-btn" href="#sales">Open the wholesale portal</a><a class="st-btn ghost" href="#sales">See how it works</a></div></section>
      <section class="st-sec"><div class="st-wgrid">${[["Keystone margin", "Sells at $49.95, costs you $24.98"], ["Low minimum", "12 units to start, mix and match"], ["Shelf ready", "Counter display and shelf talkers included"], ["Net 30", "For approved accounts"]].map(([a, b]) => `<div class="st-w"><b>${a}</b><span>${b}</span></div>`).join("")}</div><p class="st-note">Sample terms.</p></section>${footer(d, k)}`;
  }

  // the switcher that re-skins the whole storefront
  function switcher(k) {
    return `<div class="st-switch" role="group" aria-label="Brand idea"><span>Try each idea</span>${NX.order.map(x => `<button class="${x === k ? "on" : ""}" data-dir="${x}" style="${NX.vars(x)}"><i>${NX.mark(x, 18)}</i>${esc(NX.dirs[x].name)}</button>`).join("")}</div>`;
  }

  APP.views.site = sub => {
    const k = APP.dir(), d = NX.dirs[k];
    const page = !sub ? home(d, k) : sub === "ingredients" ? ingredients(d, k) : sub === "find" ? find(d, k) : sub === "wholesale" ? wholesale(d, k) : product(sub, d, k);
    return `<div class="st st-${k}" style="${NX.vars(k)}">${switcher(k)}<div class="st-url"><i></i><i></i><i></i><span>nexeros.com${sub ? "/" + esc(sub) : ""}</span></div>${page}</div>`;
  };
})();
