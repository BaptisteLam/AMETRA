import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Références",
  description: "Témoignages clients et références du Groupe AMETRA : Siemens, MBDA, Thales, ArianeGroup, Naval Group, Safran...",
};

const testimonials = [
  {
    company: "SIEMENS",
    industry: "Mobilité & Infrastructure",
    quote:
      "AMETRA a su faire preuve d'adaptabilité et de réactivité pour nous apporter des solutions adaptées à chaque phase de développement de nos produits.",
    fullQuote:
      "Depuis plus de trois ans, le groupe Ametra accompagne nos différentes entités : Siemens Mobility sur le développement et l'industrialisation de nos métros automatiques clé en main Val et Siemens Smart Infrastructure sur la conception et les essais d'équipements pour nos systèmes de commande et surveillance. AMETRA a su faire preuve d'adaptabilité et de réactivité pour nous apporter des solutions adaptées à chaque phase de développement de nos produits.",
    author: "Nicolas PETROVIC",
    role: "Président de SIEMENS France et Belux",
    date: "Septembre 2021",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80",
  },
  {
    company: "MBDA",
    industry: "Défense & Missiles",
    quote:
      "AMETRA est toujours force de proposition, notamment pour accompagner les industriels dans leurs obligations de compensations.",
    fullQuote:
      "La relation entre MBDA France et le groupe AMETRA date de près de 20 ans, dans le domaine des harnais initialement, puis s'est progressivement étendue à d'autres sous-ensembles plus importants des systèmes de tirs. Cela a correspondu à la volonté d'AMETRA d'étendre son offre et sa valeur ajoutée dans la conception et réalisation de systèmes plus complexes.",
    author: "Jean-Jacques GAVORY",
    role: "Directeur Groupe Achats et Supply Chain, MBDA",
    date: "Mars 2021",
    image:
      "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=600&q=80",
  },
  {
    company: "ARIANE GROUP",
    industry: "Spatial & Lanceurs",
    quote:
      "Ametra a su gérer sa croissance sans perdre son ADN : un partenaire à l'écoute de son client, soucieux de respecter ses engagements.",
    fullQuote:
      "La collaboration avec Ametra s'inscrit dans la durée : elle a démarré entre Anjou Electronique et Astrium il y a plus de 15 années pour la réalisation de harnais électriques. Au cours de ces années, Ametra est monté en maturité, ce qui lui a permis d'étendre son rôle dans la chaîne de valeur. Les compétences du Groupe Ametra, conjuguées à la proactivité des équipes et du management, devraient conduire à continuer et développer la collaboration.",
    author: "Catherine POINCHEVAL",
    role: "Directrice des Achats, Ariane Group",
    date: "Février 2021",
    image:
      "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=600&q=80",
  },
  {
    company: "THALES",
    industry: "Défense & Électronique",
    quote:
      "Thales et le groupe Ametra entretiennent une solide relation partenariale depuis plus de 30 ans.",
    fullQuote:
      "Thales et le groupe Ametra entretiennent une solide relation partenariale depuis plus de 30 ans. Ametra répond aux besoins de Thales en termes de prestations packagées complètes depuis l'étude mécanique, électrique électronique ou jusqu'à l'intégration d'équipements électriques et électroniques. Ametra a inauguré en septembre 2019 une nouvelle usine de production dédiée au câblage et à l'intégration électronique en joint-venture avec son partenaire indien, Nucon Aerospace.",
    author: "ROQUE CARMONA",
    role: "SVP, Directeur des Achats Groupe, Thales",
    date: "Mars 2021",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    company: "TECHNICATOME",
    industry: "Nucléaire",
    quote:
      "AMETRA est pour TechnicAtome un partenaire de longue date, et nous ne pouvons que louer son savoir-faire technique et sa fiabilité dans la durée.",
    fullQuote:
      "Depuis plus de 20 ans, AMETRA travaille au côté de TechnicAtome. Aujourd'hui, cette collaboration porte notamment sur le Réacteur Jules Horowitz (RJH), sur le Laser Mégajoule (LMJ) et sur des prestations de conception mécanique, de calcul et de simulation. AMETRA n'a de cesse de renforcer ce partenariat, par la transparence et le dialogue quotidien.",
    author: "Loïc ROCARD",
    role: "Président Directeur Général de TechnicAtome",
    date: "2021",
    image:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=600&q=80",
  },
  {
    company: "NAVAL GROUP",
    industry: "Défense Navale",
    quote:
      "Nous sommes pleinement satisfaits de ce partenariat qui apporte une valeur ajoutée significative à Naval Group.",
    fullQuote:
      "Naval Group et le groupe Ametra collaborent pleinement au développement d'équipements pour nos grands programmes. Leur approche collaborative, leur expertise technique, et leur maîtrise de la gestion de projets sont déterminants pour relever les défis liés à la conception de nos équipements complexes.",
    author: "Anne Quillon",
    role: "Directrice des Achats et des relations fournisseurs, Naval Group",
    date: "2022",
    image:
      "https://images.unsplash.com/photo-1553199927-4e9f0ef86e65?auto=format&fit=crop&w=600&q=80",
  },
];

const allClients = [
  "NEXTER Systems", "MBDA", "SAFRAN", "TECHNICATOME", "NAVAL GROUP",
  "DASSAULT Aviation", "ARIANEGROUP", "RATP", "SNCF", "AIRBUS",
  "STELIA", "SIEMENS", "THALES", "FRAMATOME", "ORANO", "LIEBHERR",
  "CHANTIERS DE L'ATLANTIQUE",
];

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Références"]}
        title="Nos"
        highlight="Références"
        subtitle="Des partenariats durables construits sur la confiance, l'expertise et l'engagement du résultat."
        bg="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Client logos grid */}
      <section className="py-16 bg-brand-light border-b">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 justify-center">
            {allClients.map((client) => (
              <span
                key={client}
                className="bg-white border border-gray-200 hover:border-brand-red hover:bg-brand-red hover:text-white text-brand-dark text-xs font-bold uppercase tracking-widest px-5 py-3 transition-all duration-200 cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Témoignages
                </span>
                <div className="w-12 h-px bg-brand-red" />
              </div>
              <h2 className="section-title text-brand-dark">
                Ce que disent <span className="text-brand-red">nos clients</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <article
                  key={t.company}
                  className={`animate-on-scroll delay-${(i % 2 + 1) * 100} group relative bg-white border border-gray-100 hover:border-brand-red/30 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* Image strip */}
                  <div
                    className="h-40 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${t.image})` }}
                  >
                    <div className="absolute inset-0 bg-brand-dark/60" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <div>
                        <div className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-1">
                          {t.industry}
                        </div>
                        <h3 className="font-display font-bold text-3xl text-white uppercase">
                          {t.company}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Quote className="w-8 h-8 text-brand-red/60" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-brand-dark font-medium text-base leading-relaxed mb-5 italic">
                      &ldquo;{t.fullQuote}&rdquo;
                    </p>
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-brand-dark text-sm">{t.author}</div>
                        <div className="text-brand-gray text-xs mt-0.5">{t.role}</div>
                      </div>
                      <span className="text-brand-gray text-xs bg-brand-light px-3 py-1">
                        {t.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}
