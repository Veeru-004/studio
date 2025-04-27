'use client';

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', {name, skills, interests});
    // TODO Implement profile update logic here (e.g., store in local storage or a database)
    alert('Profile updated successfully!');
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills You Can Teach</Label>
              <Input
                type="text"
                id="skills"
                name="skills"
                placeholder="e.g., Math, Programming, Art"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interests">Skills You Want to Learn</Label>
              <Input
                type="text"
                id="interests"
                name="interests"
                placeholder="e.g., Cooking, Music, Writing"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
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
