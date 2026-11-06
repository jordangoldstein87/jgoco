/* Notes: one small button in the corner. Tap it, tap anything on the page, then
   "I love this", "Not this" or "Change this" with a note. Notes are shared and
   come back to us; on the public site they go to Jordan through the onboarding script. */
(function () {
  const APP = window.APP, esc = APP.esc;
  const $ = s => document.querySelector(s);
  let notes = [], open = false, picking = false, hl = null;
  const NOTE_SCRIPT = "https://script.google.com/macros/s/AKfycbyR6DNkxGjEpLr56VBQMB_9HDKmVgr3YnFGhqguR9_KTmnniUDI3KuyMF65BJBMWxmG/exec", NOTE_KEY = "489aec02adda41d09416dd061c6d973eae1ba1cc";
  const VERD = { love: ["I love this", "love"], hate: ["Not this", "hate"], edit: ["Change this", "edit"] };

  function local() { try { return JSON.parse(localStorage.getItem("bf-notes") || "[]"); } catch (e) { return []; } }
  function saveLocal() { try { localStorage.setItem("bf-notes", JSON.stringify(notes.filter(n => !n.shared))); } catch (e) {} }
  notes = local();

  document.addEventListener("bf-db", () => {
    if (!APP.db) return;
    APP.db.collection("notes").orderBy("at", "desc").limit(200).onSnapshot(s => {
      notes = [...s.docs.map(d => Object.assign({ id: d.id, shared: true }, d.data())), ...local()];
      count(); if (open) panel();
    }, () => {});
  });

  const view = () => (location.hash || "#town").slice(1);
  function count() { const n = notes.length, c = $("#nct"); if (!c) return; c.hidden = !n; c.textContent = n; }

  async function add(rec) {
    rec = Object.assign({ view: view(), at: new Date().toISOString() }, rec);
    if (APP.db) {
      try { if (APP.user) { const id = await APP.user.id(); if (id) rec.by = id; } await APP.db.collection("notes").add(rec); APP.toast("Saved. Thank you."); return; }
      catch (e) { /* keep it locally instead */ }
    }
    // on the public site there is no shared store, so the note goes to Jordan through the onboarding script
    try {
      const q = new URLSearchParams({ action: "note", k: NOTE_KEY, v: rec.verdict || "", t: (rec.target || "").slice(0, 90), n: (rec.note || "").slice(0, 1000), view: rec.view, u: location.href.slice(0, 300) });
      const r = await fetch(NOTE_SCRIPT + "?" + q).then(x => x.json());
      if (r && r.ok) { rec.sent = true; notes.unshift(rec); saveLocal(); count(); if (open) panel(); APP.toast("Sent to Jordan. Thank you."); return; }
    } catch (e) { /* keep it locally instead */ }
    notes.unshift(rec); saveLocal(); count(); if (open) panel(); APP.toast("Saved in this browser.");
  }

  function label(el) {
    const t = el.closest("[data-note-target]");
    if (t) return t.dataset.noteTarget;
    const h = el.closest("section, header, footer, .pane, .card, figure, .pincard, .ev, .pkg") || el;
    const head = h.querySelector && h.querySelector("h1, h2, h3, b");
    const txt = (el.getAttribute("alt") || el.textContent || "").trim().replace(/\s+/g, " ");
    return ((head ? head.textContent.trim() + " · " : "") + (txt || el.tagName.toLowerCase())).slice(0, 90);
  }

  function panel() {
    let p = $(".npanel");
    if (!open) { p && p.remove(); return; }
    if (!p) { p = document.createElement("div"); p.className = "npanel"; document.body.appendChild(p); }
    const here = notes.filter(n => n.view === view());
    p.innerHTML = `<header><b>Notes</b><span>${here.length ? here.length + " on this page" : "Tap a button, or point at anything on the page."}</span></header>
      <div class="list">${here.map(n => `<div class="it"><div class="t"><span class="v ${n.verdict}">${VERD[n.verdict] ? VERD[n.verdict][0] : "Note"}</span><span>${esc(n.target || "This page")}</span></div>${n.note ? `<div>${esc(n.note)}</div>` : ""}</div>`).join("")}</div>
      <footer><button class="pick" id="npick">Point at something</button>
        <div class="row3"><button data-whole="love">♥ Love page</button><button data-whole="hate">✕ Not this</button><button data-whole="edit">✎ Change</button></div></footer>`;
    $("#npick").onclick = () => startPick();
    p.querySelectorAll("[data-whole]").forEach(b => b.onclick = () => pop(null, b.dataset.whole, "This whole page", b.getBoundingClientRect()));
  }

  function startPick() {
    picking = true; document.body.classList.add("picking"); open = false; panel();
    APP.toast("Tap anything on the page.");
  }
  function stopPick() { picking = false; document.body.classList.remove("picking"); if (hl) hl.classList.remove("pick-hl"); hl = null; }
  document.addEventListener("mouseover", e => {
    if (!picking) return;
    const el = e.target.closest("img, h1, h2, h3, p, button, a, .card, .pane, figure, .ev, canvas, .bm-pin, .lg, .pal, .pkg") || e.target;
    if (el.closest(".nbtn, .npanel, .npop")) return;
    if (hl) hl.classList.remove("pick-hl"); hl = el; el.classList.add("pick-hl");
  });
  document.addEventListener("click", e => {
    const v = e.target.closest("[data-vote]");
    if (v && !picking) { e.preventDefault(); add({ verdict: v.dataset.vote, target: v.dataset.what }); v.classList.add("on"); return; }
    if (!picking) return;
    if (e.target.closest(".nbtn, .npanel, .npop")) return;
    e.preventDefault(); e.stopPropagation();
    const el = hl || e.target; const r = el.getBoundingClientRect(); const what = label(el);
    stopPick(); pop(el, null, what, r);
  }, true);

  function pop(el, verdict, what, r) {
    document.querySelectorAll(".npop").forEach(x => x.remove());
    const p = document.createElement("div"); p.className = "npop";
    p.innerHTML = `<div class="what">${esc(what)}</div>
      <div class="row3">${Object.entries(VERD).map(([k, v]) => `<button data-v="${k}" class="${k === verdict ? "on" : ""}">${k === "love" ? "♥" : k === "hate" ? "✕" : "✎"} ${v[0]}</button>`).join("")}</div>
      <textarea id="nnote" placeholder="Add a note (optional)"></textarea>
      <div class="acts"><button data-c>Cancel</button><button class="save">Save</button></div>`;
    document.body.appendChild(p);
    const W = p.offsetWidth, H = p.offsetHeight;
    p.style.left = Math.max(12, Math.min(innerWidth - W - 12, r.left)) + "px";
    p.style.top = Math.max(12, Math.min(innerHeight - H - 12, r.bottom + 8)) + "px";
    let v = verdict || "love";
    p.querySelectorAll("[data-v]").forEach(b => b.onclick = () => { v = b.dataset.v; p.querySelectorAll("[data-v]").forEach(x => x.classList.toggle("on", x === b)); if (v === "edit") p.querySelector("textarea").focus(); });
    if (!verdict) p.querySelector('[data-v="love"]').classList.add("on");
    p.querySelector("[data-c]").onclick = () => p.remove();
    p.querySelector(".save").onclick = () => { add({ verdict: v, target: what, note: p.querySelector("textarea").value.trim() }); p.remove(); };
  }

  document.getElementById("nbtn").onclick = () => { if (picking) { stopPick(); return; } open = !open; panel(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { stopPick(); document.querySelectorAll(".npop, .sheet, .lightbox").forEach(x => x.remove()); } });
  document.addEventListener("bf-render", () => { if (open) panel(); });
  count();
})();
