"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const ROWS_PER_PAGE = 7;
const MAX_TRENDING = 7;

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blogs/categories",
        { withCredentials: true },
      );
      console.log(response.data);
      setCategories(
        Array.isArray(response.data.categories) ? response.data.categories : [],
      );
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to load categories",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", slug: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFeedback({ type: "", message: "" });
    setForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = editingId
        ? await axios.patch(
            `http://localhost:5000/api/blogs/categories/${editingId}`,
            form,
            { withCredentials: true },
          )
        : await axios.post("http://localhost:5000/api/blogs/categories", form, {
            withCredentials: true,
          });
      setFeedback({
        type: "success",
        message:
          response.data.message ||
          `Category ${editingId ? "updated" : "created"} successfully`,
      });
      resetForm();
      await loadCategories();
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          `Unable to ${editingId ? "update" : "create"} category`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    setDeletingId(id);
    setFeedback({ type: "", message: "" });
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/categories/${id}`,
        { withCredentials: true },
      );
      setFeedback({
        type: "success",
        message: response.data.message || "Category deleted successfully",
      });
      if (editingId === id) {
        resetForm();
      }
      await loadCategories();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to delete category",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Sort by count desc, take top N for trending bar
  const trendingCategories = useMemo(
    () =>
      [...categories]
        .filter((c) => (c.count ?? 0) > 0)
        .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
        .slice(0, MAX_TRENDING),
    [categories],
  );

  const totalPages = Math.max(1, Math.ceil(categories.length / ROWS_PER_PAGE));

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return categories.slice(start, start + ROWS_PER_PAGE);
  }, [categories, page]);

  return (
    <DashboardShell title="Blog Categories" requiredPermission="blogs">
      <div>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Categories</h1>
            <p className="text-zinc-400 text-sm mt-1.5 max-w-xl">
              Organize and manage blog categories for better content discovery.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#38FFF2] text-black font-semibold hover:bg-[#38FFF2]/90 transition-colors shrink-0"
          >
            <Plus size={16} />
            New Category
          </button>
        </div>

        {/* Feedback */}
        {feedback.message && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-[#38FFF2]/20 bg-[#38FFF2]/10 text-[#38FFF2]"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Two-column layout: form left, table right — equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
          {/* ── Left: Create / Edit Form ───────────────────────── */}
          <div className="bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] h-full rounded-2xl p-6 flex flex-col">
            <p className="text-[#38FFF2] text-[10px] tracking-[0.3em] uppercase mb-1">
              {editingId ? "Editing" : "Create New"}
            </p>
            <h2 className="text-lg font-semibold text-white mb-5">
              {editingId ? "Edit Category" : "New Category"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 flex-1"
            >
              <label className="block">
                <span className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">
                  Category Name *
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/40 focus:bg-black/40 transition-colors text-white text-sm placeholder-zinc-600"
                  placeholder="e.g., Technology"
                  required
                />
              </label>

              <label className="block">
                <span className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">
                  Slug{" "}
                  <span className="normal-case text-zinc-600">(optional)</span>
                </span>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/40 focus:bg-black/40 transition-colors text-zinc-300 text-sm placeholder-zinc-600"
                  placeholder="e.g., technology"
                />
              </label>

              <label className="block flex-1">
                <span className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">
                  Description{" "}
                  <span className="normal-case text-zinc-600">(optional)</span>
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/40 focus:bg-black/40 transition-colors resize-none text-white text-sm placeholder-zinc-600"
                  placeholder="Brief context for this category..."
                />
              </label>

              <div className="flex flex-col gap-2.5 mt-auto pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-[#38FFF2] px-6 py-3 text-black font-semibold text-sm hover:bg-[#38FFF2]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving
                    ? "Saving…"
                    : editingId
                      ? "Update Category"
                      : "Create Category"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full rounded-xl border border-white/10 bg-transparent px-6 py-3 text-zinc-400 text-sm hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ── Right: Trending + Table ─────────────────────────── */}
          <div className="flex flex-col bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
            {/* Table header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div>
                <p className="text-white font-semibold text-sm">
                  All Categories
                </p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {loading ? "Loading…" : `${categories.length} total`}
                </p>
              </div>
            </div>

            {/* Scrollable table body — FIXED HEIGHT, never grows */}
            <div
              className="overflow-auto no-scrollbar"
              style={{ height: "408px" }}
            >
              <table className="w-full text-left border-collapse min-w-[420px]">
                <thead className="sticky top-0 z-10 bg-[#0c0e17]">
                  <tr className="border-b border-white/5 text-[10px] font-bold tracking-[0.14em] uppercase text-zinc-500">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Count</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {loading ? (
                    Array(ROWS_PER_PAGE)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-6 py-3.5">
                            <div className="h-3.5 bg-white/5 rounded w-28" />
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="h-3.5 bg-white/5 rounded w-20" />
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="h-3.5 bg-white/5 rounded w-8" />
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="h-3.5 bg-white/5 rounded w-14 ml-auto" />
                          </td>
                        </tr>
                      ))
                  ) : paginatedCategories.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-16 text-center text-zinc-600 text-sm"
                      >
                        {categories.length === 0
                          ? "No categories yet. Create your first one"
                          : "No results on this page."}
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((category) => (
                      <tr
                        key={category.id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          editingId === category.id
                            ? "bg-[#38FFF2]/[0.03] border-l-2 border-[#38FFF2]/40"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#38FFF2] shrink-0" />
                            <span className="text-white font-medium text-sm">
                              {category.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-zinc-500 text-sm font-mono">
                          {category.slug || "—"}
                        </td>
                        <td className="px-6 py-3.5 text-zinc-500 text-sm font-mono">
                          {category.description || "—"}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="px-2 py-0.5 rounded-md text-xs border border-white/10 text-zinc-400">
                            {category.count ?? 0}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-0.5">
                            <button
                              type="button"
                              onClick={() => handleEdit(category)}
                              className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(category.id)}
                              disabled={deletingId === category.id}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/5 text-xs text-zinc-500 bg-white/[0.01]">
              <span>
                {categories.length === 0
                  ? "No categories"
                  : `${(page - 1) * ROWS_PER_PAGE + 1}–${Math.min(
                      page * ROWS_PER_PAGE,
                      categories.length,
                    )} of ${categories.length}`}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={13} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pg) => (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-colors ${
                        pg === page
                          ? "bg-[#38FFF2]/20 border border-[#38FFF2]/30 text-[#38FFF2]"
                          : "border border-white/10 bg-white/[0.02] hover:bg-white/5 text-zinc-400"
                      }`}
                    >
                      {pg}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
