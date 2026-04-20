"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1400, suffix: "+", label: "Experts", desc: "collaborateurs en France et à l'international" },
  { value: 40, suffix: " ans", label: "D'expérience", desc: "au service des grands programmes industriels" },
  { value: 15, suffix: "", label: "Implantations", desc: "en France, Inde, Tunisie et Allemagne" },
  { value: 3, suffix: "", label: "Business Units", desc: "Engineering, Integration & STYREL" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(interval);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="bg-brand-navy py-20 overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-8 py-8 text-center group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="text-5xl md:text-6xl font-display font-bold text-brand-red mb-2 group-hover:scale-110 transition-transform duration-300">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white text-sm font-semibold uppercase tracking-widest mb-2">
                {stat.label}
              </div>
              <div className="text-white/40 text-xs leading-relaxed hidden md:block">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
