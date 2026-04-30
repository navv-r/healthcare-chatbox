"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransitionLink } from "../components/TransitionLink";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: { monthly: 9.99, annual: 7.99 },
    tagline: "For casual health questions",
    highlight: false,
    features: [
      { text: "50 AI health questions / month", included: true },
      { text: "General symptom checker", included: true },
      { text: "Health Q&A library access", included: true },
      { text: "Conversation history (7 days)", included: true },
      { text: "Email support", included: true },
      { text: "Medication interaction checker", included: false },
      { text: "Unlimited questions", included: false },
      { text: "Family plan (up to 4 members)", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 14.99, annual: 11.99 },
    tagline: "Most popular · Best bang for your buck",
    highlight: true,
    badge: "Best Value",
    features: [
      { text: "Unlimited AI health questions", included: true },
      { text: "Advanced symptom analysis", included: true },
      { text: "Full health Q&A library", included: true },
      { text: "Unlimited conversation history", included: true },
      { text: "Priority support", included: true },
      { text: "Medication interaction checker", included: true },
      { text: "Health report exports (PDF)", included: true },
      { text: "Family plan (up to 4 members)", included: false },
    ],
    cta: "Start with Pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: { monthly: 19.99, annual: 15.99 },
    tagline: "For families & power users",
    highlight: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Family plan (up to 4 members)", included: true },
      { text: "Personalised health insights", included: true },
      { text: "Monthly wellness summary", included: true },
      { text: "Dedicated health coach (async)", included: true },
      { text: "Nurse callback credit (1×/mo)", included: true },
      { text: "Early access to new features", included: true },
      { text: "24/7 live chat support", included: true },
    ],
    cta: "Go Premium",
  },
] as const;

const FAQS = [
  {
    q: "Can I change my plan later?",
    a: "Yes — upgrade or downgrade at any time from your account settings. Changes take effect at the next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan comes with a 7-day free trial. No credit card required to start.",
  },
  {
    q: "How does the family plan work?",
    a: "Premium lets you add up to 3 additional family members under one subscription, each with their own private conversation history.",
  },
  {
    q: "Is my health data private?",
    a: "Completely. We never sell or share your data. All conversations are encrypted at rest and in transit.",
  },
];

