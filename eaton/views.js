/* The plan pages: the deep read, how a sale happens, where it gets stuck, a page per part of The Farm, Bud, builds, costs and "Your turn".
   Facts are from research/ (sources linked on the page); portal numbers are samples. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI, money } = APP;
  const C = AX.co;
  const CONTACT = "jordan@jgoco.me";
  const src = (t, u) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`;
  const head = (kick, h, p) => `<section class="sec hero-in" style="padding-bottom:30px"><div class="wrap"><div class="kick">${kick}</div><h1 class="h1">${h}</h1>${p ? `<p class="lede">${p}</p>` : ""}</div></section>`;
  const portal = mod => `<section style="padding:0 0 40px"><div class="wrap" style="max-width:1320px"><div class="rise">${APP.hub(mod)}</div><p class="src">A working mock with sample stores, reps and numbers (Marni and the products are real). Click around: every item in the menu opens.</p></div></section>`;
  const icard = c => `<div class="card"><span class="mi" style="width:40px;height:40px;border-radius:11px;background:rgba(175,147,53,.15);color:#d9bf6a;display:grid;place-items:center;margin-bottom:12px">${svgI(c[0], 22)}</span><b style="font-size:20px;display:block">${c[1]}</b><p class="mute" style="margin:8px 0 0;font-size:16px">${c[2]}</p></div>`;
  const cards = (h, list) => `<section class="sec" style="padding-top:30px"><div class="wrap">${h ? `<h2 class="h2 rise" style="margin-bottom:26px">${h}</h2>` : ""}<div class="grid g3 rise">${list.map(icard).join("")}</div></div></section>`;
  const tbl = (hd, rows) => `<div class="tblwrap rise" style="margin-top:24px"><table class="tbl"><tr>${hd.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? " style='font-weight:700'" : ""}>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;
  const bad = t => `<b style='color:var(--bad)'>${t}</b>`;
  const good = t => `<b style='color:var(--ok)'>${t}</b>`;

  /* ---------- the deep read ---------- */
  APP.views.read = () => head("Where you stand", "The deep read.", "We looked at everything public about Eaton: the site and its code, the licenses, the store map, the market data and New York's rules. Every fact here has its source.")
    + `<section class="sec" style="padding-top:20px"><div class="wrap">
      <div class="grid g4 keep2 rise">${[["204", "New York dispensaries carry Eaton (Headset). JointCommerce counts 207 menus"], ["#8", "New York edible brand in October, peaking at #7 in May (Headset)"], ["22%", "of Eaton's sales are Nightly Nightcap, the top seller. Daily Elevation is next at 16%"], ["138", "menus carry Daily Elevation, the widest-stocked tin (JointCommerce)"]].map(s => `<div class="stat"><b style="font-size:38px">${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>
      <p class="src">Sources: ${src("Headset, Eaton Botanicals", "https://www.headset.io/brands/eaton-botanicals")} (Nov 3 2026) · ${src("JointCommerce", "https://www.jointcommerce.com/brands/eaton-botanicals")} (Nov 8 2026). Estimates from outside data; your own invoices will be more exact.</p>
    </div></section>
    <section class="sec"><div class="wrap"><div class="kick">What runs where</div><h2 class="h2 rise">Five tools. None of them talk.</h2>
      ${tbl(["Job", "What does it today", "What we saw"], [
        ["Website", "HubSpot CMS (portal 243552768)", "Every page, theme and module is on HubSpot"],
        ["Forms and newsletter", "HubSpot forms", "\"Stay updated\" and contact forms post into HubSpot"],
        ["Marketing email", "HubSpot", "Your domain is set up to send through HubSpot"],
        ["Store locator", "A Mapbox map", bad("A list uploaded by hand") + ", with a \"Last 90 days w GT\" layer kept the same way"],
        ["Wholesale requests", "Email", "\"Send us your dispensary information\" and someone writes back with a menu"],
        ["Orders", "Your distribution, Nabis, and Distru", "Two channels: Eaton Distribution's own license, and the Nabis marketplace"],
        ["Seed to sale", "Metrc", "New York switched from BioTrack to Metrc in December 2025"],
      ])}
      <p class="src">Page source, headers and DNS of eatonbotanicals.com · ${src("your FAQ", "https://www.eatonbotanicals.com/faq")} · ${src("NY license data", "https://data.ny.gov/resource/jskf-tt3q.json?$q=eaton")} (OCM-DIST-25-000198) · ${src("Nabis NY launch", "https://mgmagazine.com/press-releases/nabis-launches-in-new-york")} · ${src("OCM on Metrc", "https://cannabis.ny.gov/ocm-expands-seed-to-sale-support")}. Distru is from you; it isn't visible publicly. research/tech-stack.md</p></div></section>
    <section class="sec"><div class="wrap split">
      <div class="rise"><div class="kick">The market</div><h2 class="h2">More stores than any team of six can know.</h2><ul class="lst"><li>New York sold <b>$1.69B</b> in 2025, up 94%, and <b>$1.41B</b> through Q3 2026</li><li><b>744</b> dispensaries are open, up from 556 last December, and <b>327</b> more are licensed but not open</li><li><b>582</b> licensed processors compete for the same shelves</li><li>The five best-selling edibles in the state are all <b>CBN or CBG "effect" gummies</b>. Functional is what's winning, and it's your whole lineup</li></ul></div>
      <div class="rise card" style="padding:0;overflow:hidden"><img src="img/photos/lineup-group.jpg?v=1794190461" alt="Eaton's gummy tins with their mushrooms" style="aspect-ratio:4/3;object-fit:cover;width:100%"></div>
    </div><div class="wrap"><p class="src">${src("OCM 2025 sales", "https://cannabis.ny.gov/system/files/documents/2026/02/february-2026-ccb-press-release.pdf")} · ${src("Governor, Oct 27 2026", "https://governor.ny.gov/news/governor-hochul-announces-new-yorks-legal-cannabis-market-surpasses-4-billion-retail-sales")} · ${src("OCM, Oct 2 2026", "https://cannabis.ny.gov/system/files/documents/2026/10/10.1-ccb-release.pdf")} · ${src("Hoodie, best-selling NY edibles", "https://www.hoodieanalytics.com/cannabis_markets/new-york/edibles/best-selling-edibles")}. research/market.md</p></div></section>
    <section class="sec"><div class="wrap"><div class="kick">The rules</div><h2 class="h2 rise">What a brand is allowed to do.</h2>
      <p class="lede rise">New York takes most of the usual levers away. That's why the levers that are left have to be run well.</p>
      ${tbl(["Not allowed", "Still yours"], [
        ["Paying for shelf space or slotting", "Rep visits, and knowing which store needs one"],
        ["Paid vendor days, or perks for budtenders", "Unpaid education days and pop-ups with non-infused samples"],
        ["Billboards, health claims, \"free\" or giveaway offers", "Email and SMS to opted-in, age-confirmed lists (75.9% or more 21+)"],
        ["THC ads on Meta and Google", "Your own site, your newsletter and in-store displays (up to $200 per store a year)"],
      ])}
      <p class="src">${src("OCM Part 129 guidance", "https://cannabis.ny.gov/node/9701")} · ${src("OCM Trade Practices bulletin", "https://cannabis.ny.gov/system/files/documents/2025/05/tpb-bulletin-2.pdf")} · ${src("9 NYCRR 124.1", "https://www.law.cornell.edu/regulations/new-york/9-NYCRR-124.1")} · ${src("Meta ad standards", "https://transparency.meta.com/en-gb/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/")}</p></div></section>
    <section class="sec"><div class="wrap"><div class="grid g2 rise">
      <div class="card"><b style="font-size:20px">HubSpot can say no</b><p class="mute" style="font-size:16px">HubSpot's acceptable use policy never names cannabis, but it bans content that promotes illegal activity, and cannabis is still federally illegal. That's their call to make, any day. A hub you own, sending through a provider that works with cannabis, takes the call away from them.</p><p class="src">${src("HubSpot AUP, Sep 16 2026", "https://legal.hubspot.com/acceptable-use")}</p></div>
      <div class="card"><b style="font-size:20px">Copy is a moving target</b><p class="mute" style="font-size:16px">Part 129 defines health claims broadly, including in product names and third-party quotes. A rule check on every email, post and page means nobody has to remember the latest version of the rule.</p><p class="src">${src("OCM Part 128 and 129", "https://cannabis.ny.gov/proposed-part-128-and-129-plma-amendments")}</p></div>
    </div></div></section>
    ${APP.next("sale", "How a sale happens")}`;

  /* ---------- how a sale happens ---------- */
  const SALE = [
    ["flag", "A store finds you", "A buyer fills in the form, or a rep walks in. Today a person emails a menu back.", "Routed to the rep for that area, license checked, menu with live stock attached"],
    ["users", "The visit", "The rep brings samples, talks through the tins, maybe books a training.", "The store's whole history on the rep's phone, and samples logged out for Metrc"],
    ["cart", "The order", "By email, text or Nabis, then typed into Distru.", "Built in The Farm from their usual, written to Distru on confirm, Nabis orders pulled in"],
    ["route", "Delivery and pay", "Your distribution or Nabis delivers. The store has 30 days to pay.", "Invoice and payment on the store's record, and the C.O.D. list checked before terms"],
    ["repeat", "Sell-through and the next order", "Someone remembers to check in. Or doesn't.", "Each store's rhythm learned, the reorder drafted, the pop-up offered, the pin updated"],
  ];
  APP.views.sale = () => head("How a sale happens", "Five steps.<br>Each one starts over by hand.", "This is the loop every Eaton tin goes through to reach a shelf, from what's public and how brands like yours sell in New York. The interview will tell us where we're wrong.")
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="doors rise">${SALE.map((d, i) => `<div class="door"><span class="dn">${i + 1}</span><span class="mi">${svgI(d[0], 22)}</span><b>${esc(d[1])}</b><p>${esc(d[2])}</p><small>With The Farm: ${esc(d[3])}</small></div>`).join("")}</div></div></section>
    <section class="sec"><div class="wrap split">
      <div class="rise"><div class="kick">Two books, one store</div><p class="quote">Direct or Nabis,<br><em>it's the same store.</em></p><p class="lede">Eaton holds its own distribution license and sells on the Nabis marketplace too. A store that orders both ways today has two histories. The Farm joins them, so the rep sees one rhythm, one total and one relationship.</p></div>
      <div class="rise card"><b style="font-size:20px">What the rep doesn't have to do anymore</b><ul class="lst"><li>Retype an emailed order into Distru</li><li>Check Nabis to see if a store already ordered</li><li>Keep a spreadsheet of who's due</li><li>Ask marketing to update the store map</li><li>Text the ambassador team to find a free Saturday</li></ul></div>
    </div></section>`
    + APP.next("stuck", "Where it gets stuck");

  /* ---------- where it gets stuck ---------- */
  const STUCK = [
    ["Two channels, no join", "Your own distribution and Nabis each hold part of a store's story. Neither one knows the whole account, and HubSpot knows neither unless someone types it in.", "One store record that pulls orders from Distru and Nabis, so totals, rhythm and history are whole.", "orders", "2", "order books, 0 links"],
    ["Reorders run on memory", "Six reps and 204 stores is 34 stores each, growing. Nobody can hold every store's rhythm in their head, so the store that quietly runs out gets missed.", "Each store's reorder gap learned from its invoices, a list of who's due every morning, and the order drafted.", "reorders", "34", "stores per rep, today"],
    ["The store map is uploaded by hand", "The Mapbox map and its Golden Ticket layer are kept by export and upload. A shopper who finds a store that's out of stock doesn't come back.", "A locator built into the site and The Farm, drawn from deliveries, by product, every day.", "locator", "By hand", "every time stores change"],
    ["Promo days live in texts", "Pop-ups and education days are booked between reps, ambassadors and buyers by text and email, and nobody measures what they did.", "A promo calendar with one-click store confirmation, the rules built in, and lift measured two weeks later.", "promo", "0", "pop-ups measured"],
    ["Wholesale requests wait", "The site's answer to a new store is \"we'll get back to you.\" 327 licensed stores haven't opened yet. The first brand to answer gets the shelf.", "Every request routed to its rep in seconds, the license checked, and the menu sent with live stock.", "hub", "327", "stores licensed, not open"],
    ["HubSpot rents you your own customers", "Seats, a marketing tier and a website tier, for a CRM that doesn't know your orders, from a company that can decide cannabis isn't allowed.", "The Farm: yours, wired to your orders, and sending through a provider that works with cannabis.", "costs", "$19k", "a year at Pro list price, est."],
    ["Every send is a judgment call", "Part 129 changes. Health claims, 21+ thresholds, license numbers and promo rules each have to be remembered by whoever writes the email.", "A rule check on every email, SMS, post and page before it can send.", "marketing", "75.9%", "of the audience must be 21+"],
    ["One marketer, a whole department's work", "Newsletters, budtender education, social, launches, the site and the map, for 204 stores and the shoppers in them.", "Bud drafts it all, Jes approves it, and the launch calendar runs the dates.", "bud", "1", "marketer"],
  ];
  APP.views.stuck = () => head("Where it gets stuck", "Eight bottlenecks.<br>Ranked.", "Our read from everything public about Eaton and from how New York brands sell. You know which of these are real, which is why the interview asks about each one.")
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="stk rise">${STUCK.map((s, i) => `<div class="stk-i"><div class="stk-n">${String(i + 1).padStart(2, "0")}</div><div><h3>${esc(s[0])}</h3><p class="mute">${esc(s[1])}</p><div class="stk-fix"><b>${svgI("check", 16)} The fix</b><span>${esc(s[2])}</span><a href="#${s[3]}">See it →</a></div></div><div class="stk-k"><b>${esc(s[4])}</b><small>${esc(s[5])}</small></div></div>`).join("")}</div>
      <p class="src">Stores per rep is 204 stores over the 6 reps you told us about. HubSpot: Sales Hub Pro at $100 a seat for 7 seats plus Marketing Hub Pro at $890, list prices from ${src("hubspot.com", "https://www.hubspot.com/pricing/sales/enterprise?term=monthly")}, Nov 8 2026; your real plan isn't public. Other figures: research/market.md and research/tech-stack.md.</p></div></section>`
    + APP.next("hub", "The portal");

  /* ---------- the portal ---------- */
  APP.views.hub = sub => head("The Farm", "Sales and marketing.<br>One login.", "The Farm is the system behind your site. Every dispensary, buyer, order, reorder, pop-up, campaign and store pin lives in one place, linked to each other and wired into Distru and Nabis. It's built for how Eaton sells, not for every company HubSpot sells to.")
    + portal(sub || "today")
    + `<section class="sec" style="padding-top:30px"><div class="wrap"><div class="kick">Everything linked</div><h2 class="h2 rise">Nothing typed twice.</h2>
      <p class="lede rise">A new store fills in the form. It becomes a lead for the right rep, with the menu attached. The first order goes to Distru when the rep confirms. The invoice puts a pin on the map. The rhythm starts, the reorder drafts itself, the pop-up gets booked, and the lift shows up two weeks later. Bud can tell anyone on the team any part of it.</p>
    </div></section>`
    + cards("On every device.", [["phone", "The reps' phones", "Their day, who's due, each store's history, the order screen, and visit notes by voice."], ["users", "Marni's view", "Every rep's week, every store's rhythm, and the orders waiting for an OK."], ["megaphone", "Jes's view", "Campaigns, the launch calendar, the site, social and the rule check, with Bud's drafts waiting."]])
    + APP.next("locator", "Store locator");

  /* ---------- store locator ---------- */
  APP.views.locator = () => head("Store locator", "A store map<br>that keeps itself.", "Today's locator is a Mapbox map someone re-uploads, with a hand-kept Golden Ticket layer. The Farm's locator draws itself from deliveries. Every invoice adds a store or a tin. A tin a store hasn't restocked in 90 days drops off. The same map is on your site, in the reps' pockets, and in Bud's answers.")
    + portal("locator")
    + cards("Built in, everywhere.", [["site", "On your site", "Shoppers search by city or pick a tin, and see only stores that actually got it. Pop-up days show on the pin."], ["leaf", "Golden Ticket, automatic", "Limited drops glow gold the day they ship and fade when they sell through. No layer to rebuild."], ["route", "In the reps' pockets", "The same map shows reps who's due, who's missing a tin, and who has a promo day coming."], ["chat", "In Bud's answers", "\"Where can I send a shopper in Ithaca for Serenity Now?\" Bud answers from the same pins."], ["megaphone", "In the newsletter", "A launch email can say \"now at these stores near you\", by region, without anyone making the list."], ["chart", "For the buyers", "\"18 stores within 10 miles carry Eaton\" is a selling point a rep can show on the spot."]])
    + APP.next("promo", "Promo days");

  /* ---------- promo days ---------- */
  APP.views.promo = () => head("Promo days", "Book a pop-up<br>like an appointment.", "Brand ambassadors, education tables, Golden Ticket nights and budtender trainings. Pick the store, the day and who's going. The store confirms with one click. The day shows up on your site and on the store's pin. Two weeks later, The Farm shows what it did.")
    + portal("promos")
    + `<section class="sec" style="padding-top:20px"><div class="wrap split">
      <div class="rise"><div class="kick">Inside the rules</div><h2 class="h2">The rules, built into the booking.</h2><p class="lede">New York allows education, not incentives. Every promo day in The Farm carries the rules with it, so a new ambassador can't get them wrong.</p></div>
      <div class="rise card"><ul class="lst"><li>Tabling is unpaid education. No pay or perks to the store or its budtenders</li><li>Samples are non-infused, packed from a logged kit</li><li>Rep samples to buyers are for the deal only, and logged for Metrc</li><li>In-store displays stay under $200 per store a year, counted for you</li></ul><p class="src">${src("OCM Trade Practices bulletin", "https://cannabis.ny.gov/system/files/documents/2025/05/tpb-bulletin-2.pdf")} · ${src("9 NYCRR 124.1", "https://www.law.cornell.edu/regulations/new-york/9-NYCRR-124.1")} · ${src("OCM Part 129", "https://cannabis.ny.gov/node/9701")}</p></div>
    </div></section>`
    + cards("From booked to measured.", [["cal", "Who's free", "Ambassadors' and reps' calendars side by side, so a Saturday never gets double-booked."], ["mail", "One-click confirm", "The buyer gets the day, the time and who's coming. Yes fills both calendars. No offers the next open day."], ["chart", "The lift", "Units in the two weeks after vs. before, by tin, so you know which stores and which products are worth the Saturday."]])
    + APP.next("orders", "Orders and Distru");

  /* ---------- orders and Distru ---------- */
  APP.views.orders = () => head("Orders and Distru", "Order in The Farm.<br>It lands in Distru.", "Reps build the order where they already are, from the store's usual, with live stock by batch. When they confirm, it becomes a sales order in Distru. Nabis marketplace orders come in on their own and land on the same store.")
    + portal("orders")
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="kick">How it's wired</div><h2 class="h2 rise">Distru stays the system of record.</h2>
      ${tbl(["From Distru into The Farm", "From The Farm into Distru"], [
        ["Products, price tiers, batches and stock, with lab results", "Sales orders, only after a rep confirms"],
        ["Companies and contacts", "New companies from won leads"],
        ["Invoices and payments", "Tasks and notes, if you want them there too"],
        ["Webhooks the moment an order, invoice or package changes", "Nothing else. Metrc stays between Distru and the state"],
      ])}
      <p class="src">From Distru's own ${src("API documentation", "https://apidocs.distru.dev/llms.txt")}: a documented REST API with webhooks for orders, invoices, companies, products and packages. Distru support turns on API access and webhooks. If you run something else, The Farm wires to that instead. research/tech-stack.md</p></div></section>`
    + cards("What a rep stops doing.", [["mail", "Retyping emailed orders", "An order email becomes a draft order on the store, waiting for an OK."], ["search", "Checking stock by asking", "Stock and batch are on the order screen, live from Distru."], ["shield", "Guessing on terms", "Average days to pay, and OCM's C.O.D. list, checked before terms are offered."]])
    + APP.next("reorders", "Reorders");

  APP.views.reorders = () => head("Reorders", "Know who's running low<br>before they do.", "Every store has a rhythm: Lantern House orders about every 21 days, Northstar every 40. The Farm learns it from their invoices on both channels, and flags a store when it's at 85% of its usual gap. The rep gets the store, the usual order, and a two-line note to the buyer, drafted.")
    + portal("reorders")
    + cards("Then it gets smarter.", [["chart", "Gaps on the shelf", "Stores like this one sell Gal Pal. This one doesn't carry it. That's the next pitch."], ["leaf", "Launches go to the right stores", "Golden Ticket goes first to stores that sold the last drop fastest."], ["users", "Marni sees the whole board", "Who's late, by rep, by region, by channel. And what it's worth."]])
    + APP.next("inbox", "Inbox and outreach");

  /* ---------- inbox and outreach ---------- */
  APP.views.inbox = () => head("Inbox and outreach", "Every email lands<br>on its store.", "Each rep's Gmail, inside The Farm. Email from a buyer files itself on the store and comes with the first move done: the reorder drafted, the pop-up held, the reply written. Everything HubSpot's Sales Hub does for the team is here too.")
    + portal("inbox")
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="kick">HubSpot Sales Hub, rebuilt</div><h2 class="h2 rise">What the reps use. Wired to orders.</h2>
      ${tbl(["In HubSpot", "In The Farm"], [
        ["Contacts and companies", "Dispensaries and buyers, with their orders from Distru and Nabis"],
        ["Deals and pipelines", "New stores graded 1 to 6, from lead to chain"],
        ["Sequences", "Follow-ups for new stores and quiet ones, with an approval step before anything goes"],
        ["Meeting links", "A booking page per rep, for buyers and for trainings"],
        ["Email tracking", "Opens and clicks on the store's record"],
        ["Templates and snippets", "Templates plus the menu, sell sheets and COAs, attached in one click"],
        ["Call notes", "Voice notes after a visit, written up and filed to the store"],
      ])}</div></section>`
    + APP.next("marketing", "Marketing");

  /* ---------- marketing ---------- */
  APP.views.marketing = () => head("Marketing", "Everything HubSpot did<br>for marketing. Rebuilt.", "Buyer newsletters, budtender education, launches, the 21+ shopper list, social and the site, for one marketer. Bud drafts, Jes approves, and every send is checked against New York's rules before it can go.")
    + portal("campaigns")
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="kick">HubSpot Marketing Hub, rebuilt</div><h2 class="h2 rise">The marketing tools, one by one.</h2>
      ${tbl(["In HubSpot", "In The Farm"], [
        ["Marketing email and lists", "Buyers, budtenders and 21+ shoppers, as separate lists, with the rule check"],
        ["Forms and landing pages", "Your site's forms, each one landing on a store or contact"],
        ["Workflows", "Plain-English rules: \"when a store's first order ships, send the welcome kit\""],
        ["Social scheduling", "Posts on the launch calendar, drafted by Bud, approved by Jes"],
        ["Website (Content Hub)", "Your site, hosted with The Farm, edited by Jes or by asking Bud"],
        ["Reports", "Opens and clicks, plus what HubSpot can't see: orders after a send"],
      ])}</div></section>`
    + cards("For a team of one.", [["file", "Design review", "Upload a tin, a sell sheet or a post. Pin comments, approve, and the final goes to the reps' email attachments."], ["leaf", "Budtender corner", "A monthly email and a short training per tin, so the person behind the counter can explain the mushrooms."], ["chart", "Did it sell?", "Every buyer email shows the orders that followed it. That's the report HubSpot can't give you."]])
    + APP.next("expenses", "Expenses and ROI");

  /* ---------- expenses and ROI ---------- */
  APP.views.expenses = () => head("Expenses and ROI", "What every dollar<br>brought back.", "Rep travel, meals and mileage, trade show booths and samples, promo day kits. Every expense lands in The Farm tied to the visit, show or pop-up it paid for, so you can see what each one brought back in orders.")
    + portal("expenses")
    + cards("From the receipt to the answer.", [["camera", "No expense reports", "Reps snap a receipt, text it to Bud, or just use the company card. It's matched to the work and waits for Marni's tap."], ["route", "Mileage from the route", "The miles a rep actually drove between stores, logged for them. Nobody keeps a notebook in the car."], ["shield", "Limits that flag themselves", "Meal and hotel limits you set are checked as expenses come in, not at the end of the month."], ["flag", "Trade shows that prove themselves", "Every badge scanned becomes a lead tagged with the show, so the stores and orders it brought count back to it."], ["chart", "ROI on everything", "Shows, rep territories, promo days and buyer emails, compared by what followed each dollar."], ["book", "Ready for the books", "Approved expenses export each month by category, rep and show, with the receipts attached."]])
    + APP.next("bud", "Bud, your assistant");

  /* ---------- Bud ---------- */
  const slack = (who, c, msg, bud) => `<div class="v-msg" style="animation:none"><span class="av ${bud ? "bud" : ""}" style="${bud ? "" : `background:${c}`}">${bud ? `<img src="img/mark-gold.png?v=1794190461" alt="">` : esc(who[0])}</span><div><b>${esc(who)}${bud ? " <em>APP</em>" : ""}</b><p>${msg}</p></div></div>`;
  APP.views.bud = () => head("Bud, your assistant", "One assistant.<br>The whole team.", "Bud is Eaton's own AI assistant. It knows every store, order, tin, pop-up and campaign in The Farm, and it lives where the team already works: in The Farm, in Slack, in Microsoft Teams and on the phone. Ask it anything. It does the first draft of almost everything. A person presses send.")
    + `<section class="sec" style="padding-top:10px"><div class="wrap"><div class="grid g2 rise" style="align-items:start">
      <div><div class="v-slack" style="width:100%"><div class="v-slack-top">${svgI("slack", 18)}<b># sales</b><span>Slack</span></div>
        ${slack("Bud", "", "Good morning. <b>6 stores are due to reorder</b> today, worth about $13,400 in usual orders. Lantern House emailed for Nightcap at 8:14, and Dana's draft is ready.", true)}
        ${slack("Dana", "#f2683c", "@Bud send Lantern House their usual and tell Rosa Sam is on for the 14th")}
        ${slack("Bud", "", "Order for $3,840 is waiting for your OK in The Farm, and the reply to Rosa is drafted. Approve both?", true)}
        <div style="padding:0 18px 14px 66px"><div class="v-acts"><span>Approve both</span><span>Edit</span></div></div></div>
        <p class="src">Slack: Bud posts to the channels you pick and answers in DMs. Each rep gets a morning brief.</p></div>
      <div><div class="v-slack" style="width:100%"><div class="v-slack-top" style="background:#464775">${svgI("chat", 18)}<b>Eaton · Marketing</b><span>Microsoft Teams</span></div>
        ${slack("Jes", "#9d86d6", "@Bud write the Golden Ticket buyer email for Thursday")}
        ${slack("Bud", "", "Drafted for the 61 stores that carried it in the last 90 days, with the Nov 18 order cutoff and the stores' reps signed. It passes the rule check. Want a version for the 21+ shopper list too?", true)}
        ${slack("Jes", "#9d86d6", "Yes, and schedule both")}
        ${slack("Bud", "", "Both are on the launch calendar for Thursday 9 a.m., waiting for your final OK.", true)}</div>
        <p class="src">Teams works the same way. Use whichever one Eaton is on, or both.</p></div>
    </div></div></section>`
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="kick">Supercharge your team with AI</div><h2 class="h2 rise">What each person gets.</h2>
      <p class="lede rise">The same team, with an assistant that never forgets a store and never stops drafting. The hours that went to typing, chasing and remembering go back into stores and buyers.</p>
      <div class="tblwrap rise" style="margin-top:24px"><table class="tbl"><tr><th>Who</th><th>What Bud takes off their plate</th><th>What they get back</th></tr>${[["Marni, VP of Sales", "Building the weekly board, checking who's due, approving orders and expenses one by one", "A morning brief of the whole team, and one-tap approvals"], ["The reps", "Retyping orders, writing follow-ups, logging visits, expense reports, planning the route", "More store visits a week, with every order and note ready before they walk in"], ["Jes, marketing", "First drafts of newsletters, posts and launch emails, and checking each one against the rules", "Time for the brand work only a person can do"], ["Brand ambassadors", "Finding a free Saturday, packing lists, confirming with the store", "A schedule that books itself, and a kit list on their phone"], ["Operations", "Re-entering orders into Distru, chasing missing receipts", "Clean orders and approved expenses, ready for the books"], ["Dan", "Asking around for how things are going", "Any answer about the business, in plain English, any time"]].map(r => `<tr><td style="font-weight:700">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table></div>
      <p class="src">Bud drafts and prepares. People decide and press send. Nothing reaches a customer or Distru without a person.</p></div></section>`
    + `<section class="sec" style="padding-top:20px"><div class="wrap"><div class="kick">What Bud does</div><h2 class="h2 rise">Ask like you'd ask a person.</h2>
      <div class="grid g3 rise" style="margin-top:24px">${[["search", "Find anything", "\"What did Copperleaf order last month?\" \"Who carries Cool Down in Buffalo?\""], ["cart", "Start the order", "\"Send Saltbox their usual plus a case of Gal Pal.\" Drafted, waiting for the rep."], ["cal", "Book the day", "\"Find Sam a Saturday at a Brooklyn store that's due.\""], ["mail", "Write the email", "Replies, follow-ups, buyer newsletters and budtender notes, in each person's voice."], ["users", "Brief the team", "Each rep's morning: who's due, who emailed, what's booked. Marni's: the whole board."], ["shield", "Check the rules", "\"Can we say this?\" Bud checks copy against Part 129 before it goes anywhere."]].map(c => `<div class="card"><span style="color:#d9bf6a">${svgI(c[0], 24)}</span><b style="font-size:19px;display:block;margin-top:8px">${c[1]}</b><p class="mute" style="font-size:15.5px;margin:6px 0 0">${c[2]}</p></div>`).join("")}</div></div></section>`
    + `<section class="sec" style="padding-top:20px"><div class="wrap split">
      <div class="rise"><div class="kick">It learns how you work</div><h2 class="h2">Tell it once.</h2><p class="lede">"Remember that Copperleaf only takes deliveries before noon." "Remember that Marni signs off on anything over $5,000." Bud keeps those, and the whole team's drafts follow them from then on.</p></div>
      <div class="rise card"><b style="font-size:20px">The guardrails</b><ul class="lst"><li>Nothing goes to a customer without a person pressing send</li><li>Nothing writes to Distru without a rep's confirm</li><li>Each rep's email stays theirs</li><li>Costs and margins only for the people who should see them</li></ul></div>
    </div></section>`
    + `<section style="padding:0 0 40px"><div class="wrap" style="max-width:1320px"><div class="rise">${APP.hub("bud")}</div><p class="src">Bud inside The Farm. A working mock with sample stores.</p></div></section>`
    + APP.next("phone", "From your phone");

  /* ---------- from your phone ---------- */
  const phone = (title, b, cap) => `<div class="ph rise"><div class="ph-in"><div class="ph-top"><span class="ph-av"><img src="img/mark-gold.png?v=1794190461" alt="" style="width:20px"></span><b>Bud</b><small>${esc(title)}</small></div>
    ${b.map(([s, h]) => `<div class="ph-b ${s}">${h}</div>`).join("")}</div>${cap ? `<p>${cap}</p>` : ""}</div>`;
  const card = `<div class="ph-rc" style="font-family:var(--body);font-size:12px;line-height:1.4"><b style="font-size:14px">MOTT STREET WELLNESS</b><br>Lee Park · Purchasing<br>lee@example.com<br>(212) 555-0187</div>`;
  const bars = (rows, max) => `<div class="gpt-ch">${rows.map(r => `<div><span>${r[0]}</span><i style="width:${Math.max(3, r[1] / max * 100)}%;${r[2] ? `background:${r[2]}` : ""}"></i><b>${r[1]}%</b></div>`).join("")}</div>`;
  const GPT = [
    { tab: "How are we doing?", ic: "hub", q: "How is Eaton doing this quarter?", a: () => `<p>Growing, with one thing to watch: reorders are coming in later upstate.</p><div class="gpt-k">${[["Orders, Oct", "$412k", "↑ 9% on Sep"], ["Stores ordering", "196 of 204", "8 quiet 60+ days"], ["Avg reorder gap", "26 days", "↑ 3 upstate"], ["New stores", "11", "in October"], ["Nabis share", "38%", "of orders"], ["Pop-up lift", "+44%", "avg, 6 days"]].map(k => `<div><small>${k[0]}</small><b>${k[1]}</b><span style="color:#1d8a57">${k[2]}</span></div>`).join("")}</div><p style="margin-top:10px">Want the 8 quiet stores, by rep?</p>` },
    { tab: "Best pop-ups", ic: "cal", q: "Which promo days were worth it?", a: () => `<p>Education days at stores that already carry 5 or more tins did best. First visits at new stores did the least.</p>${bars([["Nightcap pop-up, Manhattan", 90, "#8e2235"], ["Golden Ticket night, Albany", 61, "#af9335"], ["Education day, Rochester", 41, "#154734"], ["Training, Brooklyn", 33, "#2a6b4f"], ["First visit, Long Island", 12, "#8e9a92"]], 90)}<small>Unit lift, two weeks after vs. before</small>` },
    { tab: "Who's slipping", ic: "repeat", q: "Which stores are ordering less than they used to?", a: () => `<p>Three stores are ordering less often, and two of them started ordering Golden Ticket on Nabis instead of from you directly.</p><table class="gpt-t"><tr><th>Store</th><th>Gap then</th><th>Gap now</th><th>Rep</th></tr>${[["Orchard & Oak", "28", "51", "Kendra"], ["Northstar Wellness", "30", "44", "Tom"], ["Saltbox Dispensary", "21", "33", "Kendra"]].map(r => `<tr><td>${r[0]}</td><td>${r[1]} days</td><td style="color:#c53030;font-weight:700">${r[2]} days</td><td>${r[3]}</td></tr>`).join("")}</table>` },
    { tab: "Best tin per region", ic: "chart", q: "What sells best upstate vs. the city?", a: () => `<p>Nightcap leads everywhere. Daily Elevation is stronger in the city; Fixer Upper upstate.</p>${bars([["Nightcap, NYC", 24, "#8e2235"], ["Daily Elevation, NYC", 19, "#f2683c"], ["Nightcap, upstate", 20, "#8e2235"], ["Fixer Upper, upstate", 14, "#e8a33a"]], 24)}<small>Share of units by region, sample</small>` },
  ];
  const gptBox = i => `<div class="gpt-top"><i></i><b>ChatGPT</b><span>The Farm connected</span></div><div class="gpt-u">${esc(GPT[i].q)}</div><div class="gpt-a">${GPT[i].a()}</div>`;
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-gpt]"); if (!b) return;
    document.querySelectorAll("[data-gpt]").forEach(x => x.classList.toggle("on", x === b));
    const box = document.getElementById("gpt"); if (box) box.innerHTML = gptBox(+b.dataset.gpt);
  });
  APP.views.phone = () => head("From your phone", "Run the route<br>from the car.", "Bud has its own number. Reps text it like they'd text a good office manager: a photo of a business card, a voice note after a visit, a yes. And if the team uses ChatGPT or Claude, connect The Farm and ask anything about the business.")
    + `<section class="sec" style="padding-top:10px"><div class="wrap"><div class="ph-row">
      ${phone("Scan a card", [["me", card], ["in", "New store: <b>Mott Street Wellness</b>, Manhattan. License checked: active. That's Marni's area. Send Lee today's menu?"], ["me", "Yes"], ["in", "Sent from Marni's email with live stock. Follow-up set for Thursday."]], "A business card, a badge at a trade show, a storefront. Snap it and it's a lead.")}
      ${phone("After a visit", [["me", "🎙 0:28 · voice note"], ["in", "Filed to <b>Saltbox</b>: Mia wants Gal Pal, and a training in December. Added 12 Gal Pal to their draft and held Dec 12 for Kendra."], ["me", "👍"]], "Thirty seconds in the car becomes the note, the task and the next order.")}
      ${phone("Approve on the go", [["in", "Order for <b>Lantern House</b>: their usual, $3,840, Net 30. Send to Distru?"], ["me", "Yes"], ["in", "In Distru as SO-20418. Rosa gets the confirmation from you."]], "Orders, replies and promo days wait for a YES. Nothing goes out without one.")}
    </div></div></section>`
    + `<section class="sec"><div class="wrap split" style="align-items:start">
      <div class="rise"><div class="kick">ChatGPT and Claude, connected</div><h2 class="h2">Ask the whole business a question.</h2><p class="lede">Connect The Farm to ChatGPT or Claude and ask about the whole company: how it's doing, which pop-ups paid off, which stores are slipping. It reads your real numbers, and it can only look unless you say otherwise.</p>
        <div class="gpt-tabs">${GPT.map((g, i) => `<button data-gpt="${i}" class="${i ? "" : "on"}">${svgI(g.ic, 16)}${g.tab}</button>`).join("")}</div>
        <p class="src">A private connector to The Farm. Read-only unless you turn on actions.</p></div>
      <div class="rise"><div class="gpt" id="gpt">${gptBox(0)}</div><p class="src" style="margin:10px 0 0">Sample questions and answers, from sample numbers</p></div>
    </div></section>`
    + APP.next("build", "Anything you want built");

  /* ---------- anything you want built ---------- */
  const IDEAS = [
    ["leaf", "Field to batch", "Harvests, batches and lab results from the farm, tied to the tins they became and the stores they went to."],
    ["users", "A budtender portal", "Short trainings per tin, a quiz, and a certificate. Stores whose budtenders finish it sell more, and you'll see it."],
    ["cal", "An ambassador app", "Their schedule, the store's buyer, the sampling kit checklist, and photos from the table, filed to the promo day."],
    ["flag", "Launch waitlists", "Buyers ask to be first for the next Golden Ticket. The drop goes to them in order."],
    ["chart", "An owner's dashboard", "Sales, stores, reorders and cash on one page for Dan, and a version for investors."],
    ["bolt", "Whatever eats your week", "The spreadsheet you rebuild every Monday, the report you copy by hand, the thing you wish ran itself."],
  ];
  APP.views.build = () => head("Anything you want built", "If you can describe it,<br>we can build it.", "The Farm isn't a product you have to fit into. It's built for Eaton, and it keeps growing with you. Tell us the idea, and you get a price before anything starts.")
    + `<section class="sec" style="padding-top:10px"><div class="wrap"><div class="grid g3 rise">${IDEAS.map(icard).join("")}</div></div></section>`
    + `<section class="sec"><div class="wrap split" style="align-items:start">
      <div class="rise"><div class="kick">How a new build works</div><ol class="qlist" style="list-style:none;padding:0">${[["Tell us", "In a sentence, an email, or by telling Bud. \"I wish we could...\" is enough."], ["Get a price", "What it costs to build, and what it adds to the monthly. Nothing starts until you say yes."], ["Use it", "It shows up inside The Farm, wired to everything else, and Bud knows how to use it."]].map(q => `<li class="q"><div><b>${q[0]}</b><span>${q[1]}</span></div></li>`).join("")}</ol></div>
      <form class="form-x rise card" id="build-form" onsubmit="return false"><b style="font-size:22px">Ask for a build</b><label>What should it do?<textarea name="idea" placeholder="I wish we could see which budtenders recommend us most."></textarea></label><label>Who would use it?<input name="who" placeholder="The reps, the ambassadors, Marni"></label><label>Your name<input name="person" placeholder="Your name"></label><button class="btn" type="submit">Send to Jordan</button><small class="mute">Opens your own email app with the idea written. You press send.</small></form>
    </div></section>`
    + APP.next("costs", "What it replaces");
  document.addEventListener("submit", e => {
    if (e.target.id !== "build-form") return; e.preventDefault();
    const f = e.target.elements, b = `Hi Jordan,\n\nHere's something we'd like built into The Farm:\n\n${f.idea.value}\n\nWho'd use it: ${f.who.value}\n\n${f.person.value}`;
    location.href = `mailto:${CONTACT}?subject=${encodeURIComponent("The Farm: a build request")}&body=${encodeURIComponent(b)}`;
  }, true);

  /* ---------- costs ---------- */
  APP.views.costs = () => head("What it replaces", "What goes away.", "We'll price The Farm after the interview, once we know what you run today and what you pay for it. Here's what it replaces.")
    + `<section class="sec" style="padding-top:10px"><div class="wrap"><div class="tblwrap rise"><table class="tbl"><tr><th>Today</th><th>With The Farm</th></tr>${AX.costs.replaces.map(r => `<tr><td><span style="text-decoration:line-through;opacity:.7">${esc(r[0])}</span></td><td><b>${esc(r[1])}</b></td></tr>`).join("")}</table></div>
      <p class="src">HubSpot list prices from ${src("hubspot.com", "https://www.hubspot.com/pricing/marketing/enterprise?term=monthly")}, read Nov 8 2026. Your actual plan isn't public. Distru and Nabis stay.</p>
      <div class="grid g3 rise" style="margin-top:30px">${[["Upfront", "Your site moved off HubSpot in its own look, The Farm set up the way Eaton sells, Distru and Nabis wired in, your stores and history moved over, and the team shown how to use it."], ["Ongoing", "One monthly bill: AI usage (Bud, the drafting and the reading, billed by use), services (hosting, the database, email sending and texting), a platform fee that keeps it maintained, secure and backed up, and a development retainer for changes as you grow."], ["New builds", "Anything you want built, we can build. Tell us the idea and you get a price before anything starts: the upfront cost to build it and what it adds to the monthly."]].map(c => `<div class="card"><b style="font-size:22px">${c[0]}</b><p class="mute" style="font-size:16px;margin:8px 0 0">${c[1]}</p></div>`).join("")}</div></div></section>`
    + APP.next("questions", "Your turn");

  /* ---------- your turn ---------- */
  const QS = [
    ["How does a store become an Eaton store today?", "Where do new dispensaries come from: the form, rep walk-ins, Nabis, trade shows? Who answers them, and how fast?"],
    ["Distru and Nabis", "What runs in Distru today, and who types orders into it? What share of orders come through Nabis? Do the reps see both?"],
    ["What do you use HubSpot for?", "Which hubs and tiers, how many seats, and which parts the team actually uses. What would you miss?"],
    ["The reps' week", "How many stores each, how they plan a route, how they know who's due, and what they carry into a visit."],
    ["Promo days", "Who books them, how many a month, how ambassadors are scheduled, and whether you can tell which ones worked."],
    ["The store map", "Who updates the Mapbox map and the Golden Ticket layer, and how often?"],
    ["Marketing", "What Jes sends, to whom, and how often. Buyer email, budtender education, the 21+ list, social."],
    ["Expenses and trade shows", "How do reps turn in expenses today, who approves them, and how do you decide which trade shows are worth going back to?"],
    ["Slack or Teams?", "Which one does the team live in, and which channels matter?"],
    ["Which of the eight bottlenecks are real?", "We ranked them from the outside. Which ones cost you the most, and which did we get wrong?"],
    ["What do you wish ran itself?", "Anything. The report you rebuild every week, the text you send five times, the spreadsheet nobody trusts. If you could automate one thing tomorrow, what would it be?"],
  ];
  const DOCS = ["A store list export, from HubSpot or Distru", "A few recent orders, direct and Nabis", "This month's wholesale menu and price tiers", "A recent buyer email or newsletter", "Your promo day calendar, however it's kept", "A list of the reps and their territories"];
  APP.views.questions = () => {
    const body = `Hi Jordan,\n\nHere are documents for The Farm:\n\n${DOCS.map(d => "- " + d).join("\n")}\n\nNotes on how we sell:\n\n\n`;
    const mail = `mailto:${CONTACT}?subject=${encodeURIComponent("Eaton Botanicals: documents for The Farm")}&body=${encodeURIComponent(body)}`;
    return head("Your turn", "Tell us how Eaton really sells.", "A short interview and a few documents, and we can build The Farm around how your team actually works.")
      + `<section class="sec" style="padding-top:10px"><div class="wrap"><div class="kick">The interview</div><h2 class="h2 rise">What we'll ask.</h2><div class="qlist rise">${QS.map(q => `<div class="q"><div><b>${esc(q[0])}</b><span>${esc(q[1])}</span></div></div>`).join("")}</div></div></section>
      <section class="sec"><div class="wrap split">
        <div class="rise"><div class="kick">Send us a few things</div><h2 class="h2">Build it from your real numbers.</h2><p class="lede">The fastest way to a Farm that fits is to start from what you already have. Email Jordan whatever's easy:</p><ul class="lst">${DOCS.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
          <a class="btn" href="${mail}" style="margin-top:24px">${svgI("mail")} Email documents to Jordan</a><p class="src">Opens your own email app with the list written out. Attach the files and press send.</p></div>
        <div class="rise card" style="border-color:rgba(47,211,137,.4)"><span style="color:var(--ok)">${svgI("shield", 34)}</span><b style="font-size:24px;display:block;margin-top:10px">Everything you share stays private.</b><p class="mute" style="font-size:17px">Your stores, orders, prices and numbers are confidential. They're used only to figure out how to make your work easier and to build your tools. They're never shared, never sold and never used for anyone else.</p><p class="mute" style="font-size:17px">We're happy to sign a mutual NDA before you send anything.</p></div>
      </div></section>
      <section class="sec"><div class="wrap split"><div class="rise"><div class="kick">Ask the team</div><h2 class="h2">The reps know where the time goes.</h2><p class="lede">A two-minute survey for the reps, the ambassadors and marketing: what they do, what software they touch, and what they wish ran itself. No pitch and no prices in it.</p><a class="btn ghost" href="survey.html" style="margin-top:20px">Open the team survey</a></div>
        <form class="form-x rise card" id="call-form" onsubmit="return false"><b style="font-size:22px">Schedule the interview</b><label>Your name<input name="person" placeholder="Your name"></label><label>Best days and times<input name="when" placeholder="Tuesday or Thursday afternoon"></label><label>Phone<input name="phone" placeholder="Your number"></label><label>Anything we should know<textarea name="note" placeholder="Marni and Jes should both be on it."></textarea></label><button class="btn" type="submit">Send to Jordan</button><small class="mute">Opens your own email app with the note written. You press send.</small></form>
      </div></section>`;
  };
  document.addEventListener("submit", e => {
    if (e.target.id !== "call-form") return; e.preventDefault();
    const f = e.target.elements, b = `Hi Jordan,\n\nLet's set up the Eaton Botanicals interview.\n\nName: ${f.person.value}\nBest times: ${f.when.value}\nPhone: ${f.phone.value}\n\n${f.note.value}`;
    location.href = `mailto:${CONTACT}?subject=${encodeURIComponent("Eaton Botanicals interview")}&body=${encodeURIComponent(b)}`;
  }, true);
})();
