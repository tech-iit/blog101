import React, { useState } from "react";

export default function AdminManagePage({ blogs, onRefresh, updateBlogs }) {
  const [editBlogId, setEditBlogId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    author: "Admin",
    images: [],
    mainPhoto: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`https://myblogbackendapp-g7ajfddhh2eddrgt.centralindia-01.azurewebsites.net/api/blogs/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to delete");
        updateBlogs(blogs.filter((blog) => blog.id !== id));
        alert("Blog deleted successfully!");
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete blog. Check console for details.");
      }
    }
  };

  const handleEditBlog = (blog) => {
    setEditBlogId(blog.id);
    setEditForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      images: blog.images,
      mainPhoto: blog.mainPhoto || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.content || !editForm.mainPhoto) {
      alert("Please enter title, content, and main photo URL");
      return;
    }
    try {
      // const { mainPhoto, ...payload } = editForm;
       const payload = { ...editForm };
      const response = await fetch(`https://myblogbackendapp-g7ajfddhh2eddrgt.centralindia-01.azurewebsites.net/api/blogs/${editBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update");
      const updatedBlogIndex = blogs.findIndex((blog) => blog.id === editBlogId);
      if (updatedBlogIndex !== -1) {
        const updatedBlogs = [...blogs];
        updatedBlogs[updatedBlogIndex] = { ...blogs[updatedBlogIndex], ...editForm };
        updateBlogs(updatedBlogs);
      }
      setEditBlogId(null);
      setEditForm({ title: "", content: "", author: "Admin", images: [], mainPhoto: "" });
      alert("Blog updated successfully!");
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog. Check console for details.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      {editBlogId ? (
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-2 p-2 border rounded"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          />
          <textarea
            placeholder="HTML Content (e.g., <h1>Title</h1><p>Paragraph</p>)"
            className="w-full mb-2 p-2 border rounded"
            rows={6}
            value={editForm.content}
            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Main Photo URL"
            className="w-full mb-2 p-2 border rounded"
            value={editForm.mainPhoto}
            onChange={(e) => setEditForm({ ...editForm, mainPhoto: e.target.value })}
          />
          <input
            type="text"
            placeholder="Additional Image URLs (comma-separated)"
            className="w-full mb-2 p-2 border rounded"
            value={editForm.images.join(", ")}
            onChange={(e) =>
              setEditForm({ ...editForm, images: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })
            }
          />
          <button
            onClick={handleSaveEdit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditBlogId(null)}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <ul className="list-disc pl-5">
            {currentBlogs.map((blog) => (
              <li key={blog.id} className="mb-2">
                {blog.title} (ID: {blog.id})
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="ml-4 px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}