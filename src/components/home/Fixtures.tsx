
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const fixtures = [
  {
    id: 1,
    homeTeam: 'Kaizer Chiefs',
    awayTeam: 'Orlando Pirates',
    homeLogo: 'https://logoeps.com/wp-content/uploads/2013/03/kaizer-chiefs-vector-logo.png',
    awayLogo: 'https://logoeps.com/wp-content/uploads/2013/03/orlando-pirates-vector-logo.png',
    date: '2024-12-15',
    time: '15:30',
    venue: 'FNB Stadium',
    status: 'upcoming',
    homeScore: null,
    awayScore: null
  },
  {
    id: 2,
    homeTeam: 'Mamelodi Sundowns',
    awayTeam: 'SuperSport United',
    homeLogo: 'https://logoeps.com/wp-content/uploads/2013/03/mamelodi-sundowns-vector-logo.png',
    awayLogo: 'https://logoeps.com/wp-content/uploads/2013/03/supersport-united-vector-logo.png',
    date: '2024-12-14',
    time: '19:30',
    venue: 'Loftus Versfeld',
    status: 'live',
    homeScore: 2,
    awayScore: 1
  },
  {
    id: 3,
    homeTeam: 'Cape Town City',
    awayTeam: 'Stellenbosch FC',
    homeLogo: 'https://logoeps.com/wp-content/uploads/2016/04/cape-town-city-fc-vector-logo.png',
    awayLogo: 'https://logoeps.com/wp-content/uploads/2018/08/stellenbosch-fc-vector-logo.png',
    date: '2024-12-13',
    time: '20:15',
    venue: 'DHL Stadium',
    status: 'completed',
    homeScore: 1,
    awayScore: 3
  }
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, teamName: string) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=f59e0b&color=fff&size=40`;
  };

  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-amber-600" />
            Live Fixtures
          </CardTitle>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Gameweek 14
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {fixtures.map((fixture) => (
          <Card 
            key={fixture.id} 
            className={`border-0 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
              fixture.status === 'live' 
                ? 'bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500' 
                : fixture.status === 'completed'
                ? 'bg-gradient-to-r from-gray-50 to-slate-50'
                : 'bg-gradient-to-r from-blue-50 to-cyan-50'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Home Team */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center p-1">
                    <img 
                      src={fixture.homeLogo} 
                      alt={fixture.homeTeam}
                      className="w-full h-full object-contain"
                      onError={(e) => handleImageError(e, fixture.homeTeam)}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{fixture.homeTeam}</p>
                  </div>
                </div>

                {/* Score/Status */}
                <div className="flex flex-col items-center mx-4">
                  <Badge className={`${getStatusColor(fixture.status)} px-3 py-1 text-xs font-bold rounded-full`}>
                    {getStatusText(fixture.status)}
                  </Badge>
                  {fixture.homeScore !== null && fixture.awayScore !== null && (
                    <div className="text-2xl font-bold text-gray-800 mt-2">
                      {fixture.homeScore} - {fixture.awayScore}
                    </div>
                  )}
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {fixture.time}
                  </div>
                </div>

                {/* Away Team */}
                <div className="flex items-center space-x-3 flex-1 justify-end">
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 text-sm">{fixture.awayTeam}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center p-1">
                    <img 
                      src={fixture.awayLogo} 
                      alt={fixture.awayTeam}
                      className="w-full h-full object-contain"
                      onError={(e) => handleImageError(e, fixture.awayTeam)}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-center justify-center mt-3 pt-3 border-t border-gray-200">
                <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{fixture.venue}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* View All Button */}
        <button className="w-full py-3 text-amber-600 font-medium text-sm hover:bg-amber-50 rounded-xl transition-colors duration-200">
          View All Fixtures →
        </button>
      </CardContent>
    </Card>
  );
};

export default Fixtures;
