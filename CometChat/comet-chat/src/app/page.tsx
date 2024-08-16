import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <Image src="/vercel.svg" alt="Vercel Logo" className="w-40 h-40" /> */}
      <h1 className="text-6xl font-bold text-gray-900">
        Welcome to <span className="text-blue-500">CometChat</span>
      </h1>
      <p className="text-xl text-gray-600 mt-5">
        The easiest way to add chat to your app.
      </p>
      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-sm hover:rounded-full ">
        <Link href="/auth/signup" className="text-white">Get Started</Link>
      </button>
    </div>
  );
}''
