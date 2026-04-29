"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  typewriter?: boolean;
};

const SUGGESTIONS = [
  "What are symptoms of high blood pressure?",
  "How much water should I drink daily?",
  "What can cause lower back pain?",
  "When should I see a doctor for a fever?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "ai", text: "Hi! I'm your AI health assistant. Ask me any healthcare question — I'm here to help." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", text: data.message, typewriter: true },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", text: "Sorry, something went wrong. Please try again.", typewriter: true },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[#F0F6FF] text-[#1E293B] font-sans">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 flex flex-col bg-white border-r border-[#DBEAFE] shadow-sm
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-[#DBEAFE] flex-shrink-0">
          <a href="/" className="flex items-center gap-2.5">
            <PulseIcon />
            <div>
              <p className="text-[13px] font-bold text-[#0F4C81] leading-tight tracking-tight">
                The Waiting Room
              </p>
              <p className="text-[10px] text-[#94A3B8] leading-tight font-medium tracking-wide">
                AI Health Assistant
              </p>
            </div>
          </a>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#94A3B8] hover:text-[#475569] transition-colors p-1 rounded-lg hover:bg-[#F0F6FF]"
            aria-label="Close sidebar"
          >
            <XIcon />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3 pt-4 pb-1 flex-shrink-0">
          <button
            onClick={() => {
              setMessages([{ id: 0, role: "ai", text: "Hi! I'm your AI health assistant. Ask me any healthcare question — I'm here to help." }]);
              setInput("");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#0F4C81] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0a3a6e] active:scale-[0.98] transition-all shadow-sm shadow-blue-900/20"
          >
            <PlusIcon />
            New Chat
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto pb-2">
          <SidebarSection label="Conversations" />
          <SidebarButton icon={<HistoryIcon />} label="Chat History" />
          <SidebarButton icon={<UserProfileIcon />} label="My Health Profile" />

          <SidebarSection label="Account" />
          <SidebarButton icon={<CrownIcon />} label="Membership" badge="Upgrade" />
          <SidebarButton icon={<HeadsetIcon />} label="Contact Us" />

          <SidebarSection label="Preferences" />
          <SidebarButton icon={<ShieldIcon />} label="Privacy & Data" />
          <SidebarButton icon={<SettingsIcon />} label="Settings" />
        </nav>

        {/* User card + sign in */}
        <div className="flex-shrink-0 border-t border-[#DBEAFE] px-3 py-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#F8FBFF] border border-[#E8F2FC]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center flex-shrink-0 border border-[#BFDBFE]">
              <span className="text-xs font-bold text-[#0F4C81]">G</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-[#1E293B] truncate">Guest User</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
                <span className="text-[10px] text-[#64748B] font-medium">Active session</span>
              </div>
            </div>
          </div>
          <a
            href="/"
            className="mt-1.5 flex items-center gap-2.5 text-[13px] font-medium text-[#64748B] hover:text-[#0F4C81] hover:bg-[#F0F6FF] px-3 py-2 rounded-xl transition-colors group"
          >
            <span className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors">
              <LoginIcon />
            </span>
            Sign In / Sign Up
          </a>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 h-[60px] bg-white border-b border-[#DBEAFE] shadow-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#0F4C81] hover:text-[#0a3a6e] transition-colors p-1 rounded-lg hover:bg-[#F0F6FF]"
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#0F4C81] leading-tight">AI Health Chat</p>
            <p className="text-[11px] text-[#94A3B8] leading-tight mt-0.5 font-medium">Medical information assistant</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-wide">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">

          {/* Date separator */}
          <div className="flex items-center gap-3 mb-1">
            <div className="flex-1 h-px bg-[#DBEAFE]" />
            <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest select-none">
              Today
            </span>
            <div className="flex-1 h-px bg-[#DBEAFE]" />
          </div>

          {messages.map((msg) => (
            <ChatBubble key={msg.id} role={msg.role} text={msg.text} typewriter={msg.typewriter} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && !isTyping && (
          <div className="px-6 pb-3">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest text-center mb-3 select-none">
              Try asking
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="group text-left text-[13px] text-[#0F4C81] bg-white border border-[#DBEAFE] rounded-xl px-4 py-3 hover:bg-[#F0F6FF] hover:border-[#BFDBFE] transition-all flex items-center justify-between gap-3"
                >
                  <span className="leading-snug">{s}</span>
                  <span className="text-[#BFDBFE] group-hover:text-[#0F4C81] transition-colors flex-shrink-0">
                    <ChevronRightIcon />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-6 pb-5 flex-shrink-0">
          <div className="bg-white border border-[#DBEAFE] rounded-2xl shadow-sm overflow-hidden focus-within:border-[#BFDBFE] focus-within:shadow-md transition-shadow">
            <div className="flex items-end gap-3 px-4 pt-3.5 pb-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a health question…"
                className="flex-1 resize-none text-sm text-[#1E293B] placeholder-[#94A3B8] outline-none bg-transparent leading-relaxed max-h-40"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0F4C81] text-white flex items-center justify-center hover:bg-[#0a3a6e] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-blue-900/20"
                aria-label="Send"
              >
                <SendIcon />
              </button>
            </div>
            <div className="flex items-center justify-between px-4 pb-2.5">
              <p className="text-[11px] text-[#B8C8D8]">Not a substitute for professional medical advice</p>
              <span className="text-[11px] text-[#CBD5E1] font-medium select-none">⇧↵ new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar components ───────────────────────────────────────────────────────

function SidebarSection({ label }: { label: string }) {
  return (
    <p className="px-3 pt-5 pb-1.5 text-[10px] font-bold text-[#B8C8D8] uppercase tracking-widest select-none">
      {label}
    </p>
  );
}

function SidebarButton({
  icon,
  label,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button className="relative w-full flex items-center gap-3 text-[13px] font-medium text-[#64748B] hover:text-[#0F4C81] hover:bg-[#F0F6FF] px-3 py-2.5 rounded-xl transition-all duration-150 group overflow-hidden">
      <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#0F4C81] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
      <span className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors flex-shrink-0">
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="text-[10px] bg-[#10B981] text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Chat components ──────────────────────────────────────────────────────────

function ChatBubble({
  role,
  text,
  typewriter,
}: {
  role: "user" | "ai";
  text: string;
  typewriter?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse animate-slide-in-right" : "flex-row animate-slide-in-left"}`}>
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold shadow-sm ${
          isUser ? "bg-[#0F4C81] text-white" : "bg-[#10B981] text-white"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[#0F4C81] text-white rounded-tr-sm shadow-sm shadow-blue-900/15"
            : "bg-white text-[#1E293B] rounded-tl-sm border border-[#DBEAFE] shadow-sm"
        }`}
      >
        {isUser ? text : <AIMarkdown text={text} animate={typewriter} />}
      </div>
    </div>
  );
}

function AIMarkdown({ text, animate }: { text: string; animate?: boolean }) {
  return (
    <div className={`ai-message ${animate ? "animate-fade-scale-in" : ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 flex-row animate-fade-scale-in">
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold bg-[#10B981] text-white shadow-sm">
        AI
      </div>
      <div className="bg-white border border-[#DBEAFE] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
        <span className="typing-dot w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
      </div>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function PulseIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function UserProfileIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <line x1="5" y1="20" x2="19" y2="20" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
