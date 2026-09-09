import marqueeImage from "../assets/marquee-image.jpg";
import { venue } from "../data/wedding";
import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Venue() {
  const { lang, t } = useLanguage();
  const headingClass =
    lang === "ur"
      ? "font-urdu text-3xl md:text-4xl"
      : "font-calligraphy text-4xl md:text-5xl";
  return (
    <Reveal>
      <section
        id="venue-directions"
        className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl scroll-mt-20 border-b border-primary/10"
      >
        <div className="flex flex-col items-center text-center mb-space-lg">
          <h3 className={`${headingClass} text-primary font-medium mb-2`}>
            {t.venue}
          </h3>
          <HeartDivider className="w-40 mb-6" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-primary">
              {t.location}
            </span>
            <h2 className="font-serif font-bold text-xl md:text-2xl text-primary mt-space-3xs">
              {venue.name}
            </h2>
            <p className="font-sans text-xs md:text-sm text-primary/80 uppercase tracking-widest mt-space-3xs">
              {venue.cityLine}
            </p>
            <p className="font-serif italic text-base md:text-lg text-on-surface-variant mt-space-sm leading-relaxed font-light">
              {venue.description}
            </p>

            <div className="mt-space-md rounded-lg overflow-hidden bg-surface-container shadow-sm">
              <img
                src={marqueeImage}
                alt={`${venue.name} exterior`}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="mt-space-md flex flex-wrap gap-space-xs">
              <a
                className="inline-flex items-center gap-space-2xs px-6 py-2.5 rounded-md bg-primary text-on-primary font-sans text-xs md:text-sm font-medium tracking-wide hover:bg-on-primary-container transition-colors shadow-md"
                href={venue.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="map" className="text-[18px]" />
                {t.viewMaps}
              </a>
              <a
                className="inline-flex items-center gap-space-2xs px-6 py-2.5 rounded-md bg-surface-container-high text-primary font-sans text-xs md:text-sm font-medium tracking-wide hover:bg-surface-variant transition-colors"
                href={venue.appleMaps}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="directions" className="text-[18px]" />
                {t.appleMaps}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-high p-space-2xs">
              <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden">
                <iframe
                  title="Bahawalpur Royal Marquee on Google Maps"
                  className="absolute inset-0 h-full w-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&hl=en&z=${venue.mapsZoom}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={venue.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-space-md left-space-md right-space-md sm:left-auto sm:right-space-md sm:max-w-sm"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
