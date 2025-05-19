import { Card, CardContent } from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";
import { PlayerStats } from "./pages/PlayerStats";
import { PlayerSearch } from "./pages/PlayerSearch";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
	// Check if we're on a player page
	const isPlayerPage = window.location.pathname.startsWith("/players");

	// If we're on a player page, extract the player name
	const playerName = isPlayerPage
		? window.location.pathname.split("/")[2]
		: null;

	// If we're on a player page with a player name, show player info
	if (isPlayerPage && playerName) {
		return (
			<div className="container mx-auto p-8">
				<div className="mb-4">
					<a href="/" className="text-blue-500 hover:underline">
						Back to Home
					</a>
				</div>
				<PlayerStats playerName={playerName} />
			</div>
		);
	}
	if (isPlayerPage) {
		return <PlayerSearch />;
	}
	// Otherwise show the normal home page
	return (
		<div className="container mx-auto p-8 text-center relative z-10">
			<div className="flex justify-center items-center gap-8 mb-8">
				<img
					src={logo}
					alt="Bun Logo"
					className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
				/>
				<img
					src={reactLogo}
					alt="React Logo"
					className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
				/>
			</div>

			<Card className="bg-card/50 backdrop-blur-sm border-muted">
				<CardContent className="pt-6">
					<h1 className="text-5xl font-bold my-4 leading-tight">Rivals App</h1>
					<p>
						This app is a work in progress. Send requests to the following URL to populate the database:<br />
						To add the player to the database: /api/hydrate/players/:playername<br/>
						To "refresh" the player's data, so that its up to date (takes 30 minutes): /api/hydrate/players/:playername/update<br/>
					</p>
					<div className="mb-4">
						<a
							href="/players"
							className="text-blue-500 hover:underline"
						>
							View Players Page
						</a>
					</div>
					<APITester />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
