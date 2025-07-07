
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const articles = [
  { 
    title: 'PSL Transfer News: Latest rumours from Kaizer Chiefs, Orlando Pirates, Mamelodi Sundowns & the rest of the PSL teams', 
    excerpt: 'Stay updated with all the latest transfer news, rumours and confirmed signings from across the Premier Soccer League.', 
    image: 'https://www.goal.com/en-za/lists/psl-transfer-news-latest-rumours-from-kaizer-chiefs-orlando-pirates-mamelodi-sundowns-the-rest-of-the-psl-teams/blt7153bd1580f8a0cc',
    url: 'https://www.goal.com/en-za/lists/psl-transfer-news-latest-rumours-from-kaizer-chiefs-orlando-pirates-mamelodi-sundowns-the-rest-of-the-psl-teams/blt7153bd1580f8a0cc'
  },
  { title: 'Fantasy Hot or Not: Who to pick for Gameweek 15?', excerpt: 'Our experts analyze the form guide and suggest top transfer targets.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop' },
  { title: 'Team of the Week: Gameweek 14 standouts', excerpt: 'See which players made the cut in this week\'s dream team.', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop' },
];

const LatestNews = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="flex items-start space-x-4 group cursor-pointer" onClick={() => article.url && window.open(article.url, '_blank')}>
             <img 
               src={article.image} 
               alt={article.title} 
               className="h-20 w-28 object-cover rounded-md"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop';
               }}
             />
             <div>
               <h3 className="font-semibold group-hover:text-red-600 transition-colors">{article.title}</h3>
               <p className="text-sm text-muted-foreground">{article.excerpt}</p>
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestNews;
