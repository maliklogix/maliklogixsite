import Link from 'next/link';

export default function AIChatbotsServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">AI Chatbots & Assistants</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        24/7 Intelligent Support that Actually Solves Problems
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We build custom AI agents trained on your specific business data. No more &quot;I don&apos;t understand&quot; responses—just
        instant, accurate help for your customers and qualified leads for your sales team.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Our Approach</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>We ingest your knowledge base, docs, and past support tickets into a secure vector database.</li>
            <li>We design a persona that matches your brand voice—helpful, professional, or witty.</li>
            <li>We integrate the bot into your website, WhatsApp, Slack, or Instagram DMs.</li>
            <li>We implement &quot;Human-in-the-loop&quot; handovers for complex issues that need a person.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Key Capabilities</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• Instant answers to complex product and pricing questions.</li>
            <li>• Automated lead qualification and calendar booking.</li>
            <li>• Multi-lingual support for global customer bases.</li>
            <li>• Transactional actions (checking order status, updating info).</li>
            <li>• Sentiment analysis to prioritize angry customers for human staff.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Stop losing leads to wait times</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Every second a customer waits is a second they might spend looking at a competitor. Our AI bots respond in milliseconds.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Build your AI agent →
        </Link>
      </div>
    </section>
  );
}
