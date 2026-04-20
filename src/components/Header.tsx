"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import AmetraLogo from "./AmetraLogo";

const navItems = [
  { label: "Blog", href: "/blog" },
  { label: "Groupe", href: "/groupe" },
  {
    label: "Expertise",
    href: "/expertise",
    children: [
      { label: "AMETRA Engineering", href: "/ametra-engineering" },
      { label: "AMETRA Integration", href: "/ametra-integration" },
      { label: "STYREL", href: "/styrel" },
      { label: "AMETRA Research", href: "/ametra-research" },
    ],
  },
  { label: "Références", href: "/references" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-2xl py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <AmetraLogo variant={scrolled ? "white" : "red"} />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-white/80 hover:text-brand-red text-[13px] font-semibold tracking-widest uppercase transition-all duration-200"
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3 opacity-60" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 w-60 bg-brand-dark border border-white/10 shadow-2xl py-2 animate-fade-in">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-5 py-3 text-white/70 hover:text-white hover:bg-white/5 text-[12px] uppercase tracking-widest font-semibold transition-all border-l-2 border-transparent hover:border-brand-red"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2 hover:text-brand-red transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-brand-dark/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <nav className="container-wide py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 py-3 text-white/80 hover:text-brand-red text-sm font-semibold uppercase tracking-widest transition-colors"
                    onClick={() => !item.children && setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      className="p-2 text-white/50"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                    >
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform",
                          mobileExpanded === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {item.children && mobileExpanded === item.label && (
                  <div className="pl-4 border-l-2 border-brand-red/40 mb-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-white/60 hover:text-brand-red text-xs uppercase tracking-widest font-semibold transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
