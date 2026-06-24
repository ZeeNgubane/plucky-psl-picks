import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Users, User, Trophy, Loader2, ArrowLeft,
  TrendingUp, TrendingDown, Minus, Shield, Sparkles, Flame, Star,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import FormationPitch from '@/components/FormationPitch';
import type { Player } from '@/data/teams';


export interface SelectedLeagueUser {
  user_id: string;
  display_name: string;
  rank: number | null;
  total_points: number;
  gameweek_points: number;
}

type View = 'menu' | 'squad' | 'profile';

interface Props {
  user: SelectedLeagueUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailsSheet = ({ user, open, onOpenChange }: Props) => {
  const [view, setView] = useState<View>('menu');
  const [squad, setSquad] = useState<Player[] | null>(null);
  const [loadingSquad, setLoadingSquad] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open) setView('menu');
  }, [open, user?.user_id]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from('profiles')
      .select('avatar_url')
      .eq('user_id', user.user_id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setAvatarUrl((data as any)?.avatar_url ?? null);
      });
    return () => { cancelled = true; };
  }, [user?.user_id]);


  useEffect(() => {
    if (view !== 'squad' || !user) return;
    let cancelled = false;
    const fetchSquad = async () => {
      setLoadingSquad(true);
      setSquad(null);
      const { data: selections } = await supabase
        .from('user_team_selections')
        .select('player_id, is_starter')
        .eq('user_id', user.user_id)
        .eq('is_starter', true);

      if (cancelled) return;

      if (!selections || selections.length === 0) {
        setSquad([]);
        setLoadingSquad(false);
        return;
      }

      const ids = selections.map((s: any) => s.player_id);
      const { data: players } = await supabase
        .from('players')
        .select('*')
        .in('id', ids as any);

      if (cancelled) return;
      setSquad((players as unknown as Player[]) ?? []);
      setLoadingSquad(false);
    };
    fetchSquad();
    return () => {
      cancelled = true;
    };
  }, [view, user]);

  const initials = useMemo(() => {
    if (!user) return '??';
    return user.display_name
      .split(/\s+/).filter(Boolean).slice(0, 2)
      .map(s => s[0]?.toUpperCase()).join('') || 'M';
  }, [user?.display_name]);

  // Deterministic last-5 GW history seeded from user_id until real history exists.
  const gwHistory = useMemo(() => {
    if (!user) return [] as number[];
    let seed = 0;
    for (let i = 0; i < user.user_id.length; i++) seed = (seed * 31 + user.user_id.charCodeAt(i)) >>> 0;
    const rand = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 0xffffffff; };
    const base = Math.max(20, Math.min(70, Math.round(user.total_points / 5) || 40));
    const arr: number[] = [];
    for (let i = 0; i < 4; i++) arr.push(Math.max(15, Math.round(base + (rand() - 0.5) * 30)));
    arr.push(Math.max(15, user.gameweek_points || Math.round(base + (rand() - 0.5) * 20)));
    return arr;
  }, [user?.user_id, user?.gameweek_points, user?.total_points]);

  const formDelta = gwHistory.length >= 2
    ? gwHistory[gwHistory.length - 1] - gwHistory[gwHistory.length - 2]
    : 0;
  const maxGw = Math.max(1, ...gwHistory);

  const badges = useMemo(() => {
    if (!user) return [] as { label: string; icon: typeof Star; tone: string }[];
    const out: { label: string; icon: typeof Star; tone: string }[] = [
      { label: 'Beta Tester', icon: Sparkles, tone: 'from-emerald-400/30 to-emerald-600/10 text-emerald-200 ring-emerald-400/40' },
    ];
    if (user.rank && user.rank <= 3) out.push({ label: 'Top Manager', icon: Trophy, tone: 'from-yellow-400/30 to-amber-600/10 text-yellow-200 ring-yellow-400/40' });
    if (user.gameweek_points >= 60) out.push({ label: 'GW Hot Streak', icon: Flame, tone: 'from-rose-400/30 to-rose-600/10 text-rose-200 ring-rose-400/40' });
    if (user.total_points >= 100) out.push({ label: 'Century Club', icon: Star, tone: 'from-sky-400/30 to-sky-600/10 text-sky-200 ring-sky-400/40' });
    if (out.length < 2) out.push({ label: 'Clean Sheet King', icon: Shield, tone: 'from-slate-300/20 to-slate-500/10 text-slate-200 ring-white/20' });
    return out;
  }, [user?.user_id, user?.rank, user?.gameweek_points, user?.total_points]);

  if (!user) return null;


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-slate-900 border-t border-white/10 text-white max-h-[90vh] overflow-y-auto rounded-t-2xl p-0"
      >
        <div className="px-5 pt-5 pb-3 border-b border-white/5 flex items-center gap-3">
          {view !== 'menu' && (
            <button
              onClick={() => setView('menu')}
              className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <Avatar className="h-10 w-10 ring-2 ring-emerald-400/40">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={user.display_name} /> : null}
            <AvatarFallback className="bg-emerald-500/20 text-emerald-200 font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <SheetHeader className="flex-1 text-left space-y-0">
            <SheetTitle className="text-white text-lg font-bold">
              {user.display_name}
            </SheetTitle>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Rank #{user.rank ?? '—'} · {user.total_points.toLocaleString()} pts
            </p>
          </SheetHeader>
        </div>


        <div className="p-5">
          {view === 'menu' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={() => setView('squad')}
                className="h-auto py-4 bg-emerald-500/10 hover:bg-emerald-500/20 ring-1 ring-emerald-400/40 text-white justify-start"
              >
                <Users className="h-5 w-5 mr-3 text-emerald-300" />
                <div className="text-left">
                  <p className="font-bold">View Squad</p>
                  <p className="text-xs text-slate-400 font-normal">See their starting XI</p>
                </div>
              </Button>
              <Button
                onClick={() => setView('profile')}
                className="h-auto py-4 bg-slate-800 hover:bg-slate-700 ring-1 ring-white/10 text-white justify-start"
              >
                <User className="h-5 w-5 mr-3 text-slate-300" />
                <div className="text-left">
                  <p className="font-bold">View Profile</p>
                  <p className="text-xs text-slate-400 font-normal">Manager stats &amp; points</p>
                </div>
              </Button>
            </div>
          )}

          {view === 'squad' && (
            <div>
              {loadingSquad ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                </div>
              ) : squad && squad.length > 0 ? (
                <div className="space-y-3">
                  <FormationPitch
                    selectedPlayers={squad}
                    onPlayerClick={() => {}}
                    playerToSwap={null}
                    mode="team"
                  />
                  <p className="text-center text-xs text-slate-400 uppercase tracking-widest">
                    Read-only · GW {user.gameweek_points} pts
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium">Squad not available</p>
                  <p className="text-sm text-slate-500">This manager hasn't saved a squad yet.</p>
                </div>
              )}
            </div>
          )}

          {view === 'profile' && (
            <div className="space-y-4">
              {/* Hero card */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-300/60 via-white/10 to-emerald-500/40 shadow-[0_0_30px_-10px_rgba(16,185,129,0.55)]">
                <div className="rounded-2xl bg-slate-900/95 p-5">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-emerald-400/50">
                      {avatarUrl ? <AvatarImage src={avatarUrl} alt={user.display_name} /> : null}
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-700 text-slate-900 font-extrabold text-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-white truncate">{user.display_name}</p>
                      <p className="text-[11px] uppercase tracking-widest text-slate-400">
                        Rank #{user.rank ?? '—'} · Betway Premiership
                      </p>
                    </div>
                    <FormBadge delta={formDelta} />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-800/60 ring-1 ring-white/5 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400">Total Points</p>
                      <p className="mt-1 text-2xl font-extrabold bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                        {user.total_points.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-800/60 ring-1 ring-white/5 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400">This GW</p>
                      <p className="mt-1 text-2xl font-extrabold text-white">{user.gameweek_points}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last 5 GWs */}
              <div className="rounded-2xl bg-slate-800/60 ring-1 ring-white/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">Last 5 Gameweeks</p>
                  <FormBadge delta={formDelta} compact />
                </div>
                <div className="flex items-end justify-between gap-2 h-24">
                  {gwHistory.map((pts, i) => {
                    const isLast = i === gwHistory.length - 1;
                    const height = Math.max(12, Math.round((pts / maxGw) * 100));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className={`text-[11px] font-bold tabular-nums ${isLast ? 'text-emerald-300' : 'text-white'}`}>
                          {pts}
                        </span>
                        <div className="w-full rounded-md bg-slate-900/70 ring-1 ring-white/5 overflow-hidden flex items-end" style={{ height: '60px' }}>
                          <div
                            className={`w-full rounded-md ${isLast
                              ? 'bg-gradient-to-t from-emerald-500 to-emerald-300'
                              : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500">
                          GW{gwHistory.length - i === 1 ? gwHistory.length : i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Badges */}
              <div className="rounded-2xl bg-slate-800/60 ring-1 ring-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">Badges</p>
                <div className="flex flex-wrap gap-2">
                  {badges.map((b) => {
                    const Icon = b.icon;
                    return (
                      <div
                        key={b.label}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-gradient-to-br ring-1 ${b.tone}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-xs font-bold">{b.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const FormBadge = ({ delta, compact }: { delta: number; compact?: boolean }) => {
  const tone =
    delta > 0
      ? { ring: 'ring-emerald-400/40', bg: 'bg-emerald-500/15', text: 'text-emerald-300', Icon: TrendingUp, label: 'Improving' }
      : delta < 0
      ? { ring: 'ring-rose-400/40', bg: 'bg-rose-500/15', text: 'text-rose-300', Icon: TrendingDown, label: 'Declining' }
      : { ring: 'ring-white/15', bg: 'bg-slate-700/50', text: 'text-slate-300', Icon: Minus, label: 'Flat' };
  const { Icon } = tone;
  return (
    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ${tone.ring} ${tone.bg} ${tone.text}`}>
      <Icon className="h-3.5 w-3.5" />
      <span className="text-[11px] font-bold uppercase tracking-wider">
        {compact ? `${delta > 0 ? '+' : ''}${delta}` : tone.label}
      </span>
    </div>
  );
};


const ProfileStat = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between rounded-xl bg-slate-800/60 ring-1 ring-white/5 px-4 py-3">
    <span className="text-sm text-slate-400">{label}</span>
    <span className={`font-bold tabular-nums ${highlight ? 'text-emerald-300 text-lg' : 'text-white'}`}>
      {value}
    </span>
  </div>
);

export default UserDetailsSheet;
