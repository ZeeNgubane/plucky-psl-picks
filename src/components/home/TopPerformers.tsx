
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Award } from 'lucide-react';
import { players, teams } from '@/data/teams';

const getTeamLogo = (teamName: string) => {
  const team = teams.find(t => t.name === teamName);
  return team?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=f59e0b&color=fff&size=32`;
};

const topPerformers = players.sort((a,b) => b.points - a.points).slice(0,5);

const TopPerformers = () => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Award className="h-4 w-4 text-yellow-500" />;
      case 1: return <Award className="h-4 w-4 text-gray-400" />;
      case 2: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <Star className="h-4 w-4 text-blue-500" />;
    }
  };

  const getRankBadge = (index: number) => {
    const rank = index + 1;
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, teamName: string) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=f59e0b&color=fff&size=32`;
  };

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-amber-600" />
          Top Performers
          <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs">Hot Form! 🔥</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topPerformers.map((player, index) => (
          <div 
            key={player.id} 
            className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-amber-50 hover:to-yellow-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              {/* Rank Badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(index)} shadow-lg`}>
                <span className="text-xs font-bold">#{index + 1}</span>
              </div>
              
              {/* Team Logo */}
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img 
                  src={getTeamLogo(player.team)} 
                  alt={player.team} 
                  className="w-full h-full object-contain"
                  onError={(e) => handleImageError(e, player.team)}
                  loading="lazy"
                />
              </div>
              
              {/* Player Info */}
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
                  {player.name}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-gray-500">{player.team}</p>
                  <span className="text-xs text-gray-400">•</span>
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {player.position}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Points and Price */}
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {getRankIcon(index)}
                <p className="font-bold text-lg text-gray-800">{player.points}</p>
                <span className="text-xs text-gray-500">pts</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                R{(player.price * 18).toFixed(1)}M
              </p>
            </div>
          </div>
        ))}
        
        {/* South African Touch */}
        <div className="mt-4 p-3 bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 rounded-xl border border-green-200">
          <p className="text-center text-sm font-medium text-gray-700">
            🇿🇦 "These boys are showing class, hey!" 
          </p>
        </div>
        
        {/* View All Button */}
        <button className="w-full py-3 text-amber-600 font-medium text-sm hover:bg-amber-50 rounded-xl transition-colors duration-200 mt-3">
          View All Players →
        </button>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
