import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface PlayerStatHUDProps {
  gwPoints?: number;
  leagueRank?: number;
  squadValue?: number;
  bank?: number;
  totalPoints?: number;
  form?: Array<'up' | 'down' | 'neutral'>;
  trend?: number;
}

const PlayerStatHUD = ({
  gwPoints = 0,
  leagueRank = 4,
  squadValue = 99.5,
  bank = 0.5,
  totalPoints = 1089,
  form = ['up', 'up', 'down', 'neutral', 'up'],
  trend = 12,
}: PlayerStatHUDProps) => {
  const FormArrow = ({ d }: { d: 'up' | 'down' | 'neutral' }) => {
    if (d === 'up') return <ArrowUp className="h-3 w-3 text-primary" />;
    if (d === 'down') return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div
      className="ds-card p-4 pb-6 font-mono text-foreground"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-primary text-center">GW Points</p>
      <p className="text-4xl font-bold text-white text-center my-2 tabular-nums">{gwPoints}</p>

      <div className="space-y-1.5 text-xs border-t border-[hsl(var(--border))] pt-3 mt-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">League Rank</span>
          <span className="text-white tabular-nums">#{leagueRank}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Squad Value</span>
          <span className="text-white tabular-nums">R{Math.round(squadValue).toLocaleString()}M</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Bank</span>
          <span className="text-white tabular-nums">R{Math.round(bank).toLocaleString()}M</span>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--border))] mt-3 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Form L5</span>
          <div className="flex items-center gap-0.5">
            {form.map((d, i) => (
              <FormArrow key={i} d={d} />
            ))}
          </div>
          <span className={`text-xs tabular-nums ${trend >= 0 ? 'text-primary' : 'text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}
          </span>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--border))] mt-3 pt-3 flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary">Total Points</span>
        <span className="text-lg font-bold text-primary tabular-nums">{totalPoints.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PlayerStatHUD;
