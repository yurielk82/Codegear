"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FileText,
  Settings,
  Users,
  BarChart3,
  Menu,
  X,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { name: "대시보드", href: "/admin", icon: Home },
  { name: "공고 관리", href: "/admin/notices", icon: FileText },
  { name: "콘텐츠 관리", href: "/admin/content", icon: Users },
  { name: "사이트 설정", href: "/admin/settings", icon: Settings },
  { name: "통계", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // 클라이언트에서 로그인 상태 확인
  useEffect(() => {
    const stored = localStorage.getItem("admin-auth");
    if (stored) {
      try {
        setIsLoggedIn(JSON.parse(stored));
      } catch {
        setIsLoggedIn(false);
      }
    }
    setIsLoading(false);
  }, []);

  // 로그인 상태 저장
  const saveLoginState = (value: boolean) => {
    setIsLoggedIn(value);
    localStorage.setItem("admin-auth", JSON.stringify(value));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "qw1212") {
      saveLoginState(true);
      setLoginError("");
    } else {
      setLoginError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    saveLoginState(false);
    setPassword("");
    // 로그아웃 시 메인 사이트로 리다이렉트
    window.location.href = "https://www.codeg.co.kr/";
  };

  // 페이지 이동 시 모바일 사이드바 닫기
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400 text-sm">
                관리자 비밀번호를 입력하세요
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass"
                  placeholder="비밀번호 입력"
                  autoFocus
                />
              </div>

              {loginError && (
                <p className="text-red-400 text-sm">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all"
              >
                로그인
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <Link 
                href="/"
                className="text-gray-400 hover:text-white text-sm"
              >
                ← 메인 사이트로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed top-0 left-0 h-full
          bg-[#12121a] border-r border-white/5 z-40
          transition-all duration-300
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link 
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">CG</span>
            </div>
            {isSidebarOpen && (
              <span className="text-white font-bold">Admin</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full
                      ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <IconComponent size={20} />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Toggle & Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all mb-2"
          >
            <ChevronRight
              size={20}
              className={`transition-transform ${
                isSidebarOpen ? "rotate-180" : ""
              }`}
            />
            {isSidebarOpen && <span>접기</span>}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>로그아웃</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#12121a] border-b border-white/5 z-40 flex items-center justify-between px-4">
        <Link 
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold">CG</span>
          </div>
          <span className="text-white font-bold">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-white"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 h-full w-64 bg-[#12121a] border-r border-white/5 z-50 pt-16
          transform transition-transform duration-300
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full
                      ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <IconComponent size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
          flex-1 min-h-screen pt-16 lg:pt-0
          transition-all duration-300
          ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
