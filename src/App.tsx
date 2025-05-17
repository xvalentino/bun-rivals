import { Card, CardContent } from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";
import { PlayerStats } from "./pages/PlayerStats";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
	// Check if we're on a player page
	const isPlayerPage = window.location.pathname.startsWith("/players/");

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

	// Show an error message if we're on a player page but no player name found
	if (isPlayerPage) {
		return (
			<div className="container mx-auto p-8">
				<div className="mb-4">
					<a href="/" className="text-blue-500 hover:underline">
						Back to Home
					</a>
				</div>
				<div className="p-4 bg-red-100 text-red-800 rounded-md">
					No player name provided in URL. Please use a valid player URL like
					/players/playername.
				</div>
			</div>
		);
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
					<h1 className="text-5xl font-bold my-4 leading-tight">Bun + React</h1>
					<p>
						Edit{" "}
						<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
							src/App.tsx
						</code>{" "}
						and save to test HMR
					</p>
					<div className="mb-4">
						<a
							href="/players/testplayer"
							className="text-blue-500 hover:underline"
						>
							View Test Player Page
						</a>
					</div>
					<APITester />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
