import { useEffect, useRef } from "react";

export default function ScrollBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const SIZE = 64;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;

      // Grid drifts diagonally with scroll, looping every SIZE px
      const offsetX = -(scrollY * 0.15) % SIZE;
      const offsetY = -(scrollY * 0.3) % SIZE;

      el.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
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

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none bg-black"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />
  );
}
