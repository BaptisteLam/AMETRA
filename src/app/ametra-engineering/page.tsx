import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { ArrowRight, Layers, Zap, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "AMETRA Engineering",
  description: "Bureau d'études pluridisciplinaire : ingénierie mécanique, électrique, électronique et systèmes.",
};

const activities = [
  {
    icon: Layers,
    title: "Activité Mécanique & Calcul",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    items: {
      Produits: [
        "Scan 3D & Analyse fonctionnelle",
        "Architecture & Design",
        "Ingénierie mécanique",
        "Calcul & Simulation",
      ],
      Outillages: [
        "Moyens industriels & Bancs d'essai",
        "Ingénierie électrique",
        "IHM & Contrôle commande",
        "Test & Mise en service",
      ],
    },
  },
  {
    icon: Zap,
    title: "Activité Électricité",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    items: {
      "Réseaux de bord": [
        "Analyse fonctionnelle",
        "Architecture & Implantation",
        "Ingénierie électrique",
        "Calcul & Simulation",
      ],
      "Gestion de l'énergie": [
        "Architecture & Implantation",
        "Ingénierie électrique & mécanique",
        "Réalisation & Test",
        "Mise en service",
      ],
    },
  },
  {
    icon: Cpu,
    title: "Électronique, Système & Soft",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    items: {
      "Ingénierie Système": [
        "Analyse fonctionnelle",
        "Sûreté de fonctionnement",
        "Architecture système",
        "Vérification & Validation",
      ],
      "Ingénierie Electronique & Soft": [
        "Analogique & Numérique",
        "FPGA & VHDL",
        "Electronique de puissance",
        "Routage & Prototypage",
      ],
    },
  },
];

const solutions = [
  {
    title: "Forfait",
    desc: "Solution favorisant les compétences techniques, l'accès aux nouvelles technologies et la maîtrise des coûts. Répond à des besoins de conception et d'intégration de systèmes mécaniques, électriques, électroniques.",
    tag: "Build to Spec",
  },
  {
    title: "Centre de Services",
    desc: "Organisation spécifique adaptée à une sous-traitance au forfait avec interface sur site client. Régie par un plan d'assurance qualité, elle correspond à un niveau de collaboration et de confiance élevé.",
    tag: "Front/Back Office",
  },
  {
    title: "Support Ingénierie",
    desc: "Missions réalisées par nos collaborateurs au sein des bureaux d'études clients. Adaptée aux travaux complexes, urgents ou confidentiels. Fort management individualisé et présence partout en France et à l'international.",
    tag: "On-site",
  },
];

const softwares = {
  "CAO 3D / 2D": ["CATIA V5", "CREO Parametric", "SolidWorks", "Inventor", "AutoCAD", "NX"],
  Électricité: ["AutoCAD Electrical", "CANECO", "E3 Cable", "SEE Electrical Expert", "CATIA EHI"],
  Simulation: ["Tolerance Manager", "CeTol", "MathCad", "CREO Plastic Advisor"],
};

export default function AmetraEngineeringPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Expertise", "AMETRA Engineering"]}
        title="AMETRA"
        highlight="Engineering"
        subtitle="Bureau d'études pluridisciplinaire au service des grands programmes industriels, de la conception à la réalisation."
        bg="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Activities */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Activités
                </span>
              </div>
              <h2 className="section-title text-white">
                Nos domaines <span className="text-brand-red">d&apos;expertise</span>
              </h2>
            </div>

            <div className="space-y-8">
              {activities.map((act, i) => (
                <div key={act.title} className={`animate-on-scroll delay-${(i + 1) * 100} bg-brand-navy border border-white/5 p-8`}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 ${act.bg} flex items-center justify-center`}>
                      <act.icon className={`w-6 h-6 ${act.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                      {act.title}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(act.items).map(([cat, items]) => (
                      <div key={cat}>
                        <h4 className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-4 h-px bg-brand-red" /> {cat}
                        </h4>
                        <ul className="space-y-2">
                          {(items as string[]).map((item) => (
                            <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                              <span className="w-1 h-1 bg-brand-red rounded-full shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Solutions
                </span>
              </div>
              <h2 className="section-title text-brand-dark">
                Modes d&apos;<span className="text-brand-red">intervention</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((sol, i) => (
                <div
                  key={sol.title}
                  className={`animate-on-scroll delay-${(i + 1) * 100} bg-brand-light border border-gray-100 hover:border-brand-red/40 hover:shadow-xl transition-all duration-300 p-8 group`}
                >
                  <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-5 inline-block">
                    {sol.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl text-brand-dark uppercase mb-4 group-hover:text-brand-red transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{sol.desc}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Software */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Outils
                </span>
              </div>
              <h2 className="section-title text-white">
                Nos <span className="text-brand-red">logiciels</span>
              </h2>
              <p className="text-white/50 mt-4 max-w-xl">
                Un parc logiciel performant et homogène, avec des investissements réguliers pour
                rester à la pointe des technologies de conception.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(softwares).map(([cat, tools], i) => (
                <div
                  key={cat}
                  className={`animate-on-scroll delay-${(i + 1) * 100} bg-brand-navy border border-white/5 p-6`}
                >
                  <h3 className="font-display font-bold text-sm text-brand-red uppercase tracking-widest mb-5 flex items-center gap-2">
                    <span className="w-4 h-px bg-brand-red" /> {cat}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-white/5 text-white/70 text-xs px-3 py-1.5 hover:bg-brand-red hover:text-white transition-colors cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-red">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-white uppercase">
              Vous avez un projet ?
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Nos experts sont à votre disposition pour étudier votre besoin.
            </p>
          </div>
          <Link href="/contact" className="btn-outline whitespace-nowrap">
            Contactez-nous <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
