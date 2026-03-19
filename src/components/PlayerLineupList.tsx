
import { Player } from "@/data/teams";

interface PlayerLineupListProps {
  formationGroups: {
    GK: Player[];
    DEF: Player[];
    MID: Player[];
    FWD: Player[];
  };
}

const roleData = [
  { label: "Goalkeepers", key: "GK", max: 2, color: "bg-yellow-500" },
  { label: "Defenders", key: "DEF", max: 5, color: "bg-blue-500" },
  { label: "Midfielders", key: "MID", max: 5, color: "bg-green-500" },
  { label: "Forwards", key: "FWD", max: 3, color: "bg-red-500" },
];

const PlayerLineupList = ({ formationGroups }: PlayerLineupListProps) => (
  <div className="space-y-6">
    {roleData.map((role) => (
      <div key={role.key}>
        <h3 className="font-semibold mb-3 flex items-center">
          <span className={`w-3 h-3 ${role.color} rounded-full mr-2`}></span>
          {role.label} ({formationGroups[role.key as keyof typeof formationGroups].length}/{role.max})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {formationGroups[role.key as keyof typeof formationGroups].map(player => (
            <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-sm text-gray-600">{player.teams?.name || ''}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">R{(player.price * 18).toFixed(1)}M</p>
                <p className="text-sm text-green-600">{player.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default PlayerLineupList;
