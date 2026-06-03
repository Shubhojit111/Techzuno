import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";

export default function BlogCard({ post }) {
  return (
    <article className="w-full ">
      <HeaderBtn text={post.tag || "BLOG"} className="text-[14px] uppercase" />

      <h3 className="mt-2 text-white font-bold text-[18px] md:text-[25px] leading-[1.2] uppercase tracking-[1.3]">
        {post.title}
      </h3>

      <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 bg-black">
        <div className="w-full h-[240px] sm:h-[420px] lg:h-[220px]">
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <p className="mt-3 text-white/95 text-[16px] md:text-[18px] lg:text-[14px]  line-clamp-2">
        {post.excerpt}
      </p>

      <div className="mt-4 flex items-center gap-3 text-white/85 text-[11px]">
        <div className=" h-[26px] w-[26px] md:h-9 md:w-9 lg:h-7 lg:w-7 rounded-full bg-white/10 border border-white/10 shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-[14px] md:text-[16px] lg:text-[14px]">by {post.author}</p>
          <p className="text-white/40">on {post.date}</p>
        </div>
      </div>
    </article>
  );
}

