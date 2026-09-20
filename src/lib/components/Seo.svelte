<script lang="ts">
    import {page} from '$app/state';
    import {CONTACTS} from "$lib/types";

    interface Props {
        title: string;
        description: string;
        keywords?: string;
        image?: string;
        type?: 'website' | 'article';
    }

    let {
        title,
        description,
        keywords = 'веб-разработчик, разработка интернет-магазинов, CRM-система на заказ, автоматизация бизнеса, SvelteKit, сайт под ключ для малого бизнеса, Станислав Смирнов',
        image = '/images/avatar.avif',
        type = 'website'
    }: Props = $props();

    const siteName = 'Станислав Смирнов';
    const SITE_URL = `https://${CONTACTS.site}`;

    let fullTitle = $derived(title.includes(siteName) ? title : `${title} — ${siteName}`);
    let canonical = $derived(new URL(page.url.pathname, SITE_URL).toString());
    let absoluteImage = $derived(new URL(image, SITE_URL).toString());
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta name="description" content={description}/>
    <meta name="keywords" content={keywords}/>
    <link rel="canonical" href={canonical}/>

    <meta property="og:type" content={type}/>
    <meta property="og:title" content={fullTitle}/>
    <meta property="og:description" content={description}/>
    <meta property="og:url" content={canonical}/>
    <meta property="og:image" content={absoluteImage}/>
    <meta property="og:locale" content="ru_RU"/>
    <meta property="og:site_name" content={siteName}/>

    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content={fullTitle}/>
    <meta name="twitter:description" content={description}/>
    <meta name="twitter:image" content={absoluteImage}/>
</svelte:head>