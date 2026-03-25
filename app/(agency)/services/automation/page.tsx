export default function AutomationServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">AI Automation</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        Turn Your Business Into an Automated Growth Machine
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We connect every tool you use—CRM, ads, email, support, payments—into one AI-powered system that executes
        your playbook without needing a 20-person team.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">How it works</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>We map your current workflows across marketing, sales, and support.</li>
            <li>We design an ideal “AI-first” version with fewer steps and clear owners.</li>
            <li>We implement automations using tools like n8n, Zapier, custom Node.js workers, and GPT/Claude flows.</li>
            <li>Your team gets a simple dashboard and SOPs—no technical knowledge required.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">What we typically automate</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• Lead capture → qualification → CRM enrichment → routing to sales.</li>
            <li>• Abandoned cart and win-back sequences powered by AI copy.</li>
            <li>• Weekly KPI reporting across ads, email, SEO, and revenue.</li>
            <li>• Support triage with AI chatbots that handle 60–80% of tickets.</li>
            <li>• Internal notifications and approvals in Slack/Teams.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">From manual chaos to AI orchestration</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Most teams run on copy-pasted spreadsheets and half-broken zaps. We replace that with a robust automation
            layer that you can trust.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Talk about AI automation →
        </a>
      </div>
    </section>
  );
}

