
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Users } from 'lucide-react';

const League = () => {
  const leagueTable = [
    { rank: 1, manager: 'Soccer Master', team: 'Amakhosi United', points: 1247, icon: '👑' },
    { rank: 2, manager: 'Bafana Boss', team: 'Pirates Pride', points: 1198, icon: '🥈' },
    { rank: 3, manager: 'Sundowns Supporter', team: 'Masandawana FC', points: 1156, icon: '🥉' },
    { rank: 4, manager: 'You', team: 'My Dream Team', points: 1089, icon: '⭐' },
    { rank: 5, manager: 'PSL Prophet', team: 'Goal Getters', points: 1034, icon: '🔥' },
    { rank: 6, manager: 'Midfield Maestro', team: 'City Slickers', points: 987, icon: '🎯' },
    { rank: 7, manager: 'Defence Dynamo', team: 'Clean Sheets', points: 956, icon: '🛡️' },
    { rank: 8, manager: 'Strike Force', team: 'Goal Machine', points: 923, icon: '⚽' },
    { rank: 9, manager: 'Tactical Genius', team: 'Formation FC', points: 891, icon: '🧠' },
    { rank: 10, manager: 'Penalty Pro', team: 'Spot Kick Specialists', points: 867, icon: '🎯' }
  ];

  const weeklyWinners = [
    { week: 'GW 15', manager: 'Bafana Boss', points: 89 },
    { week: 'GW 14', manager: 'Soccer Master', points: 94 },
    { week: 'GW 13', manager: 'You', points: 76 },
    { week: 'GW 12', manager: 'PSL Prophet', points: 82 }
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-bronze-500" />;
    return <span className="text-gray-500 font-semibold">#{rank}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-bronze-600" />
              League Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Managers:</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Your Rank:</span>
                <span className="font-semibold text-bronze-600">#4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Points Behind:</span>
                <span className="font-semibold text-red-600">158</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Current Leader
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl mb-1">👑</div>
              <p className="font-semibold">Soccer Master</p>
              <p className="text-sm text-gray-600">Amakhosi United</p>
              <p className="text-lg font-bold text-bronze-600">1,247 pts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-bronze-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-500" />
              Latest GW Winner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl mb-1">🥈</div>
              <p className="font-semibold">Bafana Boss</p>
              <p className="text-sm text-gray-600">GW 15 Winner</p>
              <p className="text-lg font-bold text-green-600">89 pts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-bronze-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-bronze-600" />
                League Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leagueTable.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      entry.manager === 'You' 
                        ? 'bg-bronze-50 border border-bronze-200' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankBadge(entry.rank)}
                      </div>
                      <div className="text-2xl">{entry.icon}</div>
                      <div>
                        <p className={`font-medium ${entry.manager === 'You' ? 'text-bronze-700' : ''}`}>
                          {entry.manager}
                        </p>
                        <p className="text-sm text-gray-600">{entry.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{entry.points.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-bronze-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Medal className="h-5 w-5 mr-2 text-bronze-600" />
                Recent GW Winners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyWinners.map((winner, index) => (
                  <div key={winner.week} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium text-sm">{winner.week}</p>
                      <p className="text-xs text-gray-600">{winner.manager}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{winner.points}</p>
                      <p className="text-xs text-gray-500">pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-bronze-200 mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Prizes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">🥇 1st Place</span>
                  <span className="font-semibold text-yellow-600">R5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🥈 2nd Place</span>
                  <span className="font-semibold text-gray-500">R2,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🥉 3rd Place</span>
                  <span className="font-semibold text-bronze-600">R1,000</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Winner</span>
                  <span className="font-semibold text-green-600">R500</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default League;
