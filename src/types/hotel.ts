export interface Hotel {
  id: number;
  name: string;
  location: string;
  distance: string;
  image: string;
  rating: number;
  reviews: number;
  roomType: string;
  bedType: string;
  amenities: string[];
  price: number;
  originalPrice?: number;
  nights: number;
  guests: number;
  taxes: number;
  freeCancellation: boolean;
  stars: number;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  adults: number;
  children: number;
  rooms: number;
  minPrice?: number;
  maxPrice?: number;
  starRating: string[];
  propertyTypes: string[];
  guestRating: string[];
  distance: string[];
  meals: string[];
  deals: string[];
  amenities: string[];
  sortBy: string;
}

export interface HotelSearchResponse {
  hotels: Hotel[];
  total: number;
  location: string;
}