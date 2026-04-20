import Link from "next/link";
import { Linkedin, Youtube, Twitter, Phone, Mail, MapPin } from "lucide-react";
import AmetraLogo from "./AmetraLogo";

const societies = [
  {
    name: "AMETRA Group",
    subtitle: "Siège social",
    addr: "1, avenue du Général de Gaulle",
    city: "92140 CLAMART",
    tel: "+33 (0)1 46 57 00 50",
    fax: "+33 (0)1 46 57 19 02",
  },
  {
    name: "AMETRA Engineering",
    subtitle: "AMETRA Simulation",
    addr: "1, avenue du Général de Gaulle",
    city: "92140 CLAMART",
    tel: "+33 (0)1 46 57 87 97",
    fax: "+33 (0)1 46 57 19 02",
  },
  {
    name: "AMETRA Integration",
    subtitle: "(ex ANJOU Electronique)",
    addr: "353, rue de la Technologie",
    city: "49160 LONGUE JUMELLES",
    tel: "+33 (0)2 41 83 43 60",
    fax: "+33 (0)2 41 83 43 70",
  },
  {
    name: "STYREL",
    subtitle: "Groupe AMETRA",
    addr: "1 rue Léonard de Vinci",
    city: "91220 LE PLESSIS-PATE",
    tel: "+33 1 69 88 85 29",
    fax: null,
  },
];

const regions = [
  {
    name: "Région IDF — Normandie",
    sites: [
      {
        city: "Clamart",
        addr: "1, avenue du Général de Gaulle",
        zip: "92140 CLAMART",
        tel: "+33 (0)1 46 57 87 97",
      },
      {
        city: "Asnières-sur-Seine",
        addr: "Tour d'Asnières – Hall D, 4 avenue Laurent Cély",
        zip: "92600 ASNIERES SUR SEINE",
        tel: "+33 (0)1 46 49 01 36",
      },
      {
        city: "Cherbourg",
        addr: "61 rue de l'Abbaye",
        zip: "50100 CHERBOURG EN COTENTIN",
        tel: "+33 (0)1 46 57 87 97",
      },
    ],
  },
  {
    name: "Région Sud-Est",
    sites: [
      {
        city: "Aix-en-Provence",
        addr: "ZI Les Cabassols, 9 avenue des Ribas",
        zip: "13770 VENELLES",
        tel: "+33 (0)4 42 50 05 32",
      },
      {
        city: "Bagnols / Laudun",
        addr: "140 rue Vilar",
        zip: "30290 LAUDUN L'ARDOISE",
        tel: "+33 (0)4 66 50 18 11",
      },
      {
        city: "Roanne",
        addr: "Bâtiment Horizon, 14 Boulevard Valmy",
        zip: "42300 ROANNE",
        tel: "+33 (0)7 87 74 30 49",
      },
      {
        city: "Lyon",
        addr: "26 rue Simone Veil",
        zip: "69200 VENISSIEUX",
        tel: "+33 (0)9 82 41 23 94",
      },
    ],
  },
  {
    name: "Région Ouest",
    sites: [
      {
        city: "Longué-Jumelles",
        addr: "353, rue de la Technologie",
        zip: "49160 LONGUE JUMELLES",
        tel: "+33 (0)2 41 83 43 60",
      },
      {
        city: "Bordeaux",
        addr: "2, impasse Rudolf Diesel",
        zip: "33700 MERIGNAC",
        tel: "+33 (0)5 56 18 06 26",
      },
      {
        city: "Toulouse",
        addr: "Parc Cabanis, 6 rue Cabanis",
        zip: "31240 L'UNION",
        tel: "+33 (0)5 62 72 12 66",
      },
    ],
  },
];

const international = [
  {
    flag: "IN",
    country: "Inde",
    name: "NUCON AMETRA Electronics Systems",
    addr: "88 B/1, CIE, Balanagar",
    city: "Hyderabad – 500 037, Andhra Pradesh",
    tel: "+91 40 23074013",
  },
  {
    flag: "TN",
    country: "Tunisie",
    name: "AMETRA TUNISIA",
    addr: "Zone Industrielle d'Utique",
    city: "7000 BIZERTE",
    tel: "+33 (0)2 41 83 43 60",
  },
  {
    flag: "DE",
    country: "Allemagne",
    name: "CTWe (Partenariat)",
    addr: "Frankenstrasse 140",
    city: "90441 Nuremberg",
    tel: "+49 (0)9 11 / 23 95 69 60",
  },
];

