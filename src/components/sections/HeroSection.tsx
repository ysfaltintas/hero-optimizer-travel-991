import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Stays");
  const tabs = ["Stays", "Experiences", "Cars", "Flights"];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hotel, car & experiences
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Accompanying us, you have a trip full of experiences. With Ozvia Travel, booking accommodation, resort villas, hotels
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg">
                Start your search
              </Button>
            </div>
          </div>

          {/* Large Centered Search Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
              {/* Tabs */}
              <div className="flex justify-center space-x-8 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-lg font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                    <input 
                      type="text" 
                      placeholder="Where are you going?" 
                      className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Check in - Check out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                    <input 
                      type="text" 
                      placeholder="Feb 06 - Feb 23" 
                      className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                    <input 
                      type="text" 
                      placeholder="4 Guests" 
                      className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button className="bg-primary hover:bg-primary/90 text-white px-12 py-4 rounded-xl text-lg">
                  <Search className="mr-3" size={22} />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
                }}></div>
              </div>
              <div className="h-64 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
                }}></div>
              </div>
              <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
                }}></div>
              </div>
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;