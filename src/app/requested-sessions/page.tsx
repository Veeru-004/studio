'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface SessionRequest {
  id: string;
  skill: string;
  teacherName: string;
  teacherSkills: string;
  studentName: string;
  studentSkills: string;
}

interface ProfileData {
  id: string;
  name: string;
  skills: string;
  interests: string;
}

const getSessionRequests = (): SessionRequest[] => {
  try {
    const storedRequests = localStorage.getItem('sessionRequests');
    return storedRequests ? JSON.parse(storedRequests) : [];
  } catch (error) {
    console.error('Error retrieving session requests from local storage:', error);
    return [];
  }
};

export default function RequestedSessionsPage() {
  const [mySessionRequests, setMySessionRequests] = useState<SessionRequest[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      // Retrieve all session requests
      const allRequests = getSessionRequests();

      // Filter session requests to only show those made by the logged-in user
      const myRequests = allRequests.filter(request => request.studentName === loggedInUser.name);
      setMySessionRequests(myRequests);
    }
  }, [loggedInUser]);


  if (!loggedInUser) {
    return <div className="flex flex-col items-center justify-center min-h-screen">Please log in to view your requested sessions.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          My <span className="text-secondary">Requested Sessions</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Here are the sessions you have requested from others.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mySessionRequests.length > 0 ? (
            mySessionRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle>Request for: {request.skill}</CardTitle>
                  <CardDescription>Teacher: {request.teacherName}</CardDescription>
                </CardHeader>
                <CardContent>
                  Teacher Skills: {request.teacherSkills}
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No sessions requested yet.</p>
          )}
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
