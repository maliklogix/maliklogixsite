import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Digital Marketing Course Outline',
  description: 'Complete outline for the Artificial Intelligence in Digital Marketing training course. Learn to leverage AI for data analytics, automation, and predictive models.',
};

const navItems = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'methodology', label: 'Training Methodology' },
  { id: 'organisational-impact', label: 'Organisational Impact' },
  { id: 'personal-impact', label: 'Personal Impact' },
  { id: 'who-should-attend', label: 'Who Should Attend?' },
  { id: 'course-outline', label: 'Course Outline' },
];

export default function AIDigitalMarketingCourse() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8">
        <Link href="/docs" className="text-sm font-semibold text-[#5B3CF5] hover:underline">
          ← Back to Docs
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#0D0D12] sm:text-5xl">
          Artificial Intelligence (AI) in Digital Marketing
        </h1>
        <p className="mt-3 text-lg text-[#6E6E82]">
          A comprehensive training course to future-proof your marketing strategy and deliver measurable results using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] lg:gap-16">
        {/* Sidebar */}
        <aside className="hidden md:block sticky top-[50vh] -translate-y-1/2 self-start h-fit z-10 transition-all duration-300">
          <div className="rounded-2xl border border-[#E4E4EB] bg-[#FAFAFC] p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D12]">Jump To</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-medium text-[#6E6E82] hover:text-[#5B3CF5] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="prose prose-blue max-w-none prose-headings:font-heading prose-headings:text-[#0D0D12] prose-p:text-[#6E6E82] prose-li:text-[#6E6E82] prose-strong:text-[#0D0D12] prose-a:text-[#5B3CF5]">
          <section id="introduction" className="scroll-mt-32 mb-12">
            <h2>Introduction</h2>
            <p>
              This training course provides an in-depth view of how artificial intelligence is reshaping digital marketing across all industries. With consumer behavior becoming increasingly complex, AI has emerged as a powerful asset—capable of analyzing vast datasets, predicting industry trends, and automating key processes to drive highly effective marketing performance. Participants will learn how the strategic integration of AI helps connect with the right audience precisely when they are most likely to convert.
            </p>
            <p>
              Through real-world examples and hands-on frameworks, this course demonstrates how organizations can harness AI to create data-driven and highly successful marketing campaigns. From audience segmentation to predictive analytics, you will acquire practical techniques to modernize your marketing approach and deliver easily tangible results. Join us to unlock the true potential of AI and revolutionize how you handle digital marketing.
            </p>
            <p>
              <strong>This Artificial Intelligence in Digital Marketing training course will highlight:</strong>
            </p>
            <ul>
              <li>The transition from traditional marketing to AI-driven strategies</li>
              <li>Top-tier AI tools used for deep data analytics and automation workflows</li>
              <li>Predictive models that significantly improve return on marketing investment (ROI)</li>
              <li>Sophisticated techniques for smarter, personalized customer engagement</li>
              <li>Key trends and ongoing innovations shaping the marketing landscape of the future</li>
            </ul>
          </section>

          <section id="objectives" className="scroll-mt-32 mb-12">
            <h2>Objectives</h2>
            <p>By the end of this AI in Digital Marketing training course, you will be able to:</p>
            <ul>
              <li>Recognize and use core AI tools that are transforming digital marketing</li>
              <li>Execute highly targeted, data-backed audience segmentation strategies</li>
              <li>Improve and optimize campaigns using predictive analytics and intelligent automation</li>
              <li>Assess and leverage innovative AI techniques to maintain a sharp competitive edge</li>
              <li>Build highly effective, sustainable digital marketing plans geared for the future</li>
            </ul>
          </section>

          <section id="methodology" className="scroll-mt-32 mb-12">
            <h2>Training Methodology</h2>
            <p>
              The course combines professional lectures, comprehensive real-world case studies, and interactive practical workshops. By directly experimenting with popular AI platforms during the sessions, participants will build the necessary confidence to independently plan, strategize, and execute their own AI-centric marketing operations.
            </p>
          </section>

          <section id="organisational-impact" className="scroll-mt-32 mb-12">
            <h2>Organisational Impact</h2>
            <p>Companies that invest in this training course will benefit from:</p>
            <ul>
              <li>Streamlined marketing timelines through efficient automation and intelligent tools</li>
              <li>Stronger campaign performance directly fueled by detailed predictive forecasting</li>
              <li>A firmer grasp of target markets through logical, data-led strategic decisions</li>
              <li>Lower operational costs as AI aids in smarter resource and budget allocation</li>
              <li>Higher levels of customer engagement and loyalty due to hyper-personalized messaging</li>
              <li>A solid foundation for adapting quickly to the next big shifts in digital marketing</li>
            </ul>
          </section>

          <section id="personal-impact" className="scroll-mt-32 mb-12">
            <h2>Personal Impact</h2>
            <p>Professionals who finish this course will be equipped to:</p>
            <ul>
              <li>Enhance their strategic marketing capabilities with actionable AI insights</li>
              <li>Diversify their professional skills and open doors to advanced career progression</li>
              <li>Formulate clear roadmaps for bringing AI into their everyday work processes</li>
              <li>Analyze deep data and make confident, high-level marketing decisions smoothly</li>
              <li>Demonstrate strong leadership in adopting modern, cutting-edge digital approaches</li>
              <li>Establish themselves as forward-thinking pioneers in their marketing teams</li>
            </ul>
          </section>

          <section id="who-should-attend" className="scroll-mt-32 mb-12">
            <h2>Who Should Attend?</h2>
            <p>This training course is designed for a broad spectrum of marketing professionals and strategic leaders. It is particularly ideal for:</p>
            <ul>
              <li>Marketing Directors, Heads of Marketing, and Senior Managers</li>
              <li>Digital Marketing Specialists, SEO Experts, and Content Strategists</li>
              <li>Data Analysts seeking to merge their technical skills with marketing needs</li>
              <li>Product Managers looking to incorporate market-led insights into product growth</li>
              <li>Any professional desiring to modernize and optimize their digital marketing skills using AI</li>
            </ul>
          </section>

          <section id="course-outline" className="scroll-mt-32 mb-12">
            <h2>Course Outline</h2>
            <p>This immersive five-day agenda breaks down the complexities of AI marketing into manageable, actionable steps, equipping you from basics to advanced integration.</p>
            
            <div className="space-y-8 mt-6">
              <div className="rounded-xl bg-[#F7F7FA] p-6 border border-[#E4E4EB]">
                <h3 className="mt-0 text-xl font-bold text-[#5B3CF5]">Day 1: AI Foundations and Marketing Synergy</h3>
                <p className="text-sm font-medium leading-relaxed">
                  We lay the groundwork by exploring exactly what AI means in today's marketing landscape. You'll move beyond the buzzwords, discovering how foundational AI models operate and how machine learning specifically aids campaign performance. 
                  This session focuses heavily on data hygiene—the fuel for any powerful AI.
                </p>
                <ul className="mb-0">
                  <li>Introduction to core AI concepts within the current marketing landscape</li>
                  <li>Understanding AI's direct role in streamlining day-to-day processes</li>
                  <li>Exploring the key differences between machine learning and deep learning</li>
                  <li>Learning the fundamentals of data acquisition and careful management</li>
                  <li>Distinguishing narrow AI functionalities from broader AI applications</li>
                  <li>Reviewing the historical evolution of AI-driven marketing practices</li>
                  <li>Examining major platforms and industry-standard tools available today</li>
                  <li>Forecasting how AI will manipulate competitive environments in the near future</li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#F7F7FA] p-6 border border-[#E4E4EB]">
                <h3 className="mt-0 text-xl font-bold text-[#5B3CF5]">Day 2: Data-Driven Targeting and Customer Insights</h3>
                <p className="text-sm font-medium leading-relaxed">
                  Day 2 delves into audience intelligence. By leveraging Natural Language Processing and deep analytics, you will learn to map complex consumer journeys accurately. We'll show you how AI uncovers hidden behavioral trends, allowing for incredibly precise dynamic targeting that connects with 
                  audiences on a personal level.
                </p>
                <ul className="mb-0">
                  <li>Strategically collecting and structuring data for robust analytical outputs</li>
                  <li>Applying Natural Language Processing (NLP) to unearth genuine consumer sentiment</li>
                  <li>Using highly accurate predictive analytics for nuanced audience segmentation</li>
                  <li>Drafting comprehensive, AI-powered customer journey maps from start to finish</li>
                  <li>Spotting obscure purchasing patterns via advanced data visualization techniques</li>
                  <li>Implementing dynamic, real-time customer profiles for pinpoint ad targeting</li>
                  <li>Deploying automated social listening tools to intuitively refine active campaigns</li>
                  <li>Auditing data to ensure integrity and high-quality, reliable structural insights</li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#F7F7FA] p-6 border border-[#E4E4EB]">
                <h3 className="mt-0 text-xl font-bold text-[#5B3CF5]">Day 3: Automation and Optimization in AI Marketing</h3>
                <p className="text-sm font-medium leading-relaxed">
                  Transform how you execute plans by automating mundane tasks and setting up complex programmatic actions. You'll learn to curate sophisticated lead scoring tracks and implement smart recommendation engines. This module transitions you 
                  from manual grinding to overseeing highly-tuned, self-optimizing marketing machines.
                </p>
                <ul className="mb-0">
                  <li>Deploying capable AI to fully automate repetitive, time-consuming marketing tasks</li>
                  <li>Activating intelligent ad placements across programmatic advertising networks</li>
                  <li>Engineering advanced lead scoring frameworks and continuous nurturing workflows</li>
                  <li>Applying interactive recommendation engines for subtle product upselling</li>
                  <li>Leveraging autonomous chatbots and virtual assistants for instant customer support</li>
                  <li>Benchmarking overall business performance with AI-driven dashboard analytics</li>
                  <li>Adopting generative AI solutions for automated content curation and scheduling</li>
                  <li>Identifying and overcoming the potential risks associated with aggressive marketing automation</li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#F7F7FA] p-6 border border-[#E4E4EB]">
                <h3 className="mt-0 text-xl font-bold text-[#5B3CF5]">Day 4: Innovation, Ethics, and Compliance in AI Marketing</h3>
                <p className="text-sm font-medium leading-relaxed">
                  As AI becomes deeply ingrained in society, maintaining brand integrity is vital. We will dissect the ethical considerations of AI, including mitigating bias and understanding stringent data privacy laws. You'll learn how to balance smart
                  automation with essential human oversight to cultivate brand trust.
                </p>
                <ul className="mb-0">
                  <li>Tracking and integrating cutting-edge AI marketing innovations to stay relevant</li>
                  <li>Testing immersive elements like Augmented and Virtual Reality within campaigns</li>
                  <li>Deeply analyzing the ethical concerns and inherent bias presented by various AI models</li>
                  <li>Structuring campaigns around strict data privacy laws and global compliance frameworks</li>
                  <li>Perfecting the delicate balance between systemic AI automation and necessary human oversight</li>
                  <li>Protecting and managing corporate brand reputation in an increasingly AI-regulated world</li>
                  <li>Fostering responsible and transparent usage of AI tools within organizational teams</li>
                  <li>Collaboratively brainstorming solutions to rapidly evolving ethical dilemmas locally and globally</li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#F7F7FA] p-6 border border-[#E4E4EB]">
                <h3 className="mt-0 text-xl font-bold text-[#5B3CF5]">Day 5: Roadmap for Sustainable AI Marketing Success</h3>
                <p className="text-sm font-medium leading-relaxed">
                  The final day revolves around creating an executable, long-term AI strategy specifically for your business. We will focus on calculating ROI, justifying technology budgets, and organizing internal shifts. You'll leave with a practical
                  blueprint outlining exactly how to initiate and scale AI within your unique environment.
                </p>
                <ul className="mb-0">
                  <li>Drafting a cohesive, highly specific timeline for AI technological integration</li>
                  <li>Effectively prioritizing budgets and securing resources for early-stage AI initiatives</li>
                  <li>Encouraging cross-functional collaboration and developing new team capabilities</li>
                  <li>Formulating sustained, long-term frameworks for constant performance measurement</li>
                  <li>Correctly assessing the financial and productive ROI of various AI-driven marketing tactics</li>
                  <li>Consolidating documentation of industry lessons learned and emerging best practices</li>
                  <li>Outlining strategic approaches for phase two of an organization's AI transformation</li>
                  <li>Recapping core principles and defining immediate post-training steps to take on Monday morning</li>
                </ul>
              </div>
            </div>
          </section>
          
          <hr className="my-10 border-[#E4E4EB]" />
          
          <section className="bg-white rounded-2xl border border-[#E4E4EB] p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5B3CF5]/10 text-[#5B3CF5] mb-6">
              <svg xmlns="http://www.w3.org/-2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#0D0D12] mt-0">Ready to master AI Marketing?</h2>
            <p className="mt-2 text-[#6E6E82]">
              Turn basic knowledge into reliable revenue. Contact MalikLogix today to get personalized consulting, corporate training outlines, or inquire about our managed digital services.
            </p>
            <div className="mt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-8 py-3 font-semibold text-white transition-all hover:bg-[#7C5CFA] hover:shadow-lg hover:shadow-[#5B3CF5]/20"
              >
                Contact MalikLogix
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
