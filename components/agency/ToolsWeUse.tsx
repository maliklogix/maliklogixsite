import { 
  Workflow, 
  Layers, 
  Terminal, 
  Rocket, 
  PlugZap, 
  Brain, 
  Cpu, 
  Network, 
  Database,
  Code,
  Globe,
  Wand2
} from 'lucide-react';

const tools = [
  {
    name: "n8n",
    icon: Workflow,
    description: "Advanced Workflow Automation",
    color: "text-[#EA4B71]",
    bg: "bg-[#EA4B71]/10",
  },
  {
    name: "Make.com",
    icon: Layers,
    description: "Visual Process Automation",
    color: "text-[#A259FF]",
    bg: "bg-[#A259FF]/10",
  },
  {
    name: "Cursor Pro",
    icon: Terminal,
    description: "AI-Powered Coding",
    color: "text-[#222E4E]",
    bg: "bg-[#222E4E]/10",
  },
  {
    name: "Antigravity",
    icon: Rocket,
    description: "Agentic AI Development",
    color: "text-[#5B3CF5]",
    bg: "bg-[#5B3CF5]/10",
  },
  {
    name: "Custom APIs",
    icon: PlugZap,
    description: "Dashboard & System Integrations",
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
  },
  {
    name: "OpenAI",
    icon: Brain,
    description: "Generative AI Models",
    color: "text-[#00A67E]",
    bg: "bg-[#00A67E]/10",
  },
  {
    name: "Claude",
    icon: Cpu,
    description: "Long-context AI Analysis",
    color: "text-[#D97757]",
    bg: "bg-[#D97757]/10",
  },
  {
    name: "Next.js",
    icon: Globe,
    description: "Lightning Web Experiences",
    color: "text-[#000000]",
    bg: "bg-[#000000]/10",
  },
  {
    name: "Supabase",
    icon: Database,
    description: "Scalable Database Infrastructure",
    color: "text-[#3ECF8E]",
    bg: "bg-[#3ECF8E]/10",
  },
  {
    name: "Tailwind CSS",
    icon: Code,
    description: "Rapid UI Development",
    color: "text-[#38BDF8]",
    bg: "bg-[#38BDF8]/10",
  },
  {
    name: "Vercel",
    icon: Network,
    description: "Global Edge Deployment",
    color: "text-[#000000]",
    bg: "bg-[#000000]/10",
  },
  {
    name: "Framer Motion",
    icon: Wand2,
    description: "Interactive Animations",
    color: "text-[#FF0055]",
    bg: "bg-[#FF0055]/10",
  }
];

export function ToolsWeUse() {
  return (
    <section className="mt-24 mb-12 sm:mt-32 sm:mb-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
          How We Automate Things
        </h2>
        <p className="mt-4 text-[#6E6E82] text-lg sm:text-xl leading-relaxed">
          We leverage industry-leading digital marketing and automation tools to craft intelligent workflows, 
          connect custom API dashboards, and drive AI engineering for exponential business scale.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 border border-[#E4E4EB] rounded-2xl bg-white hover:border-[#5B3CF5]/30 hover:shadow-xl hover:shadow-[#5B3CF5]/5 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#0D0D12] text-center">
                {tool.name}
              </h3>
              <p className="mt-2 text-xs text-[#6E6E82] text-center font-medium leading-relaxed">
                {tool.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
