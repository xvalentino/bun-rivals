import { Database } from "bun:sqlite";

try {
  // Remove existing database file
  try {
    console.log("Creating fresh database...");
    // Create new database connection with create flag
    const db = new Database("app.db", { create: true });
    
    // Enable foreign keys and safe mode
    db.run("PRAGMA foreign_keys = ON;");
    db.run("PRAGMA journal_mode = WAL;");
    
    // Create heroes table
    console.log("Creating heroes table...");
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
    
    // Create players table with overall_stats column
    console.log("Creating players table with overall_stats column...");
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
        overall_stats JSON,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Database created successfully!");
    
    // Close the database connection
    db.close();
  } catch (error) {
    console.error("Database creation error:", error);
    process.exit(1);
  }
} catch (error) {
  console.error("Error:", error);
} 