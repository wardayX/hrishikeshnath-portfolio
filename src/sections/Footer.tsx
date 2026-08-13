import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function Footer() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const geometry =
      gsap.utils.toArray<HTMLElement>(
        ".footer-geo",
      );

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        section.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
          rect.height -
        0.5;

      geometry.forEach(
        (element, index) => {
          const baseRotation =
            Number(
              element.dataset.rotation ??
                "0",
            );

          gsap.to(element, {
            x:
              x *
              (8 + index * 4),

            y:
              y *
              (5 + index * 2),

            rotation:
              baseRotation +
              x *
                (0.8 +
                  index * 0.25),

            duration: 0.8,

            ease: "power3.out",

            overwrite: true,
          });
        },
      );
    };

    const handlePointerLeave = () => {
      geometry.forEach(
        (element) => {
          const baseRotation =
            Number(
              element.dataset.rotation ??
                "0",
            );

          gsap.to(element, {
            x: 0,
            y: 0,
            rotation:
              baseRotation,

            duration: 0.9,

            ease: "power3.out",
          });
        },
      );
    };

    section.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    section.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      section.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      section.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="footer-section"
    >
      <div className="footer-background" />

      {/* ======================================
          GEOMETRY
      ====================================== */}

      <div className="footer-geometry">

        <div
          className="footer-geo footer-geo-large"
          data-rotation="-12"
        />

        <div
          className="footer-geo footer-geo-tall"
          data-rotation="17"
        />

        <div
          className="footer-geo footer-geo-diamond"
          data-rotation="32"
        />

        <div
          className="footer-geo-line footer-geo-line-one"
          data-rotation="0"
        />

        <div
          className="footer-geo-line footer-geo-line-two"
          data-rotation="0"
        />

        <div
          className="footer-geo-line footer-geo-line-three"
          data-rotation="0"
        />

      </div>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="footer-label">
        CONTACT
      </div>

      {/* ======================================
          MAIN IDENTITY
      ====================================== */}
      <div className="footer-intro">
        <div className="footer-intro-main">
            LET'S TALK.
        </div>

        <div className="footer-intro-sub">
            OPEN TO COLLABORATION,
            PROJECTS & OPPORTUNITIES.
        </div>
        </div>

      {/* ======================================
          PRIMARY CONTACT
      ====================================== */}

        <div className="footer-primary-links">

        <a
        href="mailto:nathh722@gmail.com"
        className="footer-link footer-link-large"
        >
        EMAIL
        <span>↗</span>
        </a>

        <a
        href="tel:+919365806134"
        className="footer-link footer-link-large"
        >
        PHONE
        <span>↗</span>
        </a>

        <a
        href="https://github.com/wardayX"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link footer-link-large"
        >
        GITHUB
        <span>↗</span>
        </a>

        <a
        href="https://www.linkedin.com/in/hrishikesh-nath-01552a298/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link footer-link-large"
        >
        LINKEDIN
        <span>↗</span>
        </a>

        </div>

      {/* ======================================
          CODING LINKS
      ====================================== */}

      <div className="footer-coding">

        <div className="footer-coding-label">
          CODING / PROFILES
        </div>

        <div className="footer-coding-links">

          <a
            href="https://www.codechef.com/users/gaggle_tale_35"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-small"
          >
            CODECHEF
            <span>↗</span>
          </a>

          <a
            href="https://codeforces.com/profile/Samskara"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-small"
          >
            CODEFORCES
            <span>↗</span>
          </a>

          <a
            href="https://leetcode.com/u/hrishikesh19/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-small"
          >
            LEETCODE
            <span>↗</span>
          </a>

          <a
            href="https://www.hackerrank.com/profile/nathh722"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-small"
          >
            HACKERRANK
            <span>↗</span>
          </a>

        </div>
      </div>

      {/* ======================================
          RESUME
      ====================================== */}

      <a
        href="/hrishikesh-nath-resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-resume"
      >
        VIEW RESUME
        <span>↗</span>
      </a>

      {/* ======================================
          END LINE
      ====================================== */}

      <div className="footer-bottom">
        <span>
          OPEN TO COLLABORATION / PROJECTS / OPPORTUNITIES
        </span>

        <span>
          2026
        </span>
      </div>
    </section>
  );
}

export default Footer;