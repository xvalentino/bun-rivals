import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { PlayerResponseSchema, HeroSchema } from "@/lib/schema";
import { useQueries } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";

interface PlayerStatsProps {
  playerName: string;
}

export function PlayerStats({ playerName }: PlayerStatsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [sortConfig, setSortConfig] = useState<{
    key: 'hero_id' | 'win_rate';
    direction: 'asc' | 'desc';
  }>({ key: 'win_rate', direction: 'desc' });

  const results = useQueries({
    combine: (results) => {
      return {
        heroes: results[0].data,
        playerData: results[1].data,
        isLoading: results.some((result) => result.isLoading),
        error: results.reduce((acc: Error | null, result) => {
          if (result.error) {
            return result.error as Error;
          }
          return acc;
        }, null)
      }
    },
    queries: [
      {
        queryKey: ['heroes'],
        queryFn: async () => {
          const response = await fetch('/api/heroes');
          const result = await response.json();
          const heroes = z.array(HeroSchema).parse(result.heroes);
          return heroes;
        }
      },
      {
        queryKey: ['player', playerName],
        queryFn: async () => {
          const response = await fetch(`/api/players/${playerName}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch player data: ${response.status}`);
          }
          
          const result = await response.json();

          if (result.error) {
            throw new Error(result.error);
          }
          const player = PlayerResponseSchema.parse(result.player);
          
          return player;
        }
      }
    ]
  });

  const { heroes, playerData, isLoading, error } = results;

  if (isLoading) {
    return <div>Loading player data...</div>;
  }

  if (error) {
    return <div>Error loading player data: {error instanceof Error ? error.message : "Unknown error"}</div>;
  }

  if (!playerData) {
    return <div>No player data found. Please check the player name.</div>;
  }

  // Use player's name from database
  const name = playerData.name;
  const matchHistory = playerData.match_history;
  const rankHistory = playerData.rank_history;
  const heroMatchups = playerData.hero_matchups;
  const teamMates = playerData.team_mates;
  
  // For overall stats, we'll check if it exists in player_data
  const overallStats = playerData.overall_stats;

  // Handle sorting for hero matchups
  const sortedHeroMatchups = [...(heroMatchups || [])].sort((a, b) => {
    if (sortConfig.key === 'hero_id') {
      const heroA = heroes?.find((h) => h.id === String(a.hero_id))?.name || '';
      const heroB = heroes?.find((h) => h.id === String(b.hero_id))?.name || '';
      return sortConfig.direction === 'asc' 
        ? heroA.localeCompare(heroB)
        : heroB.localeCompare(heroA);
    } else {
      return sortConfig.direction === 'asc'
        ? a.win_rate - b.win_rate
        : b.win_rate - a.win_rate;
    }
  });

  const handleSort = (key: 'hero_id' | 'win_rate') => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <Card className="w-full">

      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {matchHistory && matchHistory.length > 0 && (
              <TabsTrigger value="matches">Match History</TabsTrigger>
            )}
            {rankHistory && Object.keys(rankHistory).length > 0 && (
              <TabsTrigger value="ranks">Rank History</TabsTrigger>
            )}
            {heroMatchups && heroMatchups.length > 0 && (
              <TabsTrigger value="heroes">Hero Matchups</TabsTrigger>
            )}
            {teamMates && teamMates.length > 0 && (
              <TabsTrigger value="teammates">Teammates</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overall Stats</CardTitle>
              </CardHeader>
              <CardContent>
                {overallStats ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stat</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(overallStats).map(([key, value]) => {
                        if (key === 'ranked' || key === 'unranked') {
                          const stats = value as {
                            total_matches: number;
                            total_wins: number;
                            total_assists: number;
                            total_deaths: number;
                            total_kills: number;
                            total_time_played: string;
                            total_mvp: number;
                            total_svp: number;
                          };
                          return (
                            <TableRow key={key} className="border-t-2">
                              <TableCell className="font-medium capitalize">{key}</TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div>Matches: {stats.total_matches} (Wins: {stats.total_wins})</div>
                                  <div>KDA: {stats.total_kills}/{stats.total_deaths}/{stats.total_assists}</div>
                                  <div>Time Played: {stats.total_time_played}</div>
                                  <div>MVP: {stats.total_mvp} / SVP: {stats.total_svp}</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                        return (
                          <TableRow key={key}>
                            <TableCell className="font-medium">{key.replace(/_/g, ' ')}</TableCell>
                            <TableCell>{typeof value === 'number' ? value : JSON.stringify(value)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No overall stats available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Match History</CardTitle>
              </CardHeader>
              <CardContent>
                {matchHistory && matchHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>KDA</TableHead>
                        <TableHead>Match ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matchHistory.map((match: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{match.date || "N/A"}</TableCell>
                          <TableCell>
                            <Badge variant={match.result === "win" ? "secondary" : "destructive"}>
                              {match.result || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {match.kills !== undefined && match.deaths !== undefined && match.assists !== undefined
                              ? `${match.kills}/${match.deaths}/${match.assists}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>{match.match_id || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No match history available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ranks">
            <Card>
              <CardHeader>
                <CardTitle>Rank History</CardTitle>
              </CardHeader>
              <CardContent>
                {rankHistory && Object.keys(rankHistory).length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Season</TableHead>
                        <TableHead>Rank</TableHead>
                        <TableHead>Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rankHistory.map((rank: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>Season {rank.season || "N/A"}</TableCell>
                          <TableCell>{rank.rank || "N/A"}</TableCell>
                          <TableCell>{rank.points !== undefined ? rank.points : "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No rank history available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heroes">
            <Card>
              <CardHeader>
                <CardTitle>Hero Matchups</CardTitle>
              </CardHeader>
              <CardContent>
                {heroMatchups && heroMatchups.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSort('hero_id')}
                        >
                          Hero
                          {sortConfig.key === 'hero_id' && (
                            <span className="ml-2 inline-block">
                              {sortConfig.direction === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSort('win_rate')}
                        >
                          Win Rate
                          {sortConfig.key === 'win_rate' && (
                            <span className="ml-2 inline-block">
                              {sortConfig.direction === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedHeroMatchups.map((hero, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{toTitleCase(heroes?.find((h) => h.id === String(hero.hero_id))?.name || '') || hero.hero_id}</TableCell>
                          <TableCell>
                            <Badge variant={hero.win_rate > 50 ? "secondary" : "outline"}>
                              {hero.win_rate}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No hero matchup data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teammates">
            <Card>
              <CardHeader>
                <CardTitle>Teammates</CardTitle>
              </CardHeader>
              <CardContent>
                {teamMates && teamMates.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teammate ID</TableHead>
                        <TableHead>Nickname</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMates.map((teammate: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{teammate.teammate_id || "N/A"}</TableCell>
                          <TableCell>{teammate.nickname || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No teammate data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 

function toTitleCase(str: string): string {
  if (!str) return '';
  return str.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}