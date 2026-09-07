import { useEffect, useState } from "react";
import heroVideo from "../assets/invitation-landscape-cream-gold.mp4";
import { ceremony, couple, images } from "../data/wedding";
import { Icon } from "./Icon";

export function Hero() {
  const [namesVisible, setNamesVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setNamesVisible(true), 7000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center text-center">
      <div className="relative w-full h-screen min-h-[70vh] overflow-hidden bg-surface">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Fatima and Taimoor wedding invitation film"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/75 via-inverse-surface/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-margin-mobile">
          <div
            className={
              namesVisible
                ? "animate-fade-in flex flex-col items-center text-center"
                : "opacity-0 translate-y-3 flex flex-col items-center text-center"
            }
          >
            <p className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-primary-fixed mb-space-sm">
              Are Getting Married
            </p>
            <h1 className="font-display text-display-mobile md:text-display text-surface-container-lowest tracking-tight leading-none">
              {couple.groom}
            </h1>
            <div className="font-headline-lg italic font-normal text-primary-container my-space-2xs">
              &amp;
            </div>
            <h1 className="font-display text-display-mobile md:text-display text-surface-container-lowest tracking-tight leading-none">
              {couple.bride}
            </h1>
            <p className="mt-space-md font-label-subtle text-label-subtle text-surface-container-lowest/85 tracking-widest">
              {ceremony.displayDate}
              <br />
              {ceremony.timeLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full px-margin-mobile lg:px-margin-desktop py-space-xl lg:py-space-2xl flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-space-xs mb-space-md animate-fade-in">
          <img
            alt={couple.monogramAlt}
            className="h-14 w-auto object-contain drop-shadow-sm mb-space-2xs"
            src={couple.monogramSrc}
          />
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-primary">
            Imperial Nuptial Celebration
          </span>
          <p className="font-body-md text-body-md text-secondary max-w-xl mx-auto italic">
            Together with their families, {couple.brideFull} &amp;{" "}
            {couple.groomFull} invite you to celebrate their sacred union in the
            Tuscan hills
          </p>
        </div>

        <div className="mb-space-lg">
          <h1 className="font-display text-display text-on-surface tracking-tight leading-none mb-space-3xs">
            {couple.bride}{" "}
            <span className="font-headline-lg italic font-normal text-primary-container mx-space-2xs">
              &amp;
            </span>{" "}
            {couple.groom}
          </h1>
          <div className="flex items-center justify-center gap-space-sm mt-space-xs text-on-surface-variant font-label-subtle text-label-subtle">
            <span>{ceremony.weekday}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            <span className="tracking-widest font-semibold text-primary">
              {ceremony.displayDate}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            <span>{ceremony.city}</span>
          </div>
        </div>

        <div className="relative w-full max-w-4xl mx-auto rounded-xl p-space-2xs bg-surface-container-high/60 backdrop-blur-xl shadow-xl">
          <div className="relative w-full h-[460px] sm:h-[580px] rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              alt={images.hero.alt}
              src={images.hero.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-surface-container/20" />
            <div className="absolute bottom-space-md left-space-md right-space-md sm:left-auto sm:right-space-md sm:max-w-md p-space-md rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-lg text-left">
              <div className="flex items-center gap-space-2xs mb-space-3xs text-primary font-label-caps text-label-caps">
                <Icon name="location_on" className="text-[16px]" />
                <span>{ceremony.venueShort}</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                The Sacred Exchange of Eternal Vows
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-3xs">
                Under the whispering cypresses and ancient Florentine arches
                overlooking the Arno Valley.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
