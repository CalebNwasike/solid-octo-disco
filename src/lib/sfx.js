// ============================================================
// 🔊 SOUND EFFECTS — all synthesized in the browser, no files!
// Volumes live here if you want anything louder/quieter.
// ============================================================

let ctx = null;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

// one little bleep — the building block of every effect
function tone({ freq = 880, end = 0, type = 'square', dur = 0.07, vol = 0.1, delay = 0 }) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (end) osc.frequency.exponentialRampToValueAtTime(end, t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export const sfx = {
  // soft tick when hovering a button
  hover() {
    tone({ freq: 1300, type: 'sine', dur: 0.04, vol: 0.045 });
  },

  // satisfying two-step nintendo click
  click() {
    tone({ freq: 700, end: 1050, type: 'square', dur: 0.06, vol: 0.07 });
    tone({ freq: 1400, type: 'sine', dur: 0.05, vol: 0.05, delay: 0.035 });
  },

  // flappy mariah 🐦
  flap() {
    tone({ freq: 340, end: 760, type: 'triangle', dur: 0.09, vol: 0.12 });
  },
  score() {
    // classic coin: B5 → E6
    tone({ freq: 988, type: 'square', dur: 0.07, vol: 0.08 });
    tone({ freq: 1319, type: 'square', dur: 0.16, vol: 0.08, delay: 0.07 });
  },
  hit() {
    tone({ freq: 300, end: 85, type: 'sawtooth', dur: 0.3, vol: 0.12 });
  },
  win() {
    // little victory fanfare
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, type: 'square', dur: 0.13, vol: 0.09, delay: i * 0.11 })
    );
    tone({ freq: 1319, type: 'square', dur: 0.45, vol: 0.09, delay: 0.44 });
  },

  // the timewarp whoosh — rises with the stars, ends on a chime.
  // returns a stop() function in case the warp is cut short.
  warp(durationSec = 5) {
    const c = ac();
    if (!c) return () => {};
    const t0 = c.currentTime;
    const t1 = t0 + durationSec;

    // whooshing noise, swept through a rising filter
    const noiseBuf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = c.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(160, t0);
    filter.frequency.exponentialRampToValueAtTime(2600, t1);
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.0001, t0);
    ng.gain.exponentialRampToValueAtTime(0.16, t0 + durationSec * 0.55);
    ng.gain.exponentialRampToValueAtTime(0.0001, t1);
    noise.connect(filter).connect(ng).connect(c.destination);
    noise.start(t0);
    noise.stop(t1 + 0.1);

    // a low engine drone rising underneath
    const drone = c.createOscillator();
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(55, t0);
    drone.frequency.exponentialRampToValueAtTime(220, t1);
    const dg = c.createGain();
    dg.gain.setValueAtTime(0.0001, t0);
    dg.gain.exponentialRampToValueAtTime(0.05, t0 + durationSec * 0.5);
    dg.gain.exponentialRampToValueAtTime(0.0001, t1);
    drone.connect(dg).connect(c.destination);
    drone.start(t0);
    drone.stop(t1 + 0.1);

    // soft arrival chime right as the universe appears
    tone({ freq: 1047, type: 'sine', dur: 0.7, vol: 0.08, delay: durationSec - 0.25 });
    tone({ freq: 1568, type: 'sine', dur: 0.7, vol: 0.05, delay: durationSec - 0.15 });

    return () => {
      try {
        noise.stop();
        drone.stop();
      } catch {}
    };
  },
};

// plays hover/click sounds for every button & link on the site
let uiReady = false;

export function initUISounds() {
  if (uiReady) return;
  uiReady = true;

  let lastHover = null;
  document.addEventListener('pointerover', (e) => {
    const el = e.target.closest('button, a');
    if (el && el !== lastHover) {
      lastHover = el;
      sfx.hover();
    }
    if (!el) lastHover = null;
  });

  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, a')) sfx.click();
  });
}
