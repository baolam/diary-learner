"use client";

import React, { useState } from "react";
import { GuestbookEntry } from "@/types";
import { soundFx } from "@/lib/sound";
import confetti from "canvas-confetti";
import { MessageSquare, Send, Radio } from "lucide-react";

interface Props {
  initialEntries: GuestbookEntry[];
}

const COSMIC_AVATARS = [
  { id: "astronaut", label: "Người học AI", icon: "👨‍💻" },
  { id: "alien", label: "Người đọc", icon: "📖" },
  { id: "rover", label: "Giảng viên / Mentor", icon: "🎓" },
  { id: "satellite", label: "Lập trình viên", icon: "🚀" },
  { id: "space_cat", label: "Bạn bè", icon: "🐱" },
];

export default function TavernGuestbook({ initialEntries }: Props) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries || []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("astronaut");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatar, message }),
      });

      const json = await res.json();
      if (res.ok && json.entry) {
        soundFx.playLevelUp();
        try {
          confetti({
            particleCount: 35,
            spread: 70,
            origin: { y: 0.8 },
            colors: ["#0284c7", "#4f46e5", "#10b981"],
          });
        } catch {}

        setEntries([json.entry, ...entries]);
        setMessage("");
        setFeedback("Đã gửi lời nhắn thành công tới Lâm! Cảm ơn bạn rất nhiều.");
      } else {
        setFeedback(json.error || "Có lỗi xảy ra khi gửi lời nhắn");
      }
    } catch {
      setFeedback("Mất kết nối với máy chủ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvatarIcon = (avId: string) => {
    const match = COSMIC_AVATARS.find((a) => a.id === avId);
    return match ? match.icon : "👨‍💻";
  };

  return (
    <section id="guestbook-section" className="mb-14 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            Sổ Lưu Bút & Kết Nối
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Để lại lời nhắn hoặc lời chào tới Nguyễn Đức Bảo Lâm
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Guestbook Form */}
        <div className="lg:col-span-5 cosmic-card p-6 bg-white shadow-xs">
          <h3 className="text-sm font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-600" />
            <span>Gửi lời nhắn mới</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-800 mb-1.5 font-bold font-sans">
                Tên của bạn:
              </label>
              <input
                type="text"
                required
                maxLength={40}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-800 mb-2 font-bold font-sans">
                Vai trò của bạn:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COSMIC_AVATARS.map((av) => (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => {
                      soundFx.playClick();
                      setAvatar(av.id);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      avatar === av.id
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-slate-100 border border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span>{av.icon}</span>
                    <span>{av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-800 mb-1.5 font-bold font-sans">
                Nội dung lời nhắn:
              </label>
              <textarea
                required
                rows={3}
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Góp ý, câu hỏi hoặc lời chúc tới Lâm..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 font-sans resize-none"
              />
            </div>

            {feedback && (
              <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg font-sans font-medium">
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="cosmic-btn cosmic-btn-primary w-full py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 rounded-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Đang gửi..." : "Gửi lời nhắn"}</span>
            </button>
          </form>
        </div>

        {/* Transmission Log List */}
        <div className="lg:col-span-7 cosmic-card p-6 max-h-[480px] overflow-y-auto bg-white shadow-xs">
          <div className="text-xs font-sans text-sky-800 mb-4 border-b border-slate-200 pb-3 flex justify-between items-center font-bold">
            <span>Lời nhắn đã nhận ({entries.length})</span>
          </div>

          <div className="space-y-3.5">
            {entries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-sans">
                Chưa có lời nhắn nào. Hãy là người đầu tiên để lại lời chào nhé!
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-slate-50/90 rounded-xl border border-slate-200 p-4 flex items-start gap-3.5 hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                    {getAvatarIcon(entry.avatar)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-display font-bold text-slate-900 truncate">
                        {entry.name}
                      </span>
                      <span className="text-[11px] font-sans text-slate-500">
                        {new Date(entry.timestamp).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    <p className="text-sm text-slate-800 font-sans leading-relaxed break-words">
                      {entry.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
