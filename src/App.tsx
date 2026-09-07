import { useState } from "react";
import { Countdown } from "./components/Countdown";
import { DateReveal } from "./components/DateReveal";
import { DressCode } from "./components/DressCode";
import { Footer } from "./components/Footer";
import { Guestbook } from "./components/Guestbook";
import { HeartReveal } from "./components/HeartReveal";
import { Hero } from "./components/Hero";
import { InvitationGate } from "./components/InvitationGate";
import { MusicButton } from "./components/MusicButton";
import { OurStory } from "./components/OurStory";
import { RsvpSection } from "./components/RsvpSection";
import { Timeline } from "./components/Timeline";
import { Venue } from "./components/Venue";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
        <InvitationGate onOpen={() => setIsOpen(true)} />
      </div>
    );
  }

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      <main className="w-full bg-surface relative min-h-screen">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-secondary-container/40 rounded-full blur-[140px] -z-10" />
            <div className="absolute top-80 right-10 w-[420px] h-[420px] bg-primary-fixed/30 rounded-full blur-[110px] -z-10" />
          </div>
          <Hero />
          <HeartReveal />
          <DateReveal />
          <Countdown />
          <OurStory />
          <Timeline />
          <Venue />
          <DressCode />
          <section
            id="rsvp-guestbook"
            className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl scroll-mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              <RsvpSection />
              <Guestbook />
            </div>
          </section>
        </div>
        <MusicButton variant="fab" />
      </main>
      <Footer />
    </div>
  );
}
