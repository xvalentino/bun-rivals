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
  matches: z.number(),
  player_info: z.object({
    nick_name: z.string(),
    player_icon: z.string(),
    player_uid: z.number(),
  }),
  win_rate: z.string(),
  wins: z.number(),
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
  updates: z.record(z.enum(["info_update_time", "last_history_update", "last_inserted_match", "last_update_request"]), z.string()).optional(),
  player: z.object({
    uid: z.number(),
    level: z.string(),
    name: z.string(),
    icon: z.object({
      player_icon_id: z.string(),
      player_icon: z.string()
    }),
    rank: z.object({
      rank: z.string(),
      image: z.string().nullable(),
      color: z.string().nullable()
    }),
    team: z.object({
      club_team_id: z.string(),
      club_team_mini_name: z.string(),
      club_team_type: z.string()
    }),
    info: z.object({
      completed_achievements: z.string(),
      login_os: z.string(),
      rank_game_season: z.record(z.object({
        rank_game_id: z.number(),
        level: z.number(),
        rank_score: z.number(),
        max_level: z.number(),
        max_rank_score: z.number(),
        update_time: z.number(),
        win_count: z.number(),
        protect_score: z.number(),
        diff_score: z.number()
      }))
    })
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

export const PlayerResponseSchema = PlayerSchema.pick({
  uid: true,
  name: true,
}).extend({
  // TODO: should probably just have a helper that parses all the nested JSON after reading from DB
  updated_at: z.string(),
  player_data: z.string().transform(v => PlayerSchema.shape.player.parse(JSON.parse(v))),
  match_history: z.string().transform(v => PlayerSchema.shape.match_history.parse(JSON.parse(v))),
  rank_history: z.string().transform(v => PlayerSchema.shape.rank_history.parse(JSON.parse(v))),
  hero_matchups: z.string().transform(v => PlayerSchema.shape.hero_matchups.parse(JSON.parse(v))),
  team_mates: z.string().transform(v => PlayerSchema.shape.team_mates.parse(JSON.parse(v))),
  heroes_ranked: z.string().transform(v => PlayerSchema.shape.heroes_ranked.parse(JSON.parse(v))),
  heroes_unranked: z.string().transform(v => PlayerSchema.shape.heroes_unranked.parse(JSON.parse(v))),
  maps: z.string().transform(v => PlayerSchema.shape.maps.parse(JSON.parse(v))),
  updates: z.string().transform(v => PlayerSchema.shape.updates.parse(JSON.parse(v))),
  overall_stats: z.string().transform(v => PlayerSchema.shape.overall_stats.parse(JSON.parse(v))),
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


// export const PlayerResponse = z.object({
//   uid: z.string(),
//   name: z.string(),
//   player_data: z.string().optional().transform(val => val && JSON.parse(val)).pipe(PlayerDataSchema).optional(),
//   match_history: z.string().transform(val => JSON.parse(val)).pipe(z.array(MatchHistorySchema)).optional(),
//   rank_history: z.string().transform(val => JSON.parse(val)).pipe(z.array(RankHistorySchema)).optional(),
//   hero_matchups: z.string().transform(val => JSON.parse(val)).pipe(z.array(HeroMatchupSchema)).optional(),
//   team_mates: z.string().transform(val => JSON.parse(val)).pipe(z.array(TeammateSchema)).optional(),
//   heroes_ranked: z.string().transform(val => JSON.parse(val)).pipe(z.array(HeroesRankedSchema)).optional(),
//   heroes_unranked: z.string().transform(val => JSON.parse(val)).pipe(z.array(HeroesRankedSchema)).optional(), 
//   maps: z.string().transform(val => JSON.parse(val)).pipe(z.array(z.any())).optional(),
//   overall_stats: z.string().transform(val => JSON.parse(val)).pipe(OverallStatsSchema).optional(),
//   updated_at: z.string()
// })

// Export types derived from schemas
export type Player = z.infer<typeof PlayerSchema>;
export type MatchHistoryItem = z.infer<typeof MatchHistoryItemSchema>;
export type RankHistoryItem = z.infer<typeof RankHistoryItemSchema>;
export type HeroMatchup = z.infer<typeof HeroMatchupSchema>;
export type Teammate = z.infer<typeof TeammateSchema>;
