// Default Master Data for Murugu Wedding Mahal & Convention Center

export const DEFAULT_MAHAL_INFO = {
  name: "Murugu Wedding Mahal",
  tagline: "Where Royal Traditions Meet Timeless Luxury",
  shortDesc: "South India's premier luxury wedding destination and air-conditioned convention center, designed for majestic celebrations, sacred muhurthams, and high-profile corporate summits.",
  establishedYear: 2012,
  address: "742 Royal Palace Highway, Grand Avenue, Chennai, Tamil Nadu 600028",
  landmark: "Near Royal Palace Junction & Grand Ring Road",
  phone: "+91 98765 43210",
  altPhone: "+91 98765 43211",
  whatsapp: "919876543210",
  email: "events@murugumahal.com",
  bookingEmail: "reservations@murugumahal.com",
  googleMapsUrl: "https://maps.google.com/?q=Royal+Wedding+Mahal",
  virtualTourUrl: "https://kuula.co/share/collection/7l1vP?fs=1&vr=1&sd=1&thumbs=1",
  hours: "Monday - Sunday: 8:00 AM - 10:00 PM (Enquiry Desk)",
  hallTimings: "Morning Slot: 5:00 AM - 2:00 PM | Evening Slot: 3:00 PM - 11:00 PM | 24-Hr: 5:00 AM - Next Day 4:00 AM",

  stats: [
    { label: "Mahal Area", value: "18,000 Sq.Ft", icon: "🏛", sub: "Spacious Grand Architecture" },
    { label: "Hall Capacity", value: "1,200 Seats", icon: "👥", sub: "Plush Centralized AC Seating" },
    { label: "Dining Capacity", value: "600 Seats", icon: "🍽", sub: "Modern Hygienic Dining Hall" },
    { label: "Parking Space", value: "250+ Cars", icon: "🚗", sub: "Secure Valet Parking Lot" },
    { label: "Deluxe Suites", value: "14 AC Rooms", icon: "🛏", sub: "Attached Luxury Bathrooms" },
    { label: "Power Backup", value: "250 KVA 100%", icon: "⚡", sub: "Soundless Heavy-Duty Genset" }
  ]
};

export const DEFAULT_FACILITIES = [
  {
    id: 1,
    name: "100% Centralized AC Hall",
    icon: "FaSnowflake",
    desc: "State-of-the-art silent chillers keeping all 1,200 guests comfortably cool even during peak summer celebrations.",
    category: "Comfort",
    active: true
  },
  {
    id: 2,
    name: "Grand 600-Seater Dining Hall",
    icon: "FaUtensils",
    desc: "Seamless dining hall equipped with stainless steel tables, automatic hand-wash counters, and dedicated catering service aisles.",
    category: "Dining",
    active: true
  },
  {
    id: 3,
    name: "Expansive Valet Parking",
    icon: "FaCar",
    desc: "Paved parking facility accommodating over 250 cars and 400 two-wheelers with round-the-clock security and valet assistance.",
    category: "Infrastructure",
    active: true
  },
  {
    id: 4,
    name: "Royal Master Bride Suite",
    icon: "GiQueenCrown",
    desc: "Lavish air-conditioned dressing suite with illuminated full-length 360° vanity mirrors, lounge seating, and private luxury washroom.",
    category: "Rooms",
    active: true
  },
  {
    id: 5,
    name: "Luxury Groom Dressing Suite",
    icon: "GiCrown",
    desc: "Dedicated spacious room for the groom with wardrobe fixtures, leather recliner sofa, and prompt room service.",
    category: "Rooms",
    active: true
  },
  {
    id: 6,
    name: "250 KVA Genset Power Backup",
    icon: "FaBolt",
    desc: "Automatic soundless heavy-duty generators ensuring uninterrupted power for air conditioning, stage lighting, and sound.",
    category: "Infrastructure",
    active: true
  },
  {
    id: 7,
    name: "24/7 CCTV Surveillance",
    icon: "FaShieldAlt",
    desc: "Network of 48+ high-definition night-vision cameras monitoring main hall, stage, dining, parking, and entrances.",
    category: "Safety",
    active: true
  },
  {
    id: 8,
    name: "Industrial RO Water Plant",
    icon: "FaWater",
    desc: "High-capacity multi-stage Reverse Osmosis mineral water purification plant supplying pristine drinking water everywhere.",
    category: "Amenities",
    active: true
  },
  {
    id: 9,
    name: "Automatic Passenger Lifts",
    icon: "FaElevator",
    desc: "Two 16-passenger automatic elevators with emergency ARD rescue system providing effortless access for elderly guests.",
    category: "Accessibility",
    active: true
  },
  {
    id: 10,
    name: "50-Ft Wide Elevated Stage",
    icon: "FaTheaterMasks",
    desc: "Grand stage featuring heavy aluminum trussing for modern floral backdrops, LED video walls, and traditional royal mandaps.",
    category: "Stage",
    active: true
  },
  {
    id: 11,
    name: "14 Air-Conditioned Guest Suites",
    icon: "FaBed",
    desc: "Well-appointed guest suites with attached western restrooms, 24/7 hot water, high-speed Wi-Fi, and plush bedding.",
    category: "Rooms",
    active: true
  },
  {
    id: 12,
    name: "Commercial Steam Kitchen",
    icon: "GiCookingPot",
    desc: "Equipped with large commercial steam cooking vessels, LPG pipelines, cold storage, and separate utensil sanitization bays.",
    category: "Dining",
    active: true
  },
  {
    id: 13,
    name: "Pioneer Acoustic PA System",
    icon: "FaVolumeUp",
    desc: "Acoustically tuned ceiling sound baffles, digital mixers, and cordless mics delivering pristine speech and Nadaswaram clarity.",
    category: "Technology",
    active: true
  },
  {
    id: 14,
    name: "Spotless Modern Restrooms",
    icon: "FaRestroom",
    desc: "Hygienic, touch-free restroom blocks continuously serviced by a dedicated housekeeping brigade throughout your event.",
    category: "Amenities",
    active: true
  }
];

