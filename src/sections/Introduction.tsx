import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    lines: [
      "I HAVE ALWAYS",
      "BEEN CURIOUS",
      "ABOUT HOW THINGS WORK.",
      "WHY THEY WORK.",
      "AND WHAT HAPPENS",
      "WHEN I PUSH THEM.",
    ],
    layout: "left",
  },
  {
    lines: [
      "I LIKE ELECTRONICS—",
      "THE SMALL CURRENTS,",
      "THE QUIET LOGIC,",
      "THE KIND OF THINGS",
      "YOU CANNOT SEE,",
      "BUT CAN FEEL.",
    ],
    layout: "wide",
  },
  {
    lines: [
      "SOMEWHERE BETWEEN",
      "CIRCUITS AND CODE,",
      "I FOUND A SPACE",
      "I REALLY LIKE.",
      "A PLACE TO",
      "KEEP WONDERING.",
    ],
    layout: "center",
  },
  {
    lines: [
      "I LIKE AI.",
      "NOT JUST FOR WHAT IT CAN DO,",
      "BUT FOR WHAT IT MAKES POSSIBLE.",
    ],
    layout: "right",
  },
  {
    lines: [
      "THIS IS SOME OF WHAT",
      "I'VE BEEN WORKING ON.",
      "SOME THINGS WORKED.",
      "SOME DIDN'T.",
      "I KEPT GOING.",
    ],
    layout: "bottom",
  },
];

const hoverFonts = [
  "Clash Grotesk",
  "Nippo",
  "Boska",
  "Telma",
  "Aktura",
  "Britney",
];

function Introduction() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const hoverCleanups: Array<() => void> = [];

    const geometryElements =
    gsap.utils.toArray<HTMLElement>(
      ".intro-geo-shape, .intro-geo-line",
    );

const handleIntroPointerMove = (
  event: PointerEvent,
) => {
  const rect =
    section.getBoundingClientRect();

  const mouseX =
    (event.clientX - rect.left) /
      rect.width -
    0.5;

  const mouseY =
    (event.clientY - rect.top) /
      rect.height -
    0.5;

  geometryElements.forEach(
    (element, index) => {
      const baseRotation =
        Number(
          element.dataset.rotation ??
            "0",
        );

      /*
       * Each element reacts differently.
       * Objects deeper in the composition
       * move less.
       */

      const strengthX =
        6 + index * 5;

      const strengthY =
        4 + index * 2.5;

      const rotationStrength =
        0.8 + index * 0.35;

      gsap.to(element, {
        x:
          mouseX *
          strengthX,

        y:
          mouseY *
          strengthY,

        rotation:
          baseRotation +
          mouseX *
            rotationStrength,

        duration: 0.8,

        ease: "power3.out",

        overwrite: true,
      });
    },
  );
};

const handleIntroPointerLeave = () => {
  geometryElements.forEach(
    (element) => {
      const baseRotation =
        Number(
          element.dataset.rotation ??
            "0",
        );

      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: baseRotation,

        duration: 0.9,

        ease: "power3.out",
      });
    },
  );
};
section.addEventListener(
  "pointermove",
  handleIntroPointerMove,
);

section.addEventListener(
  "pointerleave",
  handleIntroPointerLeave,
);

