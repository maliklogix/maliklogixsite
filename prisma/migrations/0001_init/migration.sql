-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content_html` TEXT NULL,
    `cover_image_url` LONGTEXT NULL,
    `author_name` VARCHAR(191) NULL DEFAULT 'MalikLogix',
    `author_avatar` LONGTEXT NULL,
    `author_twitter` VARCHAR(191) NULL DEFAULT 'maliklogix',
    `category` VARCHAR(191) NULL DEFAULT 'AI Marketing',
    `tags` JSON NOT NULL,
    `read_time_mins` INTEGER NULL DEFAULT 4,
    `status` ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    `featured` BOOLEAN NULL DEFAULT false,
    `subscriber_only` BOOLEAN NULL DEFAULT false,
    `views` BIGINT NULL DEFAULT 0,
    `sponsor_name` VARCHAR(191) NULL,
    `sponsor_logo` LONGTEXT NULL,
    `sponsor_url` VARCHAR(191) NULL,
    `sponsor_body` TEXT NULL,
    `seo_title` VARCHAR(191) NULL,
    `seo_description` TEXT NULL,
    `og_image` LONGTEXT NULL,
    `published_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `posts_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ai_tools` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tagline` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL DEFAULT 'Productivity',
    `featured` BOOLEAN NULL DEFAULT false,
    `sort_order` INTEGER NULL DEFAULT 0,
    `active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribers` (
    id VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    irst_name VARCHAR(191) NULL,
    source VARCHAR(191) NULL DEFAULT 'website',
    	ags JSON NOT NULL,
    status ENUM('active', 'unsubscribed', 'bounced') NOT NULL DEFAULT 'active',
    ip_address VARCHAR(191) NULL,
    subscribed_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    unsubscribed_at DATETIME(3) NULL,

    UNIQUE INDEX subscribers_email_key(email),
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE inquiries (
    id VARCHAR(191) NOT NULL,
    
ame VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(191) NULL,
    company VARCHAR(191) NULL,
    service VARCHAR(191) NULL,
    udget VARCHAR(191) NULL,
    message TEXT NOT NULL,
    source VARCHAR(191) NULL DEFAULT 'contact-page',
    status ENUM('new', 'contacted', 'proposal', 'won', 'lost') NOT NULL DEFAULT 'new',
    dmin_notes TEXT NULL,
    created_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE case_studies (
    id VARCHAR(191) NOT NULL,
    	itle VARCHAR(191) NOT NULL,
    slug VARCHAR(191) NOT NULL,
    client_name VARCHAR(191) NULL,
    industry VARCHAR(191) NULL,
    client_logo VARCHAR(191) NULL,
    challenge_html TEXT NULL,
    solution_html TEXT NULL,
    esults_html TEXT NULL,
    cover_image VARCHAR(191) NULL,
    services_used JSON NOT NULL,
    stat_1_label VARCHAR(191) NULL,
    stat_1_value VARCHAR(191) NULL,
    stat_2_label VARCHAR(191) NULL,
    stat_2_value VARCHAR(191) NULL,
    stat_3_label VARCHAR(191) NULL,
    stat_3_value VARCHAR(191) NULL,
    	estimonial TEXT NULL,
    	estimonial_by VARCHAR(191) NULL,
    eatured BOOLEAN NULL DEFAULT false,
    status VARCHAR(191) NULL DEFAULT 'draft',
    published_at DATETIME(3) NULL,
    created_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX case_studies_slug_key(slug),
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE 	estimonials (
    id VARCHAR(191) NOT NULL,
    
ame VARCHAR(191) NOT NULL,
    ole VARCHAR(191) NULL,
    company VARCHAR(191) NULL,
    vatar VARCHAR(191) NULL,
    content TEXT NOT NULL,
    ating INTEGER NULL DEFAULT 5,
    service VARCHAR(191) NULL,
    eatured BOOLEAN NULL DEFAULT true,
    sort_order INTEGER NULL DEFAULT 0,

    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE ffiliates (
    id VARCHAR(191) NOT NULL,
    ull_name VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    website VARCHAR(191) NULL,
    promo_method VARCHAR(191) NULL,
    eferral_code VARCHAR(191) NOT NULL,
    commission_pct INTEGER NULL DEFAULT 20,
    status ENUM('pending', 'approved', 'suspended') NOT NULL DEFAULT 'pending',
    	otal_clicks INTEGER NULL DEFAULT 0,
    	otal_referrals INTEGER NULL DEFAULT 0,
    	otal_earned DECIMAL(10, 2) NULL DEFAULT 0,
    	otal_paid DECIMAL(10, 2) NULL DEFAULT 0,
    paypal_email VARCHAR(191) NULL,
    created_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX ffiliates_email_key(email),
    UNIQUE INDEX ffiliates_referral_code_key(eferral_code),
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE portfolio (
    id VARCHAR(191) NOT NULL,
    	itle VARCHAR(191) NOT NULL,
    slug VARCHAR(191) NOT NULL,
    description TEXT NULL,
    category VARCHAR(191) NULL,
    stack JSON NOT NULL,
    image VARCHAR(191) NULL,
    live_url VARCHAR(191) NULL,
    github_url VARCHAR(191) NULL DEFAULT 'https://github.com/maliklogix',
    eatured BOOLEAN NULL DEFAULT false,
    sort_order INTEGER NULL DEFAULT 0,
    status VARCHAR(191) NULL DEFAULT 'published',
    created_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX portfolio_slug_key(slug),
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE settings (
    id INTEGER NOT NULL DEFAULT 1,
    gency_name VARCHAR(191) NULL DEFAULT 'MalikLogix',
    	agline VARCHAR(191) NULL DEFAULT 'AI-Powered Growth. Built to Scale.',
    
l_tagline VARCHAR(191) NULL DEFAULT 'Learn AI marketing in 4 minutes/day. Join 10,000+ business owners.',
    logo_url VARCHAR(191) NULL,
    avicon_url VARCHAR(191) NULL,
    contact_email VARCHAR(191) NULL DEFAULT 'hello@maliklogix.com',
    phone VARCHAR(191) NULL DEFAULT '+92 315 8304046',
    whatsapp VARCHAR(191) NULL DEFAULT '923158304046',
    ddress VARCHAR(191) NULL DEFAULT 'Lahore, Pakistan',
    	witter_url VARCHAR(191) NULL DEFAULT 'https://twitter.com/maliklogix',
    linkedin_url VARCHAR(191) NULL DEFAULT 'https://linkedin.com/company/maliklogix',
    instagram_url VARCHAR(191) NULL DEFAULT 'https://instagram.com/maliklogix',
    github_url VARCHAR(191) NULL DEFAULT 'https://github.com/maliklogix',
    acebook_url VARCHAR(191) NULL,
    	iktok_url VARCHAR(191) NULL,
    youtube_url VARCHAR(191) NULL,
    meta_title VARCHAR(191) NULL DEFAULT 'MalikLogix - AI Digital Agency',
    meta_description VARCHAR(191) NULL DEFAULT 'MalikLogix uses cutting-edge AI to grow your business. AI Marketing, SEO, Automation, Content, Paid Ads & Shopify.',
    og_image VARCHAR(191) NULL,
    ga_id VARCHAR(191) NULL,
    	opbar_active BOOLEAN NULL DEFAULT true,
    	opbar_text VARCHAR(191) NULL DEFAULT 'We automate openclaw let''s start',
    	opbar_cta_text VARCHAR(191) NULL DEFAULT 'Start OpenClaw ->',
    	opbar_cta_link VARCHAR(191) NULL DEFAULT '/contact',
    ffiliate_commission INTEGER NULL DEFAULT 20,
    subscriber_count_text VARCHAR(191) NULL DEFAULT '10,000+',
    updated_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE partners (
    id VARCHAR(191) NOT NULL,
    
ame VARCHAR(191) NOT NULL,
    logo_url VARCHAR(191) NOT NULL,
    ating VARCHAR(191) NULL DEFAULT '5.0',
    eatures JSON NOT NULL,
    starting_price VARCHAR(191) NULL,
    cta_link TEXT NOT NULL,
    coupon_code VARCHAR(191) NULL,
    show_deal BOOLEAN NULL DEFAULT false,
    category VARCHAR(191) NULL DEFAULT 'Hosting',
    commission_type VARCHAR(191) NULL DEFAULT 'CPA',
    egion VARCHAR(191) NULL DEFAULT 'Global',
    payout_method VARCHAR(191) NULL DEFAULT 'Bank Transfer',
    ank INTEGER NULL DEFAULT 0,
    ctive BOOLEAN NULL DEFAULT true,
    created_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
