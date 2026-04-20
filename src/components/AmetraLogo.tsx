import Link from "next/link";

interface AmetraLogoProps {
  variant?: "white" | "red";
  className?: string;
  showText?: boolean;
}

export default function AmetraLogo({
  variant = "white",
  className = "",
  showText = true,
}: AmetraLogoProps) {
  const color = variant === "white" ? "#FFFFFF" : "#C8102E";
  const subColor = variant === "white" ? "rgba(255,255,255,0.7)" : "#C8102E";

  return (
    <Link href="/" className={`flex items-center gap-3 group shrink-0 ${className}`}>
      {/* SVG A mark — replace with <img src="/logo.png" className="h-12 w-auto" /> once you have a PNG with transparent background */}
      <svg
        viewBox="0 0 66 76"
        className="h-11 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main A shape with inner cutout via evenodd */}
        <path
          fillRule="evenodd"
          d="M4 72 L30 4 L56 72 Z M18 48 L30 18 L42 48 Z"
          fill={color}
        />
        {/* Crossbar */}
        <path d="M15 40 H45 V49 H15 Z" fill={color} />
        {/* Swoosh */}
        <path
          d="M47 72 Q60 60 64 67"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div className="leading-none">
          <div
            style={{ color }}
            className="font-display font-bold text-2xl tracking-[0.08em] leading-none"
          >
            AMETRA
          </div>
          <div
            style={{ color: subColor }}
            className="font-display font-semibold text-[10px] tracking-[0.4em] leading-none mt-1"
          >
            GROUP
          </div>
        </div>
      )}
    </Link>
  );
}
