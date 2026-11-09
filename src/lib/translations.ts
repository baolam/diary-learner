export type Language = "vi" | "en";

export interface TranslationData {
  nav: {
    overview: string;
    projects: string;
    awards: string;
    certificates: string;
    skills: string;
    about: string;
    home: string;
    breadcrumbPrefix: string;
    soundOn: string;
    soundOff: string;
  };
  hero: {
    target: string;
    school: string;
    portfolioBadge: string;
    name: string;
    title: string;
    bio: string;
    award1_title: string;
    award1_desc: string;
    award2_title: string;
    award2_desc: string;
    btn_projects: string;
    btn_skills: string;
    research_title: string;
    clickToRotate: string;
    activeDomainBadge: string;
    keyTechLabel: string;
  };
  statusCard: {
    cardTitle: string;
    cardSubtitle: string;
    school: string;
    location: string;
    currentStatusLabel: string;
    currentFocusLabel: string;
    technicalHighlights: string;
    emailLabel: string;
    phoneLabel: string;
    githubLabel: string;
    contactAction: string;
  };
  projects: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    featuredTitle: string;
    featuredSubtitle: string;
    viewAllBtn: string;
    viewProjectBtn: string;
    modalTitle: string;
    modalDescLabel: string;
    modalCitationsLabel: string;
    modalTechStack: string;
    modalGithubBtn: string;
    modalLiveBtn: string;
    modalCloseBtn: string;
    difficultyLabel: string;
    allProjectsBadge: string;
    repoDetails: string;
    copyClone: string;
    copied: string;
  };
  awards: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    filterAIIntl: string;
    filterAcademic: string;
    filterScience: string;
    citationSectionTitle: string;
    citationSectionSubtitle: string;
    citationFilterAll: string;
    citationFilterPress: string;
    citationFilterAcademic: string;
    viewArticle: string;
    verifiedBadge: string;
    officialPressLabel: string;
    totalAwardsFound: string;
    noAwardsFound: string;
  };
  certificates: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    credentialId: string;
    viewCertBtn: string;
    certifiedBy: string;
    issuedYear: string;
  };
  skills: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    filterAll: string;
    usedInLabel: string;
  };
  timeline: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    educationTitle: string;
    educationSubtitle: string;
  };
  guestbook: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    copyright: string;
    builtWith: string;
    backToTop: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  vi: {
    nav: {
      overview: "Tổng Quan",
      projects: "Dự Án AI",
      awards: "Giải Thưởng",
      certificates: "Chứng Chỉ",
      skills: "Kỹ Năng",
      about: "Tiểu Sử & Học Vấn",
      home: "Trang Chủ",
      breadcrumbPrefix: "Trang Chủ",
      soundOn: "Bật âm thanh không gian",
      soundOff: "Tắt âm thanh",
    },
    hero: {
      target: "Đang học: Computer Vision & Edge AI",
      school: "Đại học FPT TP.HCM, Chuyên ngành Trí tuệ nhân tạo",
      portfolioBadge: "Nhật Ký Học Tập Cá Nhân",
      name: "Nguyễn Đức Bảo Lâm",
      title: "Sinh viên ngành Trí Tuệ Nhân Tạo (AI), Đại học FPT TP.HCM",
      bio: "Tôi mê công nghệ từ năm cấp hai, khi lần đầu tự lắp một mạch Arduino và thấy nó thực sự chạy. Đến giờ, học năm 3 ngành Trí tuệ nhân tạo tại Đại học FPT TP.HCM, cảm giác đó vẫn không đổi. Tôi thích nhất là lúc một mô hình mình huấn luyện xong chạy được thật, trên một con Raspberry Pi hay Arduino ngoài đời, không chỉ nằm trên giấy. Hầu hết dự án của tôi bắt đầu từ một chuyện rất cụ thể quanh mình, như kẹt xe ở thành phố, rừng bị phá, hay rác trôi trên mặt nước, và tôi theo nó đến cùng, từ một ý tưởng đến một hệ thống chạy được, có đo kết quả thật.",
      award1_title: "Giải Ba Olympic AI Miền Nam 2026",
      award1_desc: "Xếp hạng Rank 44/191 thí sinh & đội thi",
      award2_title: "Giải Vô Địch Quốc Tế 2022",
      award2_desc: "Coolest Projects Malaysia (Raspberry Pi Foundation)",
      btn_projects: "Xem Các Dự Án",
      btn_skills: "Xem Kỹ Năng Kỹ Thuật",
      research_title: "Lĩnh Vực Nghiên Cứu & Kỹ Thuật",
      clickToRotate: "Nhấp để chuyển lĩnh vực nghiên cứu",
      activeDomainBadge: "Trọng tâm nghiên cứu hiện tại",
      keyTechLabel: "Công nghệ cốt lõi",
    },
    statusCard: {
      cardTitle: "Thông Tin Cá Nhân & Liên Hệ",
      cardSubtitle: "Vài dòng về mình và cách liên hệ nếu bạn muốn nói chuyện",
      school: "Sinh viên AI, Đại học FPT TP.HCM",
      location: "TP. Thủ Đức, TP. Hồ Chí Minh",
      currentStatusLabel: "Trạng Thái Hiện Tại:",
      currentFocusLabel: "Mối Quan Tâm Nghiên Cứu:",
      technicalHighlights: "Trọng Tâm Chuyên Môn:",
      emailLabel: "Email Liên Hệ",
      phoneLabel: "Số Điện Thoại",
      githubLabel: "Hồ Sơ GitHub",
      contactAction: "Gửi Email Trao Đổi",
    },
    projects: {
      badge: "Danh Mục Dự Án Kỹ Thuật",
      pageTitle: "Dự Án Trí Tuệ Nhân Tạo & Hệ Thống Nhúng",
      pageSubtitle: "Đây là những dự án mình đã tự tay làm, từ lúc còn là một ý tưởng đến khi chạy được thật. Một vài trong số đó mình mang đi thi và có kết quả, nhưng phần mình thích nhất vẫn là quá trình làm ra nó.",
      featuredTitle: "Dự Án Tiêu Biểu",
      featuredSubtitle: "Vài dự án mình dành nhiều thời gian nhất, và thấy tự hào nhất khi nhìn lại",
      viewAllBtn: "Xem Tất Cả Dự Án",
      viewProjectBtn: "Xem Chi Tiết Dự Án",
      modalTitle: "Thông tin chi tiết dự án",
      modalDescLabel: "Mô tả chi tiết dự án:",
      modalCitationsLabel: "Báo chí & tài liệu minh chứng:",
      modalTechStack: "Công nghệ sử dụng:",
      modalGithubBtn: "Xem mã nguồn",
      modalLiveBtn: "Đọc thêm",
      modalCloseBtn: "Đóng cửa sổ",
      difficultyLabel: "Độ khó:",
      allProjectsBadge: "Dự án thực tế",
      repoDetails: "Thông Tin Kho Lưu Trữ GitHub",
      copyClone: "Sao chép lệnh clone",
      copied: "Đã sao chép!",
    },
    awards: {
      badge: "Thành Tích & Vinh Danh",
      pageTitle: "Thành Tích, Giải Thưởng & Hoạt Động Khen Thưởng",
      pageSubtitle: "Một vài cột mốc mình nhớ nhất trên đường đi, từ những cuộc thi thời học sinh đến Olympic AI và VEDC gần đây, kèm link báo chí để ai muốn kiểm chứng đều xem được.",
      searchPlaceholder: "Tìm kiếm giải thưởng theo tên cuộc thi, năm, giải...",
      filterAll: "Tất cả giải thưởng",
      filterAIIntl: "Olympic AI & Quốc tế",
      filterAcademic: "Học thuật ĐH FPT",
      filterScience: "Sáng tạo KHKT & Tin học",
      citationSectionTitle: "Báo Chí Đã Đưa Tin",
      citationSectionSubtitle: "Vài bài báo đã viết về các dự án và giải thưởng mình kể ở trên",
      citationFilterAll: "Tất cả bài báo",
      citationFilterPress: "Báo chí chính thống",
      citationFilterAcademic: "Học thuật & Trường ĐH",
      viewArticle: "Đọc bài báo",
      verifiedBadge: "Có nguồn",
      officialPressLabel: "Báo chí đưa tin",
      totalAwardsFound: "giải thưởng & thành tích được ghi nhận",
      noAwardsFound: "Không tìm thấy giải thưởng phù hợp với từ khóa.",
    },
    certificates: {
      badge: "Chứng Chỉ",
      pageTitle: "Chứng Chỉ Chuyên Môn & Năng Lực Quốc Tế",
      pageSubtitle: "Đây là những khóa học mình tự học thêm ngoài giờ trên lớp, mỗi chứng chỉ đều có mã xác thực riêng nếu bạn muốn kiểm tra lại.",
      credentialId: "Mã chứng chỉ:",
      viewCertBtn: "Xem chứng chỉ",
      certifiedBy: "Đơn vị cấp:",
      issuedYear: "Năm cấp:",
    },
    skills: {
      badge: "Năng Lực Chuyên Môn",
      pageTitle: "Bộ Kỹ Năng Kỹ Thuật & Công Nghệ",
      pageSubtitle: "Đây là những công cụ mình đã dùng thật trong các dự án ở trên, không phải danh sách mình chỉ mới đọc qua.",
      filterAll: "Tất cả kỹ năng",
      usedInLabel: "Dùng trong các dự án:",
    },
    timeline: {
      badge: "Học Vấn & Hành Trình Phát Triển",
      pageTitle: "Học Vấn & Dấu Mốc Phát Triển Bản Thân",
      pageSubtitle: "Chặng đường từ một học sinh cấp 3 tò mò với mạch điện, đến sinh viên AI bây giờ.",
      educationTitle: "Học Vấn & Quá Trình Phát Triển",
      educationSubtitle: "Những dấu mốc mình nhớ nhất, theo thứ tự thời gian",
    },
    guestbook: {
      title: "Sổ Lưu Niệm",
      subtitle: "Để lại lời nhắn hoặc góp ý nếu bạn tình cờ đọc đến đây",
      namePlaceholder: "Họ và tên của bạn *",
      messagePlaceholder: "Lời nhắn, câu hỏi hoặc góp ý của bạn *",
      submitBtn: "Gửi Lời Nhắn",
      submittingBtn: "Đang gửi...",
      successMessage: "Đã gửi lời nhắn thành công! Cảm ơn bạn rất nhiều.",
      errorMessage: "Không thể gửi tin nhắn. Vui lòng thử lại sau.",
    },
    footer: {
      copyright: "© 2026 Nguyễn Đức Bảo Lâm. Nhật ký học tập cá nhân.",
      builtWith: "Phát triển với Next.js 16, TypeScript & Tailwind CSS.",
      backToTop: "Lên đầu trang",
    },
  },
  en: {
    nav: {
      overview: "Overview",
      projects: "AI Projects",
      awards: "Awards",
      certificates: "Certificates",
      skills: "Skills",
      about: "About & Education",
      home: "Home",
      breadcrumbPrefix: "Home",
      soundOn: "Enable Ambient Audio",
      soundOff: "Mute Audio",
    },
    hero: {
      target: "Currently learning: Computer Vision & Edge AI",
      school: "FPT University HCMC, Artificial Intelligence major",
      portfolioBadge: "Personal Learning Journal",
      name: "Nguyen Duc Bao Lam",
      title: "Artificial Intelligence Student, FPT University HCMC",
      bio: "I've been into technology since middle school, when I first wired up an Arduino circuit and watched it actually work. I'm now in my third year studying Artificial Intelligence at FPT University HCMC, and that feeling hasn't changed. What I enjoy most is seeing a model I trained actually run, on a real Raspberry Pi or Arduino, not just on paper. Most of my projects start from something specific around me, like traffic jams in the city, forests being cut down, or trash floating on the water, and I follow it through, from an idea to a working system with results I can measure.",
      award1_title: "3rd Prize - Southern AI Olympiad 2026",
      award1_desc: "Rank 44/191 national teams and competitors",
      award2_title: "International Champion 2022",
      award2_desc: "Coolest Projects Malaysia (Raspberry Pi Foundation)",
      btn_projects: "View Projects",
      btn_skills: "View Technical Skills",
      research_title: "Research & Technical Domains",
      clickToRotate: "Click to rotate research domain",
      activeDomainBadge: "Active Research Focus",
      keyTechLabel: "Core Technologies",
    },
    statusCard: {
      cardTitle: "PERSONAL PROFILE & CONTACT",
      cardSubtitle: "A bit about me, and how to reach me if you'd like to talk",
      school: "AI Major, FPT University HCMC",
      location: "Thu Duc City, Ho Chi Minh City, Vietnam",
      currentStatusLabel: "Current Status:",
      currentFocusLabel: "Research Interests:",
      technicalHighlights: "Technical Core:",
      emailLabel: "Contact Email",
      phoneLabel: "Phone Number",
      githubLabel: "GitHub Profile",
      contactAction: "Send an Email",
    },
    projects: {
      badge: "Engineering Projects (AI & Edge AIoT)",
      pageTitle: "Artificial Intelligence & Embedded Projects",
      pageSubtitle: "These are projects I built myself, from an early idea to something that actually runs. A few of them went on to competitions, but what I enjoyed most was the process of building them.",
      featuredTitle: "Featured Projects",
      featuredSubtitle: "A few projects I spent the most time on, and still feel good looking back at",
      viewAllBtn: "View All Projects",
      viewProjectBtn: "View Project Details",
      modalTitle: "Project details",
      modalDescLabel: "Description:",
      modalCitationsLabel: "Press & verification citations:",
      modalTechStack: "Technologies & Tools:",
      modalGithubBtn: "View source",
      modalLiveBtn: "Read more",
      modalCloseBtn: "Close Window",
      difficultyLabel: "Complexity:",
      allProjectsBadge: "Built & Working",
      repoDetails: "GitHub Repository Details",
      copyClone: "Copy clone command",
      copied: "Copied!",
    },
    awards: {
      badge: "Honors & Recognitions",
      pageTitle: "Honors, Awards & Academic Distinctions",
      pageSubtitle: "A few milestones I remember most along the way, from competitions back in school to the AI Olympiad and VEDC more recently, with press links so anyone who wants to check can.",
      searchPlaceholder: "Search awards by title, issuer, year...",
      filterAll: "All Distinctions",
      filterAIIntl: "AI & International",
      filterAcademic: "FPT Academic Honors",
      filterScience: "Science & Informatics",
      citationSectionTitle: "Press Coverage",
      citationSectionSubtitle: "A few articles that covered the projects and awards mentioned above",
      citationFilterAll: "All Articles",
      citationFilterPress: "Mainstream Press",
      citationFilterAcademic: "Academic & University",
      viewArticle: "Read the article",
      verifiedBadge: "Sourced",
      officialPressLabel: "Media Coverage",
      totalAwardsFound: "honors and distinctions verified",
      noAwardsFound: "No awards found matching your search criteria.",
    },
    certificates: {
      badge: "Certificates",
      pageTitle: "Certifications & International Credentials",
      pageSubtitle: "Courses I took on my own time outside of class. Each certificate has a verification ID if you'd like to check it.",
      credentialId: "Certificate ID:",
      viewCertBtn: "View certificate",
      certifiedBy: "Issuer:",
      issuedYear: "Issued Year:",
    },
    skills: {
      badge: "Technical Competencies",
      pageTitle: "Technical Skills & Engineering Stack",
      pageSubtitle: "These are the tools I've actually used in the projects above, not a list of things I've only read about.",
      filterAll: "All Skills",
      usedInLabel: "Used in projects:",
    },
    timeline: {
      badge: "Academic Timeline & Milestones",
      pageTitle: "Academic Background & Growth Journey",
      pageSubtitle: "The path from a curious high-schooler tinkering with circuits to the AI student I am now.",
      educationTitle: "Education & Timeline",
      educationSubtitle: "The milestones I remember most, in order",
    },
    guestbook: {
      title: "Guestbook",
      subtitle: "Leave a note or feedback if you happened to read this far",
      namePlaceholder: "Your name *",
      messagePlaceholder: "Your message, question, or feedback *",
      submitBtn: "Send Message",
      submittingBtn: "Sending...",
      successMessage: "Message sent successfully! Thank you very much.",
      errorMessage: "Could not send message. Please try again later.",
    },
    footer: {
      copyright: "© 2026 Nguyen Duc Bao Lam. A personal learning journal.",
      builtWith: "Engineered with Next.js 16, TypeScript & Tailwind CSS.",
      backToTop: "Back to Top",
    },
  },
};

