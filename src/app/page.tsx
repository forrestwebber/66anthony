"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Property Data ─────────────────────────────────────────── */
const PROPERTY = {
  address: "66 Anthony Street",
  city: "Austin",
  state: "TX",
  zip: "78702",
  tagline: "Modern Living in the Heart of Austin",
  price: "Contact for Pricing",
  beds: 3,
  baths: 2,
  sqft: "1,850",
  yearBuilt: 2024,
  lot: "5,200 sq ft",
  type: "Single Family",
  description:
    "A stunning contemporary residence designed for the modern homeowner. 66 Anthony Street blends clean architectural lines with warm, livable interiors — featuring soaring ceilings, chef-grade finishes, and seamless indoor-outdoor flow.",
  extendedDescription:
    "Situated on a tree-lined block in one of Austin's most sought-after neighborhoods, this home offers both privacy and walkability to the best dining, shopping, and nightlife the city has to offer. Every detail has been carefully considered — from the hand-selected materials to the orientation of each window for optimal natural light.",
  highlights: [
    { title: "Open-Concept Living", desc: "10-foot ceilings and white oak hardwood floors throughout", icon: "✦" },
    { title: "Designer Kitchen", desc: "Quartz countertops, Thermador appliances, and waterfall island", icon: "◆" },
    { title: "Primary Suite", desc: "Spa bath, rainfall shower, and custom walk-in closet", icon: "◇" },
    { title: "Outdoor Living", desc: "Covered patio with built-in grill and string-light pergola", icon: "▣" },
    { title: "Smart Home", desc: "Energy-efficient with Nest integration throughout", icon: "◈" },
    { title: "EV Ready", desc: "Two-car garage with Level 2 EV charging capability", icon: "⬡" },
  ],
};

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85", alt: "Modern home exterior with clean lines", label: "Exterior" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85", alt: "Open concept living room", label: "Living Room" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85", alt: "Modern kitchen with island", label: "Kitchen" },
  { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=85", alt: "Primary bedroom", label: "Primary Suite" },
  { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85", alt: "Spa-like bathroom", label: "Bath" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85", alt: "Backyard patio", label: "Outdoor Living" },
];

const FLOOR_PLAN_ROOMS = [
  { name: "Living & Dining", sqft: "480", level: "Main" },
  { name: "Kitchen", sqft: "220", level: "Main" },
  { name: "Primary Suite", sqft: "340", level: "Upper" },
  { name: "Bedroom 2", sqft: "180", level: "Upper" },
  { name: "Bedroom 3", sqft: "160", level: "Upper" },
  { name: "Primary Bath", sqft: "120", level: "Upper" },
  { name: "Guest Bath", sqft: "85", level: "Main" },
  { name: "Garage (2-car)", sqft: "440", level: "Main" },
];

