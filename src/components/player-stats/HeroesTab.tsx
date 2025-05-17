import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";
import type { HeroesUnranked } from "@/lib/schema";
import { Avatar, AvatarImage } from "../ui/avatar";
import { usePlayerAndHeroQueries } from "@/pages/PlayerStats";

type SortableKey = 'hero_id' | 'hero_name' | 'matches' | 'wins' | 'mvp' | 'svp' | 'kills' | 'deaths' | 'assists' | 'play_time' | 'damage' | 'heal' | 'damage_taken' | 'win_rate' | 'main_attack_total' | 'main_attack_hits';

export function HeroesTab({ data, playerName }: { data: { heroes: HeroesUnranked }, playerName: string }) {
  const { heroes } = data;
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKey;
    direction: 'asc' | 'desc';
  }>({ key: 'matches', direction: 'desc' });

  // Handle sorting for unranked heroes
  const sortedHeroes = [...(heroes || [])].sort((a, b) => {
    if (sortConfig.key === 'win_rate') {
      const aWinRate = a.wins / a.matches || 0;
      const bWinRate = b.wins / b.matches || 0;
      return sortConfig.direction === 'asc'
        ? aWinRate - bWinRate
        : bWinRate - aWinRate;
    } else if (sortConfig.key === 'main_attack_total') {
      return sortConfig.direction === 'asc'
        ? a.main_attack.total - b.main_attack.total
        : b.main_attack.total - a.main_attack.total;
    } else if (sortConfig.key === 'main_attack_hits') {
      return sortConfig.direction === 'asc'
        ? a.main_attack.hits - b.main_attack.hits
        : b.main_attack.hits - a.main_attack.hits;
    } else {
      return sortConfig.direction === 'asc'
        ? (a[sortConfig.key] as number) - (b[sortConfig.key] as number)
        : (b[sortConfig.key] as number) - (a[sortConfig.key] as number);
    }
  });

  const handleSort = (key: SortableKey) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Render sort header with icon
  const renderSortHeader = (label: string, key: SortableKey) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => handleSort(key)}
    >
      {label}
      {sortConfig.key === key && (
        <span className="ml-2 inline-block">
          {sortConfig.direction === 'asc' ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
        </span>
      )}
    </TableHead>
  );

  const { heroes: allHeroes, isLoading: isLoadingHeroes} = usePlayerAndHeroQueries(playerName);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heroes Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {heroes && heroes.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {/* {renderSortHeader("Hero ID", "hero_id")} */}
                <TableHead>Thumbnail</TableHead>
                {renderSortHeader("Hero Name", "hero_name")}
                {renderSortHeader("Matches", "matches")}
                {renderSortHeader("Wins", "wins")}
                {renderSortHeader("Win Rate", "win_rate")}
                {renderSortHeader("MVP", "mvp")}
                {renderSortHeader("SVP", "svp")}
                {renderSortHeader("Kills", "kills")}
                {renderSortHeader("Deaths", "deaths")}
                {renderSortHeader("Assists", "assists")}
                {renderSortHeader("Play Time", "play_time")}
                {renderSortHeader("Damage", "damage")}
                {renderSortHeader("Heal", "heal")}
                {renderSortHeader("Damage Taken", "damage_taken")}
                {renderSortHeader("Main Attack Total", "main_attack_total")}
                {renderSortHeader("Main Attack Hits", "main_attack_hits")}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHeroes.map((hero, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{hero.hero_id}</TableCell> */}
                  <TableCell className='flex items-center justify-center'><Avatar><AvatarImage className='object-cover object-top' src={`https://marvelrivalsapi.com/${allHeroes?.find(h => Number(h.id) === hero.hero_id)?.imageUrl}`} /></Avatar></TableCell>
                  <TableCell className="font-medium">
                    {hero.hero_name}
                  </TableCell>
                  <TableCell>{hero.matches}</TableCell>
                  <TableCell>{hero.wins}</TableCell>
                  <TableCell>{hero.matches > 0 ? `${((hero.wins / hero.matches) * 100).toFixed(1)}%` : "0%"}</TableCell>
                  <TableCell>{hero.mvp}</TableCell>
                  <TableCell>{hero.svp}</TableCell>
                  <TableCell>{hero.kills}</TableCell>
                  <TableCell>{hero.deaths}</TableCell>
                  <TableCell>{hero.assists}</TableCell>
                  <TableCell>{hero.play_time}</TableCell>
                  <TableCell>{hero.damage}</TableCell>
                  <TableCell>{hero.heal}</TableCell>
                  <TableCell>{hero.damage_taken}</TableCell>
                  <TableCell>{hero.main_attack.total}</TableCell>
                  <TableCell>{hero.main_attack.hits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No unranked hero data available</p>
        )}
      </CardContent>
    </Card>
  );
} 

function useQuery(arg0: { queryKey: string[]; queryFn: () => Promise<Response>; }) {
  throw new Error("Function not implemented.");
}
