import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Zahradnictví Úsilné — design prototype v4                          */
/*  Header illustration split in two:                                  */
/*   1) SkyScene — sky, hills, house, trees, title (scrolls away)      */
/*   2) MeadowNav — the meadow strip cut from the scene, carrying      */
/*      flowers + walking cat + the nav text; sticky at the top        */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

.zu-root {
  --spruce: #2e4632;
  --leaf: #4c7a4f;
  --sage: #8fae8b;
  --paper: #f7f9f3;
  --card: #ffffff;
  --line: #e5eae0;
  --soil: #7d5a3c;
  --ochre: #c08a3e;
  --ink: #26332a;
  --muted: #66755f;
  --meadow: #5d8a58;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--ink);
  background: var(--paper);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.zu-display { font-family: 'Outfit', system-ui, sans-serif; }

/* ---------- animations ---------- */
@keyframes zu-cloud-a { from { transform: translateX(-220px); } to { transform: translateX(1420px); } }
@keyframes zu-cloud-b { from { transform: translateX(-360px); } to { transform: translateX(1420px); } }
@keyframes zu-bird    { 0% { transform: translate(-80px, 30px); } 100% { transform: translate(1350px, -25px); } }
@keyframes zu-bird2   { 0% { transform: translate(-140px, 10px); } 100% { transform: translate(1350px, 25px); } }
@keyframes zu-cat     {
  0%   { transform: translateX(-90px) scaleX(1); }
  46%  { transform: translateX(1290px) scaleX(1); }
  50%  { transform: translateX(1290px) scaleX(-1); }
  96%  { transform: translateX(-90px) scaleX(-1); }
  100% { transform: translateX(-90px) scaleX(1); }
}
@keyframes zu-tailwag { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(9deg);} }
@keyframes zu-sway    { 0%,100% { transform: rotate(-2deg);} 50% { transform: rotate(2deg);} }

.zu-cloud-a { animation: zu-cloud-a 85s linear infinite; }
.zu-cloud-b { animation: zu-cloud-b 115s linear infinite; animation-delay: -40s; }
.zu-bird    { animation: zu-bird 38s linear infinite; }
.zu-bird2   { animation: zu-bird2 47s linear infinite; animation-delay: -18s; }
.zu-cat     { animation: zu-cat 70s linear infinite; }
.zu-tail    { animation: zu-tailwag 1.6s ease-in-out infinite; transform-origin: 2px 10px; }
.zu-flower  { animation: zu-sway 5s ease-in-out infinite; transform-origin: bottom center; }

@media (prefers-reduced-motion: reduce) {
  .zu-cloud-a, .zu-cloud-b, .zu-bird, .zu-bird2, .zu-cat, .zu-tail, .zu-flower { animation: none; }
}

/* ---------- generic ---------- */
.zu-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
}

