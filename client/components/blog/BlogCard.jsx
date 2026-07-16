import Assets from "@/Assets/Assets";
import Image from "next/image";
import Link from "next/link";

const getExcerpt = (html = "") =>
  String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

export default function BlogCard({ blog }) {

  return (
    <Link href={`/blogs/${blog.id}`} className="group block w-full">
      <article className="flex flex-col w-full mt-4 hover:border p-2 duration-300 rounded-xl border-white/50 hover:scale-105 ">
        {/* Categories */}
        <p className="text-white font-normal tracking-[0.20em] text-[10px] uppercase mb-3 leading-relaxed line-clamp-2">
          {blog.Categories.map((cat, index) => {
            return (
              <span
                key={cat.id}
                className="hover:text-[#38FFF2] transition-colors duration-300 "
              >
                {cat.name || cat.slug}
                {index < blog.Categories.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>

        {/* Title */}
        <h3 className="text-white font-bold text-[20px] md:text-[22px] leading-[1.3] uppercase tracking-[0.06em] group-hover:text-[#B8FAFF] transition-colors duration-300 line-clamp-3">
          {blog.title}
        </h3>

        {/* Cover Image */}
        <div className="mt-5 rounded-xl overflow-hidden border border-white/10 bg-black">
          <div className="w-full h-[240px] sm:h-[420px] lg:h-fit">
            <Image
              src={blog.blogImage || Assets.WebDev1}
              alt={blog.title || "Blog Title"}
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* content */}
        <p className="mt-4 text-white/80 text-[14px] leading-[1.75] tracking-wider line-clamp-3">
          {getExcerpt(blog.content)}
        </p>
      </article>
    </Link>
  );
}
