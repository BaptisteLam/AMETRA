import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollAnimator from "@/components/ScrollAnimator";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités, événements et innovations du Groupe AMETRA.",
};

const posts = [
  {
    date: "5 décembre 2023",
    category: "Événement",
    title: "Le WNE 2023 comme si vous y étiez !",
    excerpt:
      "La 5ème édition du World Nuclear Exhibition (WNE), le salon international de l'énergie nucléaire civile, s'est tenue à Villepinte du 28 au 30 novembre 2023. L'événement a réuni plus de 20 000 participants venus de près de 80 pays.",
    image:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    date: "15 octobre 2023",
    category: "Innovation",
    title: "AMETRA Research : avancées sur le projet ORCA",
    excerpt:
      "Notre équipe R&D présente les dernières avancées du projet ORCA, cofinancé par le FEDER, sur la modélisation péridynamique des matériaux composites pour les applications industrielles.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    date: "8 septembre 2023",
    category: "Partenariat",
    title: "NUCON AMETRA renforce sa présence en Inde",
    excerpt:
      "Notre joint-venture indienne NUCON AMETRA Electronics Systems continue son développement avec de nouveaux contrats dans le secteur de la défense locale.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    date: "22 juin 2023",
    category: "Certification",
    title: "AMETRA Integration renouvelle sa certification EN 9100",
    excerpt:
      "Après un audit rigoureux, AMETRA Integration a renouvelé sa certification EN 9100 version 2018, confirmant notre engagement envers l'excellence dans le secteur aéronautique.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    date: "14 avril 2023",
    category: "Recrutement",
    title: "Le Groupe AMETRA recrute 200 collaborateurs en 2023",
    excerpt:
      "Dans le cadre de notre forte croissance, nous recrutons cette année 200 nouveaux collaborateurs sur l'ensemble de nos sites en France et à l'international.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    date: "3 février 2023",
    category: "Défense",
    title: "AMETRA Engineering au salon IDEX 2023 d'Abu Dhabi",
    excerpt:
      "Notre équipe défense était présente au salon international de la défense IDEX 2023 à Abu Dhabi, renforçant notre position sur les marchés export.",
    image:
      "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
];

const categories = ["Tous", "Événement", "Innovation", "Partenariat", "Certification", "Recrutement", "Défense"];

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        breadcrumb={["Accueil", "Blog"]}
        title="En direct"
        highlight="du Blog"
        subtitle="Actualités, événements, innovations et succès du Groupe AMETRA."
        bg="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Categories */}
      <section className="py-6 bg-brand-light border-b">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-all ${
                  cat === "Tous"
                    ? "bg-brand-red text-white"
                    : "bg-white text-brand-gray border border-gray-200 hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <article className="animate-on-scroll grid lg:grid-cols-2 gap-0 overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div
                className="h-72 lg:h-auto bg-cover bg-center relative"
                style={{ backgroundImage: `url(${featured.image})` }}
              >
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-all" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                    À la une
                  </span>
                </div>
              </div>
              <div className="bg-brand-dark p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-brand-red text-xs font-semibold uppercase tracking-widest">
                      <Tag className="w-3 h-3" /> {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/40 text-xs">
                      <Calendar className="w-3 h-3" /> {featured.date}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase leading-tight mb-4 group-hover:text-brand-red transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed">{featured.excerpt}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Lire l&apos;article complet <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          </ScrollAnimator>
        </div>
      </section>

      {/* Post grid */}
      <section className="pb-24 bg-white">
        <div className="container-wide">
          <ScrollAnimator>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post, i) => (
                <article
                  key={post.title}
                  className={`animate-on-scroll delay-${(i % 3 + 1) * 100} group border border-gray-100 hover:border-brand-red/30 hover:shadow-xl transition-all duration-300`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-brand-gray text-xs mb-3">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-dark uppercase leading-tight mb-3 group-hover:text-brand-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-brand-gray text-sm leading-relaxed line-clamp-3 mb-5">
                      {post.excerpt}
                    </p>
                    <Link
                      href="#"
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
    </>
  );
}
