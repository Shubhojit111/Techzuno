"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [blogsResponse, categoriesResponse, tagsResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/blogs", { withCredentials: true }),
        axios.get("http://localhost:5000/api/blogs/categories", { withCredentials: true }),
        axios.get("http://localhost:5000/api/blogs/tags", { withCredentials: true }),
      ]);

      setBlogs(Array.isArray(blogsResponse.data.blogs) ? blogsResponse.data.blogs : []);
      setCategories(
        Array.isArray(categoriesResponse.data.categories)
          ? categoriesResponse.data.categories
          : [],
      );
      setTags(Array.isArray(tagsResponse.data.tags) ? tagsResponse.data.tags : []);
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

  const selectedCategoryNames = useMemo(() => {
    if (!Array.isArray(form.categoryIds) || form.categoryIds.length === 0) return [];
    const selected = new Set(form.categoryIds);
    return categories.filter((category) => selected.has(category.id)).map((category) => category.name);
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

  const openEdit = (blog) => {
    setEditingBlogId(blog.id);
    setFeedback({ type: "", message: "" });
    setForm({
      name: blog.title || "",
      description: blog.content || "",
      categoryIds: Array.isArray(blog.Categories) ? blog.Categories.map((category) => category.id) : [],
      newCategoriesInput: "",
      tagIds: Array.isArray(blog.Tags) ? blog.Tags.map((tag) => tag.id) : [],
      newTagsInput: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/blogs/${editingBlogId}`,
        buildPayload(),
        { withCredentials: true },
      );

      setFeedback({
        type: "success",
        message: response.data.message || "Blog updated successfully",
      });
      resetForm();
      await loadData();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to update blog",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm("Delete this blog?");
    if (!confirmed) return;

    setDeletingId(blogId);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
        withCredentials: true,
      });
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
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

  return (
    <DashboardShell title="Blogs" requiredPermission="blogs">
      <div>
        <p className="text-white/60 max-w-3xl leading-relaxed">
          This is the all blogs page. Categories and tags are optional. If no category is selected,
          the blog will be placed into Uncategorized automatically.
        </p>

        {feedback.message ? (
          <div
            className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-[#03B8B8]/20 bg-[#03B8B8]/10 text-[#38FFF2]"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        {editingBlogId ? (
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">Blog</p>
                <h2 className="mt-3 text-[26px] font-semibold">Edit Blog</h2>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-white/75 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-6 grid grid-cols-1 gap-5 xl:max-w-4xl">
              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                  placeholder="Enter blog name"
                  required
                />
              </label>

              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={8}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors resize-y"
                  placeholder="Write blog description"
                  required
                />
              </label>

              <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-5">
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white/70 mb-3">Category</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.length === 0 ? (
                      <p className="text-white/45 text-sm">No categories available yet.</p>
                    ) : (
                      categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                        >
                          <span className="text-white/85">{category.name}</span>
                          <input
                            type="checkbox"
                            checked={form.categoryIds.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="h-4 w-4 accent-[#03B8B8]"
                          />
                        </label>
                      ))
                    )}
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
                  <input
                    type="text"
                    name="newTagsInput"
                    value={form.newTagsInput}
                    onChange={handleChange}
                    placeholder="Add new tags, separated by commas"
                    className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-[#03B8B8] px-6 py-3.5 text-black font-semibold hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Update Blog"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-white/75 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-[18px] font-semibold">All Blogs</h2>
            <p className="text-sm text-white/50">{loading ? "Loading..." : `${blogs.length} total`}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px]">
              <thead>
                <tr className="text-left text-white/50 text-[12px] uppercase tracking-[0.18em]">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-white/65">
                      Loading blogs...
                    </td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-white/65">
                      No blogs created yet.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="px-6 py-5 text-white font-medium">{blog.title}</td>
                      <td className="px-6 py-5 text-white/75">
                        {Array.isArray(blog.Categories) && blog.Categories.length ? (
                          <div className="flex flex-wrap gap-2">
                            {blog.Categories.map((category) => (
                              <span
                                key={`${blog.id}-${category.id}`}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-white/75"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-white/45">Uncategorized</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(blog.Tags) && blog.Tags.length > 0 ? (
                            blog.Tags.map((tag) => (
                              <span
                                key={`${blog.id}-${tag.id}`}
                                className="rounded-full border border-[#03B8B8]/20 bg-[#03B8B8]/10 px-3 py-1 text-[12px] text-[#38FFF2]"
                              >
                                {tag.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-white/40 text-sm">No tags</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-white/60 max-w-[300px] line-clamp-2">{blog.content || "-"}</p>
                      </td>
                      <td className="px-6 py-5 text-white/75">
                        {blog.User?.name || blog.User?.email || "-"}
                      </td>
                      <td className="px-6 py-5 text-white/55">{formatDate(blog.createdAt)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openEdit(blog)}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-white/75 hover:bg-white/[0.08] hover:text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(blog.id)}
                            disabled={deletingId === blog.id}
                            className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-2 text-red-300 hover:bg-red-500/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {deletingId === blog.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
