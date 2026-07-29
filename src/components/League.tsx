import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users, Loader2, Crown, Star, TrendingDown, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UserDetailsSheet, { type SelectedLeagueUser } from '@/components/league/UserDetailsSheet';


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
  const [selectedUser, setSelectedUser] = useState<SelectedLeagueUser | null>(null);


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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-surface rounded-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentUserEntry = leagueData.find(e => e.user_id === currentUserId);
  const leader = leagueData[0];
  const pointsBehind = currentUserEntry && leader ? leader.total_points - currentUserEntry.total_points : null;

  const rankAccent = (rank: number) => {
    if (rank === 1) return { ring: 'ring-yellow-400/60', text: 'text-primary', bg: 'from-yellow-500/20 to-yellow-500/0', icon: <Crown className="h-5 w-5 text-primary" /> };
    if (rank === 2) return { ring: 'ring-slate-300/50', text: 'text-slate-200', bg: 'from-slate-300/15 to-slate-300/0', icon: <Medal className="h-5 w-5 text-slate-200" /> };
    if (rank === 3) return { ring: 'ring-amber-600/60', text: 'text-amber-500', bg: 'from-amber-600/20 to-amber-600/0', icon: <Award className="h-5 w-5 text-amber-500" /> };
    return { ring: 'ring-white/5', text: 'text-muted-foreground', bg: '', icon: null };
  };

  return (
    <div className="space-y-5 text-foreground">
      {/* Stat cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* League Stats */}
        <div className="relative rounded-2xl bg-surface backdrop-blur ring-1 ring-primary/30 shadow-[0_0_24px_-8px_hsl(45 100% 50% / 0.35)] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">League Stats</p>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-3">
            <Stat icon={<Users className="h-4 w-4 text-primary" />} label="Total Managers" value={leagueData.length.toString()} />
            <Stat icon={<Target className="h-4 w-4 text-primary" />} label="Your Rank" value={currentUserEntry ? `#${currentUserEntry.rank}` : '—'} />
            <Stat icon={<TrendingDown className="h-4 w-4 text-rose-400" />} label="Points Behind" value={pointsBehind !== null ? pointsBehind.toString() : '—'} valueClass="text-rose-300" />
          </div>
        </div>

        {/* Current Leader */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-yellow-300/70 via-yellow-100/20 to-yellow-500/40 shadow-[0_0_30px_-10px_rgba(250,204,21,0.55)]">
          <div className="rounded-2xl bg-surface p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.18em] text-primary/80 font-semibold">Current Leader</p>
              <div className="h-8 w-8 rounded-full bg-yellow-400/15 ring-1 ring-yellow-300/40 flex items-center justify-center">
                <Crown className="h-4 w-4 text-primary" />
              </div>
            </div>
            {leader ? (
              <div className="text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-lg">
                  <Crown className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="text-base font-bold text-white truncate">{leader.display_name}</p>
                <p className="mt-1 text-3xl font-extrabold bg-gradient-to-r from-primary to-amber-200 bg-clip-text text-transparent">
                  {leader.total_points.toLocaleString()}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">Total Points</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No entries yet</p>
            )}
          </div>
        </div>

        {/* Your Points */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/60 via-white/10 to-primary/30 shadow-[0_0_30px_-10px_hsl(45 100% 50% / 0.4)]">
          <div className="rounded-2xl bg-surface p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.18em] text-primary/80 font-semibold">Your Points</p>
              <div className="h-8 w-8 rounded-full bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center">
                <Star className="h-4 w-4 text-primary" />
              </div>
            </div>
            {currentUserEntry ? (
              <div className="text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-lg">
                  <Trophy className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="text-base font-bold text-white truncate">{currentUserEntry.display_name}</p>
                <p className="mt-1 text-3xl font-extrabold bg-gradient-to-r from-primary to-amber-200 bg-clip-text text-transparent">
                  {currentUserEntry.total_points.toLocaleString()}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">GW {currentUserEntry.gameweek_points} pts</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">Sign in to track your points</p>
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="rounded-2xl bg-surface ring-1 ring-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">League Table</h3>
          </div>
          <span className="text-xs text-muted-foreground">Top {leagueData.length}</span>
        </div>

        {leagueData.length === 0 ? (
          <div className="text-center py-12 px-5">
            <Trophy className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-foreground/80 font-medium">No managers in the league yet</p>
            <p className="text-sm text-muted-foreground">Sign up and pick your squad to join!</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {leagueData.map((entry, idx) => {
              const accent = rankAccent(entry.rank!);
              const isMe = entry.user_id === currentUserId;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedUser({
                        user_id: entry.user_id,
                        display_name: entry.display_name || 'Manager',
                        rank: entry.rank,
                        total_points: entry.total_points,
                        gameweek_points: entry.gameweek_points,
                      })
                    }
                    className={`w-full flex items-center justify-between px-5 py-3 text-left transition-colors ${
                      isMe ? 'bg-primary/10 ring-1 ring-inset ring-primary/30' : idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                    } ${accent.bg ? `bg-gradient-to-r ${accent.bg}` : ''} hover:bg-white/5`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`flex items-center justify-center h-9 w-9 rounded-lg bg-background/80 ring-1 ${accent.ring}`}>
                        {accent.icon ?? <span className={`text-sm font-bold ${accent.text}`}>{entry.rank}</span>}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-semibold truncate ${isMe ? 'text-primary' : 'text-white'}`}>
                          {isMe ? 'You' : entry.display_name}
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Rank #{entry.rank} · GW {entry.gameweek_points}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-extrabold ${entry.rank === 1 ? 'text-primary' : 'text-white'}`}>
                        {entry.total_points.toLocaleString()}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">pts</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <UserDetailsSheet
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(o) => !o && setSelectedUser(null)}
      />

    </div>
  );
};

const Stat = ({ icon, label, value, valueClass = 'text-white' }: { icon: React.ReactNode; label: string; value: string; valueClass?: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-md bg-background/80 ring-1 ring-white/5 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className={`text-lg font-bold tabular-nums ${valueClass}`}>{value}</span>
  </div>
);

export default League;
