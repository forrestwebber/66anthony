export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-[#c9a96e] font-semibold tracking-widest text-sm uppercase">
            66 Anthony St
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#overview" className="text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors text-sm tracking-wide">Overview</a>
            <a href="#features" className="text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors text-sm tracking-wide">Features</a>
            <a href="#gallery" className="text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors text-sm tracking-wide">Gallery</a>
            <a href="#contact" className="text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors text-sm tracking-wide">Contact</a>
          </div>
          <a
            href="#contact"
            className="px-5 py-2 bg-[#c9a96e] text-[#0c0c0c] text-sm font-semibold rounded hover:bg-[#dfc295] transition-colors tracking-wide"
          >
            Schedule Showing
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c]" />
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c9a96e]/3 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up opacity-0">
            <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-6 font-medium">
              Exclusive Property Showcase
            </p>
          </div>

          <h1 className="animate-fade-in-up opacity-0 delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
            <span className="animate-shimmer">66 Anthony</span>
            <br />
            <span className="text-[#f5f0eb]">Street</span>
          </h1>

          <p className="animate-fade-in-up opacity-0 delay-300 text-[#f5f0eb]/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Where modern elegance meets timeless design. A residence crafted for those who appreciate
            the extraordinary in everyday living.
          </p>

          <div className="animate-fade-in-up opacity-0 delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#overview"
              className="px-8 py-4 bg-[#c9a96e] text-[#0c0c0c] font-semibold rounded hover:bg-[#dfc295] transition-all text-sm tracking-widest uppercase"
            >
              Explore Property
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-[#c9a96e]/40 text-[#c9a96e] font-semibold rounded hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all text-sm tracking-widest uppercase"
            >
              Request Info
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-in opacity-0 delay-600 mt-20">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a96e]/40 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* Property Stats Bar */}
      <section className="bg-[#1a1a1a] border-y border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "4", label: "Bedrooms" },
            { value: "3.5", label: "Bathrooms" },
            { value: "2,800", label: "Sq. Feet" },
            { value: "0.25", label: "Acre Lot" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-[#c9a96e]">{stat.value}</p>
              <p className="text-[#f5f0eb]/50 text-sm tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <div>
              <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-4">The Residence</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                A Home Beyond
                <br />
                <span className="text-[#c9a96e]">Expectation</span>
              </h2>
              <p className="text-[#f5f0eb]/60 text-lg leading-relaxed mb-6">
                Situated on a premier lot, 66 Anthony Street represents the pinnacle of contemporary
                residential design. Every detail has been carefully considered — from the open-concept
                living spaces to the chef-grade kitchen and spa-inspired bathrooms.
              </p>
              <p className="text-[#f5f0eb]/60 text-lg leading-relaxed mb-8">
                Natural light floods through oversized windows, illuminating premium finishes
                including hardwood floors, quartz countertops, and custom cabinetry throughout.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-[#c9a96e]">2024</p>
                  <p className="text-[#f5f0eb]/40 text-sm">Year Built</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#c9a96e]">A+</p>
                  <p className="text-[#f5f0eb]/40 text-sm">Energy Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#c9a96e]">2-Car</p>
                  <p className="text-[#f5f0eb]/40 text-sm">Garage</p>
                </div>
              </div>
            </div>

            {/* Right - Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden border border-[#c9a96e]/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-[#c9a96e]/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#c9a96e]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                    <p className="text-[#c9a96e]/40 text-sm tracking-widest uppercase">
                      Photography Coming Soon
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#c9a96e]/20 rounded-tr-lg" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#c9a96e]/20 rounded-bl-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-[#1a1a1a]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-4">Curated Living</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Exceptional <span className="text-[#c9a96e]">Features</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
                title: "Open Floor Plan",
                desc: "Seamlessly connected living, dining, and kitchen areas designed for modern entertaining and family life.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
                title: "Natural Light",
                desc: "Floor-to-ceiling windows and skylights bathe every room in warm, natural sunlight throughout the day.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                ),
                title: "Designer Finishes",
                desc: "Hand-selected materials including Italian marble, custom millwork, and designer hardware in every detail.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  </svg>
                ),
                title: "Smart Home Ready",
                desc: "Pre-wired for complete home automation including lighting, climate, security, and entertainment systems.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18a.94.94 0 00-.662.274.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                  </svg>
                ),
                title: "Prime Location",
                desc: "Minutes from top-rated schools, shopping, dining, and major transit routes. The perfect neighborhood.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                title: "Outdoor Living",
                desc: "Professionally landscaped grounds with a covered patio, mature trees, and space for a pool or garden.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-8 bg-[#0c0c0c] border border-[#c9a96e]/10 rounded-lg hover:border-[#c9a96e]/30 transition-all duration-300"
              >
                <div className="text-[#c9a96e] mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#f5f0eb]">{feature.title}</h3>
                <p className="text-[#f5f0eb]/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Placeholder */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-4">Visual Tour</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Property <span className="text-[#c9a96e]">Gallery</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Living Room", "Kitchen", "Primary Suite", "Bathroom", "Exterior", "Backyard"].map(
              (room) => (
                <div
                  key={room}
                  className="aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg border border-[#c9a96e]/10 flex items-center justify-center hover:border-[#c9a96e]/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 mx-auto text-[#c9a96e]/30 group-hover:text-[#c9a96e]/50 transition-colors mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                    <p className="text-[#c9a96e]/40 text-sm tracking-wider group-hover:text-[#c9a96e]/60 transition-colors">
                      {room}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          <p className="text-center text-[#f5f0eb]/30 text-sm mt-8 tracking-wide">
            Professional photography coming soon. Contact us for a private walkthrough.
          </p>
        </div>
      </section>

      {/* Neighborhood / Location */}
      <section className="py-24 md:py-32 bg-[#1a1a1a]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg border border-[#c9a96e]/10 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-[#c9a96e]/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-[#c9a96e]/40 text-sm tracking-widest uppercase">
                    Interactive Map
                    <br />
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-4">The Neighborhood</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Live Where
                <br />
                <span className="text-[#c9a96e]">Life Thrives</span>
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Top-Rated Schools", detail: "Excellent school district within walking distance" },
                  { label: "Shopping & Dining", detail: "Premium retail and restaurants minutes away" },
                  { label: "Parks & Recreation", detail: "Green spaces and trails for active lifestyles" },
                  { label: "Easy Commute", detail: "Quick access to highways and public transit" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#c9a96e] mt-2 shrink-0" />
                    <div>
                      <p className="text-[#f5f0eb] font-semibold">{item.label}</p>
                      <p className="text-[#f5f0eb]/50 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Schedule a <span className="text-[#c9a96e]">Private Showing</span>
          </h2>
          <p className="text-[#f5f0eb]/60 text-lg mb-12 max-w-xl mx-auto">
            Experience 66 Anthony Street in person. Reach out to arrange a private walkthrough at your convenience.
          </p>

          <div className="bg-[#1a1a1a] border border-[#c9a96e]/10 rounded-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-[#0c0c0c] border border-[#c9a96e]/20 rounded text-[#f5f0eb] placeholder-[#f5f0eb]/30 focus:outline-none focus:border-[#c9a96e]/60 transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-[#0c0c0c] border border-[#c9a96e]/20 rounded text-[#f5f0eb] placeholder-[#f5f0eb]/30 focus:outline-none focus:border-[#c9a96e]/60 transition-colors"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-[#0c0c0c] border border-[#c9a96e]/20 rounded text-[#f5f0eb] placeholder-[#f5f0eb]/30 focus:outline-none focus:border-[#c9a96e]/60 transition-colors mb-6"
            />
            <textarea
              rows={4}
              placeholder="Tell us about your interest in this property..."
              className="w-full px-4 py-3 bg-[#0c0c0c] border border-[#c9a96e]/20 rounded text-[#f5f0eb] placeholder-[#f5f0eb]/30 focus:outline-none focus:border-[#c9a96e]/60 transition-colors mb-6 resize-none"
            />
            <button className="w-full py-4 bg-[#c9a96e] text-[#0c0c0c] font-semibold rounded hover:bg-[#dfc295] transition-colors text-sm tracking-widest uppercase">
              Request Private Showing
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center text-[#f5f0eb]/40 text-sm">
            <a href="mailto:info@slacked.co" className="hover:text-[#c9a96e] transition-colors">
              info@slacked.co
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:+15125551234" className="hover:text-[#c9a96e] transition-colors">
              (512) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a96e]/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#f5f0eb]/30 text-sm">
            &copy; {new Date().getFullYear()} 66 Anthony Street. All rights reserved.
          </p>
          <a
            href="https://slacked.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5f0eb]/20 text-xs hover:text-[#c9a96e]/60 transition-colors tracking-wider"
          >
            Crafted by SLACKED.CO
          </a>
        </div>
      </footer>
    </>
  );
}
