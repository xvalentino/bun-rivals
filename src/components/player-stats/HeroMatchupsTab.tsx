import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";
import { toTitleCase } from "@/lib/utils";
import type { HeroMatchupsTabProps } from "./types";

export function HeroMatchupsTab({ data, heroes }: HeroMatchupsTabProps) {
  const { heroMatchups } = data;
  const [sortConfig, setSortConfig] = useState<{
    key: 'hero_id' | 'win_rate';
    direction: 'asc' | 'desc';
  }>({ key: 'win_rate', direction: 'desc' });

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
              {sortedHeroMatchups.map((hero, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {toTitleCase(heroes?.find((h) => h.id === String(hero.hero_id))?.name || '') || hero.hero_id}
                  </TableCell>
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
  );
} 