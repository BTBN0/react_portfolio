import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoMotion from "../components/ui/LogoMotion";
import { listCertifications, listProjects } from "../lib/content";

export default function CertificationsPage() {
  const [certs, setCerts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    listCertifications().then(setCerts);
    listProjects().then(setProjects);
  }, []);

  return (
    <div className="min-h-screen bg-black/60 text-white overflow-x-hidden pb-20 lg:pb-0">
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
          <h1 className="text-3xl sm:text-4xl font-bold">
            Certifications &amp; Projects
          </h1>
          <div className="mt-6 h-px w-full bg-white/20" />
        </div>

        {/* CERTIFICATIONS */}
        <div className="mt-12 sm:mt-16">
          <h2 className="cursor-target text-xl sm:text-2xl font-semibold">
            Certifications
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="cursor-target border-[3px] border-white/50 bg-black/40 p-5 transition hover:border-white hover:bg-black/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20"
              >
                {cert.imageUrl && (
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    onClick={() => setPreviewImg(cert.imageUrl)}
                    className="cursor-target w-full h-auto object-contain mb-4 cursor-pointer"
                  />
                )}
                <h3 className="font-semibold text-lg">{cert.name}</h3>
                {cert.bio && (
                  <p className="mt-2 text-sm text-white/60">{cert.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="mt-16 sm:mt-20">
          <h2 className="cursor-target text-xl sm:text-2xl font-semibold">
            Projects
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="cursor-target border-[3px] border-white/50 bg-black/40 p-5 transition hover:border-white hover:bg-black/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    onClick={() => setPreviewImg(project.imageUrl)}
                    className="cursor-target w-full h-auto object-contain mb-4 cursor-pointer"
                  />
                )}
                <h3 className="font-semibold text-lg">{project.name}</h3>
                {project.bio && (
                  <p className="mt-2 text-sm text-white/60">{project.bio}</p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300 break-all"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
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
        <div className="border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.4)] bg-black/40 backdrop-blur px-4 py-4 flex flex-col items-center gap-6 max-h-[80vh]">
          {[
            { label: "ABOUT", to: "/about" },
            { label: "CERTIFICATIONS", to: "/certifications" },
            { label: "CONTACT", to: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="
                text-[14px]
                cursor-target select-none
                opacity-70 hover:opacity-100
                transition hover:scale-110
                [writing-mode:vertical-rl] rotate-0
                tracking-[0.18em]
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden pointer-events-auto fixed left-1/2 -translate-x-1/2 bottom-[env(safe-area-inset-bottom)] mb-3 z-50 rounded-2xl border border-white/15 bg-black/50 backdrop-blur px-3 py-2 flex gap-2">
        {[
          { label: "ABOUT", to: "/about" },
          { label: "CERTIFICATIONS", to: "/certifications" },
          { label: "CONTACT", to: "/contact" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="cursor-target text-xs sm:text-sm tracking-widest px-3 py-2 rounded-xl opacity-80 hover:opacity-100 hover:bg-white/10 transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewImg && (
        <div
          className="cursor-target fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button
            onClick={() => setPreviewImg(null)}
            aria-label="Close"
            className="cursor-target absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
