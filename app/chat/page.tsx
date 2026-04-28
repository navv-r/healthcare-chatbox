"use client";
import { useState, useRef, useEffect } from "react";

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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "ai",
          text: "Thanks for your question. This is a demo — real AI responses coming soon!",
          typewriter: true,
        },
      ]);
    }, 1600);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F6FF] text-[#1E293B] font-sans flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#DBEAFE]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <PulseIcon />
            <span className="text-lg font-semibold text-[#0F4C81] tracking-tight">
              The Waiting Room
            </span>
          </a>
          <span className="inline-flex items-center gap-2 bg-[#DBEAFE] text-[#0F4C81] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Guest Session
          </span>
        </div>
      </nav>

      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6 gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} role={msg.role} text={msg.text} typewriter={msg.typewriter} />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && !isTyping && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-left text-sm text-[#0F4C81] bg-white border border-[#DBEAFE] rounded-xl px-4 py-3 hover:bg-[#DBEAFE] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="bg-white border border-[#DBEAFE] rounded-2xl shadow-sm flex items-end gap-3 px-4 py-3">
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
            className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0F4C81] text-white flex items-center justify-center hover:bg-[#0a3a6e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </div>

        <p className="text-center text-xs text-[#94A3B8]">
          For informational purposes only — not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}

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
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
          isUser ? "bg-[#0F4C81] text-white" : "bg-[#10B981] text-white"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[#0F4C81] text-white rounded-tr-sm"
            : "bg-white text-[#1E293B] rounded-tl-sm border border-[#DBEAFE]"
        }`}
      >
        {typewriter ? <TypewriterText text={text} /> : text}
      </div>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-3.5 bg-[#10B981] ml-0.5 align-middle animate-pulse rounded-sm" />
      )}
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 flex-row animate-fade-scale-in">
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-[#10B981] text-white">
        AI
      </div>
      <div className="bg-white border border-[#DBEAFE] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#94A3B8] inline-block" />
      </div>
    </div>
  );
}

function PulseIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
