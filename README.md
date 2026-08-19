# 👑 Grand Mahal & Luxury Convention Center

> **Where Royal Traditions Meet Timeless Luxury**  
> A full-featured, responsive, 100% workable **Royal Wedding Mahal & Convention Center Web Application** designed with an opulent **Milky White & Royal Gold theme**, integrated **Interactive Admin Management Portal**, dynamic CMS, live date availability checker, custom wedding cost calculator, self-service booking status checker, printable tax invoices/receipts, and **Firebase** CI/CD deployment.

---

## 🌟 Key Highlights & Features

### 🏛️ 1. Public Royal Wedding Website
- **Milky White & Royal Gold Palace Aesthetic**: Tailored South Indian temple and palace architecture with pure milky white backgrounds (`#FAF8F5`), ivory cream card surfaces, gold borders and gradients (`#D4AF37`, `#B8860B`, `#8B6508`), and luxury serif typography (`Playfair Display`).
- **Interactive Date Availability Checker**: Public widget allowing prospective families to select an auspicious muhurtham date and instantly check availability for **Morning (5 AM - 2 PM)**, **Evening (3 PM - 11 PM)**, or **24-Hour Full Day** slots.
- **Custom Wedding Cost Calculator**: Interactive pricing tool on the Packages page (`/price`) to customize hall duration, guest suites, dining sessions, and floral decor tiers with instant price computation.
- **Self-Service Booking Status Checker (`/check-booking`)**: Clients can enter their 6-digit Booking ID (e.g. `BK-8901`) or Mobile Number to check confirmation status and download/print their official confirmation slip.
- **360° Virtual Tour & Video Highlights**: Integrated virtual walkthrough and cinematic event video player.
- **High-Definition Mahal Photo Gallery**: Filterable photo gallery categorized by Mandap, Main AC Hall, Dining Hall, Bridal Suites, Exterior Illumination, and Stage Lighting.
- **Direct WhatsApp & Phone Integration**: Instant pre-filled WhatsApp enquiry routing with full reservation details.

---

### 🛡️ 2. Admin Management Portal (`/admin`)
- **1-Click Demo Admin Login**: Accessible from the Navbar badge or Footer link with instant 1-click evaluation access (or credentials: `admin@grandmahal.com` / `admin123` / PIN `1234`).
- **Executive Dashboard**: Live KPI metrics for Total Bookings, Confirmed Events, Pending Enquiries, Total Revenue (₹), Advance Collections, and Upcoming Events schedule.
- **Full Bookings Lifecycle CRUD (`/admin/bookings`)**:
  - Search by customer name, phone, or Reference ID.
  - Filter by status (Confirmed, Pending, Completed, Cancelled) and event type.
  - **Add New Manual Booking** with instant date and slot validation.
  - **Edit Booking** (update dates, guest count, advance paid, balance due, notes).
  - **Printable Booking Slip / Tax Invoice Generator**: Formatted printable receipt with Grand Mahal emblem, customer details, financial breakdown, and terms.
  - **Export to CSV**: 1-click download of all bookings data in CSV format.
- **Interactive Visual Event Calendar (`/admin/calendar`)**:
  - Monthly calendar with color-coded badges for confirmed and pending slots.
  - Slot inspector showing Morning and Evening availability.
  - 1-click date reservation shortcut.
- **Live Website Component CMS (`/admin/content`)**:
  - **Mahal Profile Editor**: Edit name, tagline, address, phone numbers, WhatsApp, email, Google Maps URL, and 360 Tour URL live.
  - **Hall Specs & Stats**: Edit capacity, dining seats, parking spaces, deluxe suites, generator KVA.
  - **Facilities Manager**: Add, edit, or delete any of the 14+ amenities with category filters and icons.
  - **Event Services Manager**: Add/edit wedding, reception, engagement, and conference packages with image URLs and bullet points.
  - **Pricing Packages Editor**: Modify rental tariffs, durations, and popular ribbon badges.
  - **Testimonials & Reviews**: Manage customer reviews and star ratings.
  - **FAQs Manager**: Add, edit, or delete frequently asked questions.
- **Photo & Video Media Library (`/admin/gallery`, `/admin/videos`)**: Upload and curate high-resolution photos and video showcase links.
- **System Backup & Restore (`/admin/settings`)**: Export full database snapshot as JSON, restore from JSON, or reset to factory defaults.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router DOM v7, Vite 8
- **Styling**: Tailwind CSS v4, Vanilla CSS Custom Design System (Milky White & Gold Tokens)
- **Animations & Interactions**: Framer Motion, Swiper (Carousels & Sliders)
- **Icons**: React Icons (FontAwesome 6, Game Icons, Material Design)
- **Backend & Cloud Integration**: Firebase v11 (App, Firestore, Analytics) + LocalStorage Reactive Synchronization Layer

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🔐 Demo Admin Access Credentials

You can click the **"⚡ 1-Click Quick Demo Login"** button on the Navbar, or use the following credentials:
- **Email**: `admin@grandmahal.com`
- **Password**: `admin123`
- **Quick PIN**: `1234`

---

## 📦 Git Setup & Push Commands

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TSK2003/mahal.git
git push -u origin main
```

---

## 🔥 Firebase Configuration & Deployment

### Deploy to Firebase Hosting
```bash
# 1. Build the production distribution
npm run build

# 2. Deploy with Firebase CLI
firebase deploy --only hosting
```

---

## 🤖 Automated CI/CD GitHub Actions Setup

This repository is equipped with GitHub Actions workflows in `.github/workflows/` for automated build and deployment:

### Required GitHub Repository Secrets
Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions** and add:
- `FIREBASE_TOKEN`: Your Firebase CI token generated from `firebase login:ci`
- OR `FIREBASE_SERVICE_ACCOUNT_MAHAL_A8800`: Your Google Cloud / Firebase service account key JSON.

Whenever you push to the `main` branch:
1. GitHub Actions checks out the code
2. Installs dependencies (`npm install`)
3. Builds the production bundle (`npm run build`)
4. Automatically deploys to Firebase Hosting live at **https://mahal-a8800.web.app**

```bash
git add .
git commit -m "feat: Grand Mahal Milky White theme and auto-deploy"
git push origin main
```

---

© 2026 Grand Mahal & Luxury Convention Center. All Rights Reserved.
