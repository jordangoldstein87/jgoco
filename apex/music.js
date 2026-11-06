/* The opening's music: a soft, warm pad played live in the browser (Web Audio), so there's no track
   to license. Four slow chords, a plucked note on top. For the pitch only, never the live site. */
(function () {
  let ctx = null, master = null, timer = null, step = 0, muted = false;
  const CHORDS = [[40, 47, 55, 62], [36, 43, 52, 59], [43, 50, 59, 62], [38, 45, 54, 62]];  // Em, Cmaj7, G, D
  const hz = n => 440 * Math.pow(2, (n - 69) / 12);
  function voice(freq, t, dur, gain, type) {
    const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    o.type = type || "sine"; o.frequency.value = freq; o.detune.value = (Math.random() - .5) * 8;
    f.type = "lowpass"; f.frequency.value = 1400;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + Math.min(1.6, dur / 3)); g.gain.setValueAtTime(gain, t + dur - 1.6); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(f); f.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .1);
  }
  function pluck(freq, t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "triangle"; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.05, t + .02); g.gain.exponentialRampToValueAtTime(.0005, t + 2.4);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 2.5);
  }
  function bar() {
    const t = ctx.currentTime + .05, ch = CHORDS[step % 4], len = 4.8;
    ch.forEach((n, i) => voice(hz(n), t, len + 1.2, i ? .035 : .05, i ? "sine" : "triangle"));
    [0, 1.2, 2.4, 3.6].forEach((d, i) => { if (Math.random() < .7) pluck(hz(ch[(i + step) % 4] + 12), t + d); });
    step++;
  }
  const M = window.APP.music = {
    start() {
      try {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        if (!ctx) { ctx = new AC(); master = ctx.createGain(); master.connect(ctx.destination); }
        ctx.resume(); clearInterval(timer); step = 0;
        master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(0, ctx.currentTime); master.gain.linearRampToValueAtTime(muted ? 0 : .9, ctx.currentTime + 1.5);
        bar(); timer = setInterval(bar, 4800);
      } catch (e) { /* the video runs without sound */ }
    },
    fade(secs) { if (!ctx) return; master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + secs); setTimeout(() => clearInterval(timer), secs * 1000); },
    stop() { if (!ctx) return; clearInterval(timer); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(0, ctx.currentTime); },
    pause(p) { if (!ctx) return; p ? ctx.suspend() : ctx.resume(); },
    mute() { muted = !muted; if (ctx) master.gain.setValueAtTime(muted ? 0 : .9, ctx.currentTime); },
  };
})();
