/* Every word and number the pitch shows. Facts about Original Mechanical come from research/ (with sources there).
   Jobs, builders, permits, receipts, bids, people's schedules and dollar figures in the portal are SAMPLES, and labeled so on the page. */
window.AX = {
  co: {
    name: "Original Mechanical Co.", short: "Original Mechanical", legal: "Original Mechanical LLC",
    lic: "350004", licClass: "CR-39, A/C and Refrigeration, dual", since: 2024, licExp: "Feb 2028",
    addr: "Mesa, Arizona", city: "Serving Scottsdale, Paradise Valley and the East Valley", phone: "(480) 208-6113", tel: "+14802086113",
    owner: "Skylar Nichols", sky: "Skylar",
    email: "Skylar@originalmechanical.com",
    hours: "Mon to Fri 7 to 6 · Sat 8 to 2",
    area: ["Scottsdale", "Paradise Valley", "Mesa", "Gilbert", "Queen Creek", "Fountain Hills", "Arcadia", "Cave Creek", "Carefree", "Tempe", "Chandler", "DC Ranch"],
  },

  /* ---------- the opening video ---------- */
  video: {
    headline: "The best HVAC is the kind nobody sees.<br><em>Your business shouldn't be.</em>",
    headSub: "A new website for Original Mechanical, and the Mechanical Room behind it: one system that finds the builders, runs the bids, the jobs and the service calls, so you can stay on the tools.",
    since: "Original Mechanical Co. · Quality Air Solutions",
    lines: ["Custom homes. High-end remodels.", "Linear slots in a wood ceiling.<br>Ducts in the slab before the walls go up.", "Work the best builders in the Valley trust.", "So why does the business still run<br>on one inbox and a phone?"],
    site: { h: "A website that wins the builder before you call back.", p: "Your real projects, the license up front, and a plan upload that lands in the Mechanical Room." },
    listings: { h: "Found where builders and homeowners look.", p: "Google, the SRP contractor list, Houzz and HBACA, all reading from one profile.", in: ["Google Business Profile", "SRP contractor list", "Houzz", "HBACA directory", "Nextdoor", "Yelp", "Manufacturer locator"], out: ["Same name and phone", "License on every page", "Real project photos", "Fresh reviews", "Every lead in one inbox"] },
    bids: { h: "Know the house before the builder calls.", p: "Every new custom-home permit in Scottsdale, Phoenix and Mesa, with the builder's name on it." },
    estimate: { h: "Plans in. Load calc, layout and bid out.", p: "Drop in the architect's PDF. It reads the rooms, runs the loads, prices from your book, and waits for your OK." },
    receipts: { h: "Every receipt finds its house.", p: "Snap it, forward it, or just swipe the card. It lands on the right job." },
    project: { h: "Every plan, revision, super and inspection. One job file.", p: "An email from the builder's super about Pinnacle Peak lands in Pinnacle Peak. Automatically.", in: [["file", "Architect PDFs"], ["camera", "Rough-in photos"], ["mail", "Builder and supplier emails"], ["receipt", "Receipts"]], out: [["folder", "One file per house"], ["users", "Who's on the job"], ["cal", "Rough, trim, inspections"], ["money", "Budget vs. spent"]] },
    calendar: { h: "Builders and service calls. One board.", p: "Rough-ins, inspections and July no-cool calls on the same calendar, so neither one gets dropped." },
    ring: { h: "The Mechanical Room.", p: "Everything linked. Nothing typed twice.", l: [["cal", "Daily calendar"], ["folder", "Project files"], ["est", "Load calcs and bids"], ["bid", "Builder radar"], ["receipt", "Receipts"]], r: [["money", "Draws and books"], ["shield", "Notices and permits"], ["repeat", "Installed base"], ["star", "Listings and reviews"], ["chat", "Ask Original"]] },
    race: "Built like the ductwork.<br><em>Every joint sealed.</em>",
    end: "Less office. More tools.",
    narr: {},
    scenes: [["lines", 12, "Original Mechanical"], ["headline", 5.6, ""], ["site", 6, "The new site"], ["listings", 6.4, "Listings"], ["bids", 6.4, "Builder radar"], ["estimate", 6.4, "Load calcs and bids"], ["project", 6.4, "Project files"], ["receipts", 6, "Receipts"], ["calendar", 6.4, "Daily calendar"], ["ring", 6.4, "The Mechanical Room"], ["race", 5.6, "The work"], ["end", 5, ""]],
  },

  welcome: {
    kick: "Original Mechanical, rebuilt",
    h: "Architect-grade work.<br>Almost invisible online.",
    p: "Your photos say it: slot diffusers lined up in a wood ceiling, duct runs set before the slab is poured, modern desert homes that only the best builders get to build. The work is the kind a builder brags about. But today there's no Google listing, no public review, the site's title says \"Custom Home Builders\", and every lead lands in one inbox and one phone.",
    stats: [["CR-39", "ROC #350004, dual license, active to Feb 2028, zero complaints"], ["0", "public reviews we could find, anywhere"], ["None", "no Google Business Profile came up, even on your own name"], ["#1 to #8", "for \"custom home HVAC Scottsdale\". The site already reaches the right people"]],
    quote: "Stop running the office.<br><em>Start running the jobs.</em>",
    quoteP: "Skylar is the estimator, the dispatcher, the salesperson and the lead installer. In July that means a no-cool call and a rough-in inspection on the same morning. The Mechanical Room takes the office work, finds the next builder, and keeps every house you've ever done coming back.",
    mods: [
      ["site", "site", "The new site", "Real projects, the license up front, plan upload, and service booking."],
      ["arrive", "pin", "How work arrives", "The five doors work comes through, and which one to open next."],
      ["stuck", "bolt", "Where it gets stuck", "The eight bottlenecks, ranked, and what fixes each one."],
      ["hub", "hub", "The Mechanical Room", "One login for the whole business, on the phone and in the truck."],
      ["radar", "bid", "Builder radar", "Every new custom-home permit, with the builder's name on it."],
      ["estimate", "est", "Load calcs and bids", "Manual J from the plans, priced from your own book."],
      ["service", "repeat", "Installed base", "Every system you've set becomes a service plan."],
      ["money", "money", "Draws and paperwork", "Draws, retention, 20-day notices and prompt-pay, handled."],
    ],
  },

  /* ---------- the portal's sample data ---------- */
  jobs: [
    { id: "OM-118", name: "Pinnacle Peak residence", kind: "New custom home · 4 systems", city: "Scottsdale", builder: "Kessler Custom Homes", stage: "Rough-in", pm: "Skylar", contract: 148600, co: 6200, spent: 71800, pct: 55, ret: 10, billed: 81900, status: "ok", color: "#b86a32", start: 0, len: 14 },
    { id: "OM-121", name: "Mummy Mountain remodel", kind: "High-end remodel · linear slots", city: "Paradise Valley", builder: "Brandt Luxury Builders", stage: "Trim", pm: "Skylar", contract: 86400, co: 9800, spent: 61200, pct: 82, ret: 10, billed: 70800, status: "warn", color: "#3f8fb0", start: 0, len: 6 },
    { id: "OM-124", name: "Silverleaf estate", kind: "New custom home · 6 systems", city: "Scottsdale", builder: "Whitfield Homes", stage: "Underground", pm: "Skylar", contract: 212000, co: 0, spent: 19400, pct: 12, ret: 10, billed: 31800, status: "ok", color: "#5e8c4a", start: 1, len: 18 },
    { id: "OM-115", name: "Las Sendas residence", kind: "New custom home · 3 systems", city: "Mesa", builder: "Ortega Design Build", stage: "Start-up and balance", pm: "Skylar", contract: 96800, co: 4100, spent: 79300, pct: 94, ret: 10, billed: 90800, status: "bad", color: "#c9a227", start: 0, len: 3 },
    { id: "OM-126", name: "Gilbert medical suite", kind: "Suite build-out · 2 rooftop units", city: "Gilbert", builder: "Desert Crest Contracting", stage: "Submittals", pm: "Skylar", contract: 64200, co: 0, spent: 3100, pct: 6, ret: 5, billed: 6420, status: "ok", color: "#8a5a9e", start: 3, len: 7 },
    { id: "OM-127", name: "Arcadia casita", kind: "Ductless · guest house", city: "Phoenix", builder: "Homeowner direct", stage: "Install", pm: "Skylar", contract: 18400, co: 0, spent: 6900, pct: 30, ret: 0, billed: 9200, status: "ok", color: "#d0603a", start: 2, len: 2 },
  ],
  crew: ["Skylar", "Marcus", "Diego", "Ramon", "Tyler", "Jake"],
  week: {
    days: ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13"],
    rows: {
      Skylar: ["OM-121", "Bid walk · DC Ranch", "OM-118", "OM-115", "Bids and builder lunch"],
      Marcus: ["OM-118", "OM-118", "OM-118", "OM-118", "OM-118"],
      Diego: ["OM-124", "OM-124", "OM-127", "OM-127", "OM-124"],
      Ramon: ["OM-121", "OM-121", "OM-121", "OM-115", "OM-115"],
      Tyler: ["Service calls", "Service calls", "Service calls", "Service calls", "Tune-ups"],
      Jake: ["OM-118", "OM-118", "OM-124", "OM-124", "OM-124"],
    },
  },
  today: [
    ["6:30", "Crews out", "Marcus and Jake at Pinnacle Peak. Diego at Silverleaf. Ramon at Mummy Mountain. Tyler on service.", "b"],
    ["7:30", "Rough mechanical inspection", "Pinnacle Peak · City of Scottsdale · systems 1 and 2, before insulation", "r"],
    ["9:00", "Equipment delivery", "Silverleaf · 3 air handlers and line sets from the supply house · Diego signs", "b"],
    ["10:30", "Change order to sign", "Mummy Mountain · 6 more linear slots after the ceiling revision, $4,280 · waiting on Brandt", "y"],
    ["1:00", "Builder walk", "DC Ranch lot with a new builder · plans promised Friday", "r"],
    ["3:30", "Draw due", "Pinnacle Peak · rough-in draw to Kessler, with photos and the inspection result", "y"],
  ],
  alerts: [
    ["r", "Las Sendas is 82% spent at 94% done", "Second air handler swap after the ceiling height change. Change order drafted for $3,600.", "billing"],
    ["y", "8% equipment increase hits Jan 1", "3 open bids and 1 signed job use that brand. Order now or reprice before the quotes expire.", "estimate"],
    ["y", "20-day notice due Thursday", "Silverleaf · first delivery was Nov 2. Drafted and ready to mail to owner, lender and builder.", "paperwork"],
    ["b", "4 new custom-home permits match you", "Two in Scottsdale over 8,000 sq ft of AC area, one in Arcadia, one in Mesa.", "bids"],
    ["g", "14 tune-ups booked for February", "From last year's installs. Nobody had to call anyone.", "reinspect"],
  ],
  receipts: [
    { vendor: "Johnstone Supply", where: "Tempe", date: "11/04 06:48", items: "FLEX DUCT R8 10IN x6\nMASTIC 1GAL x4", amt: 1186.42, job: "Pinnacle Peak", how: "Marcus's card, and Marcus is on Pinnacle Peak today", conf: 98 },
    { vendor: "Ferguson HVAC", where: "Scottsdale", date: "11/04 09:12", items: "LINEAR SLOT 4FT 2SL x6\nPLENUM KIT x6", amt: 2412.80, job: "Mummy Mountain", how: "PO 121-14 printed on the slip", conf: 99 },
    { vendor: "Home Depot Pro", where: "Mesa #0461", date: "11/03 15:30", items: "UNISTRUT 10FT x8\nANCHORS x50", amt: 318.74, job: "Silverleaf", how: "Equipment stand materials, and Diego's phone was at the store", conf: 91 },
    { vendor: "QuikTrip", where: "Mesa", date: "11/03 16:05", items: "DIESEL 28.4 GAL", amt: 109.62, job: "Overhead", how: "Fuel goes to truck costs unless you say otherwise", conf: 80 },
    { vendor: "Maxim Crane", where: "Phoenix", date: "11/02 07:00", items: "CRANE 4HR MIN\nRTU SET x2", amt: 1450.00, job: "Needs a job", how: "Rooftop set. Gilbert suite is the only job with rooftop units, but it's not scheduled yet. Tap one.", conf: 0 },
  ],
  bids: {
    feed: [
      { t: "New custom home, 9,420 sq ft of AC area", src: "Scottsdale permit report", due: "Issued Nov 3", kind: "SFR custom", fit: 95, val: "$4.9M valuation", city: "Scottsdale", why: "Builder is Kessler Custom Homes. You're on their Pinnacle Peak job now. Foundation stage, so HVAC isn't bid yet" },
      { t: "New custom home, 8,150 sq ft of AC area", src: "Scottsdale permit report", due: "Issued Nov 5", kind: "SFR custom", fit: 89, val: "$3.8M valuation", city: "Scottsdale", why: "A builder you haven't worked with. 3 more permits from them this year. Worth an intro to the superintendent" },
      { t: "Remodel and addition, guest house", src: "Phoenix permit data", due: "Issued Nov 4", kind: "Remodel", fit: 84, val: "$1.1M valuation", city: "Phoenix · Arcadia", why: "Guest houses fit ductless. The architect drew your Arcadia casita" },
      { t: "Mechanical, 2 rooftop units, office suite", src: "BuildingConnected invite", due: "Bid due Nov 20", kind: "Commercial", fit: 72, val: "$58k to $70k", city: "Tempe", why: "Same scope as Gilbert. Plans attached. Lower priority while summer installs wrap" },
      { t: "New custom home, 6,300 sq ft of AC area", src: "Mesa permit data", due: "Issued Nov 2", kind: "SFR custom", fit: 70, val: "$2.2M valuation", city: "Mesa · Las Sendas", why: "Close to the shop. Owner-builder, so contract the homeowner directly and keep your lien rights" },
      { t: "Production homes, 140 lots", src: "BuildingConnected invite", due: "Bid due Nov 18", kind: "Production", fit: 18, val: "$1.4M", city: "Queen Creek", why: "Tract work at tract prices. Not your market. Skipped" },
    ],
  },
  est: {
    job: "DC Ranch residence · 8,900 sq ft · 6 systems",
    lines: [
      ["Variable-speed heat pump systems, 4 to 5 ton", 6, "systems", 11850, "Your price book"],
      ["Sealed supply and return duct, R-8, in conditioned space", 1180, "LF", 21.5, "Last 3 custom homes"],
      ["Linear slot diffusers, 4-ft, with plenums", 42, "ea", 186, "Supply house price today"],
      ["Zoning panels and motorized dampers", 6, "zones", 1340, "Your price book"],
      ["ERV, whole-house fresh air", 2, "units", 3650, "Supply house price today"],
      ["Underground duct in slab, PVC-coated", 220, "LF", 38, "Last 3 custom homes"],
      ["Start-up, balancing, commissioning report", 6, "systems", 640, "Fixed"],
    ],
    markup: 0.22, contingency: 0.06,
  },
  // builders and the people who send work, in place of the kit's subs table
  subs: [
    ["Kessler Custom Homes", "Builder", "Pinnacle Peak", "Pays in 18 days", "3 jobs together · 4 new permits this year", "ok"],
    ["Brandt Luxury Builders", "Builder", "Mummy Mountain", "Pays in 41 days", "Retention from 2025 still open", "warn"],
    ["Whitfield Homes", "Builder", "Silverleaf", "Pays in 22 days", "First job together", "ok"],
    ["Ortega Design Build", "Builder", "Las Sendas", "Pays in 26 days", "Change order unsigned, 9 days", "warn"],
    ["Lumen Studio", "Architect", "Arcadia casita, Silverleaf", "n/a", "Sent you 2 jobs", "ok"],
    ["Desert Crest Contracting", "Commercial GC", "Gilbert suite", "Pays in 35 days", "Needs your W-9 and COI", "warn"],
  ],
  liens: [
    ["Silverleaf estate", "20-day preliminary notice", "To owner, lender and builder", "Due Nov 12", "warn"],
    ["Pinnacle Peak", "Rough-in draw, with photos", "To Kessler", "Today", "b"],
    ["Arcadia casita", "Prompt-pay notice printed on the estimate", "Owner-occupied, contracted direct", "On every invoice", "ok"],
    ["Mummy Mountain", "Owner-occupied home, contract is with the builder", "No lien right here, so track pay days", "Day 8 interest on Nov 19", "warn"],
    ["Las Sendas residence", "Retention release", "After final and start-up", "Dec 22", "b"],
  ],
  permits: [
    ["Pinnacle Peak", "Rough mechanical, systems 1 and 2", "Scottsdale", "Today 7:30", "b"],
    ["Mummy Mountain", "Final mechanical", "Paradise Valley", "Nov 19", "b"],
    ["Las Sendas", "Final mechanical", "Mesa", "Passed Nov 6", "ok"],
    ["Silverleaf", "Underground duct", "Scottsdale", "Corrections: seal at 2 boots", "warn"],
  ],
  // the installed base, in place of the kit's repeat-work table
  reinspect: [
    ["Las Sendas residence", "3 heat pumps · R-454B", "Mesa", "Installed Nov 2026", "Warranty registered · tune-up Feb 2027"],
    ["Desert Mountain residence", "4 systems · R-410A", "Scottsdale", "Installed 2024", "Tune-up booked Feb 18"],
    ["Camelback casita", "Ductless, 3 heads", "Paradise Valley", "Installed 2025", "Plan renews Mar 1"],
    ["Red Mountain remodel", "2 systems", "Mesa", "Installed 2024", "No plan yet · offer sent"],
  ],

  costs: {
    replaces: [["The WordPress site and its leftover builder template", "the new site"], ["Gmail, a phone and texts as the lead system", "the Mechanical Room's lead inbox"], ["Spreadsheets and paper for bids and schedules", "the Mechanical Room"], ["A load-calc app (Wrightsoft about $400 to $900 a year, or CoolCalc)", "Load calcs and bids, or connected to the one you use"], ["A service app you'd otherwise buy (ServiceTitan about $245 to $500 per tech a month, Housecall Pro $59 to $299, Jobber $99 to $529)", "the Mechanical Room's service and dispatch"], ["QuickBooks (optional)", "the Mechanical Room's own books, with a CPA export"], ["An estimator or office manager hire", "the Mechanical Room, with Skylar's OK on every number"]],
  },
};

