import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import FollowHeadModel from "../ui/FollowModel";
import Overlay from "./Overlay";

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
            <Canvas
                eventSource={document.getElementById("root")}
                eventPrefix="client"
                camera={{ position: [0, 1.4, 3.2], fov: 45 }}
                dpr={[1, 1.75]} // ✅ mobile дээр хөнгөн
                gl={{ antialias: true, powerPreference: "high-performance" }}
            >
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <Suspense fallback={null}>
                    <FollowHeadModel active={active} />
                </Suspense>
                <Environment preset="city" />
            </Canvas>

            <Overlay />
        </div>
    );
}
