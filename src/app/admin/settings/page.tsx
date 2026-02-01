"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { siteConfig } from "@/config/siteConfig";

export default function SettingsAdminPage() {
  const [companyInfo, setCompanyInfo] = useLocalStorage("admin-company", {
    name: siteConfig.company.name,
    nameEn: siteConfig.company.nameEn,
    ceo: siteConfig.company.ceo,
    address: siteConfig.company.address,
    addressDetail: siteConfig.company.addressDetail,
    businessNumber: siteConfig.company.businessNumber,
    phone: siteConfig.company.phone,
    fax: siteConfig.company.fax,
    email: siteConfig.company.email,
    copyrightYear: siteConfig.company.copyrightYear,
  });

  const [socialLinks, setSocialLinks] = useLocalStorage("admin-social", {
    github: siteConfig.social.github,
    linkedin: siteConfig.social.linkedin,
    twitter: siteConfig.social.twitter,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("모든 설정을 초기 상태로 되돌리시겠습니까?")) {
      setCompanyInfo({
        name: siteConfig.company.name,
        nameEn: siteConfig.company.nameEn,
        ceo: siteConfig.company.ceo,
        address: siteConfig.company.address,
        addressDetail: siteConfig.company.addressDetail,
        businessNumber: siteConfig.company.businessNumber,
        phone: siteConfig.company.phone,
        fax: siteConfig.company.fax,
        email: siteConfig.company.email,
        copyrightYear: siteConfig.company.copyrightYear,
      });
      setSocialLinks({
        github: siteConfig.social.github,
        linkedin: siteConfig.social.linkedin,
        twitter: siteConfig.social.twitter,
      });
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">사이트 설정</h1>
          <p className="text-gray-400">
            회사 정보 및 푸터에 표시될 내용을 수정할 수 있습니다.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
        >
          <RotateCcw size={14} />
          전체 초기화
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="admin-card"
        >
          <h2 className="text-lg font-semibold text-white mb-6">회사 정보</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  회사명 (국문)
                </label>
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={(e) =>
                    setCompanyInfo({ ...companyInfo, name: e.target.value })
                  }
                  className="input-glass"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  회사명 (영문)
                </label>
                <input
                  type="text"
                  value={companyInfo.nameEn}
                  onChange={(e) =>
                    setCompanyInfo({ ...companyInfo, nameEn: e.target.value })
                  }
                  className="input-glass"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                대표이사
              </label>
              <input
                type="text"
                value={companyInfo.ceo}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, ceo: e.target.value })
                }
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                주소
              </label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, address: e.target.value })
                }
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                상세 주소
              </label>
              <input
                type="text"
                value={companyInfo.addressDetail}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    addressDetail: e.target.value,
                  })
                }
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                사업자등록번호
              </label>
              <input
                type="text"
                value={companyInfo.businessNumber}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    businessNumber: e.target.value,
                  })
                }
                className="input-glass"
                placeholder="XXX-XX-XXXXX"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="admin-card"
        >
          <h2 className="text-lg font-semibold text-white mb-6">연락처 정보</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                전화번호
              </label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, phone: e.target.value })
                }
                className="input-glass"
                placeholder="041-XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                팩스
              </label>
              <input
                type="text"
                value={companyInfo.fax}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, fax: e.target.value })
                }
                className="input-glass"
                placeholder="041-XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, email: e.target.value })
                }
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                저작권 연도
              </label>
              <input
                type="number"
                value={companyInfo.copyrightYear}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    copyrightYear: parseInt(e.target.value),
                  })
                }
                className="input-glass"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="admin-card lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            소셜 미디어 링크
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">GitHub</label>
              <input
                type="url"
                value={socialLinks.github}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, github: e.target.value })
                }
                className="input-glass"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
                className="input-glass"
                placeholder="https://linkedin.com/..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={socialLinks.twitter}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
                className="input-glass"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4 mt-8"
      >
        <GlassButton
          variant="primary"
          icon={<Save size={18} />}
          onClick={handleSave}
        >
          {isSaved ? "저장됨!" : "변경사항 저장"}
        </GlassButton>
      </motion.div>
    </div>
  );
}
