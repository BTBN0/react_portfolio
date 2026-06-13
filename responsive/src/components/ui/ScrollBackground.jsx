import { useEffect, useRef } from "react";

export default function ScrollBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));

      // Hue shifts across the scroll range, position drifts diagonally
      const hue1 = 220 + p * 200; // blue -> purple -> pink -> orange
      const hue2 = 280 + p * 180;
      const hue3 = 180 + p * 160;
      const x = 15 + p * 70;
      const y = 5 + p * 80;

      el.style.background = `
        radial-gradient(55% 45% at ${x}% ${y}%, hsla(${hue1}, 85%, 55%, 0.35), transparent 60%),
        radial-gradient(50% 45% at ${100 - x}% ${100 - y}%, hsla(${hue2}, 85%, 55%, 0.3), transparent 60%),
        radial-gradient(60% 50% at ${50 + (x - 50) * 0.5}% ${50 + (y - 50) * 0.5}%, hsla(${hue3}, 80%, 50%, 0.18), transparent 65%),
        #000000
      `;
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
      className="fixed inset-0 z-0 pointer-events-none transition-[background] duration-700 ease-out"
    />
  );
}
