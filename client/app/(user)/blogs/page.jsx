"use client";

import BlogHero from "@/components/blog/BlogHero";
import BlogSections from "@/components/blog/BlogSections";
import axios from "axios";
import { useEffect, useState } from "react";

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