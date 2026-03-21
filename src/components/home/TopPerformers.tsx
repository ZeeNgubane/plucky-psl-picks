import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const CURRENT_GAMEWEEK = 18;

interface TopScorer {
  player_id: string;
  name: string;
  team_name: string;
  position: string;
  goals: number;
  apps: number;
}

const TopPerformers = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [loadingLike, setLoadingLike] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      const { data: stats } = await supabase
        .from('player_match_stats')
        .select('player_id, goals');

      if (stats && stats.length > 0) {
        const goalMap: Record<string, { goals: number; apps: number }> = {};
        stats.forEach(s => {
          if (!goalMap[s.player_id]) goalMap[s.player_id] = { goals: 0, apps: 0 };
          goalMap[s.player_id].goals += s.goals;
          goalMap[s.player_id].apps += 1;
        });

        const playerIds = Object.keys(goalMap);
        const { data: players } = await supabase
          .from('players')
          .select('*')
          .in('id', playerIds);

        if (players) {
          const scorers: TopScorer[] = players
            .map(p => ({
              player_id: String(p.id),
              name: (p as any).name,
              team_name: (p as any).team || '',
              position: p.position,
              goals: goalMap[String(p.id)]?.goals || 0,
              apps: goalMap[String(p.id)]?.apps || 0,
            }))
            .filter(s => s.goals > 0)
            .sort((a, b) => b.goals - a.goals)
            .slice(0, 10);

          setTopScorers(scorers);

          const scorerIds = scorers.map(s => s.player_id);
          if (scorerIds.length > 0) {
            const { data: likes } = await supabase
              .from('performer_likes')
              .select('player_id')
              .eq('gameweek', CURRENT_GAMEWEEK)
              .in('player_id', scorerIds);

            if (likes) {
              const counts: Record<string, number> = {};
              likes.forEach(l => { counts[l.player_id] = (counts[l.player_id] || 0) + 1; });
              setLikeCounts(counts);
            }

            if (user) {
              const { data: myLikes } = await supabase
                .from('performer_likes')
                .select('player_id')
                .eq('user_id', user.id)
                .eq('gameweek', CURRENT_GAMEWEEK);

              if (myLikes) {
                setUserLikes(new Set(myLikes.map(l => l.player_id)));
              }
            }
          }
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleLike = async (playerId: string) => {
    if (!userId) {
      toast({ title: "Sign in to like performers", variant: "destructive" });
      return;
    }

    setLoadingLike(playerId);
    const isLiked = userLikes.has(playerId);

    if (isLiked) {
      const { error } = await supabase
        .from('performer_likes')
        .delete()
        .eq('user_id', userId)
        .eq('player_id', playerId)
        .eq('gameweek', CURRENT_GAMEWEEK);

      if (!error) {
        setUserLikes(prev => { const s = new Set(prev); s.delete(playerId); return s; });
        setLikeCounts(prev => ({ ...prev, [playerId]: (prev[playerId] || 1) - 1 }));
      }
    } else {
      const { error } = await supabase
        .from('performer_likes')
        .insert({ user_id: userId, player_id: playerId, gameweek: CURRENT_GAMEWEEK });

      if (!error) {
        setUserLikes(prev => new Set(prev).add(playerId));
        setLikeCounts(prev => ({ ...prev, [playerId]: (prev[playerId] || 0) + 1 }));
      }
    }
    setLoadingLike(null);
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
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
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-amber-600" />
          Top Goal Scorers
          <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs">25/26 Season 🔥</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topScorers.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No match stats recorded yet</p>
            <p className="text-sm text-gray-400">Top scorers will appear once gameweek data is added</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200 mb-2">
              <div className="flex items-center space-x-2 flex-1">
                <span className="w-6 text-center">#</span>
                <span>Player</span>
              </div>
              <div className="flex items-center space-x-3 text-center">
                <span className="w-8">Apps</span>
                <span className="w-8">⚽</span>
                <span className="w-10">❤️</span>
              </div>
            </div>

            <div className="space-y-1">
              {topScorers.map((player, index) => {
                const rank = index + 1;
                const isLiked = userLikes.has(player.player_id);
                const count = likeCounts[player.player_id] || 0;

                return (
                  <div
                    key={player.player_id}
                    className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 transition-all duration-200 text-sm"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getRankBadge(rank)} text-[10px] font-bold flex-shrink-0`}>
                        {rank}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                          {player.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">{player.team_name} · {player.position}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-center text-xs text-gray-600 flex-shrink-0">
                      <span className="w-8">{player.apps}</span>
                      <span className="w-8 font-bold text-gray-800 text-sm">{player.goals}</span>
                      <button
                        onClick={() => handleLike(player.player_id)}
                        disabled={loadingLike === player.player_id}
                        className="w-10 flex items-center justify-center gap-0.5 transition-all duration-200 hover:scale-110 disabled:opacity-50"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-300'}`}
                        />
                        {count > 0 && (
                          <span className={`text-[10px] ${isLiked ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                            {count}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
