-- ─────────────────────────────────────────────
-- MalikLogix Full Schema
-- ─────────────────────────────────────────────

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- NEWSLETTER POSTS  (the blog/newsletter posts)
-- ─────────────────────────────────────────────
CREATE TABLE public.posts (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT NOT NULL,
  subtitle        TEXT,                           -- shown as card subtitle (like 8020ai)
  slug            TEXT UNIQUE NOT NULL,
  content_html    TEXT,                           -- full HTML rendered post body
  cover_image_url TEXT,                           -- thumbnail shown in archive grid
  author_name     TEXT DEFAULT 'MalikLogix',
  author_avatar   TEXT,
  author_twitter  TEXT DEFAULT 'maliklogix',
  category        TEXT DEFAULT 'AI Marketing',
  tags            TEXT[] DEFAULT '{}',
  read_time_mins  INT DEFAULT 4,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured        BOOLEAN DEFAULT false,
  subscriber_only BOOLEAN DEFAULT false,          -- gated content for subscribers
  views           BIGINT DEFAULT 0,
  sponsor_name    TEXT,                           -- "In partnership with..."
  sponsor_logo    TEXT,
  sponsor_url     TEXT,
  sponsor_body    TEXT,                           -- HTML block for mid-post sponsor
  seo_title       TEXT,
  seo_description TEXT,
  og_image        TEXT,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts public" ON public.posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Admins manage posts" ON public.posts
  FOR ALL USING (auth.role() = 'authenticated');

-- view counter function (called from API route, bypasses RLS)
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.posts SET views = views + 1 WHERE slug = post_slug;
END;$$;

-- ─────────────────────────────────────────────
-- AI TOOLS   (the "Top Rated AI Tools" section in posts)
-- ─────────────────────────────────────────────
CREATE TABLE public.ai_tools (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  tagline     TEXT NOT NULL,                      -- one-liner shown in posts
  url         TEXT NOT NULL,
  logo_url    TEXT,
  category    TEXT DEFAULT 'Productivity',
  featured    BOOLEAN DEFAULT false,
  sort_order  INT DEFAULT 0,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads tools" ON public.ai_tools FOR SELECT USING (active = true);
CREATE POLICY "Admins manage tools" ON public.ai_tools FOR ALL USING (auth.role() = 'authenticated');

-- Seed 6 default AI tools
INSERT INTO public.ai_tools (name, tagline, url, category, featured, sort_order) VALUES
('ChatGPT', 'The AI everyone uses — master it and everything else gets easier.', 'https://chat.openai.com', 'AI Chat', true, 1),
('Claude', 'The thinking AI. Best for long-form content, analysis, and complex tasks.', 'https://claude.ai', 'AI Chat', true, 2),
('Perplexity', 'Google, but AI-native. Real-time answers with sources.', 'https://perplexity.ai', 'Research', true, 3),
('Midjourney', 'Turn text into jaw-dropping visuals in seconds.', 'https://midjourney.com', 'Image AI', false, 4),
('n8n', 'The open-source automation tool that rivals Zapier at zero cost.', 'https://n8n.io', 'Automation', false, 5),
('Notion AI', 'Your second brain — now with an AI co-pilot built in.', 'https://notion.so', 'Productivity', false, 6);

-- ─────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────
CREATE TABLE public.subscribers (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT UNIQUE NOT NULL,
  first_name      TEXT,
  source          TEXT DEFAULT 'website',
  tags            TEXT[] DEFAULT '{}',
  status          TEXT DEFAULT 'active'
                  CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  ip_address      INET,
  subscribed_at   TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON public.subscribers
  FOR ALL USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- CONTACT INQUIRIES
-- ─────────────────────────────────────────────
CREATE TABLE public.inquiries (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  company     TEXT,
  service     TEXT,
  budget      TEXT,
  message     TEXT NOT NULL,
  source      TEXT DEFAULT 'contact-page',
  status      TEXT DEFAULT 'new'
              CHECK (status IN ('new','contacted','proposal','won','lost')),
  admin_notes TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read inquiries" ON public.inquiries
  FOR ALL USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- CASE STUDIES
-- ─────────────────────────────────────────────
CREATE TABLE public.case_studies (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  client_name      TEXT,
  industry         TEXT,
  client_logo      TEXT,
  challenge_html   TEXT,
  solution_html    TEXT,
  results_html     TEXT,
  cover_image      TEXT,
  services_used    TEXT[] DEFAULT '{}',
  stat_1_label     TEXT, stat_1_value TEXT,
  stat_2_label     TEXT, stat_2_value TEXT,
  stat_3_label     TEXT, stat_3_value TEXT,
  testimonial      TEXT,
  testimonial_by   TEXT,
  featured         BOOLEAN DEFAULT false,
  status           TEXT DEFAULT 'draft',
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published cases" ON public.case_studies
  FOR SELECT USING (status = 'published');
CREATE POLICY "Admins manage cases" ON public.case_studies
  FOR ALL USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- TESTIMONIALS
-- ─────────────────────────────────────────────
CREATE TABLE public.testimonials (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT,
  company     TEXT,
  avatar      TEXT,
  content     TEXT NOT NULL,
  rating      INT DEFAULT 5,
  service     TEXT,
  featured    BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins manage testimonials" ON public.testimonials
  FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO public.testimonials
  (name, role, company, content, rating, service, featured, sort_order) VALUES
('Ahmed Raza','CEO','TechVentures PK',
 'MalikLogix grew our organic traffic by 280% in 3 months. Their AI SEO system is unlike anything we have seen.',
 5,'SEO & GEO',true,1),
('Sarah Mitchell','Marketing Director','NexaStore',
 'Their automation saves us 40 hours per week. The team is fast, transparent, and delivers real results.',
 5,'AI Automation',true,2),
('Omar Farooq','Founder','ScaleUp Agency',
 'The Shopify AI integration increased our conversion rate by 34%. Best investment we have made all year.',
 5,'Shopify AI',true,3),
('Jessica Chen','CMO','GrowthBrand',
 'Content AI system produces SEO-optimized articles that rank within 3 weeks. Remarkable output.',
 5,'Content AI',true,4),
('Bilal Khan','Director','EcomPro',
 'WhatsApp support is instant. They built our AI chatbot that handles 70% of customer inquiries automatically.',
 5,'AI Chatbots',true,5),
('Emily Roberts','Founder','LaunchPad',
 'The ROI dashboard gives us full visibility. I finally understand where every marketing dollar goes.',
 5,'Analytics',true,6);

-- ─────────────────────────────────────────────
-- AFFILIATES
-- ─────────────────────────────────────────────
CREATE TABLE public.affiliates (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name       TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  website         TEXT,
  promo_method    TEXT,
  referral_code   TEXT UNIQUE NOT NULL,
  commission_pct  INT DEFAULT 20,
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending','approved','suspended')),
  total_clicks    INT DEFAULT 0,
  total_referrals INT DEFAULT 0,
  total_earned    NUMERIC(10,2) DEFAULT 0,
  total_paid      NUMERIC(10,2) DEFAULT 0,
  paypal_email    TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage affiliates" ON public.affiliates
  FOR ALL USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- PORTFOLIO
-- ─────────────────────────────────────────────
CREATE TABLE public.portfolio (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  category    TEXT,
  stack       TEXT[] DEFAULT '{}',
  image       TEXT,
  live_url    TEXT,
  github_url  TEXT DEFAULT 'https://github.com/maliklogix',
  featured    BOOLEAN DEFAULT false,
  sort_order  INT DEFAULT 0,
  status      TEXT DEFAULT 'published',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads portfolio" ON public.portfolio
  FOR SELECT USING (status = 'published');
CREATE POLICY "Admins manage portfolio" ON public.portfolio
  FOR ALL USING (auth.role() = 'authenticated');

-- Pre-seed with MalikLogix actual projects
INSERT INTO public.portfolio
  (title, slug, description, category, stack, featured, sort_order) VALUES
('NexaShoppify','nexashoppify',
 'Next.js 14 Shopify automation dashboard — 11 pages, TypeScript, Tailwind, Recharts, Zustand.',
 'Shopify',ARRAY['Next.js 14','TypeScript','Tailwind','Recharts','Zustand','Vercel'],true,1),
('ShopDesk','shopdesk',
 'CSR support dashboard with Zendesk integration and Neon PostgreSQL backend.',
 'Dashboard',ARRAY['React','Node.js','PostgreSQL','Zendesk API'],true,2),
('SellerOpsAI','selleropsai',
 'TypeScript React FBA profit calculator dashboard — dark-themed, live calculation engine.',
 'AI Tool',ARRAY['TypeScript','React','Tailwind'],true,3),
('Product Auditor','product-auditor',
 'React + TypeScript + Node/Express monorepo product auditor dashboard.',
 'Dashboard',ARRAY['React','TypeScript','Node.js','Express'],false,4);

-- ─────────────────────────────────────────────
-- AGENCY SETTINGS  (singleton row)
-- ─────────────────────────────────────────────
CREATE TABLE public.settings (
  id                    INT DEFAULT 1 PRIMARY KEY CHECK (id = 1),
  agency_name           TEXT DEFAULT 'MalikLogix',
  tagline               TEXT DEFAULT 'AI-Powered Growth. Built to Scale.',
  nl_tagline            TEXT DEFAULT 'Learn AI marketing in 4 minutes/day. Join 10,000+ business owners.',
  logo_url              TEXT,
  favicon_url           TEXT,
  contact_email         TEXT DEFAULT 'hello@maliklogix.com',
  phone                 TEXT DEFAULT '+92 315 8304046',
  whatsapp              TEXT DEFAULT '923158304046',
  address               TEXT DEFAULT 'Lahore, Pakistan',
  twitter_url           TEXT DEFAULT 'https://twitter.com/maliklogix',
  linkedin_url          TEXT DEFAULT 'https://linkedin.com/company/maliklogix',
  instagram_url         TEXT DEFAULT 'https://instagram.com/maliklogix',
  github_url            TEXT DEFAULT 'https://github.com/maliklogix',
  youtube_url           TEXT,
  meta_title            TEXT DEFAULT 'MalikLogix — AI Digital Agency',
  meta_description      TEXT DEFAULT 'MalikLogix uses cutting-edge AI to grow your business. AI Marketing, SEO, Automation, Content, Paid Ads & Shopify.',
  og_image              TEXT,
  ga_id                 TEXT,
  topbar_active         BOOLEAN DEFAULT true,
  topbar_text           TEXT DEFAULT 'We automate openclaw let&apos;s start',
  topbar_cta_text       TEXT DEFAULT 'Start OpenClaw →',
  topbar_cta_link       TEXT DEFAULT '/contact',
  affiliate_commission  INT DEFAULT 20,
  subscriber_count_text TEXT DEFAULT '10,000+',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO public.settings (id) VALUES (1) ON CONFLICT DO NOTHING;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins update settings" ON public.settings
  FOR UPDATE USING (auth.role() = 'authenticated');

