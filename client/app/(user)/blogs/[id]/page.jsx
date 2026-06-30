"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { blogPosts } from "@/data/blogData";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const params = useParams();
  const id = Number(params.id);

const [blog, setBlog] = useState(null);
const [loading, setLoading] = useState(true);

  const getBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setBlog(res.data.blog);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

 if (loading) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      Loading...
    </main>
  );
}

if (!blog) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      Error 404
    </main>
  );
}

  return (
    <main className="flex flex-col bg-black min-h-screen text-white font-sans">
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-screen flex flex-col justify-center pt-40 md:pt-52 lg:pt-40 pb-10 md:pb-16 lg:pb-20 overflow-hidden">
        {/* Background full width image */}
        <div className="absolute -top-5 left-0 w-full h-full z-0 ">
          <Image
            src={Assets.BlogsBg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full flex flex-col items-center ">
          <div className="flex h-full w-full flex-col items-center justify-center max-w-[900px]">
            <div className="flex gap-3 mb-4">
              {blog.Categories?.map((cat) => {
                return (
                  <div
                    key={cat.id}
                    className="bg-gray-600/80  flex gap-2 rounded-lg rounded-tr-none rounded-bl-none"
                  >
                    <p className="text-[12px] uppercase leading-none tracking-[1.3] px-3 py-1.5 ">
                      {cat.name || cat.slug}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-white px-12 text-[28px]  md:text-[56px] lg:text-[76px] font-semibold uppercase tracking-[3.5px] leading-tight text-center">
              {blog.title}
            </p>

            <span className="text-white mx-auto text-sm pt-10">
              SCROLL DOWN
            </span>
          </div>
        </div>
      </section>

      <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full flex flex-col items-center max-w-[900px]  ">
        <div className="w-[700px] h-[450px] rounded-3xl overflow-hidden ">
          <Image
            src={blog.blogImage || Assets.ServiceHeader}
            alt={blog.title}
            className="object-cover h-full w-full"
            priority
          />
        </div>
      </div>

      <article className="max-w-[800px] w-full mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        {/* Paragraphs */}
        <div className="space-y-6 md:space-y-8">
          <p className="text-white/75 text-[16px] md:text-[17px] leading-[1.9] tracking-[0.01em]">
            {blog.content}
          </p>
        </div>

        {/* Tags */}
        {blog.Tags?.length > 0 && (
          <div className="mt-14 flex flex-wrap w-full justify-center items-center gap-3">
            {blog.Tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-gray-600/80 flex gap-12 rounded-lg rounded-tr-none rounded-bl-none"
              >
                <p className="text-[12px] leading-none tracking-[1.5] uppercase px-3 py-1.5 ">
                  {tag.name || tag.slug}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Prev / Next */}
        {/* <div className="mt-12 pt-8 border-t border-white/8 flex justify-between items-center md:hidden">
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
        </div> */}

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
