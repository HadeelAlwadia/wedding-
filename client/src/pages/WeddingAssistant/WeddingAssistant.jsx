import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Wallet,
  Users,
  Heart,
} from "lucide-react";

const WeddingAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "مرحبًا بكِ في زَفَاف 🤍 أنا مساعدك الخاص لتخطيط زفافك.",
    },
    {
      id: 2,
      type: "bot",
      text: "سأساعدك في اختيار الخدمات المناسبة حسب ميزانيتك وذوقك. لنبدأ، كم تبلغ ميزانية زفافك تقريبًا؟",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text: "رائع 🤍 أخبرتيني بميزانيتك. الآن أخبريني كم عدد المدعوين المتوقع؟",
        },
      ]);
    }, 700);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] px-4 py-8 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f8eee7] text-[#6B3038]">
            <Sparkles size={30} />
          </div>

          <h1 className="text-3xl font-bold text-[#2d2424] md:text-4xl">
            مساعد زَفَاف
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500 md:text-base">
            أخبريني عن زفافك، وسأساعدك في اختيار الخدمات المناسبة
            لميزانيتك وذوقك.
          </p>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Chat */}
          <div className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-sm">
            {/* Chat Header */}
            <div className="flex items-center gap-4 border-b border-[#eee2dc] p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B3038] text-white">
                <Bot size={23} />
              </div>

              <div>
                <h2 className="font-bold text-[#2d2424]">
                  مساعد زَفَاف
                </h2>

                <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  متصل الآن
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto bg-[#fffaf5] p-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.type === "user"
                        ? "rounded-tr-sm bg-[#6B3038] text-white"
                        : "rounded-tl-sm bg-white text-[#2d2424] shadow-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-[#eee2dc] bg-white p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="اكتبي رسالتك..."
                  className="flex-1 rounded-2xl border border-[#eadbd1] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#6B3038]"
                />

                <button
                  onClick={handleSend}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6B3038] text-white transition hover:bg-[#55252c]"
                >
                  <Send size={19} />
                </button>
              </div>
            </div>
          </div>

          {/* Wedding Plan */}
          <div className="space-y-5">
            {/* Budget */}
            <div className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
                  <Wallet size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-[#2d2424]">
                    ميزانية الزفاف
                  </h3>

                  <p className="text-xs text-gray-400">
                    سيتم تحديدها أثناء المحادثة
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#fffaf5] p-5 text-center">
                <p className="text-xs text-gray-400">
                  الميزانية الحالية
                </p>

                <p className="mt-2 text-2xl font-bold text-[#6B3038]">
                  -- ₪
                </p>
              </div>
            </div>

            {/* Guests */}
            <div className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
                  <Users size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-[#2d2424]">
                    عدد المدعوين
                  </h3>

                  <p className="text-xs text-gray-400">
                    لم يتم تحديده بعد
                  </p>
                </div>
              </div>
            </div>

            {/* Wedding Look */}
            <div className="rounded-3xl border border-[#eadbd1] bg-[#6B3038] p-5 text-white shadow-sm">
              <Heart size={24} />

              <h3 className="mt-4 font-bold">
                إطلالتي
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/75">
                اختاري فستانك وباقي تفاصيل إطلالتك وشاهديها
                مجتمعة في مكان واحد.
              </p>

              <button
                className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#6B3038] transition hover:bg-[#f8eee7]"
              >
                تصميم إطلالتي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingAssistant;