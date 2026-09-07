import { images, venue } from "../data/wedding";
import { Icon } from "./Icon";

export function Venue() {
  return (
    <section
      id="venue-directions"
      className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            The Sanctuary
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
            {venue.name}
          </h2>
          <p className="font-body-sm text-body-sm text-secondary uppercase tracking-widest mt-space-3xs">
            {venue.region}
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
            {venue.description}
          </p>

          <div className="mt-space-md p-space-sm rounded-lg bg-surface-container flex items-start gap-space-xs">
            <Icon
              name="airport_shuttle"
              className="text-primary text-[22px] shrink-0 mt-0.5"
            />
            <div>
              <span className="font-title-md text-title-md text-on-surface block text-[15px]">
                Private Guest Shuttle
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {venue.shuttle}
              </p>
            </div>
          </div>

          <div className="mt-space-md flex flex-wrap gap-space-xs">
            <a
              className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-primary text-on-primary font-label-subtle text-label-subtle hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
              href={venue.googleMaps}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="map" className="text-[18px]" />
              Open in Google Maps
            </a>
            <a
              className="inline-flex items-center gap-space-2xs px-space-md py-space-2xs rounded-full bg-surface-container-high text-on-surface font-label-subtle text-label-subtle hover:bg-surface-variant transition-colors"
              href={venue.appleMaps}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="directions" className="text-[18px]" />
              Apple Maps
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-high p-space-2xs">
            <div
              className="w-full h-80 sm:h-96 rounded-lg bg-cover bg-center relative flex flex-col justify-end p-space-md"
              style={{ backgroundImage: `url('${images.map.src}')` }}
              role="img"
              aria-label={images.map.alt}
            >
              <div className="p-space-sm rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-lg max-w-sm">
                <div className="flex items-center gap-space-2xs text-primary font-label-caps text-label-caps mb-space-3xs">
                  <Icon name="pin_drop" className="text-[16px]" />
                  <span>DESTINATION COORDINATES</span>
                </div>
                <p className="font-title-md text-title-md text-on-surface font-semibold">
                  {venue.addressLine}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {venue.cityLine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
