import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Users, Search, Plus, Minus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

interface Hotel {
  id: string;
  name: string;
}

interface SearchResults {
  hotels: Hotel[];
}

const HeroSection = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 2, children: 1, rooms: 1 });
  const [showGuestPopover, setShowGuestPopover] = useState(false);
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGuests = (type: 'adults' | 'children' | 'rooms', operation: 'add' | 'subtract') => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'add' 
        ? prev[type] + 1 
        : Math.max(type === 'rooms' ? 1 : 0, prev[type] - 1)
    }));
  };

  const handleSearch = async () => {
    if (!location || !dateRange?.from || !dateRange?.to) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Navigate to search page with parameters instead of making API call here
      const params = new URLSearchParams({
        location,
        checkIn: format(dateRange.from, 'yyyy-MM-dd'),
        checkOut: format(dateRange.to, 'yyyy-MM-dd'),
        adults: guests.adults.toString(),
        children: guests.children.toString(),
        rooms: guests.rooms.toString()
      });

      // Redirect to search results page
      window.location.href = `/search?${params.toString()}`;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          {/* Hero Content */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight px-2">
              Find Next Place To Visit
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto px-4">
              Discover amazing places at exclusive deals
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto border border-white/20">
            {/* Search Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3">
                  Check in - Check out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-medium py-3 sm:py-4 h-auto border-gray-200 hover:bg-gray-50 bg-white text-gray-900 overflow-hidden",
                        !dateRange && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 flex-shrink-0 text-gray-500" size={16} />
                      <span className="text-xs sm:text-sm truncate">
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd MMM")} - {format(dateRange.to, "dd MMM")}
                            </>
                          ) : (
                            format(dateRange.from, "dd MMM")
                          )
                        ) : (
                          "05 Sep – 14 Oct"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white shadow-xl border z-50" align="center" side="bottom">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={window.innerWidth < 768 ? 1 : 2}
                      className={cn("p-2 sm:p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3">
                  Guest
                </label>
                <Popover open={showGuestPopover} onOpenChange={setShowGuestPopover}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-medium py-3 sm:py-4 h-auto border-gray-200 hover:bg-gray-50 bg-white text-gray-900 overflow-hidden"
                    >
                      <Users className="mr-2 flex-shrink-0 text-gray-500" size={16} />
                      <span className="text-xs sm:text-sm truncate">
                        {guests.adults} adults - {guests.children} children - {guests.rooms} room
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 sm:w-80 p-4 sm:p-6 bg-white shadow-xl border z-50" align="center" side="bottom">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Adults</div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('adults', 'subtract')}
                            disabled={guests.adults <= 1}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{guests.adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('adults', 'add')}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Children</div>
                          <div className="text-xs sm:text-sm text-gray-500">Ages 0 - 17</div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('children', 'subtract')}
                            disabled={guests.children <= 0}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{guests.children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('children', 'add')}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Rooms</div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('rooms', 'subtract')}
                            disabled={guests.rooms <= 1}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{guests.rooms}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('rooms', 'add')}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-end lg:col-span-1">
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 min-h-[48px] touch-manipulation"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 animate-spin" size={18} />
                  ) : (
                    <Search className="mr-2" size={18} />
                  )}
                  {isLoading ? 'Aranıyor...' : 'Search'}
                </Button>
            </div>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="mt-4 sm:mt-6 mx-4 p-3 sm:p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm sm:text-base">
              {error}
            </div>
          )}
          
          {/* Search Results */}
          {searchResults && (
            <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Arama Sonuçları</h3>
              {searchResults.hotels && searchResults.hotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.hotels.map((hotel) => (
                    <div key={hotel.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 text-lg">{hotel.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">ID: {hotel.id}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Sonuç bulunamadı.</p>
              )}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;