/* The new apexconstgc.com, shown inside a browser window on the "The new site" page.
   Its bid form doesn't send anything: it shows the lead card the Field Office would create. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI } = APP;
  const C = AX.co;
  const SVC = [
    ["shield", "SB-326 and SB-721 balcony repair", "Got an inspection report? We turn it into a plan, a price and a permit, then do the work."],
    ["field", "Soft story retrofits", "Seismic upgrades for wood-frame apartments, built to the engineer's plans and the city's deadline."],
    ["repeat", "Dry rot and residing", "We open it up, find where the water got in, and rebuild it so it stays out."],
    ["est", "Large beam replacement", "Structural repairs done safely, with shoring, engineering and inspections handled."],
    ["star", "Composite decks", "Decks and stairs built to last, from the framing up."],
    ["site", "ADUs and additions", "Permits, plans and the build, managed start to finish."],
    ["folder", "Tenant improvements", "Offices, restrooms, mezzanines and storefronts for commercial tenants."],
    ["users", "HOAs and property managers", "One contractor for every building, with the paperwork your board needs."],
    ["cal", "Multi-phase projects", "We plan, manage and build large jobs in phases so residents keep living there."],
  ];
  const WORK = [
    ["img/work/hero.jpg?v=1793928429", "Rooftop deck with composite decking and a custom rail · East Bay"],
    ["img/work/img0745.jpg?v=1793928429", "Warehouse tenant improvement with mezzanine office and stair"],
    ...((AX.found && AX.found.work) || []),
  ];
  const stars = n => "★★★★★".slice(0, Math.round(n)) + "☆☆☆☆☆".slice(0, 5 - Math.round(n));

  function reviews() {
    const R = AX.reviews || { items: [], score: [] };
    const items = R.items.length ? R.items : [];
    return `
      <div class="ns-k">What clients say</div><h2>Reviews from everywhere you're listed.</h2>
      <div class="ns-score">${R.score.map(s => `<div><b>${esc(s[1])}</b>${esc(s[0])}<span style="color:#9aa3bd">· ${esc(s[2])}</span></div>`).join("")}</div>
      ${items.length ? `<div class="ns-rev">${items.map(r => `<div class="rv"><div class="st">${stars(r.stars)}</div><p>"${esc(r.text)}"</p><small><b style="color:#0b1240">${esc(r.who)}</b> · ${esc(r.src)}${r.date ? " · " + esc(r.date) : ""}</small></div>`).join("")}</div>` : `<div class="ns-rev"><div class="rv" style="grid-column:1/-1"><p>Every review from Google, Yelp and Nextdoor shows here as soon as it's posted.</p></div></div>`}
      <div class="ns-sync"><i></i>Pulled from Google, Yelp and Nextdoor · after every finished job, the Field Office asks the client for a review</div>`;
  }

  function page() {
    return `<div class="ns">
      <div class="ns-top"><img src="img/logo-blue.png?v=1793928429" alt="Apex Construction General Contractors Inc."><nav><a href="#site" data-ns="svc">Services</a><a href="#site" data-ns="work">Our work</a><a href="#site" data-ns="rev">Reviews</a><a href="#site" data-ns="race">Racing</a><a href="#site" data-ns="bid">Get a bid</a></nav><a class="ns-call" href="tel:${C.tel}">${esc(C.phone)}</a></div>
      <div class="ns-hero" style="background-image:url(img/work/hero.jpg?v=1793928429)"><div>
        <div style="font-weight:800;letter-spacing:.2em;font-size:13px;color:#ff8a66;margin-bottom:12px">GENERAL CONTRACTORS · SAN LEANDRO · SINCE 1991</div>
        <h1 class="disp">Built right.<br>Repaired right.<br>For 35 years.</h1>
        <p>Balcony repairs, seismic retrofits, dry rot, decks, ADUs and tenant improvements across the East Bay. Family owned. Same address since 1991.</p>
        <div class="ns-ctas"><a class="ns-btn" href="#site" data-ns="bid">Request a bid</a><a class="ns-btn w" href="#site" data-ns="sb">Have an inspection report?</a></div>
      </div></div>
      <div class="ns-trust"><div><b>Lic. #${C.lic}</b><span>CSLB ${esc(C.licClass)} · active</span></div><div><b>Since ${C.since}</b><span>Same San Leandro address</span></div><div><b>Bonded and insured</b><span>Certificates on request</span></div><div><b>Mon to Fri, 7 to 4</b><span>Same hours everywhere you find us</span></div></div>

      <div class="ns-sec" id="ns-svc"><div class="ns-k">What we do</div><h2>Existing buildings are our specialty.</h2><p style="color:#4b5470;font-size:18px;max-width:720px">Apex does all forms of construction, commercial and residential. Most of our work is making existing buildings safe, sound and good looking again.</p>
        <div class="ns-svc">${SVC.map(s => `<div><span class="ico">${svgI(s[0], 22)}</span><b>${esc(s[1])}</b><p>${esc(s[2])}</p></div>`).join("")}</div></div>

      <div class="ns-sec" id="ns-sb" style="background:#f3f6ff"><div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center" class="ns-sbg">
        <div><div class="ns-k">Balcony inspections</div><h2>Your inspector found problems. We fix them.</h2>
        <p style="color:#4b5470;font-size:17px">California's balcony laws (SB-326 for condos and HOAs, SB-721 for apartments) mean regular inspections, and the inspector can't do the repairs. Send us the report and we'll send back a scope, a price and a schedule that meets your deadline.</p>
        <a class="ns-btn" href="#site" data-ns="bid">Send us your report</a></div>
        <div style="background:#fff;border:1px solid #e3e7f1;border-radius:16px;padding:22px;font-size:15px;color:#2a3150">
          <b style="font-size:17px;color:#0b1240">What happens next</b>
          <ol style="margin:12px 0 0;padding-left:20px;display:grid;gap:8px"><li>Upload the inspection report (PDF is fine).</li><li>We walk the site and open what needs opening.</li><li>You get a scope and price your board can vote on.</li><li>We pull the permit and do the work on your timeline.</li><li>You get the sign-off package for your records, and a reminder before the next inspection.</li></ol></div>
      </div></div>

      <div class="ns-sec" id="ns-work"><div class="ns-k">Recent work</div><h2>The work, up close.</h2>
        <div class="ns-work">${WORK.slice(0, 9).map(w => `<figure><img src="${w[0]}" alt="${esc(w[1])}" loading="lazy"><figcaption>${esc(w[1])}</figcaption></figure>`).join("")}${WORK.length < 9 ? `<figure style="display:grid;place-items:center;background:#eef2ff;color:#0018b2;font-weight:800;text-align:center;padding:16px">Job photos from the Field Office<br>post here automatically<br>when a job is finished</figure>` : ""}</div></div>

      <div class="ns-sec" id="ns-rev" style="background:#fafbff">${reviews()}</div>

      <div class="ns-sec" id="ns-bid">
        <div class="ns-form"><div><div class="ns-k" style="color:#ff8a66">Request a bid</div><h2>Tell us about the project.</h2>
          <p style="font-size:17px;opacity:.85">Usually a reply the same business day. Every request goes straight to Kameron's phone, with the address on a map and any files you attach.</p>
          <div style="margin-top:24px;font-size:16px;line-height:1.8"><b>${esc(C.short)}</b><br>${esc(C.addr)}<br>${esc(C.city)}<br><a href="tel:${C.tel}" style="color:#9db4ff">${esc(C.phone)}</a></div>
          <div class="ns-area">${C.area.map(a => `<span style="background:rgba(255,255,255,.1);color:#fff">${esc(a)}</span>`).join("")}</div></div>
          <form id="ns-form" onsubmit="return false">
            <div class="row2"><label>Your name<input name="person" placeholder="Pat Lee"></label><label>Phone<input name="phone" placeholder="(510) 555-0142"></label></div>
            <div class="row2"><label>Email<input name="mail" type="email" placeholder="pat@example.com"></label><label>I am a<select name="who"><option>Homeowner</option><option>HOA board or manager</option><option>Property owner or manager</option><option>Business tenant</option><option>Architect or engineer</option></select></label></div>
            <label>Project address<input name="addr" placeholder="1450 Bayview Ave, Alameda"></label>
            <label>What do you need?<span class="chips">${["Balcony repair", "Soft story", "Dry rot", "Deck", "ADU or addition", "Tenant improvement", "Something else"].map((c, i) => `<label><input type="checkbox" name="kind" value="${c}"${i === 0 ? " checked" : ""}>${c}</label>`).join("")}</span></label>
            <label>Tell us more<textarea name="note" rows="3" placeholder="Inspection report says 6 balconies need joist repair before March.">Inspection report says 6 balconies need joist repair before March.</textarea></label>
            <label>Plans, photos or inspection report<input type="file" multiple></label>
            <button class="ns-btn" type="submit" style="justify-self:start">Send my request</button>
          </form></div>
        <div id="ns-landed"></div>
      </div>

      <div class="ns-sec" id="ns-race"><div class="ns-race"><img src="img/work/img2160.jpg?v=1793928429" alt="The #28 Apex sprint car, feature winner at Ocean Speedway in Watsonville, 2024">
        <div><div class="flagbar check"></div><div class="ns-k" style="margin-top:14px">SUOJA Motorsports</div><h2>Built like the car.</h2>
        <p style="font-size:17px;opacity:.85">${esc((AX.race && AX.race.blurb) || "We combine our passion for racing with our dedication to quality construction. With attention to detail, every project meets the highest standards, just like the cars we put on the track.")}</p>
        <p style="font-size:15px;opacity:.7">The #28 Apex 360 sprint car · 2024 feature winner at Ocean Speedway, Watsonville</p>
        <a class="ns-btn" href="#site" data-ns="race">See you at the track</a></div></div></div>

      <div class="ns-foot"><div><img src="img/logo-white.png?v=1793928429" alt="" style="height:70px;margin-bottom:12px"><div>${esc(C.name)}<br>CSLB Lic. #${C.lic} · Bonded and insured</div></div>
        <div><b>Visit</b>${esc(C.addr)}<br>${esc(C.city)}<br>Mon to Fri, 7 a.m. to 4 p.m.</div>
        <div><b>Call</b><a href="tel:${C.tel}">${esc(C.phone)}</a><b style="margin-top:12px">Find us on</b><a>Google</a><a>Yelp</a><a>Nextdoor</a></div>
        <div><b>For property managers</b><a>Vendor packet and insurance</a><a>Balcony inspection repairs</a><a>Request a bid</a></div></div>
    </div>`;
  }

  function landed(f) {
    const kinds = [...f.querySelectorAll("[name=kind]:checked")].map(x => x.value).join(", ") || "Not picked";
    const v = n => esc((f.elements[n] && f.elements[n].value) || "");
    return `<div class="hb" style="display:block;margin-top:24px;min-height:0;padding:22px 26px;border-radius:18px">
      <div class="hb-h"><span class="tag race">What just landed in the Field Office</span><h3 style="margin-left:4px">New lead · ${v("person") || "Pat Lee"}</h3><span class="sp"><span class="tag ok">Text sent to Kameron</span></span></div>
      <table class="hb-t"><tr><th>From</th><td>${v("person") || "Pat Lee"} · ${v("who")} · ${v("phone") || "(510) 555-0142"}</td></tr>
      <tr><th>Where</th><td>${v("addr") || "1450 Bayview Ave, Alameda"} · <b>7.2 miles</b> from the yard · in your service area</td></tr>
      <tr><th>Work</th><td>${esc(kinds)}</td></tr><tr><th>Note</th><td>${v("note")}</td></tr>
      <tr><th>The Field Office did</th><td>Started a draft estimate from your balcony assembly · checked the address for past Apex jobs (none) · added a follow-up for tomorrow at 9 if no one replies · put the lead on the Google listing's report</td></tr></table>
      <p style="font-size:13px;color:#6b7390;margin:12px 0 0">A preview. On the real site, the client also gets an email from Apex saying who will call and when.</p></div>`;
  }

  APP.views.site = () => `
    <section class="sec hero-in" style="padding-bottom:30px"><div class="wrap">
      <div class="kick">The front door</div>
      <h1 class="h1">The new apexconstgc.com</h1>
      <p class="lede">Today's site is three pages with no phone number, no address and no services list. The new one tells an HOA manager in ten seconds that Apex is the call, and every request it takes goes straight into the portal.</p>
      <div class="pill-row"><span class="y">Phone and address on every page</span><span class="y">Every service</span><span class="y">Reviews from every listing</span><span class="y">Bid form with file upload</span><span class="y">Inspection report path</span><span class="y">Same hours everywhere</span><span class="y">Racing kept</span></div>
    </div></section>
    <section style="padding:0 0 60px"><div class="wrap"><div class="ns-frame rise" id="ns-frame"><div class="ns-chrome"><i></i><i></i><i></i><span>apexconstgc.com</span></div>${page()}</div>
      <p class="src">Photos are Apex's own, from the current site. Review text is real and quoted from each listing. The form is a working demo: press send to see what lands in the Field Office.</p></div></section>
    <section class="sec" style="padding-top:20px"><div class="wrap">
      <div class="kick">Tied to every listing</div><h2 class="h2">Change it once. It changes everywhere.</h2>
      <p class="lede">The site, Google, Yelp, Nextdoor, The Blue Book and every bid list read from the same profile in the Field Office. Hours, phone, services, photos and license all match, and new reviews flow back to the site.</p>
      <div class="grid g3 rise" style="margin-top:30px">
        <div class="card"><b style="font-size:20px">Today</b><ul class="lst"><li>Site says 8 to 5, Google says 9 to 5, Yelp says 7 to 4</li><li>Google listing has no website and one review from 7 years ago</li><li>Competitors' ads run on your own Yelp page</li></ul></div>
        <div class="card"><b style="font-size:20px">One profile in the Field Office</b><ul class="lst"><li>Name, phone, hours, license, services, service area</li><li>Photos from finished jobs, picked by you</li><li>Bonding, insurance and vendor packet for managers</li></ul></div>
        <div class="card"><b style="font-size:20px">Everywhere, matching</b><ul class="lst"><li>Google, Yelp, Nextdoor, Facebook, Blue Book</li><li>BuildingConnected and city vendor lists</li><li>HOA management vendor programs</li></ul></div>
      </div>
    </div></section>
    ${APP.next("read", "The deep read")}`;

  document.addEventListener("click", e => {
    const a = e.target.closest("[data-ns]");
    if (a) { e.preventDefault(); const el = document.getElementById("ns-" + a.dataset.ns); el && el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  });
  document.addEventListener("submit", e => {
    if (e.target.id !== "ns-form") return;
    e.preventDefault();
    const out = document.getElementById("ns-landed"); out.innerHTML = landed(e.target); out.scrollIntoView({ behavior: "smooth", block: "center" });
  }, true);
})();