function SiteEntry({
  city,
  addr,
  zip,
  tel,
}: {
  city: string;
  addr: string;
  zip: string;
  tel: string;
}) {
  return (
    <div className="py-2 border-b border-white/5 last:border-0">
      <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-0.5">{city}</p>
      <p className="text-white/40 text-[11px] leading-relaxed">{addr}</p>
      <p className="text-white/40 text-[11px] mb-1">{zip}</p>
      <a
        href={`tel:${tel.replace(/\s|\(|\)/g, "")}`}
        className="inline-flex items-center gap-1.5 text-white/40 hover:text-brand-red text-[11px] transition-colors"
      >
        <Phone className="w-2.5 h-2.5" /> {tel}
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">

      {/* ── Sociétés du Groupe ─────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-wide py-12">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-brand-red" /> Sociétés du Groupe
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {societies.map((s) => (
              <div key={s.name} className="bg-gray-50 border border-gray-200 p-5">
                <p className="text-brand-dark font-semibold text-sm mb-0.5">{s.name}</p>
                <p className="text-brand-red text-[10px] uppercase tracking-widest mb-3">{s.subtitle}</p>
                <address className="not-italic space-y-0.5">
                  <p className="text-brand-dark/50 text-[11px]">{s.addr}</p>
                  <p className="text-brand-dark/50 text-[11px] mb-2">{s.city}</p>
                  <a
                    href={`tel:${s.tel.replace(/\s|\(|\)/g, "")}`}
                    className="flex items-center gap-1.5 text-brand-dark/50 hover:text-brand-red text-[11px] transition-colors"
                  >
                    <Phone className="w-2.5 h-2.5 shrink-0" /> Tél : {s.tel}
                  </a>
                  {s.fax && (
                    <p className="text-brand-dark/30 text-[11px] pl-4">Fax : {s.fax}</p>
                  )}
                </address>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Implantations France ───────────────────────────── */}
      <div className="border-b border-white/5">
        <div className="container-wide py-12">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red mb-8 flex items-center gap-3">
            <MapPin className="w-3.5 h-3.5" /> Implantations France
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {regions.map((region) => (
              <div key={region.name}>
                <h4 className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 border-brand-red pl-3 mb-4">
                  {region.name}
                </h4>
                <div>
                  {region.sites.map((site) => (
                    <SiteEntry key={site.city} {...site} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── International ──────────────────────────────────── */}
      <div className="border-b border-white/5">
        <div className="container-wide py-12">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-brand-red" /> International
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {international.map((loc) => (
              <div key={loc.country} className="bg-brand-navy/50 border border-white/5 p-5">
                <p className="text-white font-bold text-sm uppercase tracking-wide mb-0.5">{loc.country}</p>
                <p className="text-brand-red text-[10px] uppercase tracking-widest mb-3">{loc.name}</p>
                <address className="not-italic space-y-0.5">
                  <p className="text-white/40 text-[11px]">{loc.addr}</p>
                  <p className="text-white/40 text-[11px] mb-2">{loc.city}</p>
                  <a
                    href={`tel:${loc.tel.replace(/\s|\(|\)/g, "")}`}
                    className="flex items-center gap-1.5 text-white/40 hover:text-brand-red text-[11px] transition-colors"
                  >
                    <Phone className="w-2.5 h-2.5" /> {loc.tel}
                  </a>
                </address>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand + Links ──────────────────────────────────── */}
      <div className="container-wide py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <AmetraLogo variant="white" />
            <p className="text-white/30 text-xs mt-4 max-w-xs leading-relaxed">
              Depuis 40 ans, le Groupe AMETRA accompagne les grands programmes industriels
              dans la défense, l&apos;aéronautique, le nucléaire et le ferroviaire.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-white/5 hover:bg-brand-red flex items-center justify-center transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6 text-xs">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-widest mb-3 text-[10px]">Le Groupe</p>
              <ul className="space-y-2">
                {[
                  { l: "Présentation", h: "/groupe" },
                  { l: "AMETRA Research", h: "/ametra-research" },
                  { l: "Références", h: "/references" },
                  { l: "Contact", h: "/contact" },
                ].map((item) => (
                  <li key={item.l}>
                    <Link href={item.h} className="text-white/40 hover:text-white transition-colors">
                      {item.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-widest mb-3 text-[10px]">Expertise</p>
              <ul className="space-y-2">
                {[
                  { l: "AMETRA Engineering", h: "/ametra-engineering" },
                  { l: "AMETRA Integration", h: "/ametra-integration" },
                  { l: "STYREL", h: "/styrel" },
                ].map((item) => (
                  <li key={item.l}>
                    <Link href={item.h} className="text-white/40 hover:text-white transition-colors">
                      {item.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-widest mb-3 text-[10px]">Contact</p>
              <address className="not-italic space-y-2">
                <a href="tel:+33146570050" className="flex items-start gap-2 text-white/40 hover:text-white transition-colors">
                  <Phone className="w-3 h-3 mt-0.5 shrink-0" /> +33 (0)1 46 57 00 50
                </a>
                <a href="mailto:contact@ametragroup.com" className="flex items-start gap-2 text-white/40 hover:text-white transition-colors">
                  <Mail className="w-3 h-3 mt-0.5 shrink-0" /> contact@ametragroup.com
                </a>
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} Groupe AMETRA — Tous droits réservés
          </p>
          <div className="flex gap-5 text-[11px] text-white/25">
            {["Mentions légales", "Plan du site", "Espace Clients", "Espace Collaborateurs"].map((item) => (
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
