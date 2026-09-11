import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import heroVideo from "../assets/invitation-720.mp4";
import { couple } from "../data/wedding";
import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { Reveal } from "./Reveal";

const InvitationSlides = lazy(() => import("./InvitationSlides"));

const NAMES_DELAY_MS = 7000;
const OVERLAY_DURATION_S = 2.2;
const OVERLAY_DURATION_MS = OVERLAY_DURATION_S * 1000;
const SCROLL_AFTER_OVERLAY_MS = 700;

const envelopeSrc = `${import.meta.env.BASE_URL}envelope.webp`;

type HeroProps = {
  onVideoStarted?: () => void;
};

export function Hero({ onVideoStarted }: HeroProps) {
  const { lang, t } = useLanguage();
  const [namesVisible, setNamesVisible] = useState(false);
  const [loadFilm, setLoadFilm] = useState(false);
  const [heroBackdrop, setHeroBackdrop] = useState<string>();
  const [bismillah, setBismillah] = useState<string>();
  const [playRequested, setPlayRequested] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const invitationRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const namesVisibleAtRef = useRef<number | null>(null);
  const playRequestedRef = useRef(false);
  const onVideoStartedRef = useRef(onVideoStarted);
  const textClass = lang === "ur" ? "font-urdu" : "font-serif italic";

  useEffect(() => {
    document.getElementById("boot")?.remove();
  }, []);

  useEffect(() => {
    if (!videoStarted && !videoDone) {
      return;
    }
    void import("../assets/hero1.webp").then((mod) => {
      setHeroBackdrop(mod.default);
    });
    void import("../assets/BIMILLAH.webp").then((mod) => {
      setBismillah(mod.default);
    });
  }, [videoStarted, videoDone]);

  useEffect(() => {
    onVideoStartedRef.current = onVideoStarted;
  }, [onVideoStarted]);

  useEffect(() => {
    if (!playRequested || !loadFilm) {
      return;
    }
    const video = videoRef.current;
    if (video && video.paused) {
      void video.play().catch(() => undefined);
    }
  }, [playRequested, loadFilm]);

  useEffect(() => {
    function startVideo() {
      if (playRequestedRef.current) {
        return;
      }
      playRequestedRef.current = true;
      document.getElementById("boot")?.remove();
      setPlayRequested(true);
      const video = videoRef.current;
      if (!video) {
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
    onVideoStartedRef.current?.();
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

  function beginFilmLoad() {
    const start = () => setLoadFilm(true);
    window.setTimeout(start, 50);
  }

  return (
    <section className="relative w-full flex flex-col items-center text-center">
      <div className="relative w-full h-screen min-h-[70vh] overflow-hidden bg-[#fff8f6]">
        {heroBackdrop && (videoStarted || videoDone) ? (
          <img
            src={heroBackdrop}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {!videoStarted && !videoDone ? (
          <img
            src={envelopeSrc}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            onLoad={beginFilmLoad}
            ref={(img) => {
              if (img?.complete) {
                beginFilmLoad();
              }
            }}
          />
        ) : null}
        {loadFilm ? (
          <video
            ref={videoRef}
            src={heroVideo}
            className={`absolute inset-0 h-full w-full object-cover ${
              videoDone
                ? "opacity-0 pointer-events-none transition-opacity duration-700"
                : playRequested
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
            }`}
            muted
            playsInline
            preload="auto"
            aria-label="Fatima and Taimoor wedding invitation film"
            onPlaying={() => setVideoStarted(true)}
            onEnded={() => setVideoDone(true)}
          />
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
            {bismillah && videoStarted ? (
              <img
                src={bismillah}
                alt="Bismillah ir-Rahman ir-Rahim"
                width={593}
                height={421}
                className="w-64 sm:w-80 md:w-[36rem] h-auto mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
              />
            ) : null}
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
        <p
          className={`${textClass} text-primary text-lg md:text-3xl leading-relaxed font-light mt-2`}
        >
          {t.sonOf} {couple.groomFather}
        </p>
        <HeartDivider className="w-40 mb-8" />
        {videoStarted ? (
          <Suspense
            fallback={
              <div className="h-[460px] sm:h-[580px] w-full max-w-4xl" />
            }
          >
            <InvitationSlides />
          </Suspense>
        ) : (
          <div className="h-[460px] sm:h-[580px] w-full max-w-4xl" />
        )}
        <p
          className={`${textClass} text-primary text-lg md:text-3xl mt-20 md:mt-24 leading-relaxed font-light`}
        >
          {t.blessings}
        </p>
      </Reveal>
    </section>
  );
}