export const DEFAULT_FEATURED_EVENTS = [
  {
    id: "royal-wedding",
    title: "Royal Traditional Weddings",
    category: "Weddings",
    desc: "Transform your sacred wedding muhurtham into a majestic celebration with our 50-foot flower mandap stage, crystal chandeliers, and royal South Indian ambiance.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Custom Royal Floral Mandap Rigs", "Dedicated Priest & Ritual Preparation Counter", "Spacious Baraat & Oonjal Procession Hallway"]
  },
  {
    id: "grand-reception",
    title: "Grand Evening Receptions",
    category: "Receptions",
    desc: "Dazzling evening receptions featuring intelligent moving head lighting, red carpet grand entry, and expansive buffet cocktail zones.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Dynamic Stage Moving-Head Beam Lighting", "Red Carpet Entrance with LED Floral Arch", "Dedicated Orchestra & DJ Live Stage Setup"]
  },
  {
    id: "engagement-ceremony",
    title: "Engagement & Nichayathartham",
    category: "Engagements",
    desc: "Intimate and elegant engagement functions with customized seating layouts, warm amber mood lighting, and family dining arrangements.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Intimate Floral Canopy & Ring Exchange Podium", "Customized Welcome Name Signage", "High-Tea & Welcome Drink Counter"]
  },
  {
    id: "birthday-gala",
    title: "Birthday Galas & Sangeet",
    category: "Parties",
    desc: "Celebrate milestone birthdays, vibrant Sangeet dance evenings, and golden jubilee anniversaries with energetic balloon decor and live counters.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Themed Photo Booth & Selfie Stage", "Dance Floor with Intelligent Lighting", "Live Chaat & Mocktail Bar Setup"]
  },
  {
    id: "corporate-summit",
    title: "Corporate Conferences & AGMs",
    category: "Corporate",
    desc: "High-impact corporate annual general meetings, dealer meets, product launches, and summits with dual 4K laser projection and high-speed Wi-Fi.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Dual 4K Laser Projector Screens & Podium AV", "High-Density Fiber Wi-Fi for 800+ Devices", "Executive High-Tea & Dining Buffet Lounge"]
  },
  {
    id: "anniversary-celebration",
    title: "Silver & Golden Anniversaries",
    category: "Anniversaries",
    desc: "Relive golden memories with extended family and friends in a dignified, warm, and beautifully illuminated traditional banquet hall.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Nostalgic Family Photo Display Walls", "Acoustic Soft Instrumental Music", "Seated Traditional Banana Leaf Service"]
  }
];

