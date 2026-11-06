/* Every word and number the pitch shows. Facts about Apex come from research/ (with sources there).
   Jobs, receipts, bids, people's schedules and dollar figures in the portal are SAMPLES, and labeled so on the page. */
window.AX = {
  co: {
    name: "Apex Construction General Contractors Inc.", short: "Apex Construction",
    lic: "632262", licClass: "B, General Building", since: 1991, licExp: "May 31, 2028",
    addr: "15444 Hesperian Blvd #100", city: "San Leandro, CA 94578", phone: "(510) 317-1484", tel: "+15103171484",
    owners: "William and Kameron Suoja", bill: "Bill", kam: "Kameron",
    email: "office@apexconstgc.com", // placeholder until Apex confirms the address that should receive bid requests
    area: ["San Leandro", "Oakland", "Alameda", "Hayward", "Castro Valley", "San Lorenzo", "Berkeley", "Fremont", "Dublin", "Pleasanton", "Walnut Creek", "San Ramon"],
  },

  /* ---------- the opening video ---------- */
  video: {
    headline: "Put down the spreadsheets.<br><em>Pick the details back up.</em>",
    headSub: "A new website for Apex Construction, and the portal behind it that runs the office, so you can get back to building.",
    since: "General Contractors · San Leandro · Since 1991",
    lines: ["Since 1991.", "Same address. Same standards.", "Bill still drives a company truck.", "So why is the office still<br>on paper and spreadsheets?"],
    site: { h: "A website that wins the job before you call back.", p: "Every service, real photos, real reviews, and a bid request that lands in the portal." },
    listings: { h: "One listing. Everywhere you're found.", p: "Change your hours once and Google, Yelp, Nextdoor and every bid list update.", in: ["Google", "Yelp", "Nextdoor", "The Blue Book", "BuildingConnected", "City bid lists", "HOA vendor lists"], out: ["Same name and phone", "Same hours", "Real photos", "Fresh reviews", "Every lead in one inbox"] },
    bids: { h: "The bid engine reads every board while you're on the roof.", p: "Public bids, HOA requests and invites, scored for fit. You pick, it drafts." },
    estimate: { h: "Your estimator. Your numbers. No new hire.", p: "Drop in the architect's PDF. It counts, prices from your own cost book, and waits for your OK." },
    receipts: { h: "Every receipt finds its job.", p: "Snap it, forward it, or just swipe the card. It lands on the right project." },
    project: { h: "Every plan, photo, sub and email. One job file.", p: "An email from the framer about Bayview lands in Bayview. Automatically.", in: [["file", "Architect PDFs"], ["camera", "Site photos"], ["mail", "Sub and vendor emails"], ["receipt", "Receipts"]], out: [["folder", "One file per job"], ["users", "Who's on the job"], ["cal", "What's due"], ["money", "Budget vs. spent"]] },
    calendar: { h: "One calendar runs the week.", p: "Who's where, what's due, which inspector is coming, and what it's costing." },
    ring: { h: "Apex Field Office.", p: "Everything linked. Nothing typed twice.", l: [["cal", "Daily calendar"], ["folder", "Project files"], ["est", "Estimator"], ["bid", "Bid engine"], ["receipt", "Receipts"]], r: [["money", "Books and payroll"], ["shield", "Liens and permits"], ["users", "Subs and crew"], ["star", "Listings and reviews"], ["chat", "Ask Apex"]] },
    race: "Built like the car.<br><em>Every detail checked.</em>",
    end: "Less office. More building.",
    scenes: [["lines", 14.6, "Apex Construction"], ["headline", 5.2, ""], ["site", 6, "The new site"], ["listings", 6.4, "Listings"], ["bids", 6.4, "Bid engine"], ["estimate", 6.4, "Estimator"], ["project", 6.4, "Project files"], ["receipts", 6, "Receipts"], ["calendar", 6.4, "Daily calendar"], ["ring", 6.4, "Apex Field Office"], ["race", 5.6, "SUOJA Motorsports"], ["end", 5, ""]],
  },

  welcome: {
    kick: "Apex Construction, rebuilt",
    h: "35 years of good work.<br>Almost none of it online.",
    p: "Apex has been at the same San Leandro address since 1991, and the work speaks for itself to anyone who has seen it. The problem is everyone who hasn't. Today the website is three pages with no phone number, the Google listing has no website and one review from seven years ago, and the office runs on email, paper and spreadsheets.",
    stats: [["35 yrs", "same address, same license, active to 2028"], ["0", "Google searches for your services that show Apex"], ["$0", "spent on ads we could find. It's all referrals"], ["3", "different sets of hours across your listings"]],
    quote: "Stop running the office.<br><em>Start running the jobs.</em>",
    quoteP: "Kameron runs the day to day. Right now that means chasing receipts, retyping numbers, building bids and keeping the crew calendar in his head. The Field Office takes that work, so his time goes back to the details on site.",
    mods: [
      ["site", "site", "The new site", "Services, real work, reviews from every listing, and a bid form."],
      ["hub", "hub", "The portal", "One login for the whole business, on the phone and in the office."],
      ["schedule", "cal", "Daily calendar", "Crew, inspections, deliveries, timelines and budgets, by day."],
      ["auto", "bolt", "Auto-organization", "Emails file themselves, the crew gets texted, everyone gets their week."],
      ["estimate", "est", "Estimator", "Takeoffs from PDFs and photos, priced from your own costs."],
      ["bids", "bid", "Bid engine", "Every public bid and HOA request, found and drafted for you."],
      ["money", "money", "Receipts, books, payroll", "Receipts to jobs, progress billing, payroll, no QuickBooks needed."],
      ["field", "field", "Field and paperwork", "Daily logs, punch lists, lien notices, permits, sub insurance."],
    ],
  },

  /* ---------- the portal's sample data ---------- */
  jobs: [
    { id: "J-2611", name: "Bayview Terrace HOA", kind: "SB-326 balcony repair", city: "Alameda", pm: "Kameron", contract: 186400, co: 14200, spent: 98000, pct: 62, ret: 10, billed: 112000, status: "ok", color: "#2a4bff", start: 1, len: 9 },
    { id: "J-2604", name: "Estudillo Ave 12-unit", kind: "Soft story retrofit", city: "San Leandro", pm: "Kameron", contract: 142800, co: 6800, spent: 84000, pct: 71, ret: 5, billed: 99960, status: "ok", color: "#ff4a1c", start: 0, len: 6 },
    { id: "J-2615", name: "Davis St warehouse", kind: "Tenant improvement", city: "San Leandro", pm: "Bill", contract: 238000, co: 21500, spent: 94200, pct: 34, ret: 10, billed: 80920, status: "warn", color: "#2fd389", start: 2, len: 12 },
    { id: "J-2598", name: "Marina Blvd condos", kind: "Dry rot and residing", city: "San Leandro", pm: "Kameron", contract: 96500, co: 3900, spent: 71300, pct: 88, ret: 10, billed: 84920, status: "bad", color: "#ffb020", start: 0, len: 4 },
    { id: "J-2619", name: "Seven Hills Rd", kind: "ADU, detached", city: "Castro Valley", pm: "Bill", contract: 312000, co: 0, spent: 18400, pct: 6, ret: 5, billed: 31200, status: "ok", color: "#9b6bff", start: 4, len: 16 },
    { id: "J-2620", name: "Lakeshore deck", kind: "Composite deck and beam", city: "Oakland", pm: "Kameron", contract: 48200, co: 0, spent: 4100, pct: 10, ret: 0, billed: 9640, status: "ok", color: "#00b8d9", start: 3, len: 3 },
  ],
  crew: ["Kameron", "Luis", "Marco", "Dave", "Tony", "Eli"],
  // the week board: one row per person, one cell per day (job id or text)
  week: {
    days: ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13"],
    rows: {
      Kameron: ["J-2611", "J-2615", "J-2611", "Bid walk · Hayward", "J-2598"],
      Luis: ["J-2611", "J-2611", "J-2611", "J-2611", "J-2611"],
      Marco: ["J-2604", "J-2604", "J-2604", "J-2604", "Off"],
      Dave: ["J-2598", "J-2598", "J-2598", "J-2620", "J-2620"],
      Tony: ["J-2615", "J-2615", "J-2615", "J-2615", "J-2615"],
      Eli: ["J-2620", "J-2620", "J-2604", "J-2604", "J-2598"],
    },
  },
  today: [
    ["7:00", "Crew on site", "Luis, Eli at Bayview Terrace. Marco at Estudillo. Dave at Marina Blvd. Tony at Davis St.", "b"],
    ["8:30", "Lumber delivery", "Bayview Terrace · 14 PT 4x10 joists, 22 Simpson hangers · Truck from the yard", "b"],
    ["10:00", "City inspection", "Estudillo Ave · frame and hardware, soft story Phase 2 · San Leandro Building", "r"],
    ["11:30", "Change order to sign", "Davis St · added restroom, $8,400 · waiting on the tenant's signature", "y"],
    ["1:00", "Bid walk", "Hayward Housing Authority · exterior repairs, 3 buildings · mandatory", "r"],
    ["3:30", "Draw request due", "Bayview Terrace · progress billing #4 to the HOA manager", "y"],
  ],
  alerts: [
    ["r", "Marina Blvd is 91% spent at 88% done", "Dry rot was worse behind the siding. Change order drafted for $6,200 more.", "billing"],
    ["y", "Framer's insurance expires in 9 days", "Diaz Framing · general liability · request sent automatically, no reply yet.", "subs"],
    ["y", "Preliminary notice due Thursday", "Seven Hills Rd · 20-day notice to the lender. Drafted and ready to mail.", "paperwork"],
    ["b", "3 new bids match you", "Two HOA balcony jobs and one city on-call contract. Best fit 94.", "bids"],
    ["g", "Estudillo inspection passed", "Phase 2 signed off. Next draw is ready to send.", "billing"],
  ],
  receipts: [
    { vendor: "Home Depot Pro", where: "San Leandro #0643", date: "11/04 07:12", items: "SIMPSON LUS210 x22\nPT 4X10-12 x14", amt: 1284.66, job: "Bayview Terrace", how: "Card ending 4418 is Luis's, and Luis is on Bayview today", conf: 98 },
    { vendor: "Golden State Lumber", where: "Oakland", date: "11/04 09:40", items: "HARDIE PLANK 8.25 x60\nTYVEK 9X150", amt: 2311.20, job: "Marina Blvd", how: "PO #2598-07 printed on the slip", conf: 99 },
    { vendor: "Ferguson", where: "Hayward", date: "11/03 14:05", items: "TOILET KIT x1\nSUPPLY LINES x2", amt: 486.12, job: "Davis St", how: "Restroom change order and Tony's phone was at the store", conf: 91 },
    { vendor: "Chevron", where: "Castro Valley", date: "11/03 16:30", items: "DIESEL 31.2 GAL", amt: 168.48, job: "Overhead", how: "Fuel goes to truck costs unless you say otherwise", conf: 80 },
    { vendor: "Sunbelt Rentals", where: "San Leandro", date: "11/02 08:00", items: "BOOM LIFT 45FT 1WK", amt: 1150.00, job: "Needs a job", how: "Two jobs could use a lift this week. Tap one.", conf: 0 },
  ],
  bids: {
    feed: [
      { t: "Balcony and walkway repairs, 64 units", src: "HOA request via FirstService Residential", due: "Nov 21", kind: "SB-326", fit: 94, val: "$180k to $240k", city: "Hayward", why: "Exactly your work, 6 miles away, manager already uses Apex" },
      { t: "On-call general contractor, 2-year", src: "Oakland Housing Authority", due: "Dec 3", kind: "Public", fit: 88, val: "up to $1.5M", city: "Oakland", why: "B license, local, repair and rehab scope. Needs DIR registration" },
      { t: "Soft story retrofit, 16-unit wood frame", src: "BuildingConnected invite", due: "Nov 18", kind: "Retrofit", fit: 86, val: "$150k to $200k", city: "Berkeley", why: "Matches your soft story jobs. Engineer's plans attached" },
      { t: "Library restroom ADA upgrade", src: "City of San Leandro", due: "Dec 9", kind: "Public", fit: 74, val: "$95k", city: "San Leandro", why: "Local bidders get a 10% bid reduction. Prevailing wage" },
      { t: "Exterior elevated element inspection repairs", src: "Cal eProcure", due: "Dec 12", kind: "SB-721", fit: 71, val: "$60k", city: "Fremont", why: "Good scope, a little far, bonding required" },
      { t: "Federal building roof deck replacement", src: "SAM.gov", due: "Dec 1", kind: "Federal", fit: 32, val: "$2.1M", city: "Oakland", why: "Too big for your bonding, federal paperwork. Skipped" },
    ],
  },
  est: {
    job: "Bayview Terrace HOA · Building C balconies",
    lines: [
      ["Shore and remove balcony decking", 6, "balconies", 1450, "Your cost book"],
      ["Replace joists, PT 4x10", 84, "LF", 38.5, "Last 3 jobs"],
      ["Simpson hangers and hardware", 96, "ea", 14.2, "Home Depot price today"],
      ["Waterproof membrane, walkable", 540, "SF", 16.75, "Sub quote, Pacific Coatings"],
      ["Guardrail, powder-coated aluminum", 132, "LF", 118, "Sub quote, Bay Rail"],
      ["Stucco patch and paint at ledger", 6, "balconies", 880, "Your cost book"],
      ["Engineer site visits", 3, "visits", 650, "Fixed"],
    ],
    markup: 0.18, contingency: 0.08,
  },
  subs: [
    ["Diaz Framing", "Framing", "Bayview, Estudillo", "C-5 · active", "GL exp. Nov 14", "warn"],
    ["Pacific Coatings", "Waterproofing", "Bayview", "C-33 · active", "All current", "ok"],
    ["Bay Rail", "Guardrails", "Bayview", "C-23 · active", "All current", "ok"],
    ["Allied Electric", "Electrical", "Davis St, Seven Hills", "C-10 · active", "WC exp. Jan 3", "ok"],
    ["Kwan Plumbing", "Plumbing", "Davis St", "C-36 · active", "Need W-9", "warn"],
    ["Ortiz Concrete", "Concrete", "Seven Hills", "C-8 · suspended", "Do not pay", "bad"],
  ],
  liens: [
    ["Seven Hills Rd", "20-day preliminary notice", "To owner, lender", "Due Nov 12", "warn"],
    ["Bayview Terrace", "Conditional waiver, progress #4", "To HOA manager", "With draw", "ok"],
    ["Estudillo Ave", "Unconditional waiver, progress #3", "Payment cleared", "Sent", "ok"],
    ["Marina Blvd", "Retention release", "45 days after completion", "Jan 2", "b"],
    ["Davis St", "Diaz Framing conditional waiver", "Before you pay them", "Missing", "bad"],
  ],
  permits: [
    ["Estudillo Ave", "Soft story, Phase 2", "San Leandro", "Passed today", "ok"],
    ["Davis St", "TI, building and electrical", "San Leandro", "Rough electric Nov 14", "b"],
    ["Bayview Terrace", "Balcony repair", "Alameda", "Framing Nov 17", "b"],
    ["Seven Hills Rd", "ADU, new", "Alameda County", "Plan check comments back", "warn"],
  ],
  reinspect: [
    ["Bayview Terrace HOA", "SB-326", "Alameda", "Inspected 2025", "Next inspection due 2034"],
    ["Marina Blvd condos", "SB-326", "San Leandro", "Inspected 2025", "2034"],
    ["Palma Ct apartments", "SB-721", "Hayward", "Inspected 2023", "2029"],
    ["Elm St 8-unit", "SB-721", "Oakland", "Inspected 2024", "2030"],
  ],

  /* ---------- running costs (to be priced; see questions) ---------- */
  costs: {
    replaces: [["GoDaddy Website Builder", "the new site"], ["Spreadsheets for budgets and schedules", "the Field Office"], ["A project app (if any)", "the Field Office"], ["A receipt app (if any)", "the Field Office"], ["QuickBooks (optional)", "the Field Office's own books, with a CPA export"], ["An estimator's salary", "the Estimator, with Kameron's OK on every number"]],
  },
};

