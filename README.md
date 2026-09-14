# Reel2Reach Media Website

A premium, production-ready website for Reel2Reach Media — a creative content studio specializing in video content creation, influencer marketing, and social media management.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Supabase (Database, Auth, Storage)
- **Deployment:** Netlify

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Go to **Settings → API** and copy:
   - Project URL
   - anon/public key

### 3. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SITE_URL=https://your-domain.netlify.app
```

### 4. Run Database Migrations

1. Go to your Supabase dashboard → **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run the SQL
4. This creates all tables, RLS policies, and seed data

### 5. Create Storage Buckets

In Supabase dashboard → **Storage**, create these buckets:

- `site` (public)
- `portfolio` (public)
- `reels` (public)
- `case-studies` (public)
- `testimonials` (public)
- `branding` (public)

For each bucket, set it to **public** access.

### 6. Create First Admin User

1. Go to **Authentication → Users** in Supabase
2. Click **Add user → Create new user**
3. Enter email and password
4. This user can now log in at `/admin`

### 7. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 8. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Deploying to Netlify

### Option A: Git Deploy (Recommended)

1. Push this repo to GitHub/GitLab
2. Go to [Netlify](https://netlify.com) → **Add new site → Import from Git**
3. Select your repository
4. Build settings are auto-detected from `netlify.toml`
5. Add environment variables in Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL`
6. Click **Deploy**

### Option B: Manual Deploy

1. Run `npm run build`
2. Drag the `dist/` folder to Netlify's deploy area
3. Add environment variables in site settings

## Environment Variables in Netlify

Go to **Site settings → Environment variables** and add:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_SITE_URL` | Your deployed site URL |

## Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── vite-env.d.ts             # TypeScript env types
├── components/
│   ├── common/
│   │   └── WhatsAppButton.tsx # Floating WhatsApp CTA
│   ├── home/
│   │   ├── Hero.tsx          # Homepage hero section
│   │   └── Sections.tsx      # All home page sections
│   └── layout/
│       ├── Navbar.tsx         # Navigation
│       ├── Footer.tsx         # Footer
│       └── Layout.tsx         # Page layout wrapper
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── Packages.tsx
│   ├── Book.tsx
│   ├── Contact.tsx
│   ├── OtherPages.tsx         # Influencer, Social, Cases, Privacy, Terms, 404
│   └── admin/
│       └── AdminPages.tsx     # Admin login + dashboard
├── lib/
│   └── supabase.ts           # Supabase client
└── types/
    └── index.ts              # TypeScript interfaces
```

## Key Features

- **Premium dark UI** with gradient accents
- **Fully responsive** (mobile-first design)
- **Framer Motion animations** with reduced-motion support
- **Supabase integration** for content management
- **Admin panel** with authentication
- **Lead capture forms** saved to database
- **WhatsApp integration** for quick contact
- **Portfolio system** with categories and filters
- **Package management** from admin
- **SEO-ready** with proper meta tags

## Troubleshooting

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check that `.env` file exists with required variables
- Run `npm run build` and check error messages

### Supabase connection issues
- Verify your URL and key in `.env`
- Ensure your Supabase project is active
- Check that RLS policies are properly configured

### Admin login not working
- Ensure you created a user in Supabase Authentication
- Check that the user's email is confirmed
- Verify environment variables are correct

### Styles not loading
- Clear browser cache
- Ensure Tailwind CSS is properly configured
- Check that `npm install` completed successfully

## Contact

For questions about this project, contact Reel2Reach Media:
- WhatsApp: +91 8263058461
- Email: real2reach@gmail.com
- Instagram: @ashwini_rathod_19

## License

Proprietary — All rights reserved by Reel2Reach Media.
