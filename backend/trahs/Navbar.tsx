import Profile from "../../frontend/src/app/components/profile/profile";

export default function Navbar() {
    return (
        <nav className="bg-transparent w-full z-10 fixed top-0">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo section */}
                <div className="text-4xl font-bold flex items-center">
                    <img
                        src="dango-inner-2.png"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </div>

                <ul className="flex space-x-6 text-lg">
                    <li>
                        <a href="#about" className="text-white hover:text-gray-300">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="text-white hover:text-gray-300">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="text-white hover:text-gray-300">
                            Contact
                        </a>
                    </li>
                </ul>

                {/* Profile Component */}
                <Profile/>
            </div>
        </nav>
    );
}
