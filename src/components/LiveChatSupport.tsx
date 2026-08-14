import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const LiveChatSupport: React.FC = () => {
  const { isChatOpen, setChatOpen } = useStore();
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Hello! I am your BAMORA Concierge. How can I help you choose the perfect bamboo socks today?' }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      let reply = 'Thank you for contacting BAMORA Concierge! Our bamboo socks are 3X softer than cotton and 100% odour-free. Free express shipping is active on orders above ₹999.';
      if (userMsg.toLowerCase().includes('size') || userMsg.toLowerCase().includes('fit')) {
        reply = 'BAMORA socks fit true to standard US/UK shoe sizes. Medium fits US 8-10 and Large fits US 11-13.';
      } else if (userMsg.toLowerCase().includes('wash') || userMsg.toLowerCase().includes('care')) {
        reply = 'Wash in cold water (30°C) on a gentle cycle. Air dry in shade to keep bamboo fibers cloud-soft!';
      } else if (userMsg.toLowerCase().includes('discount') || userMsg.toLowerCase().includes('coupon')) {
        reply = 'Use code BAMORA20 for 20% OFF or WELCOME10 for flat ₹150 off your first order!';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm glass-panel-dark rounded-3xl shadow-2xl border border-[#5D9906]/40 overflow-hidden text-white bg-[#222222]">
        
        {/* CHAT HEADER */}
        <div className="p-4 bg-[#5D9906] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D8F05A] text-[#222222] font-black flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">BAMORA Concierge AI</h4>
              <p className="text-[10px] text-stone-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D8F05A] animate-ping"></span> Live Assistant
              </p>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} className="p-1 text-white hover:bg-[#467304] rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CHAT BODY */}
        <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <Bot className="w-4 h-4 text-[#D8F05A] mt-1 shrink-0" />
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#5D9906] text-white rounded-tr-none'
                    : 'bg-stone-800 text-stone-200 rounded-tl-none border border-stone-700'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* CHAT INPUT */}
        <form onSubmit={handleSend} className="p-3 border-t border-stone-800 flex gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-[#D8F05A]"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-[#5D9906] hover:bg-[#467304] text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </AnimatePresence>
  );
};
