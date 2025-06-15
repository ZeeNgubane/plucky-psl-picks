
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { teams } from '@/data/teams';

const getTeamLogo = (teamName: string) => {
  const team = teams.find(t => t.name === teamName);
  return team?.logo || 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
};

const fixtures = [
  { teamA: 'Kaizer Chiefs', teamB: 'Orlando Pirates', date: 'Sat, 15 Feb', time: '15:30' },
  { teamA: 'Mamelodi Sundowns', teamB: 'SuperSport United', date: 'Sat, 15 Feb', time: '18:00' },
  { teamA: 'Cape Town City FC', teamB: 'Stellenbosch FC', date: 'Sun, 16 Feb', time: '17:30' },
];

const Fixtures = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Fixtures & Results</span>
          <Badge variant="outline">Gameweek 15</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fixtures.map((fixture, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <img src={getTeamLogo(fixture.teamA)} alt={fixture.teamA} className="h-6 w-6"/>
                <span className="font-medium">{fixture.teamA}</span>
              </div>
              <div className="text-center">
                <div className="font-bold text-sm bg-gray-100 rounded-md px-2 py-1">{fixture.time}</div>
                <div className="text-xs text-muted-foreground mt-1">{fixture.date}</div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-right">{fixture.teamB}</span>
                 <img src={getTeamLogo(fixture.teamB)} alt={fixture.teamB} className="h-6 w-6"/>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Fixtures;
