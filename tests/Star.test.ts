import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Star from '../src/lib/components/Star.svelte';

const defaultStarConfig = {
	size: 30,
	fillColor: '#F9ED4F',
	strokeColor: '#BB8511',
	unfilledColor: '#FFF',
	strokeUnfilledColor: '#000'
};

describe('Star', () => {
	it('renders an SVG element', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-0',
				readOnly: false,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('uses fill color when fillPercentage is 1', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-full',
				readOnly: false,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		const path = container.querySelector('path');
		expect(path?.getAttribute('fill')).toBe(defaultStarConfig.fillColor);
	});

	it('uses unfilled color when fillPercentage is 0', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-empty',
				readOnly: false,
				fillPercentage: 0,
				starConfig: defaultStarConfig
			}
		});
		const path = container.querySelector('path');
		expect(path?.getAttribute('fill')).toBe(defaultStarConfig.unfilledColor);
	});

	it('uses gradient when fillPercentage is between 0 and 1', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-partial',
				readOnly: false,
				fillPercentage: 0.5,
				starConfig: defaultStarConfig
			}
		});
		const path = container.querySelector('path');
		expect(path?.getAttribute('fill')).toContain('url(#linear-gradient-test-partial)');
		expect(container.querySelector('linearGradient')).toBeInTheDocument();
	});

	it('renders no gradient when fully filled', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-no-gradient',
				readOnly: false,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		expect(container.querySelector('linearGradient')).not.toBeInTheDocument();
	});

	it('renders no gradient when fully empty', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-no-gradient-empty',
				readOnly: false,
				fillPercentage: 0,
				starConfig: defaultStarConfig
			}
		});
		expect(container.querySelector('linearGradient')).not.toBeInTheDocument();
	});

	it('applies reduced opacity when readOnly', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-readonly',
				readOnly: true,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		const path = container.querySelector('path');
		expect(path?.getAttribute('opacity')).toBe('0.7');
	});

	it('applies full opacity when not readOnly', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-interactive',
				readOnly: false,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		const path = container.querySelector('path');
		expect(path?.getAttribute('opacity')).toBe('1');
	});

	it('sets width and height from starConfig.size', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-size',
				readOnly: false,
				fillPercentage: 1,
				starConfig: { ...defaultStarConfig, size: 50 }
			}
		});
		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('50');
		expect(svg?.getAttribute('height')).toBe('50');
	});

	it('uses stroke color based on fill state', () => {
		const { container: filled } = render(Star, {
			props: {
				id: 'test-stroke-filled',
				readOnly: false,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		expect(filled.querySelector('path')?.getAttribute('stroke')).toBe(defaultStarConfig.strokeColor);

		const { container: empty } = render(Star, {
			props: {
				id: 'test-stroke-empty',
				readOnly: false,
				fillPercentage: 0,
				starConfig: defaultStarConfig
			}
		});
		expect(empty.querySelector('path')?.getAttribute('stroke')).toBe(defaultStarConfig.strokeUnfilledColor);
	});

	it('has aria-hidden on SVG', () => {
		const { container } = render(Star, {
			props: {
				id: 'test-aria',
				readOnly: false,
				fillPercentage: 1,
				starConfig: defaultStarConfig
			}
		});
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
	});
});
