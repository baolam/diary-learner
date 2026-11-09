import { NextResponse } from "next/server";
import { GitHubRepo } from "@/types";

// Static fallback data in case GitHub API is unreachable or rate limited
const FALLBACK_REPOS: Partial<GitHubRepo>[] = [
  {
    id: 1,
    name: "attention-is-all-you-need-build-the-transformer-from-scratch",
    fullName: "baolam/attention-is-all-you-need-build-the-transformer-from-scratch",
    description: "Reimplement the original encoder-decoder Transformer end to end in PyTorch, from token vocabularies and sinusoidal positional encodings through multi-head attention, label smoothing, Noam scheduling, and beam search.",
    htmlUrl: "https://github.com/baolam/attention-is-all-you-need-build-the-transformer-from-scratch",
    cloneUrl: "https://github.com/baolam/attention-is-all-you-need-build-the-transformer-from-scratch.git",
    language: "Python",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-10-06T17:32:40Z",
    topics: ["deep-learning", "pytorch", "transformer", "nlp", "self-attention"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 2,
    name: "boat-project-with-background-substraction",
    fullName: "baolam/boat-project-with-background-substraction",
    description: "Autonomous surface vehicle system for water monitoring and surface waste collection using computer vision, YOLO, and background subtraction.",
    htmlUrl: "https://github.com/baolam/boat-project-with-background-substraction",
    cloneUrl: "https://github.com/baolam/boat-project-with-background-substraction.git",
    language: "Python",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-09-15T10:20:00Z",
    topics: ["computer-vision", "yolo", "raspberry-pi", "iot", "arduino"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 3,
    name: "vehicle-speed-estimation",
    fullName: "baolam/vehicle-speed-estimation",
    description: "Computer vision system for real-time vehicle speed estimation and traffic surveillance using YOLOv8, ByteTrack, and perspective transformation.",
    htmlUrl: "https://github.com/baolam/vehicle-speed-estimation",
    cloneUrl: "https://github.com/baolam/vehicle-speed-estimation.git",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-09-20T14:15:00Z",
    topics: ["computer-vision", "traffic-monitoring", "yolov8", "tracking", "deep-learning"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 4,
    name: "noise-detector",
    fullName: "baolam/noise-detector",
    description: "Real-time environmental noise monitoring and automated chainsaw/deforestation audio classification system using CNN on Mel-Spectrogram and LoRa.",
    htmlUrl: "https://github.com/baolam/noise-detector",
    cloneUrl: "https://github.com/baolam/noise-detector.git",
    language: "Python",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-10T08:30:00Z",
    topics: ["audio-classification", "lora", "iot", "edge-ai", "raspberry-pi"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 5,
    name: "c_plus_plus_exercise",
    fullName: "baolam/c_plus_plus_exercise",
    description: "Comprehensive C++ data structures, algorithms, and competitive programming solutions (VNOI, Codeforces, LeetCode).",
    htmlUrl: "https://github.com/baolam/c_plus_plus_exercise",
    cloneUrl: "https://github.com/baolam/c_plus_plus_exercise.git",
    language: "C++",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-09-01T12:00:00Z",
    topics: ["cpp", "algorithms", "data-structures", "competitive-programming"],
    isFork: false,
    defaultBranch: "master",
  },
  {
    id: 6,
    name: "graph-attention-classification",
    fullName: "baolam/graph-attention-classification",
    description: "Research and implementation of Graph Attention Networks (GAT) for node and graph classification using PyTorch Geometric.",
    htmlUrl: "https://github.com/baolam/graph-attention-classification",
    cloneUrl: "https://github.com/baolam/graph-attention-classification.git",
    language: "Python",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-25T16:45:00Z",
    topics: ["graph-neural-networks", "gat", "pytorch", "deep-learning", "gnn"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 7,
    name: "topic-detection-tracking-demo",
    fullName: "baolam/topic-detection-tracking-demo",
    description: "Dynamic Topic Detection & Tracking on Social Streams using SADStream (Adaptive Decay & Compressed Memory).",
    htmlUrl: "https://github.com/baolam/topic-detection-tracking-demo",
    cloneUrl: "https://github.com/baolam/topic-detection-tracking-demo.git",
    language: "Python",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-09-18T11:20:00Z",
    topics: ["nlp", "topic-detection", "clustering", "stream-mining", "social-streams"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 8,
    name: "intelligent-drug",
    fullName: "baolam/intelligent-drug",
    description: "Smart medication dispenser integrating patient facial recognition with DeepFace, real-time schedule alerts, and Arduino IoT actuators.",
    htmlUrl: "https://github.com/baolam/intelligent-drug",
    cloneUrl: "https://github.com/baolam/intelligent-drug.git",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-07-14T09:10:00Z",
    topics: ["face-recognition", "iot", "arduino", "healthcare-ai"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 9,
    name: "fungi-aiot-management",
    fullName: "baolam/fungi-aiot-management",
    description: "AIoT-based automated monitoring and management system for smart mushroom farming with environmental sensor telemetry.",
    htmlUrl: "https://github.com/baolam/fungi-aiot-management",
    cloneUrl: "https://github.com/baolam/fungi-aiot-management.git",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-06-20T15:30:00Z",
    topics: ["aiot", "smart-farming", "sensors", "iot"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 10,
    name: "deep-ml",
    fullName: "baolam/deep-ml",
    description: "My machine learning practice from Deep-ML: solutions, explanations, and Python implementations.",
    htmlUrl: "https://github.com/baolam/deep-ml",
    cloneUrl: "https://github.com/baolam/deep-ml.git",
    language: "Python",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-10-01T08:00:00Z",
    topics: ["machine-learning", "deep-learning", "python", "algorithms"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 11,
    name: "conveyor-belt-project",
    fullName: "baolam/conveyor-belt-project",
    description: "Automated smart conveyor belt system with deep learning defect detection and PLC/Arduino sorting.",
    htmlUrl: "https://github.com/baolam/conveyor-belt-project",
    cloneUrl: "https://github.com/baolam/conveyor-belt-project.git",
    language: "C++",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-05-12T13:40:00Z",
    topics: ["embedded", "computer-vision", "arduino", "automation"],
    isFork: false,
    defaultBranch: "main",
  },
  {
    id: 12,
    name: "device-for-blind-people",
    fullName: "baolam/device-for-blind-people",
    description: "Assistive wearable device for visually impaired individuals using AI edge vision and ultrasonic sensing.",
    htmlUrl: "https://github.com/baolam/device-for-blind-people",
    cloneUrl: "https://github.com/baolam/device-for-blind-people.git",
    language: "C++",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-04-18T10:15:00Z",
    topics: ["assistive-tech", "edge-ai", "sensors", "arduino"],
    isFork: false,
    defaultBranch: "main",
  },
];

// In-memory cache
let cachedRepos: GitHubRepo[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export async function GET(req: Request) {
  const url = new URL(req.url);
  const includeForks = url.searchParams.get("includeForks") === "true";
  const now = Date.now();

  // Return memory cached data if valid
  if (cachedRepos && now - lastFetchTime < CACHE_DURATION_MS) {
    const filtered = includeForks ? cachedRepos : cachedRepos.filter((r) => !r.isFork);
    return NextResponse.json({
      source: "cache",
      total: filtered.length,
      repos: filtered,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Baolam-Portfolio-App",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch("https://api.github.com/users/baolam/repos?per_page=100&sort=updated", {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const rawData = await res.json();

    const formattedRepos: GitHubRepo[] = (rawData || []).map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      cloneUrl: repo.clone_url || `https://github.com/${repo.full_name}.git`,
      language: repo.language,
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      openIssues: repo.open_issues_count ?? 0,
      updatedAt: repo.updated_at,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      isFork: Boolean(repo.fork),
      defaultBranch: repo.default_branch || "main",
    }));

    cachedRepos = formattedRepos;
    lastFetchTime = now;

    const filtered = includeForks ? formattedRepos : formattedRepos.filter((r) => !r.isFork);

    return NextResponse.json({
      source: "live",
      total: filtered.length,
      repos: filtered,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn("Falling back to pre-cached repository list:", error);

    const fallbackList = (FALLBACK_REPOS as GitHubRepo[]).filter(
      (r) => includeForks || !r.isFork
    );

    return NextResponse.json({
      source: "fallback",
      total: fallbackList.length,
      repos: fallbackList,
    });
  }
}
