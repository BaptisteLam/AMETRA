import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { ArrowRight, Settings, Printer, Wrench, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "AMETRA Integration",
  description: "Fabrication et intégration de systèmes : harnais électriques, coffrets, baies, racks et bancs de test.",
};

const activities = [
  {
    icon: Settings,
    title: "Build to Specification",
    subtitle: "Étude & réalisation de système",
    desc: "Ametra Integration dispose d'un Bureau d'étude interne adapté aux études détaillées et d'un bureau des Méthodes. AMETRA Engineering apporte ses compétences et son expertise en mécanique, électrique, électronique et logiciel, ainsi qu'en simulation thermique, calcul vibratoire et choc.",
    tags: ["Design to Cost", "Design to Manufacturing", "Bureau d'études interne"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Printer,
    title: "Build to Print",
    subtitle: "Fabrication & intégration de systèmes",
    desc: "Les capacités industrielles d'Ametra Integration permettent d'assurer la fabrication et l'intégration sur 3 sites de production : France, Tunisie et Inde.",
    tags: ["Harnais électriques", "Coffrets & Baies", "Systèmes embarqués", "Racks & Bancs de test"],
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Wrench,
    title: "Services sur Site Client",
    subtitle: "Support & maintenance",
    desc: "Les interventions sur site client apportent une vraie expertise technique. Notre personnel qualifié intervient sur des activités de prototypage, maquettage, formation et support, ainsi que le maintien en conditions opérationnelles de systèmes.",
    tags: ["Prototypage", "Formation client", "MCO systèmes", "Agrément N° 52 49 02727 49"],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
];

const atouts = [
  "Excellence dans la formation et la montée en compétence",
  "Complémentarité des Bureaux d'Études et d'Industrialisation",
  "Supply Chain internationale optimisée (France, Tunisie, Inde)",
  "Pilotage projet rigoureux : gestion stocks et planification production",
  "Organisation Industrielle en UAP sur 3 sites",
  "Très haut niveau d'OTD reconnu par nos clients",
];

const clients = [
  "NEXTER Systems", "MBDA", "DASSAULT Aviation", "RATP", "SNCF",
  "AIRBUS", "SAFRAN", "STELIA", "SIEMENS", "THALES",
  "TECHNICATOME", "FRAMATOME", "ORANO", "ARIANEGROUP", "LIEBHERR",
];

export default function AmetraIntegrationPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Expertise", "AMETRA Integration"]}
        title="AMETRA"
        highlight="Integration"
        subtitle="Fabrication et intégration de systèmes complexes, de la conception jusqu'à la livraison clé en main."
        bg="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Activities */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Activités</span>
              </div>
              <h2 className="section-title text-brand-dark">
                Notre niveau <span className="text-brand-red">d&apos;engagement</span>
              </h2>
            </div>

            <div className="space-y-12">
              {activities.map((act, i) => (
                <div
                  key={act.title}
                  className={`animate-on-scroll delay-${(i + 1) * 100} grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                >
                  <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div
                      className="h-72 bg-cover bg-center relative overflow-hidden"
                      style={{ backgroundImage: `url(${act.image})` }}
                    >
                      <div className="absolute inset-0 bg-brand-dark/30" />
                      <div className="absolute top-4 left-4 bg-brand-red p-3">
                        <act.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <h3 className="font-display font-bold text-2xl text-brand-dark uppercase mb-2">
                      {act.title}
                    </h3>
                    <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-brand-red" /> {act.subtitle}
                    </p>
                    <p className="text-brand-gray leading-relaxed mb-6">{act.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {act.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-brand-light border border-gray-200 text-brand-dark text-xs px-3 py-1.5 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll max-w-4xl mx-auto">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/6Hg5027qJ3E"
                  title="AMETRA Integration - Services sur site client"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-white/40 text-xs text-center mt-4">
                AMETRA Integration — Services sur site client
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Atouts */}
      <section className="py-24 bg-brand-light">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="animate-on-scroll-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Atouts</span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-8">
                  Excellence <span className="text-brand-red">opérationnelle</span>
                </h2>
                <div className="space-y-4">
                  {atouts.map((atout, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white p-4 border-l-4 border-brand-red shadow-sm">
                      <Star className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                      <span className="text-brand-dark text-sm">{atout}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-on-scroll-right">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Clients</span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-8">
                  Nos <span className="text-brand-red">références</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {clients.map((client) => (
                    <span
                      key={client}
                      className="bg-brand-dark text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-brand-red transition-colors cursor-default"
                    >
                      {client}
                    </span>
                  ))}
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
              Besoin d&apos;un intégrateur de confiance ?
            </h2>
            <p className="text-white/70 text-sm mt-1">Sites France, Tunisie, Inde — Livraison clé en main</p>
          </div>
          <Link href="/contact" className="btn-outline whitespace-nowrap">
            Demander un devis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