export const AI_DOMAINS_TRANSLATIONS = {
  vi: [
    {
      name: "Thị Giác Máy Tính (Computer Vision)",
      desc: "Mình thích nhất là lúc một mô hình nhận diện được thứ gì đó trong đời thực, không chỉ trên ảnh test. Mình dùng YOLOv8 để phát hiện vật thể trên luồng video, OpenCV để xử lý từng khung hình, và thử mạng siêu phân giải SRCNN để đọc được những biển số xe mờ.",
      highlight: "Thực nghiệm trên Raspberry Pi 4",
      tech: "YOLOv8, OpenCV, SRCNN, Python",
      icon: "👁️",
    },
    {
      name: "Edge AI & Hệ Thống Nhúng (AIoT)",
      desc: "Mình thích đưa mô hình ra khỏi máy tính và để nó chạy trên những con chip nhỏ như Raspberry Pi, nối với Arduino qua UART để điều khiển phần cứng thật, và gắn thêm cảm biến để đo đạc thế giới xung quanh rồi gửi dữ liệu qua LoRa.",
      highlight: "Coolest Projects Malaysia 2022",
      tech: "Raspberry Pi, Arduino C++, LoRa, UART",
      icon: "🚀",
    },
    {
      name: "Mô Hình Học Sâu (Deep Learning)",
      desc: "Mình học Deep Learning bằng cách tự viết lại những thứ mình đọc được, như dựng nguyên một kiến trúc Transformer bằng PyTorch từ đầu, hay huấn luyện mạng nơ-ron phân loại âm thanh dựa trên Mel-Spectrogram, để chắc là mình hiểu nó, không chỉ biết dùng.",
      highlight: "PyTorch Framework",
      tech: "PyTorch, Transformers, Self-Attention",
      icon: "🧠",
    },
    {
      name: "Cấu Trúc Dữ Liệu & Giải Thuật",
      desc: "Trước khi học AI, mình lớn lên cùng các bài toán cấu trúc dữ liệu và giải thuật, như đồ thị, quy hoạch động, tối ưu độ phức tạp, và vẫn giữ thói quen đó khi viết code bằng C++.",
      highlight: "Tin Học Trẻ & HSG Tỉnh",
      tech: "C++, STL, Data Structures, Algorithms",
      icon: "⚡",
    },
  ],
  en: [
    {
      name: "Computer Vision",
      desc: "What I like most is seeing a model recognize something in the real world, not just on a test image. I use YOLOv8 for object detection on video streams, OpenCV for frame-by-frame processing, and SRCNN super-resolution to read license plates that would otherwise be too blurry.",
      highlight: "Deployed on Raspberry Pi 4",
      tech: "YOLOv8, OpenCV, SRCNN, Python",
      icon: "👁️",
    },
    {
      name: "Edge AI & Embedded Systems (AIoT)",
      desc: "I like taking a model off the computer and running it on small chips like the Raspberry Pi, wiring it to an Arduino over UART to control real hardware, and adding sensors that measure the world around it and send data back over LoRa.",
      highlight: "Coolest Projects Malaysia Champion",
      tech: "Raspberry Pi, Arduino C++, LoRa, UART",
      icon: "🚀",
    },
    {
      name: "Deep Learning Architectures",
      desc: "I learn deep learning by rebuilding what I read, like coding a full Transformer architecture in PyTorch from scratch, or training an audio classifier on Mel-spectrograms, so I actually understand it, not just know how to call it.",
      highlight: "PyTorch Deep Learning",
      tech: "PyTorch, Transformers, Self-Attention",
      icon: "🧠",
    },
    {
      name: "Data Structures & Algorithms",
      desc: "Before AI, I grew up on data structures and algorithms problems, things like graphs, dynamic programming, complexity analysis, and that habit stuck with me in how I write C++.",
      highlight: "Informatics Olympiad Competitor",
      tech: "C++, STL, Data Structures, Algorithms",
      icon: "⚡",
    },
  ],
};

