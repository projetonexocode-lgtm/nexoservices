type WhatsAppIconProps = {
  size?: number;
  bubbleColor?: string;
  dotColor?: string;
  className?: string;
};

export function WhatsAppIcon({
  size = 18,
  bubbleColor = "currentColor",
  dotColor = "#FAF7F2",
  className,
}: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
    >
      <rect x="2" y="3" width="20" height="15" rx="7" fill={bubbleColor} />
      <rect x="6" y="17" width="6" height="5" rx="2" fill={bubbleColor} />
      <circle cx="8" cy="10.5" r="1.4" fill={dotColor} />
      <circle cx="12" cy="10.5" r="1.4" fill={dotColor} />
      <circle cx="16" cy="10.5" r="1.4" fill={dotColor} />
    </svg>
  );
}
