"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransitionLink } from "./components/TransitionLink";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pg-enter min-h-screen bg-[#F0F6FF] text-[#1E293B] font-sans overflow-x-hidden">
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#DBEAFE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PulseIcon />
            <div>
              <p className="text-[13px] font-bold text-[#0F4C81] tracking-tight leading-tight">
                The Waiting Room
              </p>
              <p className="text-[10px] text-[#94A3B8] font-medium leading-tight hidden sm:block">
                AI Health Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-5">
            <a
              href="#features"
              className="hidden md:block text-sm font-medium text-[#64748B] hover:text-[#0F4C81] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hidden md:block text-sm font-medium text-[#64748B] hover:text-[#0F4C81] transition-colors"
            >
              How it works
            </a>
            <TransitionLink
              href="/membership"
              className="hidden md:block text-sm font-medium text-[#64748B] hover:text-[#0F4C81] transition-colors"
            >
              Pricing
            </TransitionLink>
            <button
              onClick={() => setModalOpen(true)}
              className="text-[13px] font-semibold bg-[#0F4C81] text-white px-4 sm:px-5 py-2 rounded-full hover:bg-[#0a3a6e] active:scale-[0.97] transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] opacity-60 pointer-events-none animate-blob"
          style={{ background: "radial-gradient(circle at center, #BFDBFE 0%, transparent 68%)" }}
        />
        <div
          className="absolute bottom-0 -left-16 w-[360px] h-[360px] opacity-30 pointer-events-none animate-blob"
          style={{ background: "radial-gradient(circle at center, #10B981 0%, transparent 65%)", animationDelay: "5s" }}
        />

        {/* Floating green particles */}
        <div className="absolute top-[22%] left-[7%]  w-3   h-3   rounded-full bg-[#10B981] opacity-20 pointer-events-none animate-float-a" />
        <div className="absolute top-[38%] right-[10%] w-2   h-2   rounded-full bg-[#10B981] opacity-15 pointer-events-none animate-float-b" style={{ animationDelay: "2.5s" }} />
        <div className="absolute bottom-[28%] left-[14%] w-4 h-4   rounded-full bg-[#10B981] opacity-10 pointer-events-none animate-float-c" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[60%] right-[7%]  w-2.5 h-2.5 rounded-full bg-[#10B981] opacity-20 pointer-events-none animate-float-a" style={{ animationDelay: "3.8s" }} />
        <div className="absolute top-[12%] left-[32%] w-1.5 h-1.5 rounded-full bg-[#10B981] opacity-25 pointer-events-none animate-float-b" style={{ animationDelay: "0.7s" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-20 flex flex-col items-center text-center">

          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white border border-[#DBEAFE] text-[#0F4C81] text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-7 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            AI-Powered · Always Available · 100% Private
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#0F4C81] leading-[1.08] tracking-tight max-w-3xl mb-5"
            style={{ animationDelay: "0.1s" }}
          >
            Your health questions,{" "}
            <span className="text-[#10B981]">answered instantly</span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-in-up text-base sm:text-lg text-[#475569] max-w-lg mb-8 sm:mb-10 leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            A private, AI-powered space to ask healthcare questions anytime —
            no appointment, no waiting room, no judgment.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#0F4C81] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#0a3a6e] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20"
            >
              Enter the Waiting Room
              <ArrowRightIcon />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0F4C81] text-sm font-semibold px-7 py-3.5 rounded-full border border-[#DBEAFE] hover:bg-[#F0F6FF] hover:border-[#BFDBFE] active:scale-[0.98] transition-all"
            >
              See how it works
            </a>
          </div>

          {/* Stats strip */}
          <div
            className="animate-fade-in-up flex flex-wrap items-center justify-center gap-6 sm:gap-0 mt-10 sm:mt-12 divide-x-0 sm:divide-x sm:divide-[#DBEAFE]"
            style={{ animationDelay: "0.4s" }}
          >
            <StatItem value="24/7" label="Always Available" />
            <StatItem value="< 2s" label="Response Time" />
            <StatItem value="100%" label="Confidential" />
          </div>

          {/* Mockup card — outer div for entrance, inner for float */}
          <div
            className="animate-fade-in-up w-full max-w-xl sm:max-w-2xl mt-12 sm:mt-16"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="animate-float rounded-2xl sm:rounded-[20px] shadow-2xl shadow-blue-900/10 border border-[#DBEAFE] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-[#DBEAFE]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FC6058]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEC02F]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ACA44]" />
                <span className="ml-3 flex-1 text-xs text-[#94A3B8] truncate">
                  The Waiting Room — AI Health Chat
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#10B981] flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Online
                </span>
              </div>
              {/* Chat content */}
              <div className="bg-[#F8FBFF] p-4 sm:p-5 space-y-3">
                <MockChatBubble
                  role="user"
                  text="What are the symptoms of high blood pressure I should watch for?"
                />
                <MockChatBubble
                  role="ai"
                  text="High blood pressure is often called the 'silent killer' — it rarely causes noticeable symptoms. Watch for persistent headaches, shortness of breath, nosebleeds, or dizziness. Regular monitoring is the best way to stay on top of it."
                />
                {/* Mock input bar */}
                <div className="flex items-center gap-2 bg-white border border-[#DBEAFE] rounded-xl px-3 py-2.5 mt-1 select-none pointer-events-none">
                  <span className="flex-1 text-sm text-[#C0CCDA]">Ask a health question…</span>
                  <span className="w-7 h-7 rounded-full bg-[#0F4C81] flex items-center justify-center flex-shrink-0">
                    <MockSendIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-white border-y border-[#DBEAFE] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">
              Why us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F4C81] mt-2 mb-3">
              Why use The Waiting Room?
            </h2>
            <p className="text-[#64748B] max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Healthcare guidance on your schedule, without the wait.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard
              icon={<ClockIcon />}
              title="Available 24/7"
              description="Get answers any time of day or night — weekends, holidays, whenever you need them."
              accent="#0F4C81"
            />
            <FeatureCard
              icon={<LockIcon />}
              title="Private & Secure"
              description="Your conversations are confidential. We never share your health data with third parties."
              accent="#10B981"
            />
            <FeatureCard
              icon={<BrainIcon />}
              title="AI-Powered Answers"
              description="Backed by medical knowledge bases, our AI provides reliable, up-to-date information."
              accent="#0F4C81"
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">
            Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F4C81] mt-2 mb-3">
            How it works
          </h2>
          <p className="text-[#64748B] max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Three simple steps to get the answers you need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 relative">
          {/* Connecting dashed line */}
          <div className="absolute hidden sm:block border-t-2 border-dashed border-[#DBEAFE] top-[47px] left-[22%] right-[22%]" />
          <StepCard number="1" title="Create your account" description="Sign up in seconds. No insurance or medical history required to start." />
          <StepCard number="2" title="Ask your question" description="Type any healthcare question in plain English — symptoms, meds, or general wellness." />
          <StepCard number="3" title="Get your answer" description="Our AI responds instantly with clear, accurate information to help guide your decisions." />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4070] to-[#0a3562] text-white py-14 sm:py-20">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            The doctor&apos;s office is closed.
            <br className="hidden sm:block" /> We&apos;re not.
          </h2>
          <p className="text-[#BFDBFE] mb-8 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Join thousands of users who get reliable health answers without the wait.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#10B981] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#0ea271] active:scale-[0.98] transition-all shadow-lg shadow-black/20"
          >
            Get started for free
            <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-[#DBEAFE] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <PulseIcon small />
            <span className="font-semibold text-[#64748B]">The Waiting Room</span>
          </div>
          <p className="text-center text-xs sm:text-sm">
            For informational purposes only. Not a substitute for professional medical advice.
          </p>
          <p className="text-xs">&copy; {new Date().getFullYear()} The Waiting Room</p>
        </div>
      </footer>
    </div>
  );
}

// ── Auth modal ───────────────────────────────────────────────────────────────

function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClose() {
    if (loading) return;
    onClose();
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setName("");
  }

  async function startAuth() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/chat");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startAuth();
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 px-4 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-sm transition-all duration-300 overflow-hidden ${
          open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center gap-4 rounded-2xl">
            <div className="w-12 h-12 rounded-full border-4 border-[#DBEAFE] border-t-[#0F4C81] animate-spin" />
            <p className="text-[13px] font-semibold text-[#0F4C81]">
              {tab === "signup" ? "Creating your account…" : "Signing you in…"}
            </p>
          </div>
        )}

        <div className="p-7 sm:p-8 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F0F6FF] border border-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                <PulseIcon />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[#0F4C81] leading-tight">The Waiting Room</h2>
                <p className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">AI Health Assistant</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-[#94A3B8] hover:text-[#475569] transition-colors p-1 rounded-lg hover:bg-[#F0F6FF] flex-shrink-0 mt-0.5"
              aria-label="Close"
            >
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Tab toggle */}
          <div className="flex bg-[#F0F6FF] rounded-xl p-1 gap-1">
            <button
              onClick={() => { setTab("login"); resetForm(); }}
              className={`flex-1 text-[13px] font-semibold py-2 rounded-lg transition-all ${
                tab === "login"
                  ? "bg-white text-[#0F4C81] shadow-sm"
                  : "text-[#94A3B8] hover:text-[#64748B]"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setTab("signup"); resetForm(); }}
              className={`flex-1 text-[13px] font-semibold py-2 rounded-lg transition-all ${
                tab === "signup"
                  ? "bg-white text-[#0F4C81] shadow-sm"
                  : "text-[#94A3B8] hover:text-[#64748B]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {tab === "signup" && (
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full text-sm text-[#1E293B] placeholder-[#CBD5E1] bg-[#F8FBFF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full text-sm text-[#1E293B] placeholder-[#CBD5E1] bg-[#F8FBFF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full text-sm text-[#1E293B] placeholder-[#CBD5E1] bg-[#F8FBFF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full text-sm font-semibold text-white bg-[#0F4C81] px-4 py-3 rounded-xl hover:bg-[#0a3a6e] active:scale-[0.98] transition-all shadow-sm shadow-blue-900/20 mt-1"
            >
              {tab === "login" ? "Log In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#DBEAFE]" />
            <span className="text-[11px] text-[#94A3B8] font-medium">or</span>
            <div className="flex-1 h-px bg-[#DBEAFE]" />
          </div>

          {/* Social + Guest */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => startAuth()}
              className="w-full flex items-center justify-center gap-3 text-sm font-semibold text-[#1E293B] border border-[#E2E8F0] px-4 py-2.5 rounded-xl hover:bg-[#F8FAFC] active:scale-[0.98] transition-all"
            >
              <GoogleLogo />
              Continue with Google
            </button>
            <button
              onClick={() => startAuth()}
              className="w-full text-[13px] font-medium text-[#94A3B8] hover:text-[#475569] transition-colors py-1"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section components ───────────────────────────────────────────────────────

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-4 sm:px-8 py-1">
      <p className="text-2xl sm:text-3xl font-bold text-[#0F4C81] leading-none tracking-tight">
        {value}
      </p>
      <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-widest mt-1.5">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div className="group flex flex-col gap-4 p-6 rounded-2xl bg-[#F8FBFF] border border-[#DBEAFE] hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5 hover:border-[#BFDBFE] transition-all duration-200 cursor-default">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[#DBEAFE] group-hover:border-[#BFDBFE] group-hover:shadow-sm transition-all">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-[#0F4C81]">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm hover:shadow-md hover:border-[#BFDBFE] transition-all duration-200 cursor-default">
      <div className="w-12 h-12 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-lg font-bold shadow-md shadow-blue-900/20 flex-shrink-0">
        {number}
      </div>
      <h3 className="text-[15px] font-semibold text-[#0F4C81]">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
    </div>
  );
}

function MockChatBubble({ role, text }: { role: "user" | "ai"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
          isUser ? "bg-[#0F4C81] text-white" : "bg-[#10B981] text-white"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
          isUser
            ? "bg-[#0F4C81] text-white rounded-tr-sm"
            : "bg-white text-[#1E293B] rounded-tl-sm border border-[#DBEAFE]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function PulseIcon({ small }: { small?: boolean }) {
  const s = small ? 16 : 22;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MockSendIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width={17} height={17} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
