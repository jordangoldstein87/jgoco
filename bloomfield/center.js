/* Town Center: the back office behind every site. Reservations from every business in one
   inbox, one calendar that publishes everywhere, listings, the shop, email and texts, PR,
   bands, menus and the AI that drafts the replies. */
(function () {
  const APP = window.APP, D = APP.D, B = D.brands, esc = APP.esc, bubble = APP.bubble, money = APP.money, fmt = APP.fmt;
  const $ = (s, r) => (r || document).querySelector(s);

  const NAV = [
    ["start", "Start here", "flag"],
    ["", "Every day"],
    ["overview", "Today", "home"], ["inbox", "Reservations", "inbox"], ["calendar", "Calendar", "cal"],
    ["", "Run it"],
    ["stays", "Stays & Airbnb", "bed"], ["venues", "Venues & weddings", "ring"], ["tickets", "Tickets & check-in", "ticket"], ["bands", "Bands at Ernie's", "music"], ["shop", "Shop & inventory", "tag"], ["menus", "Menus", "menu"],
    ["", "Get the word out"],
    ["social", "Graphic editor", "pic"], ["email", "Email & texts", "mail"], ["listings", "Listings & marketplaces", "globe"], ["pr", "Press & PR", "mic"], ["reviews", "Yelp & reviews", "star"], ["partners", "Town partners", "store"],
    ["", "Connect"],
    ["chatgpt", "ChatGPT on your phone", "chat"], ["connections", "Connections", "plug"], ["addons", "Add-ons", "plus"],
  ];
  let sec = "start";

  const SAMPLE_REQ = [
    { type: "venue", brand: "revival", what: "Wedding", when: "2027-05-22", guests: "140", name: "Kate & Ben", contact: "kate.ellis@…", note: "Ceremony at 4, reception after. Need rooms for family.", at: "2026-10-30T08:12:00", status: "new", src: "The Knot" },
    { type: "stay", brand: "stays", what: "Miss Allie's Homestead", when: "2026-11-13", guests: "6", name: "Morgan R.", contact: "Airbnb", total: "$1,060", at: "2026-10-30T07:40:00", status: "confirmed", src: "Airbnb" },
    { type: "tea", brand: "merrifield", what: "Wed, Nov 4", when: "2026-11-04", time: "1:00", guests: "8", name: "Lisa Hardin", contact: "(502) 555-…", note: "Birthday for my mom, 70!", at: "2026-10-29T19:02:00", status: "new", src: "Website" },
    { type: "plan", brand: "merrifield", what: "Bachelorette for 10, 2 days, June 2027", guests: "10", name: "Ashley T.", contact: "ashley@…", total: "$3,900 – $5,265", at: "2026-10-29T16:30:00", status: "new", src: "Weekend planner" },
    { type: "tasting", brand: "nettie", what: "Sat, Nov 14 · 4 PM", when: "2026-11-14", guests: "4", name: "Dan Coyle", contact: "dan@…", at: "2026-10-29T12:10:00", status: "confirmed", src: "Website" },
    { type: "venue", brand: "velvet", what: "Rehearsal dinner", when: "2027-05-21", guests: "40", name: "Kate & Ben", contact: "kate.ellis@…", at: "2026-10-29T09:44:00", status: "held", src: "WeddingWire" },
    { type: "table", brand: "ernies", what: "Table for 12", when: "2026-10-31", time: "7:30", guests: "12", name: "Costume crew", contact: "(859) 555-…", at: "2026-10-28T21:15:00", status: "confirmed", src: "Yelp" },
    { type: "venue", brand: "pinkhouse", what: "Bridal shower", when: "2027-04-10", guests: "24", name: "Jen Mattingly", contact: "jen@…", at: "2026-10-28T14:00:00", status: "new", src: "Peerspace" },
  ];
  function reqs() { return [...APP.requests, ...SAMPLE_REQ]; }

  const ICON = {
    home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z", inbox: "M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5", cal: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
    bed: "M3 18V8M3 14h18v4M21 18v-6a3 3 0 0 0-3-3h-7v5", ring: "M12 9a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM9 3h6l-3 6z", music: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
    tag: "M3 12V4h8l10 10-8 8zM7.5 7.5h.01", menu: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5", mail: "M3 6h18v12H3zM3 7l9 6 9-6", globe: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
    mic: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3", star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z", store: "M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6",
    chat: "M4 5h16v11H8l-4 4z", pic: "M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M9 9h.01", flag: "M5 21V4h11l-1.5 4L16 12H5", chart: "M4 20V10M10 20V4M16 20v-7M22 20H2", ticket: "M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3zM14 4v16", plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4", plus: "M12 5v14M5 12h14",
  };
  const icon = k => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${ICON[k] || ICON.plus}"/></svg>`;

  function render(v, r) {
    if (r.id) sec = r.id;
    v.innerHTML = `<div class="hub"><div class="hub-shell">
      <nav class="hub-nav" aria-label="Town Center">
        <div class="logo">TOWN CENTER<span>Bloomfield</span></div>
        ${NAV.map(n => n[0] === "" ? `<div class="grp">${n[1]}</div>` : `<button data-sec="${n[0]}" class="${sec === n[0] ? "on" : ""}">${icon(n[2])}${n[1]}${n[0] === "inbox" ? `<span class="dot" style="background:#e3a194"></span>` : ""}</button>`).join("")}
      </nav>
      <div class="hub-main" id="hubmain"></div>
    </div></div>`;
    v.querySelectorAll("[data-sec]").forEach(b => b.onclick = () => { sec = b.dataset.sec; v.querySelectorAll("[data-sec]").forEach(x => x.classList.toggle("on", x === b)); draw(); window.scrollTo(0, 0); });
    draw();
  }
  function draw() { const m = $("#hubmain"); if (!m) return; m.innerHTML = (SEC[sec] || SEC.overview)(); (AFTER[sec] || (() => {}))(m); intro(sec); }

  const live = () => APP.db ? `<span class="pill ok">Live</span>` : `<span class="pill">Preview</span>`;
  const statusPill = s => ({ new: `<span class="pill warn">New</span>`, confirmed: `<span class="pill ok">Confirmed</span>`, held: `<span class="pill">Date held</span>`, replied: `<span class="pill ok">Replied</span>` }[s] || `<span class="pill">${esc(s)}</span>`);
  const rel = iso => { const m = Math.round((new Date(APP.D.today + "T10:00:00") - new Date(iso)) / 6e4); return m < 5 || m < 0 ? "Just now" : m < 60 ? m + " min ago" : m < 1440 ? Math.round(m / 60) + " hr ago" : Math.round(m / 1440) + "d ago"; };

  const SEC = {
    overview() {
      const R = reqs(), nNew = R.filter(r => r.status === "new").length;
      const up = APP.allEvents().filter(e => e.d >= D.today).slice(0, 5);
      return `
      <div class="hub-hero"><span class="eyebrow">Friday, October 30</span><h1>Good morning.</h1><p class="sub">Here's what needs you across Taylorsville Road today.</p></div>
      <div class="hgrid">
        <div class="pane span3 kpi"><b>${nNew}</b><span>New requests to answer</span></div>
        <div class="pane span3 kpi"><b>${R.filter(r => r.status === "confirmed").length}</b><span>Confirmed this week</span></div>
        <div class="pane span3 kpi"><b>2,418</b><span>On the town email list</span></div>
        <div class="pane span3 kpi"><b>86%</b><span>Stay nights booked in Nov</span></div>
        <div class="pane span7"><h3>Needs you</h3>${R.filter(r => r.status === "new").slice(0, 4).map(rowReq).join("")}<button class="hbtn" data-go="inbox">Open reservations</button></div>
        <div class="pane span5"><h3>Coming up in town</h3>${up.map(e => `<div class="hrow">${bubble(e.b, 26)}<div><b>${esc(e.t)}</b><div class="s">${fmt(e.d)} · ${esc(e.time || "")}</div></div><span class="pill ok">Published</span></div>`).join("")}<button class="hbtn" data-go="calendar">Add an event</button></div>
        <div class="pane span12 nudge">${bubble("town", 36)}<div><b>Press idea: Christmas on Taylorsville Road</b><div class="s">Five weeks out is the sweet spot for holiday coverage. Schedule a blast to 72 editors and writers?</div></div><button class="hbtn go" data-go="pr">Schedule it</button></div>
        <div class="pane span12"><div class="row" style="justify-content:space-between"><h3>New reviews</h3><button class="hbtn" data-go="reviews">All reviews</button></div>
          <div class="revgrid">${TODAY_REVIEWS.map((r, i) => `<div class="revcard">
            <div class="rv-top"><span class="src" style="background:${r.c}">${r.src}</span><span class="stars">${"★".repeat(r.n)}<i>${"★".repeat(5 - r.n)}</i></span><span class="s">${r.when}</span></div>
            <p class="quote">“${esc(r.t)}”</p>
            <div class="cardline">${bubble(r.b, 24)}<span class="s">${esc(r.who)} · ${esc(B[r.b].name)}</span></div>
            <div class="rv-reply" id="rv-${i}" hidden><textarea class="hinput ai-box" rows="4">${esc(r.reply)}</textarea><div class="row"><button class="hbtn go" data-post="${i}">Post reply</button><button class="hbtn" data-cancel="${i}">Cancel</button></div></div>
            <button class="hbtn ai" data-reply="${i}">Respond</button></div>`).join("")}</div></div>

      </div>`;
    },

    start() {
      const IN = [["Their websites", "squareup.com"], ["Airbnb & Vrbo", "airbnb.com"], ["The Knot & wedding sites", "theknot.com"], ["Yelp & Google", "yelp.com"], ["Instagram & Facebook", "instagram.com"], ["eBay & Etsy", "ebay.com"]];
      const OUT = [["Email the list", "mail"], ["Text the list", "chat"], ["Papers & press", "mic"], ["ChatGPT on your phone", "chat"], ["Square & Stripe", "tag"], ["QuickBooks", "chart"]];
      return `<div class="tc-deck">
        <section class="tcd tcd-title">${APP.logo("simple", "#f4efe6", "#d2ae63")}<h1>A small town needs a big office.</h1><p>A modern back office for every business on Taylorsville Road.</p></section>
        <section class="tcd"><span class="tcd-k">More than a website</span><h2>What visitors see is just the beginning.</h2>
          <p class="tcd-p">The more you want to build, the more we build into Town Center. Town Center is the hub.</p>
          <div class="tcd-two"><div class="tcd-card"><b>What visitors see</b><p>The town site, eight business sites, the calendar, the stays, the shop and the weekend planner.</p><div class="row">${["town", "nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival"].map(k => bubble(k, 30)).join("")}</div></div>
          <div class="tcd-card dark"><b>The hub behind it</b><p>One back office for reservations, events, listings, menus, the shop, email, texts, press and reviews.</p><div class="row"><span class="pill ok">Town Center</span></div></div></div></section>
        <section class="tcd"><span class="tcd-k">How it all connects</span><h2>Everything comes in to one place, and goes out from it.</h2>
          <div class="flowmap"><div class="fm-col">${IN.map(x => `<div class="fm-i"><img src="img/logos/${x[1]}.png" alt=""><span>${x[0]}</span></div>`).join("")}</div>
            <div class="fm-mid"><svg viewBox="0 0 60 300" preserveAspectRatio="none" aria-hidden="true">${[25, 75, 125, 175, 225, 275].map(y => `<path d="M0 ${y} C 40 ${y}, 30 150, 60 150" fill="none" stroke="#c9a24a" stroke-width="1.5"/>`).join("")}</svg></div>
            <div class="fm-hub">${APP.logo("simple", "#f4efe6", "#d2ae63")}<b>Town Center</b><span>One inbox · one calendar · one inventory</span></div>
            <div class="fm-mid"><svg viewBox="0 0 60 300" preserveAspectRatio="none" aria-hidden="true">${[25, 75, 125, 175, 225, 275].map(y => `<path d="M0 150 C 30 150, 20 ${y}, 60 ${y}" fill="none" stroke="#c9a24a" stroke-width="1.5"/>`).join("")}</svg></div>
            <div class="fm-col">${OUT.map(x => `<div class="fm-i out">${icon(x[1])}<span>${x[0]}</span></div>`).join("")}</div></div></section>
        <section class="tcd"><span class="tcd-k">What we can build for you</span><h2>The busywork, handled. The more you want, the more we build.</h2>
          <p class="tcd-p">Everything in this preview is something we can build and connect for your businesses. Start with what helps most, and we keep adding from there.</p>
          <div class="tcd-grid">${[["Every booking in one inbox", "Tea, tables, tastings, stays, weddings and tickets."], ["Add an event once", "It shows on every site, Google, Facebook and the papers."], ["Listings stay current", "Wedding sites, travel sites and marketplaces, without the logins."], ["Emails and texts in two clicks", "Designed in each business's own look."], ["Press that pitches itself", "It spots the story and schedules the blast."], ["Run it from your phone", "Ask ChatGPT to add a photo, a price or an event."]].map(x => `<div><b>${x[0]}</b><p>${x[1]}</p></div>`).join("")}</div></section>
        <section class="tcd"><span class="tcd-k">Plugs into what you already use</span><h2>Keep your systems. Town Center reads them.</h2>
          <div class="tcd-grid">${[["Restaurant costs", "Cost of goods, food and bar, from the kitchen's ordering and the registers."], ["Staffing costs", "Hours and payroll from the scheduling or payroll system you use now."], ["Monthly expenses", "Rent, utilities and suppliers from QuickBooks, by business."], ["The master database", "Every Nettie Jarvis item with what it cost, what it's listed at, where it sits and where it sold."], ["Point of sale", "Square, Toast or Clover at every register, in one view."], ["Stays", "OwnerRez bookings, cleaning and payouts for all four homes."]].map(x => `<div><b>${x[0]}</b><p>${x[1]}</p></div>`).join("")}</div></section>
        <section class="tcd"><span class="tcd-k big">Executive overview</span><h2>Owners and managers each get what matters to them.</h2><p class="tcd-p">Owners see how every store did and what's happening in town. Managers get the day's run sheet, store by store. Every morning, before anyone asks.</p>
          <div class="exec two">
            <div class="exec-col"><span class="exec-who">For the owners</span><div class="exec-mail"><div class="em-top">${APP.logo("simple", "#f4efe6", "#d2ae63")}<span>Saturday, October 31 · 7:00 AM</span></div>
              <div class="em-body"><b>Good morning. Here's yesterday on Taylorsville Road.</b>
                <h6>Yesterday's sales</h6>
                <div class="em-sales">${[["ernies", 3420, 14], ["rowdys", 2150, 22], ["nettie", 1840, 6], ["merrifield", 980, 9], ["doubledip", 760, -4], ["velvet", 1450, 0], ["pinkhouse", 500, 0], ["stays", 690, 0], ["revival", 0, 0]].map(x => `<div>${bubble(x[0], 28)}<span>${esc(B[x[0]].name)}</span><b>${x[0] === "revival" ? "Opens 2027" : money(x[1])}</b><small class="${x[2] < 0 ? "dn" : "up"}">${x[2] ? (x[2] > 0 ? "▲ " : "▼ ") + Math.abs(x[2]) + "%" : x[0] === "velvet" || x[0] === "pinkhouse" ? "private event" : ""}</small></div>`).join("")}<div class="tot"><span>All of Taylorsville Road</span><b>$11,790</b><small class="up">▲ 12% on last Friday</small></div></div>
                <h6>Today in town</h6>
                ${[["rowdys", "1 PM", "Trick or Treat on Rowdy's porch"], ["rowdys", "3 PM", "Tarot on the porch"], ["ernies", "8 PM", "Costume Contest + Big Black Cadillac · 142 tickets"], ["stays", "Tonight", "3 of 4 homes full"]].map(x => `<div class="em-ev">${bubble(x[0], 28)}<span class="t">${x[1]}</span><span>${esc(x[2])}</span></div>`).join("")}
                <h6>A review worth sharing</h6>
                <div class="em-happy"><span class="stars">★★★★★</span><p>“The town of Bloomfield is like stepping back in time. We like to walk and you could easily walk into the downtown.”</p><span class="s">Janine, Los Angeles · The Cosmopolitan on Airbnb</span></div>
              </div></div></div>
            <div class="exec-col"><span class="exec-who">For the managers</span><div class="exec-mail"><div class="em-top op">${APP.logo("simple", "#f4efe6", "#d2ae63")}<span>Saturday, October 31 · 6:30 AM</span></div>
              <div class="em-body"><b>Today's run sheet.</b>
                ${OPS.map(o => `<div class="em-store">${bubble(o.b, 34)}<div><b>${esc(B[o.b].name)}</b>${o.items.map(it => `<div class="em-op ${it[0]}"><i></i><span>${esc(it[1])}</span>${it[2] ? `<a>${it[2]}</a>` : ""}</div>`).join("")}</div></div>`).join("")}
              </div></div></div>
          </div>
          <p class="tcd-p">Anyone can ask for something added to theirs.</p></section>
        <section class="tcd"><span class="tcd-k">One place to talk</span><h2>Same email address. Nothing new to learn.</h2>
          <p class="tcd-p">Everyone keeps the email they have now, Gmail or Outlook, and can keep using it the same way. No one has to use the portal. Town Center just connects to it, so anyone who does use the portal gets organized contact lists and can write from there.</p>
          <div class="mail-how"><div class="mh-steps">${[["Connect the address you already have", "Gmail, Outlook or the company email. It stays the same address."], ["Find anyone in seconds", "Lists for the team, vendors, bands, press, guests and wedding couples."], ["Write from Town Center", "It sends from your own address. To them it looks like any email from you."], ["Replies land in both places", "Your normal inbox and Town Center. If a reply has a to-do in it, it goes on that person's task list."]].map((x, i) => `<div class="mh"><span class="lm-step">${i + 1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join("")}</div>
            <div class="mh-side"><div class="mh-lists"><b>Contact lists</b>${[["Team", 14], ["Vendors & deliveries", 22], ["Bands", 31], ["Press", 161], ["Wedding couples", 9], ["Stay guests", 412]].map(l => `<div><span>${l[0]}</span><small>${l[1]}</small></div>`).join("")}</div>
              <div class="mh-tasks"><b>Jamie's tasks</b>${[["Open the side door for the chair delivery", "Tue, Nov 10 · 9 AM · from a reply to the Revival Hall thread", true], ["Check the kayak at Boone's Cabin", "Before Fri, Nov 13 · from the guest question", true], ["Drop off keys for The Clayborn House", "Sat, Nov 14 · added by hand", false]].map(t => `<label><input type="checkbox"><div><span>${esc(t[0])}</span><small>${esc(t[1])}${t[2] ? ` <em>from email</em>` : ""}</small></div></label>`).join("")}</div></div>
          </div>
          <h3 class="tcd-sub">How a message finds the right person</h3>
          <div class="flows">${TEAM_FLOWS.map((f, i) => `<div class="flowcard"><div class="flow-steps">${f.steps.map((st, j) => `<div class="fstep2">${st[0] ? bubble(st[0], 32) : `<span class="fs-ic">${icon(st[1])}</span>`}<div><span class="fs-k">${esc(st[2])}</span><b>${esc(st[3])}</b><p>${esc(st[4])}</p></div></div>${j < f.steps.length - 1 ? `<span class="fs-arrow">→</span>` : ""}`).join("")}</div>
            <div class="compose"><div class="cp-tabs"><button type="button" class="on" data-cp="${i}" data-mode="text">${esc(f.textLabel)}</button><button type="button" data-cp="${i}" data-mode="email">Email</button></div>
              <textarea class="cp-box" id="cp-${i}" rows="3">${esc(f.text)}</textarea><div class="row"><button type="button" class="btn small solid" data-send="${i}">Send</button><span class="cp-to" id="cpto-${i}">To ${esc(f.to)}</span></div></div></div>`).join("")}</div></section>
        <section class="tcd tcd-grow"><span class="tcd-k">Built to grow</span><h2>Plug in any data you have. We'll analyze it and suggest how to make it better.</h2><p class="tcd-p">Sales, costs, staffing, bookings, reviews, inventory. Town Center puts it side by side and tells you what to change. Any idea to get more organized, we can build it.</p></section>
        <section class="tcd"><span class="tcd-k">Marketing</span><h2>Bring people back, and bring their friends.</h2>
          <div class="feat">${[["Gift cards", "One card that works at every shop in town. Redeemed with a QR code at any register.", "tag", true], ["Town loyalty card", "A stamp at every business. The tenth visit is on the town.", "star", false], ["Bring a friend", "A thank-you credit when a guest's friend books a stay or a party.", "chat", false], ["The Thursday text", "One text every Thursday: what's on this weekend. Written for you, sent when you say.", "mail", false], ["Share your weekend", "Guests tag #StayInBloomfield. The best photos get reposted, and one wins dinner each month.", "pic", false], ["Birthday club", "Leave your birthday at checkout. A free sundae or tea for two that month brings them back.", "star", false]].map(x => `<div class="fcard ${x[3] ? "big" : ""}">${icon(x[2])}<b>${x[0]}</b><p>${x[1]}</p>${x[0] === "Gift cards" ? `<div class="gc"><div class="gc-card">${APP.logo("simple", "#f4efe6", "#d2ae63")}<span>$50 · Good everywhere in town</span></div>${qr("BLOOMFIELD-GIFT-0091", 70)}</div>` : x[0] === "Town loyalty card" ? `<div class="lc"><div class="lc-top"><span>Town loyalty card</span><b>7 of 10</b></div><div class="lc-stamps">${["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "", "", ""].map(k => k ? `<span class="on">${APP.markIcon(k, 34)}</span>` : `<span></span>`).join("")}</div><div class="lc-foot">Three more and dinner's on the town.</div></div>` : x[0] === "Bring a friend" ? `<div class="rf"><div class="rf-msg"><span class="rf-who">Megan shared Bloomfield with you</span><b>$25 off your first stay</b><span class="rf-code">MEGAN25</span></div><div class="rf-thanks">${APP.bubble("town", 30)}<span><b>Thank you, Megan.</b> A $25 credit is on your next visit.</span></div></div>` : x[0] === "The Thursday text" ? `<div class="tt"><div class="tt-phone"><span class="tt-from">Stay in Bloomfield</span><div class="tt-msg">This weekend on Taylorsville Road: Saturday, the costume contest and Big Black Cadillac at Ernie's. Pumpkin shakes at the Double Dip and a tasting at Nettie Jarvis. Rooms still open at the Pink House.</div><span class="tt-time">Thu 10:00 AM · 1,284 people</span></div></div>` : x[0] === "Share your weekend" ? `<div class="sw"><div class="sw-grid">${["img/doubledip/01-banana-split.jpg?v=1793944505", "img/merryfield/02-tea-service.jpg?v=1793944505", "img/ernies/05-neon-bar.jpg?v=1793944505"].map(src => `<img src="${src}" alt="" loading="lazy">`).join("")}</div><span class="sw-tag">#StayInBloomfield</span></div>` : x[0] === "Birthday club" ? `<div class="bc"><span class="bc-k">Happy birthday, Jamie</span><b>A sundae on us</b><span>Any day in November at the Double Dip</span><div class="bc-sw">${APP.markIcon("doubledip", 30)}${APP.markIcon("merrifield", 30)}${APP.markIcon("ernies", 30)}</div></div>` : ""}</div>`).join("")}</div></section>
        <section class="tcd"><span class="tcd-k">Production & operations</span><h2>Every event night and every building, organized.</h2>
          <div class="feat">${[["Event production sheets", "Band riders, menus, setup times and staff for each event night.", "music", true], ["Staff scheduling", "Shifts for every business, swaps by text, tied to the event calendar.", "cal", true], ["Cleaning turnovers", "Cleaners get the schedule after each checkout, with photos when they finish.", "bed", false], ["Maintenance requests", "Anyone can report a problem in any building. It goes to the right person.", "home", false], ["Deliveries & vendors", "Every delivery on one calendar, with the right person texted.", "store", false], ["Contracts & deposits", "Wedding and private-event contracts signed and paid online.", "ring", false]].map(x => `<div class="fcard ${x[3] ? "big" : ""}">${icon(x[2])}<b>${x[0]}</b><p>${x[1]}</p>${x[0] === "Gift cards" ? `<div class="gc"><div class="gc-card">${APP.logo("simple", "#f4efe6", "#d2ae63")}<span>$50 · Good everywhere in town</span></div>${qr("BLOOMFIELD-GIFT-0091", 70)}</div>` : ""}</div>`).join("")}</div></section>
        <section class="tcd"><span class="tcd-k">Money</span><h2>Know where it goes.</h2>
          <div class="feat">${[["Expense tracker", "Staff snap a receipt and pick the business. Approved from your phone, sorted for QuickBooks.", "chart", true], ["Costs and margins", "Food, bar and goods costs against sales, for each business and each event night.", "tag", false], ["Monthly snapshot", "Every business on one page: sales, costs, staff and what changed.", "home", false]].map(x => `<div class="fcard ${x[3] ? "big" : ""}">${icon(x[2])}<b>${x[0]}</b><p>${x[1]}</p>${x[0] === "Gift cards" ? `<div class="gc"><div class="gc-card">${APP.logo("simple", "#f4efe6", "#d2ae63")}<span>$50 · Good everywhere in town</span></div>${qr("BLOOMFIELD-GIFT-0091", 70)}</div>` : ""}</div>`).join("")}</div></section>
        <section class="tcd tcd-close"><h2>A small town with a small team needs modern tools.</h2><p>Less time on logins and retyping. More time on Taylorsville Road. Thank you for considering it.</p><button class="btn solid" data-go="overview">Open Today</button></section>
      </div>`;
    },

    inbox() {
      const R = reqs();
      return `<div class="hub-hero"><h1>Reservations</h1><p class="sub">Every booking and inquiry from every business, website and listing site. One person or the whole team can work it.</p></div>
      <div class="filters">${["All", "New", "Weddings & venues", "Stays", "Tea & tastings", "Ernie's"].map((f, i) => `<button class="chip dark ${i === 0 ? "on" : ""}">${f}</button>`).join("")}</div>
      <div class="hgrid">
        <div class="pane span5 list">${R.map((r, i) => `<button class="reqrow ${i === 0 ? "on" : ""}" data-req="${i}">${bubble(r.brand, 34)}<div><b>${esc(r.name)}</b><span>${esc(r.what)}</span><small>${esc(r.src || "Website")} · ${rel(r.at)}</small></div>${statusPill(r.status)}</button>`).join("")}</div>
        <div class="pane span7" id="reqd"></div>
      </div>`;
    },

    calendar() {
      return `<div class="hub-hero"><h1>One calendar for the whole town</h1><p class="sub">Add it once. It shows on every site, the town calendar, Google, Facebook and the papers' event pages.</p></div>
      <div class="hgrid">
        <div class="pane span8"><div id="hcal"></div></div>
        <div class="pane span4"><h3>Add an event</h3>
          <form id="evform" class="formg">
            <label>What<input id="ev-t" class="hinput" required placeholder="Fall Bourbon Flight"></label>
            <label>Business<select id="ev-b">${Object.keys(B).map(k => `<option value="${k}">${esc(B[k].name)}</option>`).join("")}</select></label>
            <div class="g2"><label>Date<input id="ev-d" class="hinput" type="date" value="2026-11-21" required></label><label>Time<input id="ev-time" class="hinput" value="7 PM"></label></div>
            <label>Publish to</label>
            <div class="checks">${["Town calendar", "Its own website", "Google", "Facebook event", "Instagram post", "Eventbrite", "Local papers & sites", "Influencer list", "Email the list", "Text the list"].map((c, i) => `<label class="ck"><input type="checkbox" ${i < 7 ? "checked" : ""}> ${c}</label>`).join("")}</div>
            <button class="hbtn go">Publish everywhere</button>
          </form>
          <div class="nudge small" id="evnudge" hidden>${icon("mic")}<div><b></b><div class="s">Town Center can pitch it to local papers, TV and creators.</div></div><button class="hbtn go" type="button" data-go="pr">Plan a press blast</button></div>
        </div>
      </div>`;
    },

    stays() {
      const S = window.STAYS;
      return `<div class="hub-hero"><h1>Stays & Airbnb</h1><p class="sub">Edit a listing here and it updates on Airbnb, Vrbo, Google and the town site. Bookings from every channel land in one calendar.</p></div>
      <div class="hgrid">
        ${S.map(s => `<div class="pane span6 stayp"><img src="${s.photos[0]}" alt=""><div><h2>${esc(s.title)}</h2><div class="chans">${["Airbnb", "Vrbo", "Booking", "Google", "Direct"].map((c, i) => `<span class="${i === 2 && s.id === "cosmopolitan" ? "off" : ""}">${c}</span>`).join("")}</div>
          <div class="g3 kp"><div><b>${money(s.night)}</b><span>Base rate</span></div><div><b>${[82, 91, 74, 68][S.indexOf(s)]}%</b><span>Booked, 60 days</span></div><div><b>★ ${s.rating}</b><span>${s.reviews} reviews</span></div></div>
          <div class="row"><button class="hbtn" data-edit-stay="${s.id}">Edit listing</button><button class="hbtn">Block dates</button><button class="hbtn ai">Smart pricing</button></div></div></div>`).join("")}
        <div class="pane span12"><h3>Guest messages, answered for you</h3>
          <div class="hrow">${bubble("stays", 28)}<div><b>Check-in instructions</b><div class="s">Sent automatically two days before arrival, with the door code and a list of what's on in town that weekend.</div></div><span class="pill ok">On</span></div>
          <div class="hrow">${bubble("ernies", 28)}<div><b>"Want a table at Ernie's Friday?"</b><div class="s">Every guest gets one tap to book supper, tea or a tasting during their stay.</div></div><span class="pill ok">On</span></div>
          <div class="hrow">${bubble("town", 28)}<div><b>Review request</b><div class="s">The morning after checkout.</div></div><span class="pill ok">On</span></div>
        </div>
      </div>`;
    },

    venues() {
      const V = ["revival", "velvet", "pinkhouse", "merrifield"];
      return `<div class="hub-hero"><h1>Venues & weddings</h1><p class="sub">Every space, every hold, every contract and deposit. Listed on the wedding sites from here, answered from here.</p></div>
      <div class="hgrid">
        ${V.map(k => `<div class="pane span3 venuep"><img src="${D.biz[k].hero}" alt=""><div class="cardline">${bubble(k, 30)}<b>${esc(B[k].name)}</b></div><div class="s">${k === "revival" ? "Opening 2027 · taking holds" : "Taking bookings"}</div></div>`).join("")}
        <div class="pane span12"><h3>Wedding pipeline</h3>
          <div class="pipe">${[["Inquiry", ["Jen M. · shower · Apr 10", "Ashley T. · bachelorette · Jun"]], ["Tour booked", ["Rachel & Sam · Sep 2027"]], ["Date held", ["Kate & Ben · May 22, 2027"]], ["Contract & deposit", ["Hayes family reunion · Jul 4"]], ["Booked", ["Holiday party · Stock Yards · Dec 11"]]].map(c => `<div class="col"><h4>${c[0]}</h4>${c[1].map(x => `<div class="pcard">${esc(x)}</div>`).join("")}</div>`).join("")}</div>
        </div>
        <div class="pane span12"><h3>One wedding, every business</h3><p class="sub">When Kate & Ben hold Revival Hall, Town Center offers the rehearsal dinner at The Velvet Room, the bridal tea at The Old Pink House, all four stays for family and a late sundae bar at the Double Dip. One proposal, one deposit.</p>
          <div class="row">${["revival", "velvet", "pinkhouse", "stays", "doubledip"].map(k => bubble(k, 40)).join("")}<button class="hbtn go">Send the proposal</button></div></div>
      </div>`;
    },

    tickets() {
      const T = [["Saturday Dance Night", "rowdys", "Sat, Nov 7", 15, 35, 142, 200], ["Hannah Wheeler & The Heartaches", "rowdys", "Sat, Nov 14", 20, 45, 188, 200], ["Fall Bourbon Flight", "nettie", "Sat, Nov 14", 45, 0, 22, 24], ["Christmas Tea", "merrifield", "Sat, Dec 12", 48, 0, 31, 40], ["Ugly Sweater Bowling", "ernies", "Sat, Dec 19", 12, 0, 46, 80]];
      return `<div class="hub-hero"><h1>Tickets & check-in</h1><p class="sub">Sell tickets to any event. Money goes straight to your own Square or Stripe account. Every ticket gets a QR code, and the door staff check people in from a phone.</p></div>
      <div class="hgrid">
        <div class="pane span3 kpi"><b>429</b><span>Tickets sold this month</span></div>
        <div class="pane span3 kpi"><b>$8,915</b><span>Paid to your accounts</span></div>
        <div class="pane span3 kpi"><b>142 / 200</b><span>Dance Night, Saturday</span></div>
        <div class="pane span3 conn" style="grid-template-columns:36px 1fr"><span class="ic" style="background:#1f1f1f;color:#fff">Sq</span><div><div class="n">Paid through Square</div><div class="d">Your merchant account. Payouts next day.</div></div></div>
        <div class="pane span8"><div class="row" style="justify-content:space-between"><h3>On sale</h3><button class="hbtn go" id="newtix">Sell tickets for an event</button></div>
          <div class="tscroll"><table class="table"><thead><tr><th>Event</th><th>Date</th><th>Prices</th><th>Sold</th><th></th></tr></thead><tbody>
          ${T.map(t => `<tr><td><div class="cardline">${bubble(t[1], 26)}<b>${esc(t[0])}</b></div></td><td>${t[2]}</td><td>$${t[3]}${t[4] ? ` · VIP $${t[4]}` : ""}</td><td><div class="sold"><i style="width:${Math.round(t[5] / t[6] * 100)}%;background:${B[t[1]].c}"></i></div><span class="s">${t[5]} of ${t[6]}${t[5] / t[6] > .9 ? " · almost gone" : ""}</span></td><td><button class="hbtn" data-guests="${esc(t[0])}">Guest list</button></td></tr>`).join("")}
          </tbody></table></div>
          <div id="newtixform" hidden class="formg tixform">
            <h3>Sell tickets</h3>
            <label>Event<select id="tx-ev">${APP.allEvents().filter(x => x.d >= D.today).map(x => `<option>${esc(x.t)} · ${fmt(x.d)}</option>`).join("")}</select></label>
            <div class="g3"><label>General<input class="hinput" value="$15"></label><label>VIP<input class="hinput" value="$35"></label><label>How many<input class="hinput" value="200"></label></div>
            <div class="checks"><label class="ck"><input type="checkbox" checked> Show on the town calendar</label><label class="ck"><input type="checkbox" checked> Text and email the QR code</label><label class="ck"><input type="checkbox" checked> Add buyers to the email list</label><label class="ck"><input type="checkbox"> Hold 10 for the band</label></div>
            <div class="row"><button class="hbtn go" id="tx-go">Put on sale</button><span class="s">Payments go to Square. No ticketing site fees.</span></div>
          </div>
        </div>
        <div class="pane span4"><h3>The ticket they get</h3>${ticketCard()}</div>
        <div class="pane span5"><h3>At the door</h3><div class="phone door"><div class="ph-top">Door · Rowdy's · Dance Night</div>
          <div class="scan"><div class="viewfinder">${qr("ROWDYS-DN-1107-0142", 120)}<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span></div>
            <div class="admit" id="admit"><b>Admitted</b><span>Jen Mattingly · General × 2</span></div></div>
          <div class="door-stats"><div><b id="inct">97</b><span>Checked in</span></div><div><b>45</b><span>Still coming</span></div></div>
          <button class="scanbtn" id="scanbtn">Scan next ticket</button></div></div>
        <div class="pane span12"><h3>Texts to every guest, sent for you</h3>
          <div class="tx-row">
            <div class="tx-list">${[["Right after they buy", "Your tickets for Dance Night at Rowdy's. Show this QR code at the door: rowdys.co/t/0142", "On"], ["The day before", "See you tomorrow! Doors at 7, line-dance lesson at 7:30, band at 8. Free parking behind the saloon.", "On"], ["When doors open", "Doors are open at Rowdy's. Tonight: Hannah Wheeler & The Heartaches.", "On"], ["If anything changes", "One tap texts every ticket holder. Rain, a new start time, a sold-out show.", "Ready"], ["The morning after", "Thanks for coming out! Next up: Ugly Sweater Bowling at Ernie's, Dec 19. Tickets: stayinbloomfield.com", "On"]].map(t => `<div class="hrow">${icon("chat")}<div><b>${t[0]}</b><div class="s">${esc(t[1])}</div></div><span class="pill ${t[2] === "On" ? "ok" : "warn"}">${t[2]}</span></div>`).join("")}
              <div class="row" style="margin-top:8px"><input class="hinput" id="blast" value="Heads up: tonight's show starts at 8:30 instead of 8. See you there!" style="flex:1;min-width:0"><button class="hbtn go" id="blastgo">Text all 142 guests</button></div></div>
            <div class="phone sm tx-phone"><div class="ph-top">Messages · Rowdy's</div><div class="sms tx-thread">
              <div class="b">Your tickets for Dance Night at Rowdy's, Sat Nov 7. Show this at the door:</div>
              <div class="b qrb">${qr("ROWDYS-DN-1107-0142", 92)}</div>
              <div class="b">See you tomorrow! Doors at 7, line-dance lesson at 7:30, band at 8.</div>
              <div class="b me">Can we bring two more?</div>
              <div class="b">Yes! Two more general tickets are $30. Tap to add: rowdys.co/t/0142</div></div></div>
          </div></div>
        <div class="pane span7"><div class="row" style="justify-content:space-between"><h3 id="glh">Guest list · Saturday Dance Night</h3><input class="hinput" id="gsearch" placeholder="Search a name" style="max-width:220px"></div>
          <div id="glist"></div></div>
      </div>`;
    },

    bands() {
      const shows = [["Fri, Nov 6", "Live at Ernie's", "The Bourbon Barrel Boys", "Confirmed", "$400 + tab"], ["Fri, Nov 13", "Live at Ernie's", "Open", "Open", ""], ["Sat, Nov 14", "Rowdy's", "Hannah Wheeler & The Heartaches", "Confirmed", "$650"], ["Fri, Nov 20", "Live at Ernie's", "Kentucky Ramblers", "Offer sent", "$350"], ["Sat, Nov 21", "Rowdy's", "Open", "Open", ""]];
      return `<div class="hub-hero"><h1>Bands at Ernie's & Rowdy's</h1><p class="sub">Bands apply, you pick the night, they confirm. The show posts to the calendar, the papers and the list without anyone retyping it.</p></div>
      <div class="hgrid">
        <div class="pane span8"><h3>The lineup</h3><div class="tscroll"><table class="table"><thead><tr><th>Night</th><th>Stage</th><th>Band</th><th>Status</th><th>Pay</th></tr></thead><tbody>
          ${shows.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td><td>${s[2] === "Open" ? `<button class="hbtn">Fill this night</button>` : esc(s[2])}</td><td>${s[3] === "Confirmed" ? `<span class="pill ok">Confirmed</span>` : s[3] === "Open" ? `<span class="pill off">Open</span>` : `<span class="pill warn">${s[3]}</span>`}</td><td>${s[4]}</td></tr>`).join("")}
        </tbody></table></div></div>
        <div class="pane span4"><h3>New applications</h3>
          ${[["Copper Creek String Band", "Bluegrass · Bardstown", "18 shows this year"], ["The Neon Saints", "Honky-tonk · Louisville", "Played Rowdy's in Aug"], ["Lily May & The Mash", "Americana · Lexington", "4.9 from venues"]].map(b => `<div class="hrow">${bubble("ernies", 28)}<div><b>${b[0]}</b><div class="s">${b[1]} · ${b[2]}</div></div><button class="hbtn">Book</button></div>`).join("")}
          <div class="s" style="margin-top:8px">Private DJ and band requests from bachelorette and party bookings show up here too.</div>
        </div>
        <div class="pane span12"><div class="row" style="justify-content:space-between"><h3>Which bands pay off</h3><span class="row"><span class="pill ok">Square connected</span><span class="s">Sales from the registers at Ernie's and Rowdy's</span></span></div>
          <div class="tscroll"><table class="table roi"><thead><tr><th>Band</th><th>Shows</th><th>Avg crowd</th><th>Bar</th><th>Food</th><th>Paid</th><th>Over a normal night</th><th>Return</th></tr></thead><tbody>
          ${BANDS.map(b => { const lift = b.bar + b.food - BASE; const roi = lift / b.pay; return `<tr><td><div class="cardline">${bubble(b.stage, 24)}<b>${esc(b.n)}</b></div></td><td>${b.shows}</td><td>${b.crowd}</td><td>${money(b.bar)}</td><td>${money(b.food)}</td><td>${money(b.pay)}</td><td>${lift < 0 ? "−" + money(-lift) : "+" + money(lift)}</td><td><span class="pill ${roi >= 4 ? "ok" : roi >= 2 ? "" : "warn"}">${roi.toFixed(1)}×</span></td></tr>`; }).join("")}
          </tbody></table></div>
          <div class="s">Per show, averaged. A normal Friday or Saturday without a band does ${money(BASE)}.</div></div>
        <div class="pane span7 bandcard"><div class="row" style="justify-content:space-between"><div><h3>Band profile</h3><h2>Hannah Wheeler & The Heartaches</h2><div class="s">Country · Bardstown · 5 shows since June</div></div><span class="pill ok">Rebook</span></div>
          <div class="bars">${[[2650, 880, "Jun 14"], [3110, 940, "Jul 19"], [2890, 1020, "Aug 23"], [3420, 1150, "Sep 27"], [3680, 1210, "Oct 24"]].map(x => `<div class="bar"><div class="stack"><i class="b-bar" style="height:${x[0] / 50}px" title="Bar ${money(x[0])}"></i><i class="b-food" style="height:${x[1] / 50}px" title="Food ${money(x[1])}"></i></div><span>${x[2]}</span></div>`).join("")}</div>
          <div class="legend"><span><i class="b-bar"></i>Bar</span><span><i class="b-food"></i>Food</span></div>
          <div class="g3 kp"><div><b>176</b><span>Avg crowd, up 22%</span></div><div><b>$26</b><span>Bar per guest</span></div><div><b>61%</b><span>New faces on the email list</span></div></div>
          <p class="sub">Brings a bar crowd more than a dinner crowd. Book on Saturdays at Rowdy's, and run a late-kitchen special to lift food.</p></div>
        <div class="pane span5"><h3>How the numbers work</h3>
          ${[["Sales by the hour", "Every register sale during the show window is tagged to that night's band, split into bar and food."], ["Who came", "Ticket scans and the door count give the crowd. Card taps show how many were new."], ["Against a normal night", "Each show is compared with the same night of the week without a band."], ["A profile for every band", "Crowd, spend, best night and notes build up show after show, so rebooking is easy."]].map(r => `<div class="hrow">${icon("chart")}<div><b>${r[0]}</b><div class="s">${r[1]}</div></div><span></span></div>`).join("")}
          <p class="s" style="margin-top:6px">Works with Square, Toast or Clover, whichever the restaurants use.</p></div>
      </div>`;
    },

    shop() { return window.SHOPADMIN ? window.SHOPADMIN() : ""; },

    menus() {
      const m = D.biz.ernies.menu;
      return `<div class="hub-hero"><h1>Menus</h1><p class="sub">Change a price or add a special. It updates on the website, Google, Yelp and the printed menu file.</p></div>
      <div class="hgrid">
        <div class="pane span12"><div class="row" style="justify-content:space-between"><div class="seg dark" id="mbrand">${["ernies", "doubledip", "merrifield"].map((k, i) => `<button type="button" data-mb="${k}" class="${i ? "" : "on"}">${bubble(k, 14)} ${esc(B[k].name)}</button>`).join("")}</div>${live()}</div>
          <div id="medit"></div>
          <div class="row" style="margin-top:12px"><button class="hbtn go" id="savemenu">Publish menu</button><button class="hbtn" id="tospecial">Add tonight's special</button><span class="s">Updates the website, Google, Yelp and the printed menu.</span></div></div>
        <div class="pane span7"><div class="row" style="justify-content:space-between"><h3>The printed menu</h3><div class="seg dark" id="msize">${[["letter", "Table menu"], ["poster", "Poster"], ["phone", "Text a picture"]].map((z, i) => `<button type="button" data-ms="${z[0]}" class="${i ? "" : "on"}">${z[1]}</button>`).join("")}</div></div>
          <div class="menu-stage"><div class="pmenu letter pm-ernies" id="pmenu">${printedMenu("ernies")}</div></div>
          <div class="row"><button class="hbtn go" id="mprint">Send to the printer</button><button class="hbtn" id="mtext">Text it to the list</button><span class="s">Prices update here the moment you publish.</span></div></div>
        <div class="pane span5" id="special"><h3>Tonight's special</h3>
          <label>Special<input class="hinput" id="sp-n" value="Smoked Brisket Plate"></label>
          <div class="g2"><label>Price<input class="hinput" id="sp-p" value="$18.95"></label><label>When<input class="hinput" id="sp-w" value="Tonight, 5 to 9"></label></div>
          <label>Line<input class="hinput" id="sp-d" value="Twelve-hour brisket, white BBQ, two sides and cornbread."></label>
          <div class="sp-out">
            <div class="email sp-mail"><div class="eh" style="background:#151c2a"><img src="img/ernies/logo-cream.png?v=1793944505" alt="Ernie's Tavern"></div><img class="ehero" src="img/ernies/06-lanes-and-dining.jpg?v=1793944505" alt=""><div class="eb"><span class="ek" id="sp-ew"></span><h4 id="sp-en"></h4><p style="text-align:center" id="sp-ed"></p><a class="ecta" style="background:#253551;color:#f2eadb">Save me a table</a></div></div>
            <div class="phone sm"><div class="sms"><div class="b" id="sp-tx"></div></div></div>
          </div>
          <div class="row"><button class="hbtn go" id="sp-email">Email the list</button><button class="hbtn" id="sp-text">Text the list</button><button class="hbtn" id="sp-post">Post it</button></div></div>
      </div>`;
    },

    email() {
      return `<div class="hub-hero"><h1>Email & texts</h1><p class="sub">The town's letter, and one for every business in its own look. Pick an event, pick a list, send. No design work.</p></div>
      <div class="hgrid">
        <div class="pane span7"><h3>The town letter</h3><div id="townmail"></div></div>
        <div class="pane span5"><h3>Send an announcement</h3>
          <label>Event<select id="em-ev">${APP.allEvents().filter(x => x.d >= D.today).map((x, i) => `<option value="${i}">${esc(x.t)} · ${fmt(x.d)}</option>`).join("")}</select></label>
          <label>Send to</label>
          <div class="checks">${[["Whole town list", "2,418"], ["Nettie Jarvis customers", "640"], ["Past stay guests", "412"], ["Tea parlor regulars", "188"]].map((c, i) => `<label class="ck"><input type="checkbox" ${i === 0 ? "checked" : ""}> ${c[0]} <span class="s">${c[1]}</span></label>`).join("")}</div>
          <div class="row"><button class="hbtn go" id="sendem">Send email</button><button class="hbtn" id="sendtx">Send text</button></div>
          <h3 style="margin-top:12px">Text preview</h3><div class="phone sm"><div class="sms" id="smsprev"></div></div>
          <h3 style="margin-top:12px">Running on their own</h3>
          ${[["Welcome to the town list", "When someone signs up"], ["This weekend in Bloomfield", "Every Thursday at 9 AM"], ["Your stay is coming up", "Two days before check-in"], ["We miss you", "Six months after a visit"]].map(f => `<div class="hrow">${icon("mail")}<div><b>${f[0]}</b><div class="s">${f[1]}</div></div><span class="pill ok">On</span></div>`).join("")}
        </div>
        <div class="pane span12"><div class="row" style="justify-content:space-between"><h3>Every business, its own look</h3><span class="s">Already built. Each one sends in two clicks.</span></div>
          <div class="mails">${BRAND_MAIL.map(brandEmail).join("")}</div></div>
      </div>`;
    },

    social() {
      const brands = ["town", "nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival", "stays"];
      return `<div class="hub-hero"><h1>Graphic editor</h1><p class="sub">Pick a business and a photo. Attach an event and the details fill in. One graphic in that business's own look, sized for posts, stories, texts, emails, covers and flyers in one click.</p></div>
      <div class="hgrid">
        <div class="pane span5 editor">
          <h3>Business</h3><div class="pick-brands">${brands.map(k => `<button type="button" data-pb="${k}">${bubble(k, 14)}<span>${esc(B[k].name)}</span></button>`).join("")}</div>
          <h3>Photo</h3><div class="pick-photos" id="pp"></div>
          <h3>Event</h3><select id="pe"><option value="">Write my own</option>${APP.allEvents().filter(x => x.d >= D.today).map((x, i) => `<option value="${i}">${esc(x.t)} · ${fmt(x.d)}</option>`).join("")}</select>
          <label>Headline<input id="ph" class="hinput"></label>
          <div class="g2"><label>When<input id="pw" class="hinput"></label><label>Button<input id="pc" class="hinput"></label></div>
          <h3>Layout</h3><div class="seg dark" id="pl">${[["classic", "Classic"], ["band", "Band"], ["poster", "Poster"]].map((l, i) => `<button type="button" data-pl="${l[0]}" class="${i ? "" : "on"}">${l[1]}</button>`).join("")}</div>
          <h3>Size</h3><div class="seg dark" id="pf">${SIZES.map((l, i) => `<button type="button" data-pf="${l[0]}" class="${i ? "" : "on"}">${l[1]}</button>`).join("")}</div>
          <div class="row" style="margin-top:6px"><button class="hbtn go" id="pall">Make every size</button><button class="hbtn" id="ppost">Share</button><button class="hbtn" id="psched">Schedule</button><button class="hbtn ai" id="pcap">Write the caption</button></div>
          <p class="s" id="pcaption"></p>
        </div>
        <div class="pane span7 preview-pane"><div class="row" style="justify-content:space-between"><h3>Preview</h3><span class="s" id="psize">1080 × 1080</span></div><div class="post-wrap"><div class="post" id="post"></div></div></div>
      </div>
      <div class="hgrid">
        <div class="pane span12" id="allsizes" hidden><div class="row" style="justify-content:space-between"><h3>Every size, ready to share</h3><button class="hbtn go" id="shareall">Share all</button></div><div class="sizes" id="sizes"></div></div>
      </div>`;
    },

    listings() {
      // honest access levels: open = read & write API; partner = approved-partner API; via = through a connected tool; feed = no API, kept current by feed, syndication or saved submission; read = read only
      const A = { open: ["Read & write API", "ok"], partner: ["Partner API", ""], via: ["Through OwnerRez", ""], feed: ["Feed or form", "off"], read: ["Read only", "warn"] };
      const G = [
        ["Venues & weddings", ["revival", "velvet", "pinkhouse", "merrifield"], [["The Knot", "theknot.com", "feed"], ["WeddingWire", "weddingwire.com", "feed"], ["Zola", "zola.com", "feed"], ["Here Comes The Guide", "herecomestheguide.com", "feed"], ["Peerspace", "peerspace.com", "feed"], ["Eventective", "eventective.com", "feed"], ["Bach", "bach.com", "feed"]], "Photos, capacity and open dates stay current. Inquiries land in Reservations."],
        ["Stays", ["stays"], [["Airbnb", "airbnb.com", "via"], ["Vrbo", "vrbo.com", "via"], ["Booking.com", "booking.com", "via"], ["Google Vacation Rentals", "google.com", "via"], ["Hipcamp", "hipcamp.com", "feed"]], "One calendar. A booking anywhere blocks the dates everywhere."],
        ["Events", ["ernies", "rowdys", "nettie"], [["Google", "google.com", "open"], ["Eventbrite", "eventbrite.com", "open"], ["Facebook", "facebook.com", "partner"], ["Instagram", "instagram.com", "open"], ["TikTok", "tiktok.com", "partner"], ["Evvnt (newspaper calendars)", "evvnt.com", "open"], ["Courier Journal", "courier-journal.com", "feed"], ["Kentucky Standard", "kystandard.com", "feed"], ["Visit Bardstown", "visitbardstown.com", "feed"], ["Kentucky Tourism", "kentuckytourism.com", "feed"]], "Publish an event once and it goes out to every calendar here."],
        ["Food & drink", ["ernies", "doubledip", "merrifield"], [["Google Business Profile", "google.com", "open"], ["Yelp", "yelp.com", "partner"], ["OpenTable", "opentable.com", "partner"], ["Tripadvisor", "tripadvisor.com", "read"], ["Apple Business Connect", "apple.com", "partner"]], "Hours, menus, photos and reviews from one place."],
        ["Antiques", ["nettie"], [["eBay", "ebay.com", "open"], ["Etsy", "etsy.com", "open"], ["Instagram & Facebook Shops", "instagram.com", "open"], ["Chairish", "chairish.com", "feed"], ["1stDibs", "1stdibs.com", "feed"]], "List once. Sold anywhere, pulled everywhere."],
        ["Retreats & shoots", ["revival", "velvet"], [["Cvent", "cvent.com", "feed"], ["Peerspace", "peerspace.com", "feed"], ["Giggster", "giggster.com", "feed"]], "Day rates, photos and availability for planners and film crews."],
      ];
      const NOW = [["Their websites", "squareup.com"], ["Airbnb", "airbnb.com"], ["Facebook", "facebook.com"], ["Instagram", "instagram.com"], ["Google", "google.com"], ["Yelp", "yelp.com"]];
      const CAN = ["theknot.com", "weddingwire.com", "zola.com", "peerspace.com", "bach.com", "vrbo.com", "booking.com", "eventbrite.com", "evvnt.com", "ebay.com", "etsy.com", "chairish.com", "1stdibs.com", "tripadvisor.com", "visitbardstown.com", "opentable.com"];
      return `<div class="hub-hero"><h1>Listings & marketplaces</h1><p class="sub">Get on the sites you never had time for. One place keeps every listing current, and everything comes back to one inbox.</p></div>
      <div class="lm-flow">
        <div class="lm-col"><span class="lm-step">1</span><h3>Where you are now</h3><p class="s">Six places, each with its own login.</p>
          <div class="lm-now">${NOW.map(n => `<div><img src="img/logos/${n[1]}.png" alt=""><span>${n[0]}</span></div>`).join("")}</div></div>
        <div class="lm-arrow" aria-hidden="true">→</div>
        <div class="lm-col"><span class="lm-step">2</span><h3>Where you can be</h3><p class="s">Thirty more, for weddings, stays, events, food and antiques.</p>
          <div class="lm-can">${CAN.map(d => `<span><img src="img/logos/${d}.png" alt=""></span>`).join("")}<span class="more">+14</span></div></div>
        <div class="lm-arrow" aria-hidden="true">→</div>
        <div class="lm-col lm-one"><span class="lm-step">3</span><h3>All in one place</h3><p class="s">Every inquiry, booking, order and review comes back here.</p>
          <div class="lm-hub"><b>Town Center</b>${[["inbox", "One inbox"], ["cal", "One calendar"], ["tag", "One inventory"], ["star", "Every review"]].map(r => `<div>${icon(r[0])}<span>${r[1]}</span></div>`).join("")}</div></div>
      </div>
      <div class="access-key">${Object.values(A).map(a => `<span class="pill ${a[1]}">${a[0]}</span>`).join("")}<span class="s">Every listing site here can be kept current. The label shows how.</span></div>
      <div class="lm-bands">${G.map(g => `<section class="lm-band"><div class="lm-band-h"><h2>${g[0]}</h2><p class="s">${g[3]}</p><div class="row">${g[1].map(k => bubble(k, 28)).join("")}</div></div>
        <div class="mkt">${g[2].map(m => `<div class="mkt-i"><img src="img/logos/${m[1]}.png" alt=""><b>${esc(m[0])}</b><span class="pill ${A[m[2]][1]}">${A[m[2]][0]}</span></div>`).join("")}</div></section>`).join("")}</div>
      <div class="hgrid"><div class="pane span12"><h3>What the labels mean</h3>
        ${[["Read & write API", "Town Center reads and updates the listing directly, any time."], ["Partner API", "Open to approved partners. We apply once, then it works like the rest."], ["Through OwnerRez", "The stays connect through OwnerRez, an approved partner of Airbnb, Vrbo and Booking.com."], ["Feed or form", "No public connection. Town Center keeps a ready listing, sends updates by feed or saved form, and inquiries come back to the inbox by email."], ["Read only", "Town Center pulls in reviews and ratings. Replies are posted on the site."]].map(r => `<div class="hrow">${icon("plug")}<div><b>${r[0]}</b><div class="s">${r[1]}</div></div><span></span></div>`).join("")}</div></div>`;
    },

    pr() {
      return `<div class="hub-hero"><h1>Press & PR</h1><p class="sub">Every town event becomes a pitch. Interviews, features and story ideas go out to the right editors, writers and creators on a schedule, from here.</p></div>
      <div class="suggest"><div class="sg-head">${icon("mic")}<div><h2>Worth pitching</h2><p class="s">Town Center reads the calendar and flags what the press will want, with the best day to send.</p></div></div>
        <div class="sg-list">${PR_IDEAS.map((x, i) => `<div class="sg" id="sg-${i}">${bubble(x.b, 40)}<div class="sg-body"><span class="sg-k">${esc(x.when)}</span><b>${esc(x.t)}</b><p>${esc(x.why)}</p><span class="s">Send ${esc(x.send)} · to ${esc(x.list)}</span></div>
          <div class="sg-acts"><button class="hbtn go" data-sg="${i}">Schedule the blast</button><button class="hbtn" data-sgp="${i}">See the pitch</button><button class="hbtn ghost" data-sgx="${i}">Not this one</button></div></div>`).join("")}</div></div>
      <div class="hgrid">
        <div class="pane span3 kpi"><b>42</b><span>Pitches sent this month</span></div>
        <div class="pane span3 kpi"><b>67%</b><span>Opened</span></div>
        <div class="pane span3 kpi"><b>6</b><span>Replies, in your inbox</span></div>
        <div class="pane span3 kpi"><b>3</b><span>Stories that ran</span></div>
        <div class="pane span12"><h3>Find the right people</h3>
          <div class="find"><input class="hinput" id="prq" value="Travel and wedding writers at Kentucky and Ohio magazines"><button class="hbtn go" id="prfind">Find & enrich</button></div>
          <div class="s">Searches newsrooms, magazine mastheads, blogs and creator profiles, then fills in each person's beat, recent stories and the best way to reach them.</div>
          <div class="tscroll"><table class="table prt"><thead><tr><th></th><th>Who</th><th>Outlet</th><th>Covers</th><th>Recent</th><th>Reach</th><th></th></tr></thead><tbody>
          ${PR_FOUND.map((r, i) => `<tr><td><input type="checkbox" ${i < 4 ? "checked" : ""} aria-label="Select"></td><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="mask">${r[4]}</span></td><td><span class="pill ${r[5] === "Good fit" ? "ok" : ""}">${r[5]}</span></td></tr>`).join("")}
          </tbody></table></div>
          <div class="row"><select id="prlist" class="hinput" style="max-width:260px">${PR_LISTS.map(l => `<option>${l[0]}</option>`).join("")}</select><button class="hbtn go" id="pradd">Add selected to list</button></div></div>
        <div class="pane span5"><h3>Your lists</h3>${PR_LISTS.map(l => `<div class="hrow">${icon("globe")}<div><b>${l[0]}</b><div class="s">${l[2]}</div></div><span class="pill">${l[1]}</span></div>`).join("")}</div>
        <div class="pane span7"><h3>Pitches that send themselves</h3>
          ${[["When an event is published", "Pitch the Local events list 10 days before, with the photo and details attached.", "On"], ["First Monday of the month", "Send one story idea to Kentucky travel editors.", "On"], ["When Revival Hall news happens", "Pitch Wedding media with the feature angle and photos.", "On"], ["No reply after 4 days", "One short, friendly follow-up. Stops the moment someone answers.", "On"], ["Every reply", "Lands in Reservations next to the bookings, flagged as press.", "On"]].map(r => `<div class="hrow">${icon("mic")}<div><b>${r[0]}</b><div class="s">${r[1]}</div></div><span class="pill ok">${r[2]}</span></div>`).join("")}
          <div class="pitch"><span class="s">Next pitch · Fri, Nov 6 · to Local events (48)</span><b>Christmas on Taylorsville Road, December 5</b><p>Hi, Bloomfield turns Taylorsville Road into a Christmas walk on Saturday, December 5: carolers, a bourbon tasting at Nettie Jarvis, tea at Miss Merrifield's and a band at Ernie's. Photos and details below, and the owners are happy to talk.</p><div class="row"><button class="hbtn ai">Rewrite</button><button class="hbtn">Edit</button><button class="hbtn go" id="prsend">Send now</button></div></div></div>
        <div class="pane span7"><h3>Pitches going out</h3>
          ${[["Christmas on Taylorsville Road", "Kentucky Living, Courier Journal, WAVE 3, LEX18", "Event", "Dec 5"], ["Revival Hall: a church becomes a wedding venue", "Garden & Gun, Southern Living, Kentucky Monthly", "Feature", "Pitch Nov 12"], ["Interview: the woman who brought Taylorsville Road back", "Louisville Magazine, Bourbon+ podcast", "Interview", "Pitch Nov 18"], ["A bachelorette weekend in a town of 1,000", "Bach, Brides, TikTok creators", "Story idea", "Pitch Dec 1"], ["The Deere John tractors", "Roadside America, Atlas Obscura, KY creators", "Story idea", "Sent"]].map(p => `<div class="hrow">${icon("mic")}<div><b>${esc(p[0])}</b><div class="s">${esc(p[1])}</div></div><span class="pill ${p[3] === "Sent" ? "ok" : "warn"}">${p[2]} · ${p[3]}</span></div>`).join("")}
          <button class="hbtn ai">Draft a pitch from an event</button></div>
        <div class="pane span5"><h3>Press list</h3>
          ${[["Newspapers", "Kentucky Standard, Courier Journal, Herald-Leader, Spencer Magnet"], ["Magazines", "Kentucky Living, Kentucky Monthly, Garden & Gun, Southern Living"], ["TV & radio", "WAVE 3, WHAS 11, LEX18, WLKY"], ["Sites & blogs", "Visit Bardstown, Bourbon Trail, Kentucky Tourism"], ["Creators", "Kentucky travel, bourbon and wedding creators"]].map(p => `<div class="hrow">${icon("globe")}<div><b>${p[0]}</b><div class="s">${p[1]}</div></div><span></span></div>`).join("")}</div>
        <div class="pane span12"><h3>Coverage</h3><div class="coverage">${[["Garden & Gun", "Sept 2026", "Linda Bruckheimer's Bloomfield"], ["Kentucky Living", "Jan 2015", "Lights, camera, Bloomfield"], ["WAVE 3 News", "Jul 2014", "Revitalizing the town of Bloomfield"], ["Visit Bardstown", "", "The vintage scene"]].map(c => `<div><b>${c[0]}</b><span>${c[2]}</span><small>${c[1]}</small></div>`).join("")}</div></div>
      </div>`;
    },

    reviews() {
      return `<div class="hub-hero"><h1>Yelp & reviews</h1><p class="sub">Every review from Google, Yelp, Airbnb and Tripadvisor in one feed. Reply in a click. Push photos and events to Yelp from the same place.</p></div>
      <div class="hgrid">
        <div class="pane span7"><h3>New reviews</h3>
          ${[["ernies", "Google", "★★★★★", "Best burger in Nelson County and the bowling lanes are a hoot."], ["stays", "Airbnb", "★★★★★", "We loved this cabin. Cozy vibes and retro touches galore!"], ["merrifield", "Yelp", "★★★★☆", "Lovely tea. Wish they were open Saturdays!"]].map(r => `<div class="hrow">${bubble(r[0], 28)}<div><b>${r[2]} · ${r[1]}</b><div class="s">${esc(r[3])}</div></div><button class="hbtn ai">Reply</button></div>`).join("")}</div>
        <div class="pane span5"><h3>Yelp, from here</h3>
          ${[["Push new photos", "Pick from the shop's best shots"], ["Post this weekend's events", "Shows on each Yelp page"], ["Turn on reservations", "Yelp guests book into this inbox"], ["Boost an event", "Yelp ads for Christmas on Taylorsville Road"]].map(y => `<div class="hrow">${icon("star")}<div><b>${y[0]}</b><div class="s">${y[1]}</div></div><button class="hbtn">Go</button></div>`).join("")}</div>
      </div>`;
    },

    partners() {
      return `<div class="hub-hero"><h1>Town partners</h1><p class="sub">An open door for every business in Bloomfield. A free listing and calendar spot, or a featured place in the emails and on the homepage.</p></div>
      <div class="hgrid">
        <div class="pane span4 tier"><h2>Free</h2><p class="sub">On the map, on the town calendar, in the directory.</p><b class="kpi-b">$0</b></div>
        <div class="pane span4 tier hi"><h2>Featured</h2><p class="sub">Homepage spot, a line in the weekly email, events pushed to the papers.</p><b class="kpi-b">$49 a month</b></div>
        <div class="pane span4 tier"><h2>Full partner</h2><p class="sub">Their own page and booking through Town Center.</p><b class="kpi-b">$149 a month</b></div>
        <div class="pane span12"><h3>Partners</h3>${D.others.map(o => `<div class="hrow">${bubble("partner", 28)}<div><b>${esc(o.name)}</b><div class="s">${esc(o.what)}</div></div><span class="pill ${o.id === "shortcrust" ? "ok" : ""}">${o.id === "shortcrust" ? "Featured" : "Free"}</span></div>`).join("")}<button class="hbtn">Invite a business</button></div>
      </div>`;
    },

    chatgpt() {
      const convo = [
        ["u", "Add this picture to the Nettie Jarvis shop. Cherry corner cupboard, 1880s, $1,850. Push it to eBay and Chairish too.", "img/nettie/products/cherry-corner-cupboard-10688.jpg?v=1793944505"],
        ["a", "Done. Listed on nettie-jarvis.com, eBay and Chairish at $1,850. I wrote the description from the photo. When it sells anywhere, it comes down everywhere.", null, "card"],
        ["u", "Put a bourbon tasting on the calendar for Saturday the 14th at 4. Tell the list."],
        ["a", "Fall Bourbon Flight is on the town calendar, the Nettie Jarvis site, Google and Facebook. The email goes to 2,418 people Thursday at 9. Want a text too?"],
        ["u", "Who's coming to tea this week?"],
        ["a", "Wednesday: 3 tables, 14 guests. Lisa Hardin's party of 8 is celebrating her mom's 70th. Thursday: 2 tables so far."],
      ];
      return `<div class="hub-hero"><h1>ChatGPT on your phone</h1><p class="sub">Connect Town Center to ChatGPT or Claude once. Then anyone on the team can run the town from a text box.</p></div>
      <div class="hgrid">
        <div class="pane span5"><div class="phone"><div class="ph-top">ChatGPT · Town Center connected</div><div class="ph-chat">${convo.map(c => `<div class="msg ${c[0]}">${c[2] ? `<img src="${c[2]}" alt="">` : ""}${esc(c[1])}${c[3] ? `<div class="mcard">${bubble("nettie", 24)}<b>Cherry corner cupboard</b><span>$1,850 · Website · eBay · Chairish</span></div>` : ""}</div>`).join("")}</div></div></div>
        <div class="pane span7"><h3>Things you can just say</h3>
          ${["Add this picture to the shop at $240 and push it to eBay.", "Put the Christmas tea on the calendar for December 12th at 1.", "Text the list that Rowdy's has a band tonight.", "Hold Revival Hall for the Ellis wedding on May 22.", "Change the ribeye to $28.95.", "What did we book this weekend across everything?", "Write a pitch to Kentucky Living about Revival Hall.", "Reply to the new Yelp review."].map(p => `<div class="prompt">“${esc(p)}”</div>`).join("")}
          <p class="sub" style="margin-top:8px">Nothing goes out to a customer until someone on the team says yes.</p></div>
      </div>`;
    },

    connections() {
      const C = [["Square", "Payments & point of sale", "#1f1f1f", "Sq", true], ["Airbnb", "Through OwnerRez", "#ff5a5f", "A", true], ["Vrbo", "Through OwnerRez", "#1e4a8a", "V", false], ["Yelp", "Reservations, photos, ads", "#d32323", "Y", true], ["Google Business", "Hours, menus, events, reviews", "#4285f4", "G", true], ["Instagram & Facebook", "Posts, feeds, events", "#c13584", "IG", true], ["Squarespace", "Moves into Town Center", "#000", "SS", false], ["eBay", "Antiques", "#e53238", "eB", true], ["Etsy", "Antiques & gifts", "#f1641e", "Et", false], ["Chairish", "Fine furniture", "#222", "Ch", true], ["Mailchimp or Klaviyo", "Email list", "#ffe01b", "M", true], ["Twilio", "Text messages", "#f22f46", "T", true], ["The Knot & WeddingWire", "Venue listings and leads", "#00b2a9", "K", false], ["QuickBooks", "Books for every business", "#2ca01c", "QB", false], ["Stripe", "Deposits and stays", "#635bff", "St", true], ["ChatGPT & Claude", "Run it from your phone", "#10a37f", "AI", true]];
      return `<div class="hub-hero"><h1>Connections</h1><p class="sub">The tools the businesses already use plug in here. Anything new plugs in later.</p></div>
      <div class="hgrid">${C.map(c => `<div class="pane span4 conn"><span class="ic" style="background:${c[2]};color:${c[2] === "#ffe01b" ? "#222" : "#fff"}">${c[3]}</span><div><div class="n">${c[0]}</div><div class="d">${c[1]}</div></div>${c[4] ? `<span class="pill ok">Connected</span>` : `<button class="hbtn">Connect</button>`}</div>`).join("")}</div>`;
    },

    addons() {
      const A = [["Text message list", "Event alerts by text, from the same button.", "chat"], ["Weekend planner", "Visitors build a weekend; you get the lead.", "cal"], ["Wedding concierge", "One proposal across every venue and stay.", "ring"], ["Gift cards", "One card that works at every business in town.", "tag"], ["Town loyalty", "Stamps across every business; the tenth visit is on the town.", "star"], ["Influencer program", "Invite creators for a weekend; track what they post.", "globe"], ["Staff scheduling", "Shifts for every business in one place.", "home"]];
      return `<div class="hub-hero"><h1>Add-ons</h1><p class="sub">Town Center keeps growing. Pick what helps next.</p></div>
      <div class="hgrid">${A.map(a => `<div class="pane span3 addon">${icon(a[2])}<h2>${a[0]}</h2><p class="sub">${a[1]}</p><button class="hbtn">Add</button></div>`).join("")}</div>
`;
    },
  };

  // one graphic, every size it gets used at
  const SIZES = [["sq", "Square post", "1080 × 1080", "Instagram & Facebook feed"], ["story", "Story", "1080 × 1920", "Instagram & Facebook stories"], ["text", "Text message", "1080 × 1350", "Picture text to the list"],
    ["email", "Email header", "1200 × 600", "Top of the town letter"], ["cover", "Cover", "1920 × 1005", "Facebook event & page cover"], ["flyer", "Flyer", "8.5 × 11 in", "Print for the shop windows"]];
  // per-show averages for the bands, read from the registers
  const BASE = 2400;
  const BANDS = [
    { n: "Hannah Wheeler & The Heartaches", stage: "rowdys", shows: 5, crowd: 176, bar: 3150, food: 1040, pay: 650 },
    { n: "The Bourbon Barrel Boys", stage: "ernies", shows: 8, crowd: 118, bar: 2280, food: 1620, pay: 400 },
    { n: "Big Black Cadillac", stage: "ernies", shows: 3, crowd: 142, bar: 2710, food: 1310, pay: 500 },
    { n: "Kentucky Ramblers", stage: "ernies", shows: 4, crowd: 74, bar: 1490, food: 1130, pay: 350 },
    { n: "Copper Creek String Band", stage: "rowdys", shows: 2, crowd: 61, bar: 1320, food: 760, pay: 450 },
  ];
  // press contacts are shown by role here; the real search fills in names and verified emails
  const PR_FOUND = [
    ["Travel editor", "Kentucky Living", "Travel, small towns", "3 KY town features", "t•••@kentuckyliving.com", "Good fit"],
    ["Features writer", "Courier Journal", "Things to do, food", "Bourbon Trail roundup", "f•••@courier-journal.com", "Good fit"],
    ["Weddings editor", "Ohio Valley Bride", "Venues, real weddings", "Barn venue guide", "w•••@ovbride.com", "Good fit"],
    ["Contributing writer", "Garden & Gun", "Southern towns", "Bloomfield, Sept 2026", "c•••@gardenandgun.com", "Pitched before"],
    ["Food & drink blogger", "Louisville blog", "Bourbon, brunch", "Weekly posts", "Instagram DM", "Good fit"],
    ["Travel creator", "TikTok · 84k followers", "Weekend trips", "Bardstown in 48 hours", "Email on profile", "Good fit"],
  ];
  // events the calendar knows about that the press would want, with the right lead time
  const PR_IDEAS = [
    { b: "town", t: "Christmas on Taylorsville Road", when: "Sat, Dec 5 · 5 weeks out", why: "Papers and TV plan holiday coverage three to four weeks ahead. A whole town lit up for Christmas is an easy yes for them.", send: "Fri, Nov 6", list: "Local events (48) and Kentucky travel editors (24)" },
    { b: "revival", t: "Revival Hall first look", when: "Sat, Dec 12 · 6 weeks out", why: "A 140-year-old church turned wedding venue is a feature story. Wedding media plan their spring venue roundups now.", send: "Mon, Nov 9", list: "Wedding media (31)" },
    { b: "rowdys", t: "Hannah Wheeler & The Heartaches", when: "Sat, Nov 14 · 2 weeks out", why: "The band's best crowd yet last month. A good fit for weekend things-to-do lists.", send: "Tue, Nov 3", list: "Local events (48)" },
  ];
  const PR_LISTS = [["Kentucky travel editors", 24, "Magazines and travel desks across the state"], ["Wedding media", 31, "Bridal magazines, venue guides, wedding blogs"], ["Bourbon writers", 18, "Spirits press and Bourbon Trail coverage"], ["Local events", 48, "Newspapers, TV and radio calendars"], ["Creators", 40, "Travel and food creators, 10k to 100k"]];
  // the managers' run sheet, store by store
  const OPS = [
    { b: "ernies", items: [["", "Costume contest tonight: 4 servers, 2 bar, 2 kitchen. Doors at 7, band at 8.", ""], ["amber", "Reply to the 2-star Google review from Friday's 40-minute wait.", "Reply"], ["", "Band food: 6 chicken burgers and salads plated at 6 PM.", ""]] },
    { b: "rowdys", items: [["", "Trick or treat 1 to 5 PM: candy and porch decor out by noon.", ""], ["", "Tarot reader arrives 2:30. Table on the east porch.", ""]] },
    { b: "merrifield", items: [["", "No tea today. Wednesday is 3 tables, 14 guests, Lisa Hardin's party of 8.", ""]] },
    { b: "nettie", items: [["", "Open 10 to 6. Fall Bourbon Flight Nov 14 is 22 of 24 sold.", ""], ["amber", "Ship the Rose Medallion plates sold on eBay last night.", "Print label"]] },
    { b: "doubledip", items: [["amber", "Bourbon Ball down to 2 tubs before the Halloween rush.", "Reorder"]] },
    { b: "stays", items: [["red", "Boone's Cabin: slow drain upstairs. Guests arrive Nov 13.", "Send a plumber"], ["", "Clayborn checkout 11 AM. Cleaners at noon.", ""]] },
    { b: "revival", items: [["", "Kate & Ben asked about staying open until midnight.", "Reply"], ["", "140 chairs arrive Tue at 9 AM. Jamie has the side door.", ""]] },
  ];
  // how messages get to the right person
  const TEAM_FLOWS = [
    { steps: [[null, "bed", "Airbnb message", "Guest at Boone's Cabin", "Is the pond OK for swimming, and is there a kayak?"], ["stays", "", "Town Center", "Sent to the house manager", "Tagged Boone's Cabin, stay Nov 13 to 15."], [null, "chat", "Jamie's phone", "Jamie answers by text", "The reply goes back to the guest on Airbnb."]],
      textLabel: "Text Jamie", to: "Jamie, house manager", text: "New question from the Boone's Cabin guest (Nov 13 to 15): is the pond OK for swimming, and is there a kayak? Reply here and it goes back to them on Airbnb." },
    { steps: [["rowdys", "", "Band booking", "Hannah Wheeler & The Heartaches", "Rider: chicken burgers and side salads for 6, at 6 PM."], ["ernies", "", "Town Center", "Sent to Ernie's kitchen manager", "Added to the Nov 14 band-night production sheet."], [null, "cal", "Production schedule", "Sat, Nov 14 · band night", "6 chicken burgers, 6 salads, plated at 6 PM."]],
      textLabel: "Text the kitchen", to: "Ernie's kitchen manager", text: "Band night Sat Nov 14: Hannah Wheeler & The Heartaches need 6 chicken burgers and 6 side salads at 6 PM. It's on the production sheet." },
    { steps: [[null, "store", "Delivery", "Rental chairs, 140", "Arriving Tue, Nov 10 at 9 AM at Revival Hall."], ["revival", "", "Town Center", "Put on the deliveries calendar", "Revival Hall's side door is the drop-off."], [null, "chat", "Jamie's phone", "Text Jamie", "Someone needs to be there to unlock."]],
      textLabel: "Text Jamie", to: "Jamie", text: "Heads up: 140 rental chairs arrive at Revival Hall Tuesday at 9 AM. Can you be there to open the side door?" },
  ];
  const TODAY_REVIEWS = [
    { src: "Yelp", c: "#d32323", n: 4, when: "2 hr ago", b: "merrifield", who: "Amanda K., Louisville", t: "The scones and the pink parlor are a dream. Only wish they were open on Saturdays too!",
      reply: "Thank you, Amanda! We're so glad you loved the parlor. Good news: we're adding Saturday seatings for Christmas Tea on December 12. We'd love to save you a table." },
    { src: "Google", c: "#4285f4", n: 5, when: "Yesterday", b: "ernies", who: "Travis M.", t: "Best burger in Nelson County, cold beer, and the old bowling lanes are a hoot. The neon alone is worth the drive.",
      reply: "Thanks, Travis! The lanes and the neon say hello. Come back Friday for live music at eight; we'll hold a lane for you." },
    { src: "Airbnb", c: "#ff5a5f", n: 5, when: "Yesterday", b: "stays", who: "Carrie, Cincinnati", t: "We loved this cabin. The charm and attention to detail was amazing. Cozy vibes, great amenities and retro touches galore!",
      reply: "Carrie, thank you for taking such good care of Boone's Cabin. Come back in the spring when the pond is at its prettiest." },
  ];
  function rowReq(r) { return `<div class="hrow">${bubble(r.brand, 28)}<div><b>${esc(r.name)} · ${esc(r.what)}</b><div class="s">${esc(r.src || "Website")} · ${rel(r.at)}</div></div>${statusPill(r.status)}</div>`; }

  function wiring() {
    const L = ["Website & sister sites", "Airbnb & Vrbo", "The Knot & WeddingWire", "Yelp & Google", "Instagram & Facebook", "eBay & Chairish"];
    const R = ["Email the list", "Text the list", "Papers & press", "ChatGPT on your phone", "Square & Stripe", "QuickBooks"];
    const row = (arr, x, anchor) => arr.map((t, i) => `<g><rect x="${x}" y="${20 + i * 46}" width="200" height="34" rx="17" fill="#18221d" stroke="#3e4d43"/><text x="${x + 100}" y="${42 + i * 46}" text-anchor="middle" fill="#dfe7dc" font-size="13" font-family="Libre Franklin, sans-serif">${t}</text><path d="M${anchor === "l" ? x + 200 : x} ${37 + i * 46} C ${anchor === "l" ? x + 280 : x - 80} ${37 + i * 46}, ${anchor === "l" ? 330 : 470} 150, ${anchor === "l" ? 340 : 460} 150" stroke="#4f6a55" fill="none"/></g>`).join("");
    return `<div class="tscroll"><svg class="wiring" viewBox="0 0 800 300" role="img" aria-label="Every channel connects to Town Center">
      ${row(L, 10, "l")}${row(R, 590, "r")}
      <circle cx="400" cy="150" r="64" fill="#a9c6a6"/><text x="400" y="146" text-anchor="middle" fill="#13201a" font-size="20" font-family="Cormorant Garamond, serif" font-weight="600">Town</text><text x="400" y="168" text-anchor="middle" fill="#13201a" font-size="20" font-family="Cormorant Garamond, serif" font-weight="600">Center</text>
    </svg></div>`;
  }

  /* ---------- what each section does after it draws ---------- */
  // first visit to a section: a short explainer card
  const INTRO = {
    overview: { k: "Today", h: "This is where you start.", p: "Every morning, open Town Center to Today. New bookings, messages, reviews and tonight's events, for every business on Taylorsville Road.", hl: "<b>One page, one cup of coffee.</b> Everything that needs you is right here.", ok: "Let's go" },
    inbox: { k: "Reservations", h: "Every booking, one inbox.", p: "Tables, tastings, tea, stays and party rooms all land here, from the website, Airbnb, Google, Facebook and email.",
      steps: ["A guest books anywhere", "It shows up here, already sorted", "AI drafts the reply. You press send."], hl: "<b>No more checking six apps.</b> Nothing gets missed.", ok: "Show me" },
    calendar: { k: "One calendar", h: "One calendar for the whole town.", p: "Every business, every event, every stay and every private party on one calendar.",
      steps: ["Add an event once", "It goes to the town site, its own site, Google and Facebook", "Rooms and stays can't double-book"], hl: "<b>Change it here, it changes everywhere.</b>", ok: "Open the calendar" },
    stays: { k: "Stays & Airbnb", h: "Plug in Airbnb once. Every listing follows.", p: "Connect your Airbnb account and all four stays come in with their photos, prices, reviews and calendars.",
      chips: ["Airbnb", "Vrbo", "Booking.com", "Google", "StayInBloomfield.com"],
      steps: ["Sign in to Airbnb one time", "Your listings show up here and on the town site", "Vrbo and Booking.com list from the same place"], hl: "<b>One calendar for every channel.</b> Book on one, it closes on all the others. Direct bookings skip the fees.", ok: "See the stays" },
    venues: { k: "Venues & weddings", h: "A real reservation system for every room.", p: "Revival Hall, the Pink House garden, the Velvet Room and Rowdy's dance hall, booked from one place.",
      steps: ["A couple asks about a date", "Hold the date, send the quote and contract", "Take the deposit online and plan the day"], hl: "<b>Inquiry to wedding day in one place.</b> Every room on the town calendar, never double-booked.", ok: "See the venues" },
    start: { k: "Town Center", h: "Welcome to the back office.", p: "This is the side visitors never see. It runs the bookings, the calendar, the shop, the menus and the marketing for every business on Taylorsville Road.",
      hl: "<b>Take a look around.</b> Press buttons, open things, try it out. Most of it works, and the rest shows what's coming.", ok: "Start the tour" },
    tickets: { k: "Tickets & check-in", h: "Sell the show. Scan the door.", p: "Concerts, dinners and dances get real tickets with a QR code, and a guest list you can check in from a phone.",
      steps: ["Put tickets on sale in a minute", "Guests get a text with their ticket", "Scan them in at the door"], hl: "<b>No more paper lists.</b> You know who came and who didn't.", ok: "See tickets" },
    bands: { k: "Bands at Ernie's", h: "Know which bands pay for themselves.", p: "Every band night, matched to what the register rang up that night.",
      steps: ["Book a band and its fee", "Sales come in from the register", "See which nights made money"], hl: "<b>Book the ones that fill the room.</b>", ok: "See the bands" },
    shop: { k: "Shop & inventory", h: "One inventory. Every marketplace.", p: "Snap a photo of a piece in Nettie Jarvis, set a price, and it lists on the website, eBay, Etsy, Chairish and Instagram at once.",
      steps: ["Add an item with a photo", "It lists everywhere", "Sell it once, it comes down everywhere"], hl: "<b>One of a kind stays one of a kind.</b> Nothing sells twice.", ok: "Open the shop" },
    menus: { k: "Menus", h: "Change the menu once.", p: "Ernie's, the Double Dip and Miss Merrifield's keep their menus here.",
      steps: ["Edit a dish or a price", "The website updates", "Print a fresh menu or post the special"], hl: "<b>Today's special, everywhere, in a minute.</b>", ok: "See the menus" },
    social: { k: "Graphic editor", h: "Every size, one click.", p: "Pick an event or a product and a look. You get the Instagram post, the story, the flyer and the text picture, all in each brand's style.",
      hl: "<b>No designer needed for the everyday stuff.</b> Nothing posts until you say so.", ok: "Make something" },
    email: { k: "Email & texts", h: "Your list, finally put to work.", p: "One list for the whole town, sorted by what people came for: tea, bourbon, weddings, live music, antiques.",
      steps: ["Pick who it's for", "AI writes it in that business's voice", "Send it as an email or a text"], hl: "<b>The right note to the right people.</b> You approve every send.", ok: "See the lists" },
    listings: { k: "Listings & marketplaces", h: "Be everywhere people look.", p: "Google, Apple Maps, Yelp, TripAdvisor, Facebook and the travel sites, kept right from one place.",
      steps: ["Change your hours once", "It updates every listing", "See where you show up and where you don't"], hl: "<b>No more wrong hours on Google.</b>", ok: "See the listings" },
    pr: { k: "Press & PR", h: "A PR team that never sleeps.", p: "It spots the stories worth telling, finds the right writers and drafts the pitch.",
      steps: ["A story worth telling comes up", "It finds papers, blogs and influencers who cover it", "You read the pitch and press send"], hl: "<b>Bloomfield in the paper, on purpose.</b>", ok: "See the stories" },
    reviews: { k: "Yelp & reviews", h: "Every review, one place.", p: "Google, Yelp, Airbnb, TripAdvisor and Facebook reviews for every business, as they come in.",
      steps: ["A review comes in", "AI drafts a thank you or a fix", "You reply from here"], hl: "<b>Every guest hears back.</b> The bad ones get caught fast.", ok: "See the reviews" },
    partners: { k: "Town partners", h: "The whole town, working together.", p: "ShortCrust, Hometown Pizza, The Nest and every other spot in town can join the site, free or with a paid feature.",
      hl: "<b>A bigger town draws a bigger crowd.</b> Partners help fill the weekend.", ok: "See the partners" },
    chatgpt: { k: "ChatGPT on your phone", h: "Just ask.", p: "\"How did Ernie's do Friday?\" \"Who's booked at the Pink House Saturday?\" Ask from your phone and get the answer from Town Center.",
      hl: "<b>The back office in your pocket.</b>", ok: "Try a question" },
    connections: { k: "Connections", h: "Plug in what you already use.", p: "Square, Airbnb, Google, Facebook, Instagram, eBay and the rest connect here, one time each.",
      hl: "<b>Keep your tools.</b> Town Center ties them together.", ok: "See connections" },
    addons: { k: "Add-ons", h: "Grow into it.", p: "Start with what you need. Add gift cards, loyalty, staff scheduling and more when you're ready.",
      hl: "<b>Built to grow with Taylorsville Road.</b>", ok: "See add-ons" },
  };
  const introSeen = {};
  function intro(k) {
    const c = INTRO[k]; if (!c || introSeen[k]) return; introSeen[k] = true;
    const t = document.createElement("div"); t.className = "tour";
    t.innerHTML = `<div class="tour-card"><span class="eyebrow">${c.k}</span><h3>${c.h}</h3><p>${c.p}</p>
      ${c.chips ? `<div class="intro-chips">${c.chips.map(x => `<span>${x}</span>`).join("")}</div>` : ""}
      ${c.steps ? `<ol class="intro-steps">${c.steps.map(x => `<li>${x}</li>`).join("")}</ol>` : ""}
      <p class="tour-hl">${c.hl}</p>
      <div class="intro-foot"><button class="btn solid" data-tour-ok>${c.ok}</button>${k === "start" ? "" : `<span>Click around. Most of it works.</span>`}</div></div>`;
    document.body.appendChild(t);
    t.onclick = e => { if (e.target === t || e.target.closest("[data-tour-ok]")) t.remove(); };
  }
  const AFTER = {
    start(m) {
      m.querySelectorAll("[data-go]").forEach(b => b.onclick = () => { sec = b.dataset.go; APP.go("center-" + sec); });
      m.querySelectorAll("[data-cp]").forEach(b => b.onclick = () => {
        const i = b.dataset.cp, f = TEAM_FLOWS[i], email = b.dataset.mode === "email";
        b.parentElement.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
        $("#cp-" + i).value = email ? `Subject: ${f.steps[0][3]}\n\nHi,\n\n${f.text}\n\nThanks,\nTown Center` : f.text;
        $("#cp-" + i).rows = email ? 6 : 3;
        $("#cpto-" + i).textContent = email ? `To ${f.to} · from the team inbox` : `To ${f.to}`;
      });
      m.querySelectorAll("[data-send]").forEach(b => b.onclick = () => APP.toast("Ready to send. Nothing goes out from the preview."));
    },
    overview(m) {
      m.querySelectorAll("[data-go]").forEach(b => b.onclick = () => { sec = b.dataset.go; APP.go("center-" + sec); });
      m.querySelectorAll("[data-reply]").forEach(b => b.onclick = () => { $("#rv-" + b.dataset.reply).hidden = false; b.hidden = true; });
      m.querySelectorAll("[data-cancel]").forEach(b => b.onclick = () => { $("#rv-" + b.dataset.cancel).hidden = true; m.querySelector(`[data-reply="${b.dataset.cancel}"]`).hidden = false; });
      m.querySelectorAll("[data-post]").forEach(b => b.onclick = () => { const r = TODAY_REVIEWS[b.dataset.post]; $("#rv-" + b.dataset.post).innerHTML = `<span class="pill ok">Reply ready for ${r.src}</span>`; APP.toast(`Reply ready to post on ${r.src}. Nothing posts from the preview.`); });
    },
    inbox(m) {
      const R = reqs();
      const show = i => {
        const r = R[i], b = B[r.brand] || B.town;
        m.querySelectorAll(".reqrow").forEach(x => x.classList.toggle("on", Number(x.dataset.req) === i));
        $("#reqd").innerHTML = `<div class="cardline">${bubble(r.brand, 44)}<div><span class="s">${esc(b.name)} · ${esc(r.src || "Website")}</span><h2>${esc(r.name)}</h2></div>${statusPill(r.status)}</div>
          <div class="g3 kp"><div><b>${esc(r.what)}</b><span>What</span></div><div><b>${r.when ? fmt(String(r.when).slice(0, 10)) : "Flexible"}${r.time ? " · " + esc(r.time) : ""}</b><span>When</span></div><div><b>${esc(r.guests || "–")}</b><span>Guests</span></div></div>
          ${r.note ? `<p class="quote">“${esc(r.note)}”</p>` : ""}${r.total ? `<p class="s">Estimate ${esc(r.total)}</p>` : ""}
          <h3>Reply</h3><textarea id="reply" rows="5" class="ai-box">${esc(draftReply(r))}</textarea>
          <div class="row"><button class="hbtn ai" id="aiw">Rewrite with AI</button><button class="hbtn go" id="conf">Confirm and send</button><button class="hbtn">Suggest another date</button></div>
          <h3>The confirmation they get</h3>${confirmEmail(r)}`;
        $("#conf").onclick = async () => {
          if (r.id && APP.db) { try { await APP.db.collection("requests").doc(r.id).update({ status: "confirmed" }); } catch (e) {} }
          r.status = "confirmed"; APP.toast("Confirmation saved. Sending waits for your go-ahead in the live version.");
          show(i);
        };
        $("#aiw").onclick = () => aiRewrite(r);
      };
      m.querySelectorAll(".reqrow").forEach(x => x.onclick = () => show(Number(x.dataset.req)));
      show(0);
    },
    calendar(m) {
      drawHubCal();
      m.querySelectorAll("[data-go]").forEach(b => b.onclick = () => { sec = b.dataset.go; APP.go("center-" + sec); });
      $("#evform").onsubmit = async e => {
        e.preventDefault();
        const ev = { t: $("#ev-t").value.trim(), b: $("#ev-b").value, d: $("#ev-d").value, time: $("#ev-time").value };
        if (!ev.t || !ev.d) return;
        if (APP.db) { try { await APP.db.collection("events").add(Object.assign({}, ev, { at: new Date().toISOString() })); APP.toast("Published. It's on the town calendar now."); } catch (err) { APP.toast("Couldn't save. Try again."); } }
        else { APP.extraEvents.push(ev); APP.toast("Published to the town calendar."); }
        const nd = $("#evnudge"); if (nd) { nd.hidden = false; nd.querySelector("b").textContent = `Want the press to hear about ${ev.t}?`; }
        $("#ev-t").value = ""; drawHubCal();
      };
    },
    email(m) {
      const evs = APP.allEvents().filter(x => x.d >= D.today);
      const draw = () => { const e = evs[Number($("#em-ev").value)] || evs[0]; $("#townmail").innerHTML = townEmail(e, evs); $("#smsprev").innerHTML = `<div class="b">Bloomfield: ${esc(e.t)} at ${esc(B[e.b].name)}, ${fmt(e.d)} ${esc(e.time || "")}. Book: stayinbloomfield.com/${e.b} Reply STOP to opt out</div>`; };
      $("#em-ev").onchange = draw; draw();
      $("#sendem").onclick = () => APP.toast("Ready to send to 2,418 people. Nothing goes out from the preview.");
      $("#sendtx").onclick = () => APP.toast("Text ready for 1,106 numbers. Nothing goes out from the preview.");
      m.querySelectorAll("[data-send]").forEach(b => b.onclick = () => APP.toast(`${B[b.dataset.send].name} email is ready to send. Nothing goes out from the preview.`));
    },
    social(m) {
      const evs = APP.allEvents().filter(x => x.d >= D.today);
      const st = { b: "ernies", img: null, tpl: "classic", fmt: "sq" };
      const photos = k => {
        if (k === "town") return ["img/town/town-2.jpg?v=1793944505", "img/town/town-1.jpg?v=1793944505", "img/town/town-3.jpg?v=1793944505", "img/town/town-5.jpg?v=1793944505", "img/town/town-4.jpg?v=1793944505", "img/town/town-6.jpg?v=1793944505"];
        if (k === "stays") return window.STAYS.map(x => x.photos[0]).concat(window.STAYS[1].photos.slice(4, 6));
        const z = D.biz[k]; return [z.hero, ...z.gallery].filter((v, i, a) => a.indexOf(v) === i).slice(0, 8);
      };
      const fill = () => {
        const b = B[st.b], z = D.biz[st.b];
        const t = z ? z.theme : { head: st.b === "town" ? "#1d1a17" : "#2c3f4a", headInk: "#f4efe6", accent: st.b === "town" ? "#b08a3e" : "#50697a", display: "'Cormorant Garamond', Georgia, serif" };
        const logo = z && z.logo ? `<img src="${z.logo}" alt="">` : st.b === "town" || st.b === "stays" ? APP.logo("simple", "#f4efe6", "#d2ae63") : `<span class="pw-name">${esc(b.name)}</span>`;
        const h = $("#ph").value, w = $("#pw").value, c = $("#pc").value;
        $("#post").className = `post ${st.tpl} ${st.fmt}`;
        $("#post").style.cssText = `--ph:${t.head};--pi:${t.headInk};--pa:${t.accent};--pf:${t.display}`;
        $("#post").innerHTML = `<img class="pbg" src="${st.img}" alt="">
          <div class="plogo">${logo}</div>
          <div class="ptext"><span class="pwhen">${esc(w)}</span><h2>${esc(h)}</h2>${c ? `<span class="pcta">${esc(c)}</span>` : ""}</div>
          <div class="pfoot">${bubble(st.b, 26)}<span>stayinbloomfield.com</span></div>`;
        $("#psize").textContent = SIZES.find(z => z[0] === st.fmt)[2];
        if (!$("#allsizes").hidden) makeAll();
      };
      const makeAll = () => {
        const src = $("#post");
        $("#sizes").innerHTML = SIZES.map(z => `<figure class="size-card"><div class="size-box"><div class="post ${st.tpl} ${z[0]}" style="${src.style.cssText}">${src.innerHTML}</div></div>
          <figcaption><div><b>${z[1]}</b><span>${z[2]} · ${z[3]}</span></div><button class="hbtn" data-share="${z[1]}">Share</button></figcaption></figure>`).join("");
        $("#sizes").querySelectorAll("[data-share]").forEach(x => x.onclick = () => APP.toast(`${x.dataset.share} ready to share. Nothing posts from the preview.`));
      };
      $("#pall").onclick = () => { $("#allsizes").hidden = false; makeAll(); $("#allsizes").scrollIntoView({ behavior: "smooth", block: "start" }); };
      $("#shareall").onclick = () => APP.toast("All six sizes are ready: feed, story, text, email, cover and flyer. Nothing posts from the preview.");
      const setBrand = k => {
        st.b = k; m.querySelectorAll("[data-pb]").forEach(x => x.classList.toggle("on", x.dataset.pb === k));
        const ph = photos(k); st.img = ph[0];
        $("#pp").innerHTML = ph.map((src, i) => `<button type="button" data-pi="${src}" class="${i ? "" : "on"}"><img src="${src}" alt=""></button>`).join("");
        $("#pp").querySelectorAll("[data-pi]").forEach(x => x.onclick = () => { st.img = x.dataset.pi; $("#pp").querySelectorAll("button").forEach(y => y.classList.toggle("on", y === x)); fill(); });
        const e = evs.find(x => x.b === k);
        if (e) { $("#pe").value = String(evs.indexOf(e)); useEvent(e); } else { $("#pe").value = ""; $("#ph").value = k === "stays" ? "Stay a while in Bloomfield" : D.biz[k] ? D.biz[k].h1 : "Come see Taylorsville Road"; $("#pw").value = k === "town" ? "This weekend on Taylorsville Road" : ""; $("#pc").value = "Book on stayinbloomfield.com"; }
        fill();
      };
      const useEvent = e => { $("#ph").value = e.t; $("#pw").value = `${fmt(e.d, { weekday: "long", month: "long", day: "numeric" })} · ${e.time || ""}`; $("#pc").value = e.book ? (e.book === "tickets" ? "Get tickets" : "Book your spot") : "All are welcome"; };
      m.querySelectorAll("[data-pb]").forEach(x => x.onclick = () => setBrand(x.dataset.pb));
      $("#pe").onchange = () => { const e = evs[Number($("#pe").value)]; if (e) { if (e.b !== st.b && (D.biz[e.b] || e.b === "town")) { setBrand(e.b); $("#pe").value = String(evs.indexOf(e)); } useEvent(e); if (e.img) st.img = e.img; } fill(); };
      ["#ph", "#pw", "#pc"].forEach(q => $(q).oninput = fill);
      m.querySelectorAll("[data-pl]").forEach(x => x.onclick = () => { st.tpl = x.dataset.pl; m.querySelectorAll("[data-pl]").forEach(y => y.classList.toggle("on", y === x)); fill(); });
      m.querySelectorAll("[data-pf]").forEach(x => x.onclick = () => { st.fmt = x.dataset.pf; m.querySelectorAll("[data-pf]").forEach(y => y.classList.toggle("on", y === x)); fill(); });
      $("#ppost").onclick = () => APP.toast(`${SIZES.find(z => z[0] === st.fmt)[1]} ready to share. Nothing posts from the preview.`);
      $("#psched").onclick = () => APP.toast("Scheduled for Thursday at 9 AM, with the weekly email.");
      $("#pcap").onclick = () => { $("#pcaption").textContent = `${$("#ph").value}. ${$("#pw").value}. ${B[st.b].name} on Taylorsville Road in Bloomfield, Kentucky. ${$("#pc").value} at stayinbloomfield.com #StayInBloomfield #KentuckyBourbonTrail #NelsonCounty`; };
      setBrand("ernies");
    },
    tickets(m) {
      const G = [["Jen Mattingly", "General × 2", true], ["Travis Mudd", "VIP × 2", true], ["Ashley Thompson", "General × 10", false], ["Dan Coyle", "General × 1", true], ["Morgan Reed", "VIP × 4", false], ["Lisa Hardin", "General × 3", false], ["Cale Brooks", "General × 2", true], ["Hannah W. + band", "Guest list × 10", true], ["Kate Ellis", "VIP × 2", false], ["Sam Ortiz", "General × 1", false]];
      const draw = q => { $("#glist").innerHTML = G.filter(g => !q || g[0].toLowerCase().includes(q)).map((g, i) => `<label class="grow ${g[2] ? "in" : ""}"><input type="checkbox" data-g="${G.indexOf(g)}" ${g[2] ? "checked" : ""}><b>${esc(g[0])}</b><span>${esc(g[1])}</span><em>${g[2] ? "Checked in" : "Not yet"}</em></label>`).join(""); $("#glist").querySelectorAll("[data-g]").forEach(c => c.onchange = () => { G[c.dataset.g][2] = c.checked; draw($("#gsearch").value.toLowerCase()); }); };
      draw("");
      $("#gsearch").oninput = e => draw(e.target.value.toLowerCase());
      let n = 97;
      $("#scanbtn").onclick = () => { const g = G.find(x => !x[2]); if (g) { g[2] = true; $("#admit").innerHTML = `<b>Admitted</b><span>${esc(g[0])} · ${esc(g[1])}</span>`; n += Number((g[1].match(/× (\d+)/) || [0, 1])[1]); $("#inct").textContent = n; draw($("#gsearch").value.toLowerCase()); $("#admit").classList.remove("flash"); void $("#admit").offsetWidth; $("#admit").classList.add("flash"); } else APP.toast("Everyone's in."); };
      m.querySelectorAll("[data-guests]").forEach(b => b.onclick = () => { $("#glh").textContent = "Guest list · " + b.dataset.guests; $("#glist").scrollIntoView({ behavior: "smooth", block: "center" }); });
      $("#newtix").onclick = () => { $("#newtixform").hidden = false; $("#newtixform").scrollIntoView({ behavior: "smooth", block: "center" }); };
      $("#blastgo").onclick = () => APP.toast("Text ready for all 142 guests. Nothing sends from the preview.");
      $("#tx-go").onclick = () => { APP.toast("On sale. The ticket link is on the town calendar and the event's own page."); $("#newtixform").hidden = true; };
    },
    pr(m) {
      m.querySelectorAll("[data-sg]").forEach(x => x.onclick = () => { const i = x.dataset.sg, d = PR_IDEAS[i]; $("#sg-" + i).querySelector(".sg-acts").innerHTML = `<span class="pill ok">Scheduled · ${esc(d.send)}</span>`; APP.toast(`Press blast scheduled for ${d.send}. It waits for your go-ahead in the live version.`); });
      m.querySelectorAll("[data-sgp]").forEach(x => x.onclick = () => { const p = m.querySelector(".pitch"); p.scrollIntoView({ behavior: "smooth", block: "center" }); p.classList.add("flash-pitch"); setTimeout(() => p.classList.remove("flash-pitch"), 1200); });
      m.querySelectorAll("[data-sgx]").forEach(x => x.onclick = () => { $("#sg-" + x.dataset.sgx).remove(); });
      $("#prfind").onclick = () => APP.toast("Found 37 people. The best six are shown; the rest are in the list.");
      $("#pradd").onclick = () => APP.toast(`Added to ${$("#prlist").value}.`);
      $("#prsend").onclick = () => APP.toast("Pitch ready for 48 contacts. Nothing goes out from the preview.");
    },
    menus(m) {
      let mk = "ernies";
      const drawEdit = () => {
        const M = MENU_DATA[mk]();
        $("#medit").innerHTML = `<div class="medit-grid">${M.map((sct, si) => `<div><h3 style="margin-top:10px">${esc(sct.s)}</h3>${sct.items.map((it, ii) => `<div class="menuedit"><input class="hinput" value="${esc(it[0])}" data-mn="${si}-${ii}" aria-label="Item"><input class="hinput price" value="${esc(it[1])}" data-mi="${si}-${ii}" aria-label="Price"></div>`).join("")}</div>`).join("")}</div>`;
        $("#medit").querySelectorAll("[data-mn],[data-mi]").forEach(inp => inp.oninput = () => {
          const [a, c] = (inp.dataset.mn || inp.dataset.mi).split("-").map(Number); M[a].items[c][inp.dataset.mn ? 0 : 1] = inp.value;
          $("#pmenu").innerHTML = printedMenu(mk);
        });
        $("#pmenu").className = `pmenu ${(m.querySelector("[data-ms].on") || { dataset: { ms: "letter" } }).dataset.ms} pm-${mk}`;
        $("#pmenu").innerHTML = printedMenu(mk);
      };
      m.querySelectorAll("[data-mb]").forEach(b => b.onclick = () => { mk = b.dataset.mb; m.querySelectorAll("[data-mb]").forEach(x => x.classList.toggle("on", x === b)); drawEdit(); });
      drawEdit();
      m.querySelectorAll("[data-ms]").forEach(x => x.onclick = () => { m.querySelectorAll("[data-ms]").forEach(y => y.classList.toggle("on", y === x)); $("#pmenu").className = "pmenu " + x.dataset.ms + " pm-" + mk; });
      const sp = () => { const n = $("#sp-n").value, p = $("#sp-p").value, w = $("#sp-w").value, d = $("#sp-d").value;
        $("#sp-en").textContent = n; $("#sp-ew").textContent = w; $("#sp-ed").textContent = `${d} ${p}.`;
        $("#sp-tx").textContent = `Ernie's Tavern: ${w}, ${n}, ${p}. ${d} Reply TABLE to save a seat. Reply STOP to opt out`; };
      ["#sp-n", "#sp-p", "#sp-w", "#sp-d"].forEach(q => $(q).oninput = sp); sp();
      $("#tospecial").onclick = () => $("#special").scrollIntoView({ behavior: "smooth", block: "center" });
      $("#sp-email").onclick = () => APP.toast("Special ready for 2,418 people. Nothing goes out from the preview.");
      $("#sp-text").onclick = () => APP.toast("Text ready for 1,106 numbers. Nothing goes out from the preview.");
      $("#sp-post").onclick = () => APP.toast("Opened in the graphic editor, sized for every channel.");
      $("#mprint").onclick = () => APP.toast("Print-ready file made at the size you picked.");
      $("#mtext").onclick = () => APP.toast("Menu picture ready to text to the list. Nothing goes out from the preview.");
      $("#savemenu").onclick = async () => {
        if (APP.db) { try { await APP.db.doc("menus/" + mk).set({ sections: JSON.stringify(MENU_DATA[mk]()), at: new Date().toISOString() }); } catch (e) {} }
        APP.toast(`${B[mk].name} menu published to the website, Google and Yelp.`);
      };
    },
    shop(m) { window.SHOPADMIN_AFTER && window.SHOPADMIN_AFTER(m); },
    stays(m) { m.querySelectorAll("[data-edit-stay]").forEach(b => b.onclick = () => APP.toast("Opens the listing editor. Saves go to Airbnb and Vrbo together.")); },
  };

  function drawHubCal() {
    const el = $("#hcal"); if (!el) return;
    const y = 2026, mo = 11, first = new Date(y, mo - 1, 1).getDay(), days = 30;
    const evs = APP.allEvents();
    let h = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => `<div class="hd">${d}</div>`).join("");
    for (let i = 0; i < first; i++) h += "<div></div>";
    for (let d = 1; d <= days; d++) {
      const k = `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      h += `<div><span class="dn">${d}</span>${evs.filter(e => e.d === k).map(e => `<span class="e" style="background:${B[e.b].c};color:${B[e.b].ink}" title="${esc(e.t)}">${esc(e.t)}</span>`).join("")}</div>`;
    }
    el.innerHTML = `<div class="row" style="justify-content:space-between;margin-bottom:10px"><h2>November 2026</h2>${live()}</div><div class="hcal">${h}</div>`;
  }

  function draftReply(r) {
    const b = B[r.brand] || B.town, first = String(r.name).split(/[ &]/)[0];
    if (r.type === "venue" && r.brand === "revival") return `Hi ${first},\n\nCongratulations! May 22 is open at Revival Hall and I've put a hold on it for you. For ${r.guests} guests we can do the ceremony in the sanctuary and the reception in the hall.\n\nWe can also hold all four of our homes for family, and The Velvet Room for the rehearsal dinner. Want to come see it? I have Saturday at 11 or 2.\n\nThe Revival Hall team`;
    if (r.type === "plan") return `Hi ${first},\n\nWhat a fun weekend to plan! For 10 in June, I'd put you in The Clayborn House and Boone's Cabin, a few minutes apart. Friday is a private tea party, Saturday a bourbon tasting, then Ernie's with your own DJ.\n\nI've attached the itinerary. Want me to hold the dates?`;
    if (r.type === "tea") return `Hi ${first},\n\nYou're all set for tea on ${r.what} at ${r.time} for ${r.guests}. We'll have the window table ready and a little something for the birthday girl.\n\nSee you Wednesday!`;
    return `Hi ${first},\n\nThank you for booking with ${b.name}. You're confirmed for ${r.what}${r.guests ? " for " + r.guests : ""}. We can't wait to see you in Bloomfield.`;
  }
  async function aiRewrite(r) {
    const box = $("#reply"); if (!box) return;
    try {
      const sample = window.claude && window.claude.use ? await window.claude.use("sample") : null;
      if (!sample) { APP.toast("AI drafting runs in the live version."); return; }
      box.classList.add("thinking");
      const res = await sample(`You write short, warm replies for small businesses in Bloomfield, Kentucky. US English, no long dashes, under 110 words, sign off as the team. Rewrite this reply so it sounds personal and offers one helpful add-on from another business in town (Ernie's Tavern, Miss Merrifield's Tea Parlor, Nettie Jarvis bourbon tastings, Rowdy's, the four stays).\n\nRequest: ${JSON.stringify({ business: (B[r.brand] || B.town).name, what: r.what, when: r.when, guests: r.guests, note: r.note })}\n\nCurrent draft:\n${box.value}\n\nReturn only the new reply.`, { modelTier: "quick", onText: ({ text }) => { box.value = text; } });
      box.value = String(res.text || box.value).replace(/[—–]/g, ", ");
    } catch (e) { APP.toast(e && e.code === "not_granted" ? "AI drafting needs permission in this view." : "AI drafting is busy. Try again."); }
    finally { box.classList.remove("thinking"); }
  }

  function confirmEmail(r) {
    const b = B[r.brand] || B.town, biz = D.biz[r.brand];
    const img = biz ? biz.hero : (window.STAYS.find(s => s.title === r.what) || window.STAYS[0]).photos[0];
    return `<div class="email" style="--ec:${b.c};--ei:${b.ink}">
      <div class="eh" style="background:${b.c}">${biz && biz.logo ? `<img src="${biz.logo}" alt="">` : `<span class="ewm" style="color:${b.ink}">${esc(b.name)}</span>`}</div>
      <img class="ehero" src="${img}" alt="">
      <div class="eb"><h4>${r.type === "venue" ? "Your date is held." : "You're confirmed."}</h4>
        <div class="erow"><span>What</span><b>${esc(r.what)}</b></div><div class="erow"><span>When</span><b>${r.when ? fmt(String(r.when).slice(0, 10), { weekday: "long", month: "long", day: "numeric" }) : "We'll set it together"}${r.time ? " at " + esc(r.time) : ""}</b></div><div class="erow"><span>Guests</span><b>${esc(r.guests || "")}</b></div>
        <a class="ecta" style="background:${b.c};color:${b.ink}">Add to calendar</a>
        <p class="esmall">While you're in town: supper at Ernie's, tea at Miss Merrifield's, a bourbon flight at Nettie Jarvis.</p></div></div>`;
  }
  // the three menus Town Center edits; Ernie's and the Double Dip are their published prices, the tea menu is a sample
  const MENU_DATA = {
    ernies: () => D.biz.ernies.menu,
    doubledip: () => DD_MENU,
    merrifield: () => MM_MENU,
  };
  const DD_MENU = [
    { s: "Cones & Cups", items: [["Cup, single", "4.75", "Double $7.20 · Kids $3.00"], ["Sugar cone", "5.10", "Double $7.35"], ["Cake cone", "5.00", "Double $7.15"], ["Waffle cone", "5.50", "Double $7.75"]] },
    { s: "From the Fountain", items: [["Milkshake", "7.75", "Topped with whipped cream and a cherry"], ["Malt", "8.00", ""], ["Float", "7.00", ""], ["Add a scoop of protein", "2.00", "Chocolate whey or peanut butter"]] },
    { s: "Sundaes", items: [["Hot Fudge Sundae", "6.50", "Whipped cream, pecans and a cherry"], ["Banana Split", "8.25", "Strawberry, chocolate and vanilla, three toppings"]] },
    { s: "Today's Flavors", items: [["Bourbon Ball", "", ""], ["Pumpkin", "", "Seasonal"], ["Black Raspberry Chocolate Chip", "", ""], ["Salted Caramel", "", ""], ["Cinnamon", "", "Seasonal"], ["Madagascar Vanilla Bean", "", ""]] },
  ];
  const MM_MENU = [
    { s: "Afternoon Tea", items: [["The Parlor Tea", "38", "Three tiers: warm scones with clotted cream and jam, tea sandwiches, little sweets. A pot of tea."], ["Cream Tea", "18", "Two scones, clotted cream, jam and a pot of tea"], ["Children's Tea", "24", "For our youngest guests, with pink lemonade"]] },
    { s: "Something Stronger", items: [["Bourbon Tea", "45", "The Parlor Tea with a southern peach tea made with bourbon"], ["A glass of sherry or champagne", "9", ""]] },
    { s: "Our Teas", items: [["Earl Grey", "", ""], ["English Breakfast", "", ""], ["Rose Garden", "", ""], ["Kentucky Peach", "", ""], ["Chamomile", "", "Caffeine free"]] },
  ];
  function printedMenu(k) {
    k = k || "ernies";
    const z = D.biz[k], M = MENU_DATA[k]();
    const foot = { ernies: ["Vintage bowling · $6.50 a game", "Live music four nights a week"], doubledip: ["Look for the big neon cone", "Parties welcome"], merrifield: ["Wednesdays & Thursdays, 12 to 4", "Reservations (502) 252-9647"] }[k];
    return `<div class="pm-head" style="background:${z.theme.head}"><img src="${z.logo}" alt="${esc(B[k].name)}"><span>${esc(z.addr)} · Bloomfield, Kentucky</span></div>
      <div class="pm-body">${M.map(s => `<section><h5>${esc(s.s)}</h5>${s.items.map(i => `<div class="pm-i"><b>${esc(i[0])}</b><i></i><span>${i[1] ? "$" + esc(i[1]) : ""}</span>${i[2] ? `<em>${esc(i[2])}</em>` : ""}</div>`).join("")}</section>`).join("")}</div>
      <div class="pm-foot" style="background:${z.theme.accent}"><span>${foot[0]}</span><span>${foot[1]}</span></div>`;
  }
  // a QR-style code drawn from the ticket number (a stand-in for the real code the ticketing system issues)
  function qr(seed, px) {
    const N = 25; let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const r = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 4294967296);
    let cells = "";
    const finder = (x, y) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!finder(x, y) && r() < 0.48) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    const eye = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
    return `<svg class="qr" viewBox="-2 -2 ${N + 4} ${N + 4}" width="${px}" height="${px}" role="img" aria-label="Ticket QR code"><rect x="-2" y="-2" width="${N + 4}" height="${N + 4}" fill="#fff"/><g fill="#111">${cells}${eye(0, 0)}${eye(N - 7, 0)}${eye(0, N - 7)}</g></svg>`;
  }
  function ticketCard() {
    const z = D.biz.rowdys, t = z.theme;
    return `<div class="ticket" style="--th:${t.head};--ti:${t.headInk};--ta:${t.accent}">
      <div class="tk-top"><img src="${z.logo}" alt="Rowdy's"><span>Admit 2 · General</span></div>
      <img class="tk-img" src="img/rowdys/03-porch.jpg?v=1793944505" alt="">
      <div class="tk-body"><b>Saturday Dance Night</b><span>Saturday, November 7 · Doors 7 PM</span><span>101 Fairfield Hill Road, Bloomfield</span></div>
      <div class="tk-qr">${qr("ROWDYS-DN-1107-0142", 132)}<span>Jen Mattingly · #0142</span></div>
      <div class="tk-foot">Add to Apple Wallet · Add to Google Wallet</div></div>`;
  }

  // the town letter: Bloomfield, Kentucky across the top, the weekend's events below
  function townEmail(e, evs) {
    const more = evs.filter(x => x !== e).slice(0, 4);
    return `<div class="email town-mail">
      <div class="eh tm-head">${APP.logo("simple", "#f4efe6", "#d2ae63")}</div>
      <img class="ehero wide" src="${D.biz[e.b] ? D.biz[e.b].hero : D.town.hero}" alt="">
      <div class="eb"><span class="ek">This weekend in Bloomfield</span><h4>${esc(e.t)}</h4>
        <p style="text-align:center">${fmt(e.d, { weekday: "long", month: "long", day: "numeric" })} · ${esc(e.time || "")} · ${esc(B[e.b].name)}</p>
        <a class="ecta" style="background:#7b3b2c;color:#f4efe6">${e.book ? "Save my spot" : "See what's on"}</a>
        <div class="emore">${more.map(x => `<div>${bubble(x.b, 26)}<span><b>${esc(x.t)}</b> ${fmt(x.d)} · ${esc(B[x.b].name)}</span></div>`).join("")}</div>
        <p class="esmall">Taylorsville Road · Bloomfield, Kentucky</p></div></div>`;
  }
  // one email per business, each in its own colors, type and logo
  const BRAND_MAIL = [
    { b: "nettie", k: "New on the shop floor", h: "Fresh off the truck this week", p: "One of a kind, and gone when they're gone.", cta: "Shop now", img: "img/nettie/03-iw-harper-display.jpg?v=1793944505",
      products: [["img/nettie/products/cherry-corner-cupboard-10688.jpg?v=1793944505", "Cherry corner cupboard", "$1,850"], ["img/nettie/products/rose-medallion-plates-6891.jpg?v=1793944505", "Rose Medallion plates", "$420"], ["img/nettie/05-bourbon-tin-horse.jpg?v=1793944505", "Bourbon tin horse", "$145"]] },
    { b: "ernies", k: "Live at Ernie's", h: "Friday: The Bourbon Barrel Boys", p: "Supper at six, the band at eight, lanes all night.", cta: "Reserve a table", img: "img/ernies/06-lanes-and-dining.jpg?v=1793944505" },
    { b: "merrifield", k: "Tea time", h: "Christmas Tea is booking now", p: "Saturday, December 12. Scones, carols and a glass of sherry.", cta: "Reserve tea", img: "img/merryfield/02-tea-service.jpg?v=1793944505" },
    { b: "rowdys", k: "This Saturday", h: "Boots on. It's dance night.", p: "Line-dance lesson at seven, the band at eight.", cta: "Get tickets", img: "img/rowdys/03-porch.jpg?v=1793944505" },
    { b: "velvet", k: "Private events", h: "Hold your holiday party in velvet", p: "Al Capone's back bar, a full kitchen, and the room to yourselves.", cta: "Check dates", img: "img/velvet/02-bar-mirror.jpg?v=1793944505" },
    { b: "doubledip", k: "On the board", h: "Pumpkin is back", p: "Cinnamon too. Shakes take a scoop of protein for two dollars.", cta: "See today's flavors", img: "img/doubledip/01-banana-split.jpg?v=1793944505" },
  ];
  function brandEmail(m) {
    const biz = D.biz[m.b], t = biz.theme, br = B[m.b];
    return `<figure class="bmail"><div class="email" style="--mbg:${t.bg};--mink:${t.ink};--macc:${t.accent};--mfont:${t.display}">
      <div class="eh" style="background:${t.head}"><img src="${biz.logo}" alt="${esc(br.name)}"></div>
      <img class="ehero" src="${m.img}" alt="">
      <div class="eb"><span class="ek">${esc(m.k)}</span><h4>${esc(m.h)}</h4><p>${esc(m.p)}</p>
        ${m.products ? `<div class="eshop">${m.products.map(x => `<div><img src="${x[0]}" alt=""><b>${esc(x[1])}</b><span>${x[2]}</span></div>`).join("")}</div>` : ""}
        <a class="ecta" style="background:${t.accent};color:${m.b === "velvet" ? "#171214" : "#fff"}">${esc(m.cta)}</a>
        <p class="esmall">${esc(biz.addr)} · Part of Stay in Bloomfield</p></div></div>
      <figcaption>${bubble(m.b, 26)}<span>${esc(br.name)}</span><button class="hbtn go" data-send="${m.b}">Send to list</button></figcaption></figure>`;
  }

  function eventEmail(e) {
    const b = B[e.b], biz = D.biz[e.b];
    return `<div class="email"><div class="eh" style="background:${b.c}">${biz && biz.logo ? `<img src="${biz.logo}" alt="">` : `<span class="ewm" style="color:${b.ink}">${esc(b.name)}</span>`}</div>
      <img class="ehero" src="${e.img || (biz ? biz.hero : D.town.hero)}" alt="">
      <div class="eb"><span class="ek">${fmt(e.d, { weekday: "long", month: "long", day: "numeric" })} · ${esc(e.time || "")}</span><h4>${esc(e.t)}</h4>
      <p style="text-align:center">At ${esc(b.name)} on Taylorsville Road. Come early, stay for supper.</p>
      <a class="ecta" style="background:${b.c};color:${b.ink}">${e.book ? "Save my spot" : "See the details"}</a>
      <div class="emore">${APP.allEvents().filter(x => x.d >= D.today && x !== e).slice(0, 3).map(x => `<div>${bubble(x.b, 22)}<span><b>${esc(x.t)}</b> ${fmt(x.d)}</span></div>`).join("")}</div></div></div>`;
  }

  APP.views.center = { render };
  document.addEventListener("bf-db", () => { if (location.hash.startsWith("#center")) APP.render(true); });
})();
