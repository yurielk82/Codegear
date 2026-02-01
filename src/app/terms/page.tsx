"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            메인으로 돌아가기
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          이용약관
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert max-w-none"
        >
          <div className="glass-card p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제1조 (목적)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                이 약관은 {siteConfig.company.name}(이하 &quot;회사&quot;)가 운영하는 웹사이트(이하 &quot;사이트&quot;)에서 
                제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 
                기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제2조 (정의)
              </h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>&quot;사이트&quot;란 회사가 서비스를 제공하기 위해 운영하는 웹사이트를 말합니다.</li>
                <li>&quot;이용자&quot;란 사이트에 접속하여 이 약관에 따라 서비스를 이용하는 자를 말합니다.</li>
                <li>&quot;서비스&quot;란 회사가 사이트를 통해 제공하는 모든 서비스를 말합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제3조 (약관의 효력 및 변경)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                ① 이 약관은 사이트 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.<br /><br />
                ② 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 
                적용일자 및 변경사유를 명시하여 현행 약관과 함께 사이트에 그 적용일자 7일 이전부터 
                공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제4조 (서비스의 제공 및 변경)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                ① 회사는 다음과 같은 서비스를 제공합니다.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                <li>회사 정보 및 기술 소개</li>
                <li>채용 공고 및 지원 접수</li>
                <li>기타 회사가 정하는 서비스</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-4">
                ② 회사는 서비스의 내용을 변경할 수 있으며, 변경 시 그 내용을 사이트에 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제5조 (이용자의 의무)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                이용자는 다음 행위를 하여서는 안 됩니다.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                <li>타인의 정보를 도용하는 행위</li>
                <li>회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위</li>
                <li>사이트의 운영을 방해하는 행위</li>
                <li>기타 관계 법령에 위배되는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제6조 (저작권의 귀속)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                ① 사이트에 게시된 콘텐츠의 저작권은 회사에 귀속됩니다.<br /><br />
                ② 이용자는 회사가 제공하는 서비스를 이용함으로써 얻은 정보를 회사의 
                사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 
                이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제7조 (면책조항)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 
                경우에는 서비스 제공에 관한 책임이 면제됩니다.<br /><br />
                ② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                제8조 (준거법 및 관할)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                ① 이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국의 법률을 적용합니다.<br /><br />
                ② 서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 
                소재지를 관할하는 법원을 전속 관할법원으로 합니다.
              </p>
            </section>

            <section className="border-t border-white/10 pt-8">
              <p className="text-gray-500">
                부칙<br />
                이 약관은 2024년 1월 1일부터 시행합니다.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
