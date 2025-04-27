'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";

interface ProfileData {
  id: string;
  name: string;
  skills: string;
  interests: string;
}

const getProfiles = (): ProfileData[] => {
  try {
    const storedProfiles = localStorage.getItem('profiles');
    return storedProfiles ? JSON.parse(storedProfiles) : [];
  } catch (error) {
    console.error('Error retrieving profiles from local storage:', error);
    return [];
  }
};

interface SessionRequest {
  id: string;
  skill: string;
  teacherName: string;
  teacherSkills: string;
  studentName: string;
  studentSkills: string;
}

export default function BrowsePage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<ProfileData | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const {toast} = useToast();

  useEffect(() => {
    const storedProfiles = getProfiles();
    setProfiles(storedProfiles);

    // Get logged-in user
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    if (newUserName.trim() === '') {
      alert('Please enter a user name.');
      return;
    }

    // Check if the user already exists
    let profiles = getProfiles();
    let userProfile = profiles.find(profile => profile.name === newUserName);

    if (!userProfile) {
      // Create a new profile for the user if it doesn't exist
      const newProfileId = Math.random().toString(36).substring(2, 15);
      userProfile = {
        id: newProfileId,
        name: newUserName,
        skills: '',
        interests: '',
      };
      profiles.push(userProfile);
      localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    // Log in the user by storing their information
    localStorage.setItem('loggedInUser', JSON.stringify(userProfile));
    setLoggedInUser(userProfile);
    setNewUserName('');

    toast({
      title: "Logged in",
      description: `Logged in as ${userProfile.name}`
    })
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  const handleRequestSession = (teacher: ProfileData) => {
    if (!loggedInUser) {
      alert('Please log in to request a session.');
      return;
    }

    const requestId = Math.random().toString(36).substring(2, 15);
    const sessionRequest: SessionRequest = {
      id: requestId,
      skill: teacher.skills,
      teacherName: teacher.name,
      teacherSkills: teacher.skills,
      studentName: loggedInUser.name,
      studentSkills: loggedInUser.skills || 'No skills provided',
    };

    try {
      // Get existing session requests from local storage
      let sessionRequests: SessionRequest[] = [];
      const storedRequests = localStorage.getItem('sessionRequests');
      if (storedRequests) {
        sessionRequests = JSON.parse(storedRequests);
      }

      // Add the new session request to the list
      sessionRequests.push(sessionRequest);

      // Save the updated list back to local storage
      localStorage.setItem('sessionRequests', JSON.stringify(sessionRequests));

      toast({
        title: "Session Requested",
        description: `Session requested from ${teacher.name}`,
      });
    } catch (error) {
      console.error('Error saving session request to local storage:', error);
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "Failed to request session.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Browse <span className="text-secondary">Profiles</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Find and request sessions from other users.
        </p>

        {loggedInUser ? (
          <div>
            <p className="mt-3 text-xl text-muted-foreground">
              Logged in as: {loggedInUser.name}
            </p>
            <Button className="mt-2" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="mt-6 flex items-center space-x-4">
            <Label htmlFor="newUserName">User Name:</Label>
            <Input
              type="text"
              id="newUserName"
              placeholder="Enter your user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
        )}

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.filter(profile => loggedInUser && profile.id !== loggedInUser.id).map((profile, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>Skills: {profile.skills}</CardDescription>
              </CardHeader>
              <CardContent>
                Wants to learn: {profile.interests}
              </CardContent>
              <Button
                className="m-4"
                onClick={() => handleRequestSession(profile)}
                disabled={!loggedInUser}
              >
                Request Session
              </Button>
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
