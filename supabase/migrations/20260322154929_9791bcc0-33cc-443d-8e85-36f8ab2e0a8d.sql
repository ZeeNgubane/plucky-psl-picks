
-- Drop foreign keys referencing players(id)
ALTER TABLE public.performer_likes DROP CONSTRAINT IF EXISTS performer_likes_player_id_fkey;
ALTER TABLE public.player_match_stats DROP CONSTRAINT IF EXISTS player_match_stats_player_id_fkey;
ALTER TABLE public.user_team_selections DROP CONSTRAINT IF EXISTS user_team_selections_player_id_fkey;

-- Drop the old players table and recreate with new schema
DROP TABLE IF EXISTS public.players CASCADE;

CREATE TABLE public.players (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  position text NOT NULL,
  team text NOT NULL,
  gw_points text,
  total_points text,
  form text,
  selection_percentage numeric,
  price numeric,
  price_change numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Re-enable RLS
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players are viewable by everyone"
  ON public.players FOR SELECT
  TO public
  USING (true);
