<script lang="ts">
	import Gallery from '@components/gallery/gallery.svelte';
	import Header from '@components/header/header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Header />

<main class="w-full grow flex flex-col p-6">
	<Gallery photos={data.photos} />
</main>
