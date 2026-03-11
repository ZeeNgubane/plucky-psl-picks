import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Trophy, Calendar, Users } from "lucide-react";

interface PSLData {
  fixtures?: any[];
  standings?: any[];
  news?: any[];
  lastUpdated?: string;
}

export const PSLBot = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pslData, setPslData] = useState<PSLData>({});

  const fetchPSLData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-psl-data');
      if (error) throw error;
      const response = { ok: true, json: async () => data };

      if (!response.ok) {
        throw new Error('Failed to fetch PSL data');
      }

      const data = await response.json();
      setPslData(data);
      
      toast({
        title: "Success",
        description: "PSL data fetched successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching PSL data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch PSL data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Control Panel */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            PSL Data Bot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              onClick={fetchPSLData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {isLoading ? "Fetching..." : "Fetch PSL Data"}
            </Button>
            {pslData.lastUpdated && (
              <Badge variant="outline">
                Last updated: {new Date(pslData.lastUpdated).toLocaleString()}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fixtures */}
      {pslData.fixtures && pslData.fixtures.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Upcoming Fixtures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pslData.fixtures.slice(0, 5).map((fixture, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{fixture.homeTeam}</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium">{fixture.awayTeam}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {fixture.date && new Date(fixture.date).toLocaleDateString()}
                    </div>
                  </div>
                  {fixture.venue && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Venue: {fixture.venue}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* League Table */}
      {pslData.standings && pslData.standings.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              League Table
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pslData.standings.slice(0, 10).map((team, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>P: {team.played || 0}</span>
                    <span>W: {team.wins || 0}</span>
                    <span>D: {team.draws || 0}</span>
                    <span>L: {team.losses || 0}</span>
                    <span className="font-medium">Pts: {team.points || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* News */}
      {pslData.news && pslData.news.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pslData.news.slice(0, 5).map((article, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                  <h3 className="font-medium mb-2">{article.title}</h3>
                  {article.summary && (
                    <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                  )}
                  {article.date && (
                    <div className="text-xs text-muted-foreground">
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {!isLoading && Object.keys(pslData).length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Click "Fetch PSL Data" to get the latest information</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};