import { useEffect, useMemo, useRef, useState } from "react";
import TechIcon from "./techIcons.jsx";

/* Coarse land map: for each 6-degree latitude band (north to south), the 6-degree longitude
   columns (west to east, starting at -180) that are land. Dots are generated from this. */
const LAND_RANGES = [
  [],
  [[16, 19], [21, 25]],
  [[10, 19], [21, 26], [32, 33], [43, 54], [56, 58]],
  [[2, 19], [21, 26], [32, 59]],
  [[2, 13], [16, 19], [21, 23], [26, 27], [31, 59]],
  [[2, 13], [18, 20], [29, 30], [31, 33], [35, 51], [56, 57]],
  [[9, 21], [29, 52]],
  [[9, 20], [28, 33], [36, 36], [39, 55]],
  [[9, 18], [28, 55]],
  [[10, 17], [29, 54]],
  [[11, 13], [17, 17], [27, 52]],
  [[3, 3], [12, 17], [27, 34], [36, 39], [41, 48], [50, 51]],
  [[14, 16], [27, 38], [42, 43], [46, 48], [50, 50]],
  [[15, 21], [28, 38], [42, 43], [46, 47], [51, 51]],
  [[17, 21], [28, 38], [45, 51]],
  [[17, 24], [31, 37], [46, 50], [52, 54]],
  [[16, 24], [32, 37], [47, 49], [53, 54]],
  [[17, 23], [32, 38], [51, 53]],
  [[18, 23], [32, 38], [49, 54]],
  [[18, 22], [32, 35], [49, 55]],
  [[18, 21], [32, 34], [49, 55]],
  [[18, 19], [53, 55], [59, 59]],
  [[17, 19], [54, 55], [58, 59]],
  [[17, 19]],
  [[18, 19]],
  [[19, 21]],
  [[17, 19], [28, 59]],
  [[0, 20], [25, 59]],
  [[0, 59]],
  [[0, 59]],
];

const LAND = LAND_RANGES.map((ranges) => {
  const row = new Array(60).fill(false);
  ranges.forEach(([a, b]) => {
    for (let c = a; c <= b; c++) row[c] = true;
  });
  return row;
});

const isLand = (lat, lon) => {
  const r = Math.min(29, Math.max(0, Math.floor((90 - lat) / 6)));
  const c = ((Math.floor((lon + 180) / 6) % 60) + 60) % 60;
  return LAND[r][c];
};

// Evenly spread dots over the sphere; keep only the ones that fall on land.
const buildDots = () => {
  const step = 2.7;
  const dots = [];
  for (let lat = 88; lat > -89; lat -= step) {
    const n = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / step));
    for (let k = 0; k < n; k++) {
      const lon = -180 + (k + 0.5) * (360 / n);
      if (isLand(lat, lon)) dots.push([(lat * Math.PI) / 180, (lon * Math.PI) / 180]);
    }
  }
  return dots;
};

// One orbit per skill group: tilt (ring flattening), roll (rotation on screen), size, speed.
const RINGS = [
  { tilt: 26, roll: -18, rf: 1.5, speed: 0.2, rgb: "255,179,92" },
  { tilt: 36, roll: 24, rf: 1.78, speed: -0.15, rgb: "110,200,255" },
  { tilt: 20, roll: -44, rf: 2.06, speed: 0.12, rgb: "125,255,179" },
  { tilt: 44, roll: 58, rf: 2.34, speed: -0.1, rgb: "201,160,255" },
];

const DEG = Math.PI / 180;
const AXIAL_TILT = 23.4 * DEG;

// Where the work happened, as places on the globe (home first).
const HOME = { n: "LaFayette", lat: 34.7 * DEG, lon: -85.3 * DEG };
const PLACES = [
  { n: "Los Angeles", lat: 34.05 * DEG, lon: -118.24 * DEG },
  { n: "Santa Cruz", lat: 36.97 * DEG, lon: -122.03 * DEG },
  { n: "Atlanta", lat: 33.75 * DEG, lon: -84.39 * DEG },
];

