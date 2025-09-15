import { Button } from "@/components/ui/button";

const SuggestionsSection = () => {
  const destinations = [
    {
      id: 1,
      name: "New York",
      hotels: "14 Hotel",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "London",
      hotels: "18 Hotel",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Barcelona",
      hotels: "22 Hotel",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Sydney",
      hotels: "16 Hotel", 
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      name: "Istanbul",
      hotels: "25 Hotel",
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Paris",
      hotels: "31 Hotel",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            These popular destinations have a lot to offer
          </p>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            View All Destinations
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-sm mb-2">{destination.hotels}</div>
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    Discover
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestionsSection;