// =============================================================================
// Code Gear - Site Configuration
// 모든 텍스트 및 설정값을 중앙에서 관리
// =============================================================================

export const siteConfig = {
  // 기본 사이트 정보
  siteName: "Code Gear",
  siteNameKr: "주식회사 코드기어",
  tagline: "Connecting Intelligence to Hardware",
  description: "NPU, 로봇 제어, 시스템 반도체 IP 등 차세대 기술을 선도하는 하이테크 스타트업",

  // Hero Section
  hero: {
    mainCopy: "Connecting Intelligence to Hardware",
    subCopy: "지능형 하드웨어의 미래를 설계합니다",
    ctaText: "기술 알아보기",
    ctaLink: "#technology",
  },

  // 8가지 핵심 연구분야 (Core Technologies)
  technologies: [
    {
      id: "npu",
      title: "NPU 설계",
      subtitle: "Neural Processing Unit",
      description: "고효율 신경망 처리 유닛 설계 및 최적화",
      icon: "cpu",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "robot-control",
      title: "로봇 제어 시스템",
      subtitle: "Robot Control System",
      description: "정밀 모션 제어 및 실시간 로봇 시스템",
      icon: "robot",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "semiconductor-ip",
      title: "시스템 반도체 IP",
      subtitle: "System Semiconductor IP",
      description: "맞춤형 반도체 IP 코어 설계 및 라이센싱",
      icon: "chip",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "embedded-sw",
      title: "임베디드 소프트웨어",
      subtitle: "Embedded Software",
      description: "저전력 고성능 임베디드 시스템 개발",
      icon: "code",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "ai-accelerator",
      title: "AI 가속기",
      subtitle: "AI Accelerator",
      description: "머신러닝 추론 가속을 위한 전용 하드웨어",
      icon: "zap",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: "fpga-design",
      title: "FPGA 설계",
      subtitle: "FPGA Design",
      description: "프로토타이핑 및 커스텀 로직 구현",
      icon: "grid",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: "soc-integration",
      title: "SoC 통합",
      subtitle: "System on Chip",
      description: "시스템 온 칩 아키텍처 설계 및 통합",
      icon: "layers",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      id: "verification",
      title: "설계 검증",
      subtitle: "Design Verification",
      description: "하드웨어 설계 검증 및 테스트 자동화",
      icon: "check-circle",
      gradient: "from-rose-500 to-pink-500",
    },
  ],

  // 회사 정보
  company: {
    name: "주식회사 코드기어",
    nameEn: "Code Gear Inc.",
    ceo: "대표이사",
    address: "충청남도 천안시 서북구 불당동",
    addressDetail: "불당로 XX, XX층",
    businessNumber: "XXX-XX-XXXXX",
    phone: "041-XXX-XXXX",
    fax: "041-XXX-XXXX",
    email: "contact@codegear.co.kr",
    foundedYear: 2024,
    copyrightYear: new Date().getFullYear(),
  },

  // 27가지 사업 목적 (법인 등기 기준)
  businessPurposes: [
    { id: 1, category: "반도체", item: "시스템 반도체 설계 및 개발업" },
    { id: 2, category: "반도체", item: "반도체 IP 라이센싱 및 판매업" },
    { id: 3, category: "반도체", item: "ASIC/FPGA 설계 서비스업" },
    { id: 4, category: "반도체", item: "반도체 설계 자동화(EDA) 솔루션 개발업" },
    { id: 5, category: "반도체", item: "NPU(신경망처리장치) 설계 및 개발업" },
    { id: 6, category: "AI/SW", item: "인공지능 하드웨어 가속기 개발업" },
    { id: 7, category: "AI/SW", item: "임베디드 소프트웨어 개발업" },
    { id: 8, category: "AI/SW", item: "펌웨어 개발 및 유지보수업" },
    { id: 9, category: "AI/SW", item: "AI/ML 알고리즘 개발 및 최적화업" },
    { id: 10, category: "AI/SW", item: "디바이스 드라이버 개발업" },
    { id: 11, category: "로봇", item: "로봇 제어 시스템 개발업" },
    { id: 12, category: "로봇", item: "산업용 로봇 솔루션 제공업" },
    { id: 13, category: "로봇", item: "모션 컨트롤러 설계 및 제조업" },
    { id: 14, category: "로봇", item: "자동화 장비 제어 시스템업" },
    { id: 15, category: "시스템", item: "SoC(System on Chip) 설계업" },
    { id: 16, category: "시스템", item: "시스템 통합(SI) 서비스업" },
    { id: 17, category: "시스템", item: "하드웨어 설계 검증 서비스업" },
    { id: 18, category: "시스템", item: "테스트 자동화 솔루션 개발업" },
    { id: 19, category: "컨설팅", item: "기술 컨설팅 및 자문업" },
    { id: 20, category: "컨설팅", item: "R&D 기획 및 관리 서비스업" },
    { id: 21, category: "컨설팅", item: "기술 교육 및 훈련 서비스업" },
    { id: 22, category: "사업", item: "전자부품 도소매업" },
    { id: 23, category: "사업", item: "기술 라이센싱 및 로열티 사업" },
    { id: 24, category: "사업", item: "정부 R&D 과제 수행업" },
    { id: 25, category: "사업", item: "수출입업" },
    { id: 26, category: "사업", item: "위 각호에 부대되는 일체의 사업" },
    { id: 27, category: "사업", item: "투자 및 자회사 관리업" },
  ],

  // 네비게이션 메뉴
  navigation: {
    main: [
      { name: "홈", href: "/" },
      { name: "기술", href: "#technology" },
      { name: "공고", href: "#notices" },
      { name: "회사소개", href: "#about" },
      { name: "연락처", href: "#contact" },
    ],
    footer: [
      { name: "개인정보처리방침", href: "/privacy" },
      { name: "이용약관", href: "/terms" },
    ],
  },

  // 소셜 미디어 링크
  social: {
    github: "https://github.com/codegear",
    linkedin: "https://linkedin.com/company/codegear",
    twitter: "https://twitter.com/codegear",
  },
};

