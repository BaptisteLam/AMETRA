"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import clsx from "clsx";

const slides = [
  {
    id: 0,
    title: "Groupe AMETRA",
    subtitle: "De la conception\nà l'intégration",
    desc: "40 ans d'expertise au service des grands programmes industriels",
    bg: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1920&q=80",
    cta: "Découvrir le groupe",
    href: "/groupe",
  },
  {
    id: 1,
    title: "Une expertise reconnue",
    subtitle: "Ingénierie de haute\nperformance",
    desc: "Mécanique, électrique, électronique & intégration systèmes",
    bg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    cta: "Notre expertise",
    href: "/expertise",
  },
  {
    id: 2,
    title: "Une présence internationale",
    subtitle: "France, Inde,\nTunisie & Allemagne",
    desc: "15 implantations et une présence sur 3 continents",
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    cta: "Nos références",
    href: "/references",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-brand-dark">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={clsx(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/20 z-10" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid opacity-30 z-10" />

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red z-20" />

      {/* Content */}
      <div className="relative z-20 container-wide pt-20">
        <div className="max-w-3xl">
          <div
            className={clsx(
              "transition-all duration-400",
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                {slide.title}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-none uppercase tracking-tight mb-6">
              {slide.subtitle.split("\n").map((line, i) => (
                <span key={i} className="block" style={{ animationDelay: `${i * 0.1}s` }}>
                  {i === 1 ? <span className="text-brand-red">{line}</span> : line}
                </span>
              ))}
            </h1>

            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl">
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
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={clsx(
              "transition-all duration-300",
              i === current
                ? "w-8 h-2 bg-brand-red"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-12 right-8 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest writing-mode-vertical">Défiler</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

      {/* Side stats */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-6">
        {[
          { n: "1 400", label: "Experts" },
          { n: "40", label: "Ans" },
          { n: "15", label: "Sites" },
          { n: "3", label: "Continents" },
        ].map((stat) => (
          <div key={stat.label} className="glass px-4 py-3 text-center min-w-[80px]">
            <div className="text-2xl font-display font-bold text-brand-red">{stat.n}</div>
            <div className="text-white/50 text-[10px] uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
