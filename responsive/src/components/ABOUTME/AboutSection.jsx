import ScrollFloat from "../ui/ScrollFloat";
import GlareHover from "../ui/GlareHover";
import { useNavigate } from "react-router-dom";

export default function AboutSection() {
    const navigate = useNavigate();

    return (
        <section id="about" className="bg-black text-white w-full h-screen relative overflow-hidden flex items-center justify-center">
            <div
                className="
           w-full m-0
          px-4 sm:px-8 lg:px-12
          py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center
        "
            >
                {/* ✅ TEXT UNDER IMAGE */}
                <div className="mt-10 sm:mt-12 text-center sm:text-left mx-10 sm:mx-23">
                    <ScrollFloat
                        animationDuration={1}
                        ease="back.inOut(2)"
                        scrollStart="top 80%"
                        scrollEnd="top 35%"
                        stagger={0.03}
                        textClassName="font-bold"
                    >
                        Let&apos;s get know about me closer
                    </ScrollFloat>

                    <p className="cursor-target mx-auto sm:mx-0 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/60">
                        Batbaysgalan was born in Ulaanbaatar, Mongolia, and is 20 years old. He is currently
                        studying at Indra Cyber Institute.
                    </p>

                    <div className="mt-8 sm:mt-10 flex justify-center sm:justify-start">
                        <button
                            onClick={() => navigate("/about")}
                            className="
                cursor-target
                inline-flex items-center justify-center
                rounded-full bg-white
                px-6 py-3
                text-sm font-semibold text-black
                transition hover:scale-105
                sm:text-[20px]
              "
                        >
                            Discover More About Me
                        </button>
                    </div>
                </div>
                {/* ✅ TOP IMAGE */}
                <div className="flex justify-center">
                    <div
                        className="cursor-target
              w-full max-w-[420px]
              h-[360px]
              sm:h-[420px]
              lg:h-[480px]
            "
                    >
                        <GlareHover
                            width="100%"
                            height="100%"
                            background="transparent"
                            borderRadius="2px"
                            borderColor="rgba(0, 0, 0, 0.12)"
                            glareColor="#ffffff"
                            glareOpacity={0.25}
                            glareAngle={-30}
                            glareSize={260}
                            transitionDuration={750}
                            playOnce={false}
                            className="border border-white/10"
                            style={{ padding: 0 }}
                        >
                            <img
                                src="/images/aboutme/aboutme4.png"
                                alt="About me"
                                className="h-full w-full object-cover"
                            />
                        </GlareHover>
                    </div>
                </div>

            </div>
        </section>
    );
}
