"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import initialData from "@/data/profile.json";
import { PortfolioData } from "@/types";
import PixelHeader from "@/components/PixelHeader";
import CosmicParticles from "@/components/CosmicParticles";
import StatusCard from "@/components/StatusCard";
import AdventureLog from "@/components/AdventureLog";
import { soundFx } from "@/lib/sound";
import { ArrowLeft, ArrowRight, Rocket, Trophy, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
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
          <span className="text-slate-800 font-semibold">{t.nav.about}</span>
        </div>

        {/* Page Hero Banner */}
        <div className="cosmic-card p-6 sm:p-8 bg-gradient-to-br from-white via-indigo-50/40 to-sky-50/30 border border-slate-200/90 rounded-2xl mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-200 mb-3">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>{t.timeline.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
                {language === "vi"
                  ? "Nguyễn Đức Bảo Lâm, Sinh Viên Ngành Trí Tuệ Nhân Tạo (AI)"
                  : "Nguyen Duc Bao Lam, Artificial Intelligence Student"}
              </h1>
              <p className="text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
                {language === "vi"
                  ? "Đang học chuyên ngành Trí Tuệ Nhân Tạo (AI) tại Trường Đại học FPT TP.HCM. Đây là nơi mình ghi lại những gì mình học và làm được, từ thuật toán học sâu đến các mô hình thị giác máy tính chạy trên thiết bị nhúng."
                  : "Studying Artificial Intelligence at FPT University HCMC. This is where I keep track of what I learn and build, from deep learning algorithms to computer vision models running on embedded devices."}
              </p>
            </div>
          </div>
        </div>

        {/* Profile, Availability & Contact Details */}
        <StatusCard profile={data.profile} />

        {/* Education & Career Milestones Timeline */}
        <AdventureLog timeline={data.timeline} />

        {/* Cross-linking to Projects & Awards */}
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
                  {language === "vi" ? "SẢN PHẨM THỰC TẾ" : "PRACTICAL PRODUCTS"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {language === "vi" ? "Xem Danh Mục Dự Án Đã Xây Dựng" : "Explore Technical Projects Portfolio"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/awards"
            onClick={() => soundFx.playClick()}
            className="cosmic-card p-5 bg-white hover:border-amber-300 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "DANH HIỆU & GIẢI THƯỞNG" : "HONORS & RECOGNITIONS"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {language === "vi" ? "Xem Chi Tiết Các Giải Thưởng Đạt Được" : "View Comprehensive Honors & Awards"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-sm mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>NGUYỄN ĐỨC BẢO LÂM &copy; 2026, NHẬT KÝ HỌC TẬP</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-sky-700">{t.nav.overview}</Link>
            <Link href="/projects" className="hover:text-sky-700">{t.nav.projects}</Link>
            <Link href="/awards" className="hover:text-sky-700">{t.nav.awards}</Link>
            <Link href="/certificates" className="hover:text-sky-700">{t.nav.certificates}</Link>
            <Link href="/skills" className="hover:text-sky-700">{t.nav.skills}</Link>
            <Link href="/about" className="text-indigo-700 font-semibold">{t.nav.about}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
