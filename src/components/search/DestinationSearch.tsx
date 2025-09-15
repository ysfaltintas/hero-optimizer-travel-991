
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DestinationSearch = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('adults', adults.toString());
    params.set('children', children.toString());
    params.set('rooms', rooms.toString());
    
    navigate(`/search?${params.toString()}`);
  };
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg w-full max-w-3xl mx-auto animate-fade-up [animation-delay:400ms]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Location */}
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-600" size={20} />
            <input 
              type="text" 
              placeholder="Nereye gidiyorsunuz?" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/10 focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none transition-all text-white placeholder:text-white/70" 
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-600" size={20} />
          <input 
            type="date" 
            placeholder="Giriş" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/10 focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none transition-all text-white placeholder:text-white/70" 
          />
        </div>

        {/* Check-out */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-600" size={20} />
          <input 
            type="date" 
            placeholder="Çıkış" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/10 focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none transition-all text-white placeholder:text-white/70" 
          />
        </div>

        {/* Guests */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-600" size={20} />
          <button 
            type="button"
            onClick={() => setShowGuests(!showGuests)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/10 focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none transition-all text-white placeholder:text-white/70 text-left"
          >
            {adults} yetişkin{children > 0 ? `, ${children} çocuk` : ''}, {rooms} oda
          </button>
          
          {showGuests && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg p-4 z-10">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Yetişkin</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >-</button>
                    <span className="text-gray-900 w-6 text-center">{adults}</span>
                    <button 
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Çocuk</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >-</button>
                    <span className="text-gray-900 w-6 text-center">{children}</span>
                    <button 
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Oda</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >-</button>
                    <span className="text-gray-900 w-6 text-center">{rooms}</span>
                    <button 
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button - Split into separate row on mobile */}
        <div className="col-span-full md:col-span-1">
          <Button 
            className="w-full text-white py-3 h-[46px] bg-rose-600 hover:bg-rose-500"
            onClick={handleSearch}
          >
            <Search className="mr-2" size={20} />
            Ara
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationSearch;
