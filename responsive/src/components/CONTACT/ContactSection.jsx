export default function ContactSection() {
    return (
        <section id="contact" className="bg-black text-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* TOP */}
                <div className="cursor-target text-center">
                    <p className="text-sm tracking-[0.22em] text-white/70">
                        Get in Touch With Us
                    </p>

                    <a
                        href="mailto:baysaabata77@gmail.com"
                        className="
              cursor-target mt-5 block
              text-2xl sm:text-3xl md:text-5xl
              font-semibold hover:opacity-80 transition
              break-words
            "
                    >
                        baysaabata77@gmail.com
                    </a>
                </div>

                {/* MID */}
                <div className="cursor-target mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
                    {/* LEFT LOGO */}
                    <div className="cursor-target flex items-center justify-center md:justify-start">
                        <img
                            src="/images/logo.png"
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

                {/* LINE */}
                <div className="mt-12 sm:mt-16 h-px w-full bg-white/15" />

                {/* BOTTOM */}
                <div className="mt-8 sm:mt-10 text-center text-sm text-white/70">
                    © 2026. Arigato
                </div>
            </div>
        </section>
    );
}
