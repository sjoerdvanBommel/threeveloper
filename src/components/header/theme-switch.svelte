<script lang="ts">
	import { Themes, theme } from '../../stores/theme';

	const toggleDarkMode = () => theme.set($theme === Themes.Light ? Themes.Dark : Themes.Light);

	$: darkMode = $theme === 'dark';
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<div class="flex justify-center items-center">
		<span>
			<svg
				class="h-6 w-6 transition-colors text-gray-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		</span>
		<!-- Switch Container -->
		<div
			on:pointerdown={toggleDarkMode}
			on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleDarkMode()}
			aria-label="Dark mode toggle"
			role="switch"
			aria-checked={darkMode}
			tabindex={0}
			class="w-14 h-7 flex items-center rounded-full mx-3 px-1 transition-colors bg-gray-300"
			class:bg-gray-300={darkMode}
			class:bg-gray-500={!darkMode}
		>
			<!-- Switch -->
			<div
				class="bg-white w-5 h-5 rounded-full shadow-md transition-transform"
				class:translate-x-7={darkMode}
			/>
		</div>
		<span class="">
			<svg
				class="h-6 w-6 transition-colors text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
		</span>
	</div>
</div>
