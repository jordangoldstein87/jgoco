/* The voice interview, running on the pitch page itself rather than behind a second link.
   Same backend as interview.html, minus the NDA: Dr. Geer's call never touches money.
   With no token in BS.talk.k the panel offers the written questions instead, so the page
   is never broken, only quieter. */
(() => {
  const T = BS.talk, $ = (id) => document.getElementById(id);
  const go = $("ivGo"), stop = $("ivStop"), face = $("ivFace"), title = $("ivT"), say = $("ivS"), sum = $("ivSum");
  if (!go) return;
  const k = new URLSearchParams(location.search).get("k") || T.k || "";
  let host = "Mason", call = null, callId = null, attempt = 0, userEnded = false, done = false;

  const ask = (action, extra = "") =>
    fetch(`${T.script}?action=${action}&k=${encodeURIComponent(k)}${extra}`).then((r) => r.json());
  const show = (h, p) => { title.textContent = h; say.textContent = p; };
  /* hotel and public Wi-Fi often hold every request until their sign-in page is done */
  const NET = "Check your connection. On hotel or public Wi-Fi, open any website first to finish the Wi-Fi sign-in, or switch to your phone's hotspot, then try again.";
  const waiting = () => {
    show(`${host} is almost ready`, T.soon);
    go.disabled = true; go.classList.add("off");
    /* with no voice yet, do not leave her at a dead button: open the written questions */
    const w = document.querySelector(".n-w"); if (w) w.open = true;
  };
  const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));

  if (!/^[a-f0-9]{40}$/.test(k)) waiting();
  else ask("hello").then((r) => {
    if (!r.ok) return waiting();
    host = String(r.host || host).replace(/[<>&"]/g, "");
    show(T.h, T.p.replace("Mason", host));
    if (r.returning) { go.textContent = "Pick up where we left off"; say.textContent = `${host} remembers what you covered last time.`; }
  }).catch(() => show("We can't reach the interview", NET));

  const SDK = "https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.27.0/+esm";
  const store = (v) => { try { sessionStorage.setItem("bs-ws", v); } catch {} };
  let viaWs = (() => { try { return sessionStorage.getItem("bs-ws") === "1"; } catch { return false; } })();

  /* events from an attempt we gave up on (a slow WebRTC try) are ignored */
  const handlers = (n) => ({
    onConnect: ({ conversationId }) => { if (n === attempt) callId = conversationId || callId; },
    onModeChange: ({ mode }) => {
      if (n !== attempt) return;
      face.classList.toggle("speaking", mode === "speaking");
      say.textContent = mode === "speaking" ? `${host} is talking.` : `${host} is listening.`;
    },
    onDisconnect: (d) => { if (n === attempt) finished(d); },
    onError: (message) => console.warn(message),
  });
  /* a session that opens after we stopped waiting for it is closed at once */
  const within = (p, ms, n) => new Promise((ok, no) => {
    const t = setTimeout(() => { if (n === attempt) attempt++; no(new Error("timeout")); }, ms);
    p.then((c) => { clearTimeout(t); if (n === attempt) ok(c); else { c.endSession(); no(new Error("late")); } },
           (e) => { clearTimeout(t); no(e); });
  });

  async function connect() {
    const { Conversation } = await import(SDK);
    if (!viaWs) {
      const r = await ask("start");
      if (!r.ok) return r;
      callId = r.conversationId;
      const n = ++attempt;
      try {
        return { ok: true, call: await within(Conversation.startSession({ conversationToken: r.conversationToken, connectionType: "webrtc", ...handlers(n) }), 15000, n) };
      } catch (err) {
        console.warn("The voice connection didn't open; trying the secure web connection.", err);
        viaWs = true; store("1");
        say.textContent = "This network blocks the usual voice connection. Switching to a secure web connection.";
      }
    }
    const r = await ask("start", "&via=ws");
    if (!r.ok) return r;
    callId = null;
    const n = ++attempt;
    return { ok: true, call: await within(Conversation.startSession({ signedUrl: r.signedUrl, connectionType: "websocket", ...handlers(n) }), 20000, n) };
  }

  go.addEventListener("click", async () => {
    go.disabled = true; done = false; userEnded = false; sum.hidden = true;
    show("Connecting", "Allow the microphone when your browser asks.");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => s.getTracks().forEach((t) => t.stop()));
    } catch {
      go.disabled = false;
      return show("We need your microphone", "Allow it in your browser, then press Start again.");
    }
    let r;
    try { r = await connect(); } catch (err) { console.warn(err); r = { ok: false, why: "net" }; }
    if (!r.ok) {
      go.disabled = false;
      if (["setup", "link", "eleven"].includes(r.why)) return waiting();
      return show("We couldn't connect", r.why === "busy" ? "Too many tries for now. Try again in an hour." : NET);
    }
    call = r.call;
    go.hidden = true; stop.hidden = false; stop.disabled = false;
    show(`You're talking with ${host}`, `${host} is talking.`);
  });

  stop.addEventListener("click", () => { stop.disabled = true; userEnded = true; call && call.endSession(); });

  /* after any ending: wait for the write-up, then show it. A dropped call offers to resume. */
  async function finished(d) {
    if (done) return;
    done = true; call = null;
    face.classList.remove("speaking");
    stop.hidden = true;
    const why = String((d && (d.reason || (d.context && d.context.type))) || "");
    const dropped = !userEnded && (navigator.onLine === false || /error|network|timeout/i.test(why));
    show(dropped ? "The connection dropped" : "Thank you",
         dropped ? "Saving what you've covered so you can pick up where you left off." : "Writing up your summary. This takes about a minute.");
    let text = "";
    if (callId) for (let i = 0; i < 24; i++) {
      await sleep(5000);
      const r = await ask("summary", `&id=${encodeURIComponent(callId)}`).catch(() => ({}));
      if (r.ok && r.ready && r.summary) { text = r.summary; break; }
      if (dropped && i >= 8) break;
    }
    go.textContent = "Pick up where we left off"; go.hidden = false; go.disabled = false;
    if (dropped) return show("The connection dropped", `Your progress is saved. Pick up where you left off whenever you're ready, on this network or another. ${host} carries on from the last topic.`);
    if (!text) return show("Thank you", "Jordan has your answers and will send your summary. If the call cut off early, you can pick up where you left off.");
    show("Thank you", "Here's what we covered. Jordan will be in touch.");
    sum.replaceChildren(...text.split("\n").map((l) => l.replace(/^\s*[-•*]\s*/, "").trim()).filter(Boolean)
      .map((b) => Object.assign(document.createElement("li"), { textContent: b })));
    sum.hidden = false;
  }
})();
