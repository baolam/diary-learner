"use client";

import React, { useState } from "react";
import { Quest } from "@/types";
import { soundFx } from "@/lib/sound";
import { GithubIcon } from "./SocialIcons";
import {
  X,
  ExternalLink,
  BrainCircuit,
  Trophy,
  CheckCircle2,
  Bookmark,
  Tag,
  Copy,
  Check,
  Code2,
  GitBranch,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  quest: Quest | null;
  onClose: () => void;
}

export default function DialogueModal({ quest, onClose }: Props) {
  const { t, translateQuest, language } = useLanguage();
  const [copiedClone, setCopiedClone] = useState<boolean>(false);

  if (!quest) return null;

  const currentQuest = translateQuest(quest);

  const cloneUrl = quest.githubUrl
    ? (quest.githubUrl.endsWith(".git") ? quest.githubUrl : `${quest.githubUrl}.git`)
    : `https://github.com/baolam/${quest.repoName || "project"}.git`;

  const handleCopyClone = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
          title={t.projects.modalCloseBtn}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-sans text-sky-800 flex items-center gap-1.5 font-semibold mb-1">
              <span>{t.projects.modalTitle}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug">
              {currentQuest.title}
            </h2>
          </div>
        </div>

        {/* Highlight / Achievement Banner */}
        {currentQuest.reward && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-5">
            <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>{currentQuest.reward}</span>
          </div>
        )}

        {/* Problem & Solution Briefing */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-5">
          <div className="text-xs font-sans text-slate-800 font-bold mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>{t.projects.modalDescLabel}</span>
          </div>
          <p className="text-sm text-slate-800 font-sans leading-relaxed">
            {currentQuest.description}
          </p>
        </div>

        {/* Technology Stack Tags */}
        <div className="mb-5">
          <div className="text-xs font-sans text-slate-600 mb-2.5 font-semibold flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.projects.modalTechStack}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentQuest.tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-lg text-xs font-sans font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quest Citations & Verified Press References */}
        {currentQuest.citations && currentQuest.citations.length > 0 && (
          <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-sans text-slate-800 font-bold mb-2.5 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <span>{t.projects.modalCitationsLabel}</span>
            </div>
            <div className="space-y-2">
              {currentQuest.citations.map((cite, i) => (
                <a
                  key={i}
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center justify-between gap-3 text-xs p-3 rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-colors group"
                >
                  <div className="flex-1">
                    <span className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors block">
                      {cite.title}
                    </span>
                    <span className="text-slate-500 font-sans block text-[11px] mt-0.5">
                      {language === "vi" ? "Cơ quan / Đơn vị:" : "Publisher / Organization:"} {cite.publisher}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Repository Live Card & Quick Clone */}
        {quest.githubUrl && (
          <div className="mb-6 bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-white" />
                <span className="text-xs font-sans font-bold text-slate-200">
                  {t.projects.repoDetails}
                </span>
              </div>
              {quest.repoName && (
                <span className="text-[11px] font-mono text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2 py-0.5 rounded">
                  baolam/{quest.repoName}
                </span>
              )}
            </div>

            {/* Git Clone Command Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center gap-2 overflow-x-auto text-slate-300">
                <span className="text-emerald-400 select-none">$</span>
                <span className="whitespace-nowrap select-all">git clone {cloneUrl}</span>
              </div>
              <button
                onClick={handleCopyClone}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans font-medium transition-colors cursor-pointer flex-shrink-0"
                title={t.projects.copyClone}
              >
                {copiedClone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">{t.projects.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{language === "vi" ? "Sao chép" : "Copy"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t border-slate-200">
          {currentQuest.githubUrl && (
            <a
              href={quest.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="cosmic-btn cosmic-btn-secondary px-4 py-2 text-xs rounded-xl flex items-center gap-2 font-medium text-slate-800"
            >
              <GithubIcon className="w-4 h-4 text-slate-800" />
              <span>{t.projects.modalGithubBtn}</span>
            </a>
          )}

          {currentQuest.liveUrl && (
            <a
              href={quest.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playStarChime()}
              className="cosmic-btn cosmic-btn-primary px-5 py-2 text-xs rounded-xl flex items-center gap-2 font-medium shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.projects.modalLiveBtn}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
