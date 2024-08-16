"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../public/logo.png";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  DoorOpen,
  Heart,
  Layers,
  Library,
  Moon,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "@/context/themeContext";

const Navbar = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const themeContext = useTheme();
  if (!authContext || !themeContext) return null;
  const { user, isAuthenticated, logout } = authContext;
  const { theme, toggleTheme } = themeContext;
  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center space-x-4">
          <Image src={logo} alt="logo" width={40} height={40} />

          <Link href="/" className="text-2xl font-bold">
            LitLibrary
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/dashboard"
            className="hover:bg-secondary flex flex-row justify-center items-center hover:text-secondary-foreground p-2 rounded"
          >
            <Layers className="mr-2" size={20} />
            Dashboard
          </Link>
          <Link
            href="/collection"
            className="hover:bg-secondary flex flex-row justify-center items-center hover:text-secondary-foreground p-2 rounded"
          >
            <Library className="mr-2" size={20} />
            My Collection
          </Link>
          <Link
            href="/favorites"
            className="hover:bg-secondary flex flex-row justify-center items-center hover:text-secondary-foreground p-2 rounded"
          >
            <Heart className="mr-2" size={20} />
            Favorites
          </Link>
          <Link
            href="/cart"
            className="hover:bg-secondary flex flex-row justify-center items-center hover:text-secondary-foreground p-2 rounded"
          >
            <ShoppingCart className="mr-2" size={20} />
            Cart
          </Link>
          {user && isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="hover:bg-secondary flex flex-row justify-center items-center hover:text-secondary-foreground p-2 rounded"
              >
                <User className="mr-2" size={20} />
                {user.name}
              </Link>
              <div className="hover:bg-secondary hover:cursor-pointer flex flex-row justify-center items-center hover:text-secondary-foreground p-2 rounded" onClick={logout}>
                
                  <DoorOpen  className="mr-2" size={20}  />
                  Logout
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:bg-secondary hover:text-secondary-foreground p-2 rounded"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:bg-secondary hover:text-secondary-foreground p-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
          <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun size={24} strokeWidth={3} absoluteStrokeWidth />
              ) : (
                <Moon size={24} strokeWidth={3} />
              )}
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
