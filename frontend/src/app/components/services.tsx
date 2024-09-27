export function Services() {
    return (
      <section id="services" className="py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
            {/* Card 1 */}
            <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
              <div className="mb-4">
                <svg className="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 12h2m-1-1v2m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Web Development</h3>
              <p className="text-gray-300">We build responsive and dynamic websites tailored to your business needs.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
              <div className="mb-4">
                <svg className="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m0-4h.01M12 19h.01M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Mobile Apps</h3>
              <p className="text-gray-300">We create user-friendly mobile applications for iOS and Android.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
              <div className="mb-4">
                <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">AI Integration</h3>
              <p className="text-gray-300">We provide AI solutions that streamline and automate business processes.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  