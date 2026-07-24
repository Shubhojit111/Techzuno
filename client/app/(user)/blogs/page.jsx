import BlogHero from "@/components/blog/BlogHero";
import BlogSections from "@/components/blog/BlogSections";
import blogs, { getBlogs } from "@/data/blogData";

// export const metadata = {
//   title: "Blog | Techzuno — Web Development, App Development & Design Insights",
//   description: "Insights on web development, app development, UI/UX, and SEO from the Techzuno team - practical guidance for growing your business online.",
//   url: "https://techzuno.com/blogs",
// };

export default async function BlogPage() {


  const blogs = await getBlogs()

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <BlogHero />
      <BlogSections blogs={blogs} />
    </main>
  );
}