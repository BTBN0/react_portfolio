import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import FollowHeadModel from "../ui/FollowModel";
import Overlay from "./Overlay";

// ✅ нэмнэ
import LiquidEther from "../ui/LiquidEther";

export default function Scene() {
    const heroRef = useRef(null);
    const [active, setActive] = useState(true);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                setActive(entry.isIntersecting && entry.intersectionRatio > 0.35);
            },
            { threshold: [0, 0.35, 1] }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={heroRef} className="relative w-full h-full overflow-hidden">
            {/* ✅ 1) LiquidEther BACKGROUND (доор) */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#878787', '#c4c4c4', '#ffffff']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* ✅ 2) 3D Canvas (дунд) */}
            <div className="absolute inset-0 z-10">
                <Canvas
                    eventSource={document.getElementById("root")}
                    eventPrefix="client"
                    camera={{ position: [0, 1.4, 3.2], fov: 45 }}
                >
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <Suspense fallback={null}>
                        <FollowHeadModel active={active} />
                    </Suspense>
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* ✅ 3) UI Overlay (хамгийн дээр) */}
            <div className="absolute inset-0 z-20">
                <Overlay />
            </div>
        </div>
    );
}
