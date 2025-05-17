import { z } from "zod";

export const HeroSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  real_name: z.string().min(1),
  imageUrl: z.string(),
  role: z.string().min(1),
  attack_type: z.string().min(1),
  // team: z.array(z.string().min(1)),
  difficulty: z.string().min(1),
  // Excluded: bio, lore, transformations, costumes, abilities
});

export type Hero = z.infer<typeof HeroSchema>;

// Define discriminated unions for match data
const MatchHistoryItemSchema = z.object({
  match_id: z.string().optional(),
  date: z.string().optional(),
  result: z.string().optional(),
  kills: z.number().optional(),
  deaths: z.number().optional(),
  assists: z.number().optional(),
});

const RankHistoryItemSchema = z.object({
  season: z.number().optional(),
  rank: z.string().optional(),
  points: z.number().optional(),
});

const HeroMatchupSchema = z.object({
  hero_id: z.number(),
  // API returns win_rate as string, so parse it to number
  win_rate: z.union([
    z.number(),
    z.string().refine(
      val => !isNaN(parseFloat(val)),
      { message: "String must be convertible to a number" }
    ).transform(val => parseFloat(val))
  ]),
});

const TeammateSchema = z.object({
  teammate_id: z.string().optional(),
  nickname: z.string().optional(),
});

const RankedOrUnrankedSchema = z.object({
  total_matches: z.number(),
  total_wins: z.number(),
  total_assists: z.number(),
  total_deaths: z.number(),
  total_kills: z.number(),
  total_time_played: z.string(),
  total_time_played_raw: z.number(),
  total_mvp: z.number(),
  total_svp: z.number()
});

const OverallStatsSchema = z.object({
  total_matches: z.number(),
  total_wins: z.number(),
  unranked: RankedOrUnrankedSchema,
  ranked: RankedOrUnrankedSchema
})

// Define a more robust PlayerSchema
export const PlayerSchema = z.object({
  uid: z.union([
    z.string(),
    z.number().transform(val => val.toString())
  ]).transform(val => val.toString()),
  name: z.string().min(1),
  updates: z.record(z.union([z.object({}), z.string()])).optional(),
  player: z.object({
    player_id: z.string().optional(),
    nickname: z.string().optional(),
    isPrivate: z.boolean().optional(),
  }),
  overall_stats: OverallStatsSchema,
  match_history: z.array(MatchHistoryItemSchema).optional(),
  rank_history: z.array(RankHistoryItemSchema).optional(),
  hero_matchups: z.array(HeroMatchupSchema).optional(),
  team_mates: z.array(TeammateSchema).optional(),
  heroes_ranked: z.union([z.record(z.number()), z.array(z.any())]).optional(),
  heroes_unranked: z.union([z.record(z.number()), z.array(z.any())]).optional(),
  maps: z.union([z.record(z.number()), z.array(z.any())]).optional(),
});



const PlayerDataSchema = z.object({
  player_id: z.string().optional(),
  nickname: z.string().optional(),
  isPrivate: z.boolean().optional()
});

const MatchHistorySchema = z.object({
  match_id: z.string().optional(),
  date: z.string().datetime().optional(),
  result: z.enum(["win", "lose"]).optional(),
  kills: z.number().optional(),
  deaths: z.number().optional(), 
  assists: z.number().optional()
});

const RankHistorySchema = z.object({
  season: z.number().optional(),
  rank: z.string().optional(),
  points: z.number().optional()
});

const HeroesRankedSchema = z.object({
  hero_id: z.number().optional(),
  games_played: z.number().optional(),
  games_won: z.number().optional()
});


export const PlayerResponse = z.object({
  uid: z.string(),
  name: z.string(),
  player_data: z.string().optional().transform(val => val && JSON.parse(val)).pipe(PlayerDataSchema).optional(),
  match_history: z.string().transform(val => JSON.parse(val)).pipe(z.array(MatchHistorySchema)).optional(),
  rank_history: z.string().transform(val => JSON.parse(val)).pipe(z.array(RankHistorySchema)).optional(),
  hero_matchups: z.string().transform(val => JSON.parse(val)).pipe(z.array(HeroMatchupSchema)).optional(),
  team_mates: z.string().transform(val => JSON.parse(val)).pipe(z.array(TeammateSchema)).optional(),
  heroes_ranked: z.string().transform(val => JSON.parse(val)).pipe(z.array(HeroesRankedSchema)).optional(),
  heroes_unranked: z.string().transform(val => JSON.parse(val)).pipe(z.array(HeroesRankedSchema)).optional(), 
  maps: z.string().transform(val => JSON.parse(val)).pipe(z.array(z.any())).optional(),
  overall_stats: z.string().transform(val => JSON.parse(val)).pipe(OverallStatsSchema).optional(),
  updated_at: z.string()
})

// Export types derived from schemas
export type Player = z.infer<typeof PlayerSchema>;
export type MatchHistoryItem = z.infer<typeof MatchHistoryItemSchema>;
export type RankHistoryItem = z.infer<typeof RankHistoryItemSchema>;
export type HeroMatchup = z.infer<typeof HeroMatchupSchema>;
export type Teammate = z.infer<typeof TeammateSchema>;
