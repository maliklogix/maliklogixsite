# MalikLogix — Antigravity Build Prompt
# Paste this entire prompt into Antigravity and attach the founder photo when submitting.
# Do NOT invent a new design — match maliklogix.com exactly as it exists today.

---

## SITE CONTEXT

**Website:** maliklogix.com
**Framework:** Next.js + Tailwind CSS, deployed on Vercel
**Design style:** Clean, minimal, white background, simple typography — no dark mode, no gradients, no fancy effects
**Existing nav structure (from /about page — use this everywhere):**

```
Logo | [Work ▾] | [Learn ▾] | [Tools ▾] | Blog | Pricing | Contact | [Get Started →]

Work dropdown:    AI Marketing, Automation, Content AI, SEO & GEO, Case Studies, Portfolio
Learn dropdown:   Docs, Newsletter, Blog  ← ADD "The Founder" here (see below)
Tools dropdown:   Free Tools, AI Skills Directory, OpenClaw, Collaborations
```

**Color palette (scraped from live site — use ONLY these):**
```
Background:       #ffffff (white)
Page background:  #f9f9f7 (very light warm gray — used for sections)
Text primary:     #111111 (near black)
Text secondary:   #555555 (medium gray)
Text muted:       #888888 (light gray)
Accent/CTA:       #111111 (black buttons with white text)
Border:           #e5e5e5 (light gray borders)
Link color:       #111111 underline on hover
Badge/tag bg:     #f3f3f0 (light gray pill backgrounds)
```

**Typography (match live site):**
```
Font family:      System font stack / Inter or similar sans-serif — whatever the site uses
Headings:         font-weight: 700, tight letter-spacing
Body:             font-weight: 400, line-height 1.7
Labels/eyebrows:  font-weight: 500, uppercase, letter-spacing 0.08em, small size (0.7rem)
```

**Component patterns from live site:**
- Sections use `max-w-4xl` or `max-w-3xl` centered with generous padding
- Cards: white bg, `border border-[#e5e5e5]`, `rounded-lg`, simple padding — no shadows
- Buttons: black bg + white text (primary), or plain text link with `→` arrow (secondary)
- Stats: large bold number, small muted label below — no decorative containers
- No animations, no hover effects beyond simple underline/color change
- Prose sections: clean paragraphs, `text-[#555]`, `leading-relaxed`

---

## FOUNDER PROFILE — ALL COPY IS FINAL, USE EXACTLY AS WRITTEN

```
Name:         Malik Farooq
Title:        Founder, MalikLogix
Location:     Lahore, Pakistan
Education:    BS Computer Science — University of Sargodha
GitHub:       https://github.com/maliklogix
Email:        hello@maliklogix.com
```

**Photo:** [ATTACH IMAGE WHEN SUBMITTING]
A professional headshot — young South Asian male, navy blue suit, white shirt, grey tie, teal studio background.
Save to: `/public/malik-farooq.jpg`
Use at: `/founder` (large) and `/about` (smaller card)

---

## MALIK FAROOQ — BIOGRAPHY COPY

Use this copy verbatim across the Founder page and About page. Do not shorten or rewrite it.

### Short bio (for cards, about page, meta descriptions):
> Malik Farooq is the founder of MalikLogix and an AI specialist working at the intersection of artificial intelligence and digital marketing. He builds intelligent marketing systems — from LLM-powered automation to AI-driven SEO — that help businesses grow without scaling headcount.

### Full bio (for /founder page):
> Malik Farooq founded MalikLogix with a straightforward mission: bring engineering-grade AI to digital marketing. Based in Lahore, Pakistan, with a BS in Computer Science from the University of Sargodha, Malik sits at a rare crossroads — deep technical AI knowledge combined with hands-on digital marketing execution.

> Most agencies talk about AI. Malik builds it. His day-to-day involves designing agentic AI systems, building RAG pipelines that ground AI responses in real business data, engineering e-commerce automation flows that run 24/7, and developing the kind of LLM-powered marketing infrastructure that most agencies are still calling "the future."

