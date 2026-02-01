"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface CompanyInfo {
  name: string;
  nameEn: string;
  ceo: string;
  address: string;
  addressDetail: string;
  businessNumber: string;
  phone: string;
  fax: string;
  email: string;
  businessStartYear: number;
  foundedYear: number;
  copyrightYear: number;
}

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export function Footer() {
  const [isBusinessPurposesOpen, setIsBusinessPurposesOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(siteConfig.company);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(siteConfig.social);

  // LocalStorage에서 admin이 수정한 데이터 로드
  useEffect(() => {
    const storedCompany = localStorage.getItem("admin-company");
    if (storedCompany) {
      try {
        const parsed = JSON.parse(storedCompany);
        if (parsed && typeof parsed === "object") {
          setCompanyInfo((prev) => ({ ...prev, ...parsed }));
        }
      } catch {
        // 파싱 실패 시 기본 데이터 사용
      }
    }

    const storedSocial = localStorage.getItem("admin-social");
    if (storedSocial) {
      try {
        const parsed = JSON.parse(storedSocial);
        if (parsed && typeof parsed === "object") {
          setSocialLinks((prev) => ({ ...prev, ...parsed }));
        }
      } catch {
        // 파싱 실패 시 기본 데이터 사용
      }
    }
  }, []);

  // Group business purposes by category
  const groupedPurposes = siteConfig.businessPurposes.reduce((acc, purpose) => {
    if (!acc[purpose.category]) {
      acc[purpose.category] = [];
    }
    acc[purpose.category].push(purpose);
    return acc;
  }, {} as Record<string, typeof siteConfig.businessPurposes>);

  return (
    <footer id="contact" className="relative bg-black/50 border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">CG</span>
              </div>
              <div>
                <span className="text-white font-bold text-2xl block">Code Gear</span>
                <span className="text-gray-500 text-sm">{companyInfo.name}</span>
              </div>
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              {siteConfig.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} className="text-blue-400" />
                {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={18} className="text-blue-400" />
                {companyInfo.phone}
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-blue-400 mt-0.5" />
                <span>
                  {companyInfo.address}
                  <br />
                  {companyInfo.addressDetail}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-3">
              {siteConfig.navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">법적 정보</h3>
            <ul className="space-y-3">
              {siteConfig.navigation.footer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Business Info */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                사업자등록번호: {companyInfo.businessNumber}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                대표: {companyInfo.ceo}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                창업: {companyInfo.businessStartYear}년 (개인사업자)
              </p>
              <p className="text-gray-500 text-sm mt-1">
                법인설립: {companyInfo.foundedYear}년
              </p>
            </div>
          </div>
        </div>

        {/* Business Purposes Accordion */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <button
            onClick={() => setIsBusinessPurposesOpen(!isBusinessPurposesOpen)}
            className="flex items-center justify-between w-full text-left group"
          >
            <h3 className="text-white font-semibold">사업 목적 ({siteConfig.businessPurposes.length}개 항목)</h3>
            <motion.div
              animate={{ rotate: isBusinessPurposesOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} className="text-gray-400 group-hover:text-white transition-colors" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isBusinessPurposesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                  {Object.entries(groupedPurposes).map(([category, purposes]) => (
                    <div key={category}>
                      <h4 className="text-blue-400 font-medium mb-3 text-sm uppercase tracking-wider">
                        {category}
                      </h4>
                      <ul className="space-y-2">
                        {purposes.map((purpose) => (
                          <li
                            key={purpose.id}
                            className="text-gray-500 text-sm flex items-start gap-2"
                          >
                            <span className="text-gray-600">{purpose.id}.</span>
                            {purpose.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {companyInfo.copyrightYear} {companyInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Designed with <span className="text-red-400">♥</span> by Code Gear Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
