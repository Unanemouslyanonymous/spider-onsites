"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/auth/forgot-password", { email });
      setSecurityQuestion(response.data.securityQuestion);
      setToken(response.data.token);
      setStep(2);
    } catch (error) {
      console.error("Error fetching security question:", error);
    }
  };

  const handleAnswerSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/auth/reset-password", { token, answer, newPassword });
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleAnswerSubmit}>
          <p>{securityQuestion}</p>
          <input
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
 