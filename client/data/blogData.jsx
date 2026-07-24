export async function getBlogs() {
  try {
    const res = await fetch("http://localhost:5000/api/blogs", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();

    return Array.isArray(data.blogs) && data.blogs.length > 0
      ? data.blogs
      : blogPosts;
  } catch (error) {
    console.error("Using mock blogs:", error.message);
    return blogPosts;
  }
}