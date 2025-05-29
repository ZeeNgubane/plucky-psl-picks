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

          {/* Football Pitch View */}
          <div className="mt-8 relative min-h-[400px] overflow-hidden rounded-lg">
            {/* Football pitch background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-600">
              {/* Grass texture overlay */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            
            {/* Pitch lines overlay */}
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                {/* Outer boundary */}
                <rect x="50" y="50" width="1100" height="700" fill="none" stroke="white" strokeWidth="4"/>
                
                {/* Center circle */}
                <circle cx="600" cy="400" r="120" fill="none" stroke="white" strokeWidth="4"/>
                <circle cx="600" cy="400" r="8" fill="white"/>
                
                {/* Center line */}
                <line x1="600" y1="50" x2="600" y2="750" stroke="white" strokeWidth="4"/>
                
                {/* Left goal area */}
                <rect x="50" y="300" width="80" height="200" fill="none" stroke="white" strokeWidth="4"/>
                <rect x="50" y="250" width="200" height="300" fill="none" stroke="white" strokeWidth="4"/>
                <path d="M 250 350 A 120 120 0 0 1 250 450" fill="none" stroke="white" strokeWidth="4"/>
                
                {/* Right goal area */}
                <rect x="1070" y="300" width="80" height="200" fill="none" stroke="white" strokeWidth="4"/>
                <rect x="950" y="250" width="200" height="300" fill="none" stroke="white" strokeWidth="4"/>
                <path d="M 950 350 A 120 120 0 0 0 950 450" fill="none" stroke="white" strokeWidth="4"/>
                
                {/* Corner arcs */}
                <path d="M 50 50 Q 80 50 80 80" fill="none" stroke="white" strokeWidth="4"/>
                <path d="M 1150 50 Q 1120 50 1120 80" fill="none" stroke="white" strokeWidth="4"/>
                <path d="M 50 750 Q 80 750 80 720" fill="none" stroke="white" strokeWidth="4"/>
                <path d="M 1150 750 Q 1120 750 1120 720" fill="none" stroke="white" strokeWidth="4"/>
                
                {/* Goal posts */}
                <rect x="45" y="350" width="10" height="100" fill="white"/>
                <rect x="1145" y="350" width="10" height="100" fill="white"/>
              </svg>
            </div>

            {/* Player positions overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="text-center text-white font-bold text-lg mb-4">Your Formation</div>
              
              {/* Forward line */}
              <div className="flex justify-center space-x-8">
                {formation.FWD.map((player, index) => (
                  <div key={player.id} className="text-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                      {player.name.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Midfield line */}
              <div className="flex justify-center space-x-6">
                {formation.MID.map((player, index) => (
                  <div key={player.id} className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                      {player.name.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Defense line */}
              <div className="flex justify-center space-x-4">
                {formation.DEF.map((player, index) => (
                  <div key={player.id} className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                      {player.name.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Goalkeeper */}
              <div className="flex justify-center">
                {formation.GK.slice(0, 1).map((player, index) => (
                  <div key={player.id} className="text-center">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                      {player.name.split(' ')[0]}
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
