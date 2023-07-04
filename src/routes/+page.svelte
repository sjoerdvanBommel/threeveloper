<script lang="ts">
	import Gallery from '../components/gallery/gallery.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="w-full grow mt-8 flex flex-col">
	<Gallery photos={data.photos} />
</main>
