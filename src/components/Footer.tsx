import { useLanguage } from "../lib/i18n";
import { HeartDivider } from "./HeartDivider";
import { Reveal } from "./Reveal";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <Reveal>
    <footer className="relative pb-24 pt-12 px-margin-mobile lg:px-margin-desktop bg-surface-container-low border-t border-primary/10 text-center">
      <div className="max-w-6xl mx-auto py-10 px-6 relative flex flex-col items-center">
        <HeartDivider className="w-full max-w-2xl mb-4" />
        <h3
          className={`${lang === "ur" ? "font-urdu text-3xl md:text-4xl lg:text-5xl" : "font-calligraphy text-5xl md:text-6xl lg:text-7xl"} text-primary font-normal leading-tight`}
        >
          {t.footer}
        </h3>

        <HeartDivider className="w-full max-w-md mt-6" />
      </div>
      <div className="mt-6 flex flex-col items-center justify-center space-y-1">
        <span className="font-calligraphy text-primary text-xl md:text-2xl">
          Mian Kashif Manzoor &amp; Family.
        </span>
      </div>
    </footer>
    </Reveal>
  );
}
