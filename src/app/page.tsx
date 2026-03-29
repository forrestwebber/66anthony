"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const PROPERTY = {
  address: "66 Anthony Street",
  city: "Austin",
  state: "TX",
  tagline: "Modern Living in the Heart of Austin",
  price: "Contact for Pricing",
  beds: 3,
  baths: 2,
  sqft: "1,850",
  yearBuilt: 2024,
  lot: "5,200 sq ft",
  type: "Single Family",
  description:
    "A stunning contemporary residence designed for the modern homeowner. 66 Anthony Street blends clean architectural lines with warm, livable interiors — featuring soaring ceilings, chef-grade finishes, and seamless indoor-outdoor flow. Situated on a tree-lined block in one of Austin's most sought-after neighborhoods, this home offers both privacy and walkability to the best dining, shopping, and nightlife the city has to offer.",
  highlights: [
    {
      title: "Open-Concept Living",
      desc: "10-foot ceilings and white oak hardwood floors throughout",
      icon: "🏠",
    },
    {
      title: "Designer Kitchen",
      desc: "Quartz countertops, Thermador appliances, and waterfall island",
      icon: "🍳",
    },
    {
      title: "Primary Suite",
      desc: "Spa bath, rainfall shower, and custom walk-in closet",
      icon: "🛏️",
    },
    {
      title: "Outdoor Living",
      desc: "Covered patio with built-in grill and string-light pergola",
      icon: "🌿",
    },
    {
      title: "Smart Home",
      desc: "Energy-efficient with Nest integration throughout",
      icon: "💡",
    },
    {
      title: "EV Ready",
      desc: "Two-car garage with EV charging capability",
      icon: "⚡",
    },
  ],
};

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
    alt: "Modern home exterior with clean lines",
    label: "Exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
    alt: "Open concept living room",
    label: "Living Room",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85",
    alt: "Modern kitchen with island",
    label: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=85",
    alt: "Primary bedroom",
    label: "Primary Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85",
    alt: "Spa-like bathroom",
    label: "Bath",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    alt: "Backyard patio",
    label: "Outdoor Living",
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, visible } = useIntersection();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: typeof GALLERY_IMAGES;
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10 w-12 h-12 flex items-center justify-center"
        aria-label="Close"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((c) => (c - 1 + images.length) % images.length);
        }}
        className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl z-10 w-14 h-14 flex items-center justify-center"
        aria-label="Previous"
      >
        ‹
      </button>

      <div
        className="relative w-[90vw] h-[80vh] max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
          {images[current].label} · {current + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((c) => (c + 1) % images.length);
        }}
        className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl z-10 w-14 h-14 flex items-center justify-center"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#features", label: "Features" },
    { href: "#gallery", label: "Gallery" },
    { href: "#neighborhood", label: "Location" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-neutral-900/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-black/20 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-white text-xl font-bold tracking-tight">
            66 <span className="font-light">Anthony</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-200 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-block text-sm font-semibold bg-white text-neutral-900 px-6 py-2.5 rounded-full hover:bg-amber-400 hover:text-neutral-900 transition-all duration-300"
          >
            Schedule Tour
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-neutral-900/95 backdrop-blur-lg border-t border-white/10 animate-slide-down">
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/80 hover:text-white py-2 text-sm uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-amber-500 text-white font-semibold py-3 rounded-xl mt-4"
              >
                Schedule Tour
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
          alt="66 Anthony Street - Luxury Home Exterior"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="inline-block bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-300 text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6 font-medium">
              {PROPERTY.city}, {PROPERTY.state} · {PROPERTY.type}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-4 tracking-tight">
              {PROPERTY.address}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-xl mb-10">
              {PROPERTY.tagline}
            </p>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-in-up animation-delay-400 flex flex-wrap items-center bg-white/10 backdrop-blur-md rounded-2xl w-fit divide-x divide-white/20 border border-white/10">
            {[
              { label: "Bedrooms", value: PROPERTY.beds },
              { label: "Bathrooms", value: PROPERTY.baths },
              { label: "Sq Ft", value: PROPERTY.sqft },
              { label: "Year Built", value: PROPERTY.yearBuilt },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6 md:px-8 py-5">
                <div className="text-2xl md:text-3xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Overview */}
      <Section id="overview" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-600 mb-4 font-semibold">
                About the Property
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Where Design Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  Lifestyle
                </span>
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed mb-10">
                {PROPERTY.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Property Type", value: PROPERTY.type },
                  { label: "Lot Size", value: PROPERTY.lot },
                  { label: "Living Space", value: `${PROPERTY.sqft} sq ft` },
                  { label: "Pricing", value: PROPERTY.price },
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-100 rounded-xl p-5 hover:bg-neutral-200/70 transition-colors">
                    <div className="text-[11px] text-neutral-400 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-lg font-semibold text-neutral-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Modern interior living space"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-500/10 rounded-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-neutral-900/5 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="py-28 px-6 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-4 font-semibold">
              Curated Details
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Designed for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Modern Living
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTY.highlights.map((highlight, i) => (
              <div
                key={i}
                className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-amber-500/20 transition-all duration-500"
              >
                <div className="text-3xl mb-5">{highlight.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{highlight.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-600 mb-4 font-semibold">
              Visual Tour
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              Step Inside
            </h2>
            <p className="text-neutral-400 mt-4 text-lg">Click any image for a closer look</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-sm font-medium tracking-wide bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                    {img.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Neighborhood */}
      <Section id="neighborhood" className="py-28 px-6 bg-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-600 mb-4 font-semibold">
                Neighborhood
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Austin&apos;s Finest
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed mb-8">
                Located in one of Austin&apos;s most dynamic neighborhoods, 66 Anthony Street puts you minutes
                from world-class dining on Rainey Street, the energy of South Congress, and the trails along
                Lady Bird Lake.
              </p>
              <div className="space-y-0">
                {[
                  { place: "Downtown Austin", time: "8 min drive", icon: "🏙️" },
                  { place: "Austin-Bergstrom Airport", time: "15 min drive", icon: "✈️" },
                  { place: "Lady Bird Lake Trail", time: "5 min walk", icon: "🌊" },
                  { place: "South Congress Ave", time: "10 min drive", icon: "🛍️" },
                  { place: "UT Austin Campus", time: "12 min drive", icon: "🎓" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-neutral-200 last:border-0"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-neutral-800 flex-1">{item.place}</span>
                    <span className="text-sm text-neutral-400 bg-neutral-200/60 px-3 py-1 rounded-full">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image
                src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80"
                alt="Austin Texas cityscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Contact / CTA */}
      <Section id="contact" className="relative py-32 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="Beautiful home interior"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - CTA text */}
            <div className="text-white">
              <p className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-4 font-semibold">
                Your Next Home
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Experience{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  66 Anthony?
                </span>
              </h2>
              <p className="text-lg text-white/60 mb-10">
                Schedule a private showing and discover why this is one of Austin&apos;s most coveted addresses.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-0.5">Email</div>
                    <a href="mailto:hello@slacked.co" className="text-white hover:text-amber-400 transition-colors font-medium">
                      hello@slacked.co
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-0.5">Phone</div>
                    <a href="tel:+15125551234" className="text-white hover:text-amber-400 transition-colors font-medium">
                      (512) 555-1234
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tour Requested!</h3>
                  <p className="text-white/60">We&apos;ll be in touch within 24 hours to schedule your private showing.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-6">Request a Private Tour</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="When would you like to visit?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/25 text-sm tracking-wide uppercase"
                    >
                      Schedule My Tour
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold tracking-tight mb-1">
                66 <span className="font-light">Anthony Street</span>
              </div>
              <div className="text-sm text-neutral-500">Austin, TX · {PROPERTY.type}</div>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                &copy; {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-full px-5 py-2.5 border border-white/10">
              <span className="text-xs text-neutral-500 uppercase tracking-wider">Built by</span>
              <a
                href="https://slacked.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Slacked.co
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
