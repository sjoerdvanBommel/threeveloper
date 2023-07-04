<script lang="ts">
	import Gallery from '../components/gallery/gallery.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="w-full mt-8">
	<Gallery photos={data.photos} />
</main>
