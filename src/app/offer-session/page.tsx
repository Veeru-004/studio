'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface SessionRequest {
  id: string;
  skill: string;
  requesterName: string;
  requesterSkills: string;
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

export default function OfferSessionPage() {
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);

  useEffect(() => {
    // Filter session requests to only show those where the requester name matches "Your Name"
    const requests = getSessionRequests().filter(request => request.requesterName === "Your Name");
    setSessionRequests(requests);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Session <span className="text-secondary">Requests</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Here are the sessions you have requested.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessionRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <CardTitle>Request for: {request.skill}</CardTitle>
                <CardDescription>Requester: {request.requesterName}</CardDescription>
              </CardHeader>
              <CardContent>
                Requester Skills: {request.requesterSkills}
              </CardContent>
            </Card>
          ))}
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
