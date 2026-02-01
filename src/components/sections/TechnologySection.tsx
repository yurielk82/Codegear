"use client";

import { motion } from "framer-motion";
import { Cpu, Wrench, Package, Lightbulb } from "lucide-react";

// 4개 카테고리로 구성된 핵심 연구분야
const technologyCategories = [
  {
    id: "rd-engineering",
    title: "연구개발 및 엔지니어링",
    subtitle: "R&D & Engineering",
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
    title: "제조 및 시제품",
    subtitle: "Manufacturing & Prototype",
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
    title: "유통 및 무역",
    subtitle: "Distribution & Trade",
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
    title: "컨설팅 및 지식재산",
    subtitle: "Consulting & IP",
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

        {/* Technology Cards Grid - 원본 TechCard 스타일 유지 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologyCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="glass-card p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} opacity-80`}
              />

              {/* Icon container */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon size={24} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
              <p className="text-sm text-blue-400 mb-4">{category.subtitle}</p>
              
              {/* Items list */}
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-gray-400 text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-[20px]`}
              />
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
