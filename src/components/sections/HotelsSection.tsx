import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Navigation } from "lucide-react";

const HotelsSection = () => {
  const recommendedHotels = [
    {
      id: 1,
      name: "Grand Hotel Istanbul",
      location: "Sultanahmet, Istanbul",
      rating: 4.8,
      price: "₺2,450",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badges: ["Luxury", "Free WiFi"]
    },
    {
      id: 2,
      name: "Cappadocia Cave Hotel",
      location: "Göreme, Cappadocia",
      rating: 4.9,
      price: "₺1,850",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badges: ["Cave Hotel", "Balloon View"]
    },
    {
      id: 3,
      name: "Antalya Beach Resort",
      location: "Konyaaltı, Antalya",
      rating: 4.7,
      price: "₺1,250",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badges: ["Beach", "All Inclusive"]
    },
    {
      id: 4,
      name: "Bodrum Marina Hotel",
      location: "Bodrum Center, Bodrum",
      rating: 4.6,
      price: "₺1,950",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badges: ["Marina View", "Spa"]
    }
  ];

  const recentSearches = [
    {
      id: 1,
      destination: "Istanbul",
      checkIn: "Dec 15",
      checkOut: "Dec 18",
      guests: "2 adults",
      date: "2 gün önce"
    },
    {
      id: 2,
      destination: "Cappadocia",
      checkIn: "Jan 10",
      checkOut: "Jan 13",
      guests: "2 adults, 1 child",
      date: "5 gün önce"
    },
    {
      id: 3,
      destination: "Antalya",
      checkIn: "Feb 20",
      checkOut: "Feb 25",
      guests: "4 adults",
      date: "1 hafta önce"
    }
  ];

  const nearbyHotels = [
    {
      id: 1,
      name: "City Center Hotel",
      location: "2.1 km from you",
      rating: 4.5,
      price: "₺850",
      image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      distance: "2.1 km"
    },
    {
      id: 2,
      name: "Business District Hotel",
      location: "3.5 km from you",
      rating: 4.3,
      price: "₺1,100",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      distance: "3.5 km"
    },
    {
      id: 3,
      name: "Airport Hotel",
      location: "5.8 km from you",
      rating: 4.4,
      price: "₺750",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      distance: "5.8 km"
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Önerilen Oteller */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Önerilen Oteller</h2>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Tümünü Gör
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedHotels.map((hotel) => (
              <Card key={hotel.id} className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white border-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {hotel.badges.map((badge) => (
                      <Badge key={badge} className="bg-white/90 text-gray-800 hover:bg-white">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {hotel.name}
                      </CardTitle>
                      <div className="flex items-center mt-1 text-gray-600">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{hotel.price}</div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Son Aramalarınız */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Son Aramalarınız</h2>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Tümünü Temizle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentSearches.map((search) => (
              <Card key={search.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{search.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{search.destination}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{search.checkIn} - {search.checkOut}</p>
                        <p>{search.guests}</p>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Tekrar Ara
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Yakındaki Oteller */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Yakındaki Oteller</h2>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Haritada Gör
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyHotels.map((hotel) => (
              <Card key={hotel.id} className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white border-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Navigation className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">{hotel.price}</div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Detayları Gör
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default HotelsSection;