"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Assets from "@/Assets/Assets";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";

export default function BlogDetailPage() {
  const params = useParams();
  const id = Number(params.id);

const [blog, setBlog] = useState(null);
const [allBlogs, setAllBlogs] = useState([]);
const [similarBlogs, setSimilarBlogs] = useState([]);
const [loading, setLoading] = useState(true);
const contentRef = useRef(null);
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
    "data-section",
  ],
});
const authorName = blog?.User?.name || blog?.User?.email || "Techzuno";

  const getBlogAndAllBlogs = async () => {
    try {
      const blogRes = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
        withCredentials: true,
      });
      const currentBlog = blogRes.data.blog;
      setBlog(currentBlog);

      const allBlogsRes = await axios.get(`http://localhost:5000/api/blogs`, {
        withCredentials: true,
      });
      const blogs = allBlogsRes.data.blogs;
      setAllBlogs(blogs);

      const currentCategoryIds = currentBlog.Categories?.map(c => c.id) || [];
      const currentTagIds = currentBlog.Tags?.map(t => t.id) || [];

      const similar = blogs
        .filter(b => b.id !== currentBlog.id)
        .map(b => {
          let score = 0;
          b.Categories?.forEach(cat => {
            if (currentCategoryIds.includes(cat.id)) score += 3;
          });
          b.Tags?.forEach(tag => {
            if (currentTagIds.includes(tag.id)) score += 1;
          });
          return { ...b, similarityScore: score };
        })
        .filter(b => b.similarityScore > 0)
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, 4);

      setSimilarBlogs(similar);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogAndAllBlogs();
  }, [id]);

  // Auto-number h2 headings
  useEffect(() => {
    if (!contentRef.current || loading) return;
    const h2Headings = contentRef.current.querySelectorAll('h2');
    h2Headings.forEach((heading, index) => {
      heading.setAttribute('data-section', String(index + 1).padStart(2, '0'));
    });
  }, [blog, loading]);

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
                    className="bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border border-cyan-400/20 flex gap-2 rounded-full px-4 py-1.5"
                  >
                    <p className="text-[11px] uppercase leading-none tracking-[0.25em] text-cyan-300 font-semibold">
                      {cat.name || cat.slug}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-white px-12 text-[32px] sm:text-[48px] lg:text-[64px] xl:text-[72px] font-bold leading-[1.1] tracking-tight text-center line-clamp-4">
              {blog.title}
            </p>

            <div className="mt-6 flex items-center gap-6 text-white/70 text-sm tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-black font-bold text-xs">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                By {authorName}
              </span>
              {blog.createdAt ? (
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              ) : null}
            </div>

            <span className="text-white mx-auto text-sm pt-10">
              SCROLL DOWN
            </span>
          </div>
        </div>
      </section>

      <div className="px-6 sm:px-10 lg:px-[320px] mx-auto relative z-10 w-full flex flex-col items-center h-fit ">
        <div className="w-full h-auto border border-cyan-400/20 max-w-[750px] overflow-hidden rounded-xl shadow-2xl shadow-cyan-500/10">
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
          ref={contentRef}
          className="techzuno-blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <style jsx global>{`
          .techzuno-blog-content {
            color: rgba(255, 255, 255, 0.85);
            font-size: 17px;
            line-height: 1.8;
            letter-spacing: 0.02em;
          }
          @media (min-width: 768px) {
            .techzuno-blog-content {
              font-size: 18px;
            }
          }

          .techzuno-blog-content > * + * {
            margin-top: 1.75rem;
          }

          .techzuno-blog-content h1 {
            font-size: 2.75rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.15;
            letter-spacing: 0.02em;
            margin-top: 3rem;
            margin-bottom: 1rem;
          }
          
          .techzuno-blog-content h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.25;
            margin-top: 2.75rem;
            margin-bottom: 1rem;
            position: relative;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .techzuno-blog-content h2::before {
            content: attr(data-section) || "";
            font-size: 1.5rem;
            font-weight: 800;
            color: #38FFF2;
            opacity: 0.9;
            min-width: 2.5rem;
          }

          .techzuno-blog-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #B8FAFF;
            line-height: 1.35;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
          }
          
          .techzuno-blog-content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #ffffff;
            line-height: 1.4;
            margin-top: 1.75rem;
            margin-bottom: 0.5rem;
          }

          .techzuno-blog-content p {
            color: rgba(255, 255, 255, 0.8);
          }
          
          .techzuno-blog-content strong {
            color: #ffffff;
            font-weight: 700;
          }
          
          .techzuno-blog-content em {
            font-style: italic;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .techzuno-blog-content u {
            text-decoration: underline;
            text-underline-offset: 3px;
            text-decoration-thickness: 2px;
            text-decoration-color: #38FFF2;
          }
          
          .techzuno-blog-content s {
            text-decoration: line-through;
            opacity: 0.6;
          }

          .techzuno-blog-content a {
            color: #38FFF2;
            text-decoration: none;
            border-bottom: 1px solid rgba(56, 255, 242, 0.3);
            transition: all 0.2s ease;
          }
          
          .techzuno-blog-content a:hover {
            color: #03B8B8;
            border-bottom-color: #03B8B8;
          }

          .techzuno-blog-content ul,
          .techzuno-blog-content ol {
            padding-left: 1.75rem;
          }
          
          .techzuno-blog-content ul {
            list-style: disc;
          }
          
          .techzuno-blog-content ol {
            list-style: decimal;
          }
          
          .techzuno-blog-content li {
            margin: 0.6rem 0;
            color: rgba(255, 255, 255, 0.8);
          }
          
          .techzuno-blog-content li::marker {
            color: #38FFF2;
          }
          
          .techzuno-blog-content li[data-checked] {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .techzuno-blog-content ul[data-type="taskList"] {
            list-style: none;
            padding-left: 0;
          }
          
          .techzuno-blog-content li[data-type="taskItem"] {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            list-style: none;
          }
          
          .techzuno-blog-content li[data-type="taskItem"] > label {
            margin-top: 0.25rem;
          }
          
          .techzuno-blog-content li[data-type="taskItem"] input {
            accent-color: #03B8B8;
            width: 1.1rem;
            height: 1.1rem;
          }

          .techzuno-blog-content blockquote {
            border-left: 4px solid #38FFF2;
            padding: 1.25rem 1.75rem;
            background: linear-gradient(90deg, rgba(56, 255, 242, 0.08), transparent);
            border-radius: 0 12px 12px 0;
            color: rgba(255, 255, 255, 0.9);
            font-style: italic;
            margin: 2rem 0;
          }

          .techzuno-blog-content code {
            background: rgba(56, 255, 242, 0.1);
            border-radius: 6px;
            padding: 0.2em 0.5em;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 0.88em;
            color: #38FFF2;
          }
          
          .techzuno-blog-content pre {
            background: #050505;
            border: 1px solid rgba(56, 255, 242, 0.15);
            border-radius: 16px;
            padding: 1.5rem 1.75rem;
            overflow-x: auto;
            font-size: 0.95rem;
            margin: 2rem 0;
          }
          
          .techzuno-blog-content pre code {
            background: none;
            color: #e4e4e7;
            padding: 0;
            font-size: 0.95rem;
          }

          .techzuno-blog-content hr {
            border: none;
            border-top: 1px solid rgba(56, 255, 242, 0.15);
            margin: 2.5rem 0;
          }

          .techzuno-blog-content table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
            margin: 2rem 0;
          }
          
          .techzuno-blog-content th {
            background: rgba(56, 255, 242, 0.08);
            color: #ffffff;
            text-align: left;
            padding: 0.85rem 1.1rem;
            border: 1px solid rgba(56, 255, 242, 0.2);
            font-weight: 600;
          }
          
          .techzuno-blog-content td {
            padding: 0.75rem 1.1rem;
            border: 1px solid rgba(56, 255, 242, 0.1);
            color: rgba(255, 255, 255, 0.8);
          }

          .techzuno-blog-content img {
            display: block;
            max-width: 100%;
            height: auto;
            margin: 2rem auto;
            border-radius: 20px;
            border: 1px solid rgba(56, 255, 242, 0.15);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
          }

          .techzuno-blog-content .tiptap-mention,
          .techzuno-blog-content [data-type="mention"] {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            background: rgba(56, 255, 242, 0.18);
            color: #38FFF2;
            padding: 0.1rem 0.6rem;
            font-weight: 700;
          }

          .techzuno-blog-content div[data-youtube-video] {
            display: flex;
            justify-content: center;
            margin: 2rem 0;
          }
          
          .techzuno-blog-content div[data-youtube-video] iframe {
            border-radius: 16px;
            max-width: 100%;
            width: 100%;
            aspect-ratio: 16 / 9;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          }

          .techzuno-blog-content mark {
            border-radius: 4px;
            padding: 0.1em 0.3em;
            background: rgba(56, 255, 242, 0.25);
            color: #ffffff;
          }
        `}</style>

        {/* Tags */}
        {blog.Tags?.length > 0 && (
          <div className="mt-14 flex flex-wrap w-full justify-center items-center gap-3">
            {blog.Tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-gradient-to-r from-cyan-500/10 to-teal-500/5 border border-cyan-400/20 flex items-center gap-2 rounded-full px-4 py-1.5"
              >
                <p className="text-[11px] leading-none tracking-[0.2em] uppercase text-cyan-300 font-semibold">
                  {tag.name || tag.slug}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Back to blogs */}
        <div className="mt-10 flex justify-center mb-20">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 border border-cyan-400/20 text-white/40 px-6 py-2.5 rounded-full text-[11px] tracking-[0.25em] uppercase hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
          >
            ← All Blogs
          </Link>
        </div>
      </article>

      {/* Similar Posts Section (like image 1) */}
      {similarBlogs.length > 0 && (
        <section className="w-full px-6 sm:px-10 lg:px-62 pb-24 bg-gradient-to-b from-black/50 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white/80 text-sm tracking-[0.2em] uppercase mb-10">
              MAY BE YOU WANT TO READ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarBlogs.map((similarBlog) => (
                <Link
                  key={similarBlog.id}
                  href={`/blogs/${similarBlog.id}`}
                  className="group block"
                >
                  <article className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-cyan-400/10">
                      <div className="w-full h-full relative">
                        <Image
                          src={similarBlog.blogImage || Assets.WebDev1}
                          alt={similarBlog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <h3 className="text-white text-base font-medium leading-relaxed mb-2 group-hover:text-cyan-200 transition-colors">
                      {similarBlog.title}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {similarBlog.createdAt ? new Date(similarBlog.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      }) : ''}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}