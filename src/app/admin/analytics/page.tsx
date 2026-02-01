"use client";

import { motion } from "framer-motion";
import { BarChart3, Eye, Users, TrendingUp, Calendar } from "lucide-react";
import { sampleNotices } from "@/config/siteConfig";

// Demo analytics data
const weeklyViews = [
  { day: "월", views: 120 },
  { day: "화", views: 180 },
  { day: "수", views: 150 },
  { day: "목", views: 220 },
  { day: "금", views: 190 },
  { day: "토", views: 80 },
  { day: "일", views: 60 },
];

const topNotices = [...sampleNotices]
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

const categoryStats = [
  { category: "채용", count: 3, percentage: 50, color: "blue" },
  { category: "공지", count: 2, percentage: 33, color: "green" },
  { category: "뉴스", count: 1, percentage: 17, color: "purple" },
];

export default function AnalyticsAdminPage() {
  const totalViews = sampleNotices.reduce((acc, n) => acc + n.views, 0);
  const maxViews = Math.max(...weeklyViews.map((d) => d.views));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">통계</h1>
        <p className="text-gray-400">
          사이트 방문 및 공고 조회 통계를 확인할 수 있습니다.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "총 조회수",
            value: totalViews.toLocaleString(),
            icon: Eye,
            change: "+12%",
          },
          {
            label: "이번 주 방문자",
            value: "1,000",
            icon: Users,
            change: "+8%",
          },
          {
            label: "평균 체류시간",
            value: "2분 34초",
            icon: Calendar,
            change: "+5%",
          },
          {
            label: "전환율",
            value: "3.2%",
            icon: TrendingUp,
            change: "+0.5%",
          },
        ].map((stat, index) => (
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
              <span className="text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">주간 조회수</h2>
            <select className="input-glass text-sm py-1 px-3 w-auto">
              <option>이번 주</option>
              <option>지난 주</option>
              <option>이번 달</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-4 h-48">
            {weeklyViews.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.views / maxViews) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg min-h-[20px]"
                />
                <span className="text-gray-500 text-xs">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <span className="text-gray-500 text-sm">
              총 {weeklyViews.reduce((acc, d) => acc + d.views, 0).toLocaleString()} 조회
            </span>
            <span className="text-gray-500 text-sm">
              일평균 {Math.round(weeklyViews.reduce((acc, d) => acc + d.views, 0) / 7)} 조회
            </span>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="admin-card"
        >
          <h2 className="text-lg font-semibold text-white mb-6">카테고리 분포</h2>

          <div className="space-y-4">
            {categoryStats.map((stat, index) => (
              <div key={stat.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{stat.category}</span>
                  <span className="text-gray-500 text-sm">
                    {stat.count}개 ({stat.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      stat.color === "blue"
                        ? "bg-blue-500"
                        : stat.color === "green"
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Notices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="admin-card mt-6"
      >
        <h2 className="text-lg font-semibold text-white mb-6">
          인기 공고 TOP 5
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                  순위
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                  제목
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                  분류
                </th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">
                  조회수
                </th>
              </tr>
            </thead>
            <tbody>
              {topNotices.map((notice, index) => (
                <tr
                  key={notice.id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="py-3 px-4">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? "bg-yellow-500/20 text-yellow-400"
                          : index === 1
                          ? "bg-gray-500/20 text-gray-400"
                          : index === 2
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white">{notice.title}</td>
                  <td className="py-3 px-4">
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
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400">
                    {notice.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Info Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-gray-500 text-sm mt-8"
      >
        * 통계 데이터는 데모용입니다. 실제 서비스에서는 Google Analytics 등과 연동하여 사용하세요.
      </motion.p>
    </div>
  );
}
