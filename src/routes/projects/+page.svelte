<script lang="ts">
    import {resolve} from '$app/paths';
    import {Seo} from '$lib';
    import type {PageProps} from './$types';

    let {data}: PageProps = $props();

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
        year: 'numeric'
    });
</script>

<Seo
        title="Проекты"
        description="Примеры работ: сайты, интернет-магазины, CRM-системы."
/>

<section>
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
                                    class="group flex h-full flex-col rounded-lg overflow-hidden border border-slate-200 bg-primary-bg transition-all hover:-translate-y-1 dark:border-slate-700"
                            >
                                {#if project.image}
                                    <img src="/images/projects/{project.image}" alt={project.title}/>
                                {/if}
                                <div class="flex h-full flex-col gap-2 p-5">
									<span class="text-xs text-secondary-light">
									    {formatter.format(new Date(project.date))}
								    </span>
                                    <span class="font-medium text-primary transition-colors group-hover:text-accent">
									    {project.title}
								    </span>
                                    {#if project.description}
                                        <span class="text-sm text-secondary">{project.description}</span>
                                    {/if}
                                </div>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    {/if}
</section>
