
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { teams } from '@/data/teams';

const leagueTable = teams.slice(0, 6).map((team, i) => ({
    pos: i + 1,
    logo: team.logo,
    name: team.name,
    p: 14,
    gd: Math.floor(Math.random() * 10) + 2,
    pts: Math.floor(Math.random() * 15) + 20,
})).sort((a,b) => b.pts - a.pts).map((team, i) => ({...team, pos: i+1}));

const LeagueTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex justify-between items-center">
          <span>PSL Log</span>
          <Button variant="ghost" size="sm">View All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagueTable.map((team) => (
              <TableRow key={team.pos}>
                <TableCell className="font-medium">{team.pos}</TableCell>
                <TableCell className="flex items-center space-x-2">
                   <img src={team.logo} alt={team.name} className="h-5 w-5"/>
                   <span>{team.name}</span>
                </TableCell>
                <TableCell className="text-right font-bold">{team.pts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeagueTable;
