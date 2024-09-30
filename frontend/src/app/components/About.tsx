import Image from 'next/image';

export function About() {
  return (
    <div className="min-h-screen bg-transparent w-full py-4 px-4 flex flex-col items-center">
      <div className="bg-opacity-80 backdrop-blur-md inset-0 shadow-lg rounded-lg p-8 w-full md:w-1/2 lg:w-1/2">
        <div className="flex flex-col items-center">
          <Image
            src="/11233.png" 
            alt="Gambar Profil Othinus/wignn"
            width={600} 
            height={600} 
            priority
            className="rounded-full h-32 w-32 shadow-lg border-4 border-white object-cover"
          />
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-white transition-transform transform hover:scale-105">
            Othinus/wignn
          </h1>
          <p className="mt-4 text-md md:text-lg text-gray-200 text-center italic">
            Prototype ke-10 mungkin
          </p>
        </div>
        <div className="mt-2 text-gray-200">
          <h2 className="text-xl md:text-2xl font-semibold border-b-2 border-white pb-2">
            Tentang Saya
          </h2>
          <p className="mt-4 text-md md:text-lg">
            Saya adalah seorang pengembang yang senang bereksperimen. Jika ingin berkolaborasi atau hanya ingin mengobrol, jangan ragu untuk menghubungi saya.
          </p>
        </div>
        <div className="mt-2">
          <h2 className="text-xl md:text-2xl font-semibold border-b-2 border-white pb-2">
            Kontak
          </h2>
          <p className="mt-4 text-md md:text-lg flex flex-col items-center">
            <a href="mailto:your-email@example.com" className="text-gray-200 hover:underline">
              your-email@example.com
            </a>
            <a href="https://www.linkedin.com/in/your-profile" className="mt-2 text-gray-200 hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com/your-github" className="mt-2 text-gray-200 hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
