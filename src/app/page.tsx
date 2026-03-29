import Image from "next/image";

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
    "Open-concept living with 10-foot ceilings and white oak hardwood floors",
    "Designer kitchen with quartz countertops, Thermador appliances, and waterfall island",
    "Primary suite with spa bath, rainfall shower, and custom walk-in closet",
    "Covered outdoor patio with built-in grill and string-light pergola",
    "Energy-efficient smart home with Nest integration throughout",
    "Two-car garage with EV charging capability",
  ],
};

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    alt: "Modern home exterior with clean lines",
    label: "Exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    alt: "Open concept living room",
    label: "Living Room",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Modern kitchen with island",
    label: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    alt: "Primary bedroom",
    label: "Primary Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    alt: "Spa-like bathroom",
    label: "Bath",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    alt: "Backyard patio",
    label: "Outdoor Living",
  },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors duration-200 uppercase"
    >
      {children}
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center px-6 py-4">
      <div className="text-3xl md:text-4xl font-light text-white mb-1">{value}</div>
      <div className="text-xs tracking-widest uppercase text-white/60">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-white text-lg font-semibold tracking-tight">
            66 Anthony
          </a>
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#overview">Overview</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#gallery">Gallery</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-block text-sm font-semibold bg-white text-neutral-900 px-5 py-2.5 rounded-full hover:bg-neutral-100 transition-colors duration-200"
          >
            Schedule Tour
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
          alt="66 Anthony Street - Luxury Home Exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
              {PROPERTY.city}, {PROPERTY.state}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-4 tracking-tight">
              {PROPERTY.address}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-xl mb-8">
              {PROPERTY.tagline}
            </p>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-in-up animation-delay-400 flex flex-wrap items-center gap-0 bg-white/10 backdrop-blur-sm rounded-2xl w-fit divide-x divide-white/20">
            <StatCard label="Bedrooms" value={PROPERTY.beds} />
            <StatCard label="Bathrooms" value={PROPERTY.baths} />
            <StatCard label="Sq Ft" value={PROPERTY.sqft} />
            <StatCard label="Year Built" value={PROPERTY.yearBuilt} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-3 font-medium">
                About the Property
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Where Design Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  Lifestyle
                </span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {PROPERTY.description}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-neutral-100 rounded-xl p-5">
                  <div className="text-sm text-neutral-400 uppercase tracking-wide mb-1">Property Type</div>
                  <div className="text-lg font-semibold text-neutral-900">{PROPERTY.type}</div>
                </div>
                <div className="bg-neutral-100 rounded-xl p-5">
                  <div className="text-sm text-neutral-400 uppercase tracking-wide mb-1">Lot Size</div>
                  <div className="text-lg font-semibold text-neutral-900">{PROPERTY.lot}</div>
                </div>
                <div className="bg-neutral-100 rounded-xl p-5">
                  <div className="text-sm text-neutral-400 uppercase tracking-wide mb-1">Living Space</div>
                  <div className="text-lg font-semibold text-neutral-900">{PROPERTY.sqft} sq ft</div>
                </div>
                <div className="bg-neutral-100 rounded-xl p-5">
                  <div className="text-sm text-neutral-400 uppercase tracking-wide mb-1">Pricing</div>
                  <div className="text-lg font-semibold text-neutral-900">{PROPERTY.price}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Modern interior living space"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-500/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-neutral-900/5 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-3 font-medium">
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
                className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-5">
                  <span className="text-amber-400 font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-white/80 text-base leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-3 font-medium">
              Visual Tour
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              Step Inside
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 px-6 bg-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-3 font-medium">
                Neighborhood
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Austin&apos;s Finest
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Located in one of Austin&apos;s most dynamic neighborhoods, 66 Anthony Street puts you minutes
                from world-class dining on Rainey Street, the energy of South Congress, and the trails along
                Lady Bird Lake.
              </p>
              <div className="space-y-4">
                {[
                  { place: "Downtown Austin", time: "8 min drive" },
                  { place: "Austin-Bergstrom Airport", time: "15 min drive" },
                  { place: "Lady Bird Lake Trail", time: "5 min walk" },
                  { place: "South Congress Ave", time: "10 min drive" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-neutral-200"
                  >
                    <span className="font-medium text-neutral-800">{item.place}</span>
                    <span className="text-sm text-neutral-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80"
                alt="Austin Texas cityscape"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="relative py-32 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="Beautiful home interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <p className="text-sm tracking-[0.3em] uppercase text-white/50 mb-3 font-medium">
            Your Next Home
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Experience{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              66 Anthony?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Schedule a private showing and discover why this is one of Austin&apos;s most coveted addresses.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 max-w-md mx-auto">
            <div className="space-y-4 text-left">
              <div>
                <div className="text-xs tracking-widest uppercase text-white/40 mb-1">Presented By</div>
                <div className="text-lg font-semibold">Slacked.co</div>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-white/40 mb-1">Email</div>
                <a
                  href="mailto:hello@slacked.co"
                  className="text-lg font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  hello@slacked.co
                </a>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-white/40 mb-1">Phone</div>
                <a
                  href="tel:+15125551234"
                  className="text-lg font-semibold text-white hover:text-amber-400 transition-colors"
                >
                  (512) 555-1234
                </a>
              </div>
            </div>
            <a
              href="mailto:hello@slacked.co?subject=66 Anthony Street — Tour Request"
              className="mt-8 block w-full text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/25"
            >
              Request a Private Tour
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-lg font-semibold tracking-tight">66 Anthony Street</div>
            <div className="text-sm text-neutral-500 mt-1">Austin, TX</div>
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">Built by</span>
            <a
              href="https://slacked.co"
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Slacked.co
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
