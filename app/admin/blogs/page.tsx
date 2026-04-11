"use client";

import { useState, useEffect } from "react";

type Blog = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  isPublished: boolean;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    setBlogs(data || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentBlog._id ? "PUT" : "POST";
    const url = currentBlog._id
      ? `/api/admin/blogs/${currentBlog._id}`
      : "/api/admin/blogs";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBlog),
    });

    setIsEditing(false);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const startNew = () => {
    setCurrentBlog({
      slug: "",
      title: "",
      description: "",
      content: "",
      author: "PixPassport Team",
      date: new Date().toISOString().split("T")[0],
      isPublished: true,
    });
    setIsEditing(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Manage Blogs</h1>
        {!isEditing && (
          <button
            onClick={startNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 flex rounded-lg font-bold text-sm shadow-md"
          >
            + Create New Blog
          </button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Title
              </label>
              <input
                required
                className="w-full border rounded-lg p-2 text-sm"
                value={currentBlog.title || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Slug (URL)
              </label>
              <input
                required
                className="w-full border rounded-lg p-2 text-sm"
                value={currentBlog.slug || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, slug: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Date
              </label>
              <input
                required
                type="date"
                className="w-full border rounded-lg p-2 text-sm"
                value={currentBlog.date || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Author
              </label>
              <input
                className="w-full border rounded-lg p-2 text-sm"
                value={currentBlog.author || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, author: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Description (SEO Meta)
            </label>
            <textarea
              required
              className="w-full border rounded-lg p-2 text-sm h-20"
              value={currentBlog.description || ""}
              onChange={(e) =>
                setCurrentBlog({ ...currentBlog, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Content (HTML)
            </label>
            <textarea
              required
              className="w-full border rounded-lg p-2 text-sm h-64 font-mono"
              value={currentBlog.content || ""}
              onChange={(e) =>
                setCurrentBlog({ ...currentBlog, content: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm"
            >
              Save Post
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border text-sm border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex-1">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {blog.date}
                </span>
                <h3 className="font-bold text-slate-900 mt-3 mb-2 text-lg leading-tight">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-xs line-clamp-3">
                  {blog.description}
                </p>
              </div>
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setCurrentBlog({ ...blog });
                    setIsEditing(true);
                  }}
                  className="flex-1 border text-slate-700 border-slate-200 hover:bg-slate-50 py-1.5 rounded-lg font-bold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id!)}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-1.5 rounded-lg font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-500 bg-slate-100 rounded-xl">
              No blogs found in the database.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
