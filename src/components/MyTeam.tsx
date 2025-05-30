

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
            <p className="text-sm text-gray-600">Budget: R{(budget * 18).toFixed(1)}M</p>
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

            {/* Chalk scribblings overlay */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                {/* Tactical arrows and movement lines */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                   refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.7)" />
                  </marker>
                </defs>
                
                {/* Attacking movement arrows */}
                <path d="M 300 600 Q 400 500 500 400" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrowhead)"/>
                <path d="M 700 600 Q 800 500 900 400" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrowhead)"/>
                
                {/* Passing lanes */}
                <path d="M 200 500 Q 300 450 400 500" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="5,5"/>
                <path d="M 800 500 Q 900 450 1000 500" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="5,5"/>
                
                {/* Wing play arrows */}
                <path d="M 150 300 Q 250 200 350 300" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowhead)"/>
                <path d="M 1050 300 Q 950 200 850 300" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowhead)"/>
                
                {/* Central attacking routes */}
                <path d="M 600 500 L 600 350" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
                <path d="M 500 450 Q 550 350 600 300" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3,3"/>
                <path d="M 700 450 Q 650 350 600 300" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3,3"/>
                
                {/* Defensive pressing lines */}
                <line x1="200" y1="400" x2="1000" y2="400" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10,5"/>
                <line x1="150" y1="550" x2="1050" y2="550" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10,5"/>
                
                {/* Crossing arrows */}
                <path d="M 100 250 Q 200 150 300 250" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
                <path d="M 1100 250 Q 1000 150 900 250" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
                
                {/* Quick counter-attack route */}
                <path d="M 600 650 Q 700 500 800 350 Q 850 300 900 250" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="8,6" markerEnd="url(#arrowhead)"/>
                
                {/* Overlapping runs */}
                <path d="M 250 550 Q 180 400 250 250" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="3,6"/>
                <path d="M 950 550 Q 1020 400 950 250" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="3,6"/>
                
                {/* Set piece markings */}
                <circle cx="300" cy="200" r="15" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3,3"/>
                <circle cx="900" cy="200" r="15" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3,3"/>
                
                {/* Pressing triggers */}
                <path d="M 400 350 L 450 300 L 400 250 L 350 300 Z" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                <path d="M 800 350 L 850 300 L 800 250 L 750 300 Z" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
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

