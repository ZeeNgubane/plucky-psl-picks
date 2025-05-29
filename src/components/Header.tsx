
import { Trophy, Users, Star, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-bronze-400" />
            <div>
              <h1 className="text-2xl font-bold">SA Fantasy Football</h1>
              <p className="text-sm text-gray-300">Betway Premiership</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => onTabChange('team')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'team' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>My Team</span>
            </button>
            
            <button
              onClick={() => onTabChange('transfers')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'transfers' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Transfers</span>
            </button>
            
            <button
              onClick={() => onTabChange('league')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'league' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>League</span>
            </button>
          </nav>

          <Button variant="outline" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
