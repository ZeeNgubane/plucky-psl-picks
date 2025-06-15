import { Player } from "@/data/teams";

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
      {/* Player positions overlay - Standard Formation Lanes */}
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="text-center text-white font-bold text-lg mb-4">
          Your Formation: <span className="ml-1">{bestFormation.name}</span>
        </div>
        {playerLines.map((line, i) => (
          <div
            key={i}
            className={`flex justify-center space-x-4`}
            style={{
              minHeight: 0,
              marginTop: i === 0 ? '1.5rem' : undefined,
              marginBottom: i === playerLines.length - 1 ? '1.5rem' : undefined,
            }}
          >
            {line.players.map((player, idx) => (
              player ? (
                <div key={player?.id || idx} className="text-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-1
                      ${
                        line.label === 'GK' ? 'bg-yellow-600 text-white'
                        : line.label === 'DEF' ? 'bg-blue-600 text-white'
                        : line.label === 'MID' ? 'bg-green-600 text-white'
                        : line.label === 'FWD' ? 'bg-red-600 text-white'
                        : 'bg-gray-600 text-white'
                      }
                    `}
                  >
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                    {player.name.split(' ')[0]}
                  </div>
                </div>
              ) : (
                <div key={idx} className="text-center opacity-40">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-1
                      ${
                        line.label === 'GK' ? 'bg-yellow-800'
                        : line.label === 'DEF' ? 'bg-blue-800'
                        : line.label === 'MID' ? 'bg-green-800'
                        : line.label === 'FWD' ? 'bg-red-800'
                        : 'bg-gray-700'
                      }
                    `}
                  >
                    ...
                  </div>
                  <div className="text-xs text-white bg-black/40 px-2 py-1 rounded">
                    {line.label}
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationPitch;
