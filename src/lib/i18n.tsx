import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ur";

const copy = {
  en: {
    nikkahCeremony: "Nikkah Ceremony",
    welcome:
      "Mr. and Mrs. Mian Kashif Manzoor are honored to welcome you to the Nikkah Ceremony of their beloved daughter.",
    blessings:
      "Your presence and blessings on this precious occasion will be highly appreciated.",
    scratchToReveal: "Scratch to Reveal",
    scratchHint:
      "(Rub or drag your finger over the heart to uncover our date!)",
    saveTheDate: "Save The Date",
    countingDown: "Counting Down to Forever",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    programme: "Programme Timeline",
    marqueeNote:
      "Marquee will be closed by 9:45 PM According to Government of Punjab Guidelines.",
    venue: "Venue",
    location: "Location",
    viewMaps: "View on Google Maps",
    appleMaps: "Apple Maps",
    footer: "We can't wait to celebrate with you!",
    arrival: "Arrival",
    nikkah: "Nikkah",
    dinner: "Dinner",
    with: "with",
    sonOf: "son of",
    needAnything: "If you have any questions",
    whatsapp: "WhatsApp",
    loading: "Loading",
    langLabel: "Urdu",
    langTitle: "Switch to Urdu",
  },
  ur: {
    nikkahCeremony: "نکاح کی تقریب",
    welcome:
      "جناب و محترمہ میاں کاشف منظور اپنی پیاری بیٹی کی نکاح کی تقریب میں آپ کو خوش آمدید کہتے ہیں۔",
    blessings: "اس قیمتی موقع پر آپ کی حاضری اور دعاؤں کا بہت احسان ہوگا۔",
    scratchToReveal: "کھرچ کر دیکھیں",
    scratchHint: "(دل پر انگلی پھیریں تاکہ تاریخ ظاہر ہو)",
    saveTheDate: "تاریخ محفوظ کریں",
    countingDown: "ہمیشہ کے لیے الٹی گنتی",
    days: "دن",
    hours: "گھنٹے",
    minutes: "منٹ",
    seconds: "سیکنڈ",
    programme: "پروگرام کا شیڈول",
    marqueeNote:
      "حکومت پنجاب کے رہنما اصولوں کے مطابق خیموں کو رات نو بج کر پنتالیس منٹ پر بند کر دیا جائے گا۔",
    venue: "مقام",
    location: "پتہ",
    viewMaps: "گوگل میپس پر دیکھیں",
    appleMaps: "ایپل میپس",
    footer: "ہم آپ کے ساتھ یہ خوشی منانے کے منتظر ہیں!",
    arrival: "آمد",
    nikkah: "نکاح",
    dinner: "کھانا",
    with: "مع",
    sonOf: "ولدِ",
    needAnything: "اگر آپ کو کوئی سوال ہو",
    whatsapp: "واٹس ایپ",
    loading: "لوڈ ہو رہا ہے",
    langLabel: "English",
    langTitle: "Switch to English",
  },
} as const;

type Copy = {
  [K in keyof (typeof copy)["en"]]: string;
};

type LanguageContextValue = {
  lang: Lang;
  t: Copy;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      t: copy[lang],
      toggleLang: () => setLang((current) => (current === "en" ? "ur" : "en")),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
