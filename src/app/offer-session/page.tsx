'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";

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

export default function OfferSessionPage() {
  const [receivedSessionRequests, setReceivedSessionRequests] = useState<SessionRequest[]>([]);
  const [mySessionRequests, setMySessionRequests] = useState<SessionRequest[]>([]);
  const [activeTab, setActiveTab] = useState<string>("receivedRequests");
  const [loggedInUser, setLoggedInUser] = useState<ProfileData | null>(null);
  const router = useRouter();
  const {toast} = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      router.push('/browse');
    }
  }, [router]);

  useEffect(() => {
    if (loggedInUser) {
      // Retrieve all session requests
      const allRequests = getSessionRequests();

      // Filter session requests to show only those where the logged-in user is the teacher
      const receivedRequests = allRequests.filter(request => request.teacherName === loggedInUser.name);
      setReceivedSessionRequests(receivedRequests);

      // Filter session requests to show only those where the logged-in user is the student
      const myRequests = allRequests.filter(request => request.studentName === loggedInUser.name);
      setMySessionRequests(myRequests);
    }
  }, [loggedInUser]);

  const handleAcceptRequest = (request: SessionRequest) => {
    // Implement logic to "accept" the request.
    // This might involve updating the state of the request in local storage,
    // or sending a notification to the user who made the request.
    toast({
      title: "Session Accepted",
      description: `You have accepted the session request from ${request.studentName} for ${request.skill}.`,
    });
  };

  const handleRejectRequest = (request: SessionRequest) => {
    // Implement logic to "reject" the request.
    // This might involve updating the state of the request in local storage,
    // or sending a notification to the user who made the request.
    toast({
      title: "Session Rejected",
      description: `You have rejected the session request from ${request.studentName} for ${request.skill}.`,
    });
  };

  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Session <span className="text-secondary">Requests</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Manage your session requests.
        </p>

        <Tabs className="mt-12 w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="receivedRequests">Received Requests</TabsTrigger>
            <TabsTrigger value="myRequests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="receivedRequests">
            <p className="mt-3 text-2xl text-muted-foreground">
              Here are the session requests you have received from others.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {receivedSessionRequests.length > 0 ? (
                receivedSessionRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <CardTitle>Request for: {request.skill}</CardTitle>
                      <CardDescription>Requester: {request.studentName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      Requester Skills: {request.studentSkills}
                    </CardContent>
                    <div className="flex justify-around m-4">
                      <Button onClick={() => handleAcceptRequest(request)}>Accept</Button>
                      <Button variant="destructive" onClick={() => handleRejectRequest(request)}>Reject</Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p>No session requests received.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="myRequests">
            <p className="mt-3 text-2xl text-muted-foreground">
              Here are the session requests you have made to others.
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
          </TabsContent>
        </Tabs>
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
