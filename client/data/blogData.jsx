"use client"

import axios from "axios";
import { useState } from "react";

export async function getBlogs() {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/blogs", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch blogs");
  //     }

  //     const data = await res.json();

  //     return Array.isArray(data.blogs) && data.blogs.length > 0
  //       ? data.blogs
  //       : blogPosts;
  //   } catch (error) {
  //     console.error("Using mock blogs:", error.message);
  //     return blogPosts;
  //   }
  // }

  // const getData = async () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  try {
    const res = await axios.get("http://localhost:5000/api/blogs/");
    const data = await res.data;
    setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
  } catch (error) {
    console.error(
      "Unable to load blogs",
      error.response?.data || error.message,
    );
    setBlogs([]);
  } finally {
    setLoading(false);
  }

  return {blogs, loading}
}