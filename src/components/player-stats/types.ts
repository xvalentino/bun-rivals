import type {
	Hero,
	HeroMatchup,
	MatchHistoryItem,
	RankHistoryItem,
	Teammate,
} from "@/lib/schema";

export interface PlayerStatsProps {
	playerName: string;
}

export interface TabContentProps {
	data: any;
	heroes?: Hero[];
}

export interface OverviewTabProps extends TabContentProps {
	data: {
		overallStats: any;
		updates: any;
	};
}

export interface MatchHistoryTabProps extends TabContentProps {
	data: {
		matchHistory: MatchHistoryItem[];
	};
}

export interface RankHistoryTabProps extends TabContentProps {
	data: {
		rankHistory: RankHistoryItem[];
	};
}

export interface HeroMatchupsTabProps extends TabContentProps {
	data: {
		heroMatchups: HeroMatchup[];
	};
	heroes: Hero[];
}

export interface TeammatesTabProps extends TabContentProps {
	data: {
		teamMates: Teammate[];
	};
}

export interface RankedHeroesTabProps extends TabContentProps {
	data: {
		heroesRanked: Array<{
			hero_id: number;
			games_played: number;
			games_won: number;
		}>;
	};
	heroes: Hero[];
}

export interface UnrankedHeroesTabProps extends TabContentProps {
	data: {
		heroesUnranked: Array<{
			hero_id: number;
			games_played: number;
			games_won: number;
		}>;
	};
	heroes: Hero[];
}
