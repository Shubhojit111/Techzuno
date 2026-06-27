"use client";

import BlogHero from "@/components/blog/BlogHero";
import BlogSections from "@/components/blog/BlogSections";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";
import axios from "axios";
import { blogPosts } from "@/data/blogData";

// const posts = [
//   {
//     id: 1,
//     tag: "BLOG",
//     title: "How Software Development Services Improve",
//     content:
//       "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
//     author: "souvik.naskar904@gmail.com",
//     date: "February 27, 2026",
//     image: Assets.NewsImage1,
//   },
//   {
//     id: 2,
//     tag: "BLOG",
//     title: "How Software Development Services Improve",
//     content:
//       "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
//     author: "souvik.naskar904@gmail.com",
//     date: "February 27, 2026",
//     image: Assets.NewsImage2,
//   },
//   {
//     id: 3,
//     tag: "BLOG",
//     title: "How Software Development Services Improve",
//     content:
//       "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
//     author: "Bishal",
//     date: "February 27, 2026",
//     image: Assets.NewsImage3,
//   },
//   {
//     id: 4,
//     tag: "BLOG",
//     title: "How Software Development Services Improve",
//     content:
//       "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
//     author: "Bishal",
//     date: "February 27, 2026",
//     image: Assets.NewsImage4,
//   },
//   {
//     id: 5,
//     tag: "BLOG",
//     title: "How Software Development Services Improve",
//     content:
//       "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
//     author: "Bishal",
//     date: "February 27, 2026",
//     image: Assets.Frame2,
//   },
//   {
//     id: 6,
//     tag: "BLOG",
//     title: "How Software Development Services Improve",
//     content:
//       "In today’s digital-driven world, businesses rely heavily on technology to stay competitive and efficient.",
//     author: "Bishal",
//     date: "February 27, 2026",
//     image: Assets.Frame4,
//   },
// ];

const getData = async () => {
  const res = await axios.get("http://localhost:5000/api/blogs/", {
    withCredentials: true,
  });
  const data = await res.data;
  console.log(data);
};

export default function BlogPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen">
      <BlogHero />
      <button
        onClick={() => {
          getData();
        }}
      >
        Get Data
      </button>
      <BlogSections posts={blogPosts} />
      <CTA />
    </main>
  );
}
