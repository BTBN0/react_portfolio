import LogoMotion from "../ui/LogoMotion";
import TextPressure from "../ui/TextPressure";
import { useLocation, useNavigate } from "react-router-dom";

export default function Overlay() {
    const navigate = useNavigate();
    const location = useLocation();

    const menu = [
        { label: "ABOUT", type: "page", to: "/about" },        // page
        { label: "PHOTOS", type: "section", id: "photos" },    // section
        { label: "SKILLS", type: "section", id: "skills" },    // section
        { label: "CONTACT", type: "page", to: "/contact" },    // ✅ page
    ];


    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleMenuClick = (item) => {
        if (item.type === "page") {
            navigate(item.to);
            return;
        }

        // section бол: home биш үед home руу state-тай очоод scroll хийлгэнэ
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: item.id } });
            return;
        }

        // home дээр бол шууд scroll
        scrollToId(item.id);
    };

    return (
        <div className="pointer-events-none absolute inset-0 text-white">
            {/* Glow Ring (responsive) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="
      rounded-full border border-white/70
      shadow-[0_0_40px_8px_rgba(255,255,255,0.45)]
      w-[350px] h-[350px] border-[18px]
      xs:w-[340px] xs:h-[340px]
      sm:w-[400px] sm:h-[400px]
      lg:w-[450px] lg:h-[450px] lg:border-[32px]
    "
                />
            </div>
            {/* TOP LEFT LOGO */}
            <LogoMotion />

            {/* TOP RIGHT NAME */}
            <div
                className="
          cursor-target pointer-events-auto
          absolute top-4 right-4
          sm:top-6 sm:right-8
          flex flex-col items-end
        "
            >
                <div className="w-[180px] h-[52px] sm:w-[220px] sm:h-[64px] lg:w-[260px] lg:h-[70px]">
                    <TextPressure
                        text="Batsuuri"
                        width
                        weight
                        italic
                        textColor="#ffffff"
                        minFontSize={22}
                        className="tracking-wide"
                    />
                </div>

                <div className="w-[180px] h-[52px] sm:w-[220px] sm:h-[64px] lg:w-[260px] lg:h-[70px]">
                    <TextPressure
                        text="Batbaysgalan"
                        width
                        weight
                        italic
                        textColor="#ffffff"
                        minFontSize={22}
                        className="tracking-wide"
                    />
                </div>
            </div>

            {/* ✅ Desktop RIGHT MENU (bordered pill) */}
            <div
                className="
    hidden lg:flex
    pointer-events-auto
    fixed right-6 top-1/2 -translate-y-1/2 z-50
  "
            >
                <div
                    className="
      rounded-3xl border border-white/15
      bg-black/40 backdrop-blur
      px-4 py-4
      flex flex-col items-center gap-8
      shadow-[0_0_25px_rgba(255,255,255,0.08)]
    "
                >
                    {menu.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleMenuClick(item)}
                            className="
          cursor-target select-none
          opacity-70 hover:opacity-100
          transition hover:scale-110
          [writing-mode:vertical-rl] rotate-0
          tracking-widest text-sm
        "
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>


            {/* ✅ Mobile bottom nav */}
            <div
                className="
    lg:hidden
    pointer-events-auto
    fixed left-1/2 -translate-x-1/2
    bottom-[env(safe-area-inset-bottom)]
    mb-3
    z-50
    rounded-2xl border border-white/15
    bg-black/50 backdrop-blur
    px-3 py-2
    flex gap-2
  "
            >
                {menu.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => handleMenuClick(item)}
                        className="
              cursor-target
              text-xs sm:text-sm tracking-widest
              px-3 py-2 rounded-xl
              opacity-80 hover:opacity-100 hover:bg-white/10
              transition
            "
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* LEFT BOTTOM TEXT */}
            <div
                className="
          cursor-target pointer-events-auto text-left
          absolute left-4 bottom-4
          sm:left-8 sm:bottom-8
        "
            >
                <p className="text-base sm:text-lg font-semibold">Web Designer</p>
                <p className="text-xs sm:text-sm opacity-70">
                    From <span className="font-bold">IN</span>
                </p>
            </div>

            {/* RIGHT BOTTOM SOCIAL */}
            <div
                className="
          cursor-target pointer-events-auto
          absolute right-4 bottom-4
          sm:right-8 sm:bottom-8
          flex gap-3 sm:gap-4
          text-xl sm:text-2xl
        "
            >
                <a
                    className="cursor-target opacity-50 hover:opacity-100 transition"
                    href="https://facebook.com/b.batbaasgalan"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                >
                    <i className="fa-brands fa-square-facebook" />
                </a>
                <a
                    className="cursor-target opacity-50 hover:opacity-100 transition"
                    href="https://www.instagram.com/baysaa_btbysgln/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                >
                    <i className="fa-brands fa-instagram" />
                </a>
                <a
                    className="cursor-target opacity-50 hover:opacity-100 transition"
                    href="https://github.com/BTBN0"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                >
                    <i className="fa-brands fa-github" />
                </a>
            </div>
        </div>
    );
}
