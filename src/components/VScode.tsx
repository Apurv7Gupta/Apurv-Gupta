import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FILE_TREE from "../data/file_tree.json";
import {
  Files,
  Search,
  GitBranch,
  Play,
  Blocks,
  User,
  Settings,
  ChevronRight,
  ChevronDown,
  Lock,
  X,
  Bell,
  LayoutPanelLeft,
  Check,
  AlertCircle,
  PlusIcon,
} from "lucide-react";

const THEME_COLORS = {
  bg: "#011627",
  sidebar: "#01121f",
  activityBar: "#000b14",
  text: "#d6deeb",
  comment: "#637777",
  keyword: "#c792ea",
  string: "#ecc48d",
  function: "#82aaff",
  number: "#f78c6c",
  border: "#1d3b53",
  browserBg: "#1e1e1e",
  browserTab: "#2b2b2b",
};

interface CodeLineProps {
  num: number;
  children: React.ReactNode;
}

const TrafficLights = () => (
  <div className="hidden sm:flex space-x-2 px-4">
    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
  </div>
);

const BrowserTab = ({ active = false, title, icon: Icon }: any) => (
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

const GutterLine = ({ num, children }: CodeLineProps) => (
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

export default function VScode() {
  const [activeFile] = useState("readme.md"); // Fixed to readme
  const [visibleLinesReadme, setVisibleLinesReadme] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let mounted = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const runInfiniteSequence = async () => {
      while (mounted) {
        setVisibleLinesReadme(0);
        setShowNotification(false);

        await sleep(800);

        for (let i = 1; i <= 26; i++) {
          if (!mounted) return;
          setVisibleLinesReadme(i);
          await sleep(120);
        }

        // Show notification at the end of typing
        if (mounted) setShowNotification(true);
        await sleep(3000);
        if (mounted) setShowNotification(false);
        await sleep(150);
      }
    };

    runInfiniteSequence();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-[85vh] max-h-[1000px] md:h-[800px] mx-auto rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans"
        style={{ backgroundColor: THEME_COLORS.browserBg }}
      >
        {/* Browser Chrome */}
        <div className="flex items-center justify-between bg-[#181818] h-10 sm:h-12 border-b border-black px-2 sm:px-0">
          <TrafficLights />

          <div className="flex-1 flex items-center sm:mt-2 overflow-hidden">
            <BrowserTab active title={`Grinding`} icon={Blocks} />
            <div className="px-2 sm:px-3 text-gray-500 hover:text-gray-300 cursor-pointer shrink-0">
              <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Address Bar */}
          <div className="flex items-center bg-[#2b2b2b] rounded-md px-2 py-1 mx-2 w-[140px] sm:w-64 md:w-96 text-[9px] sm:text-xs text-gray-300 border border-[#3b3b3b] overflow-hidden">
            <Lock
              size={10}
              className="mr-1 sm:mr-2 text-gray-400 shrink-0 sm:w-[12px]"
            />
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://www.linkedin.com/in/apurv7gupta/",
                )
              }
              className="flex items-center gap-1 w-full text-left truncate group"
              title="Copy LinkedIn URL"
            >
              <span className="truncate w-full">
                https://www.linkedin.com/in/apurv7gupta/
              </span>
              <span className="hidden sm:inline-block text-xs opacity-0 group-hover:opacity-100 transition shrink-0">
                📋
              </span>
            </button>
          </div>
        </div>

        {/* VS Code Main Interface */}
        <div
          className="flex-1 flex overflow-hidden relative"
          style={{ backgroundColor: THEME_COLORS.bg }}
        >
          {/* Activity Bar */}
          <div
            className="hidden sm:flex w-10 md:w-12 flex-col items-center py-4 space-y-6 border-r shrink-0 z-10"
            style={{
              backgroundColor: THEME_COLORS.activityBar,
              borderColor: THEME_COLORS.border,
            }}
          >
            <Files
              size={20}
              className="text-white cursor-pointer md:w-[24px]"
            />
            <Search
              size={20}
              style={{ color: THEME_COLORS.comment }}
              className="cursor-pointer hover:text-white transition-colors md:w-[24px]"
            />
            <GitBranch
              size={20}
              style={{ color: THEME_COLORS.comment }}
              className="cursor-pointer hover:text-white transition-colors md:w-[24px]"
            />
            <Play
              size={20}
              style={{ color: THEME_COLORS.comment }}
              className="cursor-pointer hover:text-white transition-colors md:w-[24px]"
            />
            <Blocks
              size={20}
              style={{ color: THEME_COLORS.comment }}
              className="cursor-pointer hover:text-white transition-colors md:w-[24px]"
            />
            <div className="flex-1" />
            <User
              size={20}
              style={{ color: THEME_COLORS.comment }}
              className="cursor-pointer hover:text-white transition-colors md:w-[24px]"
            />
            <Settings
              size={20}
              style={{ color: THEME_COLORS.comment }}
              className="cursor-pointer hover:text-white transition-colors md:w-[24px]"
            />
          </div>

          {/* Sidebar (Explorer) */}
          <div
            className="hidden md:flex w-48 lg:w-33 flex-col border-r shrink-0 z-10"
            style={{
              backgroundColor: THEME_COLORS.sidebar,
              borderColor: THEME_COLORS.border,
            }}
          >
            <div className="px-4 py-2 text-[10px] lg:text-xs font-semibold tracking-wider text-gray-400">
              EXPLORER
            </div>

            <div className="flex items-center px-2 py-1 text-xs lg:text-sm font-bold text-gray-300 cursor-pointer bg-[#011627]">
              <ChevronDown size={14} className="mr-1 lg:w-[16px]" />
              [FILES]
            </div>

            <div className="flex flex-col py-1 overflow-y-auto overflow-x-hidden">
              {FILE_TREE.map((item, idx) => {
                const isActive = item.name === activeFile;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-4 lg:px-6 py-1 text-xs lg:text-sm cursor-pointer transition-colors duration-200 truncate ${
                      isActive
                        ? "bg-[#011627] text-white border-l-2 border-blue-500"
                        : "text-gray-400 hover:text-gray-200 hover:bg-[#011627]/50"
                    }`}
                  >
                    {item.type === "dir" ? (
                      <ChevronRight
                        size={14}
                        className="mr-1 lg:w-[16px] shrink-0"
                      />
                    ) : (
                      <div className="w-4 mr-1 lg:mr-2 flex justify-center shrink-0">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.iconColor }}
                        ></div>
                      </div>
                    )}
                    <span className="truncate">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editor Area - CHANGED: Removed secondary editors, readme is now full width */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div
              className="flex flex-col flex-1"
              style={{
                borderColor: "#3b82f6",
                borderWidth: "1px",
              }}
            >
              <div
                className="flex bg-[#01111d] h-8 sm:h-9 border-b shrink-0 overflow-x-auto scrollbar-hide"
                style={{ borderColor: THEME_COLORS.border }}
              >
                <div className="flex items-center px-3 sm:px-4 space-x-2 text-[10px] sm:text-sm text-gray-300 bg-[#011627] border-t-2 border-blue-500 whitespace-nowrap">
                  <span className="text-blue-400 font-serif mr-1">
                    <img
                      src="https://media4.giphy.com/media/v1.Y2lkPWFlZWNjYzExdnd2azMzZWhsOXlycWc3dmIzdG9ya2gwY24zbzJ3b2gzMXY5bWZvNyZlcD12MV9naWZzX2dpZklkJmN0PWc/FO0EZCdNmQiNgEyhFp/200.gif"
                      className="h-5 w-5 object-contain" // Fixed height and width
                      alt="icon"
                    />
                  </span>{" "}
                  readme.md
                  <X size={12} className="ml-2 text-gray-500 sm:w-[14px]" />
                </div>
              </div>
              {/* Breadcrumbs */}
              <div
                className="px-3 sm:px-4 py-1 text-[9px] sm:text-xs flex items-center space-x-1 shrink-0 truncate"
                style={{ color: THEME_COLORS.comment }}
              >
                <span className="truncate">ⓘ readme.md</span>{" "}
                <ChevronRight size={10} className="shrink-0 sm:w-[12px]" />{" "}
                <span className="truncate">Visit the LinkedIn Please</span>
              </div>

              <div className="flex-1 p-2 sm:p-4 overflow-auto">
                <AnimatePresence>
                  {visibleLinesReadme >= 1 && (
                    <GutterLine num={1}>
                      <span style={{ color: THEME_COLORS.keyword }}>#</span> You
                      reading this?
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 2 && (
                    <GutterLine num={2}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 3 && (
                    <GutterLine num={3}>
                      This is how{" "}
                      <span style={{ color: THEME_COLORS.keyword }}>
                        *I code*
                      </span>{" "}
                      in{" "}
                      <span style={{ color: THEME_COLORS.string }}>
                        **Visual Studio Code
                      </span>
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 4 && (
                    <GutterLine num={4}>
                      <span style={{ color: THEME_COLORS.string }}>
                        in my pc**
                      </span>
                      !
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 5 && (
                    <GutterLine num={5}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 6 && (
                    <GutterLine num={6}>---</GutterLine>
                  )}
                  {visibleLinesReadme >= 7 && (
                    <GutterLine num={7}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 8 && (
                    <GutterLine num={8}>
                      <span style={{ color: THEME_COLORS.string }}>
                        **Even Though**
                      </span>{" "}
                      I don't have a Mac
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 9 && (
                    <GutterLine num={9}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 10 && (
                    <GutterLine num={10}>
                      <span style={{ color: THEME_COLORS.comment }}>
                        &gt; But it looked cool here
                      </span>
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 11 && (
                    <GutterLine num={11}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 18 && (
                    <GutterLine num={18}>
                      <span style={{ color: THEME_COLORS.keyword }}>###</span> I
                      can code in
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 19 && (
                    <GutterLine num={19}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 20 && (
                    <GutterLine num={20}>
                      <span style={{ color: THEME_COLORS.keyword }}>
                        ```json
                      </span>
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 21 && (
                    <GutterLine num={21}>{"{"}</GutterLine>
                  )}
                  {visibleLinesReadme >= 22 && (
                    <GutterLine num={22}>
                      {"  "}
                      <span style={{ color: THEME_COLORS.keyword }}>"C++"</span>
                      :{" "}
                      <span style={{ color: THEME_COLORS.string }}>
                        "With GUI"
                      </span>
                      ,
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 23 && (
                    <GutterLine num={23}>
                      {"  "}
                      <span style={{ color: THEME_COLORS.keyword }}>
                        "Python"
                      </span>
                      :{" "}
                      <span style={{ color: THEME_COLORS.string }}>
                        "for AIML"
                      </span>
                      ,
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 24 && (
                    <GutterLine num={24}>
                      {"  "}
                      <span style={{ color: THEME_COLORS.keyword }}>
                        "Java"
                      </span>
                      :{" "}
                      <span style={{ color: THEME_COLORS.number }}>
                        Just Starting out
                      </span>
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 25 && (
                    <GutterLine num={25}>{"}"}</GutterLine>
                  )}
                  {visibleLinesReadme >= 26 && (
                    <GutterLine num={26}>
                      <span style={{ color: THEME_COLORS.keyword }}>```</span>
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 12 && (
                    <GutterLine num={12}>
                      <span style={{ color: THEME_COLORS.keyword }}>###</span>{" "}
                      Ordered list
                    </GutterLine>
                  )}
                  {visibleLinesReadme >= 13 && (
                    <GutterLine num={13}> </GutterLine>
                  )}
                  {visibleLinesReadme >= 14 && (
                    <GutterLine num={14}>1. First item</GutterLine>
                  )}
                  {visibleLinesReadme >= 15 && (
                    <GutterLine num={15}>2. Second item</GutterLine>
                  )}
                  {visibleLinesReadme >= 16 && (
                    <GutterLine num={16}>3. Third item</GutterLine>
                  )}
                  {visibleLinesReadme >= 17 && (
                    <GutterLine num={17}> </GutterLine>
                  )}
                </AnimatePresence>

                {visibleLinesReadme < 26 && (
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 sm:w-2 h-3 sm:h-4 bg-blue-500 inline-block ml-1 sm:mt-1 align-middle"
                  />
                )}
              </div>
            </div>

            {/* Animated Notification Toast */}
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="absolute bottom-4 right-2 sm:bottom-6 sm:right-6 w-[calc(100vw-1rem)] sm:w-96 rounded-md shadow-lg border flex flex-col overflow-hidden z-50"
                  style={{
                    backgroundColor: "#01121f",
                    borderColor: THEME_COLORS.border,
                  }}
                >
                  <div className="flex items-start justify-between p-3 sm:p-4 pb-2">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <AlertCircle
                        size={14}
                        className="text-blue-400 mt-0.5 shrink-0 sm:w-[16px]"
                      />
                      <p className="text-xs sm:text-sm text-gray-200 leading-snug pr-2">
                        I'm talking to you!
                      </p>
                    </div>
                    <div className="flex space-x-2 text-gray-400 shrink-0">
                      <Settings
                        size={12}
                        className="cursor-pointer hover:text-white sm:w-[14px]"
                      />
                      <X
                        size={12}
                        className="cursor-pointer hover:text-white sm:w-[14px]"
                        onClick={() => setShowNotification(false)}
                      />
                    </div>
                  </div>
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 sm:py-3 mt-1 sm:mt-2 border-t gap-2 sm:gap-0"
                    style={{ borderColor: THEME_COLORS.border }}
                  >
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      Check Out The Projects
                    </span>
                    <div className="flex space-x-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => setShowNotification(false)}
                        className="px-3 py-1 text-[10px] sm:text-xs font-medium text-white rounded bg-indigo-600 hover:bg-indigo-500 transition-colors"
                      >
                        Keep
                      </button>
                      <button
                        onClick={() => setShowNotification(false)}
                        className="px-3 py-1 text-[10px] sm:text-xs font-medium text-white rounded bg-[#2e2e2e] hover:bg-[#3e3e3e] transition-colors border border-gray-600"
                      >
                        Don't Keep
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Status Bar */}
        <div
          className="h-6 sm:h-6 flex items-center justify-between px-2 sm:px-3 text-[9px] sm:text-xs border-t z-10 shrink-0 overflow-hidden"
          style={{
            backgroundColor: "#005b9f",
            color: "white",
            borderColor: THEME_COLORS.border,
          }}
        >
          <div className="flex items-center space-x-2 sm:space-x-4 h-full">
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-1 sm:px-2 rounded h-full max-w-[120px] sm:max-w-none truncate">
              <GitBranch size={10} className="shrink-0 sm:w-[12px]" />
              <span className="truncate hidden sm:inline-block">
                {" "}
                Check Out The Projects
              </span>
              <span className="truncate sm:hidden"> Main</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:bg-white/20 px-1 sm:px-2 rounded h-full shrink-0">
              <X size={10} className="text-red-300 sm:w-[12px]" />{" "}
              <span className="text-white">0</span>
              <AlertCircle
                size={10}
                className="text-yellow-300 ml-1 sm:w-[12px]"
              />{" "}
              <span className="text-white">0</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4 h-full">
            <div className="cursor-pointer hover:bg-white/20 px-1 sm:px-2 rounded h-full flex items-center shrink-0">
              Ln {visibleLinesReadme || 1}, Col 1
            </div>
            <div className="hidden lg:flex cursor-pointer hover:bg-white/20 px-2 rounded h-full items-center shrink-0">
              Spaces: 4
            </div>
            <div className="hidden lg:flex cursor-pointer hover:bg-white/20 px-2 rounded h-full items-center shrink-0">
              UTF-8
            </div>
            <div className="hidden lg:flex cursor-pointer hover:bg-white/20 px-2 rounded h-full items-center shrink-0">
              LF
            </div>
            <div className="hidden sm:flex cursor-pointer hover:bg-white/20 px-2 rounded h-full items-center shrink-0">
              Markdown
            </div>
            <div className="hidden lg:flex cursor-pointer hover:bg-white/20 px-2 rounded h-full items-center shrink-0">
              Layout: U.S.
            </div>
            <div className="flex space-x-2 ml-1 sm:ml-2 items-center shrink-0">
              <Bell
                size={10}
                className="cursor-pointer hover:text-gray-300 sm:w-[12px]"
              />
              <LayoutPanelLeft
                size={10}
                className="hidden sm:block cursor-pointer hover:text-gray-300 sm:w-[12px]"
              />
              <Check
                size={10}
                className="cursor-pointer hover:text-gray-300 sm:w-[12px]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
