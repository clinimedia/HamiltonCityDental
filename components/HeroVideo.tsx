"use client";

import { useEffect, useRef } from "react";
import { heroVideo } from "@/lib/images";

/**
 * Decorative autoplaying hero background video (the original from the live
 * site). Muted + playsInline so it autoplays on mobile; the poster paints
 * instantly for a fast LCP. Respects prefers-reduced-motion by pausing and
 * leaving the poster frame in place.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
    }
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={heroVideo.poster}
      aria-hidden
      tabIndex={-1}
    >
      <source src={heroVideo.webm} type="video/webm" />
      <source src={heroVideo.mp4} type="video/mp4" />
    </video>
  );
}