export const QUEST_TRANSLATIONS: Record<string, { title: string; description: string; reward?: string }> = {
  "quest-edgeflow-ai": {
    title: "EdgeFlow AI: Adaptive Smart Traffic Light Control System (National Top 10 VEDC 2026)",
    description: "This one started from watching traffic jam up every day in Ho Chi Minh City and wondering if the lights themselves could do better. My team built EdgeFlow AI: cameras and computer vision estimate vehicle density in real time, and an algorithm adjusts green-light cycles across connected intersections based on actual traffic flow. Before touching any hardware, we simulated the whole system in SUMO (Simulation of Urban MObility), then built a physical two-intersection scale model to verify it for real. The project reached the National Top 10 Finals of VEDC 2026.",
    reward: "Top 10 National Finalist, Vietnam Electronic Design Competition (VEDC 2026)",
  },
  "quest-1": {
    title: "Autonomous Water Surface Waste Collection Boat (AIoT Autonomous Boat)",
    description: "I grew up near rivers and lakes, so trash floating on the water was a familiar sight, and something I wanted to actually do something about. I ran YOLOv8 on a Raspberry Pi 4 to spot floating debris, then linked it to an Arduino over UART to steer the boat's motors. The boat also carries turbidity (NTU) and total dissolved solids (TDS) sensors, streaming water-quality data back to a server in real time. The project won the Overall Championship at Coolest Projects Malaysia 2022, organized by the Raspberry Pi Foundation.",
    reward: "Overall International Champion, Coolest Projects Malaysia 2022",
  },
  "quest-2": {
    title: "AIoT System for Forest Fire & Illegal Logging Early Warning (Forest Guard AI)",
    description: "Forests back home had been hit by illegal logging and fires, and I wanted to see if technology could help. The system listens for chainsaw sounds using an audio classification model (a CNN on Mel-spectrograms) and pairs it with image processing to catch unusual movement in the forest. Since the area has no reliable signal, I used LoRa modules to send long-range alerts back to a ranger station. The project won 1st Prize at the Lam Dong Provincial Science & Engineering Fair 2021 and was selected for the National round.",
    reward: "1st Prize Provincial Science Fair 2021 (National Participant)",
  },
  "quest-3": {
    title: "Vanilla Transformer Architecture from Scratch (PyTorch)",
    description: "This is one of deep-ml's exercises, where I practice rebuilding Machine Learning algorithms from scratch. Following their prompt, I read 'Attention Is All You Need' and rebuilt the whole Transformer architecture myself in PyTorch, without relying on pre-built blocks, just to really understand how it works. I implemented each piece by hand: Multi-Head Self-Attention, Sinusoidal Positional Encoding, Layer Normalization, Residual Connections, and the Noam learning-rate scheduler.",
    reward: "Academic Deep Learning Implementation",
  },
  "quest-speed-estimation": {
    title: "Real-Time Vehicle Speed Estimation (YOLOv8 & ByteTrack)",
    description: "Surveillance camera-based real-time vehicle speed estimation system: integrating vehicle detection via YOLOv8, robust track association with ByteTrack, and perspective transformation calibration to compute ground velocities with high fidelity.",
    reward: "Real-time Intelligent Traffic Surveillance Solution",
  },
  "quest-gat": {
    title: "Graph Attention Networks (GAT) for Node & Graph Classification",
    description: "Research and PyTorch Geometric implementation of Graph Attention Networks (GAT). Uses masked self-attention over non-Euclidean graph topology to learn superior node and graph representations over traditional GCNs.",
    reward: "Advanced Graph Deep Learning Research",
  },
  "quest-topic-tracking": {
    title: "Dynamic Topic Detection & Tracking on Social Streams (SADStream)",
    description: "Real-time dynamic topic detection and tracking system on streaming text using the SADStream framework (coupling adaptive decay with compressed memory structures) to process massive social streams with near-zero latency.",
    reward: "Social Text Stream Mining Research",
  },
  "quest-5": {
    title: "Data Structures & Algorithmic Library (Competitive Programming in C++)",
    description: "I put together the data structures and algorithms I kept reaching for during competitive programming, things like Segment Trees, Dynamic Programming, and graph algorithms like Dijkstra and DFS/BFS, written in C++ and Python. It doubled as practice for reasoning about time and space complexity.",
    reward: "1st Prize Young Informatics 2020 & 2x Provincial 3rd Prizes",
  },
  "quest-6": {
    title: "Personal Portfolio & Administrative CMS (Next.js 16)",
    description: "I built this site myself to present my projects in my own way, using Next.js, TypeScript, and Tailwind CSS, with sound effects via the Web Audio API and a small admin panel so I can update the content myself.",
    reward: "Personal Engineering Showcase",
  },
  "quest-intelligent-drug": {
    title: "Smart Medication Dispenser (Intelligent Drug)",
    description: "I built an automatic medication dispenser for elderly people who tend to forget when to take their medicine. It uses DeepFace to recognize the right person before opening the pill compartment, an Arduino to control the dispensing mechanism on schedule, and sends timely reminders.",
  },
  "quest-device-for-blind": {
    title: "Assistive Device for the Visually Impaired",
    description: "I tried building a wearable device to help visually impaired users move around more safely, combining a small onboard AI vision model that detects obstacles through a camera with an ultrasonic sensor for distance. I added an LLM to turn what's ahead into a short spoken description, then used it to drive feedback to the user through voice or vibration.",
  },
  "quest-fungi-aiot": {
    title: "Smart Mushroom Farm Monitoring (AIoT)",
    description: "Someone I know who grows mushrooms asked for a way to monitor temperature and humidity remotely, so I built an AIoT system with environmental sensors, real-time alerts, and an LLM that turns the raw sensor data into a short, readable daily report.",
  },
  "quest-conveyor-belt": {
    title: "Automated Defect-Sorting Conveyor Belt",
    description: "I built a small conveyor belt model that uses deep learning to spot defective products through a camera, then controls a PLC and Arduino to automatically sort them off the line.",
  },
  "quest-car-dealership": {
    title: "Multi-Branch Car Dealership Platform (Full-Stack Capstone)",
    description: "This is the biggest capstone I've built: a web app for a car dealership with multiple branches across the US. I split the system into a few parts: Django handles users and car data, stored in SQLite; a separate Node.js and Express service stores dealership info and customer reviews in MongoDB; and a Flask service uses NLTK to automatically score the sentiment (positive, neutral, negative) of each review. Everything is containerized with Docker and deployed to IBM Cloud.",
  },
};

