import { Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-white">
              Ozvia Travel
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-gray-200 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">Hotels</a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">Destinations</a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">Contact</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-gray-200 hover:bg-white/10">
              <Globe className="mr-2" size={18} />
              TR
            </Button>
            <Button className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-gray-900">
              <User className="mr-2" size={18} />
              Sign In / Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;