type PlaceholderNoteProps = {
  children: string;
  className?: string;
};

export function PlaceholderNote({ children, className = "" }: PlaceholderNoteProps) {
  return (
    <p
      className={`font-display text-[0.62rem] tracking-[0.14em] text-gold ${className}`}
    >
      {children}
    </p>
  );
}