export default function Membership() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  function handleCta(planId: string) {
    setSelectedPlan(planId);
    setModalOpen(true);
  }

  return (
    <div className="pg-enter min-h-screen bg-[#F0F6FF] text-[#1E293B] font-sans overflow-x-hidden">
      <AuthModal open={modalOpen} plan={selectedPlan} onClose={() => setModalOpen(false)} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#DBEAFE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <TransitionLink href="/" className="flex items-center gap-2.5">
            <PulseIcon />
            <div>
              <p className="text-[13px] font-bold text-[#0F4C81] tracking-tight leading-tight">
                The Waiting Room
              </p>
              <p className="text-[10px] text-[#94A3B8] font-medium leading-tight hidden sm:block">
                AI Health Assistant
              </p>
            </div>
          </TransitionLink>
          <div className="flex items-center gap-2 sm:gap-5">
            <TransitionLink
              href="/"
              className="hidden md:block text-sm font-medium text-[#64748B] hover:text-[#0F4C81] transition-colors"
            >
              Home
            </TransitionLink>
            <button
              onClick={() => handleCta("pro")}
              className="text-[13px] font-semibold bg-[#0F4C81] text-white px-4 sm:px-5 py-2 rounded-full hover:bg-[#0a3a6e] active:scale-[0.97] transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-14 sm:pt-20 pb-4 sm:pb-8 text-center px-4">
        {/* Background blob */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[340px] opacity-40 pointer-events-none animate-blob"
          style={{ background: "radial-gradient(ellipse at center, #BFDBFE 0%, transparent 68%)" }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white border border-[#DBEAFE] text-[#0F4C81] text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Simple, transparent pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C81] leading-tight tracking-tight mb-4">
            Pick a plan that fits <span className="text-[#10B981]">your life</span>
          </h1>
          <p className="text-[#475569] text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
            Every plan starts with a 7-day free trial. No credit card required.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-white border border-[#DBEAFE] rounded-full p-1 shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all ${
                billing === "monthly"
                  ? "bg-[#0F4C81] text-white shadow"
                  : "text-[#64748B] hover:text-[#0F4C81]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                billing === "annual"
                  ? "bg-[#0F4C81] text-white shadow"
                  : "text-[#64748B] hover:text-[#0F4C81]"
              }`}
            >
              Annual
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all ${
                  billing === "annual"
                    ? "bg-[#10B981] text-white"
                    : "bg-[#D1FAE5] text-[#059669]"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan) =>
            plan.highlight ? (
              <HighlightCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onCta={() => handleCta(plan.id)}
              />
            ) : (
              <StandardCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onCta={() => handleCta(plan.id)}
              />
            )
          )}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-[#94A3B8] mt-7">
          All prices in USD. Cancel anytime. Taxes may apply.
        </p>
      </section>

      {/* Feature comparison strip */}
      <section className="bg-white border-y border-[#DBEAFE] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-[#0F4C81] mb-10">
            What&apos;s included in every plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <PerkItem icon={<ShieldIcon />} title="100% Private" desc="Encrypted conversations. Your data stays yours — always." />
            <PerkItem icon={<ClockIcon />} title="24/7 Access" desc="Ask health questions at midnight or midday — we're always on." />
            <PerkItem icon={<StarIcon />} title="7-Day Free Trial" desc="Try any plan free for 7 days. No card needed to get started." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-[#0F4C81] mb-8">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#DBEAFE] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-[#0F4C81]">{faq.q}</span>
                <ChevronIcon open={openFaq === i} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-sm text-[#64748B] leading-relaxed px-5 pb-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4070] to-[#0a3562] text-white py-14 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            Still not sure? Start free.
          </h2>
          <p className="text-[#BFDBFE] mb-8 text-base max-w-sm mx-auto leading-relaxed">
            Try Pro free for 7 days — no credit card, no commitment.
          </p>
          <button
            onClick={() => handleCta("pro")}
            className="inline-flex items-center gap-2 bg-[#10B981] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#0ea271] active:scale-[0.98] transition-all shadow-lg shadow-black/20"
          >
            Try Pro free for 7 days
            <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* Footer */}
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

// ── Plan card components ──────────────────────────────────────────────────────

type Plan = (typeof PLANS)[number];

function StandardCard({
  plan,
  billing,
  onCta,
}: {
  plan: Plan;
  billing: "monthly" | "annual";
  onCta: () => void;
}) {
  return (
    <div className="flex flex-col bg-white border border-[#DBEAFE] rounded-2xl p-6 sm:p-7 hover:shadow-lg hover:shadow-blue-900/5 hover:border-[#BFDBFE] transition-all duration-200">
      <div className="mb-5">
        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-1">
          {plan.name}
        </p>
        <div className="flex items-end gap-1 mb-1.5">
          <span className="text-4xl font-bold text-[#0F4C81] tracking-tight">
            ${plan.price[billing].toFixed(2)}
          </span>
          <span className="text-sm text-[#94A3B8] pb-1.5">/mo</span>
        </div>
        {billing === "annual" && (
          <p className="text-[11px] text-[#10B981] font-semibold">
            Billed annually · save ${((plan.price.monthly - plan.price.annual) * 12).toFixed(0)}/yr
          </p>
        )}
        <p className="text-[13px] text-[#64748B] mt-2">{plan.tagline}</p>
      </div>

      <FeatureList features={plan.features} dimmed />

      <button
        onClick={onCta}
        className="mt-6 w-full text-sm font-semibold text-[#0F4C81] border-2 border-[#DBEAFE] px-4 py-3 rounded-xl hover:bg-[#F0F6FF] hover:border-[#BFDBFE] active:scale-[0.98] transition-all"
      >
        {plan.cta}
      </button>
      <p className="text-center text-[11px] text-[#94A3B8] mt-2.5">7-day free trial · No card needed</p>
    </div>
  );
}

function HighlightCard({
  plan,
  billing,
  onCta,
}: {
  plan: Plan;
  billing: "monthly" | "annual";
  onCta: () => void;
}) {
  return (
    <div className="relative flex flex-col bg-[#0F4C81] border-2 border-[#0F4C81] rounded-2xl p-6 sm:p-7 shadow-2xl shadow-blue-900/30 md:-mt-4 md:-mb-4 z-10">
      {/* Badge */}
      {"badge" in plan && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-[#10B981] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md shadow-emerald-900/30 whitespace-nowrap">
            <StarSolidIcon />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-5 mt-2">
        <p className="text-xs font-bold text-[#93C5FD] uppercase tracking-widest mb-1">
          {plan.name}
        </p>
        <div className="flex items-end gap-1 mb-1.5">
          <span className="text-4xl font-bold text-white tracking-tight">
            ${plan.price[billing].toFixed(2)}
          </span>
          <span className="text-sm text-[#93C5FD] pb-1.5">/mo</span>
        </div>
        {billing === "annual" && (
          <p className="text-[11px] text-[#10B981] font-semibold">
            Billed annually · save ${((plan.price.monthly - plan.price.annual) * 12).toFixed(0)}/yr
          </p>
        )}
        <p className="text-[13px] text-[#93C5FD] mt-2">{plan.tagline}</p>
      </div>

      <FeatureList features={plan.features} inverted />

      <button
        onClick={onCta}
        className="mt-6 w-full text-sm font-bold text-white bg-[#10B981] px-4 py-3.5 rounded-xl hover:bg-[#0ea271] active:scale-[0.98] transition-all shadow-lg shadow-emerald-900/30"
      >
        {plan.cta}
      </button>
      <p className="text-center text-[11px] text-[#93C5FD] mt-2.5">7-day free trial · No card needed</p>
    </div>
  );
}

function FeatureList({
  features,
  inverted,
  dimmed,
}: {
  features: readonly { text: string; included: boolean }[];
  inverted?: boolean;
  dimmed?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-2.5 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5">
          {f.included ? (
            <CheckIcon inverted={inverted} />
          ) : (
            <XIcon inverted={inverted} />
          )}
          <span
            className={`text-[13px] leading-snug ${
              f.included
                ? inverted
                  ? "text-white"
                  : "text-[#1E293B]"
                : inverted
                ? "text-[#5b7fa8] line-through"
                : dimmed
                ? "text-[#C0CCDA] line-through"
                : "text-[#C0CCDA] line-through"
            }`}
          >
            {f.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PerkItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-[#F0F6FF] border border-[#DBEAFE] flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-[#0F4C81]">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Auth modal (same as landing) ─────────────────────────────────────────────

function AuthModal({
  open,
  plan,
  onClose,
}: {
  open: boolean;
  plan: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("signup");
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

  const planLabel = PLANS.find((p) => p.id === plan)?.name ?? "Pro";

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
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center gap-4 rounded-2xl">
            <div className="w-12 h-12 rounded-full border-4 border-[#DBEAFE] border-t-[#0F4C81] animate-spin" />
            <p className="text-[13px] font-semibold text-[#0F4C81]">Setting up your account…</p>
          </div>
        )}

        <div className="p-7 sm:p-8 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F0F6FF] border border-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                <PulseIcon />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[#0F4C81] leading-tight">
                  Start {planLabel} — 7 days free
                </h2>
                <p className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">No credit card required</p>
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

          <div className="flex bg-[#F0F6FF] rounded-xl p-1 gap-1">
            {(["signup", "login"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); resetForm(); }}
                className={`flex-1 text-[13px] font-semibold py-2 rounded-lg transition-all ${
                  tab === t ? "bg-white text-[#0F4C81] shadow-sm" : "text-[#94A3B8] hover:text-[#64748B]"
                }`}
              >
                {t === "signup" ? "Sign Up" : "Log In"}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); startAuth(); }} className="flex flex-col gap-3">
            {tab === "signup" && (
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 uppercase tracking-wide">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required className="w-full text-sm text-[#1E293B] placeholder-[#CBD5E1] bg-[#F8FBFF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all" />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full text-sm text-[#1E293B] placeholder-[#CBD5E1] bg-[#F8FBFF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 uppercase tracking-wide">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full text-sm text-[#1E293B] placeholder-[#CBD5E1] bg-[#F8FBFF] border border-[#DBEAFE] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] transition-all" />
            </div>
            <button type="submit" className="w-full text-sm font-semibold text-white bg-[#0F4C81] px-4 py-3 rounded-xl hover:bg-[#0a3a6e] active:scale-[0.98] transition-all shadow-sm shadow-blue-900/20 mt-1">
              {tab === "signup" ? "Create Account" : "Log In"}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#DBEAFE]" />
            <span className="text-[11px] text-[#94A3B8] font-medium">or</span>
            <div className="flex-1 h-px bg-[#DBEAFE]" />
          </div>

          <div className="flex flex-col gap-2.5">
            <button onClick={() => startAuth()} className="w-full flex items-center justify-center gap-3 text-sm font-semibold text-[#1E293B] border border-[#E2E8F0] px-4 py-2.5 rounded-xl hover:bg-[#F8FAFC] active:scale-[0.98] transition-all">
              <GoogleLogo />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckIcon({ inverted }: { inverted?: boolean }) {
  return (
    <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${inverted ? "bg-[#10B981]/20" : "bg-[#D1FAE5]"}`}>
      <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={inverted ? "#10B981" : "#059669"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

function XIcon({ inverted }: { inverted?: boolean }) {
  return (
    <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${inverted ? "bg-white/5" : "bg-[#F1F5F9]"}`}>
      <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke={inverted ? "#5b7fa8" : "#CBD5E1"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#94A3B8"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

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

function ShieldIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StarSolidIcon() {
  return (
    <svg width={10} height={10} viewBox="0 0 24 24" fill="white" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
