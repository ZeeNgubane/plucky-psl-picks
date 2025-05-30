
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { Player, players, teams } from '@/data/teams';

interface TransfersProps {
  selectedPlayers: Player[];
  onPlayerAdd: (player: Player) => void;
  onPlayerRemove: (playerId: string) => void;
  budget: number;
}

const Transfers = ({ selectedPlayers, onPlayerAdd, onPlayerRemove, budget }: TransfersProps) => {
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

  return (
    <div className="space-y-6">
      <Card className="border-bronze-200">
        <CardHeader>
          <CardTitle>Player Search & Filters</CardTitle>
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
                <SelectItem value="">All Positions</SelectItem>
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
                <SelectItem value="">All Teams</SelectItem>
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
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              Budget: <span className="font-semibold text-bronze-600 ml-1">R{(budget * 18).toFixed(1)}M</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
                    <div className="text-2xl">{getTeamLogo(player.team)}</div>
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
    </div>
  );
};

export default Transfers;
