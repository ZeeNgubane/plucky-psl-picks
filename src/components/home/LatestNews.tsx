import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

const articles = [
  { 
    title: 'Leon double sees Sundowns to crucial victory over Pirates', 
    excerpt: 'Brayan Leon continued his outstanding form by scoring both goals for Mamelodi Sundowns in their 2-1 Betway Premiership win over Orlando Pirates.',
    date: '18 Feb 2026',
    image: 'https://images.supersport.com/2026/2/Brayan-Leon-celebrates-260218G400.jpg',
  },
  { 
    title: 'Magesi battle back for a point in Stellenbosch', 
    excerpt: 'Stellenbosch remained unbeaten under Gavin Hunt after they played out to a 1-1 draw with Magesi at the Danie Craven Stadium.',
    date: '18 Feb 2026',
    image: 'https://images.supersport.com/2026/2/Samuel-Darpoh-celebratesgoal-260218G687.jpg',
  },
  { 
    title: 'Sekhukhune overcome Orbit, rise to third place', 
    excerpt: 'Sekhukhune United have moved to third place on the Betway Premiership log after they defeated Orbit College 2-0.',
    date: '15 Feb 2026',
    image: 'https://images.supersport.com/2026/2/Sekhukhuneplayers-celebrates-2602-G-400.jpg',
  },
  { 
    title: 'Chippa thrash Bay to keep up fine form', 
    excerpt: 'Chippa United continued their fine recent run by thrashing Richards Bay 3-0 in a Betway Premiership match at the Buffalo City Stadium.',
    date: '14 Feb 2026',
    image: 'https://images.supersport.com/2026/2/Sirgio-Kammies-celebrates-2602-G-400.jpg',
  },
];

const LatestNews = () => {
  return (
    <Card className="border-0 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-amber-600" />
          <span className="text-xl font-bold text-gray-800">Latest News</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="flex items-start space-x-3 group cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
             <img 
               src={article.image} 
               alt={article.title} 
               className="h-16 w-24 object-cover rounded-md flex-shrink-0"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop';
               }}
             />
             <div className="min-w-0">
               <h3 className="font-semibold text-sm text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">{article.title}</h3>
               <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
               <span className="text-[10px] text-gray-400 mt-1 block">{article.date}</span>
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestNews;
