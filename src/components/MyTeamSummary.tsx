
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Player } from '@/data/teams';

interface MyTeamSummaryProps {
  selectedPlayers: Player[];
}

const MyTeamSummary = ({ selectedPlayers }: MyTeamSummaryProps) => {
  const totalValue = selectedPlayers.reduce((sum, player) => sum + player.price, 0);
  const totalPoints = selectedPlayers.reduce((sum, player) => sum + player.points, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Team Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-bronze-600">
            R{(totalValue * 18).toFixed(1)}M
          </div>
          <p className="text-sm text-gray-600">Budget: R100M</p>
        </CardContent>
      </Card>
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Total Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
          <p className="text-sm text-gray-600">This season</p>
        </CardContent>
      </Card>
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{selectedPlayers.length}/15</div>
          <p className="text-sm text-gray-600">Squad size</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTeamSummary;
