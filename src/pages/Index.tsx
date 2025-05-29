
import { useState } from 'react';
import Header from '@/components/Header';
import MyTeam from '@/components/MyTeam';
import Transfers from '@/components/Transfers';
import League from '@/components/League';
import { Player } from '@/data/teams';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(100.0);
  const { toast } = useToast();

  const handlePlayerAdd = (player: Player) => {
    if (budget < player.price) {
      toast({
        title: "Insufficient Budget",
        description: `You need $${player.price}M but only have $${budget.toFixed(1)}M available.`,
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

  const renderContent = () => {
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
        return <MyTeam selectedPlayers={selectedPlayers} budget={budget} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
