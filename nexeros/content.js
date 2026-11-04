/* Nexeros pitch: every fact, number and line the research pages show, with its source. Sample numbers
   are labeled where they're shown. Research files live in ../research/. */
window.C = {
  checked: "Nov 3, 2026",
  score: [["Search", 1], ["Social", 2], ["Marketplaces", 0], ["Reviews", 3], ["Email", 5], ["Content", 4]],
  seenLine: "Where NexEros shows up online today: barely.",

  /* ---------- visibility (research/tech-and-visibility.md) ---------- */
  seen: [
    { k: "Search", s: 1, facts: ["Not in Google's top 20 for its own name, \"nexeros\".", "Google already suggests \"nexeros reviews\" and \"nexeros stamina\": people search and don't find the site.", "About 10 to 18 of the site's 68 pages are in Google. Only about 4 of 37 blog posts.", "The founder's name returns no results at all."] },
    { k: "Social", s: 2, facts: ["Instagram @nexerosofficial: 66 followers, 232 posts. Last post July 5, 2026, with 1 like.", "Facebook: 60 followers, also quiet since July 5. Its contact email is misspelled (nexerros).", "LinkedIn: 8 followers. No TikTok, YouTube or X presence the brand owns."] },
    { k: "Marketplaces", s: 0, facts: ["Not on Amazon, Walmart, eBay, iHerb, TikTok Shop or Faire.", "No stores carry it. The one offline appearance found: a booth at a New Orleans Halloween event."] },
    { k: "Reviews and trust", s: 3, facts: ["About 224 reviews on the site: STAMINA 212 at 4.86, FEMINA 10.", "The site says \"4.9 from thousands of orders\", and elsewhere \"1,000+\", \"200+\" and \"226\".", "No Trustpilot, no BBB, no Google Business Profile."] },
    { k: "Email and retention", s: 5, facts: ["Klaviyo is installed, with Klaviyo Reviews.", "Auto-ship at 5% off through Shopify subscriptions. A $24.99 a year membership.", "What the emails say can't be seen from outside."] },
    { k: "Content", s: 4, facts: ["37 blog posts, at a URL with a typo: /intimate-welness-hub.", "The best-written posts are the riskiest: \"Can herbal supplements replace ED medication?\" and \"Natural alternatives to Viagra\"."] },
  ],
  gaps: ["People who search the name can't find the site.", "Social has been silent for four months, and you don't have a public face yet.", "No outside reviews, and the numbers on the site don't agree.", "One channel: the website. No marketplaces, no stores.", "Claims that change from page to page put ads, Amazon and even payments at risk."],
  stack: [["Shopify", "Horizon theme, Shopify Payments, Shopify subscriptions"], ["Klaviyo", "Email and reviews"], ["Meta pixel", "Installed, no ads running"], ["Google Analytics 4", "Installed"], ["Merchant Center", "Installed, no Shopping ads found"], ["TrafficJunky pixel", "An adult ad network, plus a landing page built for it"]],

  /* ---------- deep read (research/audience-and-ads.md, compliance.md) ---------- */
  thesis: [
    ["Black and gold, glowing type", "Light grounds, plants, one warm color"],
    ["Shirtless couples in the dark", "Real couples, dressed, in daylight. Or no people at all: the plants"],
    ["\"3+ days\" and \"beats Viagra\"", "Seven plants, every dose on the label"],
    ["\"Trust us, it's natural\"", "A lab report for every batch, with a screen for hidden drugs"],
    ["Sold by the register", "Sold next to the fish oil and the creatine"],
  ],
  personas: [
    { name: "The Re-Connectors", who: "Married couple, 45 to 58, together 15 to 25 years", want: "To feel like they did, together, without a doctor making it a diagnosis.", fear: "Something sleazy arriving at the house. Side effects with blood-pressure meds.", where: "Facebook, YouTube, Instagram (mostly her), relationship podcasts", wins: "The Couples Ritual, calm pictures, gifting, the plain box", stat: ["37%", "of US adults 18 to 64 have sex weekly, down from 55% in 1990", "IFS, General Social Survey"] },
    { name: "Her, in the midlife shift", who: "Woman, 42 to 56, perimenopausal or menopausal, partnered", want: "To feel like herself again, for her own sake. Often the one who buys for both.", fear: "Being sold a fantasy. Ingredients with no evidence. Being dismissed.", where: "Menopause creators and groups on Instagram and Facebook, email, search", wins: "Plain talk, a women's-health advisor, every dose shown", stat: ["38.7%", "of US women report low desire, and the one Rx pill costs about $2,355", "PRESIDE survey"] },
    { name: "The Quiet Performer", who: "Man, 40 to 62, fit or trying to be, partnered", want: "Confidence, not a diagnosis. Something for the shelf next to his creatine.", fear: "Looking like a gas-station-pill guy. Surprise auto-ship charges.", where: "YouTube (fitness, longevity), podcasts, Reddit, sports apps", wins: "Tested, dosed, sourced. Energy and presence, not \"outlast the night\"", stat: ["86%", "of men who report ED use no treatment. Top reasons: side effects, cost, stigma", "GoodRx and YouGov, 2025"] },
  ],
  adsToday: [
    ["No ads on Meta or Google", "Zero ads in the Meta Ad Library and Google's Ads Transparency Center on Nov 3."],
    ["An adult ad network", "A TrafficJunky pixel and a landing page built for it suggest ads on adult sites: the gas-station shelf, online."],
    ["The product pages can't be advertised", "Lines like \"it's your turn to cum first\" fail Meta's and Google's rules for this category. The homepage voice is fine; the product pages aren't."],
    ["Pixels with nothing to measure", "Meta, Google Analytics and Merchant Center are installed and mostly idle."],
  ],
  pillars: [
    { k: "Plant-based", proof: "A card for every plant", p: "The plant, the part used, where it's grown, what tradition says and what studies show, with an honest \"evidence is limited\" where it is." },
    { k: "Transparent", proof: "Every dose on the label", p: "Milligrams and extract strength for all seven. No proprietary blend. Ritual, Thorne and Momentous built brands on exactly this." },
    { k: "Tested", proof: "A lab report for every batch", p: "Identity, purity, heavy metals, and a screen for hidden drugs. Type the batch number, read the report. Nobody in this category does it." },
  ],
  organic: "About \"organic\": the site says \"100% organic\" today, and there's no USDA certificate behind it. It comes off now and comes back the day a certificate exists. \"Plant-based, transparent, tested\" is stronger anyway, because every word can be proven.",
  fixes: [
    ["\"One capsule, 3+ days\" (2+, 3+ and up to 5 on different pages)", "No study backs it, and a multi-day pill is the profile regulators link to hidden drugs.", "\"A simple ritual for the two of you, built on seven traditional botanicals.\"*"],
    ["\"Natural alternatives to Viagra\" and \"Can herbal supplements replace ED medication? Yes.\"", "A drug-substitute claim. Gets the domain refused by Google Ads and invites FDA attention.", "Retire the posts. Replace with one honest guide per plant."],
    ["\"The prescription route vs. the natural route\"", "Same problem: it implies it works like the drug.", "\"Seven traditional botanicals. Every dose on the label.\""],
    ["\"It's your turn to cum first\" / \"begging you not to stop\"", "Fails every ad platform's rules for this category.", "\"Made for couples who make time for each other.\"*"],
    ["\"100% organic\" / \"No chemicals. No drugs.\"", "No organic certificate, and \"no drugs\" needs a lab report to back it.", "\"Plant-based. Every batch tested for hidden drugs. Read the report.\" (once it's true)"],
    ["\"4.9 from thousands of orders\"", "The real count is about 224 reviews, and the FTC's 2024 review rule applies.", "\"4.86 from 224 reviews\", linked, never rounded up."],
  ],
  angles: [["For the two of you, still.", "Long love as the hero."], ["Seven plants. Every dose on the label.", "Transparency as the headline."], ["Tested for what shouldn't be there.", "The category's biggest fear, turned into proof."], ["Know the plant.", "One ad, one botanical, a series."], ["Not a prescription. Not a gas-station pill.", "Names the gap, in your voice."], ["Make room for each other.", "Phones down, the oil, an evening."], ["Her turn, too.", "FEMINA as women's health, said plainly."], ["Built for the life you already live.", "Next to the walks and the good food."], ["Discreet by design.", "Plain box, plain billing, no doctor visit."], ["A gift for both of you.", "Anniversaries and Valentine's. The easiest ad to get approved."]],

  /* ---------- channels (research/channels.md) ---------- */
  channels: [
    { g: "Your own store", rows: [["nexeros.com, rebuilt", "open", 5, "The hub's front door. Subscriptions at 15 to 25%, the quiz, bundles."], ["Membership", "open", 4, "Already there at $24.99 a year. Make it worth joining."]] },
    { g: "Marketplaces", rows: [["Amazon US", "gated", 4, "Needs category approval and a yearly lab check (NSF, UL or Eurofins). Blank-box fulfillment ships discreetly."], ["Amazon Subscribe and Save", "gated", 3, "The 5-pack is made for it."], ["Walmart Marketplace", "open", 4, "Allowed if the claims are clean. No monthly fee."], ["iHerb", "open", 3, "A 2,600-product sexual health aisle with these same plants. Ships worldwide."], ["Google Shopping, free listings", "gated", 3, "Allowed with an 18+ flag."], ["TikTok Shop", "gated", 2, "Invite-only for supplements. High upside if invited."], ["Target Plus", "gated", 1, "Invite-only and cautious. Later, once the look is shelf-safe."], ["Amazon Canada", "gated", 1, "Needs a Health Canada license first: 2 to 10 months."], ["EU", "closed", 0, "Tongkat ali isn't allowed there as formulated."], ["Faire, Etsy, Pinterest, Meta Shops", "closed", 0, "Don't allow this kind of supplement."]] },
    { g: "Stores", rows: [["Adult novelty distributors", "open", 5, "Williams Trading, Eldorado, Honey's Place, Nalpac. The native channel, and some drop-ship."], ["Adult boutiques", "open", 4, "About 8,379 US stores. Couples-friendly boutiques fit FEMINA and the oil."], ["Smoke and vape shops", "open", 4, "About 12,400 shops. Enhancement products are a counter staple."], ["Independent pharmacies", "open", 3, "18,988 independents. The lab report is the pitch."], ["Vitamin and natural food shops", "open", 3, "The shelf next to the fish oil. Where the new look belongs."], ["Spas, naturopaths, couples therapists", "open", 3, "Practitioner wholesale or an affiliate link."], ["Convenience-store distributors", "open", 2, "Huge reach, but it's the gas-station shelf. Only with the new look and the lab report."], ["GNC, Vitamin Shoppe, CVS, Walgreens", "gated", 1, "Brokers, slotting fees, sales history. Year two."]] },
  ],
  first10: ["nexeros.com rebuilt, with subscriptions that are worth it", "Adult novelty distributors", "A wholesale portal for boutiques and smoke shops", "Amazon US, with blank-box shipping and Subscribe and Save", "Walmart Marketplace", "Independent pharmacies", "iHerb", "Google free listings", "Affiliates: creators, therapists, naturopaths", "TikTok Shop if invited"],
  whole: [["MSRP, 5-pack", "$49.95"], ["Wholesale, keystone (50%)", "$24.98"], ["Distributor price, about", "$16 to $19"], ["Amazon, after fees, about", "$38"]],

  /* ---------- sales: the store universe ---------- */
  universe: [["Chiropractic offices", 65000, "IBISWorld"], ["Independent pharmacies", 18988, "NCPA 2026"], ["Spas", 17170, "ISPA 2025"], ["Smoke and tobacco shops", 12400, "Vertical IQ"], ["Adult stores", 8379, "industry count"], ["Licensed naturopaths", 6500, "6,000 to 7,000"]],

  /* ---------- the market (research/market.md); filled from the market research ---------- */
  market: {
 "h": "A $4 billion category that nobody trusts, and no brand owns.",
 "p": "Sexual health supplements are growing about 11% a year. The modern brands won prescriptions and women's intimacy. The plant-based shelf for men and couples still belongs to the gas-station pills. That's the opening.",
 "stats": [
  [
   "441",
   "sexual-enhancement products on the FDA's hidden-drug list since 2012, 46 of them in 2025 and 2026",
   "FDA, counted Nov 2026"
  ],
  [
   "$4.2B",
   "sexual health supplements worldwide in 2025, growing 11.6% a year. About $1.2B of it in the US",
   "Grand View Research, 2026 (US share derived)"
  ],
  [
   "62%",
   "of Americans trust the supplement industry, down from 74% in 2023. 76% want products registered with the FDA",
   "CRN consumer survey, Oct 2026"
  ],
  [
   "4%",
   "is the most any single brand holds on Amazon, where nearly half of US sexual health sales happen",
   "YipitData, Sep 2026"
  ],
  [
   "2",
   "FDA-approved libido drugs for women, both for before menopause only. Men have more than two dozen",
   "UChicago Medicine; Advisory Board"
  ],
  [
   "$74B",
   "US supplement sales in 2025, up 7.1%, on track for $100B by 2029",
   "Nutrition Business Journal, 2026"
  ],
  [
   "$83M → $2.35B",
   "Hims' revenue, 2019 to 2025, after it made ED something you could talk about",
   "Hims & Hers filings"
  ],
  [
   "$425M",
   "what Pharmavite paid for Bonafide, a hormone-free menopause and intimacy brand",
   "NutraIngredients, 2023"
  ]
 ],
 "size": [
  [
   "Sexual health supplements, worldwide",
   "$4.2B",
   "+11.6% a year",
   "2025. Estimates run $2.9B to $4.2B (Grand View, Market.us, Credence)"
  ],
  [
   "Sexual health supplements, US",
   "~$1.2B",
   "+10 to 12% a year",
   "Derived from Grand View's North America share"
  ],
  [
   "Women's libido supplements, worldwide",
   "$1.8B",
   "+8.9% a year",
   "2025, one publisher (Market Intelo). Women's is the faster-growing half"
  ],
  [
   "Herbal supplements, US retail",
   "$13.2B",
   "+5.4% a year",
   "2024, NBJ and SPINS via the American Botanical Council"
  ],
  [
   "Menopause products and supplements",
   "~$18.5B",
   "~5.5% a year",
   "Worldwide, 2025. Perimenopause formulas up 28.5% in a year (SPINS)"
  ],
  [
   "All sexual wellness, worldwide",
   "~$27B",
   "~8% a year",
   "2025. Condoms, lube, devices and supplements. Estimates range widely"
  ]
 ],
 "sizeNote": "Analysts disagree, so these use the middle of the published range and name the source. US totals for all sexual wellness vary more than fourfold between firms, so they aren't shown.",
 "split": {
  "p": "Who sells this today. Independent shops outnumber chain stores, and online is the fastest-growing slice.",
  "doors": [
   [
    "Independent pharmacies",
    18988,
    "NCPA 2026",
    true
   ],
   [
    "Smoke and tobacco shops",
    12400,
    "Vertical IQ",
    true
   ],
   [
    "Adult stores",
    8379,
    "IBISWorld 2025",
    true
   ],
   [
    "Vape shops (low estimate)",
    5000,
    "3,500 to 35,000",
    true
   ],
   [
    "Dollar General",
    20893,
    "FY2025",
    false
   ],
   [
    "7-Eleven",
    12250,
    "2026",
    false
   ],
   [
    "CVS",
    9000,
    "10-K, Dec 2025",
    false
   ],
   [
    "Walgreens",
    8000,
    "2026",
    false
   ],
   [
    "Walmart",
    4611,
    "10-K, Jan 2026",
    false
   ],
   [
    "GNC",
    2300,
    "2025",
    false
   ],
   [
    "Target",
    1995,
    "FY2025",
    false
   ],
   [
    "Vitamin Shoppe",
    640,
    "Jan 2026",
    false
   ]
  ],
  "sales": [
   [
    "Mass retail",
    27.1
   ],
   [
    "Natural and specialty stores",
    25.4
   ],
   [
    "Online",
    24.3
   ],
   [
    "Direct sales (MLM)",
    11.4
   ],
   [
    "Practitioners",
    9.3
   ],
   [
    "Mail order and TV",
    2.5
   ]
  ],
  "note": "US supplements, all categories, 2025 (NBJ); no one publishes this split for libido supplements alone. For sexual health supplements, about 27% sells online and online is growing fastest, about 15% a year. Plus 151,975 convenience stores, most of them independently owned."
 },
 "comps": [
  [
   "Hims & Hers",
   "$2.35B (2025, reported)",
   "rx",
   "Telehealth subscription",
   "Proved people will subscribe for sexual health once it feels normal. Prescriptions, not plants."
  ],
  [
   "Ro",
   "~$600M (2024, estimate)",
   "rx",
   "Telehealth subscription",
   "Same playbook. About a third of revenue is ED."
  ],
  [
   "BlueChew",
   "Not published; CEO puts Rx ED telehealth at $1 to 1.5B",
   "rx",
   "Telehealth subscription",
   "Self-funded and profitable on a jokey brand."
  ],
  [
   "Lemme (Kourtney Kardashian)",
   ">$30M in its first 16 months; $13M on TikTok Shop in one month",
   "modern",
   "Target, Walmart, Ulta, Amazon, TikTok",
   "Clean pastel look and named, studied ingredients got a libido gummy into big-box stores. Women only."
  ],
  [
   "Love Wellness",
   "$50 to 75M (2024, estimate)",
   "modern",
   "Target, Walmart, Ulta, DTC",
   "Doctor-developed, bright, on Target shelves. Women only."
  ],
  [
   "Moon Juice (Sex Dust)",
   "~$20M (2018, estimate)",
   "modern",
   "DTC, Sephora-type retail",
   "Pure plants and adaptogens, luxe look. Light on proof."
  ],
  [
   "Foria",
   "Sales grew 89% a year, 2016 to 2020",
   "modern",
   "DTC, natural retail",
   "Plant-based intimacy, done beautifully."
  ],
  [
   "Bonafide (Revaree)",
   "Sold for $425M (2023)",
   "modern",
   "DTC, 1,800+ Target stores",
   "Hormone-free, studied, plain-spoken. Strategic buyers pay for this."
  ],
  [
   "Maude",
   "Revenue +110% in a year; $10 to 20M (2024, estimate)",
   "modern",
   "DTC, Sephora, Nordstrom",
   "Took sex products from neon to design object."
  ],
  [
   "Nugenix",
   "Not published",
   "old",
   "GNC, Walmart, Walgreens, Amazon, TV",
   "Infomercial roots. About $2.17 a serving."
  ],
  [
   "ExtenZe",
   "Not published; in 75,000+ stores",
   "old",
   "Drug, mass, c-store, Amazon",
   "The classic gas-station pill. A $6M settlement (2010) and an FDA sildenafil finding (2018)."
  ],
  [
   "NexEros, today",
   "Not published",
   "old",
   "Its own website only",
   "Plants inside, gas-station look outside. The rebrand moves it into the first group."
  ]
 ],
 "compNote": "Revenue is reported where a company publishes it, otherwise a third-party estimate. No public source splits category dollars between modern brands and gas-station pills.",
 "map": [
  [
   "Ro",
   0.1,
   0.9
  ],
  [
   "Hims",
   0.1,
   0.8
  ],
  [
   "Bonafide",
   0.3,
   0.9
  ],
  [
   "BlueChew",
   0.2,
   0.5
  ],
  [
   "Nugenix",
   0.4,
   0.4
  ],
  [
   "ExtenZe",
   0.5,
   0.1
  ],
  [
   "\"Rhino\" pills",
   0.6,
   0.0
  ],
  [
   "Lemme",
   0.7,
   0.7
  ],
  [
   "Foria",
   0.9,
   0.7
  ],
  [
   "Moon Juice",
   1.0,
   0.6
  ],
  [
   "NexEros today",
   0.8,
   0.2,
   true
  ],
  [
   "NexEros, rebuilt",
   0.9,
   0.9,
   true
  ]
 ],
 "mapP": "Natural and trusted, for couples, is empty. Moon Juice and Foria are natural but unproven. Hims, Ro and Bonafide are trusted but clinical. Lemme is closest, and it sells to women only. Placements are our judgment, not measured data.",
 "gaps": [
  [
   "Trust",
   "The most adulterated aisle in supplements: 441 FDA hidden-drug notices since 2012, and nearly half of all tainted \"supplements\" the FDA found from 2007 to 2016 were sexual enhancement.",
   "Publish a lab report for every batch, with a screen for hidden drugs. A gas-station brand can't copy that."
  ],
  [
   "Women",
   "Two approved drugs, both for before menopause. Low desire affects about half of women after menopause.",
   "FEMINA as women's health, said plainly, with a menopause clinician for education."
  ],
  [
   "Couples",
   "Every competitor sells to him or to her. K-Y's two-in-one couples product sold 3 times faster than its category.",
   "\"For the two of you\": the Couples Ritual is the brand, not a bundle."
  ],
  [
   "Over 40",
   "Modern brands chase 25- to 35-year-olds. 52% of men 40 to 70 report some ED; about 1.3M US women reach menopause each year.",
   "Real couples 40 to 65 in every picture. Grown-up language."
  ],
  [
   "Menopause",
   "A $12 to 21B market. Perimenopause formulas grew 28.5% in a year.",
   "A FEMINA line extension or an education track, later."
  ],
  [
   "Proof",
   "Amazon already requires third-party testing for this category. Momentous built a brand on certification.",
   "Testing becomes the headline, not the fine print."
  ],
  [
   "Subscription",
   "Hims has 2.5M subscribers. Supplement subscriptions usually lose 5 to 8% a month, so the reason to stay matters.",
   "Membership that earns its keep: refills, the batch report, the Insider letter."
  ],
  [
   "Discretion",
   "Buying in person is embarrassing for many; pharmacies lock some of these products up.",
   "Plain box, plain billing, blank-box Amazon shipping, sold as a feature."
  ]
 ],
 "rebrands": [
  [
   "Hims",
   "ED was a whispered pharmacy-counter purchase.",
   "Plain words, millennial design, a subscription.",
   "$82.6M (2019) to $2.35B (2025).",
   "Hims filings"
  ],
  [
   "Lemme",
   "Women's intimacy supplements sat in the \"adult\" corner.",
   "Pastel mainstream design and named, studied ingredients.",
   ">$30M in 16 months; projected >$200M for 2026.",
   "Forbes, 2026"
  ],
  [
   "Bonafide",
   "Menopause and dryness: clinical and unglamorous.",
   "Hormone-free, studied, frank education.",
   "Sold for $425M; now in 1,800+ Target stores.",
   "NutraIngredients; Bonafide"
  ],
  [
   "Ritual",
   "Multivitamins were an opaque commodity.",
   "Transparency as the brand: a clear capsule and every supplier named.",
   "About $250M a year (2024).",
   "Nutraceuticals World; CNBC"
  ],
  [
   "AG1",
   "\"Athletic Greens\", a niche fitness powder.",
   "A new name, a simple premium look, podcast trust.",
   "~$155M (2021) to ~$600M (2024).",
   "Fortune, 2025"
  ],
  [
   "Maude",
   "Sex products were neon novelty.",
   "Minimal, design-object packaging and calm naming.",
   "+110% revenue in a year.",
   "Business of Fashion"
  ],
  [
   "Foria",
   "Cannabis intimacy oil was fringe.",
   "Plant-forward brand, then a CBD-free line for mainstream retail.",
   "Sales grew 89% a year, 2016 to 2020.",
   "Beauty Independent"
  ],
  [
   "K-Y Yours+Mine",
   "Lube as a medical product.",
   "Couples framing: two products, one box.",
   "Sold 3 times faster than the category average.",
   "WARC case study"
  ],
  [
   "Momentous",
   "Sports supplements carried contamination risk.",
   "Every product third-party certified; testing is the brand.",
   "Supplies all 32 NFL teams.",
   "Momentous"
  ],
  [
   "Love Wellness",
   "Vaginal health was pharmacy-clinical.",
   "Doctor-developed, bright, on Target shelves.",
   "$50 to 75M a year (2024, estimate).",
   "BeautyMatter"
  ],
  [
   "Old Spice",
   "Your dad's deodorant.",
   "Absurd, confident humor.",
   "Body wash sales +107% in one month.",
   "Agency case study, 2010"
  ],
  [
   "Liquid Death",
   "Water, a pure commodity.",
   "Branded like a beer or a metal band.",
   "$263M in sales (2023); a $1.4B valuation.",
   "Business Wire, 2024"
  ]
 ],
 "scenario": {
  "rows": [
   [
    "Conservative",
    "~$480K a year",
    "By month 24: about 400 site orders and 300 Amazon orders a month, 20 stores."
   ],
   [
    "Base",
    "~$1.4M a year",
    "By month 24: about 900 site orders and 900 Amazon orders a month, Walmart and iHerb, 60 stores."
   ],
   [
    "Stretch",
    "~$3.2M a year",
    "By month 24: about 1,800 site orders and 2,000 Amazon orders a month, 150 stores."
   ]
  ],
  "assume": [
   "Today's revenue isn't public, so these start from category benchmarks, not your numbers. The AI interview fixes that.",
   "Assumes the rebrand is done, the claims are cleaned up, every batch is lab tested and Amazon's testing check is passed.",
   "Average order: $55 to $60 on the site, about $42 on Amazon. Stores reorder about $300 to $400 a month.",
   "Base case needs roughly $9 to 11K a month in ads at month 12 and $19 to 24K at month 24.",
   "Amazon may not allow sponsored ads for this category; Amazon rows assume mostly organic and outside traffic until that's confirmed."
  ]
 },
 "ads": {
  "tools": [
   [
    "Perpetua",
    "Amazon and Walmart ad automation",
    "$695 a month up to $10K spend, then a % of spend"
   ],
   [
    "Teikametrics",
    "Amazon and Walmart ad automation",
    "$149 to $179 a month, +3% over $10K spend"
   ],
   [
    "Helium 10 Ads",
    "Amazon ads",
    "$279 to $359 a month, +2% of spend"
   ],
   [
    "Triple Whale",
    "Shopify attribution dashboards",
    "Free tier; about $219 a month and up"
   ],
   [
    "Northbeam",
    "Attribution across channels",
    "From $1,500 a month"
   ],
   [
    "Skai",
    "Enterprise, every channel",
    "From $114K a year"
   ]
  ],
  "note": "At $10K a month in ad spend, a typical tool stack runs about $300 to $1,100 a month, and none of them covers Amazon, Google, Meta and Walmart together below enterprise pricing. Amazon may not allow sponsored ads for this category; that's checked in Seller Central before any Amazon budget moves."
 }
},
  seo: {
 "h": "Search for NexEros and you mostly won't find it.",
 "p": "A new name that search engines read as a typo for Nexo or Nexora, product pages with no headline, a blog at a misspelled address, and the best-written posts chasing the riskiest searches. All fixable, most of it in a week.",
 "score": [
  [
   "Technical",
   6
  ],
  [
   "On-page",
   3
  ],
  [
   "Content",
   4
  ],
  [
   "Authority",
   1
  ],
  [
   "Brand search",
   2
  ]
 ],
 "ranks": [
  [
   "nexeros",
   "6th of 9, or missing",
   "A GitHub group also called Nexeros, Nexo, Nexora"
  ],
  [
   "nexeros reviews",
   "not found",
   "Trustpilot pages for Nexora and Nexor, some of them scam reports"
  ],
  [
   "nexeros stamina",
   "not found",
   "Spam pages for other male-enhancement brands"
  ],
  [
   "nexeros femina",
   "contact page, not the product",
   "The FEMINA product page doesn't show up"
  ],
  [
   "natural libido supplement for couples",
   "not found",
   "Wisp's Lift for Her+Him, Life Extension"
  ],
  [
   "female libido supplement",
   "not found",
   "Illuminate Labs, MedicineNet"
  ],
  [
   "horny goat weed supplement",
   "not found",
   "setforset's \"7 best\" list, Swanson"
  ],
  [
   "libido booster for women over 40",
   "not found",
   "Winona, Dr. Anna Cabeca"
  ],
  [
   "natural alternative to viagra",
   "not found",
   "Ro and UPGUYS (and the riskiest search to chase)"
  ],
  [
   "warming massage oil for couples",
   "not found",
   "Livestrong, Sex with Emily, The Knot"
  ]
 ],
 "rankNote": "A snapshot from a search tool on Nov 3, not Google itself and not a rank tracker. Many of these results are full of spam pages, which means a clean, cited page can break in.",
 "broken": [
  [
   "Product pages have no headline",
   "None of the five product pages has an H1, so Google can't tell what the page is. The partners page outranks FEMINA for \"nexeros femina\"."
  ],
  [
   "Titles with typos and doubles",
   "FEMINA's title reads \"FEMINNatural\". Every title repeats the brand. 14 article titles are cut off mid-word."
  ],
  [
   "The blog's address is misspelled",
   "All 37 posts live under /intimate-welness-hub. Moving them takes one redirect file."
  ],
  [
   "Broken structured data",
   "20 of 37 posts have code Google ignores. The membership shows a rating with zero reviews. Two review apps load at once."
  ],
  [
   "Old ad pages left open",
   "20 landing pages are indexable, including expired offers and a news-style ad quoting a doctor we couldn't find."
  ],
  [
   "No About page, no FAQ",
   "Both are 404s. For a health product, Google wants to know who's behind it."
  ],
  [
   "A note to robots, in Google",
   "The contact page's description says \"If you're here to sell us SEO services…\", and it shows in search results."
  ],
  [
   "No authority yet",
   "The domain is from August 2025. One press mention, with no link back."
  ]
 ],
 "titles": [
  [
   "",
   "NexEros: Plant-Based Intimacy Capsules for Him & Her",
   "Seven botanicals, one capsule. STAMINA for him, FEMINA for her, plus Velvet Fire massage oil. Vegan capsules, discreet shipping, made in the USA."
  ],
  [
   "/products/stamina",
   "STAMINA Men's Libido Support Capsules | NexEros",
   "Seven botanicals including tongkat ali, horny goat weed and Korean ginseng to support male desire and energy. Vegan capsule. $16.95, or 5 for $49.95."
  ],
  [
   "/products/femina",
   "FEMINA Women's Desire Support Capsules | NexEros",
   "A plant-based capsule for women with muira puama, ginkgo and ginseng to support desire. Vegan, discreet shipping. $16.95, or 5 for $49.95."
  ],
  [
   "/pages/botanicals",
   "The 7 Botanicals in STAMINA & FEMINA | NexEros",
   "What each botanical is, its traditional use, what research has looked at, and who should check with a doctor first."
  ]
 ],
 "plan": [
  [
   "This week",
   [
    "One headline per product page",
    "Fix the FEMINA title and the brand doubling",
    "Unpublish the expired and news-style ad pages",
    "Fix the contact page description",
    "Remove one of the two review apps"
   ]
  ],
  [
   "Next 30 days",
   [
    "Move the blog to /intimate-wellness-hub with redirects",
    "Retire or rewrite the 15 posts about ED, Viagra and \"3+ days\"",
    "An About page with Oliver's face, and an FAQ",
    "Fix the structured data, add GTINs and shipping",
    "Search Console, Bing and a rank tracker on 25 searches"
   ]
  ],
  [
   "Next 90 days",
   [
    "The botanicals hub, one page per plant",
    "A named reviewer (an ND or MD) on every guide",
    "One cited article a week from the list below",
    "Reviews flowing to Google through Merchant Center",
    "Press and podcast mentions that link back"
   ]
  ]
 ],
 "articles": [
  [
   "Tongkat ali vs. tribulus: what each one is",
   "tongkat ali vs tribulus"
  ],
  [
   "Tongkat ali and muira puama together",
   "tongkat ali and muira puama"
  ],
  [
   "Horny goat weed for women",
   "horny goat weed for women"
  ],
  [
   "Which libido ingredients have actually been studied",
   "female libido supplement"
  ],
  [
   "Desire after 40: what changes, what helps",
   "libido booster for women over 40"
  ],
  [
   "His and hers supplements: choosing together",
   "natural libido supplement for couples"
  ],
  [
   "How to read a libido supplement label",
   "how to choose a libido supplement"
  ],
  [
   "Korean red ginseng and desire",
   "korean ginseng libido"
  ],
  [
   "Warming massage oil: how to choose one for two",
   "warming massage oil for couples"
  ],
  [
   "Water-based gel with botanicals: what to look for",
   "natural water based lube"
  ],
  [
   "Mismatched libido: seven conversations that help",
   "mismatched libido in relationship"
  ],
  [
   "A date-night ritual for long-term couples",
   "intimacy ideas for couples"
  ]
 ]
},
};
