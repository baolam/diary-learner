"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Quest } from "@/types";
import { soundFx } from "@/lib/sound";
import { GithubIcon } from "./SocialIcons";
import { ExternalLink, ArrowUpRight, BrainCircuit, Trophy, Bookmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  quests: Quest[];
  onSelectQuest: (quest: Quest) => void;
}

export default function QuestLog({ quests, onSelectQuest }: Props) {
  const { t, translateQuest, language } = useLanguage();
  const [filter, setFilter] = useState<string>("ALL");

  const translatedQuests = quests.map(translateQuest);

  const hasAward = (quest: Quest) =>
    !!quest.reward && (
      quest.reward.includes("Giải Nhất") ||
      quest.reward.includes("Giải Nhì") ||
      quest.reward.includes("Giải Ba") ||
      quest.reward.includes("Giải Khuyến Khích") ||
      quest.reward.includes("Vô Địch") ||
      quest.reward.includes("Quán Quân") ||
      quest.reward.includes("Champion") ||
      quest.reward.includes("Prize") ||
      quest.reward.includes("Top 10")
    );

  const filteredQuests = translatedQuests.filter((q) => {
    if (filter === "ALL") return true;
    if (filter === "AWARDS") return hasAward(q);
    if (filter === "VISION") return q.tags.some(t => t.includes("Vision") || t.includes("YOLO"));
    if (filter === "EDGE") return q.tags.some(t => t.includes("Raspberry") || t.includes("LoRa") || t.includes("Arduino"));
    if (filter === "DEEP") return q.tags.some(t => t.includes("PyTorch") || t.includes("Deep Learning") || t.includes("Transformer"));
    return true;
  });

  const getCategoryBadges = (quest: Quest) => {
    const badges: { label: string; className: string }[] = [];

    if (hasAward(quest)) {
      badges.push({
        label: language === "vi" ? "DỰ ÁN ĐẠT GIẢI" : "AWARD WINNING",
        className: "bg-amber-50 text-amber-900 border-amber-200"
      });
    }
    if (quest.tags.some(t => t.includes("Vision") || t.includes("YOLO") || t.includes("Face Recognition") || t.includes("DeepFace"))) {
      badges.push({
        label: language === "vi" ? "THỊ GIÁC MÁY TÍNH" : "COMPUTER VISION",
        className: "bg-sky-50 text-sky-800 border-sky-200"
      });
    }
    if (quest.tags.some(t => t.includes("PyTorch") || t.includes("Transformer") || t.includes("Deep Learning") || t.includes("Graph Neural") || t.includes("GAT"))) {
      badges.push({
        label: "DEEP LEARNING",
        className: "bg-purple-50 text-purple-800 border-purple-200"
      });
    }
    if (quest.tags.some(t => t.includes("Raspberry") || t.includes("LoRa") || t.includes("Arduino") || t.includes("AIoT") || t.includes("IoT") || t.includes("Ultrasonic"))) {
      badges.push({
        label: language === "vi" ? "EDGE AI & NHÚNG" : "EDGE AI & EMBEDDED",
        className: "bg-emerald-50 text-emerald-800 border-emerald-200"
      });
    }
    if (quest.tags.some(t => t.includes("Data Structures") || t.includes("Algorithms") || t.includes("C++ STL"))) {
      badges.push({
        label: language === "vi" ? "GIẢI THUẬT & CTDL" : "ALGORITHMS & DATA STRUCTURES",
        className: "bg-indigo-50 text-indigo-800 border-indigo-200"
      });
    }
    if (quest.tags.some(t => t.includes("NLP") || t.includes("Stream Mining") || t.includes("Data Mining") || t.includes("Clustering"))) {
      badges.push({
        label: language === "vi" ? "NLP & KHAI PHÁ DỮ LIỆU" : "NLP & DATA MINING",
        className: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200"
      });
    }
    if (quest.tags.some(t => t.includes("Next.js"))) {
      badges.push({
        label: language === "vi" ? "PHÁT TRIỂN WEB" : "WEB DEVELOPMENT",
        className: "bg-cyan-50 text-cyan-800 border-cyan-200"
      });
    }

    if (badges.length === 0) {
      badges.push({
        label: language === "vi" ? "DỰ ÁN KỸ THUẬT" : "ENGINEERING PROJECT",
        className: "bg-slate-50 text-slate-700 border-slate-200"
      });
    }

    return badges;
  };

  const filterOptions = [
    { id: "ALL", label: language === "vi" ? "TẤT CẢ" : "ALL" },
    { id: "AWARDS", label: language === "vi" ? "CÓ GIẢI THƯỞNG" : "WITH AWARDS" },
    { id: "VISION", label: language === "vi" ? "THỊ GIÁC MÁY TÍNH" : "COMPUTER VISION" },
    { id: "EDGE", label: language === "vi" ? "EDGE AI & NHÚNG" : "EDGE & EMBEDDED" },
    { id: "DEEP", label: "DEEP LEARNING" },
  ];

  return (
    <section id="quests-section" className="mb-14 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              {language === "vi" ? "Dự Án Kỹ Thuật" : "Technical Projects"}
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              {language === "vi"
                ? "Các dự án về Computer Vision, Edge AIoT, Deep Learning và Thuật toán"
                : "Projects in Computer Vision, Edge AIoT, Deep Learning, and Algorithms"}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 font-sans text-xs">
          {filterOptions.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setFilter(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                filter === cat.id
                  ? "bg-sky-700 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuests.map((quest) => {
          const badges = getCategoryBadges(quest);
          return (
            <div
              key={quest.id}
              className="cosmic-card p-6 flex flex-col justify-between group bg-white shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-sky-300 transition-all duration-300"
            >
              <div>
                {/* Top row: Category, GitHub Repo & Priority */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {badges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full border ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                    {quest.repoName && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        <GithubIcon className="w-3 h-3 text-slate-700" />
                        <span className="font-mono truncate max-w-[140px]">{quest.repoName}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => {
                    soundFx.playStarChime();
                    onSelectQuest(quest);
                  }}
                  className="text-base sm:text-lg font-display font-bold text-slate-900 group-hover:text-sky-700 cursor-pointer transition-colors mb-2.5 leading-snug"
                >
                  {quest.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-700 mb-5 font-sans line-clamp-3 leading-relaxed">
                  {quest.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {quest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Rewards & Action buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                {quest.reward ? (
                  <Link
                    href="/awards"
                    className="text-xs text-amber-800 hover:text-amber-950 flex items-center gap-1.5 font-sans font-medium hover:underline group/reward"
                    title={language === "vi" ? "Xem chi tiết tại trang Giải thưởng" : "View details in Awards"}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="line-clamp-1">{quest.reward}</span>
                  </Link>
                ) : (
                  <div className="text-xs text-slate-500 font-sans">
                    {language === "vi" ? "Nghiên cứu & Thực nghiệm" : "Research & Implementation"}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playStarChime();
                      onSelectQuest(quest);
                    }}
                    className="cosmic-btn cosmic-btn-secondary px-3 py-1.5 text-xs rounded-lg font-medium cursor-pointer text-slate-800 hover:text-sky-700"
                  >
                    {language === "vi" ? "Xem chi tiết" : "Details"}
                  </button>

                  {quest.githubUrl && (
                    <a
                      href={quest.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200 text-xs font-sans font-medium"
                      title={quest.repoName ? `GitHub: baolam/${quest.repoName}` : "GitHub Repository"}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}

                  {quest.liveUrl && (
                    <a
                      href={quest.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playStarChime()}
                      className="cosmic-btn cosmic-btn-primary px-3 py-1.5 text-xs rounded-lg font-medium flex items-center gap-1"
                      title={language === "vi" ? "Đọc thêm" : "Read more"}
                    >
                      <span>{language === "vi" ? "Đọc thêm" : "Read more"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
