"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "Register - Techzuno | Create Your Account",
//   description:
//     "Sign up for Techzuno to access premium web development, app development, and design services.",
// };

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check",{
          withCredentials: true,
        })
        const {user} = response.data;
        if (user.role === "admin") {
          router.replace("/admin");
        }
        else{
          router.replace("/");
        }
        
      }
      catch (err) {
        setLoading(false);
        console.log(err.response.data.message || err.message);
      }
    };
    getAuth();
  }, [])
  
  if(loading) return <>
    <div>
      <h1 className="pt-24 text-[100px] text-center">Loading...</h1>
    </div>
  </>;

  
  return (
    <>
      {/* <h1 className="pt-24 text-red-800 text-7xl font-bold">Register Page</h1> */}
      <RegisterForm />
    </>
  );
}
