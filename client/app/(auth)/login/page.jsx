"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

// export const metadata = {
//   title: "Login - Techzuno | Sign In to Your Account",
//   description:
//     "Sign in to your Techzuno account to manage your projects and services.",
// };

export default function LoginPage() {
  const router = useRouter();
  const { getAuth, user, authLoading } = useContext(AuthContext);

  const [message, setMessage] = useState({ type: "", text: "" });

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      await getAuth();
      toast.success(res.data.message || "Logged in successfully!");
      
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) return;

    if (user.role === "admin" || user.role === "admin head") {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <>
        <h1 className="pt-24 text-[100px] text-center">Loading...</h1>
      </>
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full px-6 sm:px-10 py-28 sm:py-32 lg:py-36 flex items-center justify-center">
        <div
          className="w-full max-w-[440px] sm:max-w-[480px] rounded-2xl sm:rounded-3xl overflow-hidden
              bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl
              border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.5)]
              animate-[fadeInUp_0.6s_ease-out_both]"
        >
          {/* Card header */}
          <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-2 text-center">
            <h1 className="font-toxigenesis text-[28px] sm:text-[32px] font-medium tracking-tight text-white uppercase">
              Login Page
            </h1>
          </div>

          {/* Form body */}
          <form
            onSubmit={handleSubmit}
            className="px-6 sm:px-8 pt-6 pb-8 sm:pb-10"
          >
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Email */}
              <div>
                <label className="block text-white/80 text-[13px] sm:text-[14px] mb-1.5 tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Icon
                    icon="mdi:email-outline"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-[18px]"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/20 text-white placeholder:text-white/30 text-[13px] sm:text-[14px] pl-11 pr-5 py-2.5 sm:py-3 outline-none focus:border-[#03B8B8]/70 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-white/80 text-[13px] sm:text-[14px] tracking-wide">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Icon
                    icon="mdi:lock-outline"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-[18px]"
                  />
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="password here"
                    className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/20 text-white placeholder:text-white/30 text-[13px] sm:text-[14px] pl-11 pr-12 py-2.5 sm:py-3 outline-none focus:border-[#03B8B8]/70 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    <Icon icon={""} className="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>



            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-[#03B8B8] to-[#04D4D4] hover:brightness-110 text-white font-bold text-[14px] sm:text-[15px] tracking-widest py-3 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(3,184,184,0.4)] border border-white/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icon
                    icon="mdi:loading"
                    className="text-[20px] animate-spin"
                  />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Register link */}
            <p className="text-center text-white/40 text-[13px] mt-6 tracking-wide">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#38FFF2] hover:text-[#B8FAFF] font-medium transition-colors"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
