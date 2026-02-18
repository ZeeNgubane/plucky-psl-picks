import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Minus, TrendingUp, TrendingDown, Filter, Grid, List } from 'lucide-react';
import { Player } from '@/data/teams';
import { usePlayersFromDB, useTeamsFromDB } from '@/hooks/usePlayersFromDB';

interface TransfersProps {
  selectedPlayers: Player[];
  onPlayerAdd: (player: Player) => void;
  onPlayerRemove: (playerId: string) => void;
  budget: number;
}

const Transfers = ({ selectedPlayers, onPlayerAdd, onPlayerRemove, budget }: TransfersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const { data: players = [] } = usePlayersFromDB();
  const { data: teams = [] } = useTeamsFromDB();

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
    return team?.logo || 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
  };

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
      const matchesTeam = teamFilter === 'all' || player.team === teamFilter;
      return matchesSearch && matchesPosition && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'points': return b.points - a.points;
        case 'name': return a.name.localeCompare(b.name);
        default: return b.points - a.points;
      }
    });

  const isPlayerSelected = (playerId: string) => {
    return selectedPlayers.some(p => p.id === playerId);
  };

  const canAddPlayer = (player: Player) => {
    if (isPlayerSelected(player.id)) return false;
    if (budget < player.price) return false;
    
    const positionCount = selectedPlayers.filter(p => p.position === player.position).length;
    const maxByPosition = { GK: 2, DEF: 5, MID: 5, FWD: 3 };
    
    return positionCount < maxByPosition[player.position] && selectedPlayers.length < 15;
  };

  const getFormTrend = (form: number[]) => {
    if (form.length < 2) return null;
    const recent = form.slice(-2);
    if (recent[1] > recent[0]) return 'up';
    if (recent[1] < recent[0]) return 'down';
    return 'stable';
  };

  // Properly filter teams to ensure no empty names or invalid data
  const validTeams = teams.filter(team => 
    team && 
    team.name && 
    typeof team.name === 'string' && 
    team.name.trim() !== '' &&
    team.id
  );

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card className="border-l-4 border-l-red-600">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-gray-900">{validTeams.length}</div>
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
  );

  const renderFilters = () => (
    <Card className="border-bronze-200 mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Player Search & Filters</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="bg-bronze-600 hover:bg-bronze-700"
            >
              <Grid className="h-4 w-4 mr-1" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="bg-bronze-600 hover:bg-bronze-700"
            >
              <List className="h-4 w-4 mr-1" />
              Table
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
              {validTeams.map(team => (
                <SelectItem key={team.id} value={team.name}>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="w-4 h-4 object-contain"
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
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-600 flex items-center">
            Budget: <span className="font-semibold text-bronze-600 ml-1">R{(budget * 18).toFixed(1)}M</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md border">
            Results: <span className="font-semibold text-bronze-600 ml-1">{filteredPlayers.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCardView = () => (
    <div className="grid gap-4">
      {filteredPlayers.map(player => {
        const selected = isPlayerSelected(player.id);
        const canAdd = canAddPlayer(player);
        const formTrend = getFormTrend(player.form);
        
        return (
          <Card key={player.id} className={`border-bronze-200 transition-all hover:shadow-md ${selected ? 'ring-2 ring-bronze-400' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={getTeamLogo(player.team)} 
                    alt={player.team} 
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
                    }}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{player.name}</h3>
                      <Badge className={getPositionColor(player.position)}>
                        {player.position}
                      </Badge>
                      {formTrend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {formTrend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                    </div>
                    <p className="text-sm text-gray-600">{player.team}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium text-bronze-600">R{(player.price * 18).toFixed(1)}M</span>
                      <span className="text-sm font-medium text-green-600">{player.points} points</span>
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
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {selected ? (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onPlayerRemove(player.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onPlayerAdd(player)}
                      disabled={!canAdd}
                      className="bg-bronze-600 hover:bg-bronze-700 disabled:bg-gray-300"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderTableView = () => (
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
                <TableHead className="font-semibold text-gray-900">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.map((player, index) => {
                const formTrend = getFormTrend(player.form);
                const selected = isPlayerSelected(player.id);
                const canAdd = canAddPlayer(player);
                
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
                    <TableCell>
                      {selected ? (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => onPlayerRemove(player.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Minus className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => onPlayerAdd(player)}
                          disabled={!canAdd}
                          className="bg-bronze-600 hover:bg-bronze-700 disabled:bg-gray-300"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderStatsCards()}
      {renderFilters()}
      {viewMode === 'cards' ? renderCardView() : renderTableView()}
    </div>
  );
};

export default Transfers;
