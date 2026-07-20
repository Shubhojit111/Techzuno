"use client";

import BlogHero from "@/components/blog/BlogHero";
import BlogSections from "@/components/blog/BlogSections";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";
import axios from "axios";
import { blogPosts } from "@/data/blogData";
import { useEffect, useState } from "react";


export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs/", {
      withCredentials: true,
    });
    const data = await res.data;
    // console.log(data.blogs);
    setBlogs(data.blogs);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <BlogHero />
      <BlogSections blogs={blogs} />
      <CTA />
    </main>
  );
}
