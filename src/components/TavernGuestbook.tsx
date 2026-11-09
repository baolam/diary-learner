"use client";

import React from "react";
import { GuestbookEntry } from "@/types";
import { MessageSquare } from "lucide-react";

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
  const entries = initialEntries || [];

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
            Sổ Lưu Bút
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Những lời nhắn đã có từ trước, trang này không nhận lời nhắn mới nữa
          </p>
        </div>
      </div>

      <div className="cosmic-card p-6 max-h-[480px] overflow-y-auto bg-white shadow-xs">
        <div className="text-xs font-sans text-sky-800 mb-4 border-b border-slate-200 pb-3 flex justify-between items-center font-bold">
          <span>Lời nhắn đã nhận ({entries.length})</span>
        </div>

        <div className="space-y-3.5">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm font-sans">
              Chưa có lời nhắn nào ở đây.
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
    </section>
  );
}
