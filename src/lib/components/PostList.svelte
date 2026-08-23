<script lang="ts">
	let { items, ordered = false }: { items: string[]; ordered?: boolean } = $props();
</script>

<svelte:element this={ordered ? 'ol' : 'ul'} class="not-prose my-6 flex flex-col gap-3">
	{#each items as item, i}
		<li class="flex items-start gap-3 text-secondary">
			{#if ordered}
				<span
					class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent"
				>
					{i + 1}
				</span>
			{:else}
				<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
			{/if}
			<span>{item}</span>
		</li>
	{/each}
</svelte:element>
