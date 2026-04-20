import ScrollAnimator from "@/components/ScrollAnimator";

const clients = [
  "AIRBUS", "MBDA", "THALES", "SAFRAN", "DASSAULT AVIATION",
  "ARIANEGROUP", "NAVAL GROUP", "FRAMATOME", "TECHNICATOME", "ORANO",
  "NEXTER SYSTEMS", "SIEMENS", "STELIA", "RATP", "SNCF", "LIEBHERR",
];

export default function ReferencesMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-20 bg-brand-dark overflow-hidden">
      <div className="container-wide mb-10">
        <ScrollAnimator>
          <div className="animate-on-scroll text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                Ils nous font confiance
              </span>
              <div className="w-12 h-px bg-brand-red" />
            </div>
            <h2 className="section-title text-white">
              Nos <span className="text-brand-red">Références</span>
            </h2>
          </div>
        </ScrollAnimator>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10" />
        <div className="overflow-hidden py-4">
          <div className="marquee-track">
            {doubled.map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="flex items-center gap-4 mx-8 shrink-0"
              >
                <div className="h-px w-6 bg-brand-red/50" />
                <span className="text-white/30 font-display font-bold text-sm uppercase tracking-[0.2em] hover:text-brand-red transition-colors cursor-default whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
