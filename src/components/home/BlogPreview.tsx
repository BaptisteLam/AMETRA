import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import ScrollAnimator from "@/components/ScrollAnimator";

const posts = [
  {
    date: "5 décembre 2023",
    category: "Événement",
    title: "Le WNE 2023 comme si vous y étiez !",
    excerpt:
      "La 5ème édition du World Nuclear Exhibition (WNE), le salon international de l'énergie nucléaire civile, s'est tenue à Villepinte du 28 au 30 novembre 2023.",
    image:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=600&q=80",
    href: "/blog",
  },
  {
    date: "15 octobre 2023",
    category: "Innovation",
    title: "AMETRA Research : avancées sur le projet ORCA",
    excerpt:
      "Notre équipe R&D présente les dernières avancées du projet ORCA, cofinancé par le FEDER, sur la modélisation péridynamique des matériaux composites.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    href: "/blog",
  },
  {
    date: "8 septembre 2023",
    category: "Partenariat",
    title: "NUCON AMETRA renforce sa présence en Inde",
    excerpt:
      "Notre joint-venture indienne NUCON AMETRA Electronics Systems continue son développement avec de nouveaux contrats dans la défense locale.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
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
