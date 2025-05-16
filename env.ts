// env.ts
export const MARVEL_RIVALS_API_KEY = process.env.MARVEL_RIVALS_API_KEY;
if (!MARVEL_RIVALS_API_KEY) {
  throw new Error("MARVEL_RIVALS_API_KEY is not set in environment variables.");
}

