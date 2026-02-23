import { Player } from "@/data/teams";
import PitchBackground from "./PitchBackground";
import PitchArrows from "./PitchArrows";
import PlayerIcon from "./PlayerIcon";

// --- Formation mapping and utility ---
const FORMATIONS = [
  {
    name: "4-4-2",
    def: 4,
    mid: 4,
    fwd: 2,
    layout: [
      { label: 'FWD', count: 2 },
      { label: 'MID', count: 4 },
      { label: 'DEF', count: 4 },
      { label: 'GK', count: 1 },
    ]
  },
  {
    name: "4-3-3",
    def: 4,
    mid: 3,
    fwd: 3,
    layout: [
      { label: 'FWD', count: 3 },
      { label: 'MID', count: 3 },
      { label: 'DEF', count: 4 },
      { label: 'GK', count: 1 },
    ]
  },
  {
    name: "3-5-2",
    def: 3,
    mid: 5,
    fwd: 2,
    layout: [
      { label: 'FWD', count: 2 },
      { label: 'MID', count: 5 },
      { label: 'DEF', count: 3 },
      { label: 'GK', count: 1 },
    ]
  },
  {
    name: "3-4-3",
    def: 3,
    mid: 4,
    fwd: 3,
    layout: [
      { label: 'FWD', count: 3 },
      { label: 'MID', count: 4 },
      { label: 'DEF', count: 3 },
      { label: 'GK', count: 1 },
    ]
  },
  {
    name: "4-2-3-1",
    def: 4,
    mid: 5,
    fwd: 1,
    layout: [
      { label: 'FWD', count: 1 },
      { label: 'MID', count: 3 },
      { label: 'MID', count: 2 },
      { label: 'DEF', count: 4 },
      { label: 'GK', count: 1 },
    ],
  },
  {
    name: "5-3-2",
    def: 5,
    mid: 3,
    fwd: 2,
    layout: [
      { label: 'FWD', count: 2 },
      { label: 'MID', count: 3 },
      { label: 'DEF', count: 5 },
      { label: 'GK', count: 1 },
    ]
  },
];

// Find the best formation for current selection
function pickFormation(def: number, mid: number, fwd: number) {
  const perfect = FORMATIONS.find(f =>
    f.def === def && f.mid === mid && f.fwd === fwd
  );
  if (perfect) return perfect;

  let best = FORMATIONS[0];
  let bestScore = -1;
  FORMATIONS.forEach(f => {
    let score = 0;
    score += Math.min(def, f.def) / f.def;
    score += Math.min(mid, f.mid) / f.mid;
    score += Math.min(fwd, f.fwd) / (f.fwd || 1);
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
}

// Updated: function to map each row label to Y%
function getRowYPositions(lineLabels: string[]) {
  // SVG pitch: 0 (top) to 600 (bottom)
  const PENALTY_BOX_Y = 140;    // Goalkeeper line
  const HALF_WAY_Y = 550;       // Forwards line
  const DEFENDERS_EXTRA_UP = 60; // How far "up" from GK we put defenders

  const n = lineLabels.length;

  // If we have only two lines (GK/FWD), just do penalty box and halfway
  if (n <= 2) {
    return lineLabels.map((label) =>
      label === "GK" ? PENALTY_BOX_Y
      : label === "FWD" ? HALF_WAY_Y
      : (PENALTY_BOX_Y + HALF_WAY_Y) / 2
    );
  }

  // Find indexes for each line
  const idxGK = lineLabels.findIndex(l => l === "GK");
  const idxDEF = lineLabels.findIndex(l => l === "DEF");
  const idxMID = lineLabels.findIndex(l => l === "MID");
  const idxFWD = lineLabels.findIndex(l => l === "FWD");

  // We'll assign positions:
  // GK: stays at penalty box
  // DEF: farther from GK, but not too close (PENALTY_BOX_Y + DEFENDERS_EXTRA_UP)
  // MID: between DEF and FWD
  // FWD: halfway line

  return lineLabels.map((label, i) => {
    if (label === "GK") return PENALTY_BOX_Y;
    if (label === "FWD") return HALF_WAY_Y;
    if (label === "DEF") {
      // Fixed offset up from GK toward MID/FWD
      // Place defenders well above the GK line (toward midfield)
      return PENALTY_BOX_Y + DEFENDERS_EXTRA_UP;
    }
    if (label === "MID") {
      // Position midfielders proportionally between DEF and FWD
      const yDEF = PENALTY_BOX_Y + DEFENDERS_EXTRA_UP;
      return yDEF + (HALF_WAY_Y - yDEF) * 0.5;
    }
    // If any other line, distribute linearly in-between
    const y0 = PENALTY_BOX_Y + DEFENDERS_EXTRA_UP;
    const y1 = HALF_WAY_Y;
    const t = (i - 2) / (n - 3); // For any additional lines
    return y0 + (y1 - y0) * t;
  });
}

const FormationPitch = ({ selectedPlayers, onPlayerClick, playerToSwap }: FormationPitchProps) => {
  const byPos = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD'),
  };

  const bestFormation = pickFormation(
    byPos.DEF.length,
    byPos.MID.length,
    byPos.FWD.length
  );

  const playerLines: { players: (Player | null)[], label: string }[] = [];
  let indexer = { FWD: 0, MID: 0, DEF: 0, GK: 0 };
  bestFormation.layout.forEach(row => {
    const arr: (Player | null)[] = [];
    for (let i = 0; i < row.count; i++) {
      const player = byPos[row.label as keyof typeof byPos]?.[indexer[row.label as keyof typeof byPos]] || null;
      arr.push(player);
      indexer[row.label as keyof typeof byPos]++;
    }
    playerLines.push({ players: arr, label: row.label });
  });

  const allPlayersOnPitch = playerLines.flatMap(line => line.players).filter((p): p is Player => p !== null);

  // REVERSE the order here (so FWD is first, then MID, DEF, GK last)
  const reversedPlayerLines = [...playerLines].reverse();

  // Adjust all below references for playerLines to use reversedPlayerLines
  const yPositions = getRowYPositions(reversedPlayerLines.map(l => l.label));
  const minX = 70, maxX = 330; // For horizontal placement inside the pitch

  return (
    <div className="mt-6 relative min-h-[600px] max-w-md mx-auto overflow-hidden rounded-xl shadow-2xl border border-emerald-600/30">
      <PitchBackground />
      <PitchArrows />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600">
        {/* Formation badge */}
        <rect x="145" y="8" width="110" height="26" rx="13" fill="rgba(0,0,0,0.5)" />
        <text x="200" y="26" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700" letterSpacing="1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
          {bestFormation.name}
        </text>
        {/* Players in formation */}
        {reversedPlayerLines.map((line, rowIdx) => {
          const y = yPositions[rowIdx];
          const n = line.players.length;
          // Horizontal spacing for n players
          const xs = n === 1
            ? [200]
            : Array.from({length: n}, (_, i) =>
                minX + ((maxX - minX) * i) / (n - 1)
              );
          return line.players.map((player, i) => {
            const isSelected = player && playerToSwap && player.id === playerToSwap.id;
            return (
              <g
                key={player?.id || `empty-${i}-${line.label}`}
                onClick={() => player && onPlayerClick(player)}
                className="cursor-pointer"
                style={{ outline: "none" }}
              >
                {isSelected && (
                   <circle cx={xs[i]} cy={y} r="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="4" >
                     <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite"/>
                   </circle>
                )}
                <PlayerIcon
                  player={player}
                  x={xs[i]}
                  y={y}
                  label={line.label}
                />
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};

export default FormationPitch;
