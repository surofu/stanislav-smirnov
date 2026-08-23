<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
</script>

<Seo
	title="Блог"
	description="Заметки о разработке на Kotlin, Spring Boot и SvelteKit — архитектура, продакшн-практики, разбор технических решений."
/>

<section>
	{#if data.posts.length === 0}
		<p class="text-secondary">Пока нет ни одного поста — загляните позже.</p>
	{:else}
		<ul class="flex flex-col gap-6">
			{#each data.posts as post (post.slug)}
				<li>
					<a
						href={resolve('/blog/[slug]', { slug: post.slug })}
						class="group block rounded-lg bg-primary-bg border border-slate-200 dark:border-slate-700 p-6 backdrop-blur-xs shadow-lg"
					>
						<span class="text-sm font-medium text-accent">
							{formatter.format(new Date(post.date))}
						</span>
						<h3 class="mt-2 text-xl font-semibold text-primary transition-colors group-hover:text-accent">
							{post.title}
						</h3>
						<p class="mt-2 text-sm text-secondary">{post.description}</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
