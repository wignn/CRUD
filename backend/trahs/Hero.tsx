
export function Hero() {
  return (
    <section className="relative bg-transparent h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome to Our Company</h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-8">
          We build solutions for the future.
        </p>
        <a href="#services" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">Learn More</a>
      </div>
    </section>
  );
}
