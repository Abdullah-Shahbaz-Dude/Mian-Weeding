import { couple, navItems } from "../data/wedding";
import type { NavPath } from "../types";
import { Icon } from "./Icon";
import { MusicButton } from "./MusicButton";

type HeaderProps = {
  activePath: NavPath;
  onNavigate: (path: NavPath) => void;
};

export function Header({ activePath, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-max-content-width mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img
            alt={couple.monogramAlt}
            className="h-8 w-auto object-contain"
            src={couple.monogramSrc}
          />
          <span className="font-headline-sm text-headline-sm tracking-tight text-primary hidden sm:inline-block">
            {couple.bride} &amp; {couple.groom}
          </span>
        </div>

        <nav
          className="hidden xl:flex items-center gap-space-xs p-space-3xs rounded-full bg-surface-container/60 backdrop-blur-md"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = item.path === activePath;
            return (
              <button
                key={item.path}
                type="button"
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "px-space-sm py-space-3xs font-label-subtle transition-colors bg-primary-container text-on-primary-container rounded-full"
                    : "px-space-sm py-space-3xs text-on-surface-variant font-label-subtle text-label-subtle hover:text-on-surface transition-colors"
                }
                onClick={() => onNavigate(item.path)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-xs">
          <MusicButton variant="header" />
          <button
            type="button"
            className="px-space-md py-space-2xs rounded-full bg-primary text-on-primary font-label-subtle text-label-subtle shadow-[0_4px_16px_rgba(212,163,115,0.25)] hover:bg-primary-container hover:text-on-primary-container transition-all"
            onClick={() => onNavigate("rsvp-guestbook")}
          >
            RSVP Now
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
