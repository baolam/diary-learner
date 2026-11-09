"use client";

import React, { useState } from "react";
import initialData from "@/data/profile.json";
import { PortfolioData, Quest } from "@/types";
import PixelHeader from "@/components/PixelHeader";
import PixelRoom from "@/components/PixelRoom";
import StatusCard from "@/components/StatusCard";
import DialogueModal from "@/components/DialogueModal";
import CosmicParticles from "@/components/CosmicParticles";
import { soundFx } from "@/lib/sound";
import Link from "next/link";
import {
  ArrowUp,
  Orbit,
  Rocket,
  Trophy,
  Layers,
  ArrowRight,
  Award,
  GraduationCap
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const data = initialData as PortfolioData;
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const { t, language, translateQuest, translateAward } = useLanguage();

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Top 3 featured flagship projects
  const featuredQuests = data.quests
    .filter((q) => q.featured)
    .slice(0, 3)
    .map(translateQuest);

  // Top spotlight awards
  const topAwards = (data.awards || []).slice(0, 3).map(translateAward);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 relative">
      {/* Background Interactive Cosmic Particles */}
      <CosmicParticles />

      {/* Top Navigation HUD */}
      <PixelHeader profile={data.profile} />

      {/* Main Container: Executive Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Observatory Hero */}
        <PixelRoom />

        {/* Profile & Live Status Card */}
        <StatusCard profile={data.profile} />

        {/* SECTION 1: FEATURED FLAGSHIP AI PROJECTS */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900">
                  {t.projects.featuredTitle}
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  {t.projects.featuredSubtitle}
                </p>
              </div>
            </div>

            <Link
              href="/projects"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs flex items-center gap-2 rounded-xl font-semibold shadow-xs"
            >
              <span>{t.projects.viewAllBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredQuests.map((quest) => (
              <div
                key={quest.id}
                className="cosmic-card p-5 flex flex-col justify-between group bg-white shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-sky-300 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                      {quest.tags[0] || "AI Project"}
                    </span>
                    {quest.reward && (
                      <span className="text-[10px] font-sans text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium truncate max-w-[140px]">
                        {quest.reward}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => {
                      soundFx.playStarChime();
                      setSelectedQuest(quest);
                    }}
                    className="text-base font-display font-bold text-slate-900 group-hover:text-sky-700 cursor-pointer transition-colors mb-2 leading-snug"
                  >
                    {quest.title}
                  </h3>

                  <p className="text-xs text-slate-600 mb-4 font-sans line-clamp-3 leading-relaxed">
                    {quest.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {quest.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-sans bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {quest.tags.length > 3 && (
                      <span className="text-[11px] font-sans text-slate-400 self-center">
                        +{quest.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      soundFx.playStarChime();
                      setSelectedQuest(quest);
                    }}
                    className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === "vi" ? "Xem chi tiết" : "Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {quest.githubUrl && (
                    <a
                      href={quest.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                    >
                      {language === "vi" ? "Mã nguồn" : "Source Code"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/projects"
              onClick={() => soundFx.playClick()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 hover:text-sky-900 font-sans"
            >
              <span>
                {language === "vi"
                  ? "Xem đầy đủ danh mục dự án & tài liệu kiến trúc kỹ thuật"
                  : "View full project portfolio & technical architecture documentation"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* SECTION 2: TOP HONORS SPOTLIGHT */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900">
                  {language === "vi" ? "Giải Thưởng & Thành Tích Tiêu Biểu" : "Top Honors & Awards"}
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  {language === "vi"
                    ? "Giải Ba Olympic AI 2026, Top 10 VEDC Toàn quốc, Top 23 RMIT Hackathon, 4 kỳ SV Xuất Sắc FPT & Quán quân Quốc tế"
                    : "3rd Prize AI Olympiad 2026, Top 10 National VEDC, Top 23 RMIT Hackathon, 4x FPT Honor Student & International Champion"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/awards"
                onClick={() => soundFx.playClick()}
                className="cosmic-btn cosmic-btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-semibold border-amber-300 text-amber-900 hover:bg-amber-50 shadow-xs"
              >
                <span>{language === "vi" ? "Xem Tất Cả Giải Thưởng" : "View All Honors"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topAwards.map((award) => (
              <div
                key={award.id}
                className="cosmic-card p-5 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 border-amber-300 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-sans font-semibold text-amber-900 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200">
                      {language === "vi" ? `NĂM ${award.year}` : `YEAR ${award.year}`}
                    </span>
                    <span className="text-[11px] font-sans text-slate-700 font-medium bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {award.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-display font-bold text-slate-900 leading-snug mb-2">
                    {award.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed mb-3">
                    {award.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-200/60 text-[11px] text-slate-500 font-sans flex items-center justify-between">
                  <span>{award.issuer}</span>
                  <Link
                    href="/awards"
                    className="text-amber-800 font-semibold hover:underline"
                  >
                    {language === "vi" ? "Chi tiết" : "Details"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Certifications Banner Leading to /certificates */}
          <div className="mt-5 p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="text-slate-800 font-medium font-sans">
                {language === "vi" ? (
                  <>
                    Mình đã học <strong>14 khóa trên Coursera</strong>: DeepLearning.AI, IBM ML & GenAI, Google Data Analytics, Michigan Python, MOS Microsoft...
                  </>
                ) : (
                  <>
                    I&apos;ve completed <strong>14 courses on Coursera</strong>: DeepLearning.AI, IBM ML & GenAI, Google Data Analytics, Michigan Python, Microsoft MOS...
                  </>
                )}
              </span>
            </div>
            <Link
              href="/certificates"
              onClick={() => soundFx.playClick()}
              className="text-purple-700 hover:text-purple-900 font-bold whitespace-nowrap flex items-center gap-1 hover:underline"
            >
              <span>{language === "vi" ? "Xem trang chứng chỉ & bản PDF" : "View certificates & PDF verifications"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* SECTION 3: NAVIGATION SITEMAP & RESOURCE CARDS */}
        <section className="mb-14">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-xl font-display font-bold text-slate-900">
              {language === "vi" ? "Trung Tâm Tra Cứu Hồ Sơ Năng Lực" : "Portfolio Directory"}
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              {language === "vi"
                ? "Chọn chuyên mục để xem báo cáo kỹ thuật và hồ sơ chi tiết"
                : "Select a section to explore comprehensive engineering reports"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <Link
              href="/projects"
              onClick={() => soundFx.playClick()}
              className="cosmic-card p-4 bg-white hover:border-sky-300 hover:-translate-y-1 transition-all group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-2.5">
                  <Rocket className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-slate-900 group-hover:text-sky-700 text-sm mb-1">
                  {t.nav.projects}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {language === "vi" ? "6+ dự án Computer Vision, Edge AIoT, Deep Learning và C++." : "6+ projects in Computer Vision, Edge AIoT, Deep Learning, and C++."}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
                <span>{language === "vi" ? "Vào trang dự án" : "Explore projects"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/awards"
              onClick={() => soundFx.playClick()}
              className="cosmic-card p-4 bg-white hover:border-amber-300 hover:-translate-y-1 transition-all group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-2.5">
                  <Trophy className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-slate-900 group-hover:text-amber-700 text-sm mb-1">
                  {t.nav.awards}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {language === "vi" ? "Olympic AI, VEDC 2026, RMIT Hackathon, 4 kỳ SV Xuất sắc FPT." : "AI Olympiad, VEDC 2026, RMIT Hackathon, 4x FPT Honor Student."}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>{language === "vi" ? "Vào giải thưởng" : "Explore awards"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/certificates"
              onClick={() => soundFx.playClick()}
              className="cosmic-card p-4 bg-white hover:border-purple-300 hover:-translate-y-1 transition-all group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-2.5">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-slate-900 group-hover:text-purple-700 text-sm mb-1">
                  {t.nav.certificates}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {language === "vi" ? "14 chứng chỉ Coursera (DeepLearning.AI, IBM, Google) & MOS." : "14 certificates from DeepLearning.AI, IBM, Google, Michigan & MOS."}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                <span>{language === "vi" ? "Xem chứng chỉ" : "View certificates"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/skills"
              onClick={() => soundFx.playClick()}
              className="cosmic-card p-4 bg-white hover:border-cyan-300 hover:-translate-y-1 transition-all group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-2.5">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-slate-900 group-hover:text-cyan-700 text-sm mb-1">
                  {t.nav.skills}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {language === "vi" ? "Công nghệ mình dùng: PyTorch, YOLOv8, OpenCV, C++ và nhúng." : "Tools I use: PyTorch, YOLOv8, OpenCV, C++, embedded and IoT."}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-700">
                <span>{language === "vi" ? "Vào kỹ năng" : "Explore skills"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/about"
              onClick={() => soundFx.playClick()}
              className="cosmic-card p-4 bg-white hover:border-indigo-300 hover:-translate-y-1 transition-all group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-2.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-slate-900 group-hover:text-indigo-700 text-sm mb-1">
                  {t.nav.about}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {language === "vi" ? "Chuyên ngành AI ĐH FPT TP.HCM, quá trình học tập và liên hệ." : "AI major at FPT University HCMC, academic path, and contact."}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-700">
                <span>{language === "vi" ? "Vào tiểu sử" : "Explore bio"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Dialogue Modal for Mission Inspection */}
      <DialogueModal
        quest={selectedQuest}
        onClose={() => setSelectedQuest(null)}
      />

      {/* Modern Light Cosmic Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4 sm:px-6 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Orbit className="w-4 h-4 animate-orbit-medium" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-900 text-sm">
                NGUYỄN ĐỨC BẢO LÂM &copy; 2026, NHẬT KÝ HỌC TẬP
              </div>
              <div className="text-xs text-slate-600 font-sans">
                {t.hero.school}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="cosmic-btn cosmic-btn-secondary px-3.5 py-2 text-xs rounded-xl flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t.footer.backToTop}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
