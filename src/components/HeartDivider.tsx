type HeartDividerProps = {
  className?: string;
};

export function HeartDivider({ className = "w-40" }: HeartDividerProps) {
  return (
    <div
      className={`flex items-center justify-center space-x-3 ${className}`}
      aria-hidden
    >
      <div className="h-[1px] bg-primary/30 flex-1" />
      <span className="text-primary text-xs">♥</span>
      <div className="h-[1px] bg-primary/30 flex-1" />
    </div>
  );
}
