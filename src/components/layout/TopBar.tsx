import { Languages, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopBar = () => {
  return (
    <div className="absolute top-0 right-0 z-20 p-6">
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <Select defaultValue="tr">
          <SelectTrigger className="w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 px-3 py-2">
            <Languages className="w-4 h-4" />
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
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white p-2"
        >
          <UserCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;