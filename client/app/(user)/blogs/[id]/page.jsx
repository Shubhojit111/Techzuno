"use client";

import Assets from "@/Assets/Assets";
import { repairBlogHtml } from "@/utils/repairBlogContent";
import DOMPurify from "isomorphic-dompurify";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowBigDown } from "lucide-react";

const getBlogHref = (blog) => `/blogs/${blog?.slug || blog?.id}`;

export default function BlogDetailPage() {
  const params = useParams();
  const identifier = params.id;
  const [blog, setBlog] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevBlog, setPrevBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);

  const categories = Array.isArray(blog?.Categories) ? blog.Categories : [];
  const tags = Array.isArray(blog?.Tags) ? blog.Tags : [];

  const sanitizedContent = useMemo(() => {
    const repairedContent = repairBlogHtml(blog?.content || "");

    return DOMPurify.sanitize(repairedContent, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "alt",
        "class",
        "colspan",
        "data-checked",
        "data-id",
        "data-label",
        "data-type",
        "data-youtube-video",
        "frameborder",
        "height",
        "href",
        "rel",
        "rowspan",
        "scrolling",
        "src",
        "style",
        "target",
        "title",
        "width",
      ],
    });
  }, [blog?.content]);

  useEffect(() => {
    let isActive = true;

    const getBlogAndAllBlogs = async () => {
      setLoading(true);

      try {
        const blogRes = await axios.get(
          `http://localhost:5000/api/blogs/${identifier}`,
        );
        const currentBlog = blogRes.data.blog;

        if (!isActive) return;
        setBlog(currentBlog);

        const allBlogsRes = await axios.get("http://localhost:5000/api/blogs");
        const blogs = Array.isArray(allBlogsRes.data.blogs)
          ? allBlogsRes.data.blogs
          : [];

        const currentIndex = blogs.findIndex((b) => b.id === currentBlog.id);
        if (currentIndex !== -1) {
          if (currentIndex > 0) {
            setPrevBlog(blogs[currentIndex - 1]);
          } else {
            setPrevBlog(null);
          }
          if (currentIndex < blogs.length - 1) {
            setNextBlog(blogs[currentIndex + 1]);
          } else {
            setNextBlog(null);
          }
        }

        const currentCategoryIds =
          currentBlog.Categories?.map((category) => category.id) || [];
        const currentTagIds = currentBlog.Tags?.map((tag) => tag.id) || [];

        const similar = blogs
          .filter((candidate) => candidate.id !== currentBlog.id)
          .map((candidate) => {
            let score = 0;

            candidate.Categories?.forEach((category) => {
              if (currentCategoryIds.includes(category.id)) score += 3;
            });
            candidate.Tags?.forEach((tag) => {
              if (currentTagIds.includes(tag.id)) score += 1;
            });

            return { ...candidate, similarityScore: score };
          })
          .filter((candidate) => candidate.similarityScore > 0)
          .sort((a, b) => b.similarityScore - a.similarityScore)
          .slice(0, 4);

        if (isActive) setSimilarBlogs(similar);
      } catch (error) {
        console.error(
          "Unable to load blog",
          error.response?.data || error.message,
        );
        if (isActive) {
          setBlog(null);
          setSimilarBlogs([]);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    if (identifier) getBlogAndAllBlogs();

    return () => {
      isActive = false;
    };
  }, [identifier]);

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
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-screen flex flex-col justify-center pt-6 md:pt-20 lg:pt-26 pb-0 md:pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute -top-10 left-0 w-full h-full z-0">
          <Image
            src={Assets.BlogsBg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full flex flex-col items-center">
          <div className="flex h-full w-full max-w-[950px] flex-col items-center justify-center">
            {categories.length > 0 && (
              <div className=" flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <span
                    key={category.id}
                    className="text-white bg-gray-500 py-1 px-3.5 rounded-tr-md rounded-bl-md font-normal tracking-[0.15em] text-[10px] uppercase mb-5 leading-relaxed line-clamp-2"
                  >
                    {category.name || category.slug}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-white text-[34px] sm:text-[56px] lg:text-[95px] font-bold leading-[1.2] sm:leading-[1.1] tracking-wide text-center uppercase line-clamp-4">
              {blog.title}
            </h1>

            <div className="hidden lg:flex text-white absolute left-20 -bottom-20 text-sm gap-2 leading-none ">
              SCROLL DOWN
              <ArrowBigDown className="w-4 h-4 text-white animate-bounce" />
            </div>

            <div className="hidden lg:flex text-white absolute right-6 sm:right-10 lg:right-20 -bottom-10 lg:-bottom-20 text-sm pt-10 gap-4">
              {prevBlog && (
                <Link
                  href={getBlogHref(prevBlog)}
                  className="text-white hover:-translate-x-2 transition-transform duration-300 inline-block font-medium tracking-wider"
                >
                  &larr; Previous
                </Link>
              )}
              {prevBlog && nextBlog && <span className="text-white/30">|</span>}
              {nextBlog && (
                <Link
                  href={getBlogHref(nextBlog)}
                  className="text-white hover:translate-x-2 transition-transform duration-300 inline-block font-medium tracking-wider"
                >
                  Next &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 sm:px-10 lg:px-[320px] mx-auto relative  z-10 w-full flex flex-col items-center h-fit">
        <div className="w-full h-auto border border-cyan-400/20 max-w-[800px] overflow-hidden shadow-2xl shadow-cyan-500/10">
          <Image
            src={blog.blogImage || Assets.ServiceHeader}
            alt={blog.title || "Techzuno"}
            height={800}
            width={2000}
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <article className="w-full mx-auto px-6 sm:px-10 pt-4 pb-10 md:pt-6 md:pb-18">
        <div
          className="techzuno-blog-content mx-auto w-full max-w-[800px]"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {tags.length > 0 && (
          <div className="mt-14 flex flex-wrap w-full justify-center items-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="text-white bg-gray-500 py-1 px-3 rounded-tr-md rounded-bl-md font-normal tracking-[0.20em] text-[10px] uppercase mb-5 leading-relaxed line-clamp-2"
              >
                <span className="text-gray-800">#</span> {tag.name || tag.slug}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center mb-20">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 border border-cyan-400/20 text-white/40 px-6 py-2.5 rounded-full text-[11px] tracking-[0.25em] uppercase hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
          >
            &larr; All Blogs
          </Link>
        </div>
      </article>

      {similarBlogs.length > 0 && (
        <section className="w-full px-6 sm:px-10 lg:px-62 pb-24 bg-linear-to-b from-black/50 to-black">
          <div className="mx-auto">
            <h2 className="text-white/80 text-sm tracking-[0.2em] uppercase mb-8">
              MAY BE YOU WANT TO READ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5">
              {similarBlogs.map((similarBlog) => (
                <Link
                  key={similarBlog.id}
                  href={getBlogHref(similarBlog)}
                  className="group block"
                >
                  <article className="flex flex-col h-full">
                    <div className="rounded-md h-[200px] md:h-[220px] lg:h-[160px] w-full overflow-hidden mb-4 ">
                      <Image
                        src={similarBlog.blogImage || Assets.WebDev1}
                        alt={similarBlog.title}
                        height={800}
                        width={2000}
                        className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-white text-base font-medium leading-relaxed mb-2 group-hover:text-cyan-200 transition-colors">
                      {similarBlog.title}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {similarBlog.createdAt
                        ? new Date(similarBlog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : ""}
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
