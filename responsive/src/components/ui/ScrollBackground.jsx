import { useEffect, useRef } from "react";

export default function ScrollBackground() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    const glow = glowRef.current;
    if (!top || !bottom || !glow) return;

    let raf = 0;
    const SIZE = 64;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;
      const offset = -(scrollY * 0.6) % SIZE;

      top.style.backgroundPosition = `center ${offset}px`;
      bottom.style.backgroundPosition = `center ${-offset}px`;

      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, scrollY / max));
      const hue = 230 + p * 200;
      glow.style.background = `linear-gradient(180deg, hsla(${hue}, 70%, 45%, 0.35), transparent 35%, transparent 65%, hsla(${hue + 60}, 70%, 45%, 0.35))`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const gridStyle = {
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
    `,
    backgroundSize: "64px 64px",
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* color glow overlay */}
      <div ref={glowRef} className="absolute inset-0 mix-blend-screen" />

      {/* top half: grid plane tilting away into the distance (ceiling) */}
      <div
        className="absolute left-0 right-0 top-0 h-1/2 opacity-70"
        style={{ perspective: "300px", perspectiveOrigin: "50% 100%" }}
      >
        <div
          ref={topRef}
          className="absolute inset-0"
          style={{
            ...gridStyle,
            transform: "rotateX(60deg)",
            transformOrigin: "50% 100%",
          }}
        />
      </div>

      {/* bottom half: grid plane (floor) */}
      <div
        className="absolute left-0 right-0 bottom-0 h-1/2 opacity-70"
        style={{ perspective: "300px", perspectiveOrigin: "50% 0%" }}
      >
        <div
          ref={bottomRef}
          className="absolute inset-0"
          style={{
            ...gridStyle,
            transform: "rotateX(-60deg)",
            transformOrigin: "50% 0%",
          }}
        />
      </div>
    </div>
  );
}
