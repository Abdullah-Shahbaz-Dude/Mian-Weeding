import { useEffect, useRef, useState } from "react";
import weddingSong from "./assets/refined-afternoon-wedding-song.mp3";
import { Countdown } from "./components/Countdown";
import { Footer } from "./components/Footer";
import { HeartReveal } from "./components/HeartReveal";
import { Hero } from "./components/Hero";
import { InvitationGate } from "./components/InvitationGate";
import { LanguageButton } from "./components/LanguageButton";
import { MusicButton } from "./components/MusicButton";
import { Venue } from "./components/Venue";
import { LanguageProvider } from "./lib/i18n";

const MUSIC_LIMIT_MS = 45_000;

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const stopTimerRef = useRef<number | null>(null);

  function clearStopTimer() {
    if (stopTimerRef.current == null) {
      return;
    }
    window.clearTimeout(stopTimerRef.current);
    stopTimerRef.current = null;
  }

  function stopMusic() {
    const audio = audioRef.current;
    clearStopTimer();
    if (!audio) {
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }

  function scheduleStop() {
    clearStopTimer();
    stopTimerRef.current = window.setTimeout(stopMusic, MUSIC_LIMIT_MS);
  }

  function playMusic() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
        scheduleStop();
      })
      .catch(() => setIsPlaying(false));
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      playMusic();
    } else {
      stopMusic();
    }
  }

  useEffect(() => () => clearStopTimer(), []);

  return (
    <LanguageProvider>
      <audio ref={audioRef} src={weddingSong} preload="auto" />
      {isOpen ? (
        <div className="bg-surface font-sans text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen">
          <main className="w-full bg-surface relative min-h-screen">
            <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />
            <LanguageButton />
            <div className="flex flex-col w-full">
              <Hero onVideoPlaying={() => setVideoReady(true)} />
              <HeartReveal />
              <Countdown />
              <Venue />
            </div>
          </main>
          <Footer />
        </div>
      ) : null}
      {!isOpen || !videoReady ? (
        <InvitationGate
          onOpen={() => {
            playMusic();
            setIsOpen(true);
          }}
        />
      ) : null}
    </LanguageProvider>
  );
}
