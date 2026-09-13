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

<article>
	<a href={resolve('/blog')} class="text-sm text-secondary transition-colors hover:text-accent">
		← Все посты
	</a>
	<header class="mt-6 mb-8 sm:mt-8 sm:mb-12">
		<span class="text-xs text-secondary-light">{formatter.format(new Date(meta.date))}</span>
		<h1 class="mt-2 text-2xl font-semibold text-primary sm:text-3xl">{meta.title}</h1>
		{#if meta.description}
			<p class="mt-3 text-base text-secondary">{meta.description}</p>
		{/if}
	</header>
	<div
		class="prose prose-slate dark:prose-invert prose-headings:text-primary prose-a:text-accent prose-strong:text-primary prose-code:text-code-text prose-code:break-words max-w-none prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto prose-img:h-auto prose-img:w-full prose-img:rounded-lg lg:prose-lg break-words"
	>
		<Post />
	</div>
</article>
