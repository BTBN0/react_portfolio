import { useRef, useLayoutEffect, useState } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";

function useElementWidth(ref) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const update = () => {
            if (ref.current) setWidth(ref.current.offsetWidth);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [ref]);

    return width;
}

function wrap(min, max, v) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
}

function VelocityRow({
    children,
    baseVelocity = 90,
    scrollContainerRef,
    damping = 50,
    stiffness = 400,
    velocityMapping = { input: [0, 1000], output: [0, 4] },
    className = "",
}) {
    const baseX = useMotionValue(0);

    const scrollOptions =
        scrollContainerRef?.current ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);

    const v = useVelocity(scrollY);
    const smoothV = useSpring(v, { damping, stiffness });

    const factor = useTransform(
        smoothV,
        velocityMapping.input,
        velocityMapping.output,
        { clamp: false }
    );

    const copyRef = useRef(null);
    const w = useElementWidth(copyRef);

    const x = useTransform(baseX, (val) => {
        if (!w) return "0px";
        return `${wrap(-w, 0, val)}px`;
    });

    const dir = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = dir.current * baseVelocity * (delta / 1000);

        const f = factor.get();
        if (f < 0) dir.current = -1;
        else if (f > 0) dir.current = 1;

        moveBy += dir.current * moveBy * f;
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className={`flex items-center gap-12 whitespace-nowrap ${className}`}
                style={{ x }}
            >
                <div ref={copyRef} className="flex items-center gap-12 shrink-0">
                    {children}
                </div>
                <div className="flex items-center gap-12 shrink-0" aria-hidden="true">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

export default function LogoVelocityMarquee({
    scrollContainerRef,
    velocity = 120,
    logoSizeClass = "h-12",
}) {
    // ✅ public/logos/ доторх файлууд
    const logos = [
        "/logos/HTML.png",
        "/logos/CSS.png",
        "/logos/JS.png",
        "/logos/REACT.png",
        "/logos/PYHTON.png",
        "/logos/SQL.png",
        "/logos/UIUX.png",
    ];


    const row = logos.map((src, i) => (
        <img
            key={i}
            src={src}
            alt="logo"
            className={`${logoSizeClass} w-auto opacity-70 hover:opacity-100 transition`}
            draggable={false}
        />
    ));

    return (
        <div className="mt-16 border-t border-white/10 pt-10">
            {/* row 1 */}
            <VelocityRow
                scrollContainerRef={scrollContainerRef}
                baseVelocity={velocity}
                className="py-2"
            >
                {row}
            </VelocityRow>

            {/* row 2 reverse */}
            <div className="mt-6">
                <VelocityRow
                    scrollContainerRef={scrollContainerRef}
                    baseVelocity={-velocity}
                    className="py-2"
                >
                    {row}
                </VelocityRow>
            </div>
        </div>
    );
}
