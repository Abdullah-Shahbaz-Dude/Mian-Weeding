import { ceremony } from "../data/wedding";
import { googleCalendarUrl } from "../lib/calendar";
import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { HeartScratchCard } from "./HeartScratchCard";
import { Reveal } from "./Reveal";

export function HeartReveal() {
  const { lang, t } = useLanguage();
  const textClass = lang === "ur" ? "font-urdu" : "";

  return (
    <Reveal>
    <section
      id="welcome"
      className="relative py-space-xl px-margin-mobile lg:px-margin-desktop flex flex-col items-center text-center overflow-hidden border-b border-primary/10"
    >
      <h3
        className={`${lang === "ur" ? "font-urdu text-3xl md:text-4xl" : "font-calligraphy text-4xl md:text-5xl"} text-primary font-medium mt-2 mb-2`}
      >
        {t.scratchToReveal}
      </h3>
      <HeartDivider className="w-40 mb-8 " />
      <HeartScratchCard
        names={""}
        date={ceremony.displayDate}
        time={ceremony.timeLabel}
      />
      <p
        className={`${textClass} text-xs text-primary/70 font-sans tracking-wide mt-3 mb-6 italic`}
      >
        {t.scratchHint}
      </p>
      <a
        className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-primary hover:bg-on-primary-container text-on-primary text-xs md:text-sm font-sans font-medium tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
        href={googleCalendarUrl()}
        target="_blank"
        rel="noreferrer"
      >
        {t.saveTheDate}
      </a>
    </section>
    </Reveal>
  );
}
