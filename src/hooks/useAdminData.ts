// =============================================================================
// useAdminData Hook - 서버 데이터와 동기화하는 훅
// =============================================================================

"use client";

import { useState, useEffect, useCallback } from 'react';

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

interface AdminData {
  notices: Notice[];
  hero: HeroConfig;
  company: CompanyInfo;
  social: SocialLinks;
  technologies: Technology[];
  lastUpdated: string;
}

type DataType = 'notices' | 'hero' | 'company' | 'social' | 'technologies';

// 단일 타입 데이터 훅
export function useAdminData<T>(type: DataType, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // 데이터 로드
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin?type=${type}`, {
        cache: 'no-store', // 항상 최신 데이터 가져오기
      });
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to load data');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('서버에 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  }, [type]);

  // 데이터 저장
  const saveData = useCallback(async (newData: T): Promise<boolean> => {
    try {
      setSaving(true);
      setError(null);
      
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data: newData }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setData(newData);
        return true;
      } else {
        setError(result.error || 'Failed to save data');
        return false;
      }
    } catch (err) {
      console.error('Save error:', err);
      setError('저장에 실패했습니다.');
      return false;
    } finally {
      setSaving(false);
    }
  }, [type]);

  // 데이터 초기화
  const resetData = useCallback(async (): Promise<boolean> => {
    try {
      setSaving(true);
      setError(null);
      
      const response = await fetch(`/api/admin?type=${type}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        // 초기화 후 데이터 다시 로드
        await fetchData();
        return true;
      } else {
        setError(result.error || 'Failed to reset data');
        return false;
      }
    } catch (err) {
      console.error('Reset error:', err);
      setError('초기화에 실패했습니다.');
      return false;
    } finally {
      setSaving(false);
    }
  }, [type, fetchData]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    loading,
    error,
    saving,
    saveData,
    resetData,
    refetch: fetchData,
  };
}

// 전체 관리자 데이터 훅
export function useAllAdminData() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin', {
        cache: 'no-store',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to load data');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('서버에 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// 공고 데이터 전용 훅 (CRUD 기능 포함)
export function useNotices() {
  const { data, setData, loading, error, saving, saveData, resetData, refetch } = useAdminData<Notice[]>('notices', []);

  // 공고 추가
  const addNotice = useCallback(async (notice: Omit<Notice, 'id' | 'date' | 'views'>): Promise<boolean> => {
    const newNotice: Notice = {
      id: Math.max(...data.map(n => n.id), 0) + 1,
      ...notice,
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    return saveData([newNotice, ...data]);
  }, [data, saveData]);

  // 공고 수정
  const updateNotice = useCallback(async (id: number, updates: Partial<Notice>): Promise<boolean> => {
    const updatedNotices = data.map(n => 
      n.id === id ? { ...n, ...updates } : n
    );
    return saveData(updatedNotices);
  }, [data, saveData]);

  // 공고 삭제
  const deleteNotice = useCallback(async (id: number): Promise<boolean> => {
    const filteredNotices = data.filter(n => n.id !== id);
    return saveData(filteredNotices);
  }, [data, saveData]);

  // 조회수 증가
  const incrementViews = useCallback(async (id: number): Promise<void> => {
    const notice = data.find(n => n.id === id);
    if (notice) {
      await updateNotice(id, { views: notice.views + 1 });
    }
  }, [data, updateNotice]);

  return {
    notices: data,
    setNotices: setData,
    loading,
    error,
    saving,
    addNotice,
    updateNotice,
    deleteNotice,
    incrementViews,
    resetData,
    refetch,
  };
}

// Hero 설정 전용 훅
export function useHeroConfig() {
  const defaultHero: HeroConfig = {
    mainCopy: "Connecting Intelligence to Hardware",
    subCopy: "지능형 하드웨어의 미래를 설계합니다",
    ctaText: "기술 알아보기",
  };
  
  return useAdminData<HeroConfig>('hero', defaultHero);
}

// 회사 정보 전용 훅
export function useCompanyInfo() {
  const defaultCompany: CompanyInfo = {
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
  };
  
  return useAdminData<CompanyInfo>('company', defaultCompany);
}

// 소셜 링크 전용 훅
export function useSocialLinks() {
  const defaultSocial: SocialLinks = {
    github: "https://github.com/codegear",
    linkedin: "https://linkedin.com/company/codegear",
    twitter: "https://twitter.com/codegear",
  };
  
  return useAdminData<SocialLinks>('social', defaultSocial);
}

// 기술 정보 전용 훅
export function useTechnologies() {
  const defaultTechnologies: Technology[] = [
    { id: "npu", title: "NPU 설계", subtitle: "Neural Processing Unit", description: "고효율 신경망 처리 유닛 설계 및 최적화", icon: "cpu", gradient: "from-blue-500 to-cyan-500" },
    { id: "robot-control", title: "로봇 제어 시스템", subtitle: "Robot Control System", description: "정밀 모션 제어 및 실시간 로봇 시스템", icon: "robot", gradient: "from-purple-500 to-pink-500" },
    { id: "semiconductor-ip", title: "시스템 반도체 IP", subtitle: "System Semiconductor IP", description: "맞춤형 반도체 IP 코어 설계 및 라이센싱", icon: "chip", gradient: "from-orange-500 to-red-500" },
    { id: "embedded-sw", title: "임베디드 소프트웨어", subtitle: "Embedded Software", description: "저전력 고성능 임베디드 시스템 개발", icon: "code", gradient: "from-green-500 to-emerald-500" },
    { id: "ai-accelerator", title: "AI 가속기", subtitle: "AI Accelerator", description: "머신러닝 추론 가속을 위한 전용 하드웨어", icon: "zap", gradient: "from-yellow-500 to-orange-500" },
    { id: "fpga-design", title: "FPGA 설계", subtitle: "FPGA Design", description: "프로토타이핑 및 커스텀 로직 구현", icon: "grid", gradient: "from-indigo-500 to-purple-500" },
    { id: "soc-integration", title: "SoC 통합", subtitle: "System on Chip", description: "시스템 온 칩 아키텍처 설계 및 통합", icon: "layers", gradient: "from-teal-500 to-cyan-500" },
    { id: "verification", title: "설계 검증", subtitle: "Design Verification", description: "하드웨어 설계 검증 및 테스트 자동화", icon: "check-circle", gradient: "from-rose-500 to-pink-500" },
  ];
  
  return useAdminData<Technology[]>('technologies', defaultTechnologies);
}