const ctx = gsap.context(() => {
  const panels =
    gsap.utils.toArray<HTMLElement>(
      ".intro-panel",
    );

  const projectCue =
    section.querySelector<HTMLElement>(
      ".intro-project-cue",
    );
      /*
       * =========================================
       * HOVER TYPOGRAPHY
       * =========================================
       */

      const hoverWords =
        gsap.utils.toArray<HTMLElement>(
          ".intro-hover-word",
        );

      /*
       * Shuffle characters while keeping
       * spaces in their original positions.
       */

      const shuffleText = (
        text: string,
      ) => {
        const characters =
          text.split("");

        const movableIndices: number[] =
          [];

        characters.forEach(
          (character, index) => {
            if (character !== " ") {
              movableIndices.push(index);
            }
          },
        );

        for (
          let i =
            movableIndices.length - 1;
          i > 0;
          i--
        ) {
          const randomIndex =
            Math.floor(
              Math.random() *
                (i + 1),
            );

          const a =
            movableIndices[i];

          const b =
            movableIndices[
              randomIndex
            ];

          [
            characters[a],
            characters[b],
          ] = [
            characters[b],
            characters[a],
          ];
        }

        return characters.join("");
      };

      hoverWords.forEach((word) => {
        const base =
          word.querySelector<HTMLElement>(
            ".intro-word-base",
          );

        const hover =
          word.querySelector<HTMLElement>(
            ".intro-word-hover",
          );

        if (!base || !hover) {
          return;
        }

        const original =
          word.dataset.text ?? "";

        let currentFont = "";

        let timerIds: number[] = [];

        const clearTimers = () => {
          timerIds.forEach((id) => {
            window.clearTimeout(id);
          });

          timerIds = [];
        };

        const restore = () => {
          clearTimers();

          hover.textContent =
            original;

          gsap.killTweensOf([
            base,
            hover,
          ]);

          gsap.set(base, {
            opacity: 1,
          });

          gsap.set(hover, {
            opacity: 0,
            scaleX: 1,
            transformOrigin:
              "left center",
          });
        };

        const handleEnter = () => {
          clearTimers();

          /*
           * Don't immediately repeat the
           * same font if possible.
           */

          const availableFonts =
            hoverFonts.filter(
              (font) =>
                font !== currentFont,
            );

          currentFont =
            availableFonts.length > 0
              ? availableFonts[
                  Math.floor(
                    Math.random() *
                      availableFonts.length,
                  )
                ]
              : hoverFonts[
                  Math.floor(
                    Math.random() *
                      hoverFonts.length,
                  )
                ];

          hover.style.fontFamily =
            `"${currentFont}", sans-serif`;

          hover.textContent =
            original;

          gsap.killTweensOf([
            base,
            hover,
          ]);

          /*
           * Fit the alternate font to
           * the available text region.
           */

          requestAnimationFrame(() => {
            const copy =
              word.closest<HTMLElement>(
                ".intro-copy",
              );

            if (!copy) {
              return;
            }

            const availableWidth =
              copy.getBoundingClientRect()
                .width;

            const actualWidth =
              hover.scrollWidth;

            let fitScale = 1;

            if (
              actualWidth >
              availableWidth
            ) {
              fitScale =
                availableWidth /
                actualWidth;
            }

            gsap.set(hover, {
              scaleX: fitScale,
              transformOrigin:
                "left center",
            });

            gsap.to(base, {
              opacity: 0,
              duration: 0.06,
              ease: "none",
            });

            gsap.to(hover, {
              opacity: 1,
              duration: 0.06,
              ease: "none",
            });
          });

          /*
           * Brief character jumble.
           */

          const passes = 4;

          const interval = 55;

          for (
            let i = 0;
            i < passes;
            i++
          ) {
            const id =
              window.setTimeout(
                () => {
                  hover.textContent =
                    shuffleText(
                      original,
                    );
                },
                i * interval,
              );

            timerIds.push(id);
          }

          /*
           * Settle back to the correct
           * phrase while keeping the
           * alternate font.
           */

          const finalTextId =
            window.setTimeout(
              () => {
                hover.textContent =
                  original;
              },
              passes * interval,
            );

          timerIds.push(
            finalTextId,
          );
        };

        const handleLeave = () => {
          restore();
        };

        word.addEventListener(
          "mouseenter",
          handleEnter,
        );

        word.addEventListener(
          "mouseleave",
          handleLeave,
        );

        hoverCleanups.push(() => {
          clearTimers();

          word.removeEventListener(
            "mouseenter",
            handleEnter,
          );

          word.removeEventListener(
            "mouseleave",
            handleLeave,
          );

          restore();
        });
      });

      /*
       * =========================================
       * INITIAL STATE
       * =========================================
       */

      panels.forEach(
        (panel, index) => {
          const lines =
            panel.querySelectorAll<HTMLElement>(
              ".intro-line",
            );

          gsap.set(panel, {
            opacity:
              index === 0
                ? 1
                : 0,
                pointerEvents:
                index === 0
                  ? "auto"
                  : "none",
          });

          gsap.set(lines, {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            opacity:
              index === 0
                ? 1
                : 0,
          });
        },
      );

      gsap.set(projectCue, {
        opacity: 0,
        y: 40,
      });

      /*
       * =========================================
       * SCROLL TIMELINE
       * =========================================
       */

      const timeline =
        gsap.timeline({
          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "+=850%",

            scrub: 1,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

      /*
       * =========================================
       * EACH STATEMENT
       * =========================================
       */

      panels.forEach(
        (panel, index) => {
          const lines =
            panel.querySelectorAll<HTMLElement>(
              ".intro-line",
            );

          if (index === 0) {
            timeline.to(
              {},
              {
                duration: 0.5,
              },
            );
          }

          if (
            index <
            panels.length - 1
          ) {
            /*
             * CURRENT STATEMENT
             * BREAKS APART
             */

            lines.forEach(
              (
                line,
                lineIndex,
              ) => {
                const direction =
                  lineIndex %
                    2 ===
                  0
                    ? -1
                    : 1;

                timeline.to(
                  line,
                  {
                    x:
                      direction *
                      (180 +
                        lineIndex *
                          60),

                    y:
                      (lineIndex -
                        1.5) *
                      70,

                    rotation:
                      direction *
                      (3 +
                        lineIndex *
                          2),

                    scaleX:
                      1.08 +
                      lineIndex *
                        0.015,

                    scaleY: 0.92,

                    opacity: 0,

                    duration:
                      0.45,

                    ease:
                      "power3.in",
                  },
                );
              },
            );

            /*
             * CURRENT PANEL DISAPPEARS
             */

            timeline.to(
              panel,
              {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.12,
              },
              "<0.25",
            );

            /*
             * NEXT PANEL
             */

            const nextPanel =
              panels[index + 1];

            const nextLines =
              nextPanel.querySelectorAll<HTMLElement>(
                ".intro-line",
              );

            const layout =
              nextPanel.dataset
                .layout;

            let entryX = 0;

            let entryY = 0;

            if (
              layout === "left"
            ) {
              entryX = -420;
            } else if (
              layout === "right"
            ) {
              entryX = 420;
            } else if (
              layout === "center"
            ) {
              entryY = 260;
            } else if (
              layout === "wide"
            ) {
              entryX = 320;
            } else {
              entryY = 300;
            }

            /*
             * Prepare next panel.
             */

            gsap.set(nextPanel, {
              opacity: 1,
              pointerEvents: "none",
            });

            timeline.set(
              panel,
              {
                pointerEvents: "none",
              },
            );
            
            timeline.set(
              nextPanel,
              {
                pointerEvents: "auto",
              },
            );

            nextLines.forEach(
              (
                line,
                lineIndex,
              ) => {
                gsap.set(line, {
                  x:
                    entryX +
                    (lineIndex %
                      2 ===
                    0
                      ? -40
                      : 40),

                  y:
                    entryY +
                    lineIndex *
                      18,

                  rotation:
                    lineIndex %
                      2 ===
                    0
                      ? -3
                      : 3,

                  scaleX: 0.82,

                  scaleY: 1.08,

                  opacity: 0,
                });
              },
            );

            /*
             * NEXT STATEMENT
             * PAINTS ITSELF IN
             */

            nextLines.forEach(
              (
                line,
                lineIndex,
              ) => {
                timeline.to(
                  line,
                  {
                    x: 0,

                    y: 0,

                    rotation: 0,

                    scaleX: 1,

                    scaleY: 1,

                    opacity: 1,

                    duration:
                      0.55 +
                      lineIndex *
                        0.04,

                    ease:
                      "power4.out",
                  },
                  "<" +
                    lineIndex *
                      0.05,
                );
              },
            );

            /*
             * Breathing room.
             */

            timeline.to(
              {},
              {
                duration: 0.45,
              },
            );
          }
        },
      );

      /*
       * =========================================
       * FINAL PROJECT TRANSITION
       * =========================================
       */

      const finalPanel =
        panels[
          panels.length - 1
        ];

      const finalLines =
        finalPanel.querySelectorAll<HTMLElement>(
          ".intro-line",
        );

      finalLines.forEach(
        (line, index) => {
          timeline.to(
            line,
            {
              y:
                -(
                  100 +
                  index * 35
                ),

              x:
                index % 2 === 0
                  ? -120
                  : 120,

              opacity: 0,

              duration: 0.45,

              ease:
                "power3.in",
            },
            "+=0.02",
          );
        },
      );

      timeline.to(
        projectCue,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<0.15",
      );
    }, section);

    return () => {
      section.removeEventListener(
        "pointermove",
        handleIntroPointerMove,
      );

      section.removeEventListener(
        "pointerleave",
        handleIntroPointerLeave,
      );

      hoverCleanups.forEach(
        (cleanup) => cleanup(),
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="introduction-section"
    >
      <div className="introduction-background" />

      <div className="introduction-content">

        {/* RIGHT-SIDE INTERACTIVE LINES */}

        <div className="intro-geometry">

  {/* Large cropped rectangle */}
  <div
    className="intro-geo-shape intro-geo-shape-one"
    data-rotation="-13"
  />

  {/* Tall vertical rectangle */}
  <div
    className="intro-geo-shape intro-geo-shape-two"
    data-rotation="21"
  />

  {/* Rhombus */}
  <div
    className="intro-geo-shape intro-geo-shape-three"
    data-rotation="37"
  />

  {/* Small square */}
  <div
    className="intro-geo-shape intro-geo-shape-four"
    data-rotation="-27"
  />

  {/* Connecting lines */}
  <div
    className="intro-geo-line intro-geo-line-one"
    data-rotation="0"
  />

  <div
    className="intro-geo-line intro-geo-line-two"
    data-rotation="0"
  />

  <div
    className="intro-geo-line intro-geo-line-three"
    data-rotation="0"
  />

  <div
    className="intro-geo-line intro-geo-line-four"
    data-rotation="0"
  />

</div>

        {/* HEADER */}

        <div className="intro-index">
          INTRODUCTION
        </div>

        {/* PANELS */}

        <div className="intro-panels">
          {statements.map(
            (statement) => (
              <div
                key={statement.lines.join(
                  "-",
                )}
                className={`intro-panel intro-layout-${statement.layout}`}
                data-layout={
                  statement.layout
                }
              >
                <div className="intro-copy">
                  {statement.lines.map(
                    (
                      line,
                      lineIndex,
                    ) => (
                      <div
                        key={`${statement.layout}-${lineIndex}`}
                        className="intro-line"
                      >
                        <span
                          className="intro-hover-word"
                          data-text={line}
                        >
                          <span className="intro-word-base">
                            {line}
                          </span>

                          <span
                            className="intro-word-hover"
                            aria-hidden="true"
                          >
                            {line}
                          </span>
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ),
          )}
        </div>

        {/* PROJECT CUE */}

        <div className="intro-project-cue">
          <span>
            SELECTED WORK
          </span>

          <span className="intro-project-arrow">
            →
          </span>
        </div>

        {/* SCROLL */}

        <div className="intro-scroll">
          SCROLL
        </div>
      </div>
    </section>
  );
}

export default Introduction;