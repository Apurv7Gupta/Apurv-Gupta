import { useState, useEffect } from "react";
import "./App.css";
import Curtain from "./components/Curtain";
import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Layout/Hero";
import Experience from "./components/Layout/Experience";
import Skills from "./components/Layout/Skills";
import Contact from "./components/Layout/Contact";
import Cursor from "./components/Cursor";
import MottoSeparater from "./components/Layout/Motto";
import Philosophy from "./components/Layout/Philosophy";
import ShowcaseCard from "./components/ShowcaseCard";
import ClickSpark from "./components/ClickSpark";
import { Analytics } from "@vercel/analytics/react";

import CursorImgNormal from "./assets/Cursor/normal.png";
import CursorImgLink from "./assets/Cursor/link.png";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const hash = window.location.hash;

  useEffect(() => {
    const path = window.location.pathname + window.location.hash;
    if (path === "/" || (path === "/index.html" && !hash)) {
      setIsLandingPage(true);
    } else {
      setShowIntro(false);
      setIntroFinished(true);
    }
  }, [hash]);

  useEffect(() => {
    document.body.style.overflow =
      showIntro && isLandingPage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showIntro, isLandingPage]);

  return (
    <>
      <Analytics />
      <div className="relative">
        {isLandingPage && showIntro && (
          <Curtain
            videoSrc="./LOGO.webm"
            onComplete={() => console.log("Lifting...")}
            onVideoEnd={() => {
              setShowIntro(false);
              setIntroFinished(true);
            }}
          />
        )}
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <main className="min-h-screen w-full bg-[#0a0d12] text-white selection:bg-[#3b82f6] selection:text-white">
            <Cursor
              normalCursor={CursorImgNormal}
              linkCursor={CursorImgLink}
              size={25}
            />
            <Navbar />
            <Hero startAnimation={!isLandingPage || introFinished} />
            <Skills />
            <Experience />

            <Philosophy />

            <div className="bg-[#050a15] relative z-10 max-w-6xl mx-auto px-6">
              <div className="flex flex-wrap lg:flex-nowrap items-bottom justify-center gap-8">
                <ShowcaseCard
                  tag="Current Status"
                  title="Where am I right now?"
                  description="VIT bhopal university, pursuing B.tech in CSE"
                />
                <ShowcaseCard
                  tag="Future prospects"
                  title="Where am I planning to go next?"
                  description="Becoming an AI engineer"
                />
                <ShowcaseCard
                  tag="Execution"
                  title="What am I building right now?"
                  description="Working on better and deployable Agentic AI systems and MCP servers"
                />
              </div>
            </div>

            <MottoSeparater />
            <Contact />
          </main>
        </ClickSpark>
      </div>
    </>
  );
}
