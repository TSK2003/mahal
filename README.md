# 👑 Murugu Wedding Mahal & Luxury Convention Center

> **Where Royal Traditions Meet Timeless Luxury**  
> A full-featured, responsive, 100% workable **Royal Wedding Mahal & Convention Center Web Application** with an integrated **Interactive Admin Management Portal**, dynamic CMS, live date availability checker, wedding cost calculator, self-service booking status checker, printable tax invoices/receipts, and **Firebase** integration.

---

## 🌟 Key Highlights & Features

### 🏛️ 1. Public Royal Wedding Website
- **Royal Aesthetics & Luxury Design**: Tailored South Indian temple and palace architecture with gold gradients (`#DFBA51`, `#C9A227`), deep obsidian dark backgrounds, and luxury serif typography (`Playfair Display`).
- **Interactive Date Availability Checker**: Public widget allowing prospective families to select an auspicious muhurtham date and instantly check availability for **Morning (5 AM - 2 PM)**, **Evening (3 PM - 11 PM)**, or **24-Hour Full Day** slots.
- **Custom Wedding Cost Calculator**: Interactive pricing tool on the Packages page to customize hall duration, guest suites, dining sessions, and floral decor tiers with instant price computation.
- **Self-Service Booking Status Checker (`/check-booking`)**: Clients can enter their 6-digit Booking ID (e.g. `BK-8901`) or Mobile Number to check confirmation status and download/print their official confirmation slip.
- **360° Virtual Tour & Video Highlights**: Integrated virtual walkthrough and cinematic drone/event video player.
- **High-Definition Mahal Photo Gallery**: Filterable photo gallery categorized by Mandap, Main AC Hall, Dining Hall, Bridal Suites, Exterior Illumination, and Stage Lighting.
- **Direct WhatsApp & Phone Integration**: Instant pre-filled WhatsApp enquiry routing with full reservation details.

---

### 🛡️ 2. Admin Management Portal (`/admin`)
- **1-Click Demo Admin Login**: Accessible from the Navbar badge or Footer link with instant 1-click evaluation access (or credentials: `admin@murugumahal.com` / `admin123` / PIN `1234`).
- **Executive Dashboard**: Live KPI metrics for Total Bookings, Confirmed Events, Pending Enquiries, Total Revenue (₹), Advance Collections, and Upcoming Events schedule.
- **Full Bookings Lifecycle CRUD (`/admin/bookings`)**:
  - Search by customer name, phone, or Reference ID.
  - Filter by status (Confirmed, Pending, Completed, Cancelled) and event type.
  - **Add New Manual Booking** with instant date and slot validation.
  - **Edit Booking** (update dates, guest count, advance paid, balance due, notes).
  - **Printable Booking Slip / Tax Invoice Generator**: Formatted printable receipt with Mahal emblem, customer details, financial breakdown, and terms.
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
- **Styling**: Tailwind CSS v4, Vanilla CSS Custom Design System
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
- **Email**: `admin@murugumahal.com`
- **Password**: `admin123`
- **Quick PIN**: `1234`

---

## 📦 Git Setup & Push Commands

To initialize git and push this repository to GitHub:

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

### Firebase Web App Config
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAg_D7FdStVr0Qs5zMRp1wrq2_OFdvvTVw",
  authDomain: "mahal-a8800.firebaseapp.com",
  projectId: "mahal-a8800",
  storageBucket: "mahal-a8800.firebasestorage.app",
  messagingSenderId: "647859700729",
  appId: "1:647859700729:web:b606f69341b6a0f14ab328",
  measurementId: "G-55GZNZ812H"
};
```

### Deploy to Firebase Hosting
```bash
# 1. Build the production distribution
npm run build

