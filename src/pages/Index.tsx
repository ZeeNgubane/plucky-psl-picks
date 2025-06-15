
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { House, Users, FileText, Award } from 'lucide-react';
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
                <House className="h-4 w-4" />
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
                <FileText className="h-4 w-4" />
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
              <Fixtures />
              <LatestNews />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <LeagueTable />
              <TopPerformers />
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
