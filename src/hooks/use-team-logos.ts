import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Strip common suffixes / punctuation so "Golden Arrows" ≈ "Lamontville Golden Arrows"
// and "Durban City FC" ≈ "Durban City Football Club".
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/football club/g, '')
    .replace(/\bfc\b/g, '')
    .replace(/\bcf\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function useTeamLogos(): Record<string, string> {
  const { data: logoMap = {} } = useQuery({
    queryKey: ['team-logos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teams').select('name, logo_url');
      if (error) throw error;
      const exact: Record<string, string> = {};
      const norm: Record<string, string> = {};
      (data || []).forEach((t) => {
        if (t.name && t.logo_url) {
          exact[t.name] = t.logo_url;
          norm[normalize(t.name)] = t.logo_url;
        }
      });

      // Proxy so consumers can do `logos[playerTeam]` and get a fuzzy match.
      return new Proxy(exact, {
        get(target, prop: string) {
          if (typeof prop !== 'string') return undefined;
          if (target[prop]) return target[prop];
          const n = normalize(prop);
          if (norm[n]) return norm[n];
          // Try partial containment both ways
          for (const key of Object.keys(norm)) {
            if (key.includes(n) || n.includes(key)) return norm[key];
          }
          return undefined;
        },
      }) as Record<string, string>;
    },
    staleTime: 1000 * 60 * 30,
  });
  return logoMap;
}
