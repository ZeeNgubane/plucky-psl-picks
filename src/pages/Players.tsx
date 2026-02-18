import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { Player } from '@/data/teams';
import { usePlayersFromDB, useTeamsFromDB } from '@/hooks/usePlayersFromDB';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const { data: players = [] } = usePlayersFromDB();
  const { data: teams = [] } = useTeamsFromDB();

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-red-100 text-red-800 border-red-200';
      case 'DEF': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MID': return 'bg-green-100 text-green-800 border-green-200';
      case 'FWD': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTeamLogo = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    return team?.logo || 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
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
      const matchesPosition = positionFilter === 'all' || !positionFilter || player.position === positionFilter;
      const matchesTeam = teamFilter === 'all' || !teamFilter || player.team === teamFilter;
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
    <div className="min-h-screen bg-white">
      {/* PSL Header Section */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://www.psl.co.za/media/10983/psl-logo-gold.png" 
                alt="PSL Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0JZOmbEBlLE_lP0SKjIaxOfpF4DvC3bZoQ&s';
                }}
              />
              <div>
                <h1 className="text-3xl font-bold">Betway Premiership</h1>
                <p className="text-red-100">Players Database</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">2024/25 Season</div>
              <div className="font-bold text-lg">{filteredPlayers.length} Players</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span>Tournaments</span>
            <span>/</span>
            <span className="text-red-600 font-medium">Betway Premiership</span>
            <span>/</span>
            <span className="text-red-600 font-medium">Players</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tournament Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-red-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{teams.length}</div>
              <div className="text-sm text-gray-600">Teams</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{players.length}</div>
              <div className="text-sm text-gray-600">Total Players</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{players.filter(p => p.position === 'FWD').length}</div>
              <div className="text-sm text-gray-600">Forwards</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{players.filter(p => p.position === 'GK').length}</div>
              <div className="text-sm text-gray-600">Goalkeepers</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Filter className="h-5 w-5" />
              <span>Filter Players</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search players or teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="GK">Goalkeeper</SelectItem>
                  <SelectItem value="DEF">Defender</SelectItem>
                  <SelectItem value="MID">Midfielder</SelectItem>
                  <SelectItem value="FWD">Forward</SelectItem>
                </SelectContent>
              </Select>

              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60">
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.name}>
                      <div className="flex items-center space-x-2">
                        <img 
                          src={getTeamLogo(team.name)} 
                          alt={team.name} 
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
                          }}
                        />
                        <span>{team.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="points">Points (High to Low)</SelectItem>
                  <SelectItem value="price">Price (High to Low)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="team">Team (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md border">
                Results: <span className="font-semibold text-red-600 ml-1">{filteredPlayers.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Player</TableHead>
                    <TableHead className="font-semibold text-gray-900">Position</TableHead>
                    <TableHead className="font-semibold text-gray-900">Team</TableHead>
                    <TableHead className="font-semibold text-gray-900">Value</TableHead>
                    <TableHead className="font-semibold text-gray-900">Points</TableHead>
                    <TableHead className="font-semibold text-gray-900">Recent Form</TableHead>
                    <TableHead className="font-semibold text-gray-900">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player, index) => {
                    const formTrend = getFormTrend(player.form);
                    return (
                      <TableRow key={player.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <TableCell className="font-medium text-gray-900">{player.name}</TableCell>
                        <TableCell>
                          <Badge className={`${getPositionColor(player.position)} border font-medium`}>
                            {player.position}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={getTeamLogo(player.team)} 
                              alt={player.team} 
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
                              }}
                            />
                            <span className="text-gray-900">{player.team}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          R{(player.price * 18).toFixed(1)}M
                        </TableCell>
                        <TableCell className="font-bold text-blue-600">
                          {player.points}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {player.form.slice(-5).map((score, index) => (
                              <span 
                                key={index} 
                                className={`text-xs px-2 py-1 rounded font-medium ${
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
                          {formTrend === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
                          {formTrend === 'down' && <TrendingDown className="h-5 w-5 text-red-500" />}
                          {formTrend === 'stable' && <span className="text-gray-400 text-sm">—</span>}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Official Betway Premiership Player Database | Season 2024/25</p>
        </div>
      </div>
    </div>
  );
};

export default Players;
