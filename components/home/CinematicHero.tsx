"use client";

import { useEffect, useRef } from "react";

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let raf = 0;

    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(Math.max(value, min), max);

    const ease = (value: number) => {
      return value * value * (3 - 2 * value);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();

      const total = section.offsetHeight - window.innerHeight;

      if (total <= 0) return;

      let progress = -rect.top / total;
      progress = clamp(progress);

      

      if (video.duration) {
        const videoProgress = ease(progress);

        const targetTime =
          videoProgress * video.duration;

        if (
          Math.abs(video.currentTime - targetTime) >
          0.015
        ) {
          video.currentTime = targetTime;
        }
      }

    

      const scale = 1 + progress * 0.18;

      if (heroRef.current) {
        heroRef.current.style.transform =
          `scale(${scale})`;
      }



      if (introRef.current) {
        const introProgress = clamp(
          progress / 0.25
        );

        const opacity =
          1 - clamp((progress - 0.08) / 0.17);

        const y =
          introProgress * -80;

        introRef.current.style.opacity =
          String(opacity);

        introRef.current.style.transform =
          `translate3d(0, ${y}px, 0)`;
      }



      if (middleRef.current) {
        const middleProgress = clamp(
          (progress - 0.2) / 0.45
        );

        const opacity = clamp(
          Math.min(
            middleProgress * 3,
            (1 - middleProgress) * 3
          )
        );

        const y =
          50 - middleProgress * 100;

        middleRef.current.style.opacity =
          String(opacity);

        middleRef.current.style.transform =
          `translate3d(0, ${y}px, 0)`;
      }



      if (outroRef.current) {
        const outroProgress = clamp(
          (progress - 0.65) / 0.35
        );

        const opacity = clamp(
          outroProgress * 2
        );

        const y =
          60 - outroProgress * 60;

        outroRef.current.style.opacity =
          String(opacity);

        outroRef.current.style.transform =
          `translate3d(0, ${y}px, 0)`;
      }


      const nextSection = section.nextElementSibling;

      if (nextSection instanceof HTMLElement) {
        const fade = clamp(
          (progress - 0.85) / 0.15
        );

        nextSection.style.transform =
          `translateY(${20 - fade * 20}px)`;

        nextSection.style.opacity =
          String(0.5 + fade * 0.5);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(update);
    };

    const onLoaded = () => {
      update();
    };

    video.pause();

    video.addEventListener(
      "loadedmetadata",
      onLoaded
    );

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onResize
    );

    update();

    return () => {
      cancelAnimationFrame(raf);

      video.removeEventListener(
        "loadedmetadata",
        onLoaded
      );

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onResize
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cinematic-hero"
    >
      <div className="cinematic-sticky">

        <div
          ref={heroRef}
          className="cinematic-video-wrapper"
        >
          <video
            ref={videoRef}
            className="cinematic-video"
            src="/video/heroVideo.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        <div className="cinematic-gradient" />

        <div className="cinematic-content">

          <div
            ref={introRef}
            className="hero-layer hero-intro"
          >
            <span className="hero-label">
              TECHSTORE
            </span>

            <h1>
              فروشگاهی
              <br />
              فراتر از تکنولوژی
            </h1>

            <p>
              برای کشف بیشتر اسکرول کنید.
            </p>
          </div>

          <div
            ref={middleRef}
            className="hero-layer hero-middle"
          >
            <span className="hero-label">
              بهترین ها
            </span>

            <h2>
                انتخابی
              <br />
             برای آینده
            </h2>
          </div>

          <div
            ref={outroRef}
            className="hero-layer hero-outro"
          >
            

            <h2>
            انتخاب کن
              <br />
              ارتقا بده ...
            </h2>

            <button className="hero-button">
              مشاهده محصولات
              <span>↗</span>
            </button>
          </div>

        </div>

        <div className="scroll-indicator">
          <span>SCROLL</span>

          <div className="scroll-line">
            <div />
          </div>
        </div>

      </div>
    </section>
  );
}