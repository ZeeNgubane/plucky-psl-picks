import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Player } from '@/data/teams';
import { useTeamLogos } from '@/hooks/use-team-logos';
import { usePlayerStats, useUpcomingFixtures } from '@/hooks/use-player-stats';
import { normalizePos } from './PlayerActionSheet';
import { ArrowLeft, Star, Flame, Trophy } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player | null;
  onBack: () => void;
}

const PlayerDetailSheet = ({ open, onOpenChange, player, onBack }: Props) => {
  const logos = useTeamLogos();
  const { rows } = usePlayerStats(player?.id);
  const { data: fixtures = [] } = useUpcomingFixtures(player?.team);

  if (!player) return null;
  const pos = normalizePos(player.position);

  const last5 = rows.slice(-5);
  const maxPts = Math.max(1, ...last5.map((r) => r.total_points));

  // Form score 1-10 derived from the player's form value (or recent points average)
  const rawForm = Number(player.form);
  const avgRecent = last5.length ? last5.reduce((s, r) => s + r.total_points, 0) / last5.length : 0;
  const formScore = Math.max(
    1,
    Math.min(10, Math.round(Number.isFinite(rawForm) && rawForm > 0 ? rawForm : avgRecent))
  );

  // Team of the Week: gameweeks where the player scored a standout haul
  const totwCount = rows.filter((r) => r.total_points >= 10).length;
  // MVP streak — placeholder until the squad-MVP data source is wired up
  const mvpStreak = 3;

  const formColor =
    formScore >= 8 ? 'text-emerald-400' : formScore >= 5 ? 'text-amber-400' : 'text-red-400';
  const formBar =
    formScore >= 8 ? 'bg-emerald-400' : formScore >= 5 ? 'bg-amber-400' : 'bg-red-400';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 rounded-t-2xl border-t border-emerald-500/20 bg-slate-900 text-white h-[88vh] overflow-y-auto"
      >
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-white/25" />
        </div>

        <div className="px-4 pb-8 space-y-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>

          {/* Identity card */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 p-4 flex items-center gap-3">
            {logos[player.team] && (
              <img src={logos[player.team]} alt={player.team} className="h-11 w-11 object-contain" />
            )}
            <div className="min-w-0">
              <SheetTitle className="text-lg font-bold text-white truncate">{player.name}</SheetTitle>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold">
                  {pos}
                </span>
                <span className="truncate">{player.team}</span>
              </div>
            </div>
          </div>

          {/* Form score */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Form Score</div>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-black leading-none ${formColor}`}>{formScore}</span>
              <span className="text-sm text-white/40 mb-1">/ 10</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full ${formBar}`} style={{ width: `${formScore * 10}%` }} />
            </div>
          </div>

          {/* Mini form graph */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-3">Recent Form</div>
            {last5.length === 0 ? (
              <p className="text-xs text-white/40">No gameweek data yet.</p>
            ) : (
              <div className="flex items-end justify-between gap-2 h-24">
                {last5.map((r) => (
                  <div key={r.gameweek} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                    <span className="text-[10px] font-bold text-emerald-300">{r.total_points}</span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400"
                      style={{ height: `${Math.max(6, (r.total_points / maxPts) * 100)}%` }}
                    />
                    <span className="text-[9px] text-white/40">GW{r.gameweek}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-800/70 border border-amber-400/25 p-3 text-center">
              <Trophy className="h-5 w-5 mx-auto text-amber-400" />
              <div className="text-[10px] uppercase tracking-wide text-white/50 mt-1">Team of the Week</div>
              <div className="text-lg font-black text-amber-300">
                {totwCount > 0 ? `×${totwCount}` : '—'}
              </div>
            </div>
            <div className="rounded-xl bg-slate-800/70 border border-orange-400/25 p-3 text-center">
              <Flame className="h-5 w-5 mx-auto text-orange-400" />
              <div className="text-[10px] uppercase tracking-wide text-white/50 mt-1">MVP Streak (10 GW)</div>
              <div className="text-lg font-black text-orange-300">{mvpStreak}</div>
            </div>
          </div>

          {/* Overall points */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-cyan-300" />
              <span className="text-sm text-white/70">Overall Points</span>
            </div>
            <span className="text-2xl font-black text-cyan-300">{player.total_points ?? 0}</span>
          </div>

          {/* Past 5 gameweeks */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Past 5 Gameweeks</div>
            {last5.length === 0 ? (
              <p className="text-xs text-white/40">No history available.</p>
            ) : (
              <div className="flex gap-2">
                {last5.map((r) => (
                  <div
                    key={r.gameweek}
                    className="flex-1 rounded-lg bg-slate-900/60 border border-white/10 py-2 text-center"
                  >
                    <div className="text-[9px] text-white/40">GW{r.gameweek}</div>
                    <div className="text-sm font-bold text-white">{r.total_points}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next 5 fixtures */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Next 5 Fixtures</div>
            {fixtures.length === 0 ? (
              <p className="text-xs text-white/40">No upcoming fixtures found.</p>
            ) : (
              <ul className="divide-y divide-white/5">
                {fixtures.map((f, i) => (
                  <li key={i} className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      {logos[f.opponent] && (
                        <img src={logos[f.opponent]} alt={f.opponent} className="h-4 w-4 object-contain" />
                      )}
                      <span className="truncate text-white/80">{f.opponent}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        f.home ? 'bg-emerald-500/15 text-emerald-300' : 'bg-sky-500/15 text-sky-300'
                      }`}
                    >
                      {f.home ? 'H' : 'A'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full h-11 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
            onClick={onBack}
          >
            Back
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlayerDetailSheet;
