"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skill, Quest } from "@/types";
import { soundFx } from "@/lib/sound";
import { Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  skills: Skill[];
  quests: Quest[];
}

export default function Inventory({ skills, quests }: Props) {
  const { t, language, translateQuest } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<Skill | null>(skills[0] || null);

  const getRelatedQuests = (skill: Skill) =>
    quests.filter((q) => skill.usedIn.includes(q.id)).map(translateQuest);

  const categories = [
    "ALL",
    ...Array.from(new Set(skills.map((s) => s.category))),
  ];

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === "ALL") return true;
    return s.category === selectedCategory;
  });

  const getAstroIcon = (iconName: string) => {
    switch (iconName) {
      case "telescope":
        return "👁️";
      case "map":
        return "⚡";
      case "palette":
        return "🖼️";
      case "rocket":
        return "🚀";
      case "database":
        return "🌐";
      case "satellite":
        return "📡";
      case "radar":
        return "🧠";
      default:
        return "💻";
    }
  };

  return (
    <section id="skills-section" className="mb-14 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              {language === "vi" ? "Kỹ Năng & Công Nghệ" : "Technical Skills & Competencies"}
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              {language === "vi"
                ? "Danh mục các ngôn ngữ lập trình, thư viện AI, phần cứng nhúng và công cụ phát triển"
                : "Programming languages, AI frameworks, embedded devices, and software development tools"}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 font-sans text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat === "ALL" ? (language === "vi" ? "TẤT CẢ" : "ALL") : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Slots Grid */}
        <div className="lg:col-span-2 cosmic-card p-6 bg-white shadow-xs">
          <div className="text-xs font-sans text-slate-700 mb-4 border-b border-slate-200 pb-3 flex items-center justify-between font-semibold">
            <span>
              {language === "vi" ? "DANH SÁCH KỸ NĂNG" : "SKILLS LIST"} ({filteredSkills.length})
            </span>
            <span className="text-slate-500 font-normal hidden sm:inline">
              {language === "vi" ? "Nhấp để xem thông tin chi tiết" : "Click to view details"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = activeItem?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    soundFx.playStarChime();
                    setActiveItem(skill);
                  }}
                  className={`p-4 rounded-xl cursor-pointer flex flex-col justify-between transition-all duration-200 border ${
                    isSelected
                      ? "bg-sky-50 border-sky-400 shadow-xs scale-[1.01]"
                      : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{getAstroIcon(skill.icon)}</span>
                    <span className="text-[10px] font-sans font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded-full">
                      {skill.usedIn.length} {language === "vi" ? "dự án" : "projects"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-slate-900 line-clamp-2 mb-1 leading-snug">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] font-sans text-slate-600">{skill.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Item Telemetry & Specs */}
        <div className="cosmic-card-nebula p-6 flex flex-col justify-between shadow-xs">
          {activeItem ? (
            <div>
              <div className="flex items-center gap-3.5 border-b border-purple-200/60 pb-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl">
                  {getAstroIcon(activeItem.icon)}
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-slate-900 leading-snug">
                    {activeItem.name}
                  </h3>
                  <div className="text-xs text-purple-800 font-sans mt-0.5 font-medium">
                    {activeItem.category}
                  </div>
                </div>
              </div>

              {/* Used-in Projects List */}
              <div className="mb-6">
                <div className="text-xs text-slate-700 font-sans mb-2.5 font-medium">{t.skills.usedInLabel}</div>
                <div className="flex flex-col gap-2">
                  {getRelatedQuests(activeItem).map((quest) => (
                    <div
                      key={quest.id}
                      className="flex items-center gap-2 text-sm bg-white rounded-xl border border-slate-200 p-3 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-800 font-sans line-clamp-1">{quest.title}</span>
                    </div>
                  ))}
                  {getRelatedQuests(activeItem).length === 0 && (
                    <div className="text-xs text-slate-500 font-sans">
                      {language === "vi" ? "Chưa gắn với dự án cụ thể nào." : "Not tied to a specific project yet."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              {language === "vi" ? "Chọn một kỹ năng để xem thông số" : "Select a skill to view specs"}
            </div>
          )}

          <div className="pt-4 border-t border-purple-200/60">
            <Link
              href="/projects"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-primary w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-2 font-medium"
            >
              <span>{language === "vi" ? "Xem Dự Án Ứng Dụng Kỹ Năng" : "View Projects Applying Skills"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
