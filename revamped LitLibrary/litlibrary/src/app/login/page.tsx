"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import dotenv from "dotenv";
import RecaptchaComponent from "@/components/reCAPTCHA";
dotenv.config();

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authContext: any = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;

  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [reCaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
          reCaptchaToken,
        }
      );
      login(res.data.token);
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/`;
  };

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen items-center justify-center">
        <Card className=" p-3 bg-secondary text-primary-foreground mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            {isError ? (
              <h4 className=" font-thin text-sm text-red-500 flex align-middle text-center">
                Invalid Credentials
              </h4>
            ): (<span></span>)}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-primary">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-primary">
                    Password
                  </Label>
                  <Link
                    href="/login/forgot-password"
                    className="ml-auto inline-block text-sm text-primary underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <RecaptchaComponent onChange={setRecaptchaToken} />
              <Button type="submit" onClick={handleSubmit} disabled={!reCaptchaToken} className="w-full">
                Login
              </Button>
              <Button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white w-full mt-2"
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-primary text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default Login;