/* real reviews, quoted exactly (research/listings-and-reviews.md). The one negative 2012 Yelp review and the
   unreadable 1-star Google review are discussed on the deep read, not shown on the site. */
AX.reviews = {
  score: [["Yelp", "4.0", "4 reviews"], ["Angi", "5.0", "1 review"], ["Nextdoor", "2", "neighbor recommendations"]],
  items: [
    { stars: 5, text: "Apex construction out of San Leandro is always my go-to. They're honest, reasonable, and do very good quality work.", who: "K. D., Orinda", src: "Nextdoor", date: "2023" },
    { stars: 5, text: "Bill has his own crew that are hard working and honest.", who: "Reginald S.", src: "Angi", date: "2013" },
    { stars: 5, text: "We turned ugly into a unbelievable beautiful wide open kitchen.", who: "Frank P., San Francisco", src: "Yelp", date: "2018" },
    { stars: 5, text: "He gave me a great price and his worker Martin did a fantastic job!!!!", who: "Marianne V.", src: "Yelp", date: "2021" },
    { stars: 5, text: "Our Neighbor saw our Kitchen and said who is your contractor....she hired Apex construction right away.", who: "Frank P.", src: "Yelp", date: "2018" },
    { stars: 5, text: "The finished deck is gorgeous! Thanks Apex", who: "Rachael S., Pleasanton", src: "Yelp", date: "2013" },
  ],
};
AX.found = { work: [
  ["img/work/balcony-reframe-lift.jpg?v=1793926645", "Stacked balcony reframing on an apartment building"],
  ["img/work/crane-beam.jpg?v=1793926645", "Crane setting a large replacement beam"],
  ["img/work/beam-walkway.jpg?v=1793926645", "New beam under an apartment walkway"],
  ["img/work/dryrot-scaffold.jpg?v=1793926645", "Dry rot and facade repair from the scaffold"],
  ["img/work/siding-crew.jpg?v=1793926645", "Siding replacement on an occupied apartment building"],
  ["img/work/rooftop-framing.jpg?v=1793926645", "Rooftop screen wall framing"],
  ["img/work/composite-balcony.jpg?v=1793926645", "Finished composite balcony deck"],
] };

