import { useState, useEffect, useRef } from "react";
interface PreloaderProps {
  onComplete: () => void;
  videoSrc?: string;
  timeout?: number; // milliseconds
}

const Preloader = ({
  onComplete,
  videoSrc = "",
  timeout = 8000,
}: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleComplete = () => {
    if (isFadingOut) return;

    setIsFadingOut(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Wait for fade animation to complete before calling onComplete
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 800); // Match CSS animation duration
  };

  useEffect(() => {
    // timeout fallback
    timeoutRef.current = setTimeout(() => {
      handleComplete();
    }, timeout);

    // video end detection (future offline video support)
    const handleMessage = (event: MessageEvent) => {
      // YouTube iframe API messages
      if (event.data && typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data.event === "video-ended" || data.info?.playerState === 0) {
            handleComplete();
          }
        } catch (e) {}
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("message", handleMessage);
    };
  }, [timeout]);

  // For future offline video support
  const handleVideoEnd = () => {
    handleComplete();
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-preloader-bg flex items-center justify-center transition-opacity duration-[800ms] ease-out ${
        isFadingOut ? "opacity-0" : "opacity-100 animate-fade-in"
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Video Container */}
        <div
          className={`relative w-full h-full aspect-video mx-8 transition-all duration-[800ms] ease-out ${
            isVideoLoaded ? "animate-scale-in" : "opacity-0"
          }`}
        >
          {videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be") ? (
            // YouTube embed
            <iframe
              ref={iframeRef}
              src={`${videoSrc}&enablejsapi=1`}
              className="w-full h-full rounded-[var(--video-border-radius)] shadow-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoLoad}
            />
          ) : (
            // Offline video (future use)
            <video
              className="w-full h-full object-cover"
              autoPlay
              onLoadedData={handleVideoLoad}
              onEnded={handleVideoEnd}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {/* Loading indicator while video loads ------Replace with now loading
        screen
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Preloader;
