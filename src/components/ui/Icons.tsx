"use client";

import {
  Cpu,
  Bot,
  CircuitBoard,
  Code2,
  Zap,
  Grid3X3,
  Layers,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Settings,
  FileText,
  Users,
  BarChart3,
  Home,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  GripVertical,
  RotateCcw,
  LogOut,
  Shield,
} from "lucide-react";

// Icon mapping for dynamic icon rendering
export const iconMap = {
  cpu: Cpu,
  robot: Bot,
  chip: CircuitBoard,
  code: Code2,
  zap: Zap,
  grid: Grid3X3,
  layers: Layers,
  "check-circle": CheckCircle2,
  menu: Menu,
  x: X,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  search: Search,
  settings: Settings,
  "file-text": FileText,
  users: Users,
  "bar-chart": BarChart3,
  home: Home,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  "external-link": ExternalLink,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  "arrow-right": ArrowRight,
  plus: Plus,
  edit: Edit2,
  trash: Trash2,
  eye: Eye,
  calendar: Calendar,
  grip: GripVertical,
  reset: RotateCcw,
  logout: LogOut,
  shield: Shield,
};

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = "" }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent size={size} className={className} />;
}

// Re-export commonly used icons
export {
  Cpu,
  Bot,
  CircuitBoard,
  Code2,
  Zap,
  Grid3X3,
  Layers,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Settings,
  FileText,
  Users,
  BarChart3,
  Home,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  GripVertical,
  RotateCcw,
  LogOut,
  Shield,
};

export default Icon;
