'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // It is a workaround to fix hydration issue
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/profile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Welcome to{' '}
          <span className="text-secondary">SkillSwap</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Learn, Teach &amp; Grow – Together.
        </p>
        <div className="mt-6">
          {isClient && (
            <Button onClick={handleGetStarted}>Get Started</Button>
          )}
        </div>
        <div className="mt-12 max-w-4xl grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Management</CardTitle>
              <CardDescription>Showcase your skills and desired learning areas.</CardDescription>
            </CardHeader>
            <CardContent>
              Create and manage your profile to highlight your expertise and what you're eager to learn.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Offerings</CardTitle>
              <CardDescription>List teaching sessions and earn credits.</CardDescription>
            </CardHeader>
            <CardContent>
              Offer your skills to other learners and earn credits for each session you teach.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Requests</CardTitle>
              <CardDescription>Browse and request learning sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              Find and request learning sessions from other users, using the credits you've earned.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decentralized Learning</CardTitle>
              <CardDescription>Empowering each other through shared knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              Join a community-driven ecosystem where students empower each other by sharing skills and knowledge.
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://edupair.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit EduPair.network
        </a>
      </footer>
    </div>
  );
}
