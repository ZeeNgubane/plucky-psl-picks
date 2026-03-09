import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Player } from '@/data/teams';
import { supabase } from '@/integrations/supabase/client';

interface MyTeamSummaryProps {
  selectedPlayers: Player[];
}

const BUDGET = 100; // R100M budget

const MyTeamSummary = ({ selectedPlayers }: MyTeamSummaryProps) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [rank, setRank] = useState<number | null>(null);

  const totalValue = selectedPlayers.reduce((sum, player) => sum + player.price, 0);

  useEffect(() => {
    const fetchUserStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: leaderboard } = await supabase
        .from('leaderboard')
        .select('total_points, rank')
        .eq('user_id', user.id)
        .maybeSingle();

      if (leaderboard) {
        setTotalPoints(leaderboard.total_points);
        setRank(leaderboard.rank);
      }
    };
    fetchUserStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Team Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-bronze-600">
            R{(totalValue * 18).toFixed(1)}M
          </div>
          <p className="text-sm text-gray-600">Budget: R{BUDGET}M</p>
        </CardContent>
      </Card>
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Total Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
          <p className="text-sm text-gray-600">This season</p>
        </CardContent>
      </Card>
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Rank</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">
            {rank ? `#${rank}` : '—'}
          </div>
          <p className="text-sm text-gray-600">Overall</p>
        </CardContent>
      </Card>
      <Card className="border-bronze-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{selectedPlayers.length}/15</div>
          <p className="text-sm text-gray-600">Squad size</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTeamSummary;
