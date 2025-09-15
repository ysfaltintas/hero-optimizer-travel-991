import { useState } from "react";
import { MapPin, Star, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TopBar from "@/components/layout/TopBar";

const SearchResults = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Mock data - bu gerçek API'dan gelecek
  const hotels = [
    {
      id: 1,
      name: "The Montcalm At Brewery London City",
      location: "Westminster Borough, London",
      distance: "2 km to city center",
      image: "/lovable-uploads/e6764045-1a5d-4f3d-80b8-d6ba711e528d.png",
      rating: 4.7,
      reviews: 3014,
      roomType: "King Room",
      bedType: "1 extra-large double bed",
      amenities: ["Breakfast", "WiFi", "Spa", "Bar"],
      price: 72,
      originalPrice: 90,
      nights: 8,
      guests: 2,
      taxes: 828,
      freeCancellation: true,
      stars: 5
    },
    {
      id: 2,
      name: "Staycity Aparthotels Deptford Bridge",
      location: "Ciutat Vella, Barcelona",
      distance: "1.5 km to city center",
      image: "/lovable-uploads/e6764045-1a5d-4f3d-80b8-d6ba711e528d.png",
      rating: 4.8,
      reviews: 2156,
      roomType: "Superior Room",
      bedType: "1 extra-large double bed",
      amenities: ["Breakfast", "WiFi", "Spa"],
      price: 85,
      originalPrice: 110,
      nights: 8,
      guests: 2,
      taxes: 728,
      freeCancellation: true,
      stars: 4
    }
  ];

  const deals = [
    { id: "free-cancellation", label: "Free cancellation", count: 92 },
    { id: "reserve-now", label: "Reserve now, pay at stay", count: 45 },
    { id: "special-offers", label: "Properties with special offers", count: 21 }
  ];

  const popularFilters = [
    { id: "breakfast", label: "Breakfast Included", count: 92 },
    { id: "romantic", label: "Romantic", count: 45 },
    { id: "airport-transfer", label: "Airport Transfer", count: 21 },
    { id: "wifi", label: "WiFi Included", count: 78 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <TopBar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Find Your Dream Luxury Hotel</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 shrink-0">
            <div className="space-y-6">
              {/* Location */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Location</h3>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Where are you going?"
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-40 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 text-blue-600" size={32} />
                      <p className="text-sm text-blue-700">Interactive Map</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MapPin className="mr-2" size={16} />
                    Show on map
                  </Button>
                </CardContent>
              </Card>

              {/* Search by property name */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Search by property name</h3>
                  <Input placeholder="e.g. Best Western" />
                </CardContent>
              </Card>

              {/* Deals */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Deals</h3>
                  <div className="space-y-3">
                    {deals.map((deal) => (
                      <div key={deal.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={deal.id}
                          checked={selectedFilters.includes(deal.id)}
                          onCheckedChange={() => toggleFilter(deal.id)}
                        />
                        <label htmlFor={deal.id} className="text-sm flex-1">
                          {deal.label}
                        </label>
                        <span className="text-xs text-gray-500">{deal.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Filters */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Popular Filters</h3>
                  <div className="space-y-3">
                    {popularFilters.map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={filter.id}
                          checked={selectedFilters.includes(filter.id)}
                          onCheckedChange={() => toggleFilter(filter.id)}
                        />
                        <label htmlFor={filter.id} className="text-sm flex-1">
                          {filter.label}
                        </label>
                        <span className="text-xs text-gray-500">{filter.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">3,269 properties in Europe</h2>
                <p className="text-gray-600 mt-1">Top picks for your search</p>
              </div>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Top picks for your search</SelectItem>
                  <SelectItem value="price-low">Price (lowest first)</SelectItem>
                  <SelectItem value="price-high">Price (highest first)</SelectItem>
                  <SelectItem value="rating">Guest rating</SelectItem>
                  <SelectItem value="distance">Distance from center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hotel Cards */}
            <div className="space-y-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Hotel Image */}
                      <div className="w-80 relative">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-64 object-cover"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                        >
                          <Heart size={16} />
                        </Button>
                      </div>

                      {/* Hotel Details */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                              <div className="flex">
                                {[...Array(hotel.stars)].map((_, i) => (
                                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin size={14} className="mr-1" />
                              <span className="text-sm">{hotel.location}</span>
                              <span className="mx-2">•</span>
                              <span className="text-sm">{hotel.distance}</span>
                            </div>

                            <div className="mb-3">
                              <p className="font-medium text-gray-900">{hotel.roomType}</p>
                              <p className="text-sm text-gray-600">{hotel.bedType}</p>
                            </div>

                            {hotel.freeCancellation && (
                              <div className="mb-3">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Free cancellation
                                </Badge>
                                <p className="text-sm text-gray-600 mt-1">
                                  You can cancel later, so lock in this great price today.
                                </p>
                              </div>
                            )}

                            <div className="flex gap-2 mb-4">
                              {hotel.amenities.map((amenity) => (
                                <Badge key={amenity} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Rating and Price */}
                          <div className="text-right ml-6">
                            <div className="mb-4">
                              <div className="flex items-center justify-end mb-1">
                                <span className="text-sm font-medium mr-2">Exceptional</span>
                                <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
                                  {hotel.rating}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{hotel.reviews.toLocaleString()} reviews</p>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-gray-600 mb-1">
                                {hotel.nights} nights, {hotel.guests} adult
                              </p>
                              <div className="mb-2">
                                <span className="text-2xl font-bold text-gray-900">US${hotel.price}</span>
                                {hotel.originalPrice > hotel.price && (
                                  <span className="text-sm text-gray-500 line-through ml-2">
                                    US${hotel.originalPrice}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mb-3">
                                +US${hotel.taxes} taxes and charges
                              </p>
                              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                                See Availability
                                <ArrowRight size={16} className="ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;