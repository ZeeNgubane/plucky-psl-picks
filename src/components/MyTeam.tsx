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
                      <p className="font-semibold">R{(player.price * 18).toFixed(1)}M</p>
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
                      <p className="font-semibold">R{(player.price * 18).toFixed(1)}M</p>
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
                      <p className="font-semibold">R{(player.price * 18).toFixed(1)}M</p>
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
                      <p className="font-semibold">R{(player.price * 18).toFixed(1)}M</p>
                      <p className="text-sm text-green-600">{player.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Realistic Football Pitch View - Half Vertical Pitch */}
          <div className="mt-8 relative min-h-[600px] max-w-md mx-auto overflow-hidden rounded-lg">
            {/* Football pitch background with realistic lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600 via-green-500 to-green-600">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.12)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            {/* Realistic football pitch lines */}
            <div className="absolute inset-0 opacity-50 pointer-events-none">
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
            {/* Tactical arrows overlay - keep as before */}
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

            {/* Player positions overlay - Vertical formation */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="text-center text-white font-bold text-lg mb-4">Your Formation</div>
              
              {/* Forward line - at top near goal */}
              <div className="flex justify-center space-x-8 mt-8">
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

              {/* Goalkeeper - at bottom */}
              <div className="flex justify-center mb-8">
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
