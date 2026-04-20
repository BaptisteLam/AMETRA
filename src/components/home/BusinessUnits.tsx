import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollAnimator from "@/components/ScrollAnimator";

const units = [
  {
    title: "AMETRA",
    subtitle: "Engineering",
    href: "/ametra-engineering",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    services: ["Ingénierie Mécanique", "Ingénierie Électrique", "Électronique, Système & Soft"],
    desc: "Bureau d'études pluridisciplinaire au service des grands programmes industriels, de la conception à la réalisation.",
  },
  {
    title: "AMETRA",
    subtitle: "Integration",
    href: "/ametra-integration",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    services: ["Build to Specification", "Build to Print", "Services sur site client"],
    desc: "Fabrication et intégration de systèmes complexes : harnais, coffrets, baies, racks et bancs de test.",
  },
  {
    title: "STYREL",
    subtitle: "AMETRA Group",
    href: "/styrel",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    services: ["Ingénierie système soft", "PC & Panels Industriels", "Bancs de Tests"],
    desc: "Intégrateur en informatique industrielle depuis 35 ans, spécialiste des bancs de test et de la formation.",
  },
];

export default function BusinessUnits() {
  return (
    <section className="py-24 bg-brand-dark">
      <div className="container-wide">
        <ScrollAnimator>
          <div className="animate-on-scroll text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Nos entités</span>
              <div className="w-12 h-px bg-brand-red" />
            </div>
            <h2 className="section-title text-white">
              Nos Business <span className="text-brand-red">Units</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {units.map((unit, i) => (
              <div
                key={unit.subtitle}
                className={`animate-on-scroll delay-${(i + 1) * 100} group relative overflow-hidden bg-brand-navy-light`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${unit.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display font-bold text-2xl text-white uppercase leading-none">
                      {unit.title}
                    </h3>
                    <span className="font-display font-bold text-2xl text-brand-red uppercase">
                      {unit.subtitle}
                    </span>
                    <div className="w-8 h-0.5 bg-brand-red mt-2" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{unit.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {unit.services.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-sm text-white/70">
                        <span className="w-4 h-4 bg-brand-red/20 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 bg-brand-red" />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={unit.href}
                    className="flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    En savoir plus <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
