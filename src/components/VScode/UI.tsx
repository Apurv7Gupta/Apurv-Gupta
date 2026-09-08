import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { THEME_COLORS } from "./constants";

export const TrafficLights = () => (
  <div className="hidden sm:flex space-x-2 px-4">
    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
  </div>
);

export const BrowserTab = ({ active = false, title, icon: Icon }: any) => (
  <div
    className={`flex items-center space-x-2 px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-gray-300 transition-colors ${
      active
        ? "bg-[#2b2b2b] border-t-2 border-blue-500"
        : "bg-transparent border-t-2 border-transparent"
    } max-w-[120px] sm:max-w-[200px] truncate`}
  >
    <Icon size={14} className="text-blue-400 shrink-0" />
    <span className="truncate">{title}</span>
    <X
      size={14}
      className="ml-2 sm:ml-4 text-gray-500 hover:text-gray-300 cursor-pointer shrink-0 hidden sm:block"
    />
  </div>
);

interface CodeLineProps {
  num: number;
  children: React.ReactNode;
}

export const GutterLine = ({ num, children }: CodeLineProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="flex font-mono text-[10px] sm:text-sm leading-6 w-max min-w-full"
  >
    <div
      className="w-6 sm:w-8 text-right pr-2 sm:pr-4 select-none shrink-0"
      style={{ color: THEME_COLORS.comment }}
    >
      {num}
    </div>
    <div className="flex-1 whitespace-pre" style={{ color: THEME_COLORS.text }}>
      {children}
    </div>
  </motion.div>
);
