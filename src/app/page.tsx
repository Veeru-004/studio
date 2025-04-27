
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Welcome to{" "}
          <span className="text-secondary">SkillSwap</span>
        </h1>
        <p className="mt-3 text-2xl text-muted-foreground">
          Learn, Teach &amp; Grow – Together.
        </p>
        <div className="mt-6">
          <Button>Get Started</Button>
        </div>
        <div className="mt-12 max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">
            Empower Others. Get Empowered.
          </h2>
          <p className="text-lg text-muted-foreground">
            SkillSwap is a peer-to-peer learning network where students empower
            each other by sharing their skills and knowledge.
          </p>
          <ul className="mt-4 list-disc list-inside text-left">
            <li>
              <b>Create a Profile:</b> Showcase your skills and areas you&apos;d
              like to learn.
            </li>
            <li>
              <b>Offer Sessions:</b> Teach something you are good at to other
              learners.
            </li>
            <li>
              <b>Earn Credits:</b> Every teaching session earns you credits.
            </li>
            <li>
              <b>Redeem Credits:</b> Use your credits to learn from others.
            </li>
          </ul>
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
