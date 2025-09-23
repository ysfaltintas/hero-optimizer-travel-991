import { Languages, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopBar = () => {
  return (
    <div className="absolute top-0 right-0 z-20 p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector */}
        <Select defaultValue="tr">
          <SelectTrigger className="w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 px-2 sm:px-3 py-2 text-sm">
            <Languages className="w-3 h-3 sm:w-4 sm:h-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tr">🇹🇷 TR</SelectItem>
            <SelectItem value="en">🇺🇸 EN</SelectItem>
            <SelectItem value="de">🇩🇪 DE</SelectItem>
            <SelectItem value="fr">🇫🇷 FR</SelectItem>
          </SelectContent>
        </Select>

        {/* Profile Button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white p-2 min-h-[44px] min-w-[44px] touch-manipulation"
        >
          <UserCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;