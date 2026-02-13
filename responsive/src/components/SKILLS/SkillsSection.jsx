import SkillRing from "./SkillRing";
import ScrollReveal from "../ui/ScrollReveal";
import GlareHover from "../ui/GlareHover";
import LogoVelocityMarquee from "../ui/LogoVelocityMarquee";

const skills = [
  { label: "PYTHON", value: 70 },
  { label: "HTML5", value: 60 },
  { label: "CSS3", value: 70 },
  { label: "Java Script", value: 40 },
  { label: "SQL", value: 50 },
  { label: "ReactJS", value: 60 },
  { label: "UI/UX", value: 60 },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="
        bg-black text-white
        w-full 
        -mt-20 lg:-mt-[220px]
        flex justify-center
      "
    >
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 items-start">
          {/* LEFT */}
          <div>
            <ScrollReveal
              baseOpacity={0.05}
              enableBlur
              blurStrength={6}
              baseRotation={2}
              containerClassName="
                cursor-target mb-6 relative overflow-hidden
                w-max
                md:ml-30
              "
              textClassName="text-3xl sm:text-5xl font-bold tracking-wide"
            >
              SKILLS
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0.12}
              enableBlur
              blurStrength={5}
              baseRotation={3}
              containerClassName="
                cursor-target mb-10 sm:mb-14
                max-w-[320px]
                md:ml-35
              "
              textClassName="text-white/80 text-sm sm:text-[20px] leading-relaxed"
            >
              Skills are not about how much you know, but how well you apply what
              you know.
            </ScrollReveal>

            {/* RINGS */}
            <div className="mt-10 md:mt-12 md:ml-40">
              {/* top 4 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 sm:max-w-[1080px]">
                {skills.slice(0, 4).map((s) => (
                  <SkillRing
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    size={window.innerWidth < 640 ? 76 : 90}
                  />
                ))}
              </div>

              {/* bottom 3 */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8 sm:max-w-[640px]">
                {skills.slice(4, 7).map((s) => (
                  <SkillRing
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    size={window.innerWidth < 640 ? 76 : 90}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full flex justify-center md:justify-end relative z-10 md:translate-x-10">
            <div
              className="
              cursor-target 
                w-[280px] h-[340px]
                sm:w-[320px] sm:h-[380px]
                lg:w-[410px] lg:h-[470px]
                md:mr-40
              "
            >
              <GlareHover
                width="100%"
                height="100%"
                background="transparent"
                borderRadius="2px"
                borderColor="rgba(255,255,255,0.12)"
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
                  src="/images/SKILL.jpg"
                  alt="Skills"
                  className="h-full w-full object-cover"
                />
              </GlareHover>
            </div>
          </div>
        </div>

        {/* BOTTOM MARQUEE */}
        <div className="my-12 mb-10">
          <LogoVelocityMarquee
            velocity={70}
            numCopies={8}
            logoSizeClass="cursor-target h-10 sm:h-12"
          />
        </div>
      </div>
    </section>
  );
}