// 공고 게시판 기본 컬럼 설정
export const defaultNoticeColumns = [
  { id: "id", label: "번호", width: 80, minWidth: 60 },
  { id: "category", label: "분류", width: 100, minWidth: 80 },
  { id: "title", label: "제목", width: 400, minWidth: 200 },
  { id: "date", label: "등록일", width: 120, minWidth: 100 },
  { id: "views", label: "조회수", width: 80, minWidth: 60 },
];

// 샘플 공고 데이터
export const sampleNotices = [
  {
    id: 1,
    category: "채용",
    title: "[정규직] NPU 설계 엔지니어 채용 공고",
    date: "2025-01-28",
    views: 234,
    content: "NPU 설계 경력자를 모집합니다.",
  },
  {
    id: 2,
    category: "채용",
    title: "[정규직] 임베디드 소프트웨어 개발자 채용",
    date: "2025-01-25",
    views: 189,
    content: "임베디드 SW 개발 경력자를 모집합니다.",
  },
  {
    id: 3,
    category: "공지",
    title: "2025년 상반기 인턴십 프로그램 안내",
    date: "2025-01-20",
    views: 456,
    content: "인턴십 프로그램에 대한 안내입니다.",
  },
  {
    id: 4,
    category: "뉴스",
    title: "Code Gear, 시리즈 A 투자 유치 완료",
    date: "2025-01-15",
    views: 789,
    content: "시리즈 A 투자 유치에 성공했습니다.",
  },
  {
    id: 5,
    category: "공지",
    title: "설 연휴 휴무 안내",
    date: "2025-01-10",
    views: 123,
    content: "설 연휴 기간 휴무 안내입니다.",
  },
  {
    id: 6,
    category: "채용",
    title: "[계약직] FPGA 검증 엔지니어 채용",
    date: "2025-01-08",
    views: 167,
    content: "FPGA 검증 엔지니어를 모집합니다.",
  },
];

// 타입 정의
export type Technology = (typeof siteConfig.technologies)[number];
export type BusinessPurpose = (typeof siteConfig.businessPurposes)[number];
export type NoticeColumn = (typeof defaultNoticeColumns)[number];
export type Notice = (typeof sampleNotices)[number];
