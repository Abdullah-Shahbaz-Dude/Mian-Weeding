import { palette } from "../data/wedding";
import { Icon } from "./Icon";

export function DressCode() {
  return (
    <section
      id="dress-code"
      className="w-full bg-surface-container-low/50 py-space-2xl scroll-mt-20"
    >
      <div className="max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop text-center">
        <span className="font-label-caps text-label-caps text-primary uppercase">
          Aesthetic Harmony
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
          Guest Dress Code &amp; Color Palette
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-space-2xs">
          To create a cohesive visual atmosphere in harmony with the Tuscan
          estate, we gently invite guests to dress in our curated celebration
          palette.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md max-w-3xl mx-auto mt-space-xl">
          {palette.map((swatch) => (
            <div
              key={swatch.hex}
              className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-full shadow-inner mb-space-sm"
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="font-title-md text-title-md text-on-surface font-medium text-[16px]">
                {swatch.name}
              </span>
              <span className="font-label-caps text-label-caps text-secondary mt-space-3xs">
                {swatch.hex}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-space-lg flex flex-wrap justify-center gap-space-md text-left max-w-2xl mx-auto">
          <div className="flex items-start gap-space-xs p-space-sm rounded-lg bg-surface-container-high/60 backdrop-blur-sm flex-1 min-w-[240px]">
            <Icon name="check_circle" className="text-primary text-[20px] shrink-0" />
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-on-surface">Ladies:</strong> Full-length
              formal gowns, refined silhouettes, muted floral embellishments,
              block heels recommended for ancient stone walkways.
            </p>
          </div>
          <div className="flex items-start gap-space-xs p-space-sm rounded-lg bg-surface-container-high/60 backdrop-blur-sm flex-1 min-w-[240px]">
            <Icon name="check_circle" className="text-primary text-[20px] shrink-0" />
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-on-surface">Gentlemen:</strong> Classic
              tuxedo or dark tailored suit with bow-tie or understated neckwear.
              Velvet dinner jackets warmly welcomed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
