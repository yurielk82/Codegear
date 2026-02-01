"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { PolygonBackground } from "./PolygonBackground";
import { siteConfig } from "@/config/siteConfig";

export function HeroSection() {
  const [heroConfig, setHeroConfig] = useState({
    mainCopy: siteConfig.hero.mainCopy,
    subCopy: siteConfig.hero.subCopy,
    ctaText: siteConfig.hero.ctaText,
  });

  // LocalStorage에서 admin이 수정한 Hero 데이터 로드
  useEffect(() => {
    const stored = localStorage.getItem("admin-hero");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setHeroConfig((prev) => ({ ...prev, ...parsed }));
        }
      } catch {
        // 파싱 실패 시 기본 데이터 사용
      }
    }
  }, []);

  const scrollToTechnology = () => {
    document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNotices = () => {
    document.getElementById("notices")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <PolygonBackground />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            하이테크 스타트업
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-white">Connecting</span>
          <br />
          <span className="gradient-text">Intelligence</span>
          <br />
          <span className="text-white">to Hardware</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {heroConfig.subCopy}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassButton
            variant="primary"
            size="lg"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
            onClick={scrollToTechnology}
          >
            {heroConfig.ctaText}
          </GlassButton>

          <GlassButton
            variant="secondary"
            size="lg"
            onClick={scrollToNotices}
          >
            공고 보기
          </GlassButton>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {["NPU", "Robot Control", "System Semiconductor", "AI Accelerator"].map(
            (tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.button
          onClick={scrollToTechnology}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
