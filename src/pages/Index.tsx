
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { House, Users, FileText, Award, Trophy, Medal, Star, TrendingUp, Calendar, User } from 'lucide-react';
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

  // Filter out any teams with empty names to prevent SelectItem errors
  const validTeams = teams.filter(team => team.name && team.name.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-400 text-white overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img 
                    src="https://www.psl.co.za/media/10983/psl-logo-gold.png" 
                    alt="PSL Logo" 
                    className="h-16 w-auto drop-shadow-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Premier_Soccer_League.svg/1200px-Premier_Soccer_League.svg.png';
                    }}
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-12 w-12 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                  SA Fantasy Football
                </h1>
                <p className="text-lg text-white/90 font-medium mb-4">Betway Premiership 2024/25</p>
                <div className="inline-flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Gameweek 14 • 3 days, 2 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-full p-1 my-3">
              {[
                { id: 'home', label: 'Home', icon: House },
                { id: 'team', label: 'My Team', icon: Users },
                { id: 'transfers', label: 'Transfers', icon: TrendingUp },
                { id: 'league', label: 'League', icon: Trophy }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-white/50'
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
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'home' ? (
          <div className="space-y-6">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Your Rank</p>
                      <p className="text-2xl font-bold">#4</p>
                    </div>
                    <Medal className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Points</p>
                      <p className="text-2xl font-bold">1,089</p>
                    </div>
                    <Star className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Budget Left</p>
                      <p className="text-2xl font-bold">R{(budget * 18).toFixed(1)}M</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Team Value</p>
                      <p className="text-2xl font-bold">R{((100 - budget) * 18).toFixed(1)}M</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <Fixtures />
                </div>
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <LatestNews />
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <LeagueTable />
                </div>
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <TopPerformers />
                </div>
                
                {/* South African Touch - Local Slang Card */}
                <Card className="bg-gradient-to-br from-yellow-400 via-green-500 to-blue-600 text-white border-0 rounded-2xl shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <span className="text-2xl">🇿🇦</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Shooo! What a season!</h3>
                    <p className="text-sm text-white/90">
                      Your fantasy team is looking sharp, boet! 
                      Keep those transfers coming and bag those points! 💪
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {renderTabContent()}
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 p-4 lg:hidden z-50">
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
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-gray-500 hover:text-amber-600'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Padding for Mobile Navigation */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default Index;
