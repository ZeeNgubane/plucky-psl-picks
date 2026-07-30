import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Search, Plus, Minus, ChevronLeft, ChevronRight, Info, Loader2 } from 'lucide-react';
import { Player } from '@/data/teams';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTeamLogos } from '@/hooks/use-team-logos';

interface TransfersProps {
  selectedPlayers: Player[];
  onPlayerAdd: (player: Player) => void;
  onPlayerRemove: (playerId: string) => void;
  budget: number;
}

const PLAYERS_PER_PAGE = 25;

const Transfers = ({ selectedPlayers, onPlayerAdd, onPlayerRemove, budget }: TransfersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [sortBy, setSortBy] = useState('total_points');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const logoMap = useTeamLogos();

  const { data: allPlayers = [], isLoading } = useQuery({
    queryKey: ['players-transfers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*');
      if (error) throw error;
      return (data || []) as unknown as Player[];
    },
  });

  const teams = [...new Set(allPlayers.map(p => p.team))].filter(Boolean).sort();

  const getPositionColor = (position: string) => {
    const pos = position?.toLowerCase();
    if (pos === 'gk' || pos === 'goalkeeper') return 'bg-amber-400/15 text-amber-300 border border-amber-400/30';
    if (pos === 'def' || pos === 'defender') return 'bg-sky-400/15 text-sky-300 border border-sky-400/30';
    if (pos === 'mid' || pos === 'midfielder') return 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30';
    if (pos === 'fwd' || pos === 'forward') return 'bg-rose-400/15 text-rose-300 border border-rose-400/30';
    return 'bg-muted text-muted-foreground';
  };

  const getPositionLabel = (position: string) => {
    const pos = position?.toLowerCase();
    if (pos === 'goalkeeper') return 'GK';
    if (pos === 'defender') return 'DEF';
    if (pos === 'midfielder') return 'MID';
    if (pos === 'forward') return 'FWD';
    return position;
  };

  const filteredPlayers = allPlayers
    .filter(player => {
      const matchesSearch = (player.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (player.team || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'all' ||
        player.position?.toLowerCase() === positionFilter.toLowerCase();
      const matchesTeam = teamFilter === 'all' || player.team === teamFilter;
      return matchesSearch && matchesPosition && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return (Number(b.price) || 0) - (Number(a.price) || 0);
        case 'total_points': return (Number(b.total_points) || 0) - (Number(a.total_points) || 0);
        case 'name': return (a.name || '').localeCompare(b.name || '');
        default: return (Number(b.total_points) || 0) - (Number(a.total_points) || 0);
      }
    });

  const totalPages = Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE);
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * PLAYERS_PER_PAGE,
    currentPage * PLAYERS_PER_PAGE
  );

  const handleFilterChange = (setter: (val: string) => void) => (val: string) => {
    setter(val);
    setCurrentPage(1);
  };

  const isPlayerSelected = (playerId: number) =>
    selectedPlayers.some(p => p.id === playerId);

  const canAddPlayer = (player: Player) => {
    if (isPlayerSelected(player.id)) return false;
    if (budget < (Number(player.price) || 0)) return false;
    const positionCount = selectedPlayers.filter(p =>
      p.position?.toLowerCase() === player.position?.toLowerCase()
    ).length;
    const maxByPosition: Record<string, number> = {
      gk: 2, goalkeeper: 2,
      def: 5, defender: 5,
      mid: 5, midfielder: 5,
      fwd: 3, forward: 3,
    };
    const max = maxByPosition[player.position?.toLowerCase()] || 0;
    return positionCount < max && selectedPlayers.length < 15;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="ds-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="relative col-span-2 md:col-span-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 h-9 text-sm"
              />
            </div>
            <Select value={positionFilter} onValueChange={handleFilterChange(setPositionFilter)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Position" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={handleFilterChange(setTeamFilter)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Team" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Sort" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="total_points">Points</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">Budget:</span>
              <span className="font-semibold text-primary">R{(budget * 18).toFixed(1)}M</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="ds-card overflow-hidden">
        <CardContent className="p-0">
          <ul className="divide-y divide-border/60 overflow-x-hidden">
            {paginatedPlayers.map((player) => {
              const selected = isPlayerSelected(player.id);
              const canAdd = canAddPlayer(player);

              return (
                <li
                  key={player.id}
                  className={`flex w-full items-center gap-2 px-3 py-2 ${selected ? 'bg-primary/10' : ''}`}
                >
                  {logoMap[player.team] ? (
                    <img
                      src={logoMap[player.team]}
                      alt={player.team}
                      className="h-7 w-7 shrink-0 object-contain"
                    />
                  ) : (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">
                      {(player.team || '?').slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-[13px] font-bold text-foreground">{player.name}</span>
                      <button
                        onClick={() => setSelectedPlayer(player)}
                        aria-label={`Info about ${player.name}`}
                        className="shrink-0 text-muted-foreground hover:text-primary"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {player.team} · {getPositionLabel(player.position)}
                    </p>
                  </div>

                  <div className="shrink-0 text-right leading-tight">
                    <p className="text-[12px] font-semibold text-foreground tabular-nums">
                      {player.price ? `R${(Number(player.price) * 18).toFixed(1)}M` : '—'}
                    </p>
                    <p className="text-[10px] text-primary tabular-nums">{player.total_points || 0} pts</p>
                  </div>

                  {selected ? (
                    <button
                      onClick={() => onPlayerRemove(String(player.id))}
                      aria-label={`Remove ${player.name}`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-destructive/50 bg-destructive/20 text-destructive-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onPlayerAdd(player)}
                      disabled={!canAdd}
                      aria-label={`Add ${player.name}`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-primary text-primary-foreground disabled:opacity-30"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground">
            {filteredPlayers.length} players · Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              <ChevronLeft className="h-3 w-3 mr-1" />Prev
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
              return (
                <Button key={page} variant={page === currentPage ? 'default' : 'outline'} size="sm" className={`h-7 w-7 text-xs p-0 ${page === currentPage ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`} onClick={() => setCurrentPage(page)}>
                  {page}
                </Button>
              );
            })}
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
              Next<ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={!!selectedPlayer} onOpenChange={(open) => !open && setSelectedPlayer(null)}>
        <DialogContent className="max-w-sm">
          {selectedPlayer && (() => {
            const formVal = Number(selectedPlayer.form) || 0;
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base">
                    {selectedPlayer.name}
                  </DialogTitle>
                  <DialogDescription>{selectedPlayer.team}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-muted p-2.5">
                    <p className="text-[10px] text-muted-foreground uppercase">Position</p>
                    <Badge className={`${getPositionColor(selectedPlayer.position)} mt-1 text-xs`}>
                      {getPositionLabel(selectedPlayer.position)}
                    </Badge>
                  </div>
                  <div className="rounded-md bg-muted p-2.5">
                    <p className="text-[10px] text-muted-foreground uppercase">Value</p>
                    <p className="font-semibold mt-1">
                      {selectedPlayer.price ? `R${(Number(selectedPlayer.price) * 18).toFixed(1)}M` : '—'}
                    </p>
                  </div>
                  <div className="rounded-md bg-muted p-2.5">
                    <p className="text-[10px] text-muted-foreground uppercase">Total Points</p>
                    <p className="font-bold text-lg mt-1">{selectedPlayer.total_points || '0'}</p>
                  </div>
                  <div className="rounded-md bg-muted p-2.5">
                    <p className="text-[10px] text-muted-foreground uppercase">Form</p>
                    <span className={`text-xs px-2 py-1 rounded font-medium mt-1 inline-block ${
                      formVal >= 8 ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30' :
                      formVal >= 6 ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30' :
                      'bg-rose-400/15 text-rose-300 border border-rose-400/30'
                    }`}>
                      {formVal}
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  {isPlayerSelected(selectedPlayer.id) ? (
                    <Button variant="destructive" className="w-full" onClick={() => { onPlayerRemove(String(selectedPlayer.id)); setSelectedPlayer(null); }}>
                      <Minus className="h-4 w-4 mr-2" />Remove from Squad
                    </Button>
                  ) : (
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={!canAddPlayer(selectedPlayer)} onClick={() => { onPlayerAdd(selectedPlayer); setSelectedPlayer(null); }}>
                      <Plus className="h-4 w-4 mr-2" />Add to Squad
                    </Button>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transfers;
