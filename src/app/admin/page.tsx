"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData, Quest, Skill, TimelineItem, CertificateItem, AwardItem } from "@/types";
import { soundFx } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Zap,
  Rocket,
  Telescope,
  Compass,
  User,
  Orbit,
  CheckCircle2,
  Award,
  Trophy,
  ExternalLink,
} from "lucide-react";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "status" | "profile" | "quests" | "skills" | "timeline" | "certificates" | "awards"
  >("status");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Check saved session passcode
  useEffect(() => {
    const saved = sessionStorage.getItem("pixel_admin_passcode");
    if (saved) {
      setPasscode(saved);
      verifyAndLoad(saved);
    }
  }, []);

  const verifyAndLoad = async (code: string) => {
    try {
      const authRes = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });

      if (!authRes.ok) {
        setLoginError("Sai passcode. Vui lòng thử lại.");
        sessionStorage.removeItem("pixel_admin_passcode");
        return;
      }

      const res = await fetch("/api/data");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setIsAuthenticated(true);
        setLoginError("");
        sessionStorage.setItem("pixel_admin_passcode", code);
      }
    } catch {
      setLoginError("Không thể kết nối đến trạm chỉ huy trung tâm.");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!passcode.trim()) return;

    verifyAndLoad(passcode);
  };

  const handleSaveAll = async () => {
    if (!data) return;
    setIsSaving(true);
    setSaveStatus(null);
    soundFx.playClick();

    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode: passcode,
          payload: {
            profile: data.profile,
            quests: data.quests,
            skills: data.skills,
            timeline: data.timeline,
            awards: data.awards,
            certificates: data.certificates,
            citations: data.citations,
          },
        }),
      });

      const result = await res.json();
      if (res.ok) {
        soundFx.playLevelUp();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#0284c7", "#4f46e5", "#f59e0b"],
          });
        } catch {}
        setSaveStatus("Cập nhật dữ liệu trạm thiên văn thành công!");
      } else {
        setSaveStatus(`Lỗi: ${result.error || "Không thể lưu dữ liệu"}`);
      }
    } catch {
      setSaveStatus("Lỗi kết nối khi truyền dữ liệu tới trạm.");
    } finally {
      setIsSaving(false);
    }
  };

  // Mission manipulation
  const handleAddQuest = () => {
    if (!data) return;
    soundFx.playStarChime();
    const newQuest: Quest = {
      id: "mission-" + Date.now(),
      title: "Nhiệm Vụ Thám Hiểm Mới",
      type: "Main Quest",
      description: "Mục tiêu thám hiểm và công nghệ được triển khai...",
      tags: ["Next.js", "TypeScript"],
      difficulty: "MEDIUM",
      stars: 5,
      liveUrl: "https://",
      githubUrl: "https://",
      featured: false,
      reward: "+500 EXP, +120 Bụi Sao",
    };
    setData({
      ...data,
      quests: [newQuest, ...data.quests],
    });
  };

  const handleDeleteQuest = (id: string) => {
    if (!data) return;
    soundFx.playClick();
    setData({
      ...data,
      quests: data.quests.filter((q) => q.id !== id),
    });
  };

  // Skill manipulation
  const handleAddSkill = () => {
    if (!data) return;
    soundFx.playStarChime();
    const newSkill: Skill = {
      name: "Kỹ Năng Mới",
      category: "Khác",
      icon: "telescope",
      usedIn: [],
    };
    setData({
      ...data,
      skills: [...data.skills, newSkill],
    });
  };

  const handleDeleteSkill = (index: number) => {
    if (!data) return;
    soundFx.playClick();
    const copy = [...data.skills];
    copy.splice(index, 1);
    setData({ ...data, skills: copy });
  };

  // Timeline manipulation
  const handleAddTimeline = () => {
    if (!data) return;
    soundFx.playStarChime();
    const newItem: TimelineItem = {
      id: "flight-" + Date.now(),
      period: "2026 - Hiện tại",
      role: "Vị trí / Chức danh mới",
      guild: "Trạm Không Gian / Cơ quan",
      desc: "Mô tả nghiên cứu và công việc phát triển...",
    };
    setData({
      ...data,
      timeline: [newItem, ...data.timeline],
    });
  };

  const handleDeleteTimeline = (id: string) => {
    if (!data) return;
    soundFx.playClick();
    setData({
      ...data,
      timeline: data.timeline.filter((t) => t.id !== id),
    });
  };

  // Certificate manipulation
  const handleAddCertificate = () => {
    if (!data) return;
    soundFx.playStarChime();
    const newCert: CertificateItem = {
      id: "cert-" + Date.now(),
      year: "2026",
      name: "Tên chứng chỉ mới",
      issuer: "Đơn vị cấp (vd: Microsoft, Coursera, DeepLearning.AI)",
      url: "",
      credentialId: "",
    };
    setData({
      ...data,
      certificates: [...(data.certificates || []), newCert],
    });
  };

  const handleDeleteCertificate = (id: string) => {
    if (!data) return;
    soundFx.playClick();
    setData({
      ...data,
      certificates: (data.certificates || []).filter((c) => c.id !== id),
    });
  };

  // Award manipulation
  const handleAddAward = () => {
    if (!data) return;
    soundFx.playStarChime();
    const newAward: AwardItem = {
      id: "award-" + Date.now(),
      year: "2026",
      title: "Tên giải thưởng mới",
      issuer: "Đơn vị trao giải",
      badge: "GIẢI THƯỞNG MỚI",
      scope: "Khu vực",
      category: "Olympic AI",
      desc: "Mô tả chi tiết về thành tích và xếp hạng...",
    };
    setData({
      ...data,
      awards: [newAward, ...(data.awards || [])],
    });
  };

  const handleDeleteAward = (id: string) => {
    if (!data) return;
    soundFx.playClick();
    setData({
      ...data,
      awards: (data.awards || []).filter((a) => a.id !== id),
    });
  };

  if (!isAuthenticated || !data) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 mx-auto flex items-center justify-center text-sky-600 mb-5 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-xl font-display font-bold text-slate-900 mb-2">
            FLIGHT COMMANDER ACCESS
          </h1>
          <p className="text-xs text-slate-500 font-sans mb-6">
            Nhập mã điều khiển trạm không gian để mở khóa bảng quản trị.
            <br />
            <span className="text-sky-700 font-mono mt-1 inline-block font-semibold">(Mặc định: pixel2026)</span>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Nhập Passcode..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-center text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
            />

            {loginError && (
              <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-lg font-mono font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="cosmic-btn cosmic-btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 rounded-xl"
            >
              <Unlock className="w-4 h-4" />
              <span>KẾT NỐI TRẠM CHỈ HUY</span>
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-200">
            <Link
              href="/"
              onClick={() => soundFx.playClick()}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>QUAY LẠI ĐÀI QUAN SÁT</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Top Admin HUD */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
              title="Quay lại đài thiên văn"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Orbit className="w-4 h-4 animate-orbit-medium" />
              </div>
              <span className="font-display font-bold text-slate-900 text-base">FLIGHT COMMANDER CONTROL</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 rounded-xl shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "ĐANG TRUYỀN DỮ LIỆU..." : "LƯU DỮ LIỆU THIÊN VĂN"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {saveStatus && (
          <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 font-medium">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-200 pb-4">
          {[
            { id: "status", label: "QUAN SÁT & TÂM TRẠNG", icon: Zap },
            { id: "profile", label: "HỒ SƠ PHI HÀNH GIA", icon: User },
            { id: "quests", label: "NHIỆM VỤ (MISSIONS)", icon: Rocket },
            { id: "skills", label: "TRANG BỊ & KỸ NĂNG", icon: Telescope },
            { id: "timeline", label: "NHẬT KÝ BAY", icon: Compass },
            { id: "certificates", label: "CHỨNG CHỈ (CERTS)", icon: Award },
            { id: "awards", label: "GIẢI THƯỞNG (AWARDS)", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-sky-600 text-white font-bold shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Quick Status & Mood */}
        {activeTab === "status" && (
          <div className="cosmic-card p-6 sm:p-8 space-y-6 bg-white shadow-sm">
            <h2 className="text-base font-display font-bold text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>CẬP NHẬT TRẠNG THÁI QUAN SÁT (LIVE OBSERVATION TELEMETRY)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">
                  CURRENT OBSERVATION (Đang quan sát gì):
                </label>
                <input
                  type="text"
                  value={data.profile.status}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, status: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">
                  TẦN SỐ TÂM TRẠNG (MOOD):
                </label>
                <input
                  type="text"
                  value={data.profile.mood}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, mood: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-amber-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">
                  O2 DƯỠNG KHÍ ({data.profile.hp}%):
                </label>
                <input
                  type="number"
                  value={data.profile.hp}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, hp: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-sky-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">
                  WARP NĂNG LƯỢNG ({data.profile.mp}%):
                </label>
                <input
                  type="number"
                  value={data.profile.mp}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, mp: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Profile & Stats */}
        {activeTab === "profile" && (
          <div className="cosmic-card p-6 sm:p-8 space-y-6 bg-white shadow-sm">
            <h2 className="text-base font-display font-bold text-slate-900 border-b border-slate-200 pb-4">
              THÔNG TIN PHI HÀNH GIA & THÔNG SỐ VŨ TRỤ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">TÊN HIỂN THỊ:</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, name: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">CHỨC DANH KHÔNG GIAN (TITLE):</label>
                <input
                  type="text"
                  value={data.profile.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, title: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-amber-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">TỌA ĐỘ TRẠM QUAN SÁT:</label>
                <input
                  type="text"
                  value={data.profile.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, location: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">CẤP ĐỘ KHÁM PHÁ (LEVEL):</label>
                <input
                  type="number"
                  value={data.profile.level}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, level: Number(e.target.value) },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-sky-800 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">TIỂU SỬ NHÀ THIÊN VĂN (BIO):</label>
                <textarea
                  rows={3}
                  value={data.profile.bio}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, bio: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>
            </div>

            <h3 className="text-sm font-display font-bold text-sky-800 pt-4 border-t border-slate-200">
              KÊNH TRUYỀN THÔNG & LIÊN LẠC
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">GITHUB URL:</label>
                <input
                  type="text"
                  value={data.profile.socials.github || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        socials: { ...data.profile.socials, github: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">LINKEDIN URL:</label>
                <input
                  type="text"
                  value={data.profile.socials.linkedin || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        socials: { ...data.profile.socials, linkedin: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">EMAIL:</label>
                <input
                  type="text"
                  value={data.profile.socials.email || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        socials: { ...data.profile.socials, email: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-2 font-semibold">TWITTER / X URL:</label>
                <input
                  type="text"
                  value={data.profile.socials.twitter || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: {
                        ...data.profile,
                        socials: { ...data.profile.socials, twitter: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Missions (Projects) */}
        {activeTab === "quests" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-display font-bold text-slate-900">HỒ SƠ NHIỆM VỤ THÁM HIỂM ({data.quests.length})</h2>
              <button
                onClick={handleAddQuest}
                className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>THÊM NHIỆM VỤ MỚI</span>
              </button>
            </div>

            {data.quests.map((quest, index) => (
              <div key={quest.id} className="cosmic-card p-6 space-y-4 bg-white shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm font-display font-bold text-sky-800">
                    MISSION #{index + 1}: {quest.title}
                  </span>
                  <button
                    onClick={() => handleDeleteQuest(quest.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200"
                    title="Xóa nhiệm vụ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">TÊN NHIỆM VỤ:</label>
                    <input
                      type="text"
                      value={quest.title}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].title = e.target.value;
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">PHÂN LOẠI:</label>
                    <select
                      value={quest.type}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].type = e.target.value as Quest["type"];
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-sky-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                    >
                      <option value="Boss Quest">Deep Space (Boss)</option>
                      <option value="Main Quest">Orbital (Main)</option>
                      <option value="Side Quest">Planetary Rover (Side)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">ĐỘ KHÓ:</label>
                    <select
                      value={quest.difficulty}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].difficulty = e.target.value as Quest["difficulty"];
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                    >
                      <option value="EASY">EASY (Quỹ đạo)</option>
                      <option value="MEDIUM">MEDIUM (Hành tinh)</option>
                      <option value="HARD">HARD (Liên sao)</option>
                      <option value="LEGENDARY">LEGENDARY (Thiên hà)</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">MỤC TIÊU & MÔ TẢ:</label>
                    <textarea
                      rows={2}
                      value={quest.description}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].description = e.target.value;
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">DEMO / LAUNCH URL:</label>
                    <input
                      type="text"
                      value={quest.liveUrl || ""}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].liveUrl = e.target.value;
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">MÃ NGUỒN GITHUB URL:</label>
                    <input
                      type="text"
                      value={quest.githubUrl || ""}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].githubUrl = e.target.value;
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">TAGS (Phân tách bằng dấu phẩy):</label>
                    <input
                      type="text"
                      value={quest.tags.join(", ")}
                      onChange={(e) => {
                        const copy = [...data.quests];
                        copy[index].tags = e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean);
                        setData({ ...data, quests: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Skills & Astro Gear */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-display font-bold text-slate-900">TRANG BỊ & KHO KỸ NĂNG ({data.skills.length})</h2>
              <button
                onClick={handleAddSkill}
                className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>THÊM TRANG BỊ MỚI</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="cosmic-card p-5 space-y-3 bg-white shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-sm font-display font-bold text-sky-800">{skill.name}</span>
                    <button
                      onClick={() => handleDeleteSkill(index)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1 font-semibold">TÊN:</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const copy = [...data.skills];
                          copy[index].name = e.target.value;
                          setData({ ...data, skills: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1 font-semibold">PHÂN LOẠI:</label>
                      <select
                        value={skill.category}
                        onChange={(e) => {
                          const copy = [...data.skills];
                          copy[index].category = e.target.value;
                          setData({ ...data, skills: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-sans"
                      >
                        <option value="Trí Tuệ Nhân Tạo & Xử Lý Ảnh">Trí Tuệ Nhân Tạo & Xử Lý Ảnh</option>
                        <option value="Hệ Thống Nhúng & AIoT">Hệ Thống Nhúng & AIoT</option>
                        <option value="Lập Trình Thi Đấu & Thuật Toán">Lập Trình Thi Đấu & Thuật Toán</option>
                        <option value="Nền Tảng Web & Máy Chủ">Nền Tảng Web & Máy Chủ</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[11px] text-slate-500 mb-1 font-semibold">DÙNG TRONG DỰ ÁN (id, phân cách bằng dấu phẩy):</label>
                      <input
                        type="text"
                        value={skill.usedIn.join(", ")}
                        onChange={(e) => {
                          const copy = [...data.skills];
                          copy[index].usedIn = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setData({ ...data, skills: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-sans"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Flight Log Timeline */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-display font-bold text-slate-900">NHẬT KÝ HÀNH TRÌNH ({data.timeline.length})</h2>
              <button
                onClick={handleAddTimeline}
                className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>THÊM CỘT MỐC MỚI</span>
              </button>
            </div>

            {data.timeline.map((item, index) => (
              <div key={item.id} className="cosmic-card p-6 space-y-4 bg-white shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm font-display font-bold text-sky-800">
                    CỘT MỐC #{index + 1}: {item.role}
                  </span>
                  <button
                    onClick={() => handleDeleteTimeline(item.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200"
                    title="Xóa cột mốc"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">CHU KỲ (Vd: 2024 - Hiện tại):</label>
                    <input
                      type="text"
                      value={item.period}
                      onChange={(e) => {
                        const copy = [...data.timeline];
                        copy[index].period = e.target.value;
                        setData({ ...data, timeline: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">VAI TRÒ / CHỨC DANH:</label>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => {
                        const copy = [...data.timeline];
                        copy[index].role = e.target.value;
                        setData({ ...data, timeline: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">TRẠM / VIỆN THIÊN VĂN:</label>
                    <input
                      type="text"
                      value={item.guild}
                      onChange={(e) => {
                        const copy = [...data.timeline];
                        copy[index].guild = e.target.value;
                        setData({ ...data, timeline: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:outline-none focus:border-sky-500 font-mono font-medium"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 font-semibold">MÔ TẢ CHI TIẾT:</label>
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => {
                        const copy = [...data.timeline];
                        copy[index].desc = e.target.value;
                        setData({ ...data, timeline: copy });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-sans leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Certificates */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-base font-display font-bold text-slate-900">
                  DANH MỤC CHỨNG CHỈ ({data.certificates?.length || 0})
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  Quản lý các chứng chỉ chuyên nghiệp, chứng nhận học thuật, AI & công nghệ
                </p>
              </div>
              <button
                onClick={handleAddCertificate}
                className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>THÊM CHỨNG CHỈ MỚI</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.certificates || []).map((cert, index) => (
                <div key={cert.id} className="cosmic-card p-5 space-y-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm font-display font-bold text-purple-800 flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      CHỨNG CHỈ #{index + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteCertificate(cert.id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200 cursor-pointer"
                      title="Xóa chứng chỉ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">TÊN CHỨNG CHỈ:</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const copy = [...(data.certificates || [])];
                          copy[index].name = e.target.value;
                          setData({ ...data, certificates: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-purple-500"
                        placeholder="vd: Deep Learning Specialization / MOS Excel 2016"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">ĐƠN VỊ CẤP:</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const copy = [...(data.certificates || [])];
                            copy[index].issuer = e.target.value;
                            setData({ ...data, certificates: copy });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-purple-500"
                          placeholder="vd: Microsoft, Coursera, DeepLearning.AI"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">NĂM CẤP:</label>
                        <input
                          type="text"
                          value={cert.year}
                          onChange={(e) => {
                            const copy = [...(data.certificates || [])];
                            copy[index].year = e.target.value;
                            setData({ ...data, certificates: copy });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-purple-500"
                          placeholder="vd: 2026"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">ĐƯỜNG DẪN XÁC THỰC (URL - TÙY CHỌN):</label>
                      <input
                        type="text"
                        value={cert.url || ""}
                        onChange={(e) => {
                          const copy = [...(data.certificates || [])];
                          copy[index].url = e.target.value;
                          setData({ ...data, certificates: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-purple-500"
                        placeholder="https://coursera.org/verify/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">MÃ ĐỊNH DANH (CREDENTIAL ID - TÙY CHỌN):</label>
                      <input
                        type="text"
                        value={cert.credentialId || ""}
                        onChange={(e) => {
                          const copy = [...(data.certificates || [])];
                          copy[index].credentialId = e.target.value;
                          setData({ ...data, certificates: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-purple-500"
                        placeholder="vd: CERT-8942-ABC"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Awards */}
        {activeTab === "awards" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-base font-display font-bold text-slate-900">
                  HỆ THỐNG GIẢI THƯỞNG & VINH DANH ({data.awards?.length || 0})
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  Quản lý các giải thưởng Olympic AI, Hackathon, Quốc tế, KHKT và Học thuật
                </p>
              </div>
              <button
                onClick={handleAddAward}
                className="cosmic-btn cosmic-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>THÊM GIẢI THƯỞNG MỚI</span>
              </button>
            </div>

            <div className="space-y-4">
              {(data.awards || []).map((award, index) => (
                <div key={award.id} className="cosmic-card p-5 space-y-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm font-display font-bold text-amber-800 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-600" />
                      GIẢI THƯỞNG #{index + 1}: {award.title}
                    </span>
                    <button
                      onClick={() => handleDeleteAward(award.id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200 cursor-pointer"
                      title="Xóa giải thưởng"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">TÊN GIẢI THƯỞNG:</label>
                      <input
                        type="text"
                        value={award.title}
                        onChange={(e) => {
                          const copy = [...(data.awards || [])];
                          copy[index].title = e.target.value;
                          setData({ ...data, awards: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">NĂM:</label>
                      <input
                        type="text"
                        value={award.year}
                        onChange={(e) => {
                          const copy = [...(data.awards || [])];
                          copy[index].year = e.target.value;
                          setData({ ...data, awards: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">ĐƠN VỊ TỔ CHỨC / ISSUER:</label>
                      <input
                        type="text"
                        value={award.issuer}
                        onChange={(e) => {
                          const copy = [...(data.awards || [])];
                          copy[index].issuer = e.target.value;
                          setData({ ...data, awards: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">NHÃN HUY HIỆU (BADGE):</label>
                      <input
                        type="text"
                        value={award.badge}
                        onChange={(e) => {
                          const copy = [...(data.awards || [])];
                          copy[index].badge = e.target.value;
                          setData({ ...data, awards: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">QUY MÔ / PHÂN LOẠI:</label>
                      <select
                        value={award.category || "Olympic AI"}
                        onChange={(e) => {
                          const copy = [...(data.awards || [])];
                          copy[index].category = e.target.value;
                          setData({ ...data, awards: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-amber-500"
                      >
                        <option value="Olympic AI">Olympic AI</option>
                        <option value="Hackathon & Đổi mới sáng tạo">Hackathon & Đổi mới sáng tạo</option>
                        <option value="Lập trình Quốc tế">Lập trình Quốc tế</option>
                        <option value="Sáng tạo KHKT">Sáng tạo KHKT</option>
                        <option value="Tin học trẻ">Tin học trẻ</option>
                        <option value="Học sinh giỏi">Học sinh giỏi</option>
                        <option value="Học thuật">Học thuật</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">MÔ TẢ CHI TIẾT:</label>
                      <textarea
                        rows={2}
                        value={award.desc || ""}
                        onChange={(e) => {
                          const copy = [...(data.awards || [])];
                          copy[index].desc = e.target.value;
                          setData({ ...data, awards: copy });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-sans focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