> Before founding MalikLogix, Malik spent years learning both sides of the stack — studying how search engines rank content, how automation workflows replace manual work, how AI models can be orchestrated to handle tasks that used to need an entire team. That dual expertise — AI engineering + growth marketing — is the foundation MalikLogix is built on.

> Today he leads a focused team that builds AI-powered SEO systems, n8n automation workflows, Shopify growth engines, predictive analytics dashboards, and custom AI chatbots. He is currently deep in agentic AI and e-commerce automation, and is actively exploring multi-agent architectures and multi-modal AI applications.

> He is open to collaborations on AI systems, e-commerce automation, and agentic AI projects.

### What Malik does — dual role description (use in skills/expertise section):

**As an AI Specialist:**
Malik designs and builds production-grade AI systems — not demos, not experiments. This includes agentic AI pipelines where LLMs plan and execute multi-step tasks autonomously, RAG systems that connect AI to proprietary business knowledge, prompt engineering for specific business outcomes, ML pipelines for predictive analytics, and multi-modal AI integrations. He works with OpenAI, Anthropic Claude, and open-source models, and uses n8n and Make.com to connect AI to real business workflows.

**As an AI Digital Marketer:**
Malik applies AI across the full marketing funnel — AI-assisted SEO that targets high-intent keywords and optimises for AI Overviews and GEO (Generative Engine Optimisation), content engines that produce on-brand content at scale, lead scoring systems that rank prospects by conversion likelihood, e-commerce personalisation flows that increase AOV automatically, and marketing automation that reduces response time from hours to minutes.

**The combination:**
Most AI specialists can't run a marketing campaign. Most marketers can't build an AI pipeline. Malik does both — which is why MalikLogix delivers systems that actually ship, not just decks that propose them.

---

## EXPERTISE LIST — USE EXACTLY (for skills grid on /founder page)

```
01  Agentic AI Systems & LLM Orchestration
    Builds multi-agent pipelines where AI models plan, route decisions, and execute
    multi-step tasks with minimal human input. Uses OpenAI, Claude, and open-source LLMs.

02  RAG Pipelines (Retrieval-Augmented Generation)
    Connects AI to real business data — product catalogues, support docs, CRM records —
    so responses are grounded in facts, not hallucinations.

03  AI Digital Marketing
    Full-funnel marketing systems powered by AI: SEO strategy, content engines,
    lead automation, conversion optimisation, and weekly performance tracking loops.

04  SEO & GEO (Generative Engine Optimisation)
    Rank in Google search and inside AI-generated answers — ChatGPT, Perplexity,
    Claude, and Google AI Overviews. Search is no longer one channel.

05  n8n & Marketing Automation
    Workflow pipelines that replace 80% of repetitive marketing and ops work.
    Built, versioned, tested, and observable — not black-box automations.

06  E-commerce AI (Shopify)
    Lead scoring models, product recommendation engines, upsell flows, and
    customer analytics that grow AOV and repeat purchase rate automatically.

07  Predictive Analytics & ML Pipelines
    Machine learning models that forecast churn, predict LTV, and surface
    which customers to prioritise — connected to real dashboards.

08  Data Engineering & Dashboard Development
    Custom analytics infrastructure built on Supabase + Next.js that replaces
    12 disconnected tools with one source of truth.

09  Prompt Engineering & AI R&D
    Systematic prompt design for production use cases — not one-off prompts.
    Builds reusable prompt libraries, evaluation frameworks, and AI testing pipelines.
```

---

## CURRENTLY SECTION — USE IN /founder PAGE

```
🔨  Currently building:   Agentic AI systems and e-commerce automation for global brands
📚  Currently learning:   Advanced multi-agent architectures and multi-modal AI applications
🤝  Open to:             Collaborations on AI systems, e-commerce automation, and agentic AI projects
```

---

