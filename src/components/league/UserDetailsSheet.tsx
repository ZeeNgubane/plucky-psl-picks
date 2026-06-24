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

  useEffect(() => {
    if (open) setView('menu');
  }, [open, user?.user_id]);

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
            <div className="space-y-3">
              <ProfileStat label="Display name" value={user.display_name} />
              <ProfileStat label="Overall rank" value={user.rank ? `#${user.rank}` : '—'} />
              <ProfileStat label="Total points" value={user.total_points.toLocaleString()} highlight />
              <ProfileStat label="Gameweek points" value={user.gameweek_points.toLocaleString()} />
              <div className="mt-4 rounded-xl bg-slate-800/60 ring-1 ring-white/5 p-4 flex items-center gap-3">
                <Trophy className="h-5 w-5 text-emerald-400" />
                <p className="text-sm text-slate-300">
                  Competing in the Betway Premiership fantasy league.
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
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
