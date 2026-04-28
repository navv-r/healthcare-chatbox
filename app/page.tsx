"use client";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F6FF] text-[#1E293B] font-sans">
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#DBEAFE]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PulseIcon />
            <span className="text-lg font-semibold text-[#0F4C81] tracking-tight">
              The Waiting Room
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#0F4C81] hover:text-[#0a3a6e] transition-colors"
            >
              About Us
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm font-medium bg-[#0F4C81] text-white px-4 py-2 rounded-full hover:bg-[#0a3a6e] transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 bg-[#DBEAFE] text-[#0F4C81] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          AI Health Assistant — Always Open
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold text-[#0F4C81] leading-tight max-w-3xl mb-6">
          Your health questions,{" "}
          <span className="text-[#10B981]">answered instantly</span>
        </h1>

        <p className="text-lg text-[#475569] max-w-xl mb-10 leading-relaxed">
          The Waiting Room is a private, AI-powered space where you can ask
          healthcare questions anytime — no appointment needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#0F4C81] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#0a3a6e] transition-colors shadow-lg shadow-blue-900/20"
          >
            Enter the Waiting Room
            <ArrowRightIcon />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0F4C81] text-sm font-semibold px-7 py-3.5 rounded-full border border-[#DBEAFE] hover:bg-[#F0F6FF] transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Hero card mockup */}
        <div className="mt-16 w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-[#DBEAFE] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#F8FBFF] border-b border-[#DBEAFE]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-[#94A3B8]">The Waiting Room — AI Chat</span>
          </div>
          <div className="p-6 space-y-4">
            <ChatBubble
              role="user"
              text="What are the symptoms of high blood pressure I should watch for?"
            />
            <ChatBubble
              role="ai"
              text="High blood pressure (hypertension) is often called the 'silent killer' because it rarely causes symptoms until it's severe. Signs to watch for include persistent headaches, shortness of breath, nosebleeds, and dizziness. Regular monitoring is the best way to stay informed. Would you like tips on tracking your blood pressure at home?"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 border-y border-[#DBEAFE]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0F4C81] text-center mb-3">
            Why use The Waiting Room?
          </h2>
          <p className="text-center text-[#64748B] mb-12">
            Healthcare guidance on your schedule, without the wait.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <FeatureCard
              icon={<ClockIcon />}
              title="Available 24/7"
              description="Get answers any time of day or night — weekends, holidays, whenever you need them."
            />
            <FeatureCard
              icon={<LockIcon />}
              title="Private & Secure"
              description="Your conversations are confidential. We never share your health data with third parties."
            />
            <FeatureCard
              icon={<BrainIcon />}
              title="AI-Powered Answers"
              description="Backed by medical knowledge bases, our AI provides reliable, up-to-date health information."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-[#0F4C81] text-center mb-3">
          How it works
        </h2>
        <p className="text-center text-[#64748B] mb-12">
          Three simple steps to get the answers you need.
        </p>
        <div className="grid sm:grid-cols-3 gap-8 relative">
          <StepCard
            number="1"
            title="Create your account"
            description="Sign up in seconds. No insurance information or medical history required to start."
          />
          <StepCard
            number="2"
            title="Ask your question"
            description="Type any healthcare question in plain English — symptoms, medications, lifestyle, or general wellness."
          />
          <StepCard
            number="3"
            title="Get your answer"
            description="Our AI responds instantly with clear, accurate information to help guide your decisions."
          />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#0F4C81] text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            The doctor&apos;s office is closed. We&apos;re not.
          </h2>
          <p className="text-[#BFDBFE] mb-8 text-lg">
            Join thousands of users who get reliable health answers without the wait.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#10B981] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#0ea271] transition-colors shadow-lg"
          >
            Get started for free
            <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#DBEAFE] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <PulseIcon small />
            <span className="font-medium text-[#64748B]">The Waiting Room</span>
          </div>
          <p>
            For informational purposes only. Not a substitute for professional
            medical advice.
          </p>
          <p>&copy; {new Date().getFullYear()} The Waiting Room</p>
        </div>
      </footer>
    </div>
  );
}

function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 flex flex-col gap-4 transition-all duration-300 ${
          open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#475569] transition-colors"
          aria-label="Close"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-[#0F4C81]">Welcome</h2>
          <p className="text-sm text-[#64748B] mt-1">How would you like to continue?</p>
        </div>

        <a
          href="/login"
          className="w-full text-center text-sm font-semibold text-[#0F4C81] border-2 border-[#0F4C81] px-4 py-3 rounded-xl hover:bg-[#F0F6FF] transition-colors"
        >
          Log In
        </a>

        <a
          href="/signup"
          className="w-full text-center text-sm font-semibold text-white bg-[#0F4C81] px-4 py-3 rounded-xl hover:bg-[#0a3a6e] transition-colors"
        >
          Sign Up
        </a>

        <button className="w-full flex items-center justify-center gap-3 text-sm font-semibold text-[#1E293B] border border-[#E2E8F0] px-4 py-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
          <GoogleLogo />
          Sign in with Google
        </button>

        <a
          href="/chat"
          className="w-full text-center text-sm font-medium text-[#64748B] hover:text-[#475569] transition-colors py-1"
        >
          Continue as Guest
        </a>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width={18} height={18} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function PulseIcon({ small }: { small?: boolean }) {
  const size = small ? 18 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#10B981"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
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
}) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#F0F6FF] border border-[#DBEAFE]">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-[#DBEAFE]">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#0F4C81]">{title}</h3>
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
    <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm">
      <div className="w-12 h-12 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-lg font-bold">
        {number}
      </div>
      <h3 className="text-base font-semibold text-[#0F4C81]">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
    </div>
  );
}

function ChatBubble({ role, text }: { role: "user" | "ai"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
          isUser
            ? "bg-[#0F4C81] text-white"
            : "bg-[#10B981] text-white"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[#0F4C81] text-white rounded-tr-sm"
            : "bg-[#F0F6FF] text-[#1E293B] rounded-tl-sm border border-[#DBEAFE]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
