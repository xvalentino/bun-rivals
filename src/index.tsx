import { serve } from "bun";
import { fetchAndStoreHeroes, fetchAndStorePlayer, updatePlayer } from "./lib/mv-api";
import { type Hero, type Player } from "./lib/schema";
import index from "./index.html";


const server = serve({
  port: 3000,
  
  // Define routes
  routes: {
    
    // API Routes
    "/api/hydrate/heroes": async () => {
      try {
        await fetchAndStoreHeroes();
        return Response.json({ ok: true });
      } catch (error) {
        console.error("Error hydrating heroes:", error);
        return Response.json(
          { error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
        );
      }
    },
    
    "/api/hydrate/players/:name": async (req) => {
      try {
        const playerName = req.params.name;
        const player = await fetchAndStorePlayer(playerName);
        return Response.json({ ok: true, player });
      } catch (error) {
        console.error("Error hydrating player:", error);
        return Response.json(
          { error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
        );
      }
    },

    "/api/hydrate/players/:name/update": async (req) => {
      const playerName = req.params.name;
      const result = await updatePlayer(playerName);

      return Response.json({ ok: true, result });
    },
    
    "/api/heroes": async () => {
      try {
        const db = (await import("./lib/db")).default;
        const heroes = db.query("SELECT * FROM heroes").all() as Hero[];
        return Response.json({ heroes });
      } catch (error) {
        console.error("Error fetching heroes:", error);
        return Response.json(
          { error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
        );
      }
    },
    
    "/api/players/:name": async (req) => {
      try {
        const playerName = req.params.name;
        const db = (await import("./lib/db")).default;
        const player = db.query("SELECT * FROM players WHERE name = ?").get(playerName) as Player | undefined;
        
        if (!player) {
          return Response.json({ error: "Player not found" }, { status: 404 });
        }
        
        return Response.json({ player });
      } catch (error) {
        console.error("Error fetching player:", error);
        return Response.json(
          { error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
        );
      }
    },

    // Wildcard for any other API routes
    "/api/*": () => Response.json({ error: "API endpoint not found" }, { status: 404 }),
    
    // Serve static assets from /static
    "/static/*": (req) => {
      const path = req.url.substring(req.url.indexOf("/static/") + 7);
      const file = Bun.file(`public/static/${path}`);
      return new Response(file);
    },

    "/": index,
    "/players/:name": index,
  },
  
  // Fallback for unmatched routes - serve the frontend
  // fetch(req) {
  //   console.log('fetch')
  //   return new Response(Bun.file("src/index.html"), {
  //     headers: { "Content-Type": "text/html" },
  //   });
  // },
  
  // Development settings
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
