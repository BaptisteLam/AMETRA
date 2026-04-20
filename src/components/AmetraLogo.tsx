import Link from "next/link";

interface AmetraLogoProps {
  variant?: "white" | "red";
  className?: string;
}

// variant="white"  → logo turned white via CSS filter (for dark header/footer)
// variant="red"    → original red logo (for light backgrounds)
export default function AmetraLogo({ variant = "white", className = "" }: AmetraLogoProps) {
  return (
    <Link href="/" aria-label="AMETRA GROUP" className={`inline-flex shrink-0 ${className}`}>
      <img
        src="/logo.png"
        alt="AMETRA GROUP"
        className="h-12 w-auto"
        style={variant === "white" ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </Link>
  );
}
