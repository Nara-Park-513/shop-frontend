"use client";

import { useState, useRef, useCallback } from "react";
const MAX_DURATION = 5; // 최대 재생 시간(초) - 이 시간 후 다음 영상으로 넘김
const FADE_DURATION = 1200; // 전환 페이드 시간(ms)

export default function HeroVideo() {
  const videos = [
    "/videos/motion_1.mp4",
    "/videos/motion_2.mp4",
    "/videos/motion_3.mp4",
    "/videos/motion_4.mp4",
    "/videos/motion_5.mp4",
  ];

  const [videoIndex, setVideoIndex] = useState(0);
  const [showingFirst, setShowingFirst] = useState(true); // true: 1번 요소 표시, false: 2번 요소 표시
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref0 = useRef<HTMLVideoElement>(null);
  const ref1 = useRef<HTMLVideoElement>(null);

  const nextIndex = (videoIndex + 1) % videos.length;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // 다음 영상 재생 (숨겨진 쪽이 미리 로드되어 있음)
    const nextEl = showingFirst ? ref1.current : ref0.current;
    nextEl?.play();

    // 크로스페이드 완료 후 인덱스·표시 요소 교체 (src는 바꾸지 않아서 깜빡임 없음)
    setTimeout(() => {
      setVideoIndex(nextIndex);
      setShowingFirst(!showingFirst);
      setIsTransitioning(false);
    }, FADE_DURATION);
  }, [videoIndex, nextIndex, showingFirst, isTransitioning]);

  const baseStyle = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: `opacity ${FADE_DURATION}ms ease-in-out`,
  };

  // 1번 요소: showingFirst일 때 현재 영상, 아니면 다음 영상(미리 로드)
  // 2번 요소: showingFirst일 때 다음 영상(미리 로드), 아니면 현재 영상
  const visible0 = showingFirst ? !isTransitioning : isTransitioning;
  const visible1 = showingFirst ? isTransitioning : !isTransitioning;

  return (
    <div
  style={{
    position: "relative",
    width: "100%",
    height: "100vh",          // ✅ minHeight 말고 아예 고정
    overflow: "hidden",
    clipPath: "inset(0)",     // ✅ overflow로도 안 잘릴 때 확실히 자름
    isolation: "isolate",     // ✅ 아래 섹션이 겹치는 z-index 꼬임 방지
    background:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  }}
>
      {/* 영상이 없어도 그라데이션 배경 + 텍스트는 항상 표시 */}
      <video
        ref={ref0}
        src={videos[showingFirst ? videoIndex : nextIndex]}
        autoPlay={showingFirst}
        muted
        playsInline
        preload="auto"
        onEnded={goToNext}
        onTimeUpdate={() => {
          const v = ref0.current;
          if (v && v.currentTime >= MAX_DURATION && !isTransitioning && visible0) {
            goToNext();
          }
        }}
        style={{ ...baseStyle, opacity: visible0 ? 1 : 0, pointerEvents: "none" }}
      />
      <video
        ref={ref1}
        src={videos[showingFirst ? nextIndex : videoIndex]}
        autoPlay={!showingFirst}
        muted
        playsInline
        preload="auto"
        onEnded={goToNext}
        onTimeUpdate={() => {
          const v = ref1.current;
          if (v && v.currentTime >= MAX_DURATION && !isTransitioning && visible1) {
            goToNext();
          }
        }}
        style={{ ...baseStyle, opacity: visible1 ? 1 : 0, pointerEvents: "none" }}
      />
      {/* 히어로 오버레이 - 주문부터 출고까지, 현장을 잇는 데이터 흐름 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          color: "#ffffff",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 900,
            lineHeight: 1.3,
            margin: 0,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          주문부터 출고까지,
        
          <br />
          통합 운영을 실현하는 MES 플랫폼        </h1>
      </div>
    </div>
  );
}