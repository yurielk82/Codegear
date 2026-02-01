"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  ArrowRight,
  Calendar,
  Settings,
} from "lucide-react";
import { sampleNotices, siteConfig } from "@/config/siteConfig";

const stats = [
  {
    label: "총 공고 수",
    value: sampleNotices.length,
    change: "+2",
    changeType: "positive",
    icon: FileText,
  },
  {
    label: "총 조회수",
    value: sampleNotices.reduce((acc, n) => acc + n.views, 0).toLocaleString(),
    change: "+12%",
    changeType: "positive",
    icon: Eye,
  },
  {
    label: "핵심 기술",
    value: siteConfig.technologies.length,
    change: "0",
    changeType: "neutral",
    icon: TrendingUp,
  },
  {
    label: "사업 영역",
    value: siteConfig.businessPurposes.length,
    change: "0",
    changeType: "neutral",
    icon: Users,
  },
];

const quickActions = [
  { label: "새 공고 작성", href: "/admin/notices", icon: FileText },
  { label: "콘텐츠 수정", href: "/admin/content", icon: Users },
  { label: "사이트 설정", href: "/admin/settings", icon: Settings },
];

export default function AdminDashboard() {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.href = href;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">대시보드</h1>
        <p className="text-gray-400">
          Code Gear 관리자 페이지에 오신 것을 환영합니다.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <stat.icon size={20} className="text-blue-400" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-400"
                    : stat.changeType === "negative"
                    ? "text-red-400"
                    : "text-gray-500"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card"
        >
          <h2 className="text-lg font-semibold text-white mb-4">빠른 작업</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                onClick={(e) => handleNavClick(e, action.href)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <action.icon size={18} className="text-blue-400" />
                  <span className="text-gray-300">{action.label}</span>
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-500 group-hover:text-white transition-colors"
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Recent Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="admin-card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">최근 공고</h2>
            <a
              href="/admin/notices"
              onClick={(e) => handleNavClick(e, "/admin/notices")}
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 cursor-pointer"
            >
              전체 보기 <ArrowRight size={14} />
            </a>
          </div>
          <div className="space-y-3">
            {sampleNotices.slice(0, 4).map((notice) => (
              <div
                key={notice.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      notice.category === "채용"
                        ? "bg-blue-500/20 text-blue-400"
                        : notice.category === "공지"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    {notice.category}
                  </span>
                  <span className="text-gray-300 text-sm truncate max-w-[200px] lg:max-w-[300px]">
                    {notice.title}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="hidden sm:flex items-center gap-1">
                    <Eye size={14} />
                    {notice.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {notice.date.slice(5)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Site Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="admin-card mt-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">사이트 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">사이트명</p>
            <p className="text-white">{siteConfig.siteName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">회사명</p>
            <p className="text-white">{siteConfig.company.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">이메일</p>
            <p className="text-white">{siteConfig.company.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">전화번호</p>
            <p className="text-white">{siteConfig.company.phone}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
