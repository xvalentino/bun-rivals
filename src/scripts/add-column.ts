import { Database } from "bun:sqlite";

try {
	// Open the database connection
	const db = new Database("app.db", { create: false, readwrite: true });

	console.log("Adding overall_stats column to players table...");

	// Add the new column using ALTER TABLE
	db.run(`ALTER TABLE players ADD COLUMN overall_stats JSON;`);

	console.log("Column added successfully!");

	// Close the database connection
	db.close();
} catch (error) {
	console.error("Error adding column:", error);
}
