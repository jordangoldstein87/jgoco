/* The new originalmechanical.com, shown inside a browser window on the "The new site" page.
   Its forms don't send anything: they show the lead card the Mechanical Room would create. */
(function () {
  const AX = window.AX, APP = window.APP, { esc, svgI } = APP;
  const C = AX.co;
  const SVC = [
    ["est", "Design and load calcs", "Manual J, S and D from your architect's plans, room by room, before a single duct is bought."],
    ["field", "Custom home new construction", "Underground, rough-in, equipment, trim and start-up, on the builder's schedule."],
    ["site", "High-end remodels", "New systems in finished homes, with the care a finished home needs."],
    ["repeat", "Linear slots and hidden returns", "Air that disappears into the architecture. Slots lined up with the beams, not the other way around."],
    ["users", "Zoning and smart controls", "Every wing, casita and guest house at its own temperature."],
    ["shield", "Fresh air and filtration", "ERVs, whole-house filtration and humidity control for tight new homes."],
    ["bolt", "Ductless for casitas and garages", "Quiet, efficient heads for guest houses, gyms, wine rooms and garages."],
    ["cal", "Service and maintenance plans", "Spring tune-ups, priority calls in July, and a tech who knows your house."],
    ["folder", "Commercial suite build-outs", "Rooftop units and ductwork for offices and medical suites."],
  ];
  const WORK = (AX.found && AX.found.work) || [];

  function reviews() {
    return `
      <div class="ns-k">What builders and owners say</div><h2>Reviews from everywhere you're listed.</h2>
      <div class="ns-rev"><div class="rv" style="grid-column:1/-1"><p style="font-size:18px">Reviews from Google, Houzz and Yelp show here as soon as they're posted. After every start-up, the Mechanical Room asks the owner and the builder for one.</p><small>Today there are none public. Asking the first ten past clients changes that within a month.</small></div></div>
      <div class="ns-sync"><i></i>Pulled from Google, Houzz and Yelp · requested automatically after every finished house</div>`;
  }

  function page() {
    return `<div class="ns">
      <div class="ns-top"><img src="img/logo-blue.png?v=1794181557" alt="Original Mechanical Co., Quality Air Solutions"><nav><a href="#site" data-ns="svc">Services</a><a href="#site" data-ns="work">Projects</a><a href="#site" data-ns="trade">For builders</a><a href="#site" data-ns="svcplan">Service plans</a><a href="#site" data-ns="bid">Get a bid</a></nav><a class="ns-call" href="tel:${C.tel}">${esc(C.phone)}</a></div>
      <div class="ns-hero" style="background-image:url(img/work/IMG_5145.jpg?v=1794181557)"><div>
        <div style="font-weight:800;letter-spacing:.2em;font-size:13px;color:#f2a865;margin-bottom:12px">RESIDENTIAL MECHANICAL · SCOTTSDALE · PARADISE VALLEY · EAST VALLEY</div>
        <h1 class="disp">Comfort you feel.<br>Systems you never see.</h1>
        <p>HVAC design and installation for custom homes and high-end remodels. Built with your builder, drawn around your architect, and serviced for as long as you live there.</p>
        <div class="ns-ctas"><a class="ns-btn" href="#site" data-ns="bid">Send us your plans</a><a class="ns-btn w" href="#site" data-ns="bid">Book a service call</a></div>
      </div></div>
      <div class="ns-trust"><div><b>ROC #${C.lic}</b><span>${esc(C.licClass)} · active</span></div><div><b>Bonded and insured</b><span>Certificates on request</span></div><div><b>Manual J, S and D</b><span>On every new system</span></div><div><b>${esc(C.hours)}</b><span>Same hours everywhere you find us</span></div></div>

      <div class="ns-sec" id="ns-svc"><div class="ns-k">What we do</div><h2>Mechanical systems for homes built to last.</h2><p style="color:#5c4b3d;font-size:18px;max-width:720px">We work with homeowners, builders, architects and designers who care how a system is planned, not just what it costs. Every project starts with the loads and ends with a balanced, tested system.</p>
        <div class="ns-svc">${SVC.map(s => `<div><span class="ico">${svgI(s[0], 22)}</span><b>${esc(s[1])}</b><p>${esc(s[2])}</p></div>`).join("")}</div></div>

      <div class="ns-sec" id="ns-trade" style="background:#faf3ea"><div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center" class="ns-sbg">
        <div><div class="ns-k">For builders and architects</div><h2>Send the plans. Get a design, not a guess.</h2>
        <p style="color:#5c4b3d;font-size:17px">Upload the plan set and we send back the load calcs, equipment, a duct layout coordinated with your reflected ceiling plan, and a price with a clear expiration. Your superintendent gets a schedule that follows yours.</p>
        <a class="ns-btn" href="#site" data-ns="bid">Upload a plan set</a></div>
        <div style="background:#fff;border:1px solid #e9dfd3;border-radius:16px;padding:22px;font-size:15px;color:#3a2b1f">
          <b style="font-size:17px;color:#2b1d13">How a house goes</b>
          <ol style="margin:12px 0 0;padding-left:20px;display:grid;gap:8px"><li>Plans in. Manual J, S and D, room by room.</li><li>Layout drawn with the architect's ceiling plan.</li><li>Underground and rough-in on your schedule, photos to your super.</li><li>Equipment set, trim, start-up and a balancing report.</li><li>Warranty registered, and the owner on a service plan.</li></ol></div>
      </div></div>

      <div class="ns-sec" id="ns-work"><div class="ns-k">Recent projects</div><h2>The work, up close.</h2>
        <div class="ns-work">${WORK.slice(0, 6).map(w => `<figure><img src="${w[0]}" alt="${esc(w[1])}" loading="lazy"><figcaption>${esc(w[1])}</figcaption></figure>`).join("")}</div></div>

      <div class="ns-sec" id="ns-svcplan" style="background:#2b1d13;color:#f7efe4"><div style="display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center" class="ns-sbg">
        <div><div class="ns-k" style="color:#f2a865">Service plans</div><h2 style="color:#fff">Two visits a year. First in line in July.</h2>
        <p style="font-size:17px;opacity:.85">A spring cooling tune-up and a fall heating check, priority scheduling when it's 115 out, and a tech with your house's equipment, serials and history already on the tablet.</p>
        <a class="ns-btn" href="#site" data-ns="bid">Join a plan</a></div>
        <div style="display:grid;gap:10px">${[["Spring tune-up", "Booked for you every February, before the heat"], ["Priority service", "Plan members go first, all summer"], ["Your house on file", "Equipment, warranty and every visit, in one record"]].map(r => `<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:14px 16px"><b style="color:#fff">${r[0]}</b><br><span style="opacity:.75;font-size:15px">${r[1]}</span></div>`).join("")}</div>
      </div></div>

      <div class="ns-sec" id="ns-rev" style="background:#fcf9f5">${reviews()}</div>

      <div class="ns-sec" id="ns-bid">
        <div class="ns-form"><div><div class="ns-k" style="color:#f2a865">Get started</div><h2>Tell us about the house.</h2>
          <p style="font-size:17px;opacity:.85">Plans get a reply in one business day. Service calls get a text back in minutes, any hour, with the first open time.</p>
          <div style="margin-top:24px;font-size:16px;line-height:1.8"><b>${esc(C.name)}</b><br>${esc(C.addr)}<br>${esc(C.hours)}<br><a href="tel:${C.tel}" style="color:#e6c7a0">${esc(C.phone)}</a></div>
          <div class="ns-area">${C.area.map(a => `<span style="background:rgba(255,255,255,.1);color:#fff">${esc(a)}</span>`).join("")}</div></div>
          <form id="ns-form" onsubmit="return false">
            <div class="row2"><label>Your name<input name="person" placeholder="Jordan Ellis"></label><label>Phone<input name="phone" placeholder="(480) 555-0142"></label></div>
            <div class="row2"><label>Email<input name="mail" type="email" placeholder="jordan@example.com"></label><label>I am a<select name="who"><option>Builder or superintendent</option><option>Architect or designer</option><option>Homeowner, building or remodeling</option><option>Homeowner, need service</option><option>Commercial tenant or GC</option></select></label></div>
            <label>Project address<input name="addr" placeholder="Lot 14, Silverleaf, Scottsdale"></label>
            <label>What do you need?<span class="chips">${["New custom home", "Remodel", "Linear slots", "Ductless", "Service call", "Service plan", "Commercial"].map((c, i) => `<label><input type="checkbox" name="kind" value="${c}"${i === 0 ? " checked" : ""}>${c}</label>`).join("")}</span></label>
            <label>Tell us more<textarea name="note" rows="3" placeholder="8,900 sq ft, 6 zones, foundation in December. Architect wants linear slots throughout.">8,900 sq ft, 6 zones, foundation in December. Architect wants linear slots throughout.</textarea></label>
            <label>Plans, ceiling plan or photos<input type="file" multiple></label>
            <button class="ns-btn" type="submit" style="justify-self:start">Send it</button>
          </form></div>
        <div id="ns-landed"></div>
      </div>

      <div class="ns-foot"><div><img src="img/logo-white.png?v=1794181557" alt="" style="height:80px;margin-bottom:12px"><div>${esc(C.legal)}<br>ROC #${C.lic} · ${esc(C.licClass)} · Bonded and insured</div></div>
        <div><b>Hours</b>${esc(C.hours)}<br>Sun by appointment<br>${esc(C.addr)}</div>
        <div><b>Call or text</b><a href="tel:${C.tel}">${esc(C.phone)}</a><b style="margin-top:12px">Find us on</b><a>Google</a><a>Houzz</a><a>Instagram</a></div>
        <div><b>For builders</b><a>Upload a plan set</a><a>W-9, insurance and license</a><a>SRP rebate help</a></div></div>
    </div>`;
  }

  function landed(f) {
    const kinds = [...f.querySelectorAll("[name=kind]:checked")].map(x => x.value).join(", ") || "Not picked";
    const v = n => esc((f.elements[n] && f.elements[n].value) || "");
    const svc = /service/i.test(v("who")) || /Service call/.test(kinds);
    return `<div class="hb" style="display:block;margin-top:24px;min-height:0;padding:22px 26px;border-radius:18px">
      <div class="hb-h"><span class="tag race">What just landed in the Mechanical Room</span><h3 style="margin-left:4px">New lead · ${v("person") || "Jordan Ellis"}</h3><span class="sp"><span class="tag ok">Text sent to Skylar</span></span></div>
      <table class="hb-t"><tr><th>From</th><td>${v("person") || "Jordan Ellis"} · ${v("who")} · ${v("phone") || "(480) 555-0142"}</td></tr>
      <tr><th>Where</th><td>${v("addr") || "Lot 14, Silverleaf, Scottsdale"} · <b>24 miles</b> from the shop · in your service area</td></tr>
      <tr><th>Work</th><td>${esc(kinds)}</td></tr><tr><th>Note</th><td>${v("note")}</td></tr>
      <tr><th>The Mechanical Room did</th><td>${svc
        ? "Texted the owner back in 40 seconds with Tyler's first open time · checked the installed base for the house (none on file) · put a hold on the calendar · set a review request for after the visit"
        : "Matched the address to a Scottsdale permit issued Nov 3 and its builder · started a load calc from the plan set · set follow-ups for day 3, 7 and 14 · logged the lead as from the website"}</td></tr></table>
      <p style="font-size:13px;color:#7a6b5d;margin:12px 0 0">A preview. On the real site, the sender also gets a text and an email saying who will call and when.</p></div>`;
  }

  APP.views.site = () => `
    <section class="sec hero-in" style="padding-bottom:30px"><div class="wrap">
      <div class="kick">The front door</div>
      <h1 class="h1">The new <span style="font-size:min(1em,7.2vw)">originalmechanical.com</span></h1>
      <p class="lede">Today's site has the right idea and the wrong details: every page title says "Custom Home Builders", the contact page reads "HVAC Services in, AZ", and there's no license number, no reviews and no way to send plans. The new one tells a builder in ten seconds that you're the HVAC sub for a $5M house, and every request it takes goes straight into the Mechanical Room.</p>
      <div class="pill-row"><span class="y">License on every page</span><span class="y">Plan set upload</span><span class="y">Service booking, any hour</span><span class="y">Real projects, captioned</span><span class="y">A page for builders</span><span class="y">Service plans</span><span class="y">Reviews from every listing</span></div>
    </div></section>
    <section style="padding:0 0 60px"><div class="wrap"><div class="ns-frame rise" id="ns-frame"><div class="ns-chrome"><i></i><i></i><i></i><span>originalmechanical.com</span></div>${page()}</div>
      <p class="src">Photos are Original Mechanical's own, from the current site. No reviews are shown because none are public yet; we don't make them up. The form is a working demo: press send to see what lands in the Mechanical Room. Try "Homeowner, need service" too.</p></div></section>
    <section class="sec" style="padding-top:20px"><div class="wrap">
      <div class="kick">Tied to every listing</div><h2 class="h2">Change it once. It changes everywhere.</h2>
      <p class="lede">The site, Google, Houzz, the SRP contractor list, the HBACA directory and Instagram all read from the same profile in the Mechanical Room. Hours, phone, license, services and photos match, and new reviews flow back to the site.</p>
      <div class="grid g3 rise" style="margin-top:30px">
        <div class="card"><b style="font-size:20px">Today</b><ul class="lst"><li>No Google listing came up, even searching your name</li><li>Instagram has 78 followers and no posts</li><li>Three versions of the name: LLC, Co. and Company</li><li>Every page title says "Custom Home Builders"</li></ul></div>
        <div class="card"><b style="font-size:20px">One profile in the Mechanical Room</b><ul class="lst"><li>Name, phone, hours, license, services, service area</li><li>Project photos with captions, picked by you</li><li>W-9, insurance and license for builders who ask</li></ul></div>
        <div class="card"><b style="font-size:20px">Everywhere, matching</b><ul class="lst"><li>Google, Houzz, Yelp, Nextdoor, Instagram</li><li>SRP participating-contractor list</li><li>HBACA directory and BuildingConnected</li></ul></div>
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
