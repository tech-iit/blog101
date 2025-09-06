import React from "react";
import { Link } from "react-router-dom";

export default function BlogList({ blogs, currentPage, totalPages, paginate }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-indigo-200 pb-2">Blog List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="block"
            >
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105"
              >
                {blog.mainPhoto ? (
                  <img
                    src={blog.mainPhoto}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-center">No blogs available.</p>
        )}
      </div>
      <div className="mt-10 flex justify-center items-center space-x-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Previous
        </button>
        <span className="text-lg text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}