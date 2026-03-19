// Shared Player type matching the real Supabase players table
export interface Player {
  id: number;
  created_at?: string;
  Name: string;
  position: string;
  team: string;
  "GW points"?: string | null;
  "total points"?: string | null;
  form?: string | null;
  selection_percentage?: number | null;
  price?: number | null;
  price_change?: number | null;
  // Legacy fields for backwards compatibility with UI components
  name?: string; // alias for Name
  points?: number;
}

// Empty teams array for backwards compatibility
export const teams: { id: string; name: string; logo?: string; kitImage?: string }[] = [];

