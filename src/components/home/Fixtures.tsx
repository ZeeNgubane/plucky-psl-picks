import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const fixtures = [
  {
    id: 1,
    homeTeam: 'Durban City FC',
    awayTeam: 'TS Galaxy',
    date: '2026-02-13',
    time: '19:30',
    venue: 'Harry Gwala Stadium',
    status: 'completed',
    homeScore: 2,
    awayScore: 0
  },
  {
    id: 2,
    homeTeam: 'Magesi FC',
    awayTeam: 'Golden Arrows',
    date: '2026-02-13',
    time: '19:30',
    venue: 'Old Peter Mokaba Stadium',
    status: 'completed',
    homeScore: 0,
    awayScore: 2
  },
  {
    id: 3,
    homeTeam: 'Orlando Pirates',
    awayTeam: 'Marumo Gallants',
    date: '2026-02-14',
    time: '15:30',
    venue: 'Orlando Stadium',
    status: 'completed',
    homeScore: 3,
    awayScore: 0
  },
  {
    id: 4,
    homeTeam: 'Polokwane City',
    awayTeam: 'Siwelele FC',
    date: '2026-02-14',
    time: '18:00',
    venue: 'Old Peter Mokaba Stadium',
    status: 'completed',
    homeScore: 0,
    awayScore: 0
  },
  {
    id: 5,
    homeTeam: 'Chippa United',
    awayTeam: 'Richards Bay',
    date: '2026-02-14',
    time: '20:15',
    venue: 'Buffalo City Stadium',
    status: 'completed',
    homeScore: 3,
    awayScore: 0
  },
  {
    id: 6,
    homeTeam: 'Sekhukhune United',
    awayTeam: 'Orbit College',
    date: '2026-02-15',
    time: '15:30',
    venue: 'Peter Mokaba Stadium',
    status: 'completed',
    homeScore: 2,
    awayScore: 0
  },
  {
    id: 7,
    homeTeam: 'Stellenbosch FC',
    awayTeam: 'Magesi FC',
    date: '2026-02-18',
    time: '19:30',
    venue: 'Danie Craven Stadium',
    status: 'completed',
    homeScore: 1,
    awayScore: 1
  },
  {
    id: 8,
    homeTeam: 'Orlando Pirates',
    awayTeam: 'Mamelodi Sundowns',
    date: '2026-02-18',
    time: '19:30',
    venue: 'Orlando Stadium',
    status: 'completed',
    homeScore: 1,
    awayScore: 2
  },
  {
    id: 9,
    homeTeam: 'AmaZulu FC',
    awayTeam: 'Mamelodi Sundowns',
    date: '2026-02-24',
    time: '19:30',
    venue: 'Moses Mabhida Stadium',
    status: 'upcoming',
    homeScore: null,
    awayScore: null
  },
  {
    id: 10,
    homeTeam: 'Kaizer Chiefs',
    awayTeam: 'Stellenbosch FC',
    date: '2026-02-24',
    time: '19:30',
    venue: 'FNB Stadium',
    status: 'upcoming',
    homeScore: null,
    awayScore: null
  },
];

const Fixtures = () => {
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

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-amber-600" />
            Fixtures & Results
          </CardTitle>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Matchday 18
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {fixtures.map((fixture) => (
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
            {/* Home Team */}
            <div className="flex-1 text-right">
              <p className="font-medium text-gray-800 text-xs sm:text-sm">{fixture.homeTeam}</p>
            </div>

            {/* Score/Status */}
            <div className="flex flex-col items-center mx-3 min-w-[60px]">
              {fixture.homeScore !== null && fixture.awayScore !== null ? (
                <div className="flex items-center gap-1">
                  <span className="font-bold text-lg text-gray-800">{fixture.homeScore}</span>
                  <Badge className={`${getStatusColor(fixture.status)} px-1.5 py-0 text-[10px] font-bold rounded-full`}>
                    {getStatusText(fixture.status)}
                  </Badge>
                  <span className="font-bold text-lg text-gray-800">{fixture.awayScore}</span>
                </div>
              ) : (
                <Badge className={`${getStatusColor(fixture.status)} px-2 py-0.5 text-[10px] font-bold rounded-full`}>
                  {fixture.time}
                </Badge>
              )}
              <span className="text-[10px] text-gray-400 mt-0.5">{fixture.date.slice(5)}</span>
            </div>

            {/* Away Team */}
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-xs sm:text-sm">{fixture.awayTeam}</p>
            </div>
          </div>
        ))}
        
        <button className="w-full py-3 text-amber-600 font-medium text-sm hover:bg-amber-50 rounded-xl transition-colors duration-200">
          View All Fixtures →
        </button>
      </CardContent>
    </Card>
  );
};

export default Fixtures;
