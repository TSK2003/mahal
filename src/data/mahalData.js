// Master Seed Data for Grand Wedding Mahal & Convention Center

export const DEFAULT_MAHAL_INFO = {
  name: "Grand Mahal",
  tagline: "Where Royal Traditions Meet Timeless Luxury",
  shortDesc: "South India's premier luxury wedding destination and convention center. Featuring an opulent 1,200 capacity centrally air-conditioned hall, 600-seater traditional dining space, 14 deluxe AC guest suites, and 250+ secure car valet parking.",
  address: "Grand Mahal, No. 45, Royal Palace Avenue, GST Highway, Chennai, Tamil Nadu - 600045",
  phone: "+91 98401 23456",
  altPhone: "+91 98402 34567",
  whatsapp: "+919840123456",
  email: "reservations@grandmahal.com",
  adminEmail: "admin@grandmahal.com",
  hours: "Monday - Sunday: 8:00 AM - 10:00 PM (24/7 for Booked Events)",
  establishedYear: 2012,
  googleMapsUrl: "https://maps.google.com/?q=Grand+Mahal+Convention+Center",
  virtualTourUrl: "https://my.matterport.com/show/?m=sample-grand-mahal",
  stats: [
    { label: "Main AC Hall Seating", value: "1,200 Guests", sub: "Floating 2,000" },
    { label: "Dining Hall Capacity", value: "600 Seats", sub: "Buffet & Traditional" },
    { label: "Deluxe AC Suites", value: "14 Rooms", sub: "Bride & Groom VIP" },
    { label: "Valet Car Parking", value: "250+ Cars", sub: "100+ Two-wheelers" },
    { label: "Total Built-up Area", value: "22,000 Sq.Ft", sub: "Two Tier Complex" },
    { label: "Power Backup", value: "250 KVA", sub: "Uninterrupted DG Set" }
  ]
};

export const DEFAULT_FACILITIES = [
  {
    id: 1,
    title: "1,200 Seater Grand AC Hall",
    category: "Halls",
    desc: "Acoustically treated, high-ceiling central auditorium featuring gold crystal chandeliers and unobstructed pillarless view.",
    icon: "FaSnowflake"
  },
  {
    id: 2,
    title: "600 Capacity Dining Hall",
    category: "Dining",
    desc: "Separate spacious dining hall with modern stainless steel tables supporting traditional banana leaf feasts and royal buffets.",
    icon: "FaUtensils"
  },
  {
    id: 3,
    title: "14 Air-Conditioned Deluxe Suites",
    category: "Stay",
    desc: "Plush bride, groom, and family accommodation suites equipped with attached luxury bathrooms, dressing mirrors, and lockers.",
    icon: "FaBed"
  },
  {
    id: 4,
    title: "250+ Car Paved Valet Parking",
    category: "Parking",
    desc: "Expansive paved parking ground with dedicated valet drivers, CCTV surveillance, and 24/7 security guard personnel.",
    icon: "FaCar"
  },
  {
    id: 5,
    title: "Modern Heavy-Duty Steam Kitchen",
    category: "Dining",
    desc: "Commercial-grade hygienic kitchen with high-pressure steam boilers, cold storage, and spacious vegetable preparation zones.",
    icon: "GiCookingPot"
  },
  {
    id: 6,
    title: "250 KVA 100% DG Power Backup",
    category: "Power",
    desc: "Silent industrial diesel generators guaranteeing uninterrupted air-conditioning, stage lighting, and audio systems.",
    icon: "FaBolt"
  },
  {
    id: 7,
    title: "High-Speed Passenger Elevators",
    category: "Accessibility",
    desc: "Spacious automatic lifts providing effortless wheelchair and elder access across all hall and dining levels.",
    icon: "FaElevator"
  },
  {
    id: 8,
    title: "Pioneer Pro Stage Audio & Lighting",
    category: "AV",
    desc: "Integrated acoustic sound systems, wireless microphones, LED par lights, and moving head beams with dedicated mixer booth.",
    icon: "FaVolumeUp"
  },
  {
    id: 9,
    title: "Pure RO Drinking Water Plant",
    category: "Utility",
    desc: "Commercial 1,000 LPH multi-stage Reverse Osmosis purification plant supplying continuous drinking water across all floors.",
    icon: "FaWater"
  },
  {
    id: 10,
    title: "High-Resolution CCTV & Guard Security",
    category: "Safety",
    desc: "32 HD surveillance cameras covering all entry points, corridors, parking zones, and stage perimeters.",
    icon: "FaShieldAlt"
  },
  {
    id: 11,
    title: "VIP Bridal Dressing Lounge",
    category: "Stay",
    desc: "Custom makeup vanity stations with Hollywood mirror lighting, full-length mirrors, and attached private restroom.",
    icon: "GiQueenCrown"
  },
  {
    id: 12,
    title: "Modern Restrooms & Wash Zones",
    category: "Utility",
    desc: "Continuously sanitized luxury restrooms with automatic sensor taps and elder-friendly grab bars.",
    icon: "FaRestroom"
  }
];

