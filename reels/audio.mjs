// Score on the same 120 BPM grid as scene.html: every cut, slam and wipe lands on a beat or a drop.
// Map (beats): 0–4 hook hits · 2–4 riser · 4 DROP · 12/24 wipes · 12–19 ingredient plucks · 20 stop-time
// · 32 DROP 2 (CTA) · 36–44 breakdown under the legal text · 43 last hit · silence from audio.silenceFrom
import { writeFileSync } from 'node:fs';

export function buildAudio(C, outPath) {
  const SR = 44100, DUR = C.format.duration, N = Math.round(SR * DUR), B = 60 / C.bpm;
  const L = new Float32Array(N), R = new Float32Array(N), SL = new Float32Array(N), SRb = new Float32Array(N);
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, Bb: 10 };
  const n = (nm, o) => 440 * Math.pow(2, (12 * (o + 1) + NOTE[nm] - 69) / 12);
  let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647 * 2 - 1;
  const at = b => b * B;
  function add(t0, len, fn, { gain = 1, pan = 0, send = 0 } = {}) {
    const s0 = Math.max(0, Math.floor(t0 * SR)), s1 = Math.min(N, Math.floor((t0 + len) * SR));
    const gl = gain * Math.cos((pan + 1) * Math.PI / 4) * 1.414, gr = gain * Math.sin((pan + 1) * Math.PI / 4) * 1.414;
    for (let s = s0; s < s1; s++) { const v = fn((s - t0 * SR) / SR); L[s] += v * gl; R[s] += v * gr; SL[s] += v * gl * send; SRb[s] += v * gr * send; }
  }
  const pluck = (t0, f, { gain = .1, pan = 0, send = .4, dec = 6 } = {}) => add(t0, 2, t => {
    const a = Math.min(1, t / .003) * Math.exp(-t * dec);
    return a * (Math.sin(2 * Math.PI * f * t) + .35 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t * 10) + .12 * Math.sin(6 * Math.PI * f * t) * Math.exp(-t * 18));
  }, { gain, pan, send });
  const kick = (t0, g = .5) => add(t0, .45, t => Math.sin(2 * Math.PI * (50 * t + 130 * (1 - Math.exp(-t * 35)) / 35)) * Math.exp(-t * 7) * Math.min(1, t / .002), { gain: g });
  const clap = (t0, g = .12) => { let lp = 0; add(t0, .25, t => { lp += (rnd() - lp) * .5; return lp * (Math.exp(-t * 22) + .4 * Math.exp(-Math.max(0, t - .012) * 30)); }, { gain: g, send: .35 }); };
  const hat = (t0, g = .035) => { let hp = 0, prev = 0; add(t0, .06, x => { const w = rnd(); hp = .6 * (hp + w - prev); prev = w; return hp * Math.exp(-x * 70); }, { gain: g, pan: .3, send: .05 }); };
  const impact = (t0, g = 1) => {
    add(t0, 1.8, t => Math.sin(2 * Math.PI * (34 * t + 50 * (1 - Math.exp(-t * 6)) / 6)) * Math.exp(-t * 2.2) * Math.min(1, t / .003), { gain: .55 * g });
    let lp = 0; add(t0, 1.4, t => { lp += (rnd() - lp) * .12; return lp * Math.exp(-t * 3.5); }, { gain: .3 * g, send: .9 });
  };
  const whoosh = (tEnd, len = .3, g = .25) => { let lp = 0; add(tEnd - len, len + .15, t => { const k = t / len; lp += (rnd() - lp) * (.03 + .4 * Math.min(1, k) ** 2); return lp * Math.min(1, k) ** 2 * (t > len ? Math.exp(-(t - len) * 20) : 1); }, { gain: g, send: .4 }); };
  const riser = (t0, len, g = .35) => { let lp = 0; add(t0, len, t => { const k = t / len; lp += (rnd() - lp) * (.02 + .3 * k * k); return lp * k * k + Math.sin(2 * Math.PI * (200 + 700 * k * k) * t) * k * k * .08; }, { gain: g, send: .5 }); };

  // ---- groove sections (beats): full groove after each drop, breakdown under the legal text
  const groove = [[4, 20], [21, 32], [32, 36]];
  for (const [a, z] of groove) for (let b = a; b < z; b++) {
    kick(at(b)); if (b % 2 === 1) clap(at(b)); hat(at(b + .5));
  }
  // hook: a kick-like hit on every word beat (0–3), filtered
  for (let b = 0; b < 4; b++) kick(at(b), .45);
  riser(at(2), at(2));                        // 1.0 → 2.0
  impact(at(4)); impact(at(32), 1.1);         // drops
  impact(at(12), .45); impact(at(24), .45);   // wipes land on the beat
  [12, 24, 32].forEach(b => whoosh(at(b), .22));
  // stop-time accent on "8 BİLEŞEN." recap (beat 20)
  impact(at(20), .5);
  // breakdown 36–44: half-time soft kick, last hit on beat 43
  for (let b = 36; b < 43; b += 2) kick(at(b), .25);
  impact(at(43), .45);

  // ---- bass (8ths) and chords on the grid
  const PROG = [['D', 2], ['Bb', 1], ['F', 2], ['C', 2]];       // one chord per bar
  const CH = { D: [['D', 3], ['F', 3], ['A', 3]], Bb: [['Bb', 2], ['D', 3], ['F', 3]], F: [['F', 3], ['A', 3], ['C', 4]], C: [['C', 3], ['E', 3], ['G', 3]] };
  for (let bar = 0; bar < 11; bar++) {
    const [root, o] = PROG[bar % 4], t0 = at(bar * 4), breakdown = bar >= 9;
    CH[root].forEach(([nm, oo], k) => add(t0, 4 * B + .2, t => {
      let v = 0; const f = n(nm, oo); for (let h = 1; h <= 5; h++) v += Math.sin(2 * Math.PI * f * h * t + k) / Math.pow(h, 1.8);
      return v * Math.min(1, t / .05) * Math.min(1, (4 * B + .2 - t) / .15) * (bar < 2 ? .6 : 1) * .035;
    }, { pan: (k - 1) * .4, send: .45 }));
    if (bar >= 2 && !breakdown) for (let e = 0; e < 8; e++) { const tb = t0 + e * B / 2; if (tb >= at(20) && tb < at(21)) continue;
      add(tb, .22, t => (Math.sin(2 * Math.PI * n(root, o) * t) + .3 * Math.sin(4 * Math.PI * n(root, o) * t)) * Math.min(1, t / .005) * Math.exp(-t * 9), { gain: .2 }); }
  }
  // ---- ingredient beats 12–19: one rising pluck per name
  [n('D', 5), n('F', 5), n('A', 5), n('C', 6), n('D', 6), n('C', 6), n('A', 5), n('F', 5)]
    .forEach((f, i) => pluck(at(12 + i), f, { gain: .08, pan: i % 2 ? .3 : -.3, dec: 9 }));
  // hook words and text slams: short tonal accents
  [[1, n('A', 5)], [3, n('D', 6)], [8, n('F', 5)], [9, n('A', 5)], [21, n('D', 6)], [25, n('A', 5)], [26, n('D', 6)], [28, n('F', 5)], [29, n('A', 5)], [33, n('D', 6)]]
    .forEach(([b, f]) => pluck(at(b), f, { gain: .06, dec: 12, send: .5 }));
  // light sweeps: soft metallic shimmer on beats 4, 20, 32
  [4, 20, 32].forEach(b => add(at(b), 1, t => Math.min(1, t / .003) * (Math.sin(2 * Math.PI * n('D', 6) * t) * Math.exp(-t * 12) * .5 + Math.sin(2 * Math.PI * n('A', 6) * t) * Math.exp(-t * 20) * .3), { gain: .08, send: .6 }));

  // ---- reverb + master
  const verb = (inp, spread) => {
    const out = new Float32Array(N);
    const combs = [1557, 1617, 1491, 1422, 1277, 1356].map(d => ({ b: new Float32Array(d + spread), i: 0, lp: 0 }));
    const aps = [556, 441, 341].map(d => ({ b: new Float32Array(d + spread), i: 0 }));
    for (let s = 0; s < N; s++) {
      let y = 0; const x = inp[s] * .5;
      for (const c of combs) { const o = c.b[c.i]; c.lp = o * .7 + c.lp * .3; c.b[c.i] = x + c.lp * .82; c.i = (c.i + 1) % c.b.length; y += o; }
      for (const a of aps) { const o = a.b[a.i]; const v = -y + o; a.b[a.i] = y + o * .5; a.i = (a.i + 1) % a.b.length; y = v; }
      out[s] = y;
    }
    return out;
  };
  const vl = verb(SL, 0), vr = verb(SRb, 23), end = C.audio.silenceFrom;
  const ml = new Float32Array(N), mr = new Float32Array(N); let peak = 0, lpl = 0, lpr = 0;
  for (let s = 0; s < N; s++) {
    const t = s / SR, a = L[s] + vl[s] * .2, b = R[s] + vr[s] * .2;
    lpl += (a - lpl) * .6; lpr += (b - lpr) * .6;
    const e = Math.min(1, t / .005) * (t < end - .3 ? 1 : t < end ? (end - t) / .3 : 0);
    ml[s] = Math.tanh(lpl * 1.4) * e; mr[s] = Math.tanh(lpr * 1.4) * e; peak = Math.max(peak, Math.abs(ml[s]), Math.abs(mr[s]));
  }
  const g = .89 / (peak || 1), buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let s = 0; s < N; s++) { buf.writeInt16LE(Math.round(ml[s] * g * 32767), 44 + s * 4); buf.writeInt16LE(Math.round(mr[s] * g * 32767), 46 + s * 4); }
  writeFileSync(outPath, buf);
}
