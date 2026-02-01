"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RotateCcw, Loader2 } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { useCompanyInfo, useSocialLinks } from "@/hooks/useAdminData";

export default function SettingsAdminPage() {
  const { 
    data: companyInfo, 
    setData: setCompanyInfo, 
    loading: companyLoading, 
    saving: companySaving,
    saveData: saveCompany,
    resetData: resetCompany 
  } = useCompanyInfo();
  
  const { 
    data: socialLinks, 
    setData: setSocialLinks, 
    loading: socialLoading, 
    saving: socialSaving,
    saveData: saveSocial,
    resetData: resetSocial 
  } = useSocialLinks();

  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const loading = companyLoading || socialLoading;
  const saving = companySaving || socialSaving;

  const handleSave = async () => {
    const companySuccess = await saveCompany(companyInfo);
    const socialSuccess = await saveSocial(socialLinks);
    
    if (companySuccess && socialSuccess) {
      setSaveMessage("저장되었습니다!");
      setTimeout(() => setSaveMessage(null), 2000);
    }
  };

  const handleReset = async () => {
    if (confirm("모든 설정을 초기 상태로 되돌리시겠습니까?")) {
      await resetCompany();
      await resetSocial();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Save Message Toast */}
      <AnimatePresence>
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {saveMessage}
          </motion.div>
        )}
      </AnimatePresence>

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
            <span className="text-green-400 ml-2">✓ 서버에 저장됨</span>
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
          disabled={saving}
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
          icon={saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "저장 중..." : "변경사항 저장"}
        </GlassButton>
      </motion.div>
    </div>
  );
}
