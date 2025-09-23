import { Hotel } from '@/types/hotel';

const createHotel = (
  id: number,
  name: string,
  location: string,
  distance: string,
  rating: number,
  reviews: number,
  roomType: string,
  bedType: string,
  amenities: string[],
  price: number,
  originalPrice: number,
  stars: number,
  nights: number = 1,
  guests: number = 2,
  taxes: number = 50
): Hotel => ({
  id,
  name,
  location,
  distance,
  image: '/lovable-uploads/e6764045-1a5d-4f3d-80b8-d6ba711e528d.png',
  rating,
  reviews,
  roomType,
  bedType,
  amenities,
  price,
  originalPrice,
  nights,
  guests,
  taxes,
  freeCancellation: true,
  stars
});

export const hotelDataByCity: Record<string, Hotel[]> = {
  // Berlin Hotels
  berlin: [
    createHotel(
      1,
      "Hotel Adlon Kempinski Berlin",
      "Berlin, Germany",
      "0.5 km to Brandenburg Gate",
      4.9,
      3421,
      "Deluxe Room",
      "1 king bed",
      ["Free WiFi", "Spa", "Restaurant", "Bar", "Concierge"],
      450,
      520,
      5
    ),
    createHotel(
      2,
      "The Ritz-Carlton, Berlin",
      "Berlin, Germany", 
      "1.2 km to city center",
      4.8,
      2847,
      "Executive Room",
      "1 queen bed",
      ["Free WiFi", "Fitness Center", "Pool", "Breakfast", "Business Center"],
      385,
      450,
      5
    ),
    createHotel(
      3,
      "Hotel am Konzerthaus Vienna",
      "Berlin, Germany",
      "0.8 km to Potsdamer Platz",
      4.6,
      1856,
      "Superior Room",
      "2 single beds",
      ["Free WiFi", "Restaurant", "Bar", "Room Service"],
      285,
      340,
      4
    )
  ],

  // London Hotels
  london: [
    createHotel(
      11,
      "The Langham, London",
      "London, England",
      "0.8 km to Oxford Street",
      4.9,
      4521,
      "Superior Room",
      "1 king bed",
      ["Free WiFi", "Spa", "Restaurant", "Afternoon Tea", "Butler Service"],
      520,
      650,
      5
    ),
    createHotel(
      12,
      "Covent Garden Hotel",
      "London, England",
      "0.3 km to Covent Garden",
      4.7,
      3156,
      "Deluxe Room",
      "1 queen bed",
      ["Free WiFi", "Restaurant", "Bar", "Gym", "Pet Friendly"],
      420,
      480,
      4
    ),
    createHotel(
      13,
      "The Savoy London",
      "London, England",
      "0.2 km to Thames River",
      4.8,
      5241,
      "River View Room",
      "1 king bed",
      ["Free WiFi", "Spa", "Multiple Restaurants", "Thames View", "Historic"],
      680,
      780,
      5
    )
  ],

  // Istanbul Hotels
  istanbul: [
    createHotel(
      21,
      "Four Seasons Hotel Istanbul at Sultanahmet",
      "Istanbul, Turkey",
      "0.5 km to Hagia Sophia",
      4.8,
      2847,
      "Superior Room",
      "1 king bed",
      ["Free WiFi", "Spa", "Restaurant", "Historic Building", "Bosphorus View"],
      350,
      420,
      5
    ),
    createHotel(
      22,
      "Pera Palace Hotel",
      "Istanbul, Turkey",
      "1.2 km to Galata Tower",
      4.7,
      3421,
      "Historic Room",
      "1 queen bed",  
      ["Free WiFi", "Restaurant", "Bar", "Historic Atmosphere", "Orient Express Heritage"],
      280,
      340,
      4
    ),
    createHotel(
      23,
      "Shangri La Bosphorus Istanbul",
      "Istanbul, Turkey",
      "2.5 km to city center",
      4.9,
      1964,
      "Bosphorus View Room",
      "1 king bed",
      ["Free WiFi", "Spa", "Pool", "Bosphorus View", "Fine Dining"],
      480,
      580,
      5
    )
  ],

  // Paris Hotels
  paris: [
    createHotel(
      31,
      "The Ritz Paris",
      "Paris, France",
      "0.3 km to Louvre Museum",
      4.9,
      5642,
      "Deluxe Room",
      "1 king bed",
      ["Free WiFi", "Spa", "Michelin Restaurant", "Hemingway Bar", "Luxury Shopping"],
      850,
      1020,
      5
    ),
    createHotel(
      32,
      "Hotel Plaza Athénée",
      "Paris, France", 
      "0.8 km to Champs-Élysées",
      4.8,
      3847,
      "Eiffel Tower View",
      "1 queen bed",
      ["Free WiFi", "Spa", "Haute Cuisine", "Eiffel Tower View", "Fashion District"],
      720,
      850,
      5  
    ),
    createHotel(
      33,
      "Le Meurice",
      "Paris, France",
      "0.2 km to Tuileries Garden",
      4.7,
      2756,
      "Classic Room",
      "1 king bed",
      ["Free WiFi", "Restaurant", "Bar", "Palace Hotel", "Art Collection"],
      520,
      620,
      4
    )
  ],

  // New York Hotels
  "new york": [
    createHotel(
      41,
      "The Plaza Hotel",
      "New York, USA",
      "0.1 km to Central Park",
      4.8,
      6789,
      "Park View Suite",
      "1 king bed",
      ["Free WiFi", "Spa", "Multiple Restaurants", "Central Park View", "Iconic"],
      650,
      780,
      5
    ),
    createHotel(
      42,
      "The St. Regis New York",
      "New York, USA",
      "0.5 km to Times Square",
      4.9,
      4521,
      "Astor Suite",
      "1 king bed",
      ["Free WiFi", "Butler Service", "Fine Dining", "Luxury", "Midtown Location"],
      580,
      680,
      5
    )
  ],

  // Default/Generic Hotels
  default: [
    createHotel(
      101,
      "Grand Hotel",
      "City Center",
      "1.2 km to city center",
      4.6,
      2847,
      "Superior Room",
      "1 king bed",
      ["Free WiFi", "Breakfast", "Spa", "Fitness Center"],
      185,
      220,
      4
    ),
    createHotel(
      102,
      "Luxury Resort & Spa",
      "Downtown",
      "2.1 km to city center",
      4.7,
      1896,
      "Executive Room",
      "1 queen bed",
      ["Free WiFi", "Pool", "Restaurant", "Business Center"],
      145,
      175,
      4
    ),
    createHotel(
      103,
      "Boutique Hotel",
      "Historic District",
      "0.8 km to main attractions",
      4.5,
      1245,
      "Deluxe Room",
      "2 single beds",
      ["Free WiFi", "Restaurant", "Bar", "Historic Building"],
      125,
      155,
      3
    )
  ]
};

// Helper function to get hotels by city name
export const getHotelsByLocation = (location: string): Hotel[] => {
  const cityKey = location.toLowerCase();
  
  // Check for exact matches first
  if (hotelDataByCity[cityKey]) {
    return hotelDataByCity[cityKey];
  }
  
  // Check for partial matches
  const matchingCity = Object.keys(hotelDataByCity).find(city => 
    cityKey.includes(city) || city.includes(cityKey)
  );
  
  if (matchingCity) {
    return hotelDataByCity[matchingCity];
  }
  
  // Return default hotels if no match found
  return hotelDataByCity.default;
};