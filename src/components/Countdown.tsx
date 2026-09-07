import { ceremony } from "../data/wedding";
import { useCountdown } from "../hooks/useCountdown";

export function Countdown() {
  const countdown = useCountdown(ceremony.targetMs);

  return (
    <section className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-xl">
      <div className="flex flex-col items-center text-center mb-space-lg">
        <span className="font-label-caps text-label-caps text-primary uppercase">
          Anticipation
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-space-3xs">
          Counting Down Every Heartbeat
        </h2>
        <p className="font-body-lg text-body-lg text-secondary italic mt-space-2xs">
          Until we say “I Do” under the Tuscan sky
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm max-w-3xl mx-auto">
        <TickerCard value={countdown.days} label="Days" />
        <TickerCard value={countdown.hours} label="Hours" />
        <TickerCard value={countdown.minutes} label="Minutes" />
        <TickerCard value={countdown.seconds} label="Seconds" accent />
      </div>
    </section>
  );
}

type TickerCardProps = {
  value: number | string;
  label: string;
  accent?: boolean;
};

function TickerCard({ value, label, accent = false }: TickerCardProps) {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-low backdrop-blur-sm shadow-sm flex flex-col items-center justify-center">
      <span
        className={`font-display text-headline-lg lg:text-display font-normal leading-none tracking-tight ${
          accent ? "text-primary-container" : "text-primary"
        }`}
      >
        {value}
      </span>
      <span className="font-label-caps text-label-caps text-on-surface-variant mt-space-2xs uppercase">
        {label}
      </span>
    </div>
  );
}
