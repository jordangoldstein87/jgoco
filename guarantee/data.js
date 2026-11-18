/* Every word and number the pitch shows. Facts about Guarantee Drywall come from research/ (sources there).
   Reviews, jobs, leads, customers and dollar figures in the back office mockups are SAMPLES, labeled on the page. */
window.GD = {
  co: {
    name: "Guarantee Drywall",
    city: "Encino, Los Angeles",
    since: 1996, years: "30+",
    domain: "guarantee-drywall.com",
    email: "guaranteedrywall@gmail.com",
    phone: "(818) 345-0135",
    tel: "+18183450135",
    owner: "Amos Cohen",
    first: "Amos",
    lic: "",
    area: ["Encino", "Sherman Oaks", "Van Nuys", "North Hollywood", "Studio City", "Woodland Hills", "Burbank", "Glendale", "Downtown LA", "Hollywood", "West LA", "Santa Monica"],
  },
  jordan: { name: "Jordan Goldstein", email: "jordan@jgoco.me" },

  hero: {
    kick: "Guarantee Drywall, rebuilt",
    h: "Thirty years of flat walls.<br><em>Time the internet saw them.</em>",
    p: "A clean new website, every listing and review in one place, marketing that runs itself, and project management built for drywall.",
  },

  /* the opening video: one narrated line per scene (rendered by tools/narrate.mjs into img/vo/) */
  video: {
    scenes: [["open", 6], ["today", 6], ["logo", 5], ["site", 5], ["listings", 5.5], ["crew", 8], ["receipt", 6], ["units", 5.5], ["health", 5.5], ["end", 5]],
    narr: {
      open: "Amos, thirty years of flat walls. A two hundred ninety seven unit building in North Hollywood. Twenty floors on Seventh Street.",
      today: "But online, your website shows an error, your listings have four different phone numbers, and the reviews stop at Google.",
      logo: "So we start with a new logo. Four ways to say drywall.",
      site: "Then a simple website, built to get the call.",
      listings: "Every listing and every review, run from one place.",
      crew: "Text your own assistant. Call time six thirty tomorrow at Lankershim. It tells the whole crew, and fills in the call sheet as they answer.",
      receipt: "Text it a receipt. It lands on the right job, and in QuickBooks, before you leave the lot.",
      units: "Track every unit, floor by floor, from bid to paid.",
      health: "And always know which jobs make you money.",
      end: "Less office. More walls. Scroll down and take a look.",
    },
  },

  today: {
    h: "Today, the work is better than the way it's found.",
    p: "A 297-unit building in North Hollywood. Twenty floors on 7th Street. A private gym with its own basketball court. The work is big and it's good. But online, Guarantee Drywall is hard to find and harder to call.",
    stats: [
      ["Error", "is what guarantee-drywall.com shows today. You still own the name, through 2027."],
      ["4 phones", "and 3 addresses across your listings. One number is a directory's own sales line."],
      ["15", "Google reviews, all 5 stars. None on Yelp, Angi, Nextdoor or BBB."],
      ["93", "Angi reviews for a competitor working the Valley, with no website at all. The bar is low."],
    ],
  },

  services: [
    ["Metal stud framing", "Walls, soffits and shafts for multifamily and commercial builds."],
    ["Hang", "New construction, additions and tenant improvements. Walls, ceilings, curves."],
    ["Tape and texture", "Smooth, orange peel, skim coat and Spanish texture. Matched to what's there."],
    ["Ceilings", "T-bar drop ceilings and RC channel for sound."],
    ["Water damage repair", "Cut out, dry in, patch and match. You can't tell where it was."],
    ["Plaster", "Interior plastering and repair, old houses included."],
  ],
  projects: [
    ["297", "units", "North Hollywood"],
    ["150", "units", "Broadway, Downtown LA"],
    ["140", "units, 20 floors", "7th Street, Downtown LA"],
    ["57", "units", "East 7th Street, LA"],
  ],

  work: [
    ["office-front.jpg", "Two-story office", "Commercial"],
    ["gym-court.jpg", "Private gym and court", "Custom residential"],
    ["open-ceiling.jpg", "Open office ceiling", "Commercial"],
    ["curved-wall.jpg", "Curved shaftwall", "Commercial"],
    ["scaffold.jpg", "Clerestory walls", "Commercial"],
    ["gym-ceiling.jpg", "Black-ceiling gym", "Custom residential"],
    ["grid-ceiling.jpg", "Ceiling framing", "Commercial"],
    ["office-side.jpg", "Office, finished", "Commercial"],
  ],

  /* every listing, and what the back office can really do with it */
  listings: [
    ["Google", "Business Profile", "live", "Hours, photos, posts and review replies, straight from the back office."],
    ["Facebook", "Business Page", "live", "Posts, photos and comment replies. Moves you off the personal profile."],
    ["Instagram", "Business account", "live", "Every job photo posted with a caption you approve."],
    ["Yelp", "Business page", "assist", "New reviews land in your inbox with a reply drafted. One tap opens Yelp to post it."],
    ["Nextdoor", "Business page", "assist", "Neighbors recommend you. After each job, a link to do it."],
    ["Angi", "Pro profile", "assist", "Leads flow in. Replies drafted for you."],
    ["Thumbtack", "Pro profile", "assist", "Leads and reviews flow in. Answer in seconds."],
    ["BBB", "Business profile", "assist", "Alerts on anything new. Replies drafted."],
    ["Apple Maps", "Business Connect", "sync", "Name, hours and photos kept matching Google."],
    ["Bing", "Places", "sync", "Copied from Google. Kept in step."],
  ],

  /* SAMPLE reviews for the inbox mock */
  reviews: [
    { src: "Google", stars: 5, who: "Sample · Maria T.", when: "2h", text: "They patched a water-damaged ceiling in our kitchen and you honestly can't tell where it was. Clean, on time, fair price.", draft: "Thank you, Maria. Matching an old ceiling so the patch disappears is the part we're proudest of. Call us anytime." },
    { src: "Yelp", stars: 4, who: "Sample · Kevin R.", when: "Yesterday", text: "Great finish on our garage conversion. Took a day longer than quoted because of the inspection, but they kept me posted.", draft: "Thanks, Kevin. Inspections set the pace sometimes, and we'd rather tell you than surprise you. Enjoy the new room." },
    { src: "Facebook", stars: 5, who: "Sample · Westside Builders", when: "3d", text: "Our go-to drywall sub for TI work. Crew shows up, walls are flat, punch list is short.", draft: "Appreciate you, Westside. Short punch lists are the goal on every job. See you on the next one." },
  ],

  /* automated marketing, ranked by payoff */
  autos: [
    { k: "review", t: "Ask every finished job for a review", when: "Job marked done", what: "A text with your Google link, sent the next morning. Every customer, no filter.", fact: "83% of customers who are asked leave a review.", src: "BrightLocal 2026", on: true,
      sms: ["Hi Maria, it's Guarantee Drywall. Thanks for having us out for the kitchen ceiling. If you're happy with it, a quick Google review helps a small crew a lot:", "g.page/guarantee-drywall/review"] },
    { k: "missed", t: "Missed call, instant text back", when: "A call goes unanswered", what: "Within a minute: \"Sorry we missed you, we're on a job. What can we help with?\"", fact: "About 1 in 4 home-service calls go unanswered.", src: "Industry call studies", on: true,
      sms: ["Sorry we missed your call, we're up on a ladder. This is Guarantee Drywall. What's the project? Photos help, just text them here."] },
    { k: "lead", t: "Every lead answered in minutes", when: "Website, Messenger, Angi or Thumbtack lead", what: "A friendly first reply and a photo request, so you quote it from the truck.", fact: "Reaching a lead within the hour: about 7x the odds of a real conversation.", src: "Harvard Business Review", on: true,
      sms: ["Thanks for reaching out to Guarantee Drywall. Can you send a couple of photos and the rough size of the wall or ceiling? We'll get you a number today."] },
    { k: "post", t: "One photo, posted everywhere", when: "You snap a finished wall", what: "Caption written, you tap OK, it goes to Google, Facebook and Instagram.", fact: "Profiles with photos get more calls and direction requests.", src: "Google", on: true },
    { k: "reply", t: "Every review answered", when: "A new review anywhere", what: "A reply drafted in your voice. Approve it, or edit first.", fact: "89% of people expect owners to respond to reviews.", src: "BrightLocal", on: true },
    { k: "estimate", t: "Follow up on open estimates", when: "Estimate sent, no answer", what: "A check-in at day 2, day 7 and day 21. Stops the moment they reply.", fact: "", src: "", on: false,
      sms: ["Hi Kevin, just checking in on the garage conversion estimate. Happy to walk through it or adjust anything. Any questions?"] },
    { k: "partners", t: "Stay on every builder's bid list", when: "Every finished job", what: "Each general contractor gets a photo report when you finish, and a check-in with new work every quarter. Painters and restoration companies get a referral link.", fact: "", src: "", on: false },
    { k: "towns", t: "A page for every town you work in", when: "A finished job with photos", what: "\"Drywall repair in Sherman Oaks\", built from your real jobs there, never copy-paste pages.", fact: "", src: "", on: false },
  ],

  /* one assistant, two doors: its own text number and ChatGPT (SAMPLE number, crew and answers) */
  ai: {
    number: "(818) 555-0147",
    crew: [
      ["Luis", "Lead hanger", "(818) 555-0161"],
      ["Marco", "Hanger", "(818) 555-0162"],
      ["Dani", "Taper", "(818) 555-0163"],
      ["Pablo", "Texture and finish", "(818) 555-0164"],
      ["Jorge", "Metal stud framer", "(818) 555-0165"],
    ],
    sheet: { job: "Lankershim apartments", day: "Thu Nov 19", call: "6:30 AM", where: "Lankershim Blvd, North Hollywood", notes: "Gate code 4412 · Park on P2 · Board on floors 3 and 4",
      rows: [
        ["Luis", "Floor 4 hang", "Confirmed", "6:12 PM", "ok"],
        ["Marco", "Floor 4 hang", "Confirmed", "6:14 PM", "ok"],
        ["Dani", "Floor 3 tape", "Late 15 min", "6:20 PM", "warn"],
        ["Pablo", "Floor 2 texture", "Confirmed", "6:31 PM", "ok"],
        ["Jorge", "Floor 4 framing", "Called, confirmed", "8:00 PM", "call"],
      ] },
    asks: [
      { q: "Call time 6:30 tomorrow at Lankershim. Let the whole crew know.", a: "Done. Texted Luis, Marco, Dani, Pablo and Jorge: call time 6:30 AM Thursday at Lankershim, gate code 4412, park on P2. I'm filling the call sheet as they answer, and I'll call anyone who hasn't replied by 8.", sheet: true },
      { q: "📷 Receipt photo: Home Depot, Van Nuys", img: true, a: "Got it. $1,284.60 at Home Depot: 40 sheets of 5/8 Type X and 6 boxes of mud. Filed to Lankershim apartments under materials and synced to QuickBooks. Lankershim materials are now 61% of budget." },
      { q: "How's the company doing this month?", a: "Good month. $142,300 billed, $118,900 collected, 27% gross margin, 3 points under your 30% target. Two things to watch: Ridgeline is 45 days late on $38,400, and labor on the Encino gym is 12% over with 40% of the job left." },
      { q: "How are we doing on Lankershim?", a: "From QuickBooks: $412,000 contract, $197,760 billed, $151,300 spent so far (labor $96,400, materials $54,900). Running at a 23% margin, 2 points under your bid. Floor 4 board ran over by 38 sheets." },
      { q: "How much board for the Sherman Oaks addition?", a: "1,450 sf of 1/2 inch with 10% waste: 34 sheets of 4×12, 4 boxes of mud, 2 rolls of tape, 7 lbs of screws and 10 pieces of corner bead. Want me to send the order to your supplier for Monday?" },
      { q: "Did Ridgeline pay pay app 2?", a: "Yes. $107,120 landed Nov 12. Pay app 3 for $74,160 is ready to go on the 25th with the conditional waiver attached. Retention held so far: $19,776." },
      { q: "Who's free Friday?", a: "Pablo and Jorge. Luis, Marco and Dani are on Lankershim floor 4. Want me to offer Pablo and Jorge the Office TI on Ventura?" },
      { q: "Text Kevin we're running 30 minutes late.", a: "Drafted to Kevin R.: \"Hi Kevin, it's Guarantee Drywall. We're running about 30 minutes behind, see you at 8:30.\" Send it?" },
      { q: "Any new reviews?", a: "One. Maria T. left 5 stars on Google for the kitchen ceiling. I drafted a reply in your voice. Post it?" },
    ],
  },

  /* company health, from QuickBooks and the job board (SAMPLE) */
  health: {
    kpis: [
      ["Billed this month", "$142,300", "+12% vs October", "up"],
      ["Collected", "$118,900", "84% of billed", ""],
      ["Owed to you", "$96,400", "$38,400 is over 45 days", "warn"],
      ["Retention held", "$41,200", "2 buildings finished", ""],
      ["Gross margin", "27%", "Target 30%", "warn"],
      ["Crew cost this week", "$9,860", "5 people, 212 hours", ""],
    ],
    jobs: [
      ["Kitchen ceiling, water damage", "Repair", 950, 530],
      ["Garage conversion", "Remodel", 6400, 4290],
      ["Office TI, Ventura Blvd", "Commercial", 38800, 27600],
      ["Encino home gym", "Custom home", 31500, 25100],
      ["Lankershim apartments, 112 units", "Multifamily", 412000, 317200],
      ["Burbank 48-unit, finished", "Multifamily", 186000, 151900],
    ],
    kinds: [["Repairs", 44, 9], ["Custom homes", 31, 14], ["Commercial", 29, 21], ["Multifamily", 23, 56]],
    insights: [
      ["Repairs earn 44%. Apartments earn 23%.", "Repairs are only 9% of the work. The website and reviews are aimed at bringing in more of them."],
      ["Floor 4 at Lankershim used 38 extra sheets.", "Waste on 5/8 Type X is running 16%, not the 10% you bid. Worth a look before floor 5."],
      ["Ridgeline pays in 41 days. Westside pays in 19.", "A reminder went to Ridgeline at day 30. Want one at day 20 next time?"],
      ["Labor on the Encino gym is 12% over.", "40% of the job is left. Two extra days of taping are why."],
      ["$41,200 in retention is waiting.", "Release requests for two finished buildings are drafted and ready to send."],
    ],
  },

  /* project management add-on (SAMPLE jobs) */
  pm: {
    stages: ["Estimate", "Scheduled", "Hang", "Tape", "Texture", "Punch", "Paid"],
    unitStages: [["Frame", "#c9ced8"], ["Hang", "#8fa3c9"], ["Tape", "#5b78b3"], ["Texture", "#2f4f94"], ["Punch", "#d98b0b"], ["Done", "#1f9d55"]],
    /* the Lankershim sample: 4 floors of 28 units; the number is how far each floor has got */
    floors: [[1, 5.0], [2, 4.2], [3, 2.6], [4, 1.3]],
    feats: [
      ["Bid", "Takeoffs from the plans", "Upload the PDF set. Walls and ceilings measured, priced from your own rates, bid out the same day."],
      ["Job", "A board for every job", "Estimate to paid, at a glance. Every house, every tower, every patch."],
      ["Unit", "Unit by unit", "On a 112-unit building, see which units are hung, taped, textured and punched. So does the GC."],
      ["Crew", "Tomorrow, by text", "At 6 PM each person gets tomorrow's address, floor and gate code. They reply to confirm."],
      ["Mat", "Board counted and ordered", "Sheets, mud, tape, screws and bead from the square footage. Stocked to the right floor."],
      ["Log", "Daily logs with photos", "Crew photos file to the job and the unit. The log writes itself for the GC."],
      ["CO", "Change orders signed first", "Extra soffit or a Level 5 upgrade? Priced, texted, signed on a phone before the work."],
      ["Pay", "Pay apps and retention", "Monthly progress billing by floor, retention tracked, conditional lien waivers ready to send."],
      ["Rcpt", "Text a receipt", "Snap it and text it to your number. It's read, filed to the right job and category, and in QuickBooks before you leave the lot."],
      ["QB", "QuickBooks, in sync", "Invoices, payments, receipts and payroll costs flow both ways. Your bookkeeper keeps working in QuickBooks like always."],
      ["Cost", "Profit on every job", "Contract, billed and spent, side by side. See a job going over while there's still time to fix it."],
      ["Doc", "Prelims and insurance", "20-day preliminary notices sent on time. Insurance certificates tracked before they expire."],
    ],
    jobs: [
      { id: "GD-241", name: "Lankershim apartments, 112 units", who: "Sample · Ridgeline Builders", stage: 3, sqft: 96000, board: "5/8\" Type X", value: 412000, crew: ["Luis", "Marco", "Dani", "Pablo", "Jorge"], due: "Floor 3 tape Fri" },
      { id: "GD-242", name: "Kitchen ceiling, water damage", who: "Sample · Maria T.", stage: 6, sqft: 120, board: "1/2\" moisture", value: 950, crew: ["Dani"], due: "Done" },
      { id: "GD-243", name: "Garage conversion", who: "Sample · Kevin R.", stage: 4, sqft: 880, board: "1/2\" regular", value: 6400, crew: ["Luis", "Marco"], due: "Tue Nov 24" },
      { id: "GD-244", name: "Encino home gym", who: "Sample · Arden Homes", stage: 2, sqft: 5200, board: "5/8\" Type X", value: 31500, crew: ["Luis", "Marco", "Dani", "Pablo"], due: "Dec 4" },
      { id: "GD-245", name: "Office TI, Ventura Blvd", who: "Sample · Westside Builders", stage: 1, sqft: 6400, board: "5/8\" Type X", value: 38800, crew: ["Pablo"], due: "Mon Nov 23" },
      { id: "GD-246", name: "Sherman Oaks addition", who: "Sample · Oakline Remodel", stage: 0, sqft: 1450, board: "1/2\" regular", value: 11800, crew: [], due: "Bid due Nov 19" },
      { id: "GD-247", name: "Van Nuys mixed-use, 64 units", who: "Sample · Crane GC", stage: 0, sqft: 58000, board: "5/8\" Type X", value: 268000, crew: [], due: "Bid due Nov 25" },
    ],
  },
};
