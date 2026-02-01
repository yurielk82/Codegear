"use client";

import { motion } from "framer-motion";
import { Cpu, Wrench, Package, Lightbulb } from "lucide-react";

// 4개 카테고리로 구성된 핵심 연구분야
const technologyCategories = [
  {
    id: "rd-engineering",
    title: "R&D & Engineering",
    titleKr: "연구개발 및 엔지니어링",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    items: [
      "전자회로 설계",
      "AI 알고리즘 개발",
      "시스템 반도체 IP 개발",
      "임베디드 소프트웨어",
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Prototype",
    titleKr: "제조 및 시제품",
    icon: Wrench,
    gradient: "from-purple-500 to-pink-500",
    items: [
      "시제품 제작 서비스",
      "하드웨어 가속기 제작",
      "수리 및 유지보수",
      "양산 지원",
    ],
  },
  {
    id: "distribution",
    title: "Distribution & Trade",
    titleKr: "유통 및 무역",
    icon: Package,
    gradient: "from-orange-500 to-red-500",
    items: [
      "전자부품 도소매",
      "반도체 소자 공급",
      "수출입 대행",
    ],
  },
  {
    id: "consulting",
    title: "Consulting & IP",
    titleKr: "컨설팅 및 지식재산",
    icon: Lightbulb,
    gradient: "from-green-500 to-emerald-500",
    items: [
      "기술 사업화 컨설팅",
      "창업 인큐베이팅",
      "지식재산권 관리",
    ],
  },
];

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
            Code Gear는 연구개발부터 제조, 유통, 컨설팅까지
            <br />
            기술 기반 토탈 솔루션을 제공합니다.
          </p>
        </motion.div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologyCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group hover:border-white/20 transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{category.titleKr}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-sm border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
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
