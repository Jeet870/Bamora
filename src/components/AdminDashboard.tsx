import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  Sliders,
  Sparkles,
  BarChart3,
  CreditCard,
  Building2,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { api, MOCK_PRODUCTS } from '../services/api';
import { AdminStats, Order } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { user, showToast } = useStore();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory'>('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminStats();
      setStats(data);
    } catch (err: any) {
      showToast('Could not fetch admin statistics', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      showToast(`Updated order ${orderId} to ${newStatus}`, 'success');
      fetchStats();
    } catch (err: any) {
      showToast('Failed to update status', 'error');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-white">
        <div className="glass-panel-dark p-8 rounded-3xl text-center space-y-4 max-w-md border border-red-500/40">
          <ShieldCheck className="w-12 h-12 text-red-500 mx-auto" />
          <h3 className="font-heading font-black text-2xl">Access Denied</h3>
          <p className="text-xs text-stone-400">
            You must be logged in with Administrator credentials (`admin@bamora.com`) to view website statistics.
          </p>
          <button onClick={onClose} className="bg-[#5D9906] text-white text-xs font-bold px-6 py-3 rounded-2xl">
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] text-[#F9F9F5] overflow-y-auto flex flex-col">
      
      {/* ADMIN HEADER BAR */}
      <header className="bg-[#1e1e1e] border-b border-[#5D9906]/30 px-6 py-4 sticky top-0 z-20 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5D9906] to-[#D8F05A] text-[#222222] font-black text-xl flex items-center justify-center shadow-lg border border-[#D8F05A]">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-xl text-white">
                BAMORA™ Executive Control Center
              </h1>
              <span className="bg-[#5D9906] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-[#D8F05A]/40">
                LIVE ADMIN MODE
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Real-time online sales, revenue metrics & inventory control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-700"
            title="Refresh Real-time Analytics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>

          <button
            onClick={onClose}
            className="bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
          >
            <X className="w-4 h-4" /> Exit to Store
          </button>
        </div>
      </header>

      {/* DASHBOARD CONTENT BODY */}
      <div className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
        
        {/* NAV TABS */}
        <div className="flex items-center gap-4 border-b border-stone-800 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`font-heading font-extrabold text-sm sm:text-base px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-[#5D9906] text-white shadow-lg'
                : 'text-stone-400 hover:bg-stone-800'
            }`}
          >
            📊 Revenue & Performance Overview
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`font-heading font-extrabold text-sm sm:text-base px-4 py-2 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-[#5D9906] text-white shadow-lg'
                : 'text-stone-400 hover:bg-stone-800'
            }`}
          >
            📦 Customer Orders ({stats?.totalOrders || 0})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`font-heading font-extrabold text-sm sm:text-base px-4 py-2 rounded-xl transition-all ${
              activeTab === 'inventory'
                ? 'bg-[#5D9906] text-white shadow-lg'
                : 'text-stone-400 hover:bg-stone-800'
            }`}
          >
            🏷️ Product Inventory ({MOCK_PRODUCTS.length})
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-4">
            <RefreshCw className="w-10 h-10 text-[#5D9906] animate-spin mx-auto" />
            <p className="text-stone-400 text-sm">Loading Executive Dashboard Analytics...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8">
                
                {/* TOP STATS KPI CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* CARD 1: TOTAL REVENUE */}
                  <div className="p-6 rounded-3xl bg-[#1e1e1e] border border-[#5D9906]/40 shadow-xl space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-[#D8F05A]">
                        Total Online Revenue
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#5D9906]/20 text-[#D8F05A] flex items-center justify-center">
                        <DollarSign className="w-5 h-5" />
                      </div>
                    </div>
                    <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                      ₹{stats.totalRevenue.toLocaleString('en-IN')}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-[#5D9906] font-bold">
                      <ArrowUpRight className="w-4 h-4" /> +28.4% growth from last month
                    </div>
                  </div>

                  {/* CARD 2: TOTAL ONLINE ORDERS */}
                  <div className="p-6 rounded-3xl bg-[#1e1e1e] border border-stone-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-[#D8B26E]">
                        Total Online Orders
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#D8B26E]/20 text-[#D8B26E] flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    </div>
                    <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                      {stats.totalOrders}
                    </h2>
                    <p className="text-xs text-stone-400">
                      Avg. order value: <strong className="text-white">₹798</strong>
                    </p>
                  </div>

                  {/* CARD 3: TOTAL REGISTERED CUSTOMERS */}
                  <div className="p-6 rounded-3xl bg-[#1e1e1e] border border-stone-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400">
                        Registered Customers
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                      {stats.totalCustomers}
                    </h2>
                    <p className="text-xs text-stone-400">
                      VIP Circle Members: <strong className="text-white">640</strong>
                    </p>
                  </div>

                  {/* CARD 4: CONVERSION RATE */}
                  <div className="p-6 rounded-3xl bg-[#1e1e1e] border border-stone-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                        Cart Conversion Rate
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                    <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                      {stats.conversionRate}%
                    </h2>
                    <p className="text-xs text-emerald-400 font-bold">
                      Top 5% in Luxury E-commerce
                    </p>
                  </div>

                </div>

                {/* REVENUE BREAKDOWN & MONTHLY GRAPH */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* PREPAID VS COD BREAKDOWN */}
                  <div className="lg:col-span-5 p-6 rounded-3xl bg-[#1e1e1e] border border-stone-800 space-y-6">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#5D9906]" />
                      <h3 className="font-heading font-bold text-lg text-white">
                        Online Payment Breakdown
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-stone-400 font-bold block">Prepaid (Razorpay / UPI / GPay)</span>
                          <span className="text-xl font-black text-[#D8F05A]">
                            ₹{stats.prepaidRevenue.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="bg-[#5D9906]/20 text-[#D8F05A] text-xs font-bold px-3 py-1 rounded-full border border-[#5D9906]/40">
                          68% Total
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-stone-400 font-bold block">Cash on Delivery (COD)</span>
                          <span className="text-xl font-black text-[#D8B26E]">
                            ₹{stats.codRevenue.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="bg-[#D8B26E]/20 text-[#D8B26E] text-xs font-bold px-3 py-1 rounded-full border border-[#D8B26E]/40">
                          32% Total
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* MONTHLY REVENUE GROWTH GRAPH */}
                  <div className="lg:col-span-7 p-6 rounded-3xl bg-[#1e1e1e] border border-stone-800 space-y-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#D8F05A]" />
                      <h3 className="font-heading font-bold text-lg text-white">
                        Monthly Sales Trajectory (INR ₹)
                      </h3>
                    </div>

                    <div className="h-44 flex items-end gap-4 pt-6 pb-2 px-4 border-b border-stone-800">
                      {stats.salesByMonth.map((item, idx) => {
                        const heightPercent = Math.min(100, Math.round((item.revenue / stats.totalRevenue) * 100));
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                            <span className="text-[10px] text-stone-400 font-mono font-bold">
                              ₹{(item.revenue / 1000).toFixed(0)}k
                            </span>
                            <div
                              className="w-full bg-gradient-to-t from-[#5D9906] to-[#D8F05A] rounded-t-xl transition-all duration-500 hover:opacity-90"
                              style={{ height: `${Math.max(15, heightPercent)}%` }}
                            />
                            <span className="text-xs font-bold text-stone-300">{item.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && stats && (
              <div className="p-6 rounded-3xl bg-[#1e1e1e] border border-stone-800 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Live Online Orders List
                  </h3>
                  <span className="text-xs text-stone-400 font-semibold">
                    Showing latest online transactions
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 uppercase font-extrabold tracking-wider">
                        <th className="py-3 px-4">Order Code</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-stone-300 font-medium">
                      {stats.recentOrders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-stone-900/60 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-white">
                            {ord.orderId}
                            <span className="block text-[10px] text-[#5D9906]">{ord.trackingCode}</span>
                          </td>
                          <td className="py-4 px-4">{ord.date}</td>
                          <td className="py-4 px-4">{ord.paymentMethod}</td>
                          <td className="py-4 px-4 font-bold text-[#D8F05A]">₹{ord.totalAmount}</td>
                          <td className="py-4 px-4">
                            <span className="bg-[#5D9906]/20 text-[#D8F05A] text-[11px] font-bold px-3 py-1 rounded-full border border-[#5D9906]/40">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateStatus(ord.orderId, e.target.value)}
                              className="bg-stone-800 text-white text-xs p-2 rounded-xl border border-stone-700 cursor-pointer focus:outline-none"
                            >
                              <option value="Confirmed & Packing">Confirmed & Packing</option>
                              <option value="In Transit">Dispatched / In Transit</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="p-5 rounded-3xl bg-[#1e1e1e] border border-stone-800 shadow-xl space-y-4"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-stone-900 border border-stone-800">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#5D9906]">{product.category}</span>
                      <h4 className="font-heading font-bold text-sm text-white line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-stone-400">Price: <strong className="text-[#D8F05A]">₹{product.price}</strong></p>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-stone-400">Stock Count:</span>
                      <span className="font-bold text-emerald-400">{product.stockCount} units available</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </>
        )}

      </div>
    </div>
  );
};
