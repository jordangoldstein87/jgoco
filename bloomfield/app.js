/* Stay in Bloomfield preview: router, the town site, the sister sites, stays, calendar,
   booking sheets and the weekend planner. Town Center, the shop, the brand deck and the
   notes layer live in their own files and register views on window.APP. */
(function () {
  const D = window.BF, B = D.brands;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = s => new Date(s + "T12:00:00");
  const fmt = (s, o) => day(s).toLocaleDateString("en-US", o || { weekday: "short", month: "short", day: "numeric" });
  const money = n => "$" + Math.round(n).toLocaleString("en-US");

  // Each business has three marks: its logo (in a pill of its color), a color dot beside its name,
  // and a simple drawn icon on a circle of its color.
  const ICON = {
    nettie: '<circle cx="7.5" cy="12" r="3.5"/><path d="M11 12h10M17 12v3M20 12v2.5"/>',
    ernies: '<path d="M12 3c1.6 0 2.2 1.4 2 3-.2 1.3-1 2-1 3 0 1.4 2.5 3 2.5 6.5 0 3-1.6 5.5-3.5 5.5S8.5 18.5 8.5 15.5C8.5 12 11 10.4 11 9c0-1-.8-1.7-1-3-.2-1.6.4-3 2-3z"/><path d="M10.6 7.5h2.8"/>',
    doubledip: '<circle cx="12" cy="5.8" r="2.8"/><path d="M8.4 10.6a3.6 3.6 0 0 1 7.2 0"/><path d="M8 10.6h8L12 21z"/>',
    merrifield: '<path d="M6 10h10v4.5A4.5 4.5 0 0 1 11.5 19h-1A4.5 4.5 0 0 1 6 14.5z"/><path d="M16 11.2c2.2 0 3 1.2 3 2.3s-1.2 2.2-3.2 2.3M6 12 3 9.5"/><path d="M8.5 10a2.5 2.5 0 0 1 5 0M11 6.5v1"/>',
    pinkhouse: '<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
    velvet: '<path d="M5 5h14c0 4-3.2 6.5-7 6.5S5 9 5 5z"/><path d="M12 11.5V19M8.5 19h7"/>',
    rowdys: '<path d="M3 15c2 1.6 5 2.4 9 2.4s7-.8 9-2.4"/><path d="M7 15.5c0-4 1.2-8.5 2.6-8.5 1 0 1.4 1 2.4 1s1.4-1 2.4-1c1.4 0 2.6 4.5 2.6 8.5"/>',
    revival: '<path d="M12 2v3M10.8 3.3h2.4"/><path d="M9 11 12 5l3 6"/><path d="M8.5 11h7v10h-7z"/><path d="M11 21v-3.5a1 1 0 0 1 2 0V21"/>',
    stays: '<path d="M3.5 11.5 12 4.5l8.5 7"/><path d="M5.5 10v10h13V10"/><path d="M15.5 7V4.5h2V8.6"/><path d="M10 20v-4.5h4V20"/>',
    town: '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C10 8 10.4 4 12 4s2 4 0 6.4zM13.5 11.5c2.6-1.6 6.3-.4 5.8 1.2s-4.5 1.4-5.8-1.2zM12.9 13.4c1.3 2.8.2 6.4-1.4 6.1s-1.6-4.1 1.4-6.1zM11 13.4c-1.4 2.7-5.3 3-5.4 1.4s3.2-3 5.4-1.4zM10.5 11.5c-2.9-.6-4.4-4.3-2.8-4.9s3.6 2.3 2.8 4.9z"/>',
    partner: '<path d="m12 4 2.3 4.9 5.2.6-3.9 3.6 1.1 5.2L12 15.7l-4.7 2.6 1.1-5.2-3.9-3.6 5.2-.6z"/>',
  };
  function bubble(key, size) {
    const b = B[key] || B.town, sz = size || 30;
    if (sz < 40) return `<span class="bdot b-${key || "town"}" style="--bc:${b.c};--bs:${sz}px" title="${esc(b.name)}"></span>`;
    return markIcon(key, sz);
  }
  // the icon: each business's logo, simplified to a monogram in its own lettering (Velvet Room's real
  // monogram, Merrifield's teapot); the stays, the town and Revival Hall get simple drawn icons
  const MARK_IMG = { revival: "img/revival/mark.png?v=1793944505", velvet: "img/velvet/logo-monogram-clear.png?v=1793944505", merrifield: "img/merryfield/teapot.png?v=1793944505" };
  function markIcon(key, sz) {
    const b = B[key] || B.town;
    // the town's icon is the brand deck's bloom: cream petals, gold center, on brick
    if (key === "town" || !key) return `<span class="bicon b-town" style="--bc:#7b3b2c;--bs:${sz}px" title="${esc(b.name)}"><svg viewBox="0 0 68 68" aria-hidden="true">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="34" cy="20" rx="9" ry="17" fill="none" stroke="#f4efe6" stroke-width="3" transform="rotate(${a} 34 36)"/>`).join("")}<circle cx="34" cy="36" r="6" fill="#e7c27a"/></svg></span>`;
    if (MARK_IMG[key]) return `<span class="bicon img b-${key}" style="--bc:${key === "merrifield" ? "#823f49" : b.c};--bs:${sz}px" title="${esc(b.name)}"><img src="${MARK_IMG[key]}" alt=""></span>`;
    if (["stays", "town", "revival", "partner"].includes(key) || !b.font) return `<span class="bicon b-${key}" style="--bc:${b.c};--bi:${b.ink};--bs:${sz}px" title="${esc(b.name)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[key] || ICON.town}</svg></span>`;
    return `<span class="bicon mono b-${key}" style="--bc:${b.c};--bi:${b.ink};--bs:${sz}px" title="${esc(b.name)}"><i style="font:${b.fst || "normal"} ${b.fw || 400} calc(${sz}px * ${b.scale || .46})/1 '${b.font}', Georgia, serif">${esc(b.mono)}</i></span>`;
  }
  // logo pill: the name-only logo on the brand's own color
  const PILL = { nettie: ["img/nettie/logo-name.png?v=1793944505", "#1f3a2b"], ernies: ["img/ernies/logo-name.png?v=1793944505", "#003f21"], doubledip: ["img/doubledip/logo-pill.png?v=1793944505"], merrifield: ["img/merryfield/logo-name.png?v=1793944505", "#823f49"], pinkhouse: ["img/pinkhouse/logo-rose.png?v=1793944505", "#f0c2c8"], velvet: ["img/velvet/logo-pill.png?v=1793944505", "#5a1f2a"], rowdys: ["img/rowdys/logo-name.png?v=1793944505", "#4a2c17"], revival: ["img/revival/logo-pill.png?v=1793944505", "#a2442c"] };
  // each logo in its own brand color, for light backgrounds
  const LOGO_INK = { nettie: "#1f3a2b", ernies: "#003f21", merrifield: "#823f49", pinkhouse: "#b25466", velvet: "#5a1f2a", rowdys: "#4a2c17", revival: "#a2442c" };
  const SIGN = { pinkhouse: "img/pinkhouse/logo-sign-pink.png?v=1793944505", doubledip: "img/doubledip/logo-sign-red.png?v=1793944505" };
  // town partners with a real logo of their own
  const PLACE_SIGN = { pizza: "img/pizza/logo.png?v=1793944505" };
  // plain labels on the map: shorter names, and a little house for the homes
  const PIN_NAME = { clayborn: "Clayborn House" }, PIN_HOME = ["clayborn", "depot", "boones", "allies"], PIN_AWAY = { boones: "5 min", allies: "5 min" };
  const HOME_SVG = `<svg class="pn-home" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>`;
  function pill(key) {
    const z = D.biz[key]; if (!z || !z.logo) return null;
    const o = PILL[key] || [];
    return { src: o[0] || z.logo, bg: o[1] || z.theme.head, sc: o[2] || 1 };
  }
  // a little round crop of the town painting, centered on one place; links to the map
  function miniMap(key, size) {
    const xy = D.paintedPins[key]; if (!xy) return "";
    const zx = 3.4, zy = zx / 1.5, at = (v, z) => Math.max(0, Math.min(100, (v / 100 * z - .5) / (z - 1) * 100)).toFixed(1);
    return `<a class="minimap" href="#map" data-mapto="${key}" style="--mm:${size || 104}px;background-size:${zx * 100}% auto;background-position:${at(xy[0], zx)}% ${at(xy[1], zy)}%" title="Find it on the town map" aria-label="Find it on the town map"><span class="mm-pin"></span></a>`;
  }
  function markLogo(key, h) {
    const b = B[key] || B.town, z = D.biz[key];
    const pl = pill(key), src = pl && pl.src, ih = pl ? Math.round((h || 18) * pl.sc) : 0;
    return src ? `<span class="blogo" style="--bc:${pl.bg};--lh:${h || 18}px;--ih:${ih}px"><img src="${src}" alt="${esc(b.name)}"></span>` : `<span class="blogo txt" style="--bc:${b.c};--bi:${b.ink};--lh:${h || 18}px">${esc(b.name)}</span>`;
  }

  if (/[?&]cap\b/.test(location.search)) {
    document.documentElement.classList.add("cap");
    // ?cap&to=pk starts a screenshot at that section by hiding the ones above it
    const to = new URLSearchParams(location.search).get("to");
    if (to) setTimeout(() => { const el = document.querySelector("." + to); if (el) { let p = el.previousElementSibling; while (p) { p.style.display = "none"; p = p.previousElementSibling; } } }, 600);
  }
  // shared state the other files read and add to
  const APP = window.APP = { views: {}, db: null, user: null, extraEvents: [], requests: [], bubble, markIcon, markLogo, pill, miniMap, esc, money, fmt, day, D, toast, sheet, go };

  /* ---------- runtime: shared store for events, requests and notes ---------- */
  (async () => {
    try {
      const c = window.claude; if (!c || !c.use) return;
      const db = await c.use("db"); if (!db) return;
      APP.db = db; APP.user = await c.use("user");
      db.collection("events").onSnapshot(s => { APP.extraEvents = s.docs.map(d => Object.assign({ id: d.id, live: true }, d.data())); rerenderIf(["calendar", "town", "center"]); }, () => {});
      db.collection("requests").orderBy("at", "desc").limit(60).onSnapshot(s => { APP.requests = s.docs.map(d => Object.assign({ id: d.id }, d.data())); rerenderIf(["center"]); }, () => {});
      document.dispatchEvent(new CustomEvent("bf-db"));
    } catch (e) { /* the preview works without the store */ }
  })();
  function rerenderIf(list) { if (list.includes(route().v)) render(true); }

  function allEvents() {
    return [...D.events, ...APP.extraEvents.filter(e => e.d && e.t)].sort((a, b) => a.d.localeCompare(b.d) || String(a.time).localeCompare(String(b.time)));
  }
  APP.allEvents = allEvents;

  /* ---------- router ---------- */
  // the town's own pages down the left; the businesses' sites across the top
  const LEFT = [
    ["town", "Town", "M3 11l9-7 9 7v9H3z"], ["story", "Revival", "M4 20h16M6 20V10l6-5 6 5v10M10 20v-5h4v5M12 5V2", "sub"], ["calendar", "Calendar", "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4"], ["music", "Live music", "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"], ["plan", "Plan a weekend", "M12 3l2.6 5.6 6 .8-4.4 4.2 1 6L12 16.8 6.8 19.6l1-6L3.4 9.4l6-.8z"],
    ["stays", "Stay", "M3 18V8M3 14h18v4M21 18v-6a3 3 0 0 0-3-3h-7v5"], ["gap"], ["brand", "Brand", "M12 3a9 9 0 1 0 0 18c1 0 1.5-.6 1.5-1.4 0-1.2-1-1.6-1-2.6 0-.9.7-1.5 1.6-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5zM7.5 11.5h.01M10 7.5h.01M15 7.5h.01"],
    ["center", "Town Center", "M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6", "tc"],
  ];
  const TOP = [["nettie", "Nettie Jarvis"], ["ernies", "Ernie's"], ["doubledip", "Double Dip"], ["merrifield", "Miss Merrifield's"], ["pinkhouse", "Pink House"], ["velvet", "Velvet Room"], ["rowdys", "Rowdy's"], ["revival", "Revival Hall"]];
  function route() {
    const h = (location.hash || "").slice(1) || "welcome";
    if (h.startsWith("stay-")) return { v: "stay", id: h.slice(5), key: h };
    if (h.startsWith("center-")) return { v: "center", id: h.slice(7), key: h };
    if (D.biz[h]) return { v: "site", id: h, key: h };
    return { v: h, key: h };
  }
  // the header: logo, the town's pages, Our places (a dropdown of every business), Shop, and Brand / Town Center for the owner
  const HD_LINKS = [["town", "Town"], ["story", "Revival"], ["calendar", "Calendar"], ["music", "Live music"], ["plan", "Plan a weekend"], ["stays", "Stay"]];
  const HD_FOR = [["brand", "Brand"], ["center", "Town Center"]];
  const CHEV = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>`;
  function placeTiles() {
    return `<div class="pd-grid">${TOP.map(([k]) => { const pl = pill(k), z = D.biz[k]; return `<a class="pd-item" href="#${k}" style="--bc:${pl.bg};--bi:${k === "pinkhouse" ? B[k].ink : "#fff6ea"}"><img src="${pl.src}" alt="${esc(B[k].name)}"><span>${esc(z ? z.kind : "")}</span></a>`; }).join("")}</div>`;
  }
  function renderHeader(cur) {
    const logo = $("#hd-logo"); if (logo && !logo.innerHTML && APP.logo) logo.innerHTML = APP.logo("site", "#3a1d14", "#9c5a26");
    const isPlace = !!D.biz[cur];
    $("#hd-links").innerHTML = HD_LINKS.map(([k, t]) => `<a href="#${k}" class="${cur === k ? "on" : ""}">${t}</a>`).join("")
      + `<button type="button" id="places-btn" class="${isPlace ? "on" : ""}" aria-expanded="false">Our places ${CHEV}</button><a href="#shop" class="${cur === "shop" ? "on" : ""}">Shop</a>`;
    $("#hd-right").innerHTML = HD_FOR.map(([k, t]) => `<a href="#${k}" class="${cur === k ? "on" : ""}">${t}<em>Just for you</em></a>`).join("");
    const dd = $("#places-dd"); dd.innerHTML = placeTiles(); dd.hidden = true;
    $("#places-btn").onclick = e => { e.stopPropagation(); dd.hidden = !dd.hidden; e.currentTarget.setAttribute("aria-expanded", String(!dd.hidden)); };
    const m = $("#mnav"); m.hidden = true;
    m.innerHTML = `<div class="mnav-top">${APP.logo ? APP.logo("site", "#3a1d14", "#9c5a26") : ""}<button type="button" data-mclose aria-label="Close menu">×</button></div>
      <div class="mnav-links">${HD_LINKS.concat([["shop", "Shop"]]).map(([k, t]) => `<a href="#${k}" class="${cur === k ? "on" : ""}">${t}</a>`).join("")}</div>
      <h4>Our places</h4>${placeTiles()}<h4>Just for you</h4><div class="mnav-for">${HD_FOR.map(([k, t]) => `<a href="#${k}">${t}<em>Just for you</em></a>`).join("")}</div>`;
    m.querySelector("[data-mclose]").onclick = () => { m.hidden = true; document.body.style.overflow = ""; };
    m.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { m.hidden = true; document.body.style.overflow = ""; }));
  }
  document.addEventListener("click", e => { const dd = $("#places-dd"); if (dd && !dd.hidden && !e.target.closest("#places-dd, #places-btn")) { dd.hidden = true; const b = $("#places-btn"); b && b.setAttribute("aria-expanded", "false"); } });
  function go(h) { if (location.hash.slice(1) === h) render(); else location.hash = h; }
  function tabs() {
    const r = route(), cur = r.v === "site" ? r.id : r.v === "stay" ? "stays" : r.v;
    const logo = $("#lnav-logo");
    if (logo && !logo.innerHTML && APP.logo) logo.innerHTML = `<span class="full">${APP.logo("site", "#f4efe6", "#e7c27a")}</span><span class="mini"><svg viewBox="0 0 68 68" width="46" height="46" aria-label="Stay in Bloomfield">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="34" cy="20" rx="9" ry="17" fill="none" stroke="#f4efe6" stroke-width="2.4" transform="rotate(${a} 34 36)"/>`).join("")}<circle cx="34" cy="36" r="5.5" fill="#e7c27a"/></svg></span>`;
    renderHeader(cur);
    $("#lnav-links").innerHTML = LEFT.map(t => t[0] === "gap" ? `<span class="gap"></span>` : `<a href="#${t[0]}" class="${t[3] || ""} ${cur === t[0] ? "on" : ""}" title="${t[1]}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${t[2]}"/></svg><span>${t[1]}${t[0] === "brand" || t[0] === "center" ? `<em class="justyou">Just for you</em>` : ""}</span></a>`).join("");
    $("#tabs").innerHTML = TOP.map(t => t[2] ? `<a href="#${t[0]}" class="${t[2]} ${cur === t[0] ? "on" : ""}">${t[1]}</a>` : `<a href="#${t[0]}" class="logo-tab ${cur === t[0] ? "on" : ""}" data-nk="${t[0]}" aria-label="${esc(t[1])}">${markLogo(t[0], 16)}</a>`).join("");
    $("#shop-link").classList.toggle("on", cur === "shop");
    const on = $("#tabs a.on"); if (on) on.scrollIntoView({ inline: "nearest", block: "nearest" });
    // ?cap&rail keeps the side menu collapsed, for the opening video's desktop shots
    document.body.classList.toggle("rail", r.v === "center" || /[?&]cap\b.*\brail\b/.test(location.search));
    document.body.classList.remove("lnav-open"); const sc = $(".lnav-scrim"); if (sc) sc.remove();
  }
  function navOver() {
    const h = document.querySelector("#view .hero, #view .shero, #view .cal-hero");
    document.body.classList.toggle("nav-over", !!h && h.getBoundingClientRect().bottom > 90);
  }
  addEventListener("scroll", navOver, { passive: true });
  document.addEventListener("bf-render", () => requestAnimationFrame(navOver));
  // hovering a business icon in the top bar opens its logo and a one-line description
  let navCard = null;
  document.addEventListener("mouseover", e => {
    const a = e.target.closest("[data-nk]");
    if (!a) return;
    const k = a.dataset.nk, z = D.biz[k];
    if (!navCard) { navCard = document.createElement("div"); navCard.className = "navcard"; document.body.appendChild(navCard); }
    navCard.innerHTML = `<b>${esc(B[k].name)}</b><span>${esc(z ? z.kind : "")}</span>`;
    const r = a.getBoundingClientRect();
    navCard.style.left = Math.max(12, Math.min(innerWidth - 252, r.left + r.width / 2 - 120)) + "px";
    navCard.style.top = (r.bottom + 10) + "px";
    navCard.classList.add("on");
  });
  document.addEventListener("mouseout", e => { if (navCard && e.target.closest("[data-nk]") && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("[data-nk]"))) navCard.classList.remove("on"); });
  addEventListener("scroll", () => navCard && navCard.classList.remove("on"), { passive: true });

  document.addEventListener("click", e => {
    if (e.target.closest("#menu-btn")) {
      const m = $("#mnav"); if (m) { m.hidden = false; document.body.style.overflow = "hidden"; return; }
      document.body.classList.add("lnav-open");
      const sc = document.createElement("div"); sc.className = "lnav-scrim"; sc.onclick = () => { document.body.classList.remove("lnav-open"); sc.remove(); }; document.body.appendChild(sc);
    }
  });
  // the faux address bar is gone; each site's own domain is explained once, in the opening deck
  function addr() { const a = $("#addr"); if (a) a.innerHTML = ""; }


  let mapApi = null;
  function render(soft) {
    const r = route(); tabs();
    const v = $("#view");
    const y = soft ? scrollY : 0;
    mapApi = null; clearInterval(heroTimer);
    document.body.classList.toggle("welcome", r.v === "welcome");
    if (r.v !== "welcome") fadeAudio(0.8);
    if (r.v === "welcome") { addr(""); v.innerHTML = welcomeView(); afterWelcome(); }
    else if (r.v === "town") { addr("stayinbloomfield.com", "The town's home"); v.innerHTML = townView(); afterTown(); if (tourNext) { tourNext = false; showTour(); } }
    else if (r.v === "story") { addr("stayinbloomfield.com/revival", "How the town came back"); v.innerHTML = storyView(); }
    else if (r.v === "calendar") { addr("stayinbloomfield.com/calendar", "One calendar for the whole town"); v.innerHTML = calendarView(); afterCalendar(); }
    else if (r.v === "music") { addr(""); v.innerHTML = musicView(); afterMusic(); }
    else if (r.v === "plan") { addr("stayinbloomfield.com/plan", "Special feature"); v.innerHTML = planView(); afterPlan(); }
    else if (r.v === "stays") { addr("stayinbloomfield.com/stay", "Booked right on the site"); v.innerHTML = staysView(); }
    else if (r.v === "stay") { addr("stayinbloomfield.com/stay/" + r.id, "Booked right on the site"); v.innerHTML = stayView(r.id); afterStay(r.id); }
    else if (r.v === "site") { addr(B[r.id].url, "Its own website, same family"); v.innerHTML = siteView(r.id); afterSite(r.id); }
    else if (APP.views[r.v]) { addr(r.v === "center" ? "towncenter.stayinbloomfield.com" : "", r.v === "center" ? "Private back office for the team" : ""); APP.views[r.v].render(v, r); }
    else { location.hash = "town"; return; }
    if (!soft) window.scrollTo(0, 0); else window.scrollTo(0, y);
    document.dispatchEvent(new CustomEvent("bf-render", { detail: r }));
  }
  APP.render = render;
  addEventListener("hashchange", () => render());

  /* ---------- welcome: the short deck she lands on ---------- */
  let tourNext = false;
  const SCREENS = [
    ["town", "The town's home", "img/town/town-2.jpg?v=1793944505", "Stay in Bloomfield", "stayinbloomfield.com"],
    ["town", "A painted map of Taylorsville Road", "img/town/painted-dusk.jpg?v=1793944505", "Walk Taylorsville Road", "stayinbloomfield.com/map"],
    ["calendar", "One calendar for the whole town", "img/ernies/06-lanes-and-dining.jpg?v=1793944505", "There's always something going on", "stayinbloomfield.com/calendar"],
    ["plan", "Plan a weekend in three questions", "img/stays/50441349/05.jpg?v=1793944505", "Plan your Bloomfield weekend", "stayinbloomfield.com/plan"],
    ["nettie", "A site for every business", "img/nettie/01-shop-interior.jpg?v=1793944505", "Nettie Jarvis Antiques", "nettie-jarvis.com"],
    ["stay-boones", "Book the stays right on the site", "img/stays/49386618/01.jpg?v=1793944505", "Boone's Cabin", "stayinbloomfield.com/stay/boones-cabin"],
  ];
  // the opening's logos: a brand pill on desktop; on phones the logo itself in the brand's ink (the Double Dip keeps its own red sign)
  const signInk = k => `--bc:${pill(k).bg};--c:${LOGO_INK[k] || pill(k).bg};--m:url(${pill(k).src})`;
  function welcomeView() {
    return `<div class="wel">
      <section class="wh" id="wh">
        <video class="wh-vid" muted playsinline preload="auto" aria-hidden="true"></video>
        <div class="wh-stage" aria-hidden="true"></div><div class="wh-shade"></div>
        <div class="wh-signs">${HERO_SIGNS.map(([k, x, y, h], i) => `<span class="sg" style="left:${x}%;top:${y}%;--h:${h * 1.25};${signInk(k)};--d:${i * .22}s"><img src="${pill(k).src}" alt="">${k === "doubledip" ? `<img class="own" src="${SIGN[k]}" alt="">` : ""}</span>`).join("")}${["pinkhouse", "revival"].map((k, i) => `<span class="sg m-only" style="${signInk(k)};--d:${(6 + i) * .22}s"><img src="${pill(k).src}" alt="">${k === "doubledip" ? `<img class="own" src="${SIGN[k]}" alt="">` : ""}</span>`).join("")}</div>
        <div class="wh-lines">${HERO_LINES.map(l => `<p>${l[1]}</p>`).join("")}</div>
        <div class="wh-logo">${APP.logo ? APP.logo("site", "#f4efe6", "#e7c27a") : ""}</div>
        <div class="wh-cap"><span class="eyebrow"></span><h2></h2><img alt=""></div>
        <div class="wh-end"><div class="wh-endlogo">${APP.logo ? APP.logo("site", "#f4efe6", "#e7c27a") : ""}</div><div class="wh-endtext"><h1>A new home for the town.</h1></div><button type="button" class="wh-more" data-more>Scroll down for more<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg></button></div>
        <div class="wh-start"><div class="wh-startlogo">${APP.logo ? APP.logo("site", "#f4efe6", "#e7c27a") : ""}</div>
          <button class="wh-play" data-play aria-label="Play with sound"><svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></button><span class="wh-playhint">Press play · sound on</span></div>
        <div class="wh-ctls"><button class="wh-skip" data-skip>Skip</button></div>
        <div class="wh-dock"><button class="wh-ctl wh-back" data-back aria-label="Back"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M6 5h2.2v14H6zM19 5v14L9 12z"/></svg></button><button class="wh-ctl wh-pp" data-pp aria-label="Pause"><svg class="i-pause" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg><svg class="i-play" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg><svg class="i-replay" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4v4h4"/></svg></button><button class="wh-ctl wh-fwd" data-fwd aria-label="Forward"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M15.8 5H18v14h-2.2zM5 5v14l10-7z"/></svg></button><div class="wh-track" data-track role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0"><div class="wh-bar"><i><b></b></i></div><span class="wh-tip"></span></div><span class="wh-time">0:00</span><button class="wh-mute" data-mute aria-label="Mute"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path class="wave" d="M16.5 8.5a5 5 0 0 1 0 7"/></svg></button></div>
      </section>
      <section class="wel-cta"><div class="wrap"><span class="eyebrow">Your turn</span><h2>Now see the website.</h2><p>Everything in the video is on the site. Press the button and walk through it yourself.</p>
        <button class="cta-big" data-tour>Take a look around <span aria-hidden="true">→</span></button></div></section>
      <section class="wel-sect"><div class="wrap"><span class="eyebrow">What visitors will see</span><h2>The website, at a glance.</h2>
        <div class="screens">${SCREENS.map(x => `<button class="screen" data-tour-to="${x[0]}"><div class="bar"><i></i><i></i><i></i><span>${esc(x[4] || "stayinbloomfield.com")}</span></div><div class="shot"><img src="${x[2]}" alt=""><b>${esc(x[3])}</b></div><span class="cap">${esc(x[1])}</span></button>`).join("")}</div></div></section>
      <section class="wel-sect domains"><div class="wrap"><span class="eyebrow">One family of websites</span><h2>Every business keeps its own web address.</h2>
        <p class="wel-p">Each one lives inside the Stay in Bloomfield site, so visitors move from one to the next without noticing a seam.</p>
        <div class="doms">${["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival"].map(k => { const pl = pill(k); return `<a class="dom" href="#${k}" style="--bc:${pl.bg};--bi:${k === "pinkhouse" ? B[k].ink : "#fff6ea"}"><img src="${pl.src}" alt="${esc(B[k].name)}"><small>${esc(B[k].url)}</small></a>`; }).join("")}</div></div></section>
      <section class="wel-sect alt"><div class="wrap"><span class="eyebrow">And there's more</span><h2>We'd love to show you what else we can do.</h2>
        <div class="wel-more"><div><b>Town Center</b><p>A back office for every business: one inbox for bookings, one calendar, listings everywhere, emails, texts, press and tickets.</p></div><div><b>Brand</b><p>Logo ideas for the town, palettes, and a brand guide for every business.</p></div></div>
        <p class="wel-p">Take a look around the website first. When you're done, Brand and Town Center are waiting in the menu, marked just for you.</p></div></section>
      <section class="wel-cta"><div class="wrap"><span class="eyebrow">Ready?</span><h2>Click in and explore the website.</h2><p>Start on the town site. Brand and Town Center are waiting in the menu when you're done.</p>
        <button class="cta-big" data-tour>Take a look around <span aria-hidden="true">→</span></button></div></section>
    </div>`;
  }
  // the opening: the hero fly-through with the lines over it, the town logo, then a one-minute look at everything
  const HERO_LINES = [[1, "A small town with a big vision"], [4.6, "needs a modern website."], [8.2, "And modern back office tools."]];
  // the store logos on their storefronts, each in its brand pill in the last frame of the fly-through: [key, x%, y%, height in vh]
  const HERO_SIGNS = [["nettie", 15, 50.5, 4.6], ["ernies", 33, 63.5, 4.4], ["doubledip", 48.5, 56.5, 3.9], ["merrifield", 62.5, 46.5, 3.6], ["velvet", 73.5, 39.5, 3.4], ["rowdys", 87, 18.5, 3]];
  function heroScenes() {
    const shop = k => ({ img: D.biz[k].hero, site: `img/shots/${k}.jpg`, mshot: `img/shots/m-${k}.jpg`, mlogo: `<img class="lg-${k}" src="${SIGN[k] || pill(k).src}" alt="">`, url: B[k].url, t: 3.2 });
    return [
      { img: D.town.hero, site: "img/shots/town.jpg?v=1793944505", mshot: "img/shots/m-town.jpg?v=1793944505", mlogo: `<h3>One home for the whole town.</h3>`, url: "stayinbloomfield.com", k: "stayinbloomfield.com", h: "One home for the whole town.", t: 5.5 },
      { title: "Every business keeps its own website.", logos: ["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival"], t: 4.5 },
      ...["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival"].map(shop),
      { img: "img/ernies/06-lanes-and-dining.jpg?v=1793944505", k: "The calendar", h: "One calendar for everything going on.", t: 5 },
      { img: "img/velvet/06-room-wide.jpg?v=1793944505", cards: ["img/shots/pk-1.jpg?v=1793944505", "img/shots/pk-2.jpg?v=1793944505", "img/shots/pk-3.jpg?v=1793944505"], k: "Plan a weekend", h: "Pick a package. Book it all at once.", t: 6.5 },
      { collage: ["img/stays/collage-cabin.jpg?v=1793944505", "img/stays/collage-parlor.jpg?v=1793944505", "img/stays/50441349/10.jpg?v=1793944505"], k: "Stays", h: "Book the stays right on the site.", t: 5.5 },
      { center: true, t: 7.5 },
    ];
  }
  let heroRun = 0;
  // the pitch's music: Kentucky Waltz, light under the opening (pitch link only, not for the live site)
  let heroAudio = null, audioTick = null;
  function rampAudio(to, secs, after) {
    clearInterval(audioTick); if (!heroAudio) return;
    const from = heroAudio.volume, steps = Math.max(1, Math.round(secs * 20)); let i = 0;
    audioTick = setInterval(() => { i++; heroAudio.volume = Math.max(0, Math.min(1, from + (to - from) * i / steps)); if (i >= steps) { clearInterval(audioTick); after && after(); } }, 50);
  }
  function startAudio() {
    if (!heroAudio) heroAudio = new Audio("img/audio/kentucky-waltz.mp3?v=1793944505");
    heroAudio.currentTime = 0; heroAudio.volume = 0; heroAudio.play().then(() => rampAudio(0.32, 1)).catch(() => {});
  }
  function fadeAudio(secs) { if (heroAudio && !heroAudio.paused) rampAudio(0, secs, () => heroAudio.pause()); }
  // the closing card sits on the painting, nothing else behind it
  // every place on the painting for the closing shot: brand logos on their buildings, the stays marked with a house
  function endSigns() {
    return Object.entries(D.paintedPins).map(([id, xy], i) => {
      const p = D.places.find(x => x.id === id); if (!p) return "";
      const bz = D.biz[p.brand], sg = bz && bz.logo ? SIGN[p.brand] || pill(p.brand).src : PLACE_SIGN[id];
      const stay = p.kind === "stay" && STAYS.find(x => x.id === id);
      if (!sg && !stay) return "";
      const style = `left:${xy[0]}%;top:${xy[1]}%;--d:${(.3 + i * .1).toFixed(2)}s`;
      return sg ? `<img class="em-sign em-${id}" src="${sg}" alt="" style="${style}">` : `<span class="em-stay" style="${style}">${HOME_SVG}${esc(PIN_NAME[id] || stay.title)}</span>`;
    }).join("");
  }
  function heroEnd(wh) {
    wh.className = "wh at-end"; wh.removeAttribute("data-paused"); heroPaused = false; const v = wh.querySelector(".wh-vid"); v.pause(); v.classList.add("gone");
    wh.querySelector(".wh-stage").innerHTML = `<div class="wh-scene on wh-endbg"></div>`;
    wh.querySelector(".wh-cap").classList.remove("show");
  }
  // the next business in the same window: the page slides in over the last one, the logo and address cross-fade
  function swapSite(el, sc) {
    const fadeIn = (box, html) => {
      if (!box) return;
      box.classList.add("swap");
      setTimeout(() => { box.innerHTML = html; box.classList.remove("swap"); }, 280);
    };
    // the new page is solid and slides over the old one, so two sites never show through each other
    const page = (box, src) => {
      if (!box) return;
      // hold the window's size; the pages inside it are stacked on top of each other
      if (!box.style.height && box.offsetHeight) box.style.height = box.offsetHeight + "px";
      const im = new Image(); im.src = src; im.alt = "";
      // only slide in once the picture is decoded, so the panel never arrives blank
      im.decode().catch(() => {}).then(() => {
        const pg = document.createElement("div"); pg.className = "pg"; pg.appendChild(im);
        box.appendChild(pg);
        setTimeout(() => [...box.children].slice(0, -1).forEach(o => o.remove()), 700);
      });
    };
    el.querySelectorAll(".mw-logo").forEach(b => fadeIn(b, sc.mlogo || ""));
    el.querySelectorAll(".u").forEach(b => fadeIn(b, esc(sc.url)));
    page(el.querySelector(".wh-mweb .ms"), sc.mshot);
    page(el.querySelector(".wh-browser"), sc.site);
    const bg = el.querySelector(".kb.soft");
    if (bg) { const nb = bg.cloneNode(); nb.src = sc.img; nb.classList.add("next"); bg.after(nb); setTimeout(() => bg.remove(), 900); }
  }
  // the pitch runs on its own clock, so it can pause and step back or forward a part at a time
  let heroClock = null, heroPaused = false;
  function heroChapters() { return [{ open: "video", t: 14 }, { open: "signs", t: 3.4 }, { open: "logo", t: 3 }, ...heroScenes()]; }
  const clock = t => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
  function heroTimeline() { const ch = heroChapters(), starts = []; let total = 0; ch.forEach(c => { starts.push(total); total += c.t; }); return { ch, starts, total }; }
  function playHero(from = 0, seek = false, at = null) {
    const wh = $("#wh"); if (!wh) return;
    const run = ++heroRun, alive = () => run === heroRun && document.body.contains(wh);
    const vid = wh.querySelector(".wh-vid"), stage = wh.querySelector(".wh-stage"), cap = wh.querySelector(".wh-cap"), lines = [...wh.querySelectorAll(".wh-lines p")], bar = wh.querySelector(".wh-bar i"), time = wh.querySelector(".wh-time");
    const ch = heroChapters(), scenes = ch.filter(c => !c.open), starts = []; let total = 0;
    ch.forEach(c => { starts.push(total); total += c.t; });
    from = Math.max(0, Math.min(ch.length - 1, from));
    const clk = heroClock = { t: at == null ? starts[from] : Math.max(starts[from], Math.min(total - .05, at)), at: from, starts, alive, hold: false, waits: [] };
    const end = () => { if (!alive()) return; heroEnd(wh); fadeAudio(5); bar.style.width = "100%"; time.textContent = clock(total) + " / " + clock(total); };
    wh.toggleAttribute("data-paused", heroPaused);
    bar.style.transition = "none";
    if (!seek && matchMedia("(prefers-reduced-motion: reduce)").matches) return end();
    // waits are measured on the clock, so a paused pitch stays exactly where it is
    const until = at => new Promise(r => clk.waits.push({ at, r }));
    let last = performance.now();
    const tick = now => {
      if (!alive()) return;
      if (!heroPaused && !clk.hold) clk.t = Math.min(total, clk.t + (now - last) / 1000);
      last = now;
      if (!heroDrag) bar.style.width = (clk.t / total * 100).toFixed(2) + "%";
      time.textContent = clock(clk.t) + " / " + clock(total);
      if (clk.t < 14) { let n = -1; HERO_LINES.forEach(([t], j) => { if (clk.t >= t) n = j; }); lines.forEach((l, j) => l.classList.toggle("on", j === n)); }
      clk.waits = clk.waits.filter(w => clk.t >= w.at ? (w.r(), false) : true);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // the hero clip, falling back to the map fly-in until the hero is ready
    vid.onerror = () => { if (!vid.src.endsWith("fly-in.mp4")) { vid.src = "img/town/fly-in.mp4?v=1793944505"; vid.play().catch(() => {}); } };
    // load every picture the scenes use while the opening plays, so nothing pops in late
    const pics = scenes.flatMap(sc => [sc.img, sc.site, sc.mshot, ...(sc.cards || []), ...(sc.collage || []), sc.mlogo && (sc.mlogo.match(/src="([^"]+)"/) || [])[1]]).filter(Boolean);
    const ready = Promise.all(pics.map(src => { const im = new Image(); im.src = src; return im.decode().catch(() => {}); }));
    if (!vid.src.endsWith(".mp4")) vid.src = "img/town/hero.mp4?v=1793944505";
    // a jump keeps the music in step with the picture
    if (seek && heroAudio) { heroAudio.currentTime = Math.min(clk.t, 88); if (!heroPaused) { heroAudio.play().catch(() => {}); rampAudio(0.32, .6); } }
    (async () => {
      let prev = null;
      for (let i = from; i < ch.length; i++) {
        if (!alive()) return;
        const sc = ch[i]; clk.at = i; wh.querySelector("[data-pp]").setAttribute("aria-label", heroPaused ? "Play" : "Pause");
        if (sc.open) {
          stage.innerHTML = ""; cap.classList.remove("show"); vid.classList.remove("gone");
          if (sc.open === "video") { vid.currentTime = clk.t; if (!heroPaused) vid.play().catch(() => {}); }
          else { vid.pause(); if (i === from) vid.currentTime = Math.min(14, vid.duration || 14) - .05; lines.forEach(l => l.classList.remove("on")); }
          wh.className = "wh at-" + sc.open;
          await until(starts[i] + sc.t); continue;
        }
        if (i === from || ch[i - 1].open) {
          // hold the clock on the logo until the pictures are in, for up to four seconds
          if (i !== from) { clk.hold = true; await Promise.race([ready, new Promise(r => setTimeout(r, 4000))]); clk.hold = false; if (!alive()) return; }
          wh.className = "wh at-scenes"; vid.pause(); vid.classList.add("gone");
        }
        const el = document.createElement("div");
        // one place after another stays in the same window: only the page and the lit logo across the top change
        const cont = prev && prev.site && !prev.h && sc.site && !sc.h; prev = sc;
        if (cont && stage.lastElementChild) { swapSite(stage.lastElementChild, sc); await until(starts[i] + sc.t); continue; }
        el.className = "wh-scene" + (sc.title ? " title" : "") + (sc.center ? " center" : "") + (sc.site || sc.cards ? " web" : "");
        el.innerHTML = sc.title ? `<h2>${esc(sc.title)}</h2>${sc.logos ? `<div class="wh-logos">${sc.logos.map((k, i) => k === "doubledip" ? `<span style="--i:${i}"><img src="${SIGN[k]}" alt=""></span>` : `<span class="tint" style="--i:${i};--c:${LOGO_INK[k]};--m:url(${pill(k).src})"><img src="${pill(k).src}" alt=""></span>`).join("")}</div>` : ""}` : sc.center ? `<div class="tc-ring">${["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival"].map((k, i) => `<span style="--i:${i};left:${(50 + 41 * Math.sin(i * Math.PI / 4)).toFixed(1)}%;top:${(50 - 41 * Math.cos(i * Math.PI / 4)).toFixed(1)}%"><img src="${SIGN[k] === "img/doubledip/logo-sign-red.png?v=1793944505" ? pill(k).src : SIGN[k] || pill(k).src}" alt=""></span>`).join("")}<div class="tc-core"><span class="tc-k">Stay in Bloomfield</span><b>Town Center</b><i class="tc-rule"></i></div></div><div class="tc-cap"><span class="eyebrow">Behind it all</span><h2>One back office runs every website.</h2></div>` : sc.cards ? `<img class="kb soft" src="${sc.img}" alt=""><div class="wh-webcap"><span class="eyebrow">${esc(sc.k)}</span><h2>${esc(sc.h)}</h2></div><div class="wh-cards">${sc.cards.map((src, i) => `<img src="${src}" alt="" style="--i:${i}">`).join("")}</div>` : sc.site ? `<img class="kb soft" src="${sc.img}" alt="">${sc.h ? `<div class="wh-webcap"><span class="eyebrow">${esc(sc.k)}</span><h2>${esc(sc.h)}</h2></div>` : ""}${sc.mshot ? `<div class="wh-mweb"><div class="mw-logo">${sc.mlogo || ""}</div><span class="u">${esc(sc.url)}</span><div class="ms"><img src="${sc.mshot}" alt=""></div></div>` : ""}${!sc.h && sc.mlogo ? `<div class="wh-dhead"><div class="mw-logo">${sc.mlogo}</div><span class="u">${esc(sc.url)}</span></div>` : ""}<div class="wh-browser low"><img src="${sc.site}" alt=""></div>` : sc.collage ? `<div class="wh-collage">${sc.collage.map((src, i) => `<div style="--i:${i}"><img class="kb" src="${src}" alt=""></div>`).join("")}</div>` : `<img class="kb" src="${sc.img}" alt="">`;
        stage.appendChild(el);
        requestAnimationFrame(() => el.classList.add("on"));
        const old = [...stage.children].slice(0, -1); setTimeout(() => old.forEach(o => o.remove()), 900);
        // the caption leaves with the old scene and only comes back once the new scene is in
        cap.classList.remove("show");
        if (sc.h && !sc.site && !sc.cards) setTimeout(() => {
          if (!alive()) return;
          cap.classList.toggle("has-sign", !!sc.sign);
          cap.querySelector(".eyebrow").textContent = sc.k; cap.querySelector("h2").textContent = sc.h; cap.querySelector("img").src = sc.sign || "";
          cap.classList.add("show");
        }, 700);
        await until(starts[i] + sc.t);
      }
      end();
    })();
  }
  function heroPause(p) {
    const wh = $("#wh"), c = heroClock; if (!wh || !c || !c.alive()) return;
    heroPaused = p; wh.toggleAttribute("data-paused", p);
    wh.querySelector("[data-pp]").setAttribute("aria-label", p ? "Play" : "Pause");
    const vid = wh.querySelector(".wh-vid");
    if (p) { vid.pause(); if (heroAudio) heroAudio.pause(); }
    else { if (heroChapters()[c.at].open === "video") vid.play().catch(() => {}); if (heroAudio) heroAudio.play().catch(() => {}); }
  }
  // back goes to the start of this part first, then to the part before it
  function heroStep(d) {
    const wh = $("#wh"), c = heroClock, n = heroChapters().length; if (!wh) return;
    const ended = wh.classList.contains("at-end");
    let i = ended || !c ? n : c.at;
    if (d < 0 && !ended && c && c.t - c.starts[i] > 1.5) d = 0;
    i = Math.max(0, i + d);
    if (i >= n) return heroSkip();
    playHero(i, true);
  }
  // space pauses, the arrows step, and leaving the tab pauses so the music never runs ahead
  const heroLive = () => { const wh = $("#wh"); return wh && /at-(video|signs|logo|scenes)/.test(wh.className) && heroClock && heroClock.alive(); };
  document.addEventListener("keydown", e => {
    const wh = $("#wh"); if (!wh || /input|textarea|select/i.test(e.target.tagName)) return;
    const r = wh.getBoundingClientRect(); if (r.bottom < innerHeight * .5 || r.top > innerHeight * .5) return;
    if (e.key === " " && heroLive()) { e.preventDefault(); heroPause(!heroPaused); }
    else if (e.key === "ArrowLeft" && !wh.classList.contains("at-start")) heroStep(-1);
    else if (e.key === "ArrowRight" && heroLive()) heroStep(1);
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden && heroLive() && !heroPaused) heroPause(true); });
  // drag or tap anywhere on the bar, like a video player: the picture follows the finger, the music catches up on release
  let heroDrag = false;
  function heroSeekTo(at) {
    const { ch, starts, total } = heroTimeline();
    at = Math.max(0, Math.min(total - .05, at));
    let i = 0; while (i < ch.length - 1 && starts[i + 1] <= at) i++;
    playHero(i, true, at);
  }
  function heroTrack(wh) {
    const tr = wh.querySelector("[data-track]"), fill = tr.querySelector("i"), tip = tr.querySelector(".wh-tip");
    const at = e => { const r = tr.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); };
    let last = -1;
    const show = f => { const { ch, starts, total } = heroTimeline(); fill.style.width = (f * 100) + "%"; tip.textContent = clock(f * total); tip.style.left = (f * 100) + "%"; let i = 0; while (i < ch.length - 1 && starts[i + 1] <= f * total) i++; if (i !== last) { last = i; heroSeekTo(f * total); } };
    tr.onpointerdown = e => {
      if (wh.classList.contains("at-start")) return;
      e.preventDefault(); tr.setPointerCapture(e.pointerId); heroDrag = true; last = -1; tr.classList.add("drag"); show(at(e));
    };
    tr.onpointermove = e => { if (heroDrag) show(at(e)); else { const f = at(e); tip.textContent = clock(f * heroTimeline().total); tip.style.left = (f * 100) + "%"; } };
    const up = e => { if (!heroDrag) return; heroDrag = false; tr.classList.remove("drag"); heroSeekTo(at(e) * heroTimeline().total); };
    tr.onpointerup = up; tr.onpointercancel = up;
    tr.onkeydown = e => { const c = heroClock; if (!c) return; if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); heroSeekTo(c.t + (e.key === "ArrowLeft" ? -5 : 5)); } };
  }
  function heroSkip() { const wh = $("#wh"); if (!wh) return; heroRun++; heroEnd(wh); fadeAudio(1.5); wh.querySelector(".wh-bar i").style.width = "100%"; const T = heroTimeline().total; wh.querySelector(".wh-time").textContent = clock(T) + " / " + clock(T); }
  function afterWelcome() {
    const wh = $("#wh");
    if (wh) {
      wh.querySelector("[data-more]").onclick = () => { const n = wh.nextElementSibling; if (n) n.scrollIntoView({ behavior: "smooth" }); };
      wh.querySelector("[data-skip]").onclick = heroSkip;
      wh.querySelector("[data-back]").onclick = () => heroStep(-1);
      wh.querySelector("[data-fwd]").onclick = () => heroStep(1);
      heroTrack(wh);
      wh.querySelector("[data-pp]").onclick = () => { if (wh.classList.contains("at-end")) { heroPaused = false; startAudio(); playHero(); } else heroPause(!heroPaused); };
      // the pitch opens on a play button so the music can play (browsers only allow sound after a press)
      wh.className = "wh at-start";
      wh.querySelector(".wh-stage").innerHTML = `<div class="wh-scene on"><img class="kb" src="img/town/painted-dusk.jpg?v=1793944505" alt=""></div>`;
      wh.querySelector("[data-play]").onclick = () => { heroPaused = false; startAudio(); playHero(); };
      wh.querySelector("[data-mute]").onclick = e => { if (!heroAudio) return; heroAudio.muted = !heroAudio.muted; e.currentTarget.classList.toggle("off", heroAudio.muted); };
    }
    document.querySelectorAll("[data-tour]").forEach(b => b.onclick = () => { tourNext = true; go("town"); });
    document.querySelectorAll("[data-tour-to]").forEach(b => b.onclick = () => { if (b.dataset.tourTo === "town") tourNext = true; go(b.dataset.tourTo); });
  }
  function showTour() {
    document.body.classList.add("touring");
    const t = document.createElement("div"); t.className = "tour";
    t.innerHTML = `<div class="tour-card"><span class="eyebrow">Welcome</span><h3>Take a look around.</h3>
      <p>This is the website visitors will see. Click anything: the map, the calendar, the stays, every business.</p>
      <p class="tour-hl"><b>When you're done, open Brand and Town Center</b> in the menu to see what else we can do for you.</p>
      <p class="tour-note">Those two won't be in the menu visitors see.</p>
      <button class="btn solid" data-tour-ok>Start exploring</button></div><div class="tour-arrow" aria-hidden="true">←</div>`;
    document.body.appendChild(t);
    const bl = document.querySelector('#hd-right a[href="#brand"]'), cl = document.querySelector('#hd-right a[href="#center"]'), ar = t.querySelector(".tour-arrow");
    const lb = document.querySelector('.lnav-links a[href="#brand"]'), lc = document.querySelector('.lnav-links a[href="#center"]');
    if (lb && lc && ar && lb.offsetParent) { const a = lb.getBoundingClientRect(), c = lc.getBoundingClientRect(); ar.style.left = (a.right + 14) + "px"; ar.style.top = ((a.top + c.bottom) / 2 - 32) + "px"; }
    else if (bl && cl && ar && bl.offsetParent) { const a = bl.getBoundingClientRect(), c = cl.getBoundingClientRect(); ar.textContent = "↑"; ar.style.left = ((a.left + c.right) / 2 - 16) + "px"; ar.style.top = (c.bottom + 10) + "px"; }
    else if (ar) ar.style.display = "none";
    const done = () => { t.remove(); document.body.classList.remove("touring"); };
    t.querySelector("[data-tour-ok]").onclick = done;
    t.onclick = e => { if (e.target === t) done(); };
  }

  /* ---------- town ---------- */
  function upcoming(n, brand) {
    return allEvents().filter(e => e.d >= D.today && (!brand || e.b === brand)).slice(0, n);
  }
  // live music: how often, who has played, and Ernie's own show calendar
  const MUSIC_BANDS = [
    { n: "Big Black Cadillac", at: "ernies", shows: 3, note: "Halloween night headliners", img: "img/insta/erniestavern/06.jpg?v=1793944505" },
    { n: "The Bourbon Barrel Boys", at: "ernies", shows: 8, note: "Bluegrass, the house favorite", img: "img/ernies/05-neon-bar.jpg?v=1793944505" },
    { n: "Kentucky Ramblers", at: "ernies", shows: 4, note: "Classic country and covers", img: "img/ernies/07-interior-bw.jpg?v=1793944505" },
    { n: "Hannah Wheeler & The Heartaches", at: "rowdys", shows: 5, note: "Saturday dance night", img: "img/rowdys/02-crowd-at-bar.jpg?v=1793944505" },
    { n: "Copper Creek String Band", at: "rowdys", shows: 2, note: "Front-porch strings", img: "img/rowdys/03-porch.jpg?v=1793944505" },
  ];
  let musicMonth = null;
  function musicView() {
    const shows = allEvents().filter(e => e.b === "ernies" && e.d >= D.today);
    return `<section class="mu-hero"><img src="img/ernies/05-neon-bar.jpg?v=1793944505" alt=""><div class="wrap"><span class="eyebrow light">Live music</span>
        <h1>The music starts at eight.</h1><p>Bands at Ernie's four nights a week, and Saturday dance nights down the road at Rowdy's.</p>
        <div class="row"><a class="btn solid" href="#mu-cal" data-mu-jump>See who's playing</a><button class="btn light" data-book="table" data-brand="ernies">Reserve a table</button></div></div></section>
      <section class="sect mu-often"><div class="wrap"><div class="mu-stats">
        <div><b>4</b><span>nights a week of live music at Ernie's</span></div>
        <div><b>8 PM</b><span>first set, most nights</span></div>
        <div><b>Sat</b><span>dance night and line dancing at Rowdy's</span></div>
        <div><b>${MUSIC_BANDS.reduce((a, x) => a + x.shows, 0)}</b><span>shows from these bands this year</span></div></div></div></section>
      <section class="sect mu-bands"><div class="wrap"><div class="sect-head"><h2>Who's played here</h2></div>
        <div class="mu-grid">${MUSIC_BANDS.map(x => `<article class="mu-band"><div class="im"><img src="${x.img}" alt="" loading="lazy"></div><div class="tx">${markLogo(x.at, 16)}<h3>${esc(x.n)}</h3><p>${esc(x.note)}</p><small>${x.shows} shows</small></div></article>`).join("")}</div></div></section>
      <section class="sect mu-cal" id="mu-cal"><div class="wrap"><div class="sect-head"><div><span class="eyebrow">Ernie's calendar</span><h2>Coming up at Ernie's.</h2></div></div>
        <div class="cal"><div class="month" id="mu-month"></div><div class="evs">${shows.length ? shows.map(evRow).join("") : `<div class="empty">New dates soon.</div>`}</div></div></div></section>
      <section class="mu-book"><div class="wrap"><div><span class="eyebrow">Play at Ernie's</span><h2>Book your band.</h2>
        <p>Ernie's books local and regional bands four nights a week. Send your name, your sound and a link to your music, and we'll get back to you with open dates.</p>
        <ol class="mu-steps"><li><b>Send your band</b><span>A link to a video or your music, and the nights that work.</span></li><li><b>We listen</b><span>We reply within a week with open dates.</span></li><li><b>Play the night</b><span>We put you on the town calendar, the website and our posts.</span></li></ol>
        <button class="btn solid mu-bookbtn" data-book="band" data-brand="ernies">Book your band</button></div>
        <img src="img/insta/erniestavern/06.jpg?v=1793944505" alt="" loading="lazy"></div></section>
      <section class="sect mu-insta"><div class="wrap"><div class="sect-head"><h2>From Ernie's posts</h2></div>
        <div class="mu-flyers">${[6, 5, 4].map(i => `<img src="img/insta/erniestavern/0${i}.jpg" alt="" loading="lazy">`).join("")}</div></div></section>`;
  }
  function afterMusic() {
    const jump = document.querySelector("[data-mu-jump]"); if (jump) jump.onclick = e => { e.preventDefault(); document.getElementById("mu-cal").scrollIntoView({ behavior: "smooth" }); };
    if (!musicMonth) musicMonth = D.today.slice(0, 7);
    const draw = () => {
      const [y, m] = musicMonth.split("-").map(Number), first = new Date(y, m - 1, 1), days = new Date(y, m, 0).getDate();
      const byDay = {}; allEvents().filter(e => e.b === "ernies").forEach(e => (byDay[e.d] = byDay[e.d] || []).push(e));
      let cells = DOW.map(d => `<div class="dow">${d.slice(0, 2)}</div>`).join("");
      for (let i = 0; i < first.getDay(); i++) cells += "<span></span>";
      for (let d = 1; d <= days; d++) { const k = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`; const has = byDay[k];
        cells += `<button class="${k === D.today ? "today" : ""} ${has ? "has-ev mu-on" : ""}" title="${has ? esc(has.map(e => e.t).join(", ")) : ""}"><span>${d}</span>${has ? `<em><i class="bdot" style="--bc:#003f21"></i></em>` : ""}</button>`; }
      const el = document.getElementById("mu-month"); if (!el) return;
      el.innerHTML = `<div class="mh"><button data-mv="-1" aria-label="Previous month">‹</button><span>${MON[m - 1]} ${y}</span><button data-mv="1" aria-label="Next month">›</button></div><div class="grid7 cal7">${cells}</div>`;
      el.querySelectorAll("[data-mv]").forEach(b => b.onclick = () => { const dt = new Date(y, m - 1 + Number(b.dataset.mv), 1); musicMonth = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`; draw(); });
    };
    draw();
  }
  function evRow(e) {
    const d = day(e.d);
    return `<div class="ev">
      <div class="d"><span>${DOW[d.getDay()]}</span><b>${d.getDate()}</b><span>${MON[d.getMonth()].slice(0, 3)}</span></div>
      <div><h3>${esc(e.t)}</h3><div class="w">${bubble(e.b, 20)}<span>${esc(B[e.b].name)}</span><span>${esc(e.time || "")}</span></div></div>
      ${e.book ? `<div class="act"><button class="btn small" data-book="${e.book}" data-brand="${e.b}" data-what="${esc(e.t)}" data-date="${e.d}">${e.book === "tickets" ? "Tickets" : "Book"}</button></div>` : "<div></div>"}
    </div>`;
  }
  // the town photo first, then each business's own hero
  // the homepage hero: inside each place, opening on the antiques floor at Nettie Jarvis
  const HERO_INSIDE = [["nettie", "img/nettie/01-shop-interior.jpg?v=1793944505"], ["ernies", "img/ernies/05-neon-bar.jpg?v=1793944505"], ["merrifield", "img/merryfield/01-parlor-seating.jpg?v=1793944505"],
    ["velvet", "img/velvet/01-bar-hero.jpg?v=1793944505"], ["doubledip", "img/doubledip/04-fountain-counter-wide.jpg?v=1793944505"], ["pinkhouse", "img/pinkhouse/03-dining-room.jpg?v=1793944505"]];
  const HEROES = HERO_INSIDE.map(([id, img]) => ({ img, go: id, cap: `${bubble(id, 22)}<span>${esc(B[id].name)}</span>` }));
  let heroTimer = null;
  // the editorial spread: the best photos in town, one shared film grade over all of them
  const SPREAD = [
    { img: "img/town/town-2.jpg?v=1793944505", cap: "Saturday morning on Taylorsville Road", where: "Bloomfield", go: "map" },
    { img: "img/ernies/05-neon-bar.jpg?v=1793944505", cap: "The neon comes on at five", where: "Ernie's Tavern", go: "ernies" },
    { img: "img/merryfield/02-tea-service.jpg?v=1793944505", cap: "Scones on Lady Carlyle china", where: "Miss Merrifield's", go: "merrifield" },
    { img: "img/velvet/01-bar-hero.jpg?v=1793944505", cap: "Al Capone's back bar", where: "The Velvet Room", go: "velvet" },
    { img: "img/town/town-1.jpg?v=1793944505", cap: "Under the sycamores", where: "East Fork of Simpson Creek", go: "map" },
    { img: "img/nettie/03-iw-harper-display.jpg?v=1793944505", cap: "Rare pours between the antiques", where: "Nettie Jarvis", go: "nettie" },
    { img: "img/pinkhouse/04-long-table.jpg?v=1793944505", cap: "Dinner for twelve by candlelight", where: "The Old Pink House", go: "pinkhouse" },
    { img: "img/stays/49386618/01.jpg?v=1793944505", cap: "Bourbon by the stone fireplace", where: "Boone's Cabin", go: "stay-boones" },
    { img: "img/doubledip/03-soda-fountain-counter.jpg?v=1793944505", cap: "A malt at the marble counter", where: "The Double Dip", go: "doubledip" },
    { img: "img/town/town-5.jpg?v=1793944505", cap: "Weddings under the spire, soon", where: "Revival Hall", go: "revival" },
    { img: "img/stays/50441349/05.jpg?v=1793944505", cap: "Toile and a four-poster upstairs", where: "Miss Allie's Homestead", go: "stay-allies" },
  ];
  function townView() {
    const T = D.town, sites = ["nettie", "ernies", "doubledip", "merrifield", "pinkhouse", "velvet", "rowdys", "revival"];
    return `
    <section class="hero town-hero">
      <div class="slides">${HEROES.map((h, i) => `<img class="bg ${i ? "" : "on"} ${h.go === "merrifield" ? "soft-pink" : ""}" src="${h.img}" alt="" ${i ? 'loading="lazy"' : ""}>`).join("")}</div>
      <a class="hero-cap" id="herocap" href="#${HEROES[0].go}">${HEROES[0].cap}</a>
      <div class="wrap">
        <h1>Stay in <em>Bloomfield</em></h1>
        <p class="lede">${esc(T.lede)}</p>
        <div class="row">
          <a class="btn solid gold" href="#plan">Plan your weekend</a>
          <a class="btn light" href="#calendar">What's on</a>
          <button class="btn light" data-join>Join the list</button>
        </div>
      </div>
    </section>

    <section class="spread">
      <div class="wrap">
        <div class="spread-head"><h2 class="spread-h1">Tea at noon. Bourbon at four. Boots on the floor by nine.</h2><p class="spread-h2">A weekend in Bloomfield.</p></div>
        <div class="mosaic film">
          ${SPREAD.map((p, i) => `<a class="tile t${i}" href="#${p.go}"><img src="${p.img}" alt="" loading="lazy"><span class="cap"><i>${esc(p.cap)}</i><b>${esc(p.where)}</b></span></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="sect always">
      <div class="wrap">
        <div class="big-line"><span class="eyebrow">This week and next</span><h2>There's always something going on in Bloomfield.</h2></div>
        <div class="strip">${upcoming(8).map(e => `<a class="chipev" href="#calendar">${bubble(e.b, 34)}<span><b>${esc(e.t)}</b><small>${fmt(e.d)} · ${esc(e.time || "")}</small></span></a>`).join("")}</div>
      </div>
    </section>

    <section class="sect" id="map">
      <div class="wrap">
        <div class="sect-head"><span class="eyebrow">The town in fall</span><h2>Walk Taylorsville Road.</h2><p class="big-p">Tap a pin. Visit the shop, reserve a table or book a tasting right there.</p></div>
        <div class="mapbox painted-on" id="mapbox">
          <div class="pmap-wrap"><img class="pmap day" src="img/town/painted-dusk.jpg?v=1793944505" alt="A painting of Bloomfield at dusk in the fall"><video class="pmap-vid" src="img/town/fly-in.mp4?v=1793944505" muted playsinline preload="auto" aria-hidden="true"></video><div class="ppins">${Object.entries(D.paintedPins).map(([id, xy]) => { const p = D.places.find(x => x.id === id); if (!p) return ""; const bz = D.biz[p.brand]; const stay = p.kind === "stay" && STAYS.find(x => x.id === id); const nm = p.name || (stay ? stay.title : p.kind === "other" ? (D.others.find(o => o.id === id) || {}).name : B[p.brand] ? B[p.brand].name : id); const sg = bz && bz.logo ? SIGN[p.brand] || pill(p.brand).src : PLACE_SIGN[id]; return `<button class="ppin ${sg ? "has-logo" : ""}" data-ppin="${id}" style="left:${xy[0]}%;top:${xy[1]}%" aria-label="${esc(nm)}">${sg ? `<span class="pl sign"><img src="${sg}" alt=""></span>` : `<span class="pn">${PIN_HOME.includes(id) ? HOME_SVG : ""}${esc(PIN_NAME[id] || nm)}${PIN_AWAY[id] ? `<small class="pn-away">${PIN_AWAY[id]}</small>` : ""}</span>`}</button>`; }).join("")}</div></div>

          <div class="map-cart"><b>Bloomfield</b><span>Nelson County · Kentucky</span><span class="est">Est. 1817</span></div>
          <div class="map-key"><span><i style="background:#c9a24a;width:18px;height:3px;border-radius:0"></i>Taylorsville Road</span><span><i style="background:#4f6670"></i>East Fork of Simpson Creek</span></div>
          <div id="pincard"></div>
        </div>
      </div>
    </section>

    <section class="sect">
      <div class="wrap">
        <div class="sect-head"><span class="eyebrow">Taylorsville Road</span><h2>One road. Eight places to go.</h2></div>
        <div class="cards">${sites.map(id => { const b = D.biz[id]; return `<a class="card" href="#${id}"><div class="im"><img src="${b.hero}" alt="" loading="lazy">${b.soon ? `<span class="badge">Coming soon</span>` : ""}</div><div class="cardline">${bubble(id, 30)}<div><span class="k">${esc(b.kind)}</span><h3>${esc(B[id].name)}</h3></div></div></a>`; }).join("")}</div>
      </div>
    </section>

    <section class="sect revival-band">
      <div class="wrap two">
        <div class="figure"><img src="img/town/town-5.jpg?v=1793944505" alt="The 1880s church at 126 Taylorsville Road"></div>
        <div class="prose big">
          <span class="eyebrow">Coming soon</span>
          <h2>Revival Hall</h2>
          <p>The old church on Taylorsville Road is being restored. Weddings under the spire. Dinners in the hall. Retreats with the whole town as the campus.</p>
          <div class="row"><a class="btn solid" href="#revival">See Revival Hall</a><button class="btn" data-book="venue" data-brand="revival">Hold a date</button></div>
        </div>
      </div>
    </section>

    <section class="sect">
      <div class="wrap">
        <div class="sect-head"><span class="eyebrow">Where to stay</span><h2>Four homes. Book them right here.</h2></div>
        <div class="cards">${STAYS.map(s => `<a class="card" href="#stay-${s.id}"><div class="im"><img src="${s.photos[0]}" alt="" loading="lazy"><span class="badge">★ ${s.rating} · ${s.reviews} reviews</span></div><div><span class="k">Sleeps ${s.guests} · ${s.bedrooms} bedrooms</span><h3>${esc(s.title)}</h3><p class="muted">from ${money(s.night)} a night</p></div></a>`).join("")}</div>
      </div>
    </section>

    <section class="sect">
      <div class="wrap two">
        <div>
          <div class="sect-head"><span class="eyebrow">Since 1817</span><h2>A little history.</h2></div>
          <div class="story">${T.story.map(s => `<div class="tl"><div class="yr">${s.yr}</div><div><h3>${esc(s.t)}</h3><p>${esc(s.p)}</p></div></div>`).join("")}</div>
        </div>
        <div class="figure sticky"><img src="img/town/town-1.jpg?v=1793944505" alt="The East Fork of Simpson Creek in Bloomfield"><span class="credit">The East Fork of Simpson Creek</span></div>
      </div>
    </section>

    <section class="sect press-band">
      <div class="wrap">
        <div class="press">${T.quotes.map(q => `<figure><blockquote>“${esc(q.q)}”</blockquote><figcaption><b>${esc(q.by)}</b>${q.yr}</figcaption></figure>`).join("")}</div>
      </div>
    </section>

    <section class="sect">
      <div class="wrap">
        <div class="sect-head"><span class="eyebrow">Around town</span><h2>Our neighbors on Taylorsville Road.</h2></div>
        <div class="also">${D.others.map(o => `<a class="card" href="${o.url}" target="_blank" rel="noopener"><div class="im"><img src="${o.img}" alt="" loading="lazy"></div><div><span class="k">${esc(o.what)}</span><h3>${esc(o.name)}</h3><p class="muted">${esc(o.p)}</p></div></a>`).join("")}</div>
        <div class="partner">
          <div><h3>Own a business in Bloomfield?</h3><p>Get on the map and the town calendar. A free listing, or a featured spot in our emails and on the homepage.</p></div>
          <div class="row"><button class="btn solid" data-partner="free">Free listing</button><button class="btn" data-partner="featured">Featured spot</button></div>
        </div>
      </div>
    </section>

    <section class="sect">
      <div class="wrap">
        <div class="tractor">
          <div><span class="eyebrow">Worth the detour</span><h2>${esc(T.tractor.t)}</h2><p style="margin-top:14px;font-size:17px">${esc(T.tractor.p)}</p></div>
          <figure class="tractor-photo"><img src="img/town/deere-john.jpg?v=1793944505" alt="Ten John Deere tractors standing nose-down in a green field"><figcaption>Photo: Katie O'Malley, Roadside America</figcaption></figure>
        </div>
      </div>
    </section>

    ${planTeaser()}
    ${joinBand()}
    ${townFoot()}`;
  }
  function tractorArt() {
    let g = "";
    for (let i = 0; i < 10; i++) {
      const x = 30 + i * 52;
      g += `<g transform="translate(${x} 150) rotate(-14)"><rect x="-10" y="-70" width="22" height="58" rx="3" fill="#3e6b3a"/><rect x="-7" y="-18" width="16" height="18" fill="#2f5a30"/><circle cx="-14" cy="-62" r="14" fill="#d8b23a"/><circle cx="16" cy="-62" r="14" fill="#d8b23a"/></g>`;
    }
    return `<svg viewBox="0 0 560 170" role="img" aria-label="Ten tractors standing nose-down in a row"><rect x="0" y="148" width="560" height="22" fill="#7d7444"/>${g}</svg>`;
  }
  function planTeaser() {
    return `<section class="sect plan-teaser"><div class="wrap">
      <div><span class="eyebrow">Plan it in a minute</span><h2>Tell us the occasion. We'll build the weekend.</h2>
      <p class="big-p">A wedding, a girls' trip, a family reunion or a team retreat. Pick the dates and the head count, and the site lays out where to stay, where to gather and what to do.</p>
      <a class="btn solid" href="#plan">Start planning</a></div>
      <div class="pt-photo"><img class="main" src="img/ernies/02-exterior-crowd.jpg?v=1793944505" alt="An evening crowd outside Ernie's Tavern on Taylorsville Road"><img class="inset" src="img/rowdys/02-crowd-at-bar.jpg?v=1793944505" alt="Friends at the bar at Rowdy's"></div>
    </div></section>`;
  }
  function joinBand() {
    return `<section class="sect join"><div class="wrap">
      <div><h2>Hear about it first.</h2><p class="big-p">Events, tastings and open dates, once or twice a month.</p></div>
      <form class="joinf" data-joinform><input id="join-email" type="email" placeholder="Email address" required aria-label="Email address"><input id="join-phone" type="tel" placeholder="Mobile for texts (optional)" aria-label="Mobile number"><button class="btn solid">Sign up</button></form>
      <a class="fb" href="https://www.facebook.com/nettiejarvisantiques/" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8h3.3Z"/></svg>Follow Bloomfield on Facebook</a>
    </div></section>`;
  }
  function townFoot() {
    return `<footer class="tfoot"><div class="wrap">
      <div><h3>Stay in Bloomfield</h3><p>Taylorsville Road · Bloomfield, Kentucky 40008</p></div>
      <div>${["nettie", "ernies", "doubledip", "merrifield"].map(id => `<a href="#${id}">${esc(B[id].name)}</a>`).join("")}</div>
      <div>${["pinkhouse", "velvet", "rowdys", "revival"].map(id => `<a href="#${id}">${esc(B[id].name)}</a>`).join("")}<a href="#stays">Stays</a></div>
      <div class="credits">${esc(D.town.credits)}</div>
    </div></footer>`;
  }

  // each time the map comes into view: fly in over the hills, land on the painting, then the signs light up and it holds still
  function flyIn(mb) {
    const vid = mb.querySelector(".pmap-vid");
    const land = () => { mb.classList.add("landed"); vid && vid.classList.add("done"); };
    if (!vid || matchMedia("(prefers-reduced-motion: reduce)").matches) return land();
    let away = true;
    const start = () => {
      mb.classList.add("flying"); mb.classList.remove("landed"); vid.classList.remove("done");
      try { vid.currentTime = 0; } catch (e) {}
      const p = vid.play(); p && p.catch(land);
    };
    vid.onended = land; vid.onerror = land;
    new IntersectionObserver(es => {
      const e = es[0];
      if (e.intersectionRatio >= .45 && away) { away = false; start(); }
      else if (e.intersectionRatio < .05) { away = true; vid.pause(); }
    }, { threshold: [0, .05, .45] }).observe(mb);
  }
  function afterTown() {
    const mb = $("#mapbox");
    if (mb) flyIn(mb);
    if (mb) {
      mb.querySelectorAll("[data-ppin]").forEach(b => b.onclick = () => { mb.querySelectorAll("[data-ppin]").forEach(x => x.classList.toggle("on", x === b)); pinCard(b.dataset.ppin); });
      mb.querySelectorAll("[data-pt]").forEach(b => b.onclick = () => { mb.querySelectorAll("[data-pt]").forEach(x => x.classList.toggle("on", x === b)); mb.classList.toggle("eve", b.dataset.pt === "eve"); });
      mb.querySelectorAll("[data-view]").forEach(b => b.onclick = () => {
        const three = b.dataset.view === "3d";
        mb.querySelectorAll("[data-view]").forEach(x => x.classList.toggle("on", x === b));
        mb.classList.toggle("painted-on", !three); mb.querySelector(".tools3d").hidden = !three; mb.querySelector(".toolsp").hidden = three;
        if (three && !mapApi && window.__start3d) window.__start3d();
      });
    }
    const slides = document.querySelectorAll(".slides img"), cap = $("#herocap");
    let at = 0;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) heroTimer = setInterval(() => {
      slides[at].classList.remove("on"); at = (at + 1) % slides.length; slides[at].classList.add("on");
      cap.innerHTML = HEROES[at].cap; cap.setAttribute("href", "#" + HEROES[at].go);
    }, 5200);
    const box = $("#mapbox");
    const start = () => {
      if (!window.THREE || !window.BloomMap || !box) return;
      const places = D.places.map(p => Object.assign({}, p, { name: p.name || (B[p.brand] && B[p.brand].name), short: p.name || shortName(p), bubble: bubble(p.brand, 26) }));
      places.forEach(p => { const bz = D.biz[p.brand]; if (bz && bz.logo) { p.logo = pill(p.brand).src; p.head = pill(p.brand).bg; } });
      places.forEach(p => { if (p.kind === "stay") { const s = STAYS.find(x => x.id === p.id); p.short = s.title; } if (p.kind === "other") p.short = D.others.find(o => o.id === p.id).name; });
      try { mapApi = window.BloomMap.mount(box, { places, onSelect: id => pinCard(id) }); window.__map = mapApi; }
      catch (e) { box.insertAdjacentHTML("beforeend", `<div class="map-fallback"><img src="img/town/town-2.jpg?v=1793944505" alt=""></div>`); }
      box.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { box.querySelectorAll("[data-mode]").forEach(x => x.classList.toggle("on", x === b)); mapApi && mapApi.setMode(b.dataset.mode); });
      box.querySelectorAll("[data-cam]").forEach(b => b.onclick = () => { if (!mapApi) return; b.dataset.cam === "wide" ? mapApi.wide() : mapApi.home(); });
    };
    window.__start3d = () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
  }
  function shortName(p) { const n = B[p.brand].name; return n.replace(/^The /, ""); }
  function pinCard(id) {
    const p = D.places.find(x => x.id === id), el = $("#pincard"); if (!p || !el) return;
    const stay = p.kind === "stay" && STAYS.find(s => s.id === p.id);
    const name = p.name || (stay ? stay.title : p.kind === "other" ? D.others.find(o => o.id === p.id).name : B[p.brand].name);
    const img = stay ? stay.photos[0] : p.img;
    const site = p.go ? `<a class="btn small" href="#${p.go}">Visit the site</a>` : p.url ? `<a class="btn small" href="${p.url}" target="_blank" rel="noopener">Visit the site</a>` : "";
    const act = p.act ? (p.type === "stay" ? `<a class="btn small solid" href="#${p.go}">${esc(p.act)}</a>` : `<button class="btn small solid" data-book="${p.type}" data-brand="${p.brand}">${esc(p.act)}</button>`) : "";
    const bz = D.biz[p.brand];
    const plate = bz && bz.logo ? `<span class="pc-logo" style="background:${pill(p.brand).bg}"><img src="${pill(p.brand).src}" alt="${esc(B[p.brand].name)}"></span>` : "";
    el.innerHTML = `<div class="pincard"><div class="pc-im">${img ? `<img src="${img}" alt="">` : ""}${plate}</div><button class="x" aria-label="Close">×</button>
      <div class="in"><div class="cardline">${bubble(p.brand, 34)}<div><span class="tag">${p.kind === "stay" ? "Stay" : p.kind === "landmark" ? "Landmark" : p.kind === "other" ? "Around town" : esc(D.biz[p.brand] ? D.biz[p.brand].kind : "")}</span><h3>${esc(name)}</h3></div></div>
      <p>${esc(p.line)}</p><div class="row">${act}${site}</div></div></div>`;
    el.querySelector(".x").onclick = () => { el.innerHTML = ""; mapApi && mapApi.select(null); document.querySelectorAll("[data-ppin]").forEach(x => x.classList.remove("on")); };
  }

  /* ---------- calendar ---------- */
  let calMonth = null, calSel = null, calFilter = new Set();
  // the revival: Linda and Jerry Bruckheimer and the town that came back. Every quote and date is sourced in research/bruckheimers.md
  const RV_TIME = [
    ["1991", "On the National Register", "Downtown Bloomfield becomes a historic district."],
    ["1993", "A wrong turn on a back road", "Linda finds Walnut Groves, an 1820s Greek Revival house north of town. She and Jerry make it home."],
    ["1996", "Nettie Jarvis opens", "Her first storefront, named for her great-grandmother, in a building nobody wanted."],
    ["1999", "A state award for four buildings", "The Kentucky Heritage Council honors the Meeting Hall, Nettie Jarvis, the Wells Building and the Brown Building."],
    ["2014", "More than 1,000 at the door", "Jerry signs his book at Nettie Jarvis. Power lines go underground, and period streetlights go up."],
    ["2017", "Kentucky's top preservation honor", "Linda receives the Ida Lee Willis Memorial Award and returns to the National Trust board."],
    ["2026", "The church becomes a hall", "The old Methodist church is being made into a place for weddings, music and the whole town."],
  ];
  const RV_PRESS = [
    ["What they've done here has really put Bloomfield on the map.", "Gov. Steve Beshear", "Kentucky Living, 2014"],
    ["Thank you for saving our town.", "Bloomfield residents, to Linda", "Kentucky Living, 2014"],
    ["It's really nice to see the town come back to life.", "Dana Ashley, resident", "Kentucky Living, 2014"],
    ["Several of the buildings had been vacant for some time,", "Mayor Rhonda Hagan", "Kentucky Living, 2014"],
    ["She's an artist when it comes to detail.", "Alexandra Balahoutis, Linda's daughter", "Kentucky Living, 2014"],
    ["We have a great life in L.A., but there's nothing like Kentucky.", "Jerry Bruckheimer", "WAVE 3 News, 2014"],
  ];
  const RV_HERS = [["I took shape in Kentucky.", "Kentucky Living, 2014"], ["I like dirt roads, scary roads, do-not-enter roads,", "Kentucky Living, 2014"], ["One or two people can't save a town by themselves.", "Kentucky Living, 2014"]];
  const RV_HONORS = [["1999", "Kentucky Heritage Council Preservation Project Award, for four Bloomfield buildings"], ["2017", "Ida Lee Willis Memorial Award, Kentucky's top preservation honor"], ["2017", "Named again to the National Trust for Historic Preservation board"], ["Ongoing", "The Linda Bruckheimer Excellence in Rural Preservation Award, given by Preservation Kentucky"], ["Ongoing", "The Linda and Jerry Bruckheimer Preservation Fund for Kentucky, through the National Trust"]];
  function storyView() {
    return `
    <section class="rv-hero"><img src="img/revival/bloomfield-historic-district.jpg?v=1793944505" alt="Taylorsville Road storefronts in Bloomfield, with the Before I die chalkboard on Nettie Jarvis">
      <div class="wrap"><span class="eyebrow">The revival</span><h1>One wrong turn brought a town back.</h1>
        <p>How Linda Bruckheimer, a great-grandmother's name and eight empty buildings put Bloomfield back on the map.</p></div></section>


    <section class="sect rv-open"><div class="wrap rv-open-grid">
      <div class="rv-note">
        <span class="eyebrow">A note from Linda</span>
        <h2>Take the long way.</h2>
        <p class="rv-lead">I found Bloomfield the way I find most good things, by taking the wrong road on purpose. I like dirt roads, the narrow ones, the ones with a sign telling you not to. One of them let me out on Taylorsville Road, and I sat in the car a long while looking at those brick fronts. Beautiful bones. Empty windows. They looked like a choir that had forgotten the words.</p>
        <p>My great-grandmother was Nettie Jarvis. I didn't set out to put her name over a door. It just happened, in a building nobody else wanted, and then the building next door looked lonely, so that happened too.</p>
        <p>People thank me for saving the town, and I love them for it, but it isn't so. A town gets saved the way a quilt gets made: one square at a time, by a lot of hands, most of them never stitched into the corner. The folks pouring coffee at seven, setting up the lanes, calling the line dance, wiping down the soda counter for the hundredth time. That's who brought Bloomfield back.</p>
        <p>What I want now is simple. A Saturday that runs from tea at noon to boots on the floor at nine. The old church full of weddings and music again. Grandkids who come home because there's something to come home to. And a way for everyone who works here to run it a little easier, so there's time left over for the porch.</p>
        <p>Come see us. Take the long way.</p>
        <p class="rv-sign">Linda Bruckheimer</p>
        <span class="rv-draft">Draft for Linda to edit</span>
      </div>
      <figure class="rv-fig rv-road"><img src="img/press/linda-porch.jpg?v=1793944505" alt="Linda Bruckheimer in a rocking chair on a cabin porch" onerror="this.onerror=null;this.src='img/revival/nettie-jarvis-building.jpg';this.nextElementSibling.textContent='Nettie Jarvis, her first storefront'"><figcaption>Linda Bruckheimer</figcaption></figure>
    </div></section>

    <section class="sect"><div class="wrap rv-two">
      <div class="rv-intro"><span class="eyebrow">Linda Bruckheimer</span><h2>Her town, one building at a time.</h2>
        <p>Linda grew up in Louisville, wrote for magazines in California and published two novels about a Kentucky family that keeps finding its way home. Bloomfield was her grandmother's hometown.</p>
        <p>In 1996 she bought an empty storefront on Taylorsville Road and named it for her great-grandmother, Nettie Jarvis. Then the building next door, and the one after that. Eight in all, restored down to the trim. Her daughter puts it simply: she's an artist when it comes to detail.</p>
        <p>Her husband, Jerry, has been beside her the whole way. The producer behind Top Gun and Pirates of the Caribbean signs books on the porch of Nettie Jarvis, cheers on every opening and says there's nothing like Kentucky. But this one is hers.</p></div>
      <div class="rv-figs">
        <figure class="rv-fig rv-town"><img src="img/press/linda-in-town.jpg?v=1793944505" alt="Linda Bruckheimer on Taylorsville Road in Bloomfield" onerror="this.onerror=null;this.src='img/revival/taylorsville-road.jpg';this.nextElementSibling.textContent='Taylorsville Road'"><figcaption>Linda on Taylorsville Road · Kentucky Living</figcaption></figure>
      </div>
    </div></section>

    <section class="rv-nums"><div class="wrap">${[["8", "buildings restored downtown"], ["1996", "the first storefront opens"], ["1,000+", "came for Jerry's book signing"], ["2017", "Kentucky's top preservation award"]].map(([b, t]) => `<div><b>${b}</b><span>${t}</span></div>`).join("")}</div></section>

    <section class="sect"><div class="wrap">
      <div class="sect-head"><span class="eyebrow">How it happened</span><h2>Thirty years, one building at a time.</h2></div>
      <ol class="rv-time">${RV_TIME.map(([y, h, p]) => `<li><span class="rv-yr">${y}</span><div><b>${esc(h)}</b><p>${esc(p)}</p></div></li>`).join("")}</ol>
    </div></section>

    <section class="rv-photos" aria-label="Bloomfield today">${[["taylorsville-road", "Taylorsville Road"], ["nettie-jarvis-building", "Nettie Jarvis"], ["street-clock", "The street clock"], ["press/walnut-groves", "Walnut Groves, their home"]].map(([f, c]) => `<figure><img src="img/${f.includes("/") ? f : "revival/" + f}.jpg" alt="${c}" loading="lazy"${f.includes("/") ? ` onerror="this.onerror=null;this.src='img/revival/fingerpost.jpg'"` : ""}><figcaption>${c}</figcaption></figure>`).join("")}</section>

    <section class="sect rv-press-sect"><div class="wrap">
      <div class="sect-head"><span class="eyebrow">What people said</span><h2>In the papers, and on the porch.</h2></div>
      <div class="rv-press">${RV_PRESS.map(([q, who, src]) => `<blockquote><p>“${esc(q)}”</p><footer><b>${esc(who)}</b><span>${esc(src)}</span></footer></blockquote>`).join("")}</div>
      <div class="rv-book"><img src="img/press/saving-kentucky.jpg?v=1793944505" alt="Saving Kentucky: Greening the Bluegrass, book cover"><div><span class="eyebrow">Featured in</span><b>Saving Kentucky</b><span>Greening the Bluegrass, by Sally Van Winkle Campbell</span></div></div>
      <div class="rv-hers"><span class="eyebrow">In her own words</span>${RV_HERS.map(([q, src]) => `<p>“${esc(q)}” <span>${esc(src)}</span></p>`).join("")}</div>
    </div></section>


    <section class="sect rv-honors-sect"><div class="wrap">
      <div class="sect-head"><span class="eyebrow">Honors</span><h2>Recognized by the state, and the country.</h2></div>
      <ul class="rv-honors">${RV_HONORS.map(([y, t]) => `<li><span>${y}</span>${esc(t)}</li>`).join("")}</ul>
      <p class="rv-credits">Sources: Kentucky Living (Dec 2014, Jan 2021), WAVE 3 News (Jul 2014), Garden &amp; Gun (Sep 2026), Kentucky Heritage Council, National Trust for Historic Preservation, Preservation Kentucky. Photos via Wikimedia Commons: Jon Roanhaus (CC BY-SA 3.0), Brian Stansberry (CC BY 4.0). Press photos: Kentucky Living and Garden &amp; Gun.</p>
    </div></section>`;
  }
  function calendarView() {
    // their own recent flyers and posts, one of each
    const shots = ["missmerrifields/05", "erniestavern/06", "rowdyssaloon/05", "thevelvetroomky/04", "doubledipbloomfield/04", "rowdyssaloon/02", "missmerrifields/03",
      "erniestavern/05", "rowdyssaloon/01", "missmerrifields/06", "thevelvetroomky/05", "erniestavern/03", "rowdyssaloon/04", "missmerrifields/04", "doubledipbloomfield/01", "rowdyssaloon/06", "thevelvetroomky/06", "missmerrifields/01"].map(x => `img/insta/${x}.jpg`);
    return `<section class="cal-hero">
      <div class="flyer-wall">${[...shots, ...shots.slice().reverse(), ...shots.slice(6), ...shots.slice(0, 6)].map((s, i) => `<span class="fly" style="--r:${[-6, 4, -2, 7, -4, 2, -7, 5, -1, 3][i % 10]}deg;--t:${[-8, 6, -4, 10, -6][i % 5]}deg;--y:${[0, 14, -10, 8, -4, 12][i % 6]}px"><img src="${s}" alt=""></span>`).join("")}</div>
      <div class="wrap"><span class="eyebrow">The town calendar</span><h1>There's always something going on in Bloomfield.</h1><p class="lede">Every business, one calendar. Tap a business to see just theirs.</p></div>
    </section>
    <section class="sect cal-body"><div class="wrap">
      <div class="filters big">${Object.keys(B).filter(k => !["stays"].includes(k)).map(k => `<button class="bchip ${calFilter.has(k) ? "on" : ""}" data-f="${k}">${bubble(k, 28)}<span>${esc(B[k].name)}</span></button>`).join("")}</div>
      <div class="cal">
        <div class="month" id="month"></div>
        <div class="evs" id="evs"></div>
      </div>
    </div></section>
    ${joinBand()}`;
  }
  function afterCalendar() {
    // late in the month, open on the next one so the calendar shows what's coming
    if (!calMonth) { const d = day(D.today); if (d.getDate() > 24) d.setMonth(d.getMonth() + 1, 1); calMonth = d.toISOString().slice(0, 7); }
    document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { const k = b.dataset.f; calFilter.has(k) ? calFilter.delete(k) : calFilter.add(k); b.classList.toggle("on"); drawCal(); });
    drawCal();
  }
  function drawCal() {
    const [y, m] = calMonth.split("-").map(Number);
    const first = new Date(y, m - 1, 1), days = new Date(y, m, 0).getDate();
    const evs = allEvents().filter(e => !calFilter.size || calFilter.has(e.b));
    const byDay = {}; evs.forEach(e => (byDay[e.d] = byDay[e.d] || []).push(e));
    let cells = DOW.map(d => `<div class="dow">${d.slice(0, 2)}</div>`).join("");
    for (let i = 0; i < first.getDay(); i++) cells += "<span></span>";
    for (let d = 1; d <= days; d++) {
      const k = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const list = byDay[k] || [];
      cells += `<button class="${k === D.today ? "today" : ""} ${calSel === k ? "sel" : ""} ${list.length ? "has-ev" : ""}" data-day="${k}"><span>${d}</span><em>${list.slice(0, 3).map(e => bubble(e.b, 22)).join("")}${list.length > 3 ? `<small>+${list.length - 3}</small>` : ""}</em></button>`;
    }
    $("#month").innerHTML = `<div class="mh"><button data-mv="-1" aria-label="Previous month">‹</button><span>${MON[m - 1]} ${y}</span><button data-mv="1" aria-label="Next month">›</button></div><div class="grid7 cal7">${cells}</div>`;
    $("#month").querySelectorAll("[data-mv]").forEach(b => b.onclick = () => { const dt = new Date(y, m - 1 + Number(b.dataset.mv), 1); calMonth = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`; calSel = null; drawCal(); });
    $("#month").querySelectorAll("[data-day]").forEach(b => b.onclick = () => { calSel = calSel === b.dataset.day ? null : b.dataset.day; drawCal(); });
    const list = calSel ? evs.filter(e => e.d === calSel) : evs.filter(e => e.d.startsWith(calMonth) && e.d >= (calMonth === D.today.slice(0, 7) ? D.today : ""));
    $("#evs").innerHTML = list.length ? list.map(evRow).join("") : `<div class="empty">Nothing on this day yet. Try the weekend.</div>`;
  }

  /* ---------- sister sites ---------- */
  function themeStyle(t) { return `--s-bg:${t.bg};--s-ink:${t.ink};--s-accent:${t.accent};--s-soft:${t.soft};--s-display:${t.display};--s-head:${t.head};--s-headink:${t.headInk}`; }
  function siteView(id) {
    const b = D.biz[id], br = B[id], t = b.theme;
    const nav = ["About", b.bowling ? "Bowling" : null, b.menu || b.flavors || b.bourbon ? "Menu" : null, "Events", "Visit"].filter(Boolean);
    const evs = upcoming(4, id), nj = id === "nettie" && window.NJ;
    const actBtn = (a, cls) => a ? (a.go ? `<a class="btn ${cls}" href="#${a.go}">${esc(a.label)}</a>` : `<button class="btn ${cls}" data-book="${a.type}" data-brand="${id}">${esc(a.label)}</button>`) : "";
    return `<div class="site site-${id} ${id === "velvet" ? "dark" : ""}" style="${themeStyle(t)}">
      ${nj ? window.NJ.header("home") : `<header class="shead"><div class="wrap">
        ${b.logo ? `<img class="logo" src="${b.logo}" alt="${esc(br.name)}">` : `<span class="logo-txt">${esc(br.name)}</span>`}
        <nav>${nav.map(n => `<a href="#${id}" data-jump="${n.toLowerCase()}">${n}</a>`).join("")}</nav>
        ${actBtn(b.action, "solid small")}
      </div></header>`}
      <section class="shero"><img src="${b.hero}" alt=""><div class="wrap">
        ${b.soon ? `<span class="soon">Coming soon</span>` : `<span class="eyebrow light">${esc(b.kind)}</span>`}
        <h1>${esc(b.h1)}</h1><p>${esc(b.lede)}</p>
        <div class="row">${actBtn(b.action, "solid")}${actBtn(b.second, "light")}</div>
      </div></section>
      ${nj ? window.NJ.strip() : ""}
      <section class="sect" data-sec="about"><div class="wrap"><div class="offer">${b.offers.map(o => `<div><h3>${esc(o.t)}</h3><p>${esc(o.p)}</p></div>`).join("")}</div></div></section>
      ${b.bowling ? `<section class="bowl" data-sec="bowling"><img class="bowl-bg" src="${b.bowling.img}" alt=""><div class="wrap">
        <img class="bowl-logo" src="${b.bowling.logo}" alt="Bowl at Ernie's Tavern">
        <div class="bowl-txt"><h2>${esc(b.bowling.h)}</h2><p>${esc(b.bowling.p)}</p><span class="bowl-price">${esc(b.bowling.price)}</span>
          <button class="btn solid bowl-btn" data-book="lane" data-brand="${id}">Reserve a lane</button></div></div></section>` : ""}
      ${b.menu ? `<section class="sect" data-sec="menu"><div class="wrap"><div class="sect-head"><h2>The menu</h2><span class="livepill">Updated from Town Center</span></div><div class="menu">${b.menu.map(s => `<h3>${esc(s.s)}</h3>${s.items.map(i => `<div class="mi"><b>${esc(i[0])}</b><span class="p">${esc(i[1])}</span>${i[2] ? `<span class="ds">${esc(i[2])}</span>` : ""}</div>`).join("")}`).join("")}</div></div></section>` : ""}
      ${b.flavors ? `<section class="sect" data-sec="menu"><div class="wrap"><div class="sect-head"><h2>Today's flavors</h2><span class="livepill">Updated from Town Center</span></div><div class="flavors">${b.flavors.map(f => `<span>${esc(f)}</span>`).join("")}</div></div></section>` : ""}
      ${b.bourbon ? `<section class="sect" data-sec="menu"><div class="wrap two"><div><div class="sect-head"><h2>From the bourbon bar</h2></div><div class="menu one">${b.bourbon.map(i => `<div class="mi"><b>${esc(i[0])}</b><span class="p">${esc(i[2])}</span><span class="ds">${esc(i[1])} proof</span></div>`).join("")}</div></div><div class="tasting-card"><img src="img/nettie/07-lucky-seven-tasting.jpg?v=1793944505" alt=""><h3>Bourbon tastings</h3><p>A guided flight from a different distillery each month. Private tastings for groups.</p><button class="btn solid" data-book="tasting" data-brand="nettie">Book a tasting</button></div></div></section>` : ""}
      <section class="sect" data-sec="events"><div class="wrap"><div class="sect-head"><h2>What's coming up</h2><span class="livepill">From the town calendar</span></div>
        ${evs.length ? `<div class="evs">${evs.map(evRow).join("")}</div>` : `<div class="empty">New dates soon.</div>`}</div></section>
      <section class="sect"><div class="wrap"><div class="gal">${b.gallery.map(g => `<img src="${g}" alt="" loading="lazy">`).join("")}</div></div></section>
      ${b.insta ? instaStrip(b.insta) : ""}
      <section class="sect" data-sec="visit"><div class="wrap"><div class="visit">
        <div class="findus">${miniMap(id, 92)}<div><span class="k">Find us</span><b class="vbig">${esc(b.addr)}</b><span>Bloomfield, Kentucky</span></div></div>
        <div><span class="k">Hours</span><b class="vbig">${esc(b.hours)}</b></div>
        <div><span class="k">Call</span><b class="vbig">${esc(b.phone || "Send a note")}</b>${b.action ? actBtn(b.action, "small") : ""}</div>
      </div></div></section>
      <section class="sect sjoin"><div class="wrap"><h2>Stay in the loop.</h2><form class="joinf" data-joinform><input type="email" placeholder="Email address" required aria-label="Email address" id="sj-${id}"><button class="btn solid">Sign up</button></form></div></section>
      <footer class="sfoot"><div class="wrap">${bubble(id, 30)}<span>${esc(br.name)} · ${esc(b.addr)}, Bloomfield, KY</span>
        <span class="sister">${Object.keys(D.biz).filter(k => k !== id).map(k => `<a href="#${k}">${esc(B[k].name)}</a>`).join("")}<a href="#town">Stay in Bloomfield</a></span></div></footer>
    </div>`;
  }
  function instaStrip(h) {
    return `<section class="sect insta"><div class="wrap">
      <div class="sect-head"><div class="ihead"><span class="ig">${igIcon()}</span><div><h2>@${esc(h)}</h2><span class="livepill">Live from Instagram</span></div><a class="btn small" href="https://www.instagram.com/${h}/" target="_blank" rel="noopener">Follow</a></div></div>
      <div class="igrid">${[1, 2, 3, 4, 5, 6].map(i => `<a href="https://www.instagram.com/${h}/" target="_blank" rel="noopener"><img src="img/insta/${h}/0${i}.jpg" alt="" loading="lazy"></a>`).join("")}</div>
    </div></section>`;
  }
  function igIcon() { return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`; }
  function afterSite(id) {
    if (id === "nettie" && window.NJ) { const v = $("#view"); v.insertAdjacentHTML("beforeend", window.NJ.bagBar()); window.NJ.wire(v); }
    document.querySelectorAll("[data-jump]").forEach(a => a.onclick = e => { e.preventDefault(); const s = document.querySelector(`[data-sec="${a.dataset.jump}"]`); s && s.scrollIntoView({ behavior: "smooth" }); });
  }

  /* ---------- stays ---------- */
  const STAYS = window.STAYS;
  function staysView() {
    return `<section class="sect"><div class="wrap">
      <div class="sect-head"><span class="eyebrow">Where to stay</span><h1 class="h1big">Stay a while.</h1><p class="big-p">Four homes in and around town. Live dates, booked right here.</p></div>
      <div class="stay-list">${STAYS.map(s => `<a class="stay-row" href="#stay-${s.id}"><img src="${s.photos[0]}" alt=""><div><span class="livepill">Open dates live</span><h2>${esc(s.title)}</h2><p class="big-p">${esc(s.highlights[1] || s.highlights[0])}</p><div class="facts"><span>Sleeps ${s.guests}</span><span>${s.bedrooms} bedrooms</span><span>${s.baths} baths</span><span>★ ${s.rating}</span></div><span class="btn solid">from ${money(s.night)} a night</span></div></a>`).join("")}</div>
    </div></section>${joinBand()}`;
  }
  // booked nights come from each listing's calendar feed; these are stand-ins for the preview
  function bookedSet(id) {
    const r = (s => () => (s = (s * 9301 + 49297) % 233280) / 233280)(id.length * 97);
    const out = new Set(); const base = day(D.today);
    for (let i = 0; i < 70; i++) { const d = new Date(base); d.setDate(d.getDate() + i); if (r() < 0.28) out.add(d.toISOString().slice(0, 10)); }
    return out;
  }
  let pickIn = null, pickOut = null, stayMonth = null;
  function stayView(id) {
    const s = STAYS.find(x => x.id === id); if (!s) return "";
    pickIn = pickOut = null; stayMonth = Number(D.today.slice(8)) > 24 ? (() => { const d = day(D.today); d.setMonth(d.getMonth() + 1, 1); return d.toISOString().slice(0, 7); })() : D.today.slice(0, 7);
    return `<section class="sect"><div class="wrap">
      <div class="stay-top"><div><span class="eyebrow">${esc(s.type)} · Bloomfield, Kentucky</span><h1 class="h1big">${esc(s.title)}</h1></div><div class="facts"><span>★ ${s.rating} · ${s.reviews} reviews</span><span>Sleeps ${s.guests}</span><span>${s.bedrooms} bedrooms</span><span>${s.baths} baths</span></div></div>
      <div class="stay-hero">${s.photos.slice(0, 5).map(p => `<img src="${p}" alt="" data-zoom>`).join("")}</div>
      <div class="stay-body" style="margin-top:36px">
        <div class="prose big">
          <p>${esc(s.desc)}</p>
          <ul class="hl">${s.highlights.map(h => `<li>${esc(h)}</li>`).join("")}</ul>
          <h2 style="margin-top:20px">What's here</h2>
          <ul class="amen">${s.amenities.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
          <h2 style="margin-top:20px">Guests say</h2>
          <div class="revs">${s.quotes.slice(0, 3).map(q => `<figure><blockquote>“${esc(q.t)}”</blockquote><figcaption>${esc(q.n)} · ${esc(q.w)}</figcaption></figure>`).join("")}</div>
          <div class="gal" style="margin-top:20px">${s.photos.slice(5).map(p => `<img src="${p}" alt="" data-zoom loading="lazy">`).join("")}</div>
        </div>
        <aside class="booker" id="booker"></aside>
      </div>
    </div></section>
    <section class="sect pair"><div class="wrap"><div class="sect-head"><h2>Make a weekend of it.</h2></div><div class="pair-row">${["ernies", "merrifield", "nettie", "rowdys"].map(k => `<button class="pairc" data-book="${D.biz[k].action.type}" data-brand="${k}">${bubble(k, 40)}<span><b>${esc(D.biz[k].action.label)}</b><small>${esc(B[k].name)}</small></span></button>`).join("")}</div></div></section>`;
  }
  function afterStay(id) { drawBooker(id); }
  function drawBooker(id) {
    const s = STAYS.find(x => x.id === id), el = $("#booker"); if (!el) return;
    const booked = bookedSet(id);
    const [y, m] = stayMonth.split("-").map(Number);
    const first = new Date(y, m - 1, 1), days = new Date(y, m, 0).getDate();
    let cells = DOW.map(d => `<span class="dow">${d[0]}</span>`).join("");
    for (let i = 0; i < first.getDay(); i++) cells += "<span></span>";
    for (let d = 1; d <= days; d++) {
      const k = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const past = k < D.today, isB = booked.has(k);
      const cls = past ? "past" : isB ? "booked" : (k === pickIn && pickOut) ? "end start" : k === pickOut ? "end stop" : k === pickIn ? "end" : (pickIn && pickOut && k > pickIn && k < pickOut) ? "in" : "";
      cells += `<button type="button" class="${cls}" data-k="${k}" ${isB || past ? "disabled" : ""} aria-label="${fmt(k)}${isB ? ", booked" : ""}"><span>${d}</span></button>`;
    }
    const nights = pickIn && pickOut ? Math.round((day(pickOut) - day(pickIn)) / 864e5) : 0;
    const clean = s.guests > 4 ? 150 : 85, sub = nights * s.night, tax = (sub + clean) * 0.13;
    el.innerHTML = `<div class="pr">${money(s.night)} <small>a night</small></div>
      <span class="livepill">Calendar synced with Airbnb</span>
      <div class="bk-cal">
        <div class="mh small"><button type="button" data-sm="-1" aria-label="Previous month">‹</button><b>${MON[m - 1]} ${y}</b><button type="button" data-sm="1" aria-label="Next month">›</button></div>
        <div class="mini-cal">${cells}</div>
        <div class="bk-key"><span><i class="k-open"></i>Open</span><span><i class="k-booked"></i>Booked</span><span><i class="k-pick"></i>Your stay</span></div>
      </div>
      <div class="grid2b"><label>Check in<input id="ci" readonly value="${pickIn ? fmt(pickIn) : ""}" placeholder="Pick a date"></label><label>Check out<input id="co" readonly value="${pickOut ? fmt(pickOut) : ""}" placeholder="Pick a date"></label></div>
      <label>Guests<select id="gs">${Array.from({ length: s.guests }, (_, i) => `<option>${i + 1}</option>`).join("")}</select></label>
      ${nights ? `<div class="lines"><div><span>${money(s.night)} × ${nights} ${nights === 1 ? "night" : "nights"}</span><span>${money(sub)}</span></div><div><span>Cleaning</span><span>${money(clean)}</span></div><div><span>Kentucky & Nelson County tax</span><span>${money(tax)}</span></div><div class="tot"><span>Total</span><span>${money(sub + clean + tax)}</span></div></div>` : `<p class="muted">Tap your first night, then your last.</p>`}
      <button class="btn solid wide" id="bk" ${nights ? "" : "disabled"}>Book ${nights ? nights + (nights === 1 ? " night" : " nights") : "now"}</button>
      <p class="muted small">Pay here. Dates block on Airbnb right away.</p>`;
    el.querySelectorAll("[data-sm]").forEach(b => b.onclick = () => { const dt = new Date(y, m - 1 + Number(b.dataset.sm), 1); stayMonth = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`; drawBooker(id); });
    el.querySelectorAll("[data-k]").forEach(b => b.onclick = () => {
      const k = b.dataset.k;
      if (!pickIn || pickOut || k <= pickIn) { pickIn = k; pickOut = null; }
      else {
        let ok = true; for (let d = day(pickIn); d < day(k); d.setDate(d.getDate() + 1)) if (booked.has(d.toISOString().slice(0, 10))) ok = false;
        if (ok) pickOut = k; else { pickIn = k; pickOut = null; toast("Those nights include a booked date."); }
      }
      drawBooker(id);
    });
    const bk = $("#bk"); if (bk) bk.onclick = () => sheet("stay", "stays", { what: s.title, date: pickIn, out: pickOut, total: money(sub + clean + tax), guests: $("#gs").value });
  }

  /* ---------- the planner ---------- */
  const PLAN = { occ: null, people: 8, days: 2, month: "2027-05", step: 0 };
  const OCC = [
    ["wedding", "A wedding", "revival"], ["bach", "A bachelorette", "merrifield"], ["weekend", "A weekend away", "stays"], ["girls", "A girls' trip", "pinkhouse"], ["bourbon", "A bourbon trip", "nettie"],
    ["reunion", "A family reunion", "ernies"], ["retreat", "A team retreat", "velvet"], ["birthday", "A birthday or shower", "doubledip"], ["holiday", "A holiday party", "velvet"], ["night", "A night out", "rowdys"],
  ];
  function planView() {
    return `<section class="plan">
      <div class="wrap">
        <div class="plan-head"><div><h1>Plan your Bloomfield weekend.</h1><p class="lede">Three questions. A whole weekend, laid out.</p></div>
          <div class="plan-strip">${["img/stays/50441349/05.jpg?v=1793944505", "img/merryfield/02-tea-service.jpg?v=1793944505", "img/ernies/06-lanes-and-dining.jpg?v=1793944505", "img/nettie/07-lucky-seven-tasting.jpg?v=1793944505", "img/velvet/02-bar-mirror.jpg?v=1793944505"].map(src => `<img src="${src}" alt="">`).join("")}</div></div>
        <div class="plan-box" id="planbox"></div>
      </div>
    </section>
    <section class="sect pk"><div class="wrap">
      <div class="sect-head"><span class="eyebrow">Ready-made weekends</span><h2>Pick one. Book it all at once.</h2></div>
      <div class="pkgs">${D.packages.map(p => `<article class="pkg"><img src="${p.img}" alt="" loading="lazy"><div class="in">
        <span class="k">${esc(p.who)} · ${esc(p.price)}</span><h3>${esc(p.t)}</h3>
        <ul>${p.steps.map(s => `<li>${bubble(s[0], 26)}<span>${esc(s[1])}</span></li>`).join("")}</ul>
        ${p.sell ? `<div class="sell"><span>Marketed on</span>${p.sell.map(x => `<b>${esc(x)}</b>`).join("")}</div>` : ""}
        <button class="btn solid" data-book="plan" data-brand="${p.steps[0][0]}" data-what="${esc(p.t)}">Ask about dates</button></div></article>`).join("")}</div>
    </div></section>
    <section class="sect why"><div class="wrap">
      <div class="sect-head"><span class="eyebrow">What this does for the town</span><h2>One visit becomes a whole weekend.</h2></div>
      <div class="why3">
        <div><b>Every business, every booking.</b><p>A wedding inquiry fills the stays, the tea parlor, the bowling lanes and the dance hall.</p></div>
        <div><b>Out in the world.</b><p>The same weekend shows up on wedding sites, travel sites and the town's socials.</p></div>
        <div><b>Into one inbox.</b><p>Every inquiry lands in Town Center, with a reply already drafted.</p></div>
      </div>
    </div></section>`;
  }
  function afterPlan() { drawPlan(); }
  function drawPlan() {
    const el = $("#planbox"); if (!el) return;
    if (PLAN.step === 0) {
      el.innerHTML = `<div class="q"><span class="qn">1 of 3</span><h2>What are you planning?</h2>
        <div class="occ">${OCC.map(o => `<button class="${PLAN.occ === o[0] ? "on" : ""}" data-occ="${o[0]}">${bubble(o[2], 44)}<span>${o[1]}</span></button>`).join("")}</div></div>`;
      el.querySelectorAll("[data-occ]").forEach(b => b.onclick = () => { PLAN.occ = b.dataset.occ; PLAN.step = 1; if (PLAN.occ === "wedding") PLAN.people = 120; else if (PLAN.occ === "retreat") PLAN.people = 24; else if (PLAN.occ === "night") PLAN.days = 1; else if (PLAN.occ === "bach") PLAN.people = 10; drawPlan(); });
    } else if (PLAN.step === 1) {
      el.innerHTML = `<div class="q"><span class="qn">2 of 3</span><h2>How many people?</h2>
        <div class="dial"><button data-p="-1" aria-label="Fewer">−</button><output id="pp">${PLAN.people}</output><button data-p="1" aria-label="More">+</button></div>
        <input type="range" id="prange" min="2" max="200" value="${PLAN.people}" aria-label="Number of people">
        <div class="qacts"><button class="btn" data-back>Back</button><button class="btn solid" data-next>Next</button></div></div>`;
      const set = v => { PLAN.people = Math.max(2, Math.min(200, v)); $("#pp").textContent = PLAN.people; $("#prange").value = PLAN.people; };
      el.querySelectorAll("[data-p]").forEach(b => b.onclick = () => set(PLAN.people + Number(b.dataset.p) * (PLAN.people >= 20 ? 5 : 1)));
      $("#prange").oninput = e => set(Number(e.target.value));
      el.querySelector("[data-back]").onclick = () => { PLAN.step = 0; drawPlan(); };
      el.querySelector("[data-next]").onclick = () => { PLAN.step = 2; drawPlan(); };
    } else if (PLAN.step === 2) {
      const months = ["2026-11", "2026-12", "2027-03", "2027-04", "2027-05", "2027-06", "2027-09", "2027-10"];
      el.innerHTML = `<div class="q"><span class="qn">3 of 3</span><h2>How many days, and when?</h2>
        <div class="seg">${[1, 2, 3, 4].map(n => `<button class="${PLAN.days === n ? "on" : ""}" data-d="${n}">${n === 1 ? "One night" : n + " days"}</button>`).join("")}</div>
        <div class="seg months">${months.map(mo => `<button class="${PLAN.month === mo ? "on" : ""}" data-m="${mo}">${MON[Number(mo.slice(5)) - 1].slice(0, 3)} ${mo.slice(2, 4)}</button>`).join("")}</div>
        <div class="qacts"><button class="btn" data-back>Back</button><button class="btn solid" data-next>Build my weekend</button></div></div>`;
      el.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { PLAN.days = Number(b.dataset.d); drawPlan(); });
      el.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { PLAN.month = b.dataset.m; drawPlan(); });
      el.querySelector("[data-back]").onclick = () => { PLAN.step = 1; drawPlan(); };
      el.querySelector("[data-next]").onclick = () => { PLAN.step = 3; drawPlan(); el.scrollIntoView({ behavior: "smooth" }); };
    } else drawItinerary(el);
  }
  // pick the stays that fit the group, biggest first
  function fitStays(n) {
    if (PLAN.occ === "bach" && n <= 14) return { list: (n <= 8 ? ["clayborn", "cosmopolitan"] : ["clayborn", "boones"]).map(id => STAYS.find(s => s.id === id)), left: 0 };
    const order = ["allies", "boones", "clayborn", "cosmopolitan"].map(id => STAYS.find(s => s.id === id));
    const out = []; let left = n;
    for (const s of order) { if (left <= 0) break; out.push(s); left -= s.guests; }
    return { list: out, left: Math.max(0, left) };
  }
  function itinerary() {
    const n = PLAN.people, o = PLAN.occ, days = PLAN.days;
    const big = n > 40, mid = n > 14;
    const venue = o === "wedding" || o === "holiday" || big ? "revival" : o === "bach" ? "merrifield" : o === "retreat" ? (mid ? "revival" : "velvet") : o === "birthday" ? "pinkhouse" : o === "girls" ? "merrifield" : null;
    const D1 = [], D2 = [], D3 = [];
    D1.push(["stays", "Check in", "Settle into your homes", "3 PM"]);
    D1.push(["ernies", "Supper and a lane at Ernie's", mid ? "Lanes held for the group" : "Table for " + n, "6:30 PM"]);
    if (o === "wedding") { D1.splice(1, 1, ["velvet", "Rehearsal dinner at The Velvet Room", "Private bar and kitchen", "6:30 PM"]); D1.push(["doubledip", "Late sundaes at the Double Dip", "", "9 PM"]); }
    if (o === "retreat") D1.splice(1, 0, ["revival", "Welcome session at Revival Hall", "", "4 PM"]);
    if (o === "bach") D1.splice(1, 1, ["merrifield", "Private tea party at Miss Merrifield's", "The parlor to yourselves", "7 PM"]);
    if (o === "holiday") D1.splice(1, 1, ["velvet", "Cocktails at The Velvet Room", "", "6 PM"]);
    if (days >= 2) {
      D2.push(["shortcrust", "Coffee and pastries at Shortcrust", "", "9 AM"]);
      if (o === "wedding") { D2.push(["pinkhouse", "Bridal tea at The Old Pink House", "", "11 AM"]); D2.push(["revival", "Ceremony and reception at Revival Hall", n + " guests", "4 PM"]); D2.push(["rowdys", "After-party at Rowdy's", "", "10 PM"]); }
      else if (o === "bach") { D2.push(["nettie", "Bourbon tasting with her name on the flight", "", "2 PM"]); D2.push(["ernies", "Ernie's with your own DJ or band", "Lanes held", "7 PM"]); D2.push(["rowdys", "Line-dance lesson at Rowdy's", "", "10 PM"]); }
      else if (o === "holiday") { D2.push(["revival", "Holiday dinner at Revival Hall", n + " guests", "6 PM"]); D2.push(["ernies", "Bowling and a band", "", "9 PM"]); }
      else if (o === "retreat") { D2.push(["revival", "Meeting day at Revival Hall", n + " seats", "9 AM–4 PM"]); D2.push(["nettie", "Bourbon flight at Nettie Jarvis", "", "4:30 PM"]); D2.push(["velvet", "Team dinner in The Velvet Room", "", "7 PM"]); }
      else {
        D2.push(["merrifield", o === "girls" || o === "birthday" ? "Private tea at Miss Merrifield's" : "Afternoon tea at Miss Merrifield's", "", "12 PM"]);
        D2.push(["nettie", "Bourbon tasting at Nettie Jarvis", "", "3 PM"]);
        if (venue === "pinkhouse") D2.push(["pinkhouse", "Party at The Old Pink House", "", "6 PM"]);
        D2.push(["rowdys", "Dancing at Rowdy's", "", "8 PM"]);
      }
    }
    if (days >= 3) { D3.push(["town", "The Deere John tractors and the creek walk", "", "10 AM"]); D3.push(["doubledip", "One last shake for the road", "", "1 PM"]); }
    return { venue, days: [D1, D2, D3].filter(d => d.length) };
  }
  function estimate(it, st) {
    const nights = Math.max(1, PLAN.days - (PLAN.days > 1 ? 0 : 0));
    let stay = st.list.reduce((a, s) => a + s.night * nights, 0);
    let venue = it.venue === "revival" ? (PLAN.people > 60 ? 6500 : 3500) : it.venue === "velvet" ? 1800 : it.venue === "pinkhouse" ? 500 : it.venue === "merrifield" ? 500 : 0;
    const food = PLAN.people * (PLAN.occ === "wedding" ? 85 : 48) * Math.max(1, PLAN.days - 0.5);
    const fun = PLAN.people * (PLAN.occ === "bourbon" ? 45 : 28);
    const lo = stay + venue + food + fun, hi = lo * 1.35;
    return { stay, venue, food, fun, lo, hi };
  }
  function drawItinerary(el) {
    const occ = OCC.find(o => o[0] === PLAN.occ);
    const st = fitStays(PLAN.people), it = itinerary(), est = estimate(it, st);
    const mo = MON[Number(PLAN.month.slice(5)) - 1] + " " + PLAN.month.slice(0, 4);
    const name = k => k === "shortcrust" ? "Shortcrust" : (B[k] || B.town).name;
    el.innerHTML = `<div class="itin">
      <div class="it-head"><div>${bubble(occ[2], 56)}</div><div><span class="qn">Your weekend</span><h2>${esc(occ[1])} · ${PLAN.people} people · ${PLAN.days === 1 ? "one night" : PLAN.days + " days"} · ${mo}</h2></div><button class="btn small" data-edit>Change</button></div>
      <div class="it-grid">
        <div class="days">${it.days.map((d, i) => `<div class="dayc"><h3>${["Friday", "Saturday", "Sunday"][i] || "Day " + (i + 1)}</h3>${d.map(s => `<div class="stop">${bubble(s[0] === "shortcrust" ? "partner" : s[0], 36)}<div><b>${esc(s[1])}</b><span>${esc(s[3])}${s[2] ? " · " + esc(s[2]) : ""}</span></div></div>`).join("")}</div>`).join("")}</div>
        <div class="it-side">
          <div class="itmap">${itinMap(it, st)}</div>
          <div class="sleep"><h3>Where everyone sleeps</h3>${st.list.map(s => `<a href="#stay-${s.id}" class="sleepr"><img src="${s.photos[0]}" alt=""><span><b>${esc(s.title)}</b><small>Sleeps ${s.guests}</small></span></a>`).join("")}
            ${st.left ? `<p class="muted">${st.left} more guests: we hold a room block in Bardstown, ten minutes away.</p>` : ""}</div>
          ${it.venue ? `<div class="sleep"><h3>Where you gather</h3><a href="#${it.venue}" class="sleepr"><img src="${D.biz[it.venue].hero}" alt=""><span><b>${esc(B[it.venue].name)}</b><small>${esc(D.biz[it.venue].kind)}</small></span></a></div>` : ""}
        </div>
      </div>
      <div class="estimate">
        <div><span class="qn">Estimated total</span><b class="est-big">${money(est.lo)} – ${money(est.hi)}</b>
          <div class="est-lines"><span>Stays ${money(est.stay)}</span>${est.venue ? `<span>Venue ${money(est.venue)}</span>` : ""}<span>Food & drink ${money(est.food)}</span><span>Tastings & fun ${money(est.fun)}</span></div></div>
        <div class="row"><button class="btn solid" data-inq>Send this to us</button><button class="btn" data-call>Call (502) 252-9555</button></div>
      </div>
    </div>`;
    el.querySelector("[data-edit]").onclick = () => { PLAN.step = 0; drawPlan(); };
    el.querySelector("[data-inq]").onclick = () => sheet("plan", occ[2], { what: `${occ[1]} for ${PLAN.people}, ${PLAN.days} days, ${mo}`, total: `${money(est.lo)} – ${money(est.hi)}` });
    el.querySelector("[data-call]").onclick = () => copyText("(502) 252-9555", "Number copied");
  }
  function itinMap(it, st) {
    // a small hand-drawn plan of Taylorsville Rd with the weekend's stops on it
    const pos = { nettie: [92, 112], ernies: [128, 120], doubledip: [128, 104], merrifield: [92, 80], pinkhouse: [70, 78], velvet: [70, 150], rowdys: [54, 166], revival: [140, 56], shortcrust: [30, 196], town: [110, 12],
      allies: [206, 18], boones: [30, 40], clayborn: [126, 26], cosmopolitan: [22, 214] };
    const used = new Set(it.days.flat().map(s => s[0]).concat(st.list.map(s => s.id)));
    if (it.venue) used.add(it.venue);
    let dots = "";
    for (const k of used) { const p = pos[k]; if (!p) continue; const br = B[k] || B.stays; dots += `<g transform="translate(${p[0]} ${p[1]})"><circle r="9" fill="${STAYS.find(s => s.id === k) ? B.stays.c : k === "shortcrust" ? B.partner.c : br.c}" stroke="#fff" stroke-width="2"/></g>`; }
    return `<svg viewBox="0 0 240 240" role="img" aria-label="Map of the weekend's stops">
      <rect width="240" height="240" fill="#e9e1cf"/>
      <path d="M110 0 L112 140 L150 240" stroke="#c9a24a" stroke-width="7" fill="none"/>
      <path d="M112 140 L40 190 L0 230" stroke="#9a9283" stroke-width="5" fill="none"/>
      <path d="M112 140 L240 136" stroke="#9a9283" stroke-width="5" fill="none"/>
      <path d="M0 110 C40 140 80 170 110 175 C140 190 150 220 160 240" stroke="#7d97a3" stroke-width="4" fill="none" opacity=".8"/>
      <text x="118" y="70" font-family="Cormorant SC, serif" font-size="11" fill="#5a4a33" transform="rotate(88 118 70)">Taylorsville Rd</text>
      ${dots}</svg>`;
  }

  /* ---------- booking sheets ---------- */
  const SHEETS = {
    tasting: { h: "Book a bourbon tasting", f: ["date:Sat, Nov 14 · 4 PM|Sat, Dec 12 · 4 PM|Private tasting", "guests", "name", "email"] },
    table: { h: "Reserve a table", f: ["day", "time:5:30|6:00|6:30|7:00|7:30|8:00", "guests", "name", "phone"] },
    lane: { h: "Book a bowling lane", f: ["day", "time:6:00|7:00|8:00|9:00", "guests", "name", "phone"] },
    tea: { h: "Reserve tea", f: ["date:Wed, Nov 4|Thu, Nov 5|Wed, Nov 11|Thu, Nov 12|Wed, Nov 18", "time:12:00|1:00|2:00|3:00", "guests", "name", "phone"] },
    venue: { h: "Check dates", f: ["kind:Wedding|Shower or party|Dinner|Meeting or retreat|Something else", "day", "guests", "name", "email", "note"] },
    party: { h: "Plan a party", f: ["kind:Birthday|Ice cream social|Team treat", "day", "guests", "name", "phone"] },
    tickets: { h: "Get tickets", f: ["date:Sat, Nov 7 · Dance Night|Sat, Nov 14 · Hannah Wheeler & The Heartaches", "tier:General · $15|VIP · $35", "qty", "name", "email"] },
    stay: { h: "Confirm your stay", f: ["name", "email", "card"] },
    plan: { h: "Send us your weekend", f: ["name", "email", "phone", "note"] },
    band: { h: "Book your band at Ernie's", f: ["band", "genre:Bluegrass|Country|Rock & covers|Something else", "nights:Fridays|Saturdays|Any night", "link", "name", "email", "phone", "note"] },
  };
  function field(f, ctx) {
    const [k, opts] = f.split(":");
    const id = "f-" + k;
    if (opts) return `<label>${{ date: "Date", time: "Time", kind: "What is it", tier: "Ticket", genre: "Your sound", nights: "Best nights" }[k]}<div class="slots" data-slot="${k}">${opts.split("|").map((o, i) => `<button type="button" class="${i === 0 ? "on" : ""}">${esc(o)}</button>`).join("")}</div></label>`;
    if (k === "day") return `<label>Date<input id="${id}" type="date" min="${D.today}" value="${ctx.date || "2026-11-13"}"></label>`;
    if (k === "guests" || k === "qty") return `<label>${k === "qty" ? "Tickets" : "Guests"}<select id="${id}">${Array.from({ length: k === "qty" ? 8 : 12 }, (_, i) => `<option ${i === 1 ? "selected" : ""}>${i + 1}${k === "guests" && i === 11 ? "+" : ""}</option>`).join("")}</select></label>`;
    if (k === "note") return `<label>Anything we should know<textarea id="${id}" rows="3"></textarea></label>`;
    if (k === "card") return `<label>Card<input id="${id}" placeholder="Secure checkout opens here" disabled></label>`;
    return `<label>${{ name: "Name", email: "Email", phone: "Phone", band: "Band name", link: "Link to your music" }[k]}<input id="${id}" type="${k === "email" ? "email" : k === "phone" ? "tel" : "text"}" autocomplete="${k === "name" ? "name" : k}"></label>`;
  }
  function sheet(type, brand, ctx) {
    ctx = ctx || {};
    const s = SHEETS[type] || SHEETS.venue, b = B[brand] || B.town;
    const wrap = document.createElement("div"); wrap.className = "sheet";
    const title = brand === "revival" && type === "venue" ? "Hold a date at Revival Hall" : s.h;
    wrap.innerHTML = `<form class="box" style="--s-accent:${b.c}">
      <div class="cardline">${bubble(brand, 44)}<div><span class="tag">${esc(b.name)}</span><h3>${esc(title)}</h3></div></div>
      ${ctx.what ? `<p class="ctx"><b>${esc(ctx.what)}</b>${ctx.date ? ` · ${fmt(ctx.date)}${ctx.out ? " to " + fmt(ctx.out) : ""}` : ""}${ctx.total ? ` · ${esc(ctx.total)}` : ""}</p>` : ""}
      <div class="grid2">${s.f.map(f => field(f, ctx)).join("")}</div>
      ${type === "tickets" ? `<div class="lines tix-total"><div class="tot"><span>Total</span><span id="tix-total">$30</span></div><p class="muted small">Paid securely to Rowdy's through Square. Your QR ticket arrives by text and email.</p></div>` : ""}
      <div class="acts"><button type="button" class="btn" data-x>Cancel</button><button class="btn solid">${type === "stay" ? "Book and pay" : type === "plan" ? "Send" : type === "tickets" ? "Buy tickets" : "Request"}</button></div>
    </form>`;
    document.body.appendChild(wrap);
    const tixTotal = () => { const t = wrap.querySelector("#tix-total"); if (!t) return; const tier = wrap.querySelector('[data-slot="tier"] .on'); const each = tier && tier.textContent.includes("35") ? 35 : 15; t.textContent = money(each * Number((wrap.querySelector("#f-qty") || { value: 1 }).value)); };
    wrap.querySelectorAll("[data-slot]").forEach(g => g.querySelectorAll("button").forEach(bt => bt.onclick = () => { g.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === bt)); tixTotal(); }));
    const qy = wrap.querySelector("#f-qty"); if (qy) qy.onchange = tixTotal;
    const close = () => wrap.remove();
    wrap.querySelector("[data-x]").onclick = close;
    wrap.addEventListener("click", e => { if (e.target === wrap) close(); });
    wrap.querySelector("form").onsubmit = async e => {
      e.preventDefault();
      const val = id => { const el = wrap.querySelector("#f-" + id); return el ? el.value : ""; };
      const slot = k => { const g = wrap.querySelector(`[data-slot="${k}"] .on`); return g ? g.textContent : ""; };
      const rec = { type, brand, what: ctx.what || slot("date") || slot("kind") || title, when: ctx.date || val("day") || slot("date"), time: slot("time"), guests: ctx.guests || val("guests") || val("qty"), name: val("name") || "Guest", contact: val("email") || val("phone"), note: val("note"), total: ctx.total || "", at: new Date().toISOString(), status: "new" };
      if (APP.db) { try { await APP.db.collection("requests").add(rec); } catch (err) { /* still show the confirmation */ } }
      wrap.querySelector("form").innerHTML = `<div class="done">${bubble(brand, 60)}<h3>${type === "stay" ? "You're booked." : type === "tickets" ? "You're going." : "Request sent."}</h3>
        <p>${type === "stay" ? "A confirmation is on its way, and the dates are blocked everywhere." : type === "tickets" ? "Your QR ticket is on its way by text and email. Show it at the door." : `${esc(b.name)} will confirm within the hour.`}</p>
        <p class="lands">This just landed in the Town Center inbox.</p>
        <div class="acts" style="justify-content:center"><button type="button" class="btn" data-x>Close</button><a class="btn solid" href="#center-inbox" data-x>See it in Town Center</a></div></div>`;
      wrap.querySelectorAll("[data-x]").forEach(x => x.addEventListener("click", close));
    };
  }

  /* ---------- small things ---------- */
  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }
  async function copyText(s, msg) { try { await navigator.clipboard.writeText(s); toast(msg); } catch (e) { toast(s); } }

  document.addEventListener("click", e => {
    const bk = e.target.closest("[data-book]");
    if (bk) { e.preventDefault(); sheet(bk.dataset.book, bk.dataset.brand, { what: bk.dataset.what, date: bk.dataset.date }); return; }
    const z = e.target.closest("[data-zoom], .gal img");
    if (z && !document.body.classList.contains("picking")) { const lb = document.createElement("div"); lb.className = "lightbox"; lb.innerHTML = `<img src="${z.src}" alt="">`; lb.onclick = () => lb.remove(); document.body.appendChild(lb); return; }
    if (e.target.closest("[data-join]")) { const f = document.querySelector("[data-joinform] input"); f && f.focus(); f && f.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    const pt = e.target.closest("[data-partner]");
    if (pt) { sheet("venue", "partner", { what: pt.dataset.partner === "free" ? "Free listing on Stay in Bloomfield" : "Featured spot on Stay in Bloomfield" }); return; }
  });
  document.addEventListener("submit", async e => {
    const f = e.target.closest("[data-joinform]"); if (!f) return;
    e.preventDefault();
    const email = f.querySelector("input[type=email]").value, phone = (f.querySelector("input[type=tel]") || {}).value || "";
    if (APP.db) { try { await APP.db.collection("requests").add({ type: "signup", brand: "town", what: "Joined the mailing list", name: email, contact: phone, at: new Date().toISOString(), status: "new" }); } catch (err) {} }
    f.innerHTML = `<p class="joined">You're on the list. See you on Taylorsville Road.</p>`;
  });

  if (!location.hash) history.replaceState(null, "", "#welcome");
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => render()); else setTimeout(render);
})();
