export default function Footer() {
    return (
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto text-center text-white">
          <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  