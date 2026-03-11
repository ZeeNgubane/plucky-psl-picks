
-- Fixtures/Results table
CREATE TABLE public.fixtures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team text NOT NULL,
  away_team text NOT NULL,
  home_score integer,
  away_score integer,
  match_date date NOT NULL,
  match_time text,
  venue text,
  status text NOT NULL DEFAULT 'upcoming',
  matchday integer,
  season text DEFAULT '2025/26',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(home_team, away_team, match_date)
);

ALTER TABLE public.fixtures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fixtures are viewable by everyone"
  ON public.fixtures FOR SELECT
  TO public
  USING (true);

-- Standings table
CREATE TABLE public.standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  played integer NOT NULL DEFAULT 0,
  wins integer NOT NULL DEFAULT 0,
  draws integer NOT NULL DEFAULT 0,
  losses integer NOT NULL DEFAULT 0,
  goals_for integer NOT NULL DEFAULT 0,
  goals_against integer NOT NULL DEFAULT 0,
  goal_difference integer NOT NULL DEFAULT 0,
  points integer NOT NULL DEFAULT 0,
  form text[] DEFAULT '{}',
  season text DEFAULT '2025/26',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(team_name, season)
);

ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Standings are viewable by everyone"
  ON public.standings FOR SELECT
  TO public
  USING (true);
