import { useState, useEffect } from "react";
import { MapPin, Star, Heart, ArrowRight, Loader2, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import { Hotel, SearchFilters } from "@/types/hotel";
import { hotelService } from "@/services/hotelService";
import { cn } from "@/lib/utils";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    adults: parseInt(searchParams.get('adults') || '2'),
    children: parseInt(searchParams.get('children') || '0'),
    rooms: parseInt(searchParams.get('rooms') || '1'),
    starRating: [],
    propertyTypes: [],
    guestRating: [],
    distance: [],
    meals: [],
    deals: [],
    amenities: [],
    sortBy: 'recommended'
  });

  // Search hotels using the service
  const searchHotels = async (searchFilters: SearchFilters) => {
    setLoading(true);
    console.log('🔍 Starting hotel search for:', searchFilters.location);
    
    try {
      const response = await hotelService.searchHotels(searchFilters);
      
      setHotels(response.hotels);
      setTotalResults(response.total);
      
      console.log('✅ Search completed:', {
        location: response.location,
        hotelsFound: response.hotels.length,
        usingRealAPI: hotelService.isUsingRealAPI()
      });
      
    } catch (error) {
      console.error('❌ Search failed:', error);
      setHotels([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial search and when filters change
  useEffect(() => {
    searchHotels(filters);
  }, [filters]);

  // Filter toggle functions
  const toggleArrayFilter = (filterType: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterType] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [filterType]: newArray
      };
    });
  };

  const updateFilter = (filterType: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const updateGuestCount = (type: 'adults' | 'children' | 'rooms', increment: boolean) => {
    setFilters(prev => {
      const currentValue = prev[type];
      const newValue = increment ? currentValue + 1 : Math.max(type === 'adults' ? 1 : 0, currentValue - 1);
      return {
        ...prev,
        [type]: newValue
      };
    });
  };

  const deals = [
    { id: "free-cancellation", label: "Ücretsiz iptal", count: 92 },
    { id: "reserve-now", label: "Şimdi ayırt, konaklamada öde", count: 45 },
    { id: "special-offers", label: "Özel teklifli tesisler", count: 21 }
  ];

  const popularFilters = [
    { id: "breakfast", label: "Kahvaltı Dahil", count: 92 },
    { id: "romantic", label: "Romantik", count: 45 },
    { id: "airport-transfer", label: "Havaalanı Transferi", count: 21 },
    { id: "wifi", label: "WiFi Dahil", count: 78 },
    { id: "spa", label: "Spa", count: 64 },
    { id: "pool", label: "Havuz", count: 112 },
    { id: "fitness", label: "Fitness Merkezi", count: 89 },
    { id: "parking", label: "Ücretsiz Park", count: 156 },
    { id: "pet-friendly", label: "Evcil Hayvan Dostu", count: 33 },
    { id: "business", label: "İş Merkezi", count: 67 },
    { id: "family", label: "Aile Dostu", count: 134 },
    { id: "accessible", label: "Engelli Erişimi", count: 78 }
  ];

  const starRating = [
    { id: "5-star", label: "5 Yıldız", count: 23 },
    { id: "4-star", label: "4 Yıldız", count: 89 },
    { id: "3-star", label: "3 Yıldız", count: 156 },
    { id: "2-star", label: "2 Yıldız", count: 67 },
    { id: "1-star", label: "1 Yıldız", count: 12 }
  ];

  const propertyTypes = [
    { id: "hotel", label: "Otel", count: 234 },
    { id: "apartment", label: "Apart Daire", count: 156 },
    { id: "resort", label: "Tatil Köyü", count: 67 },
    { id: "villa", label: "Villa", count: 45 },
    { id: "hostel", label: "Hostel", count: 89 },
    { id: "guesthouse", label: "Pansiyon", count: 78 },
    { id: "boutique", label: "Butik Otel", count: 34 }
  ];

  const guestRating = [
    { id: "excellent", label: "Mükemmel (9+)", count: 45 },
    { id: "very-good", label: "Çok İyi (8+)", count: 123 },
    { id: "good", label: "İyi (7+)", count: 178 },
    { id: "pleasant", label: "Hoş (6+)", count: 89 },
    { id: "any", label: "Tümü", count: 435 }
  ];

  const distanceFilters = [
    { id: "center-1km", label: "Şehir merkezine 1 km", count: 45 },
    { id: "center-3km", label: "Şehir merkezine 3 km", count: 123 },
    { id: "center-5km", label: "Şehir merkezine 5 km", count: 178 },
    { id: "beach-500m", label: "Plaja 500 m", count: 67 },
    { id: "airport-10km", label: "Havaalanına 10 km", count: 89 }
  ];

  const mealOptions = [
    { id: "breakfast-included", label: "Kahvaltı Dahil", count: 156 },
    { id: "half-board", label: "Yarım Pansiyon", count: 89 },
    { id: "full-board", label: "Tam Pansiyon", count: 67 },
    { id: "all-inclusive", label: "Her Şey Dahil", count: 45 },
    { id: "no-meals", label: "Yemek Yok", count: 234 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <TopBar />
      
      {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 
                className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => window.location.href = '/'}
              >
                Ozvia Travel
              </h1>
              
              {/* Mobile Filter Toggle */}
              <Button 
                variant="outline" 
                className="lg:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtreler
              </Button>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Filters - Desktop */}
          <div className={cn(
            "w-full lg:w-80 lg:shrink-0",
            "lg:block",
            showMobileFilters ? "block" : "hidden lg:block"
          )}>
            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              />
            )}
            
            {/* Mobile Filters Panel */}
            <div className={cn(
              "lg:static lg:bg-transparent lg:shadow-none lg:max-h-none lg:overflow-visible",
              "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 overflow-y-auto",
              showMobileFilters ? "translate-x-0" : "translate-x-full lg:translate-x-0",
              "transition-transform duration-300 ease-in-out"
            )}>
              {/* Mobile Close Button */}
              <div className="lg:hidden flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filtreler</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 lg:p-0 space-y-4 sm:space-y-6">
              {/* Location */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Konum</h3>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Nereye gidiyorsunuz?"
                      className="pl-10"
                      value={filters.location}
                      onChange={(e) => updateFilter('location', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Check-in Check-out */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Giriş - Çıkış</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        type="date" 
                        placeholder="Giriş" 
                        value={filters.checkIn}
                        onChange={(e) => updateFilter('checkIn', e.target.value)}
                      />
                      <Input 
                        type="date" 
                        placeholder="Çıkış"
                        value={filters.checkOut}
                        onChange={(e) => updateFilter('checkOut', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guests */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Misafir</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Yetişkin</span>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateGuestCount('adults', false)}
                        >-</Button>
                        <span>{filters.adults}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateGuestCount('adults', true)}
                        >+</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Çocuk (0-17 yaş)</span>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateGuestCount('children', false)}
                        >-</Button>
                        <span>{filters.children}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateGuestCount('children', true)}
                        >+</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Oda</span>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateGuestCount('rooms', false)}
                        >-</Button>
                        <span>{filters.rooms}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateGuestCount('rooms', true)}
                        >+</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-40 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 text-blue-600" size={32} />
                      <p className="text-sm text-blue-700">İnteraktif Harita</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MapPin className="mr-2" size={16} />
                    Haritada göster
                  </Button>
                </CardContent>
              </Card>

              {/* Search by property name */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Tesis adına göre ara</h3>
                  <Input placeholder="örn. Hilton, Marriott" />
                </CardContent>
              </Card>

              {/* Price Range */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Fiyat Aralığı</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Min fiyat" type="number" />
                      <Input placeholder="Max fiyat" type="number" />
                    </div>
                    <div className="text-xs text-gray-500">Gecelik fiyat (vergi hariç)</div>
                  </div>
                </CardContent>
              </Card>

              {/* Star Rating */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Yıldız</h3>
                  <div className="space-y-3">
                    {starRating.map((rating) => (
                      <div key={rating.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={rating.id}
                          checked={filters.starRating.includes(rating.id)}
                          onCheckedChange={() => toggleArrayFilter('starRating', rating.id)}
                        />
                        <label htmlFor={rating.id} className="text-sm flex-1">
                          {rating.label}
                        </label>
                        <span className="text-xs text-gray-500">{rating.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Property Type */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Tesis Türü</h3>
                  <div className="space-y-3">
                    {propertyTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={type.id}
                          checked={filters.propertyTypes.includes(type.id)}
                          onCheckedChange={() => toggleArrayFilter('propertyTypes', type.id)}
                        />
                        <label htmlFor={type.id} className="text-sm flex-1">
                          {type.label}
                        </label>
                        <span className="text-xs text-gray-500">{type.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Guest Rating */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Misafir Puanı</h3>
                  <div className="space-y-3">
                    {guestRating.map((rating) => (
                      <div key={rating.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={rating.id}
                          checked={filters.guestRating.includes(rating.id)}
                          onCheckedChange={() => toggleArrayFilter('guestRating', rating.id)}
                        />
                        <label htmlFor={rating.id} className="text-sm flex-1">
                          {rating.label}
                        </label>
                        <span className="text-xs text-gray-500">{rating.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Distance */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Mesafe</h3>
                  <div className="space-y-3">
                    {distanceFilters.map((distance) => (
                      <div key={distance.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={distance.id}
                          checked={filters.distance.includes(distance.id)}
                          onCheckedChange={() => toggleArrayFilter('distance', distance.id)}
                        />
                        <label htmlFor={distance.id} className="text-sm flex-1">
                          {distance.label}
                        </label>
                        <span className="text-xs text-gray-500">{distance.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Meal Options */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Yemek Seçenekleri</h3>
                  <div className="space-y-3">
                    {mealOptions.map((meal) => (
                      <div key={meal.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={meal.id}
                          checked={filters.meals.includes(meal.id)}
                          onCheckedChange={() => toggleArrayFilter('meals', meal.id)}
                        />
                        <label htmlFor={meal.id} className="text-sm flex-1">
                          {meal.label}
                        </label>
                        <span className="text-xs text-gray-500">{meal.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Deals */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Fırsatlar</h3>
                  <div className="space-y-3">
                    {deals.map((deal) => (
                      <div key={deal.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={deal.id}
                          checked={filters.deals.includes(deal.id)}
                          onCheckedChange={() => toggleArrayFilter('deals', deal.id)}
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
                  <h3 className="font-semibold mb-4">Popüler Filtreler</h3>
                  <div className="space-y-3">
                    {popularFilters.map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={filter.id}
                          checked={filters.amenities.includes(filter.id)}
                          onCheckedChange={() => toggleArrayFilter('amenities', filter.id)}
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Aranıyor...
                    </div>
                  ) : (
                    `Avrupa'da ${totalResults.toLocaleString()} tesis`
                  )}
                </h2>
                <p className="text-gray-600 mt-1">Aramanız için en iyi seçenekler</p>
              </div>
              <Select 
                value={filters.sortBy}
                onValueChange={(value) => updateFilter('sortBy', value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Aramanız için en iyiler</SelectItem>
                  <SelectItem value="price-low">Fiyat (düşükten yükseğe)</SelectItem>
                  <SelectItem value="price-high">Fiyat (yüksekten düşüğe)</SelectItem>
                  <SelectItem value="rating">Misafir puanı</SelectItem>
                  <SelectItem value="distance">Merkeze uzaklık</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hotel Cards */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <Loader2 className="animate-spin mx-auto mb-4" size={32} />
                  <p className="text-gray-600">Oteller yükleniyor...</p>
                </div>
              </div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Arama kriterlerinize uygun otel bulunamadı.</p>
                <p className="text-gray-500 mt-2">Filtrelerinizi değiştirmeyi deneyin.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hotels.map((hotel) => (
                <Card 
                  key={hotel.id} 
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.set('location', filters.location);
                    params.set('checkIn', filters.checkIn);
                    params.set('checkOut', filters.checkOut);
                    params.set('adults', filters.adults.toString());
                    params.set('children', filters.children.toString());
                    params.set('rooms', filters.rooms.toString());
                    navigate(`/hotels/${hotel.id}?${params.toString()}`);
                  }}
                >
                  <CardContent className="p-0">
                    <div className="flex h-48">
                      {/* Hotel Image */}
                      <div className="w-64 relative">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-48 object-cover rounded-l-lg"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white w-8 h-8 p-0"
                        >
                          <Heart size={14} />
                        </Button>
                      </div>

                      {/* Hotel Details */}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between h-full">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{hotel.name}</h3>
                                <div className="flex items-center mt-1">
                                  {[...Array(hotel.stars)].map((_, i) => (
                                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin size={12} className="mr-1 flex-shrink-0" />
                              <span className="text-sm truncate">{hotel.location}</span>
                            </div>

                            <div className="text-xs text-gray-500 mb-2">
                              {hotel.distance}
                            </div>

                            <div className="mb-2">
                              <p className="text-sm font-medium text-gray-900">{hotel.roomType}</p>
                              <p className="text-xs text-gray-600">{hotel.bedType}</p>
                            </div>

                            {hotel.freeCancellation && (
                              <div className="mb-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-2 py-0.5">
                                  Ücretsiz iptal
                                </Badge>
                              </div>
                            )}

                            <div className="flex gap-1 flex-wrap">
                              {hotel.amenities.slice(0, 4).map((amenity) => (
                                <Badge key={amenity} variant="outline" className="text-xs px-1.5 py-0.5">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Rating and Price */}
                          <div className="text-right ml-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-end mb-1">
                                <span className="text-xs font-medium mr-2">Mükemmel</span>
                                <div className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                                  {hotel.rating}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{hotel.reviews.toLocaleString()} değerlendirme</p>
                            </div>

                            <div className="text-right mt-4">
                              <p className="text-xs text-gray-600 mb-1">
                                {hotel.nights} gece, {hotel.guests} yetişkin
                              </p>
                              <div className="mb-1">
                                <span className="text-xl font-bold text-gray-900">US${hotel.price}</span>
                                {hotel.originalPrice > hotel.price && (
                                  <span className="text-xs text-gray-500 line-through ml-1">
                                    US${hotel.originalPrice}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                +US${hotel.taxes} vergi ve ücretler
                              </p>
                              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5">
                                Müsaitlik Durumu
                                <ArrowRight size={12} className="ml-1" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;