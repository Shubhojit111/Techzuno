"use client";

import BlogCard from "@/components/blog/BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const BLOGS_PER_PAGE = 6;

export default function BlogSections({ blogs, loading = false }) {
  const [page, setPage] = useState(1);
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  const totalPages = Math.max(1, Math.ceil(safeBlogs.length / BLOGS_PER_PAGE));

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * BLOGS_PER_PAGE;
    return safeBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [safeBlogs, page]);

  const visiblePages = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "...", totalPages];
  }, [totalPages]);

  return (
    <section className="bg-black pb-24 pt-12">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {loading ? (
            <p className="col-span-full py-10 text-center text-sm uppercase tracking-[0.25em] text-white/50">
              Loading blogs...
            </p>
          ) : paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="col-span-full py-10 text-center text-sm uppercase tracking-[0.25em] text-white/50">
              No blogs found
            </p>
          )}
        </div>

        {totalPages > 1 && !loading && (
          <div className="flex items-start justify-center gap-3 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} className="text-zinc-400" />
            </button>
            {visiblePages.map((pg, i) => (
              <button
                key={i}
                onClick={() => typeof pg === "number" && setPage(pg)}
                disabled={pg === "..."}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                  pg === page
                    ? "bg-[#38FFF2]/20 border border-[#38FFF2]/30 text-[#38FFF2]"
                    : pg === "..."
                      ? "cursor-default text-zinc-500"
                      : "border border-white/10 bg-white/[0.02] hover:bg-white/5 text-zinc-400"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} className="text-zinc-400" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}