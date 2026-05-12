"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  showCursor?: boolean;
  hideCursorOnComplete?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  stagger = 0.04,
  showCursor = false,
  hideCursorOnComplete = false,
  as: Tag = "span",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = Array.from(el.querySelectorAll<HTMLSpanElement>(".st-char"));
    const cursor = el.querySelector<HTMLSpanElement>(".st-cursor");

    // Use opacity instead of visibility — more reliable on iOS Safari
    gsap.set(chars, { opacity: 0 });

    if (cursor) {
      gsap.set(cursor, { opacity: 0, display: "inline-block" });
      if (chars[0]?.parentNode) {
        chars[0].parentNode.insertBefore(cursor, chars[0]);
      }
    }

    const tl = gsap.timeline({ delay });

    // Show cursor at the start
    if (cursor) {
      tl.set(cursor, { opacity: 1 }, 0);
    }

    chars.forEach((char, i) => {
      const t = i * stagger;
      // Reveal character
      tl.set(char, { opacity: 1 }, t);
      // Move cursor after this character
      if (cursor) {
        tl.call(
          () => {
            if (char.parentNode) {
              char.parentNode.insertBefore(cursor, char.nextSibling);
            }
          },
          [],
          t
        );
      }
    });

    const totalTime = chars.length * stagger;

    if (cursor) {
      if (hideCursorOnComplete) {
        tl.set(cursor, { display: "none" }, totalTime);
      } else {
        tl.to(
          cursor,
          { opacity: 0, repeat: 5, yoyo: true, duration: 0.5, ease: "steps(1)" },
          totalTime + 0.2
        );
        tl.set(cursor, { display: "none" }, totalTime + 3.5);
      }
    }

    return () => {
      tl.kill();
    };
  }, [delay, stagger, text, hideCursorOnComplete]);

  const words = text.split(" ");
  const chars: React.ReactNode[] = [];

  words.forEach((word, wi) => {
    const wordChars = word.split("").map((char, ci) => (
      <span
        key={`${wi}-${ci}`}
        className={`st-char inline-block ${charClassName}`}
        style={{ opacity: 0 }}
      >
        {char}
      </span>
    ));

    chars.push(
      <span key={`w${wi}`} className="inline-block whitespace-nowrap">
        {wordChars}
      </span>
    );

    if (wi < words.length - 1) {
      chars.push(
        <span
          key={`s${wi}`}
          className={`st-char inline-block ${charClassName}`}
          style={{ opacity: 0, whiteSpace: "pre" }}
        >
          {" "}
        </span>
      );
    }
  });

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {chars}
      {showCursor && (
        <span
          className="st-cursor inline-block w-[3px] h-[0.8em] bg-[#63AAA2] ml-[2px] align-middle"
          style={{ opacity: 0 }}
        />
      )}
    </Tag>
  );
}
