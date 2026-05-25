import { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Minus, Loader2 } from 'lucide-react';
import { Player } from '@/data/teams';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTeamLogos } from '@/hooks/use-team-logos';

interface PlayerPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: string | null; // GK | DEF | MID | FWD
  selectedPlayers: Player[];
  budget: number;
  onPlayerAdd: (player: Player) => void;
  onPlayerRemove: (playerId: string) => void;
}

const POSITION_LABELS: Record<string, string> = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
};

const POSITION_COLORS: Record<string, string> = {
  GK: 'bg-yellow-100 text-yellow-800',
  DEF: 'bg-blue-100 text-blue-800',
  MID: 'bg-green-100 text-green-800',
  FWD: 'bg-red-100 text-red-800',
};

const MAX_BY_POSITION: Record<string, number> = { GK: 2, DEF: 5, MID: 5, FWD: 3 };

function normalizePos(p?: string | null): string {
  const s = (p || '').toLowerCase();
  if (s === 'gk' || s === 'goalkeeper') return 'GK';
  if (s === 'def' || s === 'defender') return 'DEF';
  if (s === 'mid' || s === 'midfielder') return 'MID';
  if (s === 'fwd' || s === 'forward') return 'FWD';
  return (p || '').toUpperCase();
}

const PlayerPickerSheet = ({
  open,
  onOpenChange,
  position,
  selectedPlayers,
  budget,
  onPlayerAdd,
  onPlayerRemove,
}: PlayerPickerSheetProps) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'price' | 'name'>('points');
  const logos = useTeamLogos();

  const { data: allPlayers = [], isLoading } = useQuery({
    queryKey: ['players-picker'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return (data || []) as unknown as Player[];
    },
  });

  const filtered = useMemo(() => {
    return allPlayers
      .filter((p) => (position ? normalizePos(p.position) === position : true))
      .filter((p) => {
        const q = search.toLowerCase();
        return (
          (p.name || '').toLowerCase().includes(q) ||
          (p.team || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price') return (Number(b.price) || 0) - (Number(a.price) || 0);
        if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
        return (Number(b.total_points) || 0) - (Number(a.total_points) || 0);
      });
  }, [allPlayers, position, search, sortBy]);

  const isSelected = (id: number) => selectedPlayers.some((p) => p.id === id);

  const canAdd = (player: Player) => {
    if (isSelected(player.id)) return false;
    if (budget < (Number(player.price) || 0)) return false;
    const pos = normalizePos(player.position);
    const count = selectedPlayers.filter((p) => normalizePos(p.position) === pos).length;
    return count < (MAX_BY_POSITION[pos] || 0) && selectedPlayers.length < 15;
  };

  const handlePick = (player: Player) => {
    if (isSelected(player.id)) {
      onPlayerRemove(String(player.id));
    } else {
      onPlayerAdd(player);
    }
    onOpenChange(false);
  };

  const title = position ? `Select ${POSITION_LABELS[position] || position}` : 'Select Player';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[80vh] p-0 flex flex-col rounded-t-2xl"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-muted-foreground/40" />
        </div>

        <SheetHeader className="px-4 pb-3 shrink-0">
          <SheetTitle className="text-left">{title}</SheetTitle>
        </SheetHeader>

        {/* Search + sort */}
        <div className="px-4 pb-3 flex items-center gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name or team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="h-9 w-[110px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="price">Value</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No players found.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((player) => {
                const selected = isSelected(player.id);
                const addable = canAdd(player);
                const pos = normalizePos(player.position);
                return (
                  <li
                    key={player.id}
                    className={`flex items-center gap-2 px-2 min-h-[48px] py-2 ${
                      selected ? 'bg-bronze-50' : ''
                    }`}
                  >
                    <Badge className={`${POSITION_COLORS[pos] || 'bg-gray-100 text-gray-800'} text-[10px] px-1.5 py-0 leading-tight shrink-0`}>
                      {pos}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{player.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {logos[player.team] && (
                          <img src={logos[player.team]} alt={player.team} className="h-3.5 w-3.5 object-contain" />
                        )}
                        <span className="truncate">{player.team}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 mr-2">
                      <div className="text-xs font-medium">
                        {player.price ? `R${(Number(player.price) * 18).toFixed(1)}M` : '—'}
                      </div>
                      <div className="text-[11px] font-bold">{player.total_points || '0'} pts</div>
                    </div>
                    {selected ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 px-2 shrink-0"
                        onClick={() => handlePick(player)}
                      >
                        <Minus className="h-3.5 w-3.5 mr-1" />Remove
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="h-8 px-2 shrink-0 bg-bronze-600 hover:bg-bronze-700 disabled:bg-gray-300"
                        disabled={!addable}
                        onClick={() => handlePick(player)}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />Add
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlayerPickerSheet;
