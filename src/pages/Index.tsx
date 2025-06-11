import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Star, Calendar, TrendingUp, Award, Target, Clock, Plus, ArrowUpDown, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Player, teams } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
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

  const getPositionIcon = (position: string) => {
    const icons = {
      GK: '🥅',
      DEF: '🛡️', 
      MID: '⚽',
      FWD: '⚽'
    };
    return icons[position] || '⚽';
  };

  const formation = {
    GK: selectedPlayers.filter(p => p.position === 'GK'),
    DEF: selectedPlayers.filter(p => p.position === 'DEF'),
    MID: selectedPlayers.filter(p => p.position === 'MID'),
    FWD: selectedPlayers.filter(p => p.position === 'FWD')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PSL Header Section */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://www.psl.co.za/media/10983/psl-logo-gold.png" 
                alt="PSL Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0JZOmbEBlLE_lP0SKjIaxOfpF4DvC3bZoQ&s';
                }}
              />
              <div>
                <h1 className="text-3xl font-bold">SA Fantasy Football</h1>
                <p className="text-red-100">Betway Premiership 2024/25</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">Current Gameweek</div>
              <div className="font-bold text-2xl">14</div>
              <div className="text-sm text-red-100">of 30</div>
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
          <div className="space-y-6">
            {/* Team Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedPlayers.length}</div>
                    <div className="text-sm text-gray-600">Squad Size</div>
                    <div className="text-xs text-gray-500">15 max</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">R{(budget * 18).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600">Budget Left</div>
                    <div className="text-xs text-gray-500">R100M total</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedPlayers.reduce((sum, p) => sum + p.points, 0)}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                    <div className="text-xs text-gray-500">This season</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">14</div>
                    <div className="text-sm text-gray-600">Gameweek</div>
                    <div className="text-xs text-gray-500">Round 14</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* My Team Section - Premier League Fantasy Style */}
            <Card className="bg-white">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">My Team</CardTitle>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('transfers')}
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      Transfers
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('team')}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      View Team
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {selectedPlayers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Users className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Your squad is empty</h3>
                      <p className="text-gray-500 mb-6">Start building your dream team by selecting players</p>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('transfers')}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Players
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Squad Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Squad Overview</h3>
                        <div className="space-y-4">
                          {/* Goalkeepers */}
                          <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 flex items-center">
                                <span className="text-yellow-600 mr-2">🥅</span>
                                Goalkeepers ({formation.GK.length}/2)
                              </h4>
                              {formation.GK.length < 2 && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setActiveTab('transfers')}
                                  className="text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                            <div className="space-y-2">
                              {formation.GK.map(player => (
                                <div key={player.id} className="flex items-center justify-between bg-white p-3 rounded border">
                                  <div>
                                    <p className="font-medium text-gray-900">{player.name}</p>
                                    <p className="text-sm text-gray-500">{player.team}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">R{(player.price * 18).toFixed(1)}M</p>
                                    <p className="text-sm text-blue-600">{player.points} pts</p>
                                  </div>
                                </div>
                              ))}
                              {formation.GK.length === 0 && (
                                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-yellow-300 rounded">
                                  <p className="text-sm">No goalkeepers selected</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Defenders */}
                          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 flex items-center">
                                <span className="text-blue-600 mr-2">🛡️</span>
                                Defenders ({formation.DEF.length}/5)
                              </h4>
                              {formation.DEF.length < 5 && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setActiveTab('transfers')}
                                  className="text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {formation.DEF.map(player => (
                                <div key={player.id} className="flex items-center justify-between bg-white p-3 rounded border">
                                  <div>
                                    <p className="font-medium text-gray-900">{player.name}</p>
                                    <p className="text-sm text-gray-500">{player.team}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">R{(player.price * 18).toFixed(1)}M</p>
                                    <p className="text-sm text-blue-600">{player.points} pts</p>
                                  </div>
                                </div>
                              ))}
                              {formation.DEF.length === 0 && (
                                <div className="md:col-span-2 text-center py-4 text-gray-500 border-2 border-dashed border-blue-300 rounded">
                                  <p className="text-sm">No defenders selected</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Midfielders */}
                          <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 flex items-center">
                                <span className="text-green-600 mr-2">⚽</span>
                                Midfielders ({formation.MID.length}/5)
                              </h4>
                              {formation.MID.length < 5 && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setActiveTab('transfers')}
                                  className="text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {formation.MID.map(player => (
                                <div key={player.id} className="flex items-center justify-between bg-white p-3 rounded border">
                                  <div>
                                    <p className="font-medium text-gray-900">{player.name}</p>
                                    <p className="text-sm text-gray-500">{player.team}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">R{(player.price * 18).toFixed(1)}M</p>
                                    <p className="text-sm text-blue-600">{player.points} pts</p>
                                  </div>
                                </div>
                              ))}
                              {formation.MID.length === 0 && (
                                <div className="md:col-span-2 text-center py-4 text-gray-500 border-2 border-dashed border-green-300 rounded">
                                  <p className="text-sm">No midfielders selected</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Forwards */}
                          <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 flex items-center">
                                <span className="text-red-600 mr-2">⚡</span>
                                Forwards ({formation.FWD.length}/3)
                              </h4>
                              {formation.FWD.length < 3 && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setActiveTab('transfers')}
                                  className="text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                            <div className="space-y-2">
                              {formation.FWD.map(player => (
                                <div key={player.id} className="flex items-center justify-between bg-white p-3 rounded border">
                                  <div>
                                    <p className="font-medium text-gray-900">{player.name}</p>
                                    <p className="text-sm text-gray-500">{player.team}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">R{(player.price * 18).toFixed(1)}M</p>
                                    <p className="text-sm text-blue-600">{player.points} pts</p>
                                  </div>
                                </div>
                              ))}
                              {formation.FWD.length === 0 && (
                                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-red-300 rounded">
                                  <p className="text-sm">No forwards selected</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sidebar Info */}
                      <div className="space-y-4">
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                              <Info className="h-4 w-4 mr-2" />
                              Squad Status
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Players:</span>
                              <span className="font-medium">{selectedPlayers.length}/15</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Budget:</span>
                              <span className="font-medium text-green-600">R{(budget * 18).toFixed(1)}M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Team Value:</span>
                              <span className="font-medium">R{((100 - budget) * 18).toFixed(1)}M</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-blue-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-blue-700">Next Deadline</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-blue-600 font-medium">15 Feb 2025</p>
                            <p className="text-xs text-blue-500">3 days remaining</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
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
