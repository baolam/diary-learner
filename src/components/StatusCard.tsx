"use client";

import React from "react";
import { Profile } from "@/types";
import { soundFx } from "@/lib/sound";
import { GithubIcon, LinkedinIcon, LeetCodeIcon, DeepMLIcon } from "./SocialIcons";
import { Mail, Compass, BrainCircuit, GraduationCap, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  profile: Profile;
}

export default function StatusCard({ profile }: Props) {
  const { t, language } = useLanguage();

  const displayBio = language === "en" ? t.hero.bio : profile.bio;
  const displayLocation = language === "en" ? t.statusCard.location : profile.location;
  const displayStatus =
    language === "en"
      ? "Currently diving deeper into computer vision and AI systems on embedded hardware."
      : profile.status;

  return (
    <div id="contact" className="mb-12 scroll-mt-24">
      {/* Profile & Contact Card */}
      <div className="cosmic-card p-6 sm:p-7">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-slate-900">
                {t.statusCard.cardTitle}
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                {t.statusCard.cardSubtitle}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-800 leading-relaxed mb-6 font-sans">
          {displayBio}
        </p>

        {/* Location & Academic Badges */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs mb-6 font-sans">
          <div className="flex items-center gap-2 text-sky-900 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg font-medium">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>{t.statusCard.school}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            <span>{displayLocation}</span>
          </div>
        </div>

        {/* Live Observation Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-sans font-semibold mb-1">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.statusCard.currentStatusLabel}</span>
          </div>
          <div className="text-sm text-slate-800 font-sans font-medium flex items-center gap-2.5">
            <span>{displayStatus}</span>
          </div>
        </div>

        {/* Social Comms & Coding Platforms Links */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-200">
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-lg font-medium text-slate-800"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-800" />
              <span>GitHub</span>
            </a>
          )}
          {profile.socials.leetcode && (
            <a
              href={profile.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-lg font-medium text-amber-800 hover:border-amber-400 bg-amber-50/50"
              title="LeetCode Profile: https://leetcode.com/u/lam01662052827/"
            >
              <LeetCodeIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>LeetCode</span>
            </a>
          )}
          {profile.socials.deepml && (
            <a
              href={profile.socials.deepml}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-lg font-medium text-indigo-800 hover:border-indigo-400 bg-indigo-50/50"
              title="Deep-ML Solutions & Practice: https://baolam.github.io/deep-ml/"
            >
              <DeepMLIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Deep-ML</span>
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-lg font-medium text-blue-700"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>
          )}
          {profile.socials.email && (
            <a
              href={`mailto:${profile.socials.email}`}
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-primary px-3.5 py-1.5 text-xs flex items-center gap-1.5 rounded-lg font-medium shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{language === "vi" ? "Email" : "Email"}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