/* No public reviews exist yet (research/company-and-listings.md). The site shows an honest empty state, never invented reviews. */
AX.reviews = { score: [], items: [] };
AX.found = { work: [
  ["img/work/IMG_5145.jpg?v=1794180644", "Modern desert custom home, pool court · Original Mechanical HVAC"],
  ["img/work/IMG_5183.jpg?v=1794180644", "Custom home entry court with palms"],
  ["img/work/IMG_5188.jpg?v=1794180644", "Linear slot diffusers in a wood plank ceiling, before trim"],
  ["img/work/IMG_5187.jpg?v=1794180644", "Great room with clerestory windows and slot diffusers"],
  ["img/work/IMG_5174.jpg?v=1794180644", "Vaulted ceiling with linear supply, steel window wall"],
  ["img/work/IMG_5169.jpg?v=1794180644", "Underground duct runs set before the slab"],
] };

/* ---------- Auto-organization (samples) ---------- */
AX.inbox = [
  { from: "Kessler Custom Homes", who: "Dan Kessler, superintendent", av: "KC", job: "OM-118", time: "6:52 a.m.", subj: "Pinnacle Peak, drywall moved up",
    body: "Skylar, insulation is done Thursday so drywall starts Monday the 16th, not the 23rd. Need rough signed off and the lineset chases closed by Friday. Updated schedule attached.",
    att: [["PinnaclePeak_schedule_rev6.pdf", "Schedule"]],
    note: "Kessler moved drywall up a week to Mon Nov 16. Rough must pass and chases close by Fri Nov 13.",
    due: ["Rough signed off and chases closed", "Fri Nov 13", "Drywall starts Monday"], task: ["Add Jake to Pinnacle Peak Thursday and Friday", "Marcus"],
    money: null, why: "Kessler is the builder on Pinnacle Peak, and the email says Pinnacle Peak" },
  { from: "Lumen Studio", who: "Ana Lumen, architect", av: "LS", job: "OM-121", time: "Yesterday", subj: "Mummy Mountain, revised reflected ceiling plan",
    body: "Attached is RCP rev C. The owner wants the family room slots to run the full length of the beam line, so 6 more 4-ft sections. Please confirm airflow still works.",
    att: [["MummyMtn_RCP_revC.pdf", "Plans"]],
    note: "RCP rev C adds 6 linear slot sections in the family room. Rev B moved to superseded. Airflow check needed.",
    due: ["Confirm airflow on rev C", "Wed Nov 11", "Before the ceiling closes"], task: ["Rerun the family room zone in the load calc", "Skylar"],
    money: ["Change order", "$4,280", "6 slots, plenums and labor, drafted for Brandt"], why: "Lumen Studio is the architect on Mummy Mountain, and the sheet set matches its plans" },
  { from: "Johnstone Supply", who: "Counter, Tempe", av: "JS", job: "OM-124", time: "Yesterday", subj: "Price increase notice, effective Jan 1",
    body: "Manufacturer pricing on residential split systems goes up 8% for orders after December 31. Quotes held through December 31 at current pricing.",
    att: [["Price_notice_Jan1.pdf", "Notice"]],
    note: "8% increase on residential splits after Dec 31. Silverleaf's 6 systems and 3 open bids are affected.",
    due: ["Order Silverleaf equipment", "Thu Dec 31", "Price goes up 8%"], task: ["Order Silverleaf systems at today's price, or reprice the open bids", "Skylar"],
    money: ["Saved by ordering now", "$5,688", "8% on Silverleaf's 6 systems"], why: "The notice covers equipment on Silverleaf's order, and 3 open bids" },
  { from: "City of Scottsdale", who: "Inspection Services", av: "SC", job: "OM-124", time: "Tue", subj: "Inspection result: underground mechanical",
    body: "Inspection type: Underground duct. Result: Corrections. Seal 2 supply boots at bedroom 3 and the study. Reinspection required.",
    att: [["Inspection_result.pdf", "Inspection"]],
    note: "Underground duct got corrections: seal 2 boots, bedroom 3 and the study. Reinspection required before the slab.",
    due: ["Request reinspection", "Fri Nov 13", "Slab pour is Monday"], task: ["Seal the 2 boots and request reinspection", "Diego"],
    money: null, why: "The permit number belongs to Silverleaf" },
];
AX.team = [
  { n: "Skylar Nichols", r: "Owner, estimating and lead installer", ph: "(480) 555-0128", sk: ["Load calcs", "Linear slots", "Builders"], on: "Mummy Mountain", st: "busy" },
  { n: "Marcus Reyes", r: "Lead installer", ph: "(480) 555-0143", sk: ["Rough-in", "Duct design", "Start-up"], on: "Pinnacle Peak", st: "busy" },
  { n: "Diego Morales", r: "Installer", ph: "(480) 555-0167", sk: ["Underground", "Equipment set", "Ductless"], on: "Silverleaf", st: "busy" },
  { n: "Ramon Ortiz", r: "Installer", ph: "(480) 555-0181", sk: ["Trim", "Linear slots", "Balancing"], on: "Mummy Mountain", st: "soon", free: "Mummy Mountain trim ends Wed" },
  { n: "Tyler Brooks", r: "Service tech", ph: "(480) 555-0195", sk: ["Diagnostics", "Tune-ups", "A2L certified"], on: "Service calls", st: "busy" },
  { n: "Jake Lindqvist", r: "Apprentice", ph: "(480) 555-0112", sk: ["Duct", "Clean-up", "Deliveries"], on: "Pinnacle Peak", st: "free", free: "Free Thu and Fri" },
];
