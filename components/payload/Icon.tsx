export default function Icon() {
  return (
    <svg
      viewBox="160 340 680 400"
      role="img"
      aria-label="Nexo Services"
      width={120}
      height={48}
      style={{ height: 28, width: "auto", maxWidth: 120 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="payload-ns-icon-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2C166" />
          <stop offset="35%" stopColor="#F5A623" />
          <stop offset="70%" stopColor="#D9984A" />
          <stop offset="100%" stopColor="#E8931F" />
        </linearGradient>
      </defs>
      <g
        textAnchor="middle"
        style={{
          fontFamily:
            "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <text
          x="500"
          y="556"
          fontSize="224"
          fontWeight="600"
          letterSpacing="6"
          fill="#FFFFFF"
        >
          NE
          <tspan fill="url(#payload-ns-icon-grad)">X</tspan>O
        </text>
        <text
          x="512"
          y="686"
          fontSize="76"
          fontWeight="400"
          letterSpacing="27"
          fill="#FFFFFF"
        >
          SERVICES
        </text>
      </g>
    </svg>
  );
}
