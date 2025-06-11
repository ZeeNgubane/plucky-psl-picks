
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Star, Calendar, TrendingUp, Award, Target, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Player, teams } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(100.0);
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

  return (
    <div className="min-h-screen bg-white">
      {/* PSL Header Section */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img 
                src="https://www.psl.co.za/media/10983/psl-logo-gold.png" 
                alt="PSL Logo" 
                className="h-20 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0JZOmbEBlLE_lP0SKjIaxOfpF4DvC3bZoQ&s';
                }}
              />
              <div>
                <h1 className="text-4xl font-bold">SA Fantasy Football</h1>
                <p className="text-xl text-red-100 mt-1">Betway Premiership 2024/25</p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge className="bg-yellow-500 text-black font-semibold">LIVE SEASON</Badge>
                  <div className="flex items-center space-x-1 text-red-100">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Round 14</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">Current Gameweek</div>
              <div className="font-bold text-3xl">14</div>
              <div className="text-sm text-red-100">of 30</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-gray-50 border-b">
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
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 transition-colors duration-200 font-medium ${
                activeTab === 'overview'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Overview</span>
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

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' ? (
          <>
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-red-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{teams.length}</div>
                      <div className="text-sm text-gray-600">Teams</div>
                    </div>
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">R{(budget * 18).toFixed(1)}M</div>
                      <div className="text-sm text-gray-600">Remaining Budget</div>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{selectedPlayers.length}</div>
                      <div className="text-sm text-gray-600">Players Selected</div>
                    </div>
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">14</div>
                      <div className="text-sm text-gray-600">Current Gameweek</div>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <TrendingUp className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveTab('team')}
                    className="h-20 bg-red-600 hover:bg-red-700 text-white flex-col space-y-2"
                  >
                    <Users className="h-6 w-6" />
                    <span>View My Team</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab('transfers')}
                    className="h-20 bg-blue-600 hover:bg-blue-700 text-white flex-col space-y-2"
                  >
                    <Star className="h-6 w-6" />
                    <span>Make Transfers</span>
                  </Button>

                  <Link to="/players" className="block">
                    <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white flex-col space-y-2">
                      <Trophy className="h-6 w-6" />
                      <span>Browse Players</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tournament Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Tournament Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Competition</span>
                    <span className="font-semibold text-gray-900">Betway Premiership</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Season</span>
                    <span className="font-semibold text-gray-900">2024/25</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Teams</span>
                    <span className="font-semibold text-gray-900">{teams.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Current Round</span>
                    <Badge className="bg-red-100 text-red-800">Round 14</Badge>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Fantasy Budget</span>
                    <span className="font-semibold text-green-600">R100.0M</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">How to Play</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Select Your Squad</h4>
                      <p className="text-sm text-gray-600">Pick 15 players within your R100M budget</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Set Your Formation</h4>
                      <p className="text-sm text-gray-600">Choose 11 starting players for each gameweek</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Score Points</h4>
                      <p className="text-sm text-gray-600">Earn points based on real player performances</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Compete</h4>
                      <p className="text-sm text-gray-600">Climb the leaderboards and win prizes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-gray-500">
              <p>Official SA Fantasy Football | Betway Premiership 2024/25 Season</p>
              <p className="mt-2">Powered by Premier Soccer League</p>
            </div>
          </>
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