export const DEFAULT_FEATURED_EVENTS = [
  {
    id: "royal-wedding",
    title: "Traditional South Indian Weddings",
    category: "Wedding",
    desc: "Majestic wedding setups with traditional carved floral mandaps, auspicious nadaswaram dais, and sacred homam arrangements.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Custom Flower Mandap", "Vedic Homa Kund Setup", "Bride & Groom VIP Suites", "Traditional Dining Service"]
  },
  {
    id: "grand-reception",
    title: "Grand Evening Receptions",
    category: "Reception",
    desc: "Opulent evening receptions with dynamic moving head stage lighting, LED wall backdrops, and red carpet welcome avenues.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Crystal Chandelier Ambience", "DJ & Surround Audio Booth", "Buffet Counters & Mocktail Bar", "Valet Parking Management"]
  },
  {
    id: "engagement-ceremony",
    title: "Engagement & Sangeet Ceremonies",
    category: "Ceremony",
    desc: "Vibrant intimate decor arrangements with customized stage arches, photobooths, and dance floor lighting for joyful celebrations.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Customized Photo Booth", "Dance Floor Lighting", "Comfortable Banquet Seating", "High-Tea Buffet Setup"]
  },
  {
    id: "corporate-summit",
    title: "Corporate Summits & AGMs",
    category: "Corporate",
    desc: "Professional executive conferences, annual general meetings, and corporate galas with dual projection screens and high-speed Wi-Fi.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    highlights: ["4K Laser Projectors", "Gooseneck & Lapel Mics", "Executive High-Tea Lounge", "Fiber High-Speed Internet"]
  }
];

