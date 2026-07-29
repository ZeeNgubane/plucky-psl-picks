import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface UserBadgePanelProps {
  teamName?: string;
  tier?: 'bronze' | 'silver' | 'gold';
  compact?: boolean;
}

const tierStyles: Record<string, { label: string; color: string; bg: string }> = {
  bronze: { label: 'Bronze', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/40' },
  silver: { label: 'Silver', color: 'text-slate-300', bg: 'bg-slate-300/10 border-slate-300/40' },
  gold: { label: 'Gold', color: 'text-primary', bg: 'bg-primary/10 border-primary/40' },
};

const UserBadgePanel = ({ teamName = 'My Fantasy XI', tier = 'gold', compact = false }: UserBadgePanelProps) => {
  const t = tierStyles[tier];
  return (
    <Card className="ds-card border-l-4 border-l-primary">
      <CardContent
        className={
          compact
            ? 'p-2 lg:p-4 flex flex-row lg:flex-col items-center text-center gap-3 lg:space-y-3 lg:gap-0'
            : 'p-4 flex flex-col items-center text-center space-y-3'
        }
      >
        <div
          className={
            compact
              ? 'w-[60px] h-[60px] lg:w-20 lg:h-20 shrink-0 rounded-full bg-gradient-to-br from-psl-blue to-psl-dark flex items-center justify-center shadow-inner border-2 border-psl-gold/40 order-1 lg:order-2'
              : 'w-20 h-20 rounded-full bg-gradient-to-br from-psl-blue to-psl-dark flex items-center justify-center shadow-inner border-2 border-psl-gold/40'
          }
        >
          <Shield className={compact ? 'h-7 w-7 lg:h-10 lg:w-10 text-psl-gold' : 'h-10 w-10 text-psl-gold'} strokeWidth={1.5} />
        </div>
        <div className={compact ? 'flex-1 min-w-0 flex flex-col items-start lg:items-center gap-1 lg:gap-3 order-2 lg:order-1 lg:contents' : 'contents'}>
          <p className={compact ? 'font-bold text-sm text-foreground truncate w-full text-left lg:text-center lg:order-1' : 'font-bold text-sm text-foreground truncate w-full'}>
            {teamName}
          </p>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${t.bg} ${t.color} ${compact ? 'lg:order-3' : ''}`}
          >
            {t.label} Tier
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBadgePanel;
