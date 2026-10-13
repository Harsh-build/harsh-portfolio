import React, { useState, useEffect, useRef } from "react";
import { Mo, Lo, Bo, Ho, Go, Uo, softwareSkills, socialLinks } from "./data";


// Wave shape component corresponding to original 'H' function
interface WaveProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  direction?: "horizontal" | "vertical";
}

const Wave: React.FC<WaveProps> = ({
  className = "",
  width = 200,
  height = 40,
  color = "#FF6B00",
  strokeWidth = 3,
  direction = "horizontal",
}) => {
  if (direction === "vertical") {
    return (
      <svg
        width={height}
        height={width}
        viewBox={`0 0 ${height} ${width}`}
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d={`M${height / 2} 0 Q${height * 0.9} ${width * 0.1} ${height / 2} ${width * 0.2} Q${height * 0.1} ${width * 0.3} ${height / 2} ${width * 0.4} Q${height * 0.9} ${width * 0.5} ${height / 2} ${width * 0.6} Q${height * 0.1} ${width * 0.7} ${height / 2} ${width * 0.8} Q${height * 0.9} ${width * 0.9} ${height / 2} ${width}`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={`M0 ${height / 2} Q${width * 0.1} ${height * 0.1} ${width * 0.2} ${height / 2} Q${width * 0.3} ${height * 0.9} ${width * 0.4} ${height / 2} Q${width * 0.5} ${height * 0.1} ${width * 0.6} ${height / 2} Q${width * 0.7} ${height * 0.9} ${width * 0.8} ${height / 2} Q${width * 0.9} ${height * 0.1} ${width} ${height / 2}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

// Tool Badge component corresponding to original 'Fo' function
const toolMeta: Record<string, { label: string; name: string; bg: string; glow: string; textColor: string }> = {
  Fi: { label: "Fi", name: "Filmora PC & Mobile", bg: "#00b094", glow: "rgba(0, 176, 148, 0.6)", textColor: "#ffffff" },
  Cc: { label: "Cc", name: "CapCut PC & Mobile", bg: "#1A1B23", glow: "rgba(0, 240, 255, 0.5)", textColor: "#00FFFF" },
  Ps: { label: "Ps", name: "Photoshop PC", bg: "#31A8FF", glow: "rgba(49, 168, 255, 0.6)", textColor: "#001d33" },
  Pa: { label: "Pa", name: "PicsArt Mobile", bg: "#EC4899", glow: "rgba(236, 72, 153, 0.6)", textColor: "#ffffff" },
};

const sizeMeta = {
  sm: { box: "w-9 h-9 rounded-md", text: "text-xs font-bold" },
  md: { box: "w-12 h-12 rounded-lg", text: "text-sm font-bold" },
  lg: { box: "w-16 h-16 rounded-xl", text: "text-lg font-bold" },
  xl: { box: "w-20 h-20 rounded-2xl", text: "text-2xl font-bold" },
};

interface ToolBadgeProps {
  tool: "Fi" | "Cc" | "Ps" | "Pa";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

const ToolBadge: React.FC<ToolBadgeProps> = ({
  tool,
  size = "md",
  className = "",
  glow = false,
}) => {
  const meta = toolMeta[tool];
  const sizeClass = sizeMeta[size];
  if (!meta) return null;

  return (
    <div
      className={`${sizeClass.box} flex items-center justify-center cursor-default select-none ${className}`}
      style={{
        backgroundColor: meta.bg,
        boxShadow: glow
          ? `0 0 20px 4px ${meta.glow}, 0 0 40px 8px ${meta.glow}40`
          : `0 4px 16px ${meta.glow}`,
      }}
      title={meta.name}
      aria-label={meta.name}
    >
      <span className={`${sizeClass.text} font-heading`} style={{ color: meta.textColor }}>
        {meta.label}
      </span>
    </div>
  );
};

// Reusable Intersection Observer Hook with immediate viewport check
const useScrollReveal = (threshold = 0.05) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately reveal if already in or near viewport
    const rect = el.getBoundingClientRect();
    if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100) {
      el.classList.add("visible");
    }

    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold, rootMargin: "80px" }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [threshold]);

  return ref;
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lightbox & Video modal states
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);
  const [videoError, setVideoError] = useState(false);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sections scroll hook triggers
  const heroRevealRef = useScrollReveal(0.05);
  const socialRevealRef = useScrollReveal(0.12);
  const aboutRevealRef = useScrollReveal(0.12);
  const skillsRevealRef = useScrollReveal(0.12);
  const workRevealRef = useScrollReveal(0.08);
  const designRevealRef = useScrollReveal(0.08);
  const contactRevealRef = useScrollReveal(0.08);

  return (
    <div className="w-full relative min-h-screen bg-[#0a0a0a] text-[#f8fafc] font-sans selection:bg-[#FF6B00] selection:text-white">
      {/* 1. Header Navigation */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 backdrop-blur-md border-b" : "py-5 bg-transparent border-transparent"
        }`}
        style={
          scrolled
            ? {
                backgroundColor: "rgba(10, 10, 10, 0.95)",
                borderColor: "rgba(255, 107, 0, 0.15)",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <span
              className="text-xl font-heading tracking-wider transition-transform duration-300 hover:scale-105"
              style={{ fontFamily: "Anton, Impact, sans-serif", color: "#FF6B00" }}
            >
              HARSH
            </span>
            <span className="text-foreground-500 text-xs font-body tracking-widest hidden sm:block">
              | VIDEO EDITOR
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {Mo.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="cursor-pointer text-foreground-600 hover:text-[#FF6B00] text-xs font-body font-medium tracking-wider uppercase transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title={`Instagram ${socialLinks.instagramHandle}`}
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-foreground-400 hover:text-[#FF6B00] transition-colors border border-white/10 hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/10"
            >
              <i className="ri-instagram-fill text-base"></i>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="cursor-pointer whitespace-nowrap flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs font-body font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#FF6B00" }}
            >
              <i className="ri-mail-fill"></i>
              Hire Me
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200"
            style={{ backgroundColor: mobileMenuOpen ? "rgba(255, 107, 0, 0.2)" : "transparent" }}
            aria-label="Toggle menu"
          >
            <i className={`${mobileMenuOpen ? "ri-close-line" : "ri-menu-line"} text-foreground-950 text-xl`}></i>
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 py-4 border-b animate-fadeIn"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.98)", borderColor: "rgba(255, 107, 0, 0.15)" }}
          >
            {Mo.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="cursor-pointer flex items-center px-6 py-3 text-foreground-700 hover:text-[#FF6B00] hover:bg-primary-500/5 text-sm font-body tracking-wider uppercase transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <div className="px-6 pt-3 pb-1 flex flex-col gap-2">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-foreground-200 text-xs font-body font-semibold tracking-wider uppercase border border-[#FF6B00]/40 bg-[#FF6B00]/10"
              >
                <i className="ri-instagram-fill text-sm text-[#FF6B00]"></i>
                Instagram {socialLinks.instagramHandle}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-full text-white text-sm font-body font-semibold tracking-wider uppercase"
                style={{ backgroundColor: "#FF6B00" }}
              >
                <i className="ri-mail-fill"></i>
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section
        ref={heroRevealRef}
        id="hero"
        className="section-reveal relative min-h-screen w-full flex flex-col overflow-hidden noise-overlay"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Top brand rows for aesthetics */}
        <div className="relative z-10 flex justify-between items-center px-6 md:px-12 py-5 pt-24 md:pt-28">
          <span className="text-foreground-700 text-sm font-body tracking-widest uppercase opacity-80">
            Harsh
          </span>
          <div className="flex items-center gap-3">
            <span className="text-foreground-600 text-xs tracking-wider hidden sm:block opacity-60">
              Video Editor &amp; Visual Designer Portfolio
            </span>
            <span className="text-foreground-700 text-sm font-body tracking-widest uppercase opacity-80">
              Creative Portfolio
            </span>
          </div>
        </div>

        {/* Floating Tool Badges */}
        <div className="absolute top-44 left-6 md:left-14 flex flex-col gap-3 z-10 animate-float">
          <ToolBadge tool="Fi" size="lg" glow={true} />
        </div>
        <div
          className="absolute top-44 right-6 md:right-14 flex flex-col gap-3 z-10 animate-float"
          style={{ animationDelay: "0.4s" }}
        >
          <ToolBadge tool="Ps" size="lg" glow={true} />
        </div>
        <div
          className="absolute bottom-32 left-6 md:left-20 z-10 animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          <ToolBadge tool="Cc" size="lg" glow={true} />
        </div>
        <div
          className="absolute bottom-32 right-6 md:right-20 z-10 animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <ToolBadge tool="Pa" size="lg" glow={true} />
        </div>

        {/* Decorative Wave SVGs in Back */}
        <Wave
          className="absolute left-0 top-1/2 -translate-y-1/2 opacity-50"
          width={90}
          height={420}
          direction="vertical"
          strokeWidth={3}
        />
        <Wave
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50"
          width={90}
          height={420}
          direction="vertical"
          strokeWidth={3}
        />

        {/* Hero Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="flex gap-3 items-center mb-2">
            <i className="ri-star-fill text-[#FF6B00] text-lg"></i>
            <span className="text-foreground-600 text-xs tracking-[0.3em] uppercase font-body">
              Creative • Cinematic • Professional
            </span>
            <i className="ri-star-fill text-[#FF6B00] text-lg"></i>
          </div>

          <h1
            className="text-[clamp(4.5rem,13vw,11rem)] leading-none tracking-tight text-foreground-950 font-heading orange-glow"
            style={{ fontFamily: "Anton, Impact, sans-serif", letterSpacing: "0.02em" }}
          >
            PORTFOLIO
          </h1>

          <div className="relative mt-2">
            <span
              className="text-[#FF6B00] text-[clamp(2.2rem,6vw,5rem)] leading-none"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Video Editing
            </span>
            <Wave
              className="absolute -bottom-4 left-0 w-full"
              width={320}
              height={18}
              strokeWidth={2.5}
            />
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="h-px w-16 md:w-28 bg-[#FF6B00]/40"></div>
            <span className="text-foreground-600 text-xs tracking-[0.25em] uppercase font-body">
              &amp; Thumbnail Design
            </span>
            <div className="h-px w-16 md:w-28 bg-[#FF6B00]/40"></div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#work");
              }}
              className="cursor-pointer whitespace-nowrap px-8 py-3 font-body font-semibold text-sm tracking-wider uppercase rounded-full text-foreground-950 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#FF6B00" }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="cursor-pointer whitespace-nowrap px-8 py-3 font-body font-semibold text-sm tracking-wider uppercase rounded-full border text-foreground-950 transition-all duration-300 hover:scale-105 hover:bg-primary-500/10"
              style={{ borderColor: "#FF6B00", color: "#FF6B00" }}
            >
              Contact Me
            </a>
          </div>

          {/* Scroll Down indicators */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
            <span className="text-foreground-600 text-xs tracking-widest font-body uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-[#FF6B00]/50"></div>
            <i className="ri-arrow-down-line text-[#FF6B00] text-lg animate-bounce"></i>
          </div>
        </div>

        {/* Ambient Circles Background */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full border border-[#FF6B00]/30 opacity-60"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 rounded-full border border-[#FF6B00]/25 opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-[#FF6B00]/40"></div>
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-[#FF6B00]/40"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)" }}
        ></div>
      </section>

      {/* 3. Social Media Section */}
      <section
        ref={socialRevealRef}
        id="thumbnails"
        className="section-reveal relative w-full py-20 md:py-28 px-6 md:px-16 overflow-hidden"
        style={{ backgroundColor: "#111111" }}
      >
        <Wave
          className="absolute top-8 right-10 opacity-40 animate-float"
          width={160}
          height={30}
          strokeWidth={3}
        />
        <Wave
          className="absolute bottom-8 left-10 opacity-40"
          width={160}
          height={30}
          strokeWidth={3}
        />

        <div className="mb-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-1">
            <i className="ri-star-fill text-[#FF6B00]"></i>
            <span className="text-foreground-600 text-xs tracking-[0.3em] uppercase font-body">
              Featured Work
            </span>
            <i className="ri-star-fill text-[#FF6B00]"></i>
          </div>
          <h2
            className="text-[clamp(3rem,8vw,6rem)] leading-none font-heading text-white tracking-tight"
            style={{ fontFamily: "Anton, Impact, sans-serif" }}
          >
            SOCIAL MEDIA
          </h2>
          <div className="relative inline-block mt-1">
            <span
              className="text-[#FF6B00] text-[clamp(1.8rem,4vw,3rem)]"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Thumbnails
            </span>
            <Wave
              className="absolute -bottom-2 left-0 w-full"
              width={200}
              height={14}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Thumbnails grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {Lo.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImg(item.img)}
              className={`relative card-hover rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${item.rotate}`}
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={item.img}
                alt={`Social media thumbnail design ${item.id}`}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 flex items-center justify-center group">
                <i className="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
              </div>
              {item.badge && (
                <span
                  className="absolute top-2 right-2 text-white text-xs font-body font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#FF6B00" }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Instagram Profile CTA */}
        <div className="relative z-10 mt-10 flex justify-center">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-body font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-lg group"
            style={{
              backgroundColor: "rgba(255, 107, 0, 0.08)",
              border: "1px solid rgba(255, 107, 0, 0.35)",
              color: "#FF6B00",
            }}
          >
            <i className="ri-instagram-fill text-base group-hover:scale-110 transition-transform"></i>
            <span>Visit Instagram Profile ({socialLinks.instagramHandle})</span>
            <i className="ri-arrow-right-up-line text-xs opacity-75"></i>
          </a>
        </div>

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-48 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(255,107,0,0.05) 0%, transparent 70%)" }}
        ></div>
      </section>

      {/* 4. About Me Section */}
      <section
        ref={aboutRevealRef}
        id="about"
        className="section-reveal relative w-full py-20 md:py-28 px-6 md:px-16 overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <Wave className="absolute top-10 left-8 opacity-30" width={120} height={28} strokeWidth={2.5} />
        <Wave className="absolute bottom-10 right-8 opacity-30" width={120} height={28} strokeWidth={2.5} />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Visual container (Confidence Portrait) */}
          <div className="relative flex-shrink-0 w-64 md:w-80 lg:w-96">
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-2 opacity-20"
              style={{ borderColor: "#FF6B00" }}
            ></div>
            <div
              className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border opacity-30"
              style={{ borderColor: "#FF6B00" }}
            ></div>
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: "0 0 60px 10px rgba(255,107,0,0.12)" }}
            ></div>

            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/88a808869946c4a6fe9b5748366eecd0.jpeg"
                alt="Harsh - Video Editor &amp; Thumbnail Designer"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[1.5s]"
                style={{ filter: "contrast(1.05) brightness(0.95)" }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Editing icon sticker badge */}
            <div
              className="absolute -top-3 -right-3 w-11 h-11 flex items-center justify-center rounded-full animate-pulse-glow"
              style={{ backgroundColor: "#FF6B00" }}
            >
              <i className="ri-edit-2-fill text-white text-lg"></i>
            </div>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-12 top-1/2 -translate-y-1/2 items-center gap-0 opacity-40 pointer-events-none">
            <div className="w-16 h-px" style={{ backgroundColor: "#FF6B00" }}></div>
            <div
              className="w-0 h-0"
              style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderRight: "8px solid #FF6B00",
              }}
            ></div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className="mb-2">
              <p
                className="text-[clamp(1.8rem,5vw,3.5rem)] leading-none font-heading text-white tracking-tight"
                style={{ fontFamily: "Anton, Impact, sans-serif" }}
              >
                HELLO I'M
              </p>
              <div className="relative inline-block">
                <span
                  className="text-[#FF6B00] text-[clamp(2.5rem,6vw,5rem)] leading-none"
                  style={{ fontFamily: "Pacifico, cursive" }}
                >
                  Harsh
                </span>
                <Wave
                  className="absolute -bottom-2 left-0 w-full"
                  width={200}
                  height={14}
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <div className="my-6 flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-8 h-0.5" style={{ backgroundColor: "#FF6B00" }}></div>
              <span className="text-foreground-500 text-xs tracking-[0.25em] uppercase font-body">
                Video Editor &amp; Thumbnail Designer
              </span>
            </div>

            <p className="text-foreground-700 text-sm md:text-base leading-relaxed font-body max-w-lg mx-auto lg:mx-0">
              My name is Harsh. This portfolio is a collection of my best video editing and thumbnail design work.
              I create cinematic edits, YouTube thumbnails, and short-form content that grabs attention and drives clicks.
              Turning raw footage into visual stories is my passion.
            </p>

            {/* Key stats row */}
            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { value: "50+", label: "Projects Done" },
                { value: "30+", label: "Happy Clients" },
                { value: "2+", label: "Years Exp." },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left min-w-[90px]">
                  <p
                    className="text-3xl font-heading text-[#FF6B00]"
                    style={{ fontFamily: "Anton, Impact, sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-foreground-600 text-xs font-body uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="cursor-pointer whitespace-nowrap inline-flex items-center gap-2 px-7 py-3 rounded-full text-foreground-950 font-body font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#FF6B00" }}
              >
                <i className="ri-mail-fill"></i>
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Skills & Arsenal Section */}
      <section
        ref={skillsRevealRef}
        id="skills"
        className="section-reveal relative w-full py-20 md:py-28 px-6 md:px-16 overflow-hidden"
        style={{ backgroundColor: "#111111" }}
      >
        <Wave className="absolute top-8 right-10 opacity-30" width={140} height={28} strokeWidth={3} />
        <Wave className="absolute bottom-8 left-10 opacity-30" width={140} height={28} strokeWidth={3} />

        <div className="mb-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-1">
            <i className="ri-star-fill text-[#FF6B00]"></i>
            <span className="text-foreground-600 text-xs tracking-[0.3em] uppercase font-body">
              My Arsenal
            </span>
            <i className="ri-star-fill text-[#FF6B00]"></i>
          </div>
          <h2
            className="text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-heading text-white tracking-tight"
            style={{ fontFamily: "Anton, Impact, sans-serif" }}
          >
            SKILLS &amp; TOOLS
          </h2>
          <div className="relative inline-block mt-1">
            <span
              className="text-[#FF6B00] text-[clamp(1.5rem,3.5vw,2.5rem)]"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Harsh
            </span>
            <Wave
              className="absolute -bottom-2 left-0 w-full"
              width={120}
              height={12}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Skill card container */}
        <div
          className="relative z-10 max-w-4xl mx-auto rounded-2xl p-8 md:p-12 border"
          style={{
            backgroundColor: "#1a1a1a",
            borderColor: "rgba(255, 107, 0, 0.15)",
            boxShadow: "0 0 40px rgba(255, 107, 0, 0.05)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* Editing skills list */}
            <div>
              <h3 className="text-white font-body font-semibold text-lg mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 inline-block" style={{ backgroundColor: "#FF6B00" }}></span>
                Editing Skills
              </h3>
              <ul className="space-y-4">
                {Bo.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 group">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                      style={{ backgroundColor: "#FF6B00" }}
                    ></span>
                    <span className="text-foreground-800 font-body text-sm md:text-base group-hover:text-white transition-colors duration-200">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Softwares list with badges and progress indicators */}
            <div>
              <h3 className="text-white font-body font-semibold text-lg mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 inline-block" style={{ backgroundColor: "#FF6B00" }}></span>
                Softwares
              </h3>
              <div className="flex flex-wrap gap-4 mb-8">
                <ToolBadge tool="Fi" size="xl" glow={true} />
                <ToolBadge tool="Cc" size="xl" glow={true} />
                <ToolBadge tool="Ps" size="xl" glow={true} />
                <ToolBadge tool="Pa" size="xl" glow={true} />
              </div>

              <div className="space-y-4">
                {softwareSkills.map((soft) => (
                  <div key={soft.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-foreground-700 text-xs font-body">{soft.name}</span>
                      <span className="text-[#FF6B00] text-xs font-body font-semibold">
                        {soft.pct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "#2a2a2a" }}>
                      <div
                        className="h-1.5 rounded-full transition-all duration-[1.5s]"
                        style={{ width: `${soft.pct}%`, backgroundColor: "#FF6B00" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Wave
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20"
          width={60}
          height={260}
          direction="vertical"
          strokeWidth={2.5}
        />
      </section>

      {/* 6. Video Editing Projects Section */}
      <section
        ref={workRevealRef}
        id="work"
        className="section-reveal relative w-full py-20 md:py-28 px-6 md:px-16 overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <Wave className="absolute top-8 left-10 opacity-30" width={140} height={28} strokeWidth={3} />
        <Wave className="absolute bottom-8 right-10 opacity-30" width={140} height={28} strokeWidth={3} />

        <div className="absolute left-0 top-0 h-full w-1.5" style={{ background: "linear-gradient(to bottom, transparent, #FF6B00, transparent)" }}></div>

        <div className="mb-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-1">
            <i className="ri-star-fill text-[#FF6B00]"></i>
            <span className="text-foreground-600 text-xs tracking-[0.3em] uppercase font-body">
              My Projects
            </span>
            <i className="ri-star-fill text-[#FF6B00]"></i>
          </div>
          <h2
            className="text-[clamp(2.5rem,8vw,6rem)] leading-none font-heading text-white tracking-tight"
            style={{ fontFamily: "Anton, Impact, sans-serif" }}
          >
            VIDEO EDITING
          </h2>
          <div className="relative inline-block mt-1">
            <span
              className="text-[#FF6B00] text-[clamp(1.8rem,4vw,3rem)]"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Cinematic Edits
            </span>
            <Wave
              className="absolute -bottom-2 left-0 w-full"
              width={160}
              height={12}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Video grid list */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {Ho.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                if (video.videoUrl) {
                  setActiveVideo({ title: video.title, url: video.videoUrl });
                }
              }}
              className="relative card-hover rounded-xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "16/9", backgroundColor: "#1a1a1a" }}
            >
              <img
                src={video.img}
                alt={`Video editing project: ${video.title}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Play symbol trigger hover indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: "rgba(255,107,0,0.9)" }}
                >
                  <i className="ri-play-fill text-white text-2xl ml-1"></i>
                </div>
              </div>

              {/* Video metadata titles footer details */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <p className="text-white font-body font-semibold text-sm">{video.title}</p>
                <span
                  className="text-white text-xs font-body font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: Uo[video.type] ?? "#FF6B00" }}
                >
                  {video.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Thumbnail Designs Section */}
      <section
        ref={designRevealRef}
        id="thumbnail-designs"
        className="section-reveal relative w-full py-20 md:py-28 px-6 md:px-16 overflow-hidden"
        style={{ backgroundColor: "#111111" }}
      >
        <Wave className="absolute top-10 right-14 opacity-40 animate-float" width={150} height={28} strokeWidth={3} />
        <Wave className="absolute bottom-10 left-14 opacity-40" width={150} height={28} strokeWidth={3} />

        <div className="mb-12 relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-1 justify-center lg:justify-start">
              <i className="ri-star-fill text-[#FF6B00]"></i>
              <span className="text-foreground-600 text-xs tracking-[0.3em] uppercase font-body">
                Design Showcase
              </span>
            </div>
            <h2
              className="text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-heading text-white tracking-tight"
              style={{ fontFamily: "Anton, Impact, sans-serif" }}
            >
              THUMBNAIL
            </h2>
            <div className="relative inline-block">
              <span
                className="text-[#FF6B00] text-[clamp(1.8rem,4vw,3rem)]"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                Designs
              </span>
              <Wave
                className="absolute -bottom-2 left-0 w-full"
                width={170}
                height={12}
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="relative flex-shrink-0 w-36 md:w-44">
            <img
              src="https://readdy.ai/api/search-image?query=Young%20Indian%20man%20full%20body%20standing%20portrait%20dark%20background%20casual%20outfit%20confident%20pose%20arms%20at%20side%20modern%20studio%20lighting%20high%20contrast%20clean%20cut%20out%20look%20professional%20photo&width=280&height=420&seq=harsh-standing-side-01&orientation=portrait"
              alt="Harsh - Designer"
              className="w-full h-auto object-cover object-top hover:translate-x-1 duration-300 transition-transform"
              style={{ filter: "contrast(1.1) brightness(0.9)" }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Creative Thumbnail Collage Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {Go.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxImg(item.img)}
              className={`relative card-hover rounded-xl overflow-hidden cursor-pointer group select-none transition-all duration-300 ${
                idx % 3 === 0 ? "-rotate-1" : idx % 3 === 1 ? "rotate-1" : ""
              }`}
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={item.img}
                alt={`Thumbnail design ${item.id}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300"></div>

              {item.badge && (
                <span
                  className="absolute top-2 left-2 text-white text-[10px] sm:text-xs font-body font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#FF6B00" }}
                >
                  {item.badge}
                </span>
              )}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,107,0,0.9)" }}
                >
                  <i className="ri-zoom-in-line text-white text-base"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Contact Section & Footer */}
      <section
        ref={contactRevealRef}
        id="contact"
        className="section-reveal relative w-full overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="relative w-full" style={{ height: "60px" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
            <path
              d="M0,0 L0,60 L1440,60 L1440,0 Q1400,20 1360,8 Q1320,-4 1280,14 Q1240,32 1200,12 Q1160,-8 1120,18 Q1080,44 1040,20 Q1000,-4 960,22 Q920,48 880,18 Q840,-12 800,20 Q760,52 720,16 Q680,-20 640,18 Q600,56 560,14 Q520,-28 480,20 Q440,68 400,18 Q360,-32 320,22 Q280,76 240,14 Q200,-48 160,18 Q120,84 80,20 Q40,-44 0,0 Z"
              fill="#111111"
            />
          </svg>
        </div>

        <div className="relative py-20 md:py-28 px-6 md:px-16 text-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,107,0,0.08) 0%, transparent 70%)",
            }}
          ></div>

          <Wave className="absolute top-10 left-10 opacity-30" width={140} height={28} strokeWidth={3} />
          <Wave className="absolute top-10 right-10 opacity-30" width={140} height={28} strokeWidth={3} />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-2 animate-bounce">
              <span className="text-[#FF6B00] text-[clamp(1.5rem,4vw,3rem)]" style={{ fontFamily: "Pacifico, cursive" }}>
                For Attention
              </span>
            </div>

            <h2
              className="text-[clamp(4rem,14vw,11rem)] leading-none font-heading text-white tracking-tighter orange-glow"
              style={{ fontFamily: "Anton, Impact, sans-serif" }}
            >
              THANK YOU
            </h2>

            <p className="text-foreground-600 font-body text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
              Thank you for taking the time to view my portfolio. I'd love to work with you on your next video editing
              or thumbnail design project!
            </p>

            <div className="mt-10">
              <a
                href="mailto:kumarharsh0720@gmail.com"
                className="cursor-pointer whitespace-nowrap inline-flex items-center gap-3 px-12 py-4 rounded-full border-2 text-[#FF6B00] border-[#FF6B00] font-body font-bold text-base tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-[#FF6B00] hover:text-white"
              >
                <i className="ri-mail-send-fill text-lg"></i>
                CONTACT
              </a>
            </div>

            <div className="flex justify-center mt-6">
              <Wave width={220} height={16} strokeWidth={2.5} />
            </div>

            {/* Social channels details */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "rgba(255, 107, 0, 0.12)", border: "1px solid rgba(255, 107, 0, 0.3)" }}
                >
                  <i className="ri-instagram-fill text-[#FF6B00] text-base"></i>
                </div>
                <div className="text-left">
                  <p className="text-foreground-500 text-xs font-body uppercase tracking-wider">Instagram</p>
                  <p className="text-foreground-800 font-body text-sm group-hover:text-[#FF6B00] transition-colors duration-200">
                    {socialLinks.instagramHandle}
                  </p>
                </div>
              </a>

              <a href={`mailto:${socialLinks.email}`} className="cursor-pointer flex items-center gap-3 group">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "rgba(255, 107, 0, 0.12)", border: "1px solid rgba(255, 107, 0, 0.3)" }}
                >
                  <i className="ri-mail-fill text-[#FF6B00] text-base"></i>
                </div>
                <div className="text-left">
                  <p className="text-foreground-500 text-xs font-body uppercase tracking-wider">Email</p>
                  <p className="text-foreground-800 font-body text-sm group-hover:text-[#FF6B00] transition-colors duration-200">
                    {socialLinks.email}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="relative py-6 px-6 text-center border-t mt-4"
          style={{ backgroundColor: "#0d0d0d", borderColor: "rgba(255,107,0,0.1)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
            <p className="text-foreground-500 text-xs font-body">
              © 2026 <span style={{ color: "#FF6B00" }}>Harsh</span>. All rights reserved.
            </p>

            <div className="flex items-center gap-1 justify-center">
              <span className="text-foreground-600 text-xs font-body">Made with</span>
              <i className="ri-heart-fill text-[#FF6B00] text-xs mx-1"></i>
              <span className="text-foreground-600 text-xs font-body">by Harsh</span>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#FF6B00]/10"
                style={{ color: "#FF6B00", border: "1px solid rgba(255,107,0,0.3)" }}
              >
                <i className="ri-youtube-fill text-sm"></i>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title={`Instagram ${socialLinks.instagramHandle}`}
                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#FF6B00]/10"
                style={{ color: "#FF6B00", border: "1px solid rgba(255,107,0,0.3)" }}
              >
                <i className="ri-instagram-fill text-sm"></i>
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                title="Email"
                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#FF6B00]/10"
                style={{ color: "#FF6B00", border: "1px solid rgba(255,107,0,0.3)" }}
              >
                <i className="ri-mail-fill text-sm"></i>
              </a>
            </div>
          </div>
        </footer>
      </section>

      {/* 9. Cinematic Lightbox / Zoom-In Viewer */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-[#FF6B00] transition-colors cursor-pointer"
            aria-label="Close viewer"
          >
            <i className="ri-close-line"></i>
          </button>
          <div
            className="max-w-5xl max-h-[85vh] overflow-hidden rounded-xl border border-[#FF6B00]/40 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg}
              alt="High resolution thumbnail design preview"
              className="w-full h-auto max-h-[80vh] object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* 10. Cinematic Interactive Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn"
          onClick={() => {
            setActiveVideo(null);
            setVideoError(false);
          }}
        >
          <div
            className="max-w-4xl w-full bg-[#111111] rounded-2xl border border-[#FF6B00]/40 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#FF6B00]/10 flex items-center justify-between">
              <h3 className="font-heading text-lg text-white tracking-widest uppercase">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => {
                  setActiveVideo(null);
                  setVideoError(false);
                }}
                className="text-white hover:text-[#FF6B00] text-2xl transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative">
              {activeVideo.url.includes("youtube.com") || activeVideo.url.includes("youtu.be") ? (
                <iframe
                  src={`${activeVideo.url}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full block"
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : !videoError ? (
                <video
                  src={activeVideo.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                  playsInline
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-center border border-zinc-800">
                  <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-full flex items-center justify-center text-[#FF6B00] text-3xl mb-4">
                    <i className="ri-error-warning-line animate-pulse"></i>
                  </div>
                  <h4 className="text-white font-heading text-base font-bold tracking-wider mb-2">
                    Video Offline or Unavailable
                  </h4>
                  <p className="text-zinc-400 text-sm max-w-md mb-6 leading-relaxed">
                    The requested video could not be loaded or is temporarily offline. Please ensure the path exists or check your network connection.
                  </p>
                  <button
                    onClick={() => {
                      setActiveVideo(null);
                      setVideoError(false);
                    }}
                    className="px-5 py-2 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Close Player
                  </button>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-[#0d0d0d] text-center text-xs text-foreground-500 flex items-center justify-between">
              <span>Selected Work: Cinematic Demonstration</span>
              <span className="text-[#FF6B00] font-bold">Harsh Portfolio © 2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
