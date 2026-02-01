# Code Gear - 주식회사 코드기어 웹사이트

> "Connecting Intelligence to Hardware" - 지능형 하드웨어의 미래를 설계합니다

## 🚀 프로젝트 개요

주식회사 코드기어의 공식 웹사이트입니다. 다크 모드 기반의 글래스모피즘 디자인과 부드러운 애니메이션으로 하이테크 스타트업의 아이덴티티를 표현합니다.

## ✨ 주요 기능

### 메인 페이지
- **Hero Section**: 폴리곤 애니메이션 배경 + 그라디언트 효과
- **Core Technology**: 8가지 핵심 연구분야 카드 (NPU, 로봇제어, 반도체IP 등)
- **공고 게시판**: 드래그 가능한 테이블 (컬럼 순서/너비 LocalStorage 저장)
- **회사 소개**: 통계 및 CTA 섹션
- **Footer**: 27개 사업목적, 회사정보, 소셜링크

### 관리자 대시보드 (`/admin`)
- 대시보드 통계
- 공고 관리 (CRUD)
- 콘텐츠 편집 (Hero, 기술카드)
- 사이트 설정 (회사정보, 소셜링크)
- 통계 페이지

**관리자 비밀번호**: `codegear2024`

### 추가 페이지
- `/privacy` - 개인정보처리방침
- `/terms` - 이용약관

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **State**: React Hooks + LocalStorage

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── layout.tsx        # 전역 레이아웃
│   ├── globals.css       # 글래스모피즘 스타일
│   ├── admin/            # 관리자 대시보드
│   │   ├── page.tsx      # 대시보드
│   │   ├── notices/      # 공고 관리
│   │   ├── content/      # 콘텐츠 관리
│   │   ├── settings/     # 사이트 설정
│   │   └── analytics/    # 통계
│   ├── privacy/          # 개인정보처리방침
│   └── terms/            # 이용약관
├── components/
│   ├── ui/               # UI 컴포넌트
│   │   ├── GlassCard.tsx
│   │   ├── GlassButton.tsx
│   │   ├── DraggableTable.tsx
│   │   └── Icons.tsx
│   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/         # 섹션 컴포넌트
│       ├── HeroSection.tsx
│       ├── TechnologySection.tsx
│       ├── NoticeSection.tsx
│       └── PolygonBackground.tsx
├── config/
│   └── siteConfig.ts     # 전체 설정 (텍스트, 데이터)
├── hooks/
│   └── useLocalStorage.ts # 테이블 상태 저장 훅
└── types/
    └── index.ts          # TypeScript 타입 정의
```

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

## 🌐 배포 (Vercel)

### 방법 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### 방법 2: GitHub 연동
1. GitHub에 푸시
2. [vercel.com](https://vercel.com)에서 Import
3. 자동 배포

### 커스텀 도메인 연결
1. Vercel 대시보드 → Settings → Domains
2. 도메인 추가 (예: `codegear.co.kr`)
3. DNS 설정:
   - A 레코드: `76.76.21.21`
   - 또는 CNAME: `cname.vercel-dns.com`

## 📝 설정 변경

모든 텍스트와 설정은 `src/config/siteConfig.ts`에서 관리됩니다:

- 사이트 기본 정보
- Hero 섹션 카피
- 8가지 핵심 기술
- 회사 정보
- 27개 사업 목적
- 네비게이션 메뉴
- 소셜 미디어 링크

## 🎨 디자인 특징

- **다크 모드**: 기본 배경 `#0a0a0f`
- **글래스모피즘**: `backdrop-blur` + 반투명 배경
- **그라디언트**: Blue → Cyan 브랜드 컬러
- **애니메이션**: Framer Motion 스크롤 트리거

## 📄 라이선스

© 2025 주식회사 코드기어. All rights reserved.
