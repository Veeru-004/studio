'use client';

import {useState, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';

interface ProfileData {
  name: string;
  skills: string;
  interests: string;
}

const getInitialProfileData = (): ProfileData => {
  try {
    const storedProfile = localStorage.getItem('profileData');
    return storedProfile ? JSON.parse(storedProfile) : {name: '', skills: '', interests: ''};
  } catch (error) {
    console.error('Error retrieving profile data from local storage:', error);
    return {name: '', skills: '', interests: ''};
  }
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(getInitialProfileData);

  useEffect(() => {
    const initialData = getInitialProfileData();
    setProfileData(initialData);
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('profileData', JSON.stringify(profileData));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data to local storage:', error);
      alert('Failed to update profile.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

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
                value={profileData.name}
                onChange={handleInputChange}
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
