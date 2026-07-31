export const MATERIALS = ['Walnut', 'Steel', 'Marble', 'Ceramic'] as const;
export const CATEGORIES = ['Tables', 'Seating', 'Lighting'] as const;

export type Material = (typeof MATERIALS)[number];
export type Category = (typeof CATEGORIES)[number];
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface CraftPiece {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  artisanName: string;
  price: number;
  material: Material;
  category: Category;
  dimensions: string;
  leadTime: string;
  imageUrls: string[];
  customOrderAvailable: boolean;
  averageRating: number;
  reviewCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  craftPiece: string;
  user: { _id: string; name: string; email: string } | string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CraftListResponse {
  items: CraftPiece[];
  pagination: Pagination;
}

export interface StatsOverview {
  totals: {
    crafts: number;
    users: number;
    reviews: number;
    averagePrice: number;
  };
  byMaterial: { material: string; count: number }[];
  byCategory: { category: string; count: number }[];
  priceBands: { range: string; count: number }[];
  recentCrafts: Pick<
    CraftPiece,
    '_id' | 'title' | 'price' | 'material' | 'category' | 'averageRating' | 'createdAt'
  >[];
}

export interface ApiError {
  success: false;
  message: string;
  details?: unknown;
}
