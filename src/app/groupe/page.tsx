import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Présentation du Groupe",
  description: "Histoire, valeurs, organisation et politique qualité du Groupe AMETRA.",
};

const certifications = [
  "Certification ISO 9001 version 2015",
  "Certification EN 9100 version 2018",
  "Certification Radioprotection",
  "Certification QUALIOPI",
  "Qualification UTO",
  "Agrément QN100",
  "Conformité ISO 19443",
];

const values = [
  {
    title: "Exigences",
    desc: "Fiabilité, rigueur, maîtrise des risques, qualité des solutions fournies, pertinence des services délivrés dans l'atteinte des objectifs que nous confient nos clients.",
    color: "from-brand-red/20 to-brand-red/5",
  },
  {
    title: "Engagements",
    desc: "Implication dans la conduite des projets, prise en compte des enjeux, adaptabilité et agilité au côté de nos clients.",
    color: "from-blue-900/30 to-blue-900/5",
  },
  {
    title: "Innovation",
    desc: "Déclinaison aussi bien en termes de technologies, de pratiques de travail, de curiosité vis-à-vis de l'ensemble des acteurs de nos écosystèmes.",
    color: "from-purple-900/30 to-purple-900/5",
  },
];

const priorities = [
  "Élargir le portefeuille de technologies à fort degré d'innovation et les services associés",
  "Accélérer l'internationalisation de la société",
  "Participer à la consolidation du secteur via des JV internationales et des acquisitions d'entreprises innovantes",
];

export default function GroupePage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Groupe", "Présentation"]}
        title="Notre"
        highlight="Groupe"
        subtitle="Issu d'une longue histoire de près de 40 années au service des grands programmes industriels, le Groupe AMETRA accélère sa transformation."
        bg="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
      />

      {/* History & Values */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="animate-on-scroll-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                    Notre histoire
                  </span>
                </div>
                <h2 className="section-title-sm text-brand-dark mb-6">
                  40 ans au service de <span className="text-brand-red">l&apos;industrie</span>
                </h2>
                <p className="text-brand-gray leading-relaxed mb-5">
                  Au travers de ses 3 entités, Ametra Engineering, Styrel et Ametra Integration,
                  le Groupe AMETRA allie aujourd&apos;hui un savoir-faire en ingénierie de produits
                  et moyens mécaniques, en ingénierie et intégration de systèmes électriques et
                  électroniques.
                </p>
                <p className="text-brand-gray leading-relaxed mb-8">
                  Concentré sur les industries de la défense, de l&apos;aéronautique &amp; spatial,
                  du transport et de l&apos;énergie, le Groupe se développe aujourd&apos;hui autour
                  de ses 12 implantations en France, Tunisie et Inde.
                </p>
                <h3 className="font-display font-bold text-lg text-brand-dark uppercase mb-4">
                  Nos 3 priorités stratégiques
                </h3>
                <ul className="space-y-3 mb-8">
                  {priorities.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-brand-gray">
                      <ArrowRight className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href="/references" className="btn-outline-dark">
                  Voir nos références <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="animate-on-scroll-right space-y-4">
                {values.map((v) => (
                  <div key={v.title} className={`bg-gradient-to-br ${v.color} border border-white p-6 hover:shadow-lg transition-shadow`}>
                    <h3 className="font-display font-bold text-brand-dark text-xl uppercase tracking-wide mb-3">
                      {v.title}
                    </h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* HR Policy */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-wide relative z-10">
          <ScrollAnimator>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll-left">
                <div
                  className="relative h-80 overflow-hidden"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-brand-red/20" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />
                </div>
              </div>
              <div className="animate-on-scroll-right">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-brand-red" />
                  <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                    Ressources humaines
                  </span>
                </div>
                <h2 className="section-title-sm text-white mb-6">
                  Notre politique <span className="text-brand-red">RH</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-5">
                  Les collaborateurs du Groupe AMETRA constituent la première richesse de
                  l&apos;entreprise. Renforcer et valoriser les compétences, participer à
                  l&apos;épanouissement individuel, développer le travail d&apos;équipe,
                  telles sont les valeurs fortes portées par notre politique RH.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  Ces valeurs reposent sur les principes de dialogue et de reconnaissance
                  à travers un management de proximité.
                </p>
                <Link href="/carrieres" className="btn-primary">
                  Rejoignez-nous <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="py-24 bg-brand-light">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Qualité
                </span>
                <div className="w-12 h-px bg-brand-red" />
              </div>
              <h2 className="section-title text-brand-dark">
                Notre politique <span className="text-brand-red">Qualité</span>
              </h2>
              <p className="text-brand-gray mt-4 max-w-2xl mx-auto">
                Depuis 40 ans, la capitalisation du savoir-faire est l&apos;un des points forts
                du Groupe AMETRA. Une démarche qualité couvrant l&apos;ensemble des activités
                de l&apos;ingénierie à l&apos;intégration a été mise en place.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={cert}
                  className={`animate-on-scroll delay-${(i % 3 + 1) * 100} flex items-center gap-4 bg-white p-5 border border-gray-100 hover:border-brand-red/30 hover:shadow-lg transition-all`}
                >
                  <CheckCircle className="w-5 h-5 text-brand-red shrink-0" />
                  <span className="text-brand-dark text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-brand-navy p-8 text-white">
              <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white mb-4">
                AFNOR — Normalisation GPS
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-3xl">
                Depuis plusieurs années, AMETRA Ingénierie est membre de la commission de
                normalisation AFNOR &laquo; Spécification géométrique des produits : Cotation
                et Tolérancement &raquo;. AMETRA contribue à l&apos;élaboration des projets
                de normes nationales, européennes et internationales (GPS).
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}
