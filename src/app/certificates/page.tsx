"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import initialData from "@/data/profile.json";
import { PortfolioData, CertificateItem } from "@/types";
import PixelHeader from "@/components/PixelHeader";
import CosmicParticles from "@/components/CosmicParticles";
import { soundFx } from "@/lib/sound";
import {
  Award,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  CheckCircle2,
  Search,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Trophy,
  Rocket,
  Layers,
  Check
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CertificatesPage() {
  const [data, setData] = useState<PortfolioData>(initialData as PortfolioData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
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

  const certificates: CertificateItem[] = data.certificates || [];

  // Categorize helper
  const isAIML = (cert: CertificateItem) => {
    const n = cert.name.toLowerCase();
    return (
      n.includes("deep learning") ||
      n.includes("pytorch") ||
      n.includes("generative ai") ||
      n.includes("machine learning") ||
      n.includes("ai foundations") ||
      n.includes("ethics in the age of ai")
    );
  };

  const isSWEAndData = (cert: CertificateItem) => {
    const n = cert.name.toLowerCase();
    return (
      n.includes("python") ||
      n.includes("data analytics") ||
      n.includes("software development") ||
      n.includes("academic")
    );
  };

  const isMOS = (cert: CertificateItem) => {
    return cert.issuer.toLowerCase().includes("microsoft") || cert.name.toLowerCase().includes("mos");
  };

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      // Filter tab
      if (activeFilter === "AI_ML" && !isAIML(cert)) return false;
      if (activeFilter === "SWE_DATA" && !isSWEAndData(cert)) return false;
      if (activeFilter === "MOS" && !isMOS(cert)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = cert.name.toLowerCase().includes(query);
        const matchIssuer = cert.issuer.toLowerCase().includes(query);
        const matchId = (cert.credentialId || "").toLowerCase().includes(query);
        const matchYear = cert.year.includes(query);
        if (!matchName && !matchIssuer && !matchId && !matchYear) return false;
      }

      return true;
    });
  }, [certificates, activeFilter, searchQuery]);

  const copyCredentialId = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    soundFx.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stats
  const aimlCount = certificates.filter(isAIML).length;
  const sweDataCount = certificates.filter(isSWEAndData).length;
  const mosCount = certificates.filter(isMOS).length;

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
          <span className="text-slate-800 font-semibold">{t.nav.certificates}</span>
        </div>

        {/* Hero Banner */}
        <div className="cosmic-card p-6 sm:p-8 bg-gradient-to-br from-white via-purple-50/40 to-sky-50/30 border border-slate-200/90 rounded-2xl mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-200 mb-3">
                <Award className="w-4 h-4 text-purple-600" />
                <span>{t.certificates.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
                {language === "vi" ? "14 Khóa Học Mình Đã Hoàn Thành" : "14 Courses I've Completed"}
              </h1>
              <p className="text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
                {language === "vi"
                  ? "Đây là các khóa học mình đã hoàn thành trên Coursera (DeepLearning.AI, IBM, Google, University of Michigan, University of Minnesota) và chứng chỉ Microsoft Office Specialist (MOS). Mỗi khóa đều có link xác thực và file PDF nếu bạn muốn xem."
                  : "Courses I've completed on Coursera (DeepLearning.AI, IBM, Google, University of Michigan, University of Minnesota) plus Microsoft Office Specialist (MOS) certificates. Each one has a verification link and a PDF if you'd like to take a look."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <Link
                href="/awards"
                onClick={() => soundFx.playClick()}
                className="cosmic-btn cosmic-btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-medium text-slate-700 hover:text-amber-700 border-slate-200"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === "vi" ? "Xem Giải Thưởng Olympic AI" : "View AI Olympiad Honors"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-display text-slate-900">{certificates.length}</div>
              <div className="text-[11px] text-slate-600 font-medium">
                {language === "vi" ? "Tổng số khóa học" : "Total Courses"}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-display text-slate-900">{aimlCount}</div>
              <div className="text-[11px] text-slate-600 font-medium">AI & Deep Learning</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-display text-slate-900">{sweDataCount}</div>
              <div className="text-[11px] text-slate-600 font-medium">
                {language === "vi" ? "Kỹ Thuật Phần Mềm & Data" : "Software & Data"}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-display text-slate-900">{mosCount}</div>
              <div className="text-[11px] text-slate-600 font-medium">
                Microsoft MOS
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 font-sans text-xs">
            {[
              { id: "ALL", label: language === "vi" ? `TẤT CẢ (${certificates.length})` : `ALL (${certificates.length})` },
              { id: "AI_ML", label: `AI & DEEP LEARNING (${aimlCount})` },
              { id: "SWE_DATA", label: language === "vi" ? `LẬP TRÌNH & DATA (${sweDataCount})` : `SOFTWARE & DATA (${sweDataCount})` },
              { id: "MOS", label: `MICROSOFT MOS (${mosCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(tab.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-purple-600 text-white shadow-xs font-semibold"
                    : "bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "vi" ? "Tìm theo tên, ID, tổ chức..." : "Search by title, ID, issuer..."}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-sans transition-all"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filteredCertificates.map((cert) => {
            const isCoursera = cert.url?.includes("coursera.org");
            const isMicrosoft = isMOS(cert);

            return (
              <div
                key={cert.id}
                onClick={() => soundFx.playStarChime()}
                className="cosmic-card p-5 bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-md border ${
                        isMicrosoft
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : isCoursera
                          ? "bg-purple-50 text-purple-800 border-purple-200"
                          : "bg-sky-50 text-sky-800 border-sky-200"
                      }`}
                    >
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-sans text-slate-500 font-medium">
                      {language === "vi" ? `NĂM ${cert.year}` : `YEAR ${cert.year}`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-display font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug mb-2.5">
                    {cert.name}
                  </h3>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-200/80 rounded-md px-2 py-1 mb-3">
                      <span className="text-slate-400 font-sans">ID:</span>
                      <span className="text-slate-800 font-semibold">{cert.credentialId}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyCredentialId(cert.credentialId!);
                        }}
                        className="ml-auto text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                        title={language === "vi" ? "Sao chép mã" : "Copy ID"}
                      >
                        {copiedId === cert.credentialId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <FileText className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Action Links */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === "vi" ? "Đã hoàn thành" : "Completed"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-1 rounded-md transition-colors"
                        title="View PDF"
                      >
                        <FileText className="w-3 h-3" />
                        <span>PDF</span>
                      </a>
                    )}

                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2 py-1 rounded-md transition-colors"
                        title={language === "vi" ? "Xem trực tuyến" : "View online"}
                      >
                        <span>{language === "vi" ? "Xem" : "View"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If no match */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-800">
              {language === "vi" ? "Không tìm thấy chứng chỉ phù hợp" : "No matching credentials found"}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {language === "vi"
                ? "Vui lòng thử tìm với từ khóa khác hoặc xóa bộ lọc."
                : "Please adjust your search keyword or reset filter tabs."}
            </p>
          </div>
        )}

        {/* Cross-linking navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-200">
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
                  {language === "vi" ? "Giải thưởng" : "Awards"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {language === "vi"
                    ? "Xem Giải Ba Olympic AI, VEDC & SV Xuất Sắc FPT"
                    : "View 3rd Prize AI Olympiad, VEDC & FPT Honors"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/skills"
            onClick={() => soundFx.playClick()}
            className="cosmic-card p-5 bg-white hover:border-sky-300 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === "vi" ? "Kỹ năng" : "Skills"}
                </div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {language === "vi"
                    ? "Xem các kỹ năng mình đã dùng (PyTorch, YOLO, C++)"
                    : "See the skills I've used (PyTorch, YOLO, C++)"}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-600 font-sans relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Nguyễn Đức Bảo Lâm • {t.hero.school}</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/" className="hover:text-sky-700 transition-colors">{t.nav.overview}</Link>
            <Link href="/projects" className="hover:text-sky-700 transition-colors">{t.nav.projects}</Link>
            <Link href="/awards" className="hover:text-sky-700 transition-colors">{t.nav.awards}</Link>
            <Link href="/certificates" className="text-sky-700 font-semibold">{t.nav.certificates}</Link>
            <Link href="/skills" className="hover:text-sky-700 transition-colors">{t.nav.skills}</Link>
            <Link href="/about" className="hover:text-sky-700 transition-colors">{t.nav.about}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
