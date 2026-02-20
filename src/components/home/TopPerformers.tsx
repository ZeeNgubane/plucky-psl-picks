import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award } from 'lucide-react';

const topScorers = [
  { rank: 1, name: 'Junior Dion', team: 'Golden Arrows', goals: 9, apps: 15, position: 'CF', nationality: 'Chad' },
  { rank: 2, name: 'Bradley Grobler', team: 'Sekhukhune United', goals: 7, apps: 16, position: 'CF', nationality: 'South Africa' },
  { rank: 3, name: 'Iqraam Rayners', team: 'Mamelodi Sundowns', goals: 6, apps: 12, position: 'CF', nationality: 'South Africa' },
  { rank: 4, name: 'Thandolwenkosi Ngwenya', team: 'AmaZulu FC', goals: 6, apps: 14, position: 'CF', nationality: 'Zimbabwe' },
  { rank: 5, name: 'Langelihle Phili', team: 'Stellenbosch FC', goals: 6, apps: 13, position: 'LW', nationality: 'South Africa' },
  { rank: 6, name: 'Seluleko Mahlambi', team: 'TS Galaxy', goals: 5, apps: 18, position: 'LW', nationality: 'South Africa' },
  { rank: 7, name: 'Patrick Maswanganyi', team: 'Orlando Pirates', goals: 5, apps: 13, position: 'AM', nationality: 'South Africa' },
  { rank: 8, name: 'Brayan León', team: 'Mamelodi Sundowns', goals: 4, apps: 3, position: 'CF', nationality: 'Colombia' },
  { rank: 9, name: 'Relebohile Mofokeng', team: 'Orlando Pirates', goals: 3, apps: 14, position: 'LW', nationality: 'South Africa' },
  { rank: 10, name: 'Flávio Silva', team: 'Kaizer Chiefs', goals: 4, apps: 9, position: 'CF', nationality: 'Guinea-Bissau' },
];

const TopPerformers = () => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
    }
  };

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-amber-600" />
          Top Goal Scorers
          <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs">25/26 Season 🔥</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200 mb-2">
          <div className="flex items-center space-x-2 flex-1">
            <span className="w-6 text-center">#</span>
            <span>Player</span>
          </div>
          <div className="flex items-center space-x-3 text-center">
            <span className="w-8">Apps</span>
            <span className="w-8">⚽</span>
          </div>
        </div>

        <div className="space-y-1">
          {topScorers.map((player) => (
            <div 
              key={player.rank} 
              className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 transition-all duration-200 text-sm"
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getRankBadge(player.rank)} text-[10px] font-bold flex-shrink-0`}>
                  {player.rank}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                    {player.name}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">{player.team} · {player.position}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-center text-xs text-gray-600 flex-shrink-0">
                <span className="w-8">{player.apps}</span>
                <span className="w-8 font-bold text-gray-800 text-sm">{player.goals}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 rounded-xl border border-green-200">
          <p className="text-center text-sm font-medium text-gray-700">
            🇿🇦 "Junior Dion is on fire, boet!" 🔥
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
