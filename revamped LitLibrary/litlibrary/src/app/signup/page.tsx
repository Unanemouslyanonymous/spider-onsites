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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import dotenv from "dotenv";
import RecaptchaComponent from "@/components/reCAPTCHA";
dotenv.config();
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
  const router = useRouter();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext not found");
  }
  const { register, isAuthenticated } = authContext;
  const handleSecurityQuestionChange = (event: string) => {
    console.log(event);
    setSecurityQuestion(event);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(isCustom){
        setSecurityQuestion(customQuestion);
      }
    try {
      
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/auth/register", {
        name,
        email,
        password,
        securityQuestion,
        answer,
        reCaptchaToken
      });
      register(response.data.token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
      <Card className="py-2 px-4 bg-secondary text-primary-foreground mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-primary">
                  Username
                </Label>
                <Input
                  id="first-name"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="text-primary"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-primary">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="text-primary"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-primary">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="text-primary"
              />
            </div>
            <div className="grid gap-2">
              <Select
                value={securityQuestion}
                onValueChange={handleSecurityQuestionChange}
              >
                <SelectTrigger className="text-primary">
                  <SelectValue placeholder="Choose a Security Question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="What is your mother's maiden name?">
                      What is your mother's maiden name?
                    </SelectItem>
                    <SelectItem value="What was the name of your first pet?">
                      What was the name of your first pet?
                    </SelectItem>
                    <SelectItem value="What is your favorite book?">
                      What is your favorite book?
                    </SelectItem>
                    <SelectItem value="What city were you born in?">
                      What city were you born in?
                    </SelectItem>
                    <SelectItem value="What was your first car?">
                      What was your first car?
                    </SelectItem>
                    <SelectItem value="custom" onClick={()=>setIsCustom(true)}>Custom Question</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              { securityQuestion === "custom"  && (
                <div className="grid gap-2">
                  <Label htmlFor="custom-question" className="text-primary">
                    Custom Question
                  </Label>
                  <Input
                    id="custom-question"
                    type="text"
                    value={customQuestion}
                    onChange={(event) => setCustomQuestion(event.target.value)}
                    placeholder="Enter your custom security question"
                    className="text-primary"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="answer" className="text-primary">
                  Answer to the Question
                </Label>
                <Input
                  id="answer"
                  type="text"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Answer your Security question"
                  className="text-primary"
                />
              </div>
            </div>
            <RecaptchaComponent onChange={setReCaptchaToken} />
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button> */}
          </div>
          <div className="mt-4 text-center text-primary text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};
export default SignUp;
