export interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  gw_points: string | null;
  total_points: string | null;
  form: string | null;
  selection_percentage: number | null;
  price: number | null;
  price_change: number | null;
  created_at?: string;
}

export function getTeamName(player: Player): string {
  return player.team || '';
}
