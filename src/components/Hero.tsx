import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import bismillah from "../assets/BIMILLAH.png";
import heroBackdrop from "../assets/hero1.png";
import heroVideo from "../assets/invitation-landscape-cream-gold.mp4";
import slide1 from "../assets/slide-1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.jpg";
import slide4 from "../assets/slide-4.jpg";
import { couple } from "../data/wedding";
import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { Reveal } from "./Reveal";

const SLIDES = [slide1, slide2, slide3, slide4];
const SLIDE_MS = 2000;

type HeroProps = {
  onVideoPlaying?: () => void;
};

export function Hero({ onVideoPlaying }: HeroProps) {
  const { lang, t } = useLanguage();
  const [namesVisible, setNamesVisible] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const invitationRef = useRef<HTMLDivElement>(null);
  const textClass = lang === "ur" ? "font-urdu" : "font-serif italic";

  useEffect(() => {
    const id = window.setTimeout(() => setNamesVisible(true), 8000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!videoDone) {
      return;
    }
    let animation: ReturnType<typeof animate> | undefined;
    const id = window.setTimeout(() => {
      const el = invitationRef.current;
      if (!el) {
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      animation = animate(window.scrollY, top, {
        duration: 1.2,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    }, 700);
    return () => {
      window.clearTimeout(id);
      animation?.stop();
    };
  }, [videoDone]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center text-center">
      <div className="relative w-full h-screen min-h-[70vh] overflow-hidden bg-inverse-surface">
        <img
          src={heroBackdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className={`absolute inset-0 h-full w-full object-cover bg-inverse-surface ${
            videoDone
              ? "opacity-0 pointer-events-none transition-opacity duration-700"
              : "opacity-100"
          }`}
          autoPlay
          muted
          playsInline
          aria-label="Fatima and Taimoor wedding invitation film"
          onPlaying={() => onVideoPlaying?.()}
          onCanPlay={() => onVideoPlaying?.()}
          onEnded={() => setVideoDone(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-inverse-surface/75 via-inverse-surface/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: namesVisible ? 1 : 0 }}
          transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-margin-mobile">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={
              namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
            }
            transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] }}
          >
            <img
              src={bismillah}
              alt="Bismillah ir-Rahman ir-Rahim"
              className="w-64 sm:w-80 md:w-[36rem] h-auto mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            />
            <svg
              className="w-4 h-4 fill-white/90 mb-4 drop-shadow"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p
              className={`${textClass} text-white/95 text-2xl md:text-6xl font-light tracking-wide text-shadow-sm`}
            >
              {t.nikkahCeremony}
            </p>
            <div className="flex items-center justify-center space-x-3 w-48 my-5">
              <div className="h-[2px] bg-white/50 flex-1" />
              <span className="text-white/80 text-2xl">♥</span>
              <div className="h-[2px] bg-white/50 flex-1" />
            </div>
          </motion.div>
        </div>
        <motion.a
          aria-label="Scroll Down"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/70 hover:text-white transition-colors duration-200 group"
          href="#invitation"
          initial={{ opacity: 0, y: 16 }}
          animate={namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] }}
          style={{ pointerEvents: namesVisible ? "auto" : "none" }}
        >
          <span className="text-[10px] tracking-[0.25em] font-sans uppercase font-medium mb-1">
            SCROLL
          </span>
          <svg
            className="w-4 h-4 transform group-hover:translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </motion.a>
      </div>

      <Reveal
        id="invitation"
        ref={invitationRef}
        className="relative w-full px-margin-mobile lg:px-margin-desktop py-16 bg-pattern-cross flex flex-col items-center text-center overflow-hidden border-b border-primary/10"
      >
        <HeartDivider className="w-64 mb-6" />
        <div className="max-w-3xl mx-auto px-4">
          <p
            className={`${textClass} text-primary text-lg md:text-3xl leading-relaxed font-light`}
          >
            {t.welcome}
          </p>
        </div>
        <HeartDivider className="w-32 my-8" />
        <h1 className="font-calligraphy text-primary text-7xl md:text-8xl lg:text-9xl leading-tight font-normal text-shadow-glow">
          {couple.bride}
        </h1>
        <div className="font-calligraphy text-primary/80 text-3xl md:text-4xl my-1">
          {t.with}
        </div>
        <h1 className="font-calligraphy text-primary text-7xl md:text-8xl lg:text-9xl leading-tight font-normal text-shadow-glow">
          {couple.groom}
        </h1>
        <HeartDivider className="w-40 mb-8" />
        <div className="relative w-full max-w-4xl mx-auto rounded-xl p-space-2xs bg-surface-container-high/60 backdrop-blur-xl shadow-xl">
          <div className="relative w-full h-[460px] sm:h-[580px] rounded-lg overflow-hidden">
            {SLIDES.map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                  index === slideIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-surface-container/20" />
          </div>
        </div>
        <p
          className={`${textClass} text-primary text-lg md:text-3xl mt-20 md:mt-24 leading-relaxed font-light`}
        >
          {t.blessings}
        </p>
      </Reveal>
    </section>
  );
}
