import { images } from "../data/wedding";

export function OurStory() {
  return (
    <section
      id="our-story"
      className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            The Prologue
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs">
            How Our Chapter Began
          </h2>
          <div className="mt-space-md space-y-space-sm text-body-lg text-on-surface-variant leading-relaxed">
            <p>
              It began on a rain-kissed autumn morning in Milan over an accidental
              exchange of sketchbooks at Caffè Cova. What was meant to be an
              apology coffee blossomed into a six-hour conversation spanning
              architecture, chamber music, and the quiet beauty of vintage
              bookstalls.
            </p>
            <p>
              Four years, countless passports, and quiet dawn strolls later,
              Taimoor brought Fatima back to Lake Como. In the private rose
              conservatory of Villa del Balbianello, as dusk softened into
              twilight, he whispered the question that sealed two lifetimes into
              one.
            </p>
          </div>
          <div className="mt-space-lg p-space-md rounded-lg bg-surface-container-high/60 backdrop-blur-md">
            <p className="font-headline-sm text-headline-sm text-primary italic">
              “In all the world, there is no heart for me like yours. In all the
              world, there is no love for you like mine.”
            </p>
            <span className="block mt-space-2xs font-label-subtle text-label-subtle text-secondary">
              — Maya Angelou
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-xl">
            <img
              className="w-full h-full object-cover"
              alt={images.story.alt}
              src={images.story.src}
            />
          </div>
          <div className="absolute -bottom-8 -left-6 w-48 p-space-2xs bg-surface-container-lowest shadow-xl rounded-lg transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="w-full h-44 rounded overflow-hidden mb-space-3xs">
              <img
                className="w-full h-full object-cover"
                alt={images.proposal.alt}
                src={images.proposal.src}
              />
            </div>
            <p className="font-body-sm text-body-sm text-center text-on-surface italic">
              The Yes Moment • Como
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
