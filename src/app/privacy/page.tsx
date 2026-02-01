"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function PrivacyPage() {
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
          개인정보처리방침
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
                1. 개인정보의 처리 목적
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {siteConfig.company.name}(이하 &quot;회사&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다.
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                <li>채용 지원자 관리: 입사지원서 접수, 채용 전형 진행, 합격 여부 통보</li>
                <li>서비스 제공: 문의사항 접수 및 처리, 고객 상담</li>
                <li>마케팅 활용: 이벤트 및 광고성 정보 제공 (동의 시)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                2. 개인정보의 처리 및 보유 기간
              </h2>
              <p className="text-gray-400 leading-relaxed">
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 
                수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                <li>채용 관련: 채용 절차 종료 후 3년</li>
                <li>고객 문의: 문의 처리 완료 후 1년</li>
                <li>마케팅 활용: 동의 철회 시까지</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                3. 정보주체의 권리·의무 및 행사방법
              </h2>
              <p className="text-gray-400 leading-relaxed">
                정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                4. 개인정보의 안전성 확보 조치
              </h2>
              <p className="text-gray-400 leading-relaxed">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
                <li>기술적 조치: 개인정보처리시스템 접근권한 관리, 보안프로그램 설치</li>
                <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                5. 개인정보 보호책임자
              </h2>
              <div className="bg-white/5 rounded-xl p-6 text-gray-400">
                <p>성명: 개인정보 보호책임자</p>
                <p>직책: 대표이사</p>
                <p>연락처: {siteConfig.company.phone}</p>
                <p>이메일: {siteConfig.company.email}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                6. 개인정보 처리방침 변경
              </h2>
              <p className="text-gray-400 leading-relaxed">
                이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 
                추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 
                통하여 고지할 것입니다.
              </p>
              <p className="text-gray-500 mt-4">
                시행일자: 2024년 1월 1일
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
