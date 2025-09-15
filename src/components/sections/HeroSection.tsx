import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Stays");
  const tabs = ["Stays", "Experiences", "Cars", "Flights"];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hotel, car & experiences
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Accompanying us, you have a trip full of experiences. With Travelers, booking accommodation, resort villas, hotels
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg">
                Start your search
              </Button>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              {/* Tabs */}
              <div className="flex space-x-6 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Where are you going?" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check in - Check out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Feb 06 - Feb 23" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="4 Guests" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg">
                  <Search className="mr-2" size={20} />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
                  }}></div>
                </div>
                <div className="h-48 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
                  }}></div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl overflow-hidden">
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
      </div>
    </section>
  );
};

export default HeroSection;