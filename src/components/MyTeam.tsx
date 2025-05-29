import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Player } from '@/data/teams';

interface MyTeamProps {
  selectedPlayers: Player[];
  budget: number;
}

const MyTeam = ({ selectedPlayers, budget }: MyTeamProps) => {
  const formation = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD')
  };

  const totalValue = selectedPlayers.reduce((sum, player) => sum + player.price, 0);
  const totalPoints = selectedPlayers.reduce((sum, player) => sum + player.points, 0);

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-yellow-500';
      case 'DEF': return 'bg-blue-500';
      case 'MID': return 'bg-green-500';
      case 'FWD': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Team Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bronze-600">
              ${totalValue.toFixed(1)}M
            </div>
            <p className="text-sm text-gray-600">Budget: ${budget.toFixed(1)}M</p>
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

      <Card className="border-bronze-200">
        <CardHeader>
          <CardTitle>Formation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Goalkeepers */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Goalkeepers ({formation.GK.length}/2)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formation.GK.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${player.price}M</p>
                      <p className="text-sm text-green-600">{player.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defenders */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Defenders ({formation.DEF.length}/5)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {formation.DEF.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${player.price}M</p>
                      <p className="text-sm text-green-600">{player.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Midfielders */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Midfielders ({formation.MID.length}/5)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {formation.MID.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${player.price}M</p>
                      <p className="text-sm text-green-600">{player.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forwards */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Forwards ({formation.FWD.length}/3)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {formation.FWD.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${player.price}M</p>
                      <p className="text-sm text-green-600">{player.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTeam;
