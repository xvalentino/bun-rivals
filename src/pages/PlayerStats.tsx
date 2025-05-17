import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { PlayerResponseSchema, HeroSchema } from "@/lib/schema";
import { useQueries } from "@tanstack/react-query";
import { 
  OverviewTab, 
  HeroMatchupsTab, 
  TeammatesTab,
  HeroesTab
} from "@/components/player-stats";
import type { PlayerStatsProps } from "@/components/player-stats";

export const usePlayerAndHeroQueries = (playerName: string) => useQueries({
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

export function PlayerStats({ playerName }: PlayerStatsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const results = usePlayerAndHeroQueries(playerName);

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

  // Extract player data properties
  const matchHistory = playerData.match_history;
  const rankHistory = playerData.rank_history;
  const heroMatchups = playerData.hero_matchups;
  const teamMates = playerData.team_mates;
  const heroesRanked = playerData.heroes_ranked;
  const heroesUnranked = playerData.heroes_unranked;
  const overallStats = playerData.overall_stats;

  // Determine which tabs to show based on available data
  const hasMatchHistory = matchHistory && matchHistory.length > 0;
  const hasRankHistory = rankHistory && rankHistory.length > 0;
  const hasHeroMatchups = heroMatchups && heroMatchups.length > 0;
  const hasTeammates = teamMates && teamMates.length > 0;
  const hasRankedHeroes = heroesRanked && Object.keys(heroesRanked).length > 0;
  const hasUnrankedHeroes = heroesUnranked && Object.keys(heroesUnranked).length > 0;

  // Ensure heroes is never undefined
  const safeHeroes = heroes || [];

  return (
    <Card className="w-full">
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasHeroMatchups && <TabsTrigger value="heroes">Hero Matchups</TabsTrigger>}
            {hasTeammates && <TabsTrigger value="teammates">Teammates</TabsTrigger>}
            {hasRankedHeroes && <TabsTrigger value="ranked-heroes">Ranked Heroes</TabsTrigger>}
            {hasUnrankedHeroes && <TabsTrigger value="unranked-heroes">Unranked Heroes</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab data={{ overallStats }} />
          </TabsContent>

          {hasHeroMatchups && (
            <TabsContent value="heroes">
              <HeroMatchupsTab data={{ heroMatchups }} heroes={safeHeroes} />
            </TabsContent>
          )}

          {hasTeammates && (
            <TabsContent value="teammates">
              <TeammatesTab data={{ teamMates }} />
            </TabsContent>
          )}

          {hasRankedHeroes && (
            <TabsContent value="ranked-heroes">
              <HeroesTab 
                data={{ heroes: heroesRanked }}
              />
            </TabsContent>
          )}

          {hasUnrankedHeroes && (
            <TabsContent value="unranked-heroes">
              <HeroesTab 
                data={{ heroes: heroesUnranked }} 
              />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}