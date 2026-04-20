import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { ArrowRight, Microscope, Lightbulb, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "AMETRA Research",
  description: "R&D et innovation chez AMETRA : projet ORCA et péridynamique pour les matériaux composites.",
};

export default function AmetraResearchPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Groupe", "AMETRA Research"]}
        title="AMETRA"
        highlight="Research"
        subtitle="Innover, monter dans l'échelle de valeurs et accompagner nos clients dans leur démarche d'innovation."
        bg="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: Lightbulb,
                  title: "Innover",
                  desc: "Apporter des solutions nouvelles dans les domaines de la mécanique, électricité, électronique et simulation numérique.",
                },
                {
                  icon: Globe,
                  title: "Monter en valeur",
                  desc: "Développer des technologies à plus haute valeur ajoutée pour renforcer notre position dans la chaîne de valeur industrielle.",
                },
                {
                  icon: Microscope,
                  title: "Accompagner",
                  desc: "Soutenir nos clients dans leur démarche d'innovation avec des outils et méthodes de calcul avancés.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`animate-on-scroll delay-${(i + 1) * 100} bg-brand-light p-8 border-t-4 border-brand-red text-center`}
                >
                  <div className="w-12 h-12 bg-brand-red/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-brand-dark uppercase mb-3">{item.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Projet ORCA */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Projet phare</span>
              </div>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <h2 className="section-title text-white">
                  Projet <span className="text-brand-red">ORCA</span>
                </h2>
                <span className="bg-brand-red/20 border border-brand-red/30 text-brand-red text-xs font-semibold uppercase tracking-widest px-4 py-2">
                  Cofinancé FEDER
                </span>
              </div>
              <p className="text-white/50 mt-4 max-w-2xl">
                La péridynamique est-elle la méthode du futur dans l&apos;industrie ?
                Développement d&apos;un outil de calcul numérique avancé pour les matériaux composites.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-on-scroll-left space-y-8">
                <div className="bg-brand-navy border border-white/5 p-6">
                  <h3 className="font-display font-bold text-lg text-brand-red uppercase tracking-wide mb-4">
                    Les composites dans l&apos;industrie
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Les matériaux composites ont pris une importance significative dans l&apos;ingénierie
                    des matériaux, notamment dans l&apos;aéronautique et l&apos;automobile. Leur rapport
                    résistance/poids, leur multifonctionnalité et leur versatilité en font des
                    matériaux incontournables.
                  </p>
                </div>

                <div className="bg-brand-navy border border-white/5 p-6">
                  <h3 className="font-display font-bold text-lg text-brand-red uppercase tracking-wide mb-4">
                    L&apos;enjeu : prédiction de l&apos;endommagement
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    La modélisation de la défaillance des matériaux (fissures, fracture) est d&apos;une
                    grande importance. La méthode FEM classique est coûteuse en temps de calcul.
                    AMETRA Research travaille sur une approche alternative : la péridynamique.
                  </p>
                </div>

                <div className="bg-brand-navy border border-white/5 p-6">
                  <h3 className="font-display font-bold text-lg text-brand-red uppercase tracking-wide mb-4">
                    Solveur ALPS
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Au cœur du projet ORCA : le développement d&apos;un nouvel outil de calcul
                    numérique &laquo; ALPS &raquo; basé sur une méthode sans maillage (meshless)
                    — la péridynamique — pour résoudre les problèmes de rupture des composites.
                  </p>
                </div>
              </div>

              <div className="animate-on-scroll-right space-y-6">
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80)",
                  }}
                >
                  <div className="absolute inset-0 bg-brand-dark/40" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium bg-brand-dark/70 p-3 backdrop-blur-sm">
                    Simulation numérique — propagation de fissures dans un composite
                  </div>
                </div>

                <div className="bg-brand-navy border border-white/5 p-6">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-4">
                    La péridynamique
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    Nouvelle approche prometteuse créée par le professeur Silling au début des années 2000.
                    Ses équations restent valables même en présence de discontinuités (fissures, fracture),
                    ce qui surmonte les limitations de la mécanique classique des milieux continus.
                  </p>
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <p className="text-white/40 text-xs">Références scientifiques :</p>
                    <p className="text-white/40 text-[11px]">
                      {"{1}"} S. A. Silling, J. Mech. Phys. Solids, 2000
                    </p>
                    <p className="text-white/40 text-[11px]">
                      {"{2}"} W. Hu, Y. D. Ha, F. Bobaru, Comput. Methods Appl. Mech. Eng., 2012
                    </p>
                  </div>
                </div>

                <div className="bg-brand-red/10 border border-brand-red/30 p-6">
                  <h3 className="font-display font-bold text-brand-red uppercase tracking-wide mb-3 text-sm">
                    Futurs travaux
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Développer des modèles d&apos;endommagement pour des structures composites et
                    les implémenter dans le solveur ALPS. Validation par confrontation avec la méthode
                    FEM et des moyens expérimentaux disponibles.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-red">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-white uppercase">
              Un projet R&amp;D en commun ?
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Collaborons pour innover ensemble dans vos domaines.
            </p>
          </div>
          <Link href="/contact" className="btn-outline whitespace-nowrap">
            Contactez AMETRA Research <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
