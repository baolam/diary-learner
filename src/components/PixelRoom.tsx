"use client";

import React, { useState } from "react";
import Link from "next/link";
import { soundFx } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  BrainCircuit,
  Orbit,
  Rocket,
  ChevronRight,
  Trophy,
  Award,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PixelRoom() {
  const { t, aiDomains, language } = useLanguage();
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);

  const handleNextDomain = () => {
    soundFx.playStarChime();
    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#0284c7", "#4f46e5", "#10b981", "#f59e0b"],
      });
    } catch {}

    setCurrentDomainIndex((prev) => (prev + 1) % aiDomains.length);
  };

  const domain = aiDomains[currentDomainIndex] || aiDomains[0];

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-white via-sky-50/40 to-indigo-50/30 border border-slate-200/90 p-6 sm:p-8 my-8 shadow-xs overflow-hidden">
      {/* Background Subtle Tech Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/90 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-sans font-semibold text-emerald-800 text-xs">
            {t.hero.target}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-sans text-slate-700 bg-white/95 border border-slate-200 px-3.5 py-1 rounded-full shadow-xs font-medium">
          <span>{t.hero.school}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200 mb-3">
              <BrainCircuit className="w-4 h-4 text-sky-600" />
              <span>{t.hero.portfolioBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight mb-2">
              {t.hero.name}
            </h1>
            <p className="text-sm sm:text-base text-sky-900 font-semibold mb-4">
              {t.hero.title}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed font-sans mb-6">
              {t.hero.bio}
            </p>

            {/* 2 Key Highlights Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs hover:border-amber-300 transition-colors">
                <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">{t.hero.award1_title}</div>
                  <div className="text-[11px] text-slate-500">{t.hero.award1_desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs hover:border-sky-300 transition-colors">
                <Award className="w-5 h-5 text-sky-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">{t.hero.award2_title}</div>
                  <div className="text-[11px] text-slate-500">{t.hero.award2_desc}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/projects"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-primary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2 font-semibold shadow-xs cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>{t.hero.btn_projects}</span>
            </Link>

            <Link
              href="/skills"
              onClick={() => soundFx.playClick()}
              className="px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
            >
              {t.hero.btn_skills}
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Research Radar */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white/95 rounded-2xl border border-slate-200 p-6 relative shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
            <span className="font-sans font-bold text-sky-800 flex items-center gap-1.5">
              <Orbit className="w-4 h-4 text-sky-600" />
              {t.hero.research_title}
            </span>
            <span className="font-mono text-slate-500 text-[11px]">
              0{currentDomainIndex + 1} / 0{aiDomains.length}
            </span>
          </div>

          {/* Orbital Radar Graphic with Center Interactive Clicker */}
          <div className="relative flex items-center justify-center py-6 my-2">
            <div className="w-56 h-56 rounded-full border border-sky-200 flex items-center justify-center relative animate-orbit-slow">
              <div className="absolute top-2 left-8 w-3 h-3 rounded-full bg-sky-500 shadow-xs shadow-sky-400"></div>
              <div className="w-40 h-40 rounded-full border border-indigo-200 flex items-center justify-center relative">
                <div className="absolute bottom-3 right-8 w-3 h-3 rounded-full bg-indigo-500 shadow-xs shadow-indigo-400"></div>
                <div className="w-24 h-24 rounded-full border border-emerald-200 flex items-center justify-center relative">
                  <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-emerald-500"></div>
                  {/* Center Core Interactive Button */}
                  <div
                    onClick={handleNextDomain}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-xl text-white shadow-md shadow-sky-500/25 cursor-pointer hover:scale-110 active:scale-95 transition-all radar-glow"
                    title={t.hero.clickToRotate}
                  >
                    {domain.icon}
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-sky-100"></div>
              <div className="absolute h-full w-[1px] bg-sky-100"></div>
            </div>
          </div>

          {/* Current Domain Details Card */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="font-display font-bold text-slate-900 text-sm">
                {domain.name}
              </div>
              <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 font-medium border border-sky-200">
                {domain.highlight}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed mb-3">
              {domain.desc}
            </p>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[11px] font-sans text-slate-500">
                {t.hero.keyTechLabel}: {domain.tech}
              </span>
              <button
                onClick={handleNextDomain}
                className="text-xs font-sans text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>{language === "vi" ? "Chuyển Lĩnh Vực" : "Next Domain"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
