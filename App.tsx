
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  Scale,
  Menu,
  X,
  CreditCard,
  Sparkles,
  Clock,
  Minus,
  Square,
  Power
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import CaseManager from './components/CaseManager';
import ClientManager from './components/ClientManager';
import AIAssistant from './components/AIAssistant';
import CalendarView from './components/CalendarView';
import DocumentManager from './components/DocumentManager';
import FinanceManager from './components/FinanceManager';
import SettingsManager from './components/SettingsManager';
import { Case } from './types';

type View = 'dashboard' | 'cases' | 'clients' | 'calendar' | 'documents' | 'ai' | 'finance' | 'settings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('raghad_cases');
    if (saved) setCases(JSON.parse(saved));
    const handleStorageChange = () => {
      const updated = localStorage.getItem('raghad_cases');
      if (updated) setCases(JSON.parse(updated));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const tomorrowSessions = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    return cases.filter(c => c.nextHearing === tomorrowStr);
  }, [cases]);

  const sidebarItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'cases', label: 'القضايا والمرافعات', icon: Briefcase },
    { id: 'clients', label: 'سجل الموكلين', icon: Users },
    { id: 'calendar', label: 'الأجندة القضائية', icon: Calendar },
    { id: 'ai', label: 'المساعد الذكي', icon: Sparkles },
    { id: 'documents', label: 'الأرشيف الرقمي', icon: FileText },
    { id: 'finance', label: 'الخزينة والحسابات', icon: CreditCard },
    { id: 'settings', label: 'إعدادات المكتب', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-900 font-sans select-none" dir="rtl">
      
      {/* Desktop Title Bar (Drag Area) */}
      <div className="h-8 bg-slate-950 flex items-center justify-between px-4 title-bar-drag z-50">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <Scale size={12} className="text-amber-500" />
           نظام الرغد لإدارة مكاتب المحاماة - د. أحمد عرفات
        </div>
        <div className="flex items-center no-drag">
           <button className="p-1.5 hover:bg-slate-800 text-slate-500 transition-colors"><Minus size={14} /></button>
           <button className="p-1.5 hover:bg-slate-800 text-slate-500 transition-colors"><Square size={12} /></button>
           <button className="p-1.5 hover:bg-red-600 text-slate-500 hover:text-white transition-colors"><X size={14} /></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-72' : 'w-24'
          } sidebar-gradient text-white transition-all duration-500 flex flex-col h-full shadow-2xl z-20 border-l border-slate-800`}
        >
          <div className="p-8 flex items-center gap-4 border-b border-slate-800/50">
            <div className="gold-gradient p-2.5 rounded-2xl shadow-xl shadow-amber-900/20 shrink-0">
              <Scale className="w-7 h-7 text-white" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden whitespace-nowrap animate-fade-in">
                <h1 className="font-bold text-xl font-law tracking-wide text-amber-500">مكتب الرغد</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">د. أحمد عرفات</p>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative ${
                  activeView === item.id 
                    ? 'bg-amber-600/10 text-amber-500 shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  activeView === item.id ? 'text-amber-500 scale-110' : 'group-hover:text-amber-400 group-hover:scale-110'
                }`} />
                {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
                {activeView === item.id && (
                  <div className="absolute right-0 w-1.5 h-8 bg-amber-500 rounded-l-full shadow-[0_0_15px_rgba(217,119,6,0.5)]"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-800/50 space-y-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-all shadow-inner"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Modern Header */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 shadow-sm z-10">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative w-full max-w-lg group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="ابحث عن قضية، موكل، أو مستند..." 
                  className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 pr-12 pl-4 focus:ring-4 focus:ring-amber-500/10 focus:bg-white focus:border-amber-500 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative">
                 <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative cursor-pointer p-2.5 rounded-2xl transition-all group ${showNotifications ? 'bg-amber-50 text-amber-600' : 'hover:bg-slate-100 text-slate-500'}`}
                 >
                  <Bell size={22} className="group-hover:text-amber-600 transition-colors" />
                  {tomorrowSessions.length > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full shadow-sm animate-pulse"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute left-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 z-50 animate-in slide-in-from-top-2">
                    <div className="px-6 py-2 border-b border-slate-50 mb-2 flex items-center justify-between">
                      <h3 className="font-black text-slate-800 text-sm">التنبيهات العاجلة</h3>
                      <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">جلسات الغد</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto px-4 space-y-2 custom-scrollbar">
                      {tomorrowSessions.length > 0 ? (
                        tomorrowSessions.map(session => (
                          <div key={session.id} className="p-3 bg-red-50/50 rounded-2xl border border-red-100 group hover:bg-red-50 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="bg-red-100 p-2 rounded-xl text-red-600"><Clock size={16} /></div>
                              <div>
                                <p className="text-xs font-black text-slate-800 mb-0.5">{session.title}</p>
                                <p className="text-[10px] text-slate-500 font-bold">الموكل: {session.clientName}</p>
                                <p className="text-[9px] text-red-600 mt-1 font-bold">غداً في {session.court}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-10 text-center opacity-40">
                          <Bell size={32} className="mx-auto mb-2" />
                          <p className="text-xs font-bold">لا توجد جلسات غداً</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 border-r border-slate-200 pr-8">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-black text-slate-800 leading-tight">د. أحمد عرفات</p>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">المحامي بالنقض</p>
                </div>
                <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center text-white font-black shadow-xl shadow-amber-600/20 transform hover:scale-105 transition-transform cursor-pointer">
                  أع
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-10">
              {activeView === 'dashboard' && <Dashboard />}
              {activeView === 'cases' && <CaseManager />}
              {activeView === 'clients' && <ClientManager />}
              {activeView === 'ai' && <AIAssistant />}
              {activeView === 'calendar' && <CalendarView />}
              {activeView === 'documents' && <DocumentManager />}
              {activeView === 'finance' && <FinanceManager />}
              {activeView === 'settings' && <SettingsManager />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