const toVec = (lat, lon) => [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];

// A point on an orbit: a circle in the XZ plane, tilted about X, then rolled about Z.
// Returns [x, y, depth] where depth runs from -1 (behind the globe) to 1 (in front).
function ringPoint(ring, rr, th) {
  const x0 = rr * Math.cos(th);
  const z0 = rr * Math.sin(th);
  const tl = ring.tilt * DEG;
  const y1 = -z0 * Math.sin(tl);
  const z1 = z0 * Math.cos(tl);
  const ro = ring.roll * DEG;
  return [x0 * Math.cos(ro) - y1 * Math.sin(ro), x0 * Math.sin(ro) + y1 * Math.cos(ro), z1 / rr];
}

export default function SkillsOrbit({ skills }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const hudRef = useRef(null);
  const chipRefs = useRef([]);
  const [focus, setFocus] = useState(null);

  const groups = useMemo(() => Object.entries(skills), [skills]);
  const items = useMemo(
    () =>
      groups.flatMap(([, list], ring) =>
        list.map((name, i) => ({ name, ring, i, n: list.length, base: (i / list.length) * Math.PI * 2 + ring * 0.7 }))
      ),
    [groups]
  );
  const dots = useMemo(buildDots, []);
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, () => ({
        x: Math.random(),
        y: Math.random(),
        s: Math.random() * 1.1 + 0.3,
        p: Math.random() * 6.28,
        d: Math.random() * 0.8 + 0.2,
      })),
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let R = 100;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let hovered = false;
    let speedMul = 1;
    let rot = 3.4; // longitude offset: starts with the Americas facing us
    let spin = 0.16; // current spin speed (rad/s); drag and the mouse change it
    let t = 0.4;
    let last = performance.now();
    let tilt = AXIAL_TILT;
    let px = 0;
    let py = 0;
    let pxT = 0;
    let pyT = 0;
    let dragging = false;
    let dragX = 0;
    let dragT = 0;
    let vel = 0;
    let hudTick = 0;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      R = Math.min(w / 5.0, h / 3.7);
    };

    const light = (() => {
      const v = [-0.45, 0.55, 0.7];
      const m = Math.hypot(...v);
      return v.map((c) => c / m);
    })();

    // geographic vector -> view space (spin about the polar axis, then the axial tilt)
    const view = (lat, lon, lift = 1) => {
      const l = lon + rot;
      const x = Math.cos(lat) * Math.sin(l);
      const y0 = Math.sin(lat);
      const z0 = Math.cos(lat) * Math.cos(l);
      const cT = Math.cos(tilt);
      const sT = Math.sin(tilt);
      return [x * lift, (y0 * cT - z0 * sT) * lift, (y0 * sT + z0 * cT) * lift];
    };

    const drawStars = (time) => {
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = 0.45 + 0.55 * Math.sin(time * 0.9 + s.p);
        const x = (s.x * w + px * s.d * 14) * dpr;
        const y = (s.y * h + py * s.d * 10) * dpr;
        ctx.fillStyle = `rgba(210,225,255,${(0.16 + 0.5 * tw * s.d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.s * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawRings = (front) => {
      for (let k = 0; k < RINGS.length; k++) {
        const ring = RINGS[k];
        const rr = R * ring.rf;
        const steps = 96;

        // the orbit path
        ctx.lineWidth = 1 * dpr;
        ctx.strokeStyle = `rgba(${ring.rgb},${front ? 0.28 : 0.1})`;
        ctx.beginPath();
        let pen = false;
        for (let s = 0; s <= steps; s++) {
          const [x, y, d] = ringPoint(ring, rr, (s / steps) * Math.PI * 2);
          const on = front ? d > 0 : d <= 0;
          const X = (w / 2 + x) * dpr;
          const Y = (h / 2 + y) * dpr;
          if (on) {
            if (!pen) ctx.moveTo(X, Y);
            else ctx.lineTo(X, Y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();

        // a comet running along the path
        const dir = ring.speed > 0 ? 1 : -1;
        const head = t * ring.speed * 3.4 + k * 1.9;
        const tail = 34;
        ctx.lineCap = "round";
        for (let j = 0; j < tail; j++) {
          const a = ringPoint(ring, rr, head - dir * j * 0.045);
          const b = ringPoint(ring, rr, head - dir * (j + 1) * 0.045);
          const on = front ? a[2] > 0 : a[2] <= 0;
          if (!on) continue;
          const fade = Math.pow(1 - j / tail, 2);
          ctx.strokeStyle = `rgba(${ring.rgb},${(0.85 * fade * (front ? 1 : 0.45)).toFixed(3)})`;
          ctx.lineWidth = (2.4 - 1.6 * (j / tail)) * dpr;
          ctx.beginPath();
          ctx.moveTo((w / 2 + a[0]) * dpr, (h / 2 + a[1]) * dpr);
          ctx.lineTo((w / 2 + b[0]) * dpr, (h / 2 + b[1]) * dpr);
          ctx.stroke();
        }
        const hp = ringPoint(ring, rr, head);
        if ((front && hp[2] > 0) || (!front && hp[2] <= 0)) {
          const X = (w / 2 + hp[0]) * dpr;
          const Y = (h / 2 + hp[1]) * dpr;
          const g = ctx.createRadialGradient(X, Y, 0, X, Y, 9 * dpr);
          g.addColorStop(0, `rgba(255,255,255,${front ? 0.95 : 0.5})`);
          g.addColorStop(0.35, `rgba(${ring.rgb},${front ? 0.7 : 0.3})`);
          g.addColorStop(1, `rgba(${ring.rgb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(X, Y, 9 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.lineCap = "butt";
      }
    };

    // a lifted great-circle arc from home to a place, with a pulse travelling along it
    const drawArc = (place, idx, cx, cy, r) => {
      const a = toVec(HOME.lat, HOME.lon);
      const b = toVec(place.lat, place.lon);
      const dotp = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
      const om = Math.acos(dotp);
      if (om < 0.001) return;
      const so = Math.sin(om);
      const N = 40;
      const pulse = (t * 0.32 + idx * 0.31) % 1;
      ctx.lineWidth = 1.3 * dpr;
      let pen = false;
      ctx.beginPath();
      for (let s = 0; s <= N; s++) {
        const u = s / N;
        const k1 = Math.sin((1 - u) * om) / so;
        const k2 = Math.sin(u * om) / so;
        const v = [k1 * a[0] + k2 * b[0], k1 * a[1] + k2 * b[1], k1 * a[2] + k2 * b[2]];
        const lat = Math.asin(v[1]);
        const lon = Math.atan2(v[0], v[2]);
        const lift = 1 + 0.32 * Math.sin(Math.PI * u) * Math.min(1, om / 0.9);
        const p = view(lat, lon, lift);
        if (p[2] > 0) {
          const X = cx + p[0] * r;
          const Y = cy - p[1] * r;
          if (!pen) ctx.moveTo(X, Y);
          else ctx.lineTo(X, Y);
          pen = true;
          if (Math.abs(u - pulse) < 1 / N) {
            ctx.stroke();
            ctx.fillStyle = "#fff0d0";
            ctx.shadowColor = "rgba(255,190,110,1)";
            ctx.shadowBlur = 12 * dpr;
            ctx.beginPath();
            ctx.arc(X, Y, 2.4 * dpr, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(X, Y);
          }
        } else pen = false;
      }
      ctx.strokeStyle = "rgba(255,196,125,0.62)";
      ctx.stroke();
    };

    const drawPlace = (p, name, home, cx, cy, r, time) => {
      const v = view(p.lat, p.lon);
      if (v[2] <= 0.05) return;
      const X = cx + v[0] * r;
      const Y = cy - v[1] * r;
      const k = R / 170;
      if (home) {
        const pulse = (time % 2.4) / 2.4;
        ctx.strokeStyle = `rgba(255,190,110,${(0.7 * (1 - pulse)).toFixed(3)})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.arc(X, Y, (4 + pulse * 16) * dpr * k, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = home ? "#ffd9a0" : "#ffe9c4";
      ctx.shadowColor = "rgba(255,179,92,0.95)";
      ctx.shadowBlur = (home ? 12 : 8) * dpr;
      ctx.beginPath();
      ctx.arc(X, Y, (home ? 2.8 : 2) * dpr * Math.max(0.8, k), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.font = `${Math.round(10 * dpr)}px "IBM Plex Mono", monospace`;
      ctx.fillStyle = `rgba(255,226,186,${(0.45 + 0.5 * v[2]).toFixed(2)})`;
      ctx.fillText(name.toUpperCase(), X + 8 * dpr, Y + (home ? -8 : 4) * dpr);
    };

    const drawGlobe = (time) => {
      const cx = (w / 2) * dpr;
      const cy = (h / 2) * dpr;
      const r = R * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawStars(time);
      drawRings(false);

      // atmosphere
      const glow = ctx.createRadialGradient(cx, cy, r * 0.92, cx, cy, r * 1.34);
      glow.addColorStop(0, "rgba(90,170,255,0.4)");
      glow.addColorStop(0.45, "rgba(60,120,255,0.13)");
      glow.addColorStop(1, "rgba(40,90,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.34, 0, Math.PI * 2);
      ctx.fill();

      // ocean
      const ocean = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
      ocean.addColorStop(0, "#14395f");
      ocean.addColorStop(0.55, "#0a1d35");
      ocean.addColorStop(1, "#050c18");
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // land dots, lit from the upper left
      const dotR = Math.max(1, (R / 170) * 1.5) * dpr;
      for (let i = 0; i < dots.length; i++) {
        const v = view(dots[i][0], dots[i][1]);
        if (v[2] <= 0.02) continue;
        const lit = Math.max(0, v[0] * light[0] + v[1] * light[1] + v[2] * light[2]);
        const a = 0.38 + 0.62 * Math.pow(lit, 0.7);
        ctx.fillStyle = `rgba(${Math.round(120 + 90 * lit)},${Math.round(205 + 40 * lit)},${Math.round(190 + 50 * lit)},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(cx + v[0] * r, cy - v[1] * r, dotR * (0.7 + 0.45 * v[2]), 0, Math.PI * 2);
        ctx.fill();
      }

      // shaded limb + rim light
      const shade = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.45, cx, cy, r);
      shade.addColorStop(0, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(0,4,12,0.62)");
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(150,210,255,0.55)";
      ctx.lineWidth = 1.2 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // work locations: arcs from home, then the places themselves
      PLACES.forEach((p, i) => drawArc(p, i, cx, cy, r));
      PLACES.forEach((p) => drawPlace(p, p.n, false, cx, cy, r, time));
      drawPlace(HOME, HOME.n, true, cx, cy, r, time);

      drawRings(true);
    };

    const placeChips = () => {
      for (let k = 0; k < items.length; k++) {
        const el = chipRefs.current[k];
        if (!el) continue;
        const it = items[k];
        const ring = RINGS[it.ring % RINGS.length];
        const rr = R * ring.rf;
        const th = it.base + t * ring.speed * 2.2;
        const [x, y, depth] = ringPoint(ring, rr, th);
        const s = 0.78 + 0.26 * depth;
        const o = 0.34 + 0.66 * ((depth + 1) / 2);
        el.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(3)})`;
        el.style.opacity = o.toFixed(3);
        el.style.zIndex = depth > 0 ? 5 : 1;
      }
    };

    const updateHud = () => {
      if (!hudRef.current) return;
      let lon = (((-rot / DEG + 180) % 360) + 360) % 360 - 180;
      const hemi = lon >= 0 ? "E" : "W";
      lon = Math.abs(lon).toFixed(1).padStart(5, "0");
      hudRef.current.textContent = `LON ${lon}° ${hemi}`;
    };

    const frame = (now) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      speedMul += ((hovered ? 0.35 : 1) - speedMul) * 0.08;
      t += dt * speedMul;

      // mouse steering + tilt parallax (smoothed)
      px += (pxT - px) * 0.06;
      py += (pyT - py) * 0.06;
      tilt += (AXIAL_TILT + py * 0.18 - tilt) * 0.06;

      if (!dragging) {
        spin += (0.16 + px * 0.16 - spin) * Math.min(1, dt * 1.8);
        rot += spin * dt;
      }
      drawGlobe(t);
      placeChips();
      if (++hudTick % 4 === 0) updateHud();
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const redraw = () => {
      drawGlobe(t);
      placeChips();
      updateHud();
    };

    resize();
    redraw();
    if (!reduce) kick();

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduce) kick();
      },
      { threshold: 0.05 }
    );
    io.observe(stage);

    const ro = new ResizeObserver(() => {
      resize();
      redraw();
    });
    ro.observe(stage);

    const onEnter = () => (hovered = true);
    const onLeave = () => {
      hovered = false;
      pxT = 0;
      pyT = 0;
    };
    const onMove = (e) => {
      const rect = stage.getBoundingClientRect();
      pxT = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pyT = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (dragging) {
        const now = performance.now();
        const dx = e.clientX - dragX;
        rot += dx * 0.0065;
        vel = (dx * 0.0065) / Math.max(0.008, (now - dragT) / 1000);
        dragX = e.clientX;
        dragT = now;
        if (reduce) redraw();
      }
    };
    const onDown = (e) => {
      if (e.target.closest && e.target.closest(".orb-chip")) return;
      dragging = true;
      dragX = e.clientX;
      dragT = performance.now();
      vel = 0;
      stage.classList.add("dragging");
      stage.setPointerCapture?.(e.pointerId);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      spin = Math.max(-2.2, Math.min(2.2, vel));
      stage.classList.remove("dragging");
    };

    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, [dots, items, stars]);

  return (
    <div className="orbit-wrap">
      <header className="orbit-head">
        <p className="eyebrow">Stack</p>
        <h2>Skills in orbit</h2>
      </header>

      <div className="orbit-stage" ref={stageRef} data-focus={focus ?? ""} aria-hidden="true">
        <canvas ref={canvasRef} className="orbit-canvas" />
        <span className="orbit-hud" ref={hudRef}>
          LON 000.0° W
        </span>
        <span className="orbit-hint">Drag to spin</span>
        {items.map((it, k) => (
          <span
            key={it.name + it.ring}
            className="orb-chip"
            data-ring={it.ring % RINGS.length}
            ref={(el) => (chipRefs.current[k] = el)}
            onMouseEnter={() => setFocus(it.ring)}
            onMouseLeave={() => setFocus(null)}
          >
            <span className="oc-ic">
              <TechIcon name={it.name} />
            </span>
            <em>{it.name}</em>
          </span>
        ))}
      </div>

      <ul className="orbit-legend" aria-label="Skill groups">
        {groups.map(([name, list], i) => (
          <li
            key={name}
            data-ring={i % RINGS.length}
            onMouseEnter={() => setFocus(i)}
            onMouseLeave={() => setFocus(null)}
            onFocus={() => setFocus(i)}
            onBlur={() => setFocus(null)}
            tabIndex={0}
          >
            <i aria-hidden="true" />
            {name}
            <b>{list.length}</b>
          </li>
        ))}
      </ul>

      {/* the floating labels are decorative; screen readers get a plain list */}
      <div className="sr-only">
        {groups.map(([name, list]) => (
          <p key={name}>
            {name}: {list.join(", ")}
          </p>
        ))}
      </div>
    </div>
  );
}

