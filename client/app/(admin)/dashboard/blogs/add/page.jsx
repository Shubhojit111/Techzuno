"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const initialForm = {
  name: "",
  description: "",
  categoryIds: [],
  newCategoriesInput: "",
  tagIds: [],
  newTagsInput: "",
};

export default function AddBlogsPage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState(initialForm);

  const loadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesResponse, tagsResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/blogs/categories", { withCredentials: true }),
        axios.get("http://localhost:5000/api/blogs/tags", { withCredentials: true }),
      ]);

      setCategories(
        Array.isArray(categoriesResponse.data.categories)
          ? categoriesResponse.data.categories
          : [],
      );
      setTags(Array.isArray(tagsResponse.data.tags) ? tagsResponse.data.tags : []);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to load categories and tags",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(loadOptions, 0);
    return () => clearTimeout(timeoutId);
  }, [loadOptions]);

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

  const resetForm = () => setForm(initialForm);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      const parsedNewCategories = parseNewCategories(form.newCategoriesInput);
      const parsedNewTags = parseNewTags(form.newTagsInput);

      const response = await axios.post(
        "http://localhost:5000/api/blogs/",
        {
          title: form.name,
          content: form.description,
          categoryIds: form.categoryIds,
          newCategoryNames: parsedNewCategories,
          tagIds: form.tagIds,
          newTagNames: parsedNewTags,
        },
        { withCredentials: true },
      );

      setFeedback({
        type: "success",
        message: response.data.message || "Blog created successfully",
      });
      resetForm();
      await loadOptions();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to create blog",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardShell title="Add Blogs" requiredPermission="blogs">
      <div className="grid grid-cols-1 xl:grid-cols-[520px_minmax(0,1fr)] gap-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">Add Blog</p>
          <h2 className="mt-3 text-[26px] font-semibold">Create Blog</h2>
          <p className="mt-3 text-white/55 leading-relaxed">
            Categories and tags are optional. If you do not choose any category the blog will go
            into Uncategorized automatically.
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

          <label className="block mt-6">
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

          <label className="block mt-5">
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

          <div className="mt-5 rounded-[20px] border border-white/10 bg-black/20 p-4">
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
            <input
              type="text"
              name="newCategoriesInput"
              value={form.newCategoriesInput}
              onChange={handleChange}
              placeholder="Add new categories, separated by commas"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
            />
          </div>

          <div className="mt-5 rounded-[20px] border border-white/10 bg-black/20 p-4">
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

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving || loading}
              className="rounded-2xl bg-[#03B8B8] px-6 py-3.5 text-black font-semibold hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Add Blog"}
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

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h3 className="text-[22px] font-semibold">Available Options</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/50 uppercase tracking-[0.18em]">Categories</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.length === 0 ? (
                  <span className="text-white/45 text-sm">No categories yet</span>
                ) : (
                  categories.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/75"
                    >
                      {category.name}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-white/50 uppercase tracking-[0.18em]">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.length === 0 ? (
                  <span className="text-white/45 text-sm">No tags yet</span>
                ) : (
                  tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full border border-[#03B8B8]/20 bg-[#03B8B8]/10 px-3 py-1 text-sm text-[#38FFF2]"
                    >
                      {tag.name}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