/* the meadow strip = nav, sticky */
.zu-strip {
  position: sticky; top: 0; z-index: 30;
  height: 56px;
  background: var(--meadow);
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(38, 51, 42, 0.18);
}
.zu-strip-nav {
  position: absolute; inset: 0;
  display: flex; justify-content: center; align-items: center;
  flex-wrap: wrap; gap: 0.25rem;
}
.zu-navlink {
  font-family: 'Outfit', sans-serif;
  font-weight: 600; font-size: 0.95rem; color: #f2f7ee;
  text-shadow: 0 1px 5px rgba(24, 38, 26, 0.55);
  padding: 0.35rem 0.95rem; border-radius: 999px; cursor: pointer;
  transition: background 0.15s;
  background: transparent; border: none;
}
.zu-navlink:hover { background: rgba(255,255,255,0.16); }
.zu-navlink.active { background: #f3f6ee; color: var(--spruce); text-shadow: none; }

.zu-pill {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
  padding: 0.18rem 0.6rem; border-radius: 999px; text-transform: uppercase;
}
.zu-eyebrow {
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--leaf);
}
`;

/* ------------------------------------------------------------------ */
/*  Shared drawing bits                                                 */
/* ------------------------------------------------------------------ */

function Flower({ x, y, color, delay = 0, s = 1 }) {
  return (
    <g className="zu-flower" style={{ animationDelay: `${delay}s` }} transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1="0" y1="0" x2="0" y2="-16" stroke="#3f6a44" strokeWidth="1.6" />
      <circle cx="0" cy="-19" r="4.5" fill={color} />
      <circle cx="0" cy="-19" r="1.7" fill="#f6e8b8" />
    </g>
  );
}

function Tree({ x, y, s = 1, canopy = "#4c7a4f" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-8" width="8" height="26" rx="2" fill="#6e4f33" />
      <circle cx="0" cy="-30" r="26" fill={canopy} />
      <circle cx="-18" cy="-18" r="17" fill={canopy} />
      <circle cx="18" cy="-18" r="17" fill={canopy} />
    </g>
  );
}

function Bird({ cls }) {
  return (
    <g className={cls}>
      <path d="M0 60 q6 -7 12 0 q6 -7 12 0" stroke="#3a4d3e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  1) SkyScene — scrolls away with the page                            */
/* ------------------------------------------------------------------ */

function SkyScene({ compact = false }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: compact ? 200 : 290, background: "linear-gradient(#e2eff2 0%, #ebf3e6 75%, #e2edda 100%)" }}>
      <svg viewBox="0 0 1200 290" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <circle cx="150" cy="66" r="34" fill="#f5e6a8" opacity="0.9" />
        <circle cx="150" cy="66" r="48" fill="#f5e6a8" opacity="0.25" />

        <g className="zu-cloud-a" opacity="0.9">
          <ellipse cx="0" cy="62" rx="46" ry="15" fill="#ffffff" />
          <ellipse cx="30" cy="52" rx="30" ry="13" fill="#ffffff" />
        </g>
        <g className="zu-cloud-b" opacity="0.75">
          <ellipse cx="0" cy="104" rx="58" ry="16" fill="#ffffff" />
          <ellipse cx="38" cy="94" rx="34" ry="13" fill="#ffffff" />
        </g>

        <Bird cls="zu-bird" />
        <Bird cls="zu-bird2" />

        {/* far + near hills, filling down to the strip seam */}
        <path d="M0 205 Q 200 158 420 196 T 820 190 T 1200 200 L 1200 290 L 0 290 Z" fill="#a8c49b" />
        <path d="M0 240 Q 260 202 520 234 T 1200 230 L 1200 290 L 0 290 Z" fill="#7ba377" />

        <Tree x={205} y={236} s={0.95} canopy="#557f52" />
        <Tree x={315} y={244} s={0.7} canopy="#4c7a4f" />
        <Tree x={905} y={238} s={1.0} canopy="#557f52" />
        <Tree x={1010} y={246} s={0.65} canopy="#476f4a" />

        <g transform="translate(600 242)">
          <rect x="-62" y="-52" width="124" height="52" rx="3" fill="#f2e7d0" stroke="#c9b28c" strokeWidth="1.5" />
          <polygon points="-72,-52 72,-52 0,-102" fill="#8a5a38" />
          <rect x="26" y="-96" width="13" height="26" fill="#6e4630" />
          <rect x="-12" y="-30" width="24" height="30" rx="2" fill="#6e4a30" />
          <rect x="-46" y="-40" width="18" height="16" rx="2" fill="#cfe3ea" stroke="#8a6a48" strokeWidth="1.5" />
          <rect x="28" y="-40" width="18" height="16" rx="2" fill="#cfe3ea" stroke="#8a6a48" strokeWidth="1.5" />
        </g>

        {/* thin meadow onset so the seam to the strip reads naturally */}
        <path d="M0 290 L0 272 Q 300 262 600 270 T 1200 268 L 1200 290 Z" fill="#5d8a58" />
      </svg>

      <div className="absolute inset-x-0 flex flex-col items-center text-center px-4 pointer-events-none" style={{ top: compact ? 26 : 40 }}>
        <h1 className="zu-display" style={{ fontSize: compact ? "1.9rem" : "2.6rem", fontWeight: 700, color: "#2e4632", letterSpacing: "-0.015em" }}>
          Zahradnictví Úsilné
        </h1>
        <p style={{ color: "#48604c", fontWeight: 600, fontSize: "0.92rem", marginTop: 4, letterSpacing: "0.02em" }}>
          Kde se cítíte jako doma
        </p>
      </div>

      <div className="absolute top-2 right-3 text-xs px-2 py-1 rounded-md"
           style={{ background: "rgba(255,255,255,0.75)", color: "#5a6b58", border: "1px dashed #9db497" }}>
        ✏️ zástupná ilustrace — nahradí ji vaše kresba z Procreate
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2) MeadowNav — the strip cut from the scene; sticky nav             */
/* ------------------------------------------------------------------ */

function MeadowNav({ nav, active, onGo }) {
  return (
    <div className="zu-strip">
      <svg viewBox="0 0 1200 56" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* meadow body with a soft darker base */}
        <rect x="0" y="0" width="1200" height="56" fill="#5d8a58" />
        <path d="M0 56 L0 44 Q 300 38 600 44 T 1200 42 L 1200 56 Z" fill="#54804f" />

        {/* flowers along the strip */}
        <Flower x={70}   y={54} color="#d98ca6" delay={0}   s={0.85} />
        <Flower x={140}  y={56} color="#e9d26a" delay={1.2} s={0.7} />
        <Flower x={250}  y={54} color="#b48ecb" delay={0.6} s={0.8} />
        <Flower x={360}  y={56} color="#e6eef0" delay={2.1} s={0.7} />
        <Flower x={455}  y={54} color="#d98ca6" delay={1.6} s={0.8} />
        <Flower x={740}  y={54} color="#e9d26a" delay={0.4} s={0.8} />
        <Flower x={845}  y={56} color="#b48ecb" delay={2.4} s={0.7} />
        <Flower x={955}  y={54} color="#d98ca6" delay={1.0} s={0.8} />
        <Flower x={1065} y={56} color="#e6eef0" delay={0.2} s={0.7} />
        <Flower x={1140} y={54} color="#e9d26a" delay={1.8} s={0.8} />

        {/* the cat keeps walking across the nav */}
        <g className="zu-cat">
          <g transform="translate(0 30)">
            <ellipse cx="14" cy="6" rx="15" ry="7" fill="#3a3530" />
            <circle cx="30" cy="-2" r="6" fill="#3a3530" />
            <polygon points="26,-6 28,-12 31,-6" fill="#3a3530" />
            <polygon points="31,-6 34,-12 36,-6" fill="#3a3530" />
            <path className="zu-tail" d="M0 4 q -9 -4 -8 -14" stroke="#3a3530" strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <line x1="7" y1="12" x2="7" y2="18" stroke="#3a3530" strokeWidth="3" strokeLinecap="round" />
            <line x1="21" y1="12" x2="21" y2="18" stroke="#3a3530" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      </svg>

      <nav className="zu-strip-nav">
        {nav.map((item) => (
          <button key={item.id} className={`zu-navlink ${active === item.id ? "active" : ""}`} onClick={() => onGo(item)}>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content blocks                                                     */
/* ------------------------------------------------------------------ */

const NEWS_STYLES = {
  novinka:  { label: "Novinka",  bg: "#e7f0e2", fg: "#3c6b40", bar: "#4c7a4f" },
  vyprodej: { label: "Výprodej", bg: "#f7eeda", fg: "#8a6222", bar: "#c08a3e" },
  sezonni:  { label: "Sezónní",  bg: "#f0e8de", fg: "#6e4f33", bar: "#7d5a3c" },
};

const NEWS = [
  {
    style: "vyprodej",
    date: "1. 7. 2026",
    title: "Letní výprodej sadby",
    text: "Rajčata 5 Kč/kus, feferonky 20 Kč, muškáty a voděnky po 10 Kč/kus. Přijďte, dokud zásoby stačí!",
    photos: ["🍅", "🌶️", "🌸"],
  },
  {
    style: "novinka",
    date: "28. 6. 2026",
    title: "Letní otevírací doba od 7. 7.",
    text: "Po–pá 8:00–16:30, sobota 8:00–12:00. Neděle a svátky zavřeno. Mimo otevírací dobu po telefonické domluvě.",
    photos: [],
  },
  {
    style: "sezonni",
    date: "25. 11. 2025",
    title: "Prodej vánočních stromků ve dvoře",
    text: "Jedle, smrky a borovice z jihočeských plantáží. Rádi vám stromek zabalíme do sítě.",
    photos: ["🌲"],
  },
];

function PhotoStrip({ photos }) {
  if (!photos.length) return null;
  return (
    <div className="flex gap-2 mt-3">
      {photos.map((p, i) => (
        <div key={i} className="flex items-center justify-center rounded-lg"
             style={{ width: 74, height: 56, background: "linear-gradient(135deg,#e3eedb,#cfe0c6)", fontSize: "1.4rem" }}
             title="Fotka — nahraje redaktor">
          {p}
        </div>
      ))}
    </div>
  );
}

function NewsCard({ item }) {
  const s = NEWS_STYLES[item.style];
  return (
    <article className="zu-card overflow-hidden">
      <div style={{ height: 4, background: s.bar }} />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="zu-pill" style={{ background: s.bg, color: s.fg }}>{s.label}</span>
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>{item.date}</span>
        </div>
        <h3 className="zu-display mt-2" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--spruce)" }}>{item.title}</h3>
        <p className="mt-1 leading-relaxed" style={{ fontSize: "0.94rem" }}>{item.text}</p>
        <PhotoStrip photos={item.photos} />
      </div>
    </article>
  );
}

function GhostAddCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl p-6 text-center"
         style={{ border: "1.5px dashed #b3c6ab", color: "#6d8069", minHeight: 140 }}>
      <div className="zu-display" style={{ fontSize: "1.5rem", fontWeight: 600 }}>＋</div>
      <p className="font-semibold mt-1 zu-display">Přidat aktualitu</p>
      <p className="text-sm mt-1">Redaktor vyplní formulář: nadpis, text, fotky a vybere styl (novinka / výprodej / sezónní).</p>
    </div>
  );
}

function Hours({ withNote = true }) {
  return (
    <div className="zu-card p-5">
      <p className="zu-eyebrow">Otevírací doba</p>
      <table className="w-full mt-3 text-sm" style={{ borderCollapse: "collapse" }}>
        <tbody>
          {[["pondělí – pátek", "8:00 – 16:30"], ["sobota", "8:00 – 12:00"], ["neděle a svátky", "zavřeno"]].map(([d, h]) => (
            <tr key={d} style={{ borderBottom: "1px solid #eef2ea" }}>
              <td className="py-2 font-medium">{d}</td>
              <td className="py-2 text-right zu-display" style={{ color: h === "zavřeno" ? "#a15b4a" : "var(--leaf)", fontWeight: 600 }}>{h}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {withNote && (
        <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>
          Mimo otevírací dobu po telefonické domluvě.<br />
          <span style={{ opacity: 0.7 }}>✎ texty i časy upraví redaktor v administraci</span>
        </p>
      )}
    </div>
  );
}

function ContactCard() {
  return (
    <div className="zu-card p-5">
      <p className="zu-eyebrow">Kontakt</p>
      <p className="mt-3 text-sm leading-relaxed">
        <strong>Úsilné 9, 370 10 Úsilné</strong><br />
        u Českých Budějovic
      </p>
      <p className="mt-3 text-sm leading-relaxed" style={{ lineHeight: 2 }}>
        <a href="tel:732264647" className="font-semibold" style={{ color: "var(--leaf)" }}>732 264 647</a><br />
        <a href="mailto:marie.sulcova@volny.cz" className="font-semibold" style={{ color: "var(--leaf)" }}>marie.sulcova@volny.cz</a><br />
        <a className="font-semibold" style={{ color: "var(--leaf)", cursor: "pointer" }}>Facebook — Zahradnictví Úsilné</a>
      </p>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div className="zu-card flex items-center justify-center relative overflow-hidden" style={{ minHeight: 220 }}>
      <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(45deg,#eef3e8,#eef3e8 14px,#e7edde 14px,#e7edde 28px)" }} />
      <div className="relative text-center px-4">
        <p className="zu-display font-semibold" style={{ color: "var(--spruce)", fontSize: "1.05rem" }}>Mapa — Zahradnictví Úsilné</p>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>vloží se Google Maps na ostrém webu</p>
      </div>
    </div>
  );
}

function About({ full = false }) {
  return (
    <div className="zu-card p-6">
      <p className="text-sm leading-relaxed" style={{ fontSize: "0.97rem" }}>
        Jsme malé rodinné zahradnictví v obci Úsilné u Českých Budějovic. Pěstujeme sadbu zeleniny,
        balkónové květiny, trvalky i bylinky — a rádi poradíme, co se bude dařit právě u vás.
      </p>
      {full && (
        <>
          <div className="grid gap-3 mt-5 sm:grid-cols-3">
            {["🏡", "🌱", "🐈"].map((e, i) => (
              <div key={i} className="flex items-center justify-center rounded-lg"
                   style={{ height: 110, background: "linear-gradient(135deg,#e3eedb,#cfe0c6)", fontSize: "2rem" }}
                   title="Fotka — doplní se">
                {e}
              </div>
            ))}
          </div>
          <p className="text-sm mt-4" style={{ color: "var(--muted)" }}>
            ✎ sem patří delší text s historií zahradnictví a fotky dvora, skleníků — a třeba i koček, které se u nás procházejí
          </p>
        </>
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, children }) {
  return (
    <div>
      {eyebrow && <p className="zu-eyebrow">{eyebrow}</p>}
      <h2 className="zu-display" style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--spruce)", letterSpacing: "-0.01em", marginTop: eyebrow ? 2 : 0 }}>
        {children}
      </h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-sm" style={{ background: "var(--spruce)", color: "#dce9d2" }}>
      © 2026 Zahradnictví Úsilné
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Pages                                                              */
/* ------------------------------------------------------------------ */

function HomePage() {
  return (
    <div className="grid gap-10">
      <section id="aktuality" style={{ scrollMarginTop: 72 }}>
        <SectionTitle eyebrow="Co je u nás nového">Aktuality</SectionTitle>
        <div className="grid gap-4 mt-5">
          {NEWS.map((n, i) => <NewsCard key={i} item={n} />)}
          <GhostAddCard />
        </div>
      </section>

      <section id="doba" style={{ scrollMarginTop: 72 }}>
        <SectionTitle eyebrow="Kdy k nám">Otevírací doba</SectionTitle>
        <div className="mt-5 max-w-lg"><Hours /></div>
      </section>

      <section id="kontakt" style={{ scrollMarginTop: 72 }}>
        <SectionTitle eyebrow="Kde nás najdete">Kontakt</SectionTitle>
        <div className="grid gap-4 mt-5 md:grid-cols-2">
          <ContactCard />
          <MapPlaceholder />
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <section>
      <SectionTitle eyebrow="Naše zahradnictví">O nás</SectionTitle>
      <div className="mt-5"><About full /></div>
    </section>
  );
}

function SortimentPage() {
  return (
    <section>
      <SectionTitle eyebrow="Co u nás najdete">Sortiment</SectionTitle>
      <div className="grid gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3">
        {[["🍅", "Sadba zeleniny", "rajčata, papriky, feferonky, saláty…"],
          ["🌸", "Balkónové květiny", "muškáty, voděnky, surfinie…"],
          ["🌿", "Bylinky", "bazalka, máta, rozmarýn…"],
          ["🌷", "Trvalky", "do záhonů i skalek"],
          ["🌲", "Vánoční stromky", "sezónně, ve dvoře"],
          ["🧺", "Substráty a doplňky", "zemina, hnojiva, květináče"]].map(([icon, t, d]) => (
          <div key={t} className="zu-card p-5">
            <div style={{ fontSize: "1.5rem" }}>{icon}</div>
            <p className="zu-display mt-2" style={{ fontWeight: 600, color: "var(--spruce)" }}>{t}</p>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{d}</p>
          </div>
        ))}
      </div>
      <p className="text-sm mt-4" style={{ color: "var(--muted)" }}>✎ kategorie a popisky upraví redaktor v administraci</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: "aktuality", label: "Aktuality",      page: "domu", anchor: "aktuality" },
  { id: "doba",      label: "Otevírací doba", page: "domu", anchor: "doba" },
  { id: "kontakt",   label: "Kontakt",        page: "domu", anchor: "kontakt" },
  { id: "onas",      label: "O nás",          page: "onas" },
  { id: "sortiment", label: "Sortiment",      page: "sortiment" },
];

export default function App() {
  const [page, setPage] = useState("domu");
  const [active, setActive] = useState("aktuality");

  const go = (item) => {
    setActive(item.id);
    setPage(item.page);
    if (item.anchor) {
      requestAnimationFrame(() => {
        document.getElementById(item.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    }
  };

  return (
    <div className="zu-root">
      <style>{CSS}</style>

      {/* sky scene scrolls away; clicking it returns home from subpages */}
      <div style={{ cursor: page !== "domu" ? "pointer" : "default" }}
           title={page !== "domu" ? "Zpět na úvod" : undefined}
           onClick={() => { if (page !== "domu") go(NAV[0]); }}>
        <SkyScene compact={page !== "domu"} />
      </div>

      {/* the meadow strip: part of the illustration, stays pinned on scroll */}
      <MeadowNav nav={NAV} active={active} onGo={go} />

      <main className="max-w-4xl mx-auto px-4 pt-9 pb-4">
        {page === "domu" && <HomePage />}
        {page === "onas" && <AboutPage />}
        {page === "sortiment" && <SortimentPage />}
      </main>
      <Footer />
    </div>
  );
}