/* ── Hooks ─────────────────────────────────────────────────── */
function useIntersection(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Reusable Components ───────────────────────────────────── */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, visible } = useIntersection();
  return (
    <section id={id} ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] tracking-[0.35em] uppercase text-amber-500 mb-4 font-semibold">{children}</p>;
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight ${className}`}>{children}</h2>;
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{children}</span>;
}

/* ── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ images, index, onClose }: { images: typeof GALLERY_IMAGES; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, next, prev]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Close">✕</button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-white/60 hover:text-white text-3xl z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Previous">‹</button>
      <div className="relative w-[90vw] h-[80vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <Image src={images[current].src} alt={images[current].alt} fill className="object-contain" sizes="90vw" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium">
          {images[current].label} &middot; {current + 1} / {images.length}
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-white/60 hover:text-white text-3xl z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Next">›</button>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFloorLevel, setActiveFloorLevel] = useState("Main");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#features", label: "Features" },
    { href: "#gallery", label: "Gallery" },
    { href: "#floorplan", label: "Floor Plan" },
    { href: "#neighborhood", label: "Location" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased">
      {/* Lightbox */}
      {lightboxIndex !== null && <Lightbox images={GALLERY_IMAGES} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />}

      {/* ─── Navigation ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-neutral-950/90 backdrop-blur-xl shadow-2xl shadow-black/20 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-white text-xl font-bold tracking-tight group">
            66 <span className="font-light text-white/70 group-hover:text-amber-400 transition-colors">Anthony</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[13px] font-medium tracking-wide text-white/50 hover:text-white transition-colors duration-200 uppercase">
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden md:inline-block text-[13px] font-semibold bg-amber-500 text-neutral-950 px-6 py-2.5 rounded-full hover:bg-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25">
            Schedule Tour
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-white/5 animate-slide-down">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-3 text-sm uppercase tracking-wide border-b border-white/5 last:border-0">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-center bg-amber-500 text-neutral-950 font-semibold py-3.5 rounded-xl mt-4">
                Schedule Tour
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
          alt="66 Anthony Street - Luxury Home Exterior"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/10 to-neutral-950" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-28 px-6 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 text-[11px] tracking-[0.3em] uppercase px-5 py-2.5 rounded-full mb-8 font-medium">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              {PROPERTY.city}, {PROPERTY.state} &middot; {PROPERTY.type}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.92] mb-5 tracking-tight">
              {PROPERTY.address}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-xl mb-12">
              {PROPERTY.tagline}
            </p>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-in-up animation-delay-400 flex flex-wrap items-center glass rounded-2xl w-fit">
            {[
              { label: "Bedrooms", value: PROPERTY.beds },
              { label: "Bathrooms", value: PROPERTY.baths },
              { label: "Sq Ft", value: PROPERTY.sqft },
              { label: "Year Built", value: PROPERTY.yearBuilt },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center px-6 md:px-10 py-6 ${i < 3 ? "border-r border-white/10" : ""}`}>
                <div className="text-2xl md:text-3xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── Overview ─── */}
      <Section id="overview" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionLabel>About the Property</SectionLabel>
              <SectionTitle className="text-white mb-8">
                Where Design Meets <GradientText>Lifestyle</GradientText>
              </SectionTitle>
              <p className="text-lg text-neutral-400 leading-relaxed mb-6">{PROPERTY.description}</p>
              <p className="text-base text-neutral-500 leading-relaxed mb-12">{PROPERTY.extendedDescription}</p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Property Type", value: PROPERTY.type },
                  { label: "Lot Size", value: PROPERTY.lot },
                  { label: "Living Space", value: `${PROPERTY.sqft} sq ft` },
                  { label: "Pricing", value: PROPERTY.price },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-xl p-5 hover:bg-white/[0.08] transition-all duration-300 group">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1.5">{item.label}</div>
                    <div className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Modern interior living space"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-500/5 rounded-3xl -z-10 animate-float" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500/5 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Features ─── */}
      <Section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>Curated Details</SectionLabel>
            <SectionTitle className="text-white">
              Designed for <GradientText>Modern Living</GradientText>
            </SectionTitle>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROPERTY.highlights.map((highlight, i) => (
              <div key={i} className="group glass rounded-2xl p-8 hover:bg-white/[0.08] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg mb-6 group-hover:bg-amber-500/20 transition-colors">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{highlight.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Gallery ─── */}
      <Section id="gallery" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Visual Tour</SectionLabel>
            <SectionTitle className="text-white">Step Inside</SectionTitle>
            <p className="text-neutral-500 mt-5 text-lg">Click any image for a closer look</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ring-1 ring-white/5 hover:ring-amber-500/30 transition-all duration-500 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-sm font-medium tracking-wide bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    {img.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Floor Plan ─── */}
      <Section id="floorplan" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Space Planning</SectionLabel>
            <SectionTitle className="text-white mb-6">
              Room by <GradientText>Room</GradientText>
            </SectionTitle>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              {PROPERTY.sqft} square feet of thoughtfully designed living space across two levels.
            </p>
          </div>

          {/* Level tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {["Main", "Upper"].map((level) => (
              <button
                key={level}
                onClick={() => setActiveFloorLevel(level)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFloorLevel === level
                    ? "bg-amber-500 text-neutral-950"
                    : "glass text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {level} Level
              </button>
            ))}
          </div>

          {/* Room cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FLOOR_PLAN_ROOMS.filter((r) => r.level === activeFloorLevel).map((room, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300 text-center group">
                <div className="text-3xl font-light text-white mb-2 group-hover:text-amber-400 transition-colors">{room.sqft}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-1">sq ft</div>
                <div className="text-sm font-medium text-neutral-300 mt-3">{room.name}</div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 glass rounded-2xl p-8 text-center animate-pulse-glow">
            <div className="text-[10px] tracking-[0.3em] uppercase text-amber-500/70 mb-2">Total Living Space</div>
            <div className="text-4xl md:text-5xl font-bold text-white">{PROPERTY.sqft} <span className="text-lg font-light text-neutral-500">sq ft</span></div>
          </div>
        </div>
      </Section>

      {/* ─── Neighborhood ─── */}
      <Section id="neighborhood" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionLabel>Neighborhood</SectionLabel>
              <SectionTitle className="text-white mb-8">
                Austin&apos;s <GradientText>Finest</GradientText>
              </SectionTitle>
              <p className="text-lg text-neutral-400 leading-relaxed mb-10">
                Located in one of Austin&apos;s most dynamic neighborhoods, 66 Anthony Street puts you minutes
                from world-class dining on Rainey Street, the energy of South Congress, and the trails along
                Lady Bird Lake.
              </p>

              <div className="space-y-0">
                {[
                  { place: "Downtown Austin", time: "8 min", type: "drive" },
                  { place: "Austin-Bergstrom Airport", time: "15 min", type: "drive" },
                  { place: "Lady Bird Lake Trail", time: "5 min", type: "walk" },
                  { place: "South Congress Ave", time: "10 min", type: "drive" },
                  { place: "UT Austin Campus", time: "12 min", type: "drive" },
                  { place: "Domain NORTHSIDE", time: "20 min", type: "drive" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-white/80 flex-1 group-hover:text-white transition-colors">{item.place}</span>
                    <span className="text-xs text-neutral-500 glass px-3 py-1.5 rounded-full">{item.time} {item.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-square relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80"
                alt="Austin Texas cityscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl px-6 py-4">
                  <div className="text-white font-semibold">East Austin, TX 78702</div>
                  <div className="text-neutral-400 text-sm">One of the fastest-growing zip codes in the nation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Contact / CTA ─── */}
      <Section id="contact" className="relative py-32 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="Beautiful home interior"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="text-white">
              <SectionLabel>Your Next Home</SectionLabel>
              <SectionTitle className="mb-6">
                Ready to Experience <GradientText>66 Anthony?</GradientText>
              </SectionTitle>
              <p className="text-lg text-white/50 mb-12 leading-relaxed">
                Schedule a private showing and discover why this is one of Austin&apos;s most coveted addresses.
                Our team is available 7 days a week.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                    label: "Email",
                    value: "hello@slacked.co",
                    href: "mailto:hello@slacked.co",
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                    label: "Phone",
                    value: "(512) 555-1234",
                    href: "tel:+15125551234",
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                    label: "Address",
                    value: `${PROPERTY.address}, ${PROPERTY.city}, ${PROPERTY.state}`,
                    href: "#",
                  },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">{contact.icon}</svg>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-0.5">{contact.label}</div>
                      <a href={contact.href} className="text-white hover:text-amber-400 transition-colors font-medium">{contact.value}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="glass rounded-3xl p-8 md:p-10">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tour Requested!</h3>
                  <p className="text-white/50">We&apos;ll be in touch within 24 hours to schedule your private showing.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-1">Request a Private Tour</h3>
                  <p className="text-neutral-500 text-sm mb-8">Fill out the form and we&apos;ll reach out within 24 hours.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all" />
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all" />
                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all" />
                    <textarea placeholder="When would you like to visit?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all resize-none" />
                    <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/20 text-sm tracking-wide uppercase">
                      Schedule My Tour
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Footer ─── */}
      <footer className="bg-neutral-950 border-t border-white/5 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold tracking-tight mb-1">
                66 <span className="font-light text-white/60">Anthony Street</span>
              </div>
              <div className="text-sm text-neutral-600">Austin, TX {PROPERTY.zip} &middot; {PROPERTY.type}</div>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-700">&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            <div className="flex items-center gap-3 glass rounded-full px-5 py-2.5">
              <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em]">Built by</span>
              <a href="https://slacked.co" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors">
                Slacked.co
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
