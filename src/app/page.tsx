'use client'

import { useState, useEffect, useRef } from 'react';

const UNITS = [
  { name: "Unit A", beds: 4, baths: 3.5, sqft: 1680, levels: 2, feature: "Pool & Carport", price: "Starting from $825K" },
  { name: "Unit B", beds: 4, baths: 3.5, sqft: 1733, levels: 2, feature: "Pool & Carport", price: "Starting from $849K" },
  { name: "Unit C", beds: 2, baths: 2.5, sqft: 969, levels: 2, feature: "Private Deck", price: "Starting from $575K" },
];

const AMENITIES = [
  { name: "Lady Bird Lake & Trails", dist: "0.8 mi", icon: "🌊" },
  { name: "Suerte", dist: "0.5 mi", icon: "🍽" },
  { name: "Launderette", dist: "0.6 mi", icon: "🍸" },
  { name: "Justine's Brasserie", dist: "1.2 mi", icon: "🥂" },
  { name: "Downtown Austin", dist: "1.5 mi", icon: "🏙" },
  { name: "I-35 Access", dist: "0.3 mi", icon: "🛣" },
];

const FEATURES = [
  "Custom white oak cabinetry",
  "Quartz waterfall countertops",
  "European-style appliance package",
  "Polished concrete & hardwood floors",
  "Floor-to-ceiling glass walls",
  "Private pool with sun shelf",
  "Carport with EV charging prep",
  "Smart home pre-wired",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

export default function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) {
        setSubmitMessage('Thank you — we\'ll be in touch within 24 hours.');
        setName(''); setEmail(''); setPhone(''); setMessage('');
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const vision = useInView();
  const collection = useInView();
  const features = useInView();
  const locale = useInView();
  const contact = useInView();

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1310] font-sans selection:bg-[#1a1310] selection:text-[#fdfbf7]">

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-[#1a1310]/95 backdrop-blur-md shadow-2xl' : ''}`}>
        <a href="#" className="flex flex-col text-white">
          <span className="text-sm uppercase tracking-[0.25em] font-semibold">66 Anthony</span>
          <span className="text-[9px] uppercase tracking-[0.15em] opacity-60 mt-0.5">Oak Forest Modern Homes</span>
        </a>
        <div className="hidden md:flex gap-10 items-center">
          <a href="#vision" className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 hover:text-[#c2a07e] transition-colors">Vision</a>
          <a href="#collection" className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 hover:text-[#c2a07e] transition-colors">Residences</a>
          <a href="#features" className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 hover:text-[#c2a07e] transition-colors">Features</a>
          <a href="#locale" className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 hover:text-[#c2a07e] transition-colors">Location</a>
          <a href="#contact" className="text-[11px] uppercase tracking-[0.2em] font-medium bg-[#c2a07e] text-[#1a1310] rounded-full px-6 py-2.5 hover:bg-[#d4b896] transition-all">Schedule Tour</a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileMenuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1a1310]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 animate-fade-in">
          {['Vision', 'Residences', 'Features', 'Location'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif italic text-white hover:text-[#c2a07e] transition-colors">{item}</a>
          ))}
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-[0.2em] font-medium bg-[#c2a07e] text-[#1a1310] rounded-full px-8 py-3 mt-4">Schedule Tour</a>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden bg-[#1a1310]">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60" src="/media/generated-video.mp4" />
            <div className="absolute inset-0 video-gradient" />
          </div>

          <div className="relative z-10 px-6 md:px-12 pb-12">
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#c2a07e] font-bold animate-fade-up stagger-1">East Austin &mdash; New Construction</span>
            </div>
            <h1 className="text-[18vw] md:text-[14vw] leading-[0.8] font-light tracking-tighter uppercase font-serif text-white animate-fade-up stagger-2">
              66<br/>Anthony
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6 mt-8 text-white animate-fade-up stagger-3">
              <p className="max-w-sm text-[13px] font-light leading-relaxed text-white/80">
                Three luxury residences in the heart of East Austin. Designed with restraint, built with intention. <span className="text-[#c2a07e] font-medium">Now accepting inquiries.</span>
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50">From</span>
                  <span className="text-2xl font-serif italic text-[#c2a07e]">$575K</span>
                </div>
                <a href="#contact" className="text-[11px] uppercase tracking-[0.2em] font-medium border border-[#c2a07e] text-[#c2a07e] rounded-full px-6 py-3 hover:bg-[#c2a07e] hover:text-[#1a1310] transition-all">
                  Inquire Now
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-fade-in stagger-5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </section>

        {/* Vision / Intro */}
        <section id="vision" className="py-24 md:py-32 px-6 md:px-12 bg-[#fdfbf7]" ref={vision.ref}>
          <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 transition-all duration-1000 ${vision.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="lg:w-5/12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c2a07e] font-bold mb-8 block gold-line">The Vision</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light leading-[1.1] text-[#1a1310] mb-8">
                Architecture that <em className="italic text-[#c2a07e]">breathes</em>. Spaces that <em className="italic text-[#c2a07e]">endure</em>.
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-[#1a1310]/70 mb-8">
                66 Anthony is a collection of three meticulously crafted residences in East Austin&apos;s most coveted corridor. Each home balances raw materiality with refined luxury &mdash; think warm wood, polished concrete, and walls of glass that blur the boundary between indoors and out.
              </p>
              <p className="text-[15px] font-light leading-relaxed text-[#1a1310]/70">
                Developed by <strong className="font-medium text-[#1a1310]">Oak Forest Modern Homes</strong>, 66 Anthony represents a new standard for urban living in Austin &mdash; one where design, nature, and community converge.
              </p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[16/9] relative overflow-hidden bg-[#1a1310]">
                <video src="/media/generated-video (1).mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="aspect-square relative overflow-hidden bg-[#1a1310]">
                <video src="/media/generated-video (2).mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="aspect-square relative overflow-hidden bg-[#1a1310]">
                <video src="/media/generated-video (3).mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#1a1310] py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "3", label: "Residences" },
              { val: "969–1,733", label: "Square Feet" },
              { val: "2–4", label: "Bedrooms" },
              { val: "2026", label: "Completion" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-serif italic text-[#c2a07e]">{stat.val}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The Collection */}
        <section id="collection" className="py-24 md:py-32 bg-[#fdfbf7]" ref={collection.ref}>
          <div className={`px-6 md:px-12 mb-16 transition-all duration-1000 ${collection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c2a07e] font-bold mb-4 block">The Collection</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#1a1310]">Three Homes.<br/><em className="font-serif italic text-[#c2a07e]">One Vision.</em></h2>
              </div>
              <p className="max-w-sm text-sm font-light text-[#1a1310]/60 mt-6 md:mt-0 leading-relaxed">
                Each residence is unique in layout yet unified by an unwavering commitment to quality, light, and livability.
              </p>
            </div>
          </div>

          <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-6">
            {UNITS.map((unit, index) => (
              <div key={unit.name} className="bg-[#1a1310] rounded-2xl overflow-hidden group">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 h-[35vh] lg:h-[55vh] relative overflow-hidden">
                    <video src={`/media/generated-video (${index + 1}).mp4`} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute top-6 left-6">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#c2a07e] font-bold bg-[#1a1310]/80 backdrop-blur-sm rounded-full px-4 py-2">0{index + 1} / {unit.name}</span>
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between text-[#fdfbf7]">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif italic mb-2 text-white">{unit.name}</h3>
                      <p className="text-[#c2a07e] text-sm font-medium mb-8">{unit.price}</p>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="border-l-2 border-[#c2a07e]/30 pl-4">
                          <span className="text-2xl font-serif italic text-white">{unit.beds}</span>
                          <span className="text-[10px] uppercase tracking-widest text-white/50 block mt-1">Bedrooms</span>
                        </div>
                        <div className="border-l-2 border-[#c2a07e]/30 pl-4">
                          <span className="text-2xl font-serif italic text-white">{unit.baths}</span>
                          <span className="text-[10px] uppercase tracking-widest text-white/50 block mt-1">Bathrooms</span>
                        </div>
                        <div className="border-l-2 border-[#c2a07e]/30 pl-4">
                          <span className="text-2xl font-serif italic text-white">{unit.sqft.toLocaleString()}</span>
                          <span className="text-[10px] uppercase tracking-widest text-white/50 block mt-1">Sq. Ft.</span>
                        </div>
                        <div className="border-l-2 border-[#c2a07e]/30 pl-4">
                          <span className="text-2xl font-serif italic text-white">{unit.levels}</span>
                          <span className="text-[10px] uppercase tracking-widest text-white/50 block mt-1">Levels</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <span className="text-xs uppercase tracking-widest text-white/50">{unit.feature}</span>
                      <a href="#contact" className="text-[11px] uppercase tracking-[0.2em] font-medium border border-[#c2a07e]/50 text-[#c2a07e] rounded-full px-6 py-2.5 hover:bg-[#c2a07e] hover:text-[#1a1310] transition-all">
                        Inquire
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 md:py-32 bg-[#1a1310] text-[#fdfbf7]" ref={features.ref}>
          <div className={`px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000 ${features.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start mb-16">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c2a07e] font-bold mb-4 block">Finishes & Fixtures</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight">Curated <em className="font-serif italic text-[#c2a07e]">Details.</em></h2>
              </div>
              <p className="max-w-sm text-sm font-light text-white/50 mt-6 md:mt-0 leading-relaxed">
                Every material, every fixture, every angle has been considered. These aren&apos;t spec homes &mdash; they&apos;re statements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {FEATURES.map((feature, i) => (
                <div key={i} className="bg-[#1a1310] p-8 group hover:bg-white/5 transition-colors">
                  <span className="text-[10px] text-[#c2a07e] font-bold mb-4 block">0{i + 1}</span>
                  <p className="text-sm font-light text-white/80 group-hover:text-white transition-colors">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location / Amenities */}
        <section id="locale" className="py-24 md:py-32 px-6 md:px-12 bg-[#fdfbf7]" ref={locale.ref}>
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${locale.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c2a07e] font-bold mb-4 block gold-line">The Neighborhood</span>
              <h2 className="text-4xl md:text-6xl font-light mb-4 text-[#1a1310]">East Austin&apos;s <em className="font-serif italic text-[#c2a07e]">Best Block.</em></h2>
              <p className="text-sm font-light text-[#1a1310]/60 max-w-lg leading-relaxed">Steps from Lady Bird Lake, world-class dining, and Austin&apos;s most vibrant cultural scene. This is the neighborhood everyone wants to live in.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/5">
                <ul className="space-y-0">
                  {AMENITIES.map((amenity, i) => (
                    <li key={i} className="flex items-center justify-between py-5 border-b border-[#1a1310]/10 group hover:px-4 transition-all">
                      <div className="flex items-center gap-4">
                        <span className="text-lg">{amenity.icon}</span>
                        <span className="text-sm font-medium text-[#1a1310] group-hover:text-[#c2a07e] transition-colors">{amenity.name}</span>
                      </div>
                      <span className="text-[11px] uppercase tracking-widest text-[#c2a07e] font-bold">{amenity.dist}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-3/5 h-[50vh] lg:h-[60vh] relative overflow-hidden rounded-xl border border-[#1a1310]/10 bg-[#e8e6e1]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.932947246535!2d-97.716334984882!3d30.26620598179833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5c7e3e3135b%3A0x73c113554906a480!2s66%20Anthony%20St%2C%20Austin%2C%20TX%2078702!5e0!3m2!1sen!2sus!4v1678886473479!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ filter: 'grayscale(80%) contrast(110%)' }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-[#1a1310]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30" src="/media/generated-video.mp4" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-6">Your East Austin address awaits.</h2>
            <p className="text-white/60 text-sm font-light mb-8 max-w-md mx-auto">Limited to three residences. Schedule a private tour or request the full property brochure.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="text-[11px] uppercase tracking-[0.2em] font-medium bg-[#c2a07e] text-[#1a1310] rounded-full px-8 py-3.5 hover:bg-[#d4b896] transition-all">Schedule a Tour</a>
              <a href="/Anthony - SD 2026.03.13.pdf" target="_blank" className="text-[11px] uppercase tracking-[0.2em] font-medium border border-white/30 text-white rounded-full px-8 py-3.5 hover:bg-white hover:text-[#1a1310] transition-all">Download Brochure</a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#fdfbf7] py-24 md:py-32 px-6 md:px-12" ref={contact.ref}>
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${contact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c2a07e] font-bold mb-4 block gold-line">Get in Touch</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-[#1a1310]">
                  Interested in<br/><em className="font-serif italic text-[#c2a07e]">66 Anthony?</em>
                </h2>
                <p className="text-sm font-light text-[#1a1310]/60 max-w-md leading-relaxed mb-8">
                  Whether you&apos;re ready to schedule a private showing or simply want more information, we&apos;d love to hear from you. Our team responds within 24 hours.
                </p>
                <div className="space-y-4 text-sm text-[#1a1310]/70">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1a1310] rounded-full flex items-center justify-center text-[#c2a07e] text-xs">@</span>
                    <span>info@oakforestmodernhomes.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1a1310] rounded-full flex items-center justify-center text-[#c2a07e] text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11a3 3 0 106 0 3 3 0 00-6 0z"/><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                    </span>
                    <span>66 Anthony St, Austin, TX 78702</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <form onSubmit={handleSubmit} className="bg-[#1a1310] rounded-2xl p-8 md:p-12 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Full Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c2a07e]/50 transition-colors" placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Phone</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c2a07e]/50 transition-colors" placeholder="(512) 555-0123" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c2a07e]/50 transition-colors" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#c2a07e]/50 transition-colors resize-none" placeholder="I'm interested in scheduling a tour..." />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#c2a07e] text-[#1a1310] rounded-lg py-4 hover:bg-[#d4b896] transition-all disabled:opacity-50">
                    {submitting ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                  {submitMessage && <p className="text-[11px] text-center uppercase tracking-widest text-[#c2a07e]">{submitMessage}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1310] py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white">66 Anthony</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 mt-1">Oak Forest Modern Homes &bull; Austin, TX</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30">
              <span>&copy; {new Date().getFullYear()} Oak Forest Modern Homes</span>
              <span className="hidden md:inline">&bull;</span>
              <a href="https://slacked.co" target="_blank" rel="noopener noreferrer" className="text-[#c2a07e]/60 hover:text-[#c2a07e] transition-colors">
                Built by Slacked.co
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
