import {
  Product,
  Category,
  Order,
  BannerSlide,
  CampaignDeal,
  Testimonial,
  BlogPost,
  ContactMessage,
  StoreSettings,
  OrderStatus,
  DeliveryArrangementStatus
} from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'eec_products_v1',
  CATEGORIES: 'eec_categories_v1',
  ORDERS: 'eec_orders_v1',
  BANNERS: 'eec_banners_v1',
  CAMPAIGNS: 'eec_campaigns_v1',
  MESSAGES: 'eec_messages_v1',
  SUBSCRIBERS: 'eec_subscribers_v1',
  SETTINGS: 'eec_settings_v1',
};

// Seed initial data accurately matching the design screenshots
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: "Men's Classic Polo Shirt",
    subtitle: 'Premium cotton polo shirt',
    description: 'A timeless classic polo crafted from breathable pique cotton with tailored collar and ribbed cuffs. Perfect for casual outings and smart casual events in Kampala and Mukono.',
    price: 185000,
    comparePrice: 220000,
    category: "Men's Fashion",
    collection: 'men',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625910513413-5bc1334c2d33?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'White', hex: '#F9FAFB' }
    ],
    stockQuantity: 45,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-POLO-001',
    brand: "Elvis' Closet",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: '2025-07-20T10:30:00Z',
    updatedAt: '2025-07-20T10:30:00Z',
  },
  {
    id: 'prod-2',
    name: "Elegant Women's Dress",
    subtitle: 'Stylish and comfortable',
    description: 'Exquisite tailored silhouette featuring a flattering cinched waist and pleated flare. Made from luxurious wrinkle-resistant fabric for all-day elegance.',
    price: 95000,
    comparePrice: 120000,
    category: "Women's Fashion",
    collection: 'women',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crimson Red', hex: '#DC2626' },
      { name: 'Emerald', hex: '#047857' },
      { name: 'Black', hex: '#111827' }
    ],
    stockQuantity: 12,
    stockStatus: 'low_stock',
    visibility: 'public',
    sku: 'EEC-DRESS-002',
    brand: "Elvis' Closet",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 96,
    createdAt: '2025-07-19T14:15:00Z',
    updatedAt: '2025-07-19T14:15:00Z',
  },
  {
    id: 'prod-3',
    name: 'Trendy Sneakers',
    subtitle: 'Walk in style',
    description: 'Crisp minimal white leather sneakers engineered with cushioned arch support and high-grip rubber soles. Pairs effortlessly with chinos, denim, or athleisure.',
    price: 120000,
    comparePrice: 140000,
    category: 'Shoes',
    collection: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['40', '41', '42', '43', '44'],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'White & Grey', hex: '#E5E7EB' }
    ],
    stockQuantity: 60,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-SHOE-003',
    brand: 'Urban Trend',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.7,
    reviewsCount: 42,
    createdAt: '2025-07-18T09:20:00Z',
    updatedAt: '2025-07-18T09:20:00Z',
  },
  {
    id: 'prod-4',
    name: "Classic Denim Jacket",
    subtitle: 'Perfect for any season',
    description: 'Upgrade your wardrobe with this Classic Denim Jacket. Made from high-quality denim fabric, it offers durability, comfort and a sharp modern look. Whether you are heading out for dinner or weekend meetups, this piece is an absolute staple.',
    price: 180000,
    comparePrice: 210000,
    category: "Men's Fashion",
    collection: 'men',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#18181B' },
      { name: 'Vintage Blue', hex: '#2563EB' }
    ],
    stockQuantity: 25,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-JKT-004',
    brand: "Elvis' Closet",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 24,
    createdAt: '2025-07-17T16:00:00Z',
    updatedAt: '2025-07-17T16:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Classic Leather Handbag',
    subtitle: 'Elegant and spacious',
    description: 'Hand-finished structured tote crafted from premium full-grain vegan leather. Features gold-toned hardware, multiple inner security compartments, and detachable shoulder strap.',
    price: 150000,
    comparePrice: 180000,
    category: 'Accessories',
    collection: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Warm Beige', hex: '#D7C4B7' },
      { name: 'Classic Black', hex: '#0F172A' },
      { name: 'Tan Brown', hex: '#854D0E' }
    ],
    stockQuantity: 18,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-BAG-005',
    brand: "Elvis' Luxe",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 51,
    createdAt: '2025-07-16T11:45:00Z',
    updatedAt: '2025-07-16T11:45:00Z',
  },
  {
    id: 'prod-6',
    name: "Women's Blazer",
    subtitle: 'Modern tailoring for power styling',
    description: 'Sharp double-breasted structured blazer cut to perfection. Designed for business professionals and chic evening dinners alike.',
    price: 150000,
    comparePrice: 175000,
    category: "Women's Fashion",
    collection: 'women',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory Cream', hex: '#F5F5DC' },
      { name: 'Midnight Black', hex: '#111827' }
    ],
    stockQuantity: 14,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-BLAZER-006',
    brand: "Elvis' Closet",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 19,
    createdAt: '2025-07-15T08:30:00Z',
    updatedAt: '2025-07-15T08:30:00Z',
  },
  {
    id: 'prod-7',
    name: "Women's Bodycon Dress",
    subtitle: 'Flattering evening chic',
    description: 'Sleek ribbed contour dress hugging your curves gracefully. High-stretch knit that maintains shape through day and evening events.',
    price: 100000,
    comparePrice: 130000,
    category: "Women's Fashion",
    collection: 'women',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#18181B' },
      { name: 'Burgundy', hex: '#831843' }
    ],
    stockQuantity: 20,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-BODYCON-007',
    brand: "Elvis' Closet",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 33,
    createdAt: '2025-07-14T12:00:00Z',
    updatedAt: '2025-07-14T12:00:00Z',
  },
  {
    id: 'prod-8',
    name: 'Aviator Sunglasses',
    subtitle: 'UV400 polarized shades',
    description: 'Iconic teardrop metal frames with gradient UV400 lenses providing high optical clarity and sun protection under the bright African sun.',
    price: 70000,
    comparePrice: 90000,
    category: 'Accessories',
    collection: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Gold & Smoke', hex: '#EAB308' },
      { name: 'Matte Black', hex: '#18181B' }
    ],
    stockQuantity: 35,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-SUN-008',
    brand: 'RayLux',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 28,
    createdAt: '2025-07-13T10:10:00Z',
    updatedAt: '2025-07-13T10:10:00Z',
  },
  {
    id: 'prod-9',
    name: 'Luxury Wrist Watch',
    subtitle: 'Chronograph genuine leather',
    description: 'Precision Japanese quartz movement housed in polished stainless steel with hand-stitched genuine leather strap and scratch-resistant sapphire crystal glass.',
    price: 250000,
    comparePrice: 280000,
    category: 'Accessories',
    collection: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Saddle Brown & Gold', hex: '#854D0E' },
      { name: 'Silver & Black', hex: '#475569' }
    ],
    stockQuantity: 10,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-WATCH-009',
    brand: 'Chronos',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 45,
    createdAt: '2025-07-12T15:20:00Z',
    updatedAt: '2025-07-12T15:20:00Z',
  },
  {
    id: 'prod-10',
    name: 'Unisex Hoodie',
    subtitle: 'Heavyweight fleece comfort',
    description: 'Cozy 420gsm brushed cotton fleece pullover with kangaroo pocket, double-lined hood and sturdy ribbed hems. Perfect for chilly evenings in Mukono.',
    price: 110000,
    comparePrice: 130000,
    category: "Men's Fashion",
    collection: 'men',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Warm Sand', hex: '#D6C0B3' },
      { name: 'Pitch Black', hex: '#18181B' },
      { name: 'Heather Grey', hex: '#9CA3AF' }
    ],
    stockQuantity: 22,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-HOOD-010',
    brand: "Elvis' Closet",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.6,
    reviewsCount: 30,
    createdAt: '2025-07-11T13:40:00Z',
    updatedAt: '2025-07-11T13:40:00Z',
  },
  {
    id: 'prod-11',
    name: 'Baseball Cap',
    subtitle: 'Embroidered structured crown',
    description: 'Cotton twill 6-panel cap featuring clean tonal embroidery and adjustable brass buckle slider for comfortable fit.',
    price: 50000,
    comparePrice: 65000,
    category: 'Accessories',
    collection: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Black', hex: '#18181B' },
      { name: 'Navy', hex: '#1E3A8A' }
    ],
    stockQuantity: 40,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-CAP-011',
    brand: "Elvis' Closet",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 16,
    createdAt: '2025-07-10T11:00:00Z',
    updatedAt: '2025-07-10T11:00:00Z',
  },
  {
    id: 'prod-12',
    name: 'Signature Perfume',
    subtitle: 'Eau de Parfum 100ml',
    description: 'An intoxicating woody oriental fragrance opens with sparkling bergamot and pink pepper, unfurling into rich amber, tonka bean and oud wood.',
    price: 95000,
    comparePrice: 120000,
    category: 'Accessories',
    collection: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Amber Gold', hex: '#D97706' }
    ],
    stockQuantity: 15,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-SCENT-012',
    brand: 'Maison Noir',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 39,
    createdAt: '2025-07-09T14:30:00Z',
    updatedAt: '2025-07-09T14:30:00Z',
  },
  {
    id: 'prod-13',
    name: "Men's Cargo Pants",
    subtitle: 'Tactical relaxed street fit',
    description: 'Reinforced cotton twill cargo trousers with ergonomic gusseting and flap utility pockets. Ideal balance of functionality and streetwear style.',
    price: 130000,
    comparePrice: 150000,
    category: "Men's Fashion",
    collection: 'men',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Matte Black', hex: '#18181B' },
      { name: 'Olive Green', hex: '#3F6212' },
      { name: 'Khaki', hex: '#A16207' }
    ],
    stockQuantity: 28,
    stockStatus: 'in_stock',
    visibility: 'public',
    sku: 'EEC-CARGO-013',
    brand: "Elvis' Closet",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 22,
    createdAt: '2025-07-08T09:15:00Z',
    updatedAt: '2025-07-08T09:15:00Z',
  },
  {
    id: 'prod-14',
    name: "Men's Bomber Jacket",
    subtitle: 'Satin finish flight jacket',
    description: 'Heavy-duty insulated bomber with wind-resistant nylon shell, brass zipper hardware and ribbed athletic collar.',
    price: 220000,
    comparePrice: 250000,
    category: "Men's Fashion",
    collection: 'men',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Camel Tan', hex: '#B45309' },
      { name: 'Olive', hex: '#365314' }
    ],
    stockQuantity: 8,
    stockStatus: 'low_stock',
    visibility: 'public',
    sku: 'EEC-BOMB-014',
    brand: "Elvis' Closet",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 17,
    createdAt: '2025-07-07T16:45:00Z',
    updatedAt: '2025-07-07T16:45:00Z',
  }
];

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: "Clothing", slug: 'clothing', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80', itemCount: 148, order: 1 },
  { id: 'cat-2', name: "Shoes", slug: 'shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80', itemCount: 64, order: 2 },
  { id: 'cat-3', name: "Bags", slug: 'bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80', itemCount: 38, order: 3 },
  { id: 'cat-4', name: "Accessories", slug: 'accessories', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=400&q=80', itemCount: 82, order: 4 },
  { id: 'cat-5', name: "Watches", slug: 'watches', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80', itemCount: 25, order: 5 },
  { id: 'cat-6', name: "Beauty", slug: 'beauty', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80', itemCount: 19, order: 6 },
  { id: 'cat-7', name: "Home Decor", slug: 'home-decor', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80', itemCount: 12, order: 7 },
  { id: 'cat-8', name: "Perfumes", slug: 'perfumes', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80', itemCount: 15, order: 8 },
];

const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 'banner-1',
    title: 'Elevate Your',
    highlightedText: 'Everyday Style',
    subtitle: 'Discover timeless pieces crafted for comfort, confidence and class — for both men and women.',
    badgeText: 'SUMMER 2025 COLLECTION',
    primaryButtonText: 'Shop Now',
    primaryButtonLink: '/shop',
    secondaryButtonText: 'Explore Collection',
    secondaryButtonLink: '/collections/all',
    image: '/assets/aistudio/hero_models_summer_clean.jpg',
    floatingBadgeText: 'FASHION FOR EVERYONE',
    order: 1,
    isActive: true,
  },
  {
    id: 'banner-2',
    title: "Men's Luxury",
    highlightedText: 'Refined Wardrobe',
    subtitle: 'Tailored jackets, premium polo shirts, chinos and sneakers made for the modern African gentleman.',
    badgeText: 'NEW SEASON ARRIVALS',
    primaryButtonText: "Explore Men's",
    primaryButtonLink: '/collections/men',
    secondaryButtonText: 'View Lookbook',
    secondaryButtonLink: '/shop?collection=men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    floatingBadgeText: 'STYLE REDEFINED',
    order: 2,
    isActive: true,
  },
  {
    id: 'banner-3',
    title: "Women's Couture",
    highlightedText: 'Grace & Confidence',
    subtitle: 'Dresses, blazers, and statement evening wear designed to turn heads everywhere you step.',
    badgeText: 'EXCLUSIVE COLLECTION',
    primaryButtonText: "Shop Women's",
    primaryButtonLink: '/collections/women',
    secondaryButtonText: 'Best Sellers',
    secondaryButtonLink: '/shop?filter=bestseller',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
    floatingBadgeText: 'LOOK GOOD, FEEL AMAZING',
    order: 3,
    isActive: true,
  },
  {
    id: 'banner-4',
    title: 'Boutique Footwear &',
    highlightedText: 'Sneaker Culture',
    subtitle: 'Walk in effortless comfort with our high-grade leather sneakers, loafers, and boots.',
    badgeText: 'HANDPICKED SHOES',
    primaryButtonText: 'Discover Shoes',
    primaryButtonLink: '/collections/shoes',
    secondaryButtonText: 'Browse All',
    secondaryButtonLink: '/shop',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80',
    floatingBadgeText: 'STEP WITH CONFIDENCE',
    order: 4,
    isActive: true,
  },
  {
    id: 'banner-5',
    title: 'Accessories &',
    highlightedText: 'Signature Accents',
    subtitle: 'Structured leather totes, luxury chronograph watches, shades, and distinctive fragrances.',
    badgeText: 'COMPLETE YOUR LOOK',
    primaryButtonText: 'Shop Accessories',
    primaryButtonLink: '/collections/accessories',
    secondaryButtonText: 'View Deals',
    secondaryButtonLink: '/shop?deals=true',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    floatingBadgeText: 'PERFECT FINISHING TOUCH',
    order: 5,
    isActive: true,
  }
];

const INITIAL_CAMPAIGN: CampaignDeal = {
  id: 'camp-1',
  title: "Special Deals You Can't Miss!",
  subtitle: 'Shop the latest styles at unbeatable prices with nationwide delivery.',
  badge: 'LIMITED TIME OFFER',
  buttonText: 'Shop The Sale',
  buttonLink: '/shop?sale=true',
  endDate: new Date(Date.now() + 2 * 24 * 3600 * 1000 + 14 * 3600 * 1000 + 36 * 60 * 1000).toISOString(),
  image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  discountPercentage: 25,
  isActive: true,
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'EC20250727342',
    orderNumber: '#EC20250727342',
    customer: {
      fullName: 'David Muhwana',
      email: 'david@gmail.com',
      phone: '+256 700 123 456',
      deliveryAddress: 'Plot 12, Kampala Road',
      city: 'Kampala',
      region: 'Central Region',
      deliveryNotes: 'Deliver between 2 PM and 5 PM if possible'
    },
    items: [
      {
        productId: 'prod-4',
        name: "Men's Denim Jacket",
        price: 180000,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        size: 'L',
        color: 'Black'
      },
      {
        productId: 'prod-5',
        name: 'Classic Leather Handbag',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        color: 'Beige'
      }
    ],
    subtotal: 330000,
    total: 330000,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Completed',
    paymentReference: 'PESAPAL-MM-984321',
    pesapalTrackingId: 'ec-pp-29104',
    orderStatus: 'Processing',
    deliveryArrangementStatus: 'Customer Contacted',
    agreedTransportFee: 10000,
    internalNotes: 'Customer confirmed via WhatsApp; dispatch rider assigned to Mukono-Kampala route.',
    createdAt: '2025-07-27T20:45:00Z',
    updatedAt: '2025-07-27T21:00:00Z',
  },
  {
    id: 'EC12345',
    orderNumber: '#EC12345',
    customer: {
      fullName: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+256 700 123 456',
      deliveryAddress: 'Entebbe Road, Namasuba',
      city: 'Kampala',
      region: 'Central Region'
    },
    items: [
      {
        productId: 'prod-1',
        name: "Men's Classic Polo Shirt",
        price: 185000,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        size: 'M',
        color: 'Black'
      }
    ],
    subtotal: 185000,
    total: 185000,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Pending',
    orderStatus: 'Pending Payment',
    deliveryArrangementStatus: 'Not Contacted',
    createdAt: '2025-07-27T10:32:00Z',
    updatedAt: '2025-07-27T10:32:00Z',
  },
  {
    id: 'EC12344',
    orderNumber: '#EC12344',
    customer: {
      fullName: 'Mary Atieno',
      email: 'mary.atieno@gmail.com',
      phone: '+256 772 987 654',
      deliveryAddress: 'Jinja Road, Mukono Town',
      city: 'Mukono',
      region: 'Central Region'
    },
    items: [
      {
        productId: 'prod-2',
        name: "Elegant Women's Dress",
        price: 95000,
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
        quantity: 2,
        size: 'M',
        color: 'Crimson Red'
      },
      {
        productId: 'prod-8',
        name: 'Aviator Sunglasses',
        price: 100000,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
        quantity: 1
      }
    ],
    subtotal: 290000,
    total: 290000,
    paymentMethod: 'Card (Visa/Mastercard)',
    paymentStatus: 'Completed',
    orderStatus: 'Processing',
    deliveryArrangementStatus: 'Fee Agreed',
    agreedTransportFee: 7000,
    internalNotes: 'Local delivery in Mukono town.',
    createdAt: '2025-07-26T16:15:00Z',
    updatedAt: '2025-07-26T16:20:00Z',
  },
  {
    id: 'EC12343',
    orderNumber: '#EC12343',
    customer: {
      fullName: 'David Mugisha',
      email: 'dmugisha@yahoo.com',
      phone: '+256 773 456 789',
      deliveryAddress: 'Acacia Mall, Kisementi',
      city: 'Kampala',
      region: 'Central Region'
    },
    items: [
      {
        productId: 'prod-3',
        name: 'Trendy Sneakers',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        size: '42'
      }
    ],
    subtotal: 120000,
    total: 120000,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Completed',
    orderStatus: 'Out for Delivery',
    deliveryArrangementStatus: 'Delivery Arranged',
    agreedTransportFee: 12000,
    internalNotes: 'Rider James has picked up parcel.',
    createdAt: '2025-07-25T13:20:00Z',
    updatedAt: '2025-07-25T14:00:00Z',
  },
  {
    id: 'EC12342',
    orderNumber: '#EC12342',
    customer: {
      fullName: 'Sarah Nakitende',
      email: 'sarah.nakitende@outlook.com',
      phone: '+256 705 654 321',
      deliveryAddress: 'Ggaba Road, Kansanga',
      city: 'Kampala',
      region: 'Central Region'
    },
    items: [
      {
        productId: 'prod-5',
        name: 'Classic Leather Handbag',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        quantity: 1
      },
      {
        productId: 'prod-11',
        name: 'Baseball Cap',
        price: 60000,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
        quantity: 1
      }
    ],
    subtotal: 210000,
    total: 210000,
    paymentMethod: 'Card (Visa/Mastercard)',
    paymentStatus: 'Completed',
    orderStatus: 'Delivered',
    deliveryArrangementStatus: 'Delivery Arranged',
    agreedTransportFee: 10000,
    createdAt: '2025-07-24T17:45:00Z',
    updatedAt: '2025-07-25T10:15:00Z',
  },
  {
    id: 'EC12341',
    orderNumber: '#EC12341',
    customer: {
      fullName: 'Brian Okello',
      email: 'okello.brian@gmail.com',
      phone: '+256 701 234 567',
      deliveryAddress: 'Kyambogo Lower Estate',
      city: 'Kampala',
      region: 'Central Region'
    },
    items: [
      {
        productId: 'prod-11',
        name: 'Baseball Cap',
        price: 75000,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
        quantity: 1
      }
    ],
    subtotal: 75000,
    total: 75000,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
    deliveryArrangementStatus: 'Not Contacted',
    createdAt: '2025-07-23T11:30:00Z',
    updatedAt: '2025-07-23T11:40:00Z',
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Diana A.',
    role: 'Fashion Enthusiast',
    rating: 5,
    comment: "Amazing quality and fast shipping! The jacket fits like it was custom made. I'm proud to shop at Elvis' Closet.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Michael T.',
    role: 'Creative Director',
    rating: 5,
    comment: 'Stylish, affordable and best customer service. The Mobile Money payment was instantaneous and seamless.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Sarah N.',
    role: 'Entrepreneur',
    rating: 5,
    comment: "My go-to store for fashion. Always on point! Their Mukono team arranged transport quickly right to my gate in Kampala.",
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    verified: true,
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'wardrobe-essentials-every-fashion-lover-needs',
    title: '5 Wardrobe Essentials Every Fashion Lover Needs',
    excerpt: 'Build a versatile wardrobe with these 5 must-have pieces that transition seamlessly from office to evening.',
    content: `Building a classic capsule wardrobe doesn't require hundreds of pieces. By investing in tailored essentials like a crisp cotton polo, a structured blazer, premium selvedge denim, and versatile minimalist white sneakers, you can assemble dozens of high-impact looks. In Uganda's warm and dynamic weather, breathable fabrics and tailored silhouettes make all the difference.`,
    category: 'Fashion Tips',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    author: 'Sarah Nakato',
    readTime: '5 min read',
    views: 1200,
    publishedAt: 'Jul 25, 2025',
  },
  {
    id: 'blog-2',
    slug: 'how-to-style-sneakers-for-any-occasion',
    title: 'How to Style Sneakers for Any Occasion',
    excerpt: 'From casual weekend hangouts to smart casual cocktail events, here is how to style your sneakers perfectly.',
    content: `Sneakers have officially transcended gyms and running tracks. Today, pairing low-top minimalist white sneakers with tailored cropped trousers or a chic summer dress creates an understated aura of effortless confidence. Keep the leather polished, choose minimal branding, and let your outfit's proportions shine.`,
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    author: 'David Muhwana',
    readTime: '4 min read',
    views: 980,
    publishedAt: 'Jul 20, 2025',
  },
  {
    id: 'blog-3',
    slug: 'top-2025-fashion-trends-you-should-know',
    title: 'Top 2025 Fashion Trends You Should Know',
    excerpt: 'Discover the hottest fashion trends dominating Uganda and beyond this year, from earthy neutrals to bold outerwear.',
    content: `This year is all about quiet luxury meeting vibrant African aesthetics. We are seeing a surge in warm earth tones—camel, rich chocolate brown, terracotta, and olive—punctuated with sharp gold hardware accessories and structured silhouettes.`,
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    author: 'Elvis S.',
    readTime: '5 min read',
    views: 1100,
    publishedAt: 'Jul 15, 2025',
  },
  {
    id: 'blog-4',
    slug: 'smart-shopping-tips-for-fashion-lovers',
    title: 'Smart Shopping Tips for Fashion Lovers',
    excerpt: 'Shop smarter, spend less and always get the best value for your money with curated boutique collections.',
    content: `Smart shopping begins with knowing your body silhouette and choosing timeless quality over fast-fashion obsolescence. Inspect seam construction, prioritize natural fibers, and invest in statement accessories like leather bags and timepieces that elevate every outfit.`,
    category: 'Shopping Guide',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    author: 'Grace Namulondo',
    readTime: '4 min read',
    views: 850,
    publishedAt: 'Jul 10, 2025',
  }
];

const INITIAL_SETTINGS: StoreSettings = {
  storeName: "ELVIS' ELEGANT CLOSET",
  location: 'Mukono, Uganda',
  phone: '+256 778 781601',
  whatsapp: '+256 778 781601',
  email: 'elviselegantcloset@gmail.com',
  currency: 'UGX',
  directPushEnabled: true,
  storeStatus: 'Online',
};

class StoreService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to persist ${key}`, e);
    }
  }

  // --- PRODUCTS ---
  getProducts(): Product[] {
    return this.get<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  saveProduct(product: Partial<Product> & { id?: string }): Product {
    const products = this.getProducts();
    const now = new Date().toISOString();

    if (product.id) {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const updated: Product = {
          ...products[index],
          ...product,
          updatedAt: now,
        } as Product;
        products[index] = updated;
        this.set(STORAGE_KEYS.PRODUCTS, products);
        return updated;
      }
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: product.name || 'New Fashion Product',
      subtitle: product.subtitle || '',
      description: product.description || '',
      price: product.price || 0,
      comparePrice: product.comparePrice,
      category: product.category || "Men's Fashion",
      collection: product.collection || 'all',
      images: product.images && product.images.length > 0 ? product.images : [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
      ],
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      colors: product.colors || [{ name: 'Black', hex: '#111827' }],
      stockQuantity: product.stockQuantity || 20,
      stockStatus: product.stockQuantity && product.stockQuantity <= 5 ? (product.stockQuantity === 0 ? 'out_of_stock' : 'low_stock') : 'in_stock',
      visibility: product.visibility || 'public',
      sku: product.sku || `EEC-${Date.now().toString().slice(-4)}`,
      brand: product.brand || "Elvis' Closet",
      isFeatured: !!product.isFeatured,
      isBestSeller: !!product.isBestSeller,
      isNewArrival: product.isNewArrival !== undefined ? product.isNewArrival : true,
      rating: product.rating || 5.0,
      reviewsCount: product.reviewsCount || 0,
      createdAt: now,
      updatedAt: now,
    };

    products.unshift(newProduct);
    this.set(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  }

  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.set(STORAGE_KEYS.PRODUCTS, products);
  }

  duplicateProduct(id: string): Product | undefined {
    const target = this.getProductById(id);
    if (!target) return undefined;

    return this.saveProduct({
      ...target,
      id: undefined,
      name: `${target.name} (Copy)`,
      sku: `${target.sku}-CPY`,
      createdAt: new Date().toISOString(),
    });
  }

  // --- CATEGORIES ---
  getCategories(): Category[] {
    return this.get<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    this.set(STORAGE_KEYS.CATEGORIES, categories);
  }

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter((c) => c.id !== id);
    this.set(STORAGE_KEYS.CATEGORIES, categories);
  }

  // --- ORDERS ---
  getOrders(): Order[] {
    return this.get<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }

  getOrderById(idOrNumber: string): Order | undefined {
    const clean = idOrNumber.trim().toUpperCase();
    return this.getOrders().find(
      (o) => o.id.toUpperCase() === clean || o.orderNumber.toUpperCase() === clean || o.orderNumber.replace('#', '').toUpperCase() === clean
    );
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const orders = this.getOrders();
    const idNumber = Date.now().toString().slice(-8);
    const orderNumber = `#EC${idNumber}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: `EC${idNumber}`,
      orderNumber,
      createdAt: now,
      updatedAt: now,
    };

    orders.unshift(newOrder);
    this.set(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return undefined;

    orders[index].orderStatus = status;
    orders[index].updatedAt = new Date().toISOString();
    this.set(STORAGE_KEYS.ORDERS, orders);
    return orders[index];
  }

  updateDeliveryArrangementStatus(
    orderId: string,
    deliveryStatus: DeliveryArrangementStatus,
    agreedFee?: number,
    notes?: string
  ): Order | undefined {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return undefined;

    orders[index].deliveryArrangementStatus = deliveryStatus;
    if (agreedFee !== undefined) {
      orders[index].agreedTransportFee = agreedFee;
    }
    if (notes !== undefined) {
      orders[index].internalNotes = notes;
    }
    orders[index].updatedAt = new Date().toISOString();
    this.set(STORAGE_KEYS.ORDERS, orders);
    return orders[index];
  }

  // --- BANNERS (5 HOMEPAGE CAROUSEL SLIDES) ---
  getBanners(): BannerSlide[] {
    const banners = this.get<BannerSlide[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
    // Ensure banner-1 has the authentic model artwork
    const b1 = banners.find((b) => b.id === 'banner-1');
    if (b1 && b1.image.includes('unsplash.com')) {
      b1.image = '/assets/aistudio/hero_models_summer_clean.jpg';
      this.set(STORAGE_KEYS.BANNERS, banners);
    }
    return banners;
  }

  saveBanner(banner: BannerSlide): void {
    const banners = this.getBanners();
    const index = banners.findIndex((b) => b.id === banner.id);
    if (index !== -1) {
      banners[index] = banner;
    } else {
      banners.push(banner);
    }
    this.set(STORAGE_KEYS.BANNERS, banners);
  }

  // --- CAMPAIGNS & DEALS ---
  getCampaign(): CampaignDeal {
    return this.get<CampaignDeal>(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGN);
  }

  saveCampaign(campaign: CampaignDeal): void {
    this.set(STORAGE_KEYS.CAMPAIGNS, campaign);
  }

  // --- CONTACT MESSAGES ---
  getMessages(): ContactMessage[] {
    return this.get<ContactMessage[]>(STORAGE_KEYS.MESSAGES, [
      {
        id: 'msg-1',
        fullName: 'Grace Kigozi',
        email: 'gkigozi@gmail.com',
        phone: '+256 778 123 999',
        subject: 'Wholesale Inquiry for Women Dresses',
        message: 'Hello Elvis, I run a boutique in Jinja and would like to order in bulk. Do you have a wholesale catalog?',
        status: 'unread',
        createdAt: '2025-07-27T08:15:00Z',
      },
      {
        id: 'msg-2',
        fullName: 'Brian Mukasa',
        email: 'bmukasa@outlook.com',
        phone: '+256 701 443 221',
        subject: 'Custom Tailored Suit Delivery',
        message: 'Can I visit your physical branch in Mukono for measurements?',
        status: 'read',
        createdAt: '2025-07-26T14:40:00Z',
      }
    ]);
  }

  saveMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const msgs = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    msgs.unshift(newMsg);
    this.set(STORAGE_KEYS.MESSAGES, msgs);
    return newMsg;
  }

  // --- STORE SETTINGS ---
  getSettings(): StoreSettings {
    return this.get<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  saveSettings(settings: StoreSettings): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  // --- RESET TO DEFAULTS ---
  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.BANNERS);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }
}

export const storeService = new StoreService();
