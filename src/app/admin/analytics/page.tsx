"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, Eye, FileText, TrendingUp } from "lucide-react";
import { sampleNotices } from "@/config/siteConfig";

export default function AnalyticsAdminPage() {
  // 실제 데이터 기반 통계 계산
  const stats = useMemo(() => {
    const totalViews = sampleNotices.reduce((acc, n) => acc + n.views, 0);
    const totalNotices = sampleNotices.length;
    const avgViews = Math.round(totalViews / totalNotices);
    
    // 카테고리별 통계
    const categoryCount: Record<string, number> = {};
    const categoryViews: Record<string, number> = {};
    
    sampleNotices.forEach((notice) => {
      categoryCount[notice.category] = (categoryCount[notice.category] || 0) + 1;
      categoryViews[notice.category] = (categoryViews[notice.category] || 0) + notice.views;
    });

    const categoryStats = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      views: categoryViews[category],
      percentage: Math.round((count / totalNotices) * 100),
      color: category === "채용" ? "blue" : category === "공지" ? "green" : "purple",
    }));

    // 인기 공고 TOP 5
    const topNotices = [...sampleNotices]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // 최근 7일 조회수 (시뮬레이션 - 실제로는 날짜별 데이터 필요)
    const weeklyViews = [
      { day: "월", views: Math.round(totalViews * 0.12) },
      { day: "화", views: Math.round(totalViews * 0.18) },
      { day: "수", views: Math.round(totalViews * 0.15) },
      { day: "목", views: Math.round(totalViews * 0.22) },
      { day: "금", views: Math.round(totalViews * 0.19) },
      { day: "토", views: Math.round(totalViews * 0.08) },
      { day: "일", views: Math.round(totalViews * 0.06) },
    ];

    return {
      totalViews,
      totalNotices,
      avgViews,
      categoryStats,
      topNotices,
      weeklyViews,
    };
  }, []);

  const maxWeeklyViews = Math.max(...stats.weeklyViews.map((d) => d.views));

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
          공고 현황 및 조회 통계를 확인할 수 있습니다.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "총 공고 수",
            value: stats.totalNotices.toString(),
            icon: FileText,
            sub: "등록된 공고",
          },
          {
            label: "총 조회수",
            value: stats.totalViews.toLocaleString(),
            icon: Eye,
            sub: "전체 조회",
          },
          {
            label: "평균 조회수",
            value: stats.avgViews.toLocaleString(),
            icon: BarChart3,
            sub: "공고당 평균",
          },
          {
            label: "카테고리",
            value: stats.categoryStats.length.toString(),
            icon: TrendingUp,
            sub: "분류 수",
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
              <span className="text-gray-500 text-xs">
                {stat.sub}
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
            <h2 className="text-lg font-semibold text-white">주간 조회수 분포</h2>
            <span className="text-gray-500 text-sm">
              총 {stats.totalViews.toLocaleString()} 조회 기준
            </span>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-4 h-48">
            {stats.weeklyViews.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-gray-400 text-xs">{data.views}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.views / maxWeeklyViews) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg min-h-[20px]"
                />
                <span className="text-gray-500 text-xs">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <span className="text-gray-500 text-sm">
              일평균 {Math.round(stats.totalViews / 7).toLocaleString()} 조회
            </span>
            <span className="text-gray-500 text-sm">
              최고 {maxWeeklyViews.toLocaleString()} 조회 (목)
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
            {stats.categoryStats.map((stat, index) => (
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
                <div className="text-right mt-1">
                  <span className="text-gray-600 text-xs">
                    {stat.views.toLocaleString()} 조회
                  </span>
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
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                  등록일
                </th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">
                  조회수
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.topNotices.map((notice, index) => (
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
                  <td className="py-3 px-4 text-gray-500">{notice.date}</td>
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
        * 통계는 등록된 공고 데이터를 기반으로 계산됩니다.
      </motion.p>
    </div>
  );
}
