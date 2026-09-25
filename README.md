# 🏨 The Glenora River Resort - Official Website

A high-performance luxury hotel & river resort website built for **The Glenora River Resort** located in Tapovan, Laxman Jhula Road, Rishikesh, Uttarakhand.

Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS**.

---

## ✨ Features

- **Luxury Royal Gold Aesthetics**: Tailored warm gold (`#D97706` / `#B45309`) and deep obsidian theme with glassmorphism, micro-animations, and shimmer effects.
- **Scroll & Route Animations**: Smooth route transitions and intersection-observer scroll reveals across all pages and sections.
- **Google Sheets Lead Capture**: Free, real-time inquiry logging directly into your personal Google Sheet via Google Apps Script webhook.
- **Instant WhatsApp Inquiries**: Direct pre-filled WhatsApp booking messages directed to the resort desk (`8198978095`).
- **Complete Page Suite**:
  - `Homepage`: Hero, sanctuary story, 4-meal buffet dining, activities, packages, and direct booking form.
  - `Rooms & Cottages`: Category filtering, amenities badges, pricing, and popup quote modal.
  - `Packages`: Transparent ₹1,499 - ₹3,499 package comparison cards.
  - `Dining`: Riverside breakfast, lunch, high-tea, and dinner highlights.
  - `Events & Weddings`: Riverside mandap ceremonies and corporate offsite planners.
  - `Facilities & Activities`: Swimming pool, bonfire, rafting, bungee jumping, and 24/7 power backup.
  - `Location & Directions`: Tapovan interactive Google Map embed and transit guide.
  - `Contact`: 24/7 inquiry form, FAQ accordions, and click-to-call / click-to-chat links.
- **Production Ready SEO**:
  - Automated XML Sitemap (`/sitemap.xml`)
  - Crawler configuration (`/robots.txt`)
  - OpenGraph & Twitter Large Cards
  - Schema.org JSON-LD `Hotel` structured data for Google Search rich snippets
  - Custom luxury 404 (`not-found.tsx`) and Error Boundary (`error.tsx`)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Apps Script Webhook URL (see `GOOGLE_SHEET_SETUP.md` for the 2-minute guide):
```bash
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel (Recommended)

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - **Key**: `GOOGLE_SHEET_WEBHOOK_URL`
   - **Value**: Your Google Apps Script Web App URL
4. Click **Deploy**. Vercel will build and deploy your site with global edge caching and free SSL!

---

## ⚙️ Configuration

Resort phone number, address, map coordinates, email, and social links are centralized in:
[`lib/constants.ts`](./lib/constants.ts)
