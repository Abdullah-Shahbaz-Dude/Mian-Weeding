import { useEffect, useState } from "react";
import { navItems } from "../data/wedding";
import type { NavPath } from "../types";

export function useActiveSection(defaultPath: NavPath = "our-story"): NavPath {
  const [activePath, setActivePath] = useState<NavPath>(defaultPath);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.path))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top?.target.id) {
          setActivePath(top.target.id as NavPath);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activePath;
}
