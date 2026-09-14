<script lang="ts">
    import type {Component} from 'svelte';
    import {resolve} from '$app/paths';
    import type {ResolvedPathname} from '$app/types';
    import {PROJECT_CATEGORIES} from '$lib/types';
    import type {ProjectMeta} from '$lib/types';

    let {component: Project, meta}: { component: Component; meta: ProjectMeta } = $props();
</script>

<article>
    <a href={resolve('/projects')} class="text-sm text-secondary transition-colors hover:text-accent">
        ← Все проекты
    </a>
    <header class="mt-6 mb-8 sm:mt-8 sm:mb-12">
        <span class="tag inline-flex text-xs text-secondary-light">{PROJECT_CATEGORIES[meta.category]}</span>
        <h1 class="mt-6 text-2xl font-semibold text-primary sm:text-3xl">{meta.title}</h1>
        {#if meta.description}
            <p class="mt-3 text-base text-secondary">{meta.description}</p>
        {/if}
        {#if meta.stack?.length}
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-secondary">
                {#each meta.stack as tech (tech)}
                    <span class="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">{tech}</span>
                {/each}
            </div>
        {/if}
        {#if meta.link}
            <a href={meta.link as ResolvedPathname} target="_blank" rel="noopener noreferrer"
               class="app-button-primary mt-6 inline-flex">
                Смотреть проект →
            </a>
        {/if}
    </header>
    <div
            class="prose prose-slate dark:prose-invert prose-headings:text-primary prose-a:text-accent prose-strong:text-primary prose-code:text-code-text prose-code:break-words max-w-none prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto prose-img:h-auto prose-img:w-full prose-img:rounded-lg lg:prose-lg break-words"
    >
        <Project/>
    </div>
</article>
