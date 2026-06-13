import { useEffect, useMemo, useRef } from "react";
import "./image-scroll-grid.css";
import CurvedLoop from "../ui/CurvedLoop";


/** ✅ Local images folder */
const modules = import.meta.glob(
    "../../assets/images/**/*.{png,jpg,jpeg,webp,avif,jfif}",
    { eager: true, import: "default" }
);

const images = Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smoothstep = (x) => x * x * (3 - 2 * x);

/** ✅ автоматаар range үүсгэнэ */
function makeRanges(n) {
    const step = 100 / Math.max(1, n);
    const windowSize = Math.min(28, step * 1.6);

    return Array.from({ length: n }, (_, i) => {
        const start = i * step + 2;
        const end = start + windowSize;
        return [start, end];
    });
}

export default function ImageScrollGrid() {
    const pageRef = useRef(null);
    const gridRef = useRef(null);

    const itemRanges = useMemo(() => makeRanges(images.length), []);

    useEffect(() => {

        const page = pageRef.current;
        const grid = gridRef.current;
        if (!page || !grid) return;

        const items = Array.from(grid.querySelectorAll("[data-item]"));
        let raf = 0;

        const SLOW = 2.4;

        const maxEnd2 = Math.max(
            100,
            ...itemRanges.map(([start, end]) => {
                const span = Math.max(1, end - start);
                return start + span * SLOW;
            })
        );

        const setAll = (z, op) => {
            items.forEach((el) => {
                el.style.setProperty("--z", `${z}px`);
                el.style.setProperty("--op", `${op}`);
            });
        };

        const update = () => {
            raf = 0;

            // ✅ section-local progress (зөвхөн энэ section дотор)
            const rect = page.getBoundingClientRect();
            const startY = window.scrollY + rect.top;
            const endY = startY + page.offsetHeight - window.innerHeight;

            // Section хүрээгүй бол: бүгд нууц (animation эхлэхгүй)
            if (window.scrollY < startY) {
                setAll(-1200, 0);
                return;
            }

            // Section-оос гарсан бол: төгсгөл (дууссан байдал)
            if (window.scrollY > endY) {
                setAll(1200, 0);
                return;
            }

            const t = clamp01(
                (window.scrollY - startY) / Math.max(1, endY - startY)
            ); // 0..1 зөвхөн энэ section дотор
            const pct = t * maxEnd2;

            items.forEach((el, i) => {
                const [start, end] = itemRanges[i] ?? [0, 25];
                const span = Math.max(1, end - start);
                const end2 = start + span * SLOW;

                const p = clamp01((pct - start) / (end2 - start));
                const pe = smoothstep(p);

                // ✅ blur байхгүй: translateZ + opacity
                // ✅ blur байхгүй: translateZ + opacity + translateY (дээш)
                let z, opacity, y;

                const Y_FROM = 180;  // эхлэхдээ доор (+)
                const Y_TO = -180;   // дуусахдаа дээр (-)

                if (pe <= 0.5) {
                    const q = pe / 0.5;
                    z = -1200 + 1200 * q;
                    opacity = q;

                    // ✅ доороос дээш гарна: +Y_FROM -> 0
                    y = Y_FROM * (1 - q);
                } else {
                    const q = (pe - 0.5) / 0.5;
                    z = 0 + 1200 * q;
                    opacity = 1 - q;

                    // ✅ төвөөс дээш алга болно: 0 -> Y_TO
                    y = Y_TO * q;
                }

                el.style.setProperty("--z", `${z}px`);
                el.style.setProperty("--op", `${opacity}`);
                el.style.setProperty("--y", `${y}px`);

            });
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
    }, [itemRanges]);

    // ✅ Folder хоосон бол
    if (images.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
                <div className="max-w-xl text-center">
                    <div className="text-2xl font-semibold mb-2">No images found</div>
                    <div className="opacity-80">
                        Зургаа энд хийнэ: <b>src/assets/images/</b> <br />
                        Дараа нь dev server-оо restart хийнэ: <b>Ctrl+C → npm run dev</b>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="photos" ref={pageRef} className="page">
            <div ref={gridRef} className="stuck-grid">

                {/* ✅ CURVED LOOP (top overlay) */}
                <div className="curved-wrap" data-curved>
                    <CurvedLoop
                        marqueeText="My ✦ Gallery ✦ Photos ✦My ✦ Gallery ✦ Photos ✦My ✦ Gallery ✦ Photos ✦"
                        speed={1.5}
                        curveAmount={0}
                        direction="left"
                        interactive
                        className="curved-text text-[50px] sm:text-[24px] lg:text-[28px] font-bold text-white/90 pointer-events-none"
                    />
                </div>

                <div className="scroll-title">SCROLL</div>

                {images.map((src, i) => (
                    <div key={i} data-item className="cursor-target grid-item">
                        <img src={src} alt="" loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
}
