import { FaCode } from "react-icons/fa";

export default function Extend() {
  return (
    <div>
      <section id="features" className="md:py-16 py-20 md:px-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 justify-center flex">
          <FaCode />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            title="Genre Populer"
            description="Fantasi, Sci-Fi, Drama, dan banyak lagi."
            icon="/asset/Seducing-the-Student-Council-President.jpg"
          />
          <Feature
            title="Pembaruan Berkala"
            description="Bab baru setiap minggu."
            icon="/asset/Omniscient-FirstPersons-Viewpoint.jpg"
          />
          <Feature
            title="Akses Gratis"
            description="Baca gratis atau langganan premium."
            icon="/asset/121c842eed7d511eff13c323ae5072d2_551458_ori (1).jpg"
          />
          <Feature
            title="Komunitas Pembaca"
            description="Diskusi dan bagikan pendapatmu."
            icon="/asset/Fake-Saint-Of-The-Year.jpg"
          />
          <Feature
            title="Berbagai Format"
            description="Audio, e-book, atau cetak fisik."
            icon="/asset/Hong.Biyeon.full.4201699.jpg"
          />
          <Feature
            title="Login"
            description="Akses fitur eksklusif."
            icon="/asset/semple.jpg"
          />
          <Feature
            title="CDN"
            description="Pengalaman membaca yang lancar."
            icon="/asset/91H6EHg3eNL._SY522_.jpg"
          />
          <Feature
            title="Multi Platform"
            description="Baca di mana saja, kapan saja."
            icon="/asset/M-C-1.jpg"
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, description, icon }: any) {
  return (
    <div className="flex flex-col items-center text-center bg-black bg-opacity-40 backdrop-blur-lg backdrop-filter rounded-2xl p-6 w-full">
      <div className="relative md:w-56 w-40 md:h-72 h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={icon}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h3 className="md:text-xl text-gray-50 text-base font-semibold mb-2">
        {title}
      </h3>
      <p className="md:text-base text-gray-50 text-sm hidden md:block">
        {description}
      </p>
    </div>
  );
}
