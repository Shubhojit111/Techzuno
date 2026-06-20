"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "admin",
};

export default function AdminsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [currentUser, setCurrentUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check", {
          withCredentials: true,
        });

        if (response.data.user.role !== "admin head") {
          router.replace("/dashboard");
          return;
        }

        setCurrentUser(response.data.user);
      } catch (error) {
        router.replace("/login");
      }
    };

    getAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/create",
        formData,
        {
          withCredentials: true,
        },
      );

      setFeedback({
        type: "success",
        message: response.data.message,
      });
      setFormData(initialForm);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to create admin",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardShell title="Admin Management">
      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-6 md:p-8">
          <p className="text-[#38FFF2] text-[12px] uppercase tracking-[0.22em]">
            Admin Access
          </p>
          <h2 className="mt-4 text-[30px] md:text-[38px] leading-tight font-semibold">
            Create Admin Or Admin Head From The Dashboard
          </h2>
          <p className="mt-5 text-white/65 leading-relaxed max-w-xl">
            This page is visible only to admin head users. Public registration
            remains locked to normal users, while this form can create internal
            admin accounts securely.
          </p>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/50">Signed in as</p>
            <p className="mt-2 text-lg font-medium">{currentUser?.name || "..."}</p>
            <p className="text-white/50 text-sm mt-1">{currentUser?.email || ""}</p>
            <p className="mt-4 inline-flex rounded-full bg-[#03B8B8]/15 px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-[#38FFF2]">
              {currentUser?.role || "admin head"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-white/10 bg-black/20 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="block text-sm text-white/70 mb-2">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rahul"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm text-white/70 mb-2">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul@gmail.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm text-white/70 mb-2">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm text-white/70 mb-2">Role</span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
              >
                <option value="admin">Admin</option>
                <option value="admin head">Admin Head</option>
              </select>
            </label>
          </div>

          {feedback.message ? (
            <div
              className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
                feedback.type === "success"
                  ? "bg-[#03B8B8]/10 text-[#38FFF2] border border-[#03B8B8]/20"
                  : "bg-red-500/10 text-red-300 border border-red-500/20"
              }`}
            >
              {feedback.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-[#03B8B8] px-6 py-4 text-black font-semibold tracking-[0.18em] uppercase hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}