/* ---------- Auto-organization (samples) ---------- */
// Emails from people already attached to a job. The Field Office reads each one and files what's in it.
AX.inbox = [
  { from: "Diaz Framing", who: "Rudy Diaz", av: "DF", job: "J-2611", time: "7:58 a.m.", subj: "RE: Bayview Bldg C, joist count and ledger",
    body: "Kameron, counted 84 LF for Bldg C, matches the plan. Unit 6 ledger is worse than we thought, need the engineer out before Friday or we lose the crane day. Updated quote attached.",
    att: [["Diaz_BldgC_quote_rev2.pdf", "Quote"], ["unit6_ledger.jpg", "Photo"]],
    note: "Diaz confirms 84 LF for Building C. Unit 6 ledger rot is worse than expected; engineer visit needed before Friday.",
    due: ["Engineer visit at unit 6", "Fri Nov 13", "Before the crane day"], task: ["Book Rivera Engineering for unit 6", "Kameron"],
    money: ["Quote rev 2", "$11,860", "was $10,940, now on the estimate as a change"], why: "Diaz is on Bayview, and the email says Bayview and Bldg C" },
  { from: "Rivera Studio", who: "Ana Rivera, architect", av: "RS", job: "J-2619", time: "Yesterday", subj: "Seven Hills ADU, revised plan set for plan check",
    body: "Attached are the revised sheets A-101 through A-104 answering the county's comments. Please resubmit by Monday the 16th so we keep our slot.",
    att: [["SevenHills_A101-A104_rev2.pdf", "Plans"], ["County_comment_response.pdf", "Letter"]],
    note: "Revised plan set rev 2 answers the county's plan check comments. Rev 1 sheets moved to superseded.",
    due: ["Resubmit to Alameda County", "Mon Nov 16", "To keep the plan check slot"], task: ["Upload rev 2 to the county portal", "Bill"],
    money: null, why: "Rivera Studio is the architect on Seven Hills Rd, and the sheets match its plan set" },
  { from: "Home Depot Pro", who: "Pro Desk, San Leandro", av: "HD", job: "J-2615", time: "Yesterday", subj: "Your quote Q-77412 is ready",
    body: "Quote Q-77412 for 1 toilet kit, 1 wall-hung sink, 2 grab bars and fittings. Prices held through November 20.",
    att: [["Quote_Q-77412.pdf", "Quote"]],
    note: "Restroom fixtures for the Davis St change order. Prices held through Nov 20.",
    due: ["Order the restroom fixtures", "Fri Nov 20", "Quote prices expire"], task: ["Order once the tenant signs the change order", "Tony"],
    money: ["Quote Q-77412", "$1,942.18", "added to the Davis St change order"], why: "The quote names PO 2615-11, which is Davis St" },
  { from: "City of San Leandro", who: "Building Inspection", av: "SL", job: "J-2604", time: "Tue", subj: "Inspection result: BLD26-0418",
    body: "Inspection type: Frame and hardware. Result: Approved. Next required inspection: Final.",
    att: [["BLD26-0418_result.pdf", "Inspection"]],
    note: "Phase 2 frame and hardware passed. Next: final inspection.",
    due: ["Request the final inspection", "When Phase 3 is done", "City permit BLD26-0418"], task: ["Send draw #4 to the owner, inspection passed", "Kameron"],
    money: ["Draw #4", "$28,560", "ready to send"], why: "Permit BLD26-0418 belongs to Estudillo Ave" },
];
// The crew roster: everyone's number in one place. Numbers are samples (555).
AX.team = [
  { n: "Kameron Suoja", r: "Owner, runs the jobs", ph: "(510) 555-0128", sk: ["Estimating", "Balconies", "Soft story"], on: "Bayview Terrace", st: "busy" },
  { n: "Luis Ortega", r: "Lead carpenter", ph: "(510) 555-0143", sk: ["Framing", "Balconies", "Beams"], on: "Bayview Terrace", st: "busy" },
  { n: "Marco Diaz", r: "Carpenter", ph: "(510) 555-0167", sk: ["Framing", "Hold-downs"], on: "Estudillo Ave", st: "free", free: "Free from Mon Nov 16" },
  { n: "Dave Kim", r: "Carpenter", ph: "(510) 555-0181", sk: ["Siding", "Dry rot", "Finish"], on: "Marina Blvd", st: "soon", free: "Marina Blvd ends Fri" },
  { n: "Tony Ruiz", r: "Carpenter", ph: "(510) 555-0195", sk: ["Tenant improvement", "Drywall", "Doors"], on: "Davis St", st: "busy" },
  { n: "Eli Brooks", r: "Laborer", ph: "(510) 555-0112", sk: ["Demo", "Clean-up", "Deliveries"], on: "Lakeshore deck", st: "soon", free: "Lakeshore ends Thu" },
  { n: "Sam Patel", r: "Laborer, part time", ph: "(510) 555-0136", sk: ["Demo", "Clean-up"], on: "", st: "free", free: "Available now" },
];