export const AWARD_TRANSLATIONS: Record<string, { title: string; issuer: string; badge: string; scope: string; desc: string }> = {
  "aw-ai-2026": {
    title: "3rd Prize, Southern Regional AI Olympiad 2026",
    issuer: "Vietnam Informatics Association & OlpAI Committee",
    badge: "3RD PRIZE AI OLYMPIAD (RANK 44/191)",
    scope: "Regional",
    desc: "I spent 6 hours tackling practical AI problems with my teammates Nguyen Cong Thinh and Ngo Van Truong Phuc as team NewEraPTL, and we came away with 3rd Prize (Rank 44/191) at the Vietnam Student AI Olympiad (OlpAI) 2026.",
  },
  "aw-vedc-2026": {
    title: "Top 10 National Finalist, Vietnam Electronic Design Competition (VEDC) 2026 (EdgeFlow AI)",
    issuer: "Radio and Electronics Association of Vietnam (REV) & VEDC 2026",
    badge: "TOP 10 NATIONAL FINALIST VEDC",
    scope: "National",
    desc: "My team, 31µF (with Nguyen Cong Thinh, Ngo Van Truong Phuc, and Do Minh Hien, advised by Mr. Nguyen Xuan Huy), made it through the Semifinals to the National Top 10 with EdgeFlow AI, the smart traffic system we spent months building.",
  },
  "aw-rmit-2026": {
    title: "Top 23 National Finalist, RMIT Hackathon 2026 (Rank 23/299 Teams)",
    issuer: "RMIT University Vietnam",
    badge: "TOP 23/299 RMIT HACKATHON",
    scope: "National",
    desc: "I competed with my team, RMIT_SGS_AstraPTLD_C1, at RMIT Hackathon 2026, and we placed 23rd out of 299 teams nationwide. The competition leaderboard was published on Kaggle.",
  },
  "aw-fpt-spring-2026": {
    title: "Honor Student, Spring Semester 2026",
    issuer: "FPT University HCMC",
    badge: "HONOR STUDENT SPRING 2026",
    scope: "FPT University",
    desc: "Recognized as Honor Student for the Spring 2026 semester, Artificial Intelligence major at FPT University HCMC.",
  },
  "aw-ai-2025": {
    title: "Consolation Prize, Southern Regional AI Olympiad 2025",
    issuer: "Vietnam Informatics Association & OlpAI Committee",
    badge: "CONSOLATION PRIZE AI OLYMPIAD",
    scope: "Regional",
    desc: "The year before, I tried my hand at the Southern Regional round of the same competition and came away with a Consolation Prize.",
  },
  "aw-fpt-fall-2025": {
    title: "Top 100 Excellent Students, Fall Semester 2025",
    issuer: "FPT University HCMC",
    badge: "TOP 100 EXCELLENT STUDENTS FALL 2025",
    scope: "FPT University",
    desc: "Made the Top 100 students university-wide in Fall 2025.",
  },
  "aw-fpt-summer-2025": {
    title: "Top 100 Excellent Students, Summer Semester 2025",
    issuer: "FPT University HCMC",
    badge: "TOP 100 EXCELLENT STUDENTS SUMMER 2025",
    scope: "FPT University",
    desc: "Made the Top 100 students university-wide in Summer 2025.",
  },
  "aw-fpt-spring-2025": {
    title: "Top 100 Excellent Students, Spring Semester 2025",
    issuer: "FPT University HCMC",
    badge: "TOP 100 EXCELLENT STUDENTS SPRING 2025",
    scope: "FPT University",
    desc: "Made the Top 100 students university-wide in Spring 2025, my very first semester in the AI program.",
  },
  "aw-olympic-tin-2023": {
    title: "Bronze Medal, Central & Highland Informatics Olympiad 2023",
    issuer: "Olympiad Organizing Committee & Da Nang University",
    badge: "BRONZE MEDAL INFORMATICS 2023",
    scope: "Regional",
    desc: "Awarded Bronze Medal in competitive algorithmic programming at the Central & Highland Informatics Olympiad.",
  },
  "aw-coolest-2022": {
    title: "International Champion & Overall Winner, Coolest Projects Malaysia 2022",
    issuer: "Raspberry Pi Foundation & Coolest Projects Committee",
    badge: "OVERALL INTERNATIONAL CHAMPION",
    scope: "International",
    desc: "Won Grand Champion and Category Winner for the Autonomous Trash Collecting Boat equipped with Raspberry Pi YOLOv8 AIoT vision and water sensors.",
  },
  "aw-khkt-2022": {
    title: "1st Prize, Provincial Science & Engineering Fair 2022",
    issuer: "Department of Education and Training of Lam Dong Province",
    badge: "1ST PRIZE PROVINCIAL SCIENCE FAIR",
    scope: "Provincial",
    desc: "1st Prize at the provincial level in 2022, with a project I researched myself.",
  },
  "aw-khkt-2021": {
    title: "1st Prize, Provincial Science & Engineering Fair 2021 (National Participant)",
    issuer: "Department of Education and Training of Lam Dong Province",
    badge: "1ST PRIZE PROVINCIAL SCIENCE FAIR",
    scope: "Provincial",
    desc: "First Prize for AIoT audio and image classification device for forest preservation; nominated to represent the province at National finals.",
  },
};

