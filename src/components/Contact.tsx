import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Send, Clock, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { showToast } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      return showToast('Please complete all required contact fields', 'error');
    }
    setLoading(true);
    try {
      const msg = await api.sendContactMsg({ name, email, phone, message });
      showToast(msg, 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      showToast(err.message || 'Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F9F9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="bg-[#5D9906]/10 text-[#5D9906] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#5D9906]/30">
            BAMORA Concierge
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-stone-900">
            Get in <span className="text-[#5D9906]">Touch</span>
          </h2>
          <p className="text-stone-600 text-base">
            Have questions about custom corporate sock orders or bamboo yarn science? Our concierge team is available 24/7.
          </p>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: CONTACT DETAILS & MAP */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5D9906]/10 text-[#5D9906] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-stone-900">Flagship Headquarters</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    42 Bamboo Grove Way, Indiranagar, Bengaluru, Karnataka 560001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5D9906]/10 text-[#5D9906] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-stone-900">Concierge Email</h4>
                  <p className="text-xs text-[#5D9906] font-bold mt-1">support@bamora.com</p>
                  <p className="text-[11px] text-stone-500">Average response time: 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5D9906]/10 text-[#5D9906] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-stone-900">VIP Phone & WhatsApp</h4>
                  <p className="text-xs text-[#D8B26E] font-bold mt-1">+91 98765 43210</p>
                  <p className="text-[11px] text-stone-500">Mon - Sat (9:00 AM - 8:00 PM)</p>
                </div>
              </div>

              {/* WHATSAPP CTA */}
              <a
                href="https://wa.me/919876543210?text=Hi%20BAMORA%20Team!"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Chat Instantly on WhatsApp
              </a>

            </div>

            {/* SIMULATED GOOGLE MAP PLACEHOLDER */}
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel border border-stone-200 shadow-md">
              <iframe
                title="BAMORA Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9868770732386!2d77.641154514822!3d12.97262079085523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a718712345%3A0x6b123456789abcdef!2sIndiranagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale opacity-90 hover:grayscale-0 transition-all"
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="font-heading font-black text-2xl text-stone-900">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-stone-500">
                  Fill in your details below and our bamboo textile specialists will contact you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3.5 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3.5 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                />

                <textarea
                  placeholder="How can BAMORA help your feet today? *"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" /> {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
