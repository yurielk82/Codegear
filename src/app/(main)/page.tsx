"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { NoticeSection } from "@/components/sections/NoticeSection";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Technology Section */}
      <TechnologySection />

      {/* Notice Section */}
      <NoticeSection />

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              회사 소개
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              주식회사 코드기어(Code Gear)는 차세대 지능형 하드웨어 기술을 선도하는 
              하이테크 스타트업입니다. NPU 설계, 로봇 제어 시스템, 시스템 반도체 IP 등 
              핵심 기술을 바탕으로 산업의 디지털 전환을 가속화합니다.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              우리는 &quot;지능을 하드웨어에 연결한다&quot;는 비전 아래, 
              소프트웨어와 하드웨어의 경계를 허물고 
              더 스마트한 미래를 만들어 나가고 있습니다.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: "2018", label: "사업 시작" },
              { value: "2026", label: "법인 설립" },
              { value: "8+", label: "핵심 기술" },
              { value: "27", label: "사업 영역" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              함께 미래를 만들어 갈 인재를 찾습니다
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Code Gear와 함께 지능형 하드웨어의 새로운 시대를 열어가세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#notices"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25"
              >
                채용 공고 보기
              </a>
              <a
                href={`mailto:contact@codegear.co.kr`}
                className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/20"
              >
                문의하기
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
