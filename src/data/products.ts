import { Product } from '../types';

export const BRAND_INFO = {
  name: 'iBUS Gadgets & Accessories',
  shortName: 'iBUS',
  tagline: 'Your Connection to Quality!',
  location: 'UB96, Ubakason Plaza, Alaba International Market, Lagos, Nigeria',
  email: 'ibustechltd@gmail.com',
  phone: '+234 810 220 8521',
  phoneClean: '+2348102208521',
  googleMapsUrl: 'https://maps.app.goo.gl/CwKw6nTQfLrFYjUB9?g_st=ac',
  logoUrl: '/assets/aistudio/IMG-20261104-WA0074_58210dd6.jpg',
  established: 'Alaba Market, Lagos',
  wholesaleMinimumOrderValue: 50000, // ₦50,000 min bulk checkout
  freeDeliveryThresholdLagos: 50000,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ibus-buds-3',
    name: 'iBUS buds 3.0 ANC/ENC Wireless Earbuds',
    subTitle: 'Active Noise Cancellation · 38H Playtime · Ergonomic Fit',
    category: 'audio',
    price: 28500,
    originalPrice: 35000,
    wholesalePrice: 21500,
    minWholesaleQty: 10,
    wholesaleTiers: [
      { minQty: 10, maxQty: 24, pricePerUnit: 21500, discountPercent: 24, label: 'Distributor Pack' },
      { minQty: 25, maxQty: 49, pricePerUnit: 19800, discountPercent: 30, label: 'Wholesale Carton' },
      { minQty: 50, pricePerUnit: 18200, discountPercent: 36, label: 'Super Dealer Master' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0088_1__650f297a.jpg',
      '/assets/aistudio/IMG-20261104-WA0089_1__3046c880.jpg'
    ],
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 85,
    badge: 'Flagship ANC',
    specs: {
      'Noise Cancellation': 'Active Noise Reduction (ANC) + Environmental ENC',
      'Driver Size': '13mm Beryllium Dynamic Drivers',
      'Battery Life': '8h single charge / 38h with compact charging case',
      'Charging Port': 'USB Type-C Fast Charge (10 mins = 2 hours)',
      'Connectivity': 'Bluetooth 5.3 + Dual-Channel Ultra Low Latency',
      'Water Resistance': 'IPX5 Sweat & Splash Proof',
      'In The Box': 'iBUS Buds 3.0, Charging Case with Lanyard, USB-C Cable, 3x Ear-tip sizes, Manual'
    },
    features: [
      'Dual-Mic ANC system eliminates background market & commute noise up to -35dB',
      'Signature heavy bass tuning specifically optimized for Afrobeats and high-energy music',
      'Tactile smart-touch control on stems for calls, music playback, and ANC toggles',
      'Sleek obsidian black case with high-gloss accents and woven travel wristlet strap'
    ],
    description: 'Engineered for listeners who refuse to compromise. The iBUS buds 3.0 combines commercial-grade Active Noise Cancellation (ANC) with rich, textured bass. Its high-precision acoustic cavity creates an expansive soundstage while dual environmental noise-cancelling microphones ensure studio-clear voice calls in bustling Lagos traffic or open offices.',
    warranty: '12 Months Official iBUS Replacement Guarantee',
    bnplEligible: true,
    saveToBuyEligible: true,
  },
  {
    id: 'ibus-pb-30000',
    name: 'iBUS 30,000mAh Ultra-Capacity Power Bank',
    subTitle: 'Heavy-Duty Powerhouse · Dual USB Output · Multi-Protection IC',
    category: 'power-banks',
    price: 34000,
    originalPrice: 42000,
    wholesalePrice: 26500,
    minWholesaleQty: 10,
    wholesaleTiers: [
      { minQty: 10, maxQty: 24, pricePerUnit: 26500, discountPercent: 22, label: 'Carton of 10' },
      { minQty: 25, maxQty: 49, pricePerUnit: 24800, discountPercent: 27, label: 'Wholesale Master 25+' },
      { minQty: 50, pricePerUnit: 23000, discountPercent: 32, label: 'Bulk Dealer Pallet' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0080_1__de103086.jpg'
    ],
    rating: 5.0,
    reviewCount: 310,
    inStock: true,
    stockCount: 160,
    badge: 'Bestseller',
    specs: {
      'Rated Capacity': '30,000mAh / 111Wh High-Density Lithium Polymer',
      'Output Ports': '2x High-Speed USB-A (5V / 2.4A Smart Charge)',
      'Input Ports': '1x Type-C Input + 1x Micro-USB Input (Dual Input Flexibility)',
      'Battery Indicator': '4-Stage Precision LED Fuel Gauge (25% / 50% / 75% / 100%)',
      'Safety IC': '10-Layer Protection: Over-charge, Over-current, Short-circuit & Temperature Cutoff',
      'Enclosure': 'Textured Diagonal Heat-Dissipation Anti-Slip Shell with Carry Loop',
      'Dimensions': '148 x 69 x 39 mm · 540g'
    },
    features: [
      'Powers modern smartphones 7 to 9 times from 0 to 100% on a single complete charge',
      'Dual output allows simultaneous high-speed charging for phone and wireless earbuds or friend’s device',
      'Airline-safe compliant standard under commercial safety limits',
      'Sturdy braided silicone carrying loop ensures safe grip during heavy daily commuting'
    ],
    description: 'The definitive solution for Nigeria’s on-the-go lifestyle and erratic power supply. Built with a reinforced diagonal-grooved polycarbonate casing and embossed gold iBUS insignia, the 30,000mAh titan delivers dependable multi-day reserve battery power for business owners, travelers, content creators, and dispatch riders.',
    warranty: '12 Months Official iBUS Warranty',
    bnplEligible: true,
    saveToBuyEligible: true,
  },
  {
    id: 'ibus-pb-20000',
    name: 'iBUS 20,000mAh Fast-Charging Power Bank',
    subTitle: 'Slim Profile · Dual USB Output · Airline Approved Form Factor',
    category: 'power-banks',
    price: 26500,
    originalPrice: 32000,
    wholesalePrice: 20500,
    minWholesaleQty: 10,
    wholesaleTiers: [
      { minQty: 10, maxQty: 24, pricePerUnit: 20500, discountPercent: 23, label: 'Carton of 10' },
      { minQty: 25, maxQty: 49, pricePerUnit: 19000, discountPercent: 28, label: 'Wholesale Master' },
      { minQty: 50, pricePerUnit: 17800, discountPercent: 33, label: 'Alaba Distributor Tier' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0086_1__9650e2a4.jpg'
    ],
    rating: 4.8,
    reviewCount: 218,
    inStock: true,
    stockCount: 120,
    badge: 'Popular Choice',
    specs: {
      'Rated Capacity': '20,000mAh High-Purity Li-Po Cell',
      'Output Ports': 'Dual USB Smart Output (5V / 2.4A Max)',
      'Input Ports': 'Type-C Input + Micro-USB Input',
      'Indicator': 'Quad LED Level Indicators',
      'Protection': 'Short Circuit, Surge, Over-Voltage, Over-Current Protection',
      'Weight': '395g'
    },
    features: [
      'Perfect balance of colossal 20,000mAh capacity and slim pocket-friendly ergonomics',
      'Charges an iPhone 15 or Samsung Galaxy S24 up to 5 full times',
      'Reinforced diagonal ribbing prevents cosmetic scuffs and heat retention',
      'Integrated heavy-duty wristlet loop for effortless transit handling'
    ],
    description: 'Engineered for everyday durability. The iBUS 20,000mAh model combines high-density power cells with rigorous safety protocols, ensuring stable power delivery without overheating your sensitive smartphone circuits.',
    warranty: '12 Months Official Warranty',
    bnplEligible: true,
    saveToBuyEligible: true,
  },
  {
    id: 'ibus-pb-is3-mini',
    name: 'iBUSTECH iS3 Mini Fast-Charge 10,000mAh Power Bank',
    subTitle: 'Circular Digital % Display · PD+QC Fast Charging · High-Vis Orange Strap',
    category: 'power-banks',
    price: 21500,
    originalPrice: 26000,
    wholesalePrice: 16800,
    minWholesaleQty: 10,
    wholesaleTiers: [
      { minQty: 10, maxQty: 24, pricePerUnit: 16800, discountPercent: 22, label: 'Distributor Pack' },
      { minQty: 25, pricePerUnit: 15400, discountPercent: 28, label: 'Master Bulk Dealer' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0084_1__6f834baa.jpg'
    ],
    rating: 4.9,
    reviewCount: 96,
    inStock: true,
    stockCount: 75,
    badge: 'Digital Display',
    specs: {
      'Capacity': '10,000mAh High-Density Mini Li-Polymer',
      'Display': 'Digital High-Contrast Circular LED Percentage Fuel Gauge (1–100%)',
      'Fast Charge Protocols': 'PD 20W Power Delivery + Quick Charge (QC 3.0)',
      'Ports': 'USB-A Output + Type-C Bi-directional Input/Output',
      'Strap': 'Heavy-Duty Tactical Neon-Orange Lanyard Included',
      'Form Factor': 'Ultra-compact palm silhouette (Fits in any small pocket)'
    },
    features: [
      'Digital fuel gauge displays exact remaining percentage so you never guess your reserve',
      'Bi-directional Type-C port recharges the power bank and powers modern devices rapidly',
      'High-contrast tactical strap prevents drops and hooks onto backpacks or belt loops',
      'Fast-charges compatible smartphones from 0 to 50% in approximately 30 minutes'
    ],
    description: 'The ultra-compact powerhouse for modern professionals. The iBUSTECH iS3 features an iconic circular blue-ringed LED digital display that reveals exact charge down to 1%. Paired with PD+QC fast charging and an unmistakable safety-orange strap, it is both a fashion accessory and a survival essential.',
    warranty: '12 Months Replacement Guarantee',
    bnplEligible: true,
    saveToBuyEligible: true,
  },
  {
    id: 'ibus-pb-10000-classic',
    name: 'iBUS 10,000mAh Ultra-Slim Travel Power Bank',
    subTitle: 'Lightweight Pocket Profile · Dual Output · Scratch-Resistant Finish',
    category: 'power-banks',
    price: 16500,
    originalPrice: 20000,
    wholesalePrice: 12500,
    minWholesaleQty: 15,
    wholesaleTiers: [
      { minQty: 15, maxQty: 29, pricePerUnit: 12500, discountPercent: 24, label: 'Tier 1 Box' },
      { minQty: 30, pricePerUnit: 11200, discountPercent: 32, label: 'Wholesale Master' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0082_1__1d7057de.jpg'
    ],
    rating: 4.7,
    reviewCount: 168,
    inStock: true,
    stockCount: 90,
    badge: 'Budget Power',
    specs: {
      'Capacity': '10,000mAh / 37Wh',
      'Output': 'Dual USB 5V / 2.1A Max Output',
      'Input': 'Dual Type-C and Micro-USB Charging Inputs',
      'LEDs': '4 Discrete Status LEDs',
      'Weight': '210g Ultra-lightweight'
    },
    features: [
      'Featherweight pocket design tailored for daily office, campus and transit use',
      'Dual-input charging allows using either your old Micro-USB or modern Type-C phone cable',
      'Scratch-resistant grooved matte black body maintains pristine aesthetic'
    ],
    description: 'Reliable, compact and featherweight. The 10,000mAh iBUS classic ensures your smartphone stays powered through full workdays without adding bulk to your pocket or handbag.',
    warranty: '12 Months Warranty',
    bnplEligible: false,
    saveToBuyEligible: true,
  },
  {
    id: 'ibus-earbuds-is1',
    name: 'iBUSTECH iS1 True Wireless Earbuds',
    subTitle: 'Premium Sound · Touch Controls · Ergonomic Stem Acoustics',
    category: 'audio',
    price: 19500,
    originalPrice: 24000,
    wholesalePrice: 14500,
    minWholesaleQty: 15,
    wholesaleTiers: [
      { minQty: 15, maxQty: 29, pricePerUnit: 14500, discountPercent: 25, label: 'Wholesale Box' },
      { minQty: 30, pricePerUnit: 13200, discountPercent: 32, label: 'Dealer Carton' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0090_1__aeed71e6.jpg'
    ],
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
    stockCount: 65,
    badge: 'True Wireless',
    specs: {
      'Design': 'Semi In-Ear Ergonomic Stem Style',
      'Acoustic Driver': '12mm Dynamic Titanium Diaphragm',
      'Bluetooth': 'v5.3 Instant Auto-Pairing',
      'Playback Time': '6h per charge / 24h total with charging cradle',
      'Controls': 'Capacitive Smart Touch Controls for Siri/Google, Volume & Calls',
      'Finish': 'Porcelain Gloss White with Silver Magnetic Contacts'
    },
    features: [
      'Painless all-day semi-in-ear comfort designed for long phone calls and Zoom meetings',
      'Crisp high frequencies and punchy vocal clarity',
      'One-step instant pairing the moment you open the lid'
    ],
    description: 'The iBUSTECH iS1 delivers true wireless freedom with zero ear canal pressure. Tuned for crystal-clear vocals and dynamic beats, it is an essential daily companion for calls, music, podcasts and meetings.',
    warranty: '12 Months Warranty',
    bnplEligible: false,
    saveToBuyEligible: true,
  },
  {
    id: 'ibus-car-charger-is2',
    name: 'iBUSTECH iS2 Dual USB Fast Car Charger (3.4A Max)',
    subTitle: 'Smart Chip Protection · Gunmetal Alloy Housing · Includes Premium Cable',
    category: 'chargers',
    price: 8500,
    originalPrice: 11000,
    wholesalePrice: 5800,
    minWholesaleQty: 20,
    wholesaleTiers: [
      { minQty: 20, maxQty: 49, pricePerUnit: 5800, discountPercent: 31, label: 'Carton of 20' },
      { minQty: 50, pricePerUnit: 4900, discountPercent: 42, label: 'Bulk Reseller Tier' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0081_1__f344b7d1.jpg'
    ],
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockCount: 140,
    badge: 'Car Essential',
    specs: {
      'Input Voltage': 'DC 12V–24V (Compatible with all cars, SUVs, and commercial trucks)',
      'Total Output': '3.4A Max Smart Rapid Charge',
      'Ports': 'Dual High-Speed USB Ports with Type-C support',
      'Material': 'Fire-retardant Gunmetal Zinc-Alloy Body',
      'Safety': 'Multi-Protect Smart IC against overvoltage, overheating & electrical noise',
      'Included Accessory': 'Comes with durable charging cable in package'
    },
    features: [
      'Delivers rapid 3.4A output to charge driver and passenger devices simultaneously',
      'All-metal alloy body dissipates heat rapidly during heavy air-conditioned car runs',
      'Flush compact design sits neatly in 12V cigarette lighter sockets without wobbling',
      'Built-in smart chip automatically identifies connected phone wattage requirements'
    ],
    description: 'Never arrive with a dead battery again. The iBUSTECH iS2 3.4A Dual USB Car Charger features a solid metallic gunmetal enclosure and intelligent charge regulation. Whether navigating Google Maps through Lagos traffic or streaming road-trip music, your devices stay charged and cool.',
    warranty: '12 Months Replacement Warranty',
    bnplEligible: false,
    saveToBuyEligible: false,
  },
  {
    id: 'ibus-cable-type-c',
    name: 'iBUS C-Cable Type-C Fast Charging Cable (2-Pack)',
    subTitle: 'Fast · Safe · Durable · Pure Copper Core with Branded Silicone Wraps',
    category: 'cables',
    price: 5500,
    originalPrice: 7500,
    wholesalePrice: 3500,
    minWholesaleQty: 25,
    wholesaleTiers: [
      { minQty: 25, maxQty: 49, pricePerUnit: 3500, discountPercent: 36, label: 'Wholesale Pack 25' },
      { minQty: 50, pricePerUnit: 2900, discountPercent: 47, label: 'Super Bulk Carton 50+' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0087_1__7aae242a.jpg'
    ],
    rating: 4.9,
    reviewCount: 240,
    inStock: true,
    stockCount: 300,
    badge: '2-Pack Value',
    specs: {
      'Package Contents': '2x Authentic iBUS Type-C Fast Charging Cables with Silicone Ties',
      'Power Delivery': 'Up to 65W High-Speed Fast Charge & 480Mbps Data Sync',
      'Connector': 'Reversible USB Type-C to USB-A (Gold-Plated Pins)',
      'Length': '1.0 Meter each',
      'Bend Test': '15,000+ laboratory bend tolerance cycles'
    },
    features: [
      'Includes two complete cables in every retail box - one for your bedside, one for the office/car',
      'Heavy-duty strain-relief collars prevent fraying and neck breakage at plug ends',
      'Includes custom iBUS yellow silicone cable organizers to prevent bag tangles',
      'Thickened tinned copper conductors reduce resistance and accelerate charging speeds'
    ],
    description: 'The definitive Type-C charging cable solution. Packaged as a value 2-Pack, the iBUS C-Cable combines heavy-duty strain relief with pure copper internal cores. Tested to withstand over 15,000 extreme bends, it outlasts generic cables by months.',
    warranty: '6 Months Replacement Guarantee',
    bnplEligible: false,
    saveToBuyEligible: false,
  },
  {
    id: 'ibus-cable-lightning',
    name: 'iBUS L-Cable iPhone Lightning Fast Charging Cable (2-Pack)',
    subTitle: 'Fast · Safe · Durable · Optimized for Apple iPhone & iPad Fast Charge',
    category: 'cables',
    price: 6000,
    originalPrice: 8500,
    wholesalePrice: 3800,
    minWholesaleQty: 25,
    wholesaleTiers: [
      { minQty: 25, maxQty: 49, pricePerUnit: 3800, discountPercent: 36, label: 'Wholesale Pack 25' },
      { minQty: 50, pricePerUnit: 3200, discountPercent: 46, label: 'Super Bulk Carton 50+' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0083_1__75b06355.jpg'
    ],
    rating: 4.8,
    reviewCount: 205,
    inStock: true,
    stockCount: 260,
    badge: '2-Pack Value',
    specs: {
      'Package Contents': '2x Genuine iBUS Lightning Cables with Branded Ties',
      'Charging Current': '2.4A High-Speed Rapid Charge & iTunes Sync',
      'Connector': 'Apple 8-Pin Lightning to USB-A',
      'Length': '1.0 Meter',
      'Compatibility': 'iPhone 14/13/12/11/X/8/7/6, iPad Mini, iPad Air'
    },
    features: [
      'Zero "Accessory Not Supported" warnings - built with smart handshake ICs',
      'Reinforced junction guards prevent the notorious neck splits common on Apple cords',
      'Two full cables per box for home, car, or family sharing'
    ],
    description: 'Keep your iPhones and iPads fully powered with the robust iBUS L-Cable 2-Pack. Engineered with high-tensile internal shielding and smart over-voltage detection to safeguard sensitive iOS battery health.',
    warranty: '6 Months Replacement Guarantee',
    bnplEligible: false,
    saveToBuyEligible: false,
  },
  {
    id: 'ibus-cable-micro',
    name: 'iBUS M-Cable Android Micro-USB Charging Cable (2-Pack)',
    subTitle: 'Fast · Safe · Durable · Reinforced Plug for Android, Radios & Gadgets',
    category: 'cables',
    price: 4500,
    originalPrice: 6500,
    wholesalePrice: 2800,
    minWholesaleQty: 30,
    wholesaleTiers: [
      { minQty: 30, maxQty: 49, pricePerUnit: 2800, discountPercent: 37, label: 'Wholesale Pack 30' },
      { minQty: 50, pricePerUnit: 2400, discountPercent: 46, label: 'Super Bulk Carton 50+' }
    ],
    images: [
      '/assets/aistudio/IMG-20261104-WA0085_1__48c2d545.jpg'
    ],
    rating: 4.7,
    reviewCount: 154,
    inStock: true,
    stockCount: 280,
    badge: '2-Pack Value',
    specs: {
      'Package Contents': '2x iBUS Micro-USB Charging & Data Cables',
      'Charging Speed': '2.4A Fast Charge',
      'Connector': 'Standard Micro USB to USB-A',
      'Durability': 'High-elasticity TPE outer jacket with pure copper core'
    },
    features: [
      'Universal compatibility with older Android phones, rechargeable fans, power banks, and torches',
      'Gold-plated micro teeth lock snugly into phone ports without becoming loose',
      'Pack of 2 cables with reusable silicone organizing bands'
    ],
    description: 'The workhorse cable for millions of devices. The iBUS M-Cable delivers consistent high-amperage current to recharge phones, portable mini-fans, speakers and power banks without power drops.',
    warranty: '6 Months Replacement Guarantee',
    bnplEligible: false,
    saveToBuyEligible: false,
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'All Products', icon: 'Sparkles', count: 9 },
  { id: 'power-banks', label: 'Power Banks', icon: 'BatteryCharging', count: 4 },
  { id: 'audio', label: 'Wireless Audio', icon: 'Headphones', count: 2 },
  { id: 'chargers', label: 'Car & Wall Chargers', icon: 'Zap', count: 1 },
  { id: 'cables', label: 'Fast Cables', icon: 'Cable', count: 3 },
  { id: 'accessories', label: 'Phone Accessories', icon: 'Shield', count: 0 },
];

export const WHOLESALE_BENEFITS = [
  {
    title: 'Direct Alaba International Sourcing',
    desc: 'Bypass middlemen and order directly from our primary warehouse at Ubakason Plaza, Alaba International Market.',
    stat: '30-45% Margin'
  },
  {
    title: 'Nationwide Logistics Network',
    desc: 'Same-day dispatch to transporters, parks, and courier hubs (GIG Logistics, Speedaf, ABC Express) across all 36 Nigerian states.',
    stat: '24-48h Delivery'
  },
  {
    title: '1-to-1 Replacement Guarantee',
    desc: 'Official 6–12 months replacement warranty on all manufacturer defects. Trade with 100% confidence.',
    stat: 'Zero Risk'
  },
  {
    title: 'Custom Brand Marketing Collateral',
    desc: 'We provide our registered distributors with high-res product photos, branded counter display stands, and promotional posters.',
    stat: 'Free POS Kits'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Chidubem Okafor',
    role: 'Electronics Retailer, Computer Village, Ikeja',
    comment: 'The iBUS 30,000mAh power bank is our fastest moving product this year. Customers love the heavy-duty build and real capacity. Their wholesale dispatch from Alaba is always on time.',
    rating: 5,
    city: 'Lagos'
  },
  {
    id: 2,
    name: 'Fatima Abdullahi',
    role: 'Student & Content Creator',
    comment: 'I bought the iBUS buds 3.0 with ANC. The noise cancellation completely silences the BRT bus noise during my daily commute to Unilag. The bass is insane for this price!',
    rating: 5,
    city: 'Yaba, Lagos'
  },
  {
    id: 3,
    name: 'Engr. Emeka Nwosu',
    role: 'Managing Director, GadgetHub Port Harcourt',
    comment: 'We registered as an iBUS regional distributor in Rivers State 6 months ago. The 2-pack fast cables and car chargers have zero returns. Genuine quality, unmatched margins.',
    rating: 5,
    city: 'Port Harcourt'
  }
];
