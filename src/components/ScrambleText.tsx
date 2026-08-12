import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*@";

function randomCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  const characterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const active = useRef<Set<number>>(new Set());
  const cooldowns = useRef<Set<number>>(new Set());

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const characters = characterRefs.current.filter(
      (element): element is HTMLSpanElement => element !== null,
    );

    const handlePointerMove = (event: PointerEvent) => {
      const radius = 65;

      characters.forEach((element, index) => {
        if (active.current.has(index) || cooldowns.current.has(index)) {
          return;
        }

        const original = text[index];

        if (original === " ") {
          return;
        }

        const rect = element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > radius) {
          return;
        }

        const strength = 1 - distance / radius;

        active.current.add(index);
        cooldowns.current.add(index);

        const timeline = gsap.timeline({
          onComplete: () => {
            element.textContent = original;
            active.current.delete(index);

            window.setTimeout(() => {
              cooldowns.current.delete(index);
            }, 900);
          },
        });

        // 0 → ~50ms
        timeline.to(element, {
          y: -5 * strength,
          x: (Math.random() - 0.5) * 6 * strength,
          rotate: (Math.random() - 0.5) * 4 * strength,
          scale: 1 + 0.04 * strength,
          duration: 0.05,
          ease: "power2.out",
        });

        // ~50ms
        timeline.call(() => {
          element.textContent = randomCharacter();
        });

        // ~100ms
        timeline.to({}, {
          duration: 0.04,
        });

        timeline.call(() => {
          element.textContent = randomCharacter();
        });

        // ~140ms
        timeline.to({}, {
          duration: 0.04,
        });

        timeline.call(() => {
          element.textContent = randomCharacter();
        });

        // ~140 → 220ms
        timeline.to(element, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.08,
          ease: "power2.out",
        });

        // Final character
        timeline.call(() => {
          element.textContent = original;
        });
      });
    };

    root.addEventListener("pointermove", handlePointerMove);

    return () => {
      root.removeEventListener("pointermove", handlePointerMove);

      characters.forEach((element) => {
        gsap.killTweensOf(element);
      });

      active.current.clear();
      cooldowns.current.clear();
    };
  }, [text]);

  return (
    <span
      ref={rootRef}
      className={`scramble-text ${className}`}
    >
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          ref={(element) => {
            characterRefs.current[index] = element;
          }}
          className="scramble-character"
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export default ScrambleText;