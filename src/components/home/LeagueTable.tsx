import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';

const leagueData = [
  { 
    position: 1, 
    team: 'Mamelodi Sundowns', 
    played: 14, 
    points: 35, 
    form: ['W', 'W', 'W', 'D', 'W'], 
    logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Mamelodi%20Sundowns.jpg' 
  },
  { 
    position: 2, 
    team: 'Orlando Pirates', 
    played: 14, 
    points: 28, 
    form: ['W', 'W', 'L', 'W', 'W'], 
    logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Orlando%20Pirates.jpg' 
  },
  { 
    position: 3, 
    team: 'Kaizer Chiefs', 
    played: 14, 
    points: 26, 
    form: ['D', 'W', 'W', 'L', 'W'], 
    logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Kaizer%20Chiefs.jpg' 
  },
  { 
    position: 4, 
    team: 'SuperSport United', 
    played: 14, 
    points: 24, 
    form: ['W', 'D', 'W', 'W', 'L'], 
    logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/SuperSport%20United.jpg' 
  },
  { 
    position: 5, 
    team: 'Cape Town City', 
    played: 14, 
    points: 22, 
    form: ['L', 'W', 'D', 'W', 'W'], 
    logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Cape%20Town%20City%20FC.jpg' 
  }
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
    if (position <= 3) return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
    if (position <= 6) return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white';
    return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, teamName: string) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=f59e0b&color=fff&size=32`;
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
            Betway Premiership
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {leagueData.map((team) => (
          <div 
            key={team.position}
            className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] border border-gray-100"
          >
            <div className="flex items-center space-x-3 flex-1">
              {/* Position Badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPositionBadge(team.position)} shadow-lg`}>
                <span className="text-xs font-bold">{team.position}</span>
              </div>
              
              {/* Team Logo and Name */}
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center p-1">
                <img 
                  src={team.logo} 
                  alt={team.team}
                  className="w-full h-full object-contain"
                  onError={(e) => handleImageError(e, team.team)}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-sm">
                  {team.team}
                </p>
                <p className="text-xs text-gray-500">{team.played} games</p>
              </div>
            </div>
            
            {/* Form */}
            <div className="hidden sm:flex items-center space-x-1 mx-3">
              {team.form.map((result, index) => (
                <div 
                  key={index}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(result)}`}
                >
                  {result}
                </div>
              ))}
            </div>
            
            {/* Points */}
            <div className="text-right">
              <div className="flex items-center space-x-1">
                {getPositionIcon(team.position)}
                <p className="font-bold text-lg text-gray-800">{team.points}</p>
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Championship Status */}
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 via-green-100 to-blue-100 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">🏆</span>
            <p className="text-center text-sm font-medium text-gray-700">
              "The race for the title is heating up, boet!" 
            </p>
            <span className="text-xl">🇿🇦</span>
          </div>
        </div>
        
        {/* View Full Table Button */}
        <button className="w-full py-3 text-amber-600 font-medium text-sm hover:bg-amber-50 rounded-xl transition-colors duration-200 mt-3">
          View Full Table →
        </button>
      </CardContent>
    </Card>
  );
};

export default LeagueTable;
