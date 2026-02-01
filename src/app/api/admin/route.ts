// =============================================================================
// Admin API Routes - Server-side data storage
// 관리자 데이터를 서버에 저장하고 모든 방문자에게 동일하게 제공
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// 데이터 파일 경로 (프로덕션에서는 DB로 교체 필요)
const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/tmp' // Vercel serverless function에서 사용 가능한 임시 디렉토리
  : path.join(process.cwd(), 'data');

const DATA_FILE = path.join(DATA_DIR, 'admin-data.json');

// 기본 데이터 구조
interface AdminData {
  notices: Notice[];
  hero: HeroConfig;
  company: CompanyInfo;
  social: SocialLinks;
  technologies: Technology[];
  lastUpdated: string;
}

interface Notice {
  id: number;
  category: string;
  title: string;
  content: string;
  date: string;
  views: number;
}

interface HeroConfig {
  mainCopy: string;
  subCopy: string;
  ctaText: string;
}

interface CompanyInfo {
  name: string;
  nameEn: string;
  ceo: string;
  address: string;
  addressDetail: string;
  businessNumber: string;
  phone: string;
  fax: string;
  email: string;
  copyrightYear: number;
}

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

interface Technology {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
}

// 기본 데이터 (siteConfig에서 가져옴)
const defaultData: AdminData = {
  notices: [
    { id: 1, category: "채용", title: "[정규직] NPU 설계 엔지니어 채용 공고", date: "2026-01-28", views: 234, content: "NPU 설계 경력자를 모집합니다." },
    { id: 2, category: "채용", title: "[정규직] 임베디드 소프트웨어 개발자 채용", date: "2026-01-25", views: 189, content: "임베디드 SW 개발 경력자를 모집합니다." },
    { id: 3, category: "공지", title: "2026년 상반기 인턴십 프로그램 안내", date: "2026-01-20", views: 456, content: "인턴십 프로그램에 대한 안내입니다." },
    { id: 4, category: "뉴스", title: "Code Gear, 법인 설립 완료", date: "2026-01-15", views: 789, content: "주식회사 코드기어 법인 설립을 완료했습니다." },
    { id: 5, category: "공지", title: "설 연휴 휴무 안내", date: "2026-01-10", views: 123, content: "설 연휴 기간 휴무 안내입니다." },
    { id: 6, category: "채용", title: "[계약직] FPGA 검증 엔지니어 채용", date: "2026-01-08", views: 167, content: "FPGA 검증 엔지니어를 모집합니다." },
  ],
  hero: {
    mainCopy: "Connecting Intelligence to Hardware",
    subCopy: "지능형 하드웨어의 미래를 설계합니다",
    ctaText: "기술 알아보기",
  },
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
    copyrightYear: 2026,
  },
  social: {
    github: "https://github.com/codegear",
    linkedin: "https://linkedin.com/company/codegear",
    twitter: "https://twitter.com/codegear",
  },
  technologies: [
    { id: "npu", title: "NPU 설계", subtitle: "Neural Processing Unit", description: "고효율 신경망 처리 유닛 설계 및 최적화", icon: "cpu", gradient: "from-blue-500 to-cyan-500" },
    { id: "robot-control", title: "로봇 제어 시스템", subtitle: "Robot Control System", description: "정밀 모션 제어 및 실시간 로봇 시스템", icon: "robot", gradient: "from-purple-500 to-pink-500" },
    { id: "semiconductor-ip", title: "시스템 반도체 IP", subtitle: "System Semiconductor IP", description: "맞춤형 반도체 IP 코어 설계 및 라이센싱", icon: "chip", gradient: "from-orange-500 to-red-500" },
    { id: "embedded-sw", title: "임베디드 소프트웨어", subtitle: "Embedded Software", description: "저전력 고성능 임베디드 시스템 개발", icon: "code", gradient: "from-green-500 to-emerald-500" },
    { id: "ai-accelerator", title: "AI 가속기", subtitle: "AI Accelerator", description: "머신러닝 추론 가속을 위한 전용 하드웨어", icon: "zap", gradient: "from-yellow-500 to-orange-500" },
    { id: "fpga-design", title: "FPGA 설계", subtitle: "FPGA Design", description: "프로토타이핑 및 커스텀 로직 구현", icon: "grid", gradient: "from-indigo-500 to-purple-500" },
    { id: "soc-integration", title: "SoC 통합", subtitle: "System on Chip", description: "시스템 온 칩 아키텍처 설계 및 통합", icon: "layers", gradient: "from-teal-500 to-cyan-500" },
    { id: "verification", title: "설계 검증", subtitle: "Design Verification", description: "하드웨어 설계 검증 및 테스트 자동화", icon: "check-circle", gradient: "from-rose-500 to-pink-500" },
  ],
  lastUpdated: new Date().toISOString(),
};

