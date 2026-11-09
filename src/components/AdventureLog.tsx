"use client";

import React from "react";
import { TimelineItem } from "@/types";
import { Calendar, GraduationCap, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  timeline: TimelineItem[];
}

export default function AdventureLog({ timeline }: Props) {
  const { t, translateTimeline } = useLanguage();

  const translatedTimeline = timeline.map(translateTimeline);

  return (
    <section id="timeline-section" className="mb-14 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            {t.timeline.educationTitle}
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            {t.timeline.educationSubtitle}
          </p>
        </div>
      </div>

      <div className="cosmic-card p-6 sm:p-8 relative bg-white shadow-xs">
        {/* Subtle glowing trail line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-emerald-500 hidden sm:block"></div>

        <div className="space-y-6">
          {translatedTimeline.map((item) => (
            <div key={item.id} className="relative sm:pl-12 group">
              {/* Waypoint circle marker */}
              <div className="hidden sm:flex absolute left-4 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-sky-500 items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-125 group-hover:border-indigo-600 transition-all">
                <span className="w-2 h-2 rounded-full bg-sky-500 group-hover:bg-indigo-600 transition-colors"></span>
              </div>

              {/* Waypoint Content Box */}
              <div className="bg-slate-50/90 rounded-xl border border-slate-200 p-5 hover:border-sky-300 transition-all duration-200 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <div className="text-xs font-sans bg-sky-50 border border-sky-200 text-sky-800 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>{item.period}</span>
                  </div>

                  <div className="text-xs font-sans text-slate-700 font-bold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{item.guild}</span>
                  </div>
                </div>

                <h3 className="text-base font-display font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {item.role}
                </h3>

                <p className="text-sm text-slate-700 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
