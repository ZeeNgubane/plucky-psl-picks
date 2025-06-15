import { Player } from "@/data/teams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMinus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubstitutesBenchProps {
  substitutes: Player[];
  onPlayerClick: (player: Player) => void;
  playerToSwap: Player | null;
}

const positionOrder: { [key: string]: number } = {
  GK: 1,
  DEF: 2,
  MID: 3,
  FWD: 4,
};

const SubstitutesBench = ({ substitutes, onPlayerClick, playerToSwap }: SubstitutesBenchProps) => {
  const sortedSubstitutes = [...substitutes].sort((a, b) => {
    return positionOrder[a.position] - positionOrder[b.position];
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Substitutes</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedSubstitutes.length > 0 ? (
          <div className="space-y-3">
            {sortedSubstitutes.map((player) => (
              <div 
                key={player.id} 
                className={cn(
                  "flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer transition-all",
                  playerToSwap?.id === player.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:bg-gray-100'
                )}
                onClick={() => onPlayerClick(player)}
              >
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-gray-600">{player.team} - {player.position}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R{(player.price * 18).toFixed(1)}M</p>
                  <p className="text-sm text-green-600">{player.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-8">
            <UserMinus className="h-10 w-10 mb-2" />
            <p className="font-medium">No Substitutes</p>
            <p className="text-sm">Your bench is empty.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubstitutesBench;
