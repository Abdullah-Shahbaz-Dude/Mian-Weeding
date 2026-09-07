import { couple } from "../data/wedding";
import { appleCalendarUrl, googleCalendarUrl } from "../lib/calendar";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low">
      <div className="max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl flex flex-col items-center text-center">
        <div className="mb-space-sm">
          <img
            alt={couple.monogramAlt}
            className="h-12 w-auto object-contain mx-auto"
            src={couple.monogramSrc}
          />
        </div>
        <h3 className="font-headline-md text-headline-md text-primary mb-space-2xs">
          {couple.bride} &amp; {couple.groom}
        </h3>
        <p className="font-body-lg text-body-lg text-secondary italic mb-space-lg max-w-lg">
          With heartfelt love from both families, celebrating the start of our
          eternal chapter together.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-sm mb-space-xl">
          <a
            className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-surface-container text-on-surface font-label-subtle text-label-subtle hover:bg-surface-container-high hover:text-on-surface transition-colors"
            href={googleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="calendar_today" className="text-[18px] text-primary" />
            Add to Google Calendar
          </a>
          <a
            className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-surface-container text-on-surface font-label-subtle text-label-subtle hover:bg-surface-container-high hover:text-on-surface transition-colors"
            href={appleCalendarUrl()}
            download="fatima-and-taimoor-ceremony.ics"
          >
            <Icon name="event" className="text-[18px] text-primary" />
            Add to Apple Calendar
          </a>
        </div>
        <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-outline-variant to-transparent mb-space-md" />
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-on-surface-variant font-label-caps text-label-caps uppercase">
          <p>© 2025 {couple.bride} &amp; {couple.groom}. All Rights Reserved.</p>
          <p className="mt-space-3xs sm:mt-0">
            Modern Ethereal Romance • Private Celebration
          </p>
        </div>
      </div>
    </footer>
  );
}
