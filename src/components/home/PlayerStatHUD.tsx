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
    if (d === 'up') return <ArrowUp className="h-3 w-3 text-[#00d4ff]" />;
    if (d === 'down') return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-gray-500" />;
  };

  return (
    <div
      className="rounded-xl p-4 pb-6 font-mono text-white"
      style={{ backgroundColor: '#0a0e1a', border: '1px solid #1e3a5f' }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#00d4ff] text-center">GW Points</p>
      <p className="text-4xl font-bold text-white text-center my-2 tabular-nums">{gwPoints}</p>

      <div className="space-y-1.5 text-xs border-t border-[#1e3a5f] pt-3 mt-2">
        <div className="flex justify-between">
          <span className="text-gray-400">League Rank</span>
          <span className="text-white tabular-nums">#{leagueRank}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Squad Value</span>
          <span className="text-white tabular-nums">R{Math.round(squadValue).toLocaleString()}M</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Bank</span>
          <span className="text-white tabular-nums">R{Math.round(bank).toLocaleString()}M</span>
        </div>
      </div>

      <div className="border-t border-[#1e3a5f] mt-3 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-gray-400">Form L5</span>
          <div className="flex items-center gap-0.5">
            {form.map((d, i) => (
              <FormArrow key={i} d={d} />
            ))}
          </div>
          <span className={`text-xs tabular-nums ${trend >= 0 ? 'text-[#00d4ff]' : 'text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}
          </span>
        </div>
      </div>

      <div className="border-t border-[#1e3a5f] mt-3 pt-3 flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#00d4ff]">Total Points</span>
        <span className="text-lg font-bold text-[#00d4ff] tabular-nums">{totalPoints.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PlayerStatHUD;
