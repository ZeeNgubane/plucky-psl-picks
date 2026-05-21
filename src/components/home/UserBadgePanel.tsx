import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface UserBadgePanelProps {
  teamName?: string;
  tier?: 'bronze' | 'silver' | 'gold';
}

const tierStyles: Record<string, { label: string; color: string; bg: string }> = {
  bronze: { label: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100 border-amber-300' },
  silver: { label: 'Silver', color: 'text-slate-600', bg: 'bg-slate-100 border-slate-300' },
  gold: { label: 'Gold', color: 'text-yellow-700', bg: 'bg-yellow-100 border-yellow-400' },
};

const UserBadgePanel = ({ teamName = 'My Fantasy XI', tier = 'gold' }: UserBadgePanelProps) => {
  const t = tierStyles[tier];
  return (
    <Card className="border-0 border-l-4 border-l-psl-gold rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
        <p className="font-bold text-sm text-gray-800 truncate w-full">{teamName}</p>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-psl-blue to-psl-dark flex items-center justify-center shadow-inner border-2 border-psl-gold/40">
          <Shield className="h-10 w-10 text-psl-gold" strokeWidth={1.5} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${t.bg} ${t.color}`}>
          {t.label} Tier
        </span>
      </CardContent>
    </Card>
  );
};

export default UserBadgePanel;
