import { useRef } from "react";

export function useSounds() {
  const ctx = useRef(null);
  function getCtx() {
    if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctx.current;
  }
  function playTone(freq, type, duration, volume = 0.3, delay = 0) {
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime + delay);
      gain.gain.setValueAtTime(volume, c.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
      osc.start(c.currentTime + delay);
      osc.stop(c.currentTime + delay + duration);
    } catch(e) {}
  }
  return {
    correct: () => { playTone(523, "sine", 0.12, 0.25); playTone(659, "sine", 0.15, 0.25, 0.1); },
    wrong: () => { playTone(180, "sawtooth", 0.3, 0.3); playTone(140, "sawtooth", 0.2, 0.2, 0.15); },
    win: () => [523,659,784,1047].forEach((f,i) => playTone(f,"sine",0.2,0.3,i*0.12)),
    lose: () => [300,250,200,150].forEach((f,i) => playTone(f,"sawtooth",0.25,0.3,i*0.15)),
    tick: () => playTone(880, "square", 0.04, 0.08),
    urgentTick: () => playTone(1100, "square", 0.06, 0.15),
    click: () => playTone(400, "sine", 0.05, 0.1),
  };
}
