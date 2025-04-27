'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {offerSession, OfferSessionInput} from '@/ai/flows/offer-session-flow';
import {useToast} from "@/hooks/use-toast";

export default function OfferSessionPage() {
  const [skill, setSkill] = useState('');
  const [description, setDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [prerequisites, setPrerequisites] = useState('');
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const input: OfferSessionInput = {
      skill,
      description,
      experienceLevel: experienceLevel as 'Beginner' | 'Intermediate' | 'Advanced',
      timeCommitment,
      prerequisites,
    };

    try {
      const result = await offerSession(input);
      toast({
        title: "Session Offer Successful",
        description: "Your session has been offered successfully!",
      });
      console.log('Session offered:', result);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Session Offer Failed",
        description: error.message,
      });
      console.error('Failed to offer session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Offer a <span className="text-secondary">Session</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Share your skills and knowledge with others.
        </p>

        <div className="mt-12 w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="skill">Skill You Can Teach</Label>
              <Input
                type="text"
                id="skill"
                name="skill"
                placeholder="e.g., Math, Programming, Art"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Session Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what the session will cover"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-primary"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timeCommitment">Time Commitment</Label>
              <Input
                type="text"
                id="timeCommitment"
                name="timeCommitment"
                placeholder="e.g., 1 hour per week for 4 weeks"
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="prerequisites">Prerequisites (Optional)</Label>
              <Input
                type="text"
                id="prerequisites"
                name="prerequisites"
                placeholder="e.g., Basic knowledge of JavaScript"
                value={prerequisites}
                onChange={(e) => setPrerequisites(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Offer Session'}
            </Button>
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
