import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TeamStanding {
  id: string;
  name: string;
  short_name: string | null;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: string[];
}

const LeagueTable = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data: teams } = await supabase
        .from('teams')
        .select('id, name, short_name')
        .order('name');

      // For now, display teams with placeholder stats until real match data is available
      if (teams) {
        setStandings(teams.map((team, index) => ({
          id: team.id,
          name: team.name,
          short_name: team.short_name,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
          form: [],
        })));
      }
      setLoading(false);
    };
    fetchTeams();
  }, []);

  const getPositionBadge = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    if (position <= 3) return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
    if (position <= 8) return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white';
    if (position <= 14) return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    return 'bg-gradient-to-r from-red-400 to-red-500 text-white';
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500 text-white';
      case 'D': return 'bg-yellow-500 text-white';
      case 'L': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  if (loading) {
    return (
      <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-600" />
            League Table
          </CardTitle>
          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
            Season 25/26
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {standings.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No league data available yet</p>
          </div>
        ) : (
          <>
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
              {standings.map((team, index) => {
                const position = index + 1;
                const gd = team.goalsFor - team.goalsAgainst;
                return (
                  <div 
                    key={team.id}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 text-sm ${
                      position <= 1 ? 'bg-yellow-50/50' : 
                      position <= 3 ? 'bg-green-50/30' : 
                      position >= 15 ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPositionBadge(position)} text-[10px] font-bold`}>
                        {position}
                      </div>
                      <p className="font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                        {team.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-center text-xs text-gray-600">
                      <span className="w-6">{team.played}</span>
                      <span className="w-6">{team.wins}</span>
                      <span className="w-6">{team.draws}</span>
                      <span className="w-6">{team.losses}</span>
                      <span className={`w-12 hidden sm:block font-medium ${gd > 0 ? 'text-green-600' : gd < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                        {gd > 0 ? '+' : ''}{gd}
                      </span>
                      <div className="hidden sm:flex items-center space-x-0.5 w-20 justify-center">
                        {team.form.map((result, i) => (
                          <div 
                            key={i}
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${getFormColor(result)}`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                      <span className="w-8 font-bold text-gray-800">{team.points}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-gray-500 px-3">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Champion + CAF CL</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> CAF CL</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Relegation zone</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LeagueTable;
