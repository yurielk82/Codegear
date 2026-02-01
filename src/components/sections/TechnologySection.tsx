"use client";

import { motion } from "framer-motion";
import { TechCard } from "@/components/ui/GlassCard";
import { Icon, IconName } from "@/components/ui/Icons";
import { siteConfig } from "@/config/siteConfig";

export function TechnologySection() {
  return (
    <section id="technology" className="relative py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Core Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            핵심 연구 분야
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Code Gear는 차세대 지능형 하드웨어 기술을 선도합니다.
            <br />
            NPU 설계부터 로봇 제어 시스템까지, 혁신적인 솔루션을 제공합니다.
          </p>
        </motion.div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.technologies.map((tech, index) => (
            <TechCard
              key={tech.id}
              title={tech.title}
              subtitle={tech.subtitle}
              description={tech.description}
              icon={
                <Icon
                  name={tech.icon as IconName}
                  size={24}
                  className="text-white"
                />
              }
              gradient={tech.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-500 text-sm">
            더 자세한 기술 정보가 필요하신가요?{" "}
            <a
              href="#contact"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              문의하기
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TechnologySection;
