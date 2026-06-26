"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/logout",
          {}, // request body
          {
            withCredentials: true,
          },
        );

        console.log(response.data);

        setUser(null);
        router.replace("/");
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    logoutUser();
  }, [router]);

  return (
    <div>
      <h1 className="pt-24 text-[100px] text-center">Logging out...</h1>
    </div>
  );
}
