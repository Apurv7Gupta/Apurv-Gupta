import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Package, Repeat, BarChart } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 0,
    title: "Build fast",
    icon: Zap,
    description: "Accelerated learning",
  },
  {
    id: 1,
    title: "Ship small",
    icon: Package,
    description: "Incremental progress",
  },
  {
    id: 2,
    title: "Automate",
    icon: Repeat,
    description: "Workflow automation",
  },
  {
    id: 3,
    title: "Optimize",
    icon: BarChart,
    description: "Delay optimization",
  },
];

const Flowchart: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 990);
    return () => clearInterval(interval);
  }, []);

  const updateCoords = () => {
    if (containerRef.current) {
      const nodes = containerRef.current.querySelectorAll(".roadmap-node");
      const containerRect = containerRef.current.getBoundingClientRect();
      const newCoords = Array.from(nodes).map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });
      setCoords(newCoords);
    }
  };

  useEffect(() => {
    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] bg-[#050a15] p-4 md:p-8 flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="lg:absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
        linear-gradient(to right, #2563EB 1px, transparent 1px),
        linear-gradient(to bottom, #2563EB 1px, transparent 1px)
      `,
            backgroundSize: "4rem 4rem",
          }}
        >
          <div className="absolute inset-0 animate-[pulse_6s_ease-in-out_infinite] bg-[#2563EB]/10 mix-blend-overlay" />
        </div>
      </div>

      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {coords.length > 1 &&
          STEPS.map((_, i) => {
            if (i === STEPS.length - 1) return null;
            const start = coords[i];
            const end = coords[i + 1];
            if (!start || !end) return null;

            return (
              <g key={`path-${i}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#262626"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <motion.line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#2563EB"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength:
                      activeStep > i ? 1 : activeStep === i ? [0, 1] : 0,
                    opacity: activeStep >= i ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </g>
            );
          })}
      </svg>

      {/* 2 columns for both mobile and desktop */}
      <div className="relative z-10 grid grid-cols-2 gap-6 md:gap-12 w-full max-w-sm md:max-w-md items-center justify-center">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={`roadmap-node relative w-full aspect-square max-w-[140px] rounded-2xl border flex flex-col items-center justify-center transition-all duration-500 cursor-pointer backdrop-blur-sm
                ${
                  activeStep >= i
                    ? "border-[#2563EB]/50 bg-[#2563EB]/5 shadow-[0_0_15px_rgba(255,107,0,0.1)]"
                    : "border-neutral-800 bg-neutral-900/30"
                }`}
              onClick={() => setActiveStep(i)}
              whileTap={{ scale: 0.95 }}
              animate={{ y: activeStep === i ? [0, -4, 0] : 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <step.icon
                className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 
                ${activeStep >= i ? "text-[#2563EB]" : "text-neutral-600"}`}
              />

              <div className="mt-2 md:mt-3 px-1 text-center">
                <p
                  className={`text-[10px] md:text-[11px] font-bold uppercase tracking-tighter leading-none
                  ${activeStep >= i ? "text-white" : "text-neutral-500"}`}
                >
                  {step.title}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flowchart;
