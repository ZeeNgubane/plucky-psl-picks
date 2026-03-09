
CREATE TABLE public.performer_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  gameweek integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, player_id, gameweek)
);

ALTER TABLE public.performer_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are viewable by everyone"
  ON public.performer_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own likes"
  ON public.performer_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON public.performer_likes FOR DELETE
  USING (auth.uid() = user_id);
