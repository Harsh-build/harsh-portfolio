import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Zap,
  Bot,
  User,
  Instagram,
  Mail,
  ChevronDown,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { socialLinks } from "../data";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelUsed?: string;
}

const QUICK_PROMPTS = [
  {
    icon: "🎨",
    label: "High-CTR Thumbnail Idea",
    prompt: "Can you give me 3 high-CTR thumbnail concepts for a YouTube video about productivity hacks?",
  },
  {
    icon: "⚡",
    label: "3-Second Hook Formula",
    prompt: "What are the best visual hooks in the first 3 seconds of a YouTube Short or Reel?",
  },
  {
    icon: "⏱️",
    label: "Turnaround & Workflow",
    prompt: "What is Harsh's video editing workflow and typical delivery time for YouTube videos?",
  },
  {
    icon: "🔊",
    label: "Sound Design Tips",
    prompt: "What sound effects should I layer to make fast-paced edits feel cinematic and punchy?",
  },
  {
    icon: "✍️",
    label: "Thumbnail Text Rules",
    prompt: "How many words should be on a YouTube thumbnail and what font styles convert best?",
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-1",
  role: "assistant",
  content:
    "Hey! I'm **Harsh's Creative Studio Assistant** powered by Gemini. 🎬✨\n\nI can help you with:\n- **High-CTR YouTube Thumbnail concepts** & visual compositions\n- **Video editing pacing, hooks, & sound design** for Shorts & Long-form\n- **Project estimates, workflow questions, & turnaround details**\n\nAsk me anything or pick a quick topic below!",
  timestamp: "Just now",
};

// Intelligent offline/fallback knowledge base for static deployments (e.g. GitHub Pages)
function getSmartFallbackReply(userText: string): string {
  const query = userText.toLowerCase();

  if (query.includes("thumbnail") || query.includes("ctr") || query.includes("cover")) {
    return (
      "Here is Harsh's golden formula for **High-CTR YouTube Thumbnails**:\n\n" +
      "1. **Rule of 3 Elements**: Keep only 3 focal points (Subject face with extreme emotion, primary object, punchy 2-3 word text).\n" +
      "2. **Complementary Contrast**: Use high-contrast color pairs (Orange & Dark Teal, Bright Yellow & Charcoal, Neon Cyan & Deep Black).\n" +
      "3. **3D Depth & Lighting**: Rim lights around the subject to separate them from the background. Soft drop-shadows and subtle inner glows on text.\n" +
      "4. **Mobile Optimization**: 70%+ of viewers see thumbnails on phones. Zoom out to 15% scale in Photoshop to verify readability!\n\n" +
      "💡 *Want Harsh to design custom thumbnails for your channel? Reach out via Instagram DM [@harshig_07](https://www.instagram.com/harshig_07?psln=MTI4Z293MTZpcGN5OA==) or email kumarharsh0720@gmail.com!*"
    );
  }

  if (query.includes("workflow") || query.includes("process") || query.includes("step")) {
    return (
      "Here is Harsh's **5-Stage Video Editing Workflow**:\n\n" +
      "1. **Ingestion & Review**: Organizing footage, syncing audio, and marking the best takes.\n" +
      "2. **Rough Cut & Story Pacing**: Cutting all filler, pauses, and establishing a tight narrative.\n" +
      "3. **Hook & Retention Engineering**: Crafting dynamic visual hooks in the first 3 seconds with kinetic zooms.\n" +
      "4. **Sound Design & Color Grading**: Multi-track audio (whooshes, risers, impacts, sub-drops) and cinematic LUT grading.\n" +
      "5. **Final Polish & 4K Export**: Subtitle animations, motion graphics, and high-bitrate export ready for YouTube/Reels.\n\n" +
      "Includes **2-3 revision rounds** to make sure the final video matches your exact vision!"
    );
  }

  if (query.includes("time") || query.includes("turnaround") || query.includes("how long") || query.includes("delivery")) {
    return (
      "**Turnaround Times by Project Type**:\n\n" +
      "• **Thumbnails**: 24 – 48 Hours\n" +
      "• **YouTube Shorts / Instagram Reels**: 24 – 48 Hours\n" +
      "• **Standard YouTube Videos (8-15 mins)**: 3 – 5 Business Days\n" +
      "• **Urgent / Rush Turnarounds**: Available upon request!\n\n" +
      "Send your footage or brief to Harsh via Instagram [@harshig_07](https://www.instagram.com/harshig_07?psln=MTI4Z293MTZpcGN5OA==) or Email `kumarharsh0720@gmail.com` to lock in your timeline."
    );
  }

  if (query.includes("hook") || query.includes("short") || query.includes("reel") || query.includes("retention")) {
    return (
      "**Top 3 Viral Hook Tactics for Shorts & Reels**:\n\n" +
      "1. **Negative Curiosity**: 'Stop doing [common habit] if you want [desired outcome]'.\n" +
      "2. **Fast Kinetic Motion**: Cut within the first 0.8 seconds (whip-pan or sudden digital punch-in) paired with a high-frequency riser.\n" +
      "3. **Bold Word-by-Word Captions**: Highlight key trigger words in bold yellow/orange to keep the eyes locked on screen.\n" +
      "4. **Visual Disruption**: Show the end result or a shocking clip before going back to the beginning."
    );
  }

  if (query.includes("sound") || query.includes("audio") || query.includes("music") || query.includes("sfx")) {
    return (
      "**Sound Design Architecture for Modern Video Edits**:\n\n" +
      "• **Dialogue/Voiceover**: Mastered at -3dB to -6dB with EQ high-pass filter and crisp compression.\n" +
      "• **Background Music**: Ducked at -18dB to -24dB whenever voice is active.\n" +
      "• **Layered SFX**: Combine a *whoosh* (movement) with a subtle *sub-bass hit* (landing) for transitions.\n" +
      "• **Micro-textures**: Keyboard clacks, paper crinkles, and glitch tones give motion graphics tactile weight."
    );
  }

  if (query.includes("software") || query.includes("tool") || query.includes("premiere") || query.includes("after effects")) {
    return (
      "Harsh uses an industry-standard production suite:\n\n" +
      "• **Adobe Premiere Pro**: High-speed timeline editing and multicam assemblies\n" +
      "• **Adobe After Effects**: Advanced motion graphics, tracking, 3D text & VFX\n" +
      "• **Adobe Photoshop**: Precision thumbnail composition, cutouts & color manipulation\n" +
      "• **DaVinci Resolve**: Studio-grade color correction & HDR grading\n" +
      "• **Adobe Illustrator**: Vector iconography & typography assets"
    );
  }

  return (
    `Thanks for asking! As Harsh's creative assistant, I specialize in video editing pacing, YouTube thumbnail design, and visual hooks.\n\n` +
    `For this specific project, the best approach is to outline your target audience, core video theme, and desired mood.\n\n` +
    `Would you like specific ideas for **Thumbnails**, **Shorts Retention Hooks**, or **Turnaround details**? Or feel free to DM Harsh directly on Instagram [@harshig_07](https://www.instagram.com/harshig_07?psln=MTI4Z293MTZpcGN5OA==)!`
  );
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modelMode, setModelMode] = useState<"flash" | "fast">("flash");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare conversation payload for Gemini
      const payloadMessages = newMessages
        .filter((m) => m.id !== "welcome-1")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      // Call server-side API proxy
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: payloadMessages,
          modelChoice: modelMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || getSmartFallbackReply(text);

      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: data.model || (modelMode === "fast" ? "gemini-3.1-flash-lite" : "gemini-3.5-flash"),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasUnread(true);
    } catch {
      // Graceful fallback for static hosting / offline
      const fallbackReply = getSmartFallbackReply(text);
      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: "Harsh Studio Engine",
      };
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasUnread(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Basic formatting helper for markdown bold and links
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      // Render bullet list
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      // Parse bold segments
      const parts = cleanLine.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

      const parsedLine = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={partIdx} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <a
                key={partIdx}
                href={match[2]}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF6B00] hover:underline font-medium inline-flex items-center gap-0.5"
              >
                {match[1]}
              </a>
            );
          }
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#FF6B00] text-sm mt-0.5">•</span>
            <div className="flex-1">{parsedLine}</div>
          </div>
        );
      }

      if (line.trim() === "") {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="my-1">
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b]/90 border border-zinc-700/80 text-xs text-zinc-300 shadow-xl backdrop-blur-md animate-fade-in pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
            <span>Need thumbnail or video ideas?</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Studio Chatbot"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF5500] via-[#FF6B00] to-[#FF8C00] text-white shadow-xl shadow-[#FF6B00]/30 hover:shadow-[#FF6B00]/50 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/40"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
              {hasUnread && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#09090b] animate-ping" />
              )}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#09090b]" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Video Editing & Thumbnail AI Assistant"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[440px] h-[600px] max-h-[82vh] bg-[#101012]/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#17171a] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF9000] flex items-center justify-center text-white shadow-md shadow-[#FF6B00]/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#17171a]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading text-sm font-bold text-white tracking-wide">
                    Harsh Studio AI
                  </h3>
                  <span className="px-1.5 py-0.2 text-[10px] uppercase font-semibold bg-[#FF6B00]/20 text-[#FF6B00] rounded">
                    Gemini
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Video Editing & Thumbnail Consultant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Model toggle */}
              <button
                onClick={() => setModelMode(modelMode === "flash" ? "fast" : "flash")}
                title={modelMode === "flash" ? "Mode: Gemini 3.5 Flash (Balanced)" : "Mode: Gemini 3.1 Flash-Lite (Fast)"}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
              >
                <Zap className={`w-3 h-3 ${modelMode === "fast" ? "text-amber-400" : "text-[#FF6B00]"}`} />
                <span>{modelMode === "fast" ? "Fast" : "Flash"}</span>
              </button>

              {/* Clear chat */}
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      isUser
                        ? "bg-zinc-700 text-zinc-200"
                        : "bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40"
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-[#FF6B00] text-white rounded-tr-none font-sans"
                        : "bg-[#18181b] border border-zinc-800/80 text-zinc-300 rounded-tl-none font-sans"
                    }`}
                  >
                    <div>{renderFormattedContent(message.content)}</div>

                    {/* Metadata & Actions for Assistant messages */}
                    <div
                      className={`mt-2 pt-1 flex items-center justify-between text-[10px] ${
                        isUser ? "text-orange-200/70" : "text-zinc-500 border-t border-zinc-800/60"
                      }`}
                    >
                      <span>{message.timestamp}</span>

                      {!isUser && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(message.id, message.content)}
                            className="hover:text-zinc-300 flex items-center gap-0.5 transition-colors p-0.5"
                            title="Copy reply"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#18181b] border border-zinc-800/80 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-bounce" />
                  <span className="text-[11px] text-zinc-400 ml-2 font-mono">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-3 py-2 bg-[#141416] border-t border-zinc-800/70">
              <div className="flex items-center gap-1 text-[11px] text-zinc-400 mb-1.5 px-1 font-medium">
                <Lightbulb className="w-3 h-3 text-[#FF6B00]" />
                <span>Quick Questions:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qp.prompt)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/60 text-[11px] text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>{qp.icon}</span>
                    <span>{qp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Direct CTA Bar */}
          <div className="px-3 py-1.5 bg-[#121214] border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Ready to start a project?</span>
            <div className="flex items-center gap-2">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#FF6B00] hover:text-[#FF8800] font-medium"
              >
                <Instagram className="w-3 h-3" />
                <span>DM Harsh</span>
              </a>
              <span className="text-zinc-600">•</span>
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#17171a] border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2 bg-[#0e0e10] border border-zinc-700/80 rounded-xl p-2 focus-within:border-[#FF6B00] focus-within:ring-1 focus-within:ring-[#FF6B00]/40 transition-all"
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about thumbnails, editing pacing, workflow..."
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none max-h-24 min-h-[22px] leading-relaxed"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="w-8 h-8 rounded-lg bg-[#FF6B00] hover:bg-[#FF7700] disabled:bg-zinc-800 disabled:text-zinc-600 text-white flex items-center justify-center flex-shrink-0 transition-colors"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500 px-1">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span>Gemini 3.5 & Harsh Studio</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
