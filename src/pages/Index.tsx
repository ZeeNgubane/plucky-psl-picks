
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
      
      <main className="relative min-h-screen overflow-hidden">
        {/* Football pitch background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-600">
          {/* Grass texture overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Pitch lines overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            {/* Outer boundary */}
            <rect x="50" y="50" width="1100" height="700" fill="none" stroke="white" strokeWidth="4"/>
            
            {/* Center circle */}
            <circle cx="600" cy="400" r="120" fill="none" stroke="white" strokeWidth="4"/>
            <circle cx="600" cy="400" r="8" fill="white"/>
            
            {/* Center line */}
            <line x1="600" y1="50" x2="600" y2="750" stroke="white" strokeWidth="4"/>
            
            {/* Left goal area */}
            <rect x="50" y="300" width="80" height="200" fill="none" stroke="white" strokeWidth="4"/>
            <rect x="50" y="250" width="200" height="300" fill="none" stroke="white" strokeWidth="4"/>
            <path d="M 250 350 A 120 120 0 0 1 250 450" fill="none" stroke="white" strokeWidth="4"/>
            
            {/* Right goal area */}
            <rect x="1070" y="300" width="80" height="200" fill="none" stroke="white" strokeWidth="4"/>
            <rect x="950" y="250" width="200" height="300" fill="none" stroke="white" strokeWidth="4"/>
            <path d="M 950 350 A 120 120 0 0 0 950 450" fill="none" stroke="white" strokeWidth="4"/>
            
            {/* Corner arcs */}
            <path d="M 50 50 Q 80 50 80 80" fill="none" stroke="white" strokeWidth="4"/>
            <path d="M 1150 50 Q 1120 50 1120 80" fill="none" stroke="white" strokeWidth="4"/>
            <path d="M 50 750 Q 80 750 80 720" fill="none" stroke="white" strokeWidth="4"/>
            <path d="M 1150 750 Q 1120 750 1120 720" fill="none" stroke="white" strokeWidth="4"/>
            
            {/* Goal posts */}
            <rect x="45" y="350" width="10" height="100" fill="white"/>
            <rect x="1145" y="350" width="10" height="100" fill="white"/>
          </svg>
        </div>

        {/* Player silhouettes scattered across the pitch */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-32 w-12 h-16 bg-black rounded-lg transform rotate-12"></div>
          <div className="absolute top-40 left-64 w-10 h-14 bg-black rounded-lg transform -rotate-6"></div>
          <div className="absolute top-32 right-32 w-14 h-18 bg-black rounded-lg transform -rotate-12"></div>
          <div className="absolute top-60 right-64 w-12 h-16 bg-black rounded-lg transform rotate-6"></div>
          <div className="absolute bottom-32 left-40 w-12 h-18 bg-black rounded-lg transform -rotate-6"></div>
          <div className="absolute bottom-20 right-40 w-14 h-16 bg-black rounded-lg transform rotate-12"></div>
          <div className="absolute top-1/2 left-1/4 w-10 h-14 bg-black rounded-lg transform -rotate-3"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-16 bg-black rounded-lg transform rotate-8"></div>
        </div>

        {/* Football graphics */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-16 right-20 w-12 h-12 bg-white rounded-full border-4 border-black transform rotate-45">
            <div className="absolute inset-1 border-2 border-black rounded-full">
              <div className="w-full h-full border-r-2 border-black"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-black transform -translate-x-px"></div>
            </div>
          </div>
          <div className="absolute bottom-16 left-20 w-10 h-10 bg-white rounded-full border-4 border-black transform -rotate-12">
            <div className="absolute inset-1 border-2 border-black rounded-full">
              <div className="w-full h-full border-r-2 border-black"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-black transform -translate-x-px"></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-white rounded-full border-2 border-black transform rotate-30">
            <div className="absolute inset-1 border border-black rounded-full">
              <div className="w-full h-full border-r border-black"></div>
            </div>
          </div>
        </div>

        {/* Content overlay with semi-transparent background */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
