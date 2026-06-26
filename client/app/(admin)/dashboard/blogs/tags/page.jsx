"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
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
      <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">
            Tag
          </p>
          <h2 className="mt-3 text-[26px] font-semibold">
            {editingId ? "Edit Tag" : "Create Tag"}
          </h2>

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
              placeholder="Enter tag name"
              required
            />
          </label>

          <label className="block mt-5">
            <span className="block text-sm text-white/70 mb-2">Slug</span>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
              placeholder="Enter tag slug"
            />
          </label>

          <label className="block mt-5">
            <span className="block text-sm text-white/70 mb-2">
              Description
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors resize-y"
              placeholder="Write tag description"
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-[#03B8B8] px-6 py-3.5 text-black font-semibold hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : editingId ? "Update Tag" : "Add Tag"}
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

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="text-[18px] font-semibold">All Tags</h2>
            <p className="mt-1 text-sm text-white/50">
              {loading ? "Loading..." : `${tags.length} total`}
            </p>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="px-6 py-10 text-white/65">Loading tags...</div>
            ) : tags.length === 0 ? (
              <div className="px-6 py-10 text-white/65">
                No tags created yet.
              </div>
            ) : (
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="text-left text-white/50 text-[12px] uppercase tracking-[0.18em] border-b border-white/10">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4">Count</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tags.map((tag) => (
                    <tr key={tag.id}>
                      <td className="px-6 py-5 text-white/85 font-medium">
                        {tag.name}
                      </td>
                      <td className="px-6 py-5 text-white/55 max-w-[280px]">
                        <p className="line-clamp-2">{tag.description || "-"}</p>
                      </td>
                      <td className="px-6 py-5 text-white/55">{tag.slug}</td>
                      <td className="px-6 py-5 text-white/65">{tag.count}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleEdit(tag)}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-white/75 hover:bg-white/[0.08] hover:text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(tag.id)}
                            disabled={deletingId === tag.id}
                            className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-2 text-red-300 hover:bg-red-500/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {deletingId === tag.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
