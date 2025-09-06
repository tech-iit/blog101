// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// export default function BlogDetail({ backendURL }) {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`${backendURL}/api/blogs/${id}`);
//         const b = res.data;
//         const images = b.images ?? (b.Images ? JSON.parse(b.Images) : []);
//         setBlog({
//           id: b.id ?? b.Id,
//           title: b.title ?? b.Title,
//           content: b.content ?? b.Content,
//           author: b.author ?? b.Author,
//           images,
//           mainPhoto: b.mainPhoto ?? b.MainPhoto,
//           createdAt: b.createdAt ?? b.CreatedAt,
//         });
//       } catch (err) {
//         // console.error("Error fetching blog:", err);
//         setBlog(null);
//       }
//     };
//     fetchBlog();
//   }, [id, backendURL]);

//   if (!blog) return <p className="text-center">Loading...</p>;

//   return (
//   <div className="bg-white shadow-md rounded-lg p-6 mx-auto w-[95%] sm:w-[95%] md:w-4xl">
//   <Link
//     to="/"
//     className="mb-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//   >
//     ← Back
//   </Link>
//   <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
//   <p className="text-gray-500 mb-4">By {blog.author}</p>
//   <div
//     className="prose prose-sm sm:prose lg:prose-lg max-w-full" // <- key change
//     dangerouslySetInnerHTML={{ __html: blog.content }}
//   />
// </div>

//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BlogDetail({ backendURL }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/blogs/${id}`);
        const b = res.data;
        const images = b.images ?? (b.Images ? JSON.parse(b.Images) : []);
        setBlog({
          id: b.id ?? b.Id,
          title: b.title ?? b.Title,
          content: b.content ?? b.Content,
          author: b.author ?? b.Author,
          images,
          mainPhoto: b.mainPhoto ?? b.MainPhoto,
          createdAt: b.createdAt ?? b.CreatedAt,
        });
      } catch (err) {
        setBlog(null);
      }
    };
    fetchBlog();
  }, [id, backendURL]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="mb-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        ← Back
      </Link>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-8">By {blog.author}</p>

      {/* Blog Content */}
      <div
        className="prose max-w-full !prose-lg mx-auto" // full width
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
