import Assets from "@/Assets/Assets";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {

  return (
    <Link href={`/blogs/${blog.id}`} className="group block w-full">
      <article className="flex flex-col w-full mt-4">
        {/* Categories */}
        <p className="text-white font-normal tracking-[0.22em] text-[11px] uppercase mb-3 leading-relaxed">
          {blog.Categories.map((cat, index) => {
            return (
              <span
                key={cat.id}
                className="hover:text-[#38FFF2] transition-colors duration-300"
              >
                {cat.name || cat.slug}
                {index < blog.Categories.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>

        {/* Title */}
        <h3 className="text-white font-bold text-[20px] md:text-[22px] leading-[1.3] uppercase tracking-[0.06em] group-hover:text-[#B8FAFF] transition-colors duration-300">
          {blog.title}
        </h3>

        {/* Cover Image */}
        <div className="mt-5 rounded-xl overflow-hidden border border-white/10 bg-black">
          <div className="w-full h-[240px] sm:h-[420px] lg:h-[200px]">
            <Image
              src={blog.image || Assets.WebDev1}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* content */}
        <p className="mt-4 text-white/80 text-[14px] leading-[1.75] tracking-wider line-clamp-3">
          {blog.content}
        </p>
      </article>
    </Link>
  );
}
