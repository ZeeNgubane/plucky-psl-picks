import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Megaphone } from 'lucide-react';

const articles = [
  { id: 1, type: 'Article', title: 'Sundowns Extend Lead at the Top', excerpt: 'Masandawana continue their unbeaten run with a dominant display.' },
  { id: 2, type: 'Team News', title: 'Pirates Boost Ahead of Soweto Derby', excerpt: 'Key midfielder returns to full training this week.' },
  { id: 3, type: 'Article', title: 'Chiefs Eye January Signings', excerpt: 'Amakhosi linked with two top-flight forwards.' },
];

const ArticlesNewsAds = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center">
          <Newspaper className="h-4 w-4 mr-2 text-primary" />
          Articles & Team News
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <Card key={a.id} className="ds-card hover:border-primary/40 transition">
            <div className="h-32 bg-gradient-to-br from-psl-blue/20 to-psl-gold/20 rounded-t-2xl flex items-center justify-center text-xs text-muted-foreground">
              [ Image placeholder ]
            </div>
            <CardHeader className="pb-2">
              <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{a.type}</span>
              <CardTitle className="text-sm font-bold text-foreground leading-tight">{a.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">{a.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-dashed border-border rounded-2xl bg-surface/60">
        <CardContent className="py-8 flex flex-col items-center justify-center text-muted-foreground">
          <Megaphone className="h-6 w-6 mb-2" />
          <p className="text-xs uppercase tracking-widest font-semibold">Advertisement Placeholder</p>
          <p className="text-[10px] mt-1">728 x 90 banner area</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesNewsAds;
