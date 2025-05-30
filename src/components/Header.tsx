import { Trophy, Users, Star, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="relative bg-black text-white shadow-lg">
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0JZOmbEBlLE_lP0SKjIaxOfpF4DvC3bZoQ&s" 
                alt="PSL Logo" 
                className="h-12 w-12 object-contain drop-shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">SA Fantasy Football</h1>
              <p className="text-sm text-gray-200 font-medium">Betway Premiership</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => onTabChange('team')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg ${
                activeTab === 'team' 
                  ? 'bg-red-600 text-white shadow-red-600/30 transform scale-105' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>My Team</span>
            </button>
            
            <button
              onClick={() => onTabChange('transfers')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg ${
                activeTab === 'transfers' 
                  ? 'bg-red-600 text-white shadow-red-600/30 transform scale-105' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm'
              }`}
            >
              <Star className="h-5 w-5" />
              <span>Transfers</span>
            </button>
            
            <button
              onClick={() => onTabChange('league')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg ${
                activeTab === 'league' 
                  ? 'bg-red-600 text-white shadow-red-600/30 transform scale-105' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm'
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span>League</span>
            </button>
          </nav>

          <Button variant="outline" size="sm" className="md:hidden bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
