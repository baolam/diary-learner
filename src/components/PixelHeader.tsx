"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Profile } from "@/types";
import { soundFx } from "@/lib/sound";
import { Volume2, VolumeX, BrainCircuit, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  profile: Profile;
  isCrtOn?: boolean;
  onToggleCrt?: () => void;
  onCoffeeClick?: () => void;
}

export default function PixelHeader({ profile }: Props) {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(soundFx.isMuted);
  }, []);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { href: "/", label: t.nav.overview },
    { href: "/projects", label: t.nav.projects },
    { href: "/awards", label: t.nav.awards },
    { href: "/certificates", label: t.nav.certificates },
    { href: "/skills", label: t.nav.skills },
    { href: "/about", label: t.nav.about },
  ];

  const displayTitle = language === "en" ? t.hero.title : profile.title;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 px-4 sm:px-6 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <Link
          href="/"
          onClick={() => soundFx.playStarChime()}
          className="flex items-center gap-3 group"
          title={`${t.nav.home}, Nguyễn Đức Bảo Lâm`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-sky-700 transition-colors">
                {profile.name}
              </span>
            </div>
            <div className="text-xs text-slate-600 font-medium line-clamp-1 max-w-[260px] sm:max-w-md">
              <span>{displayTitle}</span>
            </div>
          </div>
        </Link>

        {/* Global Multi-Page Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => soundFx.playClick()}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-bold border border-sky-200 shadow-2xs"
                    : "text-slate-700 hover:text-sky-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher Button (VI / EN) */}
          <button
            onClick={() => {
              soundFx.playClick();
              toggleLanguage();
            }}
            title={language === "vi" ? "Switch interface to English" : "Chuyển giao diện sang Tiếng Việt"}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 text-xs font-bold cursor-pointer group shadow-2xs"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600 group-hover:rotate-12 transition-transform" />
            <span className={`transition-colors ${language === "vi" ? "text-sky-700 font-extrabold" : "text-slate-400 font-medium"}`}>
              VI
            </span>
            <span className="text-slate-300">/</span>
            <span className={`transition-colors ${language === "en" ? "text-sky-700 font-extrabold" : "text-slate-400 font-medium"}`}>
              EN
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? t.nav.soundOn : t.nav.soundOff}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 mt-3 pt-3 pb-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-bold border border-sky-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 px-1 flex items-center justify-between border-t border-slate-100 mt-2">
            <span className="text-xs text-slate-500 font-medium">Language / Ngôn ngữ:</span>
            <button
              onClick={() => {
                soundFx.playClick();
                toggleLanguage();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>{language === "vi" ? "Tiếng Việt 🇻🇳" : "English 🇬🇧"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
