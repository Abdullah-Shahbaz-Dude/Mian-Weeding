import { contacts } from "../data/wedding";
import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { Reveal } from "./Reveal";

function WhatsAppIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM12.05 21.8h-.01A9.8 9.8 0 0 1 7.2 20.4l-.34-.2-3.52.92.94-3.43-.22-.35a9.78 9.78 0 0 1-1.5-5.22 9.82 9.82 0 0 1 9.83-9.8c2.62 0 5.09 1.02 6.94 2.88a9.75 9.75 0 0 1 2.87 6.93 9.82 9.82 0 0 1-9.85 9.67zm8.41-18.21A11.82 11.82 0 0 0 12.04 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.5-8.43z" />
    </svg>
  );
}

export function Contact() {
  const { lang, t } = useLanguage();
  const headingClass =
    lang === "ur"
      ? "font-urdu text-3xl md:text-4xl"
      : "font-calligraphy text-4xl md:text-5xl";

  return (
    <Reveal>
      <section
        id="contact"
        className="w-full max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop py-space-2xl scroll-mt-20 border-b border-primary/10"
      >
        <div className="flex flex-col items-center text-center mb-space-lg">
          <h3 className={`${headingClass} text-primary font-medium mb-2`}>
            {t.needAnything}
          </h3>
          <HeartDivider className="w-40 mb-6" />
        </div>
        <div className="flex flex-col gap-3 max-w-xl mx-auto w-full">
          {contacts.map((person) => (
            <div
              key={person.phone}
              className="flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-surface-container-low px-5 py-4"
            >
              <div className="min-w-0 text-start">
                <p className="font-serif text-lg md:text-xl text-primary">
                  {person.name}
                </p>
                <p className="font-sans text-sm md:text-base text-primary/80 mt-0.5">
                  {person.phone}
                </p>
              </div>
              <a
                href={person.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.whatsapp}: ${person.name}`}
                className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-transform hover:opacity-90 active:scale-95"
              >
                <WhatsAppIcon />
              </a>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
