import { Database } from "bun:sqlite";

// Create database connection
const db = new Database("app.db");

// Enable foreign keys and safe mode
db.run("PRAGMA foreign_keys = ON;");
db.run("PRAGMA journal_mode = WAL;");

// Create heroes table
db.run(`
  CREATE TABLE IF NOT EXISTS heroes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    real_name TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    role TEXT NOT NULL,
    attack_type TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    team TEXT NOT NULL
  )
`);

// Create players table
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    uid TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    player_data JSON NOT NULL,
    match_history JSON,
    rank_history JSON,
    hero_matchups JSON,
    team_mates JSON,
    heroes_ranked JSON,
    heroes_unranked JSON,
    maps JSON,
    updates JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Type-safe database interface
export interface DB {
	/**
	 * Executes a SQL query and returns all results
	 */
	query<T = unknown>(
		sql: string,
	): {
		all(): T[];
		get(...params: unknown[]): T | undefined;
		run(...params: unknown[]): void;
		values(): unknown[][];
	};

	/**
	 * Prepares a statement for execution
	 */
	prepare<T = unknown>(
		sql: string,
	): {
		all(...params: unknown[]): T[];
		get(...params: unknown[]): T | undefined;
		run(...params: unknown[]): void;
		values(...params: unknown[]): unknown[][];
	};
}
// db.run("ALTER TABLE players ADD COLUMN updates JSON;");

// Export database instance
export default db as DB;
