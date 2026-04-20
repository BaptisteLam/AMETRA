import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { ArrowRight, Code2, Monitor, FlaskConical, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "STYREL — AMETRA Group",
  description: "Intégrateur en informatique industrielle depuis 35 ans. Bancs de test, PC industriels et formation technique.",
};

const activities = [
  {
    icon: Code2,
    title: "Ingénierie",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    desc: "Styrel met à disposition une équipe de consultants expérimentés dans les domaines de l'instrumentation, du Banc de Test, de l'acquisition de données, de l'électronique, de l'informatique industrielle et embarquée.",
    offer: ["Assistance technique", "Mode projet", "Instrumentation", "Acquisition de données"],
  },
  {
    icon: Monitor,
    title: "PC & Panels Industriels",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    desc: "Les équipes Styrel assemblent et commercialisent une offre complète de PC Industriels & Panels PC autour de matériels pérennes et durcis.",
    offer: [
      "Sourcing des produits",
      "Assemblage sur-mesure",
      "Installation cartes additionnelles",
      "Tests fonctionnels et d'endurance",
    ],
  },
  {
    icon: FlaskConical,
    title: "Intégration Bancs de Tests",
    color: "text-green-400",
    bg: "bg-green-500/10",
    desc: "Styrel conçoit des Bancs de Tests dédiés aux entreprises du secteur industriel. Livraison de projets d'intégration « Clé en main » comportant de l'instrumentation, du logiciel, de l'électricité et de la mécanique.",
    offer: [
      "Build to Print",
      "Build to Spec",
      "Intégration baies",
      "Projets clé en main",
    ],
  },
  {
    icon: GraduationCap,
    title: "Formation",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    desc: "Styrel est un organisme de formation continue certifié QUALIOPI (n° 11 91 02 737 91). Large catalogue de formations continues techniques et scientifiques.",
    offer: [
      "LabVIEW & TestStand",
      "Python industriel",
      "Format inter-entreprise",
      "Intra-entreprise sur site",
    ],
  },
];

export default function StyrelPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Expertise", "STYREL"]}
        title="STYREL"
        highlight="AMETRA Group"
        subtitle="Intégrateur en informatique industrielle depuis 35 ans. Expert en bancs de test, PC industriels et formation technique."
        bg="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                    35 ans d&apos;expertise
                  </span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-6">
                  Informatique <span className="text-brand-red">industrielle</span>
                </h2>
                <p className="text-brand-gray leading-relaxed mb-5">
                  Depuis 35 ans, Styrel intervient avec passion dans les métiers de
                  l&apos;informatique industrielle et embarquée. Notre équipe de consultants
                  expérimentés vous accompagne en véritable expert, aussi bien en assistance
                  technique qu&apos;en mode projet.
                </p>
                <p className="text-brand-gray leading-relaxed mb-8">
                  Filiale du Groupe AMETRA, Styrel bénéficie de la force d&apos;un groupe
                  industriel tout en conservant l&apos;agilité d&apos;une structure à taille
                  humaine, proche de ses clients.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: "35+", l: "Ans d'expérience" },
                    { n: "QUALIOPI", l: "Certifié" },
                    { n: "3", l: "Modes d'intervention" },
                    { n: "∞", l: "Passion" },
                  ].map((s) => (
                    <div key={s.l} className="bg-brand-light p-4 text-center border border-gray-100">
                      <div className="text-2xl font-display font-bold text-brand-red">{s.n}</div>
                      <div className="text-xs text-brand-gray uppercase tracking-widest mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="animate-on-scroll-right">
                <div
                  className="h-96 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-brand-red/90 p-4 backdrop-blur-sm">
                      <p className="text-white text-sm font-semibold">
                        Certification QUALIOPI
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        Organisme de formation continue N° 11 91 02 737 91
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Activités</span>
                <div className="w-12 h-px bg-brand-red" />
              </div>
              <h2 className="section-title text-white">
                Nos domaines <span className="text-brand-red">d&apos;intervention</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((act, i) => (
                <div
                  key={act.title}
                  className={`animate-on-scroll delay-${(i % 2 + 1) * 100} bg-brand-navy border border-white/5 p-8 group hover:border-brand-red/30 transition-all`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${act.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <act.icon className={`w-6 h-6 ${act.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                      {act.title}
                    </h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{act.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {act.offer.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-white/60 text-xs">
                        <span className="w-1 h-1 bg-brand-red rounded-full shrink-0" />
                        {item}
                      </div>
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
              Besoin d&apos;une expertise en informatique industrielle ?
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Contactez nos experts ou consultez notre catalogue de formation.
            </p>
          </div>
          <Link href="/contact" className="btn-outline whitespace-nowrap">
            Nous contacter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
