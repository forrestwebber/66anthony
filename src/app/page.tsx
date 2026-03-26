
'use client'

import Image from 'next/image'
import { useState } from 'react';

const UNITS = [
  { name: "Unit A", beds: 3, baths: 2.5, sqft: 1420, levels: 2, feature: "Private Patio" },
  { name: "Unit B", beds: 3, baths: 2.5, sqft: 1380, levels: 2, feature: "Rooftop Deck" },
  { name: "Unit C", beds: 2, baths: 2, sqft: 980, levels: 2, feature: "Street Level Entry" },
]

const GALLERY_IMAGES = [
  '/popular1.jpg',
  '/popular2.jpg',
  '/popular3.jpg',
  '/popular4.jpg',
  '/popular5.jpg',
  '/home.jpg',
]

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
        setSubmitMessage('Thank you for your inquiry!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight text-slate-900">66 ANTHONY</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-slate-500">
          <a href="#gallery" className="hover:text-slate-900 transition">Gallery</a>
          <a href="#details" className="hover:text-slate-900 transition">Unit Details</a>
          <a href="#location" className="hover:text-slate-900 transition">Location</a>
          <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
        </nav>
        <a href="#contact" className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-700 transition">Schedule Tour</a>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
               <div className="absolute inset-0 bg-black/40 z-10" />
               <Image src="/home.jpg" alt="66 Anthony Street" layout="fill" objectFit="cover" />
            </div>
          </div>

          <div className="relative z-20 text-center text-white px-6">
            <div className="text-sm font-black mb-4 tracking-[0.3em] text-slate-300 uppercase">East Austin, Texas</div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Design as a Moat</h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-10 text-slate-100">
              A high-end infill development by <strong>Keel Homes / Oak Forest Modern Homes</strong>. Reimagining the Austin landscape through superior architectural vision.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-200 transition text-lg">Inquire Now</a>
              <a href="#details" className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold hover:bg-white/30 transition text-lg">View Details</a>
            </div>
          </div>
        </section>

        {/* Unit Detail Section */}
        <section id="details" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unit Availability</h2>
            <p className="text-slate-500 text-lg">Three unique residences designed for the modern lifestyle.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {UNITS.map((unit) => (
              <div key={unit.name} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition duration-300">
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">{unit.levels} Levels</div>
                <h3 className="text-3xl font-bold mb-2">{unit.name}</h3>
                <div className="text-slate-400 mb-6 font-medium">{unit.beds} Bed / {unit.baths} Bath</div>
                <div className="text-5xl font-black mb-6 tracking-tighter">
                  {unit.sqft} <span className="text-lg text-slate-300 font-normal">SQFT</span>
                </div>
                <div className="pt-6 border-t border-slate-50 flex items-center gap-2 text-slate-600 font-semibold italic">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {unit.feature}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-slate-900 py-24 px-6 text-white">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-4xl font-bold mb-12 text-center">Property Gallery</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY_IMAGES.map((src, index) => (
                  <div key={index} className="aspect-[4/5] bg-slate-800 rounded-2xl overflow-hidden relative group">
                    <Image src={src} alt={`Gallery image ${index + 1}`} layout="fill" objectFit="cover" className="opacity-80 group-hover:opacity-100 transition duration-500" />
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Location / Map Section */}
        <section id="location" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Location</h2>
            <p className="text-slate-500 text-lg">66 Anthony St, Austin, TX 78702</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.932947246535!2d-97.716334984882!3d30.26620598179833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5c7e3e3135b%3A0x73c113554906a480!2s66%20Anthony%20St%2C%20Austin%2C%20TX%2078702!5e0!3m2!1sen!2sus!4v1678886473479!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
           <h2 className="text-5xl font-bold mb-6 tracking-tighter">REQUEST ACCESS</h2>
           <p className="text-slate-500 text-xl mb-12 font-light">Inquire below for a private showing or investment packet.</p>

           <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-8 py-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition bg-white text-lg" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-8 py-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition bg-white text-lg" />
              <textarea placeholder="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full px-8 py-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition bg-white text-lg" />
              <button type="submit" disabled={submitting} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-slate-700 transition text-xl uppercase tracking-[0.2em] shadow-2xl disabled:bg-slate-500">
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
              {submitMessage && <p className="mt-4 text-lg">{submitMessage}</p>}
           </form>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
         &copy; {new Date().getFullYear()} Keel Homes / Oak Forest Modern Homes | A SLACKED.CO PRODUCTION
      </footer>
    </div>
  )
}
