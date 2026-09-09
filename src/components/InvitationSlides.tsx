import { useEffect, useState } from "react";
import slide1 from "../assets/slide-1.webp";
import slide2 from "../assets/slide-2.webp";
import slide3 from "../assets/slide-3.webp";
import slide4 from "../assets/slide-4.webp";

const SLIDES = [slide1, slide2, slide3, slide4];
const SLIDE_MS = 2000;

export default function InvitationSlides() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl p-space-2xs bg-surface-container-high/60 backdrop-blur-xl shadow-xl">
      <div className="relative w-full h-[460px] sm:h-[580px] rounded-lg overflow-hidden">
        {SLIDES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1280}
            height={904}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-surface-container/20" />
      </div>
    </div>
  );
}
