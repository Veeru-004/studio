'use client';

import Link from 'next/link';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export default function ClientLayout({children}: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillSwap
        </Link>
        <div className="flex space-x-4">
          <Link href="/profile" className="hover:text-secondary">
            Profile
          </Link>
          <Link href="/offer-session" className="hover:text-secondary">
            Offer Session
          </Link>
          <Link href="/browse" className="hover:text-secondary">
            Browse
          </Link>
          <Link href="/requested-sessions" className="hover:text-secondary">
            My Requests
          </Link>
          {loggedInUser ? (
              <Button onClick={handleLogout} variant="ghost" size="sm">Logout</Button>
          ) : (
              <Link href="/browse" className="hover:text-secondary">Login</Link>
          )}
        </div>
      </nav>
      {children}
    </>
  );
}
