'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { username, email, password });
      localStorage.setItem('privateKey', res.data.privateKey);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full p-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full p-2 border rounded-lg"
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white w-full p-2 rounded-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
}
