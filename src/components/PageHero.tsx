interface PageHeroProps {
  breadcrumb: string[];
  title: string;
  highlight?: string;
  subtitle?: string;
  bg?: string;
}

export default function PageHero({
  breadcrumb,
  title,
  highlight,
  subtitle,
  bg = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80",
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-brand-dark min-h-[40vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/60" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

      <div className="relative z-10 container-wide">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-6">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-2">
              {i > 0 && <span>›</span>}
              <span className={i === breadcrumb.length - 1 ? "text-brand-red" : ""}>{crumb}</span>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-brand-red" />
        </div>

        <h1 className="section-title text-white mb-4">
          {title} {highlight && <span className="text-brand-red">{highlight}</span>}
        </h1>

        {subtitle && (
          <p className="text-white/50 text-lg max-w-2xl mt-4">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
