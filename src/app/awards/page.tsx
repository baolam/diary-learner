"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import initialData from "@/data/profile.json";
import { PortfolioData } from "@/types";
import PixelHeader from "@/components/PixelHeader";
import CosmicParticles from "@/components/CosmicParticles";
import AwardsSection from "@/components/AwardsSection";
import { soundFx } from "@/lib/sound";
import { Trophy, ArrowLeft, ArrowRight, Rocket, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AwardsPage() {
  const [data, setData] = useState<PortfolioData>(initialData as PortfolioData);
  const { t, language } = useLanguage();

  useEffect(() => {
    fetch("/api/data")
      .then((res) => (res.ok ? res.json() : null))
      .then((remoteData) => {
        if (remoteData && remoteData.profile) {
          setData((prev) => ({ ...prev, ...remoteData }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 relative">
      <CosmicParticles />
      <PixelHeader profile={data.profile} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-sans text-slate-500 mb-6">
          <Link
            href="/"
            onClick={() => soundFx.playClick()}
            className="hover:text-sky-700 transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.nav.home}</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{t.nav.awards}</span>
        </div>

        {/* Page Hero Banner */}
        <div className="cosmic-card p-6 sm:p-8 bg-gradient-to-br from-white via-amber-50/40 to-sky-50/30 border border-slate-200/90 rounded-2xl mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 mb-3">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>{t.awards.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
                {language === "vi"
                  ? "Giải Thưởng Olympic AI, Cuộc Thi Quốc Tế & Danh Hiệu Sinh Viên Xuất Sắc"
                  : "AI Olympiad Honors, International Championships & Academic Distinctions"}
              </h1>
              <p className="text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
                {language === "vi"
                  ? "Minh chứng năng lực qua Giải Ba Olympic Trí Tuệ Nhân Tạo (AI) miền Nam 2026, Top 10 Chung kết Toàn quốc VEDC 2026, Top 23 RMIT Hackathon, Quán quân Quốc tế Coolest Projects Malaysia 2022, chuỗi 4 kỳ liên tiếp đạt Sinh viên Xuất sắc & Top 100 ĐH FPT cùng các giải KHKT, Tin học trẻ toàn quốc."
                  : "Verified technical excellence across 3rd Prize Southern AI Olympiad 2026, National Top 10 VEDC 2026, Top 23 RMIT Hackathon, Overall International Champion Coolest Projects Malaysia 2022, 4 consecutive FPT Honor Student & Top 100 awards."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <Link
                href="/certificates"
                onClick={() => soundFx.playClick()}
                className="cosmic-btn cosmic-btn-primary px-3.5 py-2 text-xs flex items-center gap-2 rounded-xl font-semibold shadow-xs"
              >
                <span>{language === "vi" ? "Xem 14 Chứng Chỉ" : "View the Certificates"}</span>
              </Link>
              <Link
                href="/projects"
                onClick={() => soundFx.playClick()}
                className="cosmic-btn cosmic-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2 rounded-xl font-medium text-slate-700 hover:text-sky-700"
              >
                <Rocket className="w-3.5 h-3.5 text-sky-600" />
                <span>{language === "vi" ? "Dự Án Đoạt Giải" : "Awarded Projects"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Full Interactive Awards & Certificates Section */}
        <AwardsSection
          awards={data.awards}
          certificates={data.certificates}
          citations={data.citations}
        />

        {/* Cross-linking to Projects & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200">
          <Link
            href="/projects"
            onClick={() => soundFx.playClick()}
            className="cosmic-card p-5 bg-white hover:border-sky-300 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "BƯỚC TIẾP THEO" : "NEXT STEP"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {language === "vi" ? "Khám phá Chi tiết Các Dự Án AI Kỹ Thuật" : "Explore Technical AI Projects"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/certificates"
            onClick={() => soundFx.playClick()}
            className="cosmic-card p-5 bg-white hover:border-purple-300 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "CHỨNG CHỈ ĐÀO TẠO" : "PROFESSIONAL CREDENTIALS"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {language === "vi" ? "Xem 14 Chứng Chỉ Coursera & MOS" : "View the Coursera & MOS Certificates"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-sm mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>NGUYỄN ĐỨC BẢO LÂM &copy; 2026, NHẬT KÝ HỌC TẬP</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-sky-700">{t.nav.overview}</Link>
            <Link href="/projects" className="hover:text-sky-700">{t.nav.projects}</Link>
            <Link href="/awards" className="text-amber-700 font-semibold">{t.nav.awards}</Link>
            <Link href="/certificates" className="hover:text-sky-700">{t.nav.certificates}</Link>
            <Link href="/skills" className="hover:text-sky-700">{t.nav.skills}</Link>
            <Link href="/about" className="hover:text-sky-700">{t.nav.about}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
