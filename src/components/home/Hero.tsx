"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import clsx from "clsx";

const SLIDE_DURATION = 8000;

const slides = [
  {
    id: 0,
    tag: "Défense",
    subtitle: ["Dassault", "Rafale"],
    desc: "40 ans d'expertise au service des grands programmes militaires et de défense nationale",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80",
    cta: "Découvrir le groupe",
    href: "/groupe",
  },
  {
    id: 1,
    tag: "Nucléaire",
    subtitle: ["Énergie", "Nucléaire"],
    desc: "Ingénierie mécanique, calcul et simulation pour les réacteurs et installations nucléaires",
    bg: "https://images.unsplash.com/photo-1495673638879-3a951536b9d5?auto=format&fit=crop&w=1920&q=80",
    cta: "Nos références",
    href: "/references",
  },
  {
    id: 2,
    tag: "Innovation & R&D",
    subtitle: ["Innovation", "& Recherche"],
    desc: "Projets européens, péridynamique et recherche appliquée pour les industries de pointe",
    bg: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=80",
    cta: "AMETRA Research",
    href: "/ametra-research",
  },
  {
    id: 3,
    tag: "Ferroviaire",
    subtitle: ["Transport", "& Mobilité"],
    desc: "Systèmes embarqués, réseaux de bord et intégration pour les transports du futur",
    bg: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80",
    cta: "Notre expertise",
    href: "/expertise",
  },
  {
    id: 4,
    tag: "Aviation Civile",
    subtitle: ["Aéronautique", "Civile"],
    desc: "Structures, systèmes embarqués et intégration pour les grands programmes aéronautiques",
    bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80",
    cta: "AMETRA Engineering",
    href: "/ametra-engineering",
  },
  {
    id: 5,
    tag: "Spatial",
    subtitle: ["Espace", "& Lanceurs"],
    desc: "Harnais, intégration systèmes et sous-ensembles pour les programmes spatiaux européens",
    bg: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1920&q=80",
    cta: "AMETRA Integration",
    href: "/ametra-integration",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Use functional updater — no stale closure, no deps needed
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden bg-brand-dark">
      {/* Backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/55 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-brand-dark/20 z-10" />
      <div className="absolute inset-0 bg-grid opacity-25 z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red z-20" />

      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20 overflow-hidden">
        <div
          key={`progress-${current}`}
          className="h-full bg-brand-red"
          style={{ animation: `progressBar ${SLIDE_DURATION}ms linear forwards` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container-wide pt-20">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brand-red" />
            <span className="text-brand-red text-xs font-bold tracking-[0.3em] uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-none uppercase tracking-tight mb-6">
            <span className="block">{slide.subtitle[0]}</span>
            <span className="block text-brand-red">{slide.subtitle[1]}</span>
          </h1>

          <p className="text-white/55 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
            {slide.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href={slide.href} className="btn-primary group">
              {slide.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={clsx(
              "transition-all duration-300",
              i === current ? "w-8 h-2 bg-brand-red" : "w-2 h-2 bg-white/30 hover:bg-white/60"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/30 hover:text-white/70 transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

      {/* Side counters */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-4">
        {[
          { n: "750+", label: "Experts" },
          { n: "40", label: "Ans" },
          { n: "15", label: "Sites" },
          { n: "3", label: "Continents" },
        ].map((stat) => (
          <div key={stat.label} className="glass px-4 py-3 text-center min-w-[80px]">
            <div className="text-xl font-display font-bold text-brand-red leading-none">{stat.n}</div>
            <div className="text-white/40 text-[9px] uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
