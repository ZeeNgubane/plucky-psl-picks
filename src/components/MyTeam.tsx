
import MyTeamSummary from "./MyTeamSummary";
import PlayerLineupList from "./PlayerLineupList";
import FormationPitch from "./FormationPitch";
import { Player } from "@/data/teams";
import SubstitutesBench from "./SubstitutesBench";

interface MyTeamProps {
  selectedPlayers: Player[];
}

// --- Formation logic to determine starting XI ---
const FORMATIONS = [
    { name: "4-4-2", def: 4, mid: 4, fwd: 2, layout: [ { label: 'FWD', count: 2 }, { label: 'MID', count: 4 }, { label: 'DEF', count: 4 }, { label: 'GK', count: 1 }, ] },
    { name: "4-3-3", def: 4, mid: 3, fwd: 3, layout: [ { label: 'FWD', count: 3 }, { label: 'MID', count: 3 }, { label: 'DEF', count: 4 }, { label: 'GK', count: 1 }, ] },
    { name: "3-5-2", def: 3, mid: 5, fwd: 2, layout: [ { label: 'FWD', count: 2 }, { label: 'MID', count: 5 }, { label: 'DEF', count: 3 }, { label: 'GK', count: 1 }, ] },
    { name: "3-4-3", def: 3, mid: 4, fwd: 3, layout: [ { label: 'FWD', count: 3 }, { label: 'MID', count: 4 }, { label: 'DEF', count: 3 }, { label: 'GK', count: 1 }, ] },
    { name: "4-2-3-1", def: 4, mid: 5, fwd: 1, layout: [ { label: 'FWD', count: 1 }, { label: 'MID', count: 3 }, { label: 'MID', count: 2 }, { label: 'DEF', count: 4 }, { label: 'GK', count: 1 }, ], },
    { name: "5-3-2", def: 5, mid: 3, fwd: 2, layout: [ { label: 'FWD', count: 2 }, { label: 'MID', count: 3 }, { label: 'DEF', count: 5 }, { label: 'GK', count: 1 }, ] },
];

function pickFormation(def: number, mid: number, fwd: number) {
  const perfect = FORMATIONS.find(f => f.def === def && f.mid === mid && f.fwd === fwd);
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


const MyTeam = ({ selectedPlayers }: MyTeamProps) => {
  // Organize players by position for the Squad List (unchanged logic)
  const formationGroups = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD')
  };

  const bestFormation = pickFormation(
    formationGroups.DEF.length,
    formationGroups.MID.length,
    formationGroups.FWD.length
  );

  const startingPlayerIds = new Set<string>();
  const indexer = { FWD: 0, MID: 0, DEF: 0, GK: 0 };

  bestFormation.layout.forEach(row => {
      const position = row.label as keyof typeof indexer;
      for (let i = 0; i < row.count; i++) {
          const player = formationGroups[position]?.[indexer[position]];
          if (player) {
              startingPlayerIds.add(player.id);
          }
          indexer[position]++;
      }
  });

  const startingPlayers = selectedPlayers.filter(p => startingPlayerIds.has(p.id));
  const substitutePlayers = selectedPlayers.filter(p => !startingPlayerIds.has(p.id));

  return (
    <div className="space-y-6">
      <MyTeamSummary selectedPlayers={selectedPlayers} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <SubstitutesBench substitutes={substitutePlayers} />
        </div>
        <div className="lg:col-span-2">
          <FormationPitch selectedPlayers={startingPlayers} />
        </div>
      </div>
      
      <PlayerLineupList formationGroups={formationGroups} />
    </div>
  );
};

export default MyTeam;