// 메모리 캐시 (서버 재시작 시 초기화됨)
let memoryCache: AdminData | null = null;

// 데이터 읽기
async function readData(): Promise<AdminData> {
  // 메모리 캐시가 있으면 반환
  if (memoryCache) {
    return memoryCache;
  }

  try {
    // 디렉토리 확인 및 생성
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // 파일 읽기 시도
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    memoryCache = JSON.parse(data);
    return memoryCache!;
  } catch {
    // 파일이 없으면 기본 데이터 반환
    memoryCache = { ...defaultData };
    return memoryCache;
  }
}

// 데이터 쓰기
async function writeData(data: AdminData): Promise<void> {
  try {
    // 디렉토리 확인 및 생성
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // 타임스탬프 업데이트
    data.lastUpdated = new Date().toISOString();
    
    // 파일 쓰기
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    
    // 메모리 캐시 업데이트
    memoryCache = data;
  } catch (error) {
    console.error('Failed to write data:', error);
    // 파일 쓰기 실패 시 메모리에만 저장
    memoryCache = data;
  }
}

// GET: 데이터 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const data = await readData();
    
    // 특정 타입만 요청한 경우
    if (type) {
      switch (type) {
        case 'notices':
          return NextResponse.json({ success: true, data: data.notices });
        case 'hero':
          return NextResponse.json({ success: true, data: data.hero });
        case 'company':
          return NextResponse.json({ success: true, data: data.company });
        case 'social':
          return NextResponse.json({ success: true, data: data.social });
        case 'technologies':
          return NextResponse.json({ success: true, data: data.technologies });
        default:
          return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
      }
    }
    
    // 전체 데이터 반환
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to read data' }, { status: 500 });
  }
}

// POST: 데이터 업데이트
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data: newData } = body;
    
    if (!type || !newData) {
      return NextResponse.json({ success: false, error: 'Missing type or data' }, { status: 400 });
    }
    
    const currentData = await readData();
    
    // 타입별 업데이트
    switch (type) {
      case 'notices':
        currentData.notices = newData;
        break;
      case 'hero':
        currentData.hero = { ...currentData.hero, ...newData };
        break;
      case 'company':
        currentData.company = { ...currentData.company, ...newData };
        break;
      case 'social':
        currentData.social = { ...currentData.social, ...newData };
        break;
      case 'technologies':
        currentData.technologies = newData;
        break;
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }
    
    await writeData(currentData);
    
    return NextResponse.json({ success: true, data: currentData, message: '저장되었습니다.' });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}

// DELETE: 데이터 초기화
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const currentData = await readData();
    
    if (type) {
      // 특정 타입만 초기화
      switch (type) {
        case 'notices':
          currentData.notices = defaultData.notices;
          break;
        case 'hero':
          currentData.hero = defaultData.hero;
          break;
        case 'company':
          currentData.company = defaultData.company;
          break;
        case 'social':
          currentData.social = defaultData.social;
          break;
        case 'technologies':
          currentData.technologies = defaultData.technologies;
          break;
        default:
          return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
      }
    } else {
      // 전체 초기화
      memoryCache = { ...defaultData };
      await writeData(memoryCache);
      return NextResponse.json({ success: true, data: memoryCache, message: '전체 초기화되었습니다.' });
    }
    
    await writeData(currentData);
    return NextResponse.json({ success: true, data: currentData, message: '초기화되었습니다.' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, error: 'Failed to reset data' }, { status: 500 });
  }
}
