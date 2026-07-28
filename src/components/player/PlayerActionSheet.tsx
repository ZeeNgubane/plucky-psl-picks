import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Player } from '@/data/teams';
import { useTeamLogos } from '@/hooks/use-team-logos';
import { usePlayerStats } from '@/hooks/use-player-stats';
import { ArrowLeftRight, Info } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player | null;
  onSubstitute: () => void;
  onMoreInfo: () => void;
}

const POS_LABEL: Record<string, string> = { GK: 'GK', DEF: 'DEF', MID: 'MID', FWD: 'FWD' };

export function normalizePos(p?: string | null): string {
  const s = (p || '').toLowerCase();
  if (s === 'gk' || s === 'goalkeeper') return 'GK';
  if (s === 'def' || s === 'defender') return 'DEF';
  if (s === 'mid' || s === 'midfielder') return 'MID';
  if (s === 'fwd' || s === 'forward') return 'FWD';
  return (p || '').toUpperCase();
}

const PlayerActionSheet = ({ open, onOpenChange, player, onSubstitute, onMoreInfo }: Props) => {
  const logos = useTeamLogos();
  const { current, currentGameweek } = usePlayerStats(player?.id);

  if (!player) return null;
  const pos = normalizePos(player.position);

  const statLines: { label: string; value: number }[] = [
    { label: 'Goals', value: current?.goals ?? 0 },
    { label: 'Assists', value: current?.assists ?? 0 },
    { label: 'Minutes', value: current?.minutes_played ?? 0 },
    { label: 'Clean sheet', value: current?.clean_sheets ?? 0 },
    { label: 'Bonus', value: current?.bonus_points ?? 0 },
    { label: 'Yellow cards', value: current?.yellow_cards ?? 0 },
    { label: 'Red cards', value: current?.red_cards ?? 0 },
  ].filter((s) => s.value > 0);

  const gwPoints = current?.total_points ?? Number(player.gw_points) ?? 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 rounded-t-2xl border-t border-emerald-500/20 bg-slate-900 text-white h-auto max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-white/25" />
        </div>

        <div className="px-4 pb-4 space-y-4">
          {/* Identity */}
          <div className="flex items-center gap-3">
            {logos[player.team] && (
              <img src={logos[player.team]} alt={player.team} className="h-9 w-9 object-contain" />
            )}
            <div className="min-w-0">
              <SheetTitle className="text-base font-bold text-white truncate">{player.name}</SheetTitle>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold">
                  {POS_LABEL[pos] || pos}
                </span>
                <span className="truncate">{player.team}</span>
              </div>
            </div>
          </div>

          {/* GW points headline */}
          <div className="rounded-xl bg-slate-800/70 border border-white/10 py-4 text-center">
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              Gameweek {currentGameweek ?? ''} Points
            </div>
            <div className="text-5xl font-black text-emerald-400 leading-tight">{gwPoints}</div>
          </div>

          {/* Stat breakdown */}
          {statLines.length > 0 ? (
            <div className="rounded-xl bg-slate-800/50 border border-white/10 divide-y divide-white/5">
              {statLines.map((s) => (
                <div key={s.label} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="text-white/70">{s.label}</span>
                  <span className="font-bold text-white">{s.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-white/50">No stats recorded this gameweek.</p>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              className="h-11 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={onMoreInfo}
            >
              <Info className="h-4 w-4 mr-1.5" /> More Info
            </Button>
            <Button className="h-11 bg-emerald-500 text-slate-900 hover:bg-emerald-400" onClick={onSubstitute}>
              <ArrowLeftRight className="h-4 w-4 mr-1.5" /> Substitute
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlayerActionSheet;
