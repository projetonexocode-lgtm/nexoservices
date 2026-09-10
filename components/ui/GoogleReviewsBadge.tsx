import { GoogleIcon } from "@/components/ui/GoogleIcon";

type GoogleReviewsBadgeProps = {
  rating?: string;
  label?: string;
  href?: string;
  className?: string;
};

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 17.8 5.9 20.5 7.3 14l-5-4.6 6.7-.7L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleReviewsBadge({
  rating = "5.0",
  label = "Avaliações no Google",
  href,
  className = "",
}: GoogleReviewsBadgeProps) {
  const content = (
    <>
      <GoogleIcon size={22} />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="flex items-center gap-1.5">
          <span className="font-display text-[15px] tracking-wide text-charcoal">
            {rating}
          </span>
          <Stars />
        </span>
        <span className="mt-1 text-[11px] text-muted">{label}</span>
      </span>
    </>
  );

  const classes = `inline-flex items-center gap-2.5 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${classes} transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze`}
        aria-label={`${rating} ${label}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={classes} aria-label={`${rating} ${label}`}>
      {content}
    </div>
  );
}
