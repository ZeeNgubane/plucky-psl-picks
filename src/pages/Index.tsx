
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { House, Users, FileText, Award, Trophy, Medal, Star, TrendingUp, Calendar, User, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Player, teams, players } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';
import FormationPitch from '@/components/FormationPitch';
import Fixtures from '@/components/home/Fixtures';
import LatestNews from '@/components/home/LatestNews';
import LeagueTable from '@/components/home/LeagueTable';
import TopPerformers from '@/components/home/TopPerformers';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(100.0);
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedSquadIdsJSON = localStorage.getItem('fantasy-squad-ids');
      if (savedSquadIdsJSON) {
        const savedSquadIds = JSON.parse(savedSquadIdsJSON);
        if (Array.isArray(savedSquadIds) && savedSquadIds.length > 0) {
          const allPlayersMap = new Map(players.map(p => [p.id, p]));
          const loadedPlayers = savedSquadIds
            .map((id: string) => allPlayersMap.get(id))
            .filter((p): p is Player => p !== undefined);

          if (loadedPlayers.length > 0) {
            setSelectedPlayers(loadedPlayers);
            const totalValue = loadedPlayers.reduce((sum, player) => sum + player.price, 0);
            setBudget(100.0 - totalValue);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load squad from localStorage", e);
    }
  }, []);

  const handlePlayerAdd = (player: Player) => {
    if (budget < player.price) {
      toast({
        title: "Insufficient Budget",
        description: `You need R${(player.price * 18).toFixed(1)}M but only have R${(budget * 18).toFixed(1)}M available.`,
        variant: "destructive",
      });
      return;
    }

    const positionCount = selectedPlayers.filter(p => p.position === player.position).length;
    const maxByPosition = { GK: 2, DEF: 5, MID: 5, FWD: 3 };
    
    if (positionCount >= maxByPosition[player.position]) {
      toast({
        title: "Position Limit Reached",
        description: `You can only have ${maxByPosition[player.position]} ${player.position} players.`,
        variant: "destructive",
      });
      return;
    }

    if (selectedPlayers.length >= 15) {
      toast({
        title: "Squad Full",
        description: "You can only have 15 players in your squad.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPlayers([...selectedPlayers, player]);
    setBudget(budget - player.price);
    
    toast({
      title: "Player Added",
      description: `${player.name} has been added to your team!`,
    });
  };

  const handlePlayerRemove = (playerId: string) => {
    const player = selectedPlayers.find(p => p.id === playerId);
    if (player) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
      setBudget(budget + player.price);
      
      toast({
        title: "Player Removed",
        description: `${player.name} has been removed from your team.`,
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team':
        return <MyTeam selectedPlayers={selectedPlayers} />;
      case 'transfers':
        return (
          <Transfers 
            selectedPlayers={selectedPlayers}
            onPlayerAdd={handlePlayerAdd}
            onPlayerRemove={handlePlayerRemove}
            budget={budget}
          />
        );
      case 'league':
        return <League />;
      default:
        return null;
    }
  };

  const filteredPlayers = players
    .filter(player => {
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
      const matchesTeam = teamFilter === 'all' || player.team === teamFilter;
      return matchesPosition && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'points': return b.points - a.points;
        case 'name': return a.name.localeCompare(b.name);
        case 'team': return a.team.localeCompare(b.team);
        default: return b.points - a.points;
      }
    });

  const formation = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD')
  };

  const validTeams = teams.filter(team => team.name && team.name.trim() !== '');

  // Form indicator component
  const FormIndicator = ({ change }: { change: number }) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-background via-secondary to-primary">
        <div className="absolute inset-0 bg-[url('https://igamingafrika.com/wp-content/uploads/2024/11/PSL.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* PSL Logo */}
            <div className="relative">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
            </div>

            {/* Title with PSL-inspired styling */}
            <div className="text-white space-y-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                  Mzansi Fantasy
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-3">
                <div className="h-1 w-12 bg-yellow-400 rounded-full"></div>
                <p className="text-xl font-semibold text-white/90">Betway Premiership 2024/25</p>
                <div className="h-1 w-12 bg-green-400 rounded-full"></div>
              </div>
            </div>

            {/* Gameweek Counter */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-4 text-white">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <span className="text-lg font-bold">Gameweek 14</span>
                <div className="h-4 w-px bg-white/30"></div>
                <span className="text-sm">Deadline in 3d 2h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-4">
            <div className="flex bg-secondary/20 rounded-2xl p-1.5 shadow-lg border border-border">
              {[
                { id: 'home', label: 'Home', icon: House, color: 'emerald' },
                { id: 'team', label: 'My Team', icon: Users, color: 'blue' },
                { id: 'transfers', label: 'Transfers', icon: TrendingUp, color: 'amber' },
                { id: 'league', label: 'League', icon: Trophy, color: 'purple' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105 shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/70'
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

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'home' ? (
          <div className="space-y-8">
            {/* Grit & Glory Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-foreground/70 text-sm font-medium">Your Rank</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-3xl font-black">#4</p>
                        <FormIndicator change={2} />
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-xl">
                      <Medal className="h-8 w-8 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary to-muted text-secondary-foreground border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-foreground/70 text-sm font-medium">Total Points</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-3xl font-black">1,089</p>
                        <FormIndicator change={45} />
                      </div>
                    </div>
                    <div className="bg-primary/20 p-3 rounded-xl">
                      <Star className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent to-primary text-accent-foreground border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-foreground/70 text-sm font-medium">Budget Left</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-black">R{(budget * 18).toFixed(1)}M</p>
                        <FormIndicator change={0} />
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-xl">
                      <TrendingUp className="h-8 w-8 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-muted to-secondary text-muted-foreground border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-foreground/70 text-sm font-medium">Team Value</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-black">R{((100 - budget) * 18).toFixed(1)}M</p>
                        <FormIndicator change={1} />
                      </div>
                    </div>
                    <div className="bg-primary/20 p-3 rounded-xl">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="transform transition-all duration-500 hover:scale-[1.01]">
                  <Fixtures />
                </div>
                <div className="transform transition-all duration-500 hover:scale-[1.01]">
                  <LatestNews />
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <div className="transform transition-all duration-500 hover:scale-[1.01]">
                  <LeagueTable />
                </div>
                <div className="transform transition-all duration-500 hover:scale-[1.01]">
                  <TopPerformers />
                </div>
                
                {/* Enhanced South African Motivational Card */}
                <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground border-0 rounded-2xl shadow-xl overflow-hidden">
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="mb-6">
                      <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                        <span className="text-2xl">🇿🇦</span>
                        <span className="font-bold">Mzansi Pride</span>
                      </div>
                    </div>
                    <h3 className="font-black text-xl mb-4">Eish! What a season!</h3>
                    <p className="text-white/90 font-medium leading-relaxed">
                      Your fantasy team is looking sharp, boet! 
                      Keep those transfers coming and bag those points! 💪
                    </p>
                    <div className="mt-6 flex justify-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-8">
            {renderTabContent()}
          </div>
        )}
      </div>

      {/* Enhanced Mobile Navigation */}
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
                activeTab === tab.id
                  ? 'text-primary bg-accent shadow-lg transform scale-110'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-6 w-6" />
              <span className="text-xs font-semibold">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Padding for Mobile Navigation */}
      <div className="h-24 lg:hidden"></div>
    </div>
  );
};

export default Index;
