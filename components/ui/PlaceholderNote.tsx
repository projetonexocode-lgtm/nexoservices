type PlaceholderNoteProps = {
  children: string;
  className?: string;
};

export function PlaceholderNote({ children, className = "" }: PlaceholderNoteProps) {
  return (
    <p
      className={`inline-flex max-w-full rounded-lg border border-flag/40 bg-flag/10 px-2.5 py-1.5 text-sm leading-snug text-flag ${className}`}
    >
      {children}
    </p>
  );
}
