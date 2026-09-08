import { ceremony, timelineEvents } from "../data/wedding";
import { useCountdown } from "../hooks/useCountdown";
import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { Reveal } from "./Reveal";

export function Countdown() {
  const countdown = useCountdown(ceremony.targetMs);
  const { lang, t } = useLanguage();
  const headingClass =
    lang === "ur"
      ? "font-urdu text-3xl md:text-4xl"
      : "font-calligraphy text-4xl md:text-5xl";
  const titleMap: Record<string, string> = {
    welcome: t.arrival,
    ceremony: t.nikkah,
    gala: t.dinner,
  };

  return (
    <Reveal>
    <section
      id="timeline"
      className="py-16 px-margin-mobile lg:px-margin-desktop bg-surface-container-low/50 flex flex-col items-center text-center border-b border-primary/10"
    >
      <h3 className={`${headingClass} text-primary font-medium mb-2`}>
        {t.countingDown}
      </h3>
      <HeartDivider className="w-40 mb-10" />

      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl w-full px-2">
        <TickerCard value={countdown.days} label={t.days} />
        <TickerCard value={countdown.hours} label={t.hours} />
        <TickerCard value={countdown.minutes} label={t.minutes} />
        <TickerCard value={countdown.seconds} label={t.seconds} />
      </div>

      <div className="mt-20 flex flex-col items-center w-full max-w-xl">
        <div className="text-primary mb-2">
          <svg
            className="h-6 w-6 stroke-[1.5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className={`${headingClass} text-primary font-medium mb-2`}>
          {t.programme}
        </h3>
        <HeartDivider className="w-40 mb-10" />
        <div className="relative pl-6 border-l-2 border-primary/30 space-y-9 text-left w-full max-w-md mx-auto">
          {timelineEvents.map((event) => (
            <article key={event.id} className="relative">
              <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-surface ring-2 ring-primary/30" />
              <h4
                className={`${lang === "ur" ? "font-urdu" : "font-serif"} font-semibold text-lg text-primary`}
              >
                {titleMap[event.id] ?? event.title}
              </h4>
              <p className="text-xs text-primary/80 font-sans mt-0.5">
                {event.datetime}
              </p>
            </article>
          ))}
        </div>
        <p
          className={`${lang === "ur" ? "font-urdu" : "font-serif italic"} mt-10 max-w-2xl text-lg md:text-2xl text-primary/80 leading-relaxed`}
        >
          {t.marqueeNote}
        </p>
      </div>
    </section>
    </Reveal>
  );
}

type TickerCardProps = {
  value: number | string;
  label: string;
};

function TickerCard({ value, label }: TickerCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-lg bg-surface-container border border-primary/15 shadow-sm">
      <span className="text-2xl sm:text-4xl font-serif font-bold text-primary">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs tracking-widest text-primary/80 font-sans uppercase mt-1">
        {label}
      </span>
    </div>
  );
}
