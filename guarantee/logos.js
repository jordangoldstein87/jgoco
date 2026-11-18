/* Four drywall-first logo directions for Guarantee Drywall. Each returns an SVG string.
   mark(c, id) = the icon alone; lockup(c, id) = icon + wordmark. c = { ink, accent, paper, core } */
(function () {
  const F = "'Archivo', 'Inter', system-ui, sans-serif";
  const strip = (s) => s.replace(/<svg[^>]*>|<\/svg>/g, "");

  /* one isometric 4x8 sheet: face on top, the cut edge showing paper, gypsum core, paper */
  function board(y, face, c) {
    const t = 16; // thickness
    return `<g transform="translate(0,${y})">
<path d="M22 70 L100 34 L178 70 L100 106 Z" fill="${face}"/>
<path d="M22 70 L100 106 L100 ${106 + t} L22 ${70 + t} Z" fill="${c.ink}"/>
<path d="M100 106 L178 70 L178 ${70 + t} L100 ${106 + t} Z" fill="${c.ink}"/>
<path d="M24 ${70 + t / 2} L100 ${106 + t / 2} L176 ${70 + t / 2}" fill="none" stroke="${c.core}" stroke-width="5" stroke-linejoin="round"/>
</g>`;
  }

  const L = {
    /* A. The Stack: three sheets of board, cut edge out */
    stack: {
      name: "The Stack",
      why: "A stack of board, the cut edge showing the white gypsum core. Anyone who's been on a job site knows it at a glance. Strong, simple, and still reads at Google-avatar size.",
      colors: { ink: "#142a6b", accent: "#3d6fd6", paper: "#ffffff", core: "#e9e4d8" },
      mark(c) {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
${board(66, c.core, c)}${board(38, c.core, c)}${board(10, c.accent, c)}
</svg>`;
      },
      lockup(c, id) {
        return `<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
${strip(this.mark(c, id))}
<text x="208" y="104" font-family="${F}" font-weight="900" font-size="50" fill="${c.ink}" letter-spacing="-.5">GUARANTEE</text>
<text x="210" y="146" font-family="${F}" font-weight="700" font-size="30" fill="${c.accent}" letter-spacing="14.6">DRYWALL</text>
</svg>`;
      },
    },

    /* B. The Seam: two panels, the joint taped, screws on the pattern */
    seam: {
      name: "The Seam",
      why: "Two sheets, the joint taped, screws on the pattern. It's the part of the job nobody sees when it's done right, which is the whole point of the name.",
      colors: { ink: "#23272d", accent: "#d9a441", paper: "#ffffff", core: "#efe9dc" },
      mark(c) {
        const dots = [];
        for (const x of [44, 70, 130, 156]) for (const y of [52, 100, 148]) dots.push(`<circle cx="${x}" cy="${y}" r="5.5" fill="${c.ink}"/>`);
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="180" height="180" rx="12" fill="${c.core}"/>
<rect x="86" y="10" width="28" height="180" fill="${c.accent}"/>
<path d="M100 10 V190" stroke="${c.ink}" stroke-width="2" stroke-dasharray="3 5" opacity=".35"/>
${dots.join("")}
<rect x="10" y="10" width="180" height="180" rx="12" fill="none" stroke="${c.ink}" stroke-width="10"/>
</svg>`;
      },
      lockup(c, id) {
        return `<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
${strip(this.mark(c, id))}
<text x="214" y="102" font-family="${F}" font-weight="800" font-size="50" fill="${c.ink}">Guarantee</text>
<rect x="214" y="118" width="11" height="30" fill="${c.accent}"/>
<text x="234" y="146" font-family="${F}" font-weight="700" font-size="29" fill="${c.ink}" letter-spacing="9.4">DRYWALL</text>
</svg>`;
      },
    },

    /* C. The Screw: a drywall screw set just right, dimpled, not torn */
    screw: {
      name: "The Screw",
      why: "A drywall screw set just right: dimpled below the paper, never torn through. It's the detail a pro checks first, and a mark that looks good stamped on anything.",
      colors: { ink: "#1b3a8f", accent: "#97a6bd", paper: "#ffffff", core: "#e9edf4" },
      mark(c) {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="100" cy="100" r="92" fill="${c.ink}"/>
<circle cx="100" cy="100" r="70" fill="none" stroke="${c.accent}" stroke-width="5" opacity=".7"/>
<circle cx="100" cy="100" r="54" fill="${c.core}"/>
<g transform="rotate(15 100 100)"><path d="M100 62 V138 M62 100 H138" stroke="${c.ink}" stroke-width="12"/>
<path d="M100 82 V118 M82 100 H118" stroke="${c.ink}" stroke-width="22" stroke-linecap="round" opacity=".0"/></g>
<circle cx="100" cy="100" r="54" fill="none" stroke="${c.ink}" stroke-width="3" opacity=".25"/>
</svg>`;
      },
      lockup(c, id) {
        return `<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
${strip(this.mark(c, id))}
<text x="214" y="100" font-family="${F}" font-weight="900" font-size="50" fill="${c.ink}">GUARANTEE</text>
<path d="M216 118 H330" stroke="${c.accent}" stroke-width="3"/>
<text x="216" y="152" font-family="${F}" font-weight="600" font-size="30" fill="${c.ink}" letter-spacing="15">DRYWALL</text>
</svg>`;
      },
    },

    /* D. The Knife: the taping knife and the dead-flat finish it leaves */
    knife: {
      name: "The Knife",
      why: "The taping knife, and the smooth flat finish it leaves behind. The finisher's tool, and the cleanest of the four. Ready for the custom homes and the commercial work.",
      colors: { ink: "#14254f", accent: "#c8902e", paper: "#ffffff", core: "#ecebe6" },
      mark(c) {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="8" width="184" height="184" rx="92" fill="${c.ink}"/>
<path d="M30 152 H170" stroke="${c.core}" stroke-width="4" stroke-linecap="round"/>
<path d="M30 146 H70" stroke="${c.core}" stroke-width="12" stroke-linecap="round"/>
<path d="M58 150 L80 98 H120 L142 150 Z" fill="${c.accent}"/>
<path d="M90 98 L93 86 H107 L110 98 Z" fill="${c.core}"/>
<rect x="87" y="32" width="26" height="56" rx="10" fill="${c.core}"/>
</svg>`;
      },
      lockup(c, id) {
        return `<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">
${strip(this.mark(c, id))}
<text x="214" y="102" font-family="${F}" font-weight="900" font-size="50" fill="${c.ink}">GUARANTEE</text>
<path d="M216 122 H262" stroke="${c.accent}" stroke-width="5" stroke-linecap="round"/>
<text x="274" y="134" font-family="${F}" font-weight="700" font-size="24" fill="${c.ink}" letter-spacing="9.6">DRYWALL</text>
</svg>`;
      },
    },
  };

  window.GD_LOGOS = L;
})();