## PAGE 1 — `/founder` (NEW PAGE — CREATE THIS)

**Page route:** `/founder`
**Page title:** `Malik Farooq — Founder | MalikLogix`
**Meta description:** `Malik Farooq is an AI specialist and digital marketer. Founder of MalikLogix. Builds agentic AI systems, RAG pipelines, and AI-powered marketing infrastructure.`

### Layout — match the clean style of /about page exactly:

**Section 1 — Intro (two column)**
Left column: founder photo (large, portrait aspect ratio, simple rounded border matching site style)
Right column:
- Small eyebrow label: "FOUNDER · AI SPECIALIST · DIGITAL MARKETER"
- H1: "Malik Farooq"
- Location line: "Lahore, Pakistan · BS Computer Science, University of Sargodha"
- Paragraph: use the SHORT BIO from above
- Two links:
  - Primary button: "Work with Malik →" → /contact
  - Text link with GitHub SVG icon: "github.com/maliklogix" → https://github.com/maliklogix (opens new tab)

**Section 2 — About Malik (full bio)**
- H2: "AI Specialist. Digital Marketer. Builder."
- Three sub-sections with small H3 headings and paragraphs. Use the FULL BIO copy from above, split into the three sub-sections:
  1. H3: "The background" — first two paragraphs
  2. H3: "As an AI Specialist" — use AI Specialist copy from above
  3. H3: "As an AI Digital Marketer" — use AI Digital Marketer copy from above
  4. H3: "The combination" — use The combination paragraph from above

**Section 3 — Expertise (9-item grid)**
- H2: "What I build"
- 3×3 grid of simple cards (white bg, light border, matching /services page card style)
- Each card: number label (01–09), bold title, short description
- Use the EXPERTISE LIST from above exactly

**Section 4 — Currently**
- H2: "Right now"
- 3 simple horizontal rows or cards: icon + label + description
- Use CURRENTLY SECTION copy from above

**Section 5 — GitHub strip**
- Simple full-width row with left-aligned text and a button on the right
- Left: "See what I'm building in public."
- Subtext: "Open-source tools, automation templates, and AI experiments on GitHub."
- Button: GitHub SVG icon + "github.com/maliklogix" → https://github.com/maliklogix (new tab, outline style button matching site)

**Section 6 — CTA**
- Match style of CTA sections on /about and /services
- Heading: "Want to build something with AI?"
- Subtext: "Whether you need a marketing system, an automation pipeline, or a full AI strategy — let's talk."
- Button: "Get in touch →" → /contact

---

## PAGE 2 — `/about` (UPDATE EXISTING PAGE)

Keep all existing content. ADD the following sections — do not remove what is already there:

**ADD after "Who We Are" section:**

### Founder Card (new)
Simple horizontal card with:
- Left: founder photo (smaller, ~120px square or portrait, same photo from /public/malik-farooq.jpg)
- Right:
  - Name: "Malik Farooq"
  - Role: "Founder & AI Specialist"
  - Short bio: use the SHORT BIO from above
  - Two links: "Full story →" → /founder | GitHub icon → https://github.com/maliklogix

**ADD after the "How We Think" section, before the CTA:**

### Client Results (new stats section)
- H2: "Results from real engagements"
- 4 stat blocks in a row (match existing stats style on homepage):
  - 58% / Reduction in support tickets using AI triage
  - 3.2× / Increase in organic traffic within 90 days
  - 40% / Faster lead response using n8n + Claude
  - 10,000+ / Business owners in the newsletter
- Small note below: "Numbers from anonymised client engagements. Results vary by business." (already exists on homepage — match that style)

### Testimonials (new — 6 cards)
- H2: "What clients say"
- 3-column grid of testimonial cards (white bg, light border, same card style as rest of site)
- Each card: star rating (★★★★★), quote, avatar + name + role

