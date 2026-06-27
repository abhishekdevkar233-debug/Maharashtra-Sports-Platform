import { useState, useRef, useEffect } from "react";
import {
  MessageCircle, X, Send, Bot, User, Sparkles,
  ChevronDown, RotateCcw, ThumbsUp, ThumbsDown,
} from "lucide-react";

const PRIMARY = "#363092";
const ACCENT  = "#FF6B35";

/* ── Knowledge base — Marathi ── */
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/शिष्यवृत्ती|scholarship|schol|आर्थिक.*मदत|sports.*fund/i],
    answer: "महाराष्ट्र शासन खालील क्रीडा शिष्यवृत्त्या देते:\n• **शिव छत्रपती शिष्यवृत्ती** — प्रतिवर्ष ₹२ लाख (उच्च दर्जाच्या खेळाडूंसाठी)\n• **कनिष्ठ प्रतिभा शिष्यवृत्ती** — प्रतिवर्ष ₹५० हजार (१८ वर्षांखालील खेळाडूंसाठी)\n• **महिला क्रीडा शिष्यवृत्ती** — प्रतिवर्ष ₹७५ हजार (महिला खेळाडूंसाठी)\n\nया पोर्टलवरील **योजना** विभागात अर्ज करा.",
  },
  {
    patterns: [/स्पर्धा|event|tournament|competition|upcoming|कार्यक्रम|येणारे/i],
    answer: "आगामी क्रीडा स्पर्धा:\n• **खेलो इंडिया युवा क्रीडा स्पर्धा २०२६** — ऑगस्ट २०२६, पुणे\n• **राज्य कुस्ती अजिंक्यपद** — जुलै २०२६, नाशिक\n• **महाराष्ट्र ॲथलेटिक्स ओपन** — सप्टेंबर २०२६, मुंबई\n\nसर्व स्पर्धांसाठी **क्रीडा दिनदर्शिका** पहा.",
  },
  {
    patterns: [/नोंदणी|register|registration|कसे.*सामील|enroll/i],
    answer: "तुम्ही खालीलप्रमाणे नोंदणी करू शकता:\n• **खेळाडू / प्रशिक्षक** — नोंदणी → खेळाडू आणि प्रशिक्षक\n• **क्रीडा अकादमी** — नोंदणी → संस्था\n• **युवा क्लब** — नोंदणी → युवा क्लब\n\nसुरुवात करण्यासाठी वरील मेनूमधील **नोंदणी** वर क्लिक करा.",
  },
  {
    patterns: [/वसतिगृह|hostel|accommodation|निवास/i],
    answer: "महाराष्ट्रात खेळाडूंसाठी वसतिगृहे:\n• **शिव छत्रपती क्रीडा संकुल, पुणे** — २४० जागा\n• **बालेवाडी क्रीडा संकुल** — १२० जागा\n• **नागपूर इनडोअर स्टेडियम** — ८० जागा\n\nअर्जासाठी **वसतिगृह योजना** पृष्ठ पहा.",
  },
  {
    patterns: [/मैदान|venue|stadium|facility|ground|arena|स्टेडियम|सुविधा/i],
    answer: "महाराष्ट्रातील प्रमुख क्रीडा मैदाने:\n• **शिव छत्रपती क्रीडा संकुल** — पुणे\n• **वानखेडे स्टेडियम** — मुंबई (क्रिकेट)\n• **बालेवाडी क्रीडा संकुल** — पुणे\n• **विदर्भ क्रिकेट असोसिएशन** — नागपूर\n\n**पायाभूत सुविधा** पृष्ठावर ४८६+ सुविधा पहा.",
  },
  {
    patterns: [/संपर्क|contact|helpline|phone|email|office|कार्यालय/i],
    answer: "**क्रीडा व युवक सेवा संचालनालय**\n📍 क्रीडा भवन, पुणे, महाराष्ट्र\n📞 +91 20 2612 3456\n✉️ contact@sports.maharashtra.gov.in\n🕐 सोम–शनि, सकाळी १०:०० – सायं ५:३०",
  },
  {
    patterns: [/जिल्हा|district|पुणे|नाशिक|नागपूर|मुंबई|औरंगाबाद|कोल्हापूर/i],
    answer: "महाराष्ट्रात ३६ जिल्हा क्रीडा कार्यालये आहेत.\n\nप्रत्येक जिल्ह्याचे स्वतःचे क्रीडा पोर्टल आहे — **पायाभूत सुविधा** मेनूमधील **जिल्हा संकेतस्थळे** येथे उपलब्ध आहे.\n\nपुणे जिल्ह्यासाठी **पुणे क्रीडा पोर्टल** थेट भेट द्या.",
  },
  {
    patterns: [/पुरस्कार|award|शिव छत्रपती|recognition|सन्मान/i],
    answer: "**शिव छत्रपती क्रीडा पुरस्कार** हा महाराष्ट्राचा सर्वोच्च क्रीडा सन्मान आहे.\n\nगट:\n• सर्वोत्कृष्ट ज्येष्ठ खेळाडू (पुरुष/महिला)\n• सर्वोत्कृष्ट कनिष्ठ खेळाडू (पुरुष/महिला)\n• सर्वोत्कृष्ट प्रशिक्षक\n• जीवनगौरव पुरस्कार\n\n२०२६-२७ साठी नामांकने ३१ जुलै २०२६ पर्यंत खुली आहेत.",
  },
  {
    patterns: [/प्रशिक्षण|coach|training|academy|अकादमी/i],
    answer: "महाराष्ट्रात ४७ NIS संलग्न क्रीडा अकादमी आहेत.\n\n**प्रशिक्षण कार्यक्रम:**\n• NIS प्रशिक्षक प्रमाणपत्र (१,२०० जागा)\n• जिल्हास्तरीय प्रशिक्षण शिबिरे\n• SAI भागीदारीत ऑनलाइन प्रशिक्षण मॉड्यूल\n\nतपशीलांसाठी **क्रीडा अकादमी** विभाग पहा.",
  },
  {
    patterns: [/खेलो इंडिया|khelo india/i],
    answer: "महाराष्ट्र **खेलो इंडिया युवा क्रीडा स्पर्धा २०२६** मध्ये विक्रमी ४२८ खेळाडूंसह २७ खेळ प्रकारांत सहभागी होत आहे.\n\nसंघाची निवड मार्च-एप्रिल २०२६ मध्ये जिल्हास्तरीय चाचण्यांद्वारे झाली.\n\nताज्या बातम्यांसाठी **मीडिया सेंटर → बातम्या** पहा.",
  },
  {
    patterns: [/नमस्कार|नमस्ते|hello|hi|hey|namaste|namaskar/i],
    answer: "नमस्कार! 🙏 मी **क्रीडा सहाय्यक** आहे — महाराष्ट्र क्रीडा व युवक सेवा विभागाचा डिजिटल मदतनीस.\n\nमी तुम्हाला खालील बाबतीत मदत करू शकतो:\n• शिष्यवृत्ती व योजना\n• आगामी स्पर्धा\n• नोंदणी\n• क्रीडा मैदाने\n• जिल्हा कार्यालये\n• पुरस्कार व यश\n\nतुम्हाला काय जाणून घ्यायचे आहे?",
  },
  {
    patterns: [/धन्यवाद|thank|thanks/i],
    answer: "धन्यवाद! 🏆 महाराष्ट्र क्रीडा विभागाशी संबंधित इतर काही जाणून घ्यायचे आहे का?",
  },
];

