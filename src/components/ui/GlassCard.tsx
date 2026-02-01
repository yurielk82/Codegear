"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "default" | "hover" | "glow";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantClasses = {
  default: "glass-card",
  hover: "glass-card cursor-pointer",
  glow: "glass-card glow",
};

export function GlassCard({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...motionProps
}: GlassCardProps) {
  return (
    <motion.div
      className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Tech Card with gradient accent
interface TechCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  delay?: number;
}

export function TechCard({
  title,
  subtitle,
  description,
  icon,
  gradient,
  delay = 0,
}: TechCardProps) {
  return (
    <motion.div
      className="glass-card p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-80`}
      />

      {/* Icon container */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-blue-400 mb-3">{subtitle}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-[20px]`}
      />
    </motion.div>
  );
}

export default GlassCard;
