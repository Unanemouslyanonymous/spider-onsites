import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface User {
  username: string;
  email: string;
}

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem('token');
    localStorage.removeItem('privateKey');
    onLogout();
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Messaging App</span>
        </Link>
        <Link href="/chat">
          <span className={`cursor-pointer ${router.pathname === '/chat' ? 'underline' : ''}`}>
            Chat
          </span>
        </Link>
        <Link href="/groups">
          <span className={`cursor-pointer ${router.pathname === '/groups' ? 'underline' : ''}`}>
            Groups
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-bold">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
