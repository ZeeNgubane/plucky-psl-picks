import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

const leagueData = [
  { position: 1, team: 'Orlando Pirates', played: 17, wins: 12, draws: 2, losses: 3, goalsFor: 26, goalsAgainst: 7, points: 38, form: ['W', 'W', 'W', 'W', 'L'] },
  { position: 2, team: 'Mamelodi Sundowns', played: 16, wins: 10, draws: 5, losses: 1, goalsFor: 26, goalsAgainst: 8, points: 35, form: ['W', 'W', 'D', 'W', 'D'] },
  { position: 3, team: 'Sekhukhune United', played: 18, wins: 9, draws: 5, losses: 4, goalsFor: 19, goalsAgainst: 10, points: 32, form: ['W', 'W', 'D', 'L', 'W'] },
  { position: 4, team: 'Kaizer Chiefs', played: 15, wins: 8, draws: 6, losses: 1, goalsFor: 15, goalsAgainst: 6, points: 30, form: ['W', 'D', 'W', 'W', 'D'] },
  { position: 5, team: 'AmaZulu FC', played: 17, wins: 9, draws: 3, losses: 5, goalsFor: 19, goalsAgainst: 16, points: 30, form: ['W', 'L', 'W', 'W', 'L'] },
  { position: 6, team: 'Durban City FC', played: 18, wins: 8, draws: 4, losses: 6, goalsFor: 17, goalsAgainst: 13, points: 28, form: ['W', 'W', 'L', 'D', 'W'] },
  { position: 7, team: 'Polokwane City', played: 17, wins: 6, draws: 7, losses: 4, goalsFor: 13, goalsAgainst: 11, points: 25, form: ['D', 'D', 'W', 'D', 'L'] },
  { position: 8, team: 'TS Galaxy', played: 18, wins: 7, draws: 3, losses: 8, goalsFor: 22, goalsAgainst: 19, points: 24, form: ['L', 'W', 'L', 'W', 'L'] },
  { position: 9, team: 'Golden Arrows', played: 17, wins: 6, draws: 2, losses: 9, goalsFor: 23, goalsAgainst: 22, points: 20, form: ['W', 'W', 'L', 'L', 'W'] },
  { position: 10, team: 'Richards Bay', played: 17, wins: 4, draws: 7, losses: 6, goalsFor: 14, goalsAgainst: 19, points: 19, form: ['D', 'L', 'D', 'L', 'D'] },
  { position: 11, team: 'Siwelele FC', played: 17, wins: 4, draws: 6, losses: 7, goalsFor: 9, goalsAgainst: 14, points: 18, form: ['D', 'L', 'D', 'L', 'D'] },
  { position: 12, team: 'Chippa United', played: 18, wins: 4, draws: 6, losses: 8, goalsFor: 13, goalsAgainst: 21, points: 18, form: ['W', 'W', 'W', 'L', 'L'] },
  { position: 13, team: 'Stellenbosch FC', played: 16, wins: 4, draws: 4, losses: 8, goalsFor: 12, goalsAgainst: 19, points: 16, form: ['D', 'L', 'L', 'D', 'L'] },
  { position: 14, team: 'Marumo Gallants', played: 18, wins: 3, draws: 6, losses: 9, goalsFor: 12, goalsAgainst: 24, points: 15, form: ['L', 'L', 'D', 'L', 'D'] },
  { position: 15, team: 'Orbit College', played: 18, wins: 4, draws: 2, losses: 12, goalsFor: 14, goalsAgainst: 32, points: 14, form: ['L', 'L', 'L', 'W', 'L'] },
  { position: 16, team: 'Magesi FC', played: 17, wins: 2, draws: 6, losses: 9, goalsFor: 11, goalsAgainst: 24, points: 12, form: ['D', 'L', 'D', 'L', 'L'] },
];

const LeagueTable = () => {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2: return <Medal className="h-4 w-4 text-gray-400" />;
      case 3: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-xs font-bold text-gray-500">#{position}</span>;
    }
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500 text-white';
      case 'D': return 'bg-yellow-500 text-white';
      case 'L': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    if (position <= 3) return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
    if (position <= 8) return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white';
    if (position <= 14) return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    return 'bg-gradient-to-r from-red-400 to-red-500 text-white';
  };

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-600" />
            League Table
          </CardTitle>
          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
            Matchday 18
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Table Header */}
        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200 mb-2">
          <div className="flex items-center space-x-2 flex-1">
            <span className="w-8 text-center">#</span>
            <span>Team</span>
          </div>
          <div className="flex items-center space-x-3 text-center">
            <span className="w-6">P</span>
            <span className="w-6">W</span>
            <span className="w-6">D</span>
            <span className="w-6">L</span>
            <span className="w-12 hidden sm:block">GD</span>
            <span className="hidden sm:flex w-20 justify-center">Form</span>
            <span className="w-8">Pts</span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-1">
          {leagueData.map((team) => (
            <div 
              key={team.position}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 text-sm ${
                team.position <= 1 ? 'bg-yellow-50/50' : 
                team.position <= 3 ? 'bg-green-50/30' : 
                team.position >= 15 ? 'bg-red-50/30' : ''
              }`}
            >
              <div className="flex items-center space-x-2 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPositionBadge(team.position)} text-[10px] font-bold`}>
                  {team.position}
                </div>
                <p className="font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                  {team.team}
                </p>
              </div>
              
              <div className="flex items-center space-x-3 text-center text-xs text-gray-600">
                <span className="w-6">{team.played}</span>
                <span className="w-6">{team.wins}</span>
                <span className="w-6">{team.draws}</span>
                <span className="w-6">{team.losses}</span>
                <span className={`w-12 hidden sm:block font-medium ${team.goalsFor - team.goalsAgainst > 0 ? 'text-green-600' : team.goalsFor - team.goalsAgainst < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}
                </span>
                <div className="hidden sm:flex items-center space-x-0.5 w-20 justify-center">
                  {team.form.map((result, index) => (
                    <div 
                      key={index}
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${getFormColor(result)}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <span className="w-8 font-bold text-gray-800">{team.points}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-gray-500 px-3">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Champion + CAF CL</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> CAF CL</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Relegation zone</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeagueTable;
