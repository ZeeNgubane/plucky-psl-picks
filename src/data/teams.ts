// Shared Player type matching the real Supabase players table
export interface Player {
  id: number | string;
  created_at?: string;
  Name?: string;
  name?: string;
  position: string;
  team: string;
  "GW points"?: string | null;
  "total points"?: string | null;
  form?: string | number | null;
  selection_percentage?: number | null;
  price?: number | null;
  price_change?: number | null;
  points?: number;
}

// Empty arrays for backwards compatibility
export const players: Player[] = [];
export const teams: { id: string; name: string; logo?: string; kitImage?: string }[] = [];

// Helper functions for backwards compatibility
export const getTeamName = (teamId: string): string => teamId;
export const getTeamLogo = (teamName: string): string =>
  `https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png`;
