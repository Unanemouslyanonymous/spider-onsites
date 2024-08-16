"use client";
import { useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const GoogleCallback = () => {
  const router = useRouter();
  const authContext: any = useContext(AuthContext);
  const { login , isAuthenticated} = authContext;
    const searchParams = useSearchParams(); 
  useEffect(() => {
  const token = searchParams.get("token");
  console.log(token)
  login(token)

    if (token) {
      login(token);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
