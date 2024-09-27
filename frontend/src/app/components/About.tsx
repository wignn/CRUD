import Image from 'next/image';

export function About() {
  return (
    <div className="min-h-screen bg-transparent py-10 px-4 flex flex-col items-center">
      <div className="inset-0 bg-black opacity-90 shadow-lg rounded-lg p-8 w-full md:w-3/4 lg:w-1/2">
        <div className="flex flex-col items-center">
          <Image
            src="/11233.png" 
            alt="Profile Picture"
            width={600} 
            height={600} 
            className="rounded-full h-32 w-32 shadow-lg border-4 border-white"
          />
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-white">Othinus/wignn</h1>
          <p className="mt-4 text-md md:text-lg text-gray-200 text-center">
            prototype ke 40 mungkin
          </p>
        </div>
        <div className="mt-8 text-gray-200">
          <h2 className="text-xl md:text-2xl font-semibold">Tentang Saya</h2>
          <p className="mt-4 text-md md:text-lg">
            buat project tapi tidak ada yang selesai
          </p>
          <p className="mt-4 text-md md:text-lg">
            Jika ingin berkolaborasi atau hanya ingin mengobrol, jangan ragu untuk menghubungi saya melalui [media sosial/email/website Anda].
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold">Kontak</h2>
          <p className="mt-4 text-md md:text-lg">
            Jika ingin berkolaborasi atau hanya ingin mengobrol, jangan ragu untuk menghubungi saya melalui [media sosial/email/website Anda].
          </p>
        </div>
      </div>
    </div>
  );
}
