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
        console.error("Error fetching blog:", err);
        setBlog(null);
      }
    };
    fetchBlog();
  }, [id, backendURL]);

  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <Link
        to="/"
        className="mb-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold text-gray-800">{blog.title} </h1>
      {/* (ID: {blog.id}) */}
      <p className="text-gray-500 mb-4">By {blog.author}</p>
      {blog.mainPhoto && (
        <img
          src={blog.mainPhoto}
          alt="Main Blog"
          className="w-full rounded-lg my-4"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      {blog.images && blog.images.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Additional Images:</h3>
          {blog.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Blog ${i}`}
              className="w-full rounded-lg my-2"
            />
          ))}
        </div>
      )}
    </div>
  );
}