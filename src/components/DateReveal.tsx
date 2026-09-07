import { useState } from "react";
import { ceremony } from "../data/wedding";
import { appleCalendarUrl, googleCalendarUrl } from "../lib/calendar";
import { Icon } from "./Icon";

export function DateReveal() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-xl">
      <div className="relative rounded-xl p-space-lg lg:p-space-xl bg-surface-container-low/90 backdrop-blur-md shadow-md flex flex-col items-center text-center overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-secondary-container/50 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl mx-auto mb-space-md">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            The Grand Reveal
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
            Auspicious Muhurtham &amp; Sunset Hour
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Touch or tap the royal crest envelope below to unseal our official
            auspicious ceremony timeline and celestial blessing hour.
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer group relative w-full max-w-md h-64 rounded-xl transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => setIsRevealed((open) => !open)}
          aria-expanded={isRevealed}
        >
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br from-surface-container-highest via-secondary-container/70 to-surface-container-high p-space-md flex flex-col items-center justify-center shadow-lg transition-all duration-700 ease-in-out ${
              isRevealed
                ? "opacity-0 scale-[0.85] -rotate-6 pointer-events-none"
                : "opacity-100 scale-100 rotate-0"
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-md mb-space-sm transform group-hover:scale-110 transition-transform">
              <Icon name="lock_open" className="text-on-primary text-[36px]" />
            </div>
            <span className="font-title-md text-title-md text-on-surface font-semibold">
              Touch to Break Wax Seal
            </span>
            <span className="font-label-caps text-label-caps text-secondary mt-space-3xs tracking-wider">
              TAP TO REVEAL CEREMONY HOUR
            </span>
          </div>

          <div
            className={`absolute inset-0 rounded-xl bg-surface-container-lowest p-space-md flex flex-col items-center justify-center shadow-xl transition-all duration-700 ${
              isRevealed
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Icon name="verified" className="text-primary text-[32px] mb-space-3xs" />
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
              Ceremony Confirmed
            </span>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-space-3xs">
              {ceremony.longDate}
            </p>
            <p className="font-title-md text-title-md text-primary font-bold mt-space-3xs">
              {ceremony.timeLabel}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
              {ceremony.muhurtham}
            </p>
          </div>
        </button>

        <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-sm">
          <a
            className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-primary text-on-primary font-label-subtle text-label-subtle shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all"
            href={googleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="calendar_add_on" className="text-[18px]" />
            Add to Google Calendar
          </a>
          <a
            className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-surface-container-high text-on-surface font-label-subtle text-label-subtle hover:bg-surface-variant transition-colors"
            href={appleCalendarUrl()}
            download="fatima-and-taimoor-ceremony.ics"
          >
            <Icon name="event" className="text-[18px]" />
            Add to Apple iCal
          </a>
        </div>
      </div>
    </section>
  );
}
