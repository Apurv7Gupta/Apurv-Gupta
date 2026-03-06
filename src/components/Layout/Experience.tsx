import { motion } from "framer-motion";
import StreakBurst from "../StreakBurst";
import WIREFRAME from "../../../public/Wireframe.png";
import projects from "../../data/projects.json";
import TextType from "../TextType";

export default function Experience() {
  return (
    <section
      id="work"
      className="relative lg:py-24 sm:pt-20  px-4 sm:px-6 md:px-16 bg-[#090b0e] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 102, 255, 0.23) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 102, 255, 0.23) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.05) 0%, transparent 60%, #090b0e 100%)",
        }}
      />

      {/* CHARACTER OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.35 }}
          transition={{ duration: 1.5 }}
          src={WIREFRAME}
          alt="Wireframe"
          className="w-full max-w-5xl object-contain brightness-150 contrast-125 md:pl-12 md:pt-70 pt-35"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-xs sm:text-sm font-mono text-gray-500 uppercase mb-12 sm:mb-10 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 animate-pulse rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          / Selected Projects
        </h2>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] flex items-baseline mb-12 sm:mb-20">
          <StreakBurst
            text="Works"
            className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white"
            delay={0.4}
          />
        </h1>

        {projects.map((exp, i) => (
          <div
            key={i}
            className="group border-b border-white/5 py-8 sm:py-12 flex flex-col gap-4 hover:bg-blue-500/[0.01] transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="max-w-full">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-medium flex flex-wrap relative group-hover:text-white transition-all duration-300 group-hover:[text-shadow:0_0_25px_rgba(0,102,255,0.6)]">
                  <TextType
                    text={exp.Name}
                    typingSpeed={80}
                    initialDelay={i * 200}
                    loop={false}
                    cursorCharacter="_"
                    cursorClassName="text-[hsl(220,100%,60%)] ml-1"
                  />
                </h3>
                <p className="text-gray-500 mt-5 uppercase tracking-widest text-xs sm:text-sm font-mono">
                  {exp.desc}
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="font-mono text-base sm:text-lg md:text-xl text-blue-500/70 hover:text-blue-400 transition-colors">
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.link_name}
                    </a>
                  ) : (
                    <span className="opacity-0">None</span> // Keeps layout consistent if no link
                  )}
                </p>

                <p className="max-w-xs sm:max-w-sm md:max-w-md text-[10px] sm:text-xs font-mono mt-1 text-gray-600 transition-all duration-300 group-hover:text-blue-400">
                  {exp.tech}
                </p>
              </div>
            </div>
            {exp.images && exp.images.length > 0 && (
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 mt-4 scrollbar-hide snap-x snap-mandatory">
                {exp.images.map((img, imgIdx) => (
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * imgIdx }}
                    className="relative w-[65vw] sm:w-[320px] aspect-video flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/5 group/img snap-center sm:snap-align-none"
                  >
                    <img
                      src={img}
                      alt={`${exp.Name} preview ${imgIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />

                    {/* Overlay: Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2 sm:p-4">
                      <button
                        onClick={() => window.open(img, "_blank")}
                        className="bg-blue-600/20 backdrop-blur-md p-2 sm:p-2.5 rounded-lg border border-white/20 active:scale-95 md:hover:bg-white/20 transition-all cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
