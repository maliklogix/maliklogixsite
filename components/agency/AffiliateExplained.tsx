'use client';

import { motion } from 'framer-motion';
import { 
  Info, 
  Target, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkles,
  Layers,
  BarChart
} from 'lucide-react';

const cards = [
  {
    title: "What is Affiliate Marketing?",
    description: "It's a performance-based partnership. When we recommend a tool and you sign up using our link, we earn a small commission—at no extra cost to you.",
    icon: Info,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "Why Do We Use It?",
    description: "It allows us to keep our high-quality AI guides and resources free for everyone. It supports our research into the latest automation tech.",
    icon: Target,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Our Selection Process",
    description: "We are extremely picky. We only partner with tools that we actually use in our daily agency operations to scale MalikLogix.",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "The MalikLogix Edge",
    description: "Using our links often grants you exclusive perks, such as extended trials, priority onboarding, or special AI-readiness discounts.",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    border: "group-hover:border-amber-500/50"
  }
];

export default function AffiliateExplained() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#00A3FF]/5 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#5B3CF5]/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} />
            Transparency First
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0D0D12] font-heading mb-6"
          >
            Decoding Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#5B3CF5]">Partner Program</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6E6E82] text-lg max-w-2xl mx-auto"
          >
            We believe in radical honesty. Here is exactly how we use affiliate marketing to build a better ecosystem for AI entrepreneurs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              whileHover={{ y: -8 }}
              className={`group relative p-8 rounded-[2.5rem] bg-white border border-[#E4E4EB] transition-all duration-300 ${card.border} hover:shadow-2xl hover:shadow-[#00A3FF]/10`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <card.icon className={`${card.iconColor}`} size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-[#0D0D12] mb-3 group-hover:text-[#00A3FF] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-[#6E6E82] text-sm leading-relaxed">
                {card.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-[#00A3FF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                Learn More <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section / How we use it */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 md:p-12 rounded-[3.5rem] bg-[#0D0D12] text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00A3FF]/20 to-transparent opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00A3FF] flex items-center justify-center shadow-lg shadow-[#00A3FF]/40">
                  <Layers size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">The Curation Creed</h3>
              </div>
              <p className="text-[#9999AA] text-lg leading-relaxed mb-8">
                Our approach is simple: <span className="text-white font-semibold">User-first, Link-second.</span> If a tool doesn't survive 100+ hours of testing in our internal "Automation Lab," it never touches this page.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#00A3FF] mb-1">90%</div>
                  <div className="text-xs text-[#9999AA] uppercase tracking-wider font-bold">Partner Rejection Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#5B3CF5] mb-1">500+</div>
                  <div className="text-xs text-[#9999AA] uppercase tracking-wider font-bold">Tools Tested Annually</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm group-hover:border-[#00A3FF]/30 transition-colors duration-500">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold uppercase tracking-widest text-[#9999AA]">Efficiency Impact</span>
                <BarChart size={18} className="text-[#00A3FF]" />
              </div>
              <div className="space-y-6">
                {[
                  { label: "Internal Workflow Speed", value: "85%", color: "bg-[#00A3FF]" },
                  { label: "Client ROI on Stack", value: "92%", color: "bg-[#5B3CF5]" },
                  { label: "Implementation Ease", value: "78%", color: "bg-emerald-500" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white">{stat.label}</span>
                      <span className="text-[#00A3FF]">{stat.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: stat.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                        className={`h-full ${stat.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
