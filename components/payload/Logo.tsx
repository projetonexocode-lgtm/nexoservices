export default function Logo() {
  return (
    <svg
      viewBox="160 340 680 400"
      role="img"
      aria-label="Nexo Services"
      width={240}
      height={96}
      style={{ height: 72, width: "auto", maxWidth: 240 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="payload-ns-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9984A" />
          <stop offset="45%" stopColor="#B87118" />
          <stop offset="100%" stopColor="#734A26" />
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
          fill="#0B0B0D"
        >
          NE
          <tspan fill="url(#payload-ns-grad)">X</tspan>O
        </text>
        <text
          x="512"
          y="686"
          fontSize="76"
          fontWeight="400"
          letterSpacing="27"
          fill="#0B0B0D"
        >
          SERVICES
        </text>
      </g>
    </svg>
  );
}
