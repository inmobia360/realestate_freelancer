export type OperationType = 'sale' | 'rent' | 'investment';

export type PropertyType = 
  | 'apartment' 
  | 'house' 
  | 'country_house' 
  | 'villa' 
  | 'penthouse' 
  | 'commercial' 
  | 'office' 
  | 'land' 
  | 'building';

export type PropertyStatus = 
  | 'draft' 
  | 'ready' 
  | 'published' 
  | 'reserved' 
  | 'sold' 
  | 'rented' 
  | 'archived';

export type PropertyCondition = 
  | 'new_construction' 
  | 'excellent' 
  | 'good' 
  | 'to_reform' 
  | 'reformed';

export type LeadTemperature = 'hot' | 'warm' | 'cold';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'negotiating' | 'closed' | 'discarded';

export type InquiryType = 'buy' | 'rent' | 'invest' | 'sell' | 'info' | 'visit';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  agencyName: string;
  licenseNumber?: string;
  phone: string;
  whatsapp: string;
  country: string;
  city: string;
  language: 'es' | 'en';
  currency: 'EUR' | 'USD' | 'GBP';
  logoUrl?: string;
  avatarUrl?: string;
  brandColor?: string;
  legalNotice?: string;
  privacyNotice?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Property {
  id: string;
  ownerId: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  operation: OperationType;
  country: string;
  city: string;
  area: string;
  address?: string;
  price: number;
  currency: 'EUR' | 'USD' | 'GBP';
  bedrooms: number;
  bathrooms: number;
  builtArea: number; // m²
  garage: boolean;
  terrace: boolean;
  condition: PropertyCondition;
  description: string;
  features: string[];
  targetAudience: 'families' | 'investors' | 'international_buyers' | 'students' | 'first_time_buyers' | 'retirees' | 'general';
  contentLanguage: 'es' | 'en' | 'both';
  images: string[];
  status: PropertyStatus;
  published: boolean;
  region?: string;
  coordinates?: { lat: number; lng: number };
  viewsCount?: number;
  leadsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  ownerId: string;
  propertyId: string;
  propertyName?: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
  budget?: number;
  timeframe?: 'immediate' | '1_3_months' | '3_6_months' | 'exploring';
  consent: boolean;
  temperature: LeadTemperature;
  score: number; // 0 - 100
  aiSummary?: string;
  recommendedAction?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  analyzedAt?: string;
}

export interface MarketingContentPack {
  commercialTitle: string;
  shortDescription: string;
  longDescription: string;
  instagramCopy: string;
  facebookCopy: string;
  whatsappMessage: string;
  videoScript: string;
  investorAngle: string;
  foreignBuyerAngle: string;
  translatedEn?: string;
  translatedEs?: string;
}

export interface GeneratedContent {
  id: string;
  ownerId: string;
  propertyId: string;
  type: 'full_pack' | 'social_media' | 'investor' | 'international' | 'custom';
  language: 'es' | 'en' | 'bilingual';
  content: MarketingContentPack;
  createdAt: string;
  updatedAt: string;
}
