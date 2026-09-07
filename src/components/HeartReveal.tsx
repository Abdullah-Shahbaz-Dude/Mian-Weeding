import { ceremony, couple } from "../data/wedding";
import { HeartScratchCard } from "./HeartScratchCard";

export function HeartReveal() {
  return (
    <section className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-xl">
      <div className="relative rounded-xl p-space-lg lg:p-space-xl bg-surface-container-low/90 backdrop-blur-md shadow-md flex flex-col items-center text-center overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-container/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl mx-auto mb-space-md">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            A Token of Love
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
            Scratch the Heart
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Drag across the gold foil to reveal the couple and the hour we say I
            do.
          </p>
        </div>
        <HeartScratchCard
          names={`${couple.bride} & ${couple.groom}`}
          date={ceremony.displayDate}
          time={ceremony.timeLabel}
        />
      </div>
    </section>
  );
}
