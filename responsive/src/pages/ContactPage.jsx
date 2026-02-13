import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoMotion from "../components/ui/LogoMotion";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
    const formRef = useRef(null);
    const [status, setStatus] = useState({ type: "idle", msg: "" });
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        if (!formRef.current) return;

        setLoading(true);
        setStatus({ type: "idle", msg: "" });

        try {
            await emailjs.sendForm(
                "0712",   // ✅ EmailJS Service ID
                "template_zmdo9f2",  // ✅ EmailJS Template ID
                formRef.current,
                "oYVBE_KXA7fSY4ZTU"    // ✅ EmailJS Public Key
            );

            setStatus({ type: "success", msg: "Sent " });
            formRef.current.reset();
        } catch (err) {
            console.log(err);
            setStatus({ type: "error", msg: "Failed to send. Try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Logo */}
            <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-50 pointer-events-auto">
                <LogoMotion />
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                {/* BACK */}
                <Link
                    to="/"
                    className="cursor-target inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
                >
                    <span>←</span>
                    <span>Back to Home</span>
                </Link>

                {/* TITLE */}
                <div className="cursor-target mt-10">
                    <h1 className="text-3xl sm:text-4xl font-bold">Contact Me</h1>
                    <div className="mt-6 h-px w-full bg-white/20" />
                </div>

                {/* MAIN GRID */}
                <div className="cursor-target mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* LEFT TEXT */}
                    <div className="pt-2 sm:pt-6">
                        <h2 className="cursor-target text-3xl sm:text-4xl font-semibold leading-tight">
                            Get in <br />
                            Touch With <br />
                            Us
                        </h2>
                    </div>

                    {/* RIGHT FORM */}
                    <form
                        ref={formRef}
                        className="cursor-target pt-2 sm:pt-6"
                        onSubmit={sendEmail}
                    >
                        {/* ✅ EmailJS template-д хэрэгтэй name атрибутууд */}
                        <FormField label="NAME" name="from_name" required />
                        <FormField label="SUBJECT" name="subject" className="mt-8" required />
                        <FormField
                            label="MESSAGE"
                            name="message"
                            textarea
                            className="mt-8"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                cursor-target mt-10
                inline-flex items-center justify-center
                rounded-full bg-white
                px-10 py-3
                text-sm font-semibold text-black
                transition hover:scale-105 hover:opacity-90
                disabled:opacity-60 disabled:cursor-not-allowed
              "
                        >
                            {loading ? "SENDING..." : "SEND"}
                        </button>

                        {/* STATUS */}
                        {status.type !== "idle" && (
                            <div
                                className={`mt-4 text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {status.msg}
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* CONTACT BLOCK (reuse) */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
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

                <div className="cursor-target mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
                    <div className="cursor-target flex items-center justify-center md:justify-start">
                        <img
                            src="/images/logo.jpg"
                            alt="logo"
                            className="h-16 w-32 sm:h-20 sm:w-40 object-contain opacity-90"
                            draggable={false}
                        />
                    </div>

                    <div className="cursor-target text-center text-base sm:text-lg md:text-xl leading-6 text-white/80">
                        <div className="font-semibold text-white/90">Mongolia</div>
                        <div>Ulaanbaatar</div>
                        <div>ХУД 1-хороо</div>
                    </div>

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

            {/* RIGHT FIXED MENU */}
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

/* ---------- small input field component ---------- */

function FormField({
    label,
    name,
    textarea = false,
    className = "",
    required = false,
}) {
    return (
        <div className={className}>
            <label className="text-[11px] tracking-[0.22em] text-white/70">
                {label}
            </label>

            {textarea ? (
                <textarea
                    name={name}
                    rows={4}
                    required={required}
                    className="
            mt-3 w-full bg-transparent text-white
            outline-none resize-none
            placeholder:text-white/30
          "
                />
            ) : (
                <input
                    name={name}
                    type="text"
                    required={required}
                    className="
            mt-3 w-full bg-transparent text-white
            outline-none
            placeholder:text-white/30
          "
                />
            )}

            <div className="mt-3 h-px w-full bg-white/25" />
        </div>
    );
}
