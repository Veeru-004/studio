'use server';

/**
 * @fileOverview A flow for offering learning sessions.
 *
 * - offerSession - A function that handles the session offering process.
 * - OfferSessionInput - The input type for the offerSession function.
 * - OfferSessionOutput - The return type for the offerSession function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'zod';

const OfferSessionInputSchema = z.object({
  skill: z.string().describe('The skill you want to teach.'),
  description: z.string().describe('A description of what the session will cover.'),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The experience level required for the session.'),
  timeCommitment: z.string().describe('The time commitment required for the session (e.g., "1 hour per week for 4 weeks").'),
  prerequisites: z.string().optional().describe('Any prerequisites required for the session.'),
});
export type OfferSessionInput = z.infer<typeof OfferSessionInputSchema>;

const OfferSessionOutputSchema = z.object({
  title: z.string().describe('A catchy title for the session.'),
  details: z.string().describe('A detailed description of the session, incorporating all input parameters.'),
});
export type OfferSessionOutput = z.infer<typeof OfferSessionOutputSchema>;

export async function offerSession(input: OfferSessionInput): Promise<OfferSessionOutput> {
  return offerSessionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'offerSessionPrompt',
  input: {
    schema: z.object({
      skill: z.string().describe('The skill you want to teach.'),
      description: z.string().describe('A description of what the session will cover.'),
      experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The experience level required for the session.'),
      timeCommitment: z.string().describe('The time commitment required for the session.'),
      prerequisites: z.string().optional().describe('Any prerequisites required for the session.'),
    }),
  },
  output: {
    schema: z.object({
      title: z.string().describe('A catchy title for the session.'),
      details: z.string().describe('A detailed description of the session, incorporating all input parameters.'),
    }),
  },
  prompt: `You are an expert at creating compelling descriptions for learning sessions.

Based on the following information, create a catchy title and a detailed description for a learning session.

Skill: {{{skill}}}
Description: {{{description}}}
Experience Level: {{{experienceLevel}}}
Time Commitment: {{{timeCommitment}}}
Prerequisites: {{{prerequisites}}}

Title:
Details:`,
});

const offerSessionFlow = ai.defineFlow<
  typeof OfferSessionInputSchema,
  typeof OfferSessionOutputSchema
>(
  {
    name: 'offerSessionFlow',
    inputSchema: OfferSessionInputSchema,
    outputSchema: OfferSessionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
