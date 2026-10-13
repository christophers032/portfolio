import { createPortal } from "react-dom";
import TechIcon from "./techIcons.jsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  certifications,
  certs,
  education,
  faqs,
  filters,
  nav,
  figures,
  principles,
  profile,
  services,
  stats,
  ticker,
  timeline,
  works,
} from "./data";

function useSection() {
  const [id, setId] = useState("intro");
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setId(vis.target.id);
      },
      { threshold: [0.22, 0.45] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return id;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Writes --hp (0 at top of page, 1 once the hero has scrolled away) for scroll-linked motion.
function useHeroScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.getElementById("intro");
    if (!hero) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.8)));
      hero.style.setProperty("--hp", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
function spot(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
  if (el.dataset.tilt !== "off") {
    el.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
  }
}

function unspot(e) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

function tilt(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
  el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
  el.style.setProperty("--sx", `${x * 100}%`);
  el.style.setProperty("--sy", `${y * 100}%`);
}

function untilt(e) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

function starField(count, color) {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    return `${x}px ${y}px ${color}`;
  }).join(",");
}

function LightFx() {
  const layers = useMemo(
    () => [
      { cls: "s1", shadow: starField(200, "#fff") },
      { cls: "s2", shadow: starField(60, "#fff") },
      { cls: "s3", shadow: starField(24, "#139bfd") },
    ],
    []
  );
  return (
    <div className="light-fx" aria-hidden="true">
      <img className="light-beam b2" src="/light.svg" alt="" />
      <img className="light-beam b1" src="/light.svg" alt="" />
      <div className="light-flow f1" />
      <div className="stars-area">
        {layers.map((l) => (
          <div key={l.cls} className={`star ${l.cls}`} style={{ boxShadow: l.shadow }} />
        ))}
      </div>
    </div>
  );
}

// Nodes sit just under the planet's rim. Units are vw (planet is 170vw wide, radius 85vw),
// x is the offset from the planet's center line, y is depth below the rim curve.
const GLOBE_R = 85;
const rimDrop = (x) => GLOBE_R - Math.sqrt(GLOBE_R * GLOBE_R - x * x);
const globeNodes = [
  { x: -38, d: 1.2 },
  { x: -30, d: 1.8 },
  { x: -22, d: 3.0 },
  { x: -13, d: 1.5 },
  { x: -5, d: 3.4 },
  { x: 8, d: 2.4, home: true },
  { x: 16, d: 1.8 },
  { x: 24, d: 3.2 },
  { x: 32, d: 1.5 },
  { x: 38, d: 1.0 },
].map((n) => ({ ...n, cx: GLOBE_R + n.x, cy: rimDrop(n.x) + n.d }));
const globeLinks = [
  [0, 2],
  [1, 4],
  [2, 4],
  [3, 5],
  [5, 7],
  [5, 8],
  [6, 9],
  [7, 9],
];

function GlobeNet() {
  return (
    <svg className="globe-net" viewBox="0 0 170 18" aria-hidden="true">
      {globeLinks.map(([a, b], i) => {
        const p = globeNodes[a];
        const q = globeNodes[b];
        const lift = 2.2 + Math.abs(q.cx - p.cx) * 0.14;
        const my = Math.min(p.cy, q.cy) - lift;
        return (
          <path
            key={i}
            className="arc"
            style={{ animationDelay: `${-i * 0.9}s` }}
            d={`M${p.cx} ${p.cy} Q${(p.cx + q.cx) / 2} ${my} ${q.cx} ${q.cy}`}
          />
        );
      })}
      {globeNodes.map((n, i) => (
        <g key={i}>
          {n.home && <circle className="ring" cx={n.cx} cy={n.cy} r="0.9" />}
          <circle
            className={n.home ? "node home" : "node"}
            style={{ animationDelay: `${-i * 0.7}s` }}
            cx={n.cx}
            cy={n.cy}
            r={n.home ? 0.38 : 0.2}
          />
        </g>
      ))}
      <text className="node-label" x={globeNodes[5].cx} y={globeNodes[5].cy + 2}>
        LAFAYETTE, GA
      </text>
    </svg>
  );
}

const serviceIcons = {
  code: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="m10 9-3 3 3 3M14 9l3 3-3 3" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M8 9v11" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.75 4.75 0 0 1 .5 9.5H7Z" />,
  tools: (
    <>
      <path d="m14.5 6.5 3 3M4 20l9.5-9.5M13 4l3 3-9 9-4 1 1-4 9-9ZM17 13l4 4-2 2-4-4" />
    </>
  ),
  asterisk: <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />,
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 4v4M9 13v1.5M15 13v1.5M2 13v3M22 13v3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.55 3.35 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13M4.5 12c0 1.55 3.35 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="M12 3v18" />
    </>
  ),
};

function ServiceIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {serviceIcons[name]}
    </svg>
  );
}
function ImageLightbox({ work, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!work || !work.image) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <figure className="lightbox" role="dialog" aria-modal="true" aria-label={`${work.title} image`}>
        <button ref={closeRef} className="modal-close" aria-label="Close image" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="lightbox-img" style={{ background: work.imageBg || "#fff" }}>
          <img src={work.image} alt={`${work.title} overview`} />
        </div>
        <figcaption>
          <b>{work.title}</b>
          <span>{work.kind}</span>
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}

function ProjectModal({ work, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!work) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`port-modal ${work.accent}`} role="dialog" aria-modal="true" aria-label={work.title}>
        <button ref={closeRef} className="modal-close" aria-label="Close details" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="modal-body">
          <h3>{work.title}</h3>
          <p className="modal-lead">{work.lead}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
// Splits "May 2022 — Jun 2026" into its start/end years and month range.
function splitWhen(when) {
  const m = when.match(/^(\w+)\s+(\d{4})\s+—\s+(\w+)\s+(\d{4})$/);
  if (!m) return { start: when, end: "", months: "" };
  return { start: m[2], end: m[4], months: `${m[1]} — ${m[3]}` };
}

// Wraps results such as 400%, 60-80%, 4-8X, ~20% and 20,000+ so they can be highlighted.
function withFigures(text) {
  return text.split(/(~?\d+(?:[.,]\d+)*(?:-\d+)?(?:%|X|\+))/g).map((part, i) =>
    i % 2 ? (
      <b className="hl" key={i}>
        {part}
      </b>
    ) : (
      part
    )
  );
}
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function SiteFooter({ jump }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );

  return (
    <footer className="foot2">
      <div className="foot2-top">
        <div className="foot2-brand">
          <strong>{"<CS />"}</strong>
          <p className="foot2-role">{profile.role}</p>
          <p className="foot2-place">
            <i aria-hidden="true" />
            {profile.place}
            {time && <span> · {time} ET</span>}
          </p>
          <a className="foot2-cta" href={`mailto:${profile.email}`}>
            Say hello
            <Arrow />
          </a>
        </div>

        <nav className="foot2-col" aria-label="Footer">
          <h4>Navigation</h4>
          <div className="foot2-nav">
            {nav.map((n, i) => (
              <button key={n.id} onClick={() => jump(n.id)}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {n.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="foot2-col">
          <h4>Connect</h4>
          <a href={`mailto:${profile.email}`}>
            <span className="fc-l">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m4 8 8 6 8-6" />
              </svg>
              Email
            </span>
            <Arrow />
          </a>
          <a href={profile.phoneHref}>
            <span className="fc-l">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {profile.phone}
            </span>
            <Arrow />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="fc-l">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3v11.5h-3V9Zm5.5 0h2.9v1.6c.5-.9 1.7-1.9 3.5-1.9 3.2 0 3.6 2.1 3.6 4.8v7h-3v-6.2c0-1.5 0-3.1-1.9-3.1s-2.1 1.4-2.1 3v6.3H9V9Z" />
              </svg>
              LinkedIn
            </span>
            <Arrow />
          </a>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer">
              <span className="fc-l">
                <GithubMark />
                GitHub
              </span>
              <Arrow />
            </a>
          )}
        </div>
      </div>

      <div className="foot2-word" aria-hidden="true">
        <span>{profile.name}</span>
      </div>

      <div className="foot2-bottom">
        <p>
          © {new Date().getFullYear()} {profile.name} · Atlas 3.0 · React + Vite
        </p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          Back to top
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
function HeroCopy() {
  const wrap = useRef(null);
  const readout = useRef(null);
  useEffect(() => {
    const move = (e) => {
      const el = wrap.current;
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }
      if (readout.current) {
        const lat = 34.704 + (0.5 - e.clientY / window.innerHeight) * 0.08;
        const lon = 85.281 - (e.clientX / window.innerWidth - 0.5) * 0.12;
        readout.current.textContent = `${lat.toFixed(4)}° N · ${lon.toFixed(4)}° W`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const name = (
    <>
      <span className="n1">Christopher</span>
      <em className="n2">Seay</em>
    </>
  );

  return (
    <>
    <div className="hero-copy">
      <p className="eyebrow">
        {profile.role} · {profile.place}
      </p>
      <div className="name" ref={wrap}>
        <h1>
          {name}
          <span className="blink">|</span>
        </h1>
        <h1 className="lit" aria-hidden="true">
          {name}
          <span style={{ visibility: "hidden" }}>|</span>
        </h1>
      </div>
      <div className="hero-lower">
        <p className="intro">{profile.intro}</p>
        <div className="actions">
          <a className="btn fill" href="#work">
            Enter the work
          </a>
          <a className="btn" href={profile.cv} download>
            Download CV
          </a>
        </div>
      </div>
    </div>
    <div className="horizon" aria-hidden="true">
      <div className="planet">
        <GlobeNet />
      </div>
    </div>
    <p className="readout" aria-hidden="true">
      <i /> <span ref={readout}>{profile.coords.replace(/\s+/g, " ")}</span>
    </p>
    </>
  );
}

function TypeLine({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => {
      setN((v) => (v >= text.length ? v : v + 1));
    }, 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="type">
      {text.slice(0, n)}
      <i className="caret" />
    </span>
  );
}

function Count({ n, suffix }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const run = (now) => {
          const p = Math.min(1, (now - t0) / 1100);
          setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return (
    <b ref={ref}>
      {v}
      {suffix}
    </b>
  );
}

export default function App() {
  const progRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [openWork, setOpenWork] = useState(null);
  const [curJob, setCurJob] = useState(0);
  const lastTrigger = useRef(null);
  const closeModal = useCallback(() => {
    setOpenWork(null);
    lastTrigger.current?.focus();
  }, []);
  const [zoomWork, setZoomWork] = useState(null);
  const closeZoom = useCallback(() => {
    setZoomWork(null);
    lastTrigger.current?.focus();
  }, []);
  const [faq, setFaq] = useState(0);
  const [aboutTab, setAboutTab] = useState("how");
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [boot, setBoot] = useState(true);
  const section = useSection();
  const shown = works.filter(
    (w) =>
      filter === "All" ||
      w.filter === filter ||
      (w.cats &&
        w.cats.some(
          (c) => c === filter || c.startsWith(`${filter} `) || c.startsWith(`${filter}/`)
        ))
  );
  useReveal();
  useHeroScroll();
  useEffect(() => {
    const els = [...document.querySelectorAll("#work .rv:not(.in)")];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // Scroll progress bar is moved straight in the DOM (no React state), once per frame.
  useEffect(() => {
    let raf = 0;
    let lastProg = -1;
    const paint = () => {
      raf = 0;
      const bar = progRef.current;
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (Math.abs(p - lastProg) > 0.0005) {
        lastProg = p;
        bar.style.transform = `scaleX(${p.toFixed(4)})`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !palette) {
        e.preventDefault();
        setPalette(true);
      }
      if (e.key === "Escape") {
        setPalette(false);
        setMenu(false);
        setBoot(false);
      }
      const hit = nav.find((n) => n.key === e.key);
      if (hit && document.activeElement.tagName !== "INPUT") {
        document.getElementById(hit.id)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [palette]);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const hits = nav.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      {boot && (
        <div className="boot" onClick={() => setBoot(false)}>
          <p className="eyebrow">Locking survey</p>
          <strong>{profile.coords}</strong>
          <span>Christopher Seay · skip</span>
        </div>
      )}
      <div className="grain" />
      <div className="progress" ref={progRef} />
      <div className="giant" aria-hidden="true">
        SEAY
      </div>

      <header className="topbar">
        <button className="logo" onClick={() => jump("intro")}>
          {"<CS />"}
        </button>
        <nav className={menu ? "open" : ""}>
          {nav.map((n) => (
            <button key={n.id} className={section === n.id ? "on" : ""} onClick={() => jump(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>
        <a className="btn fill tiny" href={profile.cv} download>
          Download CV
        </a>
        <button className="burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}>
          <span />
          <span />
        </button>
      </header>

      <main>
        <section id="intro" className="hero">
          <LightFx />
          <HeroCopy />
          <a className="chevron descend" href="#craft" aria-label="Scroll down">
            <span className="d-label">Descend</span>
            <span className="d-track">
              <i />
            </span>
          </a>
        </section>

        <div className="handoff" aria-hidden="true">
          {[
            ["9%", 0.2, 6.2],
            ["24%", 1.9, 7.4],
            ["41%", 3.4, 5.6],
            ["58%", 0.9, 6.8],
            ["73%", 2.7, 7.8],
            ["90%", 4.1, 6.0],
          ].map(([x, delay, dur], i) => (
            <i key={i} style={{ "--x": x, "--delay": `${delay}s`, "--dur": `${dur}s` }} />
          ))}
        </div>
        <div className="marquee" aria-hidden="true">
          <div>
            {[...ticker, ...ticker].map((t, i) => {
              const n = i % ticker.length;
              return (
                <span key={t + i} className={`stop ${n % 2 ? "dn" : "up"}`}>
                  <i className="pin" />
                  <span className="lbl">
                    <b>{t}</b>
                    <small>{String(n + 1).padStart(2, "0")}</small>
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        <section id="craft" className="reveal">
          <p className="eyebrow">Services</p>
          <h2>Services offered.</h2>
          <p className="body">
            My software solutions are fully customized, ensuring your business gets exactly what it
            needs to stand out in the market.
          </p>
          <div className="svc-grid2">
            {services.map((s, i) => (
              <div className="rv" key={s.title} style={{ "--d": i % 4 }}>
              <article className="svc-card">
                <span className="svc-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-icon">
                  <ServiceIcon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </article>
              </div>
            ))}
          </div>
        </section>
        <section id="about" className="reveal about-fit">
          <div className="fit-grid">
            <div className="rv cell f-intro">
              <article className="tile t-intro" data-tilt="off" onPointerMove={spot}>
                <div>
                  <p className="eyebrow">About</p>
                  <h2 className="a3-title" aria-label="Senior Full Stack Engineer">
                    {"Senior Full Stack Engineer".split(" ").map((w, i) => (
                      <span className="w" key={w} aria-hidden="true">
                        <span style={{ "--i": i }}>{w}</span>
                      </span>
                    ))}
                  </h2>
                  <p className="a3-sub">
                    {[
                      "Python, Nodejs, C#, .NET, React, Golang, Spring Boot",
                      "AI/ML, Data Engineering",
                      "Azure & AWS DevOps",
                    ].map((s, i) => (
                      <span key={s}>
                        {i > 0 && <i aria-hidden="true">|</i>}
                        {s}
                      </span>
                    ))}
                  </p>
                </div>
                <p className="lead">{profile.summary}</p>
                <div className="about-actions">
                  <div className="socials">
                    <a href={`mailto:${profile.email}`} aria-label="Email">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="3" />
                        <path d="m4 8 8 6 8-6" />
                      </svg>
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3v11.5h-3V9Zm5.5 0h2.9v1.6c.5-.9 1.7-1.9 3.5-1.9 3.2 0 3.6 2.1 3.6 4.8v7h-3v-6.2c0-1.5 0-3.1-1.9-3.1s-2.1 1.4-2.1 3v6.3H9V9Z" />
                      </svg>
                    </a>
                    {profile.github ? (
                      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                        <GithubMark />
                      </a>
                    ) : (
                      <span className="off" aria-disabled="true" title="GitHub link coming soon">
                        <GithubMark />
                      </span>
                    )}
                  </div>
                  <a className="btn fill" href={profile.cv} download>
                    Download CV
                  </a>
                </div>
              </article>
            </div>

            <div className="f-stats">
              {figures.map((f, i) => (
                <div className="rv cell" key={f.label} style={{ "--d": i + 1 }}>
                  <article className="tile t-fig2" onPointerMove={spot} onPointerLeave={unspot}>
                    <div className={`rings v${i}`} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <em />
                    </div>
                    <div className="num">
                      {f.sign === "+" && <span className="sign">+</span>}
                      <Count n={f.n} suffix="" />
                      {f.sign === "%" && <span className="sign pct">%</span>}
                    </div>
                    <p>{f.label}</p>
                  </article>
                </div>
              ))}
            </div>

            <div className="rv cell f-panel" style={{ "--d": 2 }}>
              <article className="tile t-panel" data-tilt="off" onPointerMove={spot}>
                <div className="tabs" role="tablist" aria-label="More about me" style={{ "--i": ["how", "edu", "certs"].indexOf(aboutTab) }}>
                  <span className="pill" aria-hidden="true" />
                  {[
                    ["how", "How I work"],
                    ["edu", "Education"],
                    ["certs", "Certifications"],
                  ].map(([k, label]) => (
                    <button
                      key={k}
                      role="tab"
                      aria-selected={aboutTab === k}
                      className={aboutTab === k ? "on" : ""}
                      onClick={() => setAboutTab(k)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="tab-body" key={aboutTab} role="tabpanel">
                  {aboutTab === "how" && (
                    <ol className="how-list">
                      {principles.map((p, i) => (
                        <li key={p.title} style={{ "--k": i }}>
                          <b>{String(i + 1).padStart(2, "0")}</b>
                          <div>
                            <h4>{p.title}</h4>
                            <p>{p.copy}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {aboutTab === "edu" && (
                    <div className="edu-body">
                      <h3>{education.school}</h3>
                      <p className="degree">{education.degree}</p>
                      <p className="when">{education.when}</p>
                      <ul className="chips">
                        {education.activities.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                      <span className="ghost" aria-hidden="true">
                        UCSC
                      </span>
                    </div>
                  )}

                  {aboutTab === "certs" && (
                    <ul className="cert-list">
                      {certifications.map((c, k) => (
                        <li key={c.name} style={{ "--k": k }}>
                          <span className={c.mark === "ms" ? "mark ms" : "mark"} aria-hidden="true">
                            {c.mark === "ms" ? (
                              <>
                                <i />
                                <i />
                                <i />
                                <i />
                              </>
                            ) : (
                              c.mark
                            )}
                          </span>
                          <div>
                            <h4>{c.name}</h4>
                            <p>
                              {c.issuer} · {c.when}
                            </p>
                            <code>ID {c.id}</code>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>
        <section id="work" className="reveal">
          <header className="port-head">
            <h2>Portfolio</h2>
            <p className="body port-sub">
              Browse and learn more about the projects and the work I've carried out.
            </p>
          </header>

          <div className="port-filters" role="group" aria-label="Filter projects">
            <svg className="funnel" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h18l-7 8.5V19l-4 2v-8.5L3 4Z" />
            </svg>
            {filters.map((f) => (
              <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="port-grid">
            {shown.map((w, i) => (
              <div className="rv port-cell" key={w.id} style={{ "--d": i % 3 }}>
                <article className={`port-card ${w.accent}`} onPointerMove={spot}>
                  <div
                    className={`port-thumb ${w.image ? "has-img zoomable" : ""}`}
                    style={w.imageBg ? { background: w.imageBg } : undefined}
                    {...(w.image
                      ? {
                          role: "button",
                          tabIndex: 0,
                          "aria-label": `View larger image: ${w.title}`,
                          onClick: (e) => {
                            lastTrigger.current = e.currentTarget;
                            setZoomWork(w.id);
                          },
                          onKeyDown: (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              lastTrigger.current = e.currentTarget;
                              setZoomWork(w.id);
                            }
                          },
                        }
                      : {})}
                  >
                    {w.image && <img src={w.image} alt={`${w.title} overview`} loading="lazy" decoding="async" />}
                    {w.image && (
                      <span className="zoom-hint" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="6.5" />
                          <path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5" />
                        </svg>
                      </span>
                    )}
                    <span className="kind">{w.kind}</span>
                    {!w.image && <span className="num">{w.code}</span>}
                  </div>

                  <div className="port-pad">
                    <h3 title={w.title}>{w.title}</h3>
                    <div className="port-chips">
                      {(w.cats || [w.filter, ...w.kind.split(" · ")])
                        .filter((c, k, arr) => arr.indexOf(c) === k)
                        .slice(0, 3)
                        .map((c) => (
                          <span key={c}>{c}</span>
                        ))}
                    </div>
                  </div>

                  <div className="port-hr" />
                  <div className="port-pad port-grow">
                    <p className="port-desc">{w.lead}</p>
                  </div>

                  <div className="port-hr" />
                  <div className="port-pad">
                    <div className="port-stack">
                      {w.tags.slice(0, 6).map((tg) => (
                        <TechIcon key={tg} name={tg} />
                      ))}
                      {w.tags.length > 6 && (
                        <span className="tech more" title={w.tags.slice(6).join(", ")}>
                          +{w.tags.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="port-hr" />
                  <div className="port-pad port-actions">
                    {w.repo ? (
                      <a className="port-ico" href={w.repo} target="_blank" rel="noreferrer" aria-label={`View code: ${w.title}`}>
                        <GithubMark />
                      </a>
                    ) : (
                      <span className="port-ico off" aria-disabled="true" title="Code link coming soon">
                        <GithubMark />
                      </span>
                    )}
                    <button
                      className="port-ico"
                      aria-haspopup="dialog"
                      aria-label={`Show details: ${w.title}`}
                      onClick={(e) => {
                        lastTrigger.current = e.currentTarget;
                        setOpenWork(w.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5" />
                      </svg>
                      <span>Details</span>
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
          {openWork && <ProjectModal work={works.find((x) => x.id === openWork)} onClose={closeModal} />}
          {zoomWork && <ImageLightbox work={works.find((x) => x.id === zoomWork)} onClose={closeZoom} />}
        </section>
        <section id="experience" className="reveal">
          <header className="jobs-head">
            <h2>Employment history</h2>
            <p className="jobs-meta">
              {String(curJob + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")} · {splitWhen(timeline[timeline.length - 1].when).start} — {splitWhen(timeline[0].when).end}
            </p>
          </header>
          <div className="reel">
            <div className="reel-list" role="tablist" aria-label="Roles" aria-orientation="vertical" style={{ "--k": curJob }}>
              <span className="reel-ind" aria-hidden="true" />
              {timeline.map((row, i) => {
                const w = splitWhen(row.when);
                const years = w.end && w.end !== w.start ? `${w.start} — ${w.end}` : w.start;
                return (
                  <button
                    key={row.org + row.when}
                    role="tab"
                    id={`reel-tab-${i}`}
                    aria-selected={curJob === i}
                    aria-controls={`reel-panel-${i}`}
                    className={`reel-item ${curJob === i ? "on" : ""}`}
                    onMouseEnter={() => setCurJob(i)}
                    onFocus={() => setCurJob(i)}
                    onClick={() => setCurJob(i)}
                  >
                    <span className="ri-no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ri-text">
                      <b>{row.short || row.org.split(" · ")[0]}</b>
                      <i>{row.role}</i>
                    </span>
                    <span className="ri-years">{years}</span>
                  </button>
                );
              })}
            </div>

            <div className="reel-stage">
              {timeline.map((row, i) => {
                const w = splitWhen(row.when);
                const [company, ...kind] = row.org.split(" · ");
                const years = w.end && w.end !== w.start ? `${w.start} — ${w.end}` : w.start;
                const no = String(i + 1).padStart(2, "0");
                const on = curJob === i;
                return (
                  <div
                    className={`reel-panel ${on ? "on" : ""}`}
                    id={`reel-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`reel-tab-${i}`}
                    aria-hidden={!on}
                    key={row.org + row.when}
                  >
                    <article className={`stack-card reel-card acc${i % 4}`} data-tilt="off" onPointerMove={spot}>
                      <span className="sc-bgno" aria-hidden="true">
                        {no}
                      </span>
                      <div className="sc-left">
                        <p className="sc-kicker">
                          N°{no}
                          {kind.length > 0 && ` · ${kind.join(" · ")}`}
                        </p>
                        <h3 className="sc-name">{row.short || company}</h3>
                        <p className="sc-role">{row.role}</p>
                        <div className="sc-chips">
                          <span>{years}</span>
                          {row.dur && <span>{row.dur}</span>}
                          {row.where.split(" · ").map((c) => (
                            <span key={c}>{c}</span>
                          ))}
                        </div>
                      </div>
                      <ol className="sc-notes">
                        {(row.points || [row.detail]).map((pt, k) => (
                          <li key={pt} style={{ "--k": k }}>
                            <b>{String(k + 1).padStart(2, "0")}</b>
                            <p>{withFigures(pt)}</p>
                          </li>
                        ))}
                      </ol>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>          
        </section>

        <section id="faq" className="reveal">
          <h2>Questions I actually get.</h2>
          <div className="faq">
            {faqs.map((item, i) => (
              <button
                key={item.q}
                className={faq === i ? "on" : ""}
                aria-expanded={faq === i}
                onClick={() => setFaq(faq === i ? -1 : i)}
              >
                <span>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-a">
                    <span>{item.a}</span>
                  </span>
                </span>
                <b aria-hidden="true">+</b>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="contact reveal">
          <p className="eyebrow">Contact</p>
          <h2>
            Let’s make an AI feature
            <br />
            <em>actually reliable</em> in production.
          </h2>
          <div className="actions">
            <a className="btn fill" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn" href={profile.phoneHref}>
              {profile.phone}
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn" href={profile.cv} download>
              Download CV
            </a>
          </div>
        </section>
      </main>

      <SiteFooter jump={jump} />

      {palette && (
        <div className="palette" onClick={() => setPalette(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              placeholder="Jump to a sector…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="hits">
              {hits.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    jump(n.id);
                    setPalette(false);
                    setQuery("");
                  }}
                >
                  {n.key} — {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}





























