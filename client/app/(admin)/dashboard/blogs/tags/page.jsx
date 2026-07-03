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

const ROWS_PER_PAGE = 8;
const MAX_TRENDING = 6;

export default function BlogTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  const loadTags = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/blogs/tags", {
        withCredentials: true,
      });
      setTags(Array.isArray(response.data.tags) ? response.data.tags : []);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to load tags",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", slug: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (tag) => {
    setEditingId(tag.id);
    setFeedback({ type: "", message: "" });
    setForm({
      name: tag.name || "",
      slug: tag.slug || "",
      description: tag.description || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = editingId
        ? await axios.patch(
            `http://localhost:5000/api/blogs/tags/${editingId}`,
            form,
            { withCredentials: true },
          )
        : await axios.post("http://localhost:5000/api/blogs/tags", form, {
            withCredentials: true,
          });
      setFeedback({
        type: "success",
        message:
          response.data.message ||
          `Tag ${editingId ? "updated" : "created"} successfully`,
      });
      resetForm();
      await loadTags();
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          `Unable to ${editingId ? "update" : "create"} tag`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tag?")) return;
    setDeletingId(id);
    setFeedback({ type: "", message: "" });
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/tags/${id}`,
        { withCredentials: true },
      );
      setFeedback({
        type: "success",
        message: response.data.message || "Tag deleted successfully",
      });
      if (editingId === id) resetForm();
      await loadTags();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to delete tag",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Sort by count desc, take top N for trending bar
  const trendingTags = useMemo(
    () =>
      [...tags]
        .filter((t) => (t.count ?? 0) > 0)
        .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
        .slice(0, MAX_TRENDING),
    [tags],
  );

  const totalPages = Math.max(1, Math.ceil(tags.length / ROWS_PER_PAGE));

  const paginatedTags = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return tags.slice(start, start + ROWS_PER_PAGE);
  }, [tags, page]);

  return (
    <DashboardShell title="Blog Tags" requiredPermission="blogs">
      <div>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tags</h1>
            <p className="text-zinc-400 text-sm mt-1.5 max-w-xl">
              Create and manage blog tags for granular content discovery.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#38FFF2] text-black font-semibold hover:bg-[#38FFF2]/90 transition-colors shrink-0"
          >
            <Plus size={16} />
            New Tag
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

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
          {/* ── Left: Form ─────────────────────────────────────── */}
          <div className="bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-6 flex flex-col">
            <p className="text-[#38FFF2] text-[10px] tracking-[0.3em] uppercase mb-1">
              {editingId ? "Editing" : "Create New"}
            </p>
            <h2 className="text-lg font-semibold text-white mb-5">
              {editingId ? "Edit Tag" : "New Tag"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 flex-1"
            >
              <label className="block">
                <span className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">
                  Tag Name *
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/40 focus:bg-black/40 transition-colors text-white text-sm placeholder-zinc-600"
                  placeholder="e.g., cyber-security"
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
                  placeholder="e.g., cyber-security-2024"
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
                  placeholder="Brief context for this tag..."
                />
              </label>

              <div className="flex flex-col gap-2.5 mt-auto pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-[#38FFF2] px-6 py-3 text-black font-semibold text-sm hover:bg-[#38FFF2]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving…" : editingId ? "Update Tag" : "Create Tag"}
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
          <div className="flex flex-col gap-4">
            {/* Trending Tags — sorted by count from real data */}
            <div className="bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={15} className="text-[#38FFF2]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                  Trending Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-20 rounded-lg bg-white/5 animate-pulse"
                      />
                    ))
                ) : trendingTags.length === 0 ? (
                  <span className="text-zinc-600 text-xs">
                    No usage data yet — counts will appear as tags are used.
                  </span>
                ) : (
                  trendingTags.map((tag, i) => (
                    <span
                      key={tag.id}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border cursor-default transition-colors ${
                        i === 0
                          ? "bg-[#38FFF2]/15 border-[#38FFF2]/30 text-[#38FFF2]"
                          : "bg-white/3 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                      }`}
                    >
                      {tag.name}{" "}
                      <span className="opacity-60">({tag.count ?? 0})</span>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Tags Table — fixed height, real pagination */}
            <div className="bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden  flex flex-col">
              {/* Table header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div>
                  <p className="text-white font-semibold text-sm">All Tags</p>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    {loading ? "Loading…" : `${tags.length} total`}
                  </p>
                </div>
              </div>

              {/* Fixed-height scrollable area */}
              <div
                className="overflow-auto no-scrollbar"
                style={{ height: "352px" }}
              >
                <table className="w-full text-left border-collapse min-w-[380px]">
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
                    ) : paginatedTags.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-14 text-center text-zinc-600 text-sm"
                        >
                          {tags.length === 0
                            ? "No tags yet. Create your first one →"
                            : "No results on this page."}
                        </td>
                      </tr>
                    ) : (
                      paginatedTags.map((tag) => (
                        <tr
                          key={tag.id}
                          className={`hover:bg-white/[0.02] transition-colors ${
                            editingId === tag.id
                              ? "bg-[#38FFF2]/[0.03] border-l-2 border-[#38FFF2]/40"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#38FFF2] shrink-0" />
                              <span className="text-white font-medium text-sm">
                                {tag.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-zinc-500 text-sm font-mono">
                            {tag.slug || "—"}
                          </td>
                          <td className="px-6 py-3.5 text-zinc-500 text-sm font-mono">
                            {tag.description || "—"}
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="px-2 py-0.5 rounded-md text-xs border border-white/10 text-zinc-400">
                              {tag.count ?? 0}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-0.5">
                              <button
                                type="button"
                                onClick={() => handleEdit(tag)}
                                className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(tag.id)}
                                disabled={deletingId === tag.id}
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
                  {tags.length === 0
                    ? "No tags"
                    : `${(page - 1) * ROWS_PER_PAGE + 1}–${Math.min(
                        page * ROWS_PER_PAGE,
                        tags.length,
                      )} of ${tags.length}`}
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
      </div>
    </DashboardShell>
  );
}
