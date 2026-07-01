"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  BookOpen,
  Grid,
  List,
  Filter,
  ChevronDown,
  SearchCheck,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Assets from "@/Assets/Assets";

const initialForm = {
  name: "",
  description: "",
  categoryIds: [],
  newCategoriesInput: "",
  tagIds: [],
  newTagsInput: "",
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [blogsResponse, categoriesResponse, tagsResponse] =
        await Promise.all([
          axios.get("http://localhost:5000/api/blogs", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/blogs/categories", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/blogs/tags", {
            withCredentials: true,
          }),
        ]);

      setBlogs(
        Array.isArray(blogsResponse.data.blogs) ? blogsResponse.data.blogs : [],
      );
      setCategories(
        Array.isArray(categoriesResponse.data.categories)
          ? categoriesResponse.data.categories
          : [],
      );
      setTags(
        Array.isArray(tagsResponse.data.tags) ? tagsResponse.data.tags : [],
      );
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to load blog data",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(loadData, 0);
    return () => clearTimeout(timeoutId);
  }, [loadData]);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter((b) => (b.title || "").toLowerCase().includes(q));
  }, [blogs, searchQuery]);

  const selectedCategoryNames = useMemo(() => {
    if (!Array.isArray(form.categoryIds) || form.categoryIds.length === 0)
      return [];
    const selected = new Set(form.categoryIds);
    return categories
      .filter((category) => selected.has(category.id))
      .map((category) => category.name);
  }, [categories, form.categoryIds]);

  const resetForm = () => {
    setEditingBlogId(null);
    setForm(initialForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleTag = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  const toggleCategory = (categoryId) => {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const parseNewTags = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const parseNewCategories = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const buildPayload = () => {
    return {
      title: form.name,
      content: form.description,
      categoryIds: form.categoryIds,
      newCategoryNames: parseNewCategories(form.newCategoriesInput),
      tagIds: form.tagIds,
      newTagNames: parseNewTags(form.newTagsInput),
    };
  };

  const handleUpdate = (blogId) => {
    window.location.href = `/dashboard/blogs/add?edit=${blogId}`;
  };
  const handleDelete = async (blogId) => {
    const confirmed = window.confirm("Delete this blog?");
    if (!confirmed) return;

    setDeletingId(blogId);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/${blogId}`,
        {
          withCredentials: true,
        },
      );
      setFeedback({
        type: "success",
        message: response.data.message || "Blog deleted successfully",
      });
      if (editingBlogId === blogId) {
        resetForm();
      }
      await loadData();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to delete blog",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (value) => {
    if (!value) return "No date";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "No date";
    return date
      .toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <DashboardShell title="Blogs" requiredPermission="blogs">
      <div>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Blog Management
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage and organize your digital content ecosystem.
            </p>
          </div>
          <Link
            href="/dashboard/blogs/add"
            className="inline-flex items-center gap-2 bg-[#38FFF2] text-black font-bold px-5 py-3 rounded-xl hover:bg-[#38FFF2]/90 transition-all shadow-[0_0_20px_rgba(56,255,242,0.2)]"
          >
            <Plus size={20} />
            Add New Blog
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-3 mb-6 flex flex-col md:flex-row items-center gap-46">
          <div className="flex-1 relative w-full">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search blog title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/[0.06] transition-all min-w-[140px]">
              <span>Category: All</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            <button className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/[0.06] transition-all min-w-[120px]">
              <span>Status: All</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
              <Calendar size={18} />
            </button>
          </div>
        </div>

        {feedback.message ? (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
              feedback.type === "success"
                ? "border-white/20 bg-white/10 text-white"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        {/* Blog Grid/List Container */}
        <div
          className={`grid gap-4 "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4" }`}
        >
          {loading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/5 rounded-[24px] overflow-hidden transition-all duration-300 animate-pulse"
                >
                  <div className="h-48 bg-white/[0.03]"></div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="h-3 bg-white/[0.05] rounded w-20"></div>
                      <div className="h-3 bg-white/[0.05] rounded w-16"></div>
                    </div>
                    <p className="mt-3 text-xs text-white/40">
                      {form.newCategoriesInput.trim()
                        ? `New categories: ${form.newCategoriesInput.trim()}`
                        : selectedCategoryNames.length
                          ? `Selected: ${selectedCategoryNames.join(", ")}`
                          : "No category selected (will become Uncategorized)"}
                    </p>
                    <input
                      type="text"
                      name="newCategoriesInput"
                      value={form.newCategoriesInput}
                      onChange={handleChange}
                      placeholder="Add new categories, separated by commas"
                      className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                    />
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-white/70 mb-3">Tags</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tags.map((tag) => (
                        <label
                          key={tag.id}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                        >
                          <span className="text-white/85">{tag.name}</span>
                          <input
                            type="checkbox"
                            checked={form.tagIds.includes(tag.id)}
                            onChange={() => toggleTag(tag.id)}
                            className="h-4 w-4 accent-[#03B8B8]"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="h-8 bg-white/[0.05] rounded-full w-full"></div>
                  </div>
                </div>
              ))
          ) : filteredBlogs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center mb-6">
                <BookOpen size={40} className="text-zinc-700" />
              </div>
              <p className="text-xl font-bold text-white">No results found</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-xs">
                Try adjusting your search query or filters to find what you're
                looking for.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 text-sm font-bold text-[#38FFF2] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {filteredBlogs.map((blog) => (
                
                <div
                  key={blog.id}
                  className="relative h-[460px] bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group"
                >
                  <Link href={`/blogs/${blog.id}`} className="group block w-full">
                  <div className="flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-48 bg-zinc-900 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <Image
                        src={blog.image || Assets.UIUX2}
                        alt={blog.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        {Array.isArray(blog.Categories) &&
                          blog.Categories.slice(0, 1).map((cat) => (
                            <span
                              key={cat.id}
                              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg border backdrop-blur-md bg-[#38FFF2]/20 text-[#38FFF2] border-[#38FFF2]/30`}
                            >
                              {cat.name}
                            </span>
                          ))}
                      </div>
                      {/* Placeholder content image */}
                      <div className="w-full h-full flex items-center justify-center bg-zinc-800 group-hover:scale-105 transition-transform duration-500">
                        <BookOpen size={48} className="text-white/5" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider">
                          {formatDate(blog.createdAt)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${blog.status === "draft" ? "bg-zinc-500/10 border-zinc-500/20 text-zinc-500" : "bg-[#38FFF2]/10 border-[#38FFF2]/20 text-[#38FFF2]"}`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${blog.status === "draft" ? "bg-zinc-500" : "bg-[#38FFF2]"}`}
                          />
                          {blog.status || "Published"}
                        </span>
                      </div>

                      <h3 className="text-white font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-[#38FFF2] transition-colors">
                        {blog.title || "Untitled Blog Post"}
                      </h3>

                      <p className="text-zinc-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                        {blog.content ||
                          "Exploring the boundaries of technology and design in this comprehensive guide."}
                      </p>
                    </div>
                  </div>
                  </Link>

                  {/* Footer */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pb-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white  font-bold">
                        {blog.User?.name
                          ? blog.User.name.charAt(0).toUpperCase()
                          : "A"}
                      </div>
                      <span className="text-zinc-400 text-sm font-medium">
                        {blog.User?.name || "Admin"}
                      </span>
                    </div>

                    <div className="flex items-center gap-0">
                      <button
                        onClick={() => handleUpdate(blog.id)}
                        className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Placeholder Card */}
              <Link
                href="/dashboard/blogs/add"
                className="border border-dashed border-white/10 rounded-2xl bg-transparent flex flex-col items-center justify-center min-h-[400px] hover:bg-white/[0.02] hover:border-[#38FFF2]/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#38FFF2]/10 group-hover:border-[#38FFF2]/20 transition-all">
                  <Plus
                    size={24}
                    className="text-zinc-500 group-hover:text-[#38FFF2]"
                  />
                </div>
                <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">
                  Create New Post
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}


