import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Blog App</Link>
        <div>
          <Link
            to="/admin"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}