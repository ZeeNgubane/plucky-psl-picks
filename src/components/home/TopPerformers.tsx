import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const CURRENT_GAMEWEEK = 18;

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
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [playerIds, setPlayerIds] = useState<Record<string, string>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [loadingLike, setLoadingLike] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      // Get player IDs by name
      const { data: players } = await supabase
        .from('players')
        .select('id, name');

      if (players) {
        const map: Record<string, string> = {};
        players.forEach(p => { map[p.name] = p.id; });
        setPlayerIds(map);

        // Fetch like counts for this gameweek
        const playerIdList = players.map(p => p.id);
        const { data: likes } = await supabase
          .from('performer_likes')
          .select('player_id')
          .eq('gameweek', CURRENT_GAMEWEEK)
          .in('player_id', playerIdList);

        if (likes) {
          const counts: Record<string, number> = {};
          likes.forEach(l => {
            counts[l.player_id] = (counts[l.player_id] || 0) + 1;
          });
          setLikeCounts(counts);
        }

        // Fetch user's likes
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
    };
    init();
  }, []);

  const handleLike = async (playerName: string) => {
    const playerId = playerIds[playerName];
    if (!playerId || !userId) {
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
            <span className="w-10">❤️</span>
          </div>
        </div>

        <div className="space-y-1">
          {topScorers.map((player) => {
            const playerId = playerIds[player.name];
            const isLiked = playerId ? userLikes.has(playerId) : false;
            const count = playerId ? (likeCounts[playerId] || 0) : 0;

            return (
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
                  <button
                    onClick={() => handleLike(player.name)}
                    disabled={loadingLike === playerId}
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
