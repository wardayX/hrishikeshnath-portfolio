import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const letters = "HELLO.".split("");

function IntroPrototype() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;

    if (!section || !background) {
      return;
    }

    const ctx = gsap.context(() => {
      const helloLetters =
        gsap.utils.toArray<HTMLElement>(".prototype-letter");

      /*
       * Initial state
       */

      gsap.set(background, {
        backgroundColor: "#000000",
      });

      gsap.set(helloLetters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      });

      /*
       * These remain hidden until the white stage.
       */

      gsap.set(".prototype-iam", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".prototype-name", {
        opacity: 0,
        y: 80,
      });

      /*
       * Main scroll timeline
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=450%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * =========================================
       * PHASE 1
       * HELLO RESTS
       * =========================================
       */

      timeline.to({}, {
        duration: 0.35,
      });

      /*
       * =========================================
       * PHASE 2
       * VERTICAL STRETCH
       * =========================================
       */

      helloLetters.forEach((character) => {
        timeline.to(
          character,
          {
            scaleY: 2,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.35,
        );
      });

      /*
       * =========================================
       * PHASE 3
       * FIRST DISPERSION
       * =========================================
       */

      helloLetters.forEach((character, index) => {
        const xPositions = [
          -110,
          -55,
          0,
          65,
          125,
          195,
        ];

        const yPositions = [
          -70,
          45,
          -20,
          80,
          -55,
          65,
        ];

        const rotations = [
          -14,
          8,
          -5,
          10,
          -12,
          18,
        ];

        timeline.to(
          character,
          {
            x: xPositions[index],
            y: yPositions[index],
            rotation: rotations[index],
            scaleX:
              index === 2 || index === 3
                ? 1.08
                : 0.96,
            scaleY: 1,
            duration: 1.1,
            ease: "power2.inOut",
          },
          1,
        );
      });

      /*
       * =========================================
       * PHASE 4
       * ELASTIC DISPERSION
       * =========================================
       */

      helloLetters.forEach((character, index) => {
        const direction = index < 3 ? -1 : 1;

        timeline.to(
          character,
          {
            x: direction * (220 + index * 55),
            y: (index - 2.5) * 175,
            rotation: direction * (25 + index * 14),

            scaleX:
              index === 2
                ? 1.2
                : 0.75,

            scaleY:
              index === 2
                ? 1.15
                : 0.75,

            duration: 0.9,
            ease: "back.inOut(2)",
          },
          2.05,
        );
      });

      /*
       * =========================================
       * PHASE 5
       * BLACK → WARM WHITE
       * =========================================
       */

      timeline.to(
        background,
        {
          backgroundColor: "#F3F1EC",
          duration: 1.2,
          ease: "power2.inOut",
        },
        2.45,
      );

      /*
       * =========================================
       * PHASE 6
       * I AM
       * =========================================
       *
       * HELLO animation is untouched.
       */

      timeline.to(
        ".prototype-iam",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        3.0,
      );

      /*
       * =========================================
       * PHASE 7
       * NAME
       * =========================================
       */

      timeline.to(
        ".prototype-name",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        3.25,
      );

      /*
       * =========================================
       * PHASE 8
       * HELLO LEAVES
       * =========================================
       *
       * Happens after the name has started
       * appearing.
       */

      helloLetters.forEach((character, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        timeline.to(
          character,
          {
            x: direction * (420 + index * 90),
            y: direction * (280 + index * 70),
            rotation: direction * (55 + index * 18),
            scaleX: 0.15,
            scaleY: 0.15,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
          },
          3.35,
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="prototype-section"
    >
      <div
        ref={backgroundRef}
        className="prototype-background"
      />

      <div className="prototype-content">

        {/* HELLO */}

        <div className="prototype-word">
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="prototype-letter"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* I AM */}

        <div className="prototype-iam">
          I AM
        </div>

        {/* NAME */}

        <div className="prototype-name">
          <div className="prototype-name-line">
            HRISHIKESH
          </div>

          <div className="prototype-name-line prototype-name-last">
            NATH
          </div>
        </div>

      </div>
    </section>
  );
}

export default IntroPrototype;