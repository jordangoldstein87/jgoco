/* Every word and number the pitch shows. Facts about Best Self Medical Arts come from research/ (sources there).
   Patients, dollars, device hours and schedules in the back office mockups are SAMPLES, labeled on the page.
   Sample patients are initials only, the way a chart shows them. */
window.BS = {
  co: {
    name: "Best Self Medical Arts",
    doc: "Dr. Cheryl Harris Geer, D.O., F.A.C.O.G.",
    docShort: "Dr. Cheryl Harris Geer",
    first: "Dr. Geer",
    city: "Westlake Village",
    region: "Conejo Valley",
    since: 1999,
    years: "25+",
    domain: "bestselfmedicalarts.com",
    email: "",
    phone: "(818) 318-1200",
    tel: "+18183181200",
    addr: "32129 Lindero Canyon Rd, Suite 205",
    cityzip: "Westlake Village, CA 91361",
    hours: "Mon to Fri, 9:00 to 5:30",
    sister: {
      name: "Center for Women's Well Being",
      phone: "(805) 482-2634",
      tel: "+18054822634",
      addr: "445 Rosewood Ave, Suite C",
      cityzip: "Camarillo, CA 93010",
      since: 2001,
    },
    area: ["Westlake Village", "Thousand Oaks", "Agoura Hills", "Calabasas", "Newbury Park", "Oak Park", "Camarillo", "Moorpark", "Simi Valley", "Malibu"],
    motto: "Let no one ever come to you without leaving better and happier.",
    purpose: "Helping each individual to optimize their well being in body, mind, and spirit.",
  },
  jordan: { name: "Jordan Goldstein", email: "jordan@jgoco.me" },

  hero: {
    kick: "Best Self Medical Arts, rebuilt",
    h: "Your patients love you.<br><em>Almost nobody can find you.</em>",
    p: "Twenty-five years, two practices, and a laser suite other doctors come to train on. Here is a website that books appointments, every listing claimed and corrected, and an assistant that answers patients day and night.",
  },

  /* the opening video: one narrated line per scene (rendered by tools/narrate.mjs into img/vo/) */
  video: {
    scenes: [["open", 7], ["today", 7], ["logo", 5], ["site", 6], ["chat", 7], ["book", 6], ["channels", 6.5], ["listings", 6], ["ads", 6], ["assistant", 7], ["health", 6], ["end", 5]],
    narr: {
      open: "Doctor Geer. Twenty-five years. Two practices. A Sciton Luminary who trains other physicians, and a protocol you invented called The Big Reset.",
      today: "But online, nothing finds you. Your own name and domain returned nothing. Your strongest reviews sit on the wrong listing. And not one button on your site books an appointment.",
      logo: "Then your own logo, drawn properly. Same mark, same colours, just cleaned up.",
      site: "Then a website built the way your practice actually works.",
      chat: "With a knowledge base behind it. Every question you have answered a thousand times, answered again at eleven at night, with the source.",
      book: "And the thing your site has never had. A patient picks a time and books it.",
      channels: "Most people never reach your website. They book from Google, from Instagram, from a maps app. All of it lands on one calendar.",
      listings: "Every listing claimed, merged and pointed at Westlake Village.",
      ads: "Then we buy the searches you are missing, with the cost of every keyword on the table first.",
      assistant: "One assistant, three doors. Text it, chat it on the site, or ask it in ChatGPT. It knows your schedule, your devices and your books, and nothing goes out without your OK.",
      health: "And you always know which service lines actually make money.",
      end: "More of your best work. Less of the front desk. Scroll down and take a look.",
    },
  },

  today: {
    h: "Here is what we found.",
    p: "You are a board-certified OB-GYN who trains other doctors on these lasers. The medicine is extraordinary. The way it is found is not.",
    /* [the number, what it means in one line, then the plain explanation] */
    stats: [
      ["0 of 10", "You did not come up", "We searched ten ways. Your website never appeared."],
      ["130 vs 12", "Reviews on the wrong name", "Most sit on Camarillo. Only twelve on Best Self."],
      ["463", "A competitor is far ahead", "One med spa nearby has 463. You have twelve."],
      ["0", "Nobody can book online", "Seventy-eight buttons. Not one of them books."],
    ],
    more: [
      ["Your email may be going to junk",
        "Your website is missing the setting that proves an email really came from you. Mail you send can get filtered before anyone reads it."],
      ["Your Facebook ads cannot tell you anything",
        "The tracking on your site is switched off. If money has gone to Instagram or Facebook, there is no way to know what came back from it."],
      ["Your before and after photos do not load",
        "The sliders on every treatment page point at a file that is no longer there. On all 137 pages, a patient sees nothing."],
      ["Google thinks you are open seven days",
        "Google has been told you are open nine to five every day, weekends included. Your own page says Monday to Friday. Four different sets of hours are out there right now."],
      ["Eighty-nine articles nobody can find",
        "You answered the exact questions people type into Google, like what HALO costs. They stopped in March 2025, and nothing on your site points to them."],
      ["Three supplement stores at once",
        "Fullscript, Designs for Health and Metagenics all sit in your menu, splitting the same orders between them."],
    ],
  },

  /* booking from the places patients actually start. Verified in research/booking-channels.md:
     "live" means real open times on that platform, "button" means a tracked Book button that
     lands on her real calendar. The difference is deliberate, because Google is moving beauty
     and medical bookings to a redirect rather than live slots inside search. */
  channels: {
    h: "Book from wherever they find you.",
    p: "Most people never reach a website. They book from Google, from Instagram, from a maps app. One calendar behind all of it, so nothing is ever double booked.",
    rows: [
      ["Google Search and Maps", "A Book button on your profile, tracked, landing on your calendar.", "button"],
      ["Instagram and Facebook", "Book without ever leaving the app.", "live"],
      ["Zocdoc", "Real open times. They also show inside Yelp.", "live"],
      ["Yelp", "A Book button. Real times there only come through Zocdoc.", "button"],
      ["Apple Maps", "A Book link on the place card.", "button"],
      ["Your site, the chat, the text line", "Real open times, taken on the spot.", "live"],
    ],
    honest: "Two things worth being straight about. Google is moving beauty and medical bookings to a tracked Book button rather than live slots inside search, so a button is what we would build there. And live times on Yelp exist only through Zocdoc, which is the medical side. Everywhere else lands on the same calendar.",
  },

  /* the framing that matters: this is a tool for the person at the desk, not a telling-off */
  team: {
    h: "None of this is anyone's fault.",
    p: "Nobody ever gave your office manager a tool for it. A dozen logins, and no time between patients. This gives them one place.",
    now: [
      "A dozen logins, passwords in a notebook.",
      "A review sits unseen for a week.",
      "A missed call is gone for good.",
      "Holiday hours fixed in one place out of six.",
      "The same answer retyped again.",
      "Nobody knows who is overdue.",
    ],
    then: [
      "One login, both offices.",
      "Reviews arrive with a reply drafted.",
      "Missed calls get a text in a minute.",
      "Change hours once. Fixed everywhere.",
      "Written down once. The chat hands it out.",
      "The overdue list is already made.",
    ],
    morning: {
      t: "What the front desk sees at 8:45",
      rows: [
        ["2 new reviews", "Replies drafted, waiting on a yes"],
        ["11 of 13 confirmed", "Two still to call, numbers ready"],
        ["2 open laser hours", "18 people on the recall list for them"],
        ["4 inquiries overnight", "All answered, two asking for times"],
        ["9 rechecks due", "Lab orders need a signature"],
      ],
    },
    note: "Nothing sends itself. Everything waits for a person to press send.",
  },

  /* the five service pillars */
  services: [
    ["Laser and light", "HALO, BBL HERO, Forever Young, Forever Clear, SkinTyte and ProFractional on the Sciton Joule.", "lasers.jpg"],
    ["Women's wellness and hormones", "Bio-identical hormone therapy, pellets, menopause care, well-woman exams and gynecology.", "womens.jpg"],
    ["Intimate health", "diVa and diVaTyte laser, the O-Shot, PRP therapy, and help with incontinence.", "intimate.jpg"],
    ["Men's health", "Low testosterone, ED, Peyronie's, Shockwave therapy and the P-Shot.", "mens.jpg"],
    ["Skin and cosmetic", "HydraFacial, DiamondGlow, microcurrent, laser hair removal and dermal fillers.", "cosmetic.jpg"],
    ["The Big Reset", "Your own protocol. Hormones, skin and energy reset together instead of one at a time.", "halo.jpg"],
  ],

  /* the numbers that belong at the top of her own website */
  credentials: [
    ["25+", "years in practice", "Ventura County, since 1999"],
    ["2", "practices", "Westlake Village and Camarillo"],
    ["D.O.", "F.A.C.O.G.", "Board-certified OB-GYN"],
    ["Sciton", "Luminary", "You train other physicians"],
  ],

  /* photos, all from her own site */
  work: [
    ["hero.jpg", "HALO laser resurfacing", "Laser and light"],
    ["reception.jpg", "Lindero Canyon reception", "Westlake Village"],
    ["treatment-room.jpg", "Treatment room", "Westlake Village"],
    ["womens.jpg", "Hormones and menopause", "Women's wellness"],
    ["mens.jpg", "Men's vitality", "Men's health"],
    ["cosmetic.jpg", "Facials and skin", "Cosmetic"],
    ["patio.jpg", "The patio", "Westlake Village"],
    ["intimate.jpg", "diVa and intimate health", "Women's wellness"],
  ],

  /* what actually brings people in, in their own search words */
  concerns: [
    ["Sun damage and brown spots", "HALO · BBL HERO"],
    ["Fine lines and texture", "HALO · ProFractional"],
    ["Redness and rosacea", "Forever Clear BBL"],
    ["Loose skin and laxity", "SkinTyte · diVaTyte"],
    ["Acne and acne scars", "Forever Clear · ProFractional"],
    ["Unwanted hair", "Laser hair removal"],
    ["Hot flashes and night sweats", "Bio-identical hormones"],
    ["Low energy and brain fog", "The Big Reset"],
    ["Low libido", "Hormones · O-Shot · P-Shot"],
    ["Leaking when you laugh", "diVa · incontinence care"],
    ["Painful intimacy", "diVa · PRP"],
    ["Erectile dysfunction", "Shockwave · P-Shot"],
    ["Low testosterone", "Men's vitality"],
    ["Weight that will not move", "The Big Reset"],
    ["Annual well-woman exam", "Gynecology"],
  ],

  /* SAMPLE pricing, drawn from her own older blog posts. These are national averages she published,
     not her current fees, and the page says so. */
  prices: [
    ["HALO laser resurfacing", "from $1,500", "Full face, one session"],
    ["BBL HERO", "from $500", "Per session, face or body"],
    ["diVa vaginal laser", "$2,500 to $4,500", "Series of three"],
    ["The O-Shot", "$1,400 to $1,800", "Per treatment"],
    ["The P-Shot", "$1,800 to $2,400", "Per treatment"],
    ["Shockwave therapy", "from $500", "Per session, series of six"],
    ["Hormone pellets", "Ask at consult", "Varies by dose and sex"],
    ["HydraFacial", "Ask at consult", "Single or membership"],
  ],

  /* every listing, and what the back office can really do with it */
  listings: [
    ["Google", "Business Profile", "live", "Hours, photos, services and replies from one place. Both offices."],
    ["Healthgrades", "Physician profile", "assist", "Ninety-nine ratings, unclaimed, and it never says Westlake Village."],
    ["Birdeye", "Two profiles", "assist", "130 reviews on one, 12 on the other. Merged into one brand."],
    ["Yelp", "Business page", "assist", "Three reviews, three years old, still showing a Claim It button."],
    ["Zocdoc", "Provider profile", "assist", "A 4.5 rating and no way to book. Turn it on or take it down."],
    ["RealSelf", "Provider profile", "assist", "Forty-four providers listed for HALO near you. You train people on it."],
    ["Apple Maps", "Business Connect", "sync", "Name, hours and photos kept matching Google."],
    ["Bing", "Places", "sync", "Copied from Google. It feeds ChatGPT search too."],
    ["Facebook", "Business Page", "live", "Posts and replies, with consent on file for anything with a patient."],
    ["Instagram", "Business account", "live", "Your results, posted on a schedule you approve."],
  ],

  /* SAMPLE reviews for the inbox mock. Replies never confirm that someone is a patient. */
  reviews: [
    { src: "Google", stars: 5, who: "Sample · M.T.", when: "2h", text: "Dr. Geer explained exactly what HALO would and would not do for my sun damage. No overselling. Four months later my skin looks like it did in my thirties.",
      draft: "Thank you so much for this. Setting honest expectations before anything else is how we like to start, and it means a lot to hear it landed that way. We appreciate you taking the time." },
    { src: "Healthgrades", stars: 2, who: "Sample · J.R.", when: "Yesterday", text: "Love the doctor, but I waited over an hour past my appointment time and nobody said anything.",
      draft: "Thank you for telling us. A long wait with no explanation is not the experience we want anyone to have, and we are looking at how we schedule and how we communicate when we run behind. Please call the office at (818) 318-1200 and ask for the practice manager so we can talk it through." },
    { src: "Birdeye", stars: 5, who: "Sample · D.K.", when: "3d", text: "I had been told for years that how I felt was just my age. The hormone work here gave me my energy back and I sleep through the night now.",
      draft: "This is the reason we do this work. Being told that how you feel is just your age is something we hear far too often. Thank you for sharing it, and for trusting us." },
  ],

  /* automated marketing, ranked by payoff */
  autos: [
    { k: "review", t: "Ask every visit for a review", when: "A visit is marked complete", what: "A text the next morning with the link to the Best Self profile, so new reviews land on the brand that does the lasers instead of the old one.", fact: "Setiba has 463 reviews. Best Self Medical Arts has 12.", src: "Checked Nov 19, 2026", on: true,
      sms: ["Hi, it's Best Self Medical Arts. Thank you for coming in yesterday. If you have a minute, a short review helps other people in the Conejo Valley find us:", "g.page/best-self-medical-arts/review"] },
    { k: "missed", t: "Missed call, instant text back", when: "A call goes unanswered", what: "Within a minute: a text saying the front desk is with a patient, asking what they need. No voicemail, no lost caller.", fact: "About 1 in 4 calls to a practice go unanswered.", src: "Industry call studies", on: true,
      sms: ["Sorry we missed you, the front desk is with a patient. This is Best Self Medical Arts. What can we help with? You can also book any time at bestselfmedicalarts.com/book"] },
    { k: "lead", t: "Every inquiry answered in minutes", when: "A website form, chat or Instagram message", what: "A real first reply with the next three open consult times, so nobody waits until Monday.", fact: "Replying within the hour: about 7x the odds of a real conversation.", src: "Harvard Business Review", on: true,
      sms: ["Thanks for reaching out to Best Self Medical Arts. Dr. Geer has consult openings Thu 2:40, Fri 10:20 and Mon 9:00. Want me to hold one for you?"] },
    { k: "noshow", t: "Confirm and remind, cut the no-shows", when: "Five days, two days and the night before", what: "A confirmation they can reschedule from in one tap, plus the prep instructions for their specific treatment.", fact: "Seven no-shows last month, about $11,400 of chair time.", src: "Sample", on: true,
      sms: ["Reminder: HALO with Dr. Geer tomorrow at 10:20, 32129 Lindero Canyon Rd, Suite 205. No retinoids or sun today. Reply C to confirm or R to move it."] },
    { k: "recall", t: "Bring people back on schedule", when: "A treatment series or recheck is due", what: "Hormone rechecks at ninety days, BBL on the Forever Young schedule, annual exams, the second and third diVa sessions. The reasons people drift away.", fact: "", src: "", on: true,
      sms: ["Hi, it's Best Self. You're due for your 90-day hormone recheck with Dr. Geer. Here are the next openings, pick any one: bestselfmedicalarts.com/book"] },
    { k: "reply", t: "Every review answered", when: "A new review on any platform", what: "A reply drafted in your voice that thanks the person without ever confirming they are a patient. You approve it before it posts.", fact: "89% of people expect an owner to respond to reviews.", src: "BrightLocal", on: true },
    { k: "post", t: "One result, posted everywhere", when: "You have a case worth showing", what: "Caption written, consent checked and on file, then it posts to Google, Instagram and Facebook once you tap OK.", fact: "", src: "", on: false },
    { k: "winback", t: "Win back the ones who drifted", when: "Twelve months since the last visit", what: "A short note from Dr. Geer, not a coupon, aimed at the open hours on the Joule next week.", fact: "", src: "", on: false,
      sms: ["Hi, it's Best Self Medical Arts. It's been about a year. Dr. Geer wanted to check in and see how you're feeling. No pressure at all, but if you'd like to come in, here's the calendar."] },
  ],

  /* one assistant, three doors: its own text number, the chat on the site, and ChatGPT.
     SAMPLE number, team and answers. */
  ai: {
    number: "(818) 555-0142",
    crew: [
      ["Dr. Geer", "Physician and surgeon", "(818) 555-0160"],
      ["Veronica", "Front desk", "(818) 555-0161"],
      ["Carole", "Patient coordinator", "(818) 555-0162"],
      ["Mia", "Aesthetician", "(818) 555-0163"],
      ["Dana", "Medical assistant", "(818) 555-0164"],
    ],
    sheet: {
      job: "Thursday clinic, Westlake Village",
      day: "Thu Nov 19",
      call: "8:45 AM huddle",
      where: "32129 Lindero Canyon Rd, Suite 205",
      notes: "Joule warm by 8:30 · 2 HALO, 1 BBL HERO, 3 hormone rechecks · 1 new consult at 2:40",
      rows: [
        ["Dr. Geer", "Clinic 9:00 to 5:30", "Confirmed", "6:02 PM", "ok"],
        ["Veronica", "Front desk, confirmations sent", "Confirmed", "6:08 PM", "ok"],
        ["Carole", "Two consults to call back", "Confirmed", "6:14 PM", "ok"],
        ["Mia", "HydraFacials from 11", "In at 10:30", "6:26 PM", "warn"],
        ["Dana", "Joule setup and photos", "Called, confirmed", "7:40 PM", "call"],
      ],
    },
    asks: [
      { q: "Run tomorrow. Confirm everyone and tell me the gaps.", a: "Done. Texted all five: 8:45 huddle, Joule warm by 8:30. I confirmed 11 of 13 patients, moved one to Friday, and I'm calling the two who haven't replied at 8. Two gaps left: 1:20 and 4:00. Eighteen people are on the HALO and BBL recall list in Westlake, want me to offer those two slots to them?", sheet: true },
      { q: "📷 Receipt photo: Sciton consumables order", img: true, a: "Got it. $2,418.40 to Sciton: two HALO tips and BBL HERO gel. Filed under clinical supplies, tagged to the laser line, and synced to QuickBooks. Laser consumables are now 14% of laser revenue this month, which is about where you want it." },
      { q: "How are we doing this month?", a: "Good month. $148,600 collected, up 9% on October. Lasers are carrying it at a 58% margin. Three things to look at: the Joule was idle 41% of last week, you had seven no-shows worth about $11,400, and 61 inquiries produced 38 booked consults, so a third of the people who raised a hand never got on the calendar." },
      { q: "How full is the Joule next week?", a: "59% booked. Monday and Thursday are nearly full, Tuesday afternoon and Friday morning are wide open, which is 16 hours. At your average laser ticket that's roughly $9,000 of capacity sitting there. The recall list has 18 people due for BBL and 6 mid-HALO series. Want me to text that group with just those two windows?" },
      { q: "Who hasn't been in for a year?", a: "Forty-two people, and 11 of them are hormone patients who stopped refilling, which is usually a scheduling problem rather than a decision. I've drafted a short note from you for those 11 and a separate one for the 31 aesthetics patients. Nothing sends until you read both." },
      { q: "Any new reviews?", a: "Two. A five-star on Google about HALO and sun damage, and a two-star on Healthgrades about an hour-long wait. Both have replies drafted. Neither reply confirms anyone is a patient, and the Healthgrades one asks them to call the practice manager instead of going back and forth in public. Want to read them?" },
      { q: "What does a HALO series run, and what's included?", a: "From your own posted pricing: HALO full face from $1,500 a session. The series most people do is one HALO plus two BBL HERO at $500 each, so $2,500, with the follow-up photos and the aftercare kit included. That is the national average you published on the blog, not your current fee schedule, so tell me your real numbers and I'll use those from now on." },
      { q: "Text the 2:40 consult that we're running 20 minutes behind.", a: "Drafted: \"Hi, it's Best Self Medical Arts. Dr. Geer is running about 20 minutes behind, so plan on 3:00. Sorry about that, and thank you for your patience.\" Send it?" },
      { q: "Which hormone patients are due for a recheck?", a: "Nine are past 90 days, four of them past 120. I have the lab orders ready for all nine and a text that offers each of them the next three openings. Say the word and I'll send the texts, but the lab orders need your signature first." },
    ],
  },

  /* practice health. Two companies, two sets of books, both connected to QuickBooks.
     The assistant reads each one and adds them up. (SAMPLE) */
  health: {
    qb: "Both companies connect to QuickBooks. Best Self Medical Arts and Center for Women's Well Being stay separate sets of books, the way your accountant needs them. The assistant reads both and can show you either one or the two together.",
    ents: [["both", "Both companies"], ["bs", "Best Self · Westlake"], ["cw", "Women's Well Being · Camarillo"]],
    books: {
      both: "Best Self Medical Arts, LLC + Center for Women's Well Being",
      bs: "Best Self Medical Arts, LLC · QuickBooks Online",
      cw: "Center for Women's Well Being · QuickBooks Online",
    },
    kpis: {
      both: [
        ["Collected this month", "$170,200", "+9% vs October", "up"],
        ["Consults booked", "38", "from 61 inquiries", "warn"],
        ["Show rate", "82%", "7 no-shows, $11,400", "warn"],
        ["Joule hours used", "59%", "41% idle last week", "warn"],
        ["Supplements", "$9,240", "across 3 dispensaries", ""],
        ["New patients", "24", "9 found you on Google", ""],
      ],
      bs: [
        ["Collected this month", "$125,800", "+14% vs October", "up"],
        ["Consults booked", "23", "from 44 inquiries", "warn"],
        ["Show rate", "79%", "5 no-shows, $9,100", "warn"],
        ["Joule hours used", "59%", "41% idle last week", "warn"],
        ["Average ticket", "$1,640", "lasers and series", ""],
        ["New patients", "16", "7 found you on Google", ""],
      ],
      cw: [
        ["Collected this month", "$44,400", "+1% vs October", ""],
        ["Insurance owed", "$21,800", "$6,300 over 60 days", "warn"],
        ["Visits", "168", "exams, hormones, follow-ups", ""],
        ["Show rate", "88%", "2 no-shows", ""],
        ["Rechecks due", "9", "4 past 120 days", "warn"],
        ["New patients", "8", "mostly word of mouth", ""],
      ],
    },
    jobs: {
      both: [
        ["HALO and ProFractional", "Laser · Westlake", 46200, 19400],
        ["BBL HERO and Forever Young", "Laser · Westlake", 28800, 12100],
        ["Men's vitality", "Men's health · Westlake", 22400, 11200],
        ["Hormones and pellets", "Women's wellness · Camarillo", 21500, 9800],
        ["diVa and intimate health", "Women's wellness · Westlake", 18600, 8300],
        ["Well-woman and gynecology", "Gynecology · Camarillo", 12900, 7400],
        ["Facials and skin", "Cosmetic · Westlake", 9800, 6900],
        ["Menopause care", "Women's wellness · Camarillo", 6800, 3100],
        ["Incontinence and PRP", "Women's wellness · Camarillo", 3200, 1500],
      ],
      bs: [
        ["HALO and ProFractional", "Laser", 46200, 19400],
        ["BBL HERO and Forever Young", "Laser", 28800, 12100],
        ["Men's vitality", "Men's health", 22400, 11200],
        ["diVa and intimate health", "Women's wellness", 18600, 8300],
        ["Facials and skin", "Cosmetic", 9800, 6900],
      ],
      cw: [
        ["Hormones and pellets", "Women's wellness", 21500, 9800],
        ["Well-woman and gynecology", "Gynecology", 12900, 7400],
        ["Menopause care", "Women's wellness", 6800, 3100],
        ["Incontinence and PRP", "Women's wellness", 3200, 1500],
      ],
    },
    kinds: {
      both: [["Laser and light", 58, 44], ["Women's wellness", 53, 29], ["Men's health", 50, 13], ["Gynecology", 43, 8], ["Facials and skin", 30, 6]],
      bs: [["Laser and light", 58, 60], ["Women's wellness", 55, 15], ["Men's health", 50, 18], ["Facials and skin", 30, 8]],
      cw: [["Women's wellness", 54, 71], ["Gynecology", 43, 29]],
    },
    insights: {
      both: [
        ["One company earns the reviews, the other gets them.", "A hundred and thirty reviews sit on the Camarillo profile at 3.9 stars. Twelve sit on Best Self at 5.0. Every review from here on should land on the company the patient was actually treated by."],
        ["Westlake is 74% of the money and 100% of the risk.", "Camarillo is steady and insurance-backed. Westlake is bigger, cash-pay and swings with how full the Joule is. Worth watching them apart, not blended."],
        ["The Joule was idle 41% of last week.", "That is roughly 16 open hours on the most expensive thing either company owns. The recall and win-back texts aim straight at those hours."],
        ["Seven no-shows, about $11,400.", "None of them got a text the night before. Confirmations usually cut that in half on their own."],
        ["A third of inquiries never got booked.", "Sixty-one people raised a hand and 38 got on the calendar. That is reply speed, not demand."],
      ],
      bs: [
        ["Facials earn 30%. Lasers earn 58%.", "Facials are 8% of revenue and a lot of chair time. Keep them as how people meet you, not as what you sell."],
        ["Five no-shows cost about $9,100.", "Laser blocks are long and expensive to leave empty. A deposit on a card on file ends most of this."],
        ["Forty-four inquiries, 23 consults.", "Half the people who asked never got on the calendar. Most of that gap is answering after hours."],
        ["Men's vitality is quietly the second-best line.", "Fifty percent margin on 18% of revenue, with almost nothing on the site aimed at finding more of it."],
      ],
      cw: [
        ["$6,300 of insurance is over 60 days.", "Older than 60 days is where claims start getting written off. These are worth chasing this week."],
        ["Nine hormone rechecks are due, four badly.", "Rechecks are the recurring revenue in this company and the easiest thing to let slip."],
        ["Gynecology earns 43% and takes 29% of the time.", "It is the lower-margin half, and it is also what brings people in who later become Westlake patients."],
        ["This company is invisible online.", "Camarillo appears nowhere in the visible copy on the website, so the 130 reviews it earned point at directories instead of at you."],
      ],
    },
  },

  /* the practice management add-on (SAMPLE patients, initials only) */
  pm: {
    stages: ["Inquiry", "Consult booked", "Consulted", "Treatment booked", "Treated", "Follow-up", "Rebooked"],
    /* the devices, and how an open hour looks next to a booked one */
    devices: [
      ["Sciton Joule · HALO", "#2B6E8F", 1500],
      ["Sciton Joule · BBL HERO", "#4795C1", 500],
      ["diVa", "#21AE92", 1200],
      ["SkinTyte", "#6FBFA8", 600],
      ["HydraFacial", "#CDE9E6", 250],
      ["Shockwave", "#EFA056", 500],
    ],
    slots: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"],
    feats: [
      ["Book", "Booking that actually books", "A patient picks the treatment, sees real openings on the right device, and takes one. At eleven at night, without calling."],
      ["Intake", "Paperwork done before they arrive", "History, consents and photo permission signed on a phone. The front desk stops being a clipboard."],
      ["Dev", "Device hours, not just appointments", "The Joule is the most expensive thing you own. See its open hours a week out, and fill them on purpose."],
      ["Ser", "Treatment series, tracked", "HALO plus two BBL, three diVa sessions, six Shockwave. Who is mid-series and who quietly stopped."],
      ["Rec", "Recalls that run themselves", "Ninety-day hormone rechecks, Forever Young BBL intervals, annual exams. Booked, not just reminded."],
      ["Mem", "Memberships and packages", "Monthly memberships, prepaid series and gift cards, billed on a card on file instead of chased."],
      ["Sup", "One dispensary, not three", "Fullscript, Designs for Health and Metagenics consolidated, with the margin visible per patient."],
      ["Pay", "Deposits and financing", "A deposit to hold a laser hour, and financing offered at the consult for the four-thousand-dollar series."],
      ["Chart", "Charts, photos and notes", "Standardized before and after photography, filed to the patient and the series, ready for consent to publish."],
      ["Lab", "Labs ordered and chased", "Hormone panels ordered, results in, the patient told, and the recheck already on the calendar."],
      ["Txt", "Texting that is safe to use", "One number for the practice, every thread on the patient's chart, nothing in a personal phone."],
      ["QB", "QuickBooks, in sync", "Collections, card fees, supplies and payroll flow both ways. Your bookkeeper keeps working the way they always have."],
    ],
    jobs: [
      { id: "BS-1041", name: "HALO, full face", who: "Sample · M.T.", stage: 4, dev: "Sciton Joule · HALO", value: 1500, sess: "1 of 1", staff: ["Dr. Geer", "Dana"], due: "Follow-up photos Dec 3" },
      { id: "BS-1042", name: "Hormone pellets, recheck", who: "Sample · D.K.", stage: 6, dev: "Consult room", value: 1150, sess: "Recheck 2", staff: ["Dr. Geer"], due: "Next recheck Feb 14" },
      { id: "BS-1043", name: "diVa series", who: "Sample · L.P.", stage: 3, dev: "diVa", value: 3600, sess: "2 of 3", staff: ["Dr. Geer", "Dana"], due: "Session 3 Dec 9" },
      { id: "BS-1044", name: "BBL HERO, face and chest", who: "Sample · A.S.", stage: 2, dev: "Sciton Joule · BBL HERO", value: 1000, sess: "1 of 2", staff: ["Mia"], due: "Books at consult" },
      { id: "BS-1045", name: "Shockwave for ED", who: "Sample · R.B.", stage: 4, dev: "Shockwave", value: 3000, sess: "4 of 6", staff: ["Dr. Geer"], due: "Session 5 Nov 24" },
      { id: "BS-1046", name: "Men's vitality consult", who: "Sample · T.N.", stage: 1, dev: "Consult room", value: 0, sess: "Consult", staff: [], due: "Thu 2:40 PM" },
      { id: "BS-1047", name: "The Big Reset", who: "Sample · K.W.", stage: 0, dev: "Consult room", value: 0, sess: "Inquiry", staff: [], due: "Called twice, no answer" },
    ],
  },

  /* her social accounts, checked live on Nov 19, 2026 */
  social: {
    note: "Checked live, Nov 19, 2026.",
    rows: [
      { n: "Facebook", h: "Best Self Medical Arts", stat: "24 followers", when: "Last post Jan 28, 2025",
        why: "Twenty-four followers for a twenty-five year practice. It is also filed as Dermatology, which is the wrong specialty.", k: "bad" },
      { n: "Instagram", h: "@drcherylgeer", stat: "412 followers, 75 posts", when: "Follows 1,315 accounts",
        why: "Following three times more than follow back. Nobody is really running it.", k: "warn" },
      { n: "LinkedIn", h: "Cheryl Geer", stat: "123 followers", when: "No recent posts",
        why: "Where a board-certified physician should be visible. It is empty.", k: "warn" },
      { n: "YouTube", h: "None found", stat: "", when: "",
        why: "No video at all, in a field people research by watching.", k: "bad" },
      { n: "Google Business", h: "Both locations", stat: "Unclaimed", when: "",
        why: "Step zero. Nothing else in local search works until these are claimed.", k: "bad" },
    ],
  },

  /* paid search. Published benchmark costs, checked Nov 19, 2026. Estimates, never promises. */
  ads: {
    note: "Published benchmark costs, checked Nov 19, 2026. Every projection is a benchmark estimate, not a promise.",
    live: "Your site already carries a Google Ads account, AW-456602980, but no conversion tracking. So money may have gone out with no way to tell what came back.",
    kw: [
      ["med spa near me", "$6.36 to $25", "110,000", "Three sources disagree. Your market runs 1.5x to 2x national."],
      ["laser skin resurfacing near me", "$6 to $14", "not published", "The HALO proxy. Apex Dermatology outranks you for this in your own town."],
      ["laser hair removal near me", "$4 to $10", "90,500", "Cheap traffic, low ticket. Good for filling gaps."],
      ["medical spa", "$4.74", "165,000", "Broad. Needs tight geo-targeting."],
      ["bioidentical hormone replacement", "$8 to $25", "not published", "Sources span 7x. Worth an hour in Keyword Planner against your ZIPs."],
      ["hormone pellets near me", "$8 to $25", "not published", "The only line with recurring revenue, $1,200 to $2,400 a year."],
      ["hydrafacial near me", "$3 to $8", "not published", "Entry price, how people meet you."],
      ["dermal fillers near me", "$5 to $12", "not published", "You offer fillers but list no neurotoxin."],
    ],
    tiers: [
      { n: "Starter", m: "$2,500", w: "Westlake Village only. Brand defense, HALO, hormone pellets. No Performance Max.",
        r: "About 167 clicks, 13 leads, 4 consults, 2 treatments started.", note: "Roughly breaks even on media in month one. Only works on lifetime value. Under $1,000 a month the account cannot learn at all." },
      { n: "Serious", m: "$6,000", w: "Both locations, geo-split. Adds diVa, laser hair removal, HydraFacial, Performance Max at 10%, retargeting on aesthetics only.",
        r: "About 400 clicks, 32 leads, 10 consults, 5 treatments started.", note: "This is the tier to recommend. It cross-checks against two independent benchmark models." },
      { n: "Aggressive", m: "$12,000", w: "$9,600 Google plus $2,400 Meta. Adds men's health and a little competitor conquesting.",
        r: "About 22 to 30 consults, 9 to 13 treatments started.", note: "Implies $80,000 to $150,000 a month in new patient revenue. Sanity check that against one physician across two offices before spending it." },
    ],
    rules: [
      ["diVa opened up 14 months ago", "Google lifted its restriction on vaginal laser rejuvenation on Sep 22, 2025. That line went from heavily restricted to advertisable, almost certainly with nobody in your market bidding. Search network only, so it cannot be retargeted."],
      ["PRP cannot be advertised", "Google names PRP in a prohibition alongside stem cell therapy. The O-Shot, the P-Shot and anything called Vampire must stay out of every ad, extension and landing page. The risk is account-level suspension, which would take the profitable HALO and hormone campaigns down with it."],
      ["Two competitors are confirmed bidding", "Setiba Medical Spa and Skin Laundry both carry Google Ads conversion tracking in their page source. Verified, not guessed."],
      ["Yelp Ads is not worth your money", "Yelp's own FY2025 filing says advertisers got 7% fewer clicks at 10% higher cost. There is no published med spa CPC and no independent comparison. Claim the free profile, skip the paid product."],
      ["Lead with HALO, second with pellets", "HALO averages a $1,732 ticket, you own the device, and the policy standing is clean. Hormone pellets are the only line that recurs and the only one a laser-only med spa cannot credibly offer."],
    ],
  },

  /* the back office. Published vendor pricing, read first-hand Nov 19, 2026. Not legal or compliance advice. */
  tools: {
    note: "Published vendor pricing, checked Nov 19, 2026. Not legal or compliance advice.",
    now: [
      ["Booking", "Nothing", "Every consultation is a web form and a callback. Checked all 137 pages.", "bad"],
      ["Charting", "Nothing visible", "No EHR, portal or intake tool appears anywhere publicly.", "warn"],
      ["Texting", "Nothing", "No SMS platform and no chat widget.", "bad"],
      ["Mailing list", "Mailchimp", "Their terms prohibit health data in three separate documents. A segment like HALO patients is itself protected information.", "bad"],
      ["Payments", "TSYS hosted page", "A bare legacy gateway. No deposits, memberships, packages or financing on a high-ticket menu.", "warn"],
      ["Forms", "Formidable Forms", "Answers travel as ordinary email through Brevo.", "warn"],
      ["Dispensary", "Three at once", "Fullscript, Designs for Health and Metagenics, competing for the same order.", "warn"],
      ["Reviews", "Nothing", "Testimonials are hand-typed static text. No live feed, no review schema.", "bad"],
      ["CRM", "Nothing", "Form submissions land in an inbox and stop there.", "bad"],
    ],
    stack: [
      ["EHR and charting", "Cerbo", "$576/mo", "A one-time setup applies"],
      ["Aesthetics practice management", "Aesthetic Record Accelerator", "$95/mo", "Priced per user, not per location, so Camarillo is free"],
      ["Booking, intake, consents, memberships, telehealth", "Included above", "$0", "Already inside the two systems"],
      ["Payments", "Helcim", "$0/mo", "Interchange plus. Confirm the BAA in writing"],
      ["Claims", "Claim.MD Basic", "$48/mo", "Not needed at all if you go fully cash-pay with superbills"],
      ["Dispensary and labs", "Fullscript", "$0/mo", "Replaces all three"],
      ["Patient messaging", "Spruce Basic", "$120/mo", "BAA automatic on every plan"],
      ["Reviews", "NiceJob Starter", "$95/mo", "BAA unconfirmed, so conditional"],
      ["Marketing email", "Klaviyo", "$60/mo", "Non-PHI only"],
      ["Books and payroll", "QuickBooks Plus plus payroll", "$225/mo", "Both companies, kept separate"],
    ],
    /* the simple version, which is all the deck shows */
    simple: [
      ["Intake and consents", "Signed on a phone before they arrive, straight into the chart."],
      ["Charting and photos", "Notes and before-and-afters in one record, with the consent attached."],
      ["Booking and payments", "A time, a deposit and a card on file, landing on the same calendar."],
      ["Safe messaging", "One practice number, and every thread on the patient’s chart."],
      ["Apple Health, possibly", "Patients can share sleep, weight and cycle data from their phone. Genuinely useful for hormone work. We would check what your system supports before promising it."],
    ],
    simpleNote: "Intake, charting, photos, booking and payments all run in one place, and everything lands in the same hub. Nobody retypes anything between systems.",
    total: "about $1,219 a month",
    lean: "about $760 a month",
    once: "about $1,614 one time",
    free: {
      t: "One free thing to check this week",
      p: "Log into Fullscript and see whether the dispensary is set to profit or no profit. New accounts default to a 10% patient discount and 0% practitioner margin against a published 35% ceiling. If nobody ever changed it, you have been dispensing supplements for free.",
    },
    flags: [
      ["No single system does all three", "Insurance claims, e-prescribing for testosterone, which is Schedule III, and before and after photo charting. Two systems is the honest answer."],
      ["Stripe cannot hold health data", "Stripe contractually prohibits it and signs no BAA. Square publishes one. This matters, because some EHR payments run on Stripe."],
      ["California polices lab markups", "Business and Professions Code 655.5 is criminally enforced. Any custom lab fee needs a California healthcare attorney, not a vendor's word."],
      ["Review replies are a disclosure", "Two enforcement actions, $23,000 and $30,000, were for information revealed in review responses. Merely confirming someone was a patient counts. No AI reply posts unchecked."],
    ],
  },

  /* add-ons, once we know how the practice really runs. Ordered by payoff. */
  addons: [
    { k: "Staff", t: "Who is allowed to run which device", lvl: "Biggest",
      p: "In California, treating with a medical laser is the practice of medicine. It can be delegated to an RN, NP or PA under supervision, but never to an unlicensed esthetician. If you are the only person who can fire the Joule, then you are the ceiling on the whole business, and the idle device hours are a staffing problem wearing a marketing costume. We map every treatment to who may legally perform it, then price what one laser-qualified RN would unlock in device hours against what they cost." },
    { k: "Pipe", t: "The Camarillo to Westlake pipeline", lvl: "Biggest",
      p: "A hundred and thirty reviews and a steady gynecology practice sit in Camarillo. Those are the warmest leads in the county for hormones and for skin, and they already trust you. Nothing moves them across today. This costs no ad spend at all, and it is probably the highest return of anything in this deck." },
    { k: "Mem", t: "Memberships, so money arrives every month", lvl: "Big",
      p: "Almost everything you sell is one-off. A monthly membership with banked credit and member pricing turns a spiky cash-pay calendar into recurring revenue, and it is the single best defense against a competitor opening nearby." },
    { k: "Hour", t: "What an empty device hour actually costs", lvl: "Big",
      p: "Revenue per device hour, per room and per provider, so the question stops being how busy we are and becomes which hours earn and which ones do not. This is what tells you when to hire and when to stop advertising." },
    { k: "Photo", t: "Before and afters that are usable", lvl: "Big",
      p: "Same light, same angle, same camera, filed to the patient and the treatment series, with the publishing consent captured at the same moment. You have ten HALO cases, and the sliders showing them have been broken on every page. Good photography is the entire marketing asset in this specialty." },
    { k: "Teach", t: "Getting paid for being a Luminary", lvl: "Worth a look",
      p: "You train other physicians on these lasers and mentored under Stanford's Dr. Bitter. That is a revenue line of its own: preceptorships, speaking, industry work, and the authority that makes every other marketing claim land. Nobody is monetizing it." },
    { k: "Recall", t: "Nobody falls through", lvl: "Worth a look",
      p: "Ninety-day hormone rechecks, Forever Young BBL intervals, annual exams, the second and third diVa session. Booked, not just reminded. This is where a practice quietly loses a third of its repeat revenue." },
    { k: "Stock", t: "Consumables and expiry", lvl: "Housekeeping",
      p: "Sciton tips, BBL gel, PRP kits and filler all have lot numbers and expiry dates, and they are the cost of goods on every treatment. Tracked properly, you know the true margin per procedure." },
    { k: "Comp", t: "The compliance calendar", lvl: "Housekeeping",
      p: "Laser safety, device calibration, insurance certificates, the HIPAA risk assessment. Dull, and the kind of thing that only becomes interesting on the day it is missing." },
  ],
};
