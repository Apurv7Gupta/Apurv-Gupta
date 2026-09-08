import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SkillGroupProps {
  category: string;
  items: string[];
  index: number;
}

const SkillGroup: React.FC<SkillGroupProps> = ({ category, items, index }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bracketContainerVariants = {
    hidden: {
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      width: "40px",
      height: "40px",
      opacity: 1,
    },
    visible: {
      top: "0%",
      left: "0%",
      x: "0%",
      y: "0%",
      width: "100%",
      height: "100%",
      opacity: [1, 1, 0],
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
        opacity: { times: [0, 0.9, 1], duration: 0.8, delay: 0.2 },
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0, ease: "easeOut" },
    },
  };

  const pcBoxVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
    },
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  // Prevent flash of un-styled content before JS detects screen size
  if (isMobile === null) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={isMobile ? mobileVariants : pcBoxVariants}
      className="relative overflow-hidden border border-white/5 bg-white/[0.01] p-6 rounded-2xl hover:bg-white/[0.03] hover:border-white/10 transition-all group"
    >
      {!isMobile && (
        <motion.div
          variants={bracketContainerVariants}
          className="absolute z-20 pointer-events-none"
        >
          {/* Top-Left L */}
          <svg className="absolute top-2 left-2 w-8 h-8" viewBox="0 0 32 32">
            <motion.path
              d="M 20 2 L 2 2 L 2 20"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="2"
              variants={pathVariants}
            />
          </svg>

          {/* Bottom-Right L */}
          <svg
            className="absolute bottom-2 right-2 w-8 h-8"
            viewBox="0 0 32 32"
          >
            <motion.path
              d="M 12 30 L 30 30 L 30 12"
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="2"
              variants={pathVariants}
            />
          </svg>
        </motion.div>
      )}

      {/* Panel Number */}
      <span className="absolute -right-2 -bottom-4 text-7xl font-bold text-white/[0.06] pointer-events-none group-hover:text-blue-500/5 transition-colors">
        0{index + 1}
      </span>

      {/* Bg Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,64,175,0.35),transparent_60%)] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

      {isMobile ? (
        <div className="relative z-10">
          <h3 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium text-gray-400 border border-white/5 bg-white/5 rounded-full group-hover:text-white group-hover:border-white/20 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative z-10"
        >
          <h3 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium text-gray-400 border border-white/5 bg-white/5 rounded-full group-hover:text-white group-hover:border-white/20 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillGroup;
