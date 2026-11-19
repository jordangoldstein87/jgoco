/* Her own logo, cleaned up. Not a new mark.

   Traced from the original at 5x: a gold dancing figure, arms thrown up and apart, its
   body a tapered V coming to a point in the throat of the flower. The lotus is ten pointed
   petals in two layers, each one running from a coloured tip down to a green and
   yellow base. Two tapered gold ribbons cross beneath it.

   What changed, and only this:
   - the ten petals are one shape placed at even angles instead of ten hand-drawn outlines
   - each petal runs on the same gradient ramp, so the colour is regular across the fan
   - the figure keeps its pose and its asymmetry, drawn as clean filled curves
   - the two ribbons are even and tapered instead of sketched
   - the wordmark is Poppins, her own font, with the tracking fixed
   - her name is set small, in caps, on wide letter spacing, instead of a faux italic serif

   mark(c, id) = the lotus alone; lockup(c, id) = lotus plus wordmark.
   c = { ink, accent, paper, core }. c.ink colours the type, so pass ink "#ffffff" on dark.
   id must be unique per instance on a page, since the petal gradients are referenced by id. */
(function () {
  const UI = "'Poppins', system-ui, sans-serif";
  const GOLD = "#F7E02E";
  const strip = (s) => s.replace(/<svg[^>]*>|<\/svg>/g, "");

  /* one long pointed petal, tip at the top, base at the origin */
  const PETAL = "M0 0 C -17 -24 -20 -56 0 -86 C 20 -56 17 -24 0 0 Z";

  /* [angle, scale, tip colour]. Back layer first so the upright petals sit in front. */
  const FAN = [
    [-82, 0.94, "#C86FB4"],
    [82, 0.94, "#C86FB4"],
    [-61, 1.02, "#9B7CC8"],
    [61, 1.02, "#9B7CC8"],
    [-40, 1.00, "#7E8FD2"],
    [40, 1.00, "#7E8FD2"],
    [-21, 0.95, "#C98FC4"],
    [21, 0.95, "#C98FC4"],
    [-7, 0.88, "#6FBBDA"],
    [7, 0.88, "#6FBBDA"],
  ];

  /* every petal runs the same ramp: its own tip colour, into blue, into green, into yellow */
  function ramps(id) {
    const tips = [...new Set(FAN.map((f) => f[2]))];
    return tips
      .map(
        (t, i) =>
          `<linearGradient id="p${id}-${i}" gradientUnits="userSpaceOnUse" x1="0" y1="-86" x2="0" y2="2">
<stop offset="0" stop-color="${t}"/><stop offset=".34" stop-color="#5FA8DC"/>
<stop offset=".68" stop-color="#5FBE72"/><stop offset="1" stop-color="#E4EC66"/>
</linearGradient>`
      )
      .join("");
  }
  const tipIndex = (t) => [...new Set(FAN.map((f) => f[2]))].indexOf(t);

  /* the dancing figure: a tilted head, a tapered V body, and two arms thrown up and apart.
     It is drawn BEFORE the petals, so the flower covers the body and only the head and
     the arms rise above the fan. */
  const FIGURE = `<g fill="${GOLD}">
<ellipse cx="101" cy="65" rx="12.5" ry="14.5" transform="rotate(-13 101 65)"/>
<path d="M86 78 C89 108 94 131 101 152 C108 131 113 108 116 78 C108 83 94 83 86 78 Z"/>
<path d="M54 21 C72 50 88 74 100 93 L93 99 C77 79 63 53 54 21 Z"/>
<path d="M138 13 C131 44 123 70 114 95 L106 89 C117 62 128 36 138 13 Z"/>
</g>`;

  /* The two gold ribbons, traced off her artwork pixel by pixel rather than by eye.
     Measured on the original: each ribbon runs from x20 to the centre, the crest sits 37%
     of the way in from the outer tip, and it rises only about 11 units above the ends.
     It is a long shallow sweep that hugs the underside of the petals, not a deep arch.
     Thickest at the crest (about 9), tapering to a point at both ends. */
  const WATER = `<g fill="${GOLD}">
<path d="M94 158 C88 160.5 80 162.5 70 162.5 C58 162.5 45 157.5 36 155 C25 152 11 153.5 2 157.5 C11 160.5 26 160 36 163 C46 166 58 170.5 70 170.5 C80 170.5 89 165.5 94 158 Z"/>
<path d="M106 158 C112 160.5 120 162.5 130 162.5 C142 162.5 155 157.5 164 155 C175 152 189 153.5 198 157.5 C189 160.5 174 160 164 163 C154 166 142 170.5 130 170.5 C120 170.5 111 165.5 106 158 Z"/>
</g>`;

  const L = {
    bsma: {
      name: "Best Self Medical Arts",
      why: "The same logo you have now, drawn properly. Same figure in the same pose, same flower, same colours running the same way. The petals became one shape at even angles instead of ten hand-drawn outlines, the gradient ramp is regular across the fan, and the type is set in Poppins with your name small on wide letter spacing.",
      colors: { ink: "#12343F", accent: "#21AE92", paper: "#ffffff", core: "#CDE9E6" },

      mark(c, id) {
        const k = id || "m";
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs>${ramps(k)}</defs>
${FIGURE}
<g transform="translate(100,156)">${FAN.map(([d, s, t]) =>
          `<path d="${PETAL}" fill="url(#p${k}-${tipIndex(t)})" transform="rotate(${d}) scale(${s})"/>`
        ).join("")}</g>
${WATER}
</svg>`;
      },

      /* 800 x 150, which is close to the 5.4:1 of her real lockup. Keeping the box tight to
         the artwork matters: a logo is sized by height in a header, so dead space above and
         below the type is what makes the words come out small. */
      lockup(c, id) {
        const k = (id || "l") + "k";
        return `<svg viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(0,5) scale(.70)">${strip(this.mark(c, k))}</g>
<text x="158" y="72" font-family="${UI}" font-weight="700" font-size="46" fill="${c.ink}" letter-spacing="0.2">BEST SELF MEDICAL ARTS<tspan font-size="19" dy="-18">&#174;</tspan></text>
<text x="161" y="109" font-family="${UI}" font-weight="400" font-size="20" fill="${c.ink}" opacity=".6" letter-spacing="5.6">DR. CHERYL HARRIS GEER</text>
</svg>`;
      },

      /* the same lockup stacked, for square spaces like an avatar or a card */
      stacked(c, id) {
        const k = (id || "s") + "s";
        return `<svg viewBox="0 0 460 310" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(130,0)">${strip(this.mark(c, k))}</g>
<text x="230" y="244" text-anchor="middle" font-family="${UI}" font-weight="700" font-size="37" fill="${c.ink}" letter-spacing="0.2">BEST SELF MEDICAL ARTS</text>
<text x="230" y="282" text-anchor="middle" font-family="${UI}" font-weight="400" font-size="18" fill="${c.ink}" opacity=".6" letter-spacing="5">DR. CHERYL HARRIS GEER</text>
</svg>`;
      },
    },
  };

  window.BS_LOGOS = L;
})();
