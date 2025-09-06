import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import AdminLogin from "./components/AdminLogin";
import AdminManagePage from "./components/AdminManagePage";
import { initialBlogs } from "./data.js";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
 const [loading, setLoading] = useState(true); // new state

  const backendURL = "https://myblogbackendapp-g7ajfddhh2eddrgt.centralindia-01.azurewebsites.net";

  const normalize = (b) => ({
    id: b.id ?? b.Id ?? null,
    title: b.title ?? b.Title ?? "",
    content: b.content ?? b.Content ?? "",
    author: b.author ?? b.Author ?? "Admin",
    images: b.images ?? (b.Images ? (typeof b.Images === "string" ? JSON.parse(b.Images) : b.Images) : []),
    mainPhoto: b.mainPhoto ?? b.MainPhoto ?? "",
    createdAt: b.createdAt ?? b.CreatedAt ?? null,
  });

  const tryParseJSON = (str) => {
    try {
      const v = JSON.parse(str);
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/blogs`);
      const normalized = res.data.map(normalize);
      setBlogs(normalized);
    } catch (err) {
      // console.error("Error fetching blogs:", err);
      setBlogs(initialBlogs.map(normalize));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async (newBlog) => {
    try {
      // const { mainPhoto, ...payload } = newBlog;
       const payload = { ...newBlog };
      const res = await axios.post(`${backendURL}/api/blogs`, payload);
      const added = normalize({
        id: res.data.id ?? res.data.Id,
        title: res.data.title ?? res.data.Title,
        content: res.data.content ?? res.data.Content,
        author: res.data.author ?? res.data.Author,
        images: res.data.images ?? res.data.Images,
        createdAt: res.data.createdAt ?? res.data.CreatedAt,
      });
      setBlogs((prev) => [added, ...prev]);
      return true;
    } catch (err) {
      // console.error("Error adding blog:", err);
      return true;
    }
  };

  const updateBlogs = (updatedBlogs) => {
    setBlogs(updatedBlogs);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar fixed at top */}
        <Navbar />
        <main className="flex-grow pt-20 pb-20">
      <div className="container mx-auto p-6">
        <Routes>
          <Route
            path="/"
            
            element={
               loading ? (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    ) : (
              <BlogList
                blogs={currentBlogs}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                loading={loading}
              />
    )
            }
          />
          <Route path="/blog/:id" element={<BlogDetail backendURL={backendURL} />} />
          <Route
            path="/admin"
            element={
              <AdminLogin
                onLogin={() => setIsAdmin(true)}
                onAddBlog={handleAddBlog}
                onRefresh={fetchBlogs}
                updateBlogs={updateBlogs}
                isAdmin={isAdmin}
                blogs={blogs}
              />
            }
          />
          <Route
            path="/admin/manage"
            element={
              <AdminManagePage
                blogs={blogs}
                onRefresh={fetchBlogs}
                updateBlogs={updateBlogs}
              />
            }
          />
        </Routes>
      </div>
       </main>
        <Footer />
      </div>
    </Router>
  );
}