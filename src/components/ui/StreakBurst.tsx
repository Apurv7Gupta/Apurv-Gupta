import React from "react";
import { motion } from "framer-motion";

interface StreakBurstProps {
  text: string;
  className?: string;
  delay?: number;
}

const StreakBurst: React.FC<StreakBurstProps> = ({
  text,
  className = "",
  delay = 0.5,
}) => {
  return (
    <motion.div
      className="relative inline-block overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, filter: "brightness(0.2) blur(4px)" },
          visible: {
            opacity: 1,
            filter: "brightness(1) blur(0px)",
            transition: { delay: delay + 0.05, duration: 0.2, ease: "easeOut" },
          },
        }}
        className={`relative z-10 block ${className}`}
      >
        {text}
      </motion.span>

      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0, skewX: -45 },
          visible: {
            scaleX: [0, 1.6, 0],
            opacity: [0, 1, 0],
            transition: {
              delay: delay,
              duration: 0.28,
              times: [0, 0.2, 1],
              ease: [0.23, 1, 0.32, 1],
            },
          },
        }}
        className="absolute top-1/2 left-[-20%] right-[-20%] h-[1px] bg-blue-400 z-20 pointer-events-none 
                   shadow-[0_0_8px_#1e40af,0_0_18px_#1e3a8a,0_0_32px_#3b82f6]"
      />

      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <motion.div
          variants={{
            hidden: { scale: 0, opacity: 1 },
            visible: {
              scale: [0, 1.5, 2],
              opacity: [1, 0.8, 0],
              transition: { delay: delay, duration: 0.4, ease: "easeOut" },
            },
          }}
          className="rounded-full flex-shrink-0"
          style={{
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(30,58,138,0.2) 30%, transparent 60%)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default StreakBurst;
