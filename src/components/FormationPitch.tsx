import { Player } from "@/data/teams";
import { User } from "lucide-react";

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

const FormationPitch = ({ selectedPlayers }: FormationPitchProps) => {
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

  // REVERSE the order here (so FWD is first, then MID, DEF, GK last)
  const reversedPlayerLines = [...playerLines].reverse();

  // Adjust all below references for playerLines to use reversedPlayerLines
  const yPositions = getRowYPositions(reversedPlayerLines.map(l => l.label));
  const minX = 70, maxX = 330; // For horizontal placement inside the pitch

  return (
    <div className="mt-8 relative min-h-[600px] max-w-md mx-auto overflow-hidden rounded-lg">
      {/* Football pitch background with realistic lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-600 via-green-500 to-green-600">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.12)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        {/* SVG of pitch */}
        <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
          {/* Outer boundary - Half pitch */}
          <rect x="50" y="50" width="300" height="500" fill="none" stroke="white" strokeWidth="4"/>
          {/* Center circle (half only) */}
          <path d="M200 550 m-80,0 a80,80 0 0,1 160,0" fill="none" stroke="white" strokeWidth="4"/>
          {/* Center spot */}
          <circle cx="200" cy="550" r="6" fill="white"/>
          {/* Halfway line */}
          <line x1="50" y1="550" x2="350" y2="550" stroke="white" strokeWidth="3"/>
          {/* Penalty area (18-yard box) */}
          <rect x="100" y="50" width="200" height="120" fill="none" stroke="white" strokeWidth="3"/>
          {/* 6-yard box */}
          <rect x="150" y="50" width="100" height="60" fill="none" stroke="white" strokeWidth="3"/>
          {/* Penalty spot */}
          <circle cx="200" cy="140" r="4" fill="white"/>
          {/* Penalty arc */}
          <path d="M170 170 A30 30 0 0 1 230 170" fill="none" stroke="white" strokeWidth="3"/>
          {/* Corner arcs */}
          <path d="M50 50 A30 30 0 0 1 80 80" fill="none" stroke="white" strokeWidth="3"/>
          <path d="M350 50 A30 30 0 0 0 320 80" fill="none" stroke="white" strokeWidth="3"/>
          {/* Goal (top middle) */}
          <rect x="175" y="42" width="50" height="8" fill="white"/>
        </svg>
      </div>
      {/* Tactical arrows overlay (unchanged) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.7)" />
            </marker>
          </defs>
          
          {/* Attacking movement arrows */}
          <path d="M 150 450 Q 200 350 250 250" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrowhead)"/>
          <path d="M 250 450 Q 200 350 150 250" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrowhead)"/>
          
          {/* Wing play arrows */}
          <path d="M 80 400 Q 120 300 160 200" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowhead)"/>
          <path d="M 320 400 Q 280 300 240 200" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowhead)"/>
          
          {/* Central attacking route */}
          <path d="M 200 400 L 200 200" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
          
          {/* Pressing lines */}
          <line x1="80" y1="300" x2="320" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10,5"/>
          <line x1="80" y1="450" x2="320" y2="450" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10,5"/>
        </svg>
      </div>
      {/* Player positions overlay, now positioned with SVG coordinates */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 600">
        {/* Formation name */}
        <text x="200" y="25" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="bold" style={{ textShadow: "0 1px 6px #082" }}>
          Your Formation: {bestFormation.name}
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
            // Determine background color per position
            const bg =
              line.label === "GK" ? "#facc15"
              : line.label === "DEF" ? "#3b82f6"
              : line.label === "MID" ? "#22c55e"
              : line.label === "FWD" ? "#ef4444"
              : "#888";
            return (
              <g key={player?.id || `empty-${i}-${line.label}`}>
                {/* Draw background circle as before, but faded if empty */}
                <circle
                  cx={xs[i]}
                  cy={y}
                  r={28}
                  fill={bg}
                  opacity={player ? "1" : "0.5"}
                  stroke="#fff"
                  strokeWidth="3"
                />
                {/* Human face icon in place of text/initials */}
                <g
                  transform={`translate(${xs[i] - 18}, ${y - 18})`}
                >
                  <User
                    size={36}
                    color="#fff"
                    strokeWidth={2.2}
                    style={{ opacity: player ? 1 : 0.6 }}
                  />
                </g>
                {/* Player initials over the icon (placeholder, keep as before) */}
                <text
                  x={xs[i]}
                  y={y + 24}
                  textAnchor="middle"
                  fontWeight="bold"
                  fontSize="14"
                  fill="#fff"
                  opacity={player ? "0.95" : "0.65"}
                  style={{ textShadow: "0 1px 3px #0007" }}
                >
                  {player
                    ? player.name.split(' ').map(n=>n[0]).join('')
                    : ''
                  }
                </text>
                {/* Player first name or position */}
                <text
                  x={xs[i]}
                  y={y + 38}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#fff"
                  opacity="0.85"
                >
                  {player
                    ? player.name.split(' ')[0]
                    : line.label
                  }
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};

export default FormationPitch;
