import Link from "next/link";
import React from "react";

const Hero:React.FC = ()=> {
  return (
    <div className="text-white min-h-screen">
      <section className="md:h-screen h-1/2 flex flex-col items-center justify-center text-center bg-cover bg-center">
        <h1 className="md:text-5xl text-base font-bold mb-4 drop-shadow-lg">
          Selamat Datang di tera
        </h1>
        <p className="md:text-xl text-xs mb-6 drop-shadow-lg">
          di cari orang yang bisa bantu
        </p>
        <Link
          href="#features"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full md:text-lg text-xs mb-2 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition"
        >
          Baca Sekarang
        </Link>
      </section>
      <section
        id="features"
        className="md:py-16 gap-2 py-20 md:px-8 px-4 bg-gray-900"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Fitur-Fitur Unggulan
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <Feature
            title="Genre Populer"
            description="Fantasi, Sci-Fi, Drama, dan banyak lagi genre yang siap menemani hari-harimu."
            icon="/asset/Seducing-the-Student-Council-President.jpg"
          />
          <Feature
            title="Pembaruan Berkala"
            description="Nikmati bab baru setiap minggu dengan jadwal rilis yang teratur."
            icon="/asset/Omniscient-FirstPersons-Viewpoint.jpg"
          />
          <Feature
            title="Akses Gratis"
            description="Baca gratis atau nikmati keuntungan lebih dengan langganan premium."
            icon="/asset/121c842eed7d511eff13c323ae5072d2_551458_ori (1).jpg"
          />
          <Feature
            title="Komunitas Pembaca"
            description="Diskusikan cerita dan bagikan pendapatmu bersama komunitas penggemar."
            icon="/asset/Fake-Saint-Of-The-Year.jpg"
          />
          <Feature
            title="Tersedia di Berbagai Format"
            description="Nikmati dalam bentuk audio book, e-book, atau bahkan cetakan fisik."
            icon="/asset/Hong.Biyeon.full.4201699.jpg"
          />
          <Feature
            title="Login"
            description="Nikmati dalam bentuk audio book, e-book, atau bahkan cetakan fisik."
            icon="/asset/semple.jpg"
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, description, icon }: any) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="md:w-56 w-28 md:h-80 h-40 md:mb-4 mb-2 relative overflow-hidden rounded-lg">
        <img src={icon} alt={title} className="object-cover w-full h-full" />
      </div>
      <h3 className="md:text-2xl text-xs font-semibold mb-2">{title}</h3>
      <p className="md:text-lg text-xs hidden md:block">{description}</p>
    </div>
  );
}

export default Hero