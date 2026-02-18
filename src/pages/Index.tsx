
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { House, Users, FileText, Award, Trophy, Medal, Star, TrendingUp, Calendar, ArrowUp, ArrowDown, Minus, LogOut } from 'lucide-react';
import pslPlayersImg from '@/assets/psl-players-nobg.png';
import { Link } from 'react-router-dom';
import { Player } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { usePlayersFromDB, useTeamsFromDB } from '@/hooks/usePlayersFromDB';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';
import FormationPitch from '@/components/FormationPitch';
import Fixtures from '@/components/home/Fixtures';
import LatestNews from '@/components/home/LatestNews';
import LeagueTable from '@/components/home/LeagueTable';
import TopPerformers from '@/components/home/TopPerformers';
import { PSLBot } from '@/components/PSLBot';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(100.0);
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const { toast } = useToast();
  const { signOut } = useAuth();
  const { data: players = [], isLoading: playersLoading } = usePlayersFromDB();
  const { data: teams = [], isLoading: teamsLoading } = useTeamsFromDB();

  useEffect(() => {
    if (players.length === 0) return;
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
  }, [players]);

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
      {/* PSL-Inspired Hero Header (NBA Fantasy style) */}
      <div className="relative overflow-hidden bg-psl-dark min-h-[200px]">
        {/* Diagonal gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-psl-blue/30 via-transparent to-psl-gold/10"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-psl-gold via-psl-blue to-psl-gold"></div>
        
        {/* PSL Players Image - blended into header */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[50%] overflow-hidden pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)' }}>
          <img 
            src={pslPlayersImg} 
            alt="PSL Players" 
            className="absolute right-4 bottom-0 h-[110%] w-auto object-contain object-right-bottom mix-blend-screen"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {/* Left: PSL Logo + Title */}
            <div className="flex items-center space-x-5">
              <div className="shrink-0">
                <img 
                  src="https://www.psl.co.za/assets/images/logo-mobile.png" 
                  alt="PSL Logo" 
                  className="h-20 w-20 object-contain drop-shadow-[0_0_15px_rgba(0,153,204,0.4)]"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                  <span className="text-psl-gold">PICK A SIDE</span>
                </h1>
                <p className="text-xl md:text-2xl font-bold text-psl-blue tracking-widest uppercase mt-1">Fantasy</p>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="h-0.5 w-8 bg-psl-gold rounded-full"></div>
                  <p className="text-sm font-semibold text-white/70">Betway Premiership 2024/25</p>
                  <div className="h-0.5 w-8 bg-psl-blue rounded-full"></div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white/70 hover:text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Gameweek Counter */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="bg-psl-blue/20 backdrop-blur-md rounded-xl px-6 py-2.5 border border-psl-blue/30">
              <div className="flex items-center space-x-3 text-white">
                <Calendar className="h-4 w-4 text-psl-gold" />
                <span className="text-sm font-bold">Gameweek 14</span>
                <div className="h-3 w-px bg-white/30"></div>
                <span className="text-xs text-white/70">Deadline in 3d 2h</span>
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
                
                <div className="transform transition-all duration-500 hover:scale-[1.01]">
                  <PSLBot />
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
