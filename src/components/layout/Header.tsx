"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤 함수
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // 홈으로 이동 + 최상단 스크롤
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      // 이미 홈에 있으면 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 다른 페이지에서는 홈으로 이동
      router.push("/");
    }
  }, [pathname, router]);

  // 앵커 링크 또는 페이지 이동 처리
  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === "/") {
      // 홈
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else if (href.startsWith("#")) {
      // 앵커 링크
      if (pathname === "/") {
        // 현재 홈 페이지면 바로 스크롤
        scrollToElement(href);
      } else {
        // 다른 페이지면 홈으로 이동 후 스크롤
        router.push("/" + href);
      }
    } else {
      // 일반 페이지 이동
      router.push(href);
    }
  }, [pathname, router, scrollToElement]);

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5"
              : "py-6 bg-transparent"
          }
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <button 
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">CG</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-xl">Code Gear</span>
                <span className="block text-gray-500 text-xs">주식회사 코드기어</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {siteConfig.navigation.main.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                type="button"
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="absolute top-20 left-0 right-0 px-6 py-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col gap-4">
                {siteConfig.navigation.main.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block py-3 text-2xl font-medium text-white hover:text-blue-400 transition-colors w-full text-left"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
                

              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
