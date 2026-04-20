import Link from "next/link";
import { Linkedin, Youtube, Twitter, Mail, Phone } from "lucide-react";

const companyLinks = [
  { label: "Présentation du Groupe", href: "/groupe" },
  { label: "AMETRA Engineering", href: "/ametra-engineering" },
  { label: "AMETRA Integration", href: "/ametra-integration" },
  { label: "STYREL", href: "/styrel" },
  { label: "AMETRA Research", href: "/ametra-research" },
];

const expertiseLinks = [
  { label: "Ingénierie Mécanique", href: "/ametra-engineering" },
  { label: "Ingénierie Électrique", href: "/ametra-engineering" },
  { label: "Électronique & Systèmes", href: "/ametra-engineering" },
  { label: "Intégration Systèmes", href: "/ametra-integration" },
  { label: "Bancs de Test", href: "/styrel" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <div className="text-2xl font-display font-bold tracking-[0.1em]">AMETRA</div>
              <div className="text-brand-red text-[10px] tracking-[0.35em] font-semibold uppercase mt-0.5">GROUP</div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Depuis 40 ans, le Groupe AMETRA accompagne les grands programmes industriels
              dans les secteurs de la défense, l&apos;aéronautique, le spatial, le nucléaire
              et le ferroviaire.
            </p>
            <div className="flex gap-3">
              {[Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-brand-red flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Groupe */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-6">
              Le Groupe
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors hover:pl-2 block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-6">
              Expertise
            </h3>
            <ul className="space-y-3">
              {expertiseLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors hover:pl-2 block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mt-8 mb-4">
              International
            </h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li>INDE — NUCON AMETRA Electronics</li>
              <li>TUNISIE — AMETRA Tunisia</li>
              <li>ALLEMAGNE — CTWe (Partenariat)</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-6">
              Siège Social
            </h3>
            <address className="not-italic text-sm text-white/50 space-y-2 mb-6">
              <p className="text-white/80 font-semibold">AMETRA Group</p>
              <p>1, avenue du Général de Gaulle</p>
              <p>92140 CLAMART</p>
            </address>
            <div className="space-y-3">
              <a href="tel:+33146570050" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                +33 (0)1 46 57 00 50
              </a>
              <a href="mailto:contact@ametragroup.com" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                contact@ametragroup.com
              </a>
            </div>
            <div className="mt-6">
              <Link href="/carrieres" className="btn-primary text-xs py-3 px-5">
                Rejoignez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Implantations */}
      <div className="border-t border-white/5 bg-black/30">
        <div className="container-wide py-8">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-4">
            Implantations France
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40">
            {[
              "Clamart", "Asnières-sur-Seine", "Cherbourg", "Aix-en-Provence",
              "Bagnols/Laudun", "Roanne", "Lyon", "Longué-Jumelles",
              "Bordeaux", "Toulouse", "Le Plessis-Paté"
            ].map((city) => (
              <span key={city} className="hover:text-white/70 transition-colors cursor-default">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Groupe AMETRA — Tous droits réservés
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            {["Mentions légales", "Plan du site", "Espace Clients"].map((item) => (
              <a key={item} href="#" className="hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
