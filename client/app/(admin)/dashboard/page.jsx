"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/check`,
          {
            withCredentials: true,
          },
        );
        // console.log(response.data);
        const {user} = response.data;
        if (user.role === "admin") {
          setLoading(false);
        }
        else if (user.role === "user") {
          router.replace("/");
        }
        else {
          router.replace("/login");
        }
      } catch (err) {
        router.replace("/login");
        console.log(err.response.data.message || err.message);
      }
    };
    getAuth();
  }, []);

  if(loading) return <>
    <div>
      <h1 className="pt-24 text-[100px] text-center">Loading...</h1>
    </div>
  </>;

  return (
    <div>
      <h1 className="pt-24 text-[100px] text-center">Admin Dashboard Page</h1>
    </div>
  );
}
