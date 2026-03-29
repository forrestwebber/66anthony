import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-12 md:p-24 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          66 Anthony Street
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-prose mx-auto">
          Coming Soon: An exclusive online showcase for an exceptional property. We are currently developing a stunning, immersive experience.
        </p>
        <div className="relative flex place-items-center mb-8 sm:mb-12 w-full max-w-2xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-2xl">
            <Image
              className="object-cover"
              src="/hero-placeholder.jpg"
              alt="A placeholder image of a modern house"
              fill={true}
              priority
            />
          </div>
        </div>
        <p className="text-md sm:text-lg text-gray-400 mb-4">
          High-resolution photography, virtual tours, and complete details will be available shortly.
        </p>
        <p className="text-md sm:text-lg text-gray-300 font-semibold">
          For inquiries, please contact <a href="mailto:info@slacked.co" className="text-blue-400 hover:text-blue-300 transition-colors">info@slacked.co</a>.
        </p>
      </div>
    </main>
  );
}
