import { Link } from "react-router";

export const Navbar = () => (
  <nav className="flex items-center gap-6 px-6 py-4 bg-gray-900">
    <Link to="/" className="text-white hover:text-blue-200 font-medium">
      Home
    </Link>
    <Link to="/about" className="text-white hover:text-blue-200 font-medium">
      About
    </Link>
  </nav>
);
