"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import ScrollAnimator from "@/components/ScrollAnimator";

const entities = [
  {
    name: "AMETRA Engineering",
    short: "Ingénierie & Simulation",
    desc: "Bureau d'études, calcul de structures, simulation numérique, conception mécanique",
    accent: "border-brand-red",
    href: "/ametra-engineering",
  },
  {
    name: "AMETRA Integration",
    short: "Systèmes & Intégration",
    desc: "Électronique embarquée, harnais, intégration systèmes, spatial et naval",
    accent: "border-sky-400",
    href: "/ametra-integration",
  },
  {
    name: "STYREL",
    short: "Formation Professionnelle",
    desc: "Centre de formation agréé, habilitations électriques, formations métiers",
    accent: "border-amber-400",
    href: "/styrel",
  },
  {
    name: "AMETRA Research",
    short: "Innovation & R&D",
    desc: "Péridynamique, projets européens, recherche appliquée aux matériaux et structures",
    accent: "border-emerald-400",
    href: "/ametra-research",
  },
];

// Replace VIDEO_ID with your YouTube or Vimeo video identifier
const VIDEO_ID = "";

export default function GroupeOrg() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-24 bg-brand-dark overflow-hidden">
      <div className="container-wide">
        <ScrollAnimator>
          {/* Header */}
          <div className="animate-on-scroll mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                Notre structure
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="section-title text-white">
                Organisation <span className="text-brand-red">du Groupe</span>
              </h2>
              <p className="text-white/40 text-sm max-w-xs">
                Un groupe industriel multi-métiers au service des programmes les plus exigeants.
              </p>
            </div>
          </div>

          {/* Video */}
          <div className="animate-on-scroll delay-100 relative w-full aspect-video bg-brand-navy overflow-hidden mb-14">
            {VIDEO_ID && playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="AMETRA Group — Organisation Globale"
              />
            ) : (
              <button
                onClick={() => VIDEO_ID && setPlaying(true)}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group cursor-pointer"
                aria-label="Lire la vidéo de présentation"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80)",
                  }}
                />
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid opacity-30" />
                {/* Red vertical accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full border-2 border-brand-red flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                    <Play className="w-7 h-7 text-brand-red group-hover:text-white transition-colors duration-300 ml-1" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-display font-bold text-lg uppercase tracking-widest">
                      AMETRA Group
                    </p>
                    <p className="text-white/40 text-xs uppercase tracking-[0.3em] mt-1">
                      Organisation Globale
                    </p>
                  </div>
                </div>

                {/* Bottom stats bar */}
                <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-white/10 bg-brand-dark/80 backdrop-blur-sm">
                  {[
                    { n: "750+", l: "Experts" },
                    { n: "40 ans", l: "D'expérience" },
                    { n: "4", l: "Entités" },
                    { n: "3", l: "Continents" },
                  ].map((s) => (
                    <div key={s.l} className="flex-1 py-3 text-center">
                      <div className="text-brand-red font-display font-bold text-base leading-none">
                        {s.n}
                      </div>
                      <div className="text-white/30 text-[9px] uppercase tracking-widest mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </button>
            )}
          </div>

          {/* Org structure */}
          <div className="animate-on-scroll delay-200">
            {/* Parent node */}
            <div className="flex justify-center mb-0">
              <div className="border-2 border-brand-red/60 bg-brand-red/10 px-10 py-4 text-center">
                <div className="text-white font-display font-bold text-xl tracking-[0.15em] uppercase">
                  AMETRA Group
                </div>
                <div className="text-brand-red/70 text-[10px] uppercase tracking-[0.3em] mt-1">
                  Groupe Industriel · Siège Toulouse
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-brand-red/30" />
            </div>

            {/* Branch line */}
            <div className="relative flex items-start justify-center mb-0">
              <div className="w-3/4 h-px bg-brand-red/30 mt-0" />
            </div>

            {/* Entity cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mt-0">
              {entities.map((e, i) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className={`animate-on-scroll delay-${(i + 2) * 100} group flex flex-col bg-brand-navy hover:bg-brand-dark transition-colors duration-300 p-6 border-t-2 ${e.accent}`}
                >
                  <div className="text-white font-display font-bold text-sm uppercase tracking-widest mb-1 group-hover:text-brand-red transition-colors duration-300">
                    {e.name}
                  </div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mb-3">
                    {e.short}
                  </div>
                  <p className="text-white/30 text-xs leading-relaxed flex-1">{e.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-brand-red/60 group-hover:text-brand-red transition-colors duration-300 text-xs font-semibold uppercase tracking-widest">
                    Voir <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
