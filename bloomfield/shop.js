/* Nettie Jarvis online: the storefront, and its back office inside Town Center
   (one inventory, every marketplace, email flows and campaigns). */
(function () {
  const APP = window.APP, D = APP.D, esc = APP.esc, bubble = APP.bubble, money = APP.money;
  const $ = (s, r) => (r || document).querySelector(s);
  const P = "img/nettie/products/";
  // example inventory for the preview; the real one syncs from the shop's point of sale
  const ITEMS = [
    { id: "cupboard", n: "Cherry corner cupboard", c: "Furniture", p: 1850, img: P + "cherry-corner-cupboard-10688.jpg", era: "c. 1880s", one: true, ch: ["web", "ebay", "chairish"] },
    { id: "secretary", n: "Sheraton secretary desk", c: "Furniture", p: 2400, img: P + "sheraton-secretary-9387.jpg", era: "c. 1820s", one: true, ch: ["web", "chairish", "1stdibs"] },
    { id: "settle", n: "Primitive settle bench", c: "Primitives", p: 680, img: P + "settle-bench-12479.jpg", era: "Kentucky, 1800s", one: true, ch: ["web", "ebay", "fb"] },
    { id: "rose", n: "Rose Medallion plates, set of 4", c: "China", p: 420, img: P + "rose-medallion-plates-6891.jpg", era: "Chinese export", one: true, ch: ["web", "ebay", "etsy"] },
    { id: "tins", n: "Vintage bourbon tins", c: "Bourbon & barware", p: 65, img: "img/nettie/04-vintage-tins.jpg?v=1793944505", era: "Mid-century", qty: 6, ch: ["web", "ebay", "etsy"] },
    { id: "horse", n: "Bourbon tin horse", c: "Bourbon & barware", p: 145, img: "img/nettie/05-bourbon-tin-horse.jpg?v=1793944505", era: "Folk art", one: true, ch: ["web", "etsy", "ig"] },
    { id: "jewelry", n: "Costume jewelry, the case", c: "Jewelry", p: 38, img: "img/nettie/02-jewelry-counter.jpg?v=1793944505", era: "From $38", qty: 40, ch: ["web", "ig"] },
    { id: "candles", n: "Berkley green candles", c: "Locally made", p: 24, img: P + "berkley-green-candles.jpg", era: "Made in Kentucky", qty: 22, ch: ["web", "etsy"] },
    { id: "preserves", n: "Spring Valley preserves", c: "Locally made", p: 12, img: P + "spring-valley-preserves.jpg", era: "Made in Kentucky", qty: 48, ch: ["web"] },
    { id: "candy", n: "Mom Blakeman's candy", c: "Locally made", p: 16, img: P + "mom-blakeman-candy.jpg", era: "Made in Kentucky", qty: 30, ch: ["web"] },
    { id: "tee-e", n: "Ernie's pocket tee", c: "Town goods", p: 19.99, img: P + "store-ernies-pocket-tee.jpg", era: "S–XXL", qty: 64, ch: ["web", "ig"] },
    { id: "tee-d", n: "Double Dip pocket tee", c: "Town goods", p: 19.99, img: P + "store-double-dip-pocket-tee.jpg", era: "S–XXL", qty: 51, ch: ["web", "ig"] },
  ];
  const CH = { web: ["Website", "#1f3a2b"], ebay: ["eBay", "#e53238"], etsy: ["Etsy", "#f1641e"], chairish: ["Chairish", "#222"], "1stdibs": ["1stDibs", "#5a4632"], fb: ["Marketplace", "#1877f2"], ig: ["Instagram", "#c13584"] };
  const cats = ["All", ...new Set(ITEMS.map(i => i.c))];
  // this month by channel, from Square in the shop and each marketplace
  const CH_SALES = [["In the shop", 12480, "#1f3a2b", 214], ["Website", 7920, "#9c5a26", 86], ["eBay", 4310, "#e53238", 31], ["Chairish", 3650, "#5a5a5a", 4], ["Etsy", 1840, "#f1641e", 42], ["Instagram", 1060, "#c13584", 27], ["1stDibs", 600, "#5a4632", 1]];
  let cat = "All", cart = [];
  const t = D.biz.nettie.theme;

  // first visit: how the shop runs, as a pop-up
  let explained = false;
  function explain() {
    if (explained) return; explained = true;
    const t = document.createElement("div"); t.className = "tour";
    t.innerHTML = `<div class="tour-card"><span class="eyebrow">Run from Town Center</span><h3>One inventory. Every marketplace.</h3>
      <p>Snap a photo and set a price in Town Center. It lists here and everywhere else at once.</p>
      <div class="intro-chips">${["This website", "eBay", "Etsy", "Chairish", "1stDibs", "Facebook Marketplace", "Instagram Shop", "Email list"].map(m => `<span>${m}</span>`).join("")}</div>
      <p class="tour-hl"><b>Sell it once, it comes down everywhere.</b> Nothing sells twice.</p>
      <div class="intro-foot"><button class="btn solid" data-tour-ok>Shop Nettie Jarvis</button><a href="#center-shop" data-tour-ok>See it in Town Center</a></div></div>`;
    document.body.appendChild(t);
    t.onclick = e => { if (e.target === t || e.target.closest("[data-tour-ok]")) t.remove(); };
  }
  // one header for the landing page and the shop: tasting, shop online and the cart
  const BAG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>`;
  const bagBar = () => cart.length ? `<div class="cartbar"><span>${cart.length} in your cart · ${money(cart.reduce((a, i) => a + i.p, 0))}</span><button id="checkout">Check out</button></div>` : "";
  function header(on) {
    return `<header class="shead nj-head"><div class="wrap"><a href="#nettie" class="nj-home"><img class="logo logo-nj" src="img/nettie/logo.png?v=1793944505" alt="Nettie Jarvis Antiques"></a>
      <nav><a href="#nettie" class="${on === "home" ? "on" : ""}">The shop</a><a href="#shop" class="${on === "shop" ? "on" : ""}">Shop online</a><a href="#nettie" data-jump="menu">Bourbon</a><a href="#nettie" data-jump="visit">Visit</a></nav>
      <button class="btn small" data-book="tasting" data-brand="nettie">Book a bourbon tasting</button>
      <button class="btn small solid nj-bag" id="cartbtn" aria-label="Your cart">${BAG}<span>Cart</span><b>${cart.length}</b></button></div></header>`;
  }
  const PICKS = ["cupboard", "horse", "tins", "candles"];
  function strip() {
    return `<section class="sect nj-strip"><div class="wrap"><div class="sect-head"><div><span class="eyebrow">Shop online</span><h2>Fresh off the shop floor.</h2></div><a class="btn solid nj-cta" href="#shop">${BAG}Shop all ${ITEMS.length} pieces</a></div>
      <div class="prods four">${PICKS.map(id => ITEMS.find(i => i.id === id)).map(card).join("")}</div></div></section>`;
  }
  function card(i) {
    return `<button class="prod" data-p="${i.id}"><div class="im"><img src="${i.img}" alt="" loading="lazy">${i.one ? `<span class="one">One of a kind</span>` : ""}</div><span class="nm">${esc(i.n)}</span><span class="pr">${money(i.p)}${i.p % 1 ? (i.p % 1).toFixed(2).slice(1) : ""} · <span class="muted">${esc(i.era)}</span></span></button>`;
  }
  // after the bag changes: redraw the shop, or just the count and bar on the landing page
  function bagChanged(v) {
    if (location.hash === "#shop") return render(v);
    const n = v.querySelector(".nj-bag b"); if (n) n.textContent = cart.length;
    const old = v.querySelector(".cartbar"); if (old) old.remove();
    v.insertAdjacentHTML("beforeend", bagBar()); wireBag(v);
  }
  function wireBag(v) {
    const co = $("#checkout", v); if (co) co.onclick = () => checkout(v);
    const cb = $("#cartbtn", v); if (cb) cb.onclick = () => cart.length ? checkout(v) : APP.toast("Your cart is empty. Shop online to fill it.");
  }
  // the landing page (app.js siteView) borrows these
  window.NJ = { header, strip, bagBar, wire(v) { v.querySelectorAll(".nj-strip [data-p]").forEach(b => b.onclick = () => pdp(ITEMS.find(i => i.id === b.dataset.p), v)); wireBag(v); } };

  function render(v) {
    v.innerHTML = `<div class="site" style="--s-bg:${t.bg};--s-ink:${t.ink};--s-accent:${t.accent};--s-soft:${t.soft};--s-display:${t.display};--s-head:${t.head};--s-headink:${t.headInk}">
      ${header("shop")}
      <section class="shop-hero"><div class="wrap"><span class="eyebrow">Shop online</span><h1>Nettie Jarvis, shipped.</h1><p class="big-p">The same finds as the shop floor. One of a kind pieces sell fast.</p></div></section>
      <section class="sect" style="padding-top:28px"><div class="wrap shop-grid">
        <aside class="shop-side">${cats.map(c => `<button class="${c === cat ? "on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}</aside>
        <div class="prods">${ITEMS.filter(i => cat === "All" || i.c === cat).map(card).join("")}</div>
      </div></section>
      <section class="sect"><div class="wrap two"><div class="prose big"><h2>Local pickup, or shipped with care.</h2><p>Furniture ships white-glove anywhere in the country. Small things go out in two days.</p></div><div class="figure"><img src="img/nettie/01-shop-interior.jpg?v=1793944505" alt=""></div></div></section>
      <footer class="sfoot"><div class="wrap">${bubble("nettie", 30)}<span>Nettie Jarvis Antiques · 111 Taylorsville Road, Bloomfield, KY</span><span class="sister"><a href="#nettie">Visit the shop</a><a href="#town">Stay in Bloomfield</a></span></div></footer>
    </div>${bagBar()}`;
    v.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => { cat = b.dataset.cat; render(v); });
    explain();
    v.querySelectorAll("[data-p]").forEach(b => b.onclick = () => pdp(ITEMS.find(i => i.id === b.dataset.p), v));
    wireBag(v);
  }
  function pdp(i, v) {
    const w = document.createElement("div"); w.className = "sheet";
    w.innerHTML = `<div class="box wide" style="--s-accent:${t.accent}"><div class="pdp"><img class="main" src="${i.img}" alt=""><div class="prose"><span class="eyebrow">${esc(i.c)} · ${esc(i.era)}</span><h3>${esc(i.n)}</h3><b class="pdp-p">${money(i.p)}</b>
      <p>${i.one ? "One of a kind. When it's gone, it's gone." : (i.qty || 0) + " in stock."} Picked, cleaned and photographed at the shop on Taylorsville Road.</p>
      <div class="acts" style="justify-content:flex-start"><button class="btn solid" data-add>Add to cart</button><button class="btn" data-x>Close</button></div>
      <p class="muted small">Questions? Call (502) 252-9555.</p></div></div></div>`;
    document.body.appendChild(w);
    w.onclick = e => { if (e.target === w || e.target.closest("[data-x]")) w.remove(); };
    w.querySelector("[data-add]").onclick = () => { cart.push(i); w.remove(); bagChanged(v); APP.toast("Added to your cart."); };
  }
  function checkout(v) {
    const w = document.createElement("div"); w.className = "sheet";
    const sub = cart.reduce((a, i) => a + i.p, 0), ship = cart.some(i => i.c === "Furniture") ? 250 : 12;
    w.innerHTML = `<form class="box" style="--s-accent:${t.accent}"><div class="cardline">${bubble("nettie", 40)}<h3>Check out</h3></div>
      <div class="lines">${cart.map(i => `<div><span>${esc(i.n)}</span><span>${money(i.p)}</span></div>`).join("")}<div><span>${ship > 100 ? "White-glove delivery" : "Shipping"}</span><span>${money(ship)}</span></div><div class="tot"><span>Total</span><span>${money(sub + ship)}</span></div></div>
      <label>Email<input id="co-email" type="email" required autocomplete="email"></label><label>Card<input placeholder="Secure checkout opens here" disabled></label>
      <div class="acts"><button type="button" class="btn" data-x>Back</button><button class="btn solid">Place order</button></div></form>`;
    document.body.appendChild(w);
    w.onclick = e => { if (e.target === w || e.target.closest("[data-x]")) w.remove(); };
    w.querySelector("form").onsubmit = e => {
      e.preventDefault();
      const sold = cart.filter(i => i.one).map(i => i.n);
      cart = []; bagChanged(v);
      w.querySelector("form").innerHTML = `<div class="done">${bubble("nettie", 60)}<h3>Thank you.</h3><p>Your receipt is on its way.</p>${sold.length ? `<p class="lands">${esc(sold.join(", "))} just came down from eBay and Chairish so nobody else can buy it.</p>` : ""}<div class="acts" style="justify-content:center"><button type="button" class="btn" data-x>Close</button></div></div>`;
    };
  }

  /* ---------- back office, shown inside Town Center ---------- */
  window.SHOPADMIN = () => `
    <div class="hub-hero"><h1>Shop & inventory</h1><p class="sub">One inventory for Nettie Jarvis. Snap a photo, set a price, and it's listed on the website, eBay, Etsy, Chairish and Instagram. Sold anywhere, pulled everywhere.</p></div>
    <div class="hgrid">
      <div class="pane span3 kpi"><b>$1,240</b><span>Today · 6 orders</span></div>
      <div class="pane span3 kpi"><b>$31,860</b><span>This month · up 18%</span></div>
      <div class="pane span3 kpi"><b>${ITEMS.length * 31}</b><span>Items listed everywhere</span></div>
      <div class="pane span3 kpi"><b>3</b><span>Sold today, pulled from every channel</span></div>
      <div class="pane span12"><div class="row" style="justify-content:space-between"><h3>This month by channel</h3><span class="s">Square in the shop, plus every marketplace</span></div>
        <div class="chbars">${CH_SALES.map(c => `<div class="chb"><span class="chn">${c[0]}</span><div class="chtrack"><i style="width:${Math.round(c[1] / CH_SALES[0][1] * 100)}%;background:${c[2]}"></i></div><b>${money(c[1])}</b><span class="s">${c[3]} orders</span></div>`).join("")}</div></div>
      <div class="pane span8"><div class="row" style="justify-content:space-between"><h3>Inventory</h3><button class="hbtn go" id="additem">Add an item</button></div>
        <div class="tscroll"><table class="table"><thead><tr><th></th><th>Item</th><th>Price</th><th>Stock</th><th>Listed on</th></tr></thead><tbody>
        ${ITEMS.map(i => `<tr class="click" data-item="${i.id}"><td><img src="${i.img}" alt=""></td><td><b>${esc(i.n)}</b><div class="s">${esc(i.c)}</div></td><td>${money(i.p)}</td><td>${i.one ? "1 of 1" : i.qty}</td><td><div class="chans">${Object.keys(CH).map(k => `<span class="${i.ch.includes(k) ? "" : "off"}" style="${i.ch.includes(k) ? `background:${CH[k][1]};color:#fff` : ""}">${CH[k][0]}</span>`).join("")}</div></td></tr>`).join("")}
        </tbody></table></div><p class="s">Tap any item to open it.</p></div>
      <div class="pane span12" id="itemd" hidden></div>
      <div class="pane span4"><h3>Email flows</h3>
        <div class="flow">${[["Welcome", "A note from the shop and a first-order gift"], ["Left in the cart", "A reminder an hour later, with the photo"], ["Thank you", "Care tips for the piece they bought"], ["New arrivals", "Every Friday, the week's best finds"], ["Back in town", "Before the Holiday Open House"]].map((f, i) => `<div class="fstep"><span class="n">${i + 1}</span><div><b>${f[0]}</b><div class="s">${f[1]}</div></div></div>`).join("")}</div></div>
      <div class="pane span6"><h3>New arrivals email</h3>
        <div class="email"><div class="eh" style="background:#0f2318"><img src="img/nettie/logo.png?v=1793944505" alt=""></div><div class="eb"><span class="ek">Fresh off the truck</span><h4>This week at Nettie Jarvis</h4>
        <div class="eprods">${ITEMS.slice(0, 6).map(i => `<div><img src="${i.img}" alt=""><span>${esc(i.n)}</span><b>${money(i.p)}</b></div>`).join("")}</div><a class="ecta" style="background:#1f3a2b;color:#faedcd">Shop the new arrivals</a></div></div></div>
      <div class="pane span6"><h3>Campaigns</h3>
        ${[["Holiday Open House", "Email, Instagram, Facebook ads · Nov 20–22", "Scheduled"], ["Bourbon & barware gift guide", "Email + Instagram Shop · Dec 1", "Draft"], ["Furniture sale", "Email past buyers · Jan 2", "Idea"]].map(c => `<div class="hrow">${bubble("nettie", 28)}<div><b>${c[0]}</b><div class="s">${c[1]}</div></div><span class="pill ${c[2] === "Scheduled" ? "ok" : c[2] === "Draft" ? "warn" : "off"}">${c[2]}</span></div>`).join("")}
        <button class="hbtn ai">Plan a campaign</button></div>
    </div>`;
  window.SHOPADMIN_AFTER = m => {
    const b = $("#additem", m); if (b) b.onclick = () => APP.toast("Snap a photo, set a price. The description writes itself and the item goes to every channel you pick.");
    m.querySelectorAll("[data-item]").forEach(r => r.onclick = () => openItem(m, ITEMS.find(i => i.id === r.dataset.item)));
  };
  // one item: edit it, see where it sells, and send a blast about it
  function openItem(m, i) {
    const el = $("#itemd", m); el.hidden = false;
    m.querySelectorAll("[data-item]").forEach(r => r.classList.toggle("on", r.dataset.item === i.id));
    el.innerHTML = `<div class="row" style="justify-content:space-between"><h3>Item</h3><button class="hbtn ghost" id="itemx">Close</button></div>
      <div class="itemgrid">
        <div class="item-ph"><img src="${i.img}" alt=""><div class="row"><button class="hbtn">Add photos</button><button class="hbtn ai">Clean up the photo</button></div></div>
        <div class="formg">
          <label>Name<input class="hinput" value="${esc(i.n)}"></label>
          <div class="g3"><label>Price<input class="hinput" value="${money(i.p)}"></label><label>In stock<input class="hinput" value="${i.one ? "1 of 1" : i.qty}"></label><label>Category<input class="hinput" value="${esc(i.c)}"></label></div>
          <label>The story<textarea class="hinput ai-box" rows="4">${esc(i.n)}, ${esc(i.era)}. Found in Nelson County and cleaned up on Taylorsville Road. ${i.one ? "One of a kind: when it's gone, it's gone." : "Made close to home."}</textarea></label>
          <label>Listed on</label><div class="chtoggles">${Object.keys(CH).map(k => `<label class="ck"><input type="checkbox" ${i.ch.includes(k) ? "checked" : ""}> ${CH[k][0]}</label>`).join("")}</div>
          <div class="row"><button class="hbtn go" id="itemsave">Save everywhere</button><button class="hbtn ai">Write the description</button></div>
        </div>
        <div class="item-side">
          <h3>How it's doing</h3>
          <div class="g3 kp"><div><b>${i.one ? 312 : 1840}</b><span>Views, 30 days</span></div><div><b>${i.one ? 14 : 66}</b><span>Watching</span></div><div><b>${i.one ? 2 : 9}</b><span>Offers</span></div></div>
          <h3>Tell people about it</h3>
          <div class="blast"><img src="${i.img}" alt=""><div><span class="s">Just in at Nettie Jarvis</span><b>${esc(i.n)}</b><span>${money(i.p)}</span></div></div>
          <div class="checks"><label class="ck"><input type="checkbox" checked> Email the shop list · 640</label><label class="ck"><input type="checkbox" checked> Text VIP collectors · 85</label><label class="ck"><input type="checkbox" checked> Post to Instagram & Facebook</label><label class="ck"><input type="checkbox"> Feature in Friday's New arrivals</label></div>
          <button class="hbtn go" id="itemblast">Send the blast</button>
        </div>
      </div>`;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    $("#itemx", el).onclick = () => { el.hidden = true; m.querySelectorAll("[data-item]").forEach(r => r.classList.remove("on")); };
    $("#itemsave", el).onclick = () => APP.toast("Saved. The website, eBay, Etsy and Chairish update together.");
    $("#itemblast", el).onclick = () => APP.toast(`Blast for ${i.n} is ready. Nothing goes out from the preview.`);
  }

  APP.views.shop = { render: v => { $("#addr").innerHTML = ""; render(v); } };
})();
