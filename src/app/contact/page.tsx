import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez le Groupe AMETRA : siège social, implantations France et international.",
};

const locations = [
  {
    region: "IDF — Normandie",
    color: "border-brand-red",
    sites: [
      { city: "Clamart (Siège)", addr: "1, avenue du Général de Gaulle — 92140 CLAMART", tel: "+33 (0)1 46 57 00 50" },
      { city: "Asnières-sur-Seine", addr: "Tour d'Asnières Hall D, 4 av. Laurent Cély — 92600", tel: "+33 (0)1 46 49 01 36" },
      { city: "Cherbourg", addr: "61 rue de l'Abbaye — 50100 CHERBOURG EN COTENTIN", tel: "+33 (0)1 46 57 87 97" },
    ],
  },
  {
    region: "Sud-Est",
    color: "border-orange-500",
    sites: [
      { city: "Aix-en-Provence", addr: "ZI Les Cabassols, 9 av. des Ribas — 13770 VENELLES", tel: "+33 (0)4 42 50 05 32" },
      { city: "Bagnols/Laudun", addr: "140 rue Vilar — 30290 LAUDUN L'ARDOISE", tel: "+33 (0)4 66 50 18 11" },
      { city: "Roanne", addr: "Bât. Horizon, 14 Bd Valmy — 42300 ROANNE", tel: "+33 (0)7 87 74 30 49" },
      { city: "Lyon", addr: "26 rue Simone Veil — 69200 VENISSIEUX", tel: "+33 (0)9 82 41 23 94" },
    ],
  },
  {
    region: "Ouest",
    color: "border-blue-500",
    sites: [
      { city: "Longué-Jumelles", addr: "353, rue de la Technologie — 49160 LONGUE JUMELLES", tel: "+33 (0)2 41 83 43 60" },
      { city: "Bordeaux", addr: "2, imp. Rudolf Diesel — 33700 MERIGNAC", tel: "+33 (0)5 56 18 06 26" },
      { city: "Toulouse", addr: "Parc Cabanis, 6 rue Cabanis — 31240 L'UNION", tel: "+33 (0)5 62 72 12 66" },
    ],
  },
];

const international = [
  {
    country: "Inde",
    flag: "🇮🇳",
    name: "NUCON AMETRA Electronics Systems",
    addr: "88 B/1, CIE, Balanagar — Hyderabad 500037, Andhra Pradesh",
    tel: "+91 40 23074013",
  },
  {
    country: "Tunisie",
    flag: "🇹🇳",
    name: "AMETRA TUNISIA",
    addr: "Zone Industrielle d'Utique — 7000 BIZERTE",
    tel: "+33 (0)2 41 83 43 60",
  },
  {
    country: "Allemagne",
    flag: "🇩🇪",
    name: "CTWe (Partenariat)",
    addr: "Frankenstrasse 140 — 90441 Nuremberg",
    tel: "+49 (0)9 11 / 23 95 69 60",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Contact"]}
        title="Nous"
        highlight="Contacter"
        subtitle="15 implantations en France, Inde, Tunisie et Allemagne — Un interlocuteur de proximité où que vous soyez."
        bg="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Quick contacts */}
      <section className="py-12 bg-brand-red">
        <div className="container-wide">
          <div className="grid sm:grid-cols-3 gap-6 text-white">
            {[
              { icon: Phone, label: "Téléphone", value: "+33 (0)1 46 57 00 50", href: "tel:+33146570050" },
              { icon: Mail, label: "Email", value: "contact@ametragroup.com", href: "mailto:contact@ametragroup.com" },
              { icon: MapPin, label: "Siège", value: "Clamart (92140), Île-de-France", href: "#locations" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors">
                  <c.icon className="w-5 h-5 text-white group-hover:text-brand-red transition-colors" />
                </div>
                <div>
                  <div className="text-white/70 text-xs uppercase tracking-widest">{c.label}</div>
                  <div className="text-white font-semibold text-sm">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* France locations */}
      <section id="locations" className="py-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">France</span>
              </div>
              <h2 className="section-title text-brand-dark">
                Implantations <span className="text-brand-red">France</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((region, i) => (
                <div key={region.region} className={`animate-on-scroll delay-${(i + 1) * 100}`}>
                  <h3 className={`font-display font-bold text-lg uppercase border-l-4 ${region.color} pl-4 mb-5 text-brand-dark`}>
                    Région {region.region}
                  </h3>
                  <div className="space-y-5">
                    {region.sites.map((site) => (
                      <div key={site.city} className="bg-brand-light p-5 border border-gray-100 hover:border-brand-red/30 transition-all">
                        <h4 className="font-semibold text-brand-dark text-sm mb-2">{site.city}</h4>
                        <p className="text-brand-gray text-xs leading-relaxed mb-3">{site.addr}</p>
                        <a
                          href={`tel:${site.tel.replace(/\s|\(|\)/g, "")}`}
                          className="flex items-center gap-2 text-brand-red text-xs font-semibold hover:gap-3 transition-all"
                        >
                          <Phone className="w-3 h-3" /> {site.tel}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* International */}
      <section className="py-24 bg-brand-dark">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="animate-on-scroll mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">International</span>
              </div>
              <h2 className="section-title text-white">
                Présence <span className="text-brand-red">mondiale</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {international.map((loc, i) => (
                <div
                  key={loc.country}
                  className={`animate-on-scroll delay-${(i + 1) * 100} bg-brand-navy border border-white/5 p-8 hover:border-brand-red/30 transition-all group`}
                >
                  <div className="text-4xl mb-4">{loc.flag}</div>
                  <h3 className="font-display font-bold text-xl text-white uppercase mb-1">{loc.country}</h3>
                  <p className="text-brand-red text-xs font-semibold uppercase tracking-widest mb-4">{loc.name}</p>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{loc.addr}</p>
                  <a
                    href={`tel:${loc.tel.replace(/\s|\(|\)/g, "")}`}
                    className="flex items-center gap-2 text-white/40 hover:text-brand-red text-xs transition-colors"
                  >
                    <Phone className="w-3 h-3" /> {loc.tel}
                  </a>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Contact form CTA */}
      <section className="py-20 bg-brand-light">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <ScrollAnimator>
            <div className="animate-on-scroll">
              <h2 className="section-title-sm text-brand-dark mb-4">
                Vous avez un <span className="text-brand-red">projet</span> ?
              </h2>
              <p className="text-brand-gray mb-8">
                Nos experts sont disponibles pour étudier votre besoin et vous proposer
                une solution adaptée à votre contexte et vos objectifs.
              </p>
              <a
                href="mailto:contact@ametragroup.com"
                className="btn-primary inline-flex"
              >
                Envoyer un message <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}
