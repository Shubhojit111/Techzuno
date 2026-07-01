"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { Edit3, Trash2, Plus, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function BlogTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

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
    const timeoutId = setTimeout(loadTags, 0);
    return () => clearTimeout(timeoutId);
  }, [loadTags]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      slug: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          {
            withCredentials: true,
          },
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
    const confirmed = window.confirm("Delete this tag?");
    if (!confirmed) return;

    setDeletingId(id);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/tags/${id}`,
        {
          withCredentials: true,
        },
      );
      setFeedback({
        type: "success",
        message: response.data.message || "Tag deleted successfully",
      });
      if (editingId === id) {
        resetForm();
      }
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
  return (
    <DashboardShell title="Blog Tags" requiredPermission="blogs">
      <div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tags</h1>
            <p className="text-zinc-400 mt-2 max-w-2xl">Organize and refine the discovery system for your blog content. Manage existing metadata or generate new classification nodes.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-colors">
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#38FFF2] text-black font-semibold hover:bg-[#38FFF2]/90 transition-colors">
              <Plus size={18} />
              Add Tag
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-8 items-start">
          {/* Create/Edit Form */}
          <div className="h-fit bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-6">
            <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase mb-1">
              {editingId ? "Edit" : "Create New"}
            </p>
            <h2 className="text-xl font-semibold text-white mb-6">
              {editingId ? "Edit Tag" : "Create New Tag"}
            </h2>

            {feedback.message ? (
              <div
                className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
                  feedback.type === "success"
                    ? "border-[#38FFF2]/20 bg-[#38FFF2]/10 text-[#38FFF2]"
                    : "border-red-500/20 bg-red-500/10 text-red-300"
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Tag Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/30 focus:bg-black/40 transition-colors text-white"
                  placeholder="e.g., cyber-security"
                  required
                />
              </label>

              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Slug (Optional)</span>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/30 focus:bg-black/40 transition-colors text-zinc-300"
                  placeholder="e.g., cyber-security-2024"
                />
              </label>

              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/30 focus:bg-black/40 transition-colors resize-none text-white"
                  placeholder="Brief context for this tag..."
                />
              </label>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-[#38FFF2] px-6 py-3 text-black font-semibold hover:bg-[#38FFF2]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Tag"
                      : "Create Tag"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full rounded-xl border border-white/10 bg-transparent px-6 py-3 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tags List */}
          <div className="space-y-6">
            {/* Metrics/Trending (dummy for now) */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-5">
              <div className="flex items-center gap-2 text-zinc-400 mb-4">
                <TrendingUp size={18} />
                <span className="uppercase tracking-wide font-medium">Trending Clusters</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1.5 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 text-[#38FFF2] text-xs">Cloud Infrastructure (42)</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-xs">FinTech (38)</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-xs">AI/ML (31)</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-xs">React Query (25)</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-xs">TypeScript (22)</span>
              </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-sm font-medium tracking-wider uppercase">
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Slug</th>
                      <th className="px-6 py-4 font-medium">Count</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-6 py-4"><div className="h-4 bg-white/5 rounded w-24"></div></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/5 rounded w-20"></div></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/5 rounded w-12"></div></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/5 rounded w-16 ml-auto"></div></td>
                        </tr>
                      ))
                    ) : tags.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-zinc-500">
                          No tags created yet.
                        </td>
                      </tr>
                    ) : (
                      tags.map((tag) => (
                        <tr key={tag.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#38FFF2]"></div>
                              <span className="text-white font-medium">{tag.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-zinc-400 text-sm">{tag.slug || "—"}</td>
                          <td className="px-6 py-4 text-zinc-400 text-sm">
                            <span className="px-2 py-0.5 rounded-md text-center border-white/10 text-xs">
                              {tag.count || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => handleEdit(tag)}
                                className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(tag.id)}
                                disabled={deletingId === tag.id}
                                className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {!loading && tags.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 text-xs text-zinc-500">
                  <span>Showing {tags.length} tags</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">Previous</button>
                    <button className="px-3 py-1 rounded-md bg-[#38FFF2]/10 border border-[#38FFF2]/20 text-[#38FFF2] font-medium">1</button>
                    <button className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
