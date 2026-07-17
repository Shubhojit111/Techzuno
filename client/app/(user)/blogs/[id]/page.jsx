"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Assets from "@/Assets/Assets";
import axios from "axios";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

export default function BlogDetailPage() {
  const params = useParams();
  const id = Number(params.id);

const [blog, setBlog] = useState(null);
const [loading, setLoading] = useState(true);
const sanitizedContent = DOMPurify.sanitize(blog?.content || "", {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: [
    "allow",
    "allowfullscreen",
    "frameborder",
    "scrolling",
    "target",
    "rel",
    "style",
    "data-youtube-video",
    "data-type",
    "data-id",
    "data-label",
    "data-checked",
    "checked",
  ],
});
const authorName = blog?.User?.name || blog?.User?.email || "Techzuno";

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
            <p className="text-white px-12 text-[28px] md:text-[56px] lg:text-[76px] font-semibold uppercase tracking-[3.5px] leading-tight text-center line-clamp-4">
              {blog.title}
            </p>

            <div className="mt-6 flex items-center gap-3 text-white/70 text-xs tracking-[0.18em] uppercase">
              <span>By {authorName}</span>
              {blog.createdAt ? <span>{new Date(blog.createdAt).toLocaleDateString()}</span> : null}
            </div>

            <span className="text-white mx-auto text-sm pt-10">
              SCROLL DOWN
            </span>
          </div>
        </div>
      </section>

      <div className="px-6 sm:px-10 lg:px-[320px] mx-auto relative z-10 w-full flex flex-col items-center h-fit ">
        <div className="w-full h-auto  max-w-[750px] overflow-hidden ">
          <Image
            src={blog.blogImage || Assets.ServiceHeader}
            alt={blog.title || "Techzuno"}
            height={800}
            width={2000}
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <article className="max-w-[800px] w-full mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        <div
          className="techzuno-blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <style jsx global>{`
          .techzuno-blog-content {
            color: rgba(255, 255, 255, 0.75);
            font-size: 16px;
            line-height: 1.9;
            letter-spacing: 0.01em;
          }
          @media (min-width: 768px) {
            .techzuno-blog-content {
              font-size: 17px;
            }
          }

          .techzuno-blog-content > * + * {
            margin-top: 1.5rem;
          }

          .techzuno-blog-content h1 {
            font-size: 2.25rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.25;
            letter-spacing: 0.01em;
          }
          .techzuno-blog-content h2 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.3;
          }
          .techzuno-blog-content h3 {
            font-size: 1.375rem;
            font-weight: 700;
            color: #f4f4f5;
            line-height: 1.4;
          }

          .techzuno-blog-content strong {
            color: #ffffff;
            font-weight: 700;
          }
          .techzuno-blog-content em {
            font-style: italic;
          }
          .techzuno-blog-content u {
            text-decoration: underline;
            text-underline-offset: 2px;
            text-decoration-thickness: 1px;
          }
          .techzuno-blog-content s {
            text-decoration: line-through;
            opacity: 0.7;
          }

          .techzuno-blog-content a {
            color: #38fff2;
            text-decoration: underline;
            text-underline-offset: 2px;
            transition: color 0.2s ease;
          }
          .techzuno-blog-content a:hover {
            color: #03b8b8;
          }

          .techzuno-blog-content ul,
          .techzuno-blog-content ol {
            padding-left: 1.5rem;
          }
          .techzuno-blog-content ul {
            list-style: disc;
          }
          .techzuno-blog-content ol {
            list-style: decimal;
          }
          .techzuno-blog-content li {
            margin: 0.4rem 0;
          }
          .techzuno-blog-content li[data-checked] {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .techzuno-blog-content ul[data-type="taskList"] {
            list-style: none;
            padding-left: 0;
          }
          .techzuno-blog-content li[data-type="taskItem"] {
            display: flex;
            align-items: flex-start;
            gap: 0.65rem;
            list-style: none;
          }
          .techzuno-blog-content li[data-type="taskItem"] > label {
            margin-top: 0.25rem;
          }
          .techzuno-blog-content li[data-type="taskItem"] input {
            accent-color: #03b8b8;
          }

          .techzuno-blog-content blockquote {
            border-left: 3px solid #03b8b8;
            padding: 0.75rem 1.25rem;
            background: rgba(3, 184, 184, 0.06);
            border-radius: 0 10px 10px 0;
            color: rgba(255, 255, 255, 0.85);
            font-style: italic;
          }

          .techzuno-blog-content code {
            background: rgba(255, 255, 255, 0.08);
            padding: 0.15em 0.4em;
            font-family: ui-monospace, monospace;
            font-size: 0.9em;
            color: #38fff2;
          }
          .techzuno-blog-content pre {
            background: #0a0a0a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1.25rem 1.5rem;
            overflow-x: auto;
            font-size: 0.9rem;
          }
          .techzuno-blog-content pre code {
            background: none;
            color: #e4e4e7;
            padding: 0;
          }

          .techzuno-blog-content hr {
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin: 2rem 0;
          }

          .techzuno-blog-content table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
          }
          .techzuno-blog-content th {
            background: rgba(255, 255, 255, 0.06);
            color: #ffffff;
            text-align: left;
            padding: 0.6rem 0.9rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .techzuno-blog-content td {
            padding: 0.55rem 0.9rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.75);
          }

          .techzuno-blog-content img {
            display: block;
            max-width: 100%;
            height: auto;
            margin: 1.75rem auto;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
          }

          .techzuno-blog-content .tiptap-mention,
          .techzuno-blog-content [data-type="mention"] {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            background: rgba(3, 184, 184, 0.14);
            color: #38fff2;
            padding: 0.05rem 0.45rem;
            font-weight: 700;
          }

          .techzuno-blog-content div[data-youtube-video] {
            display: flex;
            justify-content: center;
            margin: 1.5rem 0;
          }
          .techzuno-blog-content div[data-youtube-video] iframe {
            border-radius: 14px;
            max-width: 100%;
            width: 100%;
            aspect-ratio: 16 / 9;
          }

          .techzuno-blog-content mark {
            border-radius: 3px;
            padding: 0 0.15em;
          }
        `}</style>

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
