export interface Profile {
  name: string;
  title: string;
  avatar: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  gold: number;
  status: string;
  mood: string;
  location: string;
  phone?: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    facebook?: string;
    discord?: string;
    leetcode?: string;
    deepml?: string;
  };
  stats: {
    projectsCompleted: number;
    cupsOfCoffee: number;
    linesOfCode: string;
    bugsSquashed: number;
  };
}

export interface CitationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  summary: string;
  category: "Báo chí chính thống" | "Học thuật & Nghiên cứu";
  badge?: string;
  featured?: boolean;
}

export interface QuestCitation {
  title: string;
  url: string;
  publisher: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  cloneUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
  topics: string[];
  isFork: boolean;
  defaultBranch?: string;
}

export interface Quest {
  id: string;
  title: string;
  type: "Boss Quest" | "Main Quest" | "Side Quest";
  description: string;
  tags: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "LEGENDARY";
  stars: number;
  liveUrl?: string;
  githubUrl?: string;
  repoName?: string;
  repoStats?: {
    stars?: number;
    forks?: number;
    language?: string;
  };
  image?: string;
  featured: boolean;
  reward?: string;
  citations?: QuestCitation[];
}

export interface Skill {
  name: string;
  category: string;
  icon: string;
  usedIn: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  guild: string;
  desc: string;
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  badge: string;
  category?: string;
  scope?: "Quốc tế" | "Quốc gia" | "Cấp tỉnh" | "Học thuật" | string;
  desc?: string;
  articleUrl?: string;
}

export interface CertificateItem {
  id: string;
  year: string;
  name: string;
  issuer: string;
  url?: string;
  pdfUrl?: string;
  credentialId?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  avatar: string;
  message: string;
  timestamp: string;
}

export interface PortfolioData {
  profile: Profile;
  quests: Quest[];
  skills: Skill[];
  timeline: TimelineItem[];
  awards?: AwardItem[];
  certificates?: CertificateItem[];
  citations?: CitationItem[];
  guestbook: GuestbookEntry[];
}
