import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import ScrollAnimator from "@/components/ScrollAnimator";

const posts = [
  {
    date: "2 Avril 2026",
    category: "Industrie",
    title: "Partenariat Ametra et groupe SNEF : de l'ingénierie nucléaire à la synergie industrielle nationale",
    excerpt:
      "Lancé en 2019 auprès du pôle nucléaire du groupe via l'entité SNEF Power Services (SPS), le partenariat avec Ametra Group s'est consolidé au fil des livrables. Initialement concentrée sur l'ingénierie électrique pour la filière énergie, cette collaboration...",
    image:
      "https://images.unsplash.com/photo-1495673638879-3a951536b9d5?auto=format&fit=crop&w=600&q=80",
    href: "/blog",
  },
  {
    date: "2 Avril 2026",
    category: "Bureau d'études",
    title: "Structurer la filière Projet : l'enjeu de la transversalité inter-agences",
    excerpt:
      "Dans un groupe d'ingénierie comme Ametra, l'intégration d'un collaborateur suit traditionnellement un parcours local au sein de son agence. Si ce modèle est éprouvé pour les profils d'ingénieurs et de projeteurs, dont la masse critique au...",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    href: "/blog",
  },
  {
    date: "2 Avril 2026",
    category: "Innovation",
    title: "Capitalisation technique et IA : les enseignements du partenariat entre Ametra et l'ECE",
    excerpt:
      "L'exploitation du retour d'expérience dans la documentation technique. Le retour d'expérience (REX) est la base de l'ingénierie de haute précision. Chez Ametra, ce savoir est déposé dans des volumes massifs de documents techniques, de rapports d'expertise et de...",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
    href: "/blog",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide">
        <ScrollAnimator>
          <div className="animate-on-scroll flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Actualités
                </span>
              </div>
              <h2 className="section-title text-brand-dark">
                En direct <span className="text-brand-red">du blog</span>
              </h2>
            </div>
            <Link href="/blog" className="flex items-center gap-2 text-brand-red font-semibold text-sm uppercase tracking-widest hover:gap-4 transition-all">
              Toutes les actualités <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article
                key={post.title}
                className={`animate-on-scroll delay-${(i + 1) * 100} group border border-gray-100 hover:border-brand-red/30 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-brand-gray text-xs mb-3">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-dark uppercase leading-tight mb-3 group-hover:text-brand-red transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.href}
                    className="flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Lire la suite <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
