
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { players, teams, Player } from '@/data/teams';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [sortBy, setSortBy] = useState('points');

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-yellow-100 text-yellow-800';
      case 'DEF': return 'bg-blue-100 text-blue-800';
      case 'MID': return 'bg-green-100 text-green-800';
      case 'FWD': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTeamLogo = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    return team?.logo || '⚽';
  };

  const getFormTrend = (form: number[]) => {
    if (form.length < 2) return null;
    const recent = form.slice(-2);
    if (recent[1] > recent[0]) return 'up';
    if (recent[1] < recent[0]) return 'down';
    return 'stable';
  };

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !positionFilter || player.position === positionFilter;
      const matchesTeam = !teamFilter || player.team === teamFilter;
      return matchesSearch && matchesPosition && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'points': return b.points - a.points;
        case 'name': return a.name.localeCompare(b.name);
        case 'team': return a.team.localeCompare(b.team);
        default: return b.points - a.points;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-200/30 via-transparent to-gray-600/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">DSTV Premiership Players</h1>
            <p className="text-gray-600">Complete player database with stats and team information</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search & Filter Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="GK">Goalkeeper</SelectItem>
                    <SelectItem value="DEF">Defender</SelectItem>
                    <SelectItem value="MID">Midfielder</SelectItem>
                    <SelectItem value="FWD">Forward</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.name}>
                        {team.logo} {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-gray-600 flex items-center">
                  Total Players: <span className="font-semibold text-bronze-600 ml-1">{filteredPlayers.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Form</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => {
                    const formTrend = getFormTrend(player.form);
                    return (
                      <TableRow key={player.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>
                          <Badge className={getPositionColor(player.position)}>
                            {player.position}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getTeamLogo(player.team)}</span>
                            <span>{player.team}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-bronze-600">
                          R{(player.price * 18).toFixed(1)}M
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {player.points}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {player.form.map((score, index) => (
                              <span 
                                key={index} 
                                className={`text-xs px-1 py-0.5 rounded ${
                                  score >= 8 ? 'bg-green-100 text-green-800' :
                                  score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                {score}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formTrend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {formTrend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                          {formTrend === 'stable' && <span className="text-gray-400">-</span>}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Players;
