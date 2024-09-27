import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Hero } from "../landing/trahs/Hero";
import { About } from "../components/About";
import { Services } from "../components/services";
import { Contact } from "../components/contact";
import Extend from "../components/extends";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Extend/>
      <Contact />
      <Footer />

    </div>
  );
}
