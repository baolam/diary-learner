"use client";

import React, { useState } from "react";
import Link from "next/link";
import initialData from "@/data/profile.json";
import { PortfolioData, Quest } from "@/types";
import PixelHeader from "@/components/PixelHeader";
import CosmicParticles from "@/components/CosmicParticles";
import QuestLog from "@/components/QuestLog";
import DialogueModal from "@/components/DialogueModal";
import { soundFx } from "@/lib/sound";
import { Rocket, ArrowLeft, Trophy, ArrowRight, Layers, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsPage() {
  const data = initialData as PortfolioData;
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const { t, language } = useLanguage();

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
          <span className="text-slate-800 font-semibold">{t.nav.projects}</span>
        </div>

        {/* Page Hero Banner */}
        <div className="cosmic-card p-6 sm:p-8 bg-gradient-to-br from-white via-sky-50/40 to-indigo-50/30 border border-slate-200/90 rounded-2xl mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200 mb-3">
                <Rocket className="w-4 h-4 text-sky-600" />
                <span>{t.projects.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
                {t.projects.pageTitle}
              </h1>
              <p className="text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
                {language === "vi"
                  ? "Đây là những dự án mình đã tự tay làm khi học: từ thị giác máy tính (YOLOv8, OpenCV), mô hình học sâu (Transformer PyTorch) đến thiết bị nhúng (Raspberry Pi, Arduino, LoRa)."
                  : "Projects I've built myself along the way: from computer vision (YOLOv8, OpenCV) and deep learning models (Transformer PyTorch) to embedded devices (Raspberry Pi, Arduino, LoRa)."}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href="/awards"
                onClick={() => soundFx.playClick()}
                className="cosmic-btn cosmic-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2 rounded-xl font-medium text-slate-700 hover:text-amber-700"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === "vi" ? "Xem Giải Thưởng Đạt Được" : "View Won Honors"}</span>
              </Link>
            </div>
          </div>
        </div>

        <QuestLog
          quests={data.quests}
          onSelectQuest={(quest) => setSelectedQuest(quest)}
        />

        {/* Cross-linking to Skills & Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200">
          <Link
            href="/skills"
            onClick={() => soundFx.playClick()}
            className="cosmic-card p-5 bg-white hover:border-sky-300 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "Tiếp theo" : "Next"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {language === "vi" ? "Xem các kỹ năng & công nghệ mình đã dùng" : "See the skills & tools I've used"}
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
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "Giải thưởng" : "Awards"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {language === "vi" ? "Xem giải thưởng & 14 chứng chỉ mình đã học" : "See the awards & 14 certificates I've taken"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      <DialogueModal
        quest={selectedQuest}
        onClose={() => setSelectedQuest(null)}
      />

      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-sm mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>NGUYỄN ĐỨC BẢO LÂM &copy; 2026, NHẬT KÝ HỌC TẬP</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-sky-700">{t.nav.overview}</Link>
            <Link href="/projects" className="text-sky-700 font-semibold">{t.nav.projects}</Link>
            <Link href="/awards" className="hover:text-sky-700">{t.nav.awards}</Link>
            <Link href="/certificates" className="hover:text-sky-700">{t.nav.certificates}</Link>
            <Link href="/skills" className="hover:text-sky-700">{t.nav.skills}</Link>
            <Link href="/about" className="hover:text-sky-700">{t.nav.about}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
