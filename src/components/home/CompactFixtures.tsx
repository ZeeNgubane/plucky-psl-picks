import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Fixture {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  match_time: string | null;
  status: string;
}

const CompactFixtures = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('fixtures')
        .select('*')
        .order('match_date', { ascending: false })
        .limit(20);
      if (data) setFixtures(data as Fixture[]);
      setLoading(false);
    })();
  }, []);

  const statusBadge = (status: string) => {
    if (status === 'live') return 'bg-red-500 text-white animate-pulse';
    if (status === 'completed') return 'bg-gray-500 text-white';
    return 'bg-blue-500 text-white';
  };
  const statusText = (s: string) => (s === 'live' ? 'LIVE' : s === 'completed' ? 'FT' : 'vs');

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-gray-800 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-amber-600" />
            Fixtures & Results
          </CardTitle>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
            Season 25/26
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 space-y-1">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
          </div>
        ) : fixtures.length === 0 ? (
          <p className="text-center text-gray-500 text-xs py-6">No fixtures available yet</p>
        ) : (
          fixtures.map((f) => (
            <div
              key={f.id}
              className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs ${
                f.status === 'live'
                  ? 'bg-red-50 border-l-2 border-red-500'
                  : f.status === 'completed'
                  ? 'bg-gray-50'
                  : 'bg-blue-50/60'
              }`}
            >
              <div className="flex-1 text-right pr-2 truncate font-medium text-gray-800">{f.home_team}</div>
              <div className="flex items-center gap-1 min-w-[70px] justify-center">
                {f.home_score !== null && f.away_score !== null ? (
                  <>
                    <span className="font-bold text-gray-800 tabular-nums">{f.home_score}</span>
                    <Badge className={`${statusBadge(f.status)} px-1 py-0 text-[9px] rounded`}>
                      {statusText(f.status)}
                    </Badge>
                    <span className="font-bold text-gray-800 tabular-nums">{f.away_score}</span>
                  </>
                ) : (
                  <Badge className={`${statusBadge(f.status)} px-1.5 py-0 text-[9px] rounded`}>
                    {f.match_time || 'TBD'}
                  </Badge>
                )}
              </div>
              <div className="flex-1 pl-2 truncate font-medium text-gray-800">{f.away_team}</div>
              <span className="text-[9px] text-gray-400 ml-2 tabular-nums w-10 text-right">
                {f.match_date?.slice(5)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CompactFixtures;
