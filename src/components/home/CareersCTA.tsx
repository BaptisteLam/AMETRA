import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Award } from "lucide-react";
import ScrollAnimator from "@/components/ScrollAnimator";

const highlights = [
  { icon: TrendingUp, label: "Croissance à 2 chiffres", desc: "depuis plusieurs années" },
  { icon: Users, label: "Management de proximité", desc: "accompagnement individualisé" },
  { icon: Award, label: "Excellence technique", desc: "projets innovants et motivants" },
];

export default function CareersCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-brand-dark/85" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

      <div className="relative z-10 container-wide">
        <ScrollAnimator>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Rejoignez-nous
                </span>
              </div>
              <h2 className="section-title text-white mb-6">
                Construisez votre <span className="text-brand-red">avenir</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Intégrez un groupe en croissance où expertise et innovation contribuent au
                développement des projets de demain dans l&apos;industrie. Nous valorisons les
                personnalités et les compétences au travers de l&apos;excellence technique.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://recrutement.ametragroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                >
                  Voir nos offres <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/carrieres" className="btn-outline">
                  Notre politique RH
                </Link>
              </div>
            </div>

            <div className="animate-on-scroll-right space-y-4">
              {highlights.map((h) => (
                <div key={h.label} className="glass flex items-center gap-5 p-5 group hover:bg-brand-red/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-red/20 flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors duration-300">
                    <h.icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm uppercase tracking-wide">
                      {h.label}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{h.desc}</div>
                  </div>
                </div>
              ))}

              <div className="glass p-6 mt-6">
                <div className="text-brand-red font-display font-bold text-4xl mb-1">750+</div>
                <div className="text-white text-sm">collaborateurs passionnés</div>
                <div className="text-white/40 text-xs mt-2">
                  Aéronautique · Défense · Nucléaire · Ferroviaire
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
