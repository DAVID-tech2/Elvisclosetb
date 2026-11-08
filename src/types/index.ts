/**
 * Shared TypeScript Contracts & Domain Models
 * ELVIS' ELEGANT CLOSET — Mukono, Uganda
 */

export type Currency = 'UGX';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size' | '28' | '30' | '32' | '34' | '36' | '38' | '39' | '40' | '41' | '42' | '43' | '44';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  size?: ProductSize;
  color?: string;
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number; // In UGX integer
  comparePrice?: number; // In UGX integer
  category: string;
  collection: 'men' | 'women' | 'accessories' | 'shoes' | 'all';
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  stockQuantity: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  visibility: 'public' | 'draft' | 'archived';
  sku: string;
  brand?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewsCount: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  order: number;
}

export interface BannerSlide {
  id: string;
  title: string;
  highlightedText: string;
  subtitle: string;
  badgeText: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  image: string;
  floatingBadgeText?: string;
  order: number;
  isActive: boolean;
}

export interface CampaignDeal {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  buttonText: string;
  buttonLink: string;
  endDate: string; // ISO date for countdown
  image: string;
  discountPercentage?: number;
  isActive: boolean;
}

export interface CartItem {
  id: string; // unique item line id
  productId: string;
  name: string;
  price: number; // UGX
  image: string;
  quantity: number;
  size?: ProductSize;
  color?: string;
}

export type OrderStatus =
  | 'Pending Payment'
  | 'Paid'
  | 'Processing'
  | 'Ready for Dispatch'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export type DeliveryArrangementStatus =
  | 'Not Contacted'
  | 'Customer Contacted'
  | 'Fee Agreed'
  | 'Delivery Arranged';

export type PaymentMethod =
  | 'MTN Mobile Money'
  | 'Airtel Money'
  | 'Card (Visa/Mastercard)';

export type PaymentStatus =
  | 'Pending'
  | 'Initiating'
  | 'Awaiting PIN'
  | 'Completed'
  | 'Failed'
  | 'Reversed'
  | 'Timed Out';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  region: string;
  deliveryNotes?: string;
}

export interface OrderItemSnapshot {
  productId: string;
  name: string;
  price: number; // UGX
  image: string;
  quantity: number;
  size?: ProductSize;
  color?: string;
}

export interface Order {
  id: string; // e.g. EC20250727342
  orderNumber: string;
  customer: CustomerDetails;
  items: OrderItemSnapshot[];
  subtotal: number; // UGX (sum of products only)
  total: number; // UGX (strictly product subtotal - transport fee agreed later!)
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  pesapalTrackingId?: string;
  orderStatus: OrderStatus;
  deliveryArrangementStatus: DeliveryArrangementStatus;
  agreedTransportFee?: number; // recorded after support contacts customer
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses?: Array<{
    id: string;
    label: string;
    address: string;
    city: string;
    region: string;
    isDefault: boolean;
  }>;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  views: number;
  publishedAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  currency: string;
  pesapalMerchantId?: string;
  pesapalConsumerKey?: string;
  directPushEnabled: boolean;
  storeStatus: 'Online' | 'Maintenance';
}
