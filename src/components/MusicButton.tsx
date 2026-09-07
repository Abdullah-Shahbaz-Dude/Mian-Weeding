import { Icon } from "./Icon";

type MusicButtonProps = {
  variant: "header" | "fab";
};

export function MusicButton({ variant }: MusicButtonProps) {
  if (variant === "fab") {
    return (
      <div className="fixed bottom-space-md right-space-md z-40 md:hidden">
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(45,37,34,0.12)] text-primary"
          type="button"
          aria-label="Play Canon in D"
        >
          <Icon name="music_note" className="text-[22px]" />
        </button>
      </div>
    );
  }

  return (
    <button
      className="hidden md:flex items-center gap-space-2xs px-space-sm py-space-3xs rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-all font-label-subtle text-label-subtle"
      type="button"
      aria-label="Now playing Canon in D"
    >
      <Icon name="music_note" className="text-[16px] text-primary" />
      <span>Canon in D</span>
      <span className="text-outline">|</span>
      <Icon name="volume_up" className="text-[16px]" />
    </button>
  );
}
