"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AwardItem, CertificateItem, CitationItem } from "@/types";
import {
  Trophy,
  Award,
  CheckCircle2,
  Newspaper,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  Globe2,
  Medal,
  GraduationCap,
  BrainCircuit,
  FileText,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { soundFx } from "@/lib/sound";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  awards?: AwardItem[];
  certificates?: CertificateItem[];
  citations?: CitationItem[];
}

export default function AwardsSection({ awards = [], certificates = [], citations = [] }: Props) {
  const { t, translateAward, language } = useLanguage();
  const [awardFilter, setAwardFilter] = useState<string>("ALL");
  const [activeCitationCategory, setActiveCitationCategory] = useState<string>("ALL");

  const translatedAwards = awards.map(translateAward);

  const filteredAwards = translatedAwards.filter((award) => {
    if (awardFilter === "ALL") return true;
    if (awardFilter === "AI_INTL") {
      return (
        award.category === "Olympic AI" ||
        award.category === "Hackathon & Đổi mới sáng tạo" ||
        award.category === "Lập trình Quốc tế" ||
        award.scope === "Quốc tế" ||
        award.scope === "Quốc gia" ||
        award.scope === "International" ||
        award.scope === "National" ||
        award.category === "Olympic Tin học"
      );
    }
    if (awardFilter === "ACADEMIC") {
      return (
        award.category === "Khen thưởng Học thuật" ||
        award.scope === "Đại học FPT" ||
        award.scope === "FPT University" ||
        award.title.includes("Xuất Sắc") ||
        award.title.includes("Honor") ||
        award.issuer.includes("FPT")
      );
    }
    if (awardFilter === "KHKT") {
      return (
        award.category === "Sáng tạo KHKT" ||
        award.category === "Tin học trẻ" ||
        award.category === "Robotics & Lập trình" ||
        award.category === "Khởi nghiệp & Đổi mới sáng tạo" ||
        award.scope === "Provincial" ||
        award.scope === "Cấp tỉnh"
      );
    }
    if (awardFilter === "OLYMPIAD") {
      return (
        award.category === "Học sinh giỏi" ||
        award.category === "Olympic Tin học" ||
        award.category === "Tin học văn phòng" ||
        award.category === "Học thuật"
      );
    }
    return true;
  });

  const filteredCitations = citations.filter((item) => {
    if (activeCitationCategory === "ALL") return true;
    return item.category === activeCitationCategory;
  });

  // Calculate stats
  const aiAndHackathonCount = awards.filter(
    (a) => a.category === "Olympic AI" || a.category === "Hackathon & Đổi mới sáng tạo"
  ).length;
  const aiIntlCount = awards.filter(
    (a) =>
      a.category === "Olympic AI" ||
      a.category === "Hackathon & Đổi mới sáng tạo" ||
      a.scope === "Quốc tế" ||
      a.scope === "Quốc gia" ||
      a.category === "Olympic Tin học"
  ).length;
  const academicHonorsCount = awards.filter(
    (a) => a.category === "Khen thưởng Học thuật" || a.scope === "Đại học FPT"
  ).length;
  const intlAwardsCount = awards.filter((a) => a.scope === "Quốc tế" || a.scope === "Quốc gia").length;
  const firstPrizesCount = awards.filter((a) => a.title.includes("Giải Nhất") || a.title.includes("Vô Địch")).length;

  const researchTopics = language === "vi" ? [
    "Thị giác máy tính (Computer Vision)",
    "Edge AI & Lập trình nhúng (Raspberry Pi, Arduino)",
    "Mô hình Transformer & Deep Learning",
    "Xử lý ngôn ngữ tự nhiên (NLP)",
    "Thiết kế hệ thống nhiều người dùng, có khả năng mở rộng",
    "Giải thuật lập trình thi đấu (C++ STL)",
    "Tối ưu hóa mô hình AI biên (Model Quantization)",
    "Tư duy kết nối hệ thống phần mềm & phần cứng",
  ] : [
    "Computer Vision (YOLOv8, OpenCV, SRCNN)",
    "Edge AI & Embedded Systems (Raspberry Pi, Arduino)",
    "Transformer Architectures & Deep Learning",
    "Natural Language Processing (NLP)",
    "Designing systems for many concurrent users, built to scale",
    "Competitive Programming Algorithms (C++ STL)",
    "Edge Model Quantization & Optimization",
    "End-to-End Hardware & Software Integration",
  ];

  return (
    <section id="awards-section" className="mb-14 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              {language === "vi" ? "Giải Thưởng & Thành Tích" : "Honors & Recognitions"}
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              {language === "vi"
                ? "Các giải thưởng Olympic AI, Hackathon, danh hiệu Sinh viên Xuất sắc FPT, KHKT và kỳ thi HSG mình đã tham gia"
                : "AI Olympiad, hackathons, FPT Honor Student semesters, and science fairs I've taken part in"}
            </p>
          </div>
        </div>

        {/* Award Scope Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 font-sans text-xs">
          {[
            { id: "ALL", label: language === "vi" ? `TẤT CẢ (${awards.length})` : `ALL (${awards.length})` },
            { id: "AI_INTL", label: language === "vi" ? `OLYMPIC AI & HACKATHON (${aiIntlCount})` : `AI & HACKATHON (${aiIntlCount})` },
            { id: "ACADEMIC", label: language === "vi" ? `SV XUẤT SẮC ĐH FPT (${academicHonorsCount})` : `FPT HONORS (${academicHonorsCount})` },
            { id: "KHKT", label: language === "vi" ? "SÁNG TẠO KHKT" : "SCIENCE & TECH" },
            { id: "OLYMPIAD", label: language === "vi" ? "HỌC SINH GIỎI" : "OLYMPIAD" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setAwardFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                awardFilter === tab.id
                  ? "bg-amber-600 text-white shadow-xs font-semibold"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Overview Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-900">{aiAndHackathonCount}</div>
            <div className="text-[11px] text-slate-600 font-medium">Olympic AI & VEDC Hackathon</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-900">{academicHonorsCount}</div>
            <div className="text-[11px] text-slate-600 font-medium">
              {language === "vi" ? "Top 100 & SV Xuất Sắc FPT" : "Top 100 & FPT Honors"}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-900">{intlAwardsCount}</div>
            <div className="text-[11px] text-slate-600 font-medium">
              {language === "vi" ? "Giải Quốc Tế & Quốc Gia" : "Int'l & National Awards"}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Medal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-900">{firstPrizesCount}</div>
            <div className="text-[11px] text-slate-600 font-medium">
              {language === "vi" ? "Giải Vô Địch & Giải Nhất" : "Champions & 1st Prizes"}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main Awards Grid: Full Width Responsive 3 Columns */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
            {filteredAwards.map((award) => {
              const isTopAward =
                award.category === "Olympic AI" ||
                award.category === "Hackathon & Đổi mới sáng tạo" ||
                award.scope === "Quốc tế" ||
                award.scope === "International" ||
                award.title.includes("Vô Địch") ||
                award.title.includes("Champion");
              const isAcademicHonor =
                award.category === "Khen thưởng Học thuật" ||
                award.scope === "Đại học FPT" ||
                award.scope === "FPT University" ||
                award.title.includes("Xuất Sắc") ||
                award.title.includes("Honor") ||
                award.title.includes("Top 100");
              return (
                <div
                  key={award.id}
                  onClick={() => soundFx.playStarChime()}
                  className={`cosmic-card p-5 cursor-pointer relative overflow-hidden group hover:scale-[1.01] transition-all flex flex-col justify-between ${
                    isTopAward
                      ? "border-amber-300 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 shadow-xs"
                      : isAcademicHonor
                      ? "border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/20 shadow-xs"
                      : "bg-white"
                  }`}
                >
                  <div>
                    {/* Year & Scope Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`text-xs font-sans font-semibold px-2.5 py-0.5 rounded-full border ${
                        isAcademicHonor
                          ? "text-emerald-950 bg-emerald-100/90 border-emerald-300"
                          : "text-amber-900 bg-amber-100/90 border-amber-200"
                      }`}>
                        {language === "vi" ? `NĂM ${award.year}` : `YEAR ${award.year}`}
                      </span>
                      <span className={`text-[11px] font-sans font-medium px-2 py-0.5 rounded-md border ${
                        isAcademicHonor
                          ? "bg-emerald-100/80 text-emerald-900 border-emerald-200 font-semibold"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}>
                        {award.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-display font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug mb-2">
                      {award.title}
                    </h3>

                    {award.desc && (
                      <p className="text-xs text-slate-600 font-sans leading-relaxed mb-3">
                        {award.desc}
                      </p>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 font-sans pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      {language === "vi" ? "Đơn vị:" : "Issuer:"}{" "}
                      <span className="text-slate-700 font-medium">{award.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {award.articleUrl && (
                        <a
                          href={award.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playClick();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100/80 border border-sky-200/80 px-2 py-0.5 rounded transition-colors"
                          title="View article / press release"
                        >
                          <Newspaper className="w-3 h-3 text-sky-600" />
                          <span>{language === "vi" ? "Chi tiết" : "Details"}</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {isTopAward && (
                        <Link
                          href="/projects"
                          onClick={(e) => e.stopPropagation()}
                          className="text-amber-800 hover:text-amber-950 font-semibold hover:underline flex items-center gap-0.5"
                          title="View project"
                        >
                          <span>{language === "vi" ? "Dự án" : "Project"}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Banner Linking to /certificates */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-sky-50/70 border border-purple-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
                <span>
                  {language === "vi" ? "14 Chứng Chỉ Mình Đã Học" : "14 Certificates I've Taken"}
                </span>
              </h4>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                {language === "vi"
                  ? "Mình có một trang riêng liệt kê 14 chứng chỉ đã học (DeepLearning.AI, IBM, Google, Michigan, Minnesota, MOS) kèm link xác thực và file PDF."
                  : "I have a separate page listing all 14 certificates I've taken (DeepLearning.AI, IBM, Google, Michigan, Minnesota, MOS) with verification links and PDFs."}
              </p>
            </div>
          </div>
          <Link
            href="/certificates"
            onClick={() => soundFx.playClick()}
            className="cosmic-btn cosmic-btn-primary px-4 py-2.5 text-xs flex items-center gap-2 rounded-xl font-semibold flex-shrink-0 shadow-xs"
          >
            <span>{language === "vi" ? "Xem 14 Chứng Chỉ" : "View the Certificates"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Press & Academic Citations Section */}
        <div className="border border-indigo-200 rounded-2xl bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 flex-shrink-0">
                <Newspaper className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
                  <span>{t.awards.citationSectionTitle}</span>
                  <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {t.awards.verifiedBadge}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  {t.awards.citationSectionSubtitle}
                </p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 font-sans text-xs">
              {[
                { id: "ALL", label: t.awards.citationFilterAll },
                { id: "Báo chí chính thống", label: t.awards.citationFilterPress },
                { id: "Học thuật & Nghiên cứu", label: t.awards.citationFilterAcademic },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveCitationCategory(cat.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                    activeCitationCategory === cat.id
                      ? "bg-indigo-700 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Citations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCitations.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800">
                        {item.badge || item.category}
                      </span>
                      <span className="text-xs font-sans text-slate-500">
                        • {item.date}
                      </span>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="text-xs font-sans text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-1 transition-colors flex-shrink-0"
                    >
                      <span>{t.awards.viewArticle}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1.5 leading-snug">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="hover:underline flex items-baseline gap-1.5"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 self-center" />
                      <span>{item.title}</span>
                    </a>
                  </h4>

                  <p className="text-xs text-slate-700 font-sans leading-relaxed mb-3">
                    {item.summary}
                  </p>
                </div>

                <div className="text-[11px] font-sans text-slate-500 pt-2 border-t border-slate-100">
                  {language === "vi" ? "Cơ quan phát hành:" : "Publisher:"}{" "}
                  <span className="text-slate-800 font-medium">{item.publisher}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests & Research Focus Card */}
        <div className="cosmic-card p-6 bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3 mb-4">
            <h3 className="text-sm font-display font-bold text-slate-900">
              {language === "vi" ? "Những Điều Mình Quan Tâm" : "Things I'm Curious About"}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-sans">
            {researchTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
