import { About } from "../components/About";

export default function AboutPage() {

    return (
        <div style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}>
        <About />

        </div>

    )
}