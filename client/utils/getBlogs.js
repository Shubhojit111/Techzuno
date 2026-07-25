export async function getBlogs() {
  try {
    const res = await fetch("http://localhost:5000/api/blogs/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data.blogs) ? data.blogs : [];
  } catch (error) {
    console.error("Unable to load blogs from API server. Returning empty list:", error.message);
    return [];
  }
}
