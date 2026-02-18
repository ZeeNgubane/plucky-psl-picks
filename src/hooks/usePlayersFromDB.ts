import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Player } from '@/data/teams';

export function useTeamsFromDB() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams' as any)
        .select('*')
        .order('name');
      if (error) throw error;
      return (data as any[]).map(t => ({
        id: t.id as string,
        name: t.name as string,
        logo: (t.logo_url || '') as string,
        city: '',
        kitImage: '',
      }));
    },
  });
}

export function usePlayersFromDB() {
  return useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players' as any)
        .select('*, teams(id, name, short_name, logo_url)')
        .order('points', { ascending: false });
      if (error) throw error;
      return (data as any[]).map(p => ({
        id: p.id as string,
        name: p.name as string,
        position: p.position as Player['position'],
        team: p.teams?.name || 'Unknown',
        price: Number(p.price),
        points: Number(p.points),
        form: [p.form, p.form, p.form, p.form, p.form].map((f: any) => Math.round(Number(f))),
      })) as Player[];
    },
  });
}
