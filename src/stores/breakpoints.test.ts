import { get } from 'svelte/store';
import { setScreenSize } from '../test/msw/setupTests';
import { is2Xl, isLg, isMd, isSm, isSmaller, isXl } from './breakpoints';

describe('breakpoints', () => {
	it('sets initial value correct based on screen size', () => {
		setScreenSize(1920);

		expect(get(isSmaller)).toBe(false);
		expect(get(isSm)).toBe(false);
		expect(get(isMd)).toBe(false);
		expect(get(isLg)).toBe(false);
		expect(get(isXl)).toBe(false);
		expect(get(is2Xl)).toBe(true);
	});

	it('updates 2xl when screen size changes', () => {
		setScreenSize(9999);
		expect(get(is2Xl)).toBe(true);

		setScreenSize(1536);
		expect(get(is2Xl)).toBe(true);

		setScreenSize(1535);
		expect(get(is2Xl)).toBe(false);
	});

	it('updates xl when screen size changes', () => {
		setScreenSize(1536);
		expect(get(isXl)).toBe(false);

		setScreenSize(1535);
		expect(get(isXl)).toBe(true);

		setScreenSize(1280);
		expect(get(isXl)).toBe(true);

		setScreenSize(1279);
		expect(get(isXl)).toBe(false);
	});

	it('updates lg when screen size changes', () => {
		setScreenSize(1280);
		expect(get(isLg)).toBe(false);

		setScreenSize(1279);
		expect(get(isLg)).toBe(true);

		setScreenSize(1024);
		expect(get(isLg)).toBe(true);

		setScreenSize(1023);
		expect(get(isLg)).toBe(false);
	});

	it('updates md when screen size changes', () => {
		setScreenSize(1024);
		expect(get(isMd)).toBe(false);

		setScreenSize(1023);
		expect(get(isMd)).toBe(true);

		setScreenSize(768);
		expect(get(isMd)).toBe(true);

		setScreenSize(767);
		expect(get(isMd)).toBe(false);
	});

	it('updates sm when screen size changes', () => {
		setScreenSize(768);
		expect(get(isSm)).toBe(false);

		setScreenSize(767);
		expect(get(isSm)).toBe(true);

		setScreenSize(640);
		expect(get(isSm)).toBe(true);

		setScreenSize(639);
		expect(get(isSm)).toBe(false);
	});

	it('updates smaller when screen size changes', () => {
		setScreenSize(640);
		expect(get(isSmaller)).toBe(false);

		setScreenSize(639);
		expect(get(isSmaller)).toBe(true);

		setScreenSize(1);
		expect(get(isSmaller)).toBe(true);
	});
});
