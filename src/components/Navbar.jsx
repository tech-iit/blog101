import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 h-14 shadow-md flex items-center">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold hover:text-indigo-400 transition">
          Blog App
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="px-3 py-1 hover:text-indigo-400 transition">Home</Link>
          <Link to="/admin" className="px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
