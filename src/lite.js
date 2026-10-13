// Automatic low-power mode. Adds `lite` to <html>, which the CSS and Terrain canvas react to.
// Override with ?lite=1 (force on) or ?lite=0 (force off); the choice is remembered per tab.
const root = document.documentElement;
const listeners = new Set();

export const isLite = () => root.classList.contains("lite");
export const onLite = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

const set = (on) => {
  if (on === isLite()) return;
  root.classList.toggle("lite", on);
  if (on) listeners.forEach((fn) => fn());
};

function staticGuess() {
  const nav = navigator;
  if (nav.connection && nav.connection.saveData) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return true;
  if (nav.deviceMemory && nav.deviceMemory <= 4) return true;
  return false;
}

export function initLite() {
  let forced = null;
  try {
    const q = new URLSearchParams(location.search).get("lite");
    if (q === "1" || q === "0") sessionStorage.setItem("lite", q);
    forced = sessionStorage.getItem("lite");
  } catch {
    /* storage unavailable */
  }
  if (forced === "1") return set(true);
  if (forced === "0") return;
  if (staticGuess()) return set(true);

  // Measure real frame times after the boot overlay, over ~90 frames; drop to lite if it stutters.
  let last = 0;
  let frames = 0;
  let slow = 0;
  let strikes = 0;
  const tick = (now) => {
    if (document.hidden) {
      last = 0;
      return requestAnimationFrame(tick);
    }
    if (last) {
      const dt = now - last;
      if (dt < 250) {
        frames++;
        if (dt > 28) slow++; // below ~36fps
      }
    }
    last = now;
    if (frames >= 90) {
      strikes = slow / frames > 0.35 ? strikes + 1 : 0;
      if (strikes >= 2) return set(true);
      frames = slow = 0;
      if (++window.__liteChecks > 6) return; // healthy after several windows: stop checking
    }
    requestAnimationFrame(tick);
  };
  window.__liteChecks = 0;
  setTimeout(() => requestAnimationFrame(tick), 2200);
}
