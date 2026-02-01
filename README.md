# Code Gear - 주식회사 코드기어 웹사이트

## Project Overview
- **Name**: Code Gear (주식회사 코드기어)
- **Goal**: 하이테크 스타트업의 브랜드 웹사이트 및 관리자 대시보드 구축
- **Features**: 다크 모드 기반 글래스모피즘 디자인, 사용자 맞춤형 UI (드래그 가능한 테이블)

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Icons**: Lucide React
- **State Management**: React useState, useEffect, useLocalStorage

## Project Structure
```
webapp/
├── src/
│   ├── app/
│   │   ├── page.tsx                # 메인 페이지
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   ├── globals.css             # 글로벌 스타일 (글래스모피즘)
│   │   ├── admin/                  # 관리자 대시보드
│   │   │   ├── layout.tsx          # Admin 레이아웃 (사이드바, 인증)
│   │   │   ├── page.tsx            # Admin 대시보드
│   │   │   ├── notices/page.tsx    # 공고 관리 (CRUD)
│   │   │   ├── content/page.tsx    # 콘텐츠 관리
│   │   │   ├── settings/page.tsx   # 사이트 설정
│   │   │   └── analytics/page.tsx  # 통계 페이지
│   │   ├── privacy/page.tsx        # 개인정보처리방침
│   │   └── terms/page.tsx          # 이용약관
│   ├── components/
│   │   ├── ui/                     # UI 컴포넌트
│   │   │   ├── GlassCard.tsx       # 글래스모피즘 카드
│   │   │   ├── GlassButton.tsx     # 글래스모피즘 버튼
│   │   │   ├── DraggableTable.tsx  # 드래그 가능한 테이블
│   │   │   └── Icons.tsx           # 아이콘 컴포넌트
│   │   ├── layout/
│   │   │   ├── Header.tsx          # 헤더 (네비게이션)
│   │   │   └── Footer.tsx          # 푸터 (회사 정보, 27개 사업 목적)
│   │   └── sections/
│   │       ├── HeroSection.tsx     # Hero 섹션
│   │       ├── PolygonBackground.tsx # 폴리곤 애니메이션 배경
│   │       ├── TechnologySection.tsx # 기술 카드 섹션
│   │       └── NoticeSection.tsx   # 공고 게시판 섹션
│   ├── hooks/
│   │   └── useLocalStorage.ts      # LocalStorage 훅 (컬럼 상태 저장)
│   ├── config/
│   │   └── siteConfig.ts           # 사이트 설정 (27개 사업 영역, 회사 정보)
│   └── types/
│       └── index.ts                # TypeScript 타입 정의
└── package.json
```

## Completed Features

### 메인 페이지 (Client Side)
- Hero Section - "Connecting Intelligence to Hardware" 메인 카피
- 폴리곤 애니메이션 배경 (Canvas 기반)
- Core Technology Section - 8가지 핵심 연구분야 카드
- 드래그 가능한 공고 테이블 (dnd-kit + LocalStorage 상태 저장)
- 회사 소개 섹션
- CTA 섹션

### Admin Dashboard
- 로그인 화면 (데모 비밀번호: codegear2024)
- 대시보드 메인 (통계, 빠른 작업)
- 공고 관리 (CRUD - 작성/수정/삭제)
- 콘텐츠 관리 (Hero 섹션, 기술 카드 수정)
- 사이트 설정 (회사 정보, 소셜 링크 수정)
- 통계 페이지 (데모용)

### Footer
- 회사 정보 (주소, 연락처, 사업자등록번호)
- 27개 사업 목적 (아코디언 형태로 표시)
- 소셜 링크 (GitHub, LinkedIn, Twitter)
- 법적 링크 (개인정보처리방침, 이용약관)

### Core Feature: 사용자 맞춤형 UI
- 컬럼 순서 변경: 헤더를 드래그하여 순서 변경
- 컬럼 너비 조절: 테두리를 드래그하여 너비 조절
- LocalStorage 저장: 새로고침 후에도 사용자 설정 유지
- 초기화 버튼: 기본 상태로 복원

## Design System

### 글래스모피즘 (Glassmorphism)
- 반투명 배경 (rgba(255, 255, 255, 0.05))
- 배경 블러 효과 (backdrop-filter: blur())
- 미묘한 테두리 (border: 1px solid rgba(255, 255, 255, 0.1))

### 컬러 팔레트
- Primary: #3b82f6 (Blue)
- Accent: #06b6d4 (Cyan)
- Background: #0a0a0f (Dark)
- Text: #e5e5e5 (Light Gray)

## Development

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

## Responsive
- Mobile: 1 column grid
- Tablet: 2 column grid
- Desktop: 4 column grid

## Admin Access
- URL: /admin
- Demo Password: codegear2024

## siteConfig 데이터 구조
- siteName: 사이트명
- hero: Hero 섹션 설정
- technologies: 8가지 핵심 기술
- company: 회사 정보
- businessPurposes: 27개 사업 목적
- navigation: 네비게이션 메뉴
- social: 소셜 링크

## 추가 권장 사항

### 스타트업 홈페이지에 추가하면 좋은 기능들
1. 팀 소개 페이지 - 창업멤버 및 핵심 인력 소개
2. 포트폴리오/프로젝트 - 진행 중인 프로젝트 및 성과
3. 뉴스/블로그 - 기술 블로그 및 회사 소식
4. 투자자 정보 - IR 자료, 재무 정보 (시리즈 단계별)
5. 파트너십 페이지 - 협력 기업 및 기관 로고
6. 문의 폼 - 연락처 수집 및 이메일 알림
7. 다국어 지원 - 영문 버전 (글로벌 진출 시)
8. SEO 최적화 - 메타태그, 구조화된 데이터
9. Google Analytics - 방문자 분석
10. 채팅 위젯 - 실시간 고객 상담

---

Last Updated: 2025-02-01
Tech Stack: Next.js 16 + Tailwind CSS + Framer Motion