const QUICK_CHIPS = [
  "क्रीडा शिष्यवृत्ती",
  "आगामी स्पर्धा",
  "खेळाडू नोंदणी",
  "क्रीडा मैदाने",
  "कार्यालय संपर्क",
  "खेलो इंडिया २०२६",
];

function findAnswer(input: string): string {
  const match = KB.find(k => k.patterns.some(p => p.test(input)));
  return match?.answer ?? "मला याबद्दल निश्चित माहिती नाही. कृपया **contact@sports.maharashtra.gov.in** वर संपर्क करा किंवा **+91 20 2612 3456** वर फोन करा.\n\nतुम्ही वरील मेनू वापरून पोर्टल ब्राउज करू शकता.";
}

function formatMessage(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={j}>{part.slice(2, -2)}</strong>
        : part
    );
    return <p key={i} className={line === "" ? "h-2" : ""}>{parts}</p>;
  });
}

type Msg = { role: "user" | "bot"; text: string; ts: string };

function getTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function AIChatbot() {
  const [open, setOpen]     = useState(false);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const [minimised, setMin] = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([
    {
      role: "bot",
      text: "नमस्कार! 🙏 मी **क्रीडा सहाय्यक** आहे.\n\nशिष्यवृत्ती, स्पर्धा, नोंदणी, मैदाने किंवा महाराष्ट्र क्रीडा विभागाबद्दल काहीही विचारा!",
      ts: getTime(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text: q, ts: getTime() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "bot", text: findAnswer(q), ts: getTime() }]);
    }, 800 + Math.random() * 600);
  }

  function reset() {
    setMsgs([{
      role: "bot",
      text: "संभाषण साफ केले. महाराष्ट्र क्रीडा विभागाबद्दल मी तुम्हाला कशी मदत करू?",
      ts: getTime(),
    }]);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(o => !o); setMin(false); }}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: `linear-gradient(135deg, ${PRIMARY}, #1e2a7a)` }}
        title="क्रीडा सहाय्यकाशी बोला"
      >
        {open
          ? <X className="h-6 w-6 text-white" />
          : <MessageCircle className="h-6 w-6 text-white" />
        }
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[9998] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          style={{ width: 360, height: minimised ? "auto" : 520, background: "#F9FAFB" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, #1e2a7a)` }}>
            <div className="h-9 w-9 rounded-xl grid place-items-center bg-white/15 shrink-0">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                क्रीडा सहाय्यक
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
              </div>
              <div className="text-[10px] text-white/65">महाराष्ट्र क्रीडा व युवक सेवा विभाग</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reset} title="संभाषण साफ करा"
                className="h-7 w-7 rounded-lg grid place-items-center text-white/60 hover:text-white hover:bg-white/15 transition">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setMin(m => !m)} title="लहान करा"
                className="h-7 w-7 rounded-lg grid place-items-center text-white/60 hover:text-white hover:bg-white/15 transition">
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${minimised ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`h-7 w-7 rounded-full grid place-items-center shrink-0 mt-0.5
                      ${m.role === "bot" ? "text-white" : "bg-gray-200 text-gray-600"}`}
                      style={m.role === "bot" ? { background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` } : {}}>
                      {m.role === "bot" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed space-y-0.5
                      ${m.role === "user"
                        ? "text-white rounded-tr-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"}`}
                      style={m.role === "user" ? { background: `linear-gradient(135deg, ${PRIMARY}, #1e2a7a)` } : {}}>
                      {formatMessage(m.text)}
                      <div className={`text-[10px] mt-1 ${m.role === "user" ? "text-white/50 text-right" : "text-gray-400"}`}>
                        {m.ts}
                      </div>
                      {m.role === "bot" && (
                        <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-gray-100">
                          <span className="text-[10px] text-gray-400">उपयुक्त होते का?</span>
                          <button className="h-5 w-5 rounded grid place-items-center text-gray-300 hover:text-green-500 transition"><ThumbsUp className="h-3 w-3" /></button>
                          <button className="h-5 w-5 rounded grid place-items-center text-gray-300 hover:text-red-400 transition"><ThumbsDown className="h-3 w-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2.5">
                    <div className="h-7 w-7 rounded-full grid place-items-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` }}>
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                      {[0,1,2].map(i => (
                        <span key={i} className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips */}
              {msgs.length <= 2 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {QUICK_CHIPS.map(c => (
                    <button key={c} onClick={() => send(c)}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold border border-gray-200 bg-white text-gray-600 hover:border-[#363092] hover:text-[#363092] transition whitespace-nowrap">
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 shrink-0 bg-white border-t border-gray-100">
                <form onSubmit={e => { e.preventDefault(); send(input); }}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#363092] focus-within:ring-2 focus-within:ring-[#363092]/10 transition">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="शिष्यवृत्ती, स्पर्धा याबद्दल विचारा…"
                    className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
                  />
                  <button type="submit" disabled={!input.trim() || typing}
                    className="h-7 w-7 rounded-lg grid place-items-center text-white disabled:opacity-40 transition shrink-0"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY}, #1e2a7a)` }}>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  क्रीडा सहाय्यक · महाराष्ट्र शासन
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
