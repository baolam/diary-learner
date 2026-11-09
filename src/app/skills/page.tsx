"use client";

import React from "react";
import Link from "next/link";
import initialData from "@/data/profile.json";
import { PortfolioData } from "@/types";
import PixelHeader from "@/components/PixelHeader";
import CosmicParticles from "@/components/CosmicParticles";
import Inventory from "@/components/Inventory";
import { soundFx } from "@/lib/sound";
import { LeetCodeIcon, DeepMLIcon } from "@/components/SocialIcons";
import { Layers, ArrowLeft, ArrowRight, Rocket, Trophy, Award, ExternalLink, Code2, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SkillsPage() {
  const data = initialData as PortfolioData;
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
          <span className="text-slate-800 font-semibold">{t.nav.skills}</span>
        </div>

        {/* Page Hero Banner */}
        <div className="cosmic-card p-6 sm:p-8 bg-gradient-to-br from-white via-purple-50/40 to-sky-50/30 border border-slate-200/90 rounded-2xl mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-200 mb-3">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>{t.skills.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
                {t.skills.pageTitle}
              </h1>
              <p className="text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
                {language === "vi"
                  ? "Chi tiết năng lực lập trình và nghiên cứu công nghệ: Mô hình học sâu (PyTorch, Transformer, Self-Attention), Thị giác máy tính (YOLOv8, OpenCV), Lập trình thiết bị nhúng biên (Raspberry Pi, Arduino C++, LoRa, UART) và Giải thuật tính toán (C++ STL)."
                  : "Comprehensive programming and engineering skills: Deep Learning architectures (PyTorch, Transformer, Self-Attention), Computer Vision (YOLOv8, OpenCV), Edge AI & Embedded Systems (Raspberry Pi, Arduino C++, LoRa, UART), and Algorithmic problem-solving (C++ STL)."}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href="/projects"
                onClick={() => soundFx.playClick()}
                className="cosmic-btn cosmic-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2 rounded-xl font-medium text-slate-700 hover:text-sky-700"
              >
                <Rocket className="w-3.5 h-3.5 text-sky-600" />
                <span>{language === "vi" ? "Xem Ứng Dụng Trong Dự Án" : "View Project Implementations"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Coding & Algorithm Platforms Showcase Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-sky-50/40 border border-slate-200/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-display font-bold text-slate-900">
                  {language === "vi" ? "NỀN TẢNG LUYỆN CODE & GIẢI THUẬT" : "CODING & ALGORITHMIC PRACTICE PLATFORMS"}
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  {language === "vi"
                    ? "Hồ sơ thực hành giải thuật cạnh tranh và hiện thực hóa thuật toán Machine Learning"
                    : "Profiles for competitive algorithmic problem-solving and machine learning implementations"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LeetCode Profile */}
            <a
              href="https://leetcode.com/u/lam01662052827/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playStarChime()}
              className="cosmic-card p-5 bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                      <LeetCodeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 group-hover:text-amber-700 text-sm transition-colors">
                        LeetCode Profile
                      </h3>
                      <div className="text-[11px] font-mono text-slate-500">@lam01662052827</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200">
                    Algorithms & DSA
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  {language === "vi"
                    ? "Thực hành giải bài tập cấu trúc dữ liệu, giải thuật tối ưu độ phức tạp không gian và thời gian bằng C++ và Python."
                    : "Practicing data structures and algorithms, optimizing computational complexity and memory usage in C++ and Python."}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>leetcode.com/u/lam01662052827</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* Deep-ML Profile */}
            <a
              href="https://baolam.github.io/deep-ml/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playStarChime()}
              className="cosmic-card p-5 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                      <DeepMLIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 group-hover:text-indigo-700 text-sm transition-colors">
                        Deep-ML Solutions & Practice
                      </h3>
                      <div className="text-[11px] font-mono text-slate-500">baolam.github.io/deep-ml</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 font-medium border border-indigo-200">
                    Machine Learning From Scratch
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  {language === "vi"
                    ? "Tổng hợp lời giải và hiện thực hóa các thuật toán Machine Learning / Deep Learning nguyên bản: Linear Regression, CNN, Attention, Matrix Ops..."
                    : "Comprehensive implementations of fundamental Machine Learning and Deep Learning algorithms from scratch."}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-700">
                <span>baolam.github.io/deep-ml</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* Full Interactive Skills List */}
        <Inventory skills={data.skills} quests={data.quests} />

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
                  {language === "vi" ? "THỰC HÀNH THỰC TẾ" : "PRACTICAL EXPERIENCE"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {language === "vi" ? "Xem Các Dự Án Triển Khai Thực Nghiệm" : "Explore Implemented Projects"}
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
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "CHỨNG CHỈ ĐÀO TẠO" : "CREDENTIALS"}
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
            <Link href="/awards" className="hover:text-sky-700">{t.nav.awards}</Link>
            <Link href="/certificates" className="hover:text-sky-700">{t.nav.certificates}</Link>
            <Link href="/skills" className="text-purple-700 font-semibold">{t.nav.skills}</Link>
            <Link href="/about" className="hover:text-sky-700">{t.nav.about}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
