// =============================================================================
// Code Gear - Type Definitions
// =============================================================================

// 공고 테이블 컬럼 상태 타입
export interface ColumnState {
  id: string;
  label: string;
  width: number;
  minWidth: number;
}

export interface TableState {
  columnOrder: string[];
  columnWidths: Record<string, number>;
}

// 공고 타입
export interface Notice {
  id: number;
  category: string;
  title: string;
  date: string;
  views: number;
  content: string;
}

// 기술 카드 타입
export interface Technology {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
}

// 회사 정보 타입
export interface CompanyInfo {
  name: string;
  nameEn: string;
  ceo: string;
  address: string;
  addressDetail: string;
  businessNumber: string;
  phone: string;
  fax: string;
  email: string;
  foundedYear: number;
  copyrightYear: number;
}

// 사업 목적 타입
export interface BusinessPurpose {
  id: number;
  category: string;
  item: string;
}

// Admin 관련 타입
export interface AdminState {
  isLoggedIn: boolean;
  username: string;
}

// 드래그 이벤트 타입
export interface DragEndEvent {
  active: { id: string };
  over: { id: string } | null;
}
