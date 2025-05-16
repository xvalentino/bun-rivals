import { type Server, serve } from "bun";
import index from "./index.html";
import { fetchAndStoreHeroes, fetchAndStorePlayer } from "./lib/mv-api";
import type { Hero, Player } from "./lib/schema";

// Define a result type for API responses
type Result<T, E extends Error = Error> = 
  | { ok: true; data: T }
  | { ok: false; error: E };

// Helper function for consistent API responses
function apiResponse<T>(result: Result<T>): Response {
  if (result.ok) {
    return Response.json({ ok: true, data: result.data });
  } else {
    console.error("API Error:", result.error);
    return Response.json(
      { ok: false, error: result.error.message }, 
      { status: 500 }
    );
  }
}

const server: Server = serve({
  fetch(req) {
    const url = new URL(req.url);
    
    // Route handling
    try {
      // Serve static assets from /public folder
      if (url.pathname.startsWith("/static/")) {
        const file = Bun.file("public" + url.pathname);
        return new Response(file);
      }
      
      // API Routes
      if (url.pathname.startsWith("/api/")) {
        return handleApiRequest(req);
      }
      
      // Default route - serve the frontend
      return new Response(index, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (error) {
      console.error("Server error:", error);
      return Response.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

async function handleApiRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  
  // Skip the "api" part
  if (pathSegments[0] !== "api" || pathSegments.length < 2) {
    return Response.json({ error: "Invalid API path" }, { status: 404 });
  }
  
  const resource = pathSegments[1];
  
  try {
    switch (resource) {
      case "hydrate": {
        if (pathSegments[2] === "heroes") {
          await fetchAndStoreHeroes();
          return Response.json({ ok: true });
        } else if (pathSegments[2] === "players" && pathSegments[3]) {
          const playerName = pathSegments[3];
          const player = await fetchAndStorePlayer(playerName);
          return Response.json({ ok: true, player });
        }
        break;
      }
      
      case "heroes": {
        const db = (await import("./lib/db")).default;
        const heroes = db.query("SELECT * FROM heroes").all() as Hero[];
        return Response.json({ heroes });
      }
      
      case "players": {
        if (pathSegments[2]) {
          const playerName = pathSegments[2];
          const db = (await import("./lib/db")).default;
          const player = db.query("SELECT * FROM players WHERE name = ?").get(playerName) as Player | undefined;
          
          if (!player) {
            return Response.json({ error: "Player not found" }, { status: 404 });
          }
          
          return Response.json({ player });
        }
        break;
      }
    }
    
    return Response.json({ error: "Resource not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error handling ${url.pathname}:`, error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

console.log(`🚀 Server running at ${server.url}`);
