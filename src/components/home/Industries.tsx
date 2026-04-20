import ScrollAnimator from "@/components/ScrollAnimator";

const industries = [
  {
    name: "Défense",
    icon: "🛡",
    clients: ["Nexter Systems", "MBDA", "Dassault Aviation", "Naval Group"],
    bg: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Aéronautique & Spatial",
    icon: "🚀",
    clients: ["Airbus", "ArianeGroup", "Safran", "Stelia"],
    bg: "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Nucléaire & Énergie",
    icon: "⚛",
    clients: ["Framatome", "Technicatome", "Orano", "EDF"],
    bg: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Transport & Ferroviaire",
    icon: "🚄",
    clients: ["RATP", "SNCF", "Siemens", "Liebherr"],
    bg: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Industrie Navale",
    icon: "⚓",
    clients: ["Naval Group", "Chantiers de l'Atlantique"],
    bg: "https://images.unsplash.com/photo-1553199927-4e9f0ef86e65?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Innovation & R&D",
    icon: "🔬",
    clients: ["AMETRA Research", "Projets européens"],
    bg: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Industries() {
  return (
    <section className="py-24 bg-brand-light">
      <div className="container-wide">
        <ScrollAnimator>
          <div className="animate-on-scroll mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                Secteurs d&apos;activité
              </span>
            </div>
            <h2 className="section-title text-brand-dark">
              Acteur majeur de <span className="text-brand-red">l&apos;industrie</span>
            </h2>
            <p className="text-brand-gray mt-4 max-w-2xl">
              Le Groupe AMETRA est impliqué dans toutes les industries stratégiques, apportant
              son expertise technique aux projets les plus exigeants.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <div
                key={ind.name}
                className={`animate-on-scroll delay-${(i % 3 + 1) * 100} group relative overflow-hidden h-52 cursor-default`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${ind.bg})` }}
                />
                <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-red/70 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="text-2xl mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    {ind.icon}
                  </div>
                  <h3 className="font-display font-bold text-white uppercase text-lg leading-tight mb-2">
                    {ind.name}
                  </h3>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500">
                    <div className="text-white/80 text-xs">
                      {ind.clients.join(" · ")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
