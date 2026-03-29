import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center fixed w-full z-10">
        <h1 className="text-3xl font-bold text-indigo-700">66 Anthony St.</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#overview" className="text-lg text-gray-700 hover:text-indigo-700 transition duration-300">Overview</a></li>
            <li><a href="#features" className="text-lg text-gray-700 hover:text-indigo-700 transition duration-300">Features</a></li>
            <li><a href="#gallery" className="text-lg text-gray-700 hover:text-indigo-700 transition duration-300">Gallery</a></li>
            <li><a href="#contact" className="text-lg text-gray-700 hover:text-indigo-700 transition duration-300">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ffcd11543666?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury Property Exterior"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 text-center bg-black bg-opacity-40 p-10 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Discover Your Dream Home</h2>
          <p className="text-2xl mb-8 drop-shadow-lg">66 Anthony Street, Anytown, USA</p>
          <a href="#contact" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 shadow-lg">
            Schedule a Showing
          </a>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-5xl font-bold text-center mb-12 text-indigo-700">Property Overview</h3>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl leading-relaxed mb-6">
              Nestled in the heart of a vibrant community, 66 Anthony Street offers an unparalleled living experience. This stunning residence combines modern luxury with timeless elegance, providing spacious interiors and exquisite finishes.
            </p>
            <p className="text-xl leading-relaxed">
              Boasting an open-concept design, the home is perfect for both entertaining and comfortable family living. Enjoy serene mornings and vibrant evenings in this meticulously crafted sanctuary.
            </p>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1570129477033-f72691ac9a43?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Property Interior Living Room"
              width={800}
              height={500}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="bg-white py-20 px-6">
         <div className="max-w-6xl mx-auto">
            <h3 className="text-5xl font-bold text-center mb-12 text-indigo-700">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h4 className="text-3xl font-semibold mb-4 text-indigo-600">Spacious Layout</h4>
                <p className="text-lg text-gray-700">Generous living areas, high ceilings, and an open floor plan create an airy and inviting atmosphere.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h4 className="text-3xl font-semibold mb-4 text-indigo-600">Gourmet Kitchen</h4>
                <p className="text-lg text-gray-700">State-of-the-art appliances, custom cabinetry, and an oversized island perfect for culinary enthusiasts.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <h4 className="text-3xl font-semibold mb-4 text-indigo-600">Master Suite</h4>
                <p className="text-lg text-gray-700">A luxurious retreat with a spa-like ensuite bathroom, walk-in closet, and private balcony.</p>
              </div>
            </div>
        </div>
      </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">
            <h3 className="text-5xl font-bold text-center mb-12 text-indigo-700">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="grid gap-4">
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1600585153492-5a2b8d2d6e34?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div>
                        <Image className="h-auto max-w-full rounded-lg shadow-lg hover:opacity-90 transition duration-300" width={500} height={300} src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                </div>
            </div>
        </section>


      {/* Contact Section */}
      <section id="contact" className="bg-indigo-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-5xl font-bold mb-6">Ready to See More?</h3>
          <p className="text-xl mb-8">
            Contact us today to schedule a private tour of 66 Anthony Street and experience luxury living firsthand.
          </p>
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl max-w-lg mx-auto">
            <h4 className="text-3xl font-bold mb-4">Contact Information</h4>
            <p className="text-lg mb-2"><strong>Agent:</strong> Forrest Webber</p>
            <p className="text-lg mb-2"><strong>Email:</strong> forrest@slacked.co</p>
            <p className="text-lg"><strong>Phone:</strong> (512) 555-1234</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6 text-center">
        <p>&copy; {new Date().getFullYear()} 66 Anthony St. All Rights Reserved.</p>
        <p className="mt-2">A Showcase by <a href="https://slacked.co" className="text-indigo-400 hover:underline">Slacked.co</a></p>
      </footer>
    </div>
  );
}