export const DEFAULT_GALLERY_IMAGES = [
  { id: 1, title: "Royal Golden Mandap with Fresh Floral Arches", category: "Mandap", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "1,200 Seater Air-Conditioned Main Auditorium", category: "Main Hall", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Grand Reception Stage with Crystal Chandeliers", category: "Decorations", image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, title: "Spacious 600-Seater Traditional Dining Hall", category: "Dining", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, title: "Deluxe Air-Conditioned Bride Suite", category: "Suites", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, title: "Exterior Night Illumination & Grand Entrance Arch", category: "Exterior", image: "https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?auto=format&fit=crop&w=1200&q=80" },
  { id: 7, title: "Exquisite Fresh Jasmine & Rose Garland Decoration", category: "Mandap", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80" },
  { id: 8, title: "Moving Head Stage Lighting & Trussing Setup", category: "Lighting", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80" },
  { id: 9, title: "Corporate Conference Seating with Dual Screens", category: "Conference", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
  { id: 10, title: "Traditional Brass Nilavilakku Welcome Setup", category: "Decorations", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
  { id: 11, title: "Paved Car Parking Lot with Valet Desk", category: "Exterior", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80" },
  { id: 12, title: "Groom Preparation Lounge with Vanity Mirror", category: "Suites", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" }
];

export const DEFAULT_VIDEOS = [
  {
    id: 1,
    title: "Grand Wedding Ceremony Highlights - Ananya & Karthik",
    duration: "4:15",
    eventType: "Traditional Wedding",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Grand Mahal Architecture & 360° Facility Walkthrough",
    duration: "3:30",
    eventType: "Venue Walkthrough",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Royal Evening Reception & Dynamic Stage Lighting Showcase",
    duration: "5:10",
    eventType: "Grand Reception",
    thumbnail: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export const DEFAULT_PACKAGES = [
  {
    id: "traditional-wedding",
    name: "Royal Wedding Package",
    tagline: "The complete 24-Hour royal wedding experience for traditional families.",
    period: "24 Hours Full Day",
    price: "₹1,85,000",
    popular: true,
    features: [
      "1,200 Capacity Central AC Main Hall",
      "600 Seater Dining Hall Access",
      "6 Air-Conditioned Deluxe Guest Suites",
      "Full Modern Commercial Kitchen Setup",
      "250 KVA Generator Power Backup (Fuel Extra)",
      "250+ Paved Car Parking with Valet Staff",
      "Dedicated Floor Supervisor & Security Guard"
    ]
  },
  {
    id: "evening-reception",
    name: "Grand Reception Package",
    tagline: "Perfect for opulent evening wedding receptions and dinner galas.",
    period: "12 Hours (3:00 PM - 3:00 AM)",
    price: "₹1,25,000",
    popular: false,
    features: [
      "Main AC Hall with Stage Trussing",
      "Dining Hall & Buffet Counter Zones",
      "4 Air-Conditioned Dressing Rooms",
      "Moving Head Stage & Ambience Lighting",
      "Paved Valet Parking Space",
      "250 KVA Generator Power Backup"
    ]
  },
  {
    id: "engagement-ceremony",
    name: "Engagement & Muhurtham",
    tagline: "Tailored for morning muhurthams, ring ceremonies, and betrothals.",
    period: "8 Hours (5:00 AM - 1:00 PM)",
    price: "₹85,000",
    popular: false,
    features: [
      "Air-Conditioned Main Hall",
      "Dining Hall for Morning Breakfast & Lunch",
      "2 AC Bridal Dressing Rooms",
      "Hygienic Kitchen & RO Water Plant",
      "Valet Parking & Security Services"
    ]
  },
  {
    id: "corporate-conference",
    name: "Executive Corporate Package",
    tagline: "Designed for corporate summits, product launches, and annual AGMs.",
    period: "Full Day (8:00 AM - 6:00 PM)",
    price: "₹95,000",
    popular: false,
    features: [
      "Auditorium Seating for up to 1,200 Delegates",
      "Dual 4K Laser Projection & Sound PA",
      "Executive Dining & High-Tea Lounge",
      "High-Speed Fiber Wi-Fi Network",
      "Valet Parking & Green Room Suites"
    ]
  }
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. S. Ramaswamy & Family",
    event: "Daughter's Wedding",
    rating: 5,
    date: "January 2026",
    comment: "Grand Mahal provided an extraordinary experience for my daughter's wedding. The 1,200-seat AC hall kept all 1,500+ guests comfortable, and the 600-seater dining hall made the traditional feast smooth without any rush.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Meenakshi & Sundaram",
    event: "Grand Reception",
    rating: 5,
    date: "December 2025",
    comment: "The lighting, crystal chandeliers, and grand stage elevated our wedding photography. The valet parking handled 200+ cars effortlessly. Highly recommended for couples seeking royal elegance.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Venkatesh Babu (VP, Tech Summit)",
    event: "Annual Corporate AGM",
    rating: 5,
    date: "November 2025",
    comment: "We hosted our 800-delegate corporate summit at Grand Mahal. The acoustics, projector visibility, and seamless dining facilities exceeded all our corporate expectations.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const DEFAULT_FAQS = [
  {
    q: "What is the guest capacity of Grand Mahal?",
    a: "Our centrally air-conditioned main hall accommodates 1,200 guests in theater seating and over 2,000 floating guests. The separate dining hall seats 600 guests simultaneously."
  },
  {
    q: "How many air-conditioned guest suites are available?",
    a: "We have 14 luxury air-conditioned deluxe guest suites with attached modern bathrooms, vanity mirrors, and biometric locker security."
  },
  {
    q: "Is outside catering allowed at Grand Mahal?",
    a: "Yes! You are welcome to bring your preferred vegetarian or non-vegetarian catering team. We provide a full commercial heavy-duty steam kitchen, cold storage, and gas pipelines."
  },
  {
    q: "How does the generator power backup work?",
    a: "We maintain a dedicated 250 KVA industrial silent diesel generator that instantly kicks in during power cuts, powering all air conditioners, stage lights, and sound systems."
  },
  {
    q: "What is the booking and advance payment policy?",
    a: "To lock your auspicious date, an initial booking advance of 25% to 50% is required. The balance payment can be cleared 7 days before your scheduled event date."
  }
];

export const DEFAULT_BOOKINGS = [
  {
    id: "BK-8901",
    customerName: "Karthik Narayanan & Priya",
    phone: "+91 98401 55678",
    email: "karthik.n@gmail.com",
    eventType: "Royal Wedding",
    eventDate: "2026-09-12",
    timeSlot: "24 Hours (Full Day)",
    packageBooked: "Royal Wedding Package",
    guests: "1,000 - 1,200",
    status: "Confirmed",
    totalAmount: 185000,
    advancePaid: 100000,
    balanceDue: 85000,
    createdAt: "2026-08-01",
    notes: "Requires 10 extra deluxe rooms and flower stage arch."
  },
  {
    id: "BK-8902",
    customerName: "Suresh Kumar & Deepa",
    phone: "+91 98402 66789",
    email: "suresh.k@yahoo.com",
    eventType: "Grand Reception",
    eventDate: "2026-09-18",
    timeSlot: "Evening Slot (3:00 PM - 11:00 PM)",
    packageBooked: "Grand Reception Package",
    guests: "700 - 800",
    status: "Confirmed",
    totalAmount: 125000,
    advancePaid: 65000,
    balanceDue: 60000,
    createdAt: "2026-08-05",
    notes: "Moving head stage lights and buffet setup required."
  },
  {
    id: "BK-8903",
    customerName: "Ramesh Babu (Infosys Lead)",
    phone: "+91 98403 77890",
    email: "ramesh.b@corp.com",
    eventType: "Corporate Conference",
    eventDate: "2026-09-24",
    timeSlot: "Full Day (8:00 AM - 6:00 PM)",
    packageBooked: "Executive Corporate Package",
    guests: "500 Delegates",
    status: "Pending",
    totalAmount: 95000,
    advancePaid: 0,
    balanceDue: 95000,
    createdAt: "2026-08-10",
    notes: "Enquiry for Annual Tech Summit with laser projection."
  },
  {
    id: "BK-8904",
    customerName: "Vigneshwaran & Soundarya",
    phone: "+91 98404 88901",
    email: "vicky.sound@gmail.com",
    eventType: "Royal Wedding",
    eventDate: "2026-10-04",
    timeSlot: "24 Hours (Full Day)",
    packageBooked: "Royal Wedding Package",
    guests: "1,200+",
    status: "Confirmed",
    totalAmount: 185000,
    advancePaid: 185000,
    balanceDue: 0,
    createdAt: "2026-07-28",
    notes: "Full payment cleared. Muhurtham timings: 6:00 AM - 7:30 AM."
  }
];

export const ESTEEMED_CLIENTS = [
  { name: "Tata Consultancy Services", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=120&q=80" },
  { name: "Larsen & Toubro", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80" },
  { name: "Apollo Hospitals Guild", logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=120&q=80" },
  { name: "Rotary International", logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=120&q=80" }
];

export const OWNER_MESSAGE = {
  name: "Thiru. S. K. Sundaramoorthy",
  title: "Founder & Managing Trustee, Grand Mahal",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  quote: "When we founded Grand Mahal in 2012, our singular aspiration was to construct a palace that honours our rich South Indian architectural heritage while delivering five-star modern comforts. Over 3,500 happy families have celebrated their sacred rituals here, and we consider every celebration a sacred blessing."
};

export const TIMELINE = [
  { year: "2012", title: "Inauguration of Grand Mahal", desc: "Laid foundation stone and opened the 1,200 capacity royal auditorium." },
  { year: "2016", title: "Modern Steam Kitchen Expansion", desc: "Installed industrial steam boilers and 600-seater automated dining hall." },
  { year: "2020", title: "Deluxe Suites & Solar Power", desc: "Added 14 plush AC guest suites and green energy backup systems." },
  { year: "2024", title: "Acoustic & 4K Laser Projection Upgrade", desc: "Modernized audio-visual infrastructure for grand international conventions." }
];
