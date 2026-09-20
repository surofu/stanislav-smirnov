<script lang="ts">
    import {Seo} from '$lib';
    import type {PageProps} from './$types';
    import {PROJECT_CATEGORIES} from '$lib/types';
    import {resolve} from '$app/paths';

    let {data}: PageProps = $props();
    let Project = $derived(data.component);
    let meta = $derived(data.meta);
</script>

<Seo
        title={meta.title}
        description={meta.description}
        keywords={(meta.keywords ?? [...(meta.stack ?? []), PROJECT_CATEGORIES[meta.category]]).join(', ')}
        image="/images/projects/{meta.image}"
        type="article"
/>

<article>
    <a href={resolve('/projects')} class="text-sm text-secondary transition-colors hover:text-accent">
        ← Все проекты
    </a>
    <header class="mt-6 mb-8 sm:mt-8 sm:mb-12">
        <span class="tag inline-flex text-xs text-secondary-light">{PROJECT_CATEGORIES[meta.category]}</span>
        <h1 class="mt-6 text-2xl font-semibold text-primary sm:text-3xl">{meta.title}</h1>
        <p class="mt-3 text-base text-secondary">{meta.description}</p>
        <div class="mt-4 flex flex-wrap gap-2 text-xs text-secondary">
            {#each meta.stack as tech (tech)}
                <span class="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">{tech}</span>
            {/each}
        </div>
        {#if meta.link}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- внешняя ссылка, resolve() не для внешних URL -->
            <a href={meta.link}
               target="_blank"
               rel="noopener noreferrer"
               class="app-button-primary mt-6 inline-flex"
            >
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