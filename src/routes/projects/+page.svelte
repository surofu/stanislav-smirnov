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
	title="Проекты"
	description="Примеры работ: сайты, интернет-магазины, CRM и Telegram-боты, разработанные для бизнеса и частных специалистов."
/>

<section class="mx-auto max-w-3xl lg:max-w-5xl">
	<h1 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Проекты</h1>
	<p class="mt-2 text-secondary">Примеры работ по категориям.</p>

	{#if data.groups.length === 0}
		<p class="mt-12 text-secondary">Пока нет ни одного проекта — загляните позже.</p>
	{:else}
		{#each data.groups as group (group.category)}
			<div class="mt-12 first:mt-10">
				<h2 class="text-lg font-semibold text-primary">{group.label}</h2>
				<ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
					{#each group.projects as project (project.slug)}
						<li>
							<a
								href={resolve('/projects/[slug]', { slug: project.slug })}
								class="group flex h-full flex-col gap-2 rounded-lg border border-slate-200 bg-primary-bg p-5 transition-all hover:-translate-y-1 dark:border-slate-700"
							>
								<span class="text-xs text-secondary-light">
									{formatter.format(new Date(project.date))}
								</span>
								<span class="font-medium text-primary transition-colors group-hover:text-accent">
									{project.title}
								</span>
								{#if project.description}
									<span class="text-sm text-secondary">{project.description}</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{/if}
</section>
