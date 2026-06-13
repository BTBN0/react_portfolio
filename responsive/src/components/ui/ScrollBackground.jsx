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
      const hue1 = 220 + p * 140; // blue -> purple/pink
      const hue2 = 280 + p * 120;
      const x = 20 + p * 60;
      const y = 10 + p * 70;

      el.style.background = `
        radial-gradient(60% 50% at ${x}% ${y}%, hsla(${hue1}, 80%, 45%, 0.18), transparent 60%),
        radial-gradient(50% 40% at ${100 - x}% ${100 - y}%, hsla(${hue2}, 80%, 50%, 0.14), transparent 60%)
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
