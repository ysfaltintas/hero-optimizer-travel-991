import { Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopBar = () => {
  return (
    <div className="absolute top-0 right-0 z-20 p-6">
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <Select defaultValue="tr">
          <SelectTrigger className="w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tr">Türkçe</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>

        {/* Profile Button */}
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
        >
          <User className="w-4 h-4 mr-2" />
          Profil
        </Button>
      </div>
    </div>
  );
};

export default TopBar;