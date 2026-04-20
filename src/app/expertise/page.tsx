import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Expertise",
  description: "L'expertise AMETRA : ingénierie, intégration et informatique industrielle au service des industries stratégiques.",
};

const expertiseAreas = [
  {
    title: "AMETRA Engineering",
    subtitle: "Bureau d'études pluridisciplinaire",
    href: "/ametra-engineering",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    domains: ["Mécanique & Calcul", "Électricité", "Électronique, Système & Soft"],
    desc: "Conception, calcul, simulation et réalisation de systèmes mécaniques, électriques et électroniques pour les industries les plus exigeantes.",
  },
  {
    title: "AMETRA Integration",
    subtitle: "Fabrication & Intégration systèmes",
    href: "/ametra-integration",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    domains: ["Build to Specification", "Build to Print", "Services sur site"],
    desc: "Production de harnais, coffrets, baies, racks et bancs de test sur 3 sites : France, Tunisie et Inde.",
  },
  {
    title: "STYREL",
    subtitle: "Informatique industrielle",
    href: "/styrel",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    domains: ["PC & Panels Industriels", "Bancs de Tests", "Formation technique"],
    desc: "35 ans d'expertise en informatique industrielle embarquée, instrumentation et formation certifiée QUALIOPI.",
  },
];

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Expertise"]}
        title="Notre"
        highlight="Expertise"
        subtitle="Trois business units complémentaires pour couvrir l'intégralité de la chaîne de valeur industrielle."
        bg="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Main expertise grid */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-3 gap-8">
              {expertiseAreas.map((area, i) => (
                <Link
                  key={area.title}
                  href={area.href}
                  className={`animate-on-scroll delay-${(i + 1) * 100} group block`}
                >
                  <div className="relative h-56 overflow-hidden mb-6">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${area.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 border-b-4 border-brand-red">
                      <h2 className="font-display font-bold text-2xl text-white uppercase leading-none">
                        {area.title}
                      </h2>
                    </div>
                  </div>
                  <div className="px-2">
                    <p className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-3">
                      {area.subtitle}
                    </p>
                    <p className="text-brand-gray text-sm leading-relaxed mb-5">{area.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {area.domains.map((d) => (
                        <li key={d} className="flex items-center gap-3 text-xs text-brand-dark font-medium">
                          <span className="w-1.5 h-1.5 bg-brand-red shrink-0" /> {d}
                        </li>
                      ))}
                    </ul>
                    <span className="flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-widest group-hover:gap-4 transition-all">
                      Découvrir <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Global value chain */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Chaîne de valeur</span>
                <div className="w-12 h-px bg-brand-red" />
              </div>
              <h2 className="section-title text-white">
                De la conception <span className="text-brand-red">à l&apos;intégration</span>
              </h2>
              <p className="text-white/50 mt-4 max-w-2xl mx-auto">
                Le Groupe AMETRA est le seul acteur capable d&apos;adresser l&apos;ensemble de
                la chaîne de valeur, de la conception système jusqu&apos;à la livraison intégrée.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-brand-red/30" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Conception", desc: "Études, architecture, calcul & simulation" },
                  { step: "02", title: "Développement", desc: "Prototypage, tests, validation système" },
                  { step: "03", title: "Production", desc: "Fabrication, assemblage, intégration" },
                  { step: "04", title: "Service", desc: "MCO, formation, support sur site client" },
                ].map((item) => (
                  <div key={item.step} className="animate-on-scroll text-center relative">
                    <div className="w-16 h-16 bg-brand-red flex items-center justify-center mx-auto mb-5 relative z-10">
                      <span className="text-white font-display font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase mb-2">{item.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}