export const DEFAULT_GALLERY_IMAGES = [
  {
    id: 1,
    title: "Grand Royal Floral Mandap Setup",
    category: "Mandap",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Main AC Banquet Hall & Stage Seating",
    category: "Main Hall",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Evening Lighting & Crystal Chandeliers",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Spacious 600-Seater Dining Hall",
    category: "Dining",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Grand Exterior Night Illumination",
    category: "Exterior",
    image: "https://images.unsplash.com/photo-1545232979-fbf344e6675d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Luxury Air Conditioned Bride Suite",
    category: "Suites",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    title: "Traditional Welcome Floral Arch Entrance",
    category: "Decorations",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    title: "Executive Corporate Conference Setup",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 9,
    title: "Candlelight Banquet Table Arrangement",
    category: "Dining",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 10,
    title: "Vibrant Sangeet & Birthday Party Setup",
    category: "Decorations",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 11,
    title: "Groom Deluxe Dressing Suite",
    category: "Suites",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 12,
    title: "Auditorium Theater Seating Layout",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80"
  }
];

export const DEFAULT_VIDEOS = [
  {
    id: 1,
    title: "Grand Royal Wedding Highlights & Mandap Walkthrough",
    eventType: "Traditional Wedding",
    duration: "4:35",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: 2,
    title: "Opulent Evening Reception Gala & Stage Lighting Show",
    eventType: "Grand Reception",
    duration: "3:20",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 3,
    title: "Corporate Leadership Summit Venue Walkthrough",
    eventType: "Corporate Conference",
    duration: "2:50",
    thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 4,
    title: "Golden Anniversary Celebration & Live Music Evening",
    eventType: "Anniversary Gala",
    duration: "5:10",
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export const DEFAULT_PACKAGES = [
  {
    id: "royal-wedding",
    name: "Royal Wedding Package",
    tagline: "The ultimate 24-hour luxury wedding experience",
    price: "₹1,85,000",
    rawPrice: 185000,
    period: "per 24 Hours",
    popular: true,
    features: [
      "Centralized AC Hall (1,200 Seating Capacity)",
      "Spacious Dining Hall (600 Seats per batch)",
      "14 Air-Conditioned Deluxe Suite Rooms",
      "Full Stage Floral & Lighting Rig Infrastructure",
      "250 KVA Soundless Generator Backup Included",
      "Valet Parking for 250+ Cars with 24/7 Security",
      "Commercial Steam Kitchen & Stainless Vessels",
      "2 Dedicated On-Site Housekeeping Supervisors",
      "Unlimited RO Mineral Drinking Water Supply"
    ]
  },
  {
    id: "grand-reception",
    name: "Grand Reception Special",
    tagline: "Ideal for glamorous evening receptions & Sangeet nights",
    price: "₹1,25,000",
    rawPrice: 125000,
    period: "per 12 Hours",
    popular: false,
    features: [
      "Full Hall AC (1,200 Capacity) for 12 Hours",
      "Dining Hall Access with Stainless Tables",
      "6 Deluxe Guest Rooms Included",
      "Red Carpet Entrance & LED Arch Rigs",
      "Generator Power Backup Support",
      "Valet Parking Assistance & Security",
      "Complete Post-Event Sanitation Service"
    ]
  },
  {
    id: "corporate-summit",
    name: "Executive Corporate Package",
    tagline: "Tailored setup for AGMs, Conferences & Summits",
    price: "₹85,000",
    rawPrice: 85000,
    period: "per 8 Hours",
    popular: false,
    features: [
      "Acoustic AC Hall Setup (Auditorium / Classroom)",
      "Dual 4K Laser Projectors & Motorized Screens",
      "Podium with Goose-neck & Cordless Mics",
      "High-Speed Fiber Wi-Fi for 500+ Devices",
      "Executive Dining & High-Tea Lounge Zone",
      "4 VIP Guest Suite Rooms Included",
      "Dedicated On-site IT & Audio-Visual Technician"
    ]
  },
  {
    id: "gala-celebration",
    name: "Gala Celebration Package",
    tagline: "Perfect for Birthday Galas, Engagements & Naming Ceremonies",
    price: "₹65,000",
    rawPrice: 65000,
    period: "per 6 Hours",
    popular: false,
    features: [
      "Air-Conditioned Hall Setup (Up to 500 Guests)",
      "Dining Hall Access & Kitchen Facilities",
      "2 Deluxe Dressing Rooms",
      "Background PA Sound & Wireless Mic System",
      "Automatic Generator Power Backup",
      "Spacious Paved Parking Entry"
    ]
  }
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    clientName: "Karthik & Divya",
    eventType: "Royal Wedding",
    date: "January 2026",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    comment: "Murugu Mahal made our wedding day an absolute fairytale! The central AC was ice-cold throughout the afternoon, the 600-seater dining hall kept all our 1,800 guests comfortable without waiting, and the bride suite was spacious and luxury."
  },
  {
    id: 2,
    clientName: "Senthil Kumar & Meenakshi",
    eventType: "Grand Reception",
    date: "December 2025",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    comment: "Flawless management! The valet parking was organized so smoothly for our 200+ cars. The lighting on the stage and the sound clarity for the music evening was world-class. Highly recommended!"
  },
  {
    id: 3,
    clientName: "Dr. Anantharaman (Apollo Healthcare)",
    eventType: "Annual Medical Summit",
    date: "November 2025",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    comment: "We hosted our 3-day South India Medical Conference with over 900 delegates. The 4K laser projection screens and acoustic isolation were exceptional. The executive dining high-tea was seamless."
  }
];

export const DEFAULT_FAQS = [
  {
    q: "What is the total guest capacity of the main hall and dining?",
    a: "The main centralized air-conditioned hall comfortably seats 1,200 guests. The separate dining hall seats 600 guests simultaneously, enabling fast and hygienic banquet cycles."
  },
  {
    q: "Is kitchen equipment and gas pipeline provided for external caterers?",
    a: "Yes! Our commercial kitchen includes heavy-duty commercial steam boilers, large stainless steel vessels, LPG gas pipelines, and a separate utensil wash area with cold storage."
  },
  {
    q: "What is the generator power backup capacity?",
    a: "We have an automatic 250 KVA soundless diesel generator that seamlessly powers the entire venue — including all central chillers, stage lights, audio, and elevators — within 5 seconds of a power failure."
  },
  {
    q: "How many rooms are provided with the booking?",
    a: "The Royal Wedding Package includes 14 fully air-conditioned deluxe guest suites with attached western restrooms and geysers, including master Bride and Groom dressing suites."
  },
  {
    q: "How do I check date availability and confirm my booking?",
    a: "You can check date availability using our online calendar on the website or contact our reservation desk via phone/WhatsApp. An advance deposit confirms your chosen slot."
  }
];

export const DEFAULT_BOOKINGS = [
  {
    id: "BK-8901",
    customerName: "Ramasamy & Kalyani",
    phone: "+91 98401 23456",
    email: "ramasamy.k@gmail.com",
    eventType: "Royal Wedding",
    eventDate: "2026-09-12",
    timeSlot: "24 Hours (Full Day)",
    packageBooked: "Royal Wedding Package",
    guests: "1000+ Guests",
    totalAmount: 185000,
    advancePaid: 50000,
    balanceDue: 135000,
    status: "Confirmed",
    notes: "Mandap flower setup from 6:00 AM. 14 guest rooms required from previous night.",
    createdAt: "2026-08-10"
  },
  {
    id: "BK-8902",
    customerName: "Dr. Vijay Anand",
    phone: "+91 97902 34567",
    email: "vijay.anand@apollo.org",
    eventType: "Grand Reception",
    eventDate: "2026-09-18",
    timeSlot: "Evening Slot (3:00 PM - 11:00 PM)",
    packageBooked: "Grand Reception Special",
    guests: "500 - 1000 Guests",
    totalAmount: 125000,
    advancePaid: 40000,
    balanceDue: 85000,
    status: "Confirmed",
    notes: "Live orchestra stage setup with intelligent moving heads and red carpet entrance.",
    createdAt: "2026-08-12"
  },
  {
    id: "BK-8903",
    customerName: "Rajeshwari Subramanian",
    phone: "+91 94440 98765",
    email: "rajeshwari.s@yahoo.com",
    eventType: "Engagement",
    eventDate: "2026-09-24",
    timeSlot: "Morning Slot (5:00 AM - 2:00 PM)",
    packageBooked: "Gala Celebration Package",
    guests: "300 - 500 Guests",
    totalAmount: 65000,
    advancePaid: 20000,
    balanceDue: 45000,
    status: "Pending",
    notes: "Traditional floral backdrop required for ring exchange ceremony.",
    createdAt: "2026-08-15"
  },
  {
    id: "BK-8904",
    customerName: "Tata Consultancy Services Ltd",
    phone: "+91 98840 55443",
    email: "events@tcs-india.com",
    eventType: "Conference",
    eventDate: "2026-10-05",
    timeSlot: "Full Day (8:00 AM - 6:00 PM)",
    packageBooked: "Executive Corporate Package",
    guests: "500 - 1000 Guests",
    totalAmount: 85000,
    advancePaid: 85000,
    balanceDue: 0,
    status: "Confirmed",
    notes: "Annual Leadership convention. Dual 4K projectors and high-speed Wi-Fi essential.",
    createdAt: "2026-08-16"
  },
  {
    id: "BK-8905",
    customerName: "Balaji & Sneha",
    phone: "+91 99620 11223",
    email: "balaji.sneha@gmail.com",
    eventType: "Royal Wedding",
    eventDate: "2026-10-15",
    timeSlot: "24 Hours (Full Day)",
    packageBooked: "Royal Wedding Package",
    guests: "1000+ Guests",
    totalAmount: 185000,
    advancePaid: 60000,
    balanceDue: 125000,
    status: "Confirmed",
    notes: "South Indian traditional muhurtham followed by North Indian buffet dinner.",
    createdAt: "2026-08-17"
  }
];

export const ESTEEMED_CLIENTS = [
  { name: "TATA Consultancy Services", logo: "https://img.icons8.com/color/96/tata.png" },
  { name: "Reliance Industries", logo: "https://img.icons8.com/color/96/microsoft.png" },
  { name: "HDFC Royal Weddings", logo: "https://img.icons8.com/color/96/google-logo.png" },
  { name: "Titan Luxury Events", logo: "https://img.icons8.com/color/96/amazon.png" },
  { name: "Apollo Health Group", logo: "https://img.icons8.com/color/96/apple-logo.png" },
  { name: "Infosys Convention Circle", logo: "https://img.icons8.com/color/96/ibm.png" },
  { name: "L&T Construction Gala", logo: "https://img.icons8.com/color/96/intel.png" },
  { name: "TVS Luxury Celebrations", logo: "https://img.icons8.com/color/96/samsung.png" }
];

export const OWNER_MESSAGE = {
  name: "Shri. R. K. Viswanathan",
  title: "Founder & Managing Director",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  quote: "For over 14 years, Murugu Mahal has had the distinct honor of being the sacred canvas where thousands of families unite in celebration. Our pledge is simple: uncompromising luxury, immaculate cleanliness, and royal hospitality that treats every guest like family."
};

export const TIMELINE = [
  { year: "2012", title: "Grand Foundation", desc: "Inaugurated by royal patronage with a 600-capacity hall." },
  { year: "2016", title: "AC Expansion", desc: "Converted into 100% centralized AC venue with 14 luxury suites." },
  { year: "2020", title: "Green & Acoustic Tech", desc: "Installed 100 kW solar energy panels and Pioneer acoustic ceiling panels." },
  { year: "2024", title: "Best Mahal Award", desc: "Awarded 'Most Preferred Luxury Wedding Venue in South India' by Hospitality Times." }
];

// Compatibility exports for existing static imports
export const MAHAL_INFO = DEFAULT_MAHAL_INFO;
export const FACILITIES = DEFAULT_FACILITIES;
export const FEATURED_EVENTS = DEFAULT_FEATURED_EVENTS;
export const GALLERY_IMAGES = DEFAULT_GALLERY_IMAGES;
export const VIDEOS = DEFAULT_VIDEOS;
export const PACKAGES = DEFAULT_PACKAGES;
export const FAQS = DEFAULT_FAQS;
