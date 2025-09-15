import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Users, Search, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const HeroSection = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 2, children: 1, rooms: 1 });
  const [showGuestPopover, setShowGuestPopover] = useState(false);

  const updateGuests = (type: 'adults' | 'children' | 'rooms', operation: 'add' | 'subtract') => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'add' 
        ? prev[type] + 1 
        : Math.max(type === 'rooms' ? 1 : 0, prev[type] - 1)
    }));
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
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Find Next Place To Visit
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing places at exclusive deals
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl mx-auto border border-white/20">
            {/* Hotel Tab - Active */}
            <div className="flex justify-center mb-10">
              <div className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg">
                Hotel
              </div>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Check in - Check out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-medium py-4 h-auto border-gray-200 hover:bg-gray-50 bg-white text-gray-900 overflow-hidden",
                        !dateRange && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 flex-shrink-0 text-gray-500" size={18} />
                      <span className="text-xs truncate">
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
                  <PopoverContent className="w-auto p-0 bg-white shadow-xl border z-50" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Guest
                </label>
                <Popover open={showGuestPopover} onOpenChange={setShowGuestPopover}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-medium py-4 h-auto border-gray-200 hover:bg-gray-50 bg-white text-gray-900 overflow-hidden"
                    >
                      <Users className="mr-2 flex-shrink-0 text-gray-500" size={18} />
                      <span className="text-xs truncate">
                        {guests.adults} adults - {guests.children} children - {guests.rooms} room
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-6 bg-white shadow-xl border z-50" align="start">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">Adults</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('adults', 'subtract')}
                            disabled={guests.adults <= 1}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{guests.adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('adults', 'add')}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">Children</div>
                          <div className="text-sm text-gray-500">Ages 0 - 17</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('children', 'subtract')}
                            disabled={guests.children <= 0}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{guests.children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('children', 'add')}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">Rooms</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('rooms', 'subtract')}
                            disabled={guests.rooms <= 1}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{guests.rooms}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuests('rooms', 'add')}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-end md:col-span-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Search className="mr-2" size={20} />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;