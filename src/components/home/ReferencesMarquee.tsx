"use client";

import ScrollAnimator from "@/components/ScrollAnimator";

// Clearbit logo API provides transparent-background logos for most major companies.
// CSS filter: grayscale + low opacity by default → full color on hover.
const clients = [
  { name: "Airbus",            logo: "https://logo.clearbit.com/airbus.com" },
  { name: "Thales",            logo: "https://logo.clearbit.com/thalesgroup.com" },
  { name: "Safran",            logo: "https://logo.clearbit.com/safran-group.com" },
  { name: "Siemens",           logo: "https://logo.clearbit.com/siemens.com" },
  { name: "Dassault Aviation", logo: "https://logo.clearbit.com/dassaultaviation.com" },
  { name: "MBDA",              logo: "https://logo.clearbit.com/mbda-systems.com" },
  { name: "Naval Group",       logo: "https://logo.clearbit.com/naval-group.com" },
  { name: "Framatome",         logo: "https://logo.clearbit.com/framatome.com" },
  { name: "Orano",             logo: "https://logo.clearbit.com/orano.group" },
  { name: "ArianeGroup",       logo: "https://logo.clearbit.com/arianegroup.com" },
  { name: "RATP",              logo: "https://logo.clearbit.com/ratp.fr" },
  { name: "SNCF",              logo: "https://logo.clearbit.com/sncf.com" },
  { name: "Liebherr",          logo: "https://logo.clearbit.com/liebherr.com" },
  { name: "NEXTER / KNDS",     logo: "https://logo.clearbit.com/knds.com" },
  { name: "Technicatome",      logo: null },
  { name: "Stelia Aerospace",  logo: "https://logo.clearbit.com/stelia-aerospace.com" },
];

// Duplicate for seamless infinite loop
const doubled = [...clients, ...clients];

function LogoItem({ name, logo }: { name: string; logo: string | null }) {
  return (
    <div className="logo-item flex items-center justify-center mx-8 shrink-0 w-36 h-16 cursor-default">
      {logo ? (
        <>
          <img
            src={logo}
            alt={name}
            width={128}
            height={48}
            className="max-h-10 max-w-[128px] w-auto object-contain"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              const fb = el.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "flex";
            }}
          />
          <span className="hidden font-display font-bold text-xs uppercase tracking-widest text-white/25 hover:text-brand-red transition-colors">
            {name}
          </span>
        </>
      ) : (
        <span className="font-display font-bold text-xs uppercase tracking-widest text-white/25 hover:text-brand-red transition-colors">
          {name}
        </span>
      )}
    </div>
  );
}

export default function ReferencesMarquee() {
  return (
    <section className="py-20 bg-brand-dark overflow-hidden">
      <div className="container-wide mb-12">
        <ScrollAnimator>
          <div className="animate-on-scroll flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Ils nous font confiance
                </span>
              </div>
              <h2 className="section-title text-white">
                Nos <span className="text-brand-red">Références</span>
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs">
              Plus de 30 ans de partenariats avec les leaders mondiaux de l&apos;industrie.
            </p>
          </div>
        </ScrollAnimator>
      </div>

      {/* Marquee */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden py-4">
          <div className="marquee-track">
            {doubled.map((client, i) => (
              <LogoItem key={`${client.name}-${i}`} name={client.name} logo={client.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
