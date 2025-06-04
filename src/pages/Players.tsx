
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
      case 'GK': return 'bg-yellow-900 text-yellow-200';
      case 'DEF': return 'bg-blue-900 text-blue-200';
      case 'MID': return 'bg-green-900 text-green-200';
      case 'FWD': return 'bg-red-900 text-red-200';
      default: return 'bg-gray-700 text-gray-200';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-800/10 to-gray-600/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-700/30 via-transparent to-gray-900/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">DSTV Premiership Players</h1>
            <p className="text-gray-300">Complete player database with stats and team information</p>
          </div>

          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Search & Filter Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Positions</SelectItem>
                    <SelectItem value="GK" className="text-white hover:bg-gray-700">Goalkeeper</SelectItem>
                    <SelectItem value="DEF" className="text-white hover:bg-gray-700">Defender</SelectItem>
                    <SelectItem value="MID" className="text-white hover:bg-gray-700">Midfielder</SelectItem>
                    <SelectItem value="FWD" className="text-white hover:bg-gray-700">Forward</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Teams</SelectItem>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.name} className="text-white hover:bg-gray-700">
                        {team.logo} {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="points" className="text-white hover:bg-gray-700">Points</SelectItem>
                    <SelectItem value="price" className="text-white hover:bg-gray-700">Price</SelectItem>
                    <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
                    <SelectItem value="team" className="text-white hover:bg-gray-700">Team</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-gray-300 flex items-center">
                  Total Players: <span className="font-semibold text-bronze-400 ml-1">{filteredPlayers.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">Player</TableHead>
                    <TableHead className="text-gray-200">Position</TableHead>
                    <TableHead className="text-gray-200">Team</TableHead>
                    <TableHead className="text-gray-200">Price</TableHead>
                    <TableHead className="text-gray-200">Points</TableHead>
                    <TableHead className="text-gray-200">Form</TableHead>
                    <TableHead className="text-gray-200">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => {
                    const formTrend = getFormTrend(player.form);
                    return (
                      <TableRow key={player.id} className="hover:bg-gray-700 border-gray-700">
                        <TableCell className="font-medium text-white">{player.name}</TableCell>
                        <TableCell>
                          <Badge className={getPositionColor(player.position)}>
                            {player.position}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getTeamLogo(player.team)}</span>
                            <span className="text-gray-200">{player.team}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-bronze-400">
                          R{(player.price * 18).toFixed(1)}M
                        </TableCell>
                        <TableCell className="font-medium text-green-400">
                          {player.points}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {player.form.map((score, index) => (
                              <span 
                                key={index} 
                                className={`text-xs px-1 py-0.5 rounded ${
                                  score >= 8 ? 'bg-green-900 text-green-200' :
                                  score >= 6 ? 'bg-yellow-900 text-yellow-200' :
                                  'bg-red-900 text-red-200'
                                }`}
                              >
                                {score}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formTrend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                          {formTrend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
                          {formTrend === 'stable' && <span className="text-gray-500">-</span>}
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
