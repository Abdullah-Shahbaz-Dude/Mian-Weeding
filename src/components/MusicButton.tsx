type MusicButtonProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function MusicButton({ isPlaying, onToggle }: MusicButtonProps) {
  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Music Playing" : "Music Paused"}
        className={`w-10 h-10 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-primary shadow-md backdrop-blur-md flex items-center justify-center border border-primary/20 transition-transform active:scale-95 ${
          isPlaying ? "text-primary-container" : ""
        }`}
        type="button"
        onClick={onToggle}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}
