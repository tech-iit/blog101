import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPublish from "./AdminPublish";

export default function AdminLogin({ onLogin, onAddBlog, onRefresh, updateBlogs, isAdmin, blogs }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAdmin);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      credentials.email === "admin@blog.com" &&
      credentials.password === "admin123"
    ) {
      setIsLoggedIn(true);
      onLogin();
      return;
    }
    alert("Invalid credentials");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AdminPublish onAddBlog={onAddBlog} />
      <button
        onClick={() => navigate("/admin/manage")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-md hover:shadow-lg"
      >
        Manage Blogs
      </button>
    </div>
  );
}