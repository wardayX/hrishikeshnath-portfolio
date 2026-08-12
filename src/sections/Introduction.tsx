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
      ],
      layout: "left",
    },
    {
      lines: [
        "I LIKE ELECTRONICS—",
        "THE SMALL CURRENTS,",
        "THE QUIET LOGIC,",
        "THE INVISIBLE THINGS",
        "MAKING SOMETHING HAPPEN.",
      ],
      layout: "wide",
    },
    {
      lines: [
        "SOMEWHERE BETWEEN",
        "CIRCUITS AND CODE,",
        "I FOUND A SPACE",
        "I REALLY LIKE.",
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
      ],
      layout: "bottom",
    },
  ];
function Introduction() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
  
    if (!section) {
      return;
    }
  
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
       * INITIAL STATE
       * =========================================
       */
  
      panels.forEach((panel, index) => {
        const lines =
          panel.querySelectorAll<HTMLElement>(
            ".intro-line",
          );
  
        gsap.set(panel, {
          opacity: index === 0 ? 1 : 0,
        });
  
        gsap.set(lines, {
          x: 0,
          y: 0,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: index === 0 ? 1 : 0,
          clipPath: "inset(0 0 0% 0)",
        });
      });
  
      gsap.set(projectCue, {
        opacity: 0,
        y: 40,
      });
  
      /*
       * =========================================
       * SCROLL TIMELINE
       * =========================================
       */
  
      const timeline = gsap.timeline({
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
  
      panels.forEach((panel, index) => {
        const lines =
          panel.querySelectorAll<HTMLElement>(
            ".intro-line",
          );
  
        if (index === 0) {
          timeline.to({}, {
            duration: 0.5,
          });
        }
  
        /*
         * -----------------------------------------
         * CURRENT STATEMENT BREAKS APART
         * -----------------------------------------
         */
  
        if (index < panels.length - 1) {
          lines.forEach((line, lineIndex) => {
            const direction =
              lineIndex % 2 === 0
                ? -1
                : 1;
  
            timeline.to(
              line,
              {
                x:
                  direction *
                  (180 + lineIndex * 60),
  
                y:
                  (lineIndex - 1.5) *
                  70,
  
                rotation:
                  direction *
                  (3 + lineIndex * 2),
  
                scaleX:
                  1.08 +
                  lineIndex * 0.015,
  
                scaleY: 0.92,
  
                opacity: 0,
  
                duration: 0.45,
  
                ease: "power3.in",
              },
            );
          });
  
          /*
           * -----------------------------------------
           * CURRENT PANEL DISAPPEARS
           * -----------------------------------------
           */
  
          timeline.to(
            panel,
            {
              opacity: 0,
              duration: 0.12,
            },
            "<0.25",
          );
  
          /*
           * -----------------------------------------
           * NEXT PANEL
           * -----------------------------------------
           */
  
          const nextPanel =
            panels[index + 1];
  
          const nextLines =
            nextPanel.querySelectorAll<HTMLElement>(
              ".intro-line",
            );
  
          const layout =
            nextPanel.dataset.layout;
  
          let entryX = 0;
          let entryY = 0;
  
          if (layout === "left") {
            entryX = -420;
          } else if (layout === "right") {
            entryX = 420;
          } else if (layout === "center") {
            entryY = 260;
          } else if (layout === "wide") {
            entryX = 320;
          } else {
            entryY = 300;
          }
  
          /*
           * Prepare next statement.
           */
  
          gsap.set(nextPanel, {
            opacity: 1,
          });
  
          nextLines.forEach((line, lineIndex) => {
            gsap.set(line, {
              x:
                entryX +
                (lineIndex % 2 === 0
                  ? -40
                  : 40),
  
              y:
                entryY +
                (lineIndex * 18),
  
              rotation:
                lineIndex % 2 === 0
                  ? -3
                  : 3,
  
              scaleX: 0.82,
              scaleY: 1.08,
  
              opacity: 0,
  
              clipPath:
                "inset(0 100% 0 0)",
            });
          });
  
          /*
           * -----------------------------------------
           * NEXT STATEMENT PAINTS ITSELF
           * -----------------------------------------
           */
  
          nextLines.forEach((line, lineIndex) => {
            timeline.to(
              line,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
  
                clipPath:
                  "inset(0 0% 0 0)",
  
                duration:
                  0.55 +
                  lineIndex * 0.04,
  
                ease: "power4.out",
              },
              "<" +
                (lineIndex * 0.05),
            );
          });
  
          /*
           * Slight breathing room.
           */
  
          timeline.to({}, {
            duration: 0.45,
          });
        }
      });
  
      /*
       * =========================================
       * FINAL PROJECT TRANSITION
       * =========================================
       */
  
      const finalPanel =
        panels[panels.length - 1];
  
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
                -(100 +
                  index * 35),
  
              x:
                index % 2 === 0
                  ? -120
                  : 120,
  
              opacity: 0,
  
              duration: 0.45,
  
              ease: "power3.in",
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
        <div className="intro-index">
          INTRODUCTION
        </div>

        <div className="intro-panels">
                {statements.map((statement) => (
                    <div
                    key={statement.lines.join("-")}
                    className={`intro-panel intro-layout-${statement.layout}`}
                    data-layout={statement.layout}
                    >

                    <div className="intro-copy">
                        {statement.lines.map((line, lineIndex) => (
                        <div
                            key={`${statement.layout}-${lineIndex}`}
                            className="intro-line"
                        >
                            {line}
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>

        <div className="intro-project-cue">
          <span>
            SELECTED WORK
          </span>

          <span className="intro-project-arrow">
            →
          </span>
        </div>

        <div className="intro-scroll">
          SCROLL
        </div>
      </div>
    </section>
  );
}

export default Introduction;