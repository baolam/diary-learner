"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  Language,
  TranslationData,
  TRANSLATIONS,
  AI_DOMAINS_TRANSLATIONS,
  QUEST_TRANSLATIONS,
  AWARD_TRANSLATIONS,
  TIMELINE_TRANSLATIONS,
} from "@/lib/translations";
import { Profile, Quest, AwardItem, TimelineItem, Skill, CertificateItem } from "@/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationData;
  aiDomains: typeof AI_DOMAINS_TRANSLATIONS["vi"];
  translateProfile: (profile: Profile) => Profile;
  translateQuest: (quest: Quest) => Quest;
  translateAward: (award: AwardItem) => AwardItem;
  translateTimeline: (item: TimelineItem) => TimelineItem;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_language") as Language | null;
      if (saved === "vi" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("portfolio_language", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const nextLang = language === "vi" ? "en" : "vi";
    setLanguage(nextLang);
  };

  const t = useMemo(() => TRANSLATIONS[language], [language]);
  const aiDomains = useMemo(() => AI_DOMAINS_TRANSLATIONS[language], [language]);

  const translateProfile = (profile: Profile): Profile => {
    if (language === "vi") return profile;
    return {
      ...profile,
      title: t.hero.title,
      status: t.statusCard.currentStatusLabel === "Current Status:" ? "Currently diving deeper into computer vision and AI systems on embedded hardware." : profile.status,
      mood: "Studying and researching AI & Computer Vision topics at FPT University HCMC",
      location: t.statusCard.location,
      bio: t.hero.bio,
    };
  };

  const translateQuest = (quest: Quest): Quest => {
    if (language === "vi") return quest;
    const trans = QUEST_TRANSLATIONS[quest.id];
    if (!trans) return quest;
    return {
      ...quest,
      title: trans.title,
      description: trans.description,
      reward: trans.reward || quest.reward,
    };
  };

  const translateAward = (award: AwardItem): AwardItem => {
    if (language === "vi") return award;
    const trans = AWARD_TRANSLATIONS[award.id];
    if (!trans) return award;
    return {
      ...award,
      title: trans.title,
      issuer: trans.issuer,
      badge: trans.badge,
      scope: trans.scope,
      desc: trans.desc,
    };
  };

  const translateTimeline = (item: TimelineItem): TimelineItem => {
    if (language === "vi") return item;
    const trans = TIMELINE_TRANSLATIONS[item.id];
    if (!trans) return item;
    return {
      ...item,
      role: trans.role,
      guild: trans.guild,
      desc: trans.desc,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        aiDomains,
        translateProfile,
        translateQuest,
        translateAward,
        translateTimeline,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
