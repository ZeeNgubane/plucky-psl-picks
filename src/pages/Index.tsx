import { useState, useEffect } from 'react';
import { House, Users, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { Player } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';
import FormationPitch from '@/components/FormationPitch';
import CompactFixtures from '@/components/home/CompactFixtures';
import LeagueTable from '@/components/home/LeagueTable';
import UserBadgePanel from '@/components/home/UserBadgePanel';
import PlayerStatHUD from '@/components/home/PlayerStatHUD';
import ArticlesNewsAds from '@/components/home/ArticlesNewsAds';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(100.0);
  const { toast } = useToast();

  const { data: allPlayers = [] } = useQuery({
    queryKey: ['players-index'],
    queryFn: async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) throw error;
      return (data || []) as unknown as Player[];
    },
  });

  useEffect(() => {
    if (allPlayers.length === 0) return;
    try {
      const savedSquadIdsJSON = localStorage.getItem('fantasy-squad-ids');
      if (savedSquadIdsJSON) {
        const savedSquadIds = JSON.parse(savedSquadIdsJSON);
        if (Array.isArray(savedSquadIds) && savedSquadIds.length > 0) {
          const allPlayersMap = new Map(allPlayers.map(p => [String(p.id), p]));
          const loadedPlayers = savedSquadIds
            .map((id: string) => allPlayersMap.get(String(id)))
            .filter((p): p is Player => p !== undefined);

          if (loadedPlayers.length > 0) {
            setSelectedPlayers(loadedPlayers);
            const totalValue = loadedPlayers.reduce((sum, player) => sum + (Number(player.price) || 0), 0);
            setBudget(100.0 - totalValue);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load squad from localStorage", e);
    }
  }, [allPlayers]);

  const handlePlayerAdd = (player: Player) => {
    const playerPrice = Number(player.price) || 0;
    if (budget < playerPrice) {
      toast({ title: "Insufficient Budget", description: `You need R${(playerPrice * 18).toFixed(1)}M but only have R${(budget * 18).toFixed(1)}M available.`, variant: "destructive" });
      return;
    }
    const positionCount = selectedPlayers.filter(p => p.position === player.position).length;
    const maxByPosition: Record<string, number> = { GK: 2, DEF: 5, MID: 5, FWD: 3, Goalkeeper: 2, Defender: 5, Midfielder: 5, Forward: 3 };
    if (positionCount >= (maxByPosition[player.position] || 0)) {
      toast({ title: "Position Limit Reached", description: `You can only have ${maxByPosition[player.position]} ${player.position} players.`, variant: "destructive" });
      return;
    }
    if (selectedPlayers.length >= 15) {
      toast({ title: "Squad Full", description: "You can only have 15 players in your squad.", variant: "destructive" });
      return;
    }
    setSelectedPlayers([...selectedPlayers, player]);
    setBudget(budget - playerPrice);
    toast({ title: "Player Added", description: `${player.name} has been added to your team!` });
  };

  const handlePlayerRemove = (playerId: string) => {
    const player = selectedPlayers.find(p => String(p.id) === String(playerId));
    if (player) {
      setSelectedPlayers(selectedPlayers.filter(p => String(p.id) !== String(playerId)));
      setBudget(budget + (Number(player.price) || 0));
      toast({ title: "Player Removed", description: `${player.name} has been removed from your team.` });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team':
        return <MyTeam selectedPlayers={selectedPlayers} />;
      case 'transfers':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Transfers selectedPlayers={selectedPlayers} onPlayerAdd={handlePlayerAdd} onPlayerRemove={handlePlayerRemove} budget={budget} />
            <div>
              <FormationPitch selectedPlayers={selectedPlayers} onPlayerClick={() => {}} playerToSwap={null} />
            </div>
          </div>
        );
      case 'league':
        return <League />;
      default:
        return null;
    }
  };

  const squadValue = 100 - budget;

  return (
    <div className="min-h-screen bg-background">
      {/* Compact top bar */}
      <div className="bg-psl-dark border-b border-psl-blue/30">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="https://www.psl.co.za/assets/images/logo-mobile.png" alt="PSL Logo" className="h-9 w-9 object-contain" />
            <div>
              <h1 className="text-lg font-black text-psl-gold leading-none">PICK A SIDE</h1>
              <p className="text-[10px] text-white/60 uppercase tracking-widest">Fantasy · Betway Premiership</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-white/80 text-xs bg-psl-blue/20 px-3 py-1.5 rounded-lg border border-psl-blue/30">
            <Calendar className="h-3.5 w-3.5 text-psl-gold" />
            <span className="font-bold">GW 14</span>
            <span className="text-white/50">·</span>
            <span>Deadline 3d 2h</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 hidden lg:flex bg-white/75 dark:bg-card/60 backdrop-blur-[10px] border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-2">
            <div className="flex bg-secondary/20 rounded-2xl p-1.5 shadow-lg border border-border">
              {[
                { id: 'home', label: 'Home', icon: House },
                { id: 'team', label: 'My Team', icon: Users },
                { id: 'transfers', label: 'Transfers', icon: TrendingUp },
                { id: 'league', label: 'League', icon: Trophy }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-6">
        {activeTab === 'home' ? (
          <div className="space-y-6">
            {/* Top section: 3 columns on desktop, custom order on mobile */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-[220px_1fr_1fr]">
              <div className="order-2 lg:order-first flex flex-col-reverse lg:flex-col gap-4 min-w-0">
                <UserBadgePanel teamName="My Fantasy XI" tier="gold" compact />
                <PlayerStatHUD
                  gwPoints={62}
                  leagueRank={4}
                  squadValue={squadValue * 18}
                  bank={budget * 18}
                  totalPoints={1089}
                />
              </div>

              <div className="order-3 lg:order-2 min-w-0">
                <CompactFixtures />
              </div>

              <div className="order-first lg:order-last min-w-0">
                <LeagueTable />
              </div>
            </div>

            {/* Bottom section: full width */}
            <ArticlesNewsAds />
          </div>
        ) : (
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-8">
            {renderTabContent()}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 lg:hidden z-50 shadow-2xl">
        <div className="flex justify-around">
          {[
            { id: 'home', label: 'Home', icon: House },
            { id: 'team', label: 'Team', icon: Users },
            { id: 'transfers', label: 'Transfers', icon: TrendingUp },
            { id: 'league', label: 'League', icon: Trophy }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id ? 'text-primary bg-primary/10 scale-110' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
