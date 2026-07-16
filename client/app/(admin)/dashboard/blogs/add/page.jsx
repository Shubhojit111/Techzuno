"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ChevronLeft,
  Settings,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  Image as ImageIcon,
  FileText,
  AlertCircle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

// Dynamically import CustomTiptapEditor to avoid SSR issues in Next.js
const CustomTiptapEditor = dynamic(
  () => import("@/components/admin/CustomTiptapEditor"),
  { ssr: false },
);

const initialForm = {
  name: "",
  description: "",
  categoryIds: [],
  newCategoriesInput: "",
  tagIds: [],
  newTagsInput: "",
  blogImage: "",
};

// Reusable Collapsible Sidebar Section Component
const SidebarSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-white/5">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.02] transition-colors"
    >
      <span className="uppercase tracking-wider">{title}</span>
      {isOpen ? (
        <ChevronDown className="w-4 h-4 text-zinc-500" />
      ) : (
        <ChevronRight className="w-4 h-4 text-zinc-500" />
      )}
    </button>
    {isOpen && <div className="px-4 pb-4 space-y-3">{children}</div>}
  </div>
);

export default function AddBlogsPage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState(initialForm);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [createdBlogSlug, setCreatedBlogSlug] = useState(null); // For view blog button
  const { user } = useContext(AuthContext) || {};
  const [author, setAuthor] = useState("");

  // Sidebar controls
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState("post"); // "post" or "block"

  // Accordion section controls
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);

  const loadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const editId = new URLSearchParams(window.location.search).get("edit");
      const requests = [
        axios.get("http://localhost:5000/api/blogs/categories", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/blogs/tags", {
          withCredentials: true,
        }),
      ];
      if (editId) {
        requests.push(
          axios.get(`http://localhost:5000/api/blogs/${editId}`, {
            withCredentials: true,
          }),
        );
      }

      const [categoriesResponse, tagsResponse, blogResponse] =
        await Promise.all(requests);

      setCategories(
        Array.isArray(categoriesResponse.data.categories)
          ? categoriesResponse.data.categories
          : [],
      );
      setTags(
        Array.isArray(tagsResponse.data.tags) ? tagsResponse.data.tags : [],
      );

      if (editId && blogResponse?.data?.blog) {
        const blog = blogResponse.data.blog;
        setEditingBlogId(editId);
        setAuthor(blog.User?.name || blog.User?.email || "Blog Expert");
        setForm({
          name: blog.title || "",
          description: blog.content || "",
          categoryIds: Array.isArray(blog.Categories)
            ? blog.Categories.map((category) => category.id)
            : [],
          newCategoriesInput: "",
          tagIds: Array.isArray(blog.Tags)
            ? blog.Tags.map((tag) => tag.id)
            : [],
          newTagsInput: "",
          blogImage: blog.blogImage || "",
          author: blog.User?.name || blog.User?.email || "Blog Expert",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message || "Unable to load categories and tags",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(loadOptions, 0);
    return () => clearTimeout(timeoutId);
  }, [loadOptions]);

  useEffect(() => {
    if (!editingBlogId) {
      setAuthor(user?.name || user?.email || "Admin");
    }
  }, [editingBlogId, user]);

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

  const parseNewCategories = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const parseNewTags = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleFeaturedImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      "http://localhost:5000/api/upload/image",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setForm((prev) => ({ ...prev, blogImage: response.data.url }));
  };

  const handleCoverDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleFeaturedImageUpload(file);
  };

  const buildPayload = () => ({
    title: form.name,
    content: form.description,
    categoryIds: form.categoryIds,
    newCategoryNames: parseNewCategories(form.newCategoriesInput),
    tagIds: form.tagIds,
    newTagNames: parseNewTags(form.newTagsInput),
    blogImage: form.blogImage,
  });

  const handleUpdate = async () => {
    const response = await axios.patch(
      `http://localhost:5000/api/blogs/${editingBlogId}`,
      buildPayload(),
      { withCredentials: true },
    );

    setFeedback({
      type: "success",
      message: response.data.message || "Blog updated successfully",
    });
    // If response has blog data, set slug/id for view button
    if (response.data.blog) {
      setCreatedBlogSlug(response.data.blog.slug || response.data.blog.id);
    }
  };

  const handleCreate = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/blogs/",
      buildPayload(),
      { withCredentials: true },
    );

    setFeedback({
      type: "success",
      message: response.data.message || "Blog created successfully",
    });
    // If response has blog data, set slug/id for view button
    if (response.data.blog) {
      setCreatedBlogSlug(response.data.blog.slug || response.data.blog.id);
    }
    resetForm();
    await loadOptions();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      if (editingBlogId) {
        await handleUpdate();
      } else {
        await handleCreate();
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          (editingBlogId ? "Unable to update blog" : "Unable to create blog"),
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardShell
        title={editingBlogId ? "Edit Blog" : "Add Blogs"}
        requiredPermission="blogs"
      >
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-[#38FFF2] rounded-full animate-spin"></div>
          <span className="text-zinc-400 font-medium text-sm">
            Loading editor assets...
          </span>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={editingBlogId ? "Edit Blog" : "Add Blogs"}
      requiredPermission="blogs"
    >
      <form
        onSubmit={handleSubmit}
        className="relative flex h-fit flex-col"
      >
        {/* ── TOP HEADER BAR ────────────────────────────────────────────── */}
        <div className="sticky top-0 z-20 -mx-1 mb-6 flex flex-col gap-4  px-1 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {editingBlogId ? "Edit Blog Post" : "Create Blog Post"}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Compose and publish your blog post
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Cancel/Reset */}
            <button
              type="button"
              onClick={() => {
                if (editingBlogId) {
                  window.location.href = "/dashboard/blogs";
                  return;
                }
                resetForm();
              }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{editingBlogId ? "Cancel" : "Reset"}</span>
            </button>

            {/* Save as Draft */}
            {/* <button
              type="button"
              onClick={() =>
                setFeedback({
                  type: "error",
                  message: "Draft status is not connected in the API yet.",
                })
              }
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <FileText className="w-4 h-4" />
              <span>Save as Draft</span>
            </button> */}

            {/* Save/Publish */}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#03B8B8] hover:bg-[#38FFF2] text-black font-bold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(3,184,184,0.2)] hover:shadow-[0_4px_16px_rgba(56,255,242,0.35)] cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingBlogId ? "Update Post" : "Publish Post"}</span>
                </>
              )}
            </button>

            {/* Sidebar Toggle Gear */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2.5 border rounded-xl transition-all duration-200 cursor-pointer ${
                isSidebarOpen
                  ? "border-[#38FFF2]/30 bg-[#38FFF2]/10 text-[#38FFF2]"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
              title="Toggle Sidebar Panel"
            >
              <Settings className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback.message && (
          <div
            className={`mb-6 border rounded-2xl  px-4 py-3 text-sm flex items-center justify-between ${
              feedback.type === "success"
                ? "border-[#03B8B8]/20 bg-[#03B8B8]/10 text-[#38FFF2]"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{feedback.message}</span>
            </div>

            {feedback.type === "success" && createdBlogSlug && (
              <Link
                href={`/blog/${createdBlogSlug}`}
                className="flex items-center gap-2 text-white hover:text-[#38FFF2] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                  View Blog
                  <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {/* ── MAIN WORKSPACE CONTAINER ────────────────────────────────── */}
        <div className="relative flex flex-1 flex-col items-stretch gap-6 overflow-x-hidden lg:flex-row ">
          {/* LEFT: WHITE BOARD EDITOR CANVAS */}
          <div className="flex-1 min-w-0">
            <div className="flex w-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-5 h-5 text-zinc-400" />
                <div>
                  <h2 className="text-white font-semibold text-sm">
                    Cover Image
                  </h2>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    Recommended: 1200 x 630 pixels
                  </p>
                </div>
              </div>

              {/* Cover Image Upload (Prominent, first) */}
              <div
                onDrop={handleCoverDrop}
                onDragOver={(event) => event.preventDefault()}
                className="group relative mb-6 flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#38FFF2]/20 bg-black/20 transition-all hover:border-[#38FFF2]/45 hover:bg-black/25"
                style={{ minHeight: form.blogImage ? "auto" : "200px" }}
              >
                {form.blogImage ? (
                  <>
                    <img
                      src={form.blogImage}
                      alt="Cover"
                      className="w-full h-48 md:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <label className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Change Cover
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFeaturedImageUpload(file);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, blogImage: "" }))
                        }
                        className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-zinc-500 hover:text-[#03B8B8] transition-colors p-8 absolute inset-0">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-[#03B8B8]/10 group-hover:border-[#03B8B8]/30 transition-all">
                      <Plus className="w-6 h-6 text-[#03B8B8]" />
                    </div>
                    <span className="text-sm font-bold text-white mb-1">
                      Drag & drop image here
                    </span>
                    <span className="text-xs text-zinc-500">
                      or click to browse
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFeaturedImageUpload(file);
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Document Title Input */}
              <div className="flex flex-col mb-6">
                <div className="mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-sm">
                  <span className="font-semibold text-zinc-300">Title</span>
                  <span className="text-xs text-zinc-500">
                    {form.name.length} / 120
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter blog post title..."
                  maxLength={120}
                  className="text-sm md:text-base font-medium text-white placeholder-zinc-600 outline-none w-full rounded-2xl px-4 py-3.5 border border-dashed border-[#38FFF2]/20 bg-black/20 transition-all hover:border-[#38FFF2]/45 hover:bg-black/25"
                  required
                />
              </div>

              {/* Rich Text Editor */}
              <div className="mb-2 text-sm">
                <span className="font-semibold text-zinc-300">Content</span>
              </div>
              <div className="flex flex-col rounded-2xl overflow-hidden border border-dashed border-[#38FFF2]/20 bg-black/20 transition-all hover:border-[#38FFF2]/45 hover:bg-black/25">
                <CustomTiptapEditor
                  value={form.description}
                  onChange={(content) => {
                    setForm((prev) => ({
                      ...prev,
                      description: content,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR CONTAINER (DESKTOP FLEX + SMOOTH COLLAPSE) */}
          <div className="relative flex shrink-0 ">
            {/* Desktop Slide/Drag Toggle Bar */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute -left-5 top-1/2 z-20 hidden h-20 w-5 -translate-y-1/2 items-center justify-center rounded-l-xl border border-white/5 bg-[#0A0F1C] text-zinc-400 shadow-lg outline-none transition-colors hover:bg-[#0E1528] hover:text-[#38FFF2] lg:flex"
              title={isSidebarOpen ? "Hide Options" : "Show Options"}
            >
              {isSidebarOpen ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Sidebar Content Panel */}
            <div
              className={`hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 ease-in-out lg:flex lg:flex-col ${
                isSidebarOpen
                  ? "w-[300px] opacity-100 visible"
                  : "w-0 opacity-0 invisible overflow-hidden border-transparent"
              }`}
            >
              {/* Inner wrapper to lock content width during collapse transition */}
              <div className="flex h-full w-[300px] flex-1 flex-col">
                {/* Tabs (Post vs Block) */}
                <div className="flex border-b border-white/5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setSidebarTab("post")}
                    className={`flex-1 py-3.5 text-center text-xs font-bold border-b-2 uppercase tracking-wide transition-all cursor-pointer ${
                      sidebarTab === "post"
                        ? "border-[#38FFF2] text-[#38FFF2]"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarTab("block")}
                    className={`flex-1 py-3.5 text-center text-xs font-bold border-b-2 uppercase tracking-wide transition-all cursor-pointer ${
                      sidebarTab === "block"
                        ? "border-[#38FFF2] text-[#38FFF2]"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Block
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {sidebarTab === "post" ? (
                    <div className="flex flex-col">
                      {/* Section 1: Status & Visibility */}
                      <SidebarSection
                        title="Status & visibility"
                        isOpen={statusExpanded}
                        onToggle={() => setStatusExpanded(!statusExpanded)}
                      >
                        <div className="space-y-3.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500">Status</span>
                            <span className="text-[#38FFF2] font-semibold bg-[#38FFF2]/5 px-2 py-0.5 rounded border border-[#38FFF2]/10 uppercase tracking-wider text-[12px]">
                              {editingBlogId ? "Editing" : "Draft"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500">Publish</span>
                            <span className="text-zinc-300 font-medium">
                              Immediately
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500">Author</span>
                            <span className="text-zinc-300 font-medium truncate text-right max-w-[150px]">
                              {author}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-zinc-500 block mb-1">
                              Permalink Slug
                            </span>
                            <div className="flex rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-zinc-400 select-all font-mono truncate text-[11px]">
                              {form.name
                                ? form.name
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)+/g, "")
                                : "slug-will-appear-here"}
                            </div>
                          </div>
                        </div>
                      </SidebarSection>

                      {/* Section 2: Categories */}
                      <SidebarSection
                        title="Categories"
                        isOpen={categoriesExpanded}
                        onToggle={() =>
                          setCategoriesExpanded(!categoriesExpanded)
                        }
                      >
                        <div className="space-y-2.5 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                          {categories.length === 0 ? (
                            <p className="text-zinc-500 text-xs italic">
                              No categories available.
                            </p>
                          ) : (
                            categories.map((category) => (
                              <label
                                key={category.id}
                                className="flex items-center gap-2.5 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={form.categoryIds.includes(
                                    category.id,
                                  )}
                                  onChange={() => toggleCategory(category.id)}
                                  className="rounded border-white/10 bg-black/40 text-[#03B8B8] focus:ring-[#03B8B8] focus:ring-offset-0 h-4 w-4 transition-colors"
                                />
                                <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                  {category.name}
                                </span>
                              </label>
                            ))
                          )}
                        </div>
                        <div className="pt-2.5 border-t border-white/5 space-y-2">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                            Add New Category
                          </span>
                          <input
                            type="text"
                            name="newCategoriesInput"
                            value={form.newCategoriesInput}
                            onChange={handleChange}
                            placeholder="Type name, separated by commas"
                            className="w-full text-xs rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-[#03B8B8] text-zinc-200 placeholder-zinc-600 transition-colors"
                          />
                        </div>
                      </SidebarSection>

                      {/* Section 3: Tags */}
                      <SidebarSection
                        title="Tags"
                        isOpen={tagsExpanded}
                        onToggle={() => setTagsExpanded(!tagsExpanded)}
                      >
                        <div className="space-y-2.5 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                          {tags.length === 0 ? (
                            <p className="text-zinc-500 text-xs italic">
                              No tags available.
                            </p>
                          ) : (
                            tags.map((tag) => (
                              <label
                                key={tag.id}
                                className="flex items-center gap-2.5 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={form.tagIds.includes(tag.id)}
                                  onChange={() => toggleTag(tag.id)}
                                  className="rounded border-white/10 bg-black/40 text-[#03B8B8] focus:ring-[#03B8B8] focus:ring-offset-0 h-4 w-4 transition-colors"
                                />
                                <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                  {tag.name}
                                </span>
                              </label>
                            ))
                          )}
                        </div>
                        <div className="pt-2.5 border-t border-white/5 space-y-2">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                            Add New Tags
                          </span>
                          <input
                            type="text"
                            name="newTagsInput"
                            value={form.newTagsInput}
                            onChange={handleChange}
                            placeholder="Type tags, separated by commas"
                            className="w-full text-xs rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-[#03B8B8] text-zinc-200 placeholder-zinc-600 transition-colors"
                          />
                        </div>
                      </SidebarSection>

                      <SidebarSection
                        title="Featured Image"
                        isOpen={imageExpanded}
                        onToggle={() => setImageExpanded(!imageExpanded)}
                      >
                        <div className="space-y-3">
                          {form.blogImage ? (
                            <img
                              src={form.blogImage}
                              alt="Featured preview"
                              className="h-28 w-full rounded-xl object-cover"
                            />
                          ) : (
                            <div className="rounded-xl border border-dashed border-white/10 p-5 text-center">
                              <Image className="mx-auto mb-2 h-7 w-7 text-zinc-500" />
                              <span className="text-xs font-semibold text-zinc-500">
                                No image selected
                              </span>
                            </div>
                          )}
                          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-[#38FFF2] transition-colors hover:bg-white/5">
                            <Image className="h-4 w-4" />
                            Set featured image
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFeaturedImageUpload(file);
                              }}
                            />
                          </label>
                        </div>
                      </SidebarSection>

                      {/* Section 5: Yoast SEO */}
                      <SidebarSection
                        title="Yoast SEO"
                        isOpen={seoExpanded}
                        onToggle={() => setSeoExpanded(!seoExpanded)}
                      >
                        <div className="space-y-3.5">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                            <div className="text-xs">
                              <span className="text-zinc-500">
                                SEO analysis:{" "}
                              </span>
                              <span className="text-rose-400 font-semibold">
                                Needs improvement
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                            <div className="text-xs">
                              <span className="text-zinc-500">
                                Readability analysis:{" "}
                              </span>
                              <span className="text-emerald-400 font-semibold">
                                Good
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="w-full text-[11px] py-2 px-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-center text-zinc-300 font-semibold cursor-pointer"
                          >
                            Improve post with Yoast SEO
                          </button>
                        </div>
                      </SidebarSection>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500">
                      <FileText className="w-10 h-10 mx-auto mb-3 text-zinc-600" />
                      <p className="text-sm font-semibold text-zinc-400">
                        No Block Selected
                      </p>
                      <p className="text-xs text-zinc-600 mt-1 max-w-[200px] mx-auto leading-relaxed">
                        Select a specific text block inside the whiteboard area
                        to modify its individual attributes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* MOBILE OVERLAY DRAWER PANEL */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex pointer-events-auto">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-80 max-w-[90%] bg-[#0A0F1C] border-l border-white/5 h-full flex flex-col justify-between py-0 ml-auto animate-in slide-in-from-right duration-250 shadow-2xl">
            {/* Header / Tabs */}
            <div className="flex border-b border-white/5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setSidebarTab("post")}
                className={`flex-1 py-4 text-center text-xs font-bold border-b-2 uppercase tracking-wide transition-all ${
                  sidebarTab === "post"
                    ? "border-[#38FFF2] text-[#38FFF2]"
                    : "border-transparent text-zinc-500"
                }`}
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("block")}
                className={`flex-1 py-4 text-center text-xs font-bold border-b-2 uppercase tracking-wide transition-all ${
                  sidebarTab === "block"
                    ? "border-[#38FFF2] text-[#38FFF2]"
                    : "border-transparent text-zinc-500"
                }`}
              >
                Block
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="px-4 text-zinc-400 hover:text-white border-l border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
              {sidebarTab === "post" ? (
                <div className="flex flex-col">
                  {/* Status */}
                  <SidebarSection
                    title="Status & visibility"
                    isOpen={statusExpanded}
                    onToggle={() => setStatusExpanded(!statusExpanded)}
                  >
                    <div className="space-y-3.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Status</span>
                        <span className="text-[#38FFF2] font-semibold bg-[#38FFF2]/5 px-2 py-0.5 rounded border border-[#38FFF2]/10 uppercase tracking-wider text-[10px]">
                          {editingBlogId ? "Editing" : "Draft"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Publish</span>
                        <span className="text-zinc-300 font-medium">
                          Immediately
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Author</span>
                        <span className="text-zinc-300 font-medium truncate text-right max-w-[130px]">
                          {author}
                        </span>
                      </div>
                    </div>
                  </SidebarSection>

                  {/* Categories */}
                  <SidebarSection
                    title="Categories"
                    isOpen={categoriesExpanded}
                    onToggle={() => setCategoriesExpanded(!categoriesExpanded)}
                  >
                    <div className="space-y-2.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-2.5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form.categoryIds.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="rounded border-white/10 bg-black/40 text-[#03B8B8] h-4 w-4"
                          />
                          <span className="text-xs text-zinc-400">
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <input
                        type="text"
                        name="newCategoriesInput"
                        value={form.newCategoriesInput}
                        onChange={handleChange}
                        placeholder="Add categories, comma-separated"
                        className="w-full text-xs rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-[#03B8B8] text-zinc-200 placeholder-zinc-600"
                      />
                    </div>
                  </SidebarSection>

                  {/* Tags */}
                  <SidebarSection
                    title="Tags"
                    isOpen={tagsExpanded}
                    onToggle={() => setTagsExpanded(!tagsExpanded)}
                  >
                    <div className="space-y-2.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                      {tags.map((tag) => (
                        <label
                          key={tag.id}
                          className="flex items-center gap-2.5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form.tagIds.includes(tag.id)}
                            onChange={() => toggleTag(tag.id)}
                            className="rounded border-white/10 bg-black/40 text-[#03B8B8] h-4 w-4"
                          />
                          <span className="text-xs text-zinc-400">
                            {tag.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <input
                        type="text"
                        name="newTagsInput"
                        value={form.newTagsInput}
                        onChange={handleChange}
                        placeholder="Add tags, comma-separated"
                        className="w-full text-xs rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-[#03B8B8] text-zinc-200 placeholder-zinc-600"
                      />
                    </div>
                  </SidebarSection>

                  {/* Image */}
                  <SidebarSection
                    title="Featured Image"
                    isOpen={imageExpanded}
                    onToggle={() => setImageExpanded(!imageExpanded)}
                  >
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-5 text-center">
                      <Image className="w-7 h-7 mx-auto mb-2 text-zinc-500" />
                      <span className="text-xs text-[#03B8B8] font-semibold">
                        Set featured image
                      </span>
                    </div>
                  </SidebarSection>
                </div>
              ) : (
                <div className="p-6 text-center text-zinc-500">
                  <FileText className="w-10 h-10 mx-auto mb-3" />
                  <p className="text-xs">
                    No block selected. Choose an element in the whiteboard
                    editor area to inspect properties.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
