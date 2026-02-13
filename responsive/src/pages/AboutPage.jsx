import { Link } from "react-router-dom";
import LogoMotion from "../components/ui/LogoMotion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Optional: page дээр logo хэрэгтэй бол энд fixed болго */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-50 pointer-events-auto">
        <LogoMotion />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* BACK */}
        <Link
          to="/"
          className="cursor-target inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition relative z-10 left-250"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>

        {/* TITLE + LINE */}
        <div className="mt-10">
          <h1 className="cursor-target text-3xl sm:text-4xl font-bold">
            About Me
          </h1>
          <div className="mt-5 h-px w-full bg-white/20" />
        </div>

        {/* TEXT */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div className="cursor-target text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
            My career goal <br />
            is to become a <br />
            full stack <br />
            developer.
          </div>

          <p className="cursor-target text-sm sm:text-base leading-7 text-white/70">
            I am expected to graduate in June 2026. My goal is to become a
            highly skilled full stack developer. After graduation, I plan to
            gain 1–2 years of professional experience in my home country before
            pursuing further learning opportunities abroad. I am deeply
            passionate about my field.
          </p>
        </div>

        {/* IMAGES */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="overflow-hidden bg-black md:w-[350px]">
            <img
              src="/images/aboutme/aboutme5.png"
              alt="about 1"
              className="h-[320px] sm:h-[380px] md:h-[400px] w-full object-cover cursor-target"
              draggable={false}
            />
          </div>

          <div className="overflow-hidden md:w-[710px] md:relative md:-left-50">
            <img
              src="/images/aboutme/aboutme6.png"
              alt="about 2"
              className="h-[320px] sm:h-[380px] md:h-[400px] w-full object-cover cursor-target"
              draggable={false}
            />
          </div>
        </div>

        {/* FOLLOW */}
        <div className="mt-14 sm:mt-16">
          <div className="cursor-target text-lg sm:text-xl font-semibold">
            Follow me on:
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-50 sm:justify-center text-sm sm:text-[16px] tracking-[0.22em] text-white/60">
            <a
              href="https://facebook.com/b.batbaasgalan"
              target="_blank"
              rel="noreferrer"
              className="cursor-target hover:text-white transition"
            >
              FACEBOOK
            </a>
            <a
              href="https://www.instagram.com/baysaa_btbysgln/"
              target="_blank"
              rel="noreferrer"
              className="cursor-target hover:text-white transition"
            >
              INSTAGRAM
            </a>
            <a
              href="https://github.com/BTBN0"
              target="_blank"
              rel="noreferrer"
              className="cursor-target hover:text-white transition"
            >
              GITHUB
            </a>
          </div>
        </div>
      </div>

      {/* CONTACT BLOCK (reuse) */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* TOP */}
        <div className="cursor-target text-center">
          <p className="text-sm tracking-[0.22em] text-white/70">
            Get in Touch With Us
          </p>

          <a
            href="mailto:baysaabata77@gmail.com"
            className="cursor-target mt-5 block text-2xl sm:text-3xl md:text-5xl font-semibold hover:opacity-80 transition break-words"
          >
            baysaabata77@gmail.com
          </a>
        </div>

        {/* MID */}
        <div className="cursor-target mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
          {/* LEFT LOGO */}
          <div className="cursor-target flex items-center justify-center md:justify-start">
            <img
              src="/images/logo.jpg"
              alt="logo"
              className="h-16 w-32 sm:h-20 sm:w-40 object-contain opacity-90"
              draggable={false}
            />
          </div>

          {/* CENTER ADDRESS */}
          <div className="cursor-target text-center text-base sm:text-lg md:text-xl leading-6 text-white/80">
            <div className="font-semibold text-white/90">Mongolia</div>
            <div>Ulaanbaatar</div>
            <div>ХУД 1-хороо</div>
          </div>

          {/* RIGHT PHONE + SOCIAL */}
          <div className="cursor-target flex flex-col items-center md:items-end gap-4">
            <a
              href="tel:+97689718862"
              className="cursor-target text-lg sm:text-xl font-semibold tracking-wide hover:opacity-80 transition"
            >
              +97689718862
            </a>

            <div className="cursor-target flex gap-3 text-2xl">
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
        </div>

        <div className="mt-12 sm:mt-16 h-px w-full bg-white/15" />
        <div className="mt-8 sm:mt-10 text-center text-sm text-white/70">
          © 2026. Arigato
        </div>
      </div>

      {/* RIGHT FIXED MENU (desktop only, bordered, no jump) */}
      <div className="hidden lg:block pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <div className="rounded-3xl border border-white/15 bg-black/40 backdrop-blur px-4 py-4 flex flex-col items-center gap-8">
          {["ABOUT", "CONTACT"].map((item) => (
            <Link
              key={item}
              to={item === "ABOUT" ? "/about" : "/contact"}
              className="
                cursor-target select-none
                opacity-70 hover:opacity-100
                transition hover:scale-110
                [writing-mode:vertical-rl] rotate-180
                tracking-widest text-sm
              "
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