Use these 6 testimonials exactly:
```
1. Avatar: https://i.pravatar.cc/48?u=sarah-k
   Name: Sarah K.
   Role: DTC Brand Founder, USA
   Quote: "MalikLogix rebuilt our entire content system with AI. Organic traffic tripled in under three months. The reporting dashboard alone is worth the retainer."

2. Avatar: https://i.pravatar.cc/48?u=james-r
   Name: James R.
   Role: Growth Lead, SaaS Startup, UK
   Quote: "Their n8n automation cut our lead response time from four hours to under fifteen minutes. That change alone closed two enterprise deals we would have lost."

3. Avatar: https://i.pravatar.cc/48?u=aisha-m
   Name: Aisha M.
   Role: Agency Owner, UAE
   Quote: "Finding a team that speaks both engineering and marketing is rare. Malik built us a lead scoring system that tells us exactly which prospects to call first."

4. Avatar: https://i.pravatar.cc/48?u=omar-t
   Name: Omar T.
   Role: E-commerce Director, Canada
   Quote: "Shopify AOV went up 28% after the AI upsell flow went live. The whole thing was set up in two weeks. I wish I had found them a year earlier."

5. Avatar: https://i.pravatar.cc/48?u=lena-w
   Name: Lena W.
   Role: Marketing Manager, Germany
   Quote: "We now appear in ChatGPT answers and Google AI Overviews for our core keywords. Their SEO and GEO approach is genuinely ahead of what most agencies are doing."

6. Avatar: https://i.pravatar.cc/48?u=bilal-s
   Name: Bilal S.
   Role: Startup Founder, Pakistan
   Quote: "As a Pakistani startup we needed an agency that understood both global standards and our market. MalikLogix delivered. ROI was visible within the first 30 days."
```

---

## PAGE 3 — `/` HOMEPAGE (ADD SECTIONS TO EXISTING)

Do NOT rebuild the homepage. Add these sections to the existing page in the positions described.

**ADD 1 — After the hero, before "AI Digital Marketing That Drives Revenue":**

Social proof bar (one row, centered, simple):
```
Trusted by brands in:  🇺🇸 USA  ·  🇬🇧 UK  ·  🇦🇪 UAE  ·  🇩🇪 Germany  ·  🇨🇦 Canada  ·  🇵🇰 Pakistan
```
Style: small text, muted color, centered, light separator line above and below. Match the low-key style of the site.

**ADD 2 — After the existing 3-step process section:**

Simple examples under each stage (add small italic or muted text below each stage description):
- Stage 1: *"Example: 47 keyword clusters identified in week one, 12 quick-win pages prioritised."*
- Stage 2: *"Example: 9-step nurture sequence automated end-to-end, zero manual follow-up."*
- Stage 3: *"Example: CAC reduced 34% within 60 days by cutting two underperforming channels."*

**ADD 3 — After the existing stats section (58%, 3.2×, 40%):**

Testimonials section — use the EXACT SAME 6 testimonials and component from /about page. Build it as a shared component `/components/Testimonials.tsx` used on both pages.

**ADD 4 — After the "How We Automate Things" tools section:**

Services overview (simple grid):
- H2: "What we do"
- 3-column grid, 6 cards, each with: bold title + one sentence + "Learn more →" link
```
AI Marketing        → AI-powered campaigns that learn and improve every week.               → /services/ai-marketing
Automation          → n8n and Make.com workflows that replace manual repetitive work.        → /services/automation
Content AI          → High-velocity, on-brand content at scale without sacrificing quality.  → /services/content-creation
SEO & GEO           → Rank in Google and inside AI-generated answers simultaneously.         → /services/seo-geo
Shopify AI          → Upsell flows, bundles, and AOV optimisation running on autopilot.      → /services/shopify
AI Chatbots         → 24/7 customer chat that actually understands your business context.    → /services/ai-chatbots
```

**ADD 5 — Before the footer / newsletter section:**

