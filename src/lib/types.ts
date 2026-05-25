export interface StarConfig {
	size?: number;
	fillColor?: string;
	strokeColor?: string;
	unfilledColor?: string;
	strokeUnfilledColor?: string;
}

export interface RatingConfig {
	readOnly?: boolean;
	countStars?: number;
	range?: { min: number; max: number; step: number };
	score?: number;
	showScore?: boolean;
	name?: string;
	/**
	 * Custom score formatter. Receives the current score and total star count.
	 * @example (score, total) => `${score} / ${total} stars`
	 */
	scoreFormat?: (score: number, countStars: number) => string;
	starConfig?: StarConfig;
}

export interface ResolvedRatingConfig {
	readOnly: boolean;
	countStars: number;
	range: { min: number; max: number; step: number };
	score: number;
	showScore: boolean;
	name: string;
	scoreFormat?: (score: number, countStars: number) => string;
	starConfig: Required<StarConfig>;
}
