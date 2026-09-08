import { timelineEvents } from "../data/wedding";
import { HeartDivider } from "./HeartDivider";

export function Timeline() {
  return (
    <section
      id="events-timeline"
      className="py-space-xl px-margin-mobile lg:px-margin-desktop bg-surface flex flex-col items-center text-center border-b border-primary/10 scroll-mt-20"
    >
      <h3 className="font-calligraphy text-primary text-4xl md:text-5xl font-medium mb-2">
        Programme Timeline
      </h3>
      <HeartDivider className="w-40 mb-10" />

      <div className="relative pl-6 border-l-2 border-primary/30 space-y-9 text-left w-full max-w-md mx-auto">
        {timelineEvents.map((event) => (
          <article key={event.id} className="relative">
            <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-surface ring-2 ring-primary/30" />
            <h4 className="font-serif font-semibold text-lg text-primary">
              {event.title}
            </h4>
            <p className="text-xs text-primary/80 font-sans mt-0.5">
              {event.datetime}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
