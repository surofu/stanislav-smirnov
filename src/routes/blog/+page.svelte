<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo } from '$lib';
	import type { PageProps } from './$types';
	import GridDots from '$lib/components/GridDots.svelte';

	let { data }: PageProps = $props();

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});
</script>

<Seo
		title="Блог"
		description="Полный цикл веб-разработки: бэкенд, фронтенд, дизайн, DevOps. Делюсь процессом создания сайтов, сервисов и CRM, изучаю новые технологии и развиваю пет-проекты."
		keywords="блог веб-разработчика, SvelteKit, Java, Kotlin, Spring Boot, Дизайн, продакшн-практики, архитектура веб-приложений"
/>

<section>
	<h1 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Блог</h1>
	<p class="mt-2 text-secondary">Заметки о бэкенде, фронтенде и продакшн-практиках.</p>

	{#if data.posts.length === 0}
		<p class="mt-12 text-secondary">Пока нет ни одного поста — загляните позже.</p>
	{:else}
		<ul class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each data.posts as post (post.slug)}
				<li>
					<a
							href={resolve('/blog/[slug]', { slug: post.slug })}
							class="group flex h-full flex-col rounded-lg overflow-hidden shadow-lg border border-slate-200 bg-primary-bg transition-all hover:-translate-y-1 dark:border-slate-700"
					>
						{#if post.image}
							<img src="/images/blog/{post.image}" alt={post.title} class="w-full aspect-[2/1]" />
						{/if}
						<div class="flex h-full flex-col gap-2 p-5">
							<span class="text-xs text-secondary-light">
								{formatter.format(new Date(post.date))}
							</span>
							<span class="font-medium text-primary transition-colors group-hover:text-accent">
								{post.title}
							</span>
							{#if post.description}
								<span class="text-sm text-secondary">{post.description}</span>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<GridDots />