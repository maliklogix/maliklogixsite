# PostgreSQL migration and deployment

## 1) Create production database

- Provision a PostgreSQL database (Neon, Supabase Postgres, Railway, Render, RDS, etc.).
- Create a `DATABASE_URL` in this format:

`postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public`

## 2) Apply schema

From project root:

```bash
npm run db:generate
npm run db:migrate
```

This applies `prisma/migrations/0001_init/migration.sql`.

## 3) Move data from existing Supabase project

Export from Supabase:

```bash
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.settings > settings-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.posts > posts-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.ai_tools > ai-tools-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.subscribers > subscribers-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.inquiries > inquiries-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.case_studies > case-studies-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.testimonials > testimonials-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.affiliates > affiliates-data.sql
pg_dump "$SUPABASE_DATABASE_URL" --data-only --inserts --column-inserts --table=public.portfolio > portfolio-data.sql
```

Import into new PostgreSQL:

```bash
psql "$DATABASE_URL" -f settings-data.sql
psql "$DATABASE_URL" -f posts-data.sql
psql "$DATABASE_URL" -f ai-tools-data.sql
psql "$DATABASE_URL" -f subscribers-data.sql
psql "$DATABASE_URL" -f inquiries-data.sql
psql "$DATABASE_URL" -f case-studies-data.sql
psql "$DATABASE_URL" -f testimonials-data.sql
psql "$DATABASE_URL" -f affiliates-data.sql
psql "$DATABASE_URL" -f portfolio-data.sql
```

## 4) Server environment

Update `.env.production`:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YOUR_GOOGLE_SITE_VERIFICATION_TOKEN
```

## 5) Deploy checklist

- Pull latest code.
- Install dependencies: `npm install`
- Apply DB migrations: `npm run db:migrate`
- Build app: `npm run build`
- Start app: `npm run start`
- Purge CDN cache for `/` and `/_next/*` after rollout.
