<script lang="ts">
	import type { Component } from 'svelte';
	import { resolve } from '$app/paths';
	import type { PostMeta } from '$lib/types';

	let { component: Post, meta }: { component: Component; meta: PostMeta } = $props();

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
</script>

<article class="mx-auto max-w-2xl">
	<a href={resolve('/blog')} class="text-sm text-secondary transition-colors hover:text-accent">
		← Все посты
	</a>

	<header class="mt-8 mb-12">
		<span class="text-xs text-secondary-light">{formatter.format(new Date(meta.date))}</span>
		<h1 class="mt-2 text-3xl font-semibold text-primary">{meta.title}</h1>
		{#if meta.description}
			<p class="mt-3 text-base text-secondary">{meta.description}</p>
		{/if}
	</header>

	<div
		class="prose prose-slate dark:prose-invert prose-headings:text-primary prose-a:text-accent prose-strong:text-primary prose-code:text-code-text max-w-none"
	>
		<Post />
	</div>
</article>
