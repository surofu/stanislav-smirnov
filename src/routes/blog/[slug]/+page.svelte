<script lang="ts">
    import type { PageProps } from './$types';
    import { Seo, PostImage } from '$lib';
    import { resolve } from '$app/paths';

    let { data }: PageProps = $props();
    let Post = $derived(data.component);
    let meta = $derived(data.meta);

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
</script>

<Seo
        title={meta.title}
        description={meta.description}
        keywords={(meta.keywords ?? meta.tags).join(', ')}
        image="/images/blog/{meta.image}"
        type="article"
/>

<article>
    <a href={resolve('/blog')} class="text-sm text-secondary transition-colors hover:text-accent">
        ← Все посты
    </a>
    <header class="mt-6 mb-8 sm:mt-8 sm:mb-12">
        <span class="text-xs text-secondary-light">{formatter.format(new Date(meta.date))}</span>
        <PostImage src="/images/blog/{meta.image}" alt="Превью поста: {meta.title}" aspectRatio="2/1" />
        <h1 class="mt-12 text-2xl font-semibold text-primary sm:text-3xl">{meta.title}</h1>
        <p class="mt-3 text-base text-secondary">{meta.description}</p>
        <div class="mt-4 flex flex-wrap gap-2 text-xs text-secondary">
            {#each meta.tags as tag (tag)}
                <span class="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">{tag}</span>
            {/each}
        </div>
    </header>
    <div
            class="prose prose-slate dark:prose-invert prose-headings:text-primary prose-a:text-accent prose-strong:text-primary prose-code:text-code-text prose-code:break-words max-w-none prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto prose-img:h-auto prose-img:w-full prose-img:rounded-lg lg:prose-lg break-words"
    >
        <Post />
    </div>
</article>