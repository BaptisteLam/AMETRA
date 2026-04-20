"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ScrollAnimator({ children }: { children: React.ReactNode }) {
  const ref = useScrollAnimation();
  return <div ref={ref}>{children}</div>;
}
