import BlogHero from "@/components/blog/BlogHero";
import BlogSections from "@/components/blog/BlogSections";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";

const posts = [
  {
    id: 1,
    tag: "BLOG",
    title: "How Software Development Services Improve",
    excerpt:
      "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
    author: "souvik.naskar904@gmail.com",
    date: "February 27, 2026",
    image: Assets.NewsImage1,
  },
  {
    id: 2,
    tag: "BLOG",
    title: "How Software Development Services Improve",
    excerpt:
      "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
    author: "souvik.naskar904@gmail.com",
    date: "February 27, 2026",
    image: Assets.NewsImage2,
  },
  {
    id: 3,
    tag: "BLOG",
    title: "How Software Development Services Improve",
    excerpt:
      "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
    author: "Bishal",
    date: "February 27, 2026",
    image: Assets.NewsImage3,
  },
  {
    id: 4,
    tag: "BLOG",
    title: "How Software Development Services Improve",
    excerpt:
      "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
    author: "Bishal",
    date: "February 27, 2026",
    image: Assets.NewsImage4,
  },
  {
    id: 5,
    tag: "BLOG",
    title: "How Software Development Services Improve",
    excerpt:
      "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
    author: "Bishal",
    date: "February 27, 2026",
    image: Assets.Frame2,
  },
  {
    id: 6,
    tag: "BLOG",
    title: "How Software Development Services Improve",
    excerpt:
      "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
    author: "Bishal",
    date: "February 27, 2026",
    image: Assets.Frame4,
  },
];

export default function BlogPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen">
      <BlogHero />
      <BlogSections posts={posts} />
      <CTA />
    </main>
  );
}
