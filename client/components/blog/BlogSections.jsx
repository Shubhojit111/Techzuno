import BlogCard from "@/components/blog/BlogCard";

export default function BlogSections({ blogs }) {
  return (
    <section className="bg-black pb-24 pt-12">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
            // console.log(blog)
            
          ))}
        </div>
      </div>
    </section>
  );
}
