import { useEffect, useRef, useState } from "react";

interface CurtainPreloaderProps {
  videoSrc: string;
  onComplete: () => void;
  onVideoEnd: () => void;
}

const Curtain = ({ onComplete, onVideoEnd }: CurtainPreloaderProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const skipTimer = setTimeout(() => setShowSkip(true), 500);

    const updateProgress = () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const actualPercent = Math.round((bufferedEnd / video.duration) * 100);
        setProgress((prev) => Math.max(prev, actualPercent));
      }
    };

    const startSequence = () => {
      if (hasTriggered.current) return;
      hasTriggered.current = true;

      video.removeEventListener("progress", updateProgress);
      setProgress(100);

      setTimeout(() => {
        setIsReady(true);
        onComplete();

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay blocked. Lifting curtain anyway.", err);
            handleEnd();
          });
        }
      }, 400);
    };

    const handleEnd = () => {
      setIsVisible(false);
      onVideoEnd();
    };

    if (video.readyState >= 3) {
      startSequence();
    }

    video.addEventListener("progress", updateProgress);
    video.addEventListener("canplaythrough", startSequence);
    video.addEventListener("ended", handleEnd);

    const failSafe = setTimeout(startSequence, 6000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(failSafe);
      video.removeEventListener("progress", updateProgress);
      video.removeEventListener("canplaythrough", startSequence);
      video.removeEventListener("ended", handleEnd);
    };
  }, [onComplete, onVideoEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleRefresh = () => {
      const refreshTimeout = setTimeout(() => {
        if (
          progress === 100 &&
          !isReady &&
          !localStorage.getItem("videoRefreshedOnce")
        ) {
          localStorage.setItem("videoRefreshedOnce", "true");
          window.location.reload();
        }
      }, 3000);

      const onPlay = () => {
        clearTimeout(refreshTimeout);
        setIsReady(true);
      };

      video.addEventListener("play", onPlay);

      return () => {
        clearTimeout(refreshTimeout);
        video.removeEventListener("play", onPlay);
      };
    };

    return handleRefresh();
  }, [progress, isReady]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {showSkip && (
        <button
          onClick={() => {
            setIsVisible(false);
            onVideoEnd();
          }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10001] px-6 py-2 
               text-white/50 transition-all border border-white/10 rounded-full 
               text-[10px] uppercase tracking-[0.3em] bg-black/40 backdrop-blur-md
               hover:text-black hover:border-white hover:bg-white"
        >
          Skip Intro
        </button>
      )}

      <div
        className={`absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center transition-opacity duration-[1000ms] ease-in-out
        ${isReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="relative">
          <div className="text-white text-6xl font-light tracking-tighter tabular-nums">
            {progress}%
          </div>
          <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/10">
            <div
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             w-[80%] md:w-[50%] h-auto object-contain transition-opacity duration-[1000ms]
             ${isReady ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/LOGO.webm" type="video/webm" />
        <source src="/LOGO.mp4" type="video/mp4" />
        <source src="/LOGO.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Curtain;
