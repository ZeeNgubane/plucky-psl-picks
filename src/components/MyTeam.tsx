import { useState, useEffect, useMemo } from "react";
import MyTeamSummary from "./MyTeamSummary";
import PlayerLineupList from "./PlayerLineupList";
import FormationPitch from "./FormationPitch";
import { Player } from "@/data/teams";
import SubstitutesBench from "./SubstitutesBench";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";
import { Save } from "lucide-react";

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
  const [starters, setStarters] = useState<Player[]>([]);
  const [subs, setSubs] = useState<Player[]>([]);
  const [playerToSwap, setPlayerToSwap] = useState<Player | null>(null);

  // Organize players by position for the Squad List (unchanged logic)
  const formationGroups = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD')
  };

  const squadIdsString = useMemo(() => 
    JSON.stringify(selectedPlayers.map(p => p.id).sort()),
    [selectedPlayers]
  );

  useEffect(() => {
    if (selectedPlayers.length === 0) {
      setStarters([]);
      setSubs([]);
      return;
    }
    
    const savedStarterIdsStr = localStorage.getItem('fantasy-starter-ids');
    const savedSquadIdsStr = localStorage.getItem('fantasy-squad-ids');

    let loadedFromSave = false;
    if (savedStarterIdsStr && savedSquadIdsStr) {
      try {
        if (squadIdsString === savedSquadIdsStr) {
            const savedStarterIds = new Set(JSON.parse(savedStarterIdsStr));
            setStarters(selectedPlayers.filter(p => savedStarterIds.has(p.id)));
            setSubs(selectedPlayers.filter(p => !savedStarterIds.has(p.id)));
            loadedFromSave = true;
        }
      } catch (e) {
        console.error("Failed to parse saved team data", e);
        localStorage.removeItem('fantasy-starter-ids');
        localStorage.removeItem('fantasy-squad-ids');
      }
    }

    if (loadedFromSave) return;

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

    setStarters(selectedPlayers.filter(p => startingPlayerIds.has(p.id)));
    setSubs(selectedPlayers.filter(p => !startingPlayerIds.has(p.id)));
  }, [selectedPlayers, squadIdsString]);
  
  const handlePlayerClick = (clickedPlayer: Player) => {
    if (!playerToSwap) {
      setPlayerToSwap(clickedPlayer);
      toast("Player selected", {
        description: `Select another player to swap with ${clickedPlayer.name}.`,
      });
      return;
    }

    if (playerToSwap.id === clickedPlayer.id) {
      setPlayerToSwap(null);
      toast("Swap cancelled.");
      return;
    }

    if (playerToSwap.position !== clickedPlayer.position) {
      toast.error("Invalid Swap", {
        description: "Players must have the same position.",
      });
      setPlayerToSwap(null);
      return;
    }

    const isFirstPlayerStarter = starters.some(p => p.id === playerToSwap.id);
    const isSecondPlayerStarter = starters.some(p => p.id === clickedPlayer.id);

    if (isFirstPlayerStarter === isSecondPlayerStarter) {
      toast.error("Invalid Swap", {
        description: "Select one player from the pitch and one from the bench.",
      });
      setPlayerToSwap(null);
      return;
    }

    const newStarters = isFirstPlayerStarter
      ? starters.filter(p => p.id !== playerToSwap.id).concat(clickedPlayer)
      : starters.filter(p => p.id !== clickedPlayer.id).concat(playerToSwap);

    const newSubs = isFirstPlayerStarter
      ? subs.filter(p => p.id !== clickedPlayer.id).concat(playerToSwap)
      : subs.filter(p => p.id !== playerToSwap.id).concat(clickedPlayer);

    setStarters(newStarters);
    setSubs(newSubs);
    setPlayerToSwap(null);
    toast.success("Swap Successful!", {
      description: `${playerToSwap.name} and ${clickedPlayer.name} have been swapped.`,
    });
  };

  const handleSaveTeam = () => {
    try {
      const squadIds = selectedPlayers.map(p => p.id).sort();
      localStorage.setItem('fantasy-squad-ids', JSON.stringify(squadIds));
      localStorage.setItem('fantasy-starter-ids', JSON.stringify(starters.map(p => p.id)));
      toast.success("Team Saved!", { description: "Your squad lineup has been saved." });
    } catch (error) {
      console.error("Failed to save team:", error);
      toast.error("Could not save team lineup.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <MyTeamSummary selectedPlayers={selectedPlayers} />
        <Button onClick={handleSaveTeam}>
          <Save className="mr-2 h-4 w-4" />
          Save Team
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <SubstitutesBench 
            substitutes={subs} 
            onPlayerClick={handlePlayerClick}
            playerToSwap={playerToSwap}
          />
        </div>
        <div className="lg:col-span-2">
          <FormationPitch 
            selectedPlayers={starters} 
            onPlayerClick={handlePlayerClick}
            playerToSwap={playerToSwap}
          />
        </div>
      </div>
      
      <PlayerLineupList formationGroups={formationGroups} />
    </div>
  );
};

export default MyTeam;