export const TIMELINE_TRANSLATIONS: Record<string, { role: string; guild: string; desc: string }> = {
  "t-0": {
    role: "National AI Olympiad & Electronic Design Competitions",
    guild: "AI Olympiad, VEDC 2026 & RMIT Hackathon",
    desc: "A busy stretch of competitions: EdgeFlow AI took my team to the National Top 10 Finals of VEDC 2026, I competed with team NewEraPTL for 3rd Prize at the Southern Student AI Olympiad 2026 (ranked 44/191) after six hours of solving real AI problems, and reached the Top 23 out of 299 teams at RMIT Hackathon 2026. The year before, I also took part in the 2025 AI Olympiad and received a Consolation Prize.",
  },
  "t-1": {
    role: "Artificial Intelligence Undergraduate Student",
    guild: "FPT University HCMC",
    desc: "This is where I started my Artificial Intelligence major at FPT University HCMC, and I've been recognized as an Honor Student for four semesters in a row (Spring, Summer, Fall 2025, and Spring 2026). It's also when I started going deeper into Deep Learning, Computer Vision, and Edge AIoT.",
  },
  "t-2": {
    role: "International Finalist & Winner, Coolest Projects Malaysia",
    guild: "Raspberry Pi Foundation",
    desc: "I represented at Coolest Projects Malaysia with my autonomous water-surface cleaning boat, built with YOLOv8 and a few water-quality sensors. It was the first time I'd taken a project I built myself abroad, and it ended up winning the Overall Championship.",
  },
  "t-3": {
    role: "Provincial Science & Engineering Fair (KHKT)",
    guild: "Department of Education and Training of Lam Dong",
    desc: "I built an AI system that listens for chainsaw sounds and detects movement to warn against forest intrusion, and entered it in the provincial Science & Engineering Fair. It won 1st Prize and was selected for the National round.",
  },
  "t-4": {
    role: "Young Informatics Competition (Category D2)",
    guild: "Lam Dong Provincial Youth Union & DOET",
    desc: "The first time I entered a piece of software I'd written myself in the provincial Young Informatics competition, and won 1st Prize.",
  },
  "t-5": {
    role: "High School Student & Competitive Informatics Team",
    guild: "Dong Da High School, Da Lat",
    desc: "Through high school at Dong Da School in Da Lat, I was part of the Informatics team alongside regular classes, won two 3rd Prizes at the provincial Excellent Student competition (2021 and 2022), and graduated with honors.",
  },
};
