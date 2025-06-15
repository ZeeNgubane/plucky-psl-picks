
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { players, teams } from '@/data/teams';

const getTeamLogo = (teamName: string) => {
  const team = teams.find(t => t.name === teamName);
  return team?.logo || 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
};

const topPerformers = players.sort((a,b) => b.points - a.points).slice(0,4);

const TopPerformers = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top Performers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
          {topPerformers.map(player => (
             <div key={player.id} className="flex items-center justify-between text-sm">
               <div className="flex items-center space-x-3">
                 <img src={getTeamLogo(player.team)} alt={player.team} className="h-6 w-6"/>
                 <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.team}</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="font-bold">{player.points} pts</p>
                 <p className="text-xs text-muted-foreground">R{(player.price * 18).toFixed(1)}M</p>
               </div>
             </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
