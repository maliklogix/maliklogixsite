'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Tool = {
  href: string;
  name: string;
  description: string;
  detailsTitle: string;
  detailsBody: string;
  bullets: string[];
};

export default function ToolsPage() {
  const tools: Tool[] = useMemo(
    () => [
      {
        href: '/tools/roi-calculator',
        name: 'AI ROI Calculator',
        description: 'Estimate how much extra revenue AI marketing can unlock for you.',
        detailsTitle: 'What this calculates',
        detailsBody:
          'We estimate how much additional revenue your AI system could unlock based on your current spend and traffic signals.',
        bullets: [
          'Projected traffic growth assumptions',
          'Estimated extra revenue per month',
          'ROI as net gain divided by spend',
          'Clear “what to do next” CTA',
        ],
      },
      {
        href: '/tools/seo-analyzer',
        name: 'AI SEO Analyzer',
        description: 'Drop in a URL and get an instant AI SEO score with quick wins.',
        detailsTitle: 'What you get',
        detailsBody:
          'Paste a URL and receive a fast structured breakdown: score, wins, issues, and recommendations to improve AI discoverability.',
        bullets: [
          'Score + grade (with reasoning)',
          'Top quick wins to implement today',
          'Issues ranked by impact',
          'Action plan suggestions',
        ],
      },
      {
        href: '/tools/ai-copy-generator',
        name: 'AI Copy Generator',
        description: 'Generate ad copy, headlines, and CTAs in seconds.',
        detailsTitle: 'Output style',
        detailsBody:
          'We generate short, conversion-focused variations. You can copy them and refine based on your offer and audience.',
        bullets: [
          '3 variations per request',
          'Tone selection support (e.g., professional, urgent)',
          'Platform-specific formatting',
          'Copy-ready text you can paste instantly',
        ],
      },
      {
        href: '/tools/fba-calculator',
        name: 'Amazon Wholesale FBA Calculator',
        description: 'Calculate your net profit per unit and total profit for an FBA deal.',
        detailsTitle: 'What this tool calculates',
        detailsBody:
          'Input your wholesale cost, Amazon referral/fulfillment costs, and shipping. We’ll compute net profit and ROI.',
        bullets: [
          'Net profit per unit',
          'Total net profit for your quantity',
          'Break-even check and ROI %',
          'Simple inputs you can adjust fast',
        ],
      },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>(tools[0]!);

  function onOpenTool(tool: Tool) {
    setActiveTool(tool);
    setOpen(true);
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">Free AI Tools for Your Business</h1>
      <p className="mt-4 text-[#6E6E82] max-w-2xl">
        Use these tools to get a feel for how AI can improve your marketing (and your numbers) before you invest.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <button
            key={tool.href}
            type="button"
            onClick={() => onOpenTool(tool)}
            className="group text-left rounded-2xl border border-[#E4E4EB] bg-white p-5 hover:border-[#5B3CF5] hover:-translate-y-1 transition-all"
            aria-label={`Open details for ${tool.name}`}
          >
            <h2 className="font-heading text-lg font-semibold text-[#0D0D12] group-hover:text-[#5B3CF5]">
              {tool.name}
            </h2>
            <p className="mt-2 text-sm text-[#6E6E82]">{tool.description}</p>
            <div className="mt-3 text-sm font-semibold text-[#5B3CF5]">View details →</div>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{activeTool.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold text-[#0D0D12]">{activeTool.detailsTitle}</div>
              <p className="mt-2 text-[#6E6E82]">{activeTool.detailsBody}</p>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {activeTool.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[#0D0D12]">
                  <span className="mt-0.5 inline-flex h-5 w-5 rounded-full bg-[#F0ECFF] text-[#5B3CF5] items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-[#6E6E82]">{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={activeTool.href}
                className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
                onClick={() => setOpen(false)}
              >
                Open tool →
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-[#E4E4EB] bg-white px-6 py-3 text-sm font-semibold text-[#0D0D12] hover:bg-[#F7F7FA] transition-colors"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

