import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User as UserIcon,
  LogOut,
  Package,
  Shield,
  Mail,
  Lock,
  Phone,
  KeyRound,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  LayoutDashboard
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { api } from '../services/api';

export const UserAccountModal: React.FC = () => {
  const { user, isAuthOpen, setAuthOpen, setUser, logout, showToast, setAdminDashboardOpen } = useStore();
  const [isLoginView, setIsLoginView] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // OTP Verification State
  const [registrationStep, setRegistrationStep] = useState<'details' | 'otp'>('details');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  // STEP 1: Request OTP during sign up
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return showToast('Please enter your name, email and password', 'error');
    }

    setLoading(true);
    try {
      const res = await api.sendOtp(email, phone);
      setRegistrationStep('otp');
      showToast(res.message || `Verification OTP sent to your email (${email}).`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Could not send OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP & Complete Registration
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      return showToast('Please enter a valid 6-digit OTP code', 'error');
    }

    setLoading(true);
    try {
      await api.verifyOtp(email, otpCode);
      const res = await api.register(name, email, password, phone);
      setUser(res.user, res.token);
      showToast(`Account verified! Welcome to BAMORA™, ${res.user.name}!`, 'success');
      setAuthOpen(false);
      setRegistrationStep('details');
      setOtpCode('');
    } catch (err: any) {
      showToast(err.message || 'OTP verification failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Standard Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login(email, password);
      setUser(res.user, res.token);
      showToast((res as any).message || `Welcome back, ${res.user.name}!`, 'success');
      
      if (res.user.role === 'admin') {
        setAdminDashboardOpen(true);
      }
      setAuthOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md glass-panel rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-[#F9F9F5] p-6 sm:p-8 my-8"
        >
          <button
            onClick={() => setAuthOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {user ? (
            /* LOGGED IN ACCOUNT PROFILE VIEW */
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-stone-200 pb-6">
                <div className={`w-14 h-14 rounded-full text-white font-black text-2xl flex items-center justify-center shadow-lg ${
                  user.role === 'admin'
                    ? 'bg-gradient-to-br from-[#222222] to-[#D8B26E] text-[#D8F05A] border-2 border-[#D8F05A]'
                    : 'bg-gradient-to-br from-[#5D9906] to-[#222222] text-[#D8F05A]'
                }`}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-xl text-stone-900">{user.name}</h3>
                    {user.role === 'admin' && (
                      <span className="bg-[#222222] text-[#D8F05A] border border-[#D8F05A]/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">{user.email}</p>
                  <span className="inline-block mt-1 bg-[#5D9906]/10 text-[#5D9906] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#5D9906]/20">
                    {user.role === 'admin' ? 'Master Executive Control' : 'VIP Bamboo Circle Member'}
                  </span>
                </div>
              </div>

              {/* ADMIN CONTROL HUB LAUNCH BUTTON */}
              {user.role === 'admin' && (
                <button
                  onClick={() => { setAuthOpen(false); setAdminDashboardOpen(true); }}
                  className="w-full bg-[#222222] hover:bg-black text-[#D8F05A] font-extrabold text-xs py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl border border-[#D8F05A]/40 transition-all hover:scale-[1.01]"
                >
                  <LayoutDashboard className="w-5 h-5 text-[#D8F05A]" /> Launch Admin Control Center & Revenue Stats
                </button>
              )}

              <div className="space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase text-stone-500 tracking-wider">
                  Account Management
                </h4>

                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                    <Package className="w-4 h-4 text-[#5D9906]" /> Active Orders & History
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Track your shipped orders or review past order invoices.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                    <Shield className="w-4 h-4 text-[#D8B26E]" /> Saved Delivery Addresses
                  </div>
                  <p className="text-[11px] text-stone-500">
                    42 Bamboo Grove Way, Bengaluru, Karnataka, 560001
                  </p>
                </div>
              </div>

              <button
                onClick={() => { logout(); setAuthOpen(false); }}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-red-200"
              >
                <LogOut className="w-4 h-4" /> Log Out of BAMORA™
              </button>
            </div>
          ) : (
            /* LOGIN / REGISTER WITH OTP FORM */
            <div className="space-y-6">
              
              {/* FORM HEADER */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-[#5D9906]/10 text-[#5D9906] flex items-center justify-center mx-auto mb-2">
                  <UserIcon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-2xl text-stone-900">
                  {isLoginView
                    ? 'Sign In to BAMORA™'
                    : registrationStep === 'details'
                    ? 'Join BAMORA™ Circle'
                    : 'Verify Your Phone / Email'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isLoginView
                    ? 'Enter your account credentials to sign in'
                    : registrationStep === 'details'
                    ? 'Step 1: Enter details to receive 6-digit OTP'
                    : `Step 2: Enter 6-digit OTP code sent to ${email}`}
                </p>
              </div>

              {/* LOGIN FORM */}
              {isLoginView ? (
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Email Address (e.g. admin@bamora.com)"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition-all"
                  >
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>
              ) : (
                /* REGISTRATION WITH OTP VERIFICATION */
                <div>
                  {registrationStep === 'details' ? (
                    <form onSubmit={handleRequestOtp} className="space-y-3">
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Full Name *"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          placeholder="Email Address *"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="Mobile Number (for OTP SMS verification)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                        />
                      </div>

                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          placeholder="Create Password *"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <KeyRound className="w-4 h-4" /> {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                      </button>
                    </form>
                  ) : (
                    /* STEP 2: ENTER OTP */
                    <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                      <div className="p-4 rounded-2xl bg-[#5D9906]/10 border border-[#5D9906]/30 text-center space-y-1.5">
                        <span className="text-xs font-bold text-[#5D9906] flex items-center justify-center gap-1.5">
                          <Mail className="w-4 h-4" /> Check Your Email Inbox
                        </span>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          A 6-digit verification code has been sent from <strong>auth@bamora.com</strong> to <strong>{email}</strong>.
                          Please check your email inbox and enter the code below to verify your email.
                        </p>
                      </div>

                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Enter 6-Digit OTP Code"
                          maxLength={6}
                          required
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-center text-base font-mono font-bold tracking-widest focus:ring-2 focus:ring-[#5D9906]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> {loading ? 'Verifying...' : 'Verify OTP & Complete Sign Up'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegistrationStep('details')}
                        className="w-full text-xs text-stone-500 hover:text-stone-800 font-semibold"
                      >
                        ← Edit Registration Details
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* VIEW SWITCHER */}
              <div className="text-center pt-2 border-t border-stone-200">
                <button
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setRegistrationStep('details');
                  }}
                  className="text-xs text-stone-600 hover:text-[#5D9906] font-bold"
                >
                  {isLoginView
                    ? "Don't have an account? Sign Up with OTP Verification"
                    : 'Already have an account? Sign In'}
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