# 2. Deploy with Firebase CLI
firebase deploy --only hosting
```

---

## 📁 Project Directory Architecture

```
wedding_mahal/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AdminLoginModal.jsx     # Luxury Demo Admin Login Modal
│   │   │   ├── Button.jsx              # Reusable Button System
│   │   │   ├── EnquiryModal.jsx        # Public Booking Enquiry Modal
│   │   │   ├── EventCard.jsx           # Event Showcase Card
│   │   │   ├── FacilityCard.jsx        # Amenity Card with Icons
│   │   │   ├── FloatingButtons.jsx     # Sticky WhatsApp, Call & 360 Tour
│   │   │   ├── GoogleMap.jsx           # Dark Styled Interactive Map
│   │   │   ├── LightboxModal.jsx       # Photo Zoom Lightbox
│   │   │   ├── PricingCard.jsx         # Package Tariff Card
│   │   │   ├── SectionTitle.jsx        # Section Heading Component
│   │   │   └── VideoModal.jsx          # Video Playback Modal
│   │   ├── home/
│   │   │   ├── AvailabilityChecker.jsx # Live Date Availability Widget
│   │   │   ├── ClientCarousel.jsx      # Corporate Patrons Carousel
│   │   │   ├── ContactPreview.jsx      # Location & Directions Preview
│   │   │   ├── EnquiryCTA.jsx          # Booking CTA Banner
│   │   │   ├── FacilitiesSection.jsx   # Grid of Venue Facilities
│   │   │   ├── FeaturedEvents.jsx      # Wedding, Reception & Parties
│   │   │   ├── GalleryPreview.jsx      # Photo Showcase Preview
│   │   │   ├── Hero.jsx                # Full-screen Hero Video Stream
│   │   │   ├── MahalDescription.jsx    # Heritage & Value Pillars
│   │   │   ├── OverviewSection.jsx     # Why Choose Mahal & Experience
│   │   │   ├── QuickInfoBar.jsx        # Capacity & Stats Ticker
│   │   │   ├── TestimonialsSection.jsx # Client Reviews Carousel
│   │   │   └── VideoPreview.jsx        # Event Videos Preview
│   │   └── layout/
│   │       ├── Footer.jsx              # Navigation, Contact & Admin link
│   │       ├── Layout.jsx              # Public Website Shell
│   │       └── Navbar.jsx              # Brand Header & Demo Admin Button
│   ├── data/
│   │   └── mahalData.js                # Master Default Datasets & Bookings
│   ├── firebase/
│   │   └── config.js                   # Firebase SDK Initialization
│   ├── hooks/
│   │   └── useMahalData.js             # Reactive State Subscription Hook
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminBookings.jsx       # Complete Bookings CRUD & Invoicing
│   │   │   ├── AdminCalendar.jsx       # Visual Hall Availability Calendar
│   │   │   ├── AdminContentManager.jsx # Full Website CMS Editor
│   │   │   ├── AdminDashboard.jsx      # Metrics, KPIs & Trends
│   │   │   ├── AdminGalleryManager.jsx # Photo Gallery Manager
│   │   │   ├── AdminLayout.jsx         # Luxury Admin Portal Shell
│   │   │   ├── AdminSettings.jsx       # Backup & Reset Controls
│   │   │   └── AdminVideosManager.jsx  # Video Showcase Manager
│   │   ├── AboutPage.jsx               # Heritage, Founder Story & Timeline
│   │   ├── BookingStatusPage.jsx       # Public Status & Receipt Lookup
│   │   ├── ConferencePage.jsx          # Corporate Events & AV Specs
│   │   ├── ContactPage.jsx             # Contact Desk & Enquiry Form
│   │   ├── GalleryPage.jsx             # Categorized Photo Gallery
│   │   ├── HomePage.jsx                # Landing Page
│   │   ├── PricePage.jsx               # Packages & Cost Calculator
│   │   └── VideosPage.jsx              # Full Event Video Highlights
│   ├── services/
│   │   └── dataService.js              # Realtime State & Storage Engine
│   ├── App.jsx                         # Main Routing Architecture
│   ├── index.css                       # Design System & Custom Classes
│   └── main.jsx                        # React Entrypoint
├── .firebaserc                         # Firebase Project Mapping
├── firebase.json                       # Firebase Hosting Configuration
├── package.json
└── vite.config.js
```

---

© 2026 Murugu Wedding Mahal & Luxury Convention Center. All Rights Reserved.
