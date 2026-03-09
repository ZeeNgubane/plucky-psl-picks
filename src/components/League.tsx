import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  total_points: number;
  gameweek_points: number;
  rank: number | null;
  display_name?: string;
}

const League = () => {
  const [leagueData, setLeagueData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? null);

      const { data: leaderboard } = await supabase
        .from('leaderboard')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(20);

      if (leaderboard && leaderboard.length > 0) {
        // Fetch display names for all users
        const userIds = leaderboard.map(e => e.user_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, display_name')
          .in('user_id', userIds);

        const profileMap = new Map(profiles?.map(p => [p.user_id, p.display_name]) ?? []);
        
        setLeagueData(leaderboard.map((entry, index) => ({
          ...entry,
          rank: index + 1,
          display_name: profileMap.get(entry.user_id) || 'Manager',
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-gray-500 font-semibold">#{rank}</span>;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '⭐';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const currentUserEntry = leagueData.find(e => e.user_id === currentUserId);
  const leader = leagueData[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-bronze-600" />
              League Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Managers:</span>
                <span className="font-semibold">{leagueData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Your Rank:</span>
                <span className="font-semibold text-bronze-600">
                  {currentUserEntry ? `#${currentUserEntry.rank}` : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Points Behind:</span>
                <span className="font-semibold text-red-600">
                  {currentUserEntry && leader
                    ? leader.total_points - currentUserEntry.total_points
                    : '—'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Current Leader
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl mb-1">👑</div>
              {leader ? (
                <>
                  <p className="font-semibold">{leader.display_name}</p>
                  <p className="text-lg font-bold text-bronze-600">{leader.total_points.toLocaleString()} pts</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">No entries yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-500" />
              Your Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl mb-1">⭐</div>
              {currentUserEntry ? (
                <>
                  <p className="font-semibold">{currentUserEntry.display_name}</p>
                  <p className="text-sm text-gray-600">GW Points: {currentUserEntry.gameweek_points}</p>
                  <p className="text-lg font-bold text-green-600">{currentUserEntry.total_points} pts</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">Sign in to track your points</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-bronze-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-bronze-600" />
            League Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leagueData.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No managers in the league yet</p>
              <p className="text-sm text-gray-400">Sign up and pick your squad to join!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leagueData.map((entry) => (
                <div 
                  key={entry.id} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    entry.user_id === currentUserId
                      ? 'bg-bronze-50 border border-bronze-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankBadge(entry.rank!)}
                    </div>
                    <div className="text-2xl">{getRankIcon(entry.rank!)}</div>
                    <div>
                      <p className={`font-medium ${entry.user_id === currentUserId ? 'text-bronze-700' : ''}`}>
                        {entry.user_id === currentUserId ? 'You' : entry.display_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{entry.total_points.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default League;
