'use client'

import { useState } from 'react';

const UNITS = [
  { name: "Unit A", beds: 4, baths: 3.5, sqft: 1680, levels: 2, feature: "Pool & Carport" },
  { name: "Unit B", beds: 4, baths: 3.5, sqft: 1733, levels: 2, feature: "Pool & Carport" },
  { name: "Unit C", beds: 2, baths: 2.5, sqft: 969, levels: 2, feature: "Private Deck" },
];

const AMENITIES = [
  { name: "Lady Bird Lake & Trails", dist: "0.8 mi" },
  { name: "Suerte", dist: "0.5 mi" },
  { name: "Launderette", dist: "0.6 mi" },
  { name: "Justine's Brasserie", dist: "1.2 mi" },
  { name: "Downtown Austin", dist: "1.5 mi" },
];

export default function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSubmitMessage('Your inquiry has been received.');
        setName(''); setEmail(''); setMessage('');
      } else {
        setSubmitMessage('Transmission failed. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Transmission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1310] font-sans selection:bg-[#1a1310] selection:text-[#fdfbf7]">
      
      {/* Dark gradient overlay for nav contrast over video */}
      <div className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-[#1a1310]/80 to-transparent z-40 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-start pointer-events-none text-white">
        <div className="flex flex-col drop-shadow-md">
          <span className="text-xs uppercase tracking-[0.2em] font-medium mb-1"></span>
          <span className="text-[10px] uppercase tracking-[0.1em] opacity-80">Oak Forest Modern Homes</span>
        </div>
        <div className="hidden md:flex gap-12 pointer-events-auto drop-shadow-md">
          <a href="#vision" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-[#c2a07e] transition-colors">Vision</a>
          <a href="#collection" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-[#c2a07e] transition-colors">Residences</a>
          <a href="#locale" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-[#c2a07e] transition-colors">Locale</a>
        </div>
        <div className="text-right pointer-events-auto drop-shadow-md">
           <a href="#contact" className="text-xs uppercase tracking-[0.2em] font-medium border border-white/50 rounded-full px-6 py-3 hover:bg-white hover:text-[#1a1310] transition-all">Request Details</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[95vh] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden bg-[#1a1310]">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-70" src="/media/generated-video.mp4" />
            <div className="absolute inset-0 bg-[#1a1310]/30" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center mb-8 text-white">
             <h1 className="text-[15vw] leading-[0.75] font-light tracking-tighter uppercase font-serif w-full text-center drop-shadow-lg">
               Anthony
             </h1>
          </div>

          <div className="relative z-10 w-full flex justify-between items-end border-t border-white/20 pt-6 text-white">
            <p className="max-w-xs text-xs uppercase tracking-widest leading-relaxed drop-shadow-md">
              Spaces crafted with restraint, light, and deep presence. <br/><span className="text-[#c2a07e]">Not built to impress — built to endure.</span>
            </p>
            <div className="text-xs uppercase tracking-[0.3em] opacity-80 text-right drop-shadow-md">
              Austin, Texas
            </div>
          </div>
        </section>

        {/* Vision / Intro */}
        <section id="vision" className="py-32 px-6 md:px-12 bg-[#fdfbf7]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
            <div className="lg:w-1/3">
              <span className="text-[10px] uppercase tracking-[0.3em] border border-[#1a1310]/20 rounded-full px-4 py-2 inline-block mb-12 font-bold text-[#1a1310]">The Narrative</span>
              <p className="text-2xl md:text-4xl font-serif font-light leading-tight text-[#1a1310]">
                We design <em className="italic text-[#c2a07e]">atmospheres</em>, not just buildings. Our work is defined by material honesty and a <em className="italic text-[#c2a07e]">deep respect for nature.</em>
              </p>
            </div>
            
            <div className="lg:w-1/2 flex flex-col justify-between">
              <p className="text-sm font-light leading-relaxed max-w-md text-[#1a1310]/80 mb-12 lg:ml-auto">
                In a world overwhelmed by noise, we believe in the power of quiet architecture. Raw textures, sun-washed surfaces, and sculptural geometry create calm environments that serve as a moat against the ordinary.
              </p>
              
              <div className="w-full flex justify-end">
                <div className="w-3/4 aspect-[4/3] relative overflow-hidden bg-[#1a1310]/5 flex items-center justify-center border border-[#1a1310]/10">
                  <span className="text-xs uppercase tracking-widest opacity-40 font-medium">Rendering in Progress</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Collection (Dark Section) */}
        <section id="collection" className="py-32 bg-[#1a1310] text-[#fdfbf7]">
          <div className="px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-12">
             <h2 className="text-5xl md:text-7xl font-light tracking-tight">Timeless Residences. <br/><em className="font-serif italic text-[#c2a07e]">Singular Vision.</em></h2>
             <p className="max-w-sm text-xs font-light tracking-widest uppercase leading-loose text-white/60 mt-8 md:mt-0 text-right">
               A full range of architectural intent, with a focus on timeless minimalism and refined materiality.
             </p>
          </div>

          <div className="px-6 md:px-12">
            {UNITS.map((unit, index) => (
              <div key={unit.name} className="flex flex-col lg:flex-row gap-12 py-16 border-b border-white/10 group hover:bg-white/[0.02] transition-colors p-8 -mx-8 rounded-2xl">
                <div className="lg:w-1/4 flex flex-col justify-between">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#c2a07e] mb-8 block font-bold">0{index + 1} // {unit.name}</span>
                  <div>
                    <h3 className="text-3xl font-serif italic mb-4 text-white">{unit.beds} Bed, {unit.baths} Bath</h3>
                    <p className="text-xs uppercase tracking-widest text-white/60 max-w-[200px] leading-relaxed">
                      <span className="text-white font-medium">{unit.sqft} Square Feet.</span><br/>
                      {unit.levels} Levels of intentional living with a {unit.feature}.
                    </p>
                  </div>
                </div>
                <div className="lg:w-3/4 flex gap-4 lg:gap-8 h-[40vh] lg:h-[50vh]">
                  <div className="w-2/3 h-full relative overflow-hidden bg-black">
                    <video src={`/media/generated-video (${index + 1}).mp4`} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="w-1/3 h-full relative overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
                     <span className="text-[10px] uppercase tracking-widest text-white/30 text-center px-4">Floorplan<br/>Pending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location / Amenities */}
        <section id="locale" className="py-32 px-6 md:px-12 bg-[#fdfbf7]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
               <h2 className="text-4xl md:text-6xl font-light mb-8 text-[#1a1310]">The <em className="font-serif italic text-[#c2a07e]">Locale.</em></h2>
               <p className="text-sm font-light text-[#1a1310]/70 mb-12 leading-relaxed">Situated in the cultural heartbeat of East Austin. Walkable to the city's finest culinary, entertainment, and lifestyle amenities.</p>
               <ul className="space-y-6 text-xs uppercase tracking-widest text-[#1a1310]">
                  {AMENITIES.map((amenity, i) => (
                    <li key={i} className="flex justify-between border-b border-[#1a1310]/10 pb-4">
                      <span className="font-medium">{amenity.name}</span> 
                      <span className="text-[#c2a07e] font-bold">{amenity.dist}</span>
                    </li>
                  ))}
               </ul>
            </div>
            <div className="lg:w-2/3 h-[60vh] relative overflow-hidden border border-[#1a1310]/10 bg-[#e8e6e1]">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.932947246535!2d-97.716334984882!3d30.26620598179833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5c7e3e3135b%3A0x73c113554906a480!2s66%20Anthony%20St%2C%20Austin%2C%20TX%2078702!5e0!3m2!1sen!2sus!4v1678886473479!5m2!1sen!2sus" 
                  className="w-full h-full mix-blend-luminosity opacity-80"
                  style={{ filter: 'grayscale(100%) contrast(120%)' }}
                  loading="lazy"
               ></iframe>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <section id="contact" className="bg-[#1a1310] text-[#fdfbf7] pt-32 pb-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 border-b border-white/10 pb-20 mb-12">
            <div className="lg:w-1/2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c2a07e] mb-6 block font-bold">Contact Us</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
                A Space to <em className="font-serif italic text-[#c2a07e]">Begin</em> — <br/>Connect with Us.
              </h2>
              <p className="text-sm font-light text-white/60 max-w-sm leading-relaxed mb-12">
                Minimal, Premium, Elemental, Eternal. Let's build something that lasts beyond trends.
              </p>
            </div>

            <div className="lg:w-1/2 lg:pl-16">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-white/20 pb-2">
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-transparent outline-none text-sm font-light placeholder:text-white/30 text-white" />
                </div>
                <div className="border-b border-white/20 pb-2">
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent outline-none text-sm font-light placeholder:text-white/30 text-white" />
                </div>
                <div className="border-b border-white/20 pb-2">
                  <textarea placeholder="Message" rows={2} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-transparent outline-none text-sm font-light placeholder:text-white/30 text-white resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="text-xs uppercase tracking-[0.2em] font-medium border border-white/30 rounded-full px-8 py-4 hover:bg-white hover:text-[#1a1310] transition-all disabled:opacity-50">
                  {submitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
                {submitMessage && <p className="text-[10px] uppercase tracking-widest text-[#c2a07e]">{submitMessage}</p>}
              </form>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>&copy; {new Date().getFullYear()} / Oak Forest</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <span>Austin, TX</span>
              <span>A Slacked.co Production</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
