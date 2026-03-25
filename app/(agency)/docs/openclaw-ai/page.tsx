import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Info, AlertCircle, CheckCircle2, Terminal, Server, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'OpenClaw AI Gateway Course | MalikLogix Docs',
  description: 'Master OpenClaw: The OS gateway for AI agents across WhatsApp, Telegram, Discord, and iMessage.',
};

const leftNavItems = [
  { group: 'Getting Started', items: ['What is OpenClaw?', 'Quick start', 'Installation'] },
  { group: 'Core Concepts', items: ['Architecture', 'Multi-Channel', 'Sessions & Memory'] },
  { group: 'Configuration', items: ['openclaw.json', 'Tailscale', 'Permissions'] },
];

const rightNavItems = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'quick-start', label: 'Quick Start Tutorial' },
  { id: 'telegram-setup', label: 'Telegram Setup' },
  { id: 'tailscale-gateway', label: 'Remote Access' },
  { id: 'course-modules', label: '5-Day Certification' },
];

export default function OpenClawCourse() {
  return (
    <div className="mx-auto flex w-full max-w-[90rem]">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[#E4E4EB] pt-8 pb-8 px-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-white/50 backdrop-blur-xl">
        <Link href="/docs" className="flex items-center gap-2 mb-8 text-sm font-semibold text-[#6E6E82] hover:text-[#0D0D12] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Docs
        </Link>
        <nav className="flex flex-col gap-8">
          {leftNavItems.map((group, idx) => (
            <div key={idx}>
              <h3 className="mb-3 text-sm font-semibold text-[#0D0D12]">{group.group}</h3>
              <ul className="flex flex-col gap-2.5 border-l border-[#E4E4EB] ml-0.5">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a href="#" className="pl-4 text-sm text-[#6E6E82] hover:text-[#5B3CF5] transition-colors block border-l -ml-[1px] border-transparent hover:border-[#5B3CF5]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 px-4 py-10 md:px-8 lg:py-12 xl:px-16 bg-white max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5B3CF5]/10 text-[#5B3CF5] text-sm font-bold mb-6">
            <Server className="w-4 h-4" /> OpenClaw Certification Course
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D12] mb-6">
            Master OpenClaw AI Gateway
          </h1>
          <p className="text-xl text-[#3F3F50] leading-relaxed max-w-2xl mx-auto">
            The ultimate OS gateway for AI agents. Learn to build, deploy, and scale multi-channel AI systems across WhatsApp, Telegram, and Discord.
          </p>
        </div>

        {/* Hero Image */}
        <div className="w-full relative h-[300px] sm:h-[400px] rounded-3xl overflow-hidden mb-16 shadow-2xl ring-1 ring-black/5">
          <Image 
            src="/openclaw_hero.png" 
            alt="OpenClaw Abstract AI Network Banner" 
            fill 
            className="object-cover" 
            priority
          />
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#0D0D12] prose-p:text-[#4B5563] prose-a:text-[#5B3CF5] hover:prose-a:underline">
          
          <section id="introduction" className="scroll-mt-32">
            <h2>What exactly is OpenClaw?</h2>
            <p>
              OpenClaw is a powerful OS gateway linking coding agents to common messaging apps simultaneously. Instead of writing custom API bridges for every chat app, OpenClaw provides a unified dashboard and daemon.
            </p>

            {/* Circle Info Callout */}
            <div className="flex gap-5 p-6 my-8 rounded-2xl bg-[#F0ECFF] border border-[#5B3CF5]/20 items-start not-prose">
              <div className="w-12 h-12 rounded-full bg-[#5B3CF5] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#5B3CF5]/30">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0D0D12] text-lg mb-1">Self-Hosted by Default</h4>
                <p className="text-[#3F3F50] text-sm leading-relaxed">
                  OpenClaw operates entirely on your hardware. You own the session data, the multi-agent routing, and the security rules. It is completely MIT Licensed.
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
              <div className="p-5 border border-[#E4E4EB] rounded-2xl bg-[#FAFAFC] hover:shadow-md transition">
                <Globe className="w-6 h-6 text-[#10B981] mb-3" />
                <h3 className="font-bold text-[#0D0D12] mb-2">Multi-Channel</h3>
                <p className="text-sm text-[#6E6E82]">One Gateway serves Telegram, WhatsApp, Discord, and Slack simultaneously.</p>
              </div>
              <div className="p-5 border border-[#E4E4EB] rounded-2xl bg-[#FAFAFC] hover:shadow-md transition">
                <Terminal className="w-6 h-6 text-[#F59E0B] mb-3" />
                <h3 className="font-bold text-[#0D0D12] mb-2">Agent-Native</h3>
                <p className="text-sm text-[#6E6E82]">Built exactly for large language models, featuring built-in tool execution tracking and memory.</p>
              </div>
            </div>
          </section>

          <hr className="my-12 border-[#E4E4EB]" />

          <section id="quick-start" className="scroll-mt-32">
            <h2>Quick Start Tutorial</h2>
            <p>
              We recommend using <strong>Node 24</strong>. Getting OpenClaw running globally allows you to instantly spin up the background daemon.
            </p>

            {/* Stylish Code Block */}
            <div className="my-6 rounded-xl overflow-hidden shadow-2xl bg-[#0D0D12] border border-[#2B2B36] not-prose">
              <div className="flex items-center px-4 py-3 bg-[#1A1A24] border-b border-[#2B2B36]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-[#8B8B9E]">terminal - bash</div>
              </div>
              <div className="p-5">
                <pre className="font-mono text-sm leading-relaxed text-[#F8F9FA]">
                  <span className="text-[#3ECF8E]"># 1. Install via NPM globally</span><br/>
                  <span className="text-[#A259FF]">npm</span> install -g openclaw@latest<br/><br/>
                  <span className="text-[#3ECF8E]"># 2. Run the onboarding daemon</span><br/>
                  <span className="text-[#A259FF]">openclaw</span> onboard --install-daemon<br/><br/>
                  <span className="text-[#3ECF8E]"># 3. Check gateway status</span><br/>
                  <span className="text-[#A259FF]">openclaw</span> gateway status
                </pre>
              </div>
            </div>

            <p>Once running, your local dashboard is available at <code>http://127.0.0.1:18789/</code>.</p>
          </section>

          <section id="telegram-setup" className="scroll-mt-32 mt-16">
            <h2>Telegram Bot API Integration</h2>
            <p>
              Connecting Telegram is incredibly fast. You create a bot token via BotFather, then configure your <code>openclaw.json</code> file to handle the authentication channels.
            </p>

            {/* Warning Circle Callout */}
            <div className="flex gap-5 p-6 my-8 rounded-2xl bg-[#FFF1F2] border border-[#FDA4AF] items-start not-prose">
              <div className="w-12 h-12 rounded-full bg-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#E11D48]/30">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#0D0D12] text-lg mb-1">Privacy Mode Warning</h4>
                <p className="text-[#3F3F50] text-sm leading-relaxed">
                  By default, Telegram bots have privacy mode enabled in groups. You must message BotFather with <code>/setprivacy</code> to disable it, or simply make your bot a Group Admin so OpenClaw can read all messages for context.
                </p>
              </div>
            </div>

            <p>Here is an example of a proper <code>openclaw.json</code> configuration blocking unauthorized messages:</p>

            {/* Stylish JSON Code Block */}
            <div className="my-6 rounded-xl overflow-hidden shadow-2xl bg-[#0D0D12] border border-[#2B2B36] not-prose">
              <div className="flex items-center px-4 py-3 bg-[#1A1A24] border-b border-[#2B2B36]">
                <div className="text-xs font-mono text-[#8B8B9E]">~/.openclaw/openclaw.json</div>
              </div>
              <div className="p-5">
                <pre className="font-mono text-sm leading-relaxed text-[#F8F9FA]">
<span className="text-[#38BDF8]">{`{`}</span><br/>
  <span className="text-[#FFBD2E]">"channels"</span><span className="text-[#38BDF8]">: {`{`}</span><br/>
    <span className="text-[#FFBD2E]">"telegram"</span><span className="text-[#38BDF8]">: {`{`}</span><br/>
      <span className="text-[#FFBD2E]">"enabled"</span><span className="text-[#F8F9FA]">: </span><span className="text-[#10B981]">true</span><span className="text-[#F8F9FA]">,</span><br/>
      <span className="text-[#FFBD2E]">"botToken"</span><span className="text-[#F8F9FA]">: </span><span className="text-[#A259FF]">"YOUR_BOT_TOKEN"</span><span className="text-[#F8F9FA]">,</span><br/>
      <span className="text-[#FFBD2E]">"dmPolicy"</span><span className="text-[#F8F9FA]">: </span><span className="text-[#A259FF]">"pairing"</span><br/>
    <span className="text-[#38BDF8]">{`}`}</span><br/>
  <span className="text-[#38BDF8]">{`}`}</span><br/>
<span className="text-[#38BDF8]">{`}`}</span>
                </pre>
              </div>
            </div>
          </section>

          <section id="tailscale-gateway" className="scroll-mt-32 mt-16">
            <h2>Remote Access & Tailscale</h2>
            <p>
              Hosting OpenClaw means you frequently need secure remote access. Rather than punching holes in your router, OpenClaw integrates natively with <strong>Tailscale</strong>.
            </p>
            <ul>
              <li><strong>Tailnet-only:</strong> The dashboard is served internally only to authenticated Tailscale nodes.</li>
              <li><strong>Public Funnel:</strong> You can expose the dashboard safely using a shared password using Tailscale Funnel.</li>
            </ul>
          </section>

          <hr className="my-12 border-[#E4E4EB]" />

          <section id="course-modules" className="scroll-mt-32">
            <h2>The OpenClaw 5-Day Certification</h2>
            <p>MalikLogix provides comprehensive corporate training. Master the entire OpenClaw infrastructure directly from our experts.</p>
            
            <div className="not-prose grid gap-4 mt-8">
              {[
                { day: 'Module 1', title: 'OpenClaw Fundamentals', desc: 'Daemon processes, background routing, and global NPM installation architecture.' },
                { day: 'Module 2', title: 'WhatsApp & Telegram Bots', desc: 'Deploying the bot tokens, handling group permissions, and mapping mentions.' },
                { day: 'Module 3', title: 'Agent Context & Sessions', desc: 'Managing the conversation queue, local database stores, and persistent memory.' },
                { day: 'Module 4', title: 'Tailscale Security', desc: 'Operating your system globally via Tailnet tunneling without exposing explicit ports.' },
                { day: 'Module 5', title: 'Scaling to Production', desc: 'Enterprise authentication limits, failover tactics, and custom OS proxy configurations.' },
              ].map((module, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-[#E4E4EB] bg-white hover:border-[#5B3CF5] transition-all duration-300 shadow-sm group">
                  <div className="w-10 h-10 rounded-full bg-[#FAFAFC] border border-[#E4E4EB] flex items-center justify-center font-bold text-[#5B3CF5] group-hover:bg-[#5B3CF5] group-hover:text-white transition-colors shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D0D12] text-lg mb-1">{module.title}</h3>
                    <p className="text-sm text-[#6E6E82] leading-relaxed">{module.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                      <CheckCircle2 size={14} /> Included in Certification
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <div className="not-prose mt-16 rounded-3xl overflow-hidden bg-[#0D0D12] border border-[#3F3F50] p-10 text-center relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B3CF5]/20 rounded-full blur-[80px] -mr-10 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>
            
            <Shield className="w-12 h-12 text-[#5B3CF5] mx-auto mb-6 relative z-10" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4 relative z-10">Get Expert OpenClaw Support</h2>
            <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto relative z-10 text-lg">
              Let MalikLogix handle your enterprise integration. We build secure, self-hosted AI systems at scale.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#7C5CFA] hover:scale-105 relative z-10"
            >
              Contact Sales & Consulting
            </Link>
          </div>

        </div>
      </main>

      {/* Right Sidebar - TOC */}
      <aside className="hidden xl:block w-72 shrink-0 pt-10 pb-8 px-8 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="bg-[#FAFAFC] rounded-2xl p-5 border border-[#E4E4EB]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0D0D12] mb-4 flex items-center gap-2">
            <Terminal size={14} className="text-[#5B3CF5]"/> On this page
          </h3>
          <nav className="flex flex-col gap-3">
            {rightNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-medium text-[#6E6E82] hover:text-[#5B3CF5] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
