
import { Trophy, Users, Star, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="relative bg-black text-white shadow-lg overflow-hidden">
      {/* Football pitch background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-20"></div>
      
      {/* Pitch lines overlay */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
          {/* Center circle */}
          <circle cx="600" cy="100" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="600" cy="100" r="8" fill="white"/>
          
          {/* Center line */}
          <line x1="600" y1="0" x2="600" y2="200" stroke="white" strokeWidth="2"/>
          
          {/* Goal areas */}
          <rect x="0" y="60" width="60" height="80" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="1140" y="60" width="60" height="80" fill="none" stroke="white" strokeWidth="2"/>
          
          {/* Penalty areas */}
          <rect x="0" y="30" width="120" height="140" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="1080" y="30" width="120" height="140" fill="none" stroke="white" strokeWidth="2"/>
          
          {/* Corner arcs */}
          <path d="M 0 0 Q 20 0 20 20" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 1200 0 Q 1180 0 1180 20" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 0 200 Q 20 200 20 180" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 1200 200 Q 1180 200 1180 180" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      {/* Football player silhouettes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute top-8 left-32 w-12 h-20 bg-white rounded-lg transform rotate-12"></div>
        <div className="absolute top-6 right-20 w-14 h-18 bg-white rounded-lg transform -rotate-12"></div>
        <div className="absolute top-10 right-40 w-10 h-16 bg-white rounded-lg transform rotate-6"></div>
        <div className="absolute bottom-4 left-40 w-12 h-18 bg-white rounded-lg transform -rotate-6"></div>
        <div className="absolute bottom-6 right-60 w-16 h-16 bg-white rounded-full"></div>
      </div>

      {/* Football graphics */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-4 right-10 w-8 h-8 bg-white rounded-full border-2 border-black transform rotate-45">
          <div className="absolute inset-1 border border-black rounded-full">
            <div className="w-full h-full border-r border-black"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-black transform -translate-x-px"></div>
          </div>
        </div>
        <div className="absolute bottom-4 left-10 w-6 h-6 bg-white rounded-full border-2 border-black transform -rotate-12">
          <div className="absolute inset-1 border border-black rounded-full">
            <div className="w-full h-full border-r border-black"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-black transform -translate-x-px"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Trophy className="h-10 w-10 text-bronze-400 drop-shadow-lg" />
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
