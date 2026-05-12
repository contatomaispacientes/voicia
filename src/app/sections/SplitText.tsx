"use client";

import { useEffect, useRef } from "react";

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
    const ids: ReturnType<typeof setTimeout>[] = [];

    // Place cursor before first char (initially hidden)
    if (cursor && chars[0]?.parentNode) {
      chars[0].parentNode.insertBefore(cursor, chars[0]);
    }

    // Show cursor exactly when typing starts
    if (cursor) {
      const t = setTimeout(() => {
        cursor.style.opacity = "1";
      }, delay * 1000);
      ids.push(t);
    }

    // Reveal each char sequentially — pure setTimeout, zero GSAP
    chars.forEach((char, i) => {
      const t = setTimeout(() => {
        char.style.opacity = "1";
        // Move cursor right after this char
        if (cursor && char.parentNode) {
          char.parentNode.insertBefore(cursor, char.nextSibling);
        }
      }, (delay + i * stagger) * 1000);
      ids.push(t);
    });

    const totalMs = (delay + chars.length * stagger) * 1000;

    if (cursor) {
      if (hideCursorOnComplete) {
        // Hide cursor immediately when typing ends (pass baton to next SplitText)
        const t = setTimeout(() => {
          cursor.style.opacity = "0";
          cursor.style.display = "none";
        }, totalMs);
        ids.push(t);
      } else {
        // Blink 6 times then disappear
        let blinks = 0;
        const blinkInterval = setInterval(() => {
          cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
          blinks++;
          if (blinks >= 12) {
            clearInterval(blinkInterval);
            cursor.style.display = "none";
          }
        }, 500);

        const t = setTimeout(() => {
          // start blinking after typing ends
        }, totalMs + 200);
        ids.push(t);

        // Store blinkInterval ref for cleanup
        ids.push(blinkInterval as unknown as ReturnType<typeof setTimeout>);
      }
    }

    return () => {
      ids.forEach((id) => {
        clearTimeout(id as ReturnType<typeof setTimeout>);
        clearInterval(id as unknown as ReturnType<typeof setInterval>);
      });
    };
  }, [delay, stagger, text, hideCursorOnComplete]);

  // Group chars into words to prevent mid-word line breaks
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
          {" "}
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
