import { timelineEvents } from "../data/wedding";
import { Icon } from "./Icon";

export function Timeline() {
  return (
    <section
      id="events-timeline"
      className="w-full bg-surface-container-low/70 py-space-2xl scroll-mt-20"
    >
      <div className="max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            Celebration Itinerary
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
            Four Moments of Elegance
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Please join us throughout our celebration weekend across the terraced
            villas of Florence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {timelineEvents.map((event) => (
            <article
              key={event.id}
              className={
                event.featured
                  ? "p-space-lg rounded-xl bg-surface-container-highest/60 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between relative overflow-hidden"
                  : "p-space-lg rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              }
            >
              {event.featured ? (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/20 rounded-full blur-xl pointer-events-none" />
              ) : null}
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span
                    className={
                      event.badgeTone === "primary"
                        ? "font-label-caps text-label-caps text-on-primary bg-primary px-space-2xs py-space-3xs rounded-full"
                        : "font-label-caps text-label-caps text-primary px-space-2xs py-space-3xs rounded-full bg-surface-container-high"
                    }
                  >
                    {event.badge}
                  </span>
                  <Icon
                    name={event.icon}
                    className={
                      event.featured
                        ? "text-primary text-[24px]"
                        : "text-primary-container text-[24px]"
                    }
                  />
                </div>
                <span className="font-label-subtle text-label-subtle text-secondary block">
                  {event.datetime}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-3xs">
                  {event.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="mt-space-md pt-space-xs">
                <span className="block font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Attire Code
                </span>
                <span className="font-body-sm text-body-sm text-primary font-medium">
                  {event.attire}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
