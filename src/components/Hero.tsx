import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import bismillah from "../assets/BIMILLAH.png";
import envelope from "../assets/image.png";
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
const NAMES_DELAY_MS = 7000;
const OVERLAY_DURATION_S = 2.2;
const OVERLAY_DURATION_MS = OVERLAY_DURATION_S * 1000;
const SCROLL_AFTER_OVERLAY_MS = 700;

export function Hero() {
  const { lang, t } = useLanguage();
  const [namesVisible, setNamesVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const invitationRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const namesVisibleAtRef = useRef<number | null>(null);
  const videoReadyRef = useRef(false);
  const textClass = lang === "ur" ? "font-urdu" : "font-serif italic";

  useEffect(() => {
    videoReadyRef.current = videoReady;
  }, [videoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setVideoReady(true);
    }
  }, []);

  useEffect(() => {
    function startVideo() {
      const video = videoRef.current;
      if (!video || !video.paused || !videoReadyRef.current) {
        return;
      }
      void video.play().catch(() => undefined);
    }

    window.addEventListener("pointerdown", startVideo);
    window.addEventListener("keydown", startVideo);
    return () => {
      window.removeEventListener("pointerdown", startVideo);
      window.removeEventListener("keydown", startVideo);
    };
  }, []);

  useEffect(() => {
    if (!videoStarted) {
      return;
    }
    const id = window.setTimeout(() => setNamesVisible(true), NAMES_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [videoStarted]);

  useEffect(() => {
    if (namesVisible) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "auto" });

    function preventScroll(event: Event) {
      event.preventDefault();
    }

    function preventScrollKeys(event: KeyboardEvent) {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "PageUp" ||
        event.key === "PageDown" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.key === " "
      ) {
        event.preventDefault();
      }
    }

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [namesVisible]);

  useEffect(() => {
    if (!namesVisible) {
      return;
    }
    namesVisibleAtRef.current = Date.now();
  }, [namesVisible]);

  useEffect(() => {
    if (!videoDone || !namesVisible) {
      return;
    }
    const shownAt = namesVisibleAtRef.current ?? Date.now();
    const overlayRemaining = Math.max(
      0,
      OVERLAY_DURATION_MS - (Date.now() - shownAt),
    );
    const wait = overlayRemaining + SCROLL_AFTER_OVERLAY_MS;
    let animation: ReturnType<typeof animate> | undefined;
    const id = window.setTimeout(() => {
      const el = invitationRef.current;
      if (!el) {
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      animation = animate(window.scrollY, top, {
        duration: OVERLAY_DURATION_S,
        ease: [0.45, 0, 0.55, 1],
        onUpdate: (latest) => {
          window.scrollTo({ top: latest, behavior: "auto" });
        },
        onComplete: () => {
          html.style.scrollBehavior = previousBehavior;
        },
      });
    }, wait);
    return () => {
      window.clearTimeout(id);
      animation?.stop();
      document.documentElement.style.scrollBehavior = "";
    };
  }, [videoDone, namesVisible]);

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
        {!videoStarted && !videoDone ? (
          <img
            src={envelope}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoDone || !videoStarted
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
          muted
          playsInline
          preload="auto"
          aria-label="Fatima and Taimoor wedding invitation film"
          onLoadedData={() => setVideoReady(true)}
          onPlaying={() => setVideoStarted(true)}
          onEnded={() => setVideoDone(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {!videoStarted && !videoDone ? (
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 px-margin-mobile">
            <div
              className={`flex items-center gap-2 rounded-full bg-inverse-surface/75 px-4 py-2 text-white shadow-md backdrop-blur-md ${
                lang === "ur" ? "font-urdu" : "font-sans"
              }`}
              role="status"
              aria-live="polite"
            >
              {videoReady ? (
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary-container animate-pulse" />
              ) : (
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  aria-hidden
                />
              )}
              <span
                className={
                  lang === "ur"
                    ? "text-sm"
                    : "text-[11px] font-medium uppercase tracking-[0.18em]"
                }
              >
                {videoReady ? t.readyToTap : t.loading}
              </span>
            </div>
          </div>
        ) : null}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-inverse-surface/75 via-inverse-surface/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: namesVisible ? 1 : 0 }}
          transition={{
            duration: OVERLAY_DURATION_S,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-margin-mobile">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={
              namesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
            }
            transition={{
              duration: OVERLAY_DURATION_S,
              ease: [0.45, 0, 0.55, 1],
            }}
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
          transition={{
            duration: OVERLAY_DURATION_S,
            ease: [0.45, 0, 0.55, 1],
          }}
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
