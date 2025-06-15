import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Users, Star, Calendar, TrendingUp, Award, Target, Clock, Plus, ArrowUpDown, Info, Filter, Search, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Player, teams, players } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';
import FormationPitch from '@/components/FormationPitch';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(100.0);
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const { toast } = useToast();

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
        return <MyTeam selectedPlayers={selectedPlayers} budget={budget} />;
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

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-red-100 text-red-800 border-red-200';
      case 'DEF': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MID': return 'bg-green-100 text-green-800 border-green-200';
      case 'FWD': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTeamLogo = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    return team?.logo || 'https://logos-world.net/wp-content/uploads/2020/06/Kaizer-Chiefs-Logo.png';
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
    <div className="min-h-screen bg-gray-50">
      {/* PSL Header Section - Transparent Banner */}
      <div className="relative bg-transparent text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Qyp3Lwe6asV9LvYM13nUAosA3woAqW4YsQ&s)',
            backgroundPosition: 'right center'
          }}
        />
        
        {/* Header Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img 
                  src="https://www.psl.co.za/media/10983/psl-logo-gold.png" 
                  alt="PSL Logo" 
                  className="h-16 w-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0JZOmbEBlLE_lP0SKjIaxOfpF4DvC3bZoQ&s';
                  }}
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 text-shadow">Fantasy Football</h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-white/90">Betway Premiership</span>
                    <span className="text-white/70">•</span>
                    <span className="text-lg text-white/90">2024/25</span>
                  </div>
                </div>
              </div>
              
              {/* Gameweek Info */}
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/30">
                  <div className="text-sm text-white/90 mb-1">Gameweek</div>
                  <div className="text-3xl font-bold mb-1">14</div>
                  <div className="text-sm text-white/80">3 days, 2 hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span>Tournaments</span>
            <span>/</span>
            <span className="text-red-600 font-medium">Betway Premiership</span>
            <span>/</span>
            <span className="text-red-600 font-medium">Fantasy</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-4 px-2 border-b-2 transition-colors duration-200 font-medium ${
                activeTab === 'home'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Home</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-2 border-b-2 transition-colors duration-200 font-medium ${
                activeTab === 'team'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>My Team</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('transfers')}
              className={`py-4 px-2 border-b-2 transition-colors duration-200 font-medium ${
                activeTab === 'transfers'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Transfers</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('league')}
              className={`py-4 px-2 border-b-2 transition-colors duration-200 font-medium ${
                activeTab === 'league'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>League</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'home' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Points Summary */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold">My Team: The Champions</CardTitle>
                  <Badge variant="outline">Gameweek 14</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-4">
                    <div>
                      <p className="text-2xl font-bold">{selectedPlayers.reduce((sum, p) => sum + p.points, 0)}</p>
                      <p className="text-xs text-muted-foreground">Total Points</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,234,567</p>
                      <p className="text-xs text-muted-foreground">Overall Rank</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">68</p>
                      <p className="text-xs text-muted-foreground">Gameweek Points</p>
                    </div>
                    <div>
                       <p className="text-2xl font-bold text-green-600">R{(budget * 18).toFixed(1)}M</p>
                       <p className="text-xs text-muted-foreground">In the bank</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pitch View */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Starting XI</span>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('team')}>View Squad <Users className="h-4 w-4 ml-2" /></Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <FormationPitch selectedPlayers={selectedPlayers} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Next Deadline</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold">Sat 15 Feb</p>
                  <p className="text-sm text-muted-foreground">18:30</p>
                  <p className="text-xs text-red-500 mt-1">3 days remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="ghost" onClick={() => setActiveTab('transfers')}>
                    <ArrowUpDown className="mr-2 h-4 w-4" /> Make Transfers
                  </Button>
                   <Button className="w-full justify-start" variant="ghost" onClick={() => setActiveTab('league')}>
                    <Trophy className="mr-2 h-4 w-4" /> View Leagues
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">My Leagues</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-500 mr-2">1.</span>
                        <span>Overall League</span>
                      </div>
                      <span className="font-semibold">1,234,567</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                         <span className="font-bold text-gray-500 mr-2">2.</span>
                        <span>SA Head-to-Head</span>
                      </div>
                      <span className="font-semibold">5,432</span>
                    </li>
                     <li className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                         <span className="font-bold text-gray-500 mr-2">3.</span>
                        <span>Joburg Coders</span>
                      </div>
                       <span className="font-semibold text-green-600">1st <TrendingUp className="inline h-4 w-4"/></span>
                    </li>
                  </ul>
                  <Button variant="link" className="p-0 h-auto mt-3 text-sm">Create & join new leagues</Button>
                </CardContent>
              </Card>

               <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Chips</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2 text-center">
                      <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                        <Star className="h-5 w-5 mb-1"/>
                        <span className="text-xs">Wildcard</span>
                      </Button>
                       <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                        <Users className="h-5 w-5 mb-1"/>
                        <span className="text-xs">Bench Boost</span>
                      </Button>
                       <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                        <Shield className="h-5 w-5 mb-1"/>
                        <span className="text-xs">Triple Captain</span>
                      </Button>
                       <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                        <Plus className="h-5 w-5 mb-1"/>
                        <span className="text-xs">Free Hit</span>
                      </Button>
                  </CardContent>
                </Card>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderTabContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
