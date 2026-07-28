import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MatchStatRow {
  player_id: string;
  gameweek: number;
  minutes_played: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  yellow_cards: number;
  red_cards: number;
  bonus_points: number;
  total_points: number;
}

/** All match stat rows (small table) — filtered client-side since player ids differ in type. */
export function useAllMatchStats() {
  return useQuery({
    queryKey: ['player-match-stats-all'],
    queryFn: async () => {
      const { data, error } = await supabase.from('player_match_stats').select('*');
      if (error) throw error;
      return (data || []) as unknown as MatchStatRow[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePlayerStats(playerId?: number | string | null) {
  const { data: all = [], isLoading } = useAllMatchStats();
  const rows = all
    .filter((r) => String(r.player_id) === String(playerId ?? ''))
    .sort((a, b) => a.gameweek - b.gameweek);
  const currentGameweek = all.length ? Math.max(...all.map((r) => r.gameweek)) : null;
  const current = currentGameweek ? rows.find((r) => r.gameweek === currentGameweek) : undefined;
  return { rows, current, currentGameweek, isLoading };
}

export function useUpcomingFixtures(team?: string | null) {
  return useQuery({
    queryKey: ['fixtures-upcoming'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fixtures')
        .select('home_team, away_team, match_date, status')
        .order('match_date', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 10,
    select: (data) => {
      if (!team) return [];
      const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const t = norm(team);
      const match = (s: string) => {
        const n = norm(s);
        return n === t || n.includes(t) || t.includes(n);
      };
      return data
        .filter((f) => f.status !== 'completed' && (match(f.home_team) || match(f.away_team)))
        .slice(0, 5)
        .map((f) => ({
          opponent: match(f.home_team) ? f.away_team : f.home_team,
          home: match(f.home_team),
          date: f.match_date as string,
        }));
    },
  });
}
