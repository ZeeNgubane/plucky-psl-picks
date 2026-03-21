import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Loader2 } from 'lucide-react';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [sortBy, setSortBy] = useState('total_points');

  const { data: players = [], isLoading, error } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return data;
    },
  });

  const teams = [...new Set(players.map(p => p.team))].filter(Boolean).sort();

  const getPositionColor = (position: string) => {
    const pos = position?.toLowerCase();
    if (pos === 'gk' || pos === 'goalkeeper') return 'bg-red-100 text-red-800 border-red-200';
    if (pos === 'def' || pos === 'defender') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (pos === 'mid' || pos === 'midfielder') return 'bg-green-100 text-green-800 border-green-200';
    if (pos === 'fwd' || pos === 'forward') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPositionLabel = (position: string) => {
    const pos = position?.toLowerCase();
    if (pos === 'goalkeeper') return 'GK';
    if (pos === 'defender') return 'DEF';
    if (pos === 'midfielder') return 'MID';
    if (pos === 'forward') return 'FWD';
    return position;
  };

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.team?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !positionFilter || positionFilter === 'all' ||
                              player.position?.toLowerCase() === positionFilter.toLowerCase();
      const matchesTeam = !teamFilter || teamFilter === 'all' || player.team === teamFilter;
      return matchesSearch && matchesPosition && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return (Number(b.price) || 0) - (Number(a.price) || 0);
        case 'total_points': return (Number(b.total_points) || 0) - (Number(a.total_points) || 0);
        case 'name': return (a.name || '').localeCompare(b.name || '');
        case 'team': return (a.team || '').localeCompare(b.team || '');
        default: return (Number(b.total_points) || 0) - (Number(a.total_points) || 0);
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600 font-medium">Failed to load players. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://www.psl.co.za/media/10983/psl-logo-gold.png"
                alt="PSL Logo"
                className="h-16 w-auto"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0JZOmbEBlLE_lP0SKjIaxOfpF4DvC3bZoQ&s'; }}
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

      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span><span>/</span>
            <span className="text-red-600 font-medium">Betway Premiership</span><span>/</span>
            <span className="text-red-600 font-medium">Players</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
              <div className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.position?.toLowerCase() === 'forward' || p.position?.toLowerCase() === 'fwd').length}
              </div>
              <div className="text-sm text-gray-600">Forwards</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.position?.toLowerCase() === 'goalkeeper' || p.position?.toLowerCase() === 'gk').length}
              </div>
              <div className="text-sm text-gray-600">Goalkeepers</div>
            </CardContent>
          </Card>
        </div>

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
                  className="pl-10 border-gray-300 focus:border-red-500"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger><SelectValue placeholder="All Positions" /></SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="defender">Defender</SelectItem>
                  <SelectItem value="midfielder">Midfielder</SelectItem>
                  <SelectItem value="forward">Forward</SelectItem>
                </SelectContent>
              </Select>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger><SelectValue placeholder="All Teams" /></SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="total_points">Points (High to Low)</SelectItem>
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

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Player</TableHead>
                    <TableHead className="font-semibold text-gray-900">Position</TableHead>
                    <TableHead className="font-semibold text-gray-900">Team</TableHead>
                    <TableHead className="font-semibold text-gray-900">Price</TableHead>
                    <TableHead className="font-semibold text-gray-900">Total Points</TableHead>
                    <TableHead className="font-semibold text-gray-900">GW Points</TableHead>
                    <TableHead className="font-semibold text-gray-900">Form</TableHead>
                    <TableHead className="font-semibold text-gray-900">Selected By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player, index) => (
                    <TableRow key={player.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <TableCell className="font-medium text-gray-900">{player.name}</TableCell>
                      <TableCell>
                        <Badge className={`${getPositionColor(player.position)} border font-medium`}>
                          {getPositionLabel(player.position)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">{player.team}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {player.price ? `R${Number(player.price).toFixed(1)}M` : '—'}
                      </TableCell>
                      <TableCell className="font-bold text-blue-600">{player.total_points || '0'}</TableCell>
                      <TableCell className="font-bold text-purple-600">{player.gw_points || '0'}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          Number(player.form) >= 8 ? 'bg-green-100 text-green-800' :
                          Number(player.form) >= 6 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {player.form || '0'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {player.selection_percentage ? `${player.selection_percentage}%` : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Official Betway Premiership Player Database | Season 2024/25</p>
        </div>
      </div>
    </div>
  );
};

export default Players;
