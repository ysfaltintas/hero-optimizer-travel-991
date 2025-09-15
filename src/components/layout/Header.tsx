import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, User, Globe } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">Travelers</h1>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary">
              <span>Travelers</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary">
              <span>Templates</span>
              <ChevronDown size={16} />
            </div>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-primary">
              List your property
            </Button>
            <div className="flex items-center space-x-2">
              <Globe size={20} className="text-gray-600" />
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex items-center space-x-1 py-2 cursor-pointer hover:text-primary">
                <span>Travelers</span>
                <ChevronDown size={16} />
              </div>
              <div className="flex items-center space-x-1 py-2 cursor-pointer hover:text-primary">
                <span>Templates</span>
                <ChevronDown size={16} />
              </div>
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-primary">
                List your property
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;