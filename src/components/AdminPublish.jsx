import React, { useState } from "react";

export default function AdminPublish({ onAddBlog, onRefresh  }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "Admin",
    images: [],
    mainPhoto: "",
  });

  const handleAddBlog = async () => {
    if (!form.title || !form.content || !form.mainPhoto) {
      alert("Please enter title, content, and main photo URL");
      return;
    }
    const payload = {
      title: form.title,
      content: form.content,
      author: form.author || "Admin",
      images: Array.isArray(form.images) ? form.images : [],
      mainPhoto: form.mainPhoto,
    };
    await onAddBlog(payload);
    await onRefresh();  
    setForm({ title: "", content: "", author: "Admin", images: [], mainPhoto: "" });
    alert("blog added");
  };
       
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="HTML Content (e.g., <h1>Title</h1><p>Paragraph</p>)"
        className="w-full mb-2 p-2 border rounded"
        rows={6}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <input
        type="text"
        placeholder="Main Photo URL"
        className="w-full mb-2 p-2 border rounded"
        value={form.mainPhoto}
        onChange={(e) => setForm({ ...form, mainPhoto: e.target.value })}
      />
      <input
        type="text"
        placeholder="Additional Image URLs (comma-separated)"
        className="w-full mb-2 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, images: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })
        }
      />
      <button
        onClick={handleAddBlog}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4"
      >
        Publish
      </button>
    </div>
  );
}