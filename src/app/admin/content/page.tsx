"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { siteConfig } from "@/config/siteConfig";

export default function ContentAdminPage() {
  const [heroConfig, setHeroConfig] = useLocalStorage("admin-hero", {
    mainCopy: siteConfig.hero.mainCopy,
    subCopy: siteConfig.hero.subCopy,
    ctaText: siteConfig.hero.ctaText,
  });

  const [technologies, setTechnologies] = useLocalStorage(
    "admin-technologies",
    siteConfig.technologies
  );

  const [activeTab, setActiveTab] = useState<"hero" | "tech">("hero");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleResetHero = () => {
    if (confirm("Hero 섹션을 초기 상태로 되돌리시겠습니까?")) {
      setHeroConfig({
        mainCopy: siteConfig.hero.mainCopy,
        subCopy: siteConfig.hero.subCopy,
        ctaText: siteConfig.hero.ctaText,
      });
    }
  };

  const handleResetTech = () => {
    if (confirm("기술 카드를 초기 상태로 되돌리시겠습니까?")) {
      setTechnologies(siteConfig.technologies);
    }
  };

  const updateTechnology = (index: number, field: string, value: string) => {
    const updated = [...technologies];
    updated[index] = { ...updated[index], [field]: value };
    setTechnologies(updated);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">콘텐츠 관리</h1>
        <p className="text-gray-400">
          메인 페이지의 슬로건과 기술 카드 내용을 수정할 수 있습니다.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab("hero")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "hero"
              ? "text-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Hero 섹션
          {activeTab === "hero" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("tech")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "tech"
              ? "text-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          기술 카드
          {activeTab === "tech" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
            />
          )}
        </button>
      </div>

      {/* Hero Section Editor */}
      {activeTab === "hero" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Hero 섹션 편집</h2>
            <button
              onClick={handleResetHero}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
            >
              <RotateCcw size={14} />
              초기화
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                메인 카피 (영문)
              </label>
              <input
                type="text"
                value={heroConfig.mainCopy}
                onChange={(e) =>
                  setHeroConfig({ ...heroConfig, mainCopy: e.target.value })
                }
                className="input-glass"
                placeholder="Connecting Intelligence to Hardware"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                서브 카피 (국문)
              </label>
              <input
                type="text"
                value={heroConfig.subCopy}
                onChange={(e) =>
                  setHeroConfig({ ...heroConfig, subCopy: e.target.value })
                }
                className="input-glass"
                placeholder="지능형 하드웨어의 미래를 설계합니다"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                CTA 버튼 텍스트
              </label>
              <input
                type="text"
                value={heroConfig.ctaText}
                onChange={(e) =>
                  setHeroConfig({ ...heroConfig, ctaText: e.target.value })
                }
                className="input-glass"
                placeholder="기술 알아보기"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-sm text-gray-400 mb-4">미리보기</h3>
            <div className="p-6 rounded-xl bg-white/5 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                {heroConfig.mainCopy}
              </h1>
              <p className="text-gray-400 mb-4">{heroConfig.subCopy}</p>
              <span className="inline-block px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm">
                {heroConfig.ctaText}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <GlassButton
              variant="primary"
              icon={<Save size={18} />}
              onClick={handleSave}
            >
              {isSaved ? "저장됨!" : "변경사항 저장"}
            </GlassButton>
          </div>
        </motion.div>
      )}

      {/* Technology Cards Editor */}
      {activeTab === "tech" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              {technologies.length}개의 기술 카드를 관리합니다.
            </p>
            <button
              onClick={handleResetTech}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
            >
              <RotateCcw size={14} />
              초기화
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <div key={tech.id} className="admin-card">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center`}
                  >
                    <span className="text-white text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{tech.title}</h3>
                    <p className="text-gray-500 text-sm">{tech.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      제목
                    </label>
                    <input
                      type="text"
                      value={tech.title}
                      onChange={(e) =>
                        updateTechnology(index, "title", e.target.value)
                      }
                      className="input-glass text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      부제목
                    </label>
                    <input
                      type="text"
                      value={tech.subtitle}
                      onChange={(e) =>
                        updateTechnology(index, "subtitle", e.target.value)
                      }
                      className="input-glass text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      설명
                    </label>
                    <textarea
                      value={tech.description}
                      onChange={(e) =>
                        updateTechnology(index, "description", e.target.value)
                      }
                      rows={2}
                      className="input-glass text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <GlassButton
              variant="primary"
              icon={<Save size={18} />}
              onClick={handleSave}
            >
              {isSaved ? "저장됨!" : "변경사항 저장"}
            </GlassButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
