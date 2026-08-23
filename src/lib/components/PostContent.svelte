<script lang="ts">
	import type { Component } from 'svelte';
	import type { PostMeta } from '$lib/types';

	let { component: Post, meta }: { component: Component; meta: PostMeta } = $props();

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
</script>

<article class="mx-auto max-w-3xl">
	<header class="mb-10">
		<span class="text-sm font-medium text-accent">{formatter.format(new Date(meta.date))}</span>
		<h1 class="mt-2 text-3xl font-bold text-primary sm:text-4xl">{meta.title}</h1>
		{#if meta.description}
			<p class="mt-4 text-lg text-secondary">{meta.description}</p>
		{/if}
	</header>
	<div
		class="prose prose-slate dark:prose-invert prose-headings:text-primary prose-a:text-accent prose-strong:text-primary prose-code:text-code-text max-w-none"
	>
		<Post />
	</div>
</article>
