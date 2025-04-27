'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

interface ProfileData {
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
  requesterName: string;
  requesterSkills: string;
}

export default function BrowsePage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

  useEffect(() => {
    const storedProfiles = getProfiles();
    setProfiles(storedProfiles);
  }, []);

  const handleRequestSession = (profile: ProfileData) => {
    const requestId = Math.random().toString(36).substring(2, 15);
    const sessionRequest: SessionRequest = {
      id: requestId,
      skill: profile.skills,
      requesterName: 'Your Name', // Replace with actual user name
      requesterSkills: 'Your Skills', // Replace with actual user skills
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

      alert('Session requested successfully!');
    } catch (error) {
      console.error('Error saving session request to local storage:', error);
      alert('Failed to request session.');
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

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>Skills: {profile.skills}</CardDescription>
              </CardHeader>
              <CardContent>
                Wants to learn: {profile.interests}
              </CardContent>
              <Button className="m-4" onClick={() => handleRequestSession(profile)}>Request Session</Button>
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
