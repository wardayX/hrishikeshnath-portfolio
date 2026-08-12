import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "../components/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const helloRef = useRef<HTMLHeadingElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hello = helloRef.current;
    const background = backgroundRef.current;

    if (!section || !hello || !background) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * Initial states
       */

      gsap.set(".intro-name", {
        opacity: 0,
        y: 60,
      });

      gsap.set(".intro-meta", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".intro-location", {
        opacity: 0,
      });

      gsap.set(".intro-nav", {
        opacity: 0,
      });

      gsap.set(".intro-scroll", {
        color: "#FFFFFF",
      });

      /*
       * Main scroll timeline
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /*
       * --------------------------------
       * PHASE 1 — HELLO
       * --------------------------------
       *
       * Give the visitor a moment to see HELLO.
       */

      timeline.to({}, {
        duration: 0.18,
      });

      /*
       * --------------------------------
       * PHASE 2 — BACKSPACE HELLO
       * --------------------------------
       *
       * Characters disappear from
       * right → left.
       */

      timeline.to(".hello-character", {
        opacity: 0,
        y: -25,
        duration: 0.08,
        stagger: {
          each: 0.045,
          from: "end",
        },
        ease: "power2.in",
      });

      /*
       * --------------------------------
       * PHASE 3 — BACKGROUND TRANSITION
       * --------------------------------
       *
       * Black → warm off-white.
       */

      timeline.to(
        background,
        {
          backgroundColor: "#F3F1EC",
          duration: 0.45,
          ease: "power2.inOut",
        },
        "-=0.20",
      );

      /*
       * Hide HELLO completely.
       */

      timeline.to(
        hello,
        {
          opacity: 0,
          duration: 0.12,
          ease: "power2.out",
        },
        "<",
      );

      /*
       * --------------------------------
       * PHASE 4 — NAME EMERGES
       * --------------------------------
       *
       * We only animate opacity + Y.
       * The typography dimensions remain
       * exactly as defined in CSS.
       */

      timeline.to(".intro-name", {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });

      /*
       * --------------------------------
       * PHASE 5 — METADATA
       * --------------------------------
       */

      timeline.to(
        ".intro-meta",
        {
          opacity: 1,
          y: 0,
          duration: 0.16,
          ease: "power2.out",
        },
        "-=0.12",
      );

      /*
       * Location
       */

      timeline.to(
        ".intro-location",
        {
          opacity: 1,
          duration: 0.12,
          ease: "power2.out",
        },
        "<",
      );

      /*
       * Navigation
       */

      timeline.to(
        ".intro-nav",
        {
          opacity: 1,
          duration: 0.12,
          ease: "power2.out",
        },
        "<",
      );

      /*
       * Scroll indicator changes
       * from white → black.
       */

      timeline.to(
        ".intro-scroll",
        {
          color: "#0A0A0A",
          duration: 0.12,
        },
        "<",
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="intro-section">
      <div
        ref={backgroundRef}
        className="intro-background"
      />

      {/* Navigation */}
      <nav className="intro-nav">
        <div className="nav-logo">
          HN
        </div>

        <div className="nav-links">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#ai">AI ↗</a>
        </div>
      </nav>

      {/* Intro content */}
      <div className="intro-content">

        {/* HELLO */}
        <h1
          ref={helloRef}
          className="intro-hello"
        >
          {"HELLO.".split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="hello-character"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Name */}
        <div className="intro-name">
          <h1 className="intro-name-line">
            <ScrambleText text="HRISHIKESH" />
          </h1>

          <h1 className="intro-name-line intro-name-last">
            <ScrambleText text="NATH" />
          </h1>
        </div>

        {/* Metadata */}
        <div className="intro-meta">
          <div className="hero-meta-block">
            <p>ECE / NIT SILCHAR</p>
            <p>AI / ML / RAG</p>
            <p>SOFTWARE / SYSTEMS</p>
          </div>
        </div>

        {/* Location */}
        <div className="intro-location">
          26°47′N — 92°47′E
        </div>

        {/* Scroll indicator */}
        <div className="intro-scroll">
          <span>SCROLL</span>
          <span>↓</span>
        </div>

      </div>
    </section>
  );
}

export default Hero;