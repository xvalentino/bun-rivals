import db from "./db";
import { HeroSchema, PlayerSchema, type Hero, type Player } from "./schema";
import { z } from "zod";

// Define result type for better error handling
type Result<T, E extends Error = Error> = 
  | { ok: true; data: T } 
  | { ok: false; error: E };

// Helper function to make API requests with consistent error handling
async function apiRequest<T>(
  url: string, 
  schema: z.ZodType<T>
): Promise<Result<T, Error>> {
  try {
    const apiKey = process.env.MARVEL_RIVALS_API_KEY;
    
    if (!apiKey) {
      return { 
        ok: false, 
        error: new Error("Missing MARVEL_RIVALS_API_KEY environment variable") 
      };
    }
    
    const res = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!res.ok) {
      return { 
        ok: false, 
        error: new Error(`API error: ${res.status} ${res.statusText}`) 
      };
    }

    const data = await res.json();
    
    try {
      const parsed = schema.parse(data);
      return { ok: true, data: parsed };
    } catch (error) {
      return { 
        ok: false, 
        error: error instanceof Error ? error : new Error("Parsing error") 
      };
    }
  } catch (error) {
    return { 
      ok: false, 
      error: error instanceof Error ? error : new Error("Unknown error") 
    };
  }
}

export async function fetchAndStoreHeroes(): Promise<Result<Hero[], Error>> {
  const result = await apiRequest(
    "https://marvelrivalsapi.com/api/v1/heroes",
    z.array(HeroSchema)
  );

  if (!result.ok) {
    console.error("Failed to fetch heroes:", result.error);
    return result;
  }

  const heroes = result.data;
  
  try {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO heroes
      (id, name, real_name, imageUrl, role, attack_type, difficulty, team)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const hero of heroes) {
      stmt.run(
        hero.id,
        hero.name,
        hero.real_name,
        hero.imageUrl,
        hero.role,
        hero.attack_type,
        hero.difficulty,
        JSON.stringify(hero.team)
      );
    }

    console.log(`Inserted/updated ${heroes.length} heroes.`);
    return { ok: true, data: heroes };
  } catch (error) {
    console.error("Error storing heroes:", error);
    return { 
      ok: false, 
      error: error instanceof Error ? error : new Error("Database error") 
    };
  }
}

export async function fetchAndStorePlayer(playerName: string): Promise<Result<Player, Error>> {
  if (!playerName) {
    return { ok: false, error: new Error("Player name is required") };
  }
  
  const result = await apiRequest(
    `https://marvelrivalsapi.com/api/v1/player/${playerName}`,
    PlayerSchema
  );

  if (!result.ok) {
    console.error("Failed to fetch player:", result.error);
    return result;
  }

  const player = result.data;
  
  try {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO players
      (uid, name, player_data, match_history, rank_history, hero_matchups, 
       team_mates, heroes_ranked, heroes_unranked, maps, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    // Ensure uid is a string before storing it
    const uid = typeof player.uid === 'number' ? player.uid.toString() : player.uid;
    
    stmt.run(
      uid,
      player.name,
      JSON.stringify(player.player || {}),
      player.match_history ? JSON.stringify(player.match_history) : null,
      player.rank_history ? JSON.stringify(player.rank_history) : null,
      player.hero_matchups ? JSON.stringify(player.hero_matchups) : null,
      player.team_mates ? JSON.stringify(player.team_mates) : null,
      player.heroes_ranked ? JSON.stringify(player.heroes_ranked) : null,
      player.heroes_unranked ? JSON.stringify(player.heroes_unranked) : null,
      player.maps ? JSON.stringify(player.maps) : null
    );

    console.log(`Player ${player.name} data saved.`);
    return { ok: true, data: player };
  } catch (error) {
    console.error("Error storing player:", error);
    return { 
      ok: false, 
      error: error instanceof Error ? error : new Error("Database error") 
    };
  }
}

// fetchAndStoreHeroes().catch((err) => {
//   console.error("Error:", err);
// });
