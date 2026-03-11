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
  venue: string | null;
  status: string;
  matchday: number | null;
}

const Fixtures = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      const { data, error } = await supabase
        .from('fixtures')
        .select('*')
        .order('match_date', { ascending: false })
        .limit(15);

      if (data) setFixtures(data as Fixture[]);
      if (error) console.error('Error fetching fixtures:', error);
      setLoading(false);
    };
    fetchFixtures();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 text-white animate-pulse';
      case 'completed': return 'bg-gray-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'completed': return 'FT';
      default: return 'vs';
    }
  };

  if (loading) {
    return (
      <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-amber-600" />
            Fixtures & Results
          </CardTitle>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Season 25/26
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {fixtures.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No fixtures available yet</p>
            <p className="text-gray-400 text-sm mt-1">Data updates daily at midnight</p>
          </div>
        ) : (
          fixtures.map((fixture) => (
            <div 
              key={fixture.id} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:shadow-md text-sm ${
                fixture.status === 'live' 
                  ? 'bg-red-50 border-l-4 border-red-500' 
                  : fixture.status === 'completed'
                  ? 'bg-gray-50'
                  : 'bg-blue-50'
              }`}
            >
              <div className="flex-1 text-right">
                <p className="font-medium text-gray-800 text-xs sm:text-sm">{fixture.home_team}</p>
              </div>

              <div className="flex flex-col items-center mx-3 min-w-[60px]">
                {fixture.home_score !== null && fixture.away_score !== null ? (
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-lg text-gray-800">{fixture.home_score}</span>
                    <Badge className={`${getStatusColor(fixture.status)} px-1.5 py-0 text-[10px] font-bold rounded-full`}>
                      {getStatusText(fixture.status)}
                    </Badge>
                    <span className="font-bold text-lg text-gray-800">{fixture.away_score}</span>
                  </div>
                ) : (
                  <Badge className={`${getStatusColor(fixture.status)} px-2 py-0.5 text-[10px] font-bold rounded-full`}>
                    {fixture.match_time || 'TBD'}
                  </Badge>
                )}
                <span className="text-[10px] text-gray-400 mt-0.5">{fixture.match_date?.slice(5)}</span>
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-800 text-xs sm:text-sm">{fixture.away_team}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Fixtures;
