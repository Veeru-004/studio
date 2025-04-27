'use client';

import {useState, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useToast} from "@/hooks/use-toast";

interface ProfileData {
  id: string;
  name: string;
  skills: string;
  interests: string;
}

const getInitialProfileData = (loggedInUser: ProfileData | null): ProfileData => {
  return loggedInUser || { id: '', name: '', skills: '', interests: '' };
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(getInitialProfileData(null));
  const {toast} = useToast();
  const [loggedInUser, setLoggedInUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as ProfileData;
      setLoggedInUser(user);
      setProfileData(getInitialProfileData(user));
    }
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        toast({
          variant: "destructive",
          title: "Not Logged In",
          description: "Please log in to update your profile.",
        });
        return;
      }

      // Get existing profiles from local storage
      let profiles: ProfileData[] = [];
      const storedProfiles = localStorage.getItem('profiles');
      if (storedProfiles) {
        profiles = JSON.parse(storedProfiles);
      }

      // Update the current profile data with the logged-in user's ID and name
      const updatedProfileData = { ...profileData, id: loggedInUser.id, name: loggedInUser.name };

      // Find the index of the logged-in user's profile
      const existingProfileIndex = profiles.findIndex(p => p.id === loggedInUser.id);

      if (existingProfileIndex !== -1) {
        // Update the existing profile
        profiles[existingProfileIndex] = updatedProfileData;
      } else {
        // Add the current profile to the list
        profiles.push(updatedProfileData);
      }

      // Save the updated list back to local storage
      localStorage.setItem('profiles', JSON.stringify(profiles));

      // Update local state to reflect the changes
      setProfileData(updatedProfileData);

      // Also update the loggedInUser in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(updatedProfileData));
      setLoggedInUser(updatedProfileData);

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully!",
      });
    } catch (error) {
      console.error('Error saving profile data to local storage:', error);
      toast({
        variant: "destructive",
        title: "Profile Update Failed",
        description: "Failed to update profile.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!loggedInUser) {
    return <div className="flex flex-col items-center justify-center min-h-screen">Please log in to view your profile.</div>;
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Your <span className="text-secondary">Profile</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Manage your SkillSwap profile.
        </p>

        <div className="mt-12 w-full max-w-md">
          <form onSubmit={handleProfileSubmit} className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={loggedInUser.name}
                disabled={true}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills You Can Teach</Label>
              <Input
                type="text"
                id="skills"
                name="skills"
                placeholder="e.g., Math, Programming, Art"
                value={profileData.skills}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="interests">Skills You Want to Learn</Label>
              <Input
                type="text"
                id="interests"
                name="interests"
                placeholder="e.g., Cooking, Music, Writing"
                value={profileData.interests}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
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
