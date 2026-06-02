import { Player } from "@/data/teams";
import { useTeamLogos } from "@/hooks/use-team-logos";

const FORMATIONS = [
  { name: "4-4-2", def: 4, mid: 4, fwd: 2, layout: [{ label: "GK", count: 1 }, { label: "DEF", count: 4 }, { label: "MID", count: 4 }, { label: "FWD", count: 2 }] },
  { name: "4-3-3", def: 4, mid: 3, fwd: 3, layout: [{ label: "GK", count: 1 }, { label: "DEF", count: 4 }, { label: "MID", count: 3 }, { label: "FWD", count: 3 }] },
  { name: "3-5-2", def: 3, mid: 5, fwd: 2, layout: [{ label: "GK", count: 1 }, { label: "DEF", count: 3 }, { label: "MID", count: 5 }, { label: "FWD", count: 2 }] },
  { name: "3-4-3", def: 3, mid: 4, fwd: 3, layout: [{ label: "GK", count: 1 }, { label: "DEF", count: 3 }, { label: "MID", count: 4 }, { label: "FWD", count: 3 }] },
  { name: "5-3-2", def: 5, mid: 3, fwd: 2, layout: [{ label: "GK", count: 1 }, { label: "DEF", count: 5 }, { label: "MID", count: 3 }, { label: "FWD", count: 2 }] },
];

function pickFormation(def: number, mid: number, fwd: number) {
  const perfect = FORMATIONS.find((f) => f.def === def && f.mid === mid && f.fwd === fwd);
  if (perfect) return perfect;
  let best = FORMATIONS[0];
  let bestScore = -1;
  FORMATIONS.forEach((f) => {
    const score =
      Math.min(def, f.def) / f.def +
      Math.min(mid, f.mid) / f.mid +
      Math.min(fwd, f.fwd) / (f.fwd || 1);
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  });
  return best;
}

interface FormationPitchProps {
  selectedPlayers: Player[];
  onPlayerClick: (player: Player) => void;
  playerToSwap: Player | null;
  onSlotClick?: (position: string, player: Player | null) => void;
  mode?: 'team' | 'transfers';
}

const PlayerCard = ({
  player,
  label,
  logo,
  isSelected,
  onClick,
}: {
  player: Player | null;
  label: string;
  logo?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const surname = player ? player.name.split(" ").slice(-1)[0].toUpperCase() : "";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center w-[60px] sm:w-[80px] focus:outline-none transition-transform ${
        isSelected ? "scale-105" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center h-[50px] sm:h-[60px] w-full ${
          isSelected ? "ring-2 ring-primary rounded-md" : ""
        }`}
      >
        {player && logo ? (
          <img src={logo} alt={player.team} className="h-full w-auto object-contain drop-shadow-md" />
        ) : (
          <div className="h-full w-[40px] sm:w-[48px] rounded-md bg-white/15 border border-dashed border-white/40 flex items-center justify-center text-white/60 text-xs font-bold">
            {player ? surname.slice(0, 2) : "+"}
          </div>
        )}
      </div>
      <div className="w-full mt-1 rounded-[3px] overflow-hidden bg-[#0a0e27] shadow">
        <div className="text-white text-[10px] sm:text-[11px] font-bold text-center py-[2px] px-1 truncate leading-tight">
          {player ? surname : label}
        </div>
        <div className="bg-[#1a1f3a] text-gray-300 text-[8px] sm:text-[9px] text-center py-[1px] px-1 truncate leading-tight">
          {player ? "SUN (A)" : "—"}
        </div>
      </div>
    </button>
  );
};

const normalizePos = (p?: string | null): string => {
  const s = (p || '').toLowerCase();
  if (s === 'gk' || s === 'goalkeeper') return 'GK';
  if (s === 'def' || s === 'defender') return 'DEF';
  if (s === 'mid' || s === 'midfielder') return 'MID';
  if (s === 'fwd' || s === 'forward') return 'FWD';
  return (p || '').toUpperCase();
};

const FormationPitch = ({ selectedPlayers, onPlayerClick, playerToSwap, onSlotClick, mode: _mode }: FormationPitchProps) => {
  const logos = useTeamLogos();
  const byPos = {
    GK: selectedPlayers.filter((p) => normalizePos(p.position) === "GK"),
    DEF: selectedPlayers.filter((p) => normalizePos(p.position) === "DEF"),
    MID: selectedPlayers.filter((p) => normalizePos(p.position) === "MID"),
    FWD: selectedPlayers.filter((p) => normalizePos(p.position) === "FWD"),
  };

  const formation = pickFormation(byPos.DEF.length, byPos.MID.length, byPos.FWD.length);

  const rows: { label: string; players: (Player | null)[] }[] = [];
  const idx = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  formation.layout.forEach((row) => {
    const players: (Player | null)[] = [];
    for (let i = 0; i < row.count; i++) {
      const key = row.label as keyof typeof idx;
      players.push(byPos[key][idx[key]] || null);
      idx[key]++;
    }
    rows.push({ label: row.label, players });
  });

  return (
    <div className="relative w-full mx-auto rounded-xl overflow-hidden" style={{ aspectRatio: "3 / 4", maxWidth: "480px" }}>
      {/* Pitch background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a6b2a 0%, #2d9e42 40%, #2d9e42 60%, #1a6b2a 100%)",
        }}
      />

      {/* Edge fade into app background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Pitch markings (white borders, no fill) */}
      <div className="absolute inset-[3%] border-2 border-white/70 rounded-sm pointer-events-none">
        {/* Halfway line */}
        <div className="absolute left-0 right-0 top-1/2 border-t-2 border-white/70" />
        {/* Centre circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] aspect-square rounded-full border-2 border-white/70" />
        {/* Centre spot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80" />
        {/* Top penalty box */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[55%] h-[18%] border-2 border-t-0 border-white/70" />
        {/* Top goal box */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[28%] h-[8%] border-2 border-t-0 border-white/70" />
        {/* Bottom penalty box */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[55%] h-[18%] border-2 border-b-0 border-white/70" />
        {/* Bottom goal box */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[28%] h-[8%] border-2 border-b-0 border-white/70" />
      </div>

      {/* Formation pill */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
        {formation.name}
      </div>

      {/* Players grid */}
      <div className="absolute inset-0 flex flex-col justify-around py-6 px-2 z-[1]">
        {rows.map((row, ri) => (
          <div key={ri} className="flex justify-around items-center">
            {row.players.map((p, pi) => (
              <PlayerCard
                key={p?.id || `${row.label}-${pi}`}
                player={p}
                label={row.label}
                logo={p ? logos[p.team] : undefined}
                isSelected={!!(p && playerToSwap && p.id === playerToSwap.id)}
                onClick={() => {
                  if (onSlotClick) onSlotClick(row.label, p);
                  else if (p) onPlayerClick(p);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationPitch;
