<script>
	export let size = 40;
	export let onSelect = () => {};
</script>

<div
	class="cursor-pointer p-2 hover:-translate-x-[4px] transition-transform inline-block rounded-full bg-white"
	on:pointerdown={onSelect}
	on:keydown={(e) => (e.code === 'Enter' || e.code === 'Space') && onSelect()}
	aria-label="Go back"
	role="button"
	tabindex={0}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M19 12H5M12 19l-7-7 7-7" />
	</svg>
</div>