Learn about the agency (simple two-card row):
- Small heading: "Learn more"
- Two side-by-side simple cards (matching existing card style):
  - Card 1: "About MalikLogix" / "Pakistan's AI agency for global brands." / "Read our story →" → /about
  - Card 2: "Meet the Founder" / "Malik Farooq — AI specialist and digital marketer." / "Founder story →" → /founder

---

## NAVIGATION UPDATE

The /about page already has the correct nav with Work / Learn / Tools dropdowns.
Make sure ALL pages use this same nav component consistently.

**Add to the Learn dropdown — one new item at the top:**
```
Learn dropdown (updated):
  ✦ The Founder    → /founder     ← ADD THIS (put it first, slightly bold or with a dot indicator)
  Docs             → /docs
  Newsletter       → /newsletter
  Blog             → /blog
```

Style the "The Founder" item to stand out slightly — could be a small dot, slightly darker text, or a simple label — but keep it consistent with the site's minimal style. Nothing fancy.

---

## SHARED COMPONENTS TO CREATE

```
/components/Testimonials.tsx
  — 6 testimonial cards in a 3-column grid
  — Used on: /about and / (homepage)
  — Props: optional heading override

/components/FounderCard.tsx
  — Small horizontal card with photo, name, role, short bio, links
  — Used on: /about page (inside "Who We Are" section)
```

---

## FILE CHECKLIST

```
/public/malik-farooq.jpg              ← Save attached founder photo here
/app/founder/page.tsx                 ← New page
/app/about/page.tsx                   ← Updated (add sections, keep existing)
/app/page.tsx                         ← Updated (add sections, keep existing)
/components/Testimonials.tsx          ← New shared component
/components/FounderCard.tsx           ← New shared component
```

---

## STYLE RULES — CRITICAL, READ CAREFULLY

1. **Match the live site exactly.** Go to maliklogix.com/about and use that page as the style reference for everything. Same whitespace, same card borders, same font sizes, same button style.

2. **White background everywhere.** No dark sections, no dark cards, no gradient backgrounds. The existing site is fully light/white — keep it that way.

3. **No fancy effects.** No animations on load, no parallax, no glassmorphism, no colour gradients. Simple clean transitions only (hover underline, button colour change).

4. **Simple cards.** White background + `border border-gray-200` + `rounded-lg` + padding. That is the card pattern on this site. Use it consistently.

5. **Buttons:** Primary = black bg, white text, `rounded-md`. Secondary = plain text link with `→` arrow. That's it.

6. **Images:** Use `next/image` with proper `alt` text. Founder photo must have `alt="Malik Farooq — Founder of MalikLogix"`.

7. **Pravatar avatars for testimonials:** `https://i.pravatar.cc/48?u=[unique-string]` — these are reliable, deterministic, always load. Use them for all 6 testimonials.

8. **All external links** (`github.com`) must have `target="_blank" rel="noopener noreferrer"`.

9. **Mobile responsive.** All grids collapse to single column below 640px. Nav collapses to hamburger.

10. **Reuse components.** Testimonials and FounderCard appear on multiple pages — build them as shared components, not copy-pasted code.

---

## SUMMARY TABLE

| # | Change | Page | Type |
|---|--------|------|------|
| 1 | New Founder page — full bio, photo, expertise, GitHub | /founder | New page |
| 2 | Add Founder Card to about page | /about | Add section |
| 3 | Add Client Results stats to about page | /about | Add section |
| 4 | Add Testimonials (6 cards) to about page | /about | Add section |
| 5 | Add "The Founder" to Learn dropdown (all pages) | Nav | Update component |
| 6 | Add country trust bar to homepage | / | Add section |
| 7 | Add stage examples to 3-step process | / | Update section |
| 8 | Add Testimonials (shared component) to homepage | / | Add section |
| 9 | Add Services overview grid to homepage | / | Add section |
| 10 | Add Learn About Agency 2-card section to homepage | / | Add section |

---

*Attach photo when submitting: Malik Farooq headshot — navy suit, teal background, saved to /public/malik-farooq.jpg*
