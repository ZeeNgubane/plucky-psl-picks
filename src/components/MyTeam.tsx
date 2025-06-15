import MyTeamSummary from "./MyTeamSummary";
import PlayerLineupList from "./PlayerLineupList";
import FormationPitch from "./FormationPitch";
import { Player } from "@/data/teams";

interface MyTeamProps {
  selectedPlayers: Player[];
  budget: number;
}

const MyTeam = ({ selectedPlayers }: MyTeamProps) => {
  // Organize players by position for the Squad List (unchanged logic)
  const formationGroups = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD')
  };

  return (
    <div className="space-y-6">
      <MyTeamSummary selectedPlayers={selectedPlayers} />
      <PlayerLineupList formationGroups={formationGroups} />
      <FormationPitch selectedPlayers={selectedPlayers} />
    </div>
  );
};

export default MyTeam;
