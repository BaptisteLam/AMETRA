import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import { ArrowRight, TrendingUp, Users, Star, Heart, Award, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Rejoignez le Groupe AMETRA : offres d'emploi, management de proximité et évolution de carrière.",
};

const benefits = [
  { icon: TrendingUp, title: "Croissance à 2 chiffres", desc: "depuis plusieurs années grâce à l'investissement de nos équipes" },
  { icon: Users, title: "Management de proximité", desc: "suivi individualisé et accompagnement tout au long de la carrière" },
  { icon: Star, title: "Excellence technique", desc: "projets innovants sur les technologies de demain" },
  { icon: Heart, title: "Vie sociale", desc: "CSE, mutuelle, restauration d'entreprise, activités sportives et culturelles" },
  { icon: Award, title: "Développement de compétences", desc: "formation continue, parcours d'intégration et entretien annuel" },
  { icon: Briefcase, title: "Évolution professionnelle", desc: "GPEC : expertise technique, gestion de projets, management d'équipe" },
];

const domains = [
  "Aéronautique & Spatial",
  "Défense",
  "Nucléaire & Énergie",
  "Ferroviaire & Transport",
  "Industrie navale",
  "R&D & Innovation",
];

const profiles = [
  {
    title: "Ingénieurs & Techniciens",
    desc: "Mécanique, électrique, électronique, systèmes embarqués, logiciel",
    count: "400+",
  },
  {
    title: "Chefs de Projets",
    desc: "Pilotage de projets complexes, coordination multidisciplinaire",
    count: "150+",
  },
  {
    title: "Opérateurs & Câbleurs",
    desc: "Harnais électriques, intégration de systèmes, assemblage",
    count: "600+",
  },
  {
    title: "Fonctions Support",
    desc: "RH, qualité, commercial, finances, IT",
    count: "250+",
  },
];

export default function CarrieresPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Carrières"]}
        title="Construisez votre"
        highlight="Avenir"
        subtitle="Intégrez un groupe en croissance où expertise et innovation contribuent au développement des projets de demain."
        bg="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Intro section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                    Notre culture
                  </span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-6">
                  Une organisation qui <span className="text-brand-red">valorise</span> les talents
                </h2>
                <p className="text-brand-gray leading-relaxed mb-5">
                  Notre organisation favorise le travail en équipe, véritable révélateur de talents.
                  Ainsi, grâce à l&apos;investissement de l&apos;ensemble de nos collaborateurs,
                  nous réalisons une croissance à deux chiffres depuis plusieurs années.
                </p>
                <p className="text-brand-gray leading-relaxed mb-8">
                  Nous capitalisons sur des personnalités et des compétences au travers de
                  l&apos;excellence technique, l&apos;esprit d&apos;initiative et la capacité
                  d&apos;adaptation de chacun.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: "1 400+", l: "Collaborateurs" },
                    { n: "40", l: "Ans d'histoire" },
                    { n: "5", l: "Filières métier" },
                    { n: "15+", l: "Sites en France" },
                  ].map((s) => (
                    <div key={s.l} className="bg-brand-light border border-gray-100 p-4 text-center">
                      <div className="text-2xl font-display font-bold text-brand-red">{s.n}</div>
                      <div className="text-xs text-brand-gray uppercase tracking-widest mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-on-scroll-right">
                <div
                  className="relative h-96 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <blockquote className="text-white text-sm italic border-l-4 border-brand-red pl-4">
                      &ldquo;Nous valorisons les personnalités et les compétences en mettant l&apos;accent
                      sur l&apos;excellence technique, l&apos;esprit d&apos;initiative et la capacité
                      d&apos;adaptation de chaque individu.&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Avantages</span>
                <div className="w-12 h-px bg-brand-red" />
              </div>
              <h2 className="section-title text-white">
                Ce que nous <span className="text-brand-red">offrons</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className={`animate-on-scroll delay-${(i % 3 + 1) * 100} bg-brand-navy border border-white/5 p-6 group hover:border-brand-red/30 transition-all`}
                >
                  <div className="w-12 h-12 bg-brand-red/10 flex items-center justify-center mb-5 group-hover:bg-brand-red transition-colors duration-300">
                    <b.icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-white uppercase tracking-wide mb-3">
                    {b.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-24 bg-brand-light">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-on-scroll-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Profils recherchés</span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-8">
                  Nos <span className="text-brand-red">filières</span>
                </h2>
                <div className="space-y-4">
                  {profiles.map((p) => (
                    <div key={p.title} className="bg-white border border-gray-100 p-5 flex items-center gap-5 hover:border-brand-red/30 hover:shadow-md transition-all">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xl font-display font-bold text-brand-red">{p.count}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-dark text-sm">{p.title}</h3>
                        <p className="text-brand-gray text-xs mt-1">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-on-scroll-right">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">Secteurs</span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-8">
                  Nos domaines <span className="text-brand-red">d&apos;activité</span>
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {domains.map((d) => (
                    <div key={d} className="bg-brand-dark text-white text-xs font-bold uppercase tracking-wide px-4 py-4 text-center hover:bg-brand-red transition-colors cursor-default">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="bg-brand-red p-8 text-white">
                  <h3 className="font-display font-bold text-2xl uppercase mb-4">
                    Prêt(e) à rejoindre l&apos;aventure ?
                  </h3>
                  <p className="text-white/80 text-sm mb-6">
                    Découvrez toutes nos offres d&apos;emploi et postulez directement sur notre espace recrutement.
                  </p>
                  <a
                    href="https://recrutement.ametragroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-brand-red font-bold uppercase tracking-widest text-sm px-6 py-3 hover:bg-brand-dark hover:text-white transition-colors"
                  >
                    Voir nos offres <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}
