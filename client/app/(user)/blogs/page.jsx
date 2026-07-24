"use client";

import BlogHero from "@/components/blog/BlogHero";
import BlogSections from "@/components/blog/BlogSections";
import axios from "axios";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "Blog | Techzuno — Web Development, App Development & Design Insights",
//   description: "Insights on web development, app development, UI/UX, and SEO from the Techzuno team - practical guidance for growing your business online.",
//   url: "https://techzuno.com/blogs",
// };

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/");
      const data = await res.data;
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
    } catch (error) {
      console.error("Unable to load blogs", error.response?.data || error.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <BlogHero />
      <BlogSections blogs={blogs} loading={loading} />
    </main>
  );
}