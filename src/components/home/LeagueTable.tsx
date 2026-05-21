import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TeamStanding {
  id: string;
  team_name: string;
  position: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  form: string[];
}

const LeagueTable = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      const { data, error } = await supabase
        .from('standings')
        .select('*')
        .eq('season', '2025/26')
        .order('position', { ascending: true });

      if (data && data.length > 0) {
        setStandings(data as TeamStanding[]);
      } else {
        // Fallback: show teams with zero stats
        const { data: teams } = await supabase
          .from('teams')
          .select('id, name, short_name')
          .order('name');

        if (teams) {
          setStandings(teams.map((team, i) => ({
            id: team.id,
            team_name: team.name,
            position: i + 1,
            played: 0, wins: 0, draws: 0, losses: 0,
            goals_for: 0, goals_against: 0, goal_difference: 0,
            points: 0, form: [],
          })));
        }
      }
      if (error) console.error('Error fetching standings:', error);
      setLoading(false);
    };
    fetchStandings();
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
            <p className="text-gray-400 text-sm mt-1">Data updates daily at midnight</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-2 py-2 text-[11px] font-semibold text-gray-500 border-b border-gray-200 mb-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="w-6 text-center">#</span>
                <span>Team</span>
              </div>
              <div className="flex items-center space-x-2 text-center shrink-0">
                <span className="w-5">P</span>
                <span className="w-5">W</span>
                <span className="w-5">D</span>
                <span className="w-5">L</span>
                <span className="w-7">Pts</span>
              </div>
            </div>

            <div className="space-y-1">
              {standings.map((team) => (
                <div 
                  key={team.id}
                  className={`group flex items-center justify-between px-2 py-1.5 rounded-lg transition-all duration-200 hover:bg-blue-50 text-[12px] ${
                    team.position <= 1 ? 'bg-yellow-50/50' : 
                    team.position <= 3 ? 'bg-green-50/30' : 
                    team.position >= 15 ? 'bg-red-50/30' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getPositionBadge(team.position)} text-[10px] font-bold shrink-0`}>
                      {team.position}
                    </div>
                    <p className="font-medium text-gray-800 text-[12px] truncate min-w-0">
                      {team.team_name}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-center text-[12px] text-gray-600 shrink-0">
                    <span className="w-5">{team.played}</span>
                    <span className="w-5">{team.wins}</span>
                    <span className="w-5">{team.draws}</span>
                    <span className="w-5">{team.losses}</span>
                    <span className="w-7 font-bold text-gray-800">{team.points}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-gray-500 px-2">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Champion</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> CAF CL</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Relegation</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LeagueTable;
