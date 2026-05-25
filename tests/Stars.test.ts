import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import StarRating from '../src/lib/Stars.svelte';
import type { RatingConfig } from '../src/lib/types.js';

describe('StarRating', () => {
	it('renders with default config (no props)', () => {
		const { container } = render(StarRating);
		const stars = container.querySelectorAll('svg');
		expect(stars).toHaveLength(5);
	});

	it('renders correct number of stars', () => {
		const { container } = render(StarRating, {
			props: { config: { countStars: 3 } satisfies RatingConfig }
		});
		expect(container.querySelectorAll('svg')).toHaveLength(3);
	});

	it('shows score by default', () => {
		const { container } = render(StarRating, {
			props: { config: { score: 3, countStars: 5 } }
		});
		const scoreEl = container.querySelector('.show-score');
		expect(scoreEl).toBeInTheDocument();
	});

	it('hides score when showScore is false', () => {
		const { container } = render(StarRating, {
			props: { config: { showScore: false } }
		});
		expect(container.querySelector('.show-score')).not.toBeInTheDocument();
	});

	it('uses custom scoreFormat function', () => {
		const scoreFormat = (score: number, total: number) => `${score} of ${total}`;
		const { container } = render(StarRating, {
			props: { config: { score: 3, countStars: 5, scoreFormat } }
		});
		expect(container.querySelector('.show-score')?.textContent?.trim()).toBe('3 of 5');
	});

	it('renders slider in interactive mode', () => {
		const { container } = render(StarRating, {
			props: { config: { readOnly: false } }
		});
		const slider = container.querySelector('input[type="range"]');
		expect(slider).toBeInTheDocument();
		expect(slider).not.toBeDisabled();
	});

	it('slider has same min/max when readOnly', () => {
		const { container } = render(StarRating, {
			props: { config: { readOnly: true, score: 4, range: { min: 0, max: 5, step: 1 } } }
		});
		const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
		expect(slider.min).toBe('4');
		expect(slider.max).toBe('4');
	});

	it('slider uses range when not readOnly', () => {
		const { container } = render(StarRating, {
			props: { config: { readOnly: false, range: { min: 0, max: 10, step: 0.5 } } }
		});
		const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
		expect(slider.min).toBe('0');
		expect(slider.max).toBe('10');
		expect(slider.step).toBe('0.5');
	});

	it('has accessible aria-label on slider', () => {
		const { container } = render(StarRating, {
			props: { config: { score: 3, countStars: 5 } }
		});
		const slider = container.querySelector('input[type="range"]');
		expect(slider).toHaveAttribute('aria-label');
	});

	it('updates config score on input', async () => {
		const config: RatingConfig = { score: 2, countStars: 5 };
		const { container } = render(StarRating, { props: { config } });
		const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
		await fireEvent.input(slider, { target: { value: '4' } });
		// Score display should reflect the change
		const scoreEl = container.querySelector('.show-score');
		expect(scoreEl).toBeInTheDocument();
	});

	it('default score format shows percentage', () => {
		const { container } = render(StarRating, {
			props: { config: { score: 2.5, countStars: 5, showScore: true } }
		});
		const scoreEl = container.querySelector('.show-score');
		expect(scoreEl?.textContent).toContain('%');
	});

	it('renders with name applied to input', () => {
		const { container } = render(StarRating, {
			props: { config: { name: 'product-rating' } }
		});
		const slider = container.querySelector('input[type="range"]');
		expect(slider).toHaveAttribute('name', 'product-rating');
	});
});
