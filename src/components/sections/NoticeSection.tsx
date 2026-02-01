"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { defaultNoticeColumns, sampleNotices } from "@/config/siteConfig";
import { X, ExternalLink, Eye, Loader2 } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import type { Notice } from "@/types";

export function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>(sampleNotices);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  // 서버에서 공고 데이터 로드
  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await fetch("/api/admin?type=notices", {
          cache: "no-store",
        });
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setNotices(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        // API 실패 시 기본 데이터 유지
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const handleRowClick = (notice: Notice) => {
    setSelectedNotice(notice);
  };

  const closeModal = () => {
    setSelectedNotice(null);
  };

  return (
    <section id="notices" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Public Notice
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            공고 게시판
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Code Gear의 최신 채용 공고 및 회사 소식을 확인하세요.
          </p>
        </motion.div>

        {/* Notice Table (읽기 전용 - 드래그 불가) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {defaultNoticeColumns.map((column) => (
                      <th
                        key={column.id}
                        className="text-left py-4 px-4 text-gray-400 font-medium text-sm"
                        style={{ width: column.width }}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice) => (
                    <tr
                      key={notice.id}
                      onClick={() => handleRowClick(notice)}
                      className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-500">{notice.id}</td>
                      <td className="py-4 px-4">
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
                      <td className="py-4 px-4 text-white hover:text-blue-400 transition-colors">
                        {notice.title}
                      </td>
                      <td className="py-4 px-4 text-gray-500">{notice.date}</td>
                      <td className="py-4 px-4 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {notice.views.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && notices.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              등록된 공고가 없습니다.
            </div>
          )}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/notices"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            전체 공고 보기
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span
                      className={`
                        inline-block px-3 py-1 rounded-full text-xs font-medium mb-3
                        ${
                          selectedNotice.category === "채용"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : selectedNotice.category === "공지"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }
                      `}
                    >
                      {selectedNotice.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedNotice.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>등록일: {selectedNotice.date}</span>
                  <span>조회수: {selectedNotice.views.toLocaleString()}</span>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedNotice.content}
                  </p>
                  <p className="text-gray-400 mt-4">
                    이 공고에 대한 자세한 내용은 담당자에게 문의해 주세요.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <GlassButton variant="primary">
                    지원하기
                  </GlassButton>
                  <GlassButton variant="secondary" onClick={closeModal}>
                    닫기
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default NoticeSection;
