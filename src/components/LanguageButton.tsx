import { useLanguage } from "../lib/i18n";

export function LanguageButton() {
  const { lang, t, toggleLang } = useLanguage();

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <button
        type="button"
        onClick={toggleLang}
        aria-label={t.langTitle}
        title={t.langTitle}
        className="w-10 h-10 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-primary shadow-md backdrop-blur-md flex items-center justify-center border border-primary/20 transition-transform active:scale-95"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <span className="sr-only">{lang === "en" ? "Urdu" : "English"}</span>
      </button>
    </div>
  );
}
