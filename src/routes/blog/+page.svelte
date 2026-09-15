<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		month: 'long',
		year: 'numeric'
	});
</script>

<Seo
	title="Блог"
	description="Заметки о разработке на Kotlin, Spring Boot и SvelteKit — архитектура, продакшн-практики, разбор технических решений."
/>

<section>
	<h1 class="text-2xl font-semibold text-primary">Блог</h1>
	<p class="mt-2 text-secondary">Заметки о бэкенде, фронтенде и продакшн-практиках.</p>

	{#if data.posts.length === 0}
		<p class="mt-12 text-secondary">Пока нет ни одного поста — загляните позже.</p>
	{:else}
		<ul class="mt-10 divide-y divide-slate-200 dark:divide-slate-800">
			{#each data.posts as post (post.slug)}
				<li>
					<a href={resolve('/blog/[slug]', { slug: post.slug })} class="group flex flex-col gap-1 py-5">
						<span class="text-xs text-secondary-light">
							{formatter.format(new Date(post.date))}
						</span>
						<span class="text-lg font-medium text-primary transition-colors group-hover:text-accent">
							{post.title}
						</span>
						{#if post.description}
							<span class="text-sm text-secondary">{post.description}</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
