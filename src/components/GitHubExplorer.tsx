"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GitHubRepo } from "@/types";
import { soundFx } from "@/lib/sound";
import { useLanguage } from "@/context/LanguageContext";
import { GithubIcon } from "./SocialIcons";
import {
  Search,
  Star,
  GitFork,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Calendar,
  Sparkles,
  Layers,
  ArrowUpDown,
  RefreshCw,
  FolderGit2
} from "lucide-react";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export default function GitHubExplorer() {
  const { t, language } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");
  const [copiedRepoId, setCopiedRepoId] = useState<number | null>(null);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github/repos");
      if (!res.ok) throw new Error("Failed to fetch repositories");
      const data = await res.json();
      setRepos(data.repos || []);
    } catch (err: any) {
      setError(err?.message || "Error fetching repositories");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClone = (repo: GitHubRepo) => {
    soundFx.playClick();
    const cmd = `git clone ${repo.cloneUrl}`;
    navigator.clipboard.writeText(cmd);
    setCopiedRepoId(repo.id);
    setTimeout(() => {
      setCopiedRepoId(null);
    }, 2000);
  };

  // Distinct languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs).sort();
  }, [repos]);

  // Filtered & sorted repos
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesQuery =
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          repo.topics.some((tp) => tp.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLang =
          selectedLanguage === "ALL" || repo.language === selectedLanguage;

        return matchesQuery && matchesLang;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stars - a.stars;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [repos, searchQuery, selectedLanguage, sortBy]);

  const totalStars = useMemo(() => {
    return repos.reduce((sum, r) => sum + r.stars, 0);
  }, [repos]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-sky-600 mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-500 font-sans">
              {language === "vi" ? "Tổng kho mã nguồn" : "Public Repos"}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {repos.length > 0 ? `${repos.length}+` : "58+"}
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="text-xs font-semibold text-slate-500 font-sans">
              {language === "vi" ? "Tổng sao GitHub" : "Total Stars"}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {totalStars}
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Code2 className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-500 font-sans">
              {language === "vi" ? "Ngôn ngữ cốt lõi" : "Primary Stack"}
            </span>
          </div>
          <div className="text-sm sm:text-base font-bold font-display text-slate-900 truncate">
            Python, C++, TS
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-500 font-sans">
              {language === "vi" ? "GitHub của mình" : "My GitHub"}
            </span>
          </div>
          <a
            href="https://github.com/baolam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold font-sans text-sky-700 hover:underline flex items-center gap-1 truncate"
          >
            <span>@baolam</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>
      </div>

      {/* Control Bar: Search, Language Filter, Sort */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.projects.searchRepoPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-sans"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-sans hidden sm:inline">
              {language === "vi" ? "Sắp xếp:" : "Sort:"}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-2.5 py-2 font-sans font-medium focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="updated">
                {language === "vi" ? "Mới cập nhật" : "Recently Updated"}
              </option>
              <option value="stars">
                {language === "vi" ? "Nhiều sao nhất" : "Most Stars"}
              </option>
              <option value="name">
                {language === "vi" ? "Tên (A-Z)" : "Name (A-Z)"}
              </option>
            </select>

            <button
              onClick={() => {
                soundFx.playClick();
                fetchRepos();
              }}
              title={language === "vi" ? "Làm mới dữ liệu từ GitHub" : "Refresh from GitHub"}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer border border-slate-200"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs font-sans">
          <span className="text-slate-400 text-xs mr-1 hidden sm:inline">
            {language === "vi" ? "Ngôn ngữ:" : "Stack:"}
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedLanguage("ALL");
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              selectedLanguage === "ALL"
                ? "bg-sky-700 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {t.projects.filterAllLangs} ({repos.length})
          </button>
          {availableLanguages.map((lang) => {
            const count = repos.filter((r) => r.language === lang).length;
            const dotColor = LANGUAGE_COLORS[lang] || "#888";
            return (
              <button
                key={lang}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedLanguage(lang);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLanguage === lang
                    ? "bg-sky-700 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dotColor }}
                />
                <span>{lang}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && repos.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs animate-pulse space-y-3"
            >
              <div className="h-5 bg-slate-200 rounded-md w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded-md w-full"></div>
              <div className="h-4 bg-slate-100 rounded-md w-2/3"></div>
              <div className="pt-3 border-t border-slate-100 flex justify-between">
                <div className="h-4 bg-slate-100 rounded-md w-20"></div>
                <div className="h-4 bg-slate-100 rounded-md w-16"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => {
          const langColor = repo.language
            ? LANGUAGE_COLORS[repo.language] || "#64748b"
            : "#64748b";
          const isCopied = copiedRepoId === repo.id;

          return (
            <div
              key={repo.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Repo Name & Stars */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-sky-700 transition-colors flex items-center gap-1.5 break-all leading-snug"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    <span>{repo.name}</span>
                  </a>

                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex-shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{repo.stars}</span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 font-sans line-clamp-3 leading-relaxed mb-4">
                  {repo.description ||
                    (language === "vi"
                      ? "Kho mã nguồn công khai trên GitHub."
                      : "Public open-source repository on GitHub.")}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 4).map((tp) => (
                      <span
                        key={tp}
                        className="text-[10px] font-sans bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md font-medium"
                      >
                        #{tp}
                      </span>
                    ))}
                    {repo.topics.length > 4 && (
                      <span className="text-[10px] font-sans text-slate-400 self-center">
                        +{repo.topics.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans">
                  {repo.language ? (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColor }}
                      />
                      <span className="font-medium text-slate-700">
                        {repo.language}
                      </span>
                    </div>
                  ) : (
                    <span>-</span>
                  )}

                  <div className="flex items-center gap-1 text-slate-400" title={t.projects.lastUpdated}>
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(repo.updatedAt)}</span>
                  </div>
                </div>

                {/* Buttons: Copy Clone & Open GitHub */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => handleCopyClone(repo)}
                    className="flex-1 py-1.5 px-2.5 text-xs rounded-lg font-sans font-medium transition-colors flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer"
                    title={t.projects.copyClone}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold text-[11px]">
                          {t.projects.copied}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[11px]">git clone</span>
                      </>
                    )}
                  </button>

                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playStarChime()}
                    className="py-1.5 px-3 text-xs rounded-lg font-sans font-medium transition-colors flex items-center justify-center gap-1 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 cursor-pointer"
                  >
                    <span>{t.projects.viewOnGithub}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && filteredRepos.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 font-sans shadow-xs">
          <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">
            {t.projects.noReposFound}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {language === "vi"
              ? "Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc ngôn ngữ."
              : "Try searching with different keywords or clearing the language filter."}
          </p>
        </div>
      )}
    </div>
  );
}
