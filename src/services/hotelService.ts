import { Hotel, SearchFilters, HotelSearchResponse } from '@/types/hotel';
import { getHotelsByLocation } from '@/data/hotelData';

/**
 * Hotel Service - Centralized hotel data management
 * 
 * This service provides a clean interface for hotel data operations.
 * Currently uses dummy data, but can be easily extended to use real APIs.
 * 
 * Future API Integration:
 * 1. Replace the implementation inside these functions with actual API calls
 * 2. Add error handling and retry logic
 * 3. Add caching mechanisms
 * 4. Add data transformation logic
 */

class HotelService {
  private apiBaseUrl: string = 'https://hotel-api-qndt.onrender.com';
  private useRealAPI: boolean = false; // Toggle this to switch between dummy and real API

  /**
   * Search hotels based on filters
   * @param filters - Search criteria
   * @returns Promise<HotelSearchResponse>
   */
  async searchHotels(filters: SearchFilters): Promise<HotelSearchResponse> {
    console.log('🔍 HotelService: Searching hotels with filters:', filters);

    // Simulate API delay for realistic experience
    await this.delay(800);

    if (this.useRealAPI) {
      return this.searchHotelsFromAPI(filters);
    } else {
      return this.searchHotelsFromDummyData(filters);
    }
  }

  /**
   * Get hotels from dummy data (current implementation)
   */
  private async searchHotelsFromDummyData(filters: SearchFilters): Promise<HotelSearchResponse> {
    const location = filters.location || 'default';
    let hotels = getHotelsByLocation(location);

    // Apply date range to calculate nights
    const nights = this.calculateNights(filters.checkIn, filters.checkOut);
    
    // Update hotel data with search parameters
    hotels = hotels.map(hotel => ({
      ...hotel,
      nights,
      guests: filters.adults + filters.children,
      // Adjust prices based on nights and guests (simple logic)
      price: Math.round(hotel.price * this.getPriceMultiplier(nights, filters.adults + filters.children)),
      originalPrice: hotel.originalPrice ? Math.round(hotel.originalPrice * this.getPriceMultiplier(nights, filters.adults + filters.children)) : undefined,
      location: filters.location || hotel.location
    }));

    // Apply filters (star rating, price range, etc.)
    hotels = this.applyFilters(hotels, filters);

    // Apply sorting
    hotels = this.applySorting(hotels, filters.sortBy);

    console.log(`✅ HotelService: Found ${hotels.length} hotels for ${location}`);

    return {
      hotels,
      total: hotels.length,
      location: filters.location || 'Unknown Location'
    };
  }

  /**
   * Get hotels from real API (future implementation)
   */
  private async searchHotelsFromAPI(filters: SearchFilters): Promise<HotelSearchResponse> {
    console.log('🌐 HotelService: Making real API call...');
    
    try {
      const searchParams = new URLSearchParams({
        location: filters.location || '',
        checkIn: filters.checkIn || '',
        checkOut: filters.checkOut || '',
        adults: filters.adults.toString(),
        children: filters.children.toString(),
        rooms: filters.rooms.toString()
      });

      const response = await fetch(`${this.apiBaseUrl}/search?${searchParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform API data to match our Hotel interface
      const hotels: Hotel[] = data.hotels?.map((hotel: any) => ({
        id: hotel.id || Math.random(),
        name: hotel.name || 'Hotel Name',
        location: hotel.location || filters.location || '',
        distance: hotel.distance || '1 km to city center',
        image: hotel.image || '/lovable-uploads/e6764045-1a5d-4f3d-80b8-d6ba711e528d.png',
        rating: parseFloat(hotel.rating || '4.5'),
        reviews: parseInt(hotel.reviews || '1000'),
        roomType: hotel.roomType || 'Standard Room',
        bedType: hotel.bedType || '1 double bed',
        amenities: hotel.amenities || ['WiFi', 'Breakfast'],
        price: parseInt(hotel.price || '100'),
        originalPrice: parseInt(hotel.originalPrice || hotel.price || '120'),
        nights: this.calculateNights(filters.checkIn, filters.checkOut),
        guests: filters.adults + filters.children,
        taxes: hotel.taxes || 50,
        freeCancellation: hotel.freeCancellation !== undefined ? hotel.freeCancellation : true,
        stars: parseInt(hotel.stars || '4')
      })) || [];

      return {
        hotels,
        total: hotels.length,
        location: filters.location || 'Unknown Location'
      };

    } catch (error) {
      console.error('❌ HotelService: API call failed, falling back to dummy data:', error);
      // Fallback to dummy data if API fails
      return this.searchHotelsFromDummyData(filters);
    }
  }

  /**
   * Apply filters to hotel list
   */
  private applyFilters(hotels: Hotel[], filters: SearchFilters): Hotel[] {
    let filteredHotels = [...hotels];

    // Star rating filter
    if (filters.starRating.length > 0) {
      filteredHotels = filteredHotels.filter(hotel => 
        filters.starRating.some(rating => {
          const starCount = parseInt(rating.replace('-star', ''));
          return hotel.stars === starCount;
        })
      );
    }

    // Price range filter
    if (filters.minPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price <= filters.maxPrice!);
    }

    // Guest rating filter
    if (filters.guestRating.length > 0) {
      filteredHotels = filteredHotels.filter(hotel => {
        return filters.guestRating.some(rating => {
          switch (rating) {
            case 'excellent': return hotel.rating >= 4.5;
            case 'very-good': return hotel.rating >= 4.0;
            case 'good': return hotel.rating >= 3.5;
            case 'pleasant': return hotel.rating >= 3.0;
            default: return true;
          }
        });
      });
    }

    return filteredHotels;
  }

  /**
   * Apply sorting to hotel list
   */
  private applySorting(hotels: Hotel[], sortBy: string): Hotel[] {
    const sortedHotels = [...hotels];

    switch (sortBy) {
      case 'price-low':
        return sortedHotels.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedHotels.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedHotels.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return sortedHotels.sort((a, b) => b.reviews - a.reviews);
      default: // 'recommended'
        return sortedHotels.sort((a, b) => b.rating - a.rating);
    }
  }

  /**
   * Calculate number of nights between dates
   */
  private calculateNights(checkIn?: string, checkOut?: string): number {
    if (!checkIn || !checkOut) return 1;
    
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(1, diffDays);
  }

  /**
   * Get price multiplier based on nights and guests
   */
  private getPriceMultiplier(nights: number, guests: number): number {
    let multiplier = 1;
    
    // Slight discount for longer stays
    if (nights >= 7) multiplier *= 0.9;
    else if (nights >= 3) multiplier *= 0.95;
    
    // Small increase for more guests
    if (guests > 2) multiplier *= 1.1;
    
    return multiplier;
  }

  /**
   * Simulate API delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Toggle between real API and dummy data (for testing)
   */
  setUseRealAPI(useReal: boolean): void {
    this.useRealAPI = useReal;
    console.log(`🔧 HotelService: Switched to ${useReal ? 'real API' : 'dummy data'} mode`);
  }

  /**
   * Get current data source
   */
  isUsingRealAPI(): boolean {
    return this.useRealAPI;
  }
}

// Export singleton instance
export const hotelService = new HotelService();
export default hotelService;