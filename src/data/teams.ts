// Shared Player type matching the Supabase players table with team join
export interface Player {
  id: string;
  created_at?: string;
  name: string;
  position: string;
  team_id: string;
  points: number;
  form: number;
  price: number;
  image_url?: string | null;
  nationality?: string | null;
  teams?: {
    id: string;
    name: string;
    short_name: string | null;
    logo_url: string | null;
  } | null;
}

// Helper to get team name from a player
export const getTeamName = (player: Player): string => player.teams?.name || '';
export const getTeamLogo = (player: Player): string => player.teams?.logo_url || '';
