import { timelineEvents } from "../data/wedding";
import { HeartDivider } from "./HeartDivider";

const extraEvents = timelineEvents.filter((event) => !event.featured);

export function DressCode() {
  return (
    <section
      id="dress-code"
      className="py-16 px-margin-mobile lg:px-margin-desktop bg-surface-container-low/50 flex flex-col items-center text-center border-b border-primary/10 scroll-mt-20"
    >
      <h3 className="font-calligraphy text-primary text-4xl md:text-5xl font-medium mb-2">
        Dress Code
      </h3>
      <HeartDivider className="w-40 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl w-full px-4 text-center">
        <div className="space-y-2">
          <h4 className="font-serif font-bold text-lg text-primary">Women</h4>
          <p className="text-xs md:text-sm text-primary/80 font-sans leading-relaxed">
            Elegant formal attire in champagne, ivory, sage, or rose dust
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-serif font-bold text-lg text-primary">Men</h4>
          <p className="text-xs md:text-sm text-primary/80 font-sans leading-relaxed">
            Suit or traditional formal wear
          </p>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center w-full">
        <h3 className="font-calligraphy text-primary text-4xl md:text-5xl font-medium mb-2">
          Pre-Wedding Events
        </h3>
        <HeartDivider className="w-40 mb-10" />
        <div className="space-y-8 max-w-md w-full text-center">
          {extraEvents.map((event) => (
            <div key={event.id}>
              <h4 className="font-serif font-bold text-lg text-primary">
                {event.title}
              </h4>
              <p className="text-xs text-primary/80 font-sans mt-0.5">
                {event.datetime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
