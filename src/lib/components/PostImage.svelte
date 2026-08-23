<script lang="ts">
	let { src, alt, caption }: { src: string; alt: string; caption?: string } = $props();
</script>

<figure class="not-prose my-8">
	<img
		{src}
		{alt}
		loading="lazy"
		class="w-full rounded-lg border border-slate-200 shadow-lg dark:border-slate-700"
	/>
	{#if caption}
		<figcaption class="mt-3 text-center text-sm text-secondary">{caption}</figcaption>
	{/if}
</figure>
