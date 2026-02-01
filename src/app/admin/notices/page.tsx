"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Save,
  Calendar,
} from "lucide-react";
import { sampleNotices } from "@/config/siteConfig";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Notice } from "@/types";

export default function NoticesAdminPage() {
  const [notices, setNotices] = useLocalStorage<Notice[]>(
    "admin-notices",
    sampleNotices
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    category: "공지",
    title: "",
    content: "",
  });

  const categories = ["all", "채용", "공지", "뉴스"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({ category: "공지", title: "", content: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      category: notice.category,
      title: notice.title,
      content: notice.content,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingNotice) {
      // Update existing notice
      setNotices(
        notices.map((n) =>
          n.id === editingNotice.id
            ? { ...n, ...formData }
            : n
        )
      );
    } else {
      // Create new notice
      const newNotice: Notice = {
        id: Math.max(...notices.map((n) => n.id)) + 1,
        category: formData.category,
        title: formData.title,
        content: formData.content,
        date: new Date().toISOString().split("T")[0],
        views: 0,
      };
      setNotices([newNotice, ...notices]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setNotices(notices.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">공고 관리</h1>
          <p className="text-gray-400">공고글을 작성, 수정, 삭제할 수 있습니다.</p>
        </div>
        <GlassButton
          variant="primary"
          icon={<Plus size={18} />}
          onClick={openCreateModal}
        >
          새 공고 작성
        </GlassButton>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="공고 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-glass pl-12 w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              {cat === "all" ? "전체" : cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="admin-card"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">
                  번호
                </th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">
                  분류
                </th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">
                  제목
                </th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">
                  등록일
                </th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">
                  조회수
                </th>
                <th className="text-right py-4 px-4 text-gray-400 font-medium text-sm">
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredNotices.map((notice, index) => (
                  <motion.tr
                    key={notice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
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
                    <td className="py-4 px-4 text-white">{notice.title}</td>
                    <td className="py-4 px-4 text-gray-500">{notice.date}</td>
                    <td className="py-4 px-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {notice.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(notice)}
                          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredNotices.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
            >
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingNotice ? "공고 수정" : "새 공고 작성"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      분류
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="input-glass"
                    >
                      <option value="채용">채용</option>
                      <option value="공지">공지</option>
                      <option value="뉴스">뉴스</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      제목
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="input-glass"
                      placeholder="공고 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      내용
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={6}
                      className="input-glass resize-none"
                      placeholder="공고 내용을 입력하세요"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <GlassButton
                    variant="primary"
                    icon={<Save size={18} />}
                    onClick={handleSave}
                  >
                    {editingNotice ? "수정 완료" : "작성 완료"}
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    취소
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
