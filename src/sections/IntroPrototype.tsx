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
    const scrollHint =
      section.querySelector<HTMLElement>(
        ".prototype-scroll-hint",
      );
      
    let handlePointerMove: ((event: PointerEvent) => void) | undefined;
    let jumbleWords: HTMLElement[] = [];
      const ctx = gsap.context(() => {
        const helloLetters = gsap.utils.toArray<HTMLElement>(
          ".prototype-letter",
          );
        const geometry = gsap.utils.toArray<HTMLElement>(
            ".brutalist-shape, .brutalist-line",
          );
          
      const decoyLetters = gsap.utils.toArray<HTMLElement>(
        ".decoy-letter",
      );

      /*
       * =========================================
       * INITIAL STATE
       * =========================================
       */

      gsap.set(background, {
        backgroundColor: "#000000",
      });

      /*
       * REAL HELLO
       *
       * This is hidden only until the decoy finishes.
       * Its actual character geometry is untouched.
       */

      gsap.set(".prototype-real-hello", {
        opacity: 0,
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
       * DECOY LETTERS
       *
       * Start with nothing visible.
       */

      gsap.set(decoyLetters, {
        opacity: 0,
      });

      /*
       * I AM + NAME
       */

      gsap.set(".prototype-iam", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".prototype-name", {
        opacity: 0,
        y: 80,
      });

      gsap.set(geometry, {
        scale: 0.96,
        x: 0,
        y: 0,
        });

      /*
       * =========================================
       * ONE-TIME DECOY HELLO
       * =========================================
       *
       * H
       * HE
       * HEL
       * HELL
       * HELLO
       * HELLO.
       *
       * We reveal the existing spans rather than
       * replacing textContent.
       */

      const loadTimeline = gsap.timeline();

      decoyLetters.forEach((letter, index) => {
        loadTimeline.to(
          letter,
          {
            opacity: 1,
            duration: 0.055,
            ease: "power2.out",
          },
          index === 0 ? 0 : "-=0.008",
        );
      });

      /*
       * Tiny settle.
       */

      loadTimeline
        .to(".prototype-decoy-hello", {
          scaleX: 1.012,
          scaleY: 1.012,
          duration: 0.08,
          ease: "power2.out",
        })
        .to(".prototype-decoy-hello", {
          scaleX: 1,
          scaleY: 1,
          duration: 0.08,
          ease: "power2.out",
        });
        

      /*
       * Seamless handoff:
       *
       * real HELLO appears exactly where the
       * decoy currently is.
       */

      loadTimeline
        .to(
          ".prototype-real-hello",
          {
            opacity: 1,
            duration: 0.08,
            ease: "none",
          },
          "+=0.04",
        )
        .to(
          ".prototype-decoy-hello",
          {
            opacity: 0,
            duration: 0.08,
            ease: "none",
          },
          "<",
        );

      /*
       * =========================================
       * MAIN SCROLL TIMELINE
       * =========================================
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
       * PHASE 1 — HELLO RESTS
       * =========================================
       */

      if (scrollHint) {
        timeline.to(
          scrollHint,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          0.15,
        );
      }
      
      timeline.to({}, {
        duration: 0.35,
      });

      /*
       * =========================================
       * PHASE 2 — VERTICAL STRETCH
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
       * PHASE 3 — FIRST DISPERSION
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
       * PHASE 4 — ELASTIC DISPERSION
       * =========================================
       */

      helloLetters.forEach((character, index) => {
        const direction = index < 3 ? -1 : 1;

        timeline.to(
          character,
          {
            x:
              direction *
              (220 + index * 55),

            y:
              (index - 2.5) * 175,

            rotation:
              direction *
              (25 + index * 14),

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
       * PHASE 5 — BLACK → WARM WHITE
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

      timeline.to(
        ".brutalist-background",
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        2.45,
      );

      timeline.to(
        geometry,
        {
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power2.out",
        },
        2.45,
      );

      /*
       * =========================================
       * PHASE 6 — I AM
       * =========================================
       */

      timeline.to(
        ".prototype-iam",
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        2.95,
      );

      /*
       * =========================================
       * PHASE 7 — NAME
       * =========================================
       */
      timeline.to(
        ".prototype-name",
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          ease: "none",
        },
        3.10,
      );

      timeline.fromTo(
        ".prototype-name-line:first-child",
        {
          y: 90,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.65,
          ease: "power4.out",
        },
        3.12,
      );
      
      timeline.fromTo(
        ".prototype-name-last",
        {
          y: 120,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.7,
          ease: "power4.out",
        },
        3.28,
      );

      /*
       * =========================================
       * PHASE 8 — HELLO LEAVES
       * =========================================
       */

      helloLetters.forEach((character, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        timeline.to(
          character,
          {
            x:
              direction *
              (420 + index * 90),

            y:
              direction *
              (280 + index * 70),

            rotation:
              direction *
              (55 + index * 18),

            scaleX: 0.15,
            scaleY: 0.15,

            opacity: 0,

            duration: 1,
            ease: "power3.in",
          },
          3.35,
        );
      });

      handlePointerMove = (event: PointerEvent) => {
        const scrollTrigger = ScrollTrigger.getAll().find(
          (trigger) => trigger.trigger === section,
        );
      
        const progress = scrollTrigger?.progress ?? 0;
      
        if (progress < 0.55) {
          return;
        }
      
        const rect = section.getBoundingClientRect();
      
        const mouseX =
          (event.clientX - rect.left) / rect.width - 0.5;
      
        const mouseY =
          (event.clientY - rect.top) / rect.height - 0.5;
      
        geometry.forEach((shape, index) => {
          const strength = 8 + index * 3;
      
          gsap.to(shape, {
            x: mouseX * strength,
            y: mouseY * strength * 0.7,
            rotation:
              mouseX *
              (index % 2 === 0 ? 1.5 : -1.5),
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
          });
        });
      };
      
      section.addEventListener(
        "pointermove",
        handlePointerMove,
      );
      
      jumbleWords =
          gsap.utils.toArray<HTMLElement>(
            ".name-jumble",
          );

        const shuffleText = (text: string) => {
          const characters = text.split("");

          for (
            let i = characters.length - 1;
            i > 0;
            i--
          ) {
            const j = Math.floor(
              Math.random() * (i + 1),
            );

            [
              characters[i],
              characters[j],
            ] = [
              characters[j],
              characters[i],
            ];
          }

          return characters.join("");
        };

        jumbleWords.forEach((word) => {
          let timerIds: number[] = [];

          word.addEventListener("mouseenter", () => {
            const original =
              word.dataset.text ?? "";

            timerIds.forEach((id) => {
              window.clearTimeout(id);
            });

            timerIds = [];

            const passes = 4;
            const duration = 250;
            const interval = duration / passes;

            for (let i = 0; i < passes; i++) {
              const id = window.setTimeout(() => {
                word.textContent =
                  shuffleText(original);
              }, i * interval);

              timerIds.push(id);
            }

            const restoreId =
              window.setTimeout(() => {
                word.textContent = original;
              }, duration);

            timerIds.push(restoreId);
          });

          word.addEventListener("mouseleave", () => {
            const original =
              word.dataset.text ?? "";

            timerIds.forEach((id) => {
              window.clearTimeout(id);
            });

            timerIds = [];

            word.textContent = original;
          });
        });

    }, section);

    return () => {
      if (handlePointerMove) {
        section.removeEventListener(
          "pointermove",
          handlePointerMove,
        );
      }
      jumbleWords.forEach((word) => {
        word.textContent =
          word.dataset.text ?? "";
      });
    
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

        {/* HELLO STAGE */}
        <div className="hello-stage">

          <div className="prototype-decoy-hello">
            {"HELLO.".split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="decoy-letter"
              >
                {letter}
              </span>
            ))}
          </div>

          <div className="prototype-real-hello">
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
          </div>

        </div>
        <div
              className="brutalist-background"
              aria-hidden="true"
            >
              <div className="brutalist-shape shape-one" />
              <div className="brutalist-shape shape-two" />
              <div className="brutalist-shape shape-three" />
              <div className="brutalist-line line-one" />
              <div className="brutalist-line line-two" />
        </div>

        {/* I AM */}
        <div className="prototype-iam name-jumble" data-text="I AM">
          I AM
        </div>


        {/* NAME */}
        <div className="prototype-name">

          <div
            className="prototype-name-line name-jumble"
            data-text="HRISHIKESH"
          >
            HRISHIKESH
          </div>

          <div
            className="prototype-name-line prototype-name-last name-jumble"
            data-text="NATH"
          >
            NATH
          </div>

        </div>


        {/* SCROLL HINT — IMPORTANT:
            outside hello-stage */}
        <div className="prototype-scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <span className="prototype-scroll-arrow">↓</span>
        </div>

        </div>
    </section>
  );
}

export default IntroPrototype;