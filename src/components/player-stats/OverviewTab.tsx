import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { OverviewTabProps } from "./types";

export function OverviewTab({ data }: OverviewTabProps) {
	const { overallStats, updates } = data;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Overall Stats</CardTitle>
			</CardHeader>
			<CardContent>
				{overallStats ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Stat</TableHead>
								<TableHead>Value</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Object.entries(overallStats).map(([key, value]) => {
								if (key === "ranked" || key === "unranked") {
									const stats = value as {
										total_matches: number;
										total_wins: number;
										total_assists: number;
										total_deaths: number;
										total_kills: number;
										total_time_played: string;
										total_mvp: number;
										total_svp: number;
									};
									return (
										<TableRow key={key} className="border-t-2">
											<TableCell className="font-medium capitalize">
												{key}
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													<div>
														Matches: {stats.total_matches} (Wins:{" "}
														{stats.total_wins})
													</div>
													<div>
														KDA: {stats.total_kills}/{stats.total_deaths}/
														{stats.total_assists}
													</div>
													<div>Time Played: {stats.total_time_played}</div>
													<div>
														MVP: {stats.total_mvp} / SVP: {stats.total_svp}
													</div>
												</div>
											</TableCell>
										</TableRow>
									);
								}
								return (
									<TableRow key={key}>
										<TableCell className="font-medium">
											{key.replace(/_/g, " ")}
										</TableCell>
										<TableCell>
											{typeof value === "number"
												? value
												: JSON.stringify(value)}
										</TableCell>
									</TableRow>
								);
							})}
							{updates &&
								Object.entries(updates).map(([key, value]) => {
									return (
										<TableRow key={key}>
											<TableCell className="font-medium">
												{key.replace(/_/g, " ")}
											</TableCell>
											<TableCell>
												{typeof value === "number"
													? value
													: JSON.stringify(value)}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				) : (
					<p>No overall stats available</p>
				)}
			</CardContent>
		</Card>
	);
}
