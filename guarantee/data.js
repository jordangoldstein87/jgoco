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
    p: "A clean new website, one place to run every listing and review, and marketing that runs itself while you're on the job.",
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

  /* project management add-on (SAMPLE jobs) */
  pm: {
    stages: ["Estimate", "Scheduled", "Hang", "Tape", "Texture", "Punch", "Paid"],
    jobs: [
      { id: "GD-241", name: "Lankershim apartments, 112 units", who: "Sample · Ridgeline Builders", stage: 3, sqft: 96000, board: "5/8\" Type X", value: 412000, crew: ["Luis", "Marco", "Dani", "Pablo"], due: "Floor 3 tape Fri" },
      { id: "GD-242", name: "Kitchen ceiling, water damage", who: "Sample · Maria T.", stage: 6, sqft: 120, board: "1/2\" moisture", value: 950, crew: ["Dani"], due: "Done" },
      { id: "GD-243", name: "Garage conversion", who: "Sample · Kevin R.", stage: 4, sqft: 880, board: "1/2\" regular", value: 6400, crew: ["Luis", "Marco"], due: "Tue Nov 24" },
      { id: "GD-244", name: "Encino home gym", who: "Sample · Arden Homes", stage: 2, sqft: 5200, board: "5/8\" Type X", value: 31500, crew: ["Luis", "Marco", "Dani", "Pablo"], due: "Dec 4" },
      { id: "GD-245", name: "Office TI, Ventura Blvd", who: "Sample · Westside Builders", stage: 1, sqft: 6400, board: "5/8\" Type X", value: 38800, crew: ["Pablo"], due: "Mon Nov 23" },
      { id: "GD-246", name: "Sherman Oaks addition", who: "Sample · Oakline Remodel", stage: 0, sqft: 1450, board: "1/2\" regular", value: 11800, crew: [], due: "Bid due Nov 19" },
      { id: "GD-247", name: "Van Nuys mixed-use, 64 units", who: "Sample · Crane GC", stage: 0, sqft: 58000, board: "5/8\" Type X", value: 268000, crew: [], due: "Bid due Nov 25" },
    ],
  },
};
