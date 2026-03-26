'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Search, Menu, CheckCircle2, XCircle, AlertTriangle, HelpCircle, History, Terminal, Info, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Category = 'all' | 'ai' | 'image' | 'social';

interface Provider {
  id: string;
  name: string;
  category: Category;
  gradient: string;
  letter: string;
  desc: string;
  placeholder: string;
  docsUrl: string;
}

const PROVIDERS: Provider[] = [
  // ── AI Models ──
  { id: 'openai', name: 'OpenAI', category: 'ai', gradient: 'from-[#10a37f] to-[#1a7f5a]', letter: 'O', desc: 'Tests GPT model access via chat completions endpoint', placeholder: 'sk-...', docsUrl: 'https://platform.openai.com/api-keys' },
  { id: 'anthropic', name: 'Anthropic Claude', category: 'ai', gradient: 'from-[#d97757] to-[#b85c3a]', letter: 'A', desc: 'Tests Claude model access via messages endpoint', placeholder: 'sk-ant-...', docsUrl: 'https://console.anthropic.com/settings/keys' },
  { id: 'gemini', name: 'Google Gemini', category: 'ai', gradient: 'from-[#4285f4] to-[#34a853]', letter: 'G', desc: 'Tests Gemini model access via generateContent endpoint', placeholder: 'AIza...', docsUrl: 'https://aistudio.google.com/apikey' },
  { id: 'mistral', name: 'Mistral AI', category: 'ai', gradient: 'from-[#ff7000] to-[#ff4500]', letter: 'M', desc: 'Tests Mistral model access via chat completions endpoint', placeholder: 'Your Mistral API key', docsUrl: 'https://console.mistral.ai/api-keys' },
  { id: 'deepseek', name: 'DeepSeek', category: 'ai', gradient: 'from-[#4d6bfe] to-[#3451d1]', letter: 'D', desc: 'Tests DeepSeek model access via chat completions endpoint', placeholder: 'sk-...', docsUrl: 'https://platform.deepseek.com/api_keys' },
  { id: 'groq', name: 'Groq', category: 'ai', gradient: 'from-[#f55036] to-[#c9302c]', letter: 'G', desc: 'Tests Groq ultra-fast inference via chat completions endpoint', placeholder: 'gsk_...', docsUrl: 'https://console.groq.com/keys' },
  { id: 'cohere', name: 'Cohere', category: 'ai', gradient: 'from-[#39594d] to-[#2a7d5f]', letter: 'C', desc: 'Tests Cohere model access via chat endpoint', placeholder: 'Your Cohere API key', docsUrl: 'https://dashboard.cohere.com/api-keys' },
  
  // ── Image Generation ──
  { id: 'leonardo', name: 'Leonardo AI', category: 'image', gradient: 'from-[#8b5cf6] to-[#6d28d9]', letter: 'L', desc: 'Tests Leonardo API access via user info endpoint', placeholder: 'Your Leonardo API key', docsUrl: 'https://docs.leonardo.ai' },
  { id: 'fal', name: 'FAL AI', category: 'image', gradient: 'from-[#06b6d4] to-[#0891b2]', letter: 'F', desc: 'Tests FAL.ai API access by submitting a minimal job', placeholder: 'Your FAL API key', docsUrl: 'https://fal.ai/dashboard/keys' },
  
  // ── Social & Platforms ──
  { id: 'facebook', name: 'Facebook (Meta)', category: 'social', gradient: 'from-[#1877f2] to-[#0c5dc7]', letter: 'f', desc: 'Tests Facebook Graph API access token validity', placeholder: 'Your access token', docsUrl: 'https://developers.facebook.com' },
  { id: 'youtube', name: 'YouTube Data API', category: 'social', gradient: 'from-[#ff0000] to-[#cc0000]', letter: 'Y', desc: 'Tests YouTube Data API v3 key validity', placeholder: 'AIza...', docsUrl: 'https://console.cloud.google.com/apis/credentials' },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', gradient: 'from-[#0a66c2] to-[#004182]', letter: 'in', desc: 'Tests LinkedIn API access token via userinfo endpoint', placeholder: 'Your access token', docsUrl: 'https://developer.linkedin.com' },
  { id: 'tiktok', name: 'TikTok', category: 'social', gradient: 'from-[#010101] to-[#222]', letter: 'T', desc: 'Tests TikTok API access token validity', placeholder: 'Your access token', docsUrl: 'https://developers.tiktok.com' },
  { id: 'pinterest', name: 'Pinterest', category: 'social', gradient: 'from-[#e60023] to-[#ad081b]', letter: 'P', desc: 'Tests Pinterest API access token via user account endpoint', placeholder: 'Your access token', docsUrl: 'https://developers.pinterest.com' },
  { id: 'stripe', name: 'Stripe', category: 'social', gradient: 'from-[#635bff] to-[#4f46e5]', letter: 'S', desc: 'Tests Stripe API key by fetching account balance', placeholder: 'sk_test_... or sk_live_...', docsUrl: 'https://dashboard.stripe.com/apikeys' },
];

const CAT_LABELS = { ai: 'AI', image: 'Image', social: 'Platform' };
const CAT_STYLES = {
  ai: 'bg-[#5B3CF5]/10 text-[#5B3CF5] border-[#5B3CF5]/20',
  image: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20',
  social: 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20'
};

interface TestResult {
  success: boolean;
  status: number;
  type: string;
  message: string;
  details?: any;
  responseTime?: number;
}

interface HistoryItem {
  id: string;
  providerId: string;
  providerName: string;
  timestamp: Date;
  success: boolean;
  responseTime: number;
}

export default function APIKeyTester() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeSection, setActiveSection] = useState<'testing' | 'history' | 'about'>('testing');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // State per provider
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const filteredProviders = useMemo(() => {
    if (activeCategory === 'all') return PROVIDERS;
    return PROVIDERS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const testKey = async (provider: Provider) => {
    const key = keys[provider.id]?.trim();
    if (!key) return;

    setTesting(prev => ({ ...prev, [provider.id]: true }));
    setResults(prev => { const next = { ...prev }; delete next[provider.id]; return next; });

    try {
      const start = Date.now();
      const res = await fetch(`/api/validate/${provider.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      });
      const data = await res.json();
      const time = Date.now() - start;
      const resultData = { ...data, responseTime: data.responseTime || time };
      
      setResults(prev => ({ ...prev, [provider.id]: resultData }));
      
      setHistory(prev => [{
        id: Math.random().toString(36).substring(7),
        providerId: provider.id,
        providerName: provider.name,
        timestamp: new Date(),
        success: resultData.success,
        responseTime: resultData.responseTime
      }, ...prev]);

    } catch (err: any) {
      setResults(prev => ({ ...prev, [provider.id]: { success: false, status: 500, type: 'error', message: err.message || 'Network error' }}));
    } finally {
      setTesting(prev => ({ ...prev, [provider.id]: false }));
    }
  };

  const getResultBoxStyle = (res: TestResult) => {
    if (res.success) return 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]';
    if (res.type === 'rate_limited' || res.type === 'quota_exceeded') return 'bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]';
    return 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]';
  };

  return (
    <div className="bg-[#f0f2f5] min-h-[calc(100vh-64px)] font-body">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:gap-8 px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* ── Sidebar (Desktop) ── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border border-[#E4E4EB] rounded-2xl sticky top-[88px] z-10 overflow-hidden shadow-sm h-[calc(100vh-120px)] shrink-0">
        <div className="p-5 border-b border-[#E4E4EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B3CF5] to-[#7C5CFA] flex items-center justify-center text-white shadow-lg shadow-[#5B3CF5]/30 flex-shrink-0">
              <Terminal size={20} />
            </div>
            <div>
              <div className="font-heading font-extrabold text-[#0D0D12] text-[15px] leading-tight mt-1">API Key Tester</div>
              <div className="text-[11px] text-[#6E6E82] font-medium tracking-wide uppercase">Local Proxy</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-[#9494A3] uppercase mt-2">Testing</div>
          
          <button onClick={() => setActiveSection('testing')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === 'testing' ? 'bg-[#5B3CF5]/10 text-[#5B3CF5]' : 'text-[#6E6E82] hover:bg-[#F7F7FA] hover:text-[#0D0D12]'}`}>
            <Terminal size={16} />
            All APIs
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] ${activeSection === 'testing' ? 'bg-[#5B3CF5]/20 text-[#5B3CF5]' : 'bg-[#E4E4EB] text-[#6E6E82]'}`}>{PROVIDERS.length}</span>
          </button>
          
          <button onClick={() => setActiveSection('history')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === 'history' ? 'bg-[#5B3CF5]/10 text-[#5B3CF5]' : 'text-[#6E6E82] hover:bg-[#F7F7FA] hover:text-[#0D0D12]'}`}>
            <History size={16} />
            Test History
            {history.length > 0 && (
              <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] ${activeSection === 'history' ? 'bg-[#5B3CF5]/20 text-[#5B3CF5]' : 'bg-[#E4E4EB] text-[#6E6E82]'}`}>{history.length}</span>
            )}
          </button>

          <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-[#9494A3] uppercase mt-4">Info</div>
          <button onClick={() => setActiveSection('about')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === 'about' ? 'bg-[#5B3CF5]/10 text-[#5B3CF5]' : 'text-[#6E6E82] hover:bg-[#F7F7FA] hover:text-[#0D0D12]'}`}>
            <Info size={16} />
            About & Privacy
          </button>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 w-full mb-20">
        
        {/* MOBILE NAVIGATION */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-[#E4E4EB] scrollbar-hide">
          <button onClick={() => setActiveSection('testing')} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeSection === 'testing' ? 'bg-[#5B3CF5] text-white shadow-lg shadow-[#5B3CF5]/20' : 'bg-white border border-[#E4E4EB] text-[#6E6E82]'}`}>
            All APIs
          </button>
          <button onClick={() => setActiveSection('history')} className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeSection === 'history' ? 'bg-[#5B3CF5] text-white shadow-lg shadow-[#5B3CF5]/20' : 'bg-white border border-[#E4E4EB] text-[#6E6E82]'}`}>
            History {history.length > 0 && <span className="px-1.5 py-0.5 rounded-md bg-black/10 text-[10px]">{history.length}</span>}
          </button>
          <button onClick={() => setActiveSection('about')} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeSection === 'about' ? 'bg-[#5B3CF5] text-white shadow-lg shadow-[#5B3CF5]/20' : 'bg-white border border-[#E4E4EB] text-[#6E6E82]'}`}>
            About
          </button>
        </div>

        {/* ── SECTION: TESTING ── */}
        {activeSection === 'testing' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12]">API Key Tester</h1>
                <p className="text-[#6E6E82] text-sm mt-1">Validate your connection tokens instantly.</p>
              </div>
              <button 
                onClick={() => { setKeys({}); setResults({}); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E4E4EB] text-[#0D0D12] text-sm font-semibold hover:bg-[#F7F7FA] transition-colors"
              >
                Clear All Inputs
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'all', label: `All (${PROVIDERS.length})` },
                { id: 'ai', label: `AI Models (${PROVIDERS.filter(p => p.category === 'ai').length})` },
                { id: 'image', label: `Image Gen (${PROVIDERS.filter(p => p.category === 'image').length})` },
                { id: 'social', label: `Social & Platforms (${PROVIDERS.filter(p => p.category === 'social').length})` },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveCategory(f.id as Category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === f.id 
                      ? 'bg-[#0D0D12] border-[#0D0D12] text-white shadow-md' 
                      : 'bg-white border-[#E4E4EB] text-[#6E6E82] hover:border-[#5B3CF5] hover:text-[#0D0D12]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* API Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProviders.map(p => {
                const isTesting = testing[p.id];
                const res = results[p.id];
                const isVisible = visible[p.id];
                const keyVal = keys[p.id] || '';

                return (
                  <div key={p.id} className={`bg-white rounded-2xl border ${isTesting ? 'border-[#5B3CF5] shadow-lg shadow-[#5B3CF5]/10 animate-pulse' : 'border-[#E4E4EB] hover:border-[#5B3CF5]/40 hover:shadow-xl hover:shadow-[#5B3CF5]/5'} p-5 transition-all duration-300 relative overflow-hidden group`}>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0`}>
                        {p.letter}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-bold text-[#0D0D12] truncate">{p.name}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${CAT_STYLES[p.category as keyof typeof CAT_STYLES]}`}>
                        {CAT_LABELS[p.category as keyof typeof CAT_LABELS]}
                      </span>
                    </div>
                    
                    <p className="text-xs text-[#6E6E82] leading-relaxed mb-4 h-8">{p.desc}</p>

                    <div className="relative mb-3">
                      <input 
                        type={isVisible ? 'text' : 'password'}
                        value={keyVal}
                        onChange={e => setKeys(prev => ({ ...prev, [p.id]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && testKey(p)}
                        placeholder={p.placeholder}
                        className="w-full bg-[#f8fafc] border border-[#E4E4EB] focus:border-[#5B3CF5] rounded-xl px-4 py-2.5 text-sm text-[#0D0D12] outline-none transition-colors"
                        disabled={isTesting}
                      />
                      <button 
                        type="button"
                        onClick={() => setVisible(prev => ({...prev, [p.id]: !prev[p.id]}))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9494A3] hover:text-[#0D0D12]"
                      >
                         {isVisible ? <X size={14} /> : <Search size={14} />} 
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => testKey(p)}
                        disabled={isTesting || !keyVal}
                        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                          !keyVal ? 'bg-[#E4E4EB] text-[#9494A3] cursor-not-allowed' :
                          isTesting ? 'bg-[#5B3CF5]/80 text-white cursor-wait' :
                          'bg-[#5B3CF5] text-white hover:bg-[#4f31d4] shadow-md shadow-[#5B3CF5]/20'
                        }`}
                      >
                        {isTesting ? 'Testing...' : 'Test Key'}
                      </button>
                      <Link href={p.docsUrl} target="_blank" className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white border border-[#E4E4EB] text-[#6E6E82] hover:bg-[#F7F7FA] hover:text-[#0D0D12] transition-colors">
                        <HelpCircle size={16} />
                      </Link>
                    </div>

                    {res && (
                      <div className={`mt-4 p-3 rounded-xl border ${getResultBoxStyle(res)} animate-in fade-in slide-in-from-top-2 duration-300`}>
                        <div className="flex items-center gap-2 font-bold text-xs mb-1">
                          {res.success ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                          {res.success ? 'Valid' : res.type.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-[11px] opacity-90 leading-relaxed break-words">{res.message}</div>
                        {res.details && (
                          <div className="mt-2 pt-2 border-t border-current/10 text-[10px] space-y-0.5 font-mono">
                            {Object.entries(res.details).map(([k, v]) => (
                               <div key={k}><span className="opacity-70">{k}:</span> {typeof v === 'object' ? JSON.stringify(v) : String(v)}</div>
                            ))}
                            <div className="pt-1 opacity-60">Latency: {res.responseTime}ms</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SECTION: HISTORY ── */}
        {activeSection === 'history' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12]">Test History</h1>
                <p className="text-[#6E6E82] text-sm mt-1">Session tests only. Cleared on refresh.</p>
              </div>
              <button 
                onClick={() => setHistory([])}
                className="px-4 py-2 rounded-xl bg-white border border-[#E4E4EB] text-[#ef4444] text-sm font-semibold hover:bg-red-50 transition-colors"
                disabled={history.length === 0}
              >
                Clear History
              </button>
            </div>

            {history.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-3xl border border-[#E4E4EB] border-dashed">
                 <History className="mx-auto h-12 w-12 text-[#E4E4EB] mb-4" />
                 <h3 className="text-sm font-bold text-[#0D0D12]">No tests run yet</h3>
                 <p className="text-xs text-[#6E6E82] mt-1">Run an API key test for it to show up here.</p>
               </div>
            ) : (
              <div className="space-y-3">
                {history.map(item => (
                   <div key={item.id} className="bg-white border border-[#E4E4EB] rounded-2xl p-4 flex items-center justify-between hover:border-[#5B3CF5]/30 transition-colors group">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${PROVIDERS.find(p => p.id === item.providerId)?.gradient || 'bg-gray-800'}`}>
                          {PROVIDERS.find(p => p.id === item.providerId)?.letter || '?'}
                        </div>
                        <div>
                          <div className="font-bold text-[#0D0D12] text-sm">{item.providerName}</div>
                          <div className="text-xs text-[#6E6E82] mt-0.5">{item.timestamp.toLocaleTimeString()}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <span className="text-[10px] text-[#9494A3] font-mono hidden sm:inline-block">{item.responseTime}ms</span>
                       {item.success 
                         ? <span className="flex items-center gap-1.5 px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#10b981]/20"><CheckCircle2 size={12}/> Valid</span>
                         : <span className="flex items-center gap-1.5 px-3 py-1 bg-[#ef4444]/10 text-[#ef4444] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#ef4444]/20"><XCircle size={12}/> Failed</span>
                       }
                     </div>
                   </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SECTION: ABOUT ── */}
        {activeSection === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
            <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12] mb-8">About & Privacy</h1>

            <div className="bg-[#10b981]/10 border border-[#10b981]/20 p-5 rounded-2xl mb-8 flex gap-4">
               <div className="text-[#10b981] mt-0.5"><CheckCircle2 size={24}/></div>
               <div>
                 <h3 className="font-bold text-[#10b981] mb-1">100% Client-Side Private</h3>
                 <p className="text-sm text-[#10b981]/80 leading-relaxed text-justify">
                   We only use our Next.js API Routes as a proxy to bypass browser CORS restrictions. Keys are injected directly into the destination API request and <strong>never logged, cached, transmitted, or stored anywhere.</strong> 
                 </p>
               </div>
            </div>

            <h2 className="font-heading text-xl font-bold text-[#0D0D12] mb-4">Frequently Asked Questions</h2>
            <Accordion className="w-full bg-white rounded-2xl border border-[#E4E4EB] px-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-[#5B3CF5]">What API providers are supported?</AccordionTrigger>
                <AccordionContent className="text-sm text-[#6E6E82] leading-relaxed">
                  We validate 15+ API keys including AI Models (OpenAI, Anthropic Claude, Gemini, Mistral, Groq), Image Generation (Leonardo, FAL AI), and standard platforms (Stripe, YouTube, Facebook, LinkedIn, TikTok, Pinterest).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-[#5B3CF5]">Does testing consume my API credits?</AccordionTrigger>
                <AccordionContent className="text-sm text-[#6E6E82] leading-relaxed">
                  We use the smallest possible request for each API (e.g., max_tokens: 5 for LLMs, minimal test payloads). The cost is almost completely negligible (fractions of a cent per test). Some endpoints like Leonardo's /me or Stripe's /balance are completely free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-[#5B3CF5]">Why did my test fail?</AccordionTrigger>
                <AccordionContent className="text-sm text-[#6E6E82] leading-relaxed">
                  Common reasons include: invalid/revoked keys, expired access tokens, missing billing info (insufficient credits), rate limiting, or network unavailability. The error message will provide specific details from the target platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

      </main>
      </div>

      {/* ── FOOTER BADGE ── */}
      <div className="fixed bottom-0 right-0 z-50 p-4 pointer-events-none md:block hidden">
        <div className="bg-white/80 backdrop-blur-md border border-[#E4E4EB] shadow-xl text-[#0D0D12] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 pointer-events-auto">
          Built by <span className="font-heading font-black text-[#5B3CF5]">MalikLogix</span>
        </div>
      </div>
    </div>
  );
}
