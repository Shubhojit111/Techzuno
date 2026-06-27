"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { blogPosts } from "@/data/blogData";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";

export default function BlogDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const postIndex = blogPosts.findIndex((p) => p.id === id);
  const post = blogPosts[postIndex];

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  /* ── 404 fallback ── */
  if (!post) {
    return (
      <main className="flex flex-col bg-black min-h-screen text-white">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
          <p className="text-[#38FFF2] text-[11px] tracking-[0.3em] uppercase mb-4">
            404
          </p>
          <h1 className="font-toxigenesis text-[40px] md:text-[60px] uppercase font-bold mb-6">
            Post Not Found
          </h1>
          <p className="text-white/50 mb-10 max-w-sm leading-relaxed">
            The blog post you are looking for doesn&apos;t exist or may have
            been removed.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 border border-[#03B8B8] text-[#38FFF2] px-6 py-2.5 rounded-full text-[13px] tracking-widest uppercase hover:bg-[#03B8B8]/10 transition-all"
          >
            Back to Blogs
          </Link>
        </div>
        <CTA />
      </main>
    );
  }

  return (
    <main className="flex flex-col bg-black min-h-screen text-white font-sans">
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-screen flex flex-col justify-center pt-40 md:pt-52 lg:pt-40 pb-10 md:pb-16 lg:pb-20 overflow-hidden">
        {/* Background full width image */}
        <div className="absolute top-0 left-0 w-full h-full z-0 ">
          <Image
            src={Assets.BlogsBg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full flex flex-col items-center ">
          <div className="flex h-full w-full flex-col items-center justify-center max-w-4xl">
            <div className="flex gap-3 mb-4">
              {post.categories?.map((cat) => {
                return (
                  <div
                    key={cat}
                    className="bg-gray-600/80  flex gap-2 rounded-lg rounded-tr-none rounded-bl-none"
                  >
                    <p className="text-[12px] leading-none tracking-[1.3] px-3 py-1.5 ">
                      {cat}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-white px-12 text-[28px]  md:text-[56px] lg:text-[80px] font-semibold uppercase tracking-[3.5px] leading-[1.25] text-center">
              {post.title}
            </p>

            <span className="text-white mx-auto text-sm pt-10">
              SCROLL DOWN
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COVER IMAGE
      ═══════════════════════════════════════ */}
      <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full flex flex-col items-center max-w-4xl  ">
        <div className="w-[700px] h-[450px] rounded-3xl overflow-hidden ">
          <Image
            src={post.image}
            alt={post.title}
            className="object-cover h-full w-full"
            priority
          />
        </div>
      </div>

      <article className="max-w-3xl w-full mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        {/* Paragraphs */}
        <div className="space-y-6 md:space-y-8">
          {post.contentParagraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-white/75 text-[16px] md:text-[17px] leading-[1.9] tracking-[0.01em]"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-14 flex flex-wrap w-full justify-center items-center gap-3">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="bg-gray-600/80 flex gap-8 rounded-lg rounded-tr-none rounded-bl-none"
              >
                <p className="text-[14px] leading-none tracking-[1.5] uppercase px-3 py-1.5 ">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Prev / Next */}
        <div className="mt-12 pt-8 border-t border-white/8 flex justify-between items-center md:hidden">
          {prevPost ? (
            <Link
              href={`/blogs/${prevPost.id}`}
              className="text-[11px] tracking-[0.2em] text-white/40 uppercase hover:text-[#38FFF2] transition-colors"
            >
              ← Prev
            </Link>
          ) : (
            <span className="text-[11px] tracking-[0.2em] text-white/20 uppercase">
              ← Prev
            </span>
          )}
          {nextPost ? (
            <Link
              href={`/blogs/${nextPost.id}`}
              className="text-[11px] tracking-[0.2em] text-white/40 uppercase hover:text-[#38FFF2] transition-colors"
            >
              Next →
            </Link>
          ) : (
            <span className="text-[11px] tracking-[0.2em] text-white/20 uppercase">
              Next →
            </span>
          )}
        </div>

        {/* Back to blogs */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 border border-white/10 text-white/40 px-6 py-2.5 rounded-full text-[11px] tracking-[0.25em] uppercase hover:border-[#03B8B8]/50 hover:text-[#38FFF2] transition-all duration-300"
          >
            ← All Blogs
          </Link>
        </div>
      </article>
    </main>
  );
}
