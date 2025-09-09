import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogList({ blogs, currentPage, totalPages, paginate, blogsPerPage, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-t-4 border-b-4 border-indigo-600 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-600 text-center">No blogs available.</p>;
  }

  const getTeaser = (content) => {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, "");
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  // Pagination component
  const Pagination = () => (
    <div className="mb-6 flex justify-center items-center space-x-6">
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
  );

  return (
    <div className="w-full flex flex-col min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
        Latest Blogs
      </h1>

      {/* Pagination at the top */}
      <Pagination />

      {/* Blog list with animation */}
      <ul className="space-y-6 flex-grow">
        {blogs.map((blog, index) => {
          const globalIndex = (currentPage - 1) * blogsPerPage + index + 1;
          return (
            <motion.li
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.1 }}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              <Link to={`/blog/${blog.id}`} className="group block">
                <h2 className="text-xl font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300">
                  {globalIndex}. {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{getTeaser(blog.content)}</p>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      {/* Pagination at the bottom */}
      <div className="mt-auto">
        <Pagination />
      </div>
    </div>
  );
}
