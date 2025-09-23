import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Heart, ArrowLeft, Wifi, Car, Utensils, Dumbbell, Waves, Coffee, Users, Calendar, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TopBar from "@/components/layout/TopBar";
import { Hotel } from "@/types/hotel";
import { hotelService } from "@/services/hotelService";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  // Get search parameters from URL
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const rooms = parseInt(searchParams.get('rooms') || '1');
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');

  // Fetch hotel details
  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!hotelId) return;
      
      setLoading(true);
      try {
        // Search hotels and find the specific one
        const response = await hotelService.searchHotels({
          location,
          checkIn,
          checkOut,
          adults,
          children,
          rooms,
          starRating: [],
          propertyTypes: [],
          guestRating: [],
          distance: [],
          meals: [],
          deals: [],
          amenities: [],
          sortBy: 'recommended'
        });

        const foundHotel = response.hotels.find(h => h.id.toString() === hotelId);
        setHotel(foundHotel || null);
      } catch (error) {
        console.error('❌ Failed to fetch hotel details:', error);
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId, location, checkIn, checkOut, adults, children, rooms]);

  const amenityIcons = {
    'Free WiFi': Wifi,
    'WiFi': Wifi,
    'WiFi Dahil': Wifi,
    'Breakfast': Coffee,
    'Kahvaltı Dahil': Coffee,
    'Spa': Waves,
    'Pool': Waves,
    'Havuz': Waves,
    'Restaurant': Utensils,
    'Fitness Center': Dumbbell,
    'Fitness Merkezi': Dumbbell,
    'Parking': Car,
    'Ücretsiz Park': Car,
    'Bar': Utensils,
    'Business Center': Users,
    'İş Merkezi': Users,
    'Room Service': Utensils,
    'Oda Servisi': Utensils
  };

  const getAmenityIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Users;
    return IconComponent;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <TopBar />
        <div className="flex justify-center items-center py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Otel detayları yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <TopBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Otel Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız otel bulunamadı veya mevcut değil.</p>
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="mr-2" size={16} />
              Geri Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <TopBar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2" size={16} />
              Arama Sonuçlarına Dön
            </Button>
            <h1 
              className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => navigate('/')}
            >
              Ozvia Travel
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
                <div className="flex items-center">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                <span>{hotel.location}</span>
              </div>
              <p className="text-gray-500">{hotel.distance}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-2">
                <span className="text-sm font-medium mr-2">Mükemmel</span>
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold">
                  {hotel.rating}
                </div>
              </div>
              <p className="text-sm text-gray-600">{hotel.reviews.toLocaleString()} değerlendirme</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Image */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  >
                    <Heart size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Room Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Oda Bilgileri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Bed className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">{hotel.roomType}</p>
                      <p className="text-sm text-gray-600">{hotel.bedType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">{hotel.guests} Misafir</p>
                      <p className="text-sm text-gray-600">{hotel.nights} gece konaklama</p>
                    </div>
                  </div>
                </div>
                
                {hotel.freeCancellation && (
                  <div className="mt-4 pt-4 border-t">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Ücretsiz iptal
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Otel Olanakları</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div key={amenity} className="flex items-center gap-3">
                        <IconComponent className="text-gray-500" size={20} />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Search Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Arama Detayları</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Giriş</p>
                      <p className="text-sm text-gray-600">{checkIn || 'Belirtilmedi'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Çıkış</p>
                      <p className="text-sm text-gray-600">{checkOut || 'Belirtilmedi'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Misafirler</p>
                      <p className="text-sm text-gray-600">{adults} yetişkin, {children} çocuk</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">US${hotel.price}</span>
                    {hotel.originalPrice > hotel.price && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        US${hotel.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {hotel.nights} gece, {hotel.guests} yetişkin için
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    +US${hotel.taxes} vergi ve ücretler
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6">
                    Rezervasyon Yap
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Rezervasyon yapmak için otel web sitesine yönlendirileceksiniz
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Rezervasyon Özeti</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Oda Fiyatı</span>
                      <span>US${hotel.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vergi ve Ücretler</span>
                      <span>US${hotel.taxes}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Toplam</span>
                      <span>US${hotel.price + hotel.taxes}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;