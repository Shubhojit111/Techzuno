"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import axios from "axios";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Login - Techzuno | Sign In to Your Account",
//   description:
//     "Sign in to your Techzuno account to manage your projects and services.",
// };

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          {
            withCredentials: true,
          },
        );

        const user = response.data.user;

        if (user.role === "admin" || user.role === "admin head") {
          router.replace("/dashboard");

        } else if (user.role === "user") {
          router.replace("/");
        }
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };
    getAuth();
  }, [router]);

  if (loading) {
    return<>
      <h1 className="pt-24 text-[100px] text-center">Loading...</h1>
    </>
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
